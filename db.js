// 発言をSupabaseに保存
async function sbInsert(entry) {
  await fetch(`${SB_URL}/rest/v1/messages`, {
    method:  'POST',
    headers: { ...SB_HEADERS, 'Prefer': 'return=minimal' },
    body: JSON.stringify({
      room_code: roomCode,
      name:      entry.name,
      lang:      entry.lang,
      text:      entry.text,
      speaker:   'me',
    }),
  });
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
          postgres_changes: [{
            event:  'INSERT',
            schema: 'public',
            table:  'messages',
            filter: `room_code=eq.${roomCode}`,
          }]
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
      if (record.name === myName) return;
      if (record.room_code !== roomCode) return;

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

  // ハートビート（30秒ごと）- 再接続時に古いintervalを破棄
  if(heartbeatInt) clearInterval(heartbeatInt);
  heartbeatInt = setInterval(() => {
    if (realtimeWs && realtimeWs.readyState === WebSocket.OPEN) {
      realtimeWs.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: '0' }));
    }
  }, 30000);
}
