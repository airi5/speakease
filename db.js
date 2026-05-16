// 発言をSupabaseに保存
async function sbInsert(entry) {
  const res = await fetch(`${SB_URL}/rest/v1/messages`, {
    method:  'POST',
    headers: { ...SB_HEADERS, 'Prefer': 'return=representation' },
    body: JSON.stringify({
      room_code: roomCode,
      name:      entry.name,
      lang:      entry.lang,
      text:      entry.text,
      speaker:   'me',
    }),
  });
  const data = await res.json();
  return data?.[0]?.id || null;
}

// 同一ルームの既存発言を取得
async function sbSelect() {
  const res = await fetch(
    `${SB_URL}/rest/v1/messages?room_code=eq.${encodeURIComponent(roomCode)}&order=created_at.asc`,
    { headers: SB_HEADERS }
  );
  return await res.json();
}

// Supabase Realtime WebSocketでリアルタイム受信
function sbSubscribe() {
  const wsUrl = `wss://${SB_URL.replace('https://', '')}/realtime/v1/websocket?apikey=${SB_KEY}&vsn=1.0.0`;
  realtimeWs = new WebSocket(wsUrl);
  realtimeWs.onopen = () => {
    realtimeWs.send(JSON.stringify({
      topic:   'realtime:public:messages',
      event:   'phx_join',
      payload: {
        config: {
          broadcast:  { self: false },
          presence:   { key: '' },
          postgres_changes: [
            {
              event:  'INSERT',
              schema: 'public',
              table:  'messages',
              filter: `room_code=eq.${roomCode}`,
            },
            {
              event:  'UPDATE',
              schema: 'public',
              table:  'messages',
              filter: `room_code=eq.${roomCode}`,
            },
            {
              event:  '*',
              schema: 'public',
              table:  'rooms',
              filter: `room_code=eq.${roomCode}`,
            }
          ]
        }
      },
      ref: '1',
    }));
  };
  realtimeWs.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      console.log('ws msg type:', msg.payload?.data?.type, 'record:', JSON.stringify(msg.payload?.data?.record));

      const record = msg.payload?.data?.record || msg.payload?.record;
      if (!record) return;
      if (record.room_code !== roomCode) return;

      // UPDATEイベントの処理
      const eventType = msg.payload?.data?.type || msg.payload?.type;
      if(eventType === 'UPDATE'){
        console.log('UPDATE received:', record.id, 'deleted:', record.deleted, 'question:', record.question);
        if(record.deleted){
          const el = document.getElementById(`entry-${record.id}`);
          console.log('looking for entry-'+record.id, 'found:', el);
          if(el) el.remove();
        }
        if(record.question){
          const textEl = document.getElementById(`text-${record.id}`);
          console.log('looking for text-'+record.id, 'found:', textEl);
          if(textEl && !textEl.textContent.endsWith('？')){
            textEl.textContent = textEl.textContent + '？';
          }
        }
        return;
      }

      // roomsテーブルのトピック変更
      if(msg.payload?.data?.table === 'rooms'){
        const topic = record.current_topic;
        if(topic) onTopicReceived(topic);
        return;
      }

      // INSERTイベントの処理
      if (record.name === myName) return;
      const entry = {
        ...record,
        time: new Date(record.created_at).toLocaleTimeString('ja-JP', { hour:'2-digit', minute:'2-digit' }),
      };
      addOtherEntry(entry);
    } catch(err) { console.error('ws msg error:', err); }
  };
  realtimeWs.onerror = (e) => console.error('ws error:', e);
  realtimeWs.onclose = () => {
    setTimeout(() => { if (roomCode) sbSubscribe(); }, 3000);
  };
  if(heartbeatInt) clearInterval(heartbeatInt);
  heartbeatInt = setInterval(() => {
    if (realtimeWs && realtimeWs.readyState === WebSocket.OPEN) {
      realtimeWs.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: '0' }));
    }
  }, 30000);
}

// 発言を削除（deleted=trueに更新）
async function sbDelete(entryId) {
  console.log('sbDelete called with id:', entryId);
  const res = await fetch(`${SB_URL}/rest/v1/messages?id=eq.${entryId}`, {
    method: 'PATCH',
    headers: { ...SB_HEADERS, 'Prefer': 'return=representation' },
    body: JSON.stringify({ deleted: true }),
  });
  const data = await res.json();
  console.log('sbDelete response:', JSON.stringify(data));
}

// ？マークを追加（question=trueに更新）
async function sbMarkQuestion(entryId) {
  console.log('sbMarkQuestion called with id:', entryId);
  const res = await fetch(`${SB_URL}/rest/v1/messages?id=eq.${entryId}`, {
    method: 'PATCH',
    headers: { ...SB_HEADERS, 'Prefer': 'return=representation' },
    body: JSON.stringify({ question: true }),
  });
  const data = await res.json();
  console.log('sbMarkQuestion response:', JSON.stringify(data));
}

// 話題をSupabaseに保存・全員に同期
async function sbSetTopic(topicKey){
  await fetch(`${SB_URL}/rest/v1/rooms`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      room_code: roomCode,
      current_topic: topicKey,
      updated_at: new Date().toISOString(),
    }),
  });
}

// 話題を取得
async function sbGetTopic(){
  const res = await fetch(
    `${SB_URL}/rest/v1/rooms?room_code=eq.${encodeURIComponent(roomCode)}`,
    { headers: SB_HEADERS }
  );
  const data = await res.json();
  return data?.[0]?.current_topic || null;
}
