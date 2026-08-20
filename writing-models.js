window.WRITING_RUBRIC = [
  { key: 'task', title: 'Task fulfilment', titleZh: '切題與完整度', strong: 'Answers the purpose, audience, format and every task point.', strongZh: '回應寫作目的、讀者、格式及所有題目要求。' },
  { key: 'content', title: 'Content development', titleZh: '內容發展', strong: 'Adds actions, reasons, feelings or examples instead of only listing ideas.', strongZh: '加入動作、理由、感受或例子，而非只列出想法。' },
  { key: 'organisation', title: 'Organisation', titleZh: '組織與銜接', strong: 'Uses a clear opening, logical paragraphs, linkers and an ending.', strongZh: '有清晰開首、合邏輯段落、連接詞及結語。' },
  { key: 'accuracy', title: 'Language accuracy', titleZh: '語言準確度', strong: 'Controls tense, verb forms, spelling, capital letters and punctuation.', strongZh: '正確運用時態、動詞、拼寫、大小寫及標點。' },
  { key: 'variety', title: 'Vocabulary & variety', titleZh: '詞彙與句式變化', strong: 'Uses suitable topic words and a mixture of simple and longer sentences.', strongZh: '運用合適主題詞彙，並結合簡短與較長句子。' }
];

window.WRITING_MODELS = [
  {
    id: 'p4-green-day', grade: 4, genre: 'Informal email', genreZh: '非正式電郵', title: 'Join Our Green Day', titleZh: '邀請朋友參加環保日', words: '80–100 words',
    task: 'Write an email to invite a friend to your school’s Green Day. Include the date, activities and what your friend should bring.',
    taskZh: '寫一封電郵邀請朋友參加學校環保日，交代日期、活動和朋友需要帶備的物品。',
    model: `To: Amy\nSubject: Join Our Green Day\n\nDear Amy,\n\nOur school is holding a Green Day this Friday, 14 June. I would love you to join me. The activity will begin at 3:30 p.m. in the playground.\n\nFirst, we will collect used paper and plastic bottles. Then, we will make useful things from the bottles, such as pencil holders. Our teachers will also teach us how to sort rubbish correctly.\n\nPlease bring one clean plastic bottle and a reusable water bottle. I think the day will be fun because we can help our school and learn something new together.\n\nHope to see you there!\n\nLove,\nKelly`,
    focus: ['Correct email format', 'All task points included', 'First / Then / because'],
    focusZh: ['電郵格式正確', '包含所有題目要求', '使用次序詞與原因']
  },
  {
    id: 'p4-wallet', grade: 4, genre: 'Picture story', genreZh: '看圖故事', title: 'The Lost Wallet', titleZh: '失物錢包', words: '100–120 words',
    task: 'Write a story about a pupil who finds and returns a lost wallet.',
    taskZh: '寫一個關於學生拾獲並歸還錢包的故事。',
    model: `Last Monday, Ben was walking home after school when he saw a brown wallet beside the bus stop. He picked it up and looked inside. There was some money, an identity card and a small photo of a girl.\n\nAt first, Ben wanted to wait near the bus stop. However, it was getting dark, so he decided to take the wallet to the school office. The secretary checked the name on the card and called Ms Lee, a teacher at the school.\n\nA few minutes later, Ms Lee arrived. She was very relieved because the wallet belonged to her. She thanked Ben warmly and said that he had done the right thing. Ben felt proud as he walked home. He learned that a small honest action could make a big difference.`,
    focus: ['Clear beginning, problem and ending', 'Past tense and feeling words', 'However / because for linking'],
    focusZh: ['開首、問題、結局清楚', '正確過去式與感受詞', '使用 However / because 銜接']
  },
  {
    id: 'p5-canteen', grade: 5, genre: 'Formal email', genreZh: '正式電郵', title: 'Ideas for a Better School Canteen', titleZh: '改善學校飯堂的建議', words: '100–120 words',
    task: 'Write an email to your principal suggesting two improvements to the school canteen. Give reasons for your ideas.',
    taskZh: '寫一封電郵給校長，提出兩項改善學校飯堂的建議，並說明理由。',
    model: `To: Principal Chan\nSubject: Ideas for a Better School Canteen\n\nDear Principal Chan,\n\nI am writing to suggest two ways to improve our school canteen. Last week, my class carried out a short survey. Many pupils said that they wanted healthier choices and less plastic waste.\n\nFirst, the canteen could sell a fruit-and-yoghurt cup at a reasonable price. It would give pupils a quick, healthy snack before after-school activities. Second, the school could offer a small discount to pupils who bring reusable cups. If more pupils used their own cups, fewer plastic cups would be thrown away.\n\nI hope you will consider these ideas. They could make our school healthier and cleaner.\n\nYours sincerely,\nChris Wong`,
    focus: ['Polite formal register', 'Two developed suggestions', 'Reason and likely result for each idea'],
    focusZh: ['使用禮貌正式語氣', '兩項具體發展的建議', '每項建議均有理由與結果']
  },
  {
    id: 'p5-rainy-helper', grade: 5, genre: 'Narrative', genreZh: '記敘文', title: 'A Rainy-Day Helper', titleZh: '雨天的小幫手', words: '120–140 words',
    task: 'Write a story about helping someone on a rainy day.',
    taskZh: '寫一個關於在雨天幫助別人的故事。',
    model: `Heavy rain was falling when Mia left the library one Saturday afternoon. She was hurrying towards the bus stop when she heard a child crying near a puddle. A little boy had dropped his homework folder, and the wind was blowing the worksheets across the wet ground.\n\nMia opened her umbrella over the papers and asked the boy to hold the folder. Then she picked up the worksheets carefully. A shopkeeper saw what had happened and gave her a few dry paper towels. Together, Mia and the boy dried the pages as well as they could.\n\nSoon, the boy’s mother arrived. She thanked Mia for staying with him instead of walking away. Although Mia missed the first bus, she did not mind. On the way home, she smiled because a difficult afternoon had ended with a kind action.`,
    focus: ['Vivid setting and problem', 'Past continuous with simple past', 'Reflection at the end'],
    focusZh: ['有畫面的場景與問題', '過去進行式配合過去式', '結尾加入反思']
  },
  {
    id: 'p6-study-corner', grade: 6, genre: 'Proposal', genreZh: '建議書', title: 'A Quiet Study Corner', titleZh: '寧靜自習角建議書', words: '130–150 words',
    task: 'Write a proposal to your principal suggesting how to create a quiet study corner at school.',
    taskZh: '寫一份建議書給校長，建議學校如何設立寧靜自習角。',
    model: `To: Principal Lee\nSubject: Proposal for a Quiet Study Corner\n\nDear Principal Lee,\n\nI am writing to propose a quiet study corner in the library. At present, some pupils find it difficult to complete reading or homework during recess because the playground and corridors are noisy. A small, well-organised study area would give them a calm place to work.\n\nFirst, two tables could be placed near the back windows of the library. They should be separated from the borrowing desk so that pupils are not interrupted. Second, the school could provide a simple sign which says, “Quiet study in progress.” Finally, a basket of dictionaries, reading books and revision cards could be prepared by the library helpers.\n\nThis project would not require expensive equipment, but it could benefit many pupils. If the corner is successful, it may also encourage more students to use the library responsibly. I hope the school will consider this proposal.\n\nYours faithfully,\nJamie Chan`,
    focus: ['Need, actions and benefits', 'Formal proposal structure', 'Passive voice, conditionals and persuasion'],
    focusZh: ['交代需要、行動和好處', '正式建議書結構', '運用被動語態、條件句與說服語言']
  },
  {
    id: 'p6-volunteer', grade: 6, genre: 'Magazine article', genreZh: '校刊文章', title: 'Small Acts, Stronger Community', titleZh: '小行動，強社區', words: '140–160 words',
    task: 'Write an article for the school magazine explaining why pupils should take part in volunteer service.',
    taskZh: '為校刊寫一篇文章，說明學生為何應參與義工服務。',
    model: `Small Acts, Stronger Community\n\nHave you ever helped someone and felt happier afterwards? Volunteer service is not only about giving time. It is also a chance to understand the people around us and discover what we can do well.\n\nFor example, pupils can read stories to younger children at a community centre, help elderly visitors use simple digital devices or collect useful items for families in need. These activities may seem small, but they can make daily life easier for others. At the same time, volunteers learn to communicate, solve problems and work as a team.\n\nSome pupils worry that they are too busy. However, even one morning each month can be meaningful. A class could begin with a simple project, such as making greeting cards for a care home or cleaning a nearby beach.\n\nLet us take one small action this term. When pupils serve others with care, they help to build a kinder and stronger community.`,
    focus: ['Engaging opening and direct address', 'Examples plus counterpoint', 'Strong call to action'],
    focusZh: ['吸引人的開首與直接提問', '加入例子與反方顧慮', '以有力呼籲作結']
  }
];


