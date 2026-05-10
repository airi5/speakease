function toggleDash(){
  const el=document.getElementById('dashOverlay');
  el.classList.toggle('show');
  if(el.classList.contains('show'))buildDash();
}

function buildDash(){
  const dur=sessionStart?Math.floor((Date.now()-sessionStart)/1000):0;
  const durStr=`${Math.floor(dur/60)}分${dur%60}秒`;
  const myEntries=sessionLog.filter(e=>e.speaker==='me');
  const otEntries=sessionLog.filter(e=>e.speaker==='other');
  const myWords=myEntries.flatMap(e=>e.text.toLowerCase().split(/\s+/).filter(w=>w.length>3));
  const freq={};myWords.forEach(w=>{freq[w]=(freq[w]||0)+1;});
  const topW=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8).map(e=>e[0]);

  const avgSil=silenceLogs.length
    ? Math.round(silenceLogs.reduce((a,s)=>a+s.duration_sec,0)/silenceLogs.length)
    : 0;

  // 全参加者の発言量バー（最大カウントを100%として相対表示）
  const allParticipants=[
    {name:myName,count:myEntries.length,cls:'blue',label:'（あなた）'},
    ...Object.entries(otherCounts).map(([n,c])=>({name:n,count:c,cls:'green',label:''}))
  ];
  const maxCount=Math.max(...allParticipants.map(p=>p.count),1);
  const barsHTML=allParticipants.map(p=>`
    <div class="bar-row">
      <div class="bar-nm ${p.cls}">${esc(p.name)}${p.label}</div>
      <div class="bar-track"><div class="bar-fill ${p.cls}" style="width:${Math.round(p.count/maxCount*100)}%"></div></div>
      <div class="bar-v">${p.count}回</div>
    </div>`).join('');

  document.getElementById('dashContent').innerHTML=`
    <div class="dl-btns">
      <button class="dl-btn" onclick="dlCSV()">CSVダウンロード</button>
    </div>
    <div class="stats">
      <div class="stat blue"><div class="stat-v">${myEntries.length}</div><div class="stat-l">${esc(myName)}の発言回数</div></div>
      <div class="stat green"><div class="stat-v">${otEntries.length}</div><div class="stat-l">他の参加者の発言回数（合計）</div></div>
      <div class="stat"><div class="stat-v">${myTokens.length}</div><div class="stat-l">${esc(myName)}の総単語数（token）</div></div>
      <div class="stat"><div class="stat-v">${myTypes.size}</div><div class="stat-l">${esc(myName)}の異なり語数（type）</div></div>
    </div>
    <div class="stats" style="margin-top:0">
      <div class="stat"><div class="stat-v">${silenceLogs.length}</div><div class="stat-l">沈黙回数（3秒以上）</div></div>
      <div class="stat"><div class="stat-v">${avgSil}秒</div><div class="stat-l">平均沈黙時間</div></div>
      <div class="stat"><div class="stat-v">${wbOpenCount}</div><div class="stat-l">WordBridge使用回数</div></div>
      <div class="stat"><div class="stat-v">${durStr}</div><div class="stat-l">会話時間</div></div>
    </div>
    <div class="dash-row">
      <div class="d-card">
        <div class="d-card-t">発言量の比較</div>
        ${barsHTML}
      </div>
      <div class="d-card">
        <div class="d-card-t">${esc(myName)}がよく使った単語</div>
        <div class="wchips">${topW.length
          ?topW.map(w=>`<span class="wc">${esc(w)}</span>`).join('')
          :'<span style="font-size:12px;color:var(--ink3)">データなし</span>'}</div>
      </div>
    </div>
    <table class="log-tbl">
      <thead><tr><th>時刻</th><th>話者</th><th>発言（英語）</th></tr></thead>
      <tbody>${sessionLog.map(e=>`
        <tr>
          <td>${e.time||'--'}</td>
          <td class="${e.speaker==='me'?'s-me':'s-other'}">${esc(e.name)}</td>
          <td>${esc(e.text)}</td>
        </tr>`).join('')||'<tr><td colspan="3" style="text-align:center;color:var(--ink3)">記録なし</td></tr>'}
      </tbody>
    </table>`;
}

function dlCSV(){
  if(!sessionLog.length){alert('記録がありません');return;}

  const logRows=sessionLog.map(e=>
    `"${e.time||''}","${e.name}","${e.speaker}","${e.text.replace(/"/g,'""')}"`
  );
  const logCSV='﻿時刻,話者名,役割,発言（英語）\n'+logRows.join('\n');

  const silRows=silenceLogs.map((s,i)=>
    `${i+1},${s.duration_sec},${s.after_speaker}`
  );
  const silCSV='\n\n沈黙ログ\n#,沈黙時間（秒）,直前の話者\n'+silRows.join('\n');

  const dur=sessionStart?Math.round((Date.now()-sessionStart)/1000):0;
  const avgSil=silenceLogs.length
    ? Math.round(silenceLogs.reduce((a,s)=>a+s.duration_sec,0)/silenceLogs.length)
    : 0;
  const summaryCSV=`\n\nサマリー\n項目,値\n`+
    `自分の発言回数,${cntMe}\n`+
    `相手の発言回数,${cntOther}\n`+
    `自分のtoken数（総単語数）,${myTokens.length}\n`+
    `自分のtype数（異なり語数）,${myTypes.size}\n`+
    `沈黙回数（3秒以上）,${silenceLogs.length}\n`+
    `平均沈黙時間（秒）,${avgSil}\n`+
    `WordBridge使用回数,${wbOpenCount}\n`+
    `WordBridge合計使用時間（秒）,${wbTotalSec}\n`+
    `会話時間（秒）,${dur}\n`;

  const full=logCSV+silCSV+summaryCSV;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([full],{type:'text/csv;charset=utf-8'}));
  a.download=`speakease_${roomCode}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}
