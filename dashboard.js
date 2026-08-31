function toggleDash(){
  const el=document.getElementById('dashOverlay');
  el.classList.toggle('show');
  if(el.classList.contains('show'))buildDash();
}

function buildDash(){
  const dur=sessionStart?Math.floor((Date.now()-sessionStart)/1000):0;
  const mins=Math.floor(dur/60);
  const secs=dur%60;
  const durStr=`${mins}:${String(secs).padStart(2,'0')}`;
  const myEntries=sessionLog.filter(e=>e.speaker==='me');
  const myWords=myEntries.flatMap(e=>
    e.text.toLowerCase().replace(/[^a-zA-Z\s]/g,'').split(/\s+/).filter(w=>w.length>3)
  );
  const freq={};
  myWords.forEach(w=>{freq[w]=(freq[w]||0)+1;});
  const topW=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8).map(e=>e[0]);
  const wtcItems=t('wtc');

  // log-onlyのときはツール体験を前提とした qa3〜qa8 を出さない
  const qaList = IS_LOG_ONLY
    ? [
        {id:'qa1',lo:'qa1lo',hi:'qa1hi',q:'qa1q'},
        {id:'qa2',lo:'qa2lo',hi:'qa2hi',q:'qa2q'},
      ]
    : [
        {id:'qa1',lo:'qa1lo',hi:'qa1hi',q:'qa1q'},
        {id:'qa2',lo:'qa2lo',hi:'qa2hi',q:'qa2q'},
        {id:'qa3',lo:'qa3lo',hi:'qa3hi',q:'qa3q'},
        {id:'qa4',lo:'qa4lo',hi:'qa4hi',q:'qa4q'},
        {id:'qa5',lo:'qa5lo',hi:'qa5hi',q:'qa5q'},
        {id:'qa6',lo:'qa6lo',hi:'qa6hi',q:'qa6q'},
        {id:'qa7',lo:'qa7lo',hi:'qa7hi',q:'qa7q'},
        {id:'qa8',lo:'qa8lo',hi:'qa8hi',q:'qa8q'},
      ];

  document.getElementById('dashTitle').textContent=t('dashTitle');
  document.getElementById('dashClose').textContent=t('dashClose');

  document.getElementById('dashContent').innerHTML=`
    <div style="text-align:center;padding:20px 0 10px">
      <div style="font-size:28px;font-weight:900;color:var(--ink);margin-bottom:6px">${t('greatJob')}</div>
      <div style="font-size:13px;color:var(--ink3);font-family:'Noto Sans JP',sans-serif">${t('dashSub')}</div>
    </div>

    <div class="stats">
      <div class="stat blue"><div class="stat-v">${myEntries.length}</div><div class="stat-l">${t('statSpeaks')}</div></div>
      <div class="stat"><div class="stat-v">${myTokens.length}</div><div class="stat-l">${t('statWords')}</div></div>
      <div class="stat"><div class="stat-v">${transClickCount}</div><div class="stat-l">${t('statTrans')}</div></div>
      <div class="stat"><div class="stat-v">${wbOpenCount}</div><div class="stat-l">${t('statWB')}</div></div>
    </div>
    <div class="stats" style="margin-top:0">
      <div class="stat"><div class="stat-v">${durStr}</div><div class="stat-l">${t('statTime')}</div></div>
      <div class="d-card" style="grid-column:span 3;padding:14px 16px">
        <div class="d-card-t">${t('statTopWords')}</div>
        <div class="wchips">${topW.length
          ?topW.map(w=>`<span class="wc">${esc(w)}</span>`).join('')
          :`<span style="font-size:12px;color:var(--ink3)">${t('noData')}</span>`}
        </div>
      </div>
    </div>

    <div class="d-card" style="margin-top:12px">
      <div style="font-size:15px;font-weight:900;color:var(--ink);margin-bottom:16px">
        📝 ${t('surveyTitle')}
      </div>
      <div style="display:flex;flex-direction:column;gap:20px">

        <div style="font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3)">
          ${t('surveySection1')}
        </div>

        ${qaList.map(item=>`
          <div>
            <div style="font-size:13px;font-weight:700;margin-bottom:8px">${t(item.q)}</div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:11px;color:var(--ink3)">${t(item.lo)}</span>
              <div style="display:flex;gap:6px" id="${item.id}">
                ${[1,2,3,4,5,6].map(n=>`
                  <button onclick="selectQ('${item.id}',${n},this)"
                    style="width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border2);
                    background:var(--white);font-size:13px;font-weight:700;cursor:pointer;
                    font-family:'Nunito',sans-serif;transition:all .15s">${n}</button>`).join('')}
              </div>
              <span style="font-size:11px;color:var(--ink3)">${t(item.hi)}</span>
            </div>
          </div>`).join('')}

        <div style="font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-top:8px">
          ${t('surveySection2')}
        </div>
        <div style="font-size:11px;color:var(--ink3);margin-top:-12px">${t('surveyWTCNote')}</div>

        ${wtcItems.map((q,i)=>`
          <div>
            <div style="font-size:13px;font-weight:700;margin-bottom:8px">${i+1}. ${q}</div>
            <div style="display:flex;gap:6px" id="wtc${i+1}">
              ${[1,2,3,4,5,6].map(n=>`
                <button onclick="selectQ('wtc${i+1}',${n},this)"
                  style="width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border2);
                  background:var(--white);font-size:13px;font-weight:700;cursor:pointer;
                  font-family:'Nunito',sans-serif;transition:all .15s">${n}</button>`).join('')}
            </div>
          </div>`).join('')}

        <div>
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">${t('surveyFree')}</div>
          <textarea id="qFree"
            style="width:100%;padding:10px;border:1.5px solid var(--border2);
            border-radius:var(--rs);font-size:13px;resize:vertical;min-height:80px;outline:none"
            placeholder="${t('surveyFreePH')}"></textarea>
        </div>

        <button onclick="submitSurvey()"
          style="padding:13px;border-radius:var(--r);border:none;
          background:var(--blue);color:#fff;font-size:15px;font-weight:800;
          cursor:pointer;font-family:'Nunito',sans-serif">
          ${t('surveySubmit')}
        </button>
        <div id="surveyMsg" style="font-size:12px;text-align:center;color:var(--green)"></div>
      </div>
    </div>`;
}

