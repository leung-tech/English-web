window.S1_BRIDGE_GRAMMAR = {
  id: 's1-school-life-routines',
  title: 'S1 Bridge: School Life and Routines',
  titleZh: '中一銜接：校園生活與日常作息',
  notice: 'Original S1 foundation practice. It builds accurate grammar through familiar school-life texts; it is not an official examination paper.',
  noticeZh: '原創中一基礎練習：透過熟悉的校園生活文本建立準確文法，並非官方試卷。',
  focus: [
    'subject–verb agreement', 'articles and countability', 'time and place prepositions',
    'simple present versus present continuous', 'because / so / although', 'modals for school rules'
  ],
  questions: [
    {
      id: 's1-sr-01',
      contextTitle: 'Welcome Morning Notice',
      context: 'Welcome to Harbour View Secondary School. All new S1 students must collect an ID card in the Hall at 8:15 a.m. Please bring one passport photo and your registration slip. The class teacher will take the group to Room 1A after the welcome talk.',
      prompt: 'Choose the correct sentence about the notice.',
      promptZh: '選出關於通告的正確句子。',
      options: ['Every new student must collect an ID card.', 'Every new students must collect an ID card.', 'Every new student must collects an ID card.', 'Every new student collecting an ID card.'],
      answer: 0,
      explanation: 'Every new student is singular, so use must + the base verb collect.',
      explanationZh: 'Every new student 是單數，must 後要用原形動詞 collect。',
      hint: 'After must, use the base form of the verb. 看到 must，後面用動詞原形。'
    },
    {
      id: 's1-sr-02',
      contextTitle: 'Welcome Morning Notice',
      context: 'Welcome to Harbour View Secondary School. All new S1 students must collect an ID card in the Hall at 8:15 a.m. Please bring one passport photo and your registration slip. The class teacher will take the group to Room 1A after the welcome talk.',
      prompt: 'Which phrase correctly completes the instruction? “Please bring _____ passport photo.”',
      promptZh: '哪個詞語能正確完成指示？「請帶一張護照相片。」',
      options: ['one passport photo', 'a passport photos', 'an passport photo', 'many passport photo'],
      answer: 0,
      explanation: 'One is followed by a singular countable noun: one passport photo.',
      explanationZh: 'one 後面接可數名詞單數：one passport photo。',
      hint: 'Check whether the noun means one item or more than one. 看名詞表示一件還是多件。'
    },
    {
      id: 's1-sr-03',
      contextTitle: 'Welcome Morning Notice',
      context: 'Welcome to Harbour View Secondary School. All new S1 students must collect an ID card in the Hall at 8:15 a.m. Please bring one passport photo and your registration slip. The class teacher will take the group to Room 1A after the welcome talk.',
      prompt: 'Complete the time phrase: “The session begins _____ 8:15 a.m.”',
      promptZh: '完成時間詞語：「活動在上午八時十五分開始。」',
      options: ['at', 'on', 'in', 'by'],
      answer: 0,
      explanation: 'Use at for an exact clock time: at 8:15 a.m.',
      explanationZh: '表示確實鐘點時用 at：at 8:15 a.m.。',
      hint: 'Exact clock times normally use at. 確實鐘點一般配 at。'
    },
    {
      id: 's1-sr-04',
      contextTitle: 'Welcome Morning Notice',
      context: 'Welcome to Harbour View Secondary School. All new S1 students must collect an ID card in the Hall at 8:15 a.m. Please bring one passport photo and your registration slip. The class teacher will take the group to Room 1A after the welcome talk.',
      prompt: 'Choose the best connector: “The teacher will take the group to Room 1A _____ the welcome talk ends.”',
      promptZh: '選出最合適的連接詞：「歡迎講座結束後，老師會帶全組到 1A 課室。」',
      options: ['after', 'because', 'but', 'although'],
      answer: 0,
      explanation: 'After shows the sequence of two events: the talk ends first, then the group goes to Room 1A.',
      explanationZh: 'after 表示事件先後：講座先結束，然後全組到 1A 課室。',
      hint: 'Look for a word that shows which event happens first. 找出表示先後次序的詞。'
    },
    {
      id: 's1-sr-05',
      contextTitle: 'My Weekday Routine',
      context: 'I usually wake up at 6:30 because my bus leaves at 7:20. On Mondays and Thursdays, I stay after school for badminton practice. This week, our team is preparing for the inter-class match, so we are using the sports hall every afternoon.',
      prompt: 'Choose the correct verb: “My bus _____ at 7:20 every weekday.”',
      promptZh: '選出正確動詞：「我的巴士平日早上七時二十分開出。」',
      options: ['leaves', 'leave', 'is leaving', 'left'],
      answer: 0,
      explanation: 'A timetable or routine uses the simple present. One bus leaves at 7:20.',
      explanationZh: '時間表或習慣用簡單現在式；一架巴士用 leaves。',
      hint: 'Every weekday is a routine clue. every weekday 是習慣提示。'
    },
    {
      id: 's1-sr-06',
      contextTitle: 'My Weekday Routine',
      context: 'I usually wake up at 6:30 because my bus leaves at 7:20. On Mondays and Thursdays, I stay after school for badminton practice. This week, our team is preparing for the inter-class match, so we are using the sports hall every afternoon.',
      prompt: 'Choose the correct sentence about this week.',
      promptZh: '選出描述「本星期」的正確句子。',
      options: ['Our team is preparing for a match this week.', 'Our team prepare for a match this week.', 'Our team are prepare for a match this week.', 'Our team prepared for a match this week every day.'],
      answer: 0,
      explanation: 'This week describes a temporary current activity, so use is preparing.',
      explanationZh: 'this week 表示暫時正在進行的活動，因此用 is preparing。',
      hint: 'For a current temporary activity, look for be + verb-ing. 暫時正在進行的活動常用 be + 動詞-ing。'
    },
    {
      id: 's1-sr-07',
      contextTitle: 'My Weekday Routine',
      context: 'I usually wake up at 6:30 because my bus leaves at 7:20. On Mondays and Thursdays, I stay after school for badminton practice. This week, our team is preparing for the inter-class match, so we are using the sports hall every afternoon.',
      prompt: 'Choose the correct preposition: “Badminton practice is _____ Mondays and Thursdays.”',
      promptZh: '選出正確介詞：「羽毛球練習在星期一和星期四舉行。」',
      options: ['on', 'at', 'in', 'from'],
      answer: 0,
      explanation: 'Use on with days of the week: on Mondays and Thursdays.',
      explanationZh: '星期幾前用 on：on Mondays and Thursdays。',
      hint: 'Days and dates usually use on. 星期與日期一般用 on。'
    },
    {
      id: 's1-sr-08',
      contextTitle: 'My Weekday Routine',
      context: 'I usually wake up at 6:30 because my bus leaves at 7:20. On Mondays and Thursdays, I stay after school for badminton practice. This week, our team is preparing for the inter-class match, so we are using the sports hall every afternoon.',
      prompt: 'Choose the best word: “I wake up early _____ my bus leaves at 7:20.”',
      promptZh: '選出最合適的詞：「我早起，因為我的巴士在七時二十分開出。」',
      options: ['because', 'so', 'although', 'or'],
      answer: 0,
      explanation: 'Because introduces the reason for waking up early.',
      explanationZh: 'because 引出早起的原因。',
      hint: 'Ask: Does the second idea give a reason or a result? 問一問：後半句是原因還是結果？'
    },
    {
      id: 's1-sr-09',
      contextTitle: 'Library Helper Email',
      context: 'Dear Library Helpers, Our library opens at 7:45 a.m. and closes at 4:30 p.m. There are many new graphic novels this month, but there is not much space on the display shelf. Each helper has one ten-minute duty before lunch. Please return books to the correct shelves.',
      prompt: 'Choose the correct sentence: “There _____ many new graphic novels this month.”',
      promptZh: '選出正確句子：「這個月有很多新的圖像小說。」',
      options: ['are', 'is', 'has', 'have'],
      answer: 0,
      explanation: 'Graphic novels is plural, so use there are.',
      explanationZh: 'graphic novels 是複數，因此用 there are。',
      hint: 'Count the noun after there is / there are. 看 there is / there are 後面名詞的單複數。'
    },
    {
      id: 's1-sr-10',
      contextTitle: 'Library Helper Email',
      context: 'Dear Library Helpers, Our library opens at 7:45 a.m. and closes at 4:30 p.m. There are many new graphic novels this month, but there is not much space on the display shelf. Each helper has one ten-minute duty before lunch. Please return books to the correct shelves.',
      prompt: 'Choose the correct phrase: “There is not _____ space on the display shelf.”',
      promptZh: '選出正確詞語：「展示書架上沒有很多空間。」',
      options: ['much', 'many', 'a few', 'several'],
      answer: 0,
      explanation: 'Space is uncountable, so use much in this negative sentence.',
      explanationZh: 'space 是不可數名詞，否定句中用 much。',
      hint: 'Can you count the noun one by one? Space cannot be counted one by one. 這個名詞能逐件數嗎？space 不能。'
    },
    {
      id: 's1-sr-11',
      contextTitle: 'Library Helper Email',
      context: 'Dear Library Helpers, Our library opens at 7:45 a.m. and closes at 4:30 p.m. There are many new graphic novels this month, but there is not much space on the display shelf. Each helper has one ten-minute duty before lunch. Please return books to the correct shelves.',
      prompt: 'Choose the correct verb: “Each helper _____ one ten-minute duty.”',
      promptZh: '選出正確動詞：「每位小幫手有一次十分鐘的當值。」',
      options: ['has', 'have', 'having', 'are having'],
      answer: 0,
      explanation: 'Each helper refers to one person, so the verb is has.',
      explanationZh: 'Each helper 指一個人，因此動詞用 has。',
      hint: 'Each + singular noun takes a singular verb. each + 單數名詞配單數動詞。'
    },
    {
      id: 's1-sr-12',
      contextTitle: 'Library Helper Email',
      context: 'Dear Library Helpers, Our library opens at 7:45 a.m. and closes at 4:30 p.m. There are many new graphic novels this month, but there is not much space on the display shelf. Each helper has one ten-minute duty before lunch. Please return books to the correct shelves.',
      prompt: 'Which correction is best?',
      promptZh: '哪一個改正最恰當？',
      options: ['Please return the books to the correct shelves.', 'Please return the books at the correct shelves.', 'Please return the books in the correct shelves.', 'Please return the books for the correct shelves.'],
      answer: 0,
      explanation: 'Return something to a place or person. Here, books go to the correct shelves.',
      explanationZh: 'return something to a place 表示把某物歸還到某處；這裡是把書放回正確書架。',
      hint: 'Think about movement towards a destination. 想想物件移動到目的地。'
    },
    {
      id: 's1-sr-13',
      contextTitle: 'Canteen Survey Cloze',
      context: 'Read this survey message: “Our canteen (1) _____ two lunch lines. The hot-food line is usually busy, (2) _____ the sandwich line moves more quickly. This month, the Student Council (3) _____ opinions from S1 students. Please complete the form (4) _____ Friday.”',
      prompt: 'Complete blank (1): “Our canteen _____ two lunch lines.”',
      promptZh: '完成空格 (1)：「我們的飯堂有兩條午餐隊伍。」',
      options: ['has', 'have', 'is having', 'had'],
      answer: 0,
      explanation: 'The canteen is one place, so use has in the simple present.',
      explanationZh: 'canteen 是單數，因此簡單現在式用 has。',
      hint: 'Find the singular subject: our canteen. 找出單數主語：our canteen。'
    },
    {
      id: 's1-sr-14',
      contextTitle: 'Canteen Survey Cloze',
      context: 'Read this survey message: “Our canteen (1) _____ two lunch lines. The hot-food line is usually busy, (2) _____ the sandwich line moves more quickly. This month, the Student Council (3) _____ opinions from S1 students. Please complete the form (4) _____ Friday.”',
      prompt: 'Complete blank (2): “The hot-food line is usually busy, _____ the sandwich line moves more quickly.”',
      promptZh: '完成空格 (2)：「熱食隊伍通常很繁忙，但三文治隊伍移動得較快。」',
      options: ['but', 'because', 'so', 'and'],
      answer: 0,
      explanation: 'But introduces a contrast between the two lunch lines.',
      explanationZh: 'but 用來對比兩條午餐隊伍的情況。',
      hint: 'Are the two ideas similar or different? 兩個意思是相同還是對比？'
    },
    {
      id: 's1-sr-15',
      contextTitle: 'Canteen Survey Cloze',
      context: 'Read this survey message: “Our canteen (1) _____ two lunch lines. The hot-food line is usually busy, (2) _____ the sandwich line moves more quickly. This month, the Student Council (3) _____ opinions from S1 students. Please complete the form (4) _____ Friday.”',
      prompt: 'Complete blank (3): “This month, the Student Council _____ opinions from S1 students.”',
      promptZh: '完成空格 (3)：「這個月，學生會正在收集 S1 學生的意見。」',
      options: ['is collecting', 'collect', 'are collecting', 'collected'],
      answer: 0,
      explanation: 'This month describes a current temporary project. The Student Council is singular, so use is collecting.',
      explanationZh: 'this month 表示目前暫時進行的計劃；Student Council 視為單數，因此用 is collecting。',
      hint: 'Use the time clue and check whether the subject is singular. 同時看時間提示和主語單複數。'
    },
    {
      id: 's1-sr-16',
      contextTitle: 'Canteen Survey Cloze',
      context: 'Read this survey message: “Our canteen (1) _____ two lunch lines. The hot-food line is usually busy, (2) _____ the sandwich line moves more quickly. This month, the Student Council (3) _____ opinions from S1 students. Please complete the form (4) _____ Friday.”',
      prompt: 'Complete blank (4): “Please complete the form _____ Friday.”',
      promptZh: '完成空格 (4)：「請在星期五前完成表格。」',
      options: ['by', 'on', 'at', 'from'],
      answer: 0,
      explanation: 'By Friday means no later than Friday.',
      explanationZh: 'by Friday 表示不遲於星期五。',
      hint: 'The phrase gives a deadline, not the day of an event. 這是截止日期，不是活動在某天舉行。'
    }
  ]
};


