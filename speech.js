/* ============================================================
   SpeakEase  speech.js  (Deepgram版)
   - 連続認識：ボタン不要、自動で聞き続ける
   - 認識エンジン：Deepgram Nova-3（一時トークン＋WebSocket）
   - log_only モード：ツールUIを出さず、記録だけ走らせる
   - 生チャンクを speech_log に記録（研究データ／集計は後処理）
   ============================================================ */

const SPEECH_CONFIG = {
  lang: 'en-US',
  engine: 'deepgram',    // 'webspeech'（無料・予備） / 'deepgram'（本番）
};

// room code の4番目（例 AX-G01-R1-T の "T"）でツール/ログを決める
const EXPERIMENT = {
  toolRounds: ['R1'],    // ※現在は未使用（T/Lフラグで判定）
};

let IS_LOG_ONLY = false;
let speechEngine = null;

const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

/* ---- Web Speech エンジン（無料・予備） ---- */
function createWebSpeechEngine(){
  let rec = null, running = false, handlers = {};
  function build(){
    const r = new SR();
    r.lang = SPEECH_CONFIG.lang;
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = e => {
      let finalChunk = '', interim = '';
      for(let i=e.resultIndex; i<e.results.length; i++){
        const txt = e.results[i][0].transcript;
        if(e.results[i].isFinal) finalChunk += txt; else interim += txt;
      }
      if(interim && handlers.onPartial) handlers.onPartial(interim);
      if(finalChunk.trim() && handlers.onFinal) handlers.onFinal(finalChunk.trim());
    };
    r.onerror = e => {
      if(e.error==='no-speech' || e.error==='aborted') return;
      console.error('SR error:', e.error);
    };
    r.onend = () => { if(running){ try{ r.start(); }catch(_){} } };
    return r;
  }
  return {
    start(h){ handlers=h||{}; running=true; rec=build(); try{ rec.start(); }catch(_){} },
    stop(){ running=false; if(rec){ try{ rec.stop(); }catch(_){} rec=null; } },
  };
}

/* ---- Deepgram エンジン（Nova-3 ストリーミング） ---- */
function createDeepgramEngine(){
  let ws = null, recorder = null, micStream = null;
  let running = false, handlers = {};
  let audioCtx = null, levelTimer = null;
  let failCount = 0, micFatal = false;

  function status(code){ if(handlers.onStatus) handlers.onStatus(code); }

  async function getToken(){
    const res = await fetch(`${SB_URL}/functions/v1/deepgram-token`, { method: 'POST' });
    if(!res.ok) throw new Error('token http ' + res.status);
    const data = await res.json();
    return data.access_token;
  }

  // 音の大きさ（0〜1）を一定間隔で通知する（マイクチェックのバー用）
  function startLevel(stream){
    if(!handlers.onLevel) return;
    try{
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return;
      audioCtx = new AC();
      if(audioCtx.state === 'suspended') audioCtx.resume();
      const an = audioCtx.createAnalyser(); an.fftSize = 512;
      audioCtx.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.fftSize);
      levelTimer = setInterval(() => {
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for(let i=0;i<buf.length;i++){ const v=(buf[i]-128)/128; sum += v*v; }
        if(handlers.onLevel) handlers.onLevel(Math.min(1, Math.sqrt(sum/buf.length)*4));
      }, 80);
    }catch(e){ console.error('level meter failed', e); }
  }
  function stopLevel(){
    if(levelTimer){ clearInterval(levelTimer); levelTimer = null; }
    try { if(audioCtx) audioCtx.close(); } catch(_){}
    audioCtx = null;
  }

  // マイクを取る（生きていれば使い回す）。失敗したら原因を通知して null を返す
  async function ensureMic(){
    if(micStream && micStream.getAudioTracks().some(tr => tr.readyState === 'live')) return micStream;
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder){
      micFatal = true; status('unsupported'); return null;
    }
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startLevel(micStream);
      return micStream;
    } catch(e){
      console.error('mic error', e);
      const n = e && e.name;
      if(n === 'NotAllowedError' || n === 'SecurityError'){ micFatal = true; status('denied'); }
      else if(n === 'NotReadableError' || n === 'AbortError'){ status('busy'); }
      else { status('nomic'); }
      return null;
    }
  }

  async function connect(){
    if(!running) return;
    const stream = await ensureMic();
    if(!running) return;
    if(!stream){
      if(micFatal) return;                 // 許可なし・非対応は再試行しても直らない
      setTimeout(connect, 3000); return;   // 他アプリが使用中・未接続は、直ったら自動で復帰
    }

    let token = null;
    try { token = await getToken(); } catch(e){ console.error('token fetch failed', e); }
    if(!running) return;
    if(!token){
      console.error('Deepgram: no access_token, retrying...');
      if(++failCount >= 2) status('net');
      setTimeout(connect, 3000); return;
    }

    const qs = new URLSearchParams({
      model: 'nova-3',
      language: 'en',
      smart_format: 'true',
      interim_results: 'true',
      endpointing: '300',
      mip_opt_out: 'true',          // 参加者音声を学習に使わせない
    });
    // ブラウザはヘッダを付けられないので ['bearer', token] で認証
    const sock = new WebSocket(`wss://api.deepgram.com/v1/listen?${qs}`, ['bearer', token]);
    ws = sock;
    let opened = false;

    sock.onopen = () => {
      opened = true; failCount = 0; status('ok');
      let mime = '';
      if(MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mime = 'audio/webm;codecs=opus';
      else if(MediaRecorder.isTypeSupported('audio/webm')) mime = 'audio/webm';
      try { recorder = mime ? new MediaRecorder(micStream, { mimeType: mime }) : new MediaRecorder(micStream); }
      catch(e){ console.error('recorder error', e); micFatal = true; status('unsupported'); try{ sock.close(); }catch(_){} return; }
      recorder.ondataavailable = (ev) => {
        if(ev.data.size > 0 && sock.readyState === WebSocket.OPEN) sock.send(ev.data);
      };
      recorder.start(250);          // 250msごとに音声を送る
    };

    sock.onmessage = (msg) => {
      let data; try { data = JSON.parse(msg.data); } catch(_){ return; }
      if(data.type !== 'Results') return;
      const alt = data.channel && data.channel.alternatives && data.channel.alternatives[0];
      const text = alt ? (alt.transcript || '') : '';
      if(!text) return;

      if(data.is_final){
        // 単語レベルの時刻から、この発話の開始・終了（秒）を取り出す
        const words = (alt && alt.words) || [];
        const times = words.length
          ? { start: words[0].start, end: words[words.length-1].end }
          : { start: data.start ?? null,
              end: (data.start != null && data.duration != null) ? data.start + data.duration : null };
        if(handlers.onFinal) handlers.onFinal(text, times);
      } else {
        if(handlers.onPartial) handlers.onPartial(text);
      }
    };

    sock.onerror = (e) => { console.error('Deepgram WS error', e); };
    sock.onclose = () => {
      if(ws !== sock) return;       // stop() 済み・作り直し済みの古い接続は無視
      stopRecorder();
      if(!running) return;
      if(!opened && ++failCount >= 2) status('net');
      setTimeout(connect, opened ? 500 : 2000);   // 切れたら再接続（マイクは使い回す）
    };
  }

  function stopRecorder(){
    try { if(recorder && recorder.state !== 'inactive') recorder.stop(); } catch(_){}
    recorder = null;
  }
  function releaseMic(){
    try { if(micStream) micStream.getTracks().forEach(tr => tr.stop()); } catch(_){}
    micStream = null; stopLevel();
  }

  return {
    start(h){ handlers = h || {}; running = true; failCount = 0; micFatal = false; connect(); },
    stop(){ running = false; stopRecorder(); releaseMic(); const s = ws; ws = null; try { if(s) s.close(); } catch(_){} },
    stopLevel,
  };
}

