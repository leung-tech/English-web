(() => {
  const modelId = 'p6-pre-s1-calm-start';
  const model = {
    id: modelId,
    grade: 6,
    preS1: true,
    genre: 'Pre-S1 readiness article',
    genreZh: '中一銜接校網文章',
    title: 'Three Smart Habits for a Calm Start',
    titleZh: '三個好習慣，從容迎接中學生活',
    words: '150–170 words',
    task: 'Write an article of 150–170 words for the P6-to-S1 Welcome Day webpage. Give three smart habits that can help new S1 pupils settle in. Explain how each habit helps and end with an encouraging message.',
    taskZh: '為小六升中迎新日網頁寫一篇 150–170 字文章，介紹三個能幫助中一新生適應的好習慣。說明每個習慣如何有幫助，並以鼓勵訊息作結。',
    model: `Three Smart Habits for a Calm Start

Starting secondary school may feel exciting and a little worrying. You will meet new teachers, find unfamiliar rooms and manage more homework. However, three simple habits can help you begin with confidence.

First, prepare the night before. Put your timetable, books and PE kit in your school bag. As a result, you will not have to search for important things in the morning. Second, write homework and deadlines in a planner. If you finish small tasks early, you will have more time to revise before tests. Finally, ask for help when you are unsure. You could speak to a form teacher, a classmate or a student helper instead of staying silent.

Nobody feels ready every minute during the first week. Nevertheless, being prepared, organised and willing to ask questions will make each day easier. Try one habit today, then add another next week. A calm start can lead to a confident first term.`,
    focus: [
      'Complete article task: audience, three habits, benefits and encouragement',
      'Clear progression: concern → three developed habits → motivating ending',
      'Purposeful language: future forms, conditionals, linkers and advice',
      'Precise transition vocabulary in an encouraging, suitable register'
    ],
    focusZh: [
      '完整回應文章任務：讀者、三個習慣、好處及鼓勵訊息',
      '清晰推進：顧慮 → 三個有發展的習慣 → 鼓勵結語',
      '有目的地運用未來式、條件句、連接詞和建議語言',
      '使用準確升中詞彙，保持鼓勵而合適的語氣'
    ],
    rubric: [
      { key: 'task', title: 'Task fulfilment · 4/4', titleZh: '切題與完整度 · 4/4', strong: 'Addresses the welcome-day webpage, gives three habits, explains every benefit and encourages the reader.', strongZh: '回應迎新日網頁情境，提出三個習慣，解釋每項好處並鼓勵讀者。' },
      { key: 'content', title: 'Development · 4/4', titleZh: '內容發展 · 4/4', strong: 'Develops each habit with a useful action and a realistic reason or result.', strongZh: '每個習慣均有實際行動，以及合理原因或結果。' },
      { key: 'organisation', title: 'Organisation · 4/4', titleZh: '組織與銜接 · 4/4', strong: 'Uses a relevant title, clear paragraphs, sequence linkers and a confident ending.', strongZh: '有合適標題、清晰段落、次序連接詞及有信心的結語。' },
      { key: 'accuracy', title: 'Accuracy · 4/4', titleZh: '語言準確度 · 4/4', strong: 'Controls verb forms, singular/plural nouns, punctuation and sentence boundaries.', strongZh: '正確運用動詞形式、單複數、標點和句子界線。' },
      { key: 'variety', title: 'Range · 4/4', titleZh: '詞彙與句式 · 4/4', strong: 'Uses precise school-transition vocabulary and varied sentence patterns for advice and results.', strongZh: '運用準確升中詞彙，以及表達建議和結果的多樣句式。' }
    ]
  };

  if (!Array.isArray(window.WRITING_MODELS)) return;
  if (!window.WRITING_MODELS.some((item) => item.id === modelId)) window.WRITING_MODELS.push(model);

  window.WRITING_MODEL_SUPPORT ||= {};
  window.WRITING_MODEL_SUPPORT[modelId] = {
    mistakes: [
      { bad: 'Secondary school is exciting. It is scary. It has many homework.', better: 'Starting secondary school may feel exciting and a little worrying because pupils manage more homework.', tip: 'Join related ideas and use homework without a plural -s.', tipZh: '把相關意思連接起來，並注意 homework 不加複數 -s。' },
      { bad: 'You prepare bag yesterday night.', better: 'Prepare your school bag the night before so that you will not forget important things.', tip: 'For general advice, begin with a base verb and explain the helpful result.', tipZh: '提出一般建議時，以動詞原形開始，並說明有幫助的結果。' },
      { bad: 'If you finish small tasks early, you will have more time revise.', better: 'If you finish small tasks early, you will have more time to revise.', tip: 'Use to + base verb after have more time.', tipZh: 'have more time 後要用 to 加動詞原形。' }
    ],
    vocab: [
      { basic: 'new school', strong: 'secondary school / a new setting', zh: '中學／新環境' },
      { basic: 'write down work', strong: 'record homework and deadlines in a planner', zh: '在計劃簿記錄功課和截止日期' },
      { basic: 'ask people', strong: 'ask a form teacher or student helper for guidance', zh: '向班主任或學生助手尋求指引' }
    ],
    patterns: [
      { en: 'Starting [new stage] may feel [feeling], but [positive support].', zh: '開始［新階段］可能令人感到［感受］，但［正面支持］。' },
      { en: 'First, [advice]. As a result, [helpful result].', zh: '首先，［建議］。結果，［有幫助的結果］。' },
      { en: 'If you [condition], you will [positive result].', zh: '如果你［條件］，你便會［正面結果］。' },
      { en: 'Try [small action] today, then [next action] next week.', zh: '今天先嘗試［小行動］，下星期再［下一步行動］。' }
    ],
    task: 'Write two sentences giving one habit and one result for a new S1 pupil.',
    taskZh: '為一名中一新生寫兩句話，提出一個習慣和一個正面結果。'
  };

  window.WRITING_ERROR_QUIZZES ||= {};
  window.WRITING_ERROR_QUIZZES[modelId] = [
    { bad: 'Secondary school have more homework.', prompt: 'Choose the correct subject–verb agreement.', promptZh: '選出主謂一致正確的句子。', options: ['Secondary school have more homework.', 'Secondary school has more homework.', 'Secondary school having more homework.'], answer: 1, explanation: 'Secondary school is singular, so use has.', explanationZh: 'Secondary school 是單數，因此用 has。' },
    { bad: 'Prepare your bag yesterday night.', prompt: 'Choose the clearest time phrase for general advice.', promptZh: '選出最適合一般建議的時間片語。', options: ['Prepare your bag the night before.', 'Prepare your bag yesterday night.', 'Prepare your bag last night tomorrow.'], answer: 0, explanation: 'The night before gives general advice for the following school day.', explanationZh: 'the night before 用於上學日前一晚的一般建議。' },
    { bad: 'If you will finish tasks early, you will have more time.', prompt: 'Choose the correct likely-future conditional.', promptZh: '選出正確的將來可能條件句。', options: ['If you will finish tasks early, you will have more time.', 'If you finish tasks early, you will have more time.', 'If you finished tasks early, you have more time.'], answer: 1, explanation: 'Use present tense after if and will in the result clause.', explanationZh: 'if 後用現在式，結果子句用 will。' },
    { bad: 'You will have more time revise before tests.', prompt: 'Choose the correct verb pattern.', promptZh: '選出正確的動詞句式。', options: ['You will have more time revise before tests.', 'You will have more time to revise before tests.', 'You will have more time revises before tests.'], answer: 1, explanation: 'Use have more time + to + base verb.', explanationZh: '使用 have more time 加 to 加動詞原形。' }
  ];
})();
