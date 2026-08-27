(function () {
  'use strict';

  const portalOrigin = 'https://engtuition-32ipu7x3.manus.space';
  const tokenKey = 'english-tuition-progress-sync-token-v1';
  const restoreFlagKey = 'english-tuition-restore-practice-v1';
  const allowedSkills = new Set(['reading', 'language', 'listening']);
  const legacyPracticeKey = /^(primary-english-studio-(stats|review|used)|primary-english-studio-junior-progress-v1|secondary-english-studio-|senior-english-studio-)/;
  const isGuestMode = () => new URL(window.location.href).searchParams.get('guest') === '1';

  const skillMap = { read: 'reading', reading: 'reading', language: 'language', grammar: 'language', listen: 'listening', listening: 'listening', paper3: 'listening' };
  const identifier = (value, fallback) => {
    const result = String(value || fallback || '').trim();
    return /^[a-zA-Z0-9_.-]{2,128}$/.test(result) ? result : null;
  };
  const eventKey = () => window.crypto?.randomUUID ? window.crypto.randomUUID().replace(/-/g, '_') : `event_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  const accountDashboardUrl = () => `${portalOrigin}/?entry=dashboard`;

  function returnToCurrentPractice() {
    const returnTo = new URL(window.location.href);
    returnTo.searchParams.delete('sync');
    return returnTo.toString();
  }

  function requireAccountSession() {
    if (isGuestMode()) return;
    if (sessionStorage.getItem(tokenKey)) return;
    window.location.replace(`${portalOrigin}/?entry=login&returnTo=${encodeURIComponent(returnToCurrentPractice())}`);
  }

  function recordObjective({ stage, skill, moduleId, questionId, isCorrect }) {
    if (isGuestMode()) return;
    const normalizedSkill = skillMap[skill] || skill;
    const normalizedStage = String(stage || '').toUpperCase().match(/[PS][1-6]/)?.[0] || '';
    const safeModuleId = identifier(moduleId, 'practice-module');
    const safeQuestionId = identifier(questionId, `${safeModuleId}-item`);
    if (!/^([PS][1-6])$/.test(normalizedStage) || !allowedSkills.has(normalizedSkill) || !safeModuleId || !safeQuestionId) return;
    const syncToken = sessionStorage.getItem(tokenKey);
    if (!syncToken) { requireAccountSession(); return; }
    const payload = { syncToken, stage: normalizedStage, skill: normalizedSkill, moduleId: safeModuleId, questionId: safeQuestionId, eventKey: eventKey(), isCorrect: Boolean(isCorrect) };
    fetch(`${portalOrigin}/api/trpc/progress.recordFromPublic?batch=1`, {
      method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 0: { json: payload } })
    }).then((response) => {
      if (response.status === 401) { sessionStorage.removeItem(tokenKey); requireAccountSession(); }
    }).catch(() => { /* Immediate feedback remains available during a transient network failure. */ });
  }

  async function primaryGradeFromAccount(stage) {
    if (isGuestMode()) return null;
    const syncToken = sessionStorage.getItem(tokenKey);
    if (!syncToken) return null;
    const payload = { syncToken, ...(stage ? { stage } : {}) };
    try {
      const response = await fetch(`${portalOrigin}/api/trpc/practicePreference.primaryGradeFromPublic?batch=1`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 0: { json: payload } })
      });
      if (response.status === 401) { sessionStorage.removeItem(tokenKey); return null; }
      const result = await response.json();
      const savedStage = result?.[0]?.result?.data?.json?.stage;
      return /^P[1-6]$/.test(savedStage) ? savedStage : null;
    } catch { return null; }
  }

  function rememberPrimaryGrade(grade) {
    const stage = `P${Number(grade)}`;
    if (/^P[1-6]$/.test(stage)) void primaryGradeFromAccount(stage);
  }

  async function restoreAccountPrimaryGrade() {
    const stage = await primaryGradeFromAccount();
    if (stage) window.EnglishTuitionPractice?.restoreAccountPrimaryGrade?.(stage);
  }

  function connectFromUrl() {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('sync');
    if (!token || !/^[A-Za-z0-9_-]{40,128}$/.test(token)) return false;
    sessionStorage.setItem(tokenKey, token);
    Object.keys(localStorage).filter((key) => legacyPracticeKey.test(key)).forEach((key) => localStorage.removeItem(key));
    sessionStorage.setItem(restoreFlagKey, '1');
    url.searchParams.delete('sync');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    return window.EnglishTuitionPractice?.restoreAccountReturn?.() === true;
  }

  function updateConnectionNotice() {
    const notices = document.querySelectorAll('[data-account-sync-status]');
    if (!notices.length) return;
    const connected = Boolean(sessionStorage.getItem(tokenKey));
    const message = isGuestMode()
      ? '<strong>Guest practice · 訪客練習</strong><span>你可以直接完成題目，但結果不會儲存於帳戶或此瀏覽器。按「My account」登入／註冊後，才可建立私人學習紀錄。</span>'
      : connected
      ? `<strong>Account learning session active · 帳戶學習已啟用</strong><span>已核對的閱讀、語言運用及固定答案聆聽題會直接記錄到你的私人帳戶。公開頁不會保存本機進度或歷史。</span><a href="${accountDashboardUrl()}">View account history · 查看帳戶歷史</a>`
      : '<strong>Account sign-in required · 必須登入帳戶</strong><span>正式練習與學習紀錄只屬於已註冊及已登入的私人帳戶。</span>';
    notices.forEach((notice) => { notice.innerHTML = message; });
  }

  function addGuestLoginReturn() {
    if (!isGuestMode() || document.querySelector('[data-guest-login-return]')) return;
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    const link = document.createElement('a');
    link.href = `${portalOrigin}/?entry=login`;
    link.className = 'guest-login-return';
    link.dataset.guestLoginReturn = 'true';
    link.setAttribute('aria-label', 'Return to sign in · 返回登入頁面');
    link.textContent = '← Return to sign in · 返回登入頁面';
    topbar.prepend(link);
  }

  const resumedPractice = connectFromUrl();
  requireAccountSession();
  addGuestLoginReturn();
  updateConnectionNotice();
  if (!resumedPractice) void restoreAccountPrimaryGrade();
  document.querySelectorAll('[data-account-link]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign(accountDashboardUrl());
  }));
  window.EnglishTuitionAccount = Object.freeze({ portalOrigin, recordObjective, rememberPrimaryGrade });
})();
