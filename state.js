// 参加者情報
let myName = '', myLang = 'ja', roomCode = '';

// 音声認識
let recognition = null, isRec = false;

// セッションログ・カウント
let sessionLog = [], cntMe = 0, cntOther = 0;

// タイマー
let sessionStart = null, timerInt = null;

// WordBridgeドロワー
let drawerOpen = false;

// 沈黙時間の計測
let lastSpeechTime = null;
let silenceLogs = [];

// 語彙カウント
let myTokens = [];
let myTypes = new Set();

// WordBridge使用統計
let wbOpenCount = 0;
let wbOpenTime = null;
let wbTotalSec = 0;

// 複数人対応：参加者ごとのカウント管理 { name: count }
const otherCounts = {};

// Supabase Realtime WebSocket
let realtimeWs = null;
let heartbeatInt = null;
