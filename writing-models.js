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
