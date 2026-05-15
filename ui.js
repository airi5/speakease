function renderEntry(entry, speaker){
  const empty = document.getElementById('logEmpty');
  if(empty) empty.remove();
  const area = document.getElementById('logArea');

  const div = document.createElement('div');
  div.className = `entry ${speaker}`;
  div.id = `entry-${entry.id}`;

  const meta = document.createElement('div');
  meta.className = 'e-meta';
  const nameSpan = document.createElement('span');
  nameSpan.className = 'e-name';
  nameSpan.textContent = entry.name;
  const timeSpan = document.createElement('span');
  timeSpan.className = 'e-time';
  timeSpan.textContent = entry.time || '';
  meta.appendChild(nameSpan);
  meta.appendChild(timeSpan);

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const bEn = document.createElement('div');
  bEn.className = 'b-en';
  bEn.id = `text-${entry.id}`;
  bEn.textContent = entry.text;
  const bTrans = document.createElement('div');
  bTrans.className = 'b-trans';
  bTrans.id = `tr-${entry.id}`;
  const bActions = document.createElement('div');
  bActions.className = 'b-actions';

  // 訳を見るボタン
  const transBtn = document.createElement('button');
  transBtn.className = 'trans-btn';
  transBtn.textContent = t('seeTranslation');
  transBtn.addEventListener('click', ()=>toggleTrans(entry.id, entry.text, transBtn, bTrans));
  bActions.appendChild(transBtn);

  // 自分の発言のみ：削除ボタン・？ボタン
  if(speaker === 'me'){
    // ？ボタン
    const qBtn = document.createElement('button');
    qBtn.className = 'trans-btn';
    qBtn.textContent = '？';
    qBtn.title = 'Mark as question';
    qBtn.addEventListener('click', ()=>markAsQuestion(entry.id, bEn));
    bActions.appendChild(qBtn);

    // 削除ボタン
    const delBtn = document.createElement('button');
    delBtn.className = 'trans-btn';
    delBtn.textContent = '🗑';
    delBtn.title = 'Delete';
    delBtn.addEventListener('click', ()=>deleteEntry(entry.id, div));
    bActions.appendChild(delBtn);
  }

  bubble.appendChild(bEn);
  bubble.appendChild(bTrans);
  bubble.appendChild(bActions);
  div.appendChild(meta);
  div.appendChild(bubble);
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function updateParticipantList(){
  const pList=document.getElementById('pList');
  const totalOther=Object.values(otherCounts).reduce((a,b)=>a+b,0);
  cntOther=totalOther;

  pList.innerHTML='';

  const meRow=document.createElement('div');
  meRow.className='p-row';
  const meAv=document.createElement('div');
  meAv.className='av me';
  meAv.textContent=myName.slice(0,1);
  const meNm=document.createElement('div');
  meNm.className='p-name';
  meNm.textContent=`${myName}${t('you')}`;
  const meCnt=document.createElement('div');
  meCnt.className='p-cnt';
  meCnt.id='myCnt';
  meCnt.textContent=`${cntMe}${t('times')}`;
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
    waitNm.textContent=t('waitingUser');
    const waitCnt=document.createElement('div');
    waitCnt.className='p-cnt';
    waitCnt.id='otherCnt';
    waitCnt.textContent=`0${t('times')}`;
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
      c.textContent=`${cnt}${t('times')}`;
      row.appendChild(av);
      row.appendChild(nm);
      row.appendChild(c);
      pList.appendChild(row);
    });
  }
}

async function toggleTrans(id, text, btn, el){
  if(!btn) btn=document.querySelector(`#tr-${id}`).parentElement.querySelector('.trans-btn');
  if(!el)  el=document.getElementById(`tr-${id}`);

  if(el.classList.contains('show')){
    el.classList.remove('show');
    btn.textContent=t('seeTranslation');
    return;
  }
  if(el.dataset.done){
    el.classList.add('show');
    btn.textContent=t('close');
    return;
  }

  // 翻訳ボタン押下回数をカウント
  transClickCount++;

  el.innerHTML=`<span class="sp"></span>${t('translating')}`;
  el.classList.add('show','loading');
  btn.textContent=t('close');

  try{
    const targetLang=MYMEMORY_LANG[myLang]||'en-US';
    const url=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en-US|${targetLang}`;
    const res=await fetch(url);
    const data=await res.json();
    const translated=data?.responseData?.translatedText||t('transFail');
    el.textContent=translated;
    el.dataset.done='1';
    el.classList.remove('loading');
  }catch(e){
    el.textContent=t('transError');
    el.classList.remove('loading');
  }
}

// ① 発言を削除
function deleteEntry(id, divEl){
  divEl.remove();
  const idx = sessionLog.findIndex(e => e.id === id);
  if(idx !== -1) sessionLog.splice(idx, 1);
  cntMe = sessionLog.filter(e => e.speaker === 'me').length;
  updateParticipantList();
}

// ② 質問マーク追加
function markAsQuestion(id, bEnEl){
  if(bEnEl.textContent.endsWith('？')) return;
  bEnEl.textContent = bEnEl.textContent + '？';
  const entry = sessionLog.find(e => e.id === id);
  if(entry) entry.text = bEnEl.textContent;
}
