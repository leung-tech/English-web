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

    const syncToken = sessionStorage.getItem(tokenKey);
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
    sessionStorage.setItem(tokenKey, token);
    url.searchParams.delete('sync');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  connectFromUrl();
  window.EnglishTuitionAccount = Object.freeze({ portalOrigin, recordObjective });
})();
