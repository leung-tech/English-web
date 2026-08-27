import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, writeBatch } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const root = document.querySelector('#app');
const consentVersion = '2026-08-27';
const stages = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
let auth;
let db;

const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const message = (text, type = '') => `<p class="notice ${type}">${text}</p>`;
const displayError = (error) => {
  const code = String(error?.code || '');
  if (code.includes('email-already-in-use')) return 'This email already has an account. Please sign in. · 此電郵已有帳戶，請登入。';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) return 'Email or password is incorrect. · 電郵或密碼不正確。';
  if (code.includes('weak-password')) return 'Use at least 6 characters for your password. · 密碼最少需要 6 個字元。';
  if (code.includes('permission-denied')) return 'This action is not permitted for this account. · 此帳戶未獲准進行這項操作。';
  return 'The account action could not be completed. Please try again. · 無法完成帳戶操作，請稍後再試。';
};
const readReturnUrl = () => {
  const candidate = new URLSearchParams(location.search).get('returnTo');
  if (!candidate) return '/English-web/';
  try { const url = new URL(candidate); return url.origin === location.origin && url.pathname.startsWith('/English-web/') ? url.href : '/English-web/'; } catch { return '/English-web/'; }
};

function renderAuth(mode = 'signIn', notice = '') {
  const signIn = mode === 'signIn';
  root.innerHTML = `${notice}${message('Only Email/Password is available. No social sign-in, phone, AI writing feedback or writing upload is used. · 此處只提供電郵／密碼登入；不設社交登入、電話、AI 寫作評語或寫作上載。')}
    <section class="panel two-column">
      <div><p class="eyebrow">ACCOUNT ACCESS · 帳戶登入</p><h2>${signIn ? 'Sign in · 登入' : 'Create account · 建立帳戶'}</h2><p class="help">${signIn ? 'Use your registered email and password.' : 'Use a parent or student email that can receive account-recovery messages.'}</p></div>
      <form id="auth-form" class="stack" novalidate>
        ${signIn ? '' : `<label class="field">Display name · 顯示名稱<input name="displayName" maxlength="60" required autocomplete="name"></label><label class="field">Account type · 帳戶類別<select name="accountType"><option value="student">Student · 學生</option><option value="parent">Parent · 家長</option></select></label>`}
        <label class="field">Email · 電郵<input name="email" type="email" required autocomplete="email"></label>
        <label class="field">Password · 密碼<input name="password" type="password" minlength="6" required autocomplete="${signIn ? 'current-password' : 'new-password'}"><span class="help">At least 6 characters · 最少 6 個字元</span></label>
        ${signIn ? '' : `<label class="checkline"><input name="consent" type="checkbox" required><span>I understand that only checked objective practice results are stored. Writing and speaking drafts are not uploaded, stored or automatically marked. · 我明白只會儲存已核對的客觀練習結果；寫作及口語草稿不會上載、儲存或自動評核。</span></label>`}
        <div class="actions"><button class="primary" type="submit">${signIn ? 'Sign in · 登入' : 'Create account · 建立帳戶'}</button><button class="secondary" id="change-mode" type="button">${signIn ? 'New here? Register · 註冊' : 'Already registered? Sign in · 登入'}</button></div>
      </form>
    </section>`;
  document.querySelector('#change-mode').onclick = () => renderAuth(signIn ? 'register' : 'signIn');
  document.querySelector('#auth-form').onsubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const button = event.currentTarget.querySelector('[type="submit"]');
    if (!signIn && !form.get('consent')) { renderAuth('register', message('Please tick the account notice before creating an account. · 建立帳戶前請先勾選帳戶提示。', 'error')); return; }
    button.disabled = true;
    try {
      if (signIn) await signInWithEmailAndPassword(auth, email, password);
      else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const displayName = String(form.get('displayName') || '').trim();
        await updateProfile(result.user, { displayName });
        await setDoc(doc(db, 'users', result.user.uid), { displayName, email: result.user.email, accountType: form.get('accountType'), consentVersion, consentAt: serverTimestamp(), createdAt: serverTimestamp(), accountStatus: 'active' });
        await setDoc(doc(db, 'preferences', result.user.uid), { primaryStage: 'P1', updatedAt: serverTimestamp() });
      }
    } catch (error) { renderAuth(signIn ? 'signIn' : 'register', message(displayError(error), 'error')); }
    finally { button.disabled = false; }
  };
}

