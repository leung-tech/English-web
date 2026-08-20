/* Design reminder — 學習任務控制台：以短而可預期的逐題流程，引導學生選擇、作答、核對與針對性重溫。 */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const MAX_PER_TOPIC = 100;
  const KEYS = { wrong: 'hk-primary-wrongbook-v2', stats: 'hk-primary-stats-v2', used: 'hk-primary-used-v2' };
  const state = { grade: '小五', subject: 'math', topic: 'operations', session: null, filter: 'all' };

  const safeGet = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const safeSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const stats = () => safeGet(KEYS.stats, { completed: 0, correct: 0 });
  const wrongbook = () => safeGet(KEYS.wrong, []);
  const saveStats = (value) => safeSet(KEYS.stats, value);
  const saveWrongbook = (value) => safeSet(KEYS.wrong, value);
  const gradeNumber = () => Number(state.grade.replace(/\D/g, '')) || 5;
  const escape = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/[，。！？]/g, '').replace(/\s+/g, ' ');
  const randomize = (items) => [...items].sort(() => Math.random() - 0.5);
  const isHigh = () => gradeNumber() >= 5;

  const topicCatalog = {
    math: [
      { id: 'operations', title: '四則運算', description: '加、減、乘、除的日常練習', icon: '＋', kind: 'math', sessions: 8 },
      { id: 'fractions', title: '分數與小數', description: '約分、小數加減與百分數', icon: '½', kind: 'math', sessions: 8 },
      { id: 'word-problems', title: '長題目應用題', description: '閱讀資料、列式與多步驟運算', icon: '↗', kind: 'math', sessions: 6, advanced: true }
    ],
    english: [
      { id: 'vocabulary', title: '字詞運用', description: '按意思選出最合適的英文詞彙', icon: 'Aa', kind: 'english', sessions: 8 },
      { id: 'grammar', title: '文法基礎', description: '動詞、時態和句子結構', icon: '✓', kind: 'english', sessions: 8 },
      { id: 'reading', title: '閱讀理解', description: '閱讀短文、推論重點與回答問題', icon: '⌁', kind: 'english', sessions: 5, advanced: true }
    ]
  };

  const getTopics = () => topicCatalog[state.subject].filter((topic) => !topic.advanced || isHigh());
  const selectedTopic = () => getTopics().find((topic) => topic.id === state.topic) || getTopics()[0];
  const question = (id, topic, subject, prompt, answer, explanation, options = null, passage = null) => ({ id, topic, subject, prompt, answer: String(answer), explanation, options, passage });
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return Math.abs(a); };
  const fraction = (top, bottom) => { const divisor = gcd(top, bottom); return `${top / divisor}/${bottom / divisor}`; };

  function createOperations() {
    const level = gradeNumber(), limit = [0, 10, 50, 100, 1000, 10000, 100000][level];
    const symbols = level <= 1 ? ['+', '−'] : level === 2 ? ['+', '−', '×'] : ['+', '−', '×', '÷'];
    const result = [];
    for (let index = 1; result.length < MAX_PER_TOPIC && index < 900; index += 1) {
      const symbol = symbols[index % symbols.length];
      let first = (index * 31 + level * 9) % Math.max(9, limit - 1) + 1;
      let second = (index * 17 + level * 13) % Math.max(8, Math.floor(limit / 2)) + 1;
      let answer;
      if (symbol === '+') { if (first + second > limit) second = Math.max(1, limit - first); answer = first + second; }
      if (symbol === '−') { if (second > first) [first, second] = [second, first]; answer = first - second; }
      if (symbol === '×') { second = index % 9 + 2; first = (index * 7 + level) % Math.max(6, Math.floor(limit / second) - 1) + 2; answer = first * second; }
      if (symbol === '÷') { second = index % 9 + 2; answer = (index * 5 + level) % Math.max(5, Math.floor(limit / second)) + 1; first = second * answer; }
      result.push(question(`operations-${level}-${index}`, '四則運算', 'math', `計算：${first} ${symbol} ${second} = ?`, answer, `把運算步驟仔細完成，答案是 ${answer}。`));
    }
    return result;
  }

  function createFractions() {
    const level = gradeNumber(), result = [];
    for (let index = 1; result.length < MAX_PER_TOPIC && index < 900; index += 1) {
      const denominator = index % 8 + 3, first = index * 3 % (denominator - 1) + 1, second = (index * 5 + 1) % (denominator - 1) + 1;
      let prompt, answer, explanation;
      if (level <= 3) { prompt = `計算：${first}/${denominator} + ${second}/${denominator} = ?（答案請化成最簡分數）`; answer = fraction(first + second, denominator); explanation = `同分母相加後化簡，答案是 ${answer}。`; }
      else if (level === 4) { const multiplier = index % 5 + 2; prompt = `把 ${first}/${denominator} 化成分母為 ${denominator * multiplier} 的等值分數。`; answer = `${first * multiplier}/${denominator * multiplier}`; explanation = `分子及分母同乘 ${multiplier}。`; }
      else { const firstDecimal = ((index * 29) % 800 + 10) / 100, secondDecimal = ((index * 13) % 600 + 10) / 100; prompt = `計算：${firstDecimal.toFixed(2)} + ${secondDecimal.toFixed(2)} = ?`; answer = (firstDecimal + secondDecimal).toFixed(2); explanation = `小數點要對齊，答案是 ${answer}。`; }
      result.push(question(`fractions-${level}-${index}`, '分數與小數', 'math', prompt, answer, explanation));
    }
    return result;
  }

  function createWordProblems() {
    const level = gradeNumber(), result = [];
    const places = ['學校旅行', '社區中心', '圖書館', '環保小組', '校園義賣', '運動會'];
    for (let index = 1; result.length < MAX_PER_TOPIC && index < 180; index += 1) {
      const type = index % 5, place = places[index % places.length];
      let prompt, answer, explanation;
      if (type === 0) {
        const boxes = index % 9 + 12, perBox = index % 7 + 18, donated = index % 5 + 6;
        prompt = `${place}為慈善義賣準備了 ${boxes} 箱文具，每箱有 ${perBox} 件。活動前有 ${donated} 件損壞，不能出售。問：可出售的文具共有多少件？請只輸入答案。`;
        answer = boxes * perBox - donated; explanation = `${boxes} × ${perBox} = ${boxes * perBox}，再減去 ${donated}，所以有 ${answer} 件。`;
      } else if (type === 1) {
        const students = index % 11 + 24, fare = index % 6 + 8, discount = index % 5 + 2;
        prompt = `${place}安排 ${students} 名學生乘車參觀。每張車票原價 $${fare}，學校獲得每張 $${discount} 的折扣。問：車票合共需要多少元？請只輸入數字。`;
        answer = students * (fare - discount); explanation = `每張折後 $${fare - discount}，${students} × ${fare - discount} = ${answer}。`;
      } else if (type === 2) {
        const total = (index % 15 + 35) * 4, morning = index % 12 + 43, afternoon = index % 8 + 19;
        prompt = `${place}的步行挑戰目標是 ${total} 公里。星期一上午走了 ${morning} 公里，下午走了 ${afternoon} 公里。問：距離目標還差多少公里？請只輸入數字。`;
        answer = total - morning - afternoon; explanation = `${total} − ${morning} − ${afternoon} = ${answer} 公里。`;
      } else if (type === 3) {
        const bottles = index % 14 + 36, perPack = index % 5 + 4, classes = index % 4 + 3;
        prompt = `${place}準備了 ${bottles} 包飲品，每包有 ${perPack} 枝。平均分給 ${classes} 班，且剛好分完。問：每班可得多少枝？請只輸入數字。`;
        answer = bottles * perPack / classes; explanation = `${bottles} × ${perPack} = ${bottles * perPack}，再 ÷ ${classes}，答案是 ${answer}。`;
      } else {
        const price = index % 8 + 12, quantity = index % 6 + 7, percent = index % 3 + 10;
        prompt = `${place}以每本 $${price} 購入 ${quantity} 本活動冊。供應商給予 ${percent}% 折扣（折後金額保留至整數元）。問：折後約需支付多少元？請只輸入整數。`;
        answer = Math.round(price * quantity * (100 - percent) / 100); explanation = `原價 ${price} × ${quantity} = ${price * quantity}；折後約為 ${answer} 元。`;
      }
      result.push(question(`word-problems-${level}-${index}`, '長題目應用題', 'math', prompt, answer, explanation));
    }
    return result;
  }

  const wordBank = [
    ['adventure', 'an exciting experience'], ['brave', 'ready to face danger'], ['curious', 'wanting to know more'], ['discover', 'find something for the first time'], ['generous', 'willing to share'], ['improve', 'make something better'], ['knowledge', 'information that you know'], ['patient', 'able to wait calmly'], ['prepare', 'get ready for something'], ['protect', 'keep safe from harm'], ['recycle', 'use a material again'], ['responsible', 'doing what you should do'], ['compare', 'look at two things closely'], ['creative', 'able to make new ideas'], ['environment', 'the world around us'], ['healthy', 'good for your body'], ['imagine', 'make a picture in your mind'], ['measure', 'find the size or amount'], ['predict', 'say what may happen'], ['prefer', 'like one thing more'], ['achieve', 'succeed in doing something'], ['challenge', 'something difficult that tests you'], ['community', 'people living in one area'], ['contribute', 'give something to help'], ['essential', 'completely necessary']
  ];
  function createVocabulary() {
    const result = [];
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const [word, meaning] = wordBank[(index + gradeNumber()) % wordBank.length];
      const distractors = randomize(wordBank.filter(([item]) => item !== word).map(([item]) => item)).slice(0, 3);
      const options = randomize([word, ...distractors]);
      result.push(question(`vocabulary-${gradeNumber()}-${index}`, '字詞運用', 'english', `選出最符合以下意思的英文詞彙：${meaning}。`, word, `${word} 的意思是 ${meaning}。`, options));
    }
    return result;
  }

  function createGrammar() {
    const result = [], subjects = ['I', 'You', 'We', 'They', 'He', 'She', 'Tom', 'My sister', 'The teacher', 'The dog'], verbs = ['play', 'watch', 'study', 'carry', 'wash', 'go', 'read', 'write', 'help', 'have'];
    const past = { play: 'played', watch: 'watched', study: 'studied', carry: 'carried', wash: 'washed', go: 'went', read: 'read', write: 'wrote', help: 'helped', have: 'had' };
    const singular = (verb) => verb === 'have' ? 'has' : verb === 'go' ? 'goes' : verb.endsWith('y') ? `${verb.slice(0, -1)}ies` : `${verb}s`;
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const subject = subjects[index % subjects.length], verb = verbs[Math.floor(index / 10) % verbs.length], isSingle = ['He', 'She', 'Tom', 'My sister', 'The teacher', 'The dog'].includes(subject);
      let prompt, answer, explanation;
      if (gradeNumber() <= 3) { answer = isSingle ? singular(verb) : verb; prompt = `把括號內的動詞改成正確形式：${subject} ___ (${verb}) after school.`; explanation = `${subject} 在一般現在式要配合 ${answer}。`; }
      else if (gradeNumber() <= 5) { answer = past[verb]; prompt = `把括號內的動詞改成正確過去式：Yesterday, ${subject} ___ (${verb}) at school.`; explanation = `Yesterday 表示過去時間，正確形式是 ${answer}。`; }
      else { const participle = { ...past, go: 'gone', write: 'written' }[verb], helper = isSingle ? 'has' : 'have'; answer = `${helper} ${participle}`; prompt = `完成現在完成式：${subject} ___ already ___ (${verb}) the task.`; explanation = `${subject} 要配合 ${helper}，過去分詞是 ${participle}。`; }
      result.push(question(`grammar-${gradeNumber()}-${index}`, '文法基礎', 'english', prompt, answer, explanation));
    }
    return result;
  }

  const readingSeeds = [
    ['a rooftop garden', 'grow herbs for the school canteen', 'measure the plants every Friday', 'used old bottles as watering cans'],
    ['a book exchange', 'share stories without buying new books', 'sorted the books by reading level', 'made a quiet corner for younger readers'],
    ['a lunchtime food survey', 'reduce the amount of food thrown away', 'recorded leftovers for two weeks', 'asked the canteen to offer smaller portions'],
    ['a school radio programme', 'introduce useful study tips', 'interviewed teachers and students', 'played it during morning assembly'],
    ['a beach-cleaning team', 'protect sea animals from plastic waste', 'separated rubbish into different bags', 'invited parents to join on Saturday'],
    ['a walking bus', 'help younger pupils travel safely', 'met beside the community centre', 'wore bright reflective badges'],
    ['a bird-watching club', 'learn about animals near the school', 'kept notes in a shared notebook', 'stayed quiet so that birds would not fly away'],
    ['a repair corner', 'give broken classroom items a second life', 'learned how to fix loose screws', 'collected small tools from families'],
    ['a kindness calendar', 'encourage pupils to notice helpful actions', 'wrote one action every afternoon', 'placed the calendar near the library'],
    ['a water-saving challenge', 'use less water in the washrooms', 'checked the water meter each week', 'put reminder stickers beside taps'],
    ['a local-history map', 'learn how the neighbourhood changed', 'spoke with elderly residents', 'added old photos to the map'],
    ['a healthy-snack stall', 'show that simple snacks can be nutritious', 'tested recipes after class', 'labelled ingredients for pupils with allergies'],
    ['a coding buddy group', 'help classmates solve small programming problems', 'met every Wednesday', 'explained mistakes instead of giving answers'],
    ['a classroom energy team', 'save electricity after lessons', 'checked lights and fans before leaving', 'shared its results at assembly'],
    ['a recycled-art display', 'turn used paper into artworks', 'collected clean paper for one month', 'invited visitors to vote for a favourite piece'],
    ['a sports-equipment library', 'make playground games available to everyone', 'numbered every ball and racket', 'asked borrowers to return items before lunch'],
    ['a neighbourhood interview project', 'collect stories about local traditions', 'prepared questions in pairs', 'published the interviews in a class booklet'],
    ['a science demonstration day', 'make scientific ideas easier to understand', 'practised explanations before the event', 'used safe household materials'],
    ['a silent-reading morning', 'give everyone time to enjoy a book', 'allowed pupils to choose their own books', 'ended with short book recommendations'],
    ['a class market', 'raise money for a community charity', 'calculated prices in small teams', 'displayed a clear price list for visitors']
  ];
  function createReading() {
    const result = [];
    readingSeeds.forEach((seed, index) => {
      const [project, purpose, action, detail] = seed;
      const passage = { title: `The ${project.replace(/^a /, '').replace(/\b\w/g, (letter) => letter.toUpperCase())}`, text: `Last term, a group of Primary ${gradeNumber()} pupils started ${project}. Their aim was to ${purpose}. Before they began, the pupils discussed what they needed and made a simple plan. During the project, they ${action}. They also ${detail}. At the end of the term, the group shared what they had learned with other classes. Many pupils said that the project showed them that a small, careful action can make a useful difference.` };
      const prompts = [
        [`What was the main aim of the project?`, [`To ${purpose}.`, 'To win a sports competition.', 'To cancel all homework.', 'To travel to another country.'], 0, `The passage says that the group wanted to ${purpose}.`],
        [`What did the pupils do during the project?`, [`They ${action}.`, 'They stopped attending school.', 'They only watched television.', 'They gave no information to others.'], 0, `The passage states that they ${action}.`],
        [`Which detail helped the project work well?`, [`They ${detail}.`, 'They ignored all safety rules.', 'They refused to make a plan.', 'They kept the project secret.'], 0, `The detail is directly mentioned in the passage.`],
        [`What can readers infer about the pupils?`, ['They were responsible and willing to work together.', 'They did not care about their project.', 'They wanted to waste resources.', 'They avoided learning new things.'], 0, `They planned, worked together and shared their learning, so this is the best inference.`],
        [`Which title best matches this passage?`, [`Small Actions, Useful Changes`, 'A Day Without Any Learning', 'Why Plans Always Fail', 'The Most Expensive Trip'], 0, `The final sentence focuses on how a small action can make a useful difference.`]
      ];
      prompts.forEach(([prompt, options, correctIndex, explanation], questionIndex) => result.push(question(`reading-${gradeNumber()}-${index}-${questionIndex}`, '閱讀理解', 'english', prompt, correctIndex, explanation, options, passage)));
    });
    return result;
  }

  function getBank() {
    if (state.topic === 'operations') return createOperations();
    if (state.topic === 'fractions') return createFractions();
    if (state.topic === 'word-problems') return createWordProblems();
    if (state.topic === 'vocabulary') return createVocabulary();
    if (state.topic === 'grammar') return createGrammar();
    return createReading();
  }

  function selectSessionQuestions(bank, total) {
    const key = `${KEYS.used}-${state.grade}-${state.topic}`;
    const used = new Set(safeGet(key, []));
    let available = bank.filter((item) => !used.has(item.id));
    if (available.length < total) { used.clear(); available = bank; }
    const items = randomize(available).slice(0, total);
    items.forEach((item) => used.add(item.id));
    safeSet(key, [...used]);
    return items;
  }

  function showView(name) {
    $$('.view').forEach((view) => view.classList.toggle('visible', view.id === `${name}-view`));
    $$('[data-nav]').forEach((button) => button.classList.toggle('active', button.dataset.nav === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function toast(message) { const element = $('#toast'); element.textContent = message; element.classList.add('show'); window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => element.classList.remove('show'), 2600); }

  function renderTopicList() {
    const topics = getTopics();
    if (!topics.some((topic) => topic.id === state.topic)) state.topic = topics[0].id;
    $('#topic-list').innerHTML = topics.map((topic) => `<button class="topic-card ${topic.id === state.topic ? 'selected' : ''}" data-topic="${topic.id}"><span class="topic-icon ${topic.kind === 'math' ? 'math-icon' : 'eng-icon'}">${topic.icon}</span><span class="topic-info"><strong>${topic.title}</strong><small>${topic.description}</small></span>${topic.advanced ? '<span class="topic-chip">高小進階</span>' : ''}</button>`).join('');
    $$('[data-topic]').forEach((button) => button.addEventListener('click', () => { state.topic = button.dataset.topic; renderHome(); }));
  }
  function renderStats() {
    const data = stats(), wrong = wrongbook().length;
    $('#home-completed').textContent = data.completed; $('#home-wrong').textContent = wrong; $('#top-wrong-count').textContent = wrong ? `(${wrong})` : ''; $('#side-done').textContent = `已完成 ${data.completed} 題`;
    $('#side-dots').innerHTML = [...Array(6)].map((_, index) => `<i class="${index < Math.min(6, data.completed % 7) ? 'done' : ''}"></i>`).join('');
  }
  function renderHome() {
    $('#grade-display').textContent = state.grade;
    $('#grade-note').textContent = isHigh() ? '高小已開放英文閱讀理解和數學長題目應用題。' : '升讀小五後，即可挑戰閱讀理解和長題目應用題。';
    $$('.grade-btn').forEach((button) => button.classList.toggle('selected', button.dataset.grade === state.grade));
    $$('.subject-tab').forEach((button) => button.classList.toggle('selected', button.dataset.subject === state.subject));
    renderTopicList();
    const topic = selectedTopic();
    $('#topic-count').textContent = `${getTopics().length} 個課題`;
    $('#selection-title').textContent = `${state.grade} · ${state.subject === 'math' ? '數學' : '英文'} · ${topic.title}`;
    $('#selection-description').textContent = `共 ${topic.sessions} 題，逐題作答後才會顯示評語。`;
    renderStats();
  }

  function updateSessionProgress() {
    const session = state.session, done = session.results.filter(Boolean).length, index = session.index;
    $('#session-subtitle').textContent = `第 ${index + 1} 題，共 ${session.questions.length} 題`;
    $('#progress-bar').style.width = `${(done / session.questions.length) * 100}%`;
    $('#question-dots').innerHTML = session.questions.map((_, number) => `<button class="question-dot ${number === index ? 'current' : ''} ${session.results[number] ? 'checked' : ''}" data-go-question="${number}">${number + 1}</button>`).join('');
    $$('[data-go-question]').forEach((button) => button.addEventListener('click', () => { session.index = Number(button.dataset.goQuestion); renderQuestion(); }));
    $('#session-wrong-count').textContent = wrongbook().length;
  }
  function currentQuestion() { return state.session.questions[state.session.index]; }
  function renderQuestion() {
    const session = state.session, item = currentQuestion(), currentResult = session.results[session.index];
    $('#session-title').textContent = `${state.grade} · ${item.subject === 'math' ? '數學' : '英文'} · ${item.topic}`;
    $('#question-number').textContent = String(session.index + 1).padStart(2, '0');
    $('#question-topic').textContent = item.subject === 'math' ? 'MATHS PRACTICE' : 'ENGLISH PRACTICE';
    const passage = item.passage ? `<article class="passage"><strong>${escape(item.passage.title)}</strong><br>${escape(item.passage.text)}</article>` : '';
    const body = item.options
      ? `<div class="choices">${item.options.map((choice, index) => `<button class="choice ${session.drafts[session.index] === String(index) ? 'selected' : ''}" data-choice="${index}"><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${escape(choice)}</span></button>`).join('')}</div>`
      : `<div class="answer-area"><input class="answer-field" id="answer-field" autocomplete="off" inputmode="text" placeholder="在此輸入答案" value="${escape(session.drafts[session.index] || '')}"></div>`;
    $('#question-content').innerHTML = `${passage}<h1>${escape(item.prompt)}</h1>${body}`;
    const feedback = $('#feedback');
    feedback.className = `feedback ${currentResult ? `show ${currentResult.correct ? 'correct' : 'wrong'}` : ''}`;
    feedback.innerHTML = currentResult ? `<strong>${currentResult.correct ? '答對了。' : '這一題先放進錯題本。'}</strong> ${escape(item.explanation)}` : '';
    $('#check-question').classList.toggle('hidden', Boolean(currentResult)); $('#next-question').classList.toggle('hidden', !currentResult); $('#previous-question').disabled = session.index === 0;
    if (item.options) $$('[data-choice]').forEach((button) => button.addEventListener('click', () => { if (currentResult) return; session.drafts[session.index] = button.dataset.choice; $$('.choice').forEach((choice) => choice.classList.toggle('selected', choice === button)); }));
    else $('#answer-field').addEventListener('input', (event) => { session.drafts[session.index] = event.target.value; });
    updateSessionProgress();
  }

  function addWrong(item, answer) {
    const list = wrongbook();
    const existingIndex = list.findIndex((entry) => entry.id === item.id);
    const entry = { ...item, studentAnswer: answer, savedAt: new Date().toISOString() };
    if (existingIndex >= 0) list[existingIndex] = entry; else list.unshift(entry);
    saveWrongbook(list.slice(0, 200));
  }
  function removeWrong(id) { saveWrongbook(wrongbook().filter((entry) => entry.id !== id)); }
  function checkCurrent() {
    const session = state.session, item = currentQuestion(), answer = session.drafts[session.index];
    if (answer === undefined || String(answer).trim() === '') { toast('請先選擇或輸入答案。'); return; }
    const correct = item.options ? String(answer) === item.answer : normalize(answer) === normalize(item.answer);
    session.results[session.index] = { correct, answer };
    const data = stats(); data.completed += 1; if (correct) data.correct += 1; saveStats(data);
    if (correct) { removeWrong(item.id); toast('答對了，繼續保持！'); } else { addWrong(item, answer); toast('已加入錯題本，之後可再挑戰。'); }
    renderQuestion(); renderStats();
  }
  function startPractice() {
    const topic = selectedTopic(), questions = selectSessionQuestions(getBank(), topic.sessions);
    state.session = { questions, index: 0, drafts: Array(questions.length).fill(''), results: Array(questions.length).fill(null), review: false };
    showView('session'); renderQuestion();
  }
  function nextQuestion() { if (state.session.index + 1 < state.session.questions.length) { state.session.index += 1; renderQuestion(); } else renderResult(); }
  function renderResult() {
    const session = state.session, correct = session.results.filter((result) => result?.correct).length, total = session.questions.length, score = Math.round((correct / total) * 100), wrong = total - correct;
    $('#result-score').textContent = `${score}%`; $('#result-title').textContent = score >= 80 ? '做得好，這組練習已完成。' : '完成了，下一步溫習錯題。';
    $('#result-copy').textContent = wrong ? `你答對 ${correct} 題，另有 ${wrong} 題已自動存入錯題本。回顧錯題後，再挑戰一次會更有把握。` : `你答對全部 ${total} 題。保持這個節奏，下一次可選擇另一個課題。`;
    $('#result-wrongbook').classList.toggle('hidden', wrong === 0 && wrongbook().length === 0); showView('result'); renderStats();
  }

  function renderWrongbook() {
    const list = wrongbook().filter((entry) => state.filter === 'all' || entry.subject === state.filter);
    $$('.filter-tab').forEach((button) => button.classList.toggle('active', button.dataset.filter === state.filter));
    if (!list.length) {
      $('#wrongbook-content').innerHTML = `<section class="empty"><div class="empty-icon">✓</div><h1>這裡暫時沒有錯題</h1><p>完成練習後，答錯的題目會自動儲存在這部裝置的瀏覽器內。你可以隨時回來重新作答。</p><button class="primary" id="empty-home">開始練習 →</button></section>`;
      $('#empty-home').addEventListener('click', () => showView('home'));
    } else {
      $('#wrongbook-content').innerHTML = `<div class="wrong-list">${list.map((entry) => `<article class="wrong-item"><span class="wrong-type">${entry.subject === 'math' ? '數' : 'Eng'}</span><div><strong>${escape(entry.topic)}</strong><p>${escape(entry.prompt)}</p><small>上次作答：${escape(entry.studentAnswer || '未填寫')}</small></div><div><button class="secondary" data-review="${escape(entry.id)}">重做</button><button class="remove-btn" data-remove="${escape(entry.id)}">移除</button></div></article>`).join('')}</div>`;
      $$('[data-remove]').forEach((button) => button.addEventListener('click', () => { removeWrong(button.dataset.remove); renderWrongbook(); renderStats(); toast('已從錯題本移除。'); }));
      $$('[data-review]').forEach((button) => button.addEventListener('click', () => { const item = wrongbook().find((entry) => entry.id === button.dataset.review); if (!item) return; state.grade = `小${item.id.includes('-6-') ? '六' : item.id.includes('-5-') ? '五' : gradeNumber()}`; state.session = { questions: [item], index: 0, drafts: [''], results: [null], review: true }; showView('session'); renderQuestion(); }));
    }
    renderStats();
  }

  function bindEvents() {
    $$('.grade-btn').forEach((button) => button.addEventListener('click', () => { state.grade = button.dataset.grade; if (!isHigh() && ['word-problems', 'reading'].includes(state.topic)) state.topic = state.subject === 'math' ? 'operations' : 'vocabulary'; renderHome(); }));
    $$('.subject-tab').forEach((button) => button.addEventListener('click', () => { state.subject = button.dataset.subject; state.topic = getTopics()[0].id; renderHome(); }));
    $('#start-practice').addEventListener('click', startPractice); $('#home-brand').addEventListener('click', () => { showView('home'); renderHome(); }); $('#back-home').addEventListener('click', () => { showView('home'); renderHome(); });
    $$('.side-nav button, .top-actions [data-nav]').forEach((button) => button.addEventListener('click', () => { const view = button.dataset.nav; if (view === 'wrongbook') { renderWrongbook(); showView('wrongbook'); } else { showView('home'); renderHome(); } }));
    $('#check-question').addEventListener('click', checkCurrent); $('#next-question').addEventListener('click', nextQuestion); $('#previous-question').addEventListener('click', () => { if (state.session.index > 0) { state.session.index -= 1; renderQuestion(); } });
    $('#save-later').addEventListener('click', () => { showView('home'); renderHome(); toast('進度暫時保留在這個瀏覽器分頁。'); }); $('#result-home').addEventListener('click', () => { showView('home'); renderHome(); }); $('#result-wrongbook').addEventListener('click', () => { renderWrongbook(); showView('wrongbook'); });
    $$('.filter-tab').forEach((button) => button.addEventListener('click', () => { state.filter = button.dataset.filter; renderWrongbook(); }));
  }

  bindEvents(); renderHome();
})();
