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

  const WTC_ITEMS=[
    '英語を話すとき、他人の評価が気になる',
    '英語を話すとき、文法が間違っているのではないかと不安になる',
    '1時間以上英語で話し続けることは難しいと思う',
    '英語を話すとき、自分から会話を始めることができる',
    '会話が終わった後、もっとうまく話せたのにと後悔する',
    '英語を使っている時間は楽しい',
    '今後もっと英語を勉強したいと思う',
  ];

  document.getElementById('dashContent').innerHTML=`

    <!-- お疲れさま -->
    <div style="text-align:center;padding:20px 0 10px">
      <div style="font-size:28px;font-weight:900;color:var(--ink);margin-bottom:6px">Great job! 🎉</div>
      <div style="font-size:13px;color:var(--ink3);font-family:'Noto Sans JP',sans-serif">
        会話お疲れさまでした。あなたの記録です。
      </div>
    </div>

    <!-- 6項目 -->
    <div class="stats">
      <div class="stat blue">
        <div class="stat-v">${myEntries.length}</div>
        <div class="stat-l">発言回数</div>
      </div>
      <div class="stat">
        <div class="stat-v">${myTokens.length}</div>
        <div class="stat-l">総単語数</div>
      </div>
      <div class="stat">
        <div class="stat-v">${transClickCount}</div>
        <div class="stat-l">翻訳ボタンを押した回数</div>
      </div>
      <div class="stat">
        <div class="stat-v">${wbOpenCount}</div>
        <div class="stat-l">単語提案を使った回数</div>
      </div>
    </div>
    <div class="stats" style="margin-top:0">
      <div class="stat">
        <div class="stat-v">${durStr}</div>
        <div class="stat-l">対話時間</div>
      </div>
      <div class="d-card" style="grid-column:span 3;padding:14px 16px">
        <div class="d-card-t">よく使った単語</div>
        <div class="wchips">${topW.length
          ?topW.map(w=>`<span class="wc">${esc(w)}</span>`).join('')
          :'<span style="font-size:12px;color:var(--ink3)">データなし</span>'}
        </div>
      </div>
    </div>

    <!-- アンケート -->
    <div class="d-card" style="margin-top:12px">
      <div style="font-size:15px;font-weight:900;color:var(--ink);margin-bottom:16px">
        📝 アンケート（所要時間：約3分）
      </div>
      <div style="display:flex;flex-direction:column;gap:20px">

        <!-- セクション1：今回の会話について -->
        <div style="font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-bottom:-8px">
          今回の会話について
        </div>

        ${[
          {id:'qa1', q:'今日の会話全体の満足度はどのくらいでしたか？',       lo:'不満', hi:'満足'},
          {id:'qa2', q:'今日の会話でどのくらい積極的に発言できましたか？',   lo:'できなかった', hi:'できた'},
          {id:'qa3', q:'SpeakEaseのツールは使いやすかったですか？',          lo:'使いにくい', hi:'使いやすい'},
          {id:'qa4', q:'単語提案（WordBridge）は役に立ちましたか？',         lo:'役立たない', hi:'役立った'},
          {id:'qa5', q:'リアルタイム議事録は役に立ちましたか？',             lo:'役立たない', hi:'役立った'},
          {id:'qa6', q:'またこのシステムを使って国際交流をしたいと思いますか？', lo:'思わない', hi:'思う'},
        ].map(item=>`
          <div>
            <div style="font-size:13px;font-weight:700;margin-bottom:8px">${item.q}</div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:11px;color:var(--ink3)">${item.lo}</span>
              <div style="display:flex;gap:6px" id="${item.id}">
                ${[1,2,3,4,5,6].map(n=>`
                  <button onclick="selectQ('${item.id}',${n},this)"
                    style="width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border2);
                    background:var(--white);font-size:13px;font-weight:700;cursor:pointer;
                    font-family:'Nunito',sans-serif;transition:all .15s">
                    ${n}
                  </button>`).join('')}
              </div>
              <span style="font-size:11px;color:var(--ink3)">${item.hi}</span>
            </div>
          </div>`).join('')}

        <!-- セクション2：WTCアンケート -->
        <div style="font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-bottom:-8px;margin-top:8px">
          英語・国際交流への意欲について（6件法）
        </div>
        <div style="font-size:11px;color:var(--ink3);font-family:'Noto Sans JP',sans-serif;margin-top:-12px">
          1=全く当てはまらない　〜　6=非常によく当てはまる
        </div>

        ${WTC_ITEMS.map((q,i)=>`
          <div>
            <div style="font-size:13px;font-weight:700;margin-bottom:8px">${i+1}. ${q}</div>
            <div style="display:flex;gap:6px" id="wtc${i+1}">
              ${[1,2,3,4,5,6].map(n=>`
                <button onclick="selectQ('wtc${i+1}',${n},this)"
                  style="width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border2);
                  background:var(--white);font-size:13px;font-weight:700;cursor:pointer;
                  font-family:'Nunito',sans-serif;transition:all .15s">
                  ${n}
                </button>`).join('')}
            </div>
          </div>`).join('')}

        <!-- 自由記述 -->
        <div>
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">
            自由記述（感想・改善点など）
          </div>
          <textarea id="qFree"
            style="width:100%;padding:10px;border:1.5px solid var(--border2);
            border-radius:var(--rs);font-size:13px;font-family:'Noto Sans JP',sans-serif;
            resize:vertical;min-height:80px;outline:none"
            placeholder="自由にご記入ください"></textarea>
        </div>

        <button onclick="submitSurvey()"
          style="padding:13px;border-radius:var(--r);border:none;
          background:var(--blue);color:#fff;font-size:15px;font-weight:800;
          cursor:pointer;font-family:'Nunito',sans-serif">
          回答を送信する
        </button>
        <div id="surveyMsg" style="font-size:12px;text-align:center;color:var(--green)"></div>
      </div>
    </div>

    <!-- 研究者用 -->
    <div style="margin-top:16px;text-align:right">
      <button class="dl-btn" onclick="dlCSV()" style="font-size:11px;color:var(--ink3)">
        📊 データダウンロード（研究者用）
      </button>
    </div>`;
}

