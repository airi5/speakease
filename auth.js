// ── Supabase Auth（REST API直接呼び出し） ────────

// 新規登録
async function signUp(email, password, nickname, school, lang) {
  // 1. Supabase Authで登録
  const res = await fetch(`${SB_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || data.msg || 'Registration failed');

  const userId = data.user?.id;
  const token  = data.access_token;
  if (!userId || !token) throw new Error('Registration failed');

  // 2. profilesテーブルに保存
  await fetch(`${SB_URL}/rest/v1/profiles`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Authorization': `Bearer ${token}`, 'Prefer': 'return=minimal' },
    body: JSON.stringify({ id: userId, nickname, school, lang, email })
  });

  return { userId, token, nickname, school, lang, email };
}

// ログイン
async function signIn(email, password) {
  const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || data.msg || 'Login failed');

  const userId = data.user?.id;
  const token  = data.access_token;
  if (!userId || !token) throw new Error('Login failed');

  // profilesテーブルからユーザー情報を取得
  const pRes = await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${userId}`, {
    headers: { ...SB_HEADERS, 'Authorization': `Bearer ${token}` }
  });
  const profiles = await pRes.json();
  if (!profiles || profiles.length === 0) throw new Error('Profile not found');

  const p = profiles[0];
  return { userId, token, nickname: p.nickname, school: p.school, lang: p.lang, email: p.email };
}

// ── 画面切り替え ────────────────────────────────
function showAuthScreen() {
  document.getElementById('joinWrap').style.display   = 'none';
  document.getElementById('authWrap').style.display   = 'flex';
  document.getElementById('meetingWrap').style.display= 'none';
}

function showJoinScreen(nickname, lang) {
  document.getElementById('authWrap').style.display   = 'none';
  document.getElementById('joinWrap').style.display   = 'flex';
  document.getElementById('nameIn').value = nickname;
  document.getElementById('langIn').value = lang;
  document.getElementById('langSw').value = lang;
}

// ── ログイン処理 ────────────────────────────────
async function handleLogin() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginErr');
  errEl.textContent = '';

  if (!email || !password) { errEl.textContent = 'Please enter email and password.'; return; }

  try {
    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    const user = await signIn(email, password);
    showJoinScreen(user.nickname, user.lang);
  } catch(e) {
    document.getElementById('loginErr').textContent = e.message;
  } finally {
    const btn = document.getElementById('loginBtn');
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
}

// ── 新規登録処理 ────────────────────────────────
async function handleSignUp() {
  const nickname = document.getElementById('regNickname').value.trim();
  const school   = document.getElementById('regSchool').value.trim();
  const lang     = document.getElementById('regLang').value;
  const email    = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const errEl    = document.getElementById('regErr');
  errEl.textContent = '';

  if (!nickname || !school || !email || !password) {
    errEl.textContent = 'Please fill in all fields.'; return;
  }
  if (password.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.'; return;
  }

  try {
    const btn = document.getElementById('regBtn');
    btn.disabled = true;
    btn.textContent = 'Creating account...';

    await signUp(email, password, nickname, school, lang);
    // 登録後は自動的にログイン画面へ
    showTab('login');
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginErr').textContent = 'Account created! Please sign in.';
    document.getElementById('loginErr').style.color = '#059669';
  } catch(e) {
    errEl.textContent = e.message;
  } finally {
    const btn = document.getElementById('regBtn');
    btn.disabled = false;
    btn.textContent = 'Create Account';
  }
}

// ── タブ切り替え ────────────────────────────────
function showTab(tab) {
  document.getElementById('loginTab').style.display  = tab === 'login'  ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('tabLogin').className  = 'auth-tab' + (tab === 'login'  ? ' active' : '');
  document.getElementById('tabSignup').className = 'auth-tab' + (tab === 'signup' ? ' active' : '');
}

// 初期表示：認証画面から始める
window.addEventListener('DOMContentLoaded', () => {
  showAuthScreen();
});