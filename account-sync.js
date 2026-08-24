(() => {
  'use strict';

  const portalOrigin = 'https://engtuition-32ipu7x3.manus.space';
  const tokenKey = 'english-tuition-progress-sync-token-v1';
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
    url.searchParams.delete('sync');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    if (window.opener) {
      window.opener.postMessage({ type: 'english-tuition-browser-connected' }, portalOrigin);
      window.setTimeout(() => window.close(), 250);
    }
  }

  function updateConnectionNotice() {
    const notice = document.querySelector('[data-account-sync-status]');
    if (!notice) return;
    const connected = Boolean(localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey));
    notice.innerHTML = connected
      ? '<strong>Browser connected · 此瀏覽器已連接</strong><span>閱讀、語言運用及有標準答案的聆聽題會在按「核對答案」後同步；寫作、朗讀及口語內容仍只保留在此裝置。</span>'
      : '<strong>Optional account sync · 可選帳戶同步</strong><span>請由頂部「我的帳戶」連接此瀏覽器；只有閱讀、語言運用及有標準答案的聆聽題會在按「核對答案」後同步。</span>';
  }

  connectFromUrl();
  updateConnectionNotice();
  window.EnglishTuitionAccount = Object.freeze({ portalOrigin, recordObjective });
})();