const surveyAnswers={};
function selectQ(qId,val,btn){
  surveyAnswers[qId]=val;
  document.querySelectorAll(`#${qId} button`).forEach(b=>{
    b.style.background='var(--white)';
    b.style.borderColor='var(--border2)';
    b.style.color='var(--ink)';
  });
  btn.style.background='var(--blue)';
  btn.style.borderColor='var(--blue)';
  btn.style.color='#fff';
}

async function submitSurvey(){
  const msg=document.getElementById('surveyMsg');
  const submitBtn=document.querySelector('button[onclick="submitSurvey()"]');
  const free=document.getElementById('qFree').value.trim();
  const payload={
    room_code:  roomCode,
    person_id:  myPersonId,
    name:       myName,
    qa1:surveyAnswers['qa1']||null, qa2:surveyAnswers['qa2']||null,
    qa3:surveyAnswers['qa3']||null, qa4:surveyAnswers['qa4']||null,
    qa5:surveyAnswers['qa5']||null, qa6:surveyAnswers['qa6']||null,
    qa7:surveyAnswers['qa7']||null, qa8:surveyAnswers['qa8']||null,
    wtc1:surveyAnswers['wtc1']||null, wtc2:surveyAnswers['wtc2']||null,
    wtc3:surveyAnswers['wtc3']||null, wtc4:surveyAnswers['wtc4']||null,
    wtc5:surveyAnswers['wtc5']||null, wtc6:surveyAnswers['wtc6']||null,
    wtc7:surveyAnswers['wtc7']||null,
    free_text: free,
    trans_count: transClickCount,
    wb_count:    wbOpenCount,
    talk_sec:    sessionStart ? Math.round((Date.now()-sessionStart)/1000) : 0,
    created_at: new Date().toISOString(),
  };
  try{
    await fetch(`${SB_URL}/rest/v1/surveys`,{
      method:'POST',
      headers:{...SB_HEADERS,'Prefer':'return=minimal'},
      body:JSON.stringify(payload),
    });
    // 送信完了ページを表示
    document.getElementById('dashContent').innerHTML=`
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
        min-height:60vh;text-align:center;gap:16px">
        <div style="font-size:60px">✅</div>
        <div style="font-size:24px;font-weight:900;color:var(--ink)">${t('surveyDone')}</div>
        <div style="font-size:14px;color:var(--ink3);max-width:320px;line-height:1.7">
          ${myLang==='ja'?'ご協力ありがとうございました。ページを閉じてください。'
            :myLang==='ko'?'참여해 주셔서 감사합니다. 페이지를 닫아주세요.'
            :myLang==='zh'?'感谢您的参与。请关闭页面。'
            :'Thank you for your participation. You may close this page.'}
        </div>
      </div>`;
    if(submitBtn) submitBtn.disabled=true;
  }catch(e){
    msg.style.color='var(--rose)';
    msg.textContent=t('surveyError');
  }
}

