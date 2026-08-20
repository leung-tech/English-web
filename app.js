/* Design reminder — 讀寫工作簿：互動必須短、直接、可預測，像在紙本工作簿上做記號。 */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const gradeSelect = $('#grade');
  const topicSelect = $('#topic');
  const countInput = $('#count');
  const countValue = $('#count-value');
  const generateButton = $('#generate');
  const questionHost = $('.question-list, .questions');
  const paperTitle = $('.paper-heading h3, .paper-title h3');
  const paperMeta = $('.paper-heading p, .paper-title p');
  const statusPill = $('.status-pill, .state');
  const reviewBar = $('.review-bar, .review');
  const planButton = $('.plan-link, .plan a');
  const planContent = $('.plan-content, .plan > div');
  const weekProgress = $('.sidebar-progress, .week');
  const MAX_PER_TOPIC = 100;
  const bankCache = new Map();
  let currentQuestions = [];
  let answersVisible = false;

  const style = document.createElement('style');
  style.textContent = `
    /* Design reminder — 讀寫工作簿：批改提示使用紙本批註般的細線、印記和受控色彩。 */
    .question-item { display:grid; grid-template-columns:30px minmax(0,1fr) 128px; gap:10px; align-items:start; min-height:76px; padding:14px 0; border-bottom:1px dashed #e7e4db; }
    .question-item:last-child { border-bottom:0; }
    .question-index { color:#63707a; font:800 12px "Nunito Sans",sans-serif; padding-top:8px; }
    .question-copy { min-width:0; }
    .question-copy p { margin:0; color:#2c3d49; font-size:14px; font-weight:600; line-height:1.65; }
    .question-tools { display:flex; flex-direction:column; gap:6px; }
    .answer-input { width:100%; min-height:34px; border:0; border-bottom:2px solid #bbc7c6; border-radius:0; outline:0; background:transparent; color:#182a38; font-family:"Nunito Sans","Noto Sans TC",sans-serif; font-size:14px; font-weight:700; text-align:center; transition:border-color 160ms ease, background 160ms ease; }
    .answer-input:focus { border-color:#167d78; background:#f4fbfa; }
    .answer-input.correct { border-color:#167d78; background:#e8f4f1; color:#0d625d; }
    .answer-input.incorrect { border-color:#dc795e; background:#fdf0eb; color:#9a412e; }
    .answer-note { display:none; margin:5px 0 0; color:#63707a; font-size:11px; line-height:1.45; }
    .answer-note.show { display:block; }
    .answer-note strong { color:#0d625d; }
    .answer-note.wrong strong { color:#a54d3a; }
    .answer-reveal { align-self:flex-start; padding:2px 0; border:0; background:transparent; color:#167d78; font-size:11px; font-weight:800; cursor:pointer; }
    .answer-reveal:hover { color:#0d625d; text-decoration:underline; text-underline-offset:3px; }
    .score-summary { display:flex; align-items:center; gap:8px; min-height:27px; color:#52616a; font-size:12px; }
    .score-seal { display:grid; width:25px; height:25px; place-items:center; border-radius:50%; background:#e3f2ef; color:#0d625d; font:800 11px "Nunito Sans",sans-serif; }
    .paper-actions { display:flex; align-items:center; gap:11px; }
    .answer-toggle { padding:5px 0; border:0; background:transparent; color:#0d625d; font-size:12px; font-weight:800; cursor:pointer; }
    .answer-toggle:hover { text-decoration:underline; text-underline-offset:3px; }
    .mark-button { min-height:34px; padding:0 12px; border:0; border-radius:8px; background:#167d78; color:#fff; font-size:12px; font-weight:800; cursor:pointer; transition:transform 160ms cubic-bezier(.23,1,.32,1),background 160ms ease; }
    .mark-button:hover { background:#0d625d; transform:translateY(-1px); }
    .mark-button:active { transform:scale(.97); }
    .paper-complete { background:#e3f2ef !important; color:#0d625d !important; }
    .plan-toast { display:none; margin:8px 0 0; color:#0d625d; font-size:12px; font-weight:700; }
    .plan-toast.show { display:block; }
    @media(max-width:540px) { .question-item { grid-template-columns:24px minmax(0,1fr); } .question-tools { grid-column:2; max-width:150px; } .paper-actions { align-items:flex-end; flex-direction:column; gap:4px; } }
    @media print { .question-tools button, .paper-actions, .plan-toast { display:none !important; } .answer-note { display:none !important; } .answer-input { border-bottom:1px solid #111; } }
  `;
  document.head.append(style);

  const gradeNumber = (grade) => Number(String(grade).replace(/\D/g, '')) || 3;
  const makeQuestion = (id, prompt, answer, explanation = '') => ({ id, prompt, answer: String(answer), explanation });
  const noDuplicate = (questions) => {
    const seen = new Set();
    return questions.filter((question) => {
      const key = question.prompt.replace(/\s+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, MAX_PER_TOPIC);
  };
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return Math.abs(a); };
  const reduceFraction = (top, bottom) => { const divisor = gcd(top, bottom); return `${top / divisor}/${bottom / divisor}`; };
  const shuffle = (values) => {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const pick = (index * 17 + 13) % (index + 1);
      [copy[index], copy[pick]] = [copy[pick], copy[index]];
    }
    return copy;
  };

  function createOperations(grade) {
    const level = gradeNumber(grade);
    const limit = [0, 10, 50, 100, 1000, 10000, 100000][level];
    const operators = level === 1 ? ['+', '-'] : level === 2 ? ['+', '-', '×'] : ['+', '-', '×', '÷'];
    const questions = [];
    const seen = new Set();
    for (let turn = 1; questions.length < MAX_PER_TOPIC && turn < 4000; turn += 1) {
      const op = operators[turn % operators.length];
      let a = ((turn * 29 + level * 11) % Math.max(9, limit - 1)) + 1;
      let b = ((turn * 17 + level * 7) % Math.max(8, Math.floor(limit / 2))) + 1;
      let answer;
      if (op === '-') { if (b > a) [a, b] = [b, a]; answer = a - b; }
      if (op === '+') { if (a + b > limit) b = Math.max(1, limit - a); answer = a + b; }
      if (op === '×') {
        b = (turn % (level > 4 ? 12 : 9)) + 2;
        a = ((turn * 7 + level * 3) % Math.max(5, Math.floor(limit / b) - 1)) + 2;
        answer = a * b;
      }
      if (op === '÷') {
        b = (turn % 9) + 2;
        const quotientLimit = Math.max(5, Math.floor(limit / b));
        const quotient = ((turn * 5 + level * 3) % quotientLimit) + 1;
        a = b * quotient;
        answer = quotient;
      }
      const key = `${a}${op}${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const wordPrompt = level >= 5 && turn % 6 === 0
        ? `一盒有 ${a} 張貼紙，平均分給 ${b} 位同學，每位同學有多少張？`
        : `計算：${a} ${op} ${b} = ?`;
      questions.push(makeQuestion(`${grade}-ops-${turn}`, wordPrompt, answer, `答案是 ${answer}。`));
    }
    return noDuplicate(questions);
  }

  function createFractions(grade) {
    const level = gradeNumber(grade);
    const objects = ['蛋糕', '薄餅', '水果', '朱古力', '紙條', '橙'];
    const questions = [];
    for (let turn = 1; questions.length < MAX_PER_TOPIC && turn < 900; turn += 1) {
      const denominator = (turn % 9) + 2;
      const first = (turn * 3 % (denominator - 1)) + 1;
      const second = ((turn * 5 + 1) % (denominator - 1)) + 1;
      const object = objects[turn % objects.length];
      let prompt;
      let answer;
      let explanation;
      if (level <= 2) {
        prompt = `一個${object}平均分成 ${denominator} 份，當中有 ${first} 份被塗色。塗色部分佔全個${object}的幾分之幾？`;
        answer = `${first}/${denominator}`;
        explanation = `塗色部分有 ${first} 份，總數有 ${denominator} 份，所以答案是 ${answer}。`;
      } else if (level === 3) {
        prompt = `計算：${first}/${denominator} + ${second}/${denominator} = ?（答案請化成最簡分數）`;
        answer = reduceFraction(first + second, denominator);
        explanation = `同分母分數相加：${first} + ${second} = ${first + second}，化簡後是 ${answer}。`;
      } else if (level === 4) {
        const factor = (turn % 5) + 2;
        prompt = `把 ${first}/${denominator} 化成分母為 ${denominator * factor} 的等值分數。`;
        answer = `${first * factor}/${denominator * factor}`;
        explanation = `分子和分母同乘 ${factor}，答案是 ${answer}。`;
      } else if (level === 5) {
        const left = ((turn * 37) % 900 + 10) / 100;
        const right = ((turn * 19) % 500 + 10) / 100;
        prompt = `計算：${left.toFixed(2)} + ${right.toFixed(2)} = ?`;
        answer = (left + right).toFixed(2);
        explanation = `小數點要對齊，答案是 ${answer}。`;
      } else {
        const numerator = (turn % 80) + 10;
        const decimal = (numerator / 100).toFixed(2);
        prompt = `把 ${decimal} 化成最簡分數。`;
        answer = reduceFraction(numerator, 100);
        explanation = `${decimal} = ${numerator}/100，化簡後是 ${answer}。`;
      }
      questions.push(makeQuestion(`${grade}-fraction-${turn}`, prompt, answer, explanation));
    }
    return noDuplicate(questions);
  }

  const vocabularyByGrade = {
    1: [['happy','feeling pleased and cheerful'],['sad','feeling unhappy'],['big','large in size'],['small','little in size'],['run','move quickly on your feet'],['jump','push yourself off the ground'],['eat','have food'],['drink','have water or another liquid'],['book','pages to read'],['pen','a tool for writing'],['school','a place for learning'],['home','the place where you live'],['sun','the bright star in the sky'],['rain','water falling from clouds'],['mother','a female parent'],['father','a male parent'],['friend','a person you like'],['red','the colour of an apple'],['blue','the colour of a clear sky'],['sleep','rest with your eyes closed']],
    2: [['early','before the expected time'],['busy','having many things to do'],['quiet','making little noise'],['strong','having much power'],['hungry','wanting food'],['thirsty','wanting a drink'],['careful','taking care to avoid mistakes'],['friendly','kind and pleasant to others'],['borrow','take something and return it later'],['return','give something back'],['arrive','get to a place'],['choose','pick one from a group'],['collect','bring things together'],['follow','go after someone'],['different','not the same'],['important','having great value'],['weather','sun, rain or wind outside'],['library','a place to borrow books'],['market','a place to buy things'],['exercise','physical activity to stay healthy']],
    3: [['adventure','an exciting experience'],['brave','ready to face danger'],['curious','wanting to know more'],['describe','say what someone or something is like'],['discover','find something for the first time'],['enormous','very large'],['fragile','easy to break'],['generous','willing to give or share'],['improve','make something better'],['journey','a trip from one place to another'],['knowledge','information that you know'],['message','a piece of information sent to someone'],['notice','see or become aware of something'],['patient','able to wait calmly'],['prepare','get ready for something'],['protect','keep safe from harm'],['recycle','use a material again'],['responsible','doing what you should do'],['similar','almost the same'],['wonderful','very good or enjoyable']],
    4: [['compare','look at two things to find differences'],['concentrate','give all your attention to something'],['creative','able to make new ideas'],['delicious','tasting very good'],['depend','need someone or something'],['environment','the natural world around us'],['famous','known by many people'],['frequent','happening often'],['habit','something you do regularly'],['healthy','good for your body'],['imagine','make a picture in your mind'],['include','have as a part'],['local','from the area near you'],['manage','be able to control or organize'],['measure','find the size or amount of something'],['natural','from nature, not made by people'],['opinion','what you think about something'],['ordinary','normal and not special'],['predict','say what you think will happen'],['prefer','like one thing more than another']],
    5: [['achieve','succeed in doing something'],['ancient','very old'],['attention','careful notice or thought'],['benefit','a good result'],['challenge','something difficult that tests you'],['community','people living in the same area'],['confident','sure that you can do something'],['consequence','a result that follows an action'],['contribute','give or add something to help'],['culture','ideas and customs of a group'],['determine','decide or find out'],['effective','working well'],['essential','completely necessary'],['evidence','facts that show something is true'],['global','about the whole world'],['influence','the power to affect something'],['opportunity','a good chance'],['participate','take part in something'],['progress','improvement over time'],['resource','something useful that can be used']],
    6: [['accurate','correct and without mistakes'],['analyse','examine something carefully'],['appreciate','understand the value of something'],['approach','a way of dealing with something'],['available','ready for use'],['conserve','protect from being wasted'],['contrast','show how two things are different'],['crucial','extremely important'],['demonstrate','show clearly how something works'],['diverse','including many different kinds'],['evaluate','judge how good or useful something is'],['feature','an important part of something'],['identify','recognize and name something'],['impact','a strong effect'],['maintain','keep something in good condition'],['perspective','a particular way of viewing something'],['relevant','closely connected to the topic'],['respond','give an answer or reaction'],['strategy','a plan for reaching a goal'],['volunteer','offer to help without being paid']]
  };
  const names = ['Amy', 'Ben', 'Chloe', 'Daniel', 'Eva'];
  function createVocabulary(grade) {
    const words = vocabularyByGrade[gradeNumber(grade)] || vocabularyByGrade[3];
    const questions = [];
    for (let turn = 0; turn < MAX_PER_TOPIC; turn += 1) {
      const [word, meaning] = words[turn % words.length];
      const name = names[Math.floor(turn / words.length) % names.length];
      const distractors = shuffle(words.filter(([item]) => item !== word).map(([item]) => item)).slice(0, 3);
      const wordBank = shuffle([word, ...distractors]).join(' · ');
      const contexts = [
        `${name} found this word while reading a short story.`,
        `${name} is making a vocabulary card for class.`,
        `${name} wants to use this word in a new sentence.`,
        `${name} is checking the meaning before a dictation.`,
        `${name} is choosing the best word for a class poster.`
      ];
      const prompt = `從字詞庫中選出最合適的英文單字並輸入：${wordBank}<br><span style="color:#63707a;font-weight:500">意思：${meaning}。${contexts[turn % contexts.length]}</span>`;
      questions.push(makeQuestion(`${grade}-vocab-${turn}`, prompt, word, `${word} 的意思是 ${meaning}。`));
    }
    return noDuplicate(questions);
  }

  const singularVerb = (verb) => {
    if (verb === 'be') return 'is';
    if (verb === 'have') return 'has';
    if (verb === 'go') return 'goes';
    if (verb === 'do') return 'does';
    if (verb.endsWith('y')) return `${verb.slice(0, -1)}ies`;
    if (/(ch|sh|s|x|z|o)$/.test(verb)) return `${verb}es`;
    return `${verb}s`;
  };
  function createGrammar(grade) {
    const level = gradeNumber(grade);
    const questions = [];
    const subjects = ['I', 'You', 'We', 'They', 'He', 'She', 'Tom', 'My sister', 'The teacher', 'The dog'];
    const places = ['at school', 'in the library', 'at home', 'in the park', 'on the bus', 'in the classroom', 'at the market', 'near the playground', 'at the museum', 'in the garden'];
    const verbs = ['play', 'watch', 'study', 'carry', 'wash', 'go', 'read', 'write', 'help', 'have'];
    const past = { play: 'played', watch: 'watched', study: 'studied', carry: 'carried', wash: 'washed', go: 'went', read: 'read', write: 'wrote', help: 'helped', have: 'had' };
    const adjectives = ['tall', 'short', 'fast', 'slow', 'heavy', 'light', 'happy', 'busy', 'easy', 'noisy'];
    for (let turn = 0; turn < MAX_PER_TOPIC; turn += 1) {
      const subject = subjects[turn % subjects.length];
      const place = places[Math.floor(turn / 10) % places.length];
      const verb = verbs[Math.floor(turn / 10) % verbs.length];
      const singular = ['He', 'She', 'Tom', 'My sister', 'The teacher', 'The dog'].includes(subject);
      let prompt;
      let answer;
      let explanation;
      if (level === 1) {
        const adjective = adjectives[Math.floor(turn / 10) % adjectives.length];
        const be = subject === 'I' ? 'am' : singular ? 'is' : 'are';
        prompt = `填上正確的 be 動詞：${subject} ___ ${adjective} ${place}.`;
        answer = be;
        explanation = `${subject} 要配合 ${be}。`;
      } else if (level === 2) {
        const noun = ['book', 'cat', 'friend', 'pencil', 'teacher', 'flower', 'bird', 'box', 'child', 'apple'][turn % 10];
        const quantity = Math.floor(turn / 10) % 2 === 0 ? 'one' : 'two';
        const be = quantity === 'one' ? 'is' : 'are';
        prompt = `填上正確的 be 動詞：There ___ ${quantity} ${noun}${quantity === 'two' ? 's' : ''} ${place}.`;
        answer = be;
        explanation = `${quantity} 表示${quantity === 'one' ? '單數' : '複數'}，所以使用 ${be}。`;
      } else if (level === 3) {
        const form = singular ? singularVerb(verb) : verb;
        prompt = `把括號內的動詞改成正確形式：${subject} ___ (${verb}) ${place} every week.`;
        answer = form;
        explanation = `${subject} 在一般現在式要用 ${form}。`;
      } else if (level === 4) {
        prompt = `把括號內的動詞改成正確過去式：Yesterday, ${subject} ___ (${verb}) ${place}.`;
        answer = past[verb];
        explanation = `Yesterday 是過去時間提示，${verb} 的過去式是 ${past[verb]}。`;
      } else if (level === 5) {
        const adjective = adjectives[Math.floor(turn / 10) % adjectives.length];
        const comparative = adjective.endsWith('y') ? `${adjective.slice(0, -1)}ier` : adjective === 'big' ? 'bigger' : `${adjective}er`;
        prompt = `填上正確比較級：This bag is ___ (${adjective}) than the bag ${place}.`;
        answer = comparative;
        explanation = `有 than 時要使用比較級：${comparative}。`;
      } else {
        const participle = { play: 'played', watch: 'watched', study: 'studied', carry: 'carried', wash: 'washed', go: 'gone', read: 'read', write: 'written', help: 'helped', have: 'had' }[verb];
        const auxiliary = singular ? 'has' : 'have';
        prompt = `完成現在完成式：${subject} ___ already ___ (${verb}) ${place}.`;
        answer = `${auxiliary} ${participle}`;
        explanation = `${subject} 配合 ${auxiliary}；${verb} 的過去分詞是 ${participle}。`;
      }
      questions.push(makeQuestion(`${grade}-grammar-${turn}`, prompt, answer, explanation));
    }
    return noDuplicate(questions);
  }

  function getBank(grade, topic) {
    const key = `${grade}::${topic}`;
    if (!bankCache.has(key)) {
      const source = topic.startsWith('數學 · 四則') ? createOperations(grade)
        : topic.startsWith('數學') ? createFractions(grade)
        : topic.startsWith('英文 · 字詞') ? createVocabulary(grade)
        : createGrammar(grade);
      bankCache.set(key, source);
    }
    return bankCache.get(key);
  }

  const storageKey = (grade, topic) => `practice-used-v1-${grade}-${topic}`;
  function drawQuestions(grade, topic, count) {
    const bank = getBank(grade, topic);
    const key = storageKey(grade, topic);
    const used = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    const available = bank.filter((question) => !used.has(question.id));
    if (available.length < count) {
      localStorage.removeItem(key);
      return { questions: shuffle(bank).slice(0, count), reset: true, remaining: bank.length - count };
    }
    const selected = shuffle(available).slice(0, count);
    selected.forEach((question) => used.add(question.id));
    localStorage.setItem(key, JSON.stringify([...used]));
    return { questions: selected, reset: false, remaining: available.length - selected.length };
  }

  function normalizeAnswer(value) {
    const trimmed = String(value).trim().toLowerCase().replace(/[，。！？]/g, '').replace(/\s+/g, ' ');
    const fraction = trimmed.match(/^(\d+)\s*\/\s*(\d+)$/);
    return fraction ? reduceFraction(Number(fraction[1]), Number(fraction[2])) : trimmed;
  }

  function renderQuestions(questions, grade, topic, remaining, wasReset) {
    currentQuestions = questions;
    answersVisible = false;
    if (paperTitle) paperTitle.textContent = `${topic.replace(' · ', '：')}練習`;
    if (paperMeta) paperMeta.textContent = `${grade} · ${questions.length} 題 · 約 ${Math.max(5, questions.length)} 分鐘`;
    if (statusPill) { statusPill.textContent = '進行中'; statusPill.classList.remove('paper-complete'); }
    if (questionHost) {
      questionHost.innerHTML = questions.map((question, index) => `
        <div class="question-item" data-id="${question.id}">
          <span class="question-index">${index + 1}.</span>
          <div class="question-copy"><p>${question.prompt}</p><p class="answer-note" data-note="${question.id}"></p></div>
          <div class="question-tools"><input class="answer-input" data-answer="${question.id}" inputmode="text" autocomplete="off" aria-label="第 ${index + 1} 題答案" placeholder="輸入答案"><button type="button" class="answer-reveal" data-reveal="${question.id}">顯示答案</button></div>
        </div>`).join('');
    }
    if (reviewBar) {
      reviewBar.innerHTML = `<div class="score-summary"><span class="score-seal">?</span><span>${wasReset ? '此課題已完成 100 題，現已重新開始題庫。' : `今次完成後，尚餘 ${remaining} 題未抽出。`}</span></div><div class="paper-actions"><button type="button" class="answer-toggle" id="answer-toggle">顯示全部答案</button><button type="button" class="mark-button" id="mark-button">交卷及自動評分</button></div>`;
      $('#answer-toggle').addEventListener('click', toggleAllAnswers);
      $('#mark-button').addEventListener('click', markAnswers);
    }
    document.querySelectorAll('[data-reveal]').forEach((button) => button.addEventListener('click', () => {
      const question = currentQuestions.find((item) => item.id === button.dataset.reveal);
      const note = document.querySelector(`[data-note="${button.dataset.reveal}"]`);
      note.innerHTML = `<strong>答案：${question.answer}</strong>${question.explanation ? `　${question.explanation}` : ''}`;
      note.classList.add('show');
      button.textContent = '已顯示答案';
    }));
  }

  function toggleAllAnswers() {
    answersVisible = !answersVisible;
    currentQuestions.forEach((question) => {
      const note = document.querySelector(`[data-note="${question.id}"]`);
      const button = document.querySelector(`[data-reveal="${question.id}"]`);
      if (!note) return;
      if (answersVisible) {
        note.innerHTML = `<strong>答案：${question.answer}</strong>${question.explanation ? `　${question.explanation}` : ''}`;
        note.classList.add('show');
        if (button) button.textContent = '已顯示答案';
      } else {
        note.classList.remove('show');
        if (button) button.textContent = '顯示答案';
      }
    });
    const toggle = $('#answer-toggle');
    if (toggle) toggle.textContent = answersVisible ? '收起全部答案' : '顯示全部答案';
  }

  function markAnswers() {
    let score = 0;
    currentQuestions.forEach((question) => {
      const input = document.querySelector(`[data-answer="${question.id}"]`);
      const note = document.querySelector(`[data-note="${question.id}"]`);
      const correct = normalizeAnswer(input.value) === normalizeAnswer(question.answer);
      input.classList.remove('correct', 'incorrect');
      input.classList.add(correct ? 'correct' : 'incorrect');
      if (correct) score += 1;
      note.innerHTML = correct
        ? `<strong>正確！</strong> ${question.explanation || ''}`
        : `<span class="wrong"><strong>答案：${question.answer}</strong></span>${question.explanation ? `　${question.explanation}` : ''}`;
      note.classList.add('show');
    });
    const percentage = Math.round((score / currentQuestions.length) * 100);
    if (statusPill) { statusPill.textContent = `${score} / ${currentQuestions.length} 題正確`; statusPill.classList.add('paper-complete'); }
    const summary = $('.score-summary');
    if (summary) summary.innerHTML = `<span class="score-seal">${percentage}%</span><span>今次得分 <strong>${score} / ${currentQuestions.length}</strong>。${percentage >= 80 ? '做得好！可繼續挑戰下一份練習。' : '把標示的題目加入下次溫習計畫。'}</span>`;
    const completed = Number(localStorage.getItem('practice-completed-v1') || 0) + 1;
    localStorage.setItem('practice-completed-v1', String(completed));
    if (weekProgress) {
      const title = weekProgress.querySelector('.progress-title, b');
      const caption = weekProgress.querySelector('.progress-caption, em');
      if (title) title.textContent = `已完成 ${completed} 個練習`;
      if (caption) caption.textContent = percentage >= 80 ? '這份表現良好，保持這個節奏。' : '已把較難題目留待下次溫習。';
    }
    createPlan(score, currentQuestions.length);
  }

  function createPlan(score = null, total = null) {
    const grade = gradeSelect ? gradeSelect.value : '小三';
    const topic = topicSelect ? topicSelect.value : '數學 · 四則運算';
    const start = new Date();
    const labels = ['今天', '兩日後', '本週末'];
    const tasks = [
      `${topic.replace(' · ', ' · ')}小練習`,
      score !== null && score < total * 0.8 ? `重溫今次較難的 ${topic.replace(' · ', ' · ')}題目` : `${topic.replace(' · ', ' · ')}進階練習`,
      `${grade} 英文／數學交替溫習`
    ];
    const plan = labels.map((label, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index * 2);
      return { label, date: `${date.getMonth() + 1}/${date.getDate()}`, task: tasks[index] };
    });
    localStorage.setItem('practice-plan-v1', JSON.stringify(plan));
    if (planContent) {
      planContent.innerHTML = `<div class="plan-topline plan-top"><h3>本週小計畫</h3><span class="calendar-mark">已按今次練習更新</span></div><p>每次只安排一小份練習，完成後把較難的題目留待溫習。</p>${plan.map((item, index) => `<div class="plan-row"><span class="plan-date date">${item.label}<br>${item.date}</span><span class="plan-task task">${item.task}</span><span class="plan-state circle ${index === 0 ? 'done' : ''}">${index === 0 ? '✓' : ''}</span></div>`).join('')}<button type="button" class="plan-link plan-action">更新我的學習計畫 →</button><p class="plan-toast ${score !== null ? 'show' : ''}">${score !== null ? '已根據今次得分調整下次溫習。' : ''}</p>`;
      $('.plan-action')?.addEventListener('click', () => createPlan());
    }
  }

  function generatePractice() {
    const grade = gradeSelect ? gradeSelect.value : '小三';
    const topic = topicSelect ? topicSelect.value : '數學 · 四則運算';
    const count = Number(countInput ? countInput.value : 10);
    const draw = drawQuestions(grade, topic, count);
    renderQuestions(draw.questions, grade, topic, draw.remaining, draw.reset);
    document.querySelector('#record')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateCount() {
    const value = Number(countInput.value);
    if (countValue) countValue.textContent = value;
    const percentage = ((value - Number(countInput.min)) / (Number(countInput.max) - Number(countInput.min))) * 100;
    countInput.style.background = `linear-gradient(to right, var(--teal) 0 ${percentage}%, #d7e3e1 ${percentage}% 100%)`;
  }

  if (countInput) countInput.addEventListener('input', updateCount);
  if (generateButton) generateButton.addEventListener('click', generatePractice);
  if (planButton) planButton.addEventListener('click', (event) => { event.preventDefault(); createPlan(); document.querySelector('#study-plan, #plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  updateCount();
  createPlan();
  generatePractice();
})();