async function showAccount(user) {
  const [profileSnap, adminSnap] = await Promise.all([getDoc(doc(db, 'users', user.uid)), getDoc(doc(db, 'admins', user.uid))]);
  const isAdmin = adminSnap.exists() && adminSnap.data().role === 'admin';
  if (!profileSnap.exists() && !isAdmin) { await signOut(auth); renderAuth('signIn', message('This sign-in does not yet have a migration account profile. · 此登入尚未建立遷移帳戶資料。', 'error')); return; }
  const profile = profileSnap.exists() ? profileSnap.data() : null;
  if (profile && profile.accountStatus !== 'active') { await signOut(auth); renderAuth('signIn', message('This account is paused. Please contact the tuition centre. · 此帳戶已暫停，請聯絡補習社。', 'error')); return; }
  const [usageSnap, preferenceSnap] = await Promise.all([getDoc(doc(db, 'usage', user.uid)), getDoc(doc(db, 'preferences', user.uid))]);
  const usage = usageSnap.exists() ? usageSnap.data() : { attempts: 0, correct: 0 };
  const stage = preferenceSnap.exists() && stages.includes(preferenceSnap.data().primaryStage) ? preferenceSnap.data().primaryStage : 'P1';
  const name = profile?.displayName || user.displayName || (isAdmin ? 'Administrator' : 'Learner');
  const startingPoint = isAdmin ? '' : `<section class="panel"><h3>Learning starting point · 學習起點</h3><form id="stage-form" class="actions"><label class="field">Starting stage · 起始年級<select name="primaryStage">${stages.map((item) => `<option value="${item}" ${item === stage ? 'selected' : ''}>${item}</option>`).join('')}</select></label><button class="secondary" type="submit">Save · 儲存</button></form></section>`;
  const administration = isAdmin ? '<section class="panel" id="admin-panel"><p class="eyebrow">ADMINISTRATION · 管理</p><h2>Basic account overview · 基本帳戶概覽</h2><p class="help">Only basic identity and objective-use totals appear here. Final Firebase Authentication deletion remains an owner-only manual step.</p><div id="admin-content" class="admin-empty">Loading basic account data…</div></section>' : '';
  root.innerHTML = `<section class="panel"><div class="account-head"><div><p class="eyebrow">${isAdmin ? 'ADMINISTRATION · 管理' : 'MY LEARNING · 我的學習'}</p><h2>${escape(name)}</h2><p>${escape(user.email)}</p></div><button class="secondary" id="sign-out">Sign out · 登出</button></div><div class="metric-grid"><div class="metric"><strong>${Number(usage.attempts || 0)}</strong><span>Objective attempts · 客觀題作答</span></div><div class="metric"><strong>${Number(usage.correct || 0)}</strong><span>Correct answers · 答對題目</span></div><div class="metric"><strong>${stage}</strong><span>Starting stage · 起始年級</span></div></div><div class="privacy-note"><strong>Private by design · 私隱優先</strong><br>Only checked reading, language and fixed-answer listening exercises may be retained. Writing and speaking drafts are not uploaded, retained or automatically marked.</div><div class="actions"><a class="primary" href="${escape(readReturnUrl())}">Return to practice · 返回練習</a></div></section>${startingPoint}${administration}`;
  document.querySelector('#sign-out').onclick = () => signOut(auth);
  const stageForm = document.querySelector('#stage-form');
  if (stageForm) stageForm.onsubmit = async (event) => { event.preventDefault(); const selected = new FormData(event.currentTarget).get('primaryStage'); try { await setDoc(doc(db, 'preferences', user.uid), { primaryStage: selected, updatedAt: serverTimestamp() }); root.insertAdjacentHTML('afterbegin', message('Starting stage updated. · 已更新起始年級。', 'success')); } catch (error) { root.insertAdjacentHTML('afterbegin', message(displayError(error), 'error')); } };
  if (isAdmin) await renderAdmin(user.uid);
}

async function renderAdmin(adminUid) {
  const container = document.querySelector('#admin-content');
  try {
    const users = (await getDocs(collection(db, 'users'))).docs.map((snapshot) => ({ uid: snapshot.id, ...snapshot.data() }));
    const rows = await Promise.all(users.map(async (profile) => { const usage = await getDoc(doc(db, 'usage', profile.uid)); const totals = usage.exists() ? usage.data() : { attempts: 0, correct: 0 }; return { ...profile, ...totals }; }));
    container.innerHTML = rows.length ? `<table class="admin-table"><thead><tr><th>Account</th><th>Type</th><th>Objective use</th><th>Status</th><th>Deletion</th></tr></thead><tbody>${rows.map((row) => `<tr><td><strong>${escape(row.displayName || '—')}</strong><br>${escape(row.email || '—')}</td><td>${escape(row.accountType || '—')}</td><td>${Number(row.attempts || 0)} attempts<br>${Number(row.correct || 0)} correct</td><td><span class="status ${escape(row.accountStatus || '')}">${escape(row.accountStatus || '—')}</span></td><td>${row.uid === adminUid || row.accountStatus !== 'active' ? '—' : `<button class="secondary" data-pause="${escape(row.uid)}" data-email="${escape(row.email || '')}">Request deletion</button>`}</td></tr>`).join('')}</tbody></table>` : '<p class="admin-empty">No Firebase account profiles yet. · 尚未有 Firebase 帳戶資料。</p>';
    container.querySelectorAll('[data-pause]').forEach((button) => { button.onclick = async () => { const email = button.dataset.email || ''; if (prompt(`Type this email to request deletion: ${email}`) !== email) return; button.disabled = true; try { const uid = button.dataset.pause; const batch = writeBatch(db); batch.set(doc(db, 'deletionRequests', uid), { requestedBy: adminUid, targetUid: uid, targetEmail: email, confirmedAt: serverTimestamp(), status: 'pending' }); batch.update(doc(db, 'users', uid), { accountStatus: 'pendingDeletion' }); await batch.commit(); await renderAdmin(adminUid); } catch (error) { container.insertAdjacentHTML('beforebegin', message(displayError(error), 'error')); button.disabled = false; } }; });
  } catch (error) { container.innerHTML = message(displayError(error), 'error'); }
}

async function start() {
  try {
    const module = await import('../firebase-config.js');
    if (!module.firebaseConfig || String(module.firebaseConfig.apiKey || '').startsWith('PUBLIC_')) throw new Error('missing-config');
    const app = initializeApp(module.firebaseConfig);
    auth = getAuth(app); db = getFirestore(app);
    onAuthStateChanged(auth, async (user) => { if (!user) renderAuth(); else { try { await showAccount(user); } catch (error) { root.innerHTML = message(displayError(error), 'error'); } } });
  } catch { root.innerHTML = `${message('Firebase Web App setup is not complete yet. The public practice site remains available and no account data can be sent from this page. · Firebase Web App 設定尚未完成；公開練習網站仍可使用，此頁暫不會傳送帳戶資料。', 'error')}<p><a class="return-link" href="/English-web/">Return to public practice · 返回公開練習</a></p>`; }
}
start();