function createEngine(){
  if(SPEECH_CONFIG.engine === 'deepgram') return createDeepgramEngine();
  return SR ? createWebSpeechEngine() : null;
}

/* ---- 認識結果のハンドラ ---- */
function onEnginePartial(text){
  const hint = document.getElementById('ctrlHint');
  if(hint && !IS_LOG_ONLY) hint.textContent = `「${text}」`;
}

function onEngineFinal(chunk, times){
  // マイクテスト中：記録せず、合格判定に使う
  if(MIC_TEST_MODE){
    const h = document.getElementById('mtHeard');
    if(h) h.textContent = `「${chunk}」`;
    micTestPass(false);
    return;
  }
  logChunk(chunk, times);                // ★研究データ：speech_logへ
  if(!IS_LOG_ONLY) addMyEntry(chunk);    // 表示＋ライブ集計：ツール回のみ
}

/* ---- マイクの状態（エラーの原因表示）と音量バー ---- */
let micErrCode = null;      // denied / nomic / busy / unsupported / net
let micMaxLevel = 0;        // マイクチェック中に観測した最大音量
const MIC_ERR_KEY = { denied:'mtErrDenied', nomic:'mtErrNoMic', busy:'mtErrBusy',
                      unsupported:'mtErrUnsupported', net:'mtErrNet' };

function showMicTestMsg(msgKey){
  const ic=document.getElementById('mtIcon'), ti=document.getElementById('mtTitle'),
        ms=document.getElementById('mtMsg'), sk=document.getElementById('mtSkip');
  if(ic) ic.textContent='⚠️';
  if(ti) ti.textContent=t('mtNoTitle');
  if(ms) ms.innerHTML=t(msgKey);
  if(sk) sk.style.display='inline-block';
}

function onEngineStatus(code){
  if(code === 'ok'){
    micErrCode = null;
    if(!MIC_TEST_MODE && isRec) setMicUI(true);   // 復帰したので表示を戻す
    return;
  }
  micErrCode = code;
  const key = MIC_ERR_KEY[code]; if(!key) return;
  if(MIC_TEST_MODE){ showMicTestMsg(key); return; }
  const hint = document.getElementById('ctrlHint');   // 会話中は操作ヒントの場所に出す
  if(hint) hint.textContent = '⚠️ ' + t(key).replace(/<[^>]*>/g,'');
}