window.WRITING_MODEL_SUPPORT = {
  'p4-green-day': {
    mistakes: [
      { bad: 'Dear Amy, I invite you join Green Day.', better: 'Dear Amy, I would love you to join our Green Day.', tip: 'Use invite someone to join, or a friendly phrase such as I would love you to join.', tipZh: '使用 invite someone to join，或 I would love you to join 等友善邀請句式。' },
      { bad: 'We collect bottles yesterday.', better: 'We will collect used bottles on Friday.', tip: 'Use will for a planned future school event.', tipZh: '學校將舉行的活動要用 will 表達未來。' },
      { bad: 'It is fun. It is good.', better: 'I think the day will be enjoyable because we can help our school.', tip: 'Add one precise adjective and a reason.', tipZh: '加入一個準確形容詞和一個理由。' }
    ],
    vocab: [
      { basic: 'good', strong: 'enjoyable', zh: '有趣的、令人愉快的' },
      { basic: 'old bottles', strong: 'used plastic bottles', zh: '用過的塑膠瓶' },
      { basic: 'bring', strong: 'remember to bring', zh: '記得帶備' }
    ],
    patterns: [
      { en: 'Our school is holding [event] on [date].', zh: '我們的學校將於［日期］舉行［活動］。' },
      { en: 'First, we will [activity]. Then, we will [activity].', zh: '首先，我們會［活動］，然後我們會［活動］。' },
      { en: 'Please remember to bring [item] because [reason].', zh: '請記得帶備［物品］，因為［原因］。' }
    ],
    task: 'Write one invitation sentence using one stronger word and one pattern.', taskZh: '運用一個進階詞彙和一個句式，寫一句邀請句。'
  },
  'p4-wallet': {
    mistakes: [
      { bad: 'Ben find a wallet and give teacher.', better: 'Ben found a wallet and took it to the school office.', tip: 'Keep a finished story in the past tense and use a clear action verb.', tipZh: '完成的故事要保持過去式，並使用清楚的動作動詞。' },
      { bad: 'Then Ben waited. Then teacher came. Then Ben happy.', better: 'At first, Ben waited. A few minutes later, Ms Lee arrived, and Ben felt proud.', tip: 'Replace repeated Then with sequence linkers and a feeling.', tipZh: '以次序連接詞和感受詞取代重複的 Then。' },
      { bad: 'Ben was happy.', better: 'Ben felt proud because he had done the right thing.', tip: 'Give a precise feeling and explain why.', tipZh: '使用準確的感受詞，並交代理由。' }
    ],
    vocab: [
      { basic: 'find', strong: 'discover / find', zh: '發現／找到' },
      { basic: 'look', strong: 'look inside', zh: '往裡看' },
      { basic: 'happy', strong: 'relieved / proud', zh: '如釋重負／自豪的' }
    ],
    patterns: [
      { en: 'While [character] was [verb-ing], he/she saw [problem].', zh: '當［角色］正在［動作］時，他／她看見［問題］。' },
      { en: 'At first, [character] wanted to [action]. However, [reason], so...', zh: '起初［角色］想［動作］。然而，因為［原因］，所以……' },
      { en: 'In the end, [character] felt [feeling] because [reason].', zh: '最後，［角色］感到［感受］，因為［原因］。' }
    ],
    task: 'Rewrite a simple story ending with a feeling and a reason.', taskZh: '把一個簡單故事結局改寫為包含感受和理由的句子。'
  },
  'p5-canteen': {
    mistakes: [
      { bad: 'Hi Principal, our canteen is bad.', better: 'Dear Principal Chan, I am writing to suggest two ways to improve our school canteen.', tip: 'A formal email needs a respectful greeting and a clear purpose.', tipZh: '正式電郵需要禮貌稱呼和清楚寫作目的。' },
      { bad: 'Students need healthy food. It is good.', better: 'A fruit-and-yoghurt cup would give pupils a quick, healthy snack.', tip: 'Explain a specific benefit instead of making a vague claim.', tipZh: '說明具體好處，不要只作空泛評價。' },
      { bad: 'If pupils use cups, less cups throw away.', better: 'If more pupils used reusable cups, fewer plastic cups would be thrown away.', tip: 'Check plural nouns and make the condition-result link clear.', tipZh: '檢查複數名詞，並清楚連結條件和結果。' }
    ],
    vocab: [
      { basic: 'good food', strong: 'healthy choices', zh: '健康選擇' },
      { basic: 'a lot of rubbish', strong: 'less plastic waste', zh: '較少塑膠廢物' },
      { basic: 'cheap', strong: 'at a reasonable price', zh: '價格合理' }
    ],
    patterns: [
      { en: 'I am writing to suggest [number] ways to improve [place/service].', zh: '我寫信是想提出［數量］項改善［地方／服務］的建議。' },
      { en: 'First, [suggestion]. This would [benefit].', zh: '首先，［建議］。這會［好處］。' },
      { en: 'If [condition], [positive result].', zh: '如果［條件］，便會有［正面結果］。' }
    ],
    task: 'Write one formal suggestion and explain one likely benefit.', taskZh: '寫一項正式建議，並解釋一個可能帶來的好處。'
  },
  'p5-rainy-helper': {
    mistakes: [
      { bad: 'It rained. Mia went home. A boy cried.', better: 'Heavy rain was falling when Mia left the library.', tip: 'Combine background and action to create a setting.', tipZh: '把背景和動作結合，營造故事場景。' },
      { bad: 'Mia helped the boy. It was good.', better: 'Mia opened her umbrella over the papers and picked up the wet worksheets.', tip: 'Show the helpful actions instead of only saying helped.', tipZh: '展示幫助別人的動作，而不只是說 helped。' },
      { bad: 'The mother came. End.', better: 'Although Mia missed the first bus, she smiled because she had helped someone.', tip: 'End with a consequence and a reflection.', tipZh: '結尾要交代結果和反思。' }
    ],
    vocab: [
      { basic: 'rained a lot', strong: 'heavy rain was falling', zh: '正下著大雨' },
      { basic: 'walked fast', strong: 'hurried', zh: '匆忙趕路' },
      { basic: 'wet papers', strong: 'soaked worksheets', zh: '濕透的工作紙' }
    ],
    patterns: [
      { en: '[Background action] when [sudden action happened].', zh: '當［突然事情發生］時，［背景動作］正在進行。' },
      { en: 'Without waiting, [character] [helpful action].', zh: '沒有猶豫，［角色］［幫助行動］。' },
      { en: 'Although [small difficulty], [character] did not mind because [reflection].', zh: '雖然［小困難］，［角色］並不介意，因為［反思］。' }
    ],
    task: 'Create a two-sentence rainy-day setting and helpful action.', taskZh: '寫兩句包含雨天場景和幫助行動的句子。'
  },
  'p6-study-corner': {
    mistakes: [
      { bad: 'The school should make a quiet place.', better: 'I am writing to propose a quiet study corner in the library.', tip: 'State the proposal and location precisely at the beginning.', tipZh: '在開首準確交代建議和地點。' },
      { bad: 'Put tables there. It will be good.', better: 'Two tables could be placed near the back windows so that pupils are not interrupted.', tip: 'Give a practical action and explain its purpose.', tipZh: '提出實際行動並解釋目的。' },
      { bad: 'It is cheap and good for students.', better: 'The project would not require expensive equipment, but it could benefit many pupils.', tip: 'Use a more formal and persuasive tone.', tipZh: '使用較正式和具說服力的語氣。' }
    ],
    vocab: [
      { basic: 'quiet place', strong: 'calm study area', zh: '寧靜自習區' },
      { basic: 'make', strong: 'establish / create', zh: '設立／建立' },
      { basic: 'not expensive', strong: 'would not require expensive equipment', zh: '不需要昂貴設備' }
    ],
    patterns: [
      { en: 'I am writing to propose [project] because [need].', zh: '我寫信建議［項目］，因為［需要］。' },
      { en: '[Resource] could be [past participle] near [place] so that [benefit].', zh: '［資源］可被［過去分詞］於［地點］附近，讓［好處］。' },
      { en: 'If the project is successful, it may [positive result].', zh: '如果項目成功，可能會［正面結果］。' }
    ],
    task: 'Write one proposal action with a purpose, using could be + past participle.', taskZh: '用 could be + 過去分詞寫一項建議行動，並說明目的。'
  },
  'p6-volunteer': {
    mistakes: [
      { bad: 'Volunteer service is good.', better: 'Have you ever helped someone and felt happier afterwards?', tip: 'Use a title and an engaging question to draw readers in.', tipZh: '使用標題和吸引人的問題，引起讀者興趣。' },
      { bad: 'Volunteers help people. It is important.', better: 'Pupils can read to younger children or help elderly visitors use digital devices.', tip: 'Develop your argument with specific examples.', tipZh: '用具體例子發展論點。' },
      { bad: 'Everyone should volunteer. Bye.', better: 'Let us take one small action this term and build a kinder community.', tip: 'Finish an article with a strong call to action.', tipZh: '以有力的行動呼籲結束文章。' }
    ],
    vocab: [
      { basic: 'help people', strong: 'support others', zh: '支援他人' },
      { basic: 'old people', strong: 'elderly visitors', zh: '長者訪客' },
      { basic: 'good', strong: 'meaningful / valuable', zh: '有意義的／有價值的' }
    ],
    patterns: [
      { en: 'Have you ever [question] and [feeling/result]?', zh: '你曾否［問題］並［感受／結果］？' },
      { en: 'For example, pupils can [action], [action] or [action].', zh: '例如，學生可以［行動］、［行動］或［行動］。' },
      { en: 'Although some pupils [concern], even [small action] can [positive result].', zh: '雖然有些學生［顧慮］，即使［小行動］也能［正面結果］。' },
      { en: 'Let us [call to action] so that [community benefit].', zh: '讓我們［行動呼籲］，讓［社區好處］。' }
    ],
    task: 'Write a final call to action for an article about your community.', taskZh: '為一篇關於社區的文章寫一個行動呼籲結尾。'
  }
};
