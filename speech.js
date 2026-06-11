/* ============================================================
   SpeakEase  speech.js  (改良版・最新)
   - 連続認識：ボタン不要、自動で聞き続ける（要望②③を解決）
   - 認識エンジン差し替え可能：後で Deepgram を挿すだけ
   - log_only モード：ツールUIを出さず、記録だけ走らせる
   - 生チャンクを speech_log に記録（研究データ／集計は後処理）
   ============================================================ */

const SPEECH_CONFIG = {
  lang: 'en-US',
  engine: 'webspeech',   // 'webspeech'（現行・無料） / 'deepgram'（後で差し替え）
};

// room code の3番目（例 AX-G01-R1 の "R1"）でツール提示の有無を決める
const EXPERIMENT = {
  toolRounds: ['R1'],    // この回はツール提示。それ以外は log_only（ツール非表示）
};

let IS_LOG_ONLY = false;
let speechEngine = null;

const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

/* ---- Web Speech エンジン（現行・無料） ---- */
function createWebSpeechEngine(){
  let rec = null, running = false, handlers = {};
  function build(){
    const r = new SR();
    r.lang = SPEECH_CONFIG.lang;
    r.continuous = true;       // ★止めない（沈黙ごとに勝手に終わらせない）
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
    r.onend = () => { if(running){ try{ r.start(); }catch(_){} } };  // 録音中なら自動再開
    return r;
  }
  return {
    start(h){ handlers=h||{}; running=true; rec=build(); try{ rec.start(); }catch(_){} },
    stop(){ running=false; if(rec){ try{ rec.stop(); }catch(_){} rec=null; } },
  };
}

/* ---- Deepgram エンジン（後で実装。今は雛形だけ） ---- */
function createDeepgramEngine(){
  console.warn('Deepgram engine not implemented yet; using Web Speech.');
  return SR ? createWebSpeechEngine() : null;
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

function onEngineFinal(chunk){
  logChunk(chunk);                       // ★研究データ：speech_logへ（全回）
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
function toggleMic(){ isRec ? stopMic() : startMic(); }   // ボタンは「一時停止」として任意利用

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
  startMic();   // ★ボタンを押さず自動で聞き始める
}
