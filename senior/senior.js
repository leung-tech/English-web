(() => {
  const studio = window.SENIOR_ENGLISH_STUDIO;
  if (!studio) return;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[char]);
  const letters = ['A','B','C','D'];
  const progressKey = 'senior-english-studio-progress-v1';
  const draftKey = 'senior-english-studio-drafts-v1';
  const reviewKey = 'senior-english-studio-paper2-selfreview-v1';
  const paper3Key = 'senior-english-studio-paper3-notes-v1';
  const transientStore = new Map();
  const get = (key, fallback) => transientStore.has(key) ? JSON.parse(JSON.stringify(transientStore.get(key))) : JSON.parse(JSON.stringify(fallback));
  const set = (key, value) => transientStore.set(key, JSON.parse(JSON.stringify(value)));
  const state = { stage:'s4', skill:'grammar', moduleId:null, index:0, selected:null, checked:false, showTranscript:false, paper3Answers:{}, paper3Checked:false, exam:null };
  let examTimer = null;
  const accountReturnKey = 'senior-english-account-return-v1';
  const skills = [
    {id:'grammar',label:'G Advanced grammar',zh:'進階文法'},
    {id:'reading',label:'R Critical reading',zh:'批判閱讀'},
    {id:'writing',label:'W Purposeful writing',zh:'有目的寫作'},
    {id:'paper2',label:'P2 Writing review',zh:'卷二寫作檢視'},
    {id:'paper3',label:'P3 Data & notes',zh:'卷三資料與筆記'},
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
  const paper3Records = () => get(paper3Key, {});
  const mark = (moduleId, correct) => {
    const data = progress();
    data.completed += 1;
    if (correct) data.correct += 1;
    data.modules[moduleId] = data.modules[moduleId] || {completed:0,correct:0};
    data.modules[moduleId].completed += 1;
    if (correct) data.modules[moduleId].correct += 1;
    set(progressKey, data);
    const currentModule = studio.modules.find((item) => item.id === moduleId) || {};
    window.EnglishTuitionAccount?.recordObjective({
      stage: String(currentModule.stage || state.stage || '').toUpperCase(),
      skill: currentModule.skill,
      moduleId,
      questionId: task()?.id || `${moduleId}-${state.index + 1}`,
      isCorrect: correct
    });
  };
  const bilingual = (english, chinese) => `${escape(english)}${chinese ? `<span class="zh">${escape(chinese)}</span>` : ''}`;
  const speak = (text) => { if (!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-GB'; utterance.rate = .92; window.speechSynthesis.speak(utterance); };
  const resetTask = () => { state.index = 0; state.selected = null; state.checked = false; state.showTranscript = false; state.paper3Answers = {}; state.paper3Checked = false; };
  const stopExamTimer = () => { if (examTimer) window.clearInterval(examTimer); examTimer = null; };
  const objectiveTotal = (current, item) => current?.type === 'paper3' ? (item?.noteItems?.length || 0) : (current?.items || []).filter((entry) => Array.isArray(entry.options)).length;
  const recordExam = (key, correct) => { if (state.exam?.test?.active) window.EnglishTimedPractice?.record(state.exam.test, key, correct); };
  function refreshExamClock() {
    const exam = state.exam?.test;
    if (!exam?.active) return;
    const remaining = window.EnglishTimedPractice?.remaining(exam) ?? 0;
    if (remaining <= 0) { window.EnglishTimedPractice?.expire(exam); stopExamTimer(); renderTask(); return; }
    const clock = $('[data-exam-time]');
    if (clock) { clock.textContent = window.EnglishTimedPractice.format(remaining); clock.classList.toggle('warning', remaining <= 60); }
  }
  const scheduleExamClock = () => { stopExamTimer(); if (state.exam?.test?.active) examTimer = window.setInterval(refreshExamClock, 1000); };

  function renderStageNav() {
    $('#stage-nav').innerHTML = studio.stages.map((item) => `<button class="stage-button ${item.id === state.stage ? 'active' : ''}" data-stage="${item.id}">${escape(item.label)}<span>${escape(item.zh)}</span></button>`).join('');
  }
  function renderSkillNav() {
    $('#skill-nav').innerHTML = skills.map((item) => `<button class="skill-button ${item.id === state.skill ? 'active' : ''}" data-skill="${item.id}">${escape(item.label)}<span>${escape(item.zh)}</span></button>`).join('');
  }
  function renderProgress() { $('#progress-summary').textContent = 'Account-only'; }
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
  function examStrip(item, current) {
    const total = objectiveTotal(current, item);
    if (!total || !window.EnglishTimedPractice) return '';
    const exam = state.exam?.moduleId === current.id ? state.exam.test : window.EnglishTimedPractice.create(total, 600);
    const summary = window.EnglishTimedPractice.summary(exam);
    const remaining = window.EnglishTimedPractice.remaining(exam);
    const action = !exam.active && !exam.expired && !exam.finished
      ? '<button class="exam-action" data-exam-start>Start 10-minute test · 開始 10 分鐘測驗</button>'
      : exam.active
        ? '<button class="exam-action secondary" data-exam-finish>Finish and see result · 交卷並查看成績</button>'
        : '<button class="exam-action" data-exam-retry>Retry timed test · 再試限時測驗</button>';
    const status = exam.expired || exam.finished
      ? `<section class="timed-practice-result"><h3>${exam.expired ? 'Time is up · 時間到' : 'Timed practice completed · 限時練習已交卷'}</h3><p>${summary.correct}/${summary.total} correct · 答對 ${summary.correct}/${summary.total} 題；${summary.unanswered} unanswered · ${summary.unanswered} 題未作答。這只屬本頁限時練習結果，並非官方分數。</p></section>`
      : `<div class="exam-status">${exam.active ? 'Timed test is running. Each objective response counts once. · 限時測驗進行中；每個客觀答案只計一次。' : 'Start the timer only when ready. · 準備好才開始倒數。'}</div>`;
    scheduleExamClock();
    return `<section class="timed-practice-strip"><div class="exam-metric"><strong>Exam mode · 考試模式</strong><span>Original practice · 原創練習</span></div><div class="exam-metric"><strong class="exam-time ${exam.active && remaining <= 60 ? 'warning' : ''}" data-exam-time>${window.EnglishTimedPractice.format(remaining)}</strong><span>Time remaining · 剩餘時間</span></div><div class="exam-metric"><strong>${summary.correct} / ${summary.total}</strong><span>Score · 分數</span></div>${status}${action}</section>`;
  }

  function renderQuiz(item, current) {
    const answer = item.answer;
    const locked = state.exam?.test?.finished ? 'disabled' : '';
    return `${examStrip(item,current)}<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · 原創練習</p><h2>${escape(item.label)}<span class="zh">${escape(current.zh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div>${renderAudio(item)}${item.context ? `<div class="context"><strong>${item.context.includes('Source') ? 'Original source pack · 原創資料包' : 'Original text · 原創文本'}</strong><br>${escape(item.context)}${item.contextZh ? `<span class="zh">${escape(item.contextZh)}</span>` : ''}</div>` : ''}<p class="prompt">${bilingual(item.prompt,item.zh)}</p><div class="options">${item.options.map((option,index) => `<button class="option ${state.selected === index ? 'selected' : ''}" data-choice="${index}" ${state.checked || locked ? 'disabled' : ''}><b>${letters[index]}</b><span>${escape(option)}</span></button>`).join('')}</div><div class="controls"><button class="primary" data-check ${locked}>Check answer · 核對答案</button><button class="secondary" data-next ${locked}>Next · 下一題</button>${item.hint ? `<button class="secondary" data-hint="${escape(item.hint)}">Hint · 提示</button>` : ''}</div>${state.checked ? `<div class="feedback ${state.selected === answer ? 'good' : 'bad'}"><strong>${state.selected === answer ? '✓ Accurate response.' : 'Review the wording and evidence.'}</strong>${bilingual(item.explanation,item.explanationZh)}</div>` : ''}<div class="boundary"><strong>Original DSE-bridge practice · 原創 DSE 銜接練習</strong><br>${escape(studio.notice)}<span class="zh">${escape(studio.noticeZh)}</span></div></article>`;
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
    return `<article class="task-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · ORIGINAL SCAFFOLD</p><h2>${escape(item.title)}<span class="zh">${escape(item.titleZh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div><p class="prompt">${bilingual(item.prompt,item.promptZh)}</p><div class="source-pack">${sourcePack}</div><div class="writing-columns"><section class="writing-card"><h3>Paragraph plan · 段落規劃</h3><ol>${paragraphMap}</ol></section><section class="writing-card"><h3>Core language bank · 核心語言庫</h3><ul>${language}${extraLanguage}</ul></section><section class="writing-card"><h3>Original model for analysis · 原創範本供分析</h3><p class="model">${escape(item.model)}</p></section><section class="writing-card"><h3>Self-check · 自我檢查</h3><p>${escape(item.selfCheck)}</p></section></div>${vocabulary ? `<section class="resource-section"><h3>Precision vocabulary bank · 精準詞彙庫</h3><div class="vocab-grid">${vocabulary}</div></section>` : ''}${studentModels ? `<section class="resource-section"><h3>Student samples for analysis · 學生範本供分析</h3><div class="student-model-grid">${studentModels}</div></section>` : ''}${challenges ? `<section class="revision-box"><h3>Revision challenges · 修訂挑戰</h3><ul>${challenges}</ul></section>` : ''}<div class="draft-wrap"><label for="senior-draft">My draft · 我的草稿 <span class="zh">Practice target: ${item.minWords}–${item.minWords + 40} words · 練習目標字數，不是官方字數要求。</span></label><textarea id="senior-draft" class="draft" placeholder="Write your original response here… 在此寫你的原創回應…">${escape(saved)}</textarea><div class="draft-meta"><span id="draft-count">0 words</span> · This draft stays only in the current browser session until you choose to submit it. <span class="zh">在你選擇提交前，草稿只會留在目前瀏覽器工作階段。</span></div></div><section class="writing-ai-panel"><h3>AI feedback for this writing · 此寫作題目的 AI 評語</h3><p>Choose Submit only when ready: this article will be stored in your private account for grade-level formative feedback. It is not an official HKDSE score. <span class="zh">只在準備好時才提交：文章會儲存於你的私人帳戶，以取得按年級的形成性評語；並非官方 HKDSE 分數。</span></p><button class="secondary" type="button" data-ai-writing-submit>Submit this writing for AI feedback · 提交此文章取得 AI 評語</button><div data-ai-writing-feedback aria-live="polite"></div></section><div class="boundary"><strong>Formative AI feedback, not an official writing-quality score · 形成性 AI 回饋，並非官方寫作分數</strong><br>Use the samples, vocabulary bank, plan, self-check and feedback to revise your own response. <span class="zh">請運用範本、詞彙庫、段落規劃、自我檢查及評語修訂自己的回應。</span></div></article>`;
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
  function renderPaper3(item, current) {
    const records = paper3Records()[item.id] || {sources:[],review:[]};
    const sources = new Set(records.sources || []);
    const review = new Set(records.review || []);
    const saved = drafts()[`${item.id}-plan`] || '';
    const score = (item.noteItems || []).reduce((total, note, index) => total + (state.paper3Answers[index] === note.answer ? 1 : 0), 0);
    const locked = state.exam?.test?.finished;
    const sourcePack = (item.sourcePack || []).map(([title, content]) => `<article><b>${escape(title)}</b><p>${escape(content)}</p></article>`).join('');
    const notes = (item.noteItems || []).map((note, index) => `<section class="paper3-note ${state.paper3Checked ? (state.paper3Answers[index] === note.answer ? 'correct' : 'review') : ''}"><div><p class="eyebrow">Note ${index + 1} · ${escape(note.label)}</p><p class="prompt">${bilingual(note.prompt,note.promptZh)}</p></div><div class="paper3-options">${note.options.map((option, optionIndex) => `<label><input type="radio" name="paper3-note-${index}" data-paper3-choice="${index}" value="${optionIndex}" ${state.paper3Answers[index] === optionIndex ? 'checked' : ''} ${state.paper3Checked || locked ? 'disabled' : ''}><span>${escape(option)}</span></label>`).join('')}</div>${note.hint ? `<div class="controls"><button class="secondary" data-note-hint="${escape(note.hint)}">Hint · 提示</button></div>` : ''}${state.paper3Checked ? `<p class="paper3-feedback"><strong>${state.paper3Answers[index] === note.answer ? '✓ Accurate shorthand.' : `Suggested note: ${escape(note.options[note.answer])}`}</strong><br>${bilingual(note.explanation,note.explanationZh)}</p>` : ''}</section>`).join('');
    const sourceChecks = (item.sourceChecklist || []).map((entry, index) => `<label class="self-check"><input type="checkbox" data-paper3-source="${index}" ${sources.has(index) ? 'checked' : ''}><span>${escape(entry)}</span></label>`).join('');
    const responseMap = (item.responseMap || []).map(([title, detail]) => `<li><strong>${escape(title)}</strong><br>${escape(detail)}</li>`).join('');
    const language = (item.languageBank || []).map((entry) => `<li>${escape(entry)}</li>`).join('');
    const selfReview = (item.selfReview || []).map((entry, index) => `<label class="self-check"><input type="checkbox" data-paper3-review="${index}" ${review.has(index) ? 'checked' : ''}><span>${escape(entry)}</span></label>`).join('');
    const revision = (item.revisionMoves || []).map((entry) => `<li>${escape(entry)}</li>`).join('');
    return `${examStrip(item,current)}<article class="task-card paper3-card"><div class="task-top"><div><p class="eyebrow">${escape(current.title.toUpperCase())} · ORIGINAL INTEGRATED PRACTICE</p><h2>${escape(item.title)}<span class="zh">${escape(item.titleZh)}</span></h2></div><span class="step">${state.index + 1} / ${current.items.length}</span></div><section class="paper3-boundary"><strong>Original Paper 3 skills practice · 原創卷三能力練習</strong><p>This practice supports listening, data handling, note abbreviation and response planning. It is not an official HKDSE Paper 3, recording, data file, marking scheme, time simulation or score prediction. <span class="zh">本練習支援聆聽、資料處理、筆記縮寫及回應規劃；並非官方 HKDSE 卷三、錄音、資料檔、評分準則、計時模擬或成績預測。</span></p></section>${renderAudio(item)}<section class="resource-section paper3-source"><h3>Original data file · 原創資料檔</h3><div class="source-pack">${sourcePack}</div></section><section class="paper3-notes"><div class="section-heading"><div><p class="eyebrow">DATA PROCESSING · 資料處理</p><h3>Note-abbreviation check · 筆記縮寫核對</h3><p>Replay the input if needed. Choose a short note that keeps the necessary meaning; then check all six together. <span class="zh">如有需要可重播。選擇保留必要意思的簡短筆記，再一次過核對六題。</span></p></div><span class="step">${state.paper3Checked ? `${score} / ${item.noteItems.length}` : '6 notes'}</span></div><div class="paper3-note-grid">${notes}</div><div class="controls"><button class="primary" data-paper3-check ${state.paper3Checked || locked ? 'disabled' : ''}>Check six notes · 核對六則筆記</button><button class="secondary" data-paper3-reset ${locked ? 'disabled' : ''}>Try again · 再試一次</button></div></section><section class="paper3-review"><h3>Source selection check · 資料選取檢查</h3><p>Tick what you can identify before planning. These are private preparation records, not marks. <span class="zh">在規劃前勾選你能辨識的資料。這些是私人準備紀錄，並非分數。</span></p><div class="self-check-grid">${sourceChecks}</div></section><section class="resource-section"><h3>Integrated response plan · 綜合回應規劃</h3><p class="prompt">${bilingual(item.integrationPlan,item.integrationPlanZh)}</p><div class="paper3-columns"><section class="writing-card"><h3>Planning map · 規劃地圖</h3><ol>${responseMap}</ol></section><section class="writing-card"><h3>Purposeful language · 目的語言庫</h3><ul>${language}</ul></section></div><div class="draft-wrap"><label for="paper3-plan">My source-based plan · 我的資料導向規劃 <span class="zh">Write brief notes or an outline; it is stored in this browser only.</span></label><textarea id="paper3-plan" class="draft" placeholder="Plan which source detail you will use, why it is relevant, and how you will organise the response…">${escape(saved)}</textarea><div class="draft-meta"><span id="paper3-count">0 words</span> · Saved locally while you type. <span class="zh">輸入時只儲存在此瀏覽器。</span></div></div></section><section class="paper3-review"><h3>My integrated-skills self-review · 我的綜合能力自我檢查</h3><div class="self-check-grid">${selfReview}</div></section><section class="revision-box"><h3>Refine the notes · 優化筆記</h3><ul>${revision}</ul></section><div class="boundary"><strong>No official Paper 3 score or writing-quality score · 不設官方卷三分數或自動寫作品質評分</strong><br>Use the objective note check, source-selection record and response plan to improve your own integrated response. <span class="zh">請運用客觀筆記核對、資料選取紀錄和回應規劃，提升自己的綜合回應。</span></div></article>`;
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
    else if (current.type === 'paper3') $('#task-area').innerHTML = renderPaper3(item,current);
    else if (current.type === 'oral') $('#task-area').innerHTML = renderOral(item,current);
    else $('#task-area').innerHTML = renderQuiz(item,current);
    bindTaskEvents();
  }
  function render() { renderStageNav(); renderSkillNav(); renderProgress(); renderPathway(); renderModuleNav(); renderTask(); bindNavEvents(); }
  function saveAccountReturn() {
    try { sessionStorage.setItem(accountReturnKey, JSON.stringify(state)); } catch { /* Account access must never interrupt practice. */ }
  }
  function restoreAccountReturn() {
    if (sessionStorage.getItem('english-tuition-restore-practice-v1') !== '1') return false;
    sessionStorage.removeItem('english-tuition-restore-practice-v1');
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(accountReturnKey) || 'null'); } catch { saved = null; }
    if (!saved || typeof saved !== 'object') return false;
    sessionStorage.removeItem(accountReturnKey);
    Object.assign(state, saved);
    render();
    return true;
  }
  function bindNavEvents() {
    document.querySelectorAll('[data-stage]').forEach((button) => button.onclick = () => { stopExamTimer(); state.exam = null; state.stage = button.dataset.stage; state.skill = 'grammar'; state.moduleId = null; resetTask(); render(); });
    document.querySelectorAll('[data-skill]').forEach((button) => button.onclick = () => { stopExamTimer(); state.exam = null; state.skill = button.dataset.skill; state.moduleId = null; resetTask(); render(); });
    document.querySelectorAll('[data-module]').forEach((button) => button.onclick = () => { stopExamTimer(); state.exam = null; state.moduleId = button.dataset.module; resetTask(); render(); });
    $('#clear-progress').onclick = () => { transientStore.clear(); resetTask(); render(); };
  }
  function bindTaskEvents() {
    document.querySelectorAll('[data-choice]').forEach((button) => button.onclick = () => { if (!state.checked && !state.exam?.test?.finished) { state.selected = Number(button.dataset.choice); renderTask(); } });
    const check = $('[data-check]');
    if (check) check.onclick = () => { const item = task(); if (state.selected === null || !item || state.exam?.test?.finished) return; const correct = state.selected === item.answer; state.checked = true; mark(module().id, correct); recordExam(item.id || `${module().id}-${state.index + 1}`, correct); renderTask(); renderProgress(); };
    const next = $('[data-next]');
    if (next) next.onclick = () => { if (state.exam?.test?.finished) return; const current = module(); state.index = (state.index + 1) % current.items.length; state.selected = null; state.checked = false; state.showTranscript = false; state.paper3Answers = {}; state.paper3Checked = false; renderTask(); };
    document.querySelectorAll('[data-exam-start], [data-exam-retry]').forEach((button) => button.onclick = () => { const current = module(); const item = task(); state.exam = { moduleId: current.id, test: window.EnglishTimedPractice.restart(window.EnglishTimedPractice.create(objectiveTotal(current, item), 600)) }; resetTask(); renderTask(); });
    document.querySelectorAll('[data-exam-finish]').forEach((button) => button.onclick = () => { if (state.exam?.test) { window.EnglishTimedPractice.finish(state.exam.test); stopExamTimer(); renderTask(); } });
    const hint = $('[data-hint]');
    if (hint) hint.onclick = () => { hint.textContent = `Hint · 提示: ${hint.dataset.hint}`; };
    document.querySelectorAll('[data-note-hint]').forEach((button) => button.onclick = () => { button.textContent = `Hint · 提示: ${button.dataset.noteHint}`; });
    const play = $('[data-play-audio]');
    if (play) play.onclick = () => speak(task()?.audioScript || '');
    const transcript = $('[data-show-transcript]');
    if (transcript) transcript.onclick = () => { state.showTranscript = !state.showTranscript; renderTask(); };
    const draft = $('#senior-draft');
    if (draft) { const count = () => { const words = draft.value.trim() ? draft.value.trim().split(/\s+/).length : 0; $('#draft-count').textContent = `${words} words`; }; draft.addEventListener('input', () => { const data = drafts(); data[task().id] = draft.value; set(draftKey,data); count(); }); count(); }
    const aiWriting = $('[data-ai-writing-submit]');
    if (aiWriting) {
      aiWriting.disabled = true;
      aiWriting.textContent = 'Automated feedback paused · 自動評語已暫停';
      aiWriting.closest('.writing-ai-panel')?.querySelector('h3')?.replaceChildren('Self-review only · 只供自我檢查');
      const output = $('[data-ai-writing-feedback]');
      if (output) output.innerHTML = '<p class="zh">Your draft stays in this browser. Use the source pack, structure, language bank and revision checks to improve it; nothing is submitted, stored or automatically marked. · 草稿只留在此瀏覽器。請用資料包、結構、語言庫及修訂檢查改善內容；系統不會提交、儲存或自動評分。</p>';
    }
    document.querySelectorAll('[data-paper2-check]').forEach((box) => box.onchange = () => { const data = reviews(); const id = task().id; const existing = new Set(data[id] || []); const index = Number(box.dataset.paper2Check); if (box.checked) existing.add(index); else existing.delete(index); data[id] = [...existing].sort((a,b) => a - b); set(reviewKey, data); });
    document.querySelectorAll('[data-paper3-choice]').forEach((input) => input.onchange = () => { if (!state.paper3Checked && !state.exam?.test?.finished) { state.paper3Answers[Number(input.dataset.paper3Choice)] = Number(input.value); renderTask(); } });
    const paper3Check = $('[data-paper3-check]');
    if (paper3Check) paper3Check.onclick = () => { const item = task(); if (!item || state.exam?.test?.finished || Object.keys(state.paper3Answers).length !== item.noteItems.length) return; state.paper3Checked = true; const accurate = item.noteItems.every((note, index) => state.paper3Answers[index] === note.answer); mark(module().id, accurate); item.noteItems.forEach((note, index) => recordExam(`${item.id}-note-${index + 1}`, state.paper3Answers[index] === note.answer)); renderTask(); renderProgress(); };
    const paper3Reset = $('[data-paper3-reset]');
    if (paper3Reset) paper3Reset.onclick = () => { if (state.exam?.test?.finished) return; state.paper3Answers = {}; state.paper3Checked = false; renderTask(); };
    const updatePaper3Record = (kind, index, checked) => { const data = paper3Records(); const id = task().id; const current = data[id] || {sources:[],review:[]}; const values = new Set(current[kind] || []); if (checked) values.add(index); else values.delete(index); current[kind] = [...values].sort((a,b) => a - b); data[id] = current; set(paper3Key, data); };
    document.querySelectorAll('[data-paper3-source]').forEach((box) => box.onchange = () => updatePaper3Record('sources', Number(box.dataset.paper3Source), box.checked));
    document.querySelectorAll('[data-paper3-review]').forEach((box) => box.onchange = () => updatePaper3Record('review', Number(box.dataset.paper3Review), box.checked));
    const paper3Plan = $('#paper3-plan');
    if (paper3Plan) { const count = () => { const words = paper3Plan.value.trim() ? paper3Plan.value.trim().split(/\s+/).length : 0; $('#paper3-count').textContent = `${words} words`; }; paper3Plan.addEventListener('input', () => { const data = drafts(); data[`${task().id}-plan`] = paper3Plan.value; set(draftKey,data); count(); }); count(); }
    const oralPlan = $('#oral-plan');
    if (oralPlan) { const count = () => { const words = oralPlan.value.trim() ? oralPlan.value.trim().split(/\s+/).length : 0; $('#oral-count').textContent = `${words} words`; }; oralPlan.addEventListener('input', () => { const data = drafts(); data[`${task().id}-oral`] = oralPlan.value; set(draftKey,data); count(); }); count(); }
  }
  window.EnglishTuitionPractice = Object.freeze({ saveAccountReturn, restoreAccountReturn });
  render();
})();
