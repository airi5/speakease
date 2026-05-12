// ── 参加 ──────────────────────────────────────
async function join(){
  const name=document.getElementById('nameIn').value.trim();
  const lang=document.getElementById('langIn').value;
  const room=document.getElementById('roomIn').value.trim();
  if(!name){alert('Please enter your name.');return;}
  if(!room){alert('Please enter a room code.');return;}

  roomCode=room;
  myName=name; myLang=lang;
  sessionStart=Date.now();
  document.getElementById('roomDisp').textContent=roomCode;
  document.getElementById('langSw').value=myLang;
  document.getElementById('joinWrap').style.display='none';
  document.getElementById('meetingWrap').style.display='grid';
  updateParticipantList();
  startTimer();
  initSR();
  loadExisting();
  sbSubscribe();
}

// ── タイマー ──────────────────────────────────
function startTimer(){
  timerInt=setInterval(()=>{
    const s=Math.floor((Date.now()-sessionStart)/1000);
    const t=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
    document.getElementById('timerDisp').textContent=t;
    document.getElementById('sideTimer').textContent=t;
  },1000);
}

// ── Supabase保存・読み込み ────────────────────
async function publish(entry) {
  await sbInsert(entry);
}

async function loadExisting() {
  try {
    const rows = await sbSelect();
    (rows || []).forEach(row => {
      if (row.name !== myName) {
        const entry = {
          ...row,
          time: new Date(row.created_at).toLocaleTimeString('ja-JP', { hour:'2-digit', minute:'2-digit' }),
        };
        if(!otherCounts[entry.name]) otherCounts[entry.name]=0;
        otherCounts[entry.name]++;
        sessionLog.push({...
