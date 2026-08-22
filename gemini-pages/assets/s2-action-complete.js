/*
 * S2 Action complete preview engine.
 * Gemini editors: edit ../data/s2-community-and-environment-data.js for lesson content.
 * This file renders the full unit interface and keeps progress in this browser only.
 */
(() => {
  'use strict';
  const unit = window.S2_COMMUNITY_ENVIRONMENT;
  const app = document.querySelector('#s2-action-app');
  const storageKey = 'primary-english-studio-s2-action-complete-v1';
  const modules = [
    ['grammar', 'G', 'Grammar in context', '語境文法'],
    ['vocabulary', 'V', 'Community words', '社區詞彙'],
    ['reading', 'R', 'Paired reading', '配對閱讀'],
    ['listening', 'L', 'Hear the plan', '聽懂行動計劃'],
    ['writing', 'W', 'Writing workshop', '寫作工作坊'],
    ['writing-advanced', 'W+', 'Advanced writing lab', '進階寫作室'],
    ['dialogue', 'D', 'Community dialogue lab', '社區對話室'],
    ['speaking', 'S', 'Recommend and report', '推薦與報告']
  ];
  const state = { module: 'grammar', index: 0, checkpoint: 0, selected: null, checked: false };
  const escape = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const wordCount = (text = '') => (text.trim().match(/\S+/g) || []).length;
  const letters = ['A', 'B', 'C', 'D'];
  const progress = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; } };
  const complete = (id) => { const saved = progress(); saved[id] = new Date().toISOString(); localStorage.setItem(storageKey, JSON.stringify(saved)); };
  const speak = (text) => {
    if (!('speechSynthesis' in window)) { window.alert('Your browser cannot play speech. Please read the English aloud. · 你的瀏覽器未能播放語音，請自行朗讀英文。'); return; }
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = 'en-GB'; voice.rate = 0.9;
    window.speechSynthesis.speak(voice);
  };
  const shuffle = (options, answer) => {
    const correct = options[answer];
    const list = [...options].sort(() => Math.random() - 0.5);
    return { list, answer: list.indexOf(correct) };
  };
  const sourcePack = (task) => `<div class="source-pack">${task.sourcePack.map(([label, text]) => `<article class="source-card"><small>${escape(label)}</small><p>${escape(text)}</p></article>`).join('')}</div>`;
  const feedback = (message, messageZh, good) => `<div class="feedback show ${good ? 'correct' : ''}"><strong>${good ? '✓ ' : 'Try again · 再試一次 · '}${escape(message)}</strong><small>${escape(messageZh || '')}</small></div>`;

  function objectiveItems(module) {
    if (module === 'grammar') return unit.grammar.questions.map(([id, contextTitle, context, promptZh, options, answer, explanation, explanationZh, hint]) => ({ id, skill: 'Grammar · 文法', title: contextTitle, context, prompt: 'Choose the best answer to complete the sentence in this context.', promptZh, options, answer, explanation, explanationZh, hint }));
    if (module === 'vocabulary') return unit.vocabulary.items.map(([word, chinese, definition, example, prompt, answer, options], index) => ({ id: `complete-vocabulary-${index}-${word}`, skill: 'Vocabulary · 詞彙', title: word, context: `Meaning: ${definition}\nExample: ${example}`, prompt, promptZh: `Which word fits this S2 community and environment context? 重點詞語：${chinese}。`, options, answer: options.indexOf(answer), explanation: `“${word}” means ${definition}.`, explanationZh: `「${word}」的意思是「${chinese}」。`, hint: `Use the word meaning and example: ${chinese}。` }));
    if (module === 'reading') return unit.reading.sets.flatMap((set) => set.questions.map(([id, prompt, promptZh, options, answer, explanation, explanationZh, hint]) => ({ id, skill: 'Reading · 閱讀', title: set.title, titleZh: set.titleZh, pairedTexts: set.texts, prompt, promptZh, options, answer, explanation, explanationZh, hint })));
    if (module === 'listening') return unit.listening.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => ({ id: `complete-listening-${script.id}-${index}`, skill: 'Listening · 聆聽', title: script.title, titleZh: script.titleZh, audioText: script.script, prompt, promptZh, options, answer, explanation, explanationZh, hint: 'Read the question first. Listen for an action, location, resource, reason or likely result. · 先讀題目；聆聽行動、地點、資源、原因或可能結果。' })));
    return [];
  }

  function renderNavigation() {
    return `<aside class="sidebar"><p class="eyebrow">S2 ACTION · UNIT MAP</p><h2>Choose a practice area<small style="display:block;color:var(--green);font:700 12px 'Noto Sans TC',sans-serif;margin-top:4px">選擇練習範疇</small></h2><p>One complete, browser-only preview. Lesson content stays in a single data file for safe Gemini editing.</p><nav class="module-nav">${modules.map(([id, token, title, zh]) => `<button class="module-tab ${state.module === id ? 'active' : ''}" data-module="${id}"><b>${token} · ${escape(title)}</b><small>${escape(zh)}</small></button>`).join('')}</nav><div class="local-note"><b>Local progress only · 本機進度</b><br>Completion records remain in this browser. This page does not give automated language-quality scores.</div></aside>`;
  }

  function renderObjective() {
    const items = objectiveItems(state.module);
    const item = items[state.index] || items[0];
    if (!item) return '<p>No data found. · 找不到資料。</p>';
    if (!state.shuffled || state.shuffled.id !== item.id) state.shuffled = { id: item.id, ...shuffle(item.options, item.answer) };
    const choiceMarkup = state.shuffled.list.map((choice, index) => `<button class="choice ${state.checked && index === state.shuffled.answer ? 'correct' : ''} ${state.checked && index === state.selected && index !== state.shuffled.answer ? 'wrong' : ''} ${!state.checked && state.selected === index ? 'selected' : ''}" data-choice="${index}" ${state.checked ? 'disabled' : ''}><span class="choice-token">${letters[index]}</span><span>${escape(choice)}</span></button>`).join('');
    const pair = item.pairedTexts ? `<section class="paired-grid">${item.pairedTexts.map((text) => `<article class="paired-card"><small>${escape(text.label)}</small><h3>${escape(text.title)}</h3><p>${escape(text.text)}</p><div class="purpose"><b>Purpose · 寫作目的</b>${escape(text.purpose)}<br><i>${escape(text.purposeZh)}</i></div></article>`).join('')}</section>` : '';
    const audio = item.audioText ? `<section class="listen-box"><div><strong>${escape(item.title)}${item.titleZh ? ` · ${escape(item.titleZh)}` : ''}</strong><span>Replay the English script before you answer. · 作答前可重播英文逐字稿。</span></div><button class="audio-button" id="play-audio">▶ Play audio · 播放錄音</button></section><div class="transcript ${state.checked ? 'show' : ''}" id="transcript"><strong>Transcript · 逐字稿</strong><br>${escape(item.audioText)}</div>` : '';
    const context = item.context ? `<article class="context"><strong>${escape(item.title)}</strong>${escape(item.context).replaceAll('\n', '<br>')}</article>` : '';
    return `<div class="statusline"><span><b>${state.index + 1} / ${items.length}</b> · ${escape(item.skill)}</span><span>Original practice · 原創練習</span></div><div class="section-title"><h2>${escape(item.title)}<small>${escape(item.titleZh || '')}</small></h2></div>${audio}${pair}${context}<section class="question-card"><p class="prompt">${escape(item.prompt)}</p><p class="prompt-zh">${escape(item.promptZh)}</p><div class="choice-grid">${choiceMarkup}</div><div class="actions"><button class="secondary" id="hint-button">Hint · 提示</button><button class="primary" id="check-button" ${state.selected === null || state.checked ? 'disabled' : ''}>Check answer · 檢查答案</button><button class="secondary" id="next-button" ${state.index === items.length - 1 ? 'disabled' : ''}>Next · 下一題</button></div><div id="feedback-slot">${state.checked ? feedback(item.explanation, item.explanationZh, state.selected === state.shuffled.answer) : ''}</div></section>`;
  }

  function renderWriting(advanced) {
    const tasks = unit.writing.filter((task) => Boolean(task.level === 'advanced') === advanced);
    const task = tasks[state.index] || tasks[0];
    const minWords = advanced ? 140 : 100;
    const map = advanced ? task.paragraphMap : [['Plan · 寫作規劃', task.plan], ['Self-check · 自我檢查', task.selfCheck]];
    return `<div class="statusline"><span><b>${state.index + 1} / ${tasks.length}</b> · Writing · 寫作</span><span>${advanced ? 'Advanced source-pack task · 進階資料包任務' : 'Original practice · 原創練習'}</span></div><div class="section-title"><h2>${escape(task.title)}<small>${escape(task.titleZh)}</small></h2></div><section class="task-card"><small>${advanced ? 'EVIDENCE-LED WRITING · 以證據支持寫作' : 'PLAN, DRAFT, CHECK · 規劃、起草、檢查'}</small><p class="prompt">${escape(task.prompt)}</p><p class="prompt-zh">${escape(task.promptZh)}</p>${advanced ? sourcePack(task) : ''}<h3>Paragraph map · 段落規劃</h3><ol class="plan-map">${map.map(([label, detail]) => `<li><b>${escape(label)}</b><br>${escape(detail)}</li>`).join('')}</ol>${advanced ? `<h3>Language bank · 句式庫</h3><div class="language-bank">${task.languageBank.map((line) => `<span class="language-chip">${escape(line)}</span>`).join('')}</div>` : ''}<textarea id="draft" class="draft" placeholder="Write your English response here… · 在此以英文寫作…"></textarea><p class="word-line" id="word-line">0 words · 0 字 · target: ${minWords}${advanced ? '–170' : '–120'} words</p><label class="self-check"><input id="self-check" type="checkbox"><span>${escape(task.selfCheck)}<br><small>This is a completion self-check only. It does not assess writing quality automatically. · 此為完成自我檢查，不會自動評核寫作品質。</small></span></label><div class="actions"><button class="secondary" id="hint-button">Hint · 提示</button><button class="primary" id="record-writing">Record completion · 記錄完成</button>${tasks.length > 1 ? `<button class="secondary" id="next-writing" ${state.index === tasks.length - 1 ? 'disabled' : ''}>Next task · 下一項</button>` : ''}</div><div id="feedback-slot"></div></section>`;
  }

  function renderSpeaking() {
    const task = unit.speaking[state.index] || unit.speaking[0];
    return `<div class="statusline"><span><b>${state.index + 1} / ${unit.speaking.length}</b> · Speaking · 口語</span><span>Model-supported · 附示範</span></div><div class="section-title"><h2>${escape(task.title)}<small>${escape(task.titleZh)}</small></h2></div><section class="task-card"><p class="prompt">${escape(task.prompt)}</p><p class="prompt-zh">${escape(task.promptZh)}</p><section class="listen-box"><div><strong>Model answer · 示範答案</strong><span>Replay the English model, then speak for 45–60 seconds in your own words.</span></div><button class="audio-button" id="play-model">▶ Play model · 播放示範</button></section><ol class="plan-map"><li><b>Position · 立場</b><br>State your action, choice or survey finding clearly.</li><li><b>Reason and evidence · 理由與證據</b><br>Add one practical reason, comparison or evidence detail.</li><li><b>Result · 結果</b><br>End with a likely result or next step.</li></ol><label class="self-check"><input id="self-check" type="checkbox"><span>${escape(task.selfCheck)}<br><small>This page records practice completion only; it does not assess spoken English automatically.</small></span></label><div class="actions"><button class="secondary" id="hint-button">Hint · 提示</button><button class="primary" id="record-speaking">Record completion · 記錄完成</button><button class="secondary" id="next-speaking" ${state.index === unit.speaking.length - 1 ? 'disabled' : ''}>Next task · 下一項</button></div><div id="feedback-slot"></div></section>`;
  }

  function renderDialogue() {
    const dialogue = unit.dialogues[state.index] || unit.dialogues[0];
    const checkpoint = dialogue.checkpoints[state.checkpoint] || dialogue.checkpoints[0];
    if (!state.shuffled || state.shuffled.id !== `${dialogue.id}-${state.checkpoint}`) state.shuffled = { id: `${dialogue.id}-${state.checkpoint}`, ...shuffle(checkpoint.options, checkpoint.answer) };
    const choiceMarkup = state.shuffled.list.map((choice, index) => `<button class="choice ${state.checked && index === state.shuffled.answer ? 'correct' : ''} ${state.checked && index === state.selected && index !== state.shuffled.answer ? 'wrong' : ''} ${!state.checked && state.selected === index ? 'selected' : ''}" data-choice="${index}" ${state.checked ? 'disabled' : ''}><span class="choice-token">${letters[index]}</span><span>${escape(choice)}</span></button>`).join('');
    return `<div class="statusline"><span><b>Dialogue ${state.index + 1} / ${unit.dialogues.length}</b> · Checkpoint ${state.checkpoint + 1} / ${dialogue.checkpoints.length}</span><span>Listen · respond · adapt</span></div><div class="section-title"><h2>${escape(dialogue.title)}<small>${escape(dialogue.titleZh)}</small></h2></div><section class="dialogue-card"><small>ROLE-PLAY PRACTICE · 角色對話</small><p>${escape(dialogue.goal)}<br><span class="prompt-zh">${escape(dialogue.goalZh)}</span></p><div class="dialogue-meta">${dialogue.roles.map((role) => `<span class="role-badge">${escape(role)}</span>`).join('')}</div><div class="actions"><button class="audio-button" id="play-role-a">▶ Listen to A · 聽 A 角色</button><button class="audio-button" id="play-role-b">▶ Listen to B · 聽 B 角色</button><button class="secondary" id="play-dialogue">▶ Play full dialogue · 播放完整對話</button></div><div class="dialogue-lines">${dialogue.dialogue.map(([speaker, line]) => `<div class="line ${speaker === 'B' ? 'b' : ''}"><b>Role ${speaker}</b>${escape(line)}</div>`).join('')}</div><div class="useful"><b>Useful language · 實用語句</b><br>${dialogue.language.map((line) => `<em>${escape(line)}</em>`).join('')}</div><div class="dialogue-check"><p class="prompt">${escape(checkpoint.prompt)}</p><p class="prompt-zh">${escape(checkpoint.promptZh)}</p><div class="choice-grid">${choiceMarkup}</div><div class="actions"><button class="secondary" id="hint-button">Hint · 提示</button><button class="primary" id="check-button" ${state.selected === null || state.checked ? 'disabled' : ''}>Check response · 檢查回應</button><button class="secondary" id="next-checkpoint" ${!state.checked || (state.checkpoint === dialogue.checkpoints.length - 1 && state.index === unit.dialogues.length - 1) ? 'disabled' : ''}>Next checkpoint · 下一關</button></div><div id="feedback-slot">${state.checked ? feedback(checkpoint.explanation, checkpoint.explanationZh, state.selected === state.shuffled.answer) : ''}</div></div><label class="self-check"><input id="self-check" type="checkbox"><span>${escape(dialogue.selfCheck)}<br><small>Completion is self-checked only. This page does not score spoken English automatically.</small></span></label></section>`;
  }

  function panel() {
    if (!unit) return '<section class="main-panel"><h1>Lesson data could not be loaded.</h1></section>';
    if (['grammar', 'vocabulary', 'reading', 'listening'].includes(state.module)) return renderObjective();
    if (state.module === 'writing') return renderWriting(false);
    if (state.module === 'writing-advanced') return renderWriting(true);
    if (state.module === 'dialogue') return renderDialogue();
    return renderSpeaking();
  }

  function render() {
    app.innerHTML = `<div class="shell"><header class="topbar"><a class="brand" href="index.html"><span class="brand-mark">PE</span><span>Primary English Studio<br><small>GEMINI-EDITABLE S2 ACTION</small></span></a><a class="return" href="index.html">← S2 directory · S2 目錄</a></header><section class="hero"><div><p class="eyebrow">S2 ACTION · COMMUNITY AND ENVIRONMENT</p><h1>Notice the problem.<br>Propose an action.<small>發現問題，提出行動。</small></h1><p>A complete bilingual S2 Action preview. Explore eight learning areas, replay models, answer questions, draft an evidence-led proposal and rehearse community dialogue. All content is original practice and remains editable in one data file.</p></div><aside class="original-note"><strong>ORIGINAL PRACTICE · 原創練習</strong>Not an official examination paper. Progress is stored in this browser only. Writing and speaking completion do not give automatic language-quality scores.</aside></section><main class="workspace">${renderNavigation()}<section class="main-panel" id="unit-panel">${panel()}</section></main></div>`;
    bind();
  }

  function showFeedback(message, messageZh, good) { const slot = document.querySelector('#feedback-slot'); if (slot) slot.innerHTML = feedback(message, messageZh, good); }
  function resetQuestion() { state.selected = null; state.checked = false; state.shuffled = null; }
  function bindObjective() {
    const items = objectiveItems(state.module); const item = items[state.index] || items[0];
    document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { if (state.checked) return; state.selected = Number(button.dataset.choice); document.querySelectorAll('[data-choice]').forEach((choice) => choice.classList.toggle('selected', Number(choice.dataset.choice) === state.selected)); document.querySelector('#check-button').disabled = false; }));
    document.querySelector('#check-button')?.addEventListener('click', () => { if (state.selected === null || state.checked) return; state.checked = true; const correct = state.selected === state.shuffled.answer; document.querySelectorAll('[data-choice]').forEach((choice) => { const index = Number(choice.dataset.choice); choice.disabled = true; if (index === state.shuffled.answer) choice.classList.add('correct'); if (index === state.selected && !correct) choice.classList.add('wrong'); }); document.querySelector('#check-button').disabled = true; showFeedback(item.explanation, item.explanationZh, correct); if (item.audioText) document.querySelector('#transcript')?.classList.add('show'); complete(item.id); document.querySelector('#next-button').disabled = state.index === items.length - 1; });
    document.querySelector('#next-button')?.addEventListener('click', () => { if (state.index < items.length - 1) { state.index += 1; resetQuestion(); render(); window.scrollTo({top: 0, behavior: 'smooth'}); } });
    document.querySelector('#hint-button')?.addEventListener('click', () => showFeedback(item.hint || 'Use the context and read the task carefully.', '運用情境，仔細閱讀題目。', false));
    document.querySelector('#play-audio')?.addEventListener('click', () => speak(item.audioText));
  }
  function bindWriting(advanced) {
    const tasks = unit.writing.filter((task) => Boolean(task.level === 'advanced') === advanced); const task = tasks[state.index] || tasks[0]; const minWords = advanced ? 140 : 100;
    const draft = document.querySelector('#draft'); const wordLine = document.querySelector('#word-line');
    draft.addEventListener('input', () => { wordLine.textContent = `${wordCount(draft.value)} words · ${wordCount(draft.value)} 字 · target: ${minWords}${advanced ? '–170' : '–120'} words`; });
    document.querySelector('#record-writing')?.addEventListener('click', () => { if (!document.querySelector('#self-check').checked) { showFeedback('Please complete the self-check first.', '請先完成自我檢查。', false); return; } if (wordCount(draft.value) < minWords) { showFeedback(`Write at least ${minWords} words before recording completion.`, `記錄完成前，請至少寫 ${minWords} 字。`, false); return; } complete(task.id); showFeedback('Completion recorded. Review your evidence, paragraph links and one sentence for accuracy.', '已記錄完成。請再檢查證據、段落連接及一句文法是否準確。', true); });
    document.querySelector('#hint-button')?.addEventListener('click', () => showFeedback(advanced ? 'Choose evidence before drafting. Make every action specific and answer one practical concern.' : 'Write for your audience. Include a reason, a practical detail and a likely result.', advanced ? '先選取證據再起草；每項行動要具體，並回應一項實際關注。' : '為你的受眾寫作；加入理由、實際細節和可能結果。', false));
    document.querySelector('#next-writing')?.addEventListener('click', () => { if (state.index < tasks.length - 1) { state.index += 1; render(); } });
  }
  function bindSpeaking() {
    const task = unit.speaking[state.index] || unit.speaking[0];
    document.querySelector('#play-model')?.addEventListener('click', () => speak(task.model));
    document.querySelector('#record-speaking')?.addEventListener('click', () => { if (!document.querySelector('#self-check').checked) { showFeedback('Please complete the self-check first.', '請先完成自我檢查。', false); return; } complete(task.id); showFeedback('Completion recorded. Replay the model and improve one phrase or example next time.', '已記錄完成。下次重播示範，改善一個短語或例子。', true); });
    document.querySelector('#hint-button')?.addEventListener('click', () => showFeedback('State your point, add one reason or evidence detail, then end with a result or next step.', '說明觀點，加入一項理由或證據細節，最後以結果或下一步作結。', false));
    document.querySelector('#next-speaking')?.addEventListener('click', () => { if (state.index < unit.speaking.length - 1) { state.index += 1; render(); } });
  }
  function bindDialogue() {
    const dialogue = unit.dialogues[state.index] || unit.dialogues[0]; const checkpoint = dialogue.checkpoints[state.checkpoint] || dialogue.checkpoints[0];
    document.querySelector('#play-role-a')?.addEventListener('click', () => speak(dialogue.dialogue.filter(([speaker]) => speaker === 'A').map(([, line]) => line).join(' ')));
    document.querySelector('#play-role-b')?.addEventListener('click', () => speak(dialogue.dialogue.filter(([speaker]) => speaker === 'B').map(([, line]) => line).join(' ')));
    document.querySelector('#play-dialogue')?.addEventListener('click', () => speak(dialogue.dialogue.map(([speaker, line]) => `Role ${speaker}: ${line}`).join(' ')));
    document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { if (state.checked) return; state.selected = Number(button.dataset.choice); document.querySelectorAll('[data-choice]').forEach((choice) => choice.classList.toggle('selected', Number(choice.dataset.choice) === state.selected)); document.querySelector('#check-button').disabled = false; }));
    document.querySelector('#check-button')?.addEventListener('click', () => { if (state.selected === null || state.checked) return; state.checked = true; const correct = state.selected === state.shuffled.answer; document.querySelectorAll('[data-choice]').forEach((choice) => { const index = Number(choice.dataset.choice); choice.disabled = true; if (index === state.shuffled.answer) choice.classList.add('correct'); if (index === state.selected && !correct) choice.classList.add('wrong'); }); document.querySelector('#check-button').disabled = true; showFeedback(checkpoint.explanation, checkpoint.explanationZh, correct); complete(`${dialogue.id}-checkpoint-${state.checkpoint + 1}`); document.querySelector('#next-checkpoint').disabled = state.checkpoint === dialogue.checkpoints.length - 1 && state.index === unit.dialogues.length - 1; });
    document.querySelector('#hint-button')?.addEventListener('click', () => showFeedback('Choose a reply that uses evidence, recognises a concern or gives a safe practical next step.', '選擇運用證據、承認關注或提出安全實際下一步的回應。', false));
    document.querySelector('#next-checkpoint')?.addEventListener('click', () => { if (state.checkpoint < dialogue.checkpoints.length - 1) { state.checkpoint += 1; } else if (state.index < unit.dialogues.length - 1) { state.index += 1; state.checkpoint = 0; } else return; resetQuestion(); render(); });
  }
  function bind() {
    document.querySelectorAll('[data-module]').forEach((button) => button.addEventListener('click', () => { state.module = button.dataset.module; state.index = 0; state.checkpoint = 0; resetQuestion(); render(); window.scrollTo({top: 0, behavior: 'smooth'}); }));
    if (['grammar', 'vocabulary', 'reading', 'listening'].includes(state.module)) bindObjective();
    if (state.module === 'writing') bindWriting(false);
    if (state.module === 'writing-advanced') bindWriting(true);
    if (state.module === 'dialogue') bindDialogue();
    if (state.module === 'speaking') bindSpeaking();
  }
  render();
})();
