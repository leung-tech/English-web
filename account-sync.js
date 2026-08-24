(() => {
  'use strict';

  const portalOrigin = 'https://engtuition-32ipu7x3.manus.space';
  const tokenKey = 'english-tuition-progress-sync-token-v1';
  const restoreFlagKey = 'english-tuition-restore-practice-v1';
  const allowedSkills = new Set(['reading', 'language', 'listening']);

  const skillMap = {
    read: 'reading', reading: 'reading',
    language: 'language', grammar: 'language',
    listen: 'listening', listening: 'listening', paper3: 'listening'
  };

  function identifier(value, fallback) {
    const result = String(value || fallback || '').trim();
    return /^[a-zA-Z0-9_.-]{2,128}$/.test(result) ? result : null;
  }

  function eventKey() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID().replace(/-/g, '_');
    return `event_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  }

  function recordObjective({ stage, skill, moduleId, questionId, isCorrect }) {
    const normalizedSkill = skillMap[skill] || skill;
    const normalizedStage = String(stage || '').toUpperCase().match(/[PS][1-6]/)?.[0] || '';
    const safeModuleId = identifier(moduleId, 'practice-module');
    const safeQuestionId = identifier(questionId, `${safeModuleId}-item`);
    if (!/^([PS][1-6])$/.test(normalizedStage) || !allowedSkills.has(normalizedSkill) || !safeModuleId || !safeQuestionId) return;

    const syncToken = localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
    if (!syncToken) return;
    const payload = { syncToken, stage: normalizedStage, skill: normalizedSkill, moduleId: safeModuleId, questionId: safeQuestionId, eventKey: eventKey(), isCorrect: Boolean(isCorrect) };
    fetch(`${portalOrigin}/api/trpc/progress.recordFromPublic?batch=1`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 0: { json: payload } })
    }).catch(() => {
      // Practice and immediate feedback must remain available without an account or network connection.
    });
  }

  function connectFromUrl() {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('sync');
    if (!token || !/^[A-Za-z0-9_-]{40,128}$/.test(token)) return;
    localStorage.setItem(tokenKey, token);
    sessionStorage.removeItem(tokenKey);
    sessionStorage.setItem(restoreFlagKey, '1');
    url.searchParams.delete('sync');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    window.EnglishTuitionPractice?.restoreAccountReturn?.();
  }

  function updateConnectionNotice() {
    const notices = document.querySelectorAll('[data-account-sync-status]');
    if (!notices.length) return;
    const connected = Boolean(localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey));
    const message = connected
      ? `<strong>Account sync is on · 帳戶同步已開啟</strong><span>每次按「核對答案」後，閱讀、語言運用及有固定正確答案的聆聽題會自動同步到帳戶；公開頁的完成題數及溫習清單仍只屬於這部瀏覽器。</span><a href="${portalOrigin}/dashboard">View full account history · 查看完整帳戶歷史</a>`
      : '<strong>Want this work in your account? · 想把作答記錄到帳戶？</strong><span>先按頂部「我的帳戶」登入／註冊；登入後按「Connect and return · 連接後返回練習」。整個流程都在同一分頁，未登入時仍可練習，但只會保留本機紀錄。</span>';
    notices.forEach((notice) => { notice.innerHTML = message; });
  }

  connectFromUrl();
  updateConnectionNotice();
  document.querySelectorAll('[data-account-link]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    window.EnglishTuitionPractice?.saveAccountReturn?.();
    const returnTo = new URL(window.location.href);
    returnTo.searchParams.delete('sync');
    window.location.assign(`${portalOrigin}/dashboard?returnTo=${encodeURIComponent(returnTo.toString())}`);
  }));
  window.EnglishTuitionAccount = Object.freeze({ portalOrigin, recordObjective });
})();