window.S1_BRIDGE_WRITING = {
  writing: [
    {
      id:'s1-bw01',
      title:'School writing starter: Reply to your class teacher',
      titleZh:'校園寫作起步：回覆班主任',
      minWords:70,
      prompt:'Write a 70–90 word email reply to your class teacher. Thank the teacher for the welcome message, explain one thing you need to check about your first-week timetable, and say one action you will take before Friday. Use a polite opening and closing.',
      promptZh:'寫一封 70–90 字電郵回覆班主任。感謝老師的歡迎訊息，解釋你需要核對第一週時間表的一件事，並說明你會在星期五前採取的一項行動。使用有禮開首及結尾。',
      sourcePack:[
        ['Situation · 情境','The welcome notice says that students should return a club-choice form by Friday, but you are unsure whether the music club meets on Monday or Thursday.'],
        ['Audience and purpose · 受眾與目的','Write respectfully to a teacher and ask one clear question.'],
        ['Useful words · 有用詞彙','Dear Ms Lee; Thank you for…; Could you please confirm…?; I will…; Kind regards.']
      ],
      plan:[
        ['Opening · 開首','Greet the teacher and thank her for the welcome message.'],
        ['Question · 問題','Explain one timetable point you need to check.'],
        ['Action and closing · 行動及結尾','Say what you will do before Friday and close politely.']
      ],
      languageBank:['Dear Ms Lee,','Thank you for…','Could you please confirm whether…?','I will return… by Friday.','Kind regards,'],
      model:'Dear Ms Lee,\n\nThank you for the welcome message. I would like to check whether the music club meets on Monday or Thursday because I want to complete my club-choice form correctly. Could you please confirm the day? I will return the form by Friday.\n\nKind regards,\nAlex',
      selfCheck:'I used a polite greeting and closing, asked one clear timetable question and stated one action. This original S1 practice supports school communication; it is not an official examination task.'
    },
    {
      id:'s1-bw02',
      title:'School writing starter: Notice about a room change',
      titleZh:'校園寫作起步：課室更改通告',
      minWords:70,
      prompt:'Write a 70–90 word class notice. The science activity will move from Room 1A to the library because Room 1A is being cleaned. Include the date and time, the new place, one item students should bring, and one clear instruction. Use a simple heading.',
      promptZh:'寫一則 70–90 字班級通告。科學活動因 1A 課室清潔，將由 1A 改到圖書館。包括日期和時間、新地點、學生應帶的一項物品，以及一項清晰指示。使用簡單標題。',
      sourcePack:[
        ['Facts to include · 必須資料','Thursday, 3:30 p.m.; library; notebook; arrive five minutes early.'],
        ['Purpose · 目的','Help classmates find the right place and prepare for the activity.'],
        ['Useful words · 有用詞彙','NOTICE; will take place; instead; please bring; arrive by; Thank you.']
      ],
      plan:[
        ['Heading and key facts · 標題與重要資料','Give a clear heading, then state date, time and new place.'],
        ['Reason and preparation · 原因與準備','Explain the room change and name one item to bring.'],
        ['Instruction · 指示','End with one direct but polite instruction.']
      ],
      languageBank:['NOTICE','The activity will take place…','instead of…','Please bring…','Please arrive…','Thank you.'],
      model:'NOTICE\n\nThe science activity will take place in the library at 3:30 p.m. on Thursday instead of Room 1A because Room 1A is being cleaned. Please bring your notebook for the activity. Please arrive five minutes early so that we can begin on time.\n\nThank you.',
      selfCheck:'I included a heading, all key facts, a reason, one preparation item and a clear instruction. This original S1 practice supports practical school writing; it is not an official examination task.'
    }
  ]
};