function dlCSV(){
  if(!sessionLog.length){alert('No data.');return;}
  const parts=roomCode.split('-');
  const schoolPair=parts[0]||'';
  const groupId=parts[1]||'';
  const round=parts[2]||'';
　const mode=(parts[3]||'').toUpperCase();
　const toolUsed=mode==='L'?'No':'Yes';
  const logRows=sessionLog.map(e=>
    `"${e.time||''}","${e.name}","${e.speaker}","${e.text.replace(/"/g,'""')}"`
  );
  const logCSV='\uFEFF時刻,話者名,役割,発言（英語）\n'+logRows.join('\n');
  // グループ全体の沈黙時間を計算
  // 全発言を時系列に並べてタイムスタンプの差分を計算
  const allEntries=[...sessionLog].sort((a,b)=>(a.timestamp||0)-(b.timestamp||0));
  const groupSilences=[];
  for(let i=1;i<allEntries.length;i++){
    const gap=Math.round(((allEntries[i].timestamp||0)-(allEntries[i-1].timestamp||0))/1000);
    if(gap>=3){
      groupSilences.push({
        duration_sec: gap,
        after_speaker: allEntries[i-1].name,
        before_speaker: allEntries[i].name,
      });
    }
  }
  const avgGroupSil=groupSilences.length
    ?Math.round(groupSilences.reduce((a,s)=>a+s.duration_sec,0)/groupSilences.length):0;

  const silRows=groupSilences.map((s,i)=>
    `${i+1},${s.duration_sec},${s.after_speaker},${s.before_speaker}`
  );
  const silCSV='\n\nグループ沈黙ログ\n#,沈黙時間（秒）,直前の話者,直後の話者\n'+silRows.join('\n');

  // 理解度共有ボタンのログ（誰が・いつ・どのレベルを押したか）
  const uLogs = typeof understandingLogs !== 'undefined' ? understandingLogs : [];
  const uRows = uLogs.map((u,i)=>
    `${i+1},${new Date(u.timestamp).toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit',second:'2-digit'})},${u.name},${u.level}`
  );
  const uCSV = '\n\n理解度共有ログ\n#,時刻,名前,レベル\n'+uRows.join('\n');

  const dur=sessionStart?Math.round((Date.now()-sessionStart)/1000):0;
  const avgSil=avgGroupSil;
  // HelpBoxはWordBridgeと対になる計測値。未定義環境（旧state.js）でも壊れないようフォールバックする
  const hbCount = typeof hbOpenCount !== 'undefined' ? hbOpenCount : 0;
  const hbSec   = typeof hbTotalSec  !== 'undefined' ? hbTotalSec  : 0;
  const summaryCSV=`\n\nサマリー\n項目,値\n`+
    `個人ID,${myPersonId}\nニックネーム,${myName}\nルームコード,${roomCode}\n`+
    `学校ペア,${schoolPair}\nグループ,${groupId}\n実施回,${round}\nツール使用,${toolUsed}\n`+
    `発言回数,${cntMe}\n相手の発言回数,${cntOther}\n`+
    `token数,${myTokens.length}\ntype数,${myTypes.size}\n`+
    `翻訳回数,${transClickCount}\nWordBridge使用回数,${wbOpenCount}\n`+
    `WordBridge使用時間（秒）,${wbTotalSec}\n`+
    `HelpBox使用回数,${hbCount}\nHelpBox使用時間（秒）,${hbSec}\n`+
    `理解度共有ボタン使用回数,${uLogs.length}\n`+
    `沈黙回数,${silenceLogs.length}\n平均沈黙時間（秒）,${avgSil}\n会話時間（秒）,${dur}\n`;
  const full=logCSV+silCSV+uCSV+summaryCSV;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([full],{type:'text/csv;charset=utf-8'}));
  a.download=`speakease_${myPersonId}_${roomCode}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}
