(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const scopeMap = window.PRIMARY_ENGLISH_SCOPE || {};
  const KEYS = {
    stats: 'primary-english-studio-stats-v1',
    review: 'primary-english-studio-review-v1',
    used: 'primary-english-studio-used-v1'
  };

  const state = { grade: 3, route: 'read', module: 'reading', session: null };
  const safeGet = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const safeSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
  const randomize = (items) => [...items].sort(() => Math.random() - 0.5);
  const scope = () => scopeMap[state.grade];
  const stats = () => safeGet(KEYS.stats, { completed: 0, correct: 0, skills: { read: 0, write: 0, listen: 0, language: 0 } });
  const reviewItems = () => safeGet(KEYS.review, []);
  const saveStats = (value) => safeSet(KEYS.stats, value);
  const saveReview = (value) => safeSet(KEYS.review, value);

  const routes = {
    read: {
      token: 'R', color: '#214d7a', tint: '#eef7fc', label: 'Read', labelZh: '閱讀理解', title: 'Read with confidence', titleZh: '建立自信閱讀',
      description: 'Understand stories, notices and information texts.', descriptionZh: '閱讀短文、故事和實用文本，找出關鍵資料、主旨和簡單推論。',
      tip: '先圈出題目中的關鍵字，再回到文章找相關句子。',
      modules: [
        { id: 'reading', symbol: 'R', title: 'Reading comprehension', titleZh: '閱讀理解', description: 'Stories, notices and main ideas', descriptionZh: '短文、故事與主旨理解', sessions: 6 },
        { id: 'reading-details', symbol: 'K', title: 'Key detail hunter', titleZh: '關鍵細節搜尋', description: 'People, places, times and actions', descriptionZh: '人物、地點、時間與細節', sessions: 6 }
      ]
    },
    write: {
      token: 'W', color: '#d97463', tint: '#fff2ef', label: 'Write', labelZh: '寫作與編輯', title: 'Write clear English', titleZh: '寫出清晰英語',
      description: 'Build accurate sentences and organised ideas.', descriptionZh: '由詞語排序、句子改錯到段落構思，建立準確而有條理的寫作習慣。',
      tip: '寫完後先檢查主語、動詞、大小寫和句號，再讀一次是否通順。',
      modules: [
        { id: 'sentence-builder', symbol: 'S', title: 'Sentence builder', titleZh: '句子重組', description: 'Turn word groups into full sentences', descriptionZh: '重組詞語，寫成完整句子', sessions: 6 },
        { id: 'proofreading', symbol: 'E', title: 'Proofreading', titleZh: '改錯練習', description: 'Spot grammar and spelling slips', descriptionZh: '找出常見文法與拼寫錯誤', sessions: 6 },
        { id: 'writing-plan', symbol: 'P', title: 'Writing planner', titleZh: '寫作構思', description: 'Plan complete sentences and paragraphs', descriptionZh: '用完整句子組織小段落', sessions: 3 }
      ]
    },
    listen: {
      token: 'L', color: '#4e8875', tint: '#eff9f4', label: 'Listen', labelZh: '聆聽與口語', title: 'Listen, then speak', titleZh: '先聽再說',
      description: 'Listen for key details, then speak in complete sentences.', descriptionZh: '先聽重點，再選答案；完成後查看逐字稿，並用完整句子開口說英語。',
      tip: '利用準備時間先看選項，預測可能聽到的人物、地點、數字或動作。',
      modules: [
        { id: 'listening', symbol: 'L', title: 'Listening lab', titleZh: '聆聽練習室', description: 'Replayable dialogues and short stories', descriptionZh: '可重播的短對話與故事', sessions: 4 },
        { id: 'speaking', symbol: 'S', title: 'Speak aloud', titleZh: '朗讀與表達', description: 'Listen to a model, then say it aloud', descriptionZh: '聽範例後朗讀完整句子', sessions: 3 }
      ]
    },
    language: {
      token: 'A', color: '#e1a443', tint: '#fff9ec', label: 'Apply', labelZh: '語言運用', title: 'Apply language well', titleZh: '靈活運用英語',
      description: 'Use vocabulary, spelling and grammar in context.', descriptionZh: '透過分級字詞、拼寫、文法與句型，把英語知識用在合適的語境中。',
      tip: '做時態題時，先找時間提示；做句子題時，先找誰在做這個動作。',
      modules: [
        { id: 'vocabulary', symbol: 'V', title: 'Vocabulary & spelling', titleZh: '字詞與拼寫', description: 'Core words, spelling and useful topics', descriptionZh: '核心字詞、拼寫與主題詞彙', sessions: 6 },
        { id: 'grammar', symbol: 'G', title: 'Grammar & patterns', titleZh: '文法與句型', description: 'Tenses, patterns and language use', descriptionZh: '時態、句型與語言運用', sessions: 6 }
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
    const words = scope().wordBank;
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
    return grammarSets[state.grade].map(([prompt, options, explanation], index) => {
      const shuffled = randomize(options);
      return question(`grammar-${state.grade}-${index}`, 'language', 'Grammar & patterns', prompt, shuffled.indexOf(options[0]), explanation, shuffled, { hint: scope().assessment });
    });
  }

  function createReading() {
    const items = [];
    readingLibrary[state.grade].forEach((passage, passageIndex) => {
      passage.questions.forEach(([prompt, options, explanation], questionIndex) => {
        const shuffled = randomize(options);
        items.push(question(`reading-${state.grade}-${passageIndex}-${questionIndex}`, 'read', 'Reading comprehension', prompt, shuffled.indexOf(options[0]), explanation, shuffled, { passage: { title: passage.title, text: passage.text }, hint: 'Find the key word from the question in the passage, then read the whole sentence around it.' }));
      });
    });
    return items;
  }

  function createSentenceBuilder() {
    return sentenceBuilders[state.grade].map((sentence, index) => {
      const words = sentence.replace('.', '').split(' ');
      const rotation = index % words.length;
      const mixed = [...words.slice(rotation), ...words.slice(0, rotation)].join(' / ');
      return question(`builder-${state.grade}-${index}`, 'write', 'Sentence builder', `Put the words in the correct order, then write the full sentence: ${mixed}`, sentence, `A clear sentence begins with a subject and ends with a full stop: ${sentence}`, null, { writing: true, hint: 'Find the subject first. Then choose the verb and add the rest of the information.' });
    });
  }

  function createProofreading() {
    return proofreadingPairs[state.grade].map(([incorrect, correct], index) => question(`proofread-${state.grade}-${index}`, 'write', 'Proofreading', `This sentence has one mistake. Write the corrected sentence: ${incorrect}`, correct, `Correct sentence: ${correct}`, null, { writing: true, hint: 'Check the subject, the verb form, the tense clue and punctuation.' }));
  }

  function createWritingPlan() {
    return writingPrompts[state.grade].map((prompt, index) => question(`writing-plan-${state.grade}-${index}`, 'write', 'Writing planner', prompt, 'self-check', 'Well done. A first draft is the beginning of good writing. Read your sentences aloud and check that each one has a subject, a verb and a full stop.', null, { writing: true, multiline: true, selfCheck: 'I have written my first draft and checked it once.', hint: 'Use the prompt as your first idea. Add a detail, a reason or a time word to make your writing clearer.' }));
  }

  function createListening() {
    return listeningLibrary[state.grade].map(([audioText, prompt, options, explanation], index) => {
      const shuffled = randomize(options);
      return question(`listening-${state.grade}-${index}`, 'listen', 'Listening lab', prompt, shuffled.indexOf(options[0]), explanation, shuffled, { audioText, hint: 'Listen once for the main idea. Listen again for a word, number, place or action from the question.' });
    });
  }

  function createSpeaking() {
    return speakingPrompts[state.grade].map((model, index) => question(`speaking-${state.grade}-${index}`, 'listen', 'Speak aloud', 'Listen to the model. Then say it aloud and change the blank parts to make it true for you.', 'spoken', 'Excellent. Speaking in complete sentences builds confidence. Try saying the sentence once more with a clear voice and natural pace.', null, { audioText: model.replaceAll('____', 'your answer'), selfCheck: 'I have spoken the sentence aloud in a complete voice.', speaking: true, hint: 'Do not rush. Pause briefly at full stops and make your key words clear.' }));
  }

  function selectedModule() { return routes[state.route].modules.find((item) => item.id === state.module) || routes[state.route].modules[0]; }
  function getBank() {
    if (state.module === 'vocabulary') return createVocabulary();
    if (state.module === 'grammar') return createGrammar();
    if (state.module === 'sentence-builder') return createSentenceBuilder();
    if (state.module === 'proofreading') return createProofreading();
    if (state.module === 'writing-plan') return createWritingPlan();
    if (state.module === 'listening') return createListening();
    if (state.module === 'speaking') return createSpeaking();
    if (state.module === 'reading-details') return createKeyDetails();
    return createReading();
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
    $('#skill-grid').innerHTML = Object.entries(routes).map(([id, route]) => `<button class="skill-card skill-${id} ${state.route === id ? 'selected' : ''}" data-route="${id}" style="--skill:${route.color};--tint:${route.tint}"><span class="skill-token">${route.token}</span><h3>${bilingual(route.label, route.labelZh)}</h3><p class="card-en">${escape(route.description)}</p><p class="card-zh">${escape(route.descriptionZh)}</p><small>${route.modules.length} PRACTICE OPTIONS · 練習選項 →</small></button>`).join('');
    $$('[data-route]').forEach((button) => button.addEventListener('click', () => {
      state.route = button.dataset.route;
      state.module = routes[state.route].modules[0].id;
      renderHome();
    }));
  }

  function renderModules() {
    const route = routes[state.route];
    $('#route-title').innerHTML = bilingual(route.title, route.titleZh);
    $('#route-description').innerHTML = bilingual(route.description, route.descriptionZh);
    $('#module-list').innerHTML = route.modules.map((module) => `<button class="module-card ${state.module === module.id ? 'selected' : ''}" data-module="${module.id}"><i class="module-symbol">${module.symbol}</i><span><strong>${bilingual(module.title, module.titleZh)}</strong><span class="module-en">${escape(module.description)}</span><span class="module-zh">${escape(module.descriptionZh)}</span></span></button>`).join('');
    $$('[data-module]').forEach((button) => button.addEventListener('click', () => { state.module = button.dataset.module; renderHome(); }));
    const module = selectedModule();
    $('#session-mark').textContent = `${module.sessions} QUESTIONS · ${module.sessions} 題`;
    $('#scope-session-count').textContent = module.sessions;
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
    $('#practice-side-copy').textContent = item.route === 'listen' ? '可先播放兩次。核對後才會看到英文逐字稿。' : '逐題作答後，系統會提供一個可立即使用的重點提示。';
    $('#skill-tip').textContent = route.tip;

    const passage = item.passage ? `<article class="passage"><strong>${escape(item.passage.title)}</strong>${escape(item.passage.text)}</article>` : '';
    const audio = item.audioText ? `<section class="listen-player"><div><strong>${item.speaking ? 'Listen, then say it aloud.' : 'Listen first. You may replay the audio.'}</strong><span>${item.speaking ? '按播放鍵聽示範，然後用自己的資料完成句子。' : '核對答案後可查看英文逐字稿。'}</span></div><button class="play-audio" id="play-audio">Play audio</button></section>${currentResult && !item.speaking ? `<p class="transcript"><strong>Transcript:</strong> ${escape(item.audioText)}</p>` : ''}` : '';
    const writingGuide = item.writing ? `<section class="writing-guide"><strong>${item.selfCheck ? 'Writing reminder' : 'Writing check'}</strong><p>${item.selfCheck ? '先完成你的想法，再讀一次，確保每句都有清楚的意思。' : '輸入完整英文句子。留意大寫字母、主語、動詞和句號。'}</p></section>` : '';
    let response = '';
    if (item.selfCheck) {
      response = `<label class="choice ${session.drafts[session.index] === 'confirmed' ? 'selected' : ''}" for="self-check"><input id="self-check" type="checkbox" ${session.drafts[session.index] === 'confirmed' ? 'checked' : ''} style="accent-color:#214d7a;width:17px;height:17px"><span>${escape(item.selfCheck)}</span></label>`;
    } else if (item.options) {
      response = `<div class="choices">${item.options.map((choice, index) => `<button class="choice ${session.drafts[session.index] === String(index) ? 'selected' : ''}" data-choice="${index}"><i class="choice-token">${String.fromCharCode(65 + index)}</i><span>${escape(choice)}</span></button>`).join('')}</div>`;
    } else if (item.multiline) {
      response = `<textarea class="answer-field" id="answer-field" rows="5" placeholder="Write your English sentences here..." style="padding:12px;resize:vertical">${escape(session.drafts[session.index] || '')}</textarea>`;
    } else {
      response = `<input class="answer-field" id="answer-field" autocomplete="off" inputmode="text" placeholder="Write your answer in English" value="${escape(session.drafts[session.index] || '')}">`;
    }

    $('#question-content').innerHTML = `${audio}${passage}<h1>${escape(item.prompt)}</h1>${writingGuide}${response}`;
    const feedback = $('#feedback');
    feedback.className = `feedback ${currentResult ? `show ${currentResult.correct ? 'correct' : 'wrong'}` : ''}`;
    feedback.innerHTML = currentResult ? `<strong>${currentResult.correct ? 'Good work.' : 'Keep this one for review.'}</strong> ${escape(item.explanation)}` : '';
    $('#check-question').classList.toggle('hidden', Boolean(currentResult));
    $('#next-question').classList.toggle('hidden', !currentResult);
    $('#previous-question').disabled = session.index === 0;

    $('#play-audio')?.addEventListener('click', () => speak(item.audioText));
    $$('[data-choice]').forEach((button) => button.addEventListener('click', () => {
      if (currentResult) return;
      session.drafts[session.index] = button.dataset.choice;
      $$('.choice').forEach((choice) => choice.classList.toggle('selected', choice === button));
    }));
    $('#self-check')?.addEventListener('change', (event) => { session.drafts[session.index] = event.target.checked ? 'confirmed' : ''; });
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
    let correct;
    if (item.selfCheck) correct = answer === 'confirmed';
    else if (item.options) correct = String(answer) === item.answer;
    else correct = normalize(answer) === normalize(item.answer);
    session.results[session.index] = { correct, answer };
    const record = stats();
    record.completed += 1;
    record.correct += Number(correct);
    record.skills ||= { read: 0, write: 0, listen: 0, language: 0 };
    record.skills[item.route] = (record.skills[item.route] || 0) + 1;
    saveStats(record);
    if (!item.selfCheck && !correct) { addReview(item, answer); toast('這題已加入溫習清單，稍後可以再挑戰。'); }
    else { removeReview(item.id); toast(correct ? '答對了，繼續保持。' : '已完成這項練習。'); }
    renderSidebar();
    renderQuestion();
  }

  function startPractice() {
    const module = selectedModule();
    const bank = getBank();
    const questions = selectSessionQuestions(bank, module.sessions);
    state.session = { questions, index: 0, drafts: Array(questions.length).fill(''), results: Array(questions.length).fill(null), review: false };
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
    $('#result-score').textContent = `${score}%`;
    $('#result-title').textContent = score >= 80 ? 'A strong practice session.' : 'Practice complete. Keep building.';
    $('#result-copy').textContent = incorrect ? `你完成了 ${total} 題，答對 ${correct} 題。未掌握的題目已保留在溫習清單；回顧提示後再試一次會更有把握。` : `你答對全部 ${total} 題。下一次可試試另一個技能路線，讓讀、寫、聽、說一起進步。`;
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
