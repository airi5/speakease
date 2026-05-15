const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let silenceTimer = null;
const SILENCE_THRESHOLD = 2000;
let pendingText = ''; // 送信待ちのテキスト

function initSR(){
  if(!SR){
    document.getElementById('ctrlHint').textContent = 'Please use Chrome or Edge.';
    document.getElementById('micBtn').disabled = true;
    document.getElementById('micBtn').style.opacity = '.4';
    return;
  }
  startMic();
}

function createRecognition(){
  if(!SR) return null;
  const rec = new SR();
  rec.lang = 'en-US';
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  rec.onresult = e => {
    let final = '', interim = '';
    for(let i = e.resultIndex; i < e.results.length; i++){
      const text = e.results[i][0].transcript;
      if(e.results[i].isFinal){
        if(e.results[i][0].confidence > 0.5 || e.results[i][0].confidence === 0){
          final += text;
        }
      } else {
        interim += text;
      }
    }

    if(interim){
      // 自分の画面だけにプレビュー表示
      pendingText = interim;
      showPreview(interim);
      clearTimeout(silenceTimer);
      silenceTimer = setTimeout(()=>{
        if(pendingText.trim() && isRec){
          showPreview(pendingText);
        }
      }, SILENCE_THRESHOLD);
    }

    if(final.trim()){
      clearTimeout(silenceTimer);
      pendingText = final.trim();
      showPreview(final.trim());
    }
  };

  rec.onerror = e => {
    console.error('SR error:', e.error);
    if(e.error === 'no-speech' || e.error === 'aborted') return;
    setTimeout(()=>{ if(isRec) restartMic(); }, 3000);
  };

  rec.onend = () => {
    if(isRec){
      setTimeout(()=>{
        try{ recognition.start(); }catch(e){}
      }, 300);
    }
  };

  return rec;
}

// プレビュー表示（自分の画面だけ）
function showPreview(text){
  let preview = document.getElementById('previewBubble');
  if(!preview){
    // プレビュー用の吹き出しを作成
    const area = document.getElementById('logArea');
    const empty = document.getElementById('logEmpty');
    if(empty) empty.remove();

    preview = document.createElement('div');
    preview.id = 'previewBubble';
    preview.style.cssText = `
      display:flex;flex-direction:column;align-items:flex-end;
      gap:3px;padding:0 0 8px 0;opacity:0.6;
    `;
    preview.innerHTML = `
      <div style="font-size:11px;color:var(--ink3);padding:0 3px">
        ${myName} · Preview
      </div>
      <div style="padding:10px 14px;border-radius:20px 20px 3px 20px;
        max-width:80%;background:var(--blue-l);border:2px dashed var(--blue);
        font-size:17px;font-weight:700;color:#1e3a8a" id="previewText">
        ${text}
      </div>
      <div style="display:flex;gap:8px;padding:0 3px">
        <button onclick="clearPreview()"
          style="padding:4px 12px;border-radius:8px;border:1px solid var(--border2);
          background:transparent;font-size:12px;font-weight:700;cursor:pointer;
          color:var(--ink3);font-family:'Nunito',sans-serif">
          Clear
        </button>
        <button onclick="sendPreview()"
          style="padding:4px 14px;border-radius:8px;border:none;
          background:var(--blue);color:#fff;font-size:12px;font-weight:700;
          cursor:pointer;font-family:'Nunito',sans-serif">
          Send ↑
        </button>
      </div>`;
    area.appendChild(preview);
    area.scrollTop = area.scrollHeight;
  } else {
    document.getElementById('previewText').textContent = text;
    document.getElementById('previewBubble').parentElement.scrollTop =
      document.getElementById('previewBubble').parentElement.scrollHeight;
  }
}

// 送信ボタンを押したとき
function sendPreview(){
  if(!pendingText.trim()) return;
  addMyEntry(pendingText.trim());
  clearPreview();
}

// クリアボタンを押したとき
function clearPreview(){
  pendingText = '';
  const preview = document.getElementById('previewBubble');
  if(preview) preview.remove();
}

function restartMic(){
  if(!recognition || !isRec) return;
  try{ recognition.stop(); }catch(e){}
  setTimeout(()=>{
    if(!isRec) return;
    recognition = createRecognition();
    try{ recognition.start(); }catch(e){}
  }, 300);
}

function toggleMic(){ isRec ? stopMic() : startMic(); }

function startMic(){
  if(!SR) return;
  if(recognition){
    try{ recognition.abort(); }catch(e){}
    recognition = null;
  }
  recognition = createRecognition();
  if(!recognition) return;
  isRec = true;
  recognition.start();
  document.getElementById('micBtn').className = 'mic-btn rec';
  document.getElementById('micLbl').textContent = 'ON';
  document.getElementById('wf').classList.remove('h');
  setRec(true);
  document.getElementById('ctrlHint').textContent = t('listening');
}

function stopMic(){
  clearTimeout(silenceTimer);
  isRec = false;
  if(recognition){
    try{ recognition.stop(); }catch(e){}
    recognition = null;
  }
  document.getElementById('micBtn').className = 'mic-btn idle';
  document.getElementById('micLbl').textContent = 'OFF';
  document.getElementById('wf').classList.add('h');
  setRec(false);
  document.getElementById('ctrlHint').textContent = t('speakHint');
}

function setRec(on){
  const p = document.getElementById('recPill');
  p.className = 'rec-pill' + (on ? ' on' : ' off');
  document.getElementById('recTxt').textContent = on ? 'Recording' : 'Waiting';
}

document.addEventListener('keydown', e => {
  if(e.code === 'Space' && e.target === document.body){
    e.preventDefault();
    if(!isRec) startMic();
  }
});

// Enterキーで送信
document.addEventListener('keydown', e => {
  if(e.code === 'Enter' && e.target === document.body && pendingText.trim()){
    e.preventDefault();
    sendPreview();
  }
});
