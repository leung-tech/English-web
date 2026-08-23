(() => {
  const studio = window.SENIOR_ENGLISH_STUDIO;
  if (!studio) return;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[char]);
  const letters = ['A','B','C','D'];
  const progressKey = 'senior-english-studio-progress-v1';
  const draftKey = 'senior-english-studio-drafts-v1';
  const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const state = { stage:'s4', skill:'grammar', moduleId:null, index:0, selected:null, checked:false };
  const skills = [
    {id:'grammar',label:'G Advanced grammar',zh:'進階文法'},
    {id:'reading',label:'R Critical reading',zh:'批判閱讀'},
    {id:'writing',label:'W Purposeful writing',zh:'有目的寫作'}
  ];

  const modulesFor = () => studio.modules.filter((module) => module.stage === state.stage && module.skill === state.skill);
  const module = () => modulesFor().find((item) => item.id === state.moduleId) || modulesFor()[0];
  const task = () => module()?.items?.[state.index];
  const stage = () => studio.stages.find((item) => item.id === state.stage);
  const progress = () => get(progressKey, {completed:0,correct:0,modules:{}});
  const drafts = () => get(draftKey, {});
  const mark = (moduleId, correct) => {
    const data = progress();
    data.completed += 1;
    if (correct) data.correct += 1;
    data.modules[moduleId] = data.modules[moduleId] || {completed:0,correct:0};
    data.modules[moduleId].completed += 1;
    if (correct) data.modules[moduleId].correct += 1;
    set(progressKey, data);
  };
  const bilingual = (english, chinese) => `${escape(english)}${chinese ? `<span class="zh">${escape(chinese)}</span>` : ''}`;

  function renderStageNav() {
    $('#stage-nav').innerHTML = studio.stages.map((item) => `<button class="stage-button ${item.id === state.stage ? 'active' : ''}" data-stage="${item.id}">${escape(item.label)}<span>${escape(item.zh)}</span></button>`).join('');
  }
  function renderSkillNav() {
    $('#skill-nav').innerHTML = skills.map((item) => `<button class="skill-button ${item.id === state.skill ? 'active' : ''}" data-skill="${item.id}">${escape(item.label)}<span>${escape(item.zh)}</span></button>`).join('');
  }
  function renderProgress() {
    const data = progress();
    const accuracy = data.completed ? Math.round((data.correct / data.completed) * 100) : 0;
    $('#progress-summary').textContent = data.completed ? `${data.completed} checked · ${accuracy}% accurate` : '0 tasks';
  }
  function renderPathway() {
    const item = stage();
    const note = $('#pathway-note');
    note.className = 'pathway-note visible';
    note.innerHTML = `<strong>${escape(item.label)} · Capability pathway · 能力範圍</strong><br>${bilingual(item.pathway,item.pathwayZh)}<span class="zh">${escape(studio.noticeZh)}</span>`;
  }
  function renderModuleNav() {
    const items = modulesFor();
    if (!state.moduleId || !items.some((item) => item.id === state.moduleId)) { state.moduleId = items[0]?.id || null; state.index = 0; state.selected = null; state.checked = false; }
    $('#module-nav').innerHTML = items.map((item) => `<button class="module-button ${item.id === state.moduleId ? 'active' : ''}" data-module="${item.id}"><span class="symbol">${escape(item.symbol)}</span><b>${escape(item.title)}</b><span>${escape(item.zh)}</span></button>`).join('');
  }
  function renderQuiz(item, current) {
    const answer = item.answer;
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · 原創練習</p><h2>${escape(item.label)}<span class="zh">${escape(current.zh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div>${item.context ? `<div class="context"><strong>${item.context.includes('Source') ? 'Original source pack · 原創資料包' : 'Original text · 原創文本'}</strong><br>${escape(item.context)}${item.contextZh ? `<span class="zh">${escape(item.contextZh)}</span>` : ''}</div>` : ''}<p class="prompt">${bilingual(item.prompt,item.zh)}</p><div class="options">${item.options.map((option,index) => `<button class="option ${state.selected === index ? 'selected' : ''}" data-choice="${index}" ${state.checked ? 'disabled' : ''}><b>${letters[index]}</b><span>${escape(option)}</span></button>`).join('')}</div><div class="controls"><button class="primary" data-check>Check answer · 核對答案</button><button class="secondary" data-next>Next · 下一題</button>${item.hint ? `<button class="secondary" data-hint="${escape(item.hint)}">Hint · 提示</button>` : ''}</div>${state.checked ? `<div class="feedback ${state.selected === answer ? 'good' : 'bad'}"><strong>${state.selected === answer ? '✓ Accurate response.' : 'Review the wording and evidence.'}</strong>${bilingual(item.explanation,item.explanationZh)}</div>` : ''}<div class="boundary"><strong>Original DSE-bridge practice · 原創 DSE 銜接練習</strong><br>${escape(studio.notice)}<span class="zh">${escape(studio.noticeZh)}</span></div></article>`;
  }
  function renderWriting(item, current) {
    const saved = drafts()[item.id] || '';
    const sourcePack = (item.sourcePack || []).map(([label,text]) => `<article><b>${escape(label)}</b><p>${escape(text)}</p></article>`).join('');
    const paragraphMap = (item.paragraphMap || []).map(([title,detail]) => `<li><strong>${escape(title)}</strong><br>${escape(detail)}</li>`).join('');
    const language = (item.languageBank || []).map((phrase) => `<li>${escape(phrase)}</li>`).join('');
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · ORIGINAL SCAFFOLD</p><h2>${escape(item.title)}<span class="zh">${escape(item.titleZh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div><p class="prompt">${bilingual(item.prompt,item.promptZh)}</p><div class="source-pack">${sourcePack}</div><div class="writing-columns"><section class="writing-card"><h3>Paragraph plan · 段落規劃</h3><ol>${paragraphMap}</ol></section><section class="writing-card"><h3>Language bank · 語言庫</h3><ul>${language}</ul></section><section class="writing-card"><h3>Original model for analysis · 原創範本供分析</h3><p class="model">${escape(item.model)}</p></section><section class="writing-card"><h3>Self-check · 自我檢查</h3><p>${escape(item.selfCheck)}</p></section></div><div class="draft-wrap"><label for="senior-draft">My draft · 我的草稿 <span class="zh">Practice target: ${item.minWords}–${item.minWords + 40} words · 練習目標字數，不是官方字數要求。</span></label><textarea id="senior-draft" class="draft" placeholder="Write your original response here… 在此寫你的原創回應…">${escape(saved)}</textarea><div class="draft-meta"><span id="draft-count">0 words</span> · Saved locally while you type. <span class="zh">輸入時只儲存在此瀏覽器。</span></div></div><div class="boundary"><strong>No automated writing-quality score · 不設自動寫作品質評分</strong><br>Use the plan, language bank and self-check to revise your own response. <span class="zh">請使用段落規劃、語言庫和自我檢查自行修訂。</span></div></article>`;
  }
  function renderTask() {
    const current = module();
    const item = task();
    if (!current || !item) { $('#task-area').innerHTML = '<article class="task-card"><h2>Module unavailable</h2></article>'; return; }
    $('#task-area').innerHTML = current.type === 'writing' ? renderWriting(item,current) : renderQuiz(item,current);
    bindTaskEvents();
  }
  function render() { renderStageNav(); renderSkillNav(); renderProgress(); renderPathway(); renderModuleNav(); renderTask(); bindNavEvents(); }
  function bindNavEvents() {
    document.querySelectorAll('[data-stage]').forEach((button) => button.onclick = () => { state.stage = button.dataset.stage; state.skill = 'grammar'; state.moduleId = null; state.index = 0; state.selected = null; state.checked = false; render(); });
    document.querySelectorAll('[data-skill]').forEach((button) => button.onclick = () => { state.skill = button.dataset.skill; state.moduleId = null; state.index = 0; state.selected = null; state.checked = false; render(); });
    document.querySelectorAll('[data-module]').forEach((button) => button.onclick = () => { state.moduleId = button.dataset.module; state.index = 0; state.selected = null; state.checked = false; render(); });
    $('#clear-progress').onclick = () => { localStorage.removeItem(progressKey); localStorage.removeItem(draftKey); render(); };
  }
  function bindTaskEvents() {
    document.querySelectorAll('[data-choice]').forEach((button) => button.onclick = () => { if (!state.checked) { state.selected = Number(button.dataset.choice); renderTask(); } });
    const check = $('[data-check]');
    if (check) check.onclick = () => { const item = task(); if (state.selected === null || !item) return; state.checked = true; mark(module().id, state.selected === item.answer); renderTask(); renderProgress(); };
    const next = $('[data-next]');
    if (next) next.onclick = () => { const current = module(); state.index = (state.index + 1) % current.items.length; state.selected = null; state.checked = false; renderTask(); };
    const hint = $('[data-hint]');
    if (hint) hint.onclick = () => { hint.textContent = `Hint · 提示: ${hint.dataset.hint}`; };
    const draft = $('#senior-draft');
    if (draft) { const count = () => { const words = draft.value.trim() ? draft.value.trim().split(/\s+/).length : 0; $('#draft-count').textContent = `${words} words`; }; draft.addEventListener('input', () => { const data = drafts(); data[task().id] = draft.value; set(draftKey,data); count(); }); count(); }
  }
  render();
})();
