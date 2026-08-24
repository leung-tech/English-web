(() => {
  'use strict';

  const portalOrigin = 'https://engtuition-32ipu7x3.manus.space';
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
    const normalizedStage = String(stage || '').toUpperCase();
    const safeModuleId = identifier(moduleId, 'practice-module');
    const safeQuestionId = identifier(questionId, `${safeModuleId}-item`);
    if (!/^([PS][1-6])$/.test(normalizedStage) || !allowedSkills.has(normalizedSkill) || !safeModuleId || !safeQuestionId) return;

    const payload = { stage: normalizedStage, skill: normalizedSkill, moduleId: safeModuleId, questionId: safeQuestionId, eventKey: eventKey(), isCorrect: Boolean(isCorrect) };
    fetch(`${portalOrigin}/api/trpc/progress.recordObjective?batch=1`, {
      method: 'POST',
      credentials: 'include',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 0: { json: payload } })
    }).catch(() => {
      // Practice and immediate feedback must remain available without an account or network connection.
    });
  }

  window.EnglishTuitionAccount = Object.freeze({ portalOrigin, recordObjective });
})();
