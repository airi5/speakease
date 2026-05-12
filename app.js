// ── 参加 ──────────────────────────────────────
async function join(){
  const name=document.getElementById('nameIn').value.trim();
  const lang=document.getElementById('langIn').value;
  const room=document.getElementById('roomIn').value.tr// ── 参加 ──────────────────────────────────────
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
        sessionLog.push({...entry, speaker:'other'});
        renderEntry(entry, 'other');
      }
    });
    if(Object.keys(otherCounts).length>0) updateParticipantList();
  } catch(e) { console.error('loadExisting:', e); }
}

// ── 発言追加 ──────────────────────────────────
function recordSilence(speakerBefore){
  if(lastSpeechTime!==null){
    const now=Date.now();
    const dur=Math.round((now-lastSpeechTime)/1000);
    if(dur>=3){
      silenceLogs.push({ duration_sec:dur, after_speaker:speakerBefore });
    }
  }
  lastSpeechTime=Date.now();
}

function countVocab(text){
  const words=text.toLowerCase()
    .replace(/[^a-zA-Z\s']/g,'')
    .split(/\s+/)
    .filter(w=>w.length>0);
  words.forEach(w=>{ myTokens.push(w); myTypes.add(w); });
}

function addMyEntry(text){
  recordSilence('me');
  countVocab(text);
  const entry={id:Date.now(),name:myName,lang:myLang,text,
    time:new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'}),
    timestamp:Date.now()};
  sessionLog.push({...entry,speaker:'me'});
  cntMe++;
  document.getElementById('cntMe').textContent=`あなた ${cntMe}回`;
  document.getElementById('myCnt').textContent=`${cntMe}回`;
  renderEntry(entry,'me');
  publish(entry);
  if(drawerOpen) updateWordBridge(text);
}

function addOtherEntry(entry) {
  recordSilence('other');
  if (!otherCounts[entry.name]) otherCounts[entry.name] = 0;
  otherCounts[entry.name]++;
  sessionLog.push({ ...entry, speaker: 'other' });
  renderEntry(entry, 'other');
  updateParticipantList();
  updateWordBridge(entry.text);
}

// ── 会話終了 ──────────────────────────────────
function endSession(){
  if(!confirm('会話を終了して分析を見ますか？'))return;
  clearInterval(timerInt);
  stopMic();
  if(drawerOpen && wbOpenTime!==null){
    wbTotalSec+=Math.round((Date.now()-wbOpenTime)/1000);
    wbOpenTime=null;
  }
  toggleDash();
}

// ── ページ離脱時のクリーンアップ ──────────────
window.addEventListener('beforeunload',()=>{
  if(realtimeWs) realtimeWs.close();
  if(heartbeatInt) clearInterval(heartbeatInt);
  clearInterval(timerInt);
});im();
  if(!name){alert('名前を入力してください');return;}

  // '--' を含むコードは既存セッションへの参加、そうでなければ新規セッション
  if(!room){
    roomCode=genCode();               // ランダムコード + 新セッション
  } else if(room.includes('--')){
    roomCode=room;                    // フルコードをそのまま使用（既存セッションに参加）
    // 定員チェック（最大5人）
    try {
      const rows=await sbSelect();
      const others=new Set((rows||[]).map(r=>r.name).filter(n=>n!==name));
      if(others.size>=4){
        alert('このルームはすでに5人参加しています。別のルームコードをお試しください。');
        roomCode='';
        return;
      }
    } catch(e){ console.error('capacity check:',e); }
  } else {
    roomCode=room+'--'+genSuffix();   // 入力コードに新セッションを付与
  }

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

function genCode(){
  const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ', N='0123456789';
  const base=[0,1,2].map(()=>A[Math.random()*26|0]).join('')+'-'+[0,1,2].map(()=>N[Math.random()*10|0]).join('');
  return base+'--'+genSuffix();
}

function genSuffix(){
  const C='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return [0,1,2,3].map(()=>C[Math.random()*36|0]).join('');
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
        sessionLog.push({...entry, speaker:'other'});
        renderEntry(entry, 'other');
      }
    });
    if(Object.keys(otherCounts).length>0) updateParticipantList();
  } catch(e) { console.error('loadExisting:', e); }
}

// ── 発言追加 ──────────────────────────────────
function recordSilence(speakerBefore){
  if(lastSpeechTime!==null){
    const now=Date.now();
    const dur=Math.round((now-lastSpeechTime)/1000);
    if(dur>=3){
      silenceLogs.push({ duration_sec:dur, after_speaker:speakerBefore });
    }
  }
  lastSpeechTime=Date.now();
}

function countVocab(text){
  const words=text.toLowerCase()
    .replace(/[^a-zA-Z\s']/g,'')
    .split(/\s+/)
    .filter(w=>w.length>0);
  words.forEach(w=>{ myTokens.push(w); myTypes.add(w); });
}

function addMyEntry(text){
  recordSilence('me');
  countVocab(text);
  const entry={id:Date.now(),name:myName,lang:myLang,text,
    time:new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'}),
    timestamp:Date.now()};
  sessionLog.push({...entry,speaker:'me'});
  cntMe++;
  document.getElementById('cntMe').textContent=`あなた ${cntMe}回`;
  document.getElementById('myCnt').textContent=`${cntMe}回`;
  renderEntry(entry,'me');
  publish(entry);
  if(drawerOpen) updateWordBridge(text);
}

function addOtherEntry(entry) {
  recordSilence('other');
  if (!otherCounts[entry.name]) otherCounts[entry.name] = 0;
  otherCounts[entry.name]++;
  sessionLog.push({ ...entry, speaker: 'other' });
  renderEntry(entry, 'other');
  updateParticipantList();
  updateWordBridge(entry.text);
}

// ── 会話終了 ──────────────────────────────────
function endSession(){
  if(!confirm('会話を終了して分析を見ますか？'))return;
  clearInterval(timerInt);
  stopMic();
  if(drawerOpen && wbOpenTime!==null){
    wbTotalSec+=Math.round((Date.now()-wbOpenTime)/1000);
    wbOpenTime=null;
  }
  toggleDash();
}

// ── ページ離脱時のクリーンアップ ──────────────
window.addEventListener('beforeunload',()=>{
  if(realtimeWs) realtimeWs.close();
  if(heartbeatInt) clearInterval(heartbeatInt);
  clearInterval(timerInt);
});
