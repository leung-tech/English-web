(() => {
  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
  const cleanTotal = (value) => Math.max(0, Number.isFinite(Number(value)) ? Math.floor(Number(value)) : 0);
  const cleanSeconds = (value) => Math.max(60, Number.isFinite(Number(value)) ? Math.floor(Number(value)) : 600);

  function create(total, seconds = 600) {
    return {
      total: cleanTotal(total),
      seconds: cleanSeconds(seconds),
      startedAt: null,
      deadline: null,
      active: false,
      expired: false,
      finished: false,
      remainingSeconds: cleanSeconds(seconds),
      results: {}
    };
  }

  function begin(exam, now = Date.now()) {
    const next = exam || create(0);
    if (next.active || next.expired || next.finished) return next;
    next.startedAt = now;
    next.deadline = now + next.seconds * 1000;
    next.active = true;
    next.remainingSeconds = next.seconds;
    return next;
  }

  function remaining(exam, now = Date.now()) {
    if (!exam?.active || !exam.deadline) return clamp(Number(exam?.remainingSeconds ?? exam?.seconds ?? 600), 0, cleanSeconds(exam?.seconds || 600));
    return clamp(Math.ceil((exam.deadline - now) / 1000), 0, cleanSeconds(exam.seconds));
  }

  function expire(exam) {
    if (!exam) return create(0);
    exam.active = false;
    exam.expired = true;
    exam.finished = true;
    exam.remainingSeconds = 0;
    return exam;
  }

  function finish(exam, now = Date.now()) {
    if (!exam) return create(0);
    exam.remainingSeconds = remaining(exam, now);
    exam.active = false;
    exam.finished = true;
    return exam;
  }

  function record(exam, key, correct) {
    if (!exam?.active || exam.expired || exam.finished || !key || Object.prototype.hasOwnProperty.call(exam.results || {}, key)) return exam;
    exam.results ||= {};
    exam.results[key] = Boolean(correct);
    return exam;
  }

  function restart(exam, now = Date.now()) {
    const next = create(exam?.total || 0, exam?.seconds || 600);
    return begin(next, now);
  }

  function summary(exam) {
    const values = Object.values(exam?.results || {});
    const attempted = values.length;
    const correct = values.filter(Boolean).length;
    const total = cleanTotal(exam?.total);
    return {
      total,
      attempted,
      correct,
      unanswered: Math.max(0, total - attempted),
      percent: total ? Math.round((correct / total) * 100) : 0
    };
  }

  function format(seconds) {
    const safe = Math.max(0, Math.floor(Number(seconds) || 0));
    return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
  }

  window.EnglishTimedPractice = Object.freeze({ create, begin, remaining, expire, finish, record, restart, summary, format });
})();
