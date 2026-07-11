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

  async function getToken(){
    const res = await fetch(`${SB_URL}/functions/v1/deepgram-token`, { method: 'POST' });
    const data = await res.json();
    return data.access_token;
  }

  async function connect(){
    let token;
    try { token = await getToken(); } catch(e){ console.error('token fetch failed', e); return; }
    if(!token){ console.error('Deepgram: no access_token'); return; }

    const qs = new URLSearchParams({
      model: 'nova-3',
      language: 'en',
      smart_format: 'true',
      interim_results: 'true',
      endpointing: '300',
      mip_opt_out: 'true',          // 参加者音声を学習に使わせない
    });
    // ブラウザはヘッダを付けられないので ['token', token] で認証
    ws = new WebSocket(`wss://api.deepgram.com/v1/listen?${qs}`, ['bearer', token]);

    ws.onopen = async () => {
      try { micStream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
      catch(e){ console.error('mic error', e); return; }
      const mime = (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))
        ? 'audio/webm;codecs=opus' : 'audio/webm';
      recorder = new MediaRecorder(micStream, { mimeType: mime });
      recorder.ondataavailable = (ev) => {
        if(ev.data.size > 0 && ws && ws.readyState === WebSocket.OPEN) ws.send(ev.data);
      };
      recorder.start(250);          // 250msごとに音声を送る
    };

    ws.onmessage = (msg) => {
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

    ws.onerror = (e) => { console.error('Deepgram WS error', e); };
    ws.onclose = () => { stopAudio(); if(running) setTimeout(connect, 500); }; // 切れたら再接続
  }

  function stopAudio(){
    try { if(recorder && recorder.state !== 'inactive') recorder.stop(); } catch(_){}
    try { if(micStream) micStream.getTracks().forEach(t => t.stop()); } catch(_){}
    recorder = null; micStream = null;
  }

  return {
    start(h){ handlers = h || {}; running = true; connect(); },
    stop(){ running = false; stopAudio(); try { if(ws) ws.close(); } catch(_){} ws = null; },
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
  logChunk(chunk, times);                // ★研究データ：speech_logへ（発話の開始/終了秒つき）
  if(!IS_LOG_ONLY) addMyEntry(chunk);    // 表示＋ライブ集計：ツール回のみ
}

/* ---- マイク制御（自動開始） ---- */
function startMic(){
  if(!speechEngine) speechEngine = createEngine();
  if(!speechEngine) return;
  isRec = true;
  speechEngine.start({ onPartial: onEnginePartial, onFinal: onEngineFinal });
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
