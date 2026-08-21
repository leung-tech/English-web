/*
 * Shared standalone lesson engine.
 * Gemini editors: usually edit the matching file in ../data/ instead of this file.
 * This engine is deliberately dependency-free so every lesson works on GitHub Pages.
 */
(() => {
  'use strict';

  const body = document.body;
  const app = document.querySelector('#lesson-app');
  const config = {
    unit: body.dataset.unit,
    module: body.dataset.module,
    title: body.dataset.pageTitle,
    titleZh: body.dataset.pageTitleZh
  };
  const storageKey = 'primary-english-studio-standalone-progress-v1';
  const unitLabel = config.unit === 's2-messages-and-media' ? 'S2 CONNECT' : 'S2 DEVELOP';
  const unitDataFile = config.unit === 's2-messages-and-media' ? 's2-messages-and-media-data.js' : 's2-experiences-and-choices-data.js';
  let items = [];
  let current = 0;
  let checked = false;
  let selectedIndex = null;

  const escape = (value = '') => String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const letters = ['A', 'B', 'C', 'D'];
  const wordCount = (text) => (text.trim().match(/\S+/g) || []).length;
  const getProgress = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; }
  };
  const markCompleted = (id) => {
    const progress = getProgress();
    progress[id] = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(progress));
  };
  const shuffledObjective = (options, answer) => {
    const correct = options[answer];
    const list = [...options].sort(() => Math.random() - 0.5);
    return { options: list, answer: list.indexOf(correct) };
  };
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      window.alert('Your browser does not support speech playback. Please read the model aloud. · 你的瀏覽器未支援語音播放，請自行朗讀示範。');
      return;
    }
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = 'en-GB';
    voice.rate = 0.9;
    window.speechSynthesis.speak(voice);
  };

  function sourceUnit() {
    if (config.unit === 's2-experiences-and-choices') return window.S2_EXPERIENCES_CHOICES;
    if (config.unit === 's2-messages-and-media') return window.S2_MESSAGES_MEDIA;
    return null;
  }

  function buildItems() {
    const unit = sourceUnit();
    if (!unit) return [];
    if (config.module === 'grammar') {
      return unit.grammar.questions.map(([id, contextTitle, context, promptZh, options, answer, explanation, explanationZh, hint]) => ({
        id, kind: 'objective', skill: 'Grammar · 文法', title: contextTitle, context, prompt: 'Choose the best answer to complete the sentence in this context.', promptZh, options, answer, explanation, explanationZh, hint
      }));
    }
    if (config.module === 'vocabulary') {
      return unit.vocabulary.items.map(([word, chinese, definition, example, prompt, answer, options], index) => ({
        id: `s2-standalone-vocabulary-${index}-${word}`, kind: 'objective', skill: 'Vocabulary · 詞彙', title: word, prompt, promptZh: `Which word fits this S2 context? 重點詞語：${chinese}。`, options, answer: options.indexOf(answer), explanation: `“${word}” means ${definition}. Example: ${example}`, explanationZh: `「${word}」的意思是「${chinese}」。例句：${example}`, hint: `Connect the situation with the word meaning: ${chinese}。把情境與詞義「${chinese}」連結。`
      }));
    }
    if (config.module === 'reading') {
      return unit.reading.sets.flatMap((set) => set.questions.map(([id, prompt, promptZh, options, answer, explanation, explanationZh, hint]) => ({
        id, kind: 'objective', skill: 'Reading · 閱讀', title: set.title, titleZh: set.titleZh, pairedTexts: set.texts, prompt, promptZh, options, answer, explanation, explanationZh, hint
      })));
    }
    if (config.module === 'listening') {
      return unit.listening.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => ({
        id: `s2-standalone-listening-${script.id}-${index}`, kind: 'objective', skill: 'Listening · 聆聽', title: script.title, titleZh: script.titleZh, audioText: script.script, prompt, promptZh, options, answer, explanation, explanationZh, hint: 'Read the question first. Listen for a speaker, purpose, source, detail, instruction or next action. 先讀題目；留意說話者、目的、資料來源、細節、指示或下一步。'
      })));
    }
    if (config.module === 'writing') {
      return unit.writing.map((task) => ({
        ...task, kind: 'writing', skill: 'Writing · 寫作', minWords: 100,
        hint: 'Write for a real audience, organise accurate information and check grammar, tone and linking words. 為真實受眾寫作，組織準確資料，並檢查文法、語氣和連接詞。'
      }));
    }
    if (config.module === 'speaking') {
      return unit.speaking.map((task) => ({
        ...task, kind: 'speaking', skill: 'Speaking · 口語', audioText: task.model,
        hint: 'State accurate information, distinguish a fact from an opinion, then add a reason, source or next action. 說明準確資料，分辨事實與意見，再加入理由、資料來源或下一步。'
      }));
    }
    return [];
  }

  function pairedReadingMarkup(item) {
    if (!item.pairedTexts) return '';
    return `<section class="paired-reading"><header><p class="eyebrow">${unitLabel} · ORIGINAL PAIRED TEXTS · 原創配對閱讀</p><strong>${escape(item.title)}<small>${escape(item.titleZh)}</small></strong><span>Read both texts. Compare purpose, evidence and useful details. · 閱讀兩篇文本，比較寫作目的、證據及實用細節。</span></header><div class="paired-texts">${item.pairedTexts.map((text) => `<article class="paired-text"><small>${escape(text.label)}</small><strong>${escape(text.title)}</strong><p>${escape(text.text)}</p><footer><b>Purpose · 寫作目的</b>${escape(text.purpose)}<i>${escape(text.purposeZh)}</i></footer></article>`).join('')}</div></section>`;
  }

  function audioMarkup(item) {
    if (!item.audioText) return '';
    const transcript = item.kind === 'objective' && config.module === 'listening'
      ? `<div id="transcript" class="transcript"><strong>Transcript · 逐字稿</strong><br>${escape(item.audioText)}</div>` : '';
    return `<section class="listen-box"><div><strong>${escape(item.title)}${item.titleZh ? ` · ${escape(item.titleZh)}` : ''}</strong><span>Replay the English model as often as you need. · 可按需要重播英文示範。</span></div><button id="play-audio" class="play-button" type="button">▶ Play model · 播放示範</button></section>${transcript}`;
  }

  function objectiveMarkup(item, data) {
    return `<div class="choices" id="choices">${data.options.map((option, index) => `<button class="choice" data-choice="${index}" type="button"><span class="token">${letters[index]}</span><span>${escape(option)}</span></button>`).join('')}</div><div id="feedback" class="feedback"></div>`;
  }

  function writingMarkup(item) {
    return `<section class="task-card"><h2>Plan before writing · 寫前規劃</h2><p>${escape(item.plan)}</p><ol><li>Write an opening that makes your purpose clear. · 以清楚交代目的的開首起筆。</li><li>Develop ideas with reasons, comparisons or a relevant example. · 用理由、比較或相關例子發展內容。</li><li>Read your draft once and check every sentence. · 重讀草稿一次並檢查每一句。</li></ol></section><textarea id="written-answer" class="answer-area" placeholder="Write your response in English here… · 在此以英文寫作…"></textarea><small id="word-count" class="word-count">0 words · 0 字</small><label class="speaking-check"><input type="checkbox" id="task-check"><span>${escape(item.selfCheck)}<br><small>This page records a completion self-check only. It does not give an automated quality score. · 本頁只記錄完成自我檢查，不會自動評核寫作品質。</small></span></label><div id="feedback" class="feedback"></div>`;
  }

  function speakingMarkup(item) {
    return `<section class="task-card"><h2>Speak with a clear structure · 有條理地口語表達</h2><p>Use the replayable model as a guide. Then speak in your own voice for 45–60 seconds. · 用可重播示範作參考，然後以自己的聲音表達 45–60 秒。</p><ol><li>State your choice or opinion. · 說明你的選擇或意見。</li><li>Compare options or recognise another view. · 比較選擇或承認另一個看法。</li><li>Add a reason and a practical example. · 加入理由和實際例子。</li></ol></section><label class="speaking-check"><input type="checkbox" id="task-check"><span>${escape(item.selfCheck)}<br><small>This page records practice completion only; it does not assess your spoken English automatically. · 本頁只記錄練習完成，並不會自動評核口語質素。</small></span></label><div id="feedback" class="feedback"></div>`;
  }

  function render() {
    const item = items[current];
    if (!item) {
      app.innerHTML = '<section class="lesson-panel"><h1>No lesson data found · 找不到練習資料</h1><p>Please check the body data attributes and linked data file. · 請檢查頁面的 data 屬性及資料檔。</p></section>';
      return;
    }
    checked = false;
    selectedIndex = null;
    document.title = `${config.title} | Primary English Studio`;
    const objective = item.kind === 'objective' ? shuffledObjective(item.options, item.answer) : null;
    item.renderOptions = objective;
    const prompt = item.kind === 'writing' || item.kind === 'speaking' ? item.prompt : item.prompt;
    const bodyMarkup = item.kind === 'objective' ? objectiveMarkup(item, objective) : item.kind === 'writing' ? writingMarkup(item) : speakingMarkup(item);
    app.innerHTML = `<header class="lesson-hero"><div><p class="eyebrow">${unitLabel} · ORIGINAL PRACTICE · 原創練習</p><h1>${escape(config.title)}<small>${escape(config.titleZh)}</small></h1><p>Independent bilingual practice page. You can safely edit lesson content in its data file. · 獨立的中英對照練習頁，可在資料檔安全修改內容。</p></div><aside class="original-note"><strong>ORIGINAL PRACTICE · 原創練習</strong>This is not an official examination paper. · 本練習並非官方試卷。</aside></header><main class="lesson-layout"><section class="lesson-panel"><div class="question-meta"><span>${current + 1} / ${items.length}</span>${escape(item.skill)} · ${unitLabel}</div>${audioMarkup(item)}${pairedReadingMarkup(item)}${item.context ? `<article class="context-passage"><strong>${escape(item.title)} · ${unitLabel}</strong>${escape(item.context)}</article>` : ''}<h2 class="question-title">${escape(prompt)}<small class="question-zh">${escape(item.promptZh || '')}</small></h2>${bodyMarkup}<div class="lesson-actions"><button id="hint-button" class="secondary-button" type="button">Hint · 提示</button><div class="button-row">${item.kind === 'objective' ? '<button id="check-button" class="primary-button" type="button" disabled>Check answer · 檢查答案</button>' : '<button id="complete-button" class="primary-button" type="button">Record completion · 記錄完成</button>'}<button id="next-button" class="secondary-button" type="button" ${current === items.length - 1 ? 'disabled' : ''}>Next · 下一題</button></div></div></section><aside class="lesson-sidebar"><section class="side-panel"><h2>Your lesson · 你的練習</h2><p>${items.length} tasks in this standalone page. Progress stays in this browser only. · 此獨立頁有 ${items.length} 個任務，進度只保存在此瀏覽器。</p><div class="progress-track"><i style="width:${((current + 1) / items.length) * 100}%"></i></div><span class="counter">Task ${current + 1} of ${items.length} · 第 ${current + 1} / ${items.length} 題</span></section><section class="side-panel"><h2>Editing note · 修改提示</h2><p>Lesson words and questions are in <b>data/${unitDataFile}</b>. This page only selects the skill module. · 詞語與題目位於資料檔，本頁只選擇技能模組。</p></section><section class="side-panel"><h2>Learning focus · 學習重點</h2><ul class="status-list"><li><b>English first</b><br>Use Chinese support after reading the English task.</li><li><b>Evidence and communication</b><br>Explain a message with accurate information, a reason and a source when useful.</li><li><b>Local only</b><br>No account or upload is required.</li></ul></section></aside></main>`;
    bindEvents(item);
  }

  function feedback(message, messageZh, good) {
    const box = document.querySelector('#feedback');
    box.className = `feedback show ${good ? 'correct' : 'wrong'}`;
    box.innerHTML = `<strong>${good ? '✓ ' : 'Try again · 再試一次 · '}${escape(message)}</strong><small>${escape(messageZh)}</small>`;
  }

  function bindEvents(item) {
    document.querySelector('#hint-button').addEventListener('click', () => feedback('Hint', item.hint || 'Read the task carefully and choose the best evidence.', false));
    document.querySelector('#next-button')?.addEventListener('click', () => { if (current < items.length - 1) { current += 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
    document.querySelector('#play-audio')?.addEventListener('click', () => speak(item.audioText));

    if (item.kind === 'objective') {
      document.querySelectorAll('[data-choice]').forEach((button) => {
        button.addEventListener('click', () => {
          if (checked) return;
          selectedIndex = Number(button.dataset.choice);
          document.querySelectorAll('[data-choice]').forEach((choice) => choice.classList.toggle('selected', Number(choice.dataset.choice) === selectedIndex));
          document.querySelector('#check-button').disabled = false;
        });
      });
      document.querySelector('#check-button').addEventListener('click', () => {
        if (selectedIndex === null || checked) return;
        checked = true;
        const isCorrect = selectedIndex === item.renderOptions.answer;
        document.querySelectorAll('[data-choice]').forEach((choice) => {
          const index = Number(choice.dataset.choice);
          choice.disabled = true;
          if (index === item.renderOptions.answer) choice.classList.add('correct');
          if (index === selectedIndex && !isCorrect) choice.classList.add('wrong');
        });
        document.querySelector('#check-button').disabled = true;
        feedback(item.explanation, item.explanationZh, isCorrect);
        if (config.module === 'listening') document.querySelector('#transcript')?.classList.add('show');
        markCompleted(item.id);
      });
    }

    if (item.kind === 'writing') {
      const textarea = document.querySelector('#written-answer');
      const count = document.querySelector('#word-count');
      textarea.addEventListener('input', () => { count.textContent = `${wordCount(textarea.value)} words · ${wordCount(textarea.value)} 字`; });
    }
    if (item.kind === 'writing' || item.kind === 'speaking') {
      document.querySelector('#complete-button').addEventListener('click', () => {
        const checkedBox = document.querySelector('#task-check').checked;
        if (!checkedBox) { feedback('Please complete the self-check first.', '請先完成自我檢查。', false); return; }
        if (item.kind === 'writing' && wordCount(document.querySelector('#written-answer').value) < item.minWords) {
          feedback(`Write at least ${item.minWords} words before recording completion.`, `記錄完成前，請至少寫 ${item.minWords} 字。`, false); return;
        }
        markCompleted(item.id);
        feedback('Completion recorded. Review your work once more and improve one detail.', '已記錄完成。請再重讀一次，並改善一項細節。', true);
      });
    }
  }

  items = buildItems();
  render();
})();
