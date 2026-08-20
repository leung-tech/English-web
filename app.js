/* Design reminder — 學習任務控制台：以短而可預期的逐題流程，引導學生選擇、作答、核對與針對性重溫。 */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const MAX_PER_TOPIC = 100;
  const KEYS = { wrong: 'hk-primary-wrongbook-v2', stats: 'hk-primary-stats-v2', used: 'hk-primary-used-v2', rewards: 'hk-primary-rewards-v1', grammarAnalysis: 'hk-primary-grammar-analysis-v1' };
  const state = { grade: '小五', subject: 'math', topic: 'operations', session: null, filter: 'all' };

  const safeGet = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const safeSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const stats = () => safeGet(KEYS.stats, { completed: 0, correct: 0 });
  const wrongbook = () => safeGet(KEYS.wrong, []);
  const saveStats = (value) => safeSet(KEYS.stats, value);
  const saveWrongbook = (value) => safeSet(KEYS.wrong, value);
  const rewards = () => safeGet(KEYS.rewards, { lastCheckIn: '', streak: 0, dates: [], badges: [], visualQuestions: 0 });
  const saveRewards = (value) => safeSet(KEYS.rewards, value);
  const grammarAnalysis = () => safeGet(KEYS.grammarAnalysis, {});
  const saveGrammarAnalysis = (value) => safeSet(KEYS.grammarAnalysis, value);
  const gradeNumber = () => ({ 小一: 1, 小二: 2, 小三: 3, 小四: 4, 小五: 5, 小六: 6 }[state.grade] || Number(state.grade.replace(/\D/g, '')) || 5);
  const escape = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/[.,!?，。！？]/g, '').replace(/\s+/g, ' ');
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

  const getTopics = () => {
    const standardTopics = topicCatalog[state.subject].filter((topic) => !topic.advanced || isHigh());
    if (state.subject === 'english') {
      const scope = window.HK_PRIMARY_ENGLISH_SCOPE?.[gradeNumber()];
      const englishTopics = [
        { id: 'vocabulary', title: '分級字詞與拼寫', description: scope ? `${scope.band}：${scope.words.slice(0, 3).join(' · ')}…` : '按年級的高頻字詞與拼寫', icon: 'Aa', kind: 'english', sessions: 8 },
        { id: 'grammar', title: '文法與句型', description: scope ? `${scope.grammar[0][1]}、${scope.grammar[1][1]} 等` : '按年級的基礎文法', icon: '✓', kind: 'english', sessions: 8 },
        { id: 'sentence-patterns', title: '句子結構', description: '依年級重組及完成正確英文句子', icon: '↔', kind: 'english', sessions: 8 },
        { id: 'writing-order', title: '短寫作：句子排序', description: '把詞語排成通順句子，練習寫作基本結構', icon: '✎', kind: 'english', sessions: 6 },
        { id: 'writing-edit', title: '短寫作：改錯練習', description: '找出句子錯誤，改寫成正確英文', icon: '⌕', kind: 'english', sessions: 6 },
        { id: 'reading', title: '閱讀理解', description: scope ? scope.reading : '閱讀短文、推論重點與回答問題', icon: '⌁', kind: 'english', sessions: gradeNumber() <= 2 ? 4 : 5 }
      ];
      if (isHigh()) englishTopics.push({ id: 'visual-reading', title: '圖像與圖表閱讀', description: '結合圖片、資料圖表與英文短文', icon: '◫', kind: 'english', sessions: 5, advanced: true });
      return englishTopics;
    }
    return standardTopics;
  };
  const selectedTopic = () => getTopics().find((topic) => topic.id === state.topic) || getTopics()[0];
  const question = (id, topic, subject, prompt, answer, explanation, options = null, passage = null, visual = null, meta = {}) => ({ id, topic, subject, prompt, answer: String(answer), explanation, options, passage, visual, ...meta });
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return Math.abs(a); };
  const fraction = (top, bottom) => { const divisor = gcd(top, bottom); return `${top / divisor}/${bottom / divisor}`; };
  const dayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const previousDay = () => { const date = new Date(); date.setDate(date.getDate() - 1); return dayKey(date); };
  const badgeDefinitions = [
    { id: 'first-step', mark: '✓', title: '起步印記', rule: '完成 1 題', check: (record, learning) => learning.completed >= 1 },
    { id: 'steady-ten', mark: '10', title: '十題累積', rule: '完成 10 題', check: (record, learning) => learning.completed >= 10 },
    { id: 'practice-fifty', mark: '50', title: '練習達人', rule: '完成 50 題', check: (record, learning) => learning.completed >= 50 },
    { id: 'streak-three', mark: '3', title: '三日連續', rule: '連續 3 日', check: (record) => record.streak >= 3 },
    { id: 'visual-reader', mark: '◫', title: '圖像讀者', rule: '完成 1 題圖像題', check: (record) => record.visualQuestions >= 1 }
  ];
  function unlockBadges(record = rewards()) {
    record.badges ||= []; record.visualQuestions ||= 0;
    const learning = stats();
    badgeDefinitions.forEach((badge) => { if (badge.check(record, learning) && !record.badges.includes(badge.id)) record.badges.push(badge.id); });
    return record;
  }
  function checkInToday() {
    const record = rewards(), today = dayKey();
    if (record.lastCheckIn === today) { toast('今天已蓋上學習印記，明天再繼續。'); return; }
    record.streak = record.lastCheckIn === previousDay() ? (record.streak || 0) + 1 : 1;
    record.lastCheckIn = today; record.dates = [...new Set([...(record.dates || []), today])].slice(-31);
    const before = new Set(record.badges || []); unlockBadges(record); saveRewards(record);
    const unlocked = record.badges.find((badge) => !before.has(badge));
    renderRewards(); toast(unlocked ? `已蓋上印記，解鎖「${badgeDefinitions.find((badge) => badge.id === unlocked).title}」！` : `已蓋上印記，累積 ${record.streak} 日練習。`);
  }
  function renderRewards() {
    const record = unlockBadges(rewards()); saveRewards(record);
    const dates = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); return dayKey(date); });
    $('#streak-total').textContent = record.streak || 0;
    $('#checkin-status').textContent = record.lastCheckIn === dayKey() ? '今天的學習印記已蓋上，明天再繼續。' : '完成一次練習，為今天蓋上學習印記。';
    $('#checkin-button').textContent = record.lastCheckIn === dayKey() ? '今天已蓋印' : '蓋上今日印記'; $('#checkin-button').disabled = record.lastCheckIn === dayKey();
    $('#week-dots').innerHTML = dates.map((date, index) => `<i class="${record.dates?.includes(date) ? 'done' : ''} ${date === dayKey() ? 'today' : ''}">${index + 1}</i>`).join('');
    $('#badge-list').innerHTML = badgeDefinitions.map((badge) => { const unlocked = record.badges.includes(badge.id); return `<article class="badge ${unlocked ? 'unlocked' : 'locked'}"><span class="badge-mark">${badge.mark}</span><strong>${badge.title}</strong><small>${unlocked ? '已解鎖' : badge.rule}</small></article>`; }).join('');
  }

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
    const scope = window.HK_PRIMARY_ENGLISH_SCOPE[gradeNumber()], result = [];
    const frames = ['Choose the correctly spelt word:', 'Which word belongs to this grade-level word set?', 'Choose the word with the same spelling as the target:', 'Which word should be kept in your spelling notebook?', 'Choose the word shown in lowercase letters:'];
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const word = scope.words[index % scope.words.length], distractors = randomize(scope.words.filter((item) => item !== word)).slice(0, 3);
      const typo = word.length > 4 ? `${word.slice(0, -2)}${word.at(-1)}${word.at(-2)}` : `${word}e`;
      const options = index % 5 === 0 ? randomize([word, typo, ...distractors.slice(0, 2)]) : randomize([word, ...distractors]);
      result.push(question(`vocabulary-${gradeNumber()}-${index}`, '分級字詞與拼寫', 'english', `${frames[index % frames.length]} ${index % 5 === 0 ? `(${typo} / ${word})` : `Target word: ${word}`}`, word, `「${word}」是${state.grade}${scope.band}的分級字詞。`, options));
    }
    return result;
  }

  function createGrammar() {
    const scope = window.HK_PRIMARY_ENGLISH_SCOPE[gradeNumber()], result = [];
    const transformations = [
      (sentence) => sentence.replace(/\bam\b/g, 'are').replace(/\bis\b/g, 'are').replace(/\bare\b/g, 'is'),
      (sentence) => sentence.replace(/\bhas\b/g, 'have').replace(/\bhave\b/g, 'has'),
      (sentence) => sentence.replace(/\bwill\b/g, 'would').replace(/\bwould\b/g, 'will'),
      (sentence) => sentence.replace(/\bwas\b/g, 'were').replace(/\bwere\b/g, 'was'),
      (sentence) => sentence.replace(/\bto\b/g, 'for').replace(/\bfor\b/g, 'to')
    ];
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const [ruleId, ruleName, model] = scope.grammar[index % scope.grammar.length];
      const correct = model, wrong = transformations[index % transformations.length](correct);
      const options = randomize([correct, wrong === correct ? `${correct} not.` : wrong, correct.replace(/\.$/, '?'), `${scope.words[index % scope.words.length]} ${correct.toLowerCase()}`]);
      result.push(question(`grammar-${gradeNumber()}-${ruleId}-${index}`, '文法與句型', 'english', `Choose the sentence that correctly shows ${ruleName}.`, correct, `正確示範：${correct}`, options, null, null, { grammarRule: ruleId, grammarLabel: ruleName }));
    }
    return result;
  }

  function createSentencePatterns() {
    const scope = window.HK_PRIMARY_ENGLISH_SCOPE[gradeNumber()], result = [];
    const subjects = gradeNumber() <= 2 ? ['I', 'You', 'He', 'She', 'We', 'They'] : ['Amy', 'Ben', 'My friends', 'The class', 'Our teacher', 'The Eco Club'];
    const verbs = gradeNumber() <= 2 ? ['like', 'have', 'play', 'read', 'see', 'want'] : ['enjoy', 'visited', 'will join', 'has completed', 'should protect', 'can explain'];
    const endings = gradeNumber() <= 2 ? ['a red ball.', 'a book.', 'at school.', 'in the park.', 'every day.', 'with my friend.'] : ['the project carefully.', 'the library after school.', 'a useful report today.', 'the environment together.', 'the new reading book.', 'the activity next week.'];
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const sentence = `${subjects[index % subjects.length]} ${verbs[Math.floor(index / subjects.length) % verbs.length]} ${endings[Math.floor(index / 12) % endings.length]}`;
      const chunks = sentence.replace(/[.]/g, '').split(' ');
      const promptChunks = randomize(chunks).join(' / ');
      result.push(question(`sentence-${gradeNumber()}-${index}`, '句子結構', 'english', `Put these words in the correct order: ${promptChunks}`, sentence, `句子要有清楚的主語、動詞和完整意思：${sentence}`));
    }
    return result;
  }

  function createWritingOrder() {
    const level = gradeNumber(), result = [];
    const basicTuples = [['I', 'like', 'my new book'], ['She', 'has', 'a red bag'], ['We', 'play', 'in the park'], ['He', 'reads', 'a story'], ['They', 'have', 'a music lesson'], ['Ben', 'draws', 'a picture'], ['Amy', 'writes', 'her name'], ['The cat', 'sleeps', 'under the chair'], ['My friends', 'walk', 'to school'], ['You', 'can help', 'your teacher']];
    const middleTuples = [['Amy', 'visited', 'the library'], ['We', 'played', 'a game'], ['Ben', 'will join', 'the art club'], ['The class', 'is going to plant', 'some flowers'], ['My sister', 'can recycle', 'the bottles'], ['The pupils', 'should keep', 'the classroom clean'], ['Our teacher', 'will read', 'a story'], ['I', 'enjoy', 'the science lesson'], ['They', 'are making', 'a poster'], ['The team', 'has finished', 'the project']];
    const times = level <= 2 ? ['today', 'after school', 'every day', 'in the morning', 'with my friend', 'at home', 'on Monday', 'now', 'at the park', 'in class'] : ['at school', 'with the class', 'for a project', 'this afternoon', 'during the activity', 'at the library', 'with great care', 'before lunch', 'as a team', 'for practice'];
    const tuples = level <= 2 ? basicTuples : middleTuples;
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const [subject, verb, object] = tuples[index % tuples.length], time = times[Math.floor(index / tuples.length) % times.length];
      const correct = `${subject} ${verb} ${object} ${time}.`, chunks = correct.replace('.', '').split(' ');
      const ordered = [...chunks.slice(index % chunks.length), ...chunks.slice(0, index % chunks.length)].join(' / ');
      result.push(question(`writing-order-${level}-${index}`, '短寫作：句子排序', 'english', `Put the words in the correct order, then write the full sentence: ${ordered}`, correct, `寫作時先寫主語，再加動詞和完整意思：${correct}`, null, null, null, { writingSkill: 'order' }));
    }
    return result;
  }

  function createWritingEditing() {
    const level = gradeNumber(), result = [];
    const early = [['She are my friend.', 'She is my friend.'], ['I has a blue pen.', 'I have a blue pen.'], ['They is happy.', 'They are happy.'], ['He have two books.', 'He has two books.'], ['This are my bag.', 'This is my bag.'], ['The cats is under the table.', 'The cats are under the table.'], ['I likes milk.', 'I like milk.'], ['She play football.', 'She plays football.'], ['These is apples.', 'These are apples.'], ['An book is on the desk.', 'A book is on the desk.']];
    const middle = [['Yesterday, Ben go to the library.', 'Yesterday, Ben went to the library.'], ['Amy is play the piano now.', 'Amy is playing the piano now.'], ['A lion is more big than a cat.', 'A lion is bigger than a cat.'], ['We goes to school by bus.', 'We go to school by bus.'], ['They was happy at the picnic.', 'They were happy at the picnic.'], ['I stayed home because it rain.', 'I stayed home because it rained.'], ['He has two bicycle.', 'He has two bicycles.'], ['My sister do her homework every day.', 'My sister does her homework every day.'], ['The red small bag is mine.', 'The small red bag is mine.'], ['We walk at the road carefully.', 'We walk across the road carefully.']];
    const upper = [['The pupils is going to visit the museum.', 'The pupils are going to visit the museum.'], ['You must to wear a helmet.', 'You must wear a helmet.'], ['She have finished her homework.', 'She has finished her homework.'], ['Paper collect every Friday.', 'Paper is collected every Friday.'], ['If we will hurry, we will catch the bus.', 'If we hurry, we will catch the bus.'], ['The book who I borrowed is useful.', 'The book that I borrowed is useful.'], ['Could you tell me where is the library?', 'Could you tell me where the library is?'], ['We went out for buy food.', 'We went out to buy food.'], ['If I was you, I would ask for help.', 'If I were you, I would ask for help.'], ['I enjoy to read after school.', 'I enjoy reading after school.']];
    const pairs = level <= 2 ? early : level <= 3 ? middle : upper;
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const [incorrect, correct] = pairs[index % pairs.length];
      result.push(question(`writing-edit-${level}-${index}`, '短寫作：改錯練習', 'english', `This sentence has one grammar mistake. Write the corrected sentence: ${incorrect}`, correct, `正確句子：${correct}`, null, null, null, { writingSkill: 'editing' }));
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

  const visualSets = [
    { type: 'image', title: 'The Rooftop Garden Club', src: '/manus-storage/reading-eco-club_fa701fbb.jpg', alt: 'Pupils work together in a school rooftop garden.', text: 'The Eco Club meets on the school rooftop every Friday. Pupils grow herbs in raised planters and record plant height. They reuse clean bottles as watering cans because the club wants to reduce waste. Last month, they also made a small area for butterflies and bees.', aim: 'reduce waste while caring for the garden', action: 'record plant height', detail: 'reuse clean bottles as watering cans' },
    { type: 'image', title: 'A Community Book Exchange', src: '/manus-storage/reading-community-library_32d50d45.jpg', alt: 'Pupils organise books in a community library.', text: 'On Saturday morning, Maya and her classmates helped at a community book exchange. They sorted returned books by level and placed them on the correct shelves. A quiet reading corner was prepared for younger children. The team checked every borrowing card carefully before the library opened.', aim: 'make it easier for families to share books', action: 'sorted returned books by level', detail: 'checked every borrowing card carefully' },
    { type: 'image', title: 'Measuring New Growth', src: '/manus-storage/reading-eco-club_fa701fbb.jpg', alt: 'A pupil measures a young plant with a ruler.', text: 'The garden group measures the same plants every week. This helps pupils compare growth after rainy and sunny days. When a plant grows slowly, the group checks whether it has enough water and light. They do not change everything at once because they want their notes to be fair.', aim: 'compare plant growth over time', action: 'measures the same plants every week', detail: 'does not change everything at once' },
    { type: 'image', title: 'Choosing Books for Others', src: '/manus-storage/reading-community-library_32d50d45.jpg', alt: 'Pupils arrange books in a welcoming library.', text: 'At the book exchange, pupils placed picture books on lower shelves and longer stories on higher shelves. They wanted younger visitors to find books that they could reach and enjoy independently. The volunteers smiled when a child chose a book without asking for help.', aim: 'help younger visitors choose books independently', action: 'placed picture books on lower shelves', detail: 'longer stories were placed on higher shelves' },
    { type: 'image', title: 'A Garden for Small Animals', src: '/manus-storage/reading-eco-club_fa701fbb.jpg', alt: 'A school garden with plants and a butterfly.', text: 'The Eco Club noticed that few butterflies visited the rooftop garden. The pupils planted flowers near the herbs and kept one corner quiet. They learned that insects need food and safe places to rest. After several weeks, the group saw more butterflies around the planters.', aim: 'make the garden welcoming for butterflies', action: 'planted flowers near the herbs', detail: 'kept one corner quiet' },
    { type: 'image', title: 'The Book Cart Team', src: '/manus-storage/reading-community-library_32d50d45.jpg', alt: 'Pupils use a book cart to organise a library.', text: 'Before the library opened, the Book Cart Team checked the books that had been returned. If a cover was loose, they placed the book in a repair tray. If the book was ready, they returned it to the correct shelf. Their careful work meant visitors could find clean, complete books easily.', aim: 'make returned books ready for visitors', action: 'checked the books that had been returned', detail: 'placed loose-cover books in a repair tray' },
    { type: 'image', title: 'Saving Water at School', src: '/manus-storage/reading-eco-club_fa701fbb.jpg', alt: 'Pupils water plants with a reused bottle.', text: 'The garden group wanted to use less water. Instead of filling large watering cans every day, they collected rainwater in a covered container. They watered plants in the early morning, when less water would disappear in the heat. The pupils compared the amount of water used each week.', aim: 'use less water in the garden', action: 'collected rainwater in a covered container', detail: 'watered plants in the early morning' },
    { type: 'image', title: 'The Quiet Reading Corner', src: '/manus-storage/reading-community-library_32d50d45.jpg', alt: 'A quiet reading corner in a community library.', text: 'The library team made a quiet corner with soft cushions and a small book basket. They chose this place because some children found it hard to read near the busy return desk. The team asked visitors what they liked and changed the corner after listening to their suggestions.', aim: 'give children a calmer place to read', action: 'made a quiet corner with cushions', detail: 'changed the corner after listening to suggestions' },
    { type: 'image', title: 'Notes from the Garden', src: '/manus-storage/reading-eco-club_fa701fbb.jpg', alt: 'A pupil writes observations in a garden notebook.', text: 'Each Eco Club member has a small garden notebook. They write the date, weather and one observation every time they visit. At the end of the month, they read their notes together. The notebooks help them explain why some plants grew better than others.', aim: 'understand why plants grow differently', action: 'write the date, weather and one observation', detail: 'read their notes together at the end of the month' },
    { type: 'image', title: 'Welcoming New Readers', src: '/manus-storage/reading-community-library_32d50d45.jpg', alt: 'A friendly book exchange with pupils and a volunteer.', text: 'When a new family arrived at the book exchange, a pupil volunteer showed them where to return books and where to choose another one. She did not simply choose a book for the child. Instead, she asked what the child enjoyed reading and pointed out a few suitable shelves.', aim: 'help new families use the book exchange confidently', action: 'showed visitors where to return and choose books', detail: 'asked what the child enjoyed reading' },
    { type: 'chart', title: 'Books Borrowed in One Week', labels: ['Mon', 'Tue', 'Wed', 'Thu'], values: [18, 27, 21, 34], text: 'The chart shows books borrowed from the class library. More books were borrowed on Thursday because the class had a quiet reading period before lunch.' },
    { type: 'chart', title: 'Eco Club Recycling Results', labels: ['Paper', 'Plastic', 'Cans', 'Glass'], values: [42, 28, 16, 9], text: 'The chart shows items collected by the Eco Club in one month. The group placed collection boxes near classrooms and reminded pupils to rinse containers.' },
    { type: 'chart', title: 'After-school Club Choices', labels: ['Art', 'Coding', 'Drama', 'Sports'], values: [24, 31, 18, 27], text: 'The chart shows how many pupils joined each after-school club. The school will use the results to plan rooms and equipment for next term.' },
    { type: 'chart', title: 'Minutes Read Each Day', labels: ['Mon', 'Tue', 'Wed', 'Thu'], values: [25, 35, 30, 40], text: 'The chart shows average reading minutes each day. The teacher asked pupils to discuss one new word after every session.' },
    { type: 'chart', title: 'Water Saved by Class', labels: ['5A', '5B', '6A', '6B'], values: [16, 22, 19, 28], text: 'The chart shows litres of water saved by four classes during a water-saving challenge. Pupils checked taps after recess and put reminder labels beside sinks.' },
    { type: 'chart', title: 'School Garden Plant Growth', labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], values: [4, 7, 11, 15], text: 'The chart shows average basil plant height in centimetres. The club measured the plants on the same day each week.' },
    { type: 'chart', title: 'Reusable Cups Collected', labels: ['Mon', 'Tue', 'Wed', 'Thu'], values: [12, 20, 26, 18], text: 'The chart shows reusable cups returned to the school canteen. The Eco Team gave pupils a stamp on their lunch card when they returned a clean cup.' },
    { type: 'chart', title: 'Library Visit Times', labels: ['Before school', 'Recess', 'Lunch', 'After school'], values: [9, 18, 37, 14], text: 'The chart shows library visits at different times of day. Library helpers used the information to decide when they should be on duty.' },
    { type: 'chart', title: 'Healthy Snack Survey', labels: ['Fruit', 'Yoghurt', 'Nuts', 'Biscuits'], values: [32, 24, 12, 17], text: 'The chart shows pupils’ favourite choices in a healthy snack survey. The canteen will use the results when it plans a new snack day.' },
    { type: 'chart', title: 'Steps in a Walking Challenge', labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], values: [5400, 6200, 7100, 7600], text: 'The chart shows average daily steps during a four-week walking challenge. Pupils recorded their steps before sharing one activity that helped them move more.' }
  ];
  function createVisualReading() {
    const result = [];
    visualSets.forEach((set, index) => {
      const visual = set.type === 'image' ? { type: 'image', src: set.src, alt: set.alt, caption: 'Study the image and read the short passage.' } : { type: 'chart', title: set.title, labels: set.labels, values: set.values, caption: 'Study the bar chart and read the short passage.' };
      const high = set.values ? Math.max(...set.values) : 0, highIndex = set.values ? set.values.indexOf(high) : 0, low = set.values ? Math.min(...set.values) : 0, lowIndex = set.values ? set.values.indexOf(low) : 0;
      const prompts = set.type === 'image' ? [
        ['What is the main aim of the group?', [`To ${set.aim}.`, 'To win a sports competition.', 'To close the school rooftop.', 'To avoid working together.'], 0, `The passage explains that the group wanted to ${set.aim}.`],
        ['Which action is described in both the image and the passage?', [`They ${set.action}.`, 'They travelled to another country.', 'They built a new school.', 'They watched a film.'], 0, `The passage says that the pupils ${set.action}.`],
        ['Which detail shows that the group planned carefully?', [`They ${set.detail}.`, 'They stopped writing notes.', 'They ignored visitors.', 'They changed the project every minute.'], 0, 'This detail shows a thoughtful approach to the activity.'],
        ['What can readers infer about the pupils?', ['They notice small details and work as a team.', 'They dislike learning outside.', 'They never listen to suggestions.', 'They are not interested in helping.'], 0, 'Their actions show responsibility, curiosity and teamwork.'],
        ['Which title best matches the image and passage?', [set.title, 'A Day Without a Plan', 'Why Nobody Reads', 'The Lost Classroom'], 0, `The visual and passage both focus on ${set.title.toLowerCase()}.`]
      ] : [
        ['Which category had the highest number?', [set.labels[highIndex], set.labels[(highIndex + 1) % 4], set.labels[(highIndex + 2) % 4], set.labels[lowIndex]], 0, `${set.labels[highIndex]} is the highest bar at ${high}.`],
        [`How many were recorded for ${set.labels[0]}?`, [String(set.values[0]), String(high), String(low), String(set.values[1])], 0, `The bar for ${set.labels[0]} shows ${set.values[0]}.`],
        [`What is the difference between ${set.labels[highIndex]} and ${set.labels[lowIndex]}?`, [String(high - low), String(high + low), String(high), String(low)], 0, `${high} − ${low} = ${high - low}.`],
        ['Which statement is supported by the chart?', [`${set.labels[highIndex]} had more than ${set.labels[lowIndex]}.`, 'Every category had the same number.', `${set.labels[lowIndex]} had the most.`, 'The chart gives no numbers.'], 0, `The bars show that ${set.labels[highIndex]} is greater than ${set.labels[lowIndex]}.`],
        ['What is the most useful reason for making this chart?', ['To compare numbers in different categories.', 'To tell a fictional story.', 'To hide information from readers.', 'To show a map of the school.'], 0, 'A bar chart makes it easy to compare values across categories.']
      ];
      prompts.forEach(([prompt, options, answer, explanation], number) => result.push(question(`visual-reading-${gradeNumber()}-${index}-${number}`, '圖像與圖表閱讀', 'english', prompt, answer, explanation, options, { title: set.title, text: set.text }, visual)));
    });
    return result;
  }

  function createJuniorReading() {
    const scope = window.HK_PRIMARY_ENGLISH_SCOPE[gradeNumber()], result = [];
    const names = ['Amy', 'Ben', 'Cindy', 'David', 'Eva', 'Fred', 'Grace', 'Harry', 'Ivy', 'Jack'];
    const places = ['the park', 'the library', 'the school garden', 'the playground', 'the market'];
    const actions = ['reads a book', 'plays with a ball', 'helps a friend', 'draws a picture', 'looks after a plant'];
    for (let index = 0; index < MAX_PER_TOPIC; index += 1) {
      const name = names[index % names.length], place = places[Math.floor(index / 5) % places.length], action = actions[Math.floor(index / 10) % actions.length], word = scope.words[index % scope.words.length];
      const text = gradeNumber() <= 2
        ? `${name} is at ${place}. ${name} has a ${word}. ${name} ${action}. ${name} is happy.`
        : gradeNumber() === 3
          ? `Last Saturday, ${name} went to ${place}. ${name} had a ${word}. ${name} ${action} and helped a friend. ${name} enjoyed the day.`
          : `${name} is going to visit ${place} this weekend. ${name} will bring a ${word}. ${name} wants to ${action} and learn something new.`;
      const prompts = [
        [`Where is ${name}?`, [place, 'at the airport', 'in a hospital', 'at the beach'], 0, `The passage says that ${name} is at ${place}.`],
        [`What does ${name} have or bring?`, [`a ${word}`, 'a computer game', 'a ticket', 'a bicycle'], 0, `The passage mentions a ${word}.`],
        [`What does ${name} do or want to do?`, [action, 'sleep all day', 'watch a film at home', 'leave early'], 0, `The passage says that ${name} ${action}.`],
        [`How does ${name} feel?`, [gradeNumber() <= 2 ? 'happy' : 'excited about the activity', 'angry', 'bored', 'worried'], 0, 'The final sentence shows a positive feeling about the activity.'],
        ['Which title best matches the passage?', [`${name}'s Day`, 'A Lost Animal', 'A Long Flight', 'A Stormy Night'], 0, `The passage is about ${name}'s activity.`]
      ];
      prompts.forEach(([prompt, options, answer, explanation], number) => result.push(question(`junior-reading-${gradeNumber()}-${index}-${number}`, '閱讀理解', 'english', prompt, answer, explanation, options, { title: `${name}'s Story`, text })));
    }
    return result;
  }

  function getBank() {
    if (state.topic === 'operations') return createOperations();
    if (state.topic === 'fractions') return createFractions();
    if (state.topic === 'word-problems') return createWordProblems();
    if (state.topic === 'vocabulary') return createVocabulary();
    if (state.topic === 'grammar') return createGrammar();
    if (state.topic === 'sentence-patterns') return createSentencePatterns();
    if (state.topic === 'writing-order') return createWritingOrder();
    if (state.topic === 'writing-edit') return createWritingEditing();
    if (state.topic === 'visual-reading') return createVisualReading();
    return gradeNumber() <= 4 ? createJuniorReading() : createReading();
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
    const scope = window.HK_PRIMARY_ENGLISH_SCOPE?.[gradeNumber()];
    $('#grade-note').textContent = state.subject === 'english' && scope ? `英文範疇：${scope.band} — ${scope.note}` : isHigh() ? '高小已開放英文閱讀理解和數學長題目應用題。' : '升讀小五後，即可挑戰高小進階閱讀和長題目應用題。';
    $$('.grade-btn').forEach((button) => button.classList.toggle('selected', button.dataset.grade === state.grade));
    $$('.subject-tab').forEach((button) => button.classList.toggle('selected', button.dataset.subject === state.subject));
    renderTopicList();
    const topic = selectedTopic();
    $('#topic-count').textContent = `${getTopics().length} 個課題`;
    $('#selection-title').textContent = `${state.grade} · ${state.subject === 'math' ? '數學' : '英文'} · ${topic.title}`;
    $('#selection-description').textContent = `共 ${topic.sessions} 題，逐題作答後才會顯示評語。`;
    renderStats(); renderRewards();
  }

  function renderAnalysis() {
    const scope = window.HK_PRIMARY_ENGLISH_SCOPE?.[gradeNumber()], stored = grammarAnalysis();
    if (!scope) return;
    const rows = scope.grammar.map(([rule, label]) => {
      const item = stored[`${state.grade}-${rule}`] || { grade: state.grade, rule, label, attempted: 0, correct: 0, incorrect: 0 };
      return { ...item, accuracy: item.attempted ? Math.round((item.correct / item.attempted) * 100) : null };
    });
    const attempted = rows.reduce((sum, row) => sum + row.attempted, 0), incorrect = rows.reduce((sum, row) => sum + row.incorrect, 0), accuracy = attempted ? Math.round(((attempted - incorrect) / attempted) * 100) : null;
    const weakest = rows.filter((row) => row.attempted > 0).sort((first, second) => second.incorrect - first.incorrect || first.accuracy - second.accuracy)[0];
    $('#analysis-title').textContent = `${state.grade} · 文法範疇`;
    $('#analysis-total-wrong').textContent = incorrect;
    $('#analysis-summary').innerHTML = `<article class="analysis-metric"><small>文法作答</small><strong>${attempted}</strong><span>已核對題目</span></article><article class="analysis-metric"><small>累積錯題</small><strong>${incorrect}</strong><span>優先回顧錯題本</span></article><article class="analysis-metric"><small>整體正確率</small><strong>${accuracy === null ? '—' : `${accuracy}%`}</strong><span>${weakest ? `先溫習：${escape(weakest.label)}` : '完成文法題後顯示弱點'}</span></article>`;
    if (!attempted) { $('#grammar-bars').innerHTML = `<div class="analysis-empty">尚未有${state.grade}文法作答紀錄。完成「文法與句型」後，這裡會按範疇顯示錯題分佈。</div>`; return; }
    const maximum = Math.max(1, ...rows.map((row) => row.incorrect));
    $('#grammar-bars').innerHTML = rows.map((row) => `<article class="grammar-bar-row"><div class="grammar-bar-label"><strong>${escape(row.label)}</strong><small>${row.attempted ? `作答 ${row.attempted} 題 · 正確率 ${row.accuracy}%` : '尚未作答'}</small></div><div class="grammar-track"><div class="grammar-fill" style="width:${row.incorrect ? Math.max(8, Math.round((row.incorrect / maximum) * 100)) : 0}%"></div></div><div class="grammar-bar-value">${row.incorrect} 題錯</div></article>`).join('');
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
  function renderVisual(visual) {
    if (!visual) return '';
    if (visual.type === 'image') return `<figure class="reading-visual image-visual"><button class="visual-open" type="button" data-zoom-image="${visual.src}" data-zoom-alt="${escape(visual.alt)}"><img src="${visual.src}" alt="${escape(visual.alt)}"></button><figcaption>${escape(visual.caption)}</figcaption></figure>`;
    const maximum = Math.max(...visual.values);
    return `<figure class="reading-visual chart-visual"><figcaption><strong>${escape(visual.title)}</strong><span>${escape(visual.caption)}</span></figcaption><div class="bar-chart">${visual.values.map((value, index) => `<div class="bar-item"><span class="bar-value">${value}</span><i style="--bar-height:${Math.max(9, Math.round((value / maximum) * 100))}%"></i><small>${escape(visual.labels[index])}</small></div>`).join('')}</div></figure>`;
  }
  function renderQuestion() {
    const session = state.session, item = currentQuestion(), currentResult = session.results[session.index];
    $('#session-title').textContent = `${state.grade} · ${item.subject === 'math' ? '數學' : '英文'} · ${item.topic}`;
    $('#question-number').textContent = String(session.index + 1).padStart(2, '0');
    $('#question-topic').textContent = item.subject === 'math' ? 'MATHS PRACTICE' : 'ENGLISH PRACTICE';
    const visual = renderVisual(item.visual);
    const passage = item.passage ? `<article class="passage"><strong>${escape(item.passage.title)}</strong><br>${escape(item.passage.text)}</article>` : '';
    const writingGuide = item.writingSkill ? `<div class="writing-guide ${item.writingSkill === 'editing' ? 'editing' : 'ordering'}"><span>${item.writingSkill === 'editing' ? '改錯提示' : '排序提示'}</span><p>${item.writingSkill === 'editing' ? '先圈出錯誤位置，再輸入改正後的完整句子。完成後檢查主語與動詞是否配合。' : '先找主語，再放動詞，最後補上其他資料和句號；完成後讀一次，確認意思通順。'}</p></div>` : '';
    const body = item.options
      ? `<div class="choices">${item.options.map((choice, index) => `<button class="choice ${session.drafts[session.index] === String(index) ? 'selected' : ''}" data-choice="${index}"><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${escape(choice)}</span></button>`).join('')}</div>`
      : `<div class="answer-area ${item.writingSkill ? 'short-writing-area' : ''}"><input class="answer-field" id="answer-field" autocomplete="off" inputmode="text" placeholder="${item.writingSkill ? '在此輸入完整英文句子' : '在此輸入答案'}" value="${escape(session.drafts[session.index] || '')}"></div>`;
    $('#question-content').innerHTML = `${visual}${passage}<h1>${escape(item.prompt)}</h1>${writingGuide}${body}`;
    const feedback = $('#feedback');
    feedback.className = `feedback ${currentResult ? `show ${currentResult.correct ? 'correct' : 'wrong'}` : ''}`;
    feedback.innerHTML = currentResult ? `<strong>${currentResult.correct ? '答對了。' : '這一題先放進錯題本。'}</strong> ${escape(item.explanation)}` : '';
    $('#check-question').classList.toggle('hidden', Boolean(currentResult)); $('#next-question').classList.toggle('hidden', !currentResult); $('#previous-question').disabled = session.index === 0;
    if (item.options) $$('[data-choice]').forEach((button) => button.addEventListener('click', () => { if (currentResult) return; session.drafts[session.index] = button.dataset.choice; $$('.choice').forEach((choice) => choice.classList.toggle('selected', choice === button)); }));
    else $('#answer-field').addEventListener('input', (event) => { session.drafts[session.index] = event.target.value; });
    $('[data-zoom-image]')?.addEventListener('click', (event) => { const button = event.currentTarget, modal = $('#image-modal'); $('#image-modal-content').src = button.dataset.zoomImage; $('#image-modal-content').alt = button.dataset.zoomAlt; $('#image-modal-caption').textContent = button.dataset.zoomAlt; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); });
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
  function recordGrammarResult(item, correct) {
    if (item.subject !== 'english' || !item.grammarRule) return;
    const data = grammarAnalysis(), key = `${state.grade}-${item.grammarRule}`;
    const entry = data[key] || { grade: state.grade, rule: item.grammarRule, label: item.grammarLabel, attempted: 0, correct: 0, incorrect: 0 };
    entry.attempted += 1; if (correct) entry.correct += 1; else entry.incorrect += 1;
    data[key] = entry; saveGrammarAnalysis(data);
  }
  function checkCurrent() {
    const session = state.session, item = currentQuestion(), answer = session.drafts[session.index];
    if (answer === undefined || String(answer).trim() === '') { toast('請先選擇或輸入答案。'); return; }
    const correct = item.options ? String(answer) === item.answer : normalize(answer) === normalize(item.answer);
    session.results[session.index] = { correct, answer };
    const data = stats(); data.completed += 1; if (correct) data.correct += 1; saveStats(data); recordGrammarResult(item, correct);
    const rewardRecord = rewards(); if (item.visual) rewardRecord.visualQuestions = (rewardRecord.visualQuestions || 0) + 1; saveRewards(unlockBadges(rewardRecord));
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
    $$('.side-nav button, .top-actions [data-nav]').forEach((button) => button.addEventListener('click', () => { const view = button.dataset.nav; if (view === 'wrongbook') { renderWrongbook(); showView('wrongbook'); } else if (view === 'analysis') { renderAnalysis(); showView('analysis'); } else { showView('home'); renderHome(); } }));
    $('#check-question').addEventListener('click', checkCurrent); $('#next-question').addEventListener('click', nextQuestion); $('#previous-question').addEventListener('click', () => { if (state.session.index > 0) { state.session.index -= 1; renderQuestion(); } });
    $('#save-later').addEventListener('click', () => { showView('home'); renderHome(); toast('進度暫時保留在這個瀏覽器分頁。'); }); $('#result-home').addEventListener('click', () => { showView('home'); renderHome(); }); $('#result-wrongbook').addEventListener('click', () => { renderWrongbook(); showView('wrongbook'); });
    $('#checkin-button').addEventListener('click', checkInToday);
    const closeModal = () => { $('#image-modal').classList.remove('open'); $('#image-modal').setAttribute('aria-hidden', 'true'); }; $('#image-modal-close').addEventListener('click', closeModal); $('#image-modal').addEventListener('click', (event) => { if (event.target.id === 'image-modal') closeModal(); });
    $$('.filter-tab').forEach((button) => button.addEventListener('click', () => { state.filter = button.dataset.filter; renderWrongbook(); }));
  }

  bindEvents(); renderHome();
})();
