// 発言エントリをDOMに追加（textContent使用でXSS防止）
function renderEntry(entry, speaker){
  const empty=document.getElementById('logEmpty');
  if(empty)empty.remove();
  const area=document.getElementById('logArea');

  const div=document.createElement('div');
  div.className=`entry ${speaker}`;

  const meta=document.createElement('div');
  meta.className='e-meta';
  const nameSpan=document.createElement('span');
  nameSpan.className='e-name';
  nameSpan.textContent=entry.name;
  const timeSpan=document.createElement('span');
  timeSpan.className='e-time';
  timeSpan.textContent=entry.time||'';
  meta.appendChild(nameSpan);
  meta.appendChild(timeSpan);

  const bubble=document.createElement('div');
  bubble.className='bubble';
  const bEn=document.createElement('div');
  bEn.className='b-en';
  bEn.textContent=entry.text;
  const bTrans=document.createElement('div');
  bTrans.className='b-trans';
  bTrans.id=`tr-${entry.id}`;
  const bActions=document.createElement('div');
  bActions.className='b-actions';
  const transBtn=document.createElement('button');
  transBtn.className='trans-btn';
  transBtn.textContent='訳を見る';
  transBtn.addEventListener('click',()=>toggleTrans(entry.id,entry.text));
  bActions.appendChild(transBtn);
  bubble.appendChild(bEn);
  bubble.appendChild(bTrans);
  bubble.appendChild(bActions);

  div.appendChild(meta);
  div.appendChild(bubble);
  area.appendChild(div);
  area.scrollTop=area.scrollHeight;
}

// 参加者リストをDOMに再描画（textContent使用でXSS防止）
function updateParticipantList() {
  const pList = document.getElementById('pList');
  const totalOther = Object.values(otherCounts).reduce((a, b) => a + b, 0);
  cntOther = totalOther;
  document.getElementById('cntOther').textContent = `他の参加者 ${totalOther}回`;

  pList.innerHTML = '';

  const meRow=document.createElement('div');
  meRow.className='p-row';
  const meAv=document.createElement('div');
  meAv.className='av me';
  meAv.textContent=myName.slice(0,1);
  const meNm=document.createElement('div');
  meNm.className='p-name';
  meNm.textContent=`${myName}（あなた）`;
  const meCnt=document.createElement('div');
  meCnt.className='p-cnt';
  meCnt.id='myCnt';
  meCnt.textContent=`${cntMe}回`;
  meRow.appendChild(meAv);
  meRow.appendChild(meNm);
  meRow.appendChild(meCnt);
  pList.appendChild(meRow);

  const entries=Object.entries(otherCounts);
  if(entries.length===0){
    const waitRow=document.createElement('div');
    waitRow.className='p-row';
    const waitAv=document.createElement('div');
    waitAv.className='av other';
    waitAv.textContent='?';
    const waitNm=document.createElement('div');
    waitNm.className='p-name';
    waitNm.id='otherNm';
    waitNm.textContent='参加待ち';
    const waitCnt=document.createElement('div');
    waitCnt.className='p-cnt';
    waitCnt.id='otherCnt';
    waitCnt.textContent='0回';
    waitRow.appendChild(waitAv);
    waitRow.appendChild(waitNm);
    waitRow.appendChild(waitCnt);
    pList.appendChild(waitRow);
  } else {
    entries.forEach(([name,cnt])=>{
      const row=document.createElement('div');
      row.className='p-row';
      const av=document.createElement('div');
      av.className='av other';
      av.textContent=name.slice(0,1);
      const nm=document.createElement('div');
      nm.className='p-name';
      nm.textContent=name;
      const c=document.createElement('div');
      c.className='p-cnt';
      c.textContent=`${cnt}回`;
      row.appendChild(av);
      row.appendChild(nm);
      row.appendChild(c);
      pList.appendChild(row);
    });
  }
}

// 翻訳トグル（MyMemory API — 月500万文字まで無料・APIキー不要）
async function toggleTrans(id, text){
  const el  = document.getElementById(`tr-${id}`);
  const btn = el.parentElement.querySelector('.trans-btn');

  if(el.classList.contains('show')){
    el.classList.remove('show');
    btn.textContent = '訳を見る';
    return;
  }
  if(el.dataset.done){ el.classList.add('show'); btn.textContent = '閉じる'; return; }

  el.innerHTML = '<span class="sp"></span>翻訳中...';
  el.classList.add('show', 'loading');
  btn.textContent = '閉じる';

  try {
    const targetLang = MYMEMORY_LANG[myLang] || 'ja-JP';
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en-US|${targetLang}`;
    const res  = await fetch(url);
    const data = await res.json();
    const translated = data?.responseData?.translatedText || '翻訳できませんでした';
    el.textContent = translated;
    el.dataset.done = '1';
    el.classList.remove('loading');
  } catch(e) {
    el.textContent = '翻訳に失敗しました（ネットワークを確認してください）';
    el.classList.remove('loading');
  }
}