function onEngineLevel(l){
  if(!MIC_TEST_MODE) return;
  if(l > micMaxLevel) micMaxLevel = l;
  const bar = document.getElementById('mtMeterBar');
  if(bar) bar.style.width = Math.round(l*100) + '%';
}

/* ---- マイク制御（自動開始） ---- */
function startMic(){
  if(!speechEngine) speechEngine = createEngine();
  if(!speechEngine) return;
  isRec = true;
  speechEngine.start({ onPartial: onEnginePartial, onFinal: onEngineFinal, onStatus: onEngineStatus, onLevel: onEngineLevel });
  setMicUI(true); setRec(true);
}
function stopMic(){
  isRec = false;
  if(speechEngine) speechEngine.stop();
  setMicUI(false); setRec(false);
}
function toggleMic(){ isRec ? stopMic() : startMic(); }

function setMicUI(on){
  const btn=document.getElementById('micBtn'), lbl=document.getElementById('micLbl'),
        wf=document.getElementById('wf'), hint=document.getElementById('ctrlHint');
  if(btn) btn.className = 'mic-btn ' + (on?'rec':'idle');
  if(lbl) lbl.textContent = on ? (t('recording')||'Listening') : (t('speakBtn')||'Paused');
  if(wf) wf.classList.toggle('h', !on);
  if(hint && !IS_LOG_ONLY) hint.textContent = on ? (t('listening')||'Listening...') : (t('speakHint')||'');
}
function setRec(on){
  const p=document.getElementById('recPill'); if(!p) return;
  p.className='rec-pill'+(on?' on':' off');
  const txt=document.getElementById('recTxt'); if(txt) txt.textContent = on?'Recording':'Waiting';
}

/* ---- 初期化（join() から呼ばれる） ---- */
function applyExperimentMode(){
  const mode = (String(roomCode).split('-')[3] || '').toUpperCase();
  IS_LOG_ONLY = (mode === 'L');     // L = log_only、それ以外(T等)はツール
  document.body.classList.toggle('log-only', IS_LOG_ONLY);
  if(IS_LOG_ONLY){
    const r = document.getElementById('loRoom'); if(r) r.textContent = roomCode;
    const n = document.getElementById('loName'); if(n) n.textContent = myName;
  }
}
function initSR(){
  applyExperimentMode();
  if(SPEECH_CONFIG.engine==='webspeech' && !SR){
    const hint=document.getElementById('ctrlHint'); if(hint) hint.textContent='Please use Chrome or Edge.';
    const btn=document.getElementById('micBtn'); if(btn){ btn.disabled=true; btn.style.opacity='.4'; }
    return;
  }
  startMic();
}

/* ---- マイクテスト ---- */
let MIC_TEST_MODE = false;
let micTestTimer = null;

function startMicTest(){
  MIC_TEST_MODE = true;
  micErrCode = null; micMaxLevel = 0;
  const el = document.getElementById('micTest');
  if(el) el.style.display = 'flex';
  // 選んだ言語で表示する（言語ごとの文は config.js の mt〜 キー）
  document.getElementById('mtIcon').textContent  = '🎤';
  document.getElementById('mtTitle').textContent = t('mtTitle');
  document.getElementById('mtMsg').textContent   = t('mtMsg');
  document.getElementById('mtSkip').textContent  = t('mtSkip');
  const mh = document.getElementById('mtMeterHint'); if(mh) mh.textContent = t('mtMeterHint');
  const bar = document.getElementById('mtMeterBar'); if(bar) bar.style.width = '0%';
  startMic();                       // 認識エンジンを起動
  // 15秒たっても声が来なければ、原因に合わせて警告
  micTestTimer = setTimeout(() => {
    if(!MIC_TEST_MODE) return;
    if(micErrCode) return;                          // 原因は表示済み
    if(micMaxLevel < 0.05) showMicTestMsg('mtErrSilent');   // マイクから音が来ていない
    else showMicTestMsg('mtNoMsg');                         // 音は来ているのに認識されない
  }, 15000);
}

// 認識できた／スキップした → 会話画面へ
function micTestPass(skipped){
  if(!MIC_TEST_MODE) return;
  MIC_TEST_MODE = false;
  if(micTestTimer){ clearTimeout(micTestTimer); micTestTimer = null; }
  if(speechEngine && speechEngine.stopLevel) speechEngine.stopLevel();
  const el = document.getElementById('micTest');
  if(!skipped){
    document.getElementById('mtIcon').textContent = '✅';
    document.getElementById('mtTitle').textContent = t('mtOkTitle');
    document.getElementById('mtMsg').textContent = t('mtOkMsg');
    setTimeout(() => { if(el) el.style.display='none'; }, 1200);
  } else {
    if(el) el.style.display='none';
  }
  sessionStart = Date.now();        // テスト中の時間は会話時間に含めない
}
