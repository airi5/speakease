// 参加者情報
let myName = '', myLang = 'en', roomCode = '', myPersonId = '';
// 音声認識
let recognition = null, isRec = false;
// セッションログ・カウント
let sessionLog = [], cntMe = 0, cntOther = 0;
// タイマー
let sessionStart = null, timerInt = null;
// WordBridgeドロワー（現在は「WordBridgeタブを表示中か」を表す値として利用）
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
// HelpBox使用統計（WordBridgeと対になる計測。switchTool()で管理）
let hbOpenCount = 0;
let hbOpenTime = null;
let hbTotalSec = 0;
// 翻訳ボタン押下回数
let transClickCount = 0;
// 複数人対応:参加者ごとのカウント管理 { name: count }
const otherCounts = {};
// Supabase Realtime WebSocket
let realtimeWs = null;
let heartbeatInt = null;
