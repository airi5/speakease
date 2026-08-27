// =====================================================================
// HelpBox — フレーズ支援機能
// タブ1「基本フレーズ」: 自己紹介や初心者がつまずきやすい表現（レベル別・固定）
// タブ2「会話サポート」: 会話の進み具合（発言数）に応じて内容が変わる（動的）
// AIによるリアルタイム生成はAPIコストの都合で見送り、テンプレートの出し分けで対応
// =====================================================================

// ── タブ1: 基本フレーズ（レベル別・固定） ──
const HELP_FIXED_PHRASES = {
  1: [
    { en: "Hi, I'm ___.", jp: 'こんにちは、私は〜です' },
    { en: 'Nice to meet you!', jp: 'はじめまして！' },
    { en: 'Where are you from?', jp: 'どこ出身ですか？' },
    { en: "I'm a student.", jp: '学生です' },
    { en: 'I like ___.', jp: '私は〜が好きです' },
    { en: 'Can you say that again?', jp: 'もう一度言ってもらえますか？' },
    { en: "I don't understand.", jp: 'わかりません' },
    { en: 'How do you say ___ in English?', jp: '〜は英語でどう言いますか？' },
  ],
  2: [
    { en: "I'm really interested in ___.", jp: '〜にとても興味があります' },
    { en: "That's a good question.", jp: 'いい質問ですね' },
    { en: "Sorry, I didn't catch that.", jp: 'すみません、聞き取れませんでした' },
    { en: 'What do you do for fun?', jp: '趣味は何ですか？' },
    { en: "I've been learning English for ___.", jp: '〜の間、英語を勉強しています' },
    { en: 'Could you explain that a bit more?', jp: 'もう少し詳しく説明してもらえますか？' },
    { en: 'How about you?', jp: 'あなたはどうですか？' },
  ],
  3: [
    { en: "I'd love to hear your perspective on that.", jp: 'それについてのあなたの考えを聞いてみたいです' },
    { en: "That's an interesting way to put it.", jp: '面白い言い方ですね' },
    { en: "I hadn't thought about it that way before.", jp: 'そういう風に考えたことがなかったです' },
    { en: 'What made you interested in that?', jp: '何がきっかけでそれに興味を持ったんですか？' },
    { en: "I see where you're coming from.", jp: '言いたいことはわかります' },
    { en: "Let's circle back to that later.", jp: 'それについては後でまた話しましょう' },
  ],
};

// ── タブ2: 会話サポート（発言数に応じて3段階で切り替え） ──
const HELP_DYNAMIC_TIERS = {
  starting: {
    label: '会話のはじめ',
    phrases: [
      { en: "So, how's your day going?", jp: '今日はどんな一日でしたか？' },
      { en: 'This is fun, right?', jp: 'これ、楽しいですね！' },
      { en: 'Have you done this before?', jp: '前にもこういう機会はありましたか？' },
    ],
  },
  keepGoing: {
    label: '会話を広げる',
    phrases: [
      { en: 'That’s interesting, tell me more!', jp: '面白いですね、もっと教えてください！' },
      { en: 'What do you think about that?', jp: 'それについてどう思いますか？' },
      { en: 'Why do you think that happened?', jp: 'なぜそうなったと思いますか？' },
    ],
  },
  goingDeeper: {
    label: 'もう一歩踏み込む',
    phrases: [
      { en: 'Have you ever experienced something similar?', jp: '似たような経験をしたことはありますか？' },
      { en: 'What would you do differently?', jp: 'もし違う選択をするとしたら？' },
      { en: 'How do you feel about that now?', jp: '今それについてどう感じますか？' },
    ],
  },
};

let activeHelpSubTab = 'fixed';

function renderPhraseList(containerId, phrases){
  const list = document.getElementById(containerId);
  list.innerHTML = '';
  phrases.forEach(p => {
    const div = document.createElement('div');
    div.className = 'help-phrase-item';
    const en = document.createElement('div');
    en.className = 'en';
    en.textContent = p.en;
    const jp = document.createElement('div');
    jp.className = 'jp';
    jp.textContent = p.jp;
    div.appendChild(en);
    div.appendChild(jp);
    list.appendChild(div);
  });
}

// タブ1描画（select変更時にも呼ばれる）
function renderHelpFixedTab(level){
  const lvl = level || Number(document.getElementById('helpLvlSel').value);
  renderPhraseList('helpFixedList', HELP_FIXED_PHRASES[lvl] || HELP_FIXED_PHRASES[2]);
}

// タブ2描画：現在の発言数（cntMe + otherの合計）からティアを判定
// cntMe / otherCounts は state.js 側で管理されているグローバル変数を利用
function getConversationTier(){
  const me = typeof cntMe !== 'undefined' ? cntMe : 0;
  const otherTotal = typeof otherCounts !== 'undefined'
    ? Object.values(otherCounts).reduce((a, b) => a + b, 0)
    : 0;
  const total = me + otherTotal;

  if(total <= 3) return 'starting';
  if(total <= 10) return 'keepGoing';
  return 'goingDeeper';
}

function renderHelpDynamicTab(){
  const tier = getConversationTier();
  const tierData = HELP_DYNAMIC_TIERS[tier];
  document.getElementById('helpDynamicHint').textContent =
    `${tierData.label}（現在の発言数に応じて自動で変わります）`;
  renderPhraseList('helpDynamicList', tierData.phrases);
}

// HelpBoxのサブタブ切り替え
function switchHelpSubTab(tab){
  if(tab === activeHelpSubTab) return;
  activeHelpSubTab = tab;

  document.getElementById('helpSubTabFixed').classList.toggle('active', tab === 'fixed');
  document.getElementById('helpSubTabDynamic').classList.toggle('active', tab === 'dynamic');
  document.getElementById('helpFixedPanel').style.display = tab === 'fixed' ? '' : 'none';
  document.getElementById('helpDynamicPanel').style.display = tab === 'dynamic' ? '' : 'none';

  if(tab === 'dynamic') renderHelpDynamicTab();
}

// HelpBoxパネルがWordBridgeから切り替えて表示されるたびに呼ばれる
// （「開いた瞬間の会話状況」で内容を決める設計のため、表示のたびに再計算する）
function onHelpBoxShown(){
  if(activeHelpSubTab === 'fixed'){
    renderHelpFixedTab();
  } else {
    renderHelpDynamicTab();
  }
}

// 初期表示（固定タブ・中級）
// このスクリプトはbody末尾で読み込まれるため、対象の要素は既にDOMに存在している
renderHelpFixedTab(2);
