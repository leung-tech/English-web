(() => {
  const studio = window.SENIOR_ENGLISH_STUDIO;
  if (!studio) return;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[char]);
  const letters = ['A','B','C','D'];
  const progressKey = 'senior-english-studio-progress-v1';
  const draftKey = 'senior-english-studio-drafts-v1';
  const reviewKey = 'senior-english-studio-paper2-selfreview-v1';
  const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const state = { stage:'s4', skill:'grammar', moduleId:null, index:0, selected:null, checked:false, showTranscript:false };
  const skills = [
    {id:'grammar',label:'G Advanced grammar',zh:'進階文法'},
    {id:'reading',label:'R Critical reading',zh:'批判閱讀'},
    {id:'writing',label:'W Purposeful writing',zh:'有目的寫作'},
    {id:'paper2',label:'P2 Writing review',zh:'卷二寫作檢視'},
    {id:'listening',label:'L Listening',zh:'聆聽理解'},
    {id:'oral',label:'O Oral response',zh:'口語回應'}
  ];

  const modulesFor = () => studio.modules.filter((module) => module.stage === state.stage && module.skill === state.skill);
  const module = () => modulesFor().find((item) => item.id === state.moduleId) || modulesFor()[0];
  const task = () => module()?.items?.[state.index];
  const stage = () => studio.stages.find((item) => item.id === state.stage);
  const progress = () => get(progressKey, {completed:0,correct:0,modules:{}});
  const drafts = () => get(draftKey, {});
  const reviews = () => get(reviewKey, {});
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
  const speak = (text) => { if (!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-GB'; utterance.rate = .92; window.speechSynthesis.speak(utterance); };
  const resetTask = () => { state.index = 0; state.selected = null; state.checked = false; state.showTranscript = false; };

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
    if (!state.moduleId || !items.some((item) => item.id === state.moduleId)) { state.moduleId = items[0]?.id || null; resetTask(); }
    $('#module-nav').innerHTML = items.map((item) => `<button class="module-button ${item.id === state.moduleId ? 'active' : ''}" data-module="${item.id}"><span class="symbol">${escape(item.symbol)}</span><b>${escape(item.title)}</b><span>${escape(item.zh)}</span></button>`).join('');
  }
  function renderAudio(item) {
    if (!item.audioScript) return '';
    return `<section class="audio-panel"><div><strong>${escape(item.audioTitle || 'Replay audio · 重播音訊')}</strong><span>Use replay before choosing an answer. <span class="zh">先重播，再選擇答案。</span></span></div><div class="controls"><button class="primary" data-play-audio>▶ Replay · 重播</button><button class="secondary" data-show-transcript>${state.showTranscript ? 'Hide transcript · 隱藏逐字稿' : 'Show transcript · 顯示逐字稿'}</button></div>${state.showTranscript ? `<div class="transcript"><strong>Transcript · 逐字稿</strong><p>${escape(item.audioScript)}</p></div>` : ''}</section>`;
  }
  function renderQuiz(item, current) {
    const answer = item.answer;
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · 原創練習</p><h2>${escape(item.label)}<span class="zh">${escape(current.zh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div>${renderAudio(item)}${item.context ? `<div class="context"><strong>${item.context.includes('Source') ? 'Original source pack · 原創資料包' : 'Original text · 原創文本'}</strong><br>${escape(item.context)}${item.contextZh ? `<span class="zh">${escape(item.contextZh)}</span>` : ''}</div>` : ''}<p class="prompt">${bilingual(item.prompt,item.zh)}</p><div class="options">${item.options.map((option,index) => `<button class="option ${state.selected === index ? 'selected' : ''}" data-choice="${index}" ${state.checked ? 'disabled' : ''}><b>${letters[index]}</b><span>${escape(option)}</span></button>`).join('')}</div><div class="controls"><button class="primary" data-check>Check answer · 核對答案</button><button class="secondary" data-next>Next · 下一題</button>${item.hint ? `<button class="secondary" data-hint="${escape(item.hint)}">Hint · 提示</button>` : ''}</div>${state.checked ? `<div class="feedback ${state.selected === answer ? 'good' : 'bad'}"><strong>${state.selected === answer ? '✓ Accurate response.' : 'Review the wording and evidence.'}</strong>${bilingual(item.explanation,item.explanationZh)}</div>` : ''}<div class="boundary"><strong>Original DSE-bridge practice · 原創 DSE 銜接練習</strong><br>${escape(studio.notice)}<span class="zh">${escape(studio.noticeZh)}</span></div></article>`;
  }
  function renderWriting(item, current) {
    const saved = drafts()[item.id] || '';
    const sourcePack = (item.sourcePack || []).map(([label,text]) => `<article><b>${escape(label)}</b><p>${escape(text)}</p></article>`).join('');
    const paragraphMap = (item.paragraphMap || []).map(([title,detail]) => `<li><strong>${escape(title)}</strong><br>${escape(detail)}</li>`).join('');
    const language = (item.languageBank || []).map((phrase) => `<li>${escape(phrase)}</li>`).join('');
    const extraLanguage = (item.languageBankExtra || []).map((phrase) => `<li>${escape(phrase)}</li>`).join('');
    const vocabulary = (item.vocabularyBank || []).map(([title,terms]) => `<section class="vocab-cluster"><h4>${escape(title)}</h4><ul>${terms.map((term) => `<li>${escape(term)}</li>`).join('')}</ul></section>`).join('');
    const studentModels = (item.studentModels || []).map((model) => `<section class="student-model"><div><p class="eyebrow">${escape(model.label)}</p><h4>${escape(model.focus)}</h4></div><p class="model">${escape(model.text)}</p><ul>${(model.notes || []).map((note) => `<li>${escape(note)}</li>`).join('')}</ul></section>`).join('');
    const challenges = (item.revisionChallenges || []).map((challenge) => `<li>${escape(challenge)}</li>`).join('');
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · ORIGINAL SCAFFOLD</p><h2>${escape(item.title)}<span class="zh">${escape(item.titleZh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div><p class="prompt">${bilingual(item.prompt,item.promptZh)}</p><div class="source-pack">${sourcePack}</div><div class="writing-columns"><section class="writing-card"><h3>Paragraph plan · 段落規劃</h3><ol>${paragraphMap}</ol></section><section class="writing-card"><h3>Core language bank · 核心語言庫</h3><ul>${language}${extraLanguage}</ul></section><section class="writing-card"><h3>Original model for analysis · 原創範本供分析</h3><p class="model">${escape(item.model)}</p></section><section class="writing-card"><h3>Self-check · 自我檢查</h3><p>${escape(item.selfCheck)}</p></section></div>${vocabulary ? `<section class="resource-section"><h3>Precision vocabulary bank · 精準詞彙庫</h3><div class="vocab-grid">${vocabulary}</div></section>` : ''}${studentModels ? `<section class="resource-section"><h3>Student samples for analysis · 學生範本供分析</h3><div class="student-model-grid">${studentModels}</div></section>` : ''}${challenges ? `<section class="revision-box"><h3>Revision challenges · 修訂挑戰</h3><ul>${challenges}</ul></section>` : ''}<div class="draft-wrap"><label for="senior-draft">My draft · 我的草稿 <span class="zh">Practice target: ${item.minWords}–${item.minWords + 40} words · 練習目標字數，不是官方字數要求。</span></label><textarea id="senior-draft" class="draft" placeholder="Write your original response here… 在此寫你的原創回應…">${escape(saved)}</textarea><div class="draft-meta"><span id="draft-count">0 words</span> · Saved locally while you type. <span class="zh">輸入時只儲存在此瀏覽器。</span></div></div><div class="boundary"><strong>No automated writing-quality score · 不設自動寫作品質評分</strong><br>Use the samples, vocabulary bank, plan and self-check to revise your own response. <span class="zh">請使用範本、詞彙庫、段落規劃和自我檢查自行修訂。</span></div></article>`;
  }
  function renderPaper2(item, current) {
    const checked = reviews()[item.id] || [];
    const planning = (item.planningSteps || []).map(([title,detail]) => `<li><strong>${escape(title)}</strong><br>${escape(detail)}</li>`).join('');
    const structure = (item.structureMap || []).map(([title,move,reason]) => `<article><h4>${escape(title)}</h4><p><strong>Move · 做法</strong><br>${escape(move)}</p><p><strong>Why it helps · 作用</strong><br>${escape(reason)}</p></article>`).join('');
    const model = (item.annotatedModel || []).map(([label,text]) => `<article><b>${escape(label)}</b><p>${escape(text)}</p></article>`).join('');
    const checklist = (item.selfReview || []).map(([domain,statement], index) => `<label class="self-check"><input type="checkbox" data-paper2-check="${index}" ${checked.includes(index) ? 'checked' : ''}><span><b>${escape(domain)}</b><br>${escape(statement)}</span></label>`).join('');
    const revision = (item.revisionMoves || []).map((move) => `<li>${escape(move)}</li>`).join('');
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · ORIGINAL SELF-REVIEW</p><h2>${escape(item.title)}<span class="zh">${escape(item.titleZh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div><section class="paper2-boundary"><strong>Guided self-review only · 只供引導自我檢視</strong><p>This tool does not give an official Paper 2 mark, level, grade or best-fit judgment. <span class="zh">本工具不會提供官方卷二分數、等級、成績或最佳配合判斷。</span></p></section><p class="prompt">${bilingual(item.prompt,item.promptZh)}</p><div class="paper2-columns"><section class="writing-card"><h3>Plan before writing · 寫前規劃</h3><ol>${planning}</ol></section><section class="writing-card"><h3>Task framing · 任務定位</h3><p>${escape(item.taskType)}</p><p><strong>${escape(item.level)}</strong></p></section></div><section class="resource-section"><h3>Model structure analysis · 範文結構分析</h3><div class="structure-grid">${structure}</div></section><section class="resource-section"><h3>Annotated original model · 附註原創範文</h3><div class="annotated-model">${model}</div></section><section class="paper2-review"><h3>My revision check · 我的修訂檢查</h3><p>Tick evidence you can find in your own draft. This is a revision record, not a score. <span class="zh">勾選你能在自己草稿中找到的證據。這是修訂記錄，並非分數。</span></p><div class="self-check-grid">${checklist}</div></section><section class="revision-box"><h3>Targeted revision moves · 針對性修訂</h3><ul>${revision}</ul></section><div class="boundary"><strong>Original Paper 2 bridge practice · 原創卷二銜接練習</strong><br>${escape(studio.notice)}<span class="zh">${escape(studio.noticeZh)}</span></div></article>`;
  }
  function renderOral(item, current) {
    const saved = drafts()[`${item.id}-oral`] || '';
    const focus = (item.listeningFocus || []).map((entry) => `<li>${escape(entry)}</li>`).join('');
    const language = (item.languageBank || []).map((entry) => `<li>${escape(entry)}</li>`).join('');
    const rubric = (item.rubric || []).map(([label,detail]) => `<li><strong>${escape(label)}</strong><br>${escape(detail)}</li>`).join('');
    const selfCheck = (item.selfCheck || []).map((entry) => `<li>${escape(entry)}</li>`).join('');
    const peerPrompts = (item.peerPrompts || []).map((entry) => `<li>${escape(entry)}</li>`).join('');
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · ORIGINAL SIMULATION</p><h2>${escape(item.title)}<span class="zh">${escape(item.titleZh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div><section class="oral-role"><p class="eyebrow">Role card · 角色卡</p><p>${bilingual(item.roleCard,item.roleCardZh)}</p><span>${bilingual(item.time,item.timeZh)}</span></section>${renderAudio(item)}<div class="oral-grid"><section class="writing-card"><h3>Listening focus · 聆聽焦點</h3><ul>${focus}</ul></section><section class="writing-card"><h3>Speaking bank · 口語語言庫</h3><ul>${language}</ul></section><section class="writing-card"><h3>Original response model · 原創回應範本</h3><p class="model">${escape(item.model)}</p></section><section class="writing-card"><h3>Self-check · 自我檢查</h3><ul>${selfCheck}</ul></section></div>${peerPrompts ? `<section class="resource-section peer-prompts"><h3>Group interaction prompts · 小組互動提示</h3><ul>${peerPrompts}</ul></section>` : ''}<section class="rubric-box"><h3>Speaking rubric for self-review · 口語自我檢查量規</h3><ul>${rubric}</ul></section><div class="draft-wrap"><label for="oral-plan">My speaking plan · 我的口語計劃 <span class="zh">Write notes or a short outline; no automated speaking-quality score is provided.</span></label><textarea id="oral-plan" class="draft" placeholder="Plan your opening, evidence, response to concern and closing…">${escape(saved)}</textarea><div class="draft-meta"><span id="oral-count">0 words</span> · Saved locally while you type. <span class="zh">輸入時只儲存在此瀏覽器。</span></div></div><div class="controls"><button class="secondary" data-next>Next simulation · 下一個模擬</button></div><div class="boundary"><strong>No automated speaking-quality score · 不設自動口語品質評分</strong><br>Use the model and rubric to set one delivery goal before you practise aloud. <span class="zh">請運用範本和量規，在朗讀前設定一項表達目標。</span></div></article>`;
  }
  function renderTask() {
    const current = module();
    const item = task();
    if (!current || !item) { $('#task-area').innerHTML = '<article class="task-card"><h2>Module unavailable</h2></article>'; return; }
    if (current.type === 'writing') $('#task-area').innerHTML = renderWriting(item,current);
    else if (current.type === 'paper2') $('#task-area').innerHTML = renderPaper2(item,current);
    else if (current.type === 'oral') $('#task-area').innerHTML = renderOral(item,current);
    else $('#task-area').innerHTML = renderQuiz(item,current);
    bindTaskEvents();
  }
  function render() { renderStageNav(); renderSkillNav(); renderProgress(); renderPathway(); renderModuleNav(); renderTask(); bindNavEvents(); }
  function bindNavEvents() {
    document.querySelectorAll('[data-stage]').forEach((button) => button.onclick = () => { state.stage = button.dataset.stage; state.skill = 'grammar'; state.moduleId = null; resetTask(); render(); });
    document.querySelectorAll('[data-skill]').forEach((button) => button.onclick = () => { state.skill = button.dataset.skill; state.moduleId = null; resetTask(); render(); });
    document.querySelectorAll('[data-module]').forEach((button) => button.onclick = () => { state.moduleId = button.dataset.module; resetTask(); render(); });
    $('#clear-progress').onclick = () => { localStorage.removeItem(progressKey); localStorage.removeItem(draftKey); localStorage.removeItem(reviewKey); resetTask(); render(); };
  }
  function bindTaskEvents() {
    document.querySelectorAll('[data-choice]').forEach((button) => button.onclick = () => { if (!state.checked) { state.selected = Number(button.dataset.choice); renderTask(); } });
    const check = $('[data-check]');
    if (check) check.onclick = () => { const item = task(); if (state.selected === null || !item) return; state.checked = true; mark(module().id, state.selected === item.answer); renderTask(); renderProgress(); };
    const next = $('[data-next]');
    if (next) next.onclick = () => { const current = module(); state.index = (state.index + 1) % current.items.length; state.selected = null; state.checked = false; state.showTranscript = false; renderTask(); };
    const hint = $('[data-hint]');
    if (hint) hint.onclick = () => { hint.textContent = `Hint · 提示: ${hint.dataset.hint}`; };
    const play = $('[data-play-audio]');
    if (play) play.onclick = () => speak(task()?.audioScript || '');
    const transcript = $('[data-show-transcript]');
    if (transcript) transcript.onclick = () => { state.showTranscript = !state.showTranscript; renderTask(); };
    const draft = $('#senior-draft');
    if (draft) { const count = () => { const words = draft.value.trim() ? draft.value.trim().split(/\s+/).length : 0; $('#draft-count').textContent = `${words} words`; }; draft.addEventListener('input', () => { const data = drafts(); data[task().id] = draft.value; set(draftKey,data); count(); }); count(); }
    document.querySelectorAll('[data-paper2-check]').forEach((box) => box.onchange = () => { const data = reviews(); const id = task().id; const existing = new Set(data[id] || []); const index = Number(box.dataset.paper2Check); if (box.checked) existing.add(index); else existing.delete(index); data[id] = [...existing].sort((a,b) => a - b); set(reviewKey, data); });
    const oralPlan = $('#oral-plan');
    if (oralPlan) { const count = () => { const words = oralPlan.value.trim() ? oralPlan.value.trim().split(/\s+/).length : 0; $('#oral-count').textContent = `${words} words`; }; oralPlan.addEventListener('input', () => { const data = drafts(); data[`${task().id}-oral`] = oralPlan.value; set(draftKey,data); count(); }); count(); }
  }
  render();
})();
