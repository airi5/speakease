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

// Supabase Realtime WebSocketでリアルタイム受信（messagesテーブル）
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
      const record = msg.payload?.data?.record || msg.payload?.record;
      if (!record) return;
      if (record.room_code !== roomCode) return;

      // UPDATEイベントの処理
      const eventType = msg.payload?.data?.type || msg.payload?.type;
      if(eventType === 'UPDATE'){
        if(record.deleted){
          const el = document.getElementById(`entry-${record.id}`);
          if(el) el.remove();
        }
        if(record.question){
          const textEl = document.getElementById(`text-${record.id}`);
          if(textEl && !textEl.textContent.endsWith('？')){
            textEl.textContent = textEl.textContent + '？';
          }
        }
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

// roomsテーブル専用のWebSocket（話題同期用）
let roomsWs = null;
let roomsHeartbeatInt = null;

function sbSubscribeRooms() {
  const wsUrl = `wss://${SB_URL.replace('https://', '')}/realtime/v1/websocket?apikey=${SB_KEY}&vsn=1.0.0`;
  roomsWs = new WebSocket(wsUrl);
  roomsWs.onopen = () => {
    roomsWs.send(JSON.stringify({
      topic:   'realtime:public:rooms',
      event:   'phx_join',
      payload: {
        config: {
          broadcast:  { self: false },
          presence:   { key: '' },
          postgres_changes: [
            {
              event:  '*',
              schema: 'public',
              table:  'rooms',
              filter: `room_code=eq.${roomCode}`,
            }
          ]
        }
      },
      ref: '2',
    }));
  };
  roomsWs.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      const record = msg.payload?.data?.record || msg.payload?.record;
      if (!record) return;
      if (record.room_code !== roomCode) return;
      const topic = record.current_topic;
      if(topic) onTopicReceived(topic);
    } catch(err) { console.error('rooms ws error:', err); }
  };
  roomsWs.onerror = (e) => console.error('rooms ws error:', e);
  roomsWs.onclose = () => {
    setTimeout(() => { if (roomCode) sbSubscribeRooms(); }, 3000);
  };
  if(roomsHeartbeatInt) clearInterval(roomsHeartbeatInt);
  roomsHeartbeatInt = setInterval(() => {
    if (roomsWs && roomsWs.readyState === WebSocket.OPEN) {
      roomsWs.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: '0' }));
    }
  }, 30000);
}

// 発言を削除（deleted=trueに更新）
async function sbDelete(entryId) {
  await fetch(`${SB_URL}/rest/v1/messages?id=eq.${entryId}`, {
    method: 'PATCH',
    headers: { ...SB_HEADERS, 'Prefer': 'return=minimal' },
    body: JSON.stringify({ deleted: true }),
  });
}

// ？マークを追加（question=trueに更新）
async function sbMarkQuestion(entryId) {
  await fetch(`${SB_URL}/rest/v1/messages?id=eq.${entryId}`, {
    method: 'PATCH',
    headers: { ...SB_HEADERS, 'Prefer': 'return=minimal' },
    body: JSON.stringify({ question: true }),
  });
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
