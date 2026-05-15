const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let silenceTimer = null;
const SILENCE_THRESHOLD = 1500;

function initSR(){
  if(!SR){
    document.getElementById('ctrlHint').textContent='Chrome/Edgeをご利用ください';
    document.getElementById('micBtn').disabled=true;
    document.getElementById('micBtn').style.opacity='.4';
    return;
  }
  // 参加したら自動でマイクON
  startMic();
}

function createRecognition(){
  if(!SR) return null;
  const rec = new SR();
  rec.lang='en-US';
  rec.continuous=true;
  rec.interimResults=true;
  rec.maxAlternatives=1;

  let lastInterim='';

  rec.onresult=e=>{
    let final='', interim='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      const t=e.results[i][0].transcript;
      if(e.results[i].isFinal){
        if(e.results[i][0].confidence>0.5||e.results[i][0].confidence===0){
          final+=t;
        }
      } else {
        interim+=t;
      }
    }

    if(interim){
      lastInterim=interim;
      document.getElementById('ctrlHint').textContent=`「${interim}」`;
      clearTimeout(silenceTimer);
      silenceTimer=setTimeout(()=>{
        if(lastInterim.trim()&&isRec){
          addMyEntry(lastInterim.trim());
          lastInterim='';
          // 止めずにそのまま次の認識を続ける
          document.getElementById('ctrlHint').textContent='認識中... 話してください';
        }
      }, SILENCE_THRESHOLD);
    }

    if(final.trim()){
      clearTimeout(silenceTimer);
      lastInterim='';
      addMyEntry(final.trim());
      // 止めずにそのまま次の認識を続ける
      document.getElementById('ctrlHint').textContent='認識中... 話してください';
    }
  };

  rec.onerror=e=>{
    console.error('SR error:',e.error);
    if(e.error==='no-speech'){
      // 無音エラーは無視してそのまま継続
      return;
    }
    if(e.error==='aborted') return;
    // その他のエラーは3秒後に再スタート
    setTimeout(()=>{ if(isRec) restartMic(); }, 3000);
  };

  rec.onend=()=>{
    // まだ録音中なら自動で再スタート
    if(isRec){
      setTimeout(()=>{
        try{ recognition.start(); }catch(e){}
      }, 300);
    }
  };

  return rec;
}

// 認識を再スタート（発言確定後・エラー後に使用）
function restartMic(){
  if(!recognition||!isRec) return;
  try{ recognition.stop(); }catch(e){}
  setTimeout(()=>{
    if(!isRec) return;
    recognition=createRecognition();
    try{ recognition.start(); }catch(e){}
  }, 300);
}

function toggleMic(){isRec?stopMic():startMic();}

function startMic(){
  if(!SR) return;
  if(recognition){
    try{recognition.abort();}catch(e){}
    recognition=null;
  }
  recognition=createRecognition();
  if(!recognition) return;
  isRec=true;
  recognition.start();
  document.getElementById('micBtn').className='mic-btn rec';
  document.getElementById('micLbl').textContent='ON';
  document.getElementById('wf').classList.remove('h');
  setRec(true);
  document.getElementById('ctrlHint').textContent=t('listening');
}

function stopMic(){
  clearTimeout(silenceTimer);
  isRec=false;
  if(recognition){
    try{recognition.stop();}catch(e){}
    recognition=null;
  }
  document.getElementById('micBtn').className='mic-btn idle';
  document.getElementById('micLbl').textContent='OFF';
  document.getElementById('wf').classList.add('h');
  setRec(false);
  document.getElementById('ctrlHint').textContent=t('speakHint');
}

function setRec(on){
  const p=document.getElementById('recPill');
  p.className='rec-pill'+(on?' on':' off');
  document.getElementById('recTxt').textContent=on?'認識中':'停止中';
}

document.addEventListener('keydown',e=>{
  if(e.code==='Space'&&e.target===document.body){e.preventDefault();if(!isRec)startMic();}
});
