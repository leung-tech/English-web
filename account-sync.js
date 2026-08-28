(function () {
  'use strict';
  const basePath = '/English-web';
  const allowedSkills = new Set(['reading', 'language', 'listening']);
  const skillMap = { read: 'reading', reading: 'reading', language: 'language', grammar: 'language', listen: 'listening', listening: 'listening', paper3: 'listening' };
  const isGuest = () => new URL(location.href).searchParams.get('guest') === '1';
  const accountUrl = (returnTo = location.href) => `${basePath}/account/?returnTo=${encodeURIComponent(returnTo)}`;
  const ident = (value, fallback) => /^[A-Za-z0-9_.-]{2,128}$/.test(String(value || fallback || '').trim()) ? String(value || fallback).trim() : null;
  const eventId = () => crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '_') : `event_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  let sdk;

  async function loadSdk() {
    if (sdk) return sdk;
    const [{ firebaseConfig }, appModule, authModule, fireModule] = await Promise.all([
      import(`${basePath}/firebase-config.js`),
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js')
    ]);
    const app = appModule.initializeApp(firebaseConfig);
    sdk = { auth: authModule.getAuth(app), db: fireModule.getFirestore(app), authModule, fireModule };
    return sdk;
  }

  async function currentUser() {
    if (isGuest()) return null;
    try {
      const { auth, authModule } = await loadSdk();
      const user = auth.currentUser || await new Promise((resolve) => authModule.onAuthStateChanged(auth, resolve, () => resolve(null)));
      if (user) return user;
    } catch { /* The account page explains incomplete configuration. */ }
    return null;
  }

  async function recordObjective({ stage, skill, moduleId, questionId, isCorrect }) {
    if (isGuest()) return;
    const normalizedStage = String(stage || '').toUpperCase().match(/[PS][1-6]/)?.[0] || '';
    const normalizedSkill = skillMap[skill] || skill;
    const safeModule = ident(moduleId, 'practice-module');
    const safeQuestion = ident(questionId, `${safeModule}-item`);
    if (!/^([PS][1-6])$/.test(normalizedStage) || !allowedSkills.has(normalizedSkill) || !safeModule || !safeQuestion) return;
    const user = await currentUser();
    if (!user) return;
    try {
      const { db, fireModule } = await loadSdk();
      const profile = await fireModule.getDoc(fireModule.doc(db, 'users', user.uid));
      if (!profile.exists() || profile.data().accountStatus !== 'active') { location.replace(accountUrl()); return; }
      const batch = fireModule.writeBatch(db);
      batch.set(fireModule.doc(db, 'users', user.uid, 'progress', eventId()), { stage: normalizedStage, skill: normalizedSkill, moduleId: safeModule, questionId: safeQuestion, isCorrect: Boolean(isCorrect), completedAt: fireModule.serverTimestamp() });
      batch.set(fireModule.doc(db, 'usage', user.uid), { attempts: fireModule.increment(1), correct: fireModule.increment(isCorrect ? 1 : 0), lastObjectiveAt: fireModule.serverTimestamp() }, { merge: true });
      await batch.commit();
    } catch { /* A sync failure never interrupts practice feedback. */ }
  }

  async function rememberPrimaryGrade(grade) {
    if (isGuest()) return;
    const stage = `P${Number(grade)}`;
    if (!/^P[1-6]$/.test(stage)) return;
    const user = await currentUser();
    if (!user) return;
    try { const { db, fireModule } = await loadSdk(); await fireModule.setDoc(fireModule.doc(db, 'preferences', user.uid), { primaryStage: stage, updatedAt: fireModule.serverTimestamp() }); } catch { /* A failure never interrupts practice. */ }
  }

  async function updateConnectionNotice() {
    const notices = document.querySelectorAll('[data-account-sync-status]');
    if (!notices.length) return;
    const user = await currentUser();
    const content = isGuest()
      ? '<strong>Guest practice · 訪客練習</strong><span>You can practise now. Results are not stored in an account or this browser. Sign in when you want private objective-progress records. · 你可即時練習；結果不會儲存在帳戶或此瀏覽器。需要保存客觀題進度時才登入。</span>'
      : user
        ? '<strong>Private account connected · 已連接私人帳戶</strong><span>Checked reading, language and fixed-answer listening results can be saved privately. · 已核對的閱讀、語言運用及固定答案聆聽結果可保存到私人帳戶。</span>'
        : `<strong>Choose how to start · 選擇開始方式</strong><span><a href="${accountUrl()}">Sign in / register · 登入／註冊</a> to save objective progress, or <a href="?guest=1">continue as guest · 不登入直接練習</a>. · 登入後才會保存客觀題進度；也可不登入直接練習。</span>`;
    notices.forEach((notice) => { notice.innerHTML = content; });
  }

  function addGuestReturn() {
    if (!isGuest() || document.querySelector('[data-guest-login-return]')) return;
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    const link = document.createElement('a');
    link.href = accountUrl();
    link.className = 'guest-login-return';
    link.dataset.guestLoginReturn = 'true';
    link.textContent = '← Sign in · 返回登入';
    topbar.prepend(link);
  }

  void updateConnectionNotice();
  addGuestReturn();
  document.querySelectorAll('[data-account-link]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); location.assign(accountUrl()); }));
  window.EnglishTuitionAccount = Object.freeze({ recordObjective, rememberPrimaryGrade });
})();
