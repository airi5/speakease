const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

function initSR(){
  if(!SR){
    document.getElementById('ctrlHint').textContent='Chrome/Edgeをご利用ください';
    document.getElementById('micBtn').disabled=true;
    document.getElementById('micBtn').style.opacity='.4';
    return;
  }
  // デフォルトはOFF
  document.getElementById('ctrlHint').textContent='ボタンを押している間、声を認識します（Spaceキーでも）';
}

function createRecognition(){
  if(!SR) return null;
  const rec = new SR();
  rec.lang='en-US';
  rec.continuous=false;
  rec.interimResults=true;
  rec.maxAlternatives=1;

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
      document.getElementById('ctrlHint').textContent=`「${interim}」`;
    }
    if(final.trim()){
      addMyEntry(final.trim());
      stopMic();
    }
  };

  rec.onerror=e=>{
    console.error('SR error:',e.error);
    if(e.error==='no-speech'||e.error==='aborted') return;
    stopMic();
  };

  rec.onend=()=>{
    if(isRec) stopMic();
  };

  return rec;
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
  document.getElementById('micLbl').textContent='認識中...';
  document.getElementById('wf').classList.remove('h');
  setRec(true);
  document.getElementById('ctrlHint').textContent='話してください...';
}

function stopMic(){
  isRec=false;
  if(recognition){
    try{recognition.stop();}catch(e){}
    recognition=null;
  }
  document.getElementById('micBtn').className='mic-btn idle';
  document.getElementById('micLbl').textContent='話す';
  document.getElementById('wf').classList.add('h');
  setRec(false);
  document.getElementById('ctrlHint').textContent='ボタンを押している間、声を認識します（Spaceキーでも）';
}

function setRec(on){
  const p=document.getElementById('recPill');
  p.className='rec-pill'+(on?' on':' off');
  document.getElementById('recTxt').textContent=on?'認識中':'待機中';
}

document.addEventListener('keydown',e=>{
  if(e.code==='Space'&&e.target===document.body){e.preventDefault();if(!isRec)startMic();}
});
document.addEventListener('keyup',e=>{
  if(e.code==='Space'&&isRec)stopMic();
});
