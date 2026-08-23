(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const scopeMap = window.PRIMARY_ENGLISH_SCOPE || {};
  const KEYS = {
    stats: 'primary-english-studio-stats-v1',
    review: 'primary-english-studio-review-v1',
    used: 'primary-english-studio-used-v1',
    juniorProgress: 'primary-english-studio-junior-progress-v1'
  };

  const state = { grade: 3, route: 'read', module: 'reading', session: null, modelGrade: 4, modelId: null, studyTab: 'mistakes', quiz: { modelId: null, index: 0, selected: null, results: [] } };
  const safeGet = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const safeSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
  const wordCount = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;
  const randomize = (items) => [...items].sort(() => Math.random() - 0.5);
  const scope = () => scopeMap[state.grade];
  const stats = () => safeGet(KEYS.stats, { completed: 0, correct: 0, skills: { read: 0, write: 0, listen: 0, language: 0 } });
  const reviewItems = () => safeGet(KEYS.review, []);
  const saveStats = (value) => safeSet(KEYS.stats, value);
  const saveReview = (value) => safeSet(KEYS.review, value);
  const emptyJuniorProgress = () => ({ version: 2, updatedAt: null, rewards: { stars: 0, badgeIds: [] }, grades: { 1: { phonics: { attempted: 0, correct: 0, lastAttempt: null }, listening: { attempted: 0, correct: 0, lastAttempt: null } }, 2: { phonics: { attempted: 0, correct: 0, lastAttempt: null }, listening: { attempted: 0, correct: 0, lastAttempt: null } }, 3: { phonics: { attempted: 0, correct: 0, lastAttempt: null }, listening: { attempted: 0, correct: 0, lastAttempt: null } } } });
  const juniorProgress = () => {
    const stored = safeGet(KEYS.juniorProgress, emptyJuniorProgress());
    const fallback = emptyJuniorProgress();
    stored.version = 2;
    stored.rewards ||= fallback.rewards;
    stored.rewards.stars = Math.max(0, Number(stored.rewards.stars || 0));
    stored.rewards.badgeIds = Array.isArray(stored.rewards.badgeIds) ? stored.rewards.badgeIds : [];
    [1, 2, 3].forEach((grade) => {
      stored.grades ||= {};
      stored.grades[grade] ||= fallback.grades[grade];
      ['phonics', 'listening'].forEach((kind) => { stored.grades[grade][kind] ||= fallback.grades[grade][kind]; });
    });
    return stored;
  };
  const saveJuniorProgress = (value) => safeSet(KEYS.juniorProgress, value);
  const juniorRewardConfig = () => window.JUNIOR_REWARDS || { points: { correct: 10, attempt: 3 }, badges: [] };
  const juniorRewardMetrics = (record) => {
    const entries = [1, 2, 3].flatMap((grade) => ['phonics', 'listening'].map((kind) => record.grades[grade][kind]));
    const phonics = [1, 2, 3].reduce((sum, grade) => sum + record.grades[grade].phonics.attempted, 0);
    const phonicsCorrect = [1, 2, 3].reduce((sum, grade) => sum + record.grades[grade].phonics.correct, 0);
    const listening = [1, 2, 3].reduce((sum, grade) => sum + record.grades[grade].listening.attempted, 0);
    const listeningCorrect = [1, 2, 3].reduce((sum, grade) => sum + record.grades[grade].listening.correct, 0);
    return { attempted: entries.reduce((sum, item) => sum + item.attempted, 0), correct: entries.reduce((sum, item) => sum + item.correct, 0), phonicsAttempted: phonics, phonicsCorrect, listeningAttempted: listening, listeningCorrect };
  };
  const rewardMetricValue = (metrics, type) => Number(metrics[type] || 0);
  const badgeProgress = (badge, metrics) => Math.min(rewardMetricValue(metrics, badge.condition.type), badge.condition.value);
  const awardJuniorRewards = (record, correct) => {
    const config = juniorRewardConfig();
    record.rewards ||= { stars: 0, badgeIds: [] };
    record.rewards.badgeIds ||= [];
    const points = Number(correct ? config.points.correct : config.points.attempt) || 0;
    record.rewards.stars = Math.max(0, Number(record.rewards.stars || 0) + points);
    const metrics = juniorRewardMetrics(record);
    const unlocked = (config.badges || []).filter((badge) => rewardMetricValue(metrics, badge.condition.type) >= badge.condition.value && !record.rewards.badgeIds.includes(badge.id));
    record.rewards.badgeIds.push(...unlocked.map((badge) => badge.id));
    return { points, unlocked };
  };

  const routes = {
    read: {
      token: 'R', color: '#214d7a', tint: '#eef7fc', label: 'Read', labelZh: '閱讀理解', title: 'Read with confidence', titleZh: '建立自信閱讀',
      description: 'Read short texts and find the answer.', descriptionZh: '閱讀短文，找出答案。',
      tip: '先圈出題目中的關鍵字，再回到文章找相關句子。',
      modules: [
        { id: 'reading', symbol: 'R', title: 'Reading comprehension', titleZh: '閱讀理解', description: 'Read and choose', descriptionZh: '閱讀再選答案', sessions: 10 },
        { id: 'reading-details', symbol: 'K', title: 'Key detail hunter', titleZh: '關鍵細節搜尋', description: 'Find key details', descriptionZh: '找出重點資料', sessions: 10 },
        { id: 'advanced-reading', symbol: '★', title: 'Advanced reading workshop', titleZh: '進階閱讀工作坊', description: 'P4–P6 genres, inference and model analysis', descriptionZh: '小四至小六多體裁閱讀、推論及範例解析', sessions: 5, minGrade: 4 },
      ]
    },
    write: {
      token: 'W', color: '#d97463', tint: '#fff2ef', label: 'Write', labelZh: '寫作與編輯', title: 'Write clear English', titleZh: '寫出清晰英語',
      description: 'Build clear sentences and ideas.', descriptionZh: '寫出清楚句子和想法。',
      tip: '寫完後先檢查主語、動詞、大小寫和句號，再讀一次是否通順。',
      modules: [
        { id: 'sentence-builder', symbol: 'S', title: 'Sentence builder', titleZh: '句子重組', description: 'Make a sentence', descriptionZh: '組成完整句子', sessions: 8 },
        { id: 'proofreading', symbol: 'E', title: 'Proofreading', titleZh: '改錯練習', description: 'Find the mistake', descriptionZh: '找出錯誤', sessions: 8 },
        { id: 'writing-plan', symbol: 'P', title: 'Writing planner', titleZh: '寫作構思', description: 'Plan your writing', descriptionZh: '規劃你的寫作', sessions: 6 },
        { id: 'primary-writing-studio', symbol: '✎', title: 'Writing skills studio', titleZh: '分級寫作工作坊', description: 'Picture, paragraph and genre scaffolds', descriptionZh: '看圖、段落與文體寫作鷹架', sessions: 2 },
        { id: 'writing-models', symbol: '★', title: 'High-score models', titleZh: '呈分試高分範文', description: 'P4–P6 model writing and scoring points', descriptionZh: '小四至小六範文與評分要點', sessions: 0, minGrade: 4, assessment: true },
      ]
    },
    listen: {
      token: 'L', color: '#4e8875', tint: '#eff9f4', label: 'Listen', labelZh: '聆聽與口語', title: 'Listen, then speak', titleZh: '先聽再說',
      description: 'Listen. Then speak.', descriptionZh: '先聽，再說。',
      tip: '利用準備時間先看選項，預測可能聽到的人物、地點、數字或動作。',
      modules: [
        { id: 'listening', symbol: 'L', title: 'Listening lab', titleZh: '聆聽練習室', description: 'Listen again', descriptionZh: '可重播聆聽', sessions: 10 },
        { id: 'speaking', symbol: 'S', title: 'Speak aloud', titleZh: '朗讀與表達', descriptionZh: '聽示範後按計劃完成個人短講', description: 'Listen to a model, then build your own talk', sessions: 5 },
        { id: 'listening-vocab', symbol: 'V', title: 'Listening vocabulary', titleZh: '聆聽詞彙卡', description: 'Reveal, hear and use key listening words', descriptionZh: '翻開、聆聽及運用聆聽重點詞彙', sessions: 10, minGrade: 4 },
        { id: 'listening-check', symbol: 'Q', title: 'Listening quick check', titleZh: '聽後小測', description: 'Short replayable clips with instant feedback', descriptionZh: '可重播短句配合即時中英回饋', sessions: 7, minGrade: 4 },
        { id: 'roleplay', symbol: 'R', title: 'Role-play practice', titleZh: '角色對話', description: 'Take both roles in useful school-life dialogues', descriptionZh: '在實用校園情境中練習 A、B 角色對話', sessions: 3, minGrade: 4 },
      ]
    },
    language: {
      token: 'A', color: '#e1a443', tint: '#fff9ec', label: 'Apply', labelZh: '語言運用', title: 'Apply language well', titleZh: '靈活運用英語',
      description: 'Use words and grammar.', descriptionZh: '運用字詞和文法。',
      tip: '做時態題時，先找時間提示；做句子題時，先找誰在做這個動作。',
      modules: [
        { id: 'vocabulary', symbol: 'V', title: 'Vocabulary & spelling', titleZh: '字詞與拼寫', description: 'Learn useful words', descriptionZh: '學習實用字詞', sessions: 12 },
        { id: 'grammar', symbol: 'G', title: 'Grammar & patterns', titleZh: '文法與句型', description: 'Try grammar', descriptionZh: '練習文法', sessions: 8 },
        { id: 'junior-game', symbol: '♪', title: 'Phonics & story game', titleZh: '拼音與故事遊戲', description: 'Hear a word or clue, then make a playful choice', descriptionZh: '聽字詞或故事線索，再作有趣選擇', sessions: 8, maxGrade: 3 },
        { id: 'word-match', symbol: '↔', title: 'Word Match', titleZh: '單字配對', description: 'Reveal word clues and build everyday vocabulary', descriptionZh: '翻開單字線索，建立生活英語詞彙', sessions: 6, maxGrade: 3 },
        { id: 'pre-s1-mock', symbol: '◎', title: 'Pre-S1 readiness mock', titleZh: '中一分班試英語模擬', description: 'Original P6 practice in listening, reading, language use and writing', descriptionZh: '原創小六升中銜接：聆聽、閱讀、語言運用及寫作', sessions: 12, minGrade: 6, assessmentMock: true },
        { id: 'pre-s1-review', symbol: '✓', title: 'Pre-S1 vocabulary & grammar review', titleZh: '中一分班試詞彙與文法重點複習', description: 'A bilingual checklist with examples and editing reminders', descriptionZh: '附例句及改錯提醒的雙語重點清單', sessions: 20, minGrade: 6, reviewGuide: true },
      ]
    }
  };

  const scopeZh = {
    1: { stage: '初小 · 基礎起步', overview: '從自然拼讀、日常字詞與簡短句子開始，建立英文興趣和信心。', reading: '閱讀圖像、標籤、童謠和短篇文字，找出熟悉關鍵字。', writing: '完成句子、看圖填空，並寫出 1–3 句生活相關短句。', listening: '辨識字母語音，聽懂簡單課室指令、名字、顏色和數字。', speaking: '介紹自己，回答簡單問題，並朗讀短對話。', assessment: '善用圖片線索；先輕聲讀出單字，再找相配的字母組合。' },
    2: { stage: '初小 · 日常英語', overview: '用英文表達生活作息、需要和熟悉地方，逐步建立正確句子。', reading: '閱讀告示、時間表和簡短描述，配對細節和簡單問題。', writing: '圍繞日常生活、喜愛食物或地方，寫出 3–4 句連貫句子。', listening: '從短對話中聽出動作、時間、食物和天氣資料。', speaking: '用完整句子描述圖片，並提出簡單追問。', assessment: '做動詞題前先找主語，檢查是一個人還是多個人做動作。' },
    3: { stage: '初小 · 連結想法', overview: '連結簡單想法，描述經歷，開始獨立閱讀短篇故事。', reading: '閱讀 80–120 字故事或資訊短文，找出人物、地點、動作和次序。', writing: '寫短日記或四格故事，交代開頭、發展和結局。', listening: '聽短故事時辨認場景、重點動作和角色感受。', speaking: '運用 first、next、finally 依次複述熟悉事件。', assessment: '圈出 yesterday、last week 等時間提示，它們常會告訴你動詞形式。' },
    4: { stage: '高小 · 資訊與組織', overview: '清楚組織資訊，擴闊時態與語言功能的運用。', reading: '閱讀電郵、日記、說明和資訊文章，辨認寫作目的並整理資料。', writing: '寫有結構的段落、實用訊息和 60–90 字看圖描述。', listening: '從較長對話或錄音故事中找出主旨和支持細節。', speaking: '就健康習慣或環保等熟悉題目，作約一分鐘預備演說。', assessment: '聆聽前先看選項，預測可能出現的人物、地點或動作。' },
    5: { stage: '高小 · 應用與推論', overview: '比較時態、從上下文推論意思，並為不同目的寫作。', reading: '閱讀報告、海報、圖表和新聞式短文，從語境作簡單推論。', writing: '寫 80–120 字電郵、記敘文、報告和建議書，使用段落和連接詞。', listening: '從較長對話、廣播或故事摘錄簡單筆記，辨認說話目的。', speaking: '在小組討論中表達意見，並提出一至兩個清晰理由。', assessment: '先找時間詞：yesterday 多用過去式；since 和 for 常用現在完成式。' },
    6: { stage: '高小 · 升中準備', overview: '綜合語法、推論和獨立表達，為中學英語作準備。', reading: '閱讀多種體裁、觀點和較長文章，推論語氣、代詞指向與主旨。', writing: '寫 100–150 字電郵、故事、文章和建議書，安排吸引開首和完整段落。', listening: '從廣播或討論辨認主旨、細節資料和說話者語氣。', speaking: '作 1–2 分鐘有結構的演說，並在小組討論中作出有理回應。', assessment: '故事寫作要保持時態一致；用連接詞表達先後、對比和因果。' }
  };

  const termZh = {
    'greetings': '問候語', 'family members': '家庭成員', 'school and stationery': '校園與文具', 'common animals': '常見動物', 'fruit and numbers': '水果與數字', 'toys': '玩具', 'colours': '顏色', 'clothes': '服飾',
    'body parts': '身體部位', 'food and drinks': '食物與飲料', 'home rooms': '家居空間', 'public places': '公共場所', 'weather and seasons': '天氣與季節', 'daily routines': '日常作息',
    'jobs': '職業', 'transport': '交通工具', 'hobbies and leisure': '興趣與休閒', 'shapes and size': '形狀與大小', 'illness and feelings': '身體不適與感受',
    'world festivals': '世界節日', 'cultures': '各國文化', 'health and habits': '健康與生活習慣', 'recycling and the environment': '回收與環境保護', 'community facilities': '社區設施',
    'world geography and travel': '世界地理與旅遊', 'natural disasters': '自然災害', 'technology and future life': '科技與未來生活', 'famous people and biographies': '著名人物與生平',
    'secondary-school life': '升中校園生活', 'dreams and careers': '夢想與職業規劃', 'teenage challenges': '青少年成長煩惱', 'volunteer service': '義工服務', 'social topics': '社會議題',
    'am / is / are': 'be 動詞', 'a / an / the': '冠詞', 'singular and plural nouns': '單複數名詞', 'personal pronouns': '人稱代名詞', 'my / your / his / her': '所有格形容詞', 'can / cannot': '能力與許可',
    'have / has': '擁有與第三身用法', 'simple present tense': '簡單現在式', 'third-person -s': '第三身單數', 'there is / there are': '有／存在句型', 'countable nouns': '可數名詞', 'some / any': '一些／任何',
    'simple past tense': '簡單過去式', 'common irregular verbs': '常用不規則動詞', 'present continuous': '現在進行式', 'comparatives': '比較級', 'frequency adverbs': '頻率副詞', 'and / but / because': '連接詞',
    'will / will not': '簡單未來式', 'be going to': '計劃與意向', 'present perfect introduction': '現在完成式入門', 'should / must / must not': '建議與責任', 'much / many / a few / a little': '數量詞', 'superlatives': '最高級',
    'present perfect with already / yet / for / since': '現在完成式時間詞', 'present, past and future contrast': '三種時態比較', 'passive voice introduction': '被動語態入門', 'first conditional': '第一類條件句', 'relative clauses': '關係子句', 'indirect questions': '間接問句',
    'past continuous with simple past': '過去進行式與過去式', 'present perfect versus simple past': '完成式與過去式比較', 'passive voice': '被動語態', 'second conditional': '第二類條件句', 'gerunds and infinitives': '動名詞與不定詞', 'reported speech introduction': '間接引語入門',
    'in / on / under / next to': '地方介詞', 'What / Who / Where / How many': '基礎疑問詞', 'present continuous': '現在進行式', 'days and time words': '日子與時間詞', 'possessive nouns': '所有格名詞', 'movement prepositions': '移動介詞', 'Why / How often': '進階疑問詞',
    'adverbs of manner': '方式副詞', 'if for everyday results': '日常結果條件句', 'first / next / finally': '次序連接詞', 'comparatives and superlatives': '比較級與最高級', 'because / so / although': '因果與轉折連接詞', 'to-infinitive': '不定詞',
    'reflexive and possessive pronouns': '反身與所有格代名詞', 'although / however / therefore': '轉折與因果連接詞', 'compound and complex sentences': '複合句與複雜句'
  };

  const bilingualTerm = (term) => `${term}｜${termZh[term] || '英文學習重點'}`;
  const bilingual = (english, chinese, className = '') => `<span class="bi-en ${className}">${escape(english)}</span><span class="bi-zh">${escape(chinese)}</span>`;

  const question = (id, route, topic, prompt, answer, explanation, options = null, extras = {}) => ({
    id, grade: state.grade, route, topic, prompt, answer: String(answer), explanation, options, ...extras
  });
  const expansion = () => window.QUESTION_BANK_EXPANSION || {};
  const expanded = (key, source) => [...source, ...(expansion()[key]?.[state.grade] || [])];

  const grammarSets = {
    1: [
      ['Choose the correct sentence.', ['She is my friend.', 'She are my friend.', 'She am my friend.', 'She be my friend.'], 'Use is with she.'],
      ['Choose the correct sentence.', ['I have a blue bag.', 'I has a blue bag.', 'I is a blue bag.', 'I are a blue bag.'], 'Use have with I.'],
      ['Choose the correct phrase.', ['an apple', 'a apple', 'the apple are', 'apple an'], 'Use an before a vowel sound.'],
      ['Choose the correct sentence.', ['The cat is under the chair.', 'The cat under is the chair.', 'The cat are under chair.', 'The cat is under a chair?'], 'The cat is one animal, so use is.'],
      ['Choose the correct sentence.', ['They are happy.', 'They is happy.', 'They am happy.', 'They be happy.'], 'Use are with they.'],
      ['Choose the correct question.', ['Where is my book?', 'Where my book is?', 'Where are my book?', 'Where book my is?'], 'Questions with is begin with Where is.']
    ],
    2: [
      ['Choose the correct sentence.', ['Tom plays football on Sunday.', 'Tom play football on Sunday.', 'Tom playing football on Sunday.', 'Tom played football now.'], 'In the simple present, one person such as Tom usually takes plays.'],
      ['Choose the correct sentence.', ['There are three apples.', 'There is three apples.', 'There are three apple.', 'There be three apples.'], 'Use are and plural apples for more than one.'],
      ['Choose the correct sentence.', ['She has two sisters.', 'She have two sisters.', 'She is two sisters.', 'She having two sisters.'], 'Use has with she.'],
      ['Choose the correct sentence.', ['The baby is sleeping now.', 'The baby sleeping now.', 'The baby are sleeping now.', 'The baby sleep now.'], 'Use is + verb-ing for an action happening now.'],
      ['Choose the correct question.', ['Can you swim?', 'Can you swims?', 'Do you can swim?', 'Can swim you?'], 'After can, use the base verb: swim.'],
      ['Choose the correct sentence.', ['We have PE on Monday.', 'We have PE in Monday.', 'We have PE at Monday.', 'We have PE Monday on.'], 'Use on with days of the week.']
    ],
    3: [
      ['Choose the correct sentence.', ['We visited Grandma yesterday.', 'We visit Grandma yesterday.', 'We visiting Grandma yesterday.', 'We have visit Grandma yesterday.'], 'Yesterday is a past-time clue, so use visited.'],
      ['Choose the correct sentence.', ['A lion is bigger than a cat.', 'A lion is big than a cat.', 'A lion is more big than a cat.', 'A lion bigger than a cat.'], 'For short adjectives, use -er: big becomes bigger.'],
      ['Choose the correct sentence.', ['Amy is reading a book now.', 'Amy reads a book now.', 'Amy reading a book now.', 'Amy are reading a book now.'], 'Now often signals the present continuous: is reading.'],
      ['Choose the correct sentence.', ['I stayed home because it rained.', 'I stayed home because it rain.', 'I stay home because it rained.', 'I stayed home because it raining.'], 'Both actions happened in the past.'],
      ['Choose the correct sentence.', ['He went home early.', 'He goed home early.', 'He goes home early yesterday.', 'He going home early.'], 'Went is the past form of go.'],
      ['Choose the correct sentence.', ['We usually get up at seven.', 'We usually gets up at seven.', 'We usual get up at seven.', 'We get usually up at seven.'], 'Usually comes before the main verb.']
    ],
    4: [
      ['Choose the correct sentence.', ['They are going to visit the museum.', 'They going to visit the museum.', 'They is going to visit the museum.', 'They are go to visit the museum.'], 'Use are going to with they.'],
      ['Choose the correct sentence.', ['You must wear a helmet.', 'You must to wear a helmet.', 'You must wearing a helmet.', 'You must wears a helmet.'], 'After must, use the base verb: wear.'],
      ['Choose the correct sentence.', ['She has finished her homework.', 'She have finished her homework.', 'She has finish her homework.', 'She finished her homework already has.'], 'Use has + past participle: has finished.'],
      ['Choose the correct sentence.', ['Paper is collected every Friday.', 'Paper collects every Friday.', 'Paper is collect every Friday.', 'Paper are collected every Friday.'], 'Paper is one thing. In the passive form, use is collected.'],
      ['Choose the correct sentence.', ['There is a little juice left.', 'There are a little juice left.', 'There is a few juice left.', 'There are many juice left.'], 'Juice is uncountable, so use a little.'],
      ['Choose the correct sentence.', ['First, wash your hands. Next, dry them.', 'First wash your hands because next dry them.', 'First, washing your hands. Next, dry.', 'First, wash hand. Next, dries them.'], 'Use sequence words to give clear instructions.']
    ],
    5: [
      ['Choose the correct sentence.', ['We have lived here for five years.', 'We lived here for five years.', 'We have lived here since five years.', 'We are lived here for five years.'], 'Use for with a period of time.'],
      ['Choose the correct sentence.', ['I finished the poster yesterday.', 'I have finished the poster yesterday.', 'I finish the poster yesterday.', 'I have finish the poster yesterday.'], 'Yesterday is a finished past time, so use finished.'],
      ['Choose the correct sentence.', ['If we hurry, we will catch the bus.', 'If we will hurry, we will catch the bus.', 'If we hurry, we catch the bus.', 'If we hurried, we will catch the bus.'], 'In a first conditional, use present tense after if and will in the result.'],
      ['Choose the correct sentence.', ['The book that I borrowed is useful.', 'The book who I borrowed is useful.', 'The book what I borrowed is useful.', 'The book which I borrow is useful yesterday.'], 'Use that or which for a thing.'],
      ['Choose the correct sentence.', ['Could you tell me where the library is?', 'Could you tell me where is the library?', 'Could you tell me where the library?', 'Could you tell me where does the library is?'], 'An indirect question keeps subject + verb order.'],
      ['Choose the correct sentence.', ['Although it was late, we continued.', 'Although it was late, but we continued.', 'Although it was late, so we continued.', 'Although late it was, we continued.'], 'Do not add but after although.']
    ],
    6: [
      ['Choose the correct sentence.', ['I was reading when the phone rang.', 'I read when the phone was ringing.', 'I was read when the phone rang.', 'I reading when the phone rang.'], 'Use was/were + verb-ing for the longer action.'],
      ['Choose the correct sentence.', ['The poster was designed by students.', 'The poster designed by students.', 'The poster was design by students.', 'The poster were designed by students.'], 'The poster is singular, so use was designed.'],
      ['Choose the correct sentence.', ['If I were you, I would ask for help.', 'If I was you, I will ask for help.', 'If I were you, I will ask for help.', 'If I am you, I would ask for help.'], 'For advice in a second conditional, use If I were you, I would...'],
      ['Choose the correct sentence.', ['I enjoy reading after school.', 'I enjoy to read after school.', 'I enjoy read after school.', 'I enjoy to reading after school.'], 'Enjoy is followed by a gerund: reading.'],
      ['Choose the correct sentence.', ['Mum said that dinner was ready.', 'Mum said dinner is ready.', 'Mum said that dinner ready.', 'Mum says that dinner was ready yesterday.'], 'Reported speech can use said that + a complete clause.'],
      ['Choose the correct sentence.', ['It was raining; however, the match continued.', 'It was raining, however the match continued because.', 'It was raining; however the match continues.', 'It was raining, the match however continued.'], 'However shows contrast between two ideas.']
    ]
  };

  const readingLibrary = {
    1: [
      { title: 'My New Bag', text: 'Ben has a new blue bag. It is on his chair. In the bag, there is a book and two red pencils. Ben takes the bag to school.', questions: [['What colour is Ben’s bag?', ['Blue', 'Red', 'Green', 'Yellow'], 'The passage says Ben has a new blue bag.'], ['What is in the bag?', ['A book and two pencils', 'A cat and a ball', 'Three apples', 'A blue chair'], 'The passage lists a book and two red pencils.']] },
      { title: 'At the Zoo', text: 'Mia goes to the zoo with her father. She sees a big elephant and three small monkeys. The monkeys are near a tree. Mia likes the monkeys best.', questions: [['Who goes to the zoo with Mia?', ['Her father', 'Her teacher', 'Her sister', 'Her friend'], 'Mia goes with her father.'], ['Where are the monkeys?', ['Near a tree', 'In a bag', 'Under a chair', 'At school'], 'The passage says the monkeys are near a tree.']] },
      { title: 'A Sunny Day', text: 'It is sunny today. Sam puts on his yellow hat. He plays with a ball in the park. His dog runs after the ball.', questions: [['What does Sam put on?', ['A yellow hat', 'A blue bag', 'Red shoes', 'A green coat'], 'Sam puts on his yellow hat.'], ['What does the dog do?', ['It runs after the ball.', 'It reads a book.', 'It eats an apple.', 'It sleeps at home.'], 'The dog runs after the ball.']] }
    ],
    2: [
      { title: 'Rainy Morning', text: 'It is rainy on Monday morning. Amy takes her umbrella to school. At recess, she stays in the classroom and reads a book with her friend May.', questions: [['What is the weather like?', ['Rainy', 'Sunny', 'Snowy', 'Windy'], 'The first sentence says it is rainy.'], ['What does Amy do at recess?', ['She reads a book.', 'She plays football.', 'She goes to the market.', 'She eats lunch.'], 'Amy reads a book with May.']] },
      { title: 'Healthy Lunch', text: 'Tom has rice, chicken and carrots for lunch. He drinks water, not cola. After lunch, he puts his plate on the canteen table.', questions: [['What does Tom drink?', ['Water', 'Cola', 'Milk', 'Juice'], 'Tom drinks water, not cola.'], ['Where does Tom put his plate?', ['On the canteen table', 'Under his chair', 'In his bag', 'At home'], 'He puts the plate on the canteen table.']] },
      { title: 'Saturday at Home', text: 'On Saturday, Lily helps her mum at home. She cleans her room in the morning. In the afternoon, she visits the library and borrows two storybooks.', questions: [['What does Lily do in the morning?', ['She cleans her room.', 'She visits the library.', 'She plays computer games.', 'She cooks dinner.'], 'Lily cleans her room in the morning.'], ['How many storybooks does Lily borrow?', ['Two', 'One', 'Three', 'Four'], 'She borrows two storybooks.']] }
    ],
    3: [
      { title: 'The Library Visit', text: 'Last Tuesday, Ben’s class visited the public library. A librarian showed them where to find storybooks and science books. Ben borrowed a book about trains because he loves travelling by train.', questions: [['When did Ben’s class visit the library?', ['Last Tuesday', 'Tomorrow', 'Every Sunday', 'This morning'], 'The visit happened last Tuesday.'], ['Why did Ben choose a book about trains?', ['He loves travelling by train.', 'His teacher told him to choose it.', 'He wanted to learn about buses.', 'The library had no other books.'], 'The passage directly gives this reason.']] },
      { title: 'A Picnic Plan', text: 'The weather was fine last Saturday, so Amy and her family went on a picnic. They took sandwiches, fruit and a large mat. After lunch, Amy and her brother flew a kite near the river.', questions: [['Why did the family go on a picnic?', ['The weather was fine.', 'They had no food at home.', 'They wanted to visit school.', 'It was raining.'], 'Fine weather was the reason for the picnic.'], ['What did Amy do after lunch?', ['She flew a kite.', 'She went swimming.', 'She read a book.', 'She cleaned the mat.'], 'Amy and her brother flew a kite.']] },
      { title: 'Helping the New Pupil', text: 'A new pupil named Leo joined Class 3A. At first, he was quiet because he did not know anyone. Mia showed him the classroom, the canteen and the playground. By lunchtime, Leo was smiling and talking to his new classmates.', questions: [['How did Leo feel at first?', ['Quiet and unsure', 'Angry', 'Very sleepy', 'Hungry'], 'He was quiet because he did not know anyone.'], ['What can we infer about Mia?', ['She was helpful.', 'She was late.', 'She disliked school.', 'She was lost.'], 'Mia showed Leo important places and helped him feel welcome.']] }
    ],
    4: [
      { title: 'The Recycling Team', text: 'The Eco Team noticed that many clean bottles were thrown away at school. They placed recycling boxes near the classrooms and gave a short talk at assembly. After one month, the boxes were full, so the team asked the school to collect the bottles every Friday.', questions: [['What problem did the Eco Team notice?', ['Clean bottles were thrown away.', 'The classrooms had no windows.', 'Pupils had too many books.', 'The school was closed on Friday.'], 'The team noticed clean bottles were thrown away.'], ['What did the team do first?', ['They placed recycling boxes.', 'They bought new bottles.', 'They visited a museum.', 'They closed the classrooms.'], 'They placed boxes before the collection arrangement.']] },
      { title: 'A Festival Email', text: 'Dear May, Next week, my family is going to celebrate the Mid-Autumn Festival. We will have dinner with my grandparents and eat mooncakes. After that, we are going to walk to the park with lanterns. I am excited because my cousin will join us. Best wishes, Kim', questions: [['What will Kim’s family eat?', ['Mooncakes', 'Sandwiches', 'Birthday cake', 'Pizza'], 'Kim says the family will eat mooncakes.'], ['Why is Kim excited?', ['Her cousin will join the celebration.', 'School will be closed for a month.', 'She has a new bicycle.', 'It will rain.'], 'Kim is excited because her cousin will join.']] },
      { title: 'The Health Challenge', text: 'Class 4B started a two-week health challenge. Pupils wrote down how much water they drank and how long they exercised each day. At the end, the class found that short walks after dinner were the easiest habit for most pupils to keep.', questions: [['What did pupils record?', ['Their water and exercise', 'Their homework marks', 'Their favourite films', 'Their library books'], 'They wrote down water and exercise information.'], ['What habit was easiest for most pupils?', ['Short walks after dinner', 'Running for two hours', 'Eating no lunch', 'Sleeping at school'], 'The final sentence gives the answer.']] }
    ],
    5: [
      { title: 'Travel Smart', text: 'For their geography project, Class 5C compared two ways of travelling to Macau: ferry and coach. The ferry was faster, but the coach was cheaper. After reading the timetable and calculating the cost, the group recommended the coach for a large family because it offered the best value.', questions: [['Why did the group recommend the coach for a large family?', ['It offered the best value.', 'It was faster than the ferry.', 'It had no timetable.', 'It was the only way to travel.'], 'The passage says the coach was cheaper and offered the best value.'], ['What did the class use for the project?', ['A timetable and cost calculation', 'A sports score', 'A recipe book', 'A weather report only'], 'They read the timetable and calculated the cost.']] },
      { title: 'A Flood Safety Poster', text: 'After heavy rain caused flooding in a nearby town, the school’s safety club designed a poster. It advised people not to walk through deep water and to listen to official weather news. The club also included emergency phone numbers so that families could find help quickly.', questions: [['What was the purpose of the poster?', ['To give flood safety advice', 'To advertise a holiday', 'To sell umbrellas', 'To describe a school trip'], 'The poster advised people how to stay safe during a flood.'], ['Which action was recommended?', ['Listen to official weather news.', 'Walk through deep water.', 'Ignore emergency numbers.', 'Play near flooded roads.'], 'The poster says to listen to official weather news.']] },
      { title: 'The Young Inventor', text: 'Jia, a young inventor, created a reminder box for people who often forget their keys. When a person places keys inside the box at night, a small light turns on. In the morning, the light reminds the person to take the keys before leaving home. Jia tested her idea with her family and improved the box after listening to their suggestions.', questions: [['What problem does Jia’s box solve?', ['Forgetting keys', 'Losing homework', 'Saving water', 'Finding a library book'], 'The box is for people who forget their keys.'], ['What does the final sentence show about Jia?', ['She improved her idea using feedback.', 'She stopped testing the box.', 'She did not listen to anyone.', 'She gave the box away immediately.'], 'Jia listened to her family and improved the design.']] }
    ],
    6: [
      { title: 'A Volunteer Morning', text: 'On Saturday, the Student Service Team visited a community centre. They organised board games, taught younger children how to make bookmarks and listened to stories from elderly visitors. Although the volunteers were tired at the end of the morning, they agreed that the conversations had helped them understand different needs in the community.', questions: [['What did the volunteers learn from the morning?', ['They understood different community needs.', 'They wanted to stop helping people.', 'They preferred working alone.', 'They did not enjoy conversations.'], 'The final sentence explains what they learned.'], ['Which word best describes the volunteers?', ['Thoughtful', 'Careless', 'Unfriendly', 'Unprepared'], 'Their activities and conversations show care for others.']] },
      { title: 'A Secondary School Visit', text: 'During a visit to a secondary school, P6 pupils attended a science lesson and spoke with student helpers. One helper explained that she had felt nervous in her first week, but joining the drama club helped her make friends. Afterwards, the P6 pupils wrote down questions about homework, clubs and travelling to school independently.', questions: [['Why did the helper join the drama club?', ['It helped her make friends.', 'She wanted less homework.', 'She needed to travel alone.', 'She did not like science.'], 'The helper said the club helped her make friends.'], ['What can we infer about the P6 pupils?', ['They were preparing carefully for a new school.', 'They had no questions about secondary school.', 'They only wanted to play games.', 'They disliked school clubs.'], 'They recorded practical questions about school life.']] },
      { title: 'A Better School Canteen', text: 'The Student Council surveyed pupils about the school canteen. Many pupils asked for more fruit and less single-use plastic. The council suggested a fruit-and-yoghurt counter and a discount for pupils who brought reusable cups. The principal said that the ideas would be tested for one month before a final decision was made.', questions: [['Which suggestion would reduce plastic waste?', ['A discount for reusable cups', 'More single-use cups', 'A longer lunch break', 'A new school uniform'], 'Reusable cups reduce the need for disposable cups.'], ['Why will the ideas be tested first?', ['The school wants evidence before deciding.', 'The principal dislikes fruit.', 'The canteen will close permanently.', 'Pupils do not want changes.'], 'A one-month test helps the school judge the ideas before deciding.']] }
    ]
  };

  const listeningLibrary = {
    1: [
      ['Hello! I am Sam. I have two red balls and one blue kite. My dog likes the blue kite.', 'How many red balls does Sam have?', ['Two', 'One', 'Three', 'Four'], 'Sam says he has two red balls.'],
      ['It is time for class. Please open your book, put your pencil on the desk and sit down.', 'What should you put on the desk?', ['Your pencil', 'Your bag', 'Your lunch', 'Your shoes'], 'The instruction says to put your pencil on the desk.'],
      ['My name is May. I am seven years old. I like apples and I can swim.', 'What fruit does May like?', ['Apples', 'Bananas', 'Oranges', 'Grapes'], 'May says that she likes apples.'],
      ['The cat is under the table. The ball is next to the cat.', 'Where is the cat?', ['Under the table', 'On the table', 'In the bag', 'Near the door'], 'The cat is under the table.']
    ],
    2: [
      ['It is rainy today, so I am taking my umbrella to school. After class, I will go to the library with my sister.', 'Why is the speaker taking an umbrella?', ['It is rainy.', 'It is sunny.', 'It is very cold.', 'It is night time.'], 'The speaker says it is rainy today.'],
      ['For breakfast, Leo has milk, bread and an egg. He does not like juice in the morning.', 'What does Leo drink for breakfast?', ['Milk', 'Juice', 'Water', 'Tea'], 'Leo has milk for breakfast.'],
      ['The bus to the museum leaves at ten o’clock. Please meet your teacher at the school gate at nine forty-five.', 'When should pupils meet the teacher?', ['At 9:45', 'At 10:00', 'At 10:45', 'At 9:00'], 'The instruction gives the meeting time as 9:45.'],
      ['My brother is doing his homework now. I am helping Mum in the kitchen.', 'What is the speaker doing?', ['Helping Mum', 'Doing homework', 'Reading at school', 'Playing football'], 'The speaker is helping Mum in the kitchen.']
    ],
    3: [
      ['Last Sunday, my family went to the beach by bus. We collected rubbish for one hour before we had a picnic.', 'What did the family do before the picnic?', ['They collected rubbish.', 'They swam in the sea.', 'They went shopping.', 'They played football.'], 'They collected rubbish before the picnic.'],
      ['Amy usually walks to school, but today she is taking a taxi because she has a fever.', 'Why is Amy taking a taxi today?', ['She has a fever.', 'She is late for a picnic.', 'She likes taxis best.', 'It is her birthday.'], 'Amy is taking a taxi because she has a fever.'],
      ['The train was late, so Ben read his comic quietly while he waited at the station.', 'Where did Ben wait?', ['At the station', 'At the library', 'In the classroom', 'At the hospital'], 'He waited at the station for the train.'],
      ['Our class is making a poster about jobs. I want to be a vet because I like caring for animals.', 'What job does the speaker want?', ['A vet', 'A driver', 'A teacher', 'A chef'], 'The speaker wants to be a vet.']
    ],
    4: [
      ['The Eco Club will meet in Room 204 after school on Thursday. Please bring one clean plastic bottle for our recycling activity.', 'What should pupils bring?', ['One clean plastic bottle', 'A new uniform', 'A lunch box', 'A library card'], 'The notice asks pupils to bring a clean plastic bottle.'],
      ['I have already finished my exercise chart. This week, I cycled twice and walked to the market with my dad on Saturday.', 'What has the speaker finished?', ['An exercise chart', 'A science test', 'A library book', 'A travel ticket'], 'The speaker says the exercise chart is already finished.'],
      ['For our festival project, we are going to interview grandparents about traditional food and games.', 'Who will pupils interview?', ['Grandparents', 'Doctors', 'Tourists', 'Bus drivers'], 'The project involves interviewing grandparents.'],
      ['First, wash the fruit. Next, cut it into small pieces. Finally, put the pieces in a bowl.', 'What should you do after washing the fruit?', ['Cut it into small pieces', 'Put it in a bag', 'Eat it immediately', 'Buy more fruit'], 'The next step is to cut the fruit.']
    ],
    5: [
      ['The weather report says that a typhoon may arrive on Friday. Families should check windows, avoid the shoreline and listen to official announcements.', 'What should families listen to?', ['Official announcements', 'Music lessons', 'Sports news only', 'Library stories'], 'The report advises families to listen to official announcements.'],
      ['Our travel group has chosen the coach because it is cheaper than the ferry and there is enough space for all forty pupils.', 'Why did the group choose the coach?', ['It is cheaper and has enough space.', 'It is faster than every train.', 'It has no seats.', 'It leaves at midnight.'], 'The speaker gives both reasons for choosing the coach.'],
      ['The school radio programme will begin after morning assembly. Today’s topic is how pupils can reduce food waste at lunch.', 'What is today’s radio topic?', ['Reducing food waste', 'Choosing a new uniform', 'Training for a race', 'Learning a new dance'], 'The programme is about reducing food waste at lunch.'],
      ['Marie Curie was famous for her research. She worked carefully for many years and her discoveries helped other scientists.', 'Why was Marie Curie famous?', ['Her research and discoveries', 'Her cooking', 'Her sports team', 'Her school uniform'], 'The speaker says she was famous for research and discoveries.']
    ],
    6: [
      ['The Student Council is collecting opinions about the school canteen. Please complete the online survey by Wednesday and give one reason for your choice.', 'What must pupils include in the survey?', ['One reason for their choice', 'A photograph of their lunch', 'Their library number', 'A new timetable'], 'Pupils are asked to give one reason.'],
      ['If I were organising the volunteer day, I would ask each team to choose one local need and make a simple action plan.', 'What would the speaker ask each team to do?', ['Choose a need and make a plan', 'Cancel the volunteer day', 'Work without a team', 'Buy new uniforms'], 'The speaker would ask teams to choose a need and make a plan.'],
      ['The head student said that the new club timetable would be posted online after teachers had checked the room bookings.', 'When will the timetable be posted?', ['After teachers check room bookings', 'Before the school opens today', 'Only next year', 'After every pupil calls home'], 'It will be posted after the bookings are checked.'],
      ['Although Maya was nervous before her presentation, she spoke slowly, used clear examples and answered two questions from the audience.', 'What helped Maya give a successful presentation?', ['She spoke slowly and used examples.', 'She refused questions.', 'She did not prepare.', 'She left before speaking.'], 'The actions in the sentence show a clear, prepared presentation.']]
  };

  const sentenceBuilders = {
    1: ['I like my red ball.', 'She has a blue pen.', 'The dog is under the chair.', 'We are at school.', 'He can read a book.', 'My cat is happy.'],
    2: ['Tom plays football every Sunday.', 'There are three apples on the table.', 'My sister is doing her homework now.', 'We have PE on Monday.', 'Can you swim in the pool?', 'I brush my teeth every morning.'],
    3: ['Amy visited the library yesterday.', 'We are making a poster now.', 'A bus is faster than a bicycle.', 'I usually get up at seven.', 'Ben stayed home because it rained.', 'They went to the museum by train.'],
    4: ['The class is going to plant flowers.', 'You must wear a helmet on a bike.', 'She has finished her project already.', 'Paper is collected every Friday.', 'First, wash your hands carefully.', 'There is a little juice left.'],
    5: ['We have lived here for five years.', 'If we hurry, we will catch the bus.', 'The book that I borrowed is useful.', 'Although it was late, we continued.', 'Could you tell me where the library is?', 'They went out to buy food.'],
    6: ['I was reading when the phone rang.', 'The poster was designed by students.', 'If I were you, I would ask for help.', 'I enjoy reading after school.', 'Mum said that dinner was ready.', 'The match continued although it was raining.']
  };

  const proofreadingPairs = {
    1: [['She are my friend.', 'She is my friend.'], ['I has a blue pen.', 'I have a blue pen.'], ['They is happy.', 'They are happy.'], ['An book is on the desk.', 'A book is on the desk.'], ['The cats is under the table.', 'The cats are under the table.'], ['He have two books.', 'He has two books.']],
    2: [['Tom play football on Sunday.', 'Tom plays football on Sunday.'], ['There is three apples.', 'There are three apples.'], ['She have two sisters.', 'She has two sisters.'], ['I am brush my teeth now.', 'I am brushing my teeth now.'], ['We have PE in Monday.', 'We have PE on Monday.'], ['Can you to swim?', 'Can you swim?']],
    3: [['Yesterday, Ben go to the library.', 'Yesterday, Ben went to the library.'], ['Amy is play the piano now.', 'Amy is playing the piano now.'], ['A lion is more big than a cat.', 'A lion is bigger than a cat.'], ['We goes to school by bus.', 'We go to school by bus.'], ['They was happy at the picnic.', 'They were happy at the picnic.'], ['I stayed home because it rain.', 'I stayed home because it rained.']],
    4: [['The pupils is going to visit the museum.', 'The pupils are going to visit the museum.'], ['You must to wear a helmet.', 'You must wear a helmet.'], ['She have finished her homework.', 'She has finished her homework.'], ['Paper collect every Friday.', 'Paper is collected every Friday.'], ['There are a little water left.', 'There is a little water left.'], ['First, washing your hands.', 'First, wash your hands.']],
    5: [['We have lived here since five years.', 'We have lived here for five years.'], ['I have finished it yesterday.', 'I finished it yesterday.'], ['If we will hurry, we will catch the bus.', 'If we hurry, we will catch the bus.'], ['The book who I borrowed is useful.', 'The book that I borrowed is useful.'], ['Could you tell me where is the library?', 'Could you tell me where the library is?'], ['Although it was late, but we continued.', 'Although it was late, we continued.']],
    6: [['I was read when the phone rang.', 'I was reading when the phone rang.'], ['The poster were designed by students.', 'The poster was designed by students.'], ['If I was you, I will ask for help.', 'If I were you, I would ask for help.'], ['I enjoy to read after school.', 'I enjoy reading after school.'], ['Mum said dinner ready.', 'Mum said that dinner was ready.'], ['It was raining; however, the match continues.', 'It was raining; however, the match continued.']]
  };

  const writingPrompts = {
    1: ['Write two sentences about your favourite toy. Begin with: My favourite toy is ...', 'Write two sentences about your family. Include one colour word. ', 'Write two sentences about an animal you like.'],
    2: ['Write three sentences about your morning routine. Use first, then or after that.', 'Write three sentences about a rainy day. Include what you wear or take with you.', 'Write three sentences about your favourite food.'],
    3: ['Write a short diary entry about a picnic or a school visit. Use a past-time word.', 'Write a four-sentence story about helping a new friend. Use because.', 'Write a short paragraph about a hobby. Include how often you do it.'],
    4: ['Write a short message giving three healthy habits. Use first, next and finally.', 'Write a paragraph about how your class can recycle more. Use should or must.', 'Write an email inviting a friend to a school festival. Use going to or will.'],
    5: ['Write an 80-word email suggesting how to make a school trip better. Give two reasons.', 'Write a short report about one way technology can help pupils learn.', 'Write a paragraph about how to prepare for heavy rain or a typhoon.'],
    6: ['Write a 100-word proposal for one improvement to your school. Include a reason and a result.', 'Write a short article about a volunteer activity that pupils could join.', 'Write a story opening about your first week at secondary school. Keep the tense consistent.']
  };

  const speakingPrompts = {
    1: ['Hello. My name is ____. I am ____ years old. I like ____.', 'This is my ____. It is ____.', 'I can ____. I like ____.'],
    2: ['Every morning, I ____. Then I ____.', 'Today is ____. The weather is ____.', 'I like ____ because it is ____.'],
    3: ['Last weekend, I ____. I felt ____ because ____.', 'My favourite hobby is ____. I do it ____.', 'I would like to be a ____ because ____.'],
    4: ['To stay healthy, I ____. I also ____.', 'Our class is going to ____. First, we will ____.', 'My favourite festival is ____. We usually ____.'],
    5: ['I think pupils should ____, because ____.', 'In the future, technology may ____.', 'The best way to travel to ____ is ____ because ____.'],
    6: ['If I could improve my school, I would ____. This would ____.', 'I would like to volunteer by ____, because ____.', 'One challenge for new secondary pupils may be ____. A useful solution is ____.']
  };

  function createVocabulary() {
    const words = expanded('words', scope().wordBank);
    const allWords = Object.values(scopeMap).flatMap((item) => item.wordBank);
    const frames = ['Choose the correctly spelt word:', 'Which word belongs to this year’s word bank?', 'Choose the spelling you should keep in your notebook:'];
    return Array.from({ length: 36 }, (_, index) => {
      const word = words[index % words.length];
      const typo = word.length > 4 ? `${word.slice(0, -2)}${word.at(-1)}${word.at(-2)}` : `${word}e`;
      const other = randomize(allWords.filter((item) => item !== word && item !== typo)).slice(0, 2);
      const options = randomize([word, typo, ...other]);
      return question(`vocabulary-${state.grade}-${index}`, 'language', 'Vocabulary & spelling', `${frames[index % frames.length]} ${index % 3 === 1 ? '' : `(${word})`}`, options.indexOf(word), `“${word}” is a useful P${state.grade} word. Read it, spell it and try to use it in a sentence.`, options, { hint: `Look carefully at each letter in “${word}”.` });
    });
  }

  function createGrammar() {
    return expanded('grammar', grammarSets[state.grade]).map(([prompt, options, explanation, promptZh, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`grammar-${state.grade}-${index}`, 'language', 'Grammar & patterns', prompt, shuffled.indexOf(options[0]), explanation, shuffled, { promptZh, explanationZh, hint: scope().assessment });
    });
  }

  function createS1BridgeGrammar() {
    const unit = window.S1_BRIDGE_GRAMMAR;
    if (!unit?.questions) return [];
    return unit.questions.map((item) => {
      const shuffled = randomize(item.options);
      const correct = item.options[item.answer];
      return question(item.id, 'language', `S1 Bridge · ${unit.title}`, item.prompt, shuffled.indexOf(correct), item.explanation, shuffled, {
        promptZh: item.promptZh,
        explanationZh: item.explanationZh,
        hint: item.hint,
        passage: { title: `${item.contextTitle} · S1 Bridge`, text: item.context },
        s1Bridge: true,
        originalPractice: true
      });
    });
  }

  function createS1BridgeReadingCloze() {
    const unit = window.S1_BRIDGE_SKILLS?.readingCloze;
    if (!unit?.questions) return [];
    return unit.questions.map((item) => {
      const shuffled = randomize(item.options);
      const correct = item.options[item.answer];
      return question(item.id, 'read', `S1 Bridge · ${unit.title}`, item.prompt, shuffled.indexOf(correct), item.explanation, shuffled, {
        promptZh: item.promptZh,
        explanationZh: item.explanationZh,
        hint: item.hint,
        passage: { title: `${item.contextTitle} · ${item.section}`, text: item.context },
        s1Bridge: true,
        integratedCloze: item.section === 'Integrated cloze',
        originalPractice: true
      });
    });
  }

  function createS1BridgeVocabulary() {
    const unit = window.S1_BRIDGE_SKILLS?.vocabulary;
    if (!unit?.items) return [];
    return unit.items.map(([word, chinese, definition, example, prompt, answer, options], index) => {
      const shuffled = randomize(options);
      return question(`s1-vocabulary-${index}-${word}`, 'language', `S1 Bridge · ${unit.title}`, prompt, shuffled.indexOf(answer), `“${word}” means ${definition}. Example: ${example}`, shuffled, {
        promptZh: `哪個校園生活詞彙最適合這個情境？重點詞語：${chinese}。`,
        explanationZh: `「${word}」的意思是「${chinese}」。例句：${example}`,
        hint: `Read the situation, then connect the English word with its meaning: ${chinese}。先讀情境，再把英文詞語與意思「${chinese}」連結。`,
        s1Bridge: true,
        originalPractice: true
      });
    });
  }

  function createS1BridgeListening() {
    const unit = window.S1_BRIDGE_SKILLS?.listening;
    if (!unit?.scripts) return [];
    return unit.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => {
      const shuffled = randomize(options);
      const correct = options[answer];
      return question(`s1-listening-${script.id}-${index}`, 'listen', `S1 Bridge · ${script.title}`, prompt, shuffled.indexOf(correct), explanation, shuffled, {
        audioText: script.script,
        scriptTitle: script.title,
        scriptTitleZh: script.titleZh,
        promptZh,
        explanationZh,
        s1Bridge: true,
        originalPractice: true,
        hint: 'Read the question first. Listen once for the main purpose, then replay for a person, time, place, reason or action. 先看題目；先聽主旨，再重播找人物、時間、地點、原因或行動。'
      });
    }));
  }

  function createS1CoreGrammar() {
    const unit = window.S1_CORE_PATH?.grammar;
    if (!unit?.questions) return [];
    return unit.questions.map(([id, contextTitle, context, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const prompt = 'Choose the best answer to complete the sentence in this context.';
      const shuffled = randomize(options);
      return question(id, 'language', `S1 Core · ${unit.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        passage: { title: `${contextTitle} · S1 Core`, text: context },
        s1Core: true, originalPractice: true
      });
    });
  }

  function createS1CoreVocabulary() {
    const unit = window.S1_CORE_PATH?.vocabulary;
    if (!unit?.items) return [];
    return unit.items.map(([word, chinese, definition, example, prompt, answer, options], index) => {
      const shuffled = randomize(options);
      return question(`s1-core-vocabulary-${index}-${word}`, 'language', `S1 Core · ${unit.title}`, prompt, shuffled.indexOf(answer), `“${word}” means ${definition}. Example: ${example}`, shuffled, {
        promptZh: `Which word fits this S1 context? 重點詞語：${chinese}。`,
        explanationZh: `「${word}」的意思是「${chinese}」。例句：${example}`,
        hint: `Connect the school or community situation with the word meaning: ${chinese}。把校園或社區情境與詞義「${chinese}」連結。`,
        s1Core: true, originalPractice: true
      });
    });
  }

  function createS1CoreReading() {
    const unit = window.S1_CORE_PATH?.reading;
    if (!unit?.questions) return [];
    return unit.questions.map(([id, passageTitle, passageText, prompt, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'read', `S1 Core · ${unit.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        passage: { title: passageTitle, text: passageText },
        s1Core: true, originalPractice: true
      });
    });
  }

  function createS1CoreListening() {
    const unit = window.S1_CORE_PATH?.listening;
    if (!unit?.scripts) return [];
    return unit.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`s1-core-listening-${script.id}-${index}`, 'listen', `S1 Core · ${script.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        audioText: script.script, scriptTitle: script.title, scriptTitleZh: script.titleZh,
        promptZh, explanationZh,
        hint: 'Read the question first. Listen for a person, time, change, reason or action, then replay to check. 先讀題目；聆聽人物、時間、改動、原因或行動，再重播核對。',
        s1Core: true, originalPractice: true
      });
    }));
  }

  function createS1CoreWriting() {
    const tasks = window.S1_CORE_PATH?.writing;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'write', `S1 Core · ${item.title}`, item.prompt, 'draft', 'Your response is recorded as a writing self-check after it reaches the target length. It is original practice and does not provide an automated quality score.', null, {
      promptZh: item.promptZh,
      writing: true, multiline: true,
      writingTask: { target: '80–100 words', minWords: 80, plan: [['Plan · 寫作規劃', item.plan], ['Self-check · 自我檢查', item.selfCheck]] },
      hint: 'Plan purpose, audience and paragraph order before writing. Then check verbs, punctuation and linking words. 先規劃目的、讀者和段落次序，再檢查動詞、標點和連接詞。',
      s1Core: true, originalPractice: true
    }));
  }

  function createS1CoreSpeaking() {
    const tasks = window.S1_CORE_PATH?.speaking;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'listen', `S1 Core · ${item.title}`, item.prompt, 'spoken', 'Well done. Replay the model and improve one example, key word or pause before speaking again.', null, {
      promptZh: item.promptZh, audioText: item.model, scriptTitle: item.title, scriptTitleZh: item.titleZh,
      selfCheck: item.selfCheck, speaking: true,
      hint: 'Use the model as a guide, then speak in your own voice. State your point, add a reason and give one example when appropriate. 用示範作參考，再用自己的聲音表達；適當時說明觀點、理由和例子。',
      s1Core: true, originalPractice: true
    }));
  }

  function createS2DevelopGrammar() {
    const unit = window.S2_EXPERIENCES_CHOICES?.grammar;
    if (!unit?.questions) return [];
    return unit.questions.map(([id, contextTitle, context, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'language', `S2 Develop · ${unit.title}`, 'Choose the best answer to complete the sentence in this context.', shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        passage: { title: `${contextTitle} · S2 Develop`, text: context },
        s2Develop: true, originalPractice: true
      });
    });
  }

  function createS2DevelopVocabulary() {
    const unit = window.S2_EXPERIENCES_CHOICES?.vocabulary;
    if (!unit?.items) return [];
    return unit.items.map(([word, chinese, definition, example, prompt, answer, options], index) => {
      const shuffled = randomize(options);
      return question(`s2-develop-vocabulary-${index}-${word}`, 'language', `S2 Develop · ${unit.title}`, prompt, shuffled.indexOf(answer), `“${word}” means ${definition}. Example: ${example}`, shuffled, {
        promptZh: `Which word fits this S2 context? 重點詞語：${chinese}。`,
        explanationZh: `「${word}」的意思是「${chinese}」。例句：${example}`,
        hint: `Connect the experience, choice or community situation with the word meaning: ${chinese}。把經驗、選擇或社區情境與詞義「${chinese}」連結。`,
        s2Develop: true, originalPractice: true
      });
    });
  }

  function createS2DevelopReading() {
    const unit = window.S2_EXPERIENCES_CHOICES?.reading;
    if (!unit?.sets) return [];
    return unit.sets.flatMap((set) => set.questions.map(([id, prompt, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'read', `S2 Develop · ${unit.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        pairedPassages: { title: set.title, titleZh: set.titleZh, texts: set.texts },
        s2Develop: true, originalPractice: true
      });
    }));
  }

  function createS2DevelopListening() {
    const unit = window.S2_EXPERIENCES_CHOICES?.listening;
    if (!unit?.scripts) return [];
    return unit.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`s2-develop-listening-${script.id}-${index}`, 'listen', `S2 Develop · ${script.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        audioText: script.script, scriptTitle: script.title, scriptTitleZh: script.titleZh,
        promptZh, explanationZh,
        hint: 'Read the question first. Listen for a comparison, completed experience, reason, time, rule or recommendation, then replay to check. 先讀題目；聆聽比較、已完成經驗、理由、時間、規則或建議，再重播核對。',
        s2Develop: true, originalPractice: true
      });
    }));
  }

  function createS2DevelopWriting() {
    const tasks = window.S2_EXPERIENCES_CHOICES?.writing;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'write', `S2 Develop · ${item.title}`, item.prompt, 'draft', 'Your response is recorded as a writing self-check after it reaches the target length. It is original practice and does not provide an automated quality score.', null, {
      promptZh: item.promptZh,
      writing: true, multiline: true,
      writingTask: { target: '100–120 words', minWords: 100, plan: [['Plan · 寫作規劃', item.plan], ['Self-check · 自我檢查', item.selfCheck]] },
      hint: 'Compare choices with evidence, organise your paragraphs and check tense, modal verbs and linking words. 用證據比較選擇，組織段落，並檢查時態、情態動詞和連接詞。',
      s2Develop: true, originalPractice: true
    }));
  }

  function createS2DevelopSpeaking() {
    const tasks = window.S2_EXPERIENCES_CHOICES?.speaking;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'listen', `S2 Develop · ${item.title}`, item.prompt, 'spoken', 'Well done. Replay the model and improve one comparison, reason, example or response before speaking again.', null, {
      promptZh: item.promptZh, audioText: item.model, scriptTitle: item.title, scriptTitleZh: item.titleZh,
      selfCheck: item.selfCheck, speaking: true,
      hint: 'State your view, compare choices clearly, then support it with a reason and a practical example. 說明你的看法，清楚比較選擇，再以理由和實際例子支持。',
      s2Develop: true, originalPractice: true
    }));
  }

  function createS2ConnectGrammar() {
    const unit = window.S2_MESSAGES_MEDIA?.grammar;
    if (!unit?.questions) return [];
    return unit.questions.map(([id, contextTitle, context, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'language', `S2 Connect · ${unit.title}`, 'Choose the best answer to complete the sentence in this context.', shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        passage: { title: `${contextTitle} · S2 Connect`, text: context },
        s2Connect: true, originalPractice: true
      });
    });
  }

  function createS2ConnectVocabulary() {
    const unit = window.S2_MESSAGES_MEDIA?.vocabulary;
    if (!unit?.items) return [];
    return unit.items.map(([word, chinese, definition, example, prompt, answer, options], index) => {
      const shuffled = randomize(options);
      return question(`s2-connect-vocabulary-${index}-${word}`, 'language', `S2 Connect · ${unit.title}`, prompt, shuffled.indexOf(answer), `“${word}” means ${definition}. Example: ${example}`, shuffled, {
        promptZh: `Which word fits this S2 communication context? 重點詞語：${chinese}。`,
        explanationZh: `「${word}」的意思是「${chinese}」。例句：${example}`,
        hint: `Connect the audience, source or message situation with the word meaning: ${chinese}。把受眾、資料來源或訊息情境與詞義「${chinese}」連結。`,
        s2Connect: true, originalPractice: true
      });
    });
  }

  function createS2ConnectReading() {
    const unit = window.S2_MESSAGES_MEDIA?.reading;
    if (!unit?.sets) return [];
    return unit.sets.flatMap((set) => set.questions.map(([id, prompt, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'read', `S2 Connect · ${unit.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        pairedPassages: { title: set.title, titleZh: set.titleZh, texts: set.texts },
        s2Connect: true, originalPractice: true
      });
    }));
  }

  function createS2ConnectListening() {
    const unit = window.S2_MESSAGES_MEDIA?.listening;
    if (!unit?.scripts) return [];
    return unit.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`s2-connect-listening-${script.id}-${index}`, 'listen', `S2 Connect · ${script.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        audioText: script.script, scriptTitle: script.title, scriptTitleZh: script.titleZh,
        promptZh, explanationZh,
        hint: 'Read the question first. Listen for speaker, purpose, source, detail, instruction or safe next action, then replay to check. 先讀題目；聆聽說話者、目的、資料來源、細節、指示或安全的下一步，再重播核對。',
        s2Connect: true, originalPractice: true
      });
    }));
  }

  function createS2ConnectWriting() {
    const tasks = window.S2_MESSAGES_MEDIA?.writing;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'write', `S2 Connect · ${item.title}`, item.prompt, 'draft', 'Your response is recorded as a writing self-check after it reaches the target length. It is original practice and does not provide an automated quality score.', null, {
      promptZh: item.promptZh,
      writing: true, multiline: true,
      writingTask: { target: '100–120 words', minWords: 100, plan: [['Plan · 寫作規劃', item.plan], ['Self-check · 自我檢查', item.selfCheck]] },
      hint: 'Write for a real audience. Organise accurate information, identify a reliable source when relevant, then check formality, grammar and useful linking words. 為真實受眾寫作；組織準確資料，適當時指出可靠資料來源，然後檢查語氣、文法和連接詞。',
      s2Connect: true, originalPractice: true
    }));
  }

  function createS2ConnectSpeaking() {
    const tasks = window.S2_MESSAGES_MEDIA?.speaking;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'listen', `S2 Connect · ${item.title}`, item.prompt, 'spoken', 'Well done. Replay the model and improve one fact, source, reporting phrase, reason or safe next action before speaking again.', null, {
      promptZh: item.promptZh, audioText: item.model, scriptTitle: item.title, scriptTitleZh: item.titleZh,
      selfCheck: item.selfCheck, speaking: true,
      hint: 'State accurate information, distinguish a fact from your opinion, then add a clear reason, source or action. 說明準確資料，分辨事實與個人意見，再加入清楚的理由、資料來源或行動。',
      s2Connect: true, originalPractice: true
    }));
  }

  function createS2ActionGrammar() {
    const unit = window.S2_COMMUNITY_ENVIRONMENT?.grammar;
    if (!unit?.questions) return [];
    return unit.questions.map(([id, contextTitle, context, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'language', `S2 Action · ${unit.title}`, 'Choose the best answer to complete the sentence in this community or environment context.', shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        passage: { title: `${contextTitle} · S2 Action`, text: context },
        s2Action: true, originalPractice: true
      });
    });
  }

  function createS2ActionVocabulary() {
    const unit = window.S2_COMMUNITY_ENVIRONMENT?.vocabulary;
    if (!unit?.items) return [];
    return unit.items.map(([word, chinese, definition, example, prompt, answer, options], index) => {
      const shuffled = randomize(options);
      return question(`s2-action-vocabulary-${index}-${word}`, 'language', `S2 Action · ${unit.title}`, prompt, shuffled.indexOf(answer), `“${word}” means ${definition}. Example: ${example}`, shuffled, {
        promptZh: `Which word fits this S2 community and environment context? 重點詞語：${chinese}。`,
        explanationZh: `「${word}」的意思是「${chinese}」。例句：${example}`,
        hint: `Connect the community action or environmental situation with the word meaning: ${chinese}。把社區行動或環境情境與詞義「${chinese}」連結。`,
        s2Action: true, originalPractice: true
      });
    });
  }

  function createS2ActionReading() {
    const unit = window.S2_COMMUNITY_ENVIRONMENT?.reading;
    if (!unit?.sets) return [];
    return unit.sets.flatMap((set) => set.questions.map(([id, prompt, promptZh, options, answer, explanation, explanationZh, hint]) => {
      const shuffled = randomize(options);
      return question(id, 'read', `S2 Action · ${unit.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh, hint,
        pairedPassages: { title: set.title, titleZh: set.titleZh, texts: set.texts },
        s2Action: true, originalPractice: true
      });
    }));
  }

  function createS2ActionListening() {
    const unit = window.S2_COMMUNITY_ENVIRONMENT?.listening;
    if (!unit?.scripts) return [];
    return unit.scripts.flatMap((script) => script.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`s2-action-listening-${script.id}-${index}`, 'listen', `S2 Action · ${script.title}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        audioText: script.script, scriptTitle: script.title, scriptTitleZh: script.titleZh,
        promptZh, explanationZh,
        hint: 'Read the question first. Listen for a place, time, number, action, reason, resource or likely result, then replay to check. 先讀題目；聆聽地點、時間、數量、行動、原因、資源或可能結果，再重播核對。',
        s2Action: true, originalPractice: true
      });
    }));
  }

  function createS2ActionWriting() {
    const tasks = (window.S2_COMMUNITY_ENVIRONMENT?.writing || []).filter((item) => item.level !== 'advanced');
    if (!tasks.length) return [];
    return tasks.map((item) => question(item.id, 'write', `S2 Action · ${item.title}`, item.prompt, 'draft', 'Your response is recorded as a writing self-check after it reaches the target length. It is original practice and does not provide an automated quality score.', null, {
      promptZh: item.promptZh,
      writing: true, multiline: true,
      writingTask: { target: '100–120 words', minWords: 100, plan: [['Plan · 寫作規劃', item.plan], ['Self-check · 自我檢查', item.selfCheck]] },
      hint: 'State a practical problem, organise evidence and actions clearly, then check quantity words, conditionals, purpose and linking words. 說明實際問題，清楚組織證據和行動，然後檢查數量詞、條件句、目的和連接詞。',
      s2Action: true, originalPractice: true
    }));
  }

  function createS2ActionAdvancedWriting() {
    const tasks = (window.S2_COMMUNITY_ENVIRONMENT?.writing || []).filter((item) => item.level === 'advanced');
    return tasks.map((item) => question(item.id, 'write', `S2 Action · ${item.title}`, item.prompt, 'draft', 'Your response is recorded as a writing self-check after it reaches the target length. It is original practice and does not provide an automated quality score.', null, {
      promptZh: item.promptZh,
      writing: true, multiline: true,
      passage: { title: 'Source pack · 資料包', text: item.sourcePack.map(([label, detail]) => `${label}: ${detail}`).join('\n\n') },
      writingTask: { target: '140–170 words', minWords: 140, plan: [...item.paragraphMap, ['Language bank · 句式庫', item.languageBank.join(' · ')]] },
      hint: 'Select accurate evidence first. Then build a clear proposal that addresses a concern, gives a workable response and predicts a likely result. 先選取準確證據；再寫出能回應關注、提供可行做法並預測可能結果的清楚建議書。',
      s2Action: true, originalPractice: true
    }));
  }

  function createS2ActionDialogues() {
    const dialogues = window.S2_COMMUNITY_ENVIRONMENT?.dialogues || [];
    return dialogues.flatMap((dialogue) => dialogue.checkpoints.map((checkpoint, index) => {
      const shuffled = randomize(checkpoint.options);
      return question(`${dialogue.id}-check-${index + 1}`, 'listen', `S2 Action · ${dialogue.title}`, checkpoint.prompt, shuffled.indexOf(checkpoint.options[checkpoint.answer]), checkpoint.explanation, shuffled, {
        promptZh: checkpoint.promptZh, explanationZh: checkpoint.explanationZh,
        audioText: dialogue.dialogue.map(([speaker, line]) => `Role ${speaker}: ${line}`).join(' '), scriptTitle: dialogue.title, scriptTitleZh: dialogue.titleZh,
        roleplay: dialogue,
        hint: 'Listen to both roles. Choose the reply that uses evidence, responds safely to a concern or gives a realistic next step. 聆聽兩個角色；選擇運用證據、安全回應關注或提出實際下一步的回應。',
        s2Action: true, originalPractice: true
      });
    }));
  }

  function createS2ActionSpeaking() {
    const tasks = window.S2_COMMUNITY_ENVIRONMENT?.speaking;
    if (!tasks) return [];
    return tasks.map((item) => question(item.id, 'listen', `S2 Action · ${item.title}`, item.prompt, 'spoken', 'Well done. Replay the model and improve one action, comparison, reason, example or likely result before speaking again.', null, {
      promptZh: item.promptZh, audioText: item.model, scriptTitle: item.title, scriptTitleZh: item.titleZh,
      selfCheck: item.selfCheck, speaking: true,
      hint: 'State the problem, recommend a realistic action, then give a reason, example or likely result. 說明問題，推薦實際行動，再加入理由、例子或可能結果。',
      s2Action: true, originalPractice: true
    }));
  }

  function createReading() {
    const items = [];
    expanded('reading', readingLibrary[state.grade]).forEach((passage, passageIndex) => {
      passage.questions.forEach(([prompt, options, explanation, promptZh, explanationZh], questionIndex) => {
        const shuffled = randomize(options);
        items.push(question(`reading-${state.grade}-${passageIndex}-${questionIndex}`, 'read', 'Reading comprehension', prompt, shuffled.indexOf(options[0]), explanation, shuffled, { promptZh, explanationZh, passage: { title: passage.title, text: passage.text }, hint: 'Find the key word from the question in the passage, then read the whole sentence around it.' }));
      });
    });
    return items;
  }

  function createSentenceBuilder() {
    return expanded('sentences', sentenceBuilders[state.grade]).map((sentence, index) => {
      const words = sentence.replace('.', '').split(' ');
      const rotation = index % words.length;
      const mixed = [...words.slice(rotation), ...words.slice(0, rotation)].join(' / ');
      return question(`builder-${state.grade}-${index}`, 'write', 'Sentence builder', `Put the words in the correct order, then write the full sentence: ${mixed}`, sentence, `A clear sentence begins with a subject and ends with a full stop: ${sentence}`, null, { writing: true, hint: 'Find the subject first. Then choose the verb and add the rest of the information.' });
    });
  }

  function createProofreading() {
    return expanded('proofreading', proofreadingPairs[state.grade]).map(([incorrect, correct], index) => question(`proofread-${state.grade}-${index}`, 'write', 'Proofreading', `This sentence has one mistake. Write the corrected sentence: ${incorrect}`, correct, `Correct sentence: ${correct}`, null, { writing: true, hint: 'Check the subject, the verb form, the tense clue and punctuation.' }));
  }

  function createWritingPlan() {
    return expanded('writing', writingPrompts[state.grade]).map((prompt, index) => question(`writing-plan-${state.grade}-${index}`, 'write', 'Writing planner', prompt, 'self-check', 'Well done. A first draft is the beginning of good writing. Read your sentences aloud and check that each one has a subject, a verb and a full stop.', null, { writing: true, multiline: true, selfCheck: 'I have written my first draft and checked it once.', hint: 'Use the prompt as your first idea. Add a detail, a reason or a time word to make your writing clearer.' }));
  }

  function createPrimaryWritingStudio() {
    const tasks = (window.PRIMARY_CURRICULUM_STUDIOS || {})[state.grade] || [];
    return tasks.map((item) => question(item.id, 'write', `Writing skills studio · ${item.title}`, item.prompt, 'draft', 'Your draft is stored only in this browser. Use the plan and self-check to improve one detail at a time; this activity does not provide an automated writing-quality score.', null, {
      promptZh: item.promptZh,
      writing: true,
      multiline: true,
      writingTask: { target: item.target, minWords: item.minWords, plan: [...item.plan, ['Self-check · 自我檢查', item.selfCheck]] },
      studioSelfCheck: item.selfCheck,
      originalPractice: true,
      hint: 'Follow the steps in order. Before you finish, check purpose, sentence structure, punctuation and one useful linking or detail word. 依次完成步驟；完成前檢查目的、句子結構、標點及一個有用的連接詞或細節詞。'
    }));
  }

  function createListening() {
    const seniorScripts = (window.SENIOR_LISTENING_LIBRARY || {})[state.grade];
    if (seniorScripts) {
      return [...seniorScripts, ...(expansion().seniorListening?.[state.grade] || [])].flatMap((script) => script.questions.map((item, index) => {
        const shuffled = randomize(item.options);
        const correct = item.options[item.answer];
        return question(`senior-listening-${state.grade}-${script.id}-${index}`, 'listen', `Listening comprehension · ${script.title}`, item.prompt, shuffled.indexOf(correct), item.explanation, shuffled, {
          audioText: script.script,
          promptZh: item.promptZh,
          scriptTitle: script.title,
          scriptTitleZh: script.titleZh,
          explanationZh: item.explanationZh,
          seniorListening: true,
          hint: 'Read the question first. Listen once for the main idea, then replay for a key word, time, reason or action. 先看題目；先聽主旨，再重播尋找重點字、時間、理由或行動。'
        });
      }));
    }
    return expanded('juniorListening', listeningLibrary[state.grade]).map(([audioText, prompt, options, explanation, promptZh, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`listening-${state.grade}-${index}`, 'listen', 'Listening lab', prompt, shuffled.indexOf(options[0]), explanation, shuffled, { audioText, promptZh, explanationZh, hint: 'Listen once for the main idea. Listen again for a word, number, place or action from the question.' });
    });
  }

  function createListeningFlashcards() {
    const cards = [...((window.LISTENING_SPEAKING_EXTENSION || {}).flashcards?.[state.grade] || []), ...(expansion().flashcards?.[state.grade] || [])];
    return cards.map(([word, chinese, definition, example], index) => question(`listening-vocab-${state.grade}-${word}`, 'listen', 'Listening vocabulary', `Reveal the card, listen to “${word}”, then say its example sentence aloud.`, 'known', 'Strong work. You have previewed a key word before listening. Try using it again when you hear the longer script.', null, {
      selfCheck: `I revealed “${word}” and said the example sentence aloud. · 我已翻開「${word}」並朗讀例句。`,
      audioText: word,
      flashcard: { word, chinese, definition, example },
      hint: 'Preview the word before listening. Connect it to its meaning and to the full sentence. 先預習詞彙，把意思與完整句子連結起來。'
    }));
  }

  function createListeningChecks() {
    const checks = [...((window.LISTENING_SPEAKING_EXTENSION || {}).checks?.[state.grade] || []), ...(expansion().checks?.[state.grade] || [])];
    return checks.map(([id, audioText, prompt, promptZh, options, answer, explanation, explanationZh]) => {
      const shuffled = randomize(options);
      return question(id, 'listen', 'Listening quick check', prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        audioText, promptZh, explanationZh,
        quickCheck: true,
        hint: 'Read the question first. Replay the short extract and listen for the one detail that answers it. 先讀題目；重播短句，集中聽回答問題的一個細節。'
      });
    });
  }

  function createRoleplays() {
    const roleplays = [...((window.LISTENING_SPEAKING_EXTENSION || {}).roleplays?.[state.grade] || []), ...(expansion().roleplays?.[state.grade] || [])];
    return roleplays.map((activity) => question(`roleplay-${state.grade}-${activity.id}`, 'listen', `Role-play · ${activity.title}`, activity.goal, 'spoken', 'Excellent. Try the dialogue again and change one detail so that the conversation becomes your own.', null, {
      audioText: activity.dialogue.map(([speaker, line]) => `Role ${speaker}: ${line}`).join(' '),
      promptZh: activity.goalZh,
      selfCheck: activity.selfCheck,
      speaking: true,
      roleplay: activity,
      hint: 'Practise both roles. Pause after a question and answer it with a complete sentence. 練習兩個角色；問題後稍作停頓，再用完整句子回答。'
    }));
  }

  function createSpeaking() {
    const seniorOral = (window.SENIOR_ORAL_LIBRARY || {})[state.grade];
    if (seniorOral) {
      const structured = seniorOral.map((activity, index) => question(`senior-speaking-${state.grade}-${activity.id}-${index}`, 'listen', `Oral presentation · ${activity.title}`, activity.prompt, 'spoken', 'Excellent. Your plan now has a clear structure. Listen once more and improve one word, example or pause before you present again.', null, {
        audioText: activity.model,
        selfCheck: activity.selfCheck,
        speaking: true,
        oralActivity: activity,
        promptZh: activity.promptZh,
        hint: 'Use the four-step plan. Speak from key words rather than memorising every sentence. 按四步計劃說話；可依重點詞表達，不必逐字背誦。'
      }));
      const extras = (expansion().speaking?.[state.grade] || []).map((model, index) => question(`senior-speaking-extra-${state.grade}-${index}`, 'listen', 'Speak aloud', 'Listen to the model. Then say it aloud and change the blank parts to make it true for you.', 'spoken', 'Excellent. Try the sentence once more with a clear voice and natural pace.', null, { audioText: model.replaceAll('____', 'your answer'), selfCheck: 'I have spoken the sentence aloud in a complete voice.', speaking: true, hint: 'Use a clear opening and finish each thought before adding the next point. 用清楚開首，並完成每一個想法才加入下一點。' }));
      return [...structured, ...extras];
    }
    return expanded('speaking', speakingPrompts[state.grade]).map((model, index) => question(`speaking-${state.grade}-${index}`, 'listen', 'Speak aloud', 'Listen to the model. Then say it aloud and change the blank parts to make it true for you.', 'spoken', 'Excellent. Speaking in complete sentences builds confidence. Try saying the sentence once more with a clear voice and natural pace.', null, { audioText: model.replaceAll('____', 'your answer'), selfCheck: 'I have spoken the sentence aloud in a complete voice.', speaking: true, hint: 'Do not rush. Pause briefly at full stops and make your key words clear.' }));
  }

  function availableModules(route = routes[state.route]) { return route.modules.filter((item) => (!item.minGrade || state.grade >= item.minGrade) && (!item.maxGrade || state.grade <= item.maxGrade)); }
  function selectedModule() { const modules = availableModules(); return modules.find((item) => item.id === state.module) || modules[0]; }
  function getBank() {
    if (state.module === 'vocabulary') return createVocabulary();
    if (state.module === 'grammar') return createGrammar();
    if (state.module === 's1-bridge-grammar') return createS1BridgeGrammar();
    if (state.module === 's1-bridge-reading-cloze') return createS1BridgeReadingCloze();
    if (state.module === 's1-bridge-vocabulary') return createS1BridgeVocabulary();
    if (state.module === 's1-bridge-listening') return createS1BridgeListening();
    if (state.module === 's1-core-grammar') return createS1CoreGrammar();
    if (state.module === 's1-core-vocabulary') return createS1CoreVocabulary();
    if (state.module === 's1-core-reading') return createS1CoreReading();
    if (state.module === 's1-core-listening') return createS1CoreListening();
    if (state.module === 's1-core-writing') return createS1CoreWriting();
    if (state.module === 's1-core-speaking') return createS1CoreSpeaking();
    if (state.module === 's2-develop-grammar') return createS2DevelopGrammar();
    if (state.module === 's2-develop-vocabulary') return createS2DevelopVocabulary();
    if (state.module === 's2-develop-reading') return createS2DevelopReading();
    if (state.module === 's2-develop-listening') return createS2DevelopListening();
    if (state.module === 's2-develop-writing') return createS2DevelopWriting();
    if (state.module === 's2-develop-speaking') return createS2DevelopSpeaking();
    if (state.module === 's2-connect-grammar') return createS2ConnectGrammar();
    if (state.module === 's2-connect-vocabulary') return createS2ConnectVocabulary();
    if (state.module === 's2-connect-reading') return createS2ConnectReading();
    if (state.module === 's2-connect-listening') return createS2ConnectListening();
    if (state.module === 's2-connect-writing') return createS2ConnectWriting();
    if (state.module === 's2-connect-speaking') return createS2ConnectSpeaking();
    if (state.module === 's2-action-grammar') return createS2ActionGrammar();
    if (state.module === 's2-action-vocabulary') return createS2ActionVocabulary();
    if (state.module === 's2-action-reading') return createS2ActionReading();
    if (state.module === 's2-action-listening') return createS2ActionListening();
    if (state.module === 's2-action-writing') return createS2ActionWriting();
    if (state.module === 's2-action-writing-advanced') return createS2ActionAdvancedWriting();
    if (state.module === 's2-action-dialogues') return createS2ActionDialogues();
    if (state.module === 's2-action-speaking') return createS2ActionSpeaking();
    if (state.module === 'sentence-builder') return createSentenceBuilder();
    if (state.module === 'proofreading') return createProofreading();
    if (state.module === 'writing-plan') return createWritingPlan();
    if (state.module === 'primary-writing-studio') return createPrimaryWritingStudio();
    if (state.module === 'listening') return createListening();
    if (state.module === 'speaking') return createSpeaking();
    if (state.module === 'listening-vocab') return createListeningFlashcards();
    if (state.module === 'listening-check') return createListeningChecks();
    if (state.module === 'roleplay') return createRoleplays();
    if (state.module === 'junior-game') return createJuniorGame();
    if (state.module === 'word-match') return createJuniorWordMatch();
    if (state.module === 'advanced-reading') return createAdvancedReading();
    if (state.module === 'reading-details') return createKeyDetails();
    if (state.module === 'pre-s1-mock') return createPreS1Mock();
    return createReading();
  }

  function createJuniorGame() {
    const games = [...((window.JUNIOR_SENIOR_EXTENSION || {}).games?.[state.grade]?.audio || []), ...(expansion().juniorGame?.[state.grade] || [])];
    return games.map(([audioText, prompt, promptZh, options, answer, explanation, explanationZh], index) => {
      const shuffled = randomize(options);
      return question(`junior-game-${state.grade}-${index}`, 'language', 'Phonics & story game', prompt, shuffled.indexOf(options[answer]), explanation, shuffled, { audioText, promptZh, explanationZh, juniorGame: true, hint: 'Listen once, say the key word softly, then choose the best answer. 先聽一次，小聲讀出重點字，再選最合適答案。' });
    });
  }

  function createJuniorWordMatch() {
    const cards = [...((window.JUNIOR_SENIOR_EXTENSION || {}).games?.[state.grade]?.match || []), ...(expansion().juniorMatch?.[state.grade] || [])];
    return cards.map(([word, clue, chinese], index) => question(`word-match-${state.grade}-${word}`, 'language', 'Word Match', `Match “${word}” with its clue. Then say the word aloud.`, 'known', 'Great matching. Read the word and its clue again so that they stay together in your mind.', null, {
      selfCheck: `I revealed “${word}”, matched its clue and said it aloud. · 我已翻開「${word}」、配對線索並朗讀。`,
      audioText: word,
      flashcard: { word, chinese, definition: clue, example: `“${word}” means: ${clue}` },
      flashcardType: 'match',
      hint: 'Read the clue first. Which word does it describe? 先讀線索；它描述的是哪個字？'
    }));
  }

  function createAdvancedReading() {
    const passages = [...((window.JUNIOR_SENIOR_EXTENSION || {}).advancedReading?.[state.grade] || []), ...(expansion().advancedReading?.[state.grade] || [])];
    return passages.flatMap((passage, passageIndex) => passage.questions.map(([prompt, promptZh, options, answer, explanation, explanationZh, analysis], questionIndex) => {
      const shuffled = randomize(options);
      return question(`advanced-reading-${state.grade}-${passageIndex}-${questionIndex}`, 'read', `Advanced reading · ${passage.genre}`, prompt, shuffled.indexOf(options[answer]), explanation, shuffled, {
        promptZh, explanationZh,
        passage: { title: `${passage.genre} · ${passage.title}`, text: passage.text },
        advancedAnalysis: { genre: passage.genre, genreZh: passage.genreZh, clue: analysis[0], model: analysis[1], why: analysis[2] },
        hint: 'Read the question first. Find a clue, then decide whether the answer is stated, inferred or linked to the writer’s purpose. 先讀題目，找出線索，再判斷答案是直接指出、需要推論，還是和作者目的相關。'
      });
    }));
  }

  function createKeyDetails() {
    return createReading().map((item, index) => ({
      ...item,
      id: `reading-details-${state.grade}-${index}`,
      topic: 'Key detail hunter',
      prompt: index % 2 === 0 ? `Find the key detail. ${item.prompt}` : item.prompt,
      hint: 'Look for a name, a place, a time, a number or an action. The answer should be stated clearly in the passage.'
    }));
  }

  function createPreS1Mock() {
    const mock = window.PRE_S1_ENGLISH_MOCK;
    if (!mock || state.grade !== 6) return [];
    return mock.questions.map((item, index) => {
      const options = item.options ? randomize(item.options) : null;
      const correct = item.options ? options.indexOf(item.options[item.answer]) : 'draft';
      return question(`pre-s1-${item.id || index}`, item.route, `Pre-S1 mock · ${item.section}`, item.prompt, correct, item.explanation, options, {
        promptZh: item.promptZh,
        explanationZh: item.explanationZh,
        passage: item.passage,
        audioText: item.audioText,
        scriptTitle: item.scriptTitle,
        scriptTitleZh: item.scriptTitleZh,
        writingTask: item.writingTask,
        writing: Boolean(item.writingTask),
        multiline: Boolean(item.writingTask),
        preS1Mock: true,
        hint: item.hint
      });
    });
  }

  function selectSessionQuestions(bank, total) {
    const key = `${KEYS.used}-${state.grade}-${state.module}`;
    const used = new Set(safeGet(key, []));
    let available = bank.filter((item) => !used.has(item.id));
    if (available.length < total) { used.clear(); available = bank; }
    const selection = randomize(available).slice(0, total);
    selection.forEach((item) => used.add(item.id));
    safeSet(key, [...used]);
    return selection;
  }

  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('show');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => element.classList.remove('show'), 2600);
  }

  function showView(name) {
    window.speechSynthesis?.cancel();
    $$('.view').forEach((view) => view.classList.toggle('visible', view.id === `${name}-view`));
    $$('[data-nav]').forEach((button) => button.classList.toggle('active', button.dataset.nav === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderSidebar() {
    const current = scope();
    const currentZh = scopeZh[state.grade];
    $('#rail-grade').innerHTML = bilingual(`${current.level} English`, `小${state.grade}英文`);
    $('#rail-note').innerHTML = bilingual(current.overview, currentZh.overview);
    $$('.grade-btn').forEach((button) => button.classList.toggle('selected', Number(button.dataset.grade) === state.grade));
    const record = stats();
    $('#completed-total').textContent = record.completed;
    $('#rail-progress').style.width = `${Math.min(100, (record.completed % 12) / 12 * 100)}%`;
    $('#review-count').textContent = reviewItems().length ? `(${reviewItems().length})` : '';
  }

  function renderSkills() {
    $('#skill-grid').innerHTML = Object.entries(routes).map(([id, route]) => `<button class="skill-card skill-${id} ${state.route === id ? 'selected' : ''}" data-route="${id}" style="--skill:${route.color};--tint:${route.tint}"><span class="skill-token">${route.token}</span><h3>${bilingual(route.label, route.labelZh)}</h3><p class="card-en">${escape(route.description)}</p><p class="card-zh">${escape(route.descriptionZh)}</p><small>${availableModules(route).length} PRACTICE OPTIONS · 練習選項 →</small></button>`).join('');
    $$('[data-route]').forEach((button) => button.addEventListener('click', () => {
      state.route = button.dataset.route;
      state.module = routes[state.route].modules[0].id;
      renderHome();
    }));
  }

  function renderModules() {
    const route = routes[state.route];
    const modules = availableModules(route);
    if (!modules.some((module) => module.id === state.module)) state.module = modules[0].id;
    $('#route-title').innerHTML = bilingual(route.title, route.titleZh);
    $('#route-description').innerHTML = bilingual(route.description, route.descriptionZh);
    $('#module-list').innerHTML = modules.map((module) => `<button class="module-card ${state.module === module.id ? 'selected' : ''}" data-module="${module.id}"><i class="module-symbol">${module.symbol}</i><span><strong>${bilingual(module.title, module.titleZh)}</strong><span class="module-en">${escape(module.description)}</span><span class="module-zh">${escape(module.descriptionZh)}</span>${module.assessment ? '<span class="assessment-chip">P4–P6 ASSESSMENT · 呈分試</span>' : module.assessmentMock ? '<span class="assessment-chip">PRE-S1 STYLE · 原創銜接</span>' : module.reviewGuide ? '<span class="assessment-chip">PRE-S1 REVIEW · 重點複習</span>' : module.s2Action ? '<span class="assessment-chip">S2 ACTION · 原創練習</span>' : module.s2Connect ? '<span class="assessment-chip">S2 CONNECT · 原創練習</span>' : module.s2Develop ? '<span class="assessment-chip">S2 DEVELOP · 原創練習</span>' : module.s1Core ? '<span class="assessment-chip">S1 CORE · 原創練習</span>' : module.s1Bridge ? '<span class="assessment-chip">S1 BRIDGE · 原創練習</span>' : ''}</span></button>`).join('');
    $$('[data-module]').forEach((button) => button.addEventListener('click', () => { state.module = button.dataset.module; renderHome(); }));
    const module = selectedModule();
    const activeCount = module.assessment ? 'P4–6' : module.reviewGuide ? module.sessions : (getBank().length || module.sessions);
    $('#session-mark').textContent = module.assessment ? 'MODEL LIBRARY · 範文庫' : module.assessmentMock ? 'PRE-S1 STYLE · 原創銜接' : module.reviewGuide ? 'P6 REVIEW · 重點複習' : `${activeCount} QUESTIONS · ${activeCount} 題`;
    $('#scope-session-count').textContent = activeCount;
    $('#selected-module-note').innerHTML = `${bilingual(module.title, module.titleZh)}<span class="selected-note-detail">${escape(module.descriptionZh)}</span>`;
  }

  function renderScopeSummary() {
    const current = scope();
    const currentZh = scopeZh[state.grade];
    $('#scope-stage').innerHTML = bilingual(current.stage, currentZh.stage);
    $('#scope-overview').innerHTML = bilingual(current.overview, currentZh.overview);
    $('#scope-pills').innerHTML = current.vocabulary.slice(0, 4).map((item) => `<span>${escape(bilingualTerm(item))}</span>`).join('');
    $('#scope-word-count').textContent = current.wordBank.length;
    $('#scope-grammar-count').textContent = current.grammar.length;
  }

  function renderHome() {
    renderSidebar();
    renderSkills();
    renderModules();
    renderScopeSummary();
  }

  function renderWritingModels() {
    const models = window.WRITING_MODELS || [];
    const rubric = window.WRITING_RUBRIC || [];
    const grades = [4, 5, 6];
    if (!grades.includes(state.modelGrade)) state.modelGrade = Math.max(4, Math.min(6, state.grade));
    const gradeModels = models.filter((model) => model.grade === state.modelGrade);
    if (!gradeModels.some((model) => model.id === state.modelId)) state.modelId = gradeModels[0]?.id || null;
    const selected = gradeModels.find((model) => model.id === state.modelId);
    $('#models-grade-tabs').innerHTML = grades.map((grade) => `<button class="models-grade-tab ${grade === state.modelGrade ? 'active' : ''}" data-model-grade="${grade}">P${grade} Models · 小${grade}範文</button>`).join('');
    $('#models-grade-heading').textContent = `P${state.modelGrade} Writing · 小${state.modelGrade}寫作`;
    $('#models-grade-note').textContent = state.modelGrade === 4 ? 'Practise clear formats, story sequence and complete task points. 練習清晰格式、故事次序與完整回應。' : state.modelGrade === 5 ? 'Notice developed reasons, paragraphs and purpose-driven language. 留意理由發展、段落安排與寫作目的。' : 'Study formal structure, persuasion and more varied sentence patterns. 學習正式結構、說服技巧與較多句式變化。';
    $('#model-picker').innerHTML = gradeModels.map((model) => `<button class="model-picker-btn ${model.id === state.modelId ? 'active' : ''}" data-model-id="${model.id}"><strong>${escape(model.genre)}</strong><small>${escape(model.genreZh)}</small><span>${escape(model.title)}</span></button>`).join('');
    if (!selected) return;
    const activeRubric = selected.rubric || rubric;
    $('#model-genre').textContent = `${selected.genre.toUpperCase()} · ${selected.genreZh}${selected.preS1 ? ' · ORIGINAL PRE-S1 PRACTICE' : ''}`;
    $('#model-title').innerHTML = `${escape(selected.title)}<small>${escape(selected.titleZh)}</small>`;
    $('#model-words').textContent = `${selected.words} · 建議篇幅`;
    $('#model-task').textContent = selected.task;
    $('#model-task-zh').textContent = selected.taskZh;
    $('#model-copy').textContent = selected.model;
    $('#rubric-list').innerHTML = activeRubric.map((item) => `<article class="rubric-item"><strong>${escape(item.title)}</strong><small>${escape(item.titleZh)}</small><p>${escape(item.strong)}<br>${escape(item.strongZh)}</p></article>`).join('');
    $('#model-focus').innerHTML = `<h3>Why it works <small>閱卷重點</small></h3><ul>${selected.focus.map((item, index) => `<li>${escape(item)}<small>${escape(selected.focusZh[index])}</small></li>`).join('')}</ul>`;
    renderWritingStudy(selected);
    $$('[data-model-grade]').forEach((button) => button.addEventListener('click', () => { state.modelGrade = Number(button.dataset.modelGrade); state.modelId = null; renderWritingModels(); }));
    $$('[data-model-id]').forEach((button) => button.addEventListener('click', () => { state.modelId = button.dataset.modelId; renderWritingModels(); }));
  }

  function renderWritingStudy(selected) {
    const support = (window.WRITING_MODEL_SUPPORT || {})[selected.id];
    if (!support) return;
    const tabs = [
      { id: 'mistakes', en: 'Common mistakes', zh: '常見錯誤' },
      { id: 'vocabulary', en: 'Vocabulary builder', zh: '詞彙擴展' },
      { id: 'patterns', en: 'Sentence patterns', zh: '高分句式' },
      { id: 'quiz', en: 'Quick correction quiz', zh: '快速改錯小測' }
    ];
    if (!tabs.some((tab) => tab.id === state.studyTab)) state.studyTab = 'mistakes';
    $('#writing-study-tabs').innerHTML = tabs.map((tab) => `<button class="study-tab ${state.studyTab === tab.id ? 'active' : ''}" data-study-tab="${tab.id}">${tab.en} · ${tab.zh}</button>`).join('');
    const tryBox = `<section class="study-try"><strong>Try it yourself · 試一試</strong><span>${escape(support.task)}<br>${escape(support.taskZh)}</span><textarea aria-label="Writing practice response" placeholder="Write your own sentence here · 在此寫下自己的句子"></textarea></section>`;
    let content = '';
    if (state.studyTab === 'mistakes') {
      content = `<div class="mistake-grid">${support.mistakes.map((item) => `<article class="mistake-card"><div class="mistake-lines"><div class="mistake-line bad"><small>COMMON ERROR · 常見錯誤</small>${escape(item.bad)}</div><div class="mistake-line better"><small>BETTER VERSION · 較佳寫法</small>${escape(item.better)}</div></div><p class="mistake-tip">${escape(item.tip)}<small>${escape(item.tipZh)}</small></p></article>`).join('')}</div>${tryBox}`;
    } else if (state.studyTab === 'vocabulary') {
      content = `<div class="vocab-grid">${support.vocab.map((item) => `<article class="vocab-card"><span class="basic-word">${escape(item.basic)}</span><strong>→ ${escape(item.strong)}</strong><small>${escape(item.zh)}</small></article>`).join('')}</div>${tryBox}`;
    } else if (state.studyTab === 'patterns') {
      content = `<div class="pattern-grid">${support.patterns.map((item) => `<article class="pattern-card"><strong>${escape(item.en)}</strong><small>${escape(item.zh)}</small></article>`).join('')}</div>${tryBox}`;
    } else {
      content = renderWritingQuiz(selected);
    }
    $('#writing-study-content').innerHTML = content;
    $$('[data-study-tab]').forEach((button) => button.addEventListener('click', () => { state.studyTab = button.dataset.studyTab; renderWritingStudy(selected); }));
    bindWritingQuiz(selected);
  }

  function renderWritingQuiz(selected) {
    const questions = (window.WRITING_ERROR_QUIZZES || {})[selected.id] || [];
    const quiz = state.quiz;
    if (quiz.modelId !== selected.id) state.quiz = { modelId: selected.id, index: 0, selected: null, results: [] };
    const activeQuiz = state.quiz;
    if (!questions.length) return '<p class="quiz-empty">Quiz content is being prepared. 小測內容準備中。</p>';
    if (activeQuiz.index >= questions.length) {
      const score = activeQuiz.results.filter((item) => item.correct).length;
      return `<section class="quiz-complete"><p class="eyebrow">QUIZ COMPLETE · 小測完成</p><strong>${score} / ${questions.length}</strong><h4>${score === questions.length ? 'Excellent editing!' : 'Keep improving!'}</h4><p>${score === questions.length ? 'You corrected every sentence accurately.' : 'Read the feedback, then try another model or repeat this quiz.'}<br>${score === questions.length ? '你已正確改正所有句子。' : '閱讀回饋後，可再挑戰此小測或另一篇範文。'}</p><button class="secondary" data-quiz-restart>Try again · 再做一次</button></section>`;
    }
    const item = questions[activeQuiz.index];
    const result = activeQuiz.results[activeQuiz.index];
    const selectedChoice = result ? result.selected : activeQuiz.selected;
    const choices = item.options.map((option, index) => {
      const isCorrect = result && index === item.answer;
      const isWrong = result && index === result.selected && !result.correct;
      return `<button class="quiz-choice ${selectedChoice === index ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" data-quiz-choice="${index}" ${result ? 'disabled' : ''}><span>${String.fromCharCode(65 + index)}</span>${escape(option)}</button>`;
    }).join('');
    const feedback = result ? `<div class="quiz-feedback ${result.correct ? 'correct' : 'wrong'}"><strong>${result.correct ? 'Correct · 答對了' : 'Check the correction · 查看改正'}</strong><p>${escape(item.explanation)}<br><small>${escape(item.explanationZh)}</small></p></div>` : '';
    const action = result ? `<button class="primary" data-quiz-next>${activeQuiz.index === questions.length - 1 ? 'See result · 查看成績 →' : 'Next correction · 下一題 →'}</button>` : `<button class="primary" data-quiz-check>Check correction · 核對改正</button>`;
    return `<section class="quiz-card"><header><p class="eyebrow">QUESTION ${activeQuiz.index + 1} OF ${questions.length} · 第 ${activeQuiz.index + 1} 題，共 ${questions.length} 題</p><h4>Find the best correction <small>選出最佳改正句</small></h4></header><div class="quiz-weak"><strong>COMMON ERROR · 常見錯誤</strong><p>${escape(item.bad)}</p></div><p class="quiz-prompt">${escape(item.prompt)}<small>${escape(item.promptZh)}</small></p><div class="quiz-choices">${choices}</div>${feedback}<footer class="quiz-footer"><span>${activeQuiz.results.filter(Boolean).length} / ${questions.length} checked · 已核對題數</span>${action}</footer></section>`;
  }

  function bindWritingQuiz(selected) {
    const questions = (window.WRITING_ERROR_QUIZZES || {})[selected.id] || [];
    $$('[data-quiz-choice]').forEach((button) => button.addEventListener('click', () => { state.quiz.selected = Number(button.dataset.quizChoice); renderWritingStudy(selected); }));
    $('[data-quiz-check]')?.addEventListener('click', () => {
      if (state.quiz.selected === null) { toast('Choose one correction first · 請先選擇一個改正句。'); return; }
      const item = questions[state.quiz.index];
      state.quiz.results[state.quiz.index] = { selected: state.quiz.selected, correct: state.quiz.selected === item.answer };
      state.quiz.selected = null;
      renderWritingStudy(selected);
    });
    $('[data-quiz-next]')?.addEventListener('click', () => { state.quiz.index += 1; state.quiz.selected = null; renderWritingStudy(selected); });
    $('[data-quiz-restart]')?.addEventListener('click', () => { state.quiz = { modelId: selected.id, index: 0, selected: null, results: [] }; renderWritingStudy(selected); });
  }

  function renderPreS1Review() {
    const guide = window.PRE_S1_REVIEW_GUIDE;
    if (!guide) return;
    $('#pre-s1-review-title').innerHTML = bilingual(guide.title, guide.titleZh);
    $('#pre-s1-review-note').innerHTML = bilingual(guide.notice, guide.noticeZh);
    $('#pre-s1-vocabulary').innerHTML = guide.vocabulary.map((group) => `<article class="pre-s1-study-group"><header><p class="eyebrow">VOCABULARY · 詞彙</p><h2>${escape(group.group)}<small>${escape(group.groupZh)}</small></h2></header><div class="pre-s1-vocab-list">${group.items.map((item) => `<section><strong>${escape(item.term)}</strong><span>${escape(item.zh)}</span><p>${escape(item.note)}</p><blockquote>${escape(item.example)}</blockquote></section>`).join('')}</div></article>`).join('');
    $('#pre-s1-grammar').innerHTML = guide.grammar.map((item) => `<article class="pre-s1-grammar-card"><header><strong>${escape(item.title)}</strong><small>${escape(item.titleZh)}</small></header><p>${escape(item.rule)}<span>${escape(item.ruleZh)}</span></p><blockquote>${escape(item.model)}</blockquote><footer><b>Editing reminder · 改錯提醒</b>${escape(item.alert)}</footer></article>`).join('');
  }

  const percentage = (correct, attempted) => attempted ? Math.round(correct / attempted * 100) : null;
  const formatAttemptDate = (value) => value ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)) : '—';
  function recordJuniorProgress(item, correct) {
    if (item.grade > 3) return null;
    const kind = item.topic === 'Phonics & story game' ? 'phonics' : item.topic === 'Listening lab' ? 'listening' : null;
    if (!kind) return null;
    const record = juniorProgress();
    const target = record.grades[item.grade][kind];
    target.attempted += 1;
    target.correct += Number(correct);
    target.lastAttempt = new Date().toISOString();
    record.updatedAt = target.lastAttempt;
    const reward = awardJuniorRewards(record, correct);
    saveJuniorProgress(record);
    return reward;
  }

  function renderTracker() {
    const record = juniorProgress();
    const all = [1, 2, 3].flatMap((grade) => ['phonics', 'listening'].map((kind) => record.grades[grade][kind]));
    const attempted = all.reduce((sum, item) => sum + item.attempted, 0);
    const correct = all.reduce((sum, item) => sum + item.correct, 0);
    const last = all.map((item) => item.lastAttempt).filter(Boolean).sort().at(-1);
    const rewardConfig = juniorRewardConfig();
    const metrics = juniorRewardMetrics(record);
    const badges = rewardConfig.badges || [];
    const earned = new Set(record.rewards?.badgeIds || []);
    const nextBadge = badges.find((badge) => !earned.has(badge.id));
    const rewardSummary = $('#reward-summary');
    const badgeWall = $('#badge-wall');
    if (rewardSummary) rewardSummary.innerHTML = `<article><strong>${record.rewards?.stars || 0}</strong><span>Star points <small>星星積分</small></span></article><article><strong>${earned.size}/${badges.length}</strong><span>Badges unlocked <small>已解鎖徽章</small></span></article><article><strong>${nextBadge ? escape(nextBadge.title) : 'All!'}</strong><span>${nextBadge ? `${badgeProgress(nextBadge, metrics)}/${nextBadge.condition.value} to go` : 'Every current badge earned'}<small>${nextBadge ? `下一目標：${escape(nextBadge.titleZh)}` : '已集齊目前所有徽章'}</small></span></article>`;
    if (badgeWall) badgeWall.innerHTML = badges.map((badge) => { const isEarned = earned.has(badge.id); const progress = badgeProgress(badge, metrics); return `<article class="reward-badge ${isEarned ? 'earned' : 'locked'}"><span class="reward-mark">${escape(badge.mark)}</span><div><strong>${escape(badge.title)}</strong><small>${escape(badge.titleZh)}</small><p>${escape(badge.description)}<br>${escape(badge.descriptionZh)}</p><b>${isEarned ? 'Earned · 已解鎖' : `${progress}/${badge.condition.value} · 努力中`}</b></div></article>`; }).join('');
    $('#tracker-summary').innerHTML = `<article><strong>${attempted}</strong><span>Junior attempts <small>初小已作答題目</small></span></article><article><strong>${percentage(correct, attempted) ?? '—'}${attempted ? '%' : ''}</strong><span>Objective accuracy <small>客觀題正確率</small></span></article><article><strong>${formatAttemptDate(last)}</strong><span>Latest local activity <small>最近本機紀錄</small></span></article>`;
    $('#tracker-table').innerHTML = [1, 2, 3].map((grade) => {
      const phonics = record.grades[grade].phonics;
      const listening = record.grades[grade].listening;
      const row = (label, labelZh, item) => `<article class="tracker-row"><div><strong>${label}<small>${labelZh}</small></strong><span>${item.attempted ? `${item.correct} / ${item.attempted} correct · 正確` : 'No recorded attempts · 暫無作答紀錄'}</span></div><b>${percentage(item.correct, item.attempted) ?? '—'}${item.attempted ? '%' : ''}</b><time>${formatAttemptDate(item.lastAttempt)}</time></article>`;
      return `<section class="tracker-grade"><header><p class="eyebrow">P${grade} PROGRESS · 小${grade}進度</p><h2>P${grade} phonics & listening <small>拼音與聆聽遊戲</small></h2></header>${row('Phonics & story game', '拼音與故事遊戲', phonics)}${row('Listening lab', '聆聽練習室', listening)}</section>`;
    }).join('');
    $('#tracker-reset')?.addEventListener('click', () => {
      if (!window.confirm('Clear the local P1–P3 tracker on this device?\n清除本裝置的 P1–P3 進度紀錄？')) return;
      saveJuniorProgress(emptyJuniorProgress());
      renderTracker();
      toast('本機初小進度紀錄已清除。');
    });
  }

  function renderScopePage() {
    const current = scope();
    const currentZh = scopeZh[state.grade];
    $('#scope-page-title').innerHTML = bilingual(`${current.level} English Scope`, `小${state.grade}英文學習範疇`);
    $('#scope-page-overview').innerHTML = bilingual(current.overview, currentZh.overview);
    $('#scope-stage-title').innerHTML = bilingual(current.stage, currentZh.stage);
    $('#scope-reading-writing').innerHTML = `<div class="bi-pair">${bilingual(current.reading, currentZh.reading)}</div><div class="bi-pair">${bilingual(current.writing, currentZh.writing)}</div>`;
    $('#scope-tip').innerHTML = bilingual(current.assessment, currentZh.assessment);
    $('#scope-vocabulary').innerHTML = current.vocabulary.map((item) => `<li>${escape(bilingualTerm(item))}</li>`).join('');
    $('#scope-grammar').innerHTML = current.grammar.map((item) => `<li>${escape(bilingualTerm(item))}</li>`).join('');
    $('#scope-reading').innerHTML = bilingual(current.reading, currentZh.reading);
    $('#scope-writing').innerHTML = bilingual(current.writing, currentZh.writing);
    $('#scope-listening').innerHTML = bilingual(current.listening, currentZh.listening);
    $('#scope-speaking').innerHTML = bilingual(current.speaking, currentZh.speaking);
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) { toast('這個瀏覽器未能提供語音播放，請改用支援語音的瀏覽器。'); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = state.grade <= 2 ? 0.76 : state.grade <= 4 ? 0.86 : 0.94;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function currentQuestion() { return state.session.questions[state.session.index]; }

  function updateSessionProgress() {
    const session = state.session;
    const done = session.results.filter(Boolean).length;
    $('#practice-subtitle').textContent = `Question ${session.index + 1} of ${session.questions.length} · 第 ${session.index + 1} 題，共 ${session.questions.length} 題`;
    $('#practice-progress').style.width = `${done / session.questions.length * 100}%`;
    $('#question-dots').innerHTML = session.questions.map((_, index) => `<button class="question-dot ${index === session.index ? 'current' : ''} ${session.results[index] ? 'checked' : ''}" data-question-index="${index}">${index + 1}</button>`).join('');
    $$('[data-question-index]').forEach((button) => button.addEventListener('click', () => { state.session.index = Number(button.dataset.questionIndex); renderQuestion(); }));
  }

  function renderQuestion() {
    const session = state.session;
    const item = currentQuestion();
    const currentResult = session.results[session.index];
    const route = routes[item.route];
    $('#practice-title').innerHTML = `${escape(scope().level)} · ${escape(item.topic)}<span class="practice-title-zh">${escape(route.labelZh)}</span>`;
    $('#question-number').textContent = String(session.index + 1).padStart(2, '0');
    $('#question-route').innerHTML = `${escape(route.label.toUpperCase())} PRACTICE <small>· ${escape(route.labelZh)}</small>`;
    $('#practice-side-copy').textContent = item.oralActivity ? '先聽示範，再按四步計劃準備自己的短講。' : item.route === 'listen' ? '可先播放兩次。核對後才會看到英文逐字稿。' : '逐題作答後，系統會提供一個可立即使用的重點提示。';
    $('#skill-tip').textContent = route.tip;

    const pairedLabel = item.s2Action ? 'S2 ACTION · ORIGINAL PAIRED TEXTS · 原創配對閱讀' : item.s2Connect ? 'S2 CONNECT · ORIGINAL PAIRED TEXTS · 原創配對閱讀' : 'S2 DEVELOP · ORIGINAL PAIRED TEXTS · 原創配對閱讀';
    const pairedPassages = item.pairedPassages ? `<section class="paired-reading"><header><p class="eyebrow">${pairedLabel}</p><strong>${escape(item.pairedPassages.title)}<small>${escape(item.pairedPassages.titleZh)}</small></strong><span>Read both texts. Compare purpose, evidence and useful details. · 閱讀兩篇文本，比較寫作目的、證據及實用細節。</span></header><div class="paired-passages">${item.pairedPassages.texts.map((text) => `<article class="passage paired-passage"><small>${escape(text.label)}</small><strong>${escape(text.title)}</strong><p>${escape(text.text)}</p><footer><b>Purpose · 寫作目的</b>${escape(text.purpose)}<i>${escape(text.purposeZh)}</i></footer></article>`).join('')}</div></section>` : '';
    const passage = item.passage ? `<article class="passage ${item.advancedAnalysis ? 'advanced-passage' : ''}">${item.advancedAnalysis ? `<small class="genre-label">${escape(item.advancedAnalysis.genre)} · ${escape(item.advancedAnalysis.genreZh)}</small>` : ''}<strong>${escape(item.passage.title)}</strong>${escape(item.passage.text)}</article>` : '';
    const audio = item.audioText ? `<section class="listen-player"><div><strong>${item.oralActivity ? 'Listen to the model, then build your own talk.' : item.speaking ? 'Listen, then say it aloud.' : 'Listen first. You may replay the audio.'}</strong><span>${item.oralActivity ? '按播放鍵聽示範，然後按照四步計劃準備個人短講。' : item.speaking ? '按播放鍵聽示範，然後用自己的資料完成句子。' : '核對答案後可查看英文逐字稿。'}</span></div><button class="play-audio" id="play-audio">Play audio · 播放錄音</button></section>${currentResult && !item.speaking ? `<p class="transcript"><strong>${escape(item.scriptTitle ? `${item.scriptTitle} · Transcript` : 'Transcript')}:</strong> ${escape(item.audioText)}</p>` : ''}` : '';
    const oralPlan = item.oralActivity ? `<section class="oral-plan"><header><p class="eyebrow">P4–P6 ORAL PRACTICE · 高小聆聽與口語</p><div><strong>${escape(item.oralActivity.title)}<small>${escape(item.oralActivity.titleZh)}</small></strong><span>${escape(item.oralActivity.duration)}</span></div></header><div class="oral-frames">${item.oralActivity.frames.map(([label, labelZh, frame, frameZh], index) => `<article><i>${index + 1}</i><div><b>${escape(label)}<small>${escape(labelZh)}</small></b><p>${escape(frame)}</p><span>${escape(frameZh)}</span></div></article>`).join('')}</div><footer><strong>Key language · 實用語句</strong><p>${item.oralActivity.language.map((phrase) => `<em>${escape(phrase)}</em>`).join('')}</p></footer></section>` : '';
    const flashcard = item.flashcard ? `<section class="flashcard ${session.revealed?.[session.index] ? 'revealed' : ''}"><div class="flashcard-front"><p class="eyebrow">${item.flashcardType === 'match' ? 'WORD MATCH · 單字配對' : 'LISTENING VOCABULARY · 聆聽詞彙卡'}</p><strong>${escape(item.flashcard.word)}</strong><span>Preview the word, then listen and use it. · 預習詞彙，然後聆聽及運用。</span></div><div class="flashcard-actions"><button class="secondary" id="flash-reveal">${session.revealed?.[session.index] ? 'Meaning revealed · 已顯示意思' : 'Reveal meaning · 顯示意思'}</button><button class="secondary" id="flash-audio">Play word · 播放字詞</button></div><div class="flashcard-back ${session.revealed?.[session.index] ? 'show' : ''}"><strong>${escape(item.flashcard.chinese)}</strong><p>${escape(item.flashcard.definition)}</p><blockquote>${escape(item.flashcard.example)}</blockquote></div></section>` : '';
    const roleplay = item.roleplay ? `<section class="roleplay-card"><header><p class="eyebrow">ROLE-PLAY PRACTICE · 角色對話</p><strong>${escape(item.roleplay.title)}<small>${escape(item.roleplay.titleZh)}</small></strong><span>${escape(item.roleplay.roles[0])}</span><span>${escape(item.roleplay.roles[1])}</span></header><div class="roleplay-actions"><button class="secondary" data-role-audio="A">Listen to A · 聽 A 角色</button><button class="secondary" data-role-audio="B">Listen to B · 聽 B 角色</button></div><div class="roleplay-lines">${item.roleplay.dialogue.map(([speaker, line]) => `<p class="role-${speaker.toLowerCase()}"><b>${speaker}</b><span>${escape(line)}</span></p>`).join('')}</div><footer><strong>Useful phrases · 實用語句</strong><p>${item.roleplay.language.map((phrase) => `<em>${escape(phrase)}</em>`).join('')}</p></footer></section>` : '';
    const writingGuide = item.writing ? `<section class="writing-guide"><strong>${item.selfCheck ? 'Writing reminder' : item.s2Action ? 'S2 ACTION WRITING · 原創練習' : item.s2Connect ? 'S2 CONNECT WRITING · 原創練習' : item.s2Develop ? 'S2 DEVELOP WRITING · 原創練習' : item.s1Core ? 'S1 CORE WRITING · 原創練習' : item.writingTask ? 'PRE-S1-STYLE WRITING · 原創銜接寫作' : 'Writing check'}</strong><p>${item.selfCheck ? '先完成你的想法，再讀一次，確保每句都有清楚的意思。' : item.writingTask ? '這是自我檢查寫作題；系統只會確認已達最低字數，並不會自動評核內容質素。' : '輸入完整英文句子。留意大寫字母、主語、動詞和句號。'}</p></section>` : '';
    const mockWritingPlan = item.writingTask ? `<section class="writing-guide"><strong>Plan before you write · 先規劃再寫</strong><p>${item.writingTask.plan.map(([label, detail]) => `<b>${escape(label)}</b><br>${escape(detail)}`).join('<br><br>')}</p></section>` : '';
    let response = '';
    if (item.writingTask) {
      response = `${mockWritingPlan}<textarea class="answer-field" id="answer-field" rows="10" placeholder="Write your English response here... · 在此寫下你的英文答案" style="padding:12px;resize:vertical">${escape(session.drafts[session.index] || '')}</textarea><p class="question-zh">Target: ${escape(item.writingTask.target)} · 目標篇幅；at least ${item.writingTask.minWords} words are needed to complete this self-check. · 最少 ${item.writingTask.minWords} 字才可完成自我檢查。</p>`;
    } else if (item.selfCheck) {
      response = `<label class="choice ${session.drafts[session.index] === 'confirmed' ? 'selected' : ''}" for="self-check"><input id="self-check" type="checkbox" ${session.drafts[session.index] === 'confirmed' ? 'checked' : ''} style="accent-color:#214d7a;width:17px;height:17px"><span>${escape(item.selfCheck)}</span></label>`;
    } else if (item.options) {
      response = `<div class="choices">${item.options.map((choice, index) => `<button class="choice ${session.drafts[session.index] === String(index) ? 'selected' : ''}" data-choice="${index}"><i class="choice-token">${String.fromCharCode(65 + index)}</i><span>${escape(choice)}</span></button>`).join('')}</div>`;
    } else if (item.multiline) {
      response = `<textarea class="answer-field" id="answer-field" rows="5" placeholder="Write your English sentences here..." style="padding:12px;resize:vertical">${escape(session.drafts[session.index] || '')}</textarea>`;
    } else {
      response = `<input class="answer-field" id="answer-field" autocomplete="off" inputmode="text" placeholder="Write your answer in English" value="${escape(session.drafts[session.index] || '')}">`;
    }

    const modelAnalysis = currentResult && item.advancedAnalysis ? `<section class="reading-analysis"><p class="eyebrow">MODEL ANALYSIS · 範例解析</p><article><strong>Find the clue · 找出線索</strong><p>${escape(item.advancedAnalysis.clue)}</p></article><article><strong>Model answer · 範例答案</strong><p>${escape(item.advancedAnalysis.model)}</p></article><article><strong>Why it works · 解題原因</strong><p>${escape(item.advancedAnalysis.why)}</p></article></section>` : '';
    $('#question-content').innerHTML = `${audio}${pairedPassages}${passage}<h1>${escape(item.prompt)}${item.promptZh ? `<small class="question-zh">${escape(item.promptZh)}</small>` : ''}</h1>${flashcard}${oralPlan}${roleplay}${writingGuide}${response}${modelAnalysis}`;
    const feedback = $('#feedback');
    feedback.className = `feedback ${currentResult ? `show ${currentResult.correct ? 'correct' : 'wrong'}` : ''}`;
    feedback.innerHTML = currentResult ? `<strong>${item.writingTask ? (currentResult.correct ? 'Writing draft recorded.' : `Keep writing: add at least ${item.writingTask.minWords} words.`) : currentResult.correct ? 'Good work.' : 'Keep this one for review.'}</strong> ${escape(item.explanation)}${item.explanationZh ? `<small>${escape(item.explanationZh)}</small>` : ''}` : '';
    $('#check-question').classList.toggle('hidden', Boolean(currentResult));
    $('#next-question').classList.toggle('hidden', !currentResult);
    $('#previous-question').disabled = session.index === 0;

    $('#play-audio')?.addEventListener('click', () => speak(item.audioText));
    $('#flash-audio')?.addEventListener('click', () => speak(item.flashcard.word));
    $('#flash-reveal')?.addEventListener('click', () => { session.revealed ||= []; session.revealed[session.index] = true; renderQuestion(); });
    $$('[data-role-audio]').forEach((button) => button.addEventListener('click', () => { const role = button.dataset.roleAudio; speak(item.roleplay.dialogue.filter(([speaker]) => speaker === role).map(([, line]) => line).join(' ')); }));
    $$('[data-choice]').forEach((button) => button.addEventListener('click', () => {
      if (currentResult) return;
      session.drafts[session.index] = button.dataset.choice;
      $$('.choice').forEach((choice) => choice.classList.toggle('selected', choice === button));
    }));
    $('#self-check')?.addEventListener('change', (event) => { if (item.flashcard && event.target.checked && !session.revealed?.[session.index]) { event.target.checked = false; toast('Reveal the meaning first · 請先顯示字詞意思。'); return; } session.drafts[session.index] = event.target.checked ? 'confirmed' : ''; });
    $('#answer-field')?.addEventListener('input', (event) => { session.drafts[session.index] = event.target.value; });
    updateSessionProgress();
  }

  function addReview(item, answer) {
    const list = reviewItems();
    const entry = { ...item, studentAnswer: answer, savedAt: new Date().toISOString() };
    const index = list.findIndex((saved) => saved.id === item.id);
    if (index >= 0) list[index] = entry; else list.unshift(entry);
    saveReview(list.slice(0, 100));
  }

  function removeReview(id) { saveReview(reviewItems().filter((item) => item.id !== id)); }

  function checkCurrent() {
    const session = state.session;
    const item = currentQuestion();
    const answer = session.drafts[session.index];
    if (!answer || String(answer).trim() === '') { toast(item.selfCheck ? '完成朗讀後，請勾選確認。' : '請先選擇或輸入答案。'); return; }
    if (item.writingTask && wordCount(answer) < item.writingTask.minWords) { toast(`請再加入一些內容，完成最少 ${item.writingTask.minWords} 字。`); return; }
    let correct;
    if (item.selfCheck) correct = answer === 'confirmed';
    else if (item.writingTask) correct = wordCount(answer) >= item.writingTask.minWords;
    else if (item.options) correct = String(answer) === item.answer;
    else correct = normalize(answer) === normalize(item.answer);
    session.results[session.index] = { correct, answer };
    const record = stats();
    record.completed += 1;
    record.correct += Number(correct);
    record.skills ||= { read: 0, write: 0, listen: 0, language: 0 };
    record.skills[item.route] = (record.skills[item.route] || 0) + 1;
    saveStats(record);
    const juniorReward = recordJuniorProgress(item, correct);
    let outcome = '';
    if (!item.selfCheck && !item.writingTask && !correct) { addReview(item, answer); outcome = '這題已加入溫習清單，稍後可以再挑戰。'; }
    else { removeReview(item.id); outcome = item.writingTask ? (correct ? '已完成寫作自我檢查。' : `請再加入一些內容，完成最少 ${item.writingTask.minWords} 字。`) : correct ? '答對了，繼續保持。' : '已完成這項練習。'; }
    if (juniorReward) {
      const badgeMessage = juniorReward.unlocked.length ? ` 已獲得：${juniorReward.unlocked.map((badge) => `${badge.title}／${badge.titleZh}`).join('、')}！` : '';
      outcome += ` +${juniorReward.points} 星星積分。${badgeMessage}`;
    }
    toast(outcome);
    renderSidebar();
    renderQuestion();
  }

  function startPractice() {
    const module = selectedModule();
    if (module.reviewGuide) {
      renderPreS1Review();
      showView('pre-s1-review');
      return;
    }
    if (module.assessment) {
      state.modelGrade = Math.max(4, Math.min(6, state.grade));
      state.modelId = null;
      renderWritingModels();
      showView('models');
      return;
    }
    const bank = getBank();
    const questions = module.assessmentMock ? bank : selectSessionQuestions(bank, module.sessions);
    state.session = { questions, index: 0, drafts: Array(questions.length).fill(''), results: Array(questions.length).fill(null), review: false, mock: Boolean(module.assessmentMock) };
    showView('session');
    renderQuestion();
  }

  function nextQuestion() {
    if (state.session.index + 1 < state.session.questions.length) { state.session.index += 1; renderQuestion(); }
    else renderResult();
  }

  function renderResult() {
    const results = state.session.results;
    const correct = results.filter((result) => result?.correct).length;
    const total = results.length;
    const score = Math.round(correct / total * 100);
    const incorrect = total - correct;
    if (state.session.mock) {
      const objectiveIndexes = state.session.questions.map((item, index) => item.writingTask ? null : index).filter((index) => index !== null);
      const objectiveCorrect = objectiveIndexes.filter((index) => results[index]?.correct).length;
      const objectiveTotal = objectiveIndexes.length;
      const writingItem = state.session.questions.find((item) => item.writingTask);
      const writingIndex = state.session.questions.findIndex((item) => item.writingTask);
      const writingComplete = writingIndex >= 0 && Boolean(results[writingIndex]?.correct);
      $('#result-score').textContent = `${objectiveCorrect}/${objectiveTotal}`;
      $('#result-title').textContent = objectiveCorrect >= Math.ceil(objectiveTotal * 0.8) ? 'Pre-S1-style readiness complete.' : 'Pre-S1-style practice complete.';
      $('#result-copy').textContent = `你已完成原創中一分班試英語銜接模擬：客觀題答對 ${objectiveCorrect}／${objectiveTotal} 題；寫作自我檢查${writingComplete ? '已完成' : '尚未完成'}。本單元並非教育局官方試卷，客觀題分數不包含寫作內容評核。${writingItem ? ` 寫作目標為 ${writingItem.writingTask.target}。` : ''}`;
    } else {
      $('#result-score').textContent = `${score}%`;
      $('#result-title').textContent = score >= 80 ? 'A strong practice session.' : 'Practice complete. Keep building.';
      $('#result-copy').textContent = incorrect ? `你完成了 ${total} 題，答對 ${correct} 題。未掌握的題目已保留在溫習清單；回顧提示後再試一次會更有把握。` : `你答對全部 ${total} 題。下一次可試試另一個技能路線，讓讀、寫、聽、說一起進步。`;
    }
    $('#result-review').classList.toggle('hidden', reviewItems().length === 0);
    showView('result');
    renderSidebar();
  }

  function renderReview() {
    const list = reviewItems();
    if (!list.length) {
      $('#review-list').innerHTML = `<section class="empty"><div class="empty-mark">✓</div><h2>目前沒有需要重溫的題目</h2><p>完成客觀題後，答錯的題目會自動放在這裡。答對重做題後，它會從清單移除。</p><button class="primary" id="review-home">開始練習 →</button></section>`;
      $('#review-home').addEventListener('click', () => { showView('home'); renderHome(); });
      return;
    }
    $('#review-list').innerHTML = list.map((item) => `<article class="review-item"><span class="review-mark">${escape(routes[item.route]?.token || 'R')}</span><div><strong>${escape(item.topic)}</strong><p>${escape(item.prompt)}</p><small>上次作答：${escape(item.studentAnswer || '—')}</small></div><button class="secondary" data-review-id="${escape(item.id)}">重做</button></article>`).join('');
    $$('[data-review-id]').forEach((button) => button.addEventListener('click', () => {
      const item = reviewItems().find((saved) => saved.id === button.dataset.reviewId);
      if (!item) return;
      state.grade = item.grade || state.grade;
      state.route = item.route || 'read';
      state.module = item.topic === 'Vocabulary & spelling' ? 'vocabulary' : item.topic === 'Grammar & patterns' ? 'grammar' : item.topic === 'Sentence builder' ? 'sentence-builder' : item.topic === 'Proofreading' ? 'proofreading' : item.topic === 'Listening lab' ? 'listening' : 'reading';
      state.session = { questions: [item], index: 0, drafts: [''], results: [null], review: true };
      renderSidebar();
      showView('session');
      renderQuestion();
    }));
  }

  function bindEvents() {
    $$('.grade-btn').forEach((button) => button.addEventListener('click', () => {
      state.grade = Number(button.dataset.grade);
      renderHome();
      renderScopePage();
    }));
    $('#home-brand').addEventListener('click', () => { showView('home'); renderHome(); });
    $('#open-scope').addEventListener('click', () => { renderScopePage(); showView('scope'); });
    $$('[data-nav]').forEach((button) => button.addEventListener('click', () => {
      const target = button.dataset.nav;
      if (target === 'scope') { renderScopePage(); showView('scope'); }
      else if (target === 'review') { renderReview(); showView('review'); }
      else if (target === 'tracker') { renderTracker(); showView('tracker'); }
      else { showView('home'); renderHome(); }
    }));
    $('#back-home').addEventListener('click', () => { showView('home'); renderHome(); });
    $('#start-practice').addEventListener('click', startPractice);
    $('#hint-button').addEventListener('click', () => toast(currentQuestion().hint || routes[currentQuestion().route].tip));
    $('#check-question').addEventListener('click', checkCurrent);
    $('#next-question').addEventListener('click', nextQuestion);
    $('#previous-question').addEventListener('click', () => { if (state.session.index > 0) { state.session.index -= 1; renderQuestion(); } });
    $('#result-home').addEventListener('click', () => { showView('home'); renderHome(); });
    $('#result-review').addEventListener('click', () => { renderReview(); showView('review'); });
  }

  bindEvents();
  renderHome();
  renderScopePage();
})();
