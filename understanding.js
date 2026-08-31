// =====================================================================
// 理解度共有ボタン（😊😐😕）
// 誰でも押せる双方向の機能。押した本人の理解度を、参加者リストの
// 自分の名前の横にアイコンで表示する。もう一度同じボタンを押すか、
// 5分経つと自動で消える。
// =====================================================================

const UNDERSTANDING_LEVELS = {
  happy:   { emoji: '😊', label: 'よくわかった' },
  neutral: { emoji: '😐', label: 'だいたいわかった' },
  confused:{ emoji: '😕', label: 'よくわからなかった' },
};
const UNDERSTANDING_EXPIRE_MS = 5 * 60 * 1000; // 5分で自動的に消える

let myUnderstandingLevel = null;     // 'happy' | 'neutral' | 'confused' | null
let myUnderstandingTimeoutId = null;

// 相手の理解度表示: { name: 'happy'|'neutral'|'confused' }
const otherUnderstanding = {};

// CSV出力用ログ: { name, level, timestamp }
const understandingLogs = [];

// ボタンを押したとき（自分の理解度をセット／トグルで解除）
function setUnderstanding(level){
  if(!UNDERSTANDING_LEVELS[level]) return;

  // 同じレベルをもう一度押したら解除する
  if(myUnderstandingLevel === level){
    clearMyUnderstanding();
    return;
  }

  myUnderstandingLevel = level;
  understandingLogs.push({ name: myName, level, timestamp: Date.now() });

  // 5分後に自動で消す
  if(myUnderstandingTimeoutId) clearTimeout(myUnderstandingTimeoutId);
  myUnderstandingTimeoutId = setTimeout(clearMyUnderstanding, UNDERSTANDING_EXPIRE_MS);

  updateUnderstandingButtons();
  if(typeof updateParticipantList === 'function') updateParticipantList();

  // Supabaseで他の参加者に同期する
  // TODO: db.js の実装に合わせて実際の関数名・テーブル構成を確認して接続する
  if(typeof sbSetUnderstanding === 'function'){
    sbSetUnderstanding(myName, level);
  }
}

// 自分の理解度表示を消す（手動・自動どちらも通る共通処理）
function clearMyUnderstanding(){
  myUnderstandingLevel = null;
  if(myUnderstandingTimeoutId){
    clearTimeout(myUnderstandingTimeoutId);
    myUnderstandingTimeoutId = null;
  }
  updateUnderstandingButtons();
  if(typeof updateParticipantList === 'function') updateParticipantList();

  // TODO: db.js の実装に合わせて接続する（level:null で「消えた」ことを伝える）
  if(typeof sbSetUnderstanding === 'function'){
    sbSetUnderstanding(myName, null);
  }
}

// 他の参加者が理解度ボタンを押した／消したとき（Supabaseから受信）
// level が null の場合はその人の表示を消す
function onUnderstandingReceived(name, level){
  if(level){
    otherUnderstanding[name] = level;
    understandingLogs.push({ name, level, timestamp: Date.now() });
  } else {
    delete otherUnderstanding[name];
  }
  if(typeof updateParticipantList === 'function') updateParticipantList();
}

// ボタン自体の見た目（押されているものをハイライト）を更新
function updateUnderstandingButtons(){
  Object.keys(UNDERSTANDING_LEVELS).forEach(level => {
    const btn = document.getElementById(`ubtn-${level}`);
    if(btn) btn.classList.toggle('active', myUnderstandingLevel === level);
  });
}

// 参加者リストで使う: その人の現在の理解度絵文字を返す（無ければ空文字）
function getUnderstandingEmoji(name){
  const level = name === myName ? myUnderstandingLevel : otherUnderstanding[name];
  return level ? UNDERSTANDING_LEVELS[level].emoji : '';
}
