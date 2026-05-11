// ── Supabase Auth（REST API直接呼び出し） ────────

async function signUp(email, password, nickname, schoolType, schoolName, lang) {
  const school = `${schoolName} ${schoolType}`;

  const res = await fetch(`${SB_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  console.log('signup response:', JSON.stringify(data));
  if (data.error) throw new Error(data.error.message || data.msg || JSON.stringify(data));

  const userId = data.user?.id;
  const token  = data.access_token;
  if (!userId || !token) throw new Error(JSON.stringify(data));

  await fetch(`${SB_URL}/rest/v1/profiles`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Authorization': `Bearer ${token}`, 'Prefer': 'return=minimal' },
    body: JSON.stringify({ id: userId, nickname, school, lang, email })
  });

  return { userId, token, nickname, school, lang, email };
}

async function signIn(email, password) {
  const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  console.log('signin response:', JSON.stringify(data));
  if (data.error) throw new Error(data.error.message || data.msg || 'Login failed');

  const userId = data.user?.id;
  const token  = data.access_token;
  if (!userId || !token) throw new Error('Login failed');

  const pRes = await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${userId}`, {
    headers: { ...SB_HEADERS, 'Authorization': `Bearer ${token}` }
  });
  const profiles = await pRes.json();
  if (!profiles || profiles.length === 0) throw new Error('Profile not found');

  const p = profiles[0];
  return { userId, token, nickname: p.nickname, school: p.school, lang: p.lang, email: p.email };
}

function showAuthScreen() {
  document.getElementById('joinWrap').style.display    = 'none';
  document.getElementById('authWrap').style.display    = 'flex';
  document.getElementById('meetingWrap').style.display = 'none';
}

function showJoinScreen(nickname, lang) {
  document.getElementById('authWrap').style.display = 'none';
  document.getElementById('joinWrap').style.display  = 'flex';
  document.getElementById('nameIn').value = nickname;
  document.getElementById('langIn').value = lang;
  document.getElementById('langSw').value = lang;
}

async function handleLogin() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginErr');
  errEl.textContent = '';
  errEl.style.color = 'var(--rose)';

  if (!email || !password) { errEl.textContent = 'Please enter email and password.'; return; }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Signing in...';

  try {
    const user = await signIn(email, password);
    showJoinScreen(user.nickname, user.lang);
  } catch(e) {
    errEl.textContent = e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
}

async function handleSignUp() {
  const nickname   = document.getElementById('regNickname').value.trim();
  const schoolType = document.getElementById('regSchoolType').value;
  const schoolName = document.getElementById('regSchool').value.trim();
  const lang       = document.getElementById('regLang').value;
  const email      = document.getElementById('regEmail').value.trim();
  const password   = document.getElementById('regPassword').value;
  const errEl      = document.getElementById('regErr');
  errEl.textContent = '';
  errEl.style.color = 'var(--rose)';

  if (!nickname || !schoolName || !email || !password) {
    errEl.textContent = 'Please fill in all fields.'; return;
  }
  if (password.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.'; return;
  }

  const btn = document.getElementById('regBtn');
  btn.disabled = true;
  btn.textContent = 'Creating account...';

  try {
    await signUp(email, password, nickname, schoolType, schoolName, lang);
    showTab('login');
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginErr').style.color = 'var(--green)';
    document.getElementById('loginErr').textContent = 'Account created! Please sign in.';
  } catch(e) {
    errEl.textContent = e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Create Account';
  }
}

function showTab(tab) {
  document.getElementById('loginTab').style.display  = tab === 'login'  ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('tabLogin').className  = 'auth-tab' + (tab === 'login'  ? ' active' : '');
  document.getElementById('tabSignup').className = 'auth-tab' + (tab === 'signup' ? ' active' : '');
}

window.addEventListener('DOMContentLoaded', () => {
  showAuthScreen();
});