// アンケート選択
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

// アンケート送信
async function submitSurvey(){
  const msg=document.getElementById('surveyMsg');
  const free=document.getElementById('qFree').value.trim();
  const payload={
    room_code:  roomCode,
    person_id:  myPersonId,
    name:       myName,
    qa1: surveyAnswers['qa1']||null,
    qa2: surveyAnswers['qa2']||null,
    qa3: surveyAnswers['qa3']||null,
    qa4: surveyAnswers['qa4']||null,
    qa5: surveyAnswers['qa5']||null,
    qa6: surveyAnswers['qa6']||null,
    wtc1: surveyAnswers['wtc1']||null,
    wtc2: surveyAnswers['wtc2']||null,
    wtc3: surveyAnswers['wtc3']||null,
    wtc4: surveyAnswers['wtc4']||null,
    wtc5: surveyAnswers['wtc5']||null,
    wtc6: surveyAnswers['wtc6']||null,
    wtc7: surveyAnswers['wtc7']||null,
    free_text: free,
    created_at: new Date().toISOString(),
  };
  try{
    await fetch(`${SB_URL}/rest/v1/surveys`,{
      method:'POST',
      headers:{...SB_HEADERS,'Prefer':'return=minimal'},
      body:JSON.stringify(payload),
    });
    msg.textContent='✅ 送信しました！ありがとうございました。';
    document.querySelector('button[onclick="submitSurvey()"]').disabled=true;
  }catch(e){
    msg.style.color='var(--rose)';
    msg.textContent='送信に失敗しました。もう一度お試しください。';
  }
}

function dlCSV(){
  if(!sessionLog.length){alert('記録がありません');return;}

  const parts=roomCode.split('-');
  const schoolPair=parts[0]||'';
  const groupId=parts[1]||'';
  const round=parts[2]||'';
  const toolUsed=round==='R1'?'あり':'なし';

  const logRows=sessionLog.map(e=>
    `"${e.time||''}","${e.name}","${e.speaker}","${e.text.replace(/"/g,'""')}"`
  );
  const logCSV='\uFEFF時刻,話者名,役割,発言（英語）\n'+logRows.join('\n');

  const silRows=silenceLogs.map((s,i)=>`${i+1},${s.duration_sec},${s.after_speaker}`);
  const silCSV='\n\n沈黙ログ\n#,沈黙時間（秒）,直前の話者\n'+silRows.join('\n');

  const dur=sessionStart?Math.round((Date.now()-sessionStart)/1000):0;
  const avgSil=silenceLogs.length
    ?Math.round(silenceLogs.reduce((a,s)=>a+s.duration_sec,0)/silenceLogs.length):0;

  const summaryCSV=`\n\nサマリー\n項目,値\n`+
    `個人ID,${myPersonId}\n`+
    `ニックネーム,${myName}\n`+
    `ルームコード,${roomCode}\n`+
    `学校ペア,${schoolPair}\n`+
    `グループ,${groupId}\n`+
    `実施回,${round}\n`+
    `ツール使用,${toolUsed}\n`+
    `発言回数,${cntMe}\n`+
    `相手の発言回数,${cntOther}\n`+
    `token数（総単語数）,${myTokens.length}\n`+
    `type数（異なり語数）,${myTypes.size}\n`+
    `翻訳ボタン押下回数,${transClickCount}\n`+
    `WordBridge使用回数,${wbOpenCount}\n`+
    `WordBridge合計使用時間（秒）,${wbTotalSec}\n`+
    `沈黙回数（3秒以上）,${silenceLogs.length}\n`+
    `平均沈黙時間（秒）,${avgSil}\n`+
    `会話時間（秒）,${dur}\n`;

  const full=logCSV+silCSV+summaryCSV;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([full],{type:'text/csv;charset=utf-8'}));
  a.download=`speakease_${myPersonId}_${roomCode}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}
