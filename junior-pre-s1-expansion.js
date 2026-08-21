/* Original P1–P3 game expansion and Pre-S1-style English readiness practice. Not an official paper. */
(() => {
  const bank = window.QUESTION_BANK_EXPANSION ||= {};
  const add = (key, grade, items) => {
    bank[key] ||= {};
    bank[key][grade] ||= [];
    bank[key][grade].push(...items);
  };

  // P1: letter sounds, rhyme, CVC vowel awareness and one-step listening instructions.
  add('juniorGame', 1, [
    ['ship', 'Which sound starts the word?', '哪個聲音是這個字的開首？', ['sh', 'ch', 'th', 'ph'], 0, 'Ship starts with the /sh/ sound.', 'ship 的開首聲音是 /sh/。'],
    ['fish', 'Which sound ends the word?', '哪個聲音是這個字的結尾？', ['sh', 'm', 't', 'p'], 0, 'Fish ends with the /sh/ sound.', 'fish 的結尾聲音是 /sh/。'],
    ['cake', 'Which word rhymes with cake?', '哪個字和 cake 押韻？', ['lake', 'cat', 'sun', 'bed'], 0, 'Cake and lake end with the same /ake/ sound.', 'cake 和 lake 都以 /ake/ 聲音結尾。'],
    ['map', 'Which sound is in the middle of map?', 'map 的中間聲音是甚麼？', ['a', 'e', 'i', 'o'], 0, 'The middle sound in map is /a/.', 'map 的中間聲音是 /a/。'],
    ['The green frog is on the log.', 'Where is the frog?', '青蛙在哪裡？', ['On the log', 'In the bag', 'Under the bed', 'At school'], 0, 'The frog is on the log.', '青蛙在木頭上。'],
    ['I can see six kites in the sky.', 'How many kites can you hear about?', '你聽到多少個風箏？', ['Six', 'Four', 'Five', 'Seven'], 0, 'The speaker can see six kites.', '說話者看見六個風箏。'],
    ['Touch your nose, then clap two times.', 'What should you do after touching your nose?', '摸鼻子後應做甚麼？', ['Clap two times', 'Open a book', 'Sit down', 'Draw a kite'], 0, 'The instruction says to clap two times after touching your nose.', '指令說摸鼻子後拍掌兩次。'],
    ['A pig is big. A hen is red.', 'Which word rhymes with pig?', '哪個字和 pig 押韻？', ['big', 'hen', 'red', 'hat'], 0, 'Pig and big end with the same /ig/ sound.', 'pig 和 big 都以 /ig/ 聲音結尾。']
  ]);
  add('juniorListening', 1, [
    ['Put the blue book in your bag, please.', 'Which book should you put in your bag?', ['The blue book', 'The red book', 'The green pen', 'The yellow hat'], 'The instruction says to put the blue book in the bag.', '你應把哪一本書放進書包？', '指令說把藍色的書放進書包。'],
    ['Mia has one red apple and two yellow bananas.', 'How many bananas does Mia have?', ['Two', 'One', 'Three', 'Four'], 'Mia has two yellow bananas.', 'Mia 有多少條香蕉？', 'Mia 有兩條黃色的香蕉。'],
    ['The small cat is sleeping under the table.', 'What is the cat doing?', ['Sleeping', 'Running', 'Eating', 'Reading'], 'The cat is sleeping under the table.', '小貓正在做甚麼？', '小貓正在桌子下睡覺。'],
    ['It is time for music. Please take out your drum.', 'What lesson is it time for?', ['Music', 'Maths', 'Art', 'PE'], 'The speaker says it is time for music.', '現在是甚麼課堂時間？', '說話者說現在是音樂課時間。'],
    ['Ben wears his raincoat because it is wet outside.', 'Why does Ben wear a raincoat?', ['It is wet outside.', 'He is going to sleep.', 'He has a new ball.', 'It is very hot.'], 'Ben wears a raincoat because it is wet outside.', 'Ben 為甚麼穿雨衣？', '因為外面很濕／下雨。'],
    ['The bus is coming. Hold my hand and wait behind the line.', 'What should the child do?', ['Hold a hand and wait behind the line.', 'Run into the road.', 'Sit on the bus roof.', 'Drop a bag.'], 'The child should hold a hand and wait behind the line.', '小朋友應怎樣做？', '應牽著手並在黃線後等候。']
  ]);

  // P2: common consonant blends, vowel teams, syllables and short daily-life listening exchanges.
  add('juniorGame', 2, [
    ['train', 'Which sound starts the word?', '哪個聲音是這個字的開首？', ['tr', 'dr', 'fr', 'br'], 0, 'Train starts with the /tr/ sound.', 'train 的開首聲音是 /tr/。'],
    ['rain', 'Which letters make the long /ai/ sound?', '哪組字母發出長 /ai/ 音？', ['ai', 'ee', 'oa', 'oo'], 0, 'In rain, ai makes the long /ai/ sound.', 'rain 裡的 ai 發出長 /ai/ 音。'],
    ['sunset', 'How many beats can you hear in sunset?', 'sunset 有多少個音節？', ['Two', 'One', 'Three', 'Four'], 0, 'Sun-set has two beats.', 'sun-set 有兩個音節。'],
    ['The clock is near the door.', 'What is near the door?', '甚麼在門旁邊？', ['The clock', 'The desk', 'The train', 'The lunchbox'], 0, 'The clock is near the door.', '時鐘在門旁邊。'],
    ['Please pack your lunchbox before the trip.', 'What should you pack?', '你應收拾甚麼？', ['Your lunchbox', 'A football', 'A drum', 'A pillow'], 0, 'The instruction says to pack a lunchbox.', '指令說要收拾午餐盒。'],
    ['I have a black and white rabbit.', 'What animal does the speaker have?', '說話者有甚麼動物？', ['A rabbit', 'A parrot', 'A turtle', 'A fish'], 0, 'The speaker has a rabbit.', '說話者有一隻兔子。'],
    ['The boat floats slowly on the water.', 'Which word has the long /oa/ sound?', '哪個字有長 /oa/ 音？', ['boat', 'bat', 'bed', 'bus'], 0, 'Boat has the long /oa/ sound.', 'boat 有長 /oa/ 音。'],
    ['First, wash your hands. Then, sit at the table.', 'What should you do first?', '首先應做甚麼？', ['Wash your hands', 'Sit at the table', 'Read a book', 'Open the door'], 0, 'First means wash your hands.', 'first 表示先洗手。']
  ]);
  add('juniorListening', 2, [
    ['The library opens at nine o’clock. We can borrow books after that.', 'When does the library open?', ['At 9:00', 'At 8:00', 'At 10:00', 'At 12:00'], 'The library opens at nine o’clock.', '圖書館幾時開門？', '圖書館九時開門。'],
    ['Dad is cooking noodles in the kitchen. I am setting the table.', 'What is the speaker doing?', ['Setting the table', 'Cooking noodles', 'Reading a comic', 'Walking to school'], 'The speaker says, “I am setting the table.”', '說話者正在做甚麼？', '說話者正在擺放餐桌。'],
    ['Our class will visit the fire station on Thursday. Please wear your school uniform.', 'What should pupils wear?', ['Their school uniform', 'A swimsuit', 'A raincoat only', 'Pyjamas'], 'Pupils should wear their school uniform.', '學生應穿甚麼？', '學生應穿校服。'],
    ['The playground is wet, so the football match is in the hall today.', 'Where is the football match today?', ['In the hall', 'On the playground', 'At the market', 'In the library'], 'The match is in the hall because the playground is wet.', '今天足球比賽在哪裡進行？', '因為操場濕了，比賽在禮堂進行。'],
    ['My sister has a toothache, so Mum is taking her to the dentist.', 'Who will see the dentist?', ['The speaker’s sister', 'Mum', 'The teacher', 'The bus driver'], 'The speaker’s sister has a toothache.', '誰會去看牙醫？', '說話者的姐姐／妹妹牙痛。'],
    ['The number 12 bus stops outside the post office.', 'Where does the number 12 bus stop?', ['Outside the post office', 'At the swimming pool', 'Behind the library', 'Inside the school'], 'The bus stops outside the post office.', '12 號巴士在哪裡停？', '巴士在郵局外停車。']
  ]);

  // P3: blends, long-vowel patterns, time clues, sequencing and short story listening.
  add('juniorGame', 3, [
    ['bright', 'Which sound starts the word?', '哪個聲音是這個字的開首？', ['br', 'bl', 'gr', 'cr'], 0, 'Bright starts with the /br/ sound.', 'bright 的開首聲音是 /br/。'],
    ['beach', 'Which letters make the long /ee/ sound?', '哪組字母發出長 /ee/ 音？', ['ea', 'ai', 'oa', 'ou'], 0, 'In beach, ea makes the long /ee/ sound.', 'beach 裡的 ea 發出長 /ee/ 音。'],
    ['play', 'Which word rhymes with play?', '哪個字和 play 押韻？', ['day', 'dog', 'bed', 'sun'], 0, 'Play and day end with the same /ay/ sound.', 'play 和 day 都以 /ay/ 音結尾。'],
    ['Last night, I watched a film with my family.', 'When did the speaker watch a film?', '說話者甚麼時候看電影？', ['Last night', 'Tomorrow morning', 'Every lunchtime', 'Next week'], 0, 'The time clue is last night.', '時間提示是 last night。'],
    ['First, Jay drew the poster. Next, he added the title. Finally, he showed it to the class.', 'What did Jay do after drawing the poster?', 'Jay 畫完海報後做了甚麼？', ['He added the title.', 'He showed it to the class.', 'He went home.', 'He bought a new poster.'], 0, 'Next, Jay added the title.', '接著 Jay 加上了標題。'],
    ['The brave crab crossed the bridge.', 'Which word begins with the /br/ sound?', '哪個字以 /br/ 音開首？', ['brave', 'crab', 'crossed', 'bridge'], 0, 'Brave begins with /br/.', 'brave 以 /br/ 音開首。'],
    ['We heard thunder, so we went indoors quickly.', 'Why did the group go indoors?', '大家為甚麼進入室內？', ['They heard thunder.', 'They wanted to swim.', 'They were late for lunch.', 'They lost a book.'], 0, 'They went indoors because they heard thunder.', '因為聽到雷聲，所以他們進入室內。'],
    ['The coach said, “Bring a bottle of water and meet at the gate at eight.”', 'What should pupils bring?', '學生應帶甚麼？', ['A bottle of water', 'A football', 'A lunch tray', 'A computer'], 0, 'The coach asks pupils to bring a bottle of water.', '教練請學生帶一瓶水。']
  ]);
  add('juniorListening', 3, [
    ['Yesterday, our class helped to sort paper and plastic after lunch. We felt proud because the playground was cleaner.', 'Why did the class feel proud?', ['The playground was cleaner.', 'They bought new toys.', 'They missed the bus.', 'They finished a race.'], 'They felt proud because the playground was cleaner.', '同學為甚麼感到自豪？', '因為操場變得更整潔。'],
    ['Leo forgot his umbrella, so his friend May shared hers when they walked to the MTR station.', 'What did May do?', ['She shared her umbrella.', 'She bought a train ticket.', 'She went home alone.', 'She lost her bag.'], 'May shared her umbrella with Leo.', 'May 做了甚麼？', 'May 和 Leo 共用雨傘。'],
    ['The school notice says that the art competition entries must be handed in by Friday afternoon.', 'When must pupils hand in their entries?', ['By Friday afternoon', 'On Monday morning', 'After the holiday', 'At midnight'], 'The entries are due by Friday afternoon.', '學生最遲何時交作品？', '最遲在星期五下午交。'],
    ['During the museum visit, the guide asked pupils not to touch the old objects. Instead, they could draw them in a notebook.', 'What could pupils do instead of touching objects?', ['Draw them in a notebook', 'Take them home', 'Clean them with water', 'Put them in bags'], 'The guide says pupils could draw the objects in a notebook.', '除了觸摸物件外，學生可以做甚麼？', '學生可以把物件畫在筆記簿裡。'],
    ['After the basketball game, Mira was tired but cheerful because her team had worked together well.', 'How did Mira feel after the game?', ['Tired but cheerful', 'Angry and bored', 'Hungry and worried', 'Sleepy and lonely'], 'The speaker says Mira was tired but cheerful.', 'Mira 比賽後感覺怎樣？', 'Mira 感到疲倦但很高興。'],
    ['Sam looked at the timetable and chose the earlier bus because he wanted to arrive at the library before the storytelling session started.', 'Why did Sam choose the earlier bus?', ['He wanted to arrive before storytelling started.', 'He wanted a longer journey.', 'The later bus was full of books.', 'He was going to the market.'], 'Sam wanted to arrive at the library before the storytelling session.', 'Sam 為甚麼選擇較早的巴士？', '他想在故事時間開始前到達圖書館。']
  ]);

  // Original readiness practice inspired by P6-to-S1 language demands. It is not an official Education Bureau paper.
  window.PRE_S1_ENGLISH_MOCK = {
    id: 'pre-s1-english-readiness',
    title: 'Pre-S1 English readiness mock',
    titleZh: '中一入學前英語銜接模擬',
    notice: 'Original practice for P6 learners. It is not an official Education Bureau test paper.',
    noticeZh: '本單元為小六學生而設的原創練習，並非教育局官方試卷。',
    questions: [
      {
        id: 'listen-school-club', section: 'Section A · Listening', sectionZh: '甲部 · 聆聽', route: 'listen',
        audioText: 'Attention, P6 pupils. The Secondary School Open Day will begin at ten o’clock this Saturday. Please meet your group leader in the school hall at quarter to ten. You will visit three activity rooms, so bring a pencil to complete the short activity sheet. Parents may join the tour at eleven thirty.',
        prompt: 'Where should pupils meet their group leader?', promptZh: '學生應在哪裡與小組組長集合？', options: ['In the school hall', 'At the school gate', 'In the library', 'In an activity room'], answer: 0,
        explanation: 'The notice asks pupils to meet their group leader in the school hall.', explanationZh: '通告要求學生在學校禮堂與小組組長集合。', scriptTitle: 'Open Day announcement', scriptTitleZh: '開放日廣播', hint: 'Preview the question, then listen for the place. 先看題目，再聽地點。'
      },
      {
        id: 'listen-school-club-time', section: 'Section A · Listening', sectionZh: '甲部 · 聆聽', route: 'listen',
        audioText: 'Attention, P6 pupils. The Secondary School Open Day will begin at ten o’clock this Saturday. Please meet your group leader in the school hall at quarter to ten. You will visit three activity rooms, so bring a pencil to complete the short activity sheet. Parents may join the tour at eleven thirty.',
        prompt: 'Why should pupils bring a pencil?', promptZh: '學生為甚麼應帶備鉛筆？', options: ['To complete an activity sheet', 'To draw a school map', 'To write to their parents', 'To buy a ticket'], answer: 0,
        explanation: 'Pupils need a pencil to complete the short activity sheet.', explanationZh: '學生需要鉛筆完成簡短的活動紙。', scriptTitle: 'Open Day announcement', scriptTitleZh: '開放日廣播', hint: 'Listen for the action connected with the pencil. 留意鉛筆用來做甚麼。'
      },
      {
        id: 'listen-community-project', section: 'Section A · Listening', sectionZh: '甲部 · 聆聽', route: 'listen',
        audioText: 'Mina: Our class wants to help at the community centre next month. Ken: That sounds useful. What will you do there? Mina: We will organise a board-game afternoon for younger children and make large-print signs for elderly visitors. Ken: When will the activity take place? Mina: On the first Sunday of the month, from two until four.',
        prompt: 'Who will benefit from the large-print signs?', promptZh: '大字體標誌會幫助誰？', options: ['Elderly visitors', 'Only teachers', 'Bus drivers', 'The school principal'], answer: 0,
        explanation: 'Mina says the signs are for elderly visitors.', explanationZh: 'Mina 說大字體標誌是為長者訪客而設。', scriptTitle: 'Community-centre dialogue', scriptTitleZh: '社區中心對話', hint: 'Listen for the person connected with the signs. 留意誰與標誌有關。'
      },
      {
        id: 'read-email-purpose', section: 'Section B · Reading', sectionZh: '乙部 · 閱讀', route: 'read',
        passage: { title: 'Email · A study-group invitation', text: 'To: Class 6A\nFrom: Ms Lee\nSubject: English study group\n\nDear pupils,\n\nSeveral pupils have asked for extra practice before secondary school. From next Tuesday, I will run a short English study group in Room 305 after school. We will read one information text, discuss useful vocabulary and complete a quick editing task each week. Please bring a notebook and tell me by Monday if you would like to join. The group is not only for pupils who find English difficult; it is also for anyone who wants to practise sharing ideas clearly.\n\nBest wishes,\nMs Lee' },
        prompt: 'What is the main purpose of Ms Lee’s email?', promptZh: 'Ms Lee 發出這封電郵的主要目的為何？', options: ['To invite pupils to an English study group', 'To announce a new classroom rule', 'To sell English notebooks', 'To describe a school trip'], answer: 0,
        explanation: 'Ms Lee gives the time, place and activities of a new study group and asks pupils to reply if they want to join.', explanationZh: 'Ms Lee 說明新學習小組的時間、地點和活動，並請有興趣的學生回覆。', hint: 'Identify why the writer gives these practical details. 找出作者提供這些實用資料的目的。'
      },
      {
        id: 'read-email-inference', section: 'Section B · Reading', sectionZh: '乙部 · 閱讀', route: 'read',
        passage: { title: 'Email · A study-group invitation', text: 'To: Class 6A\nFrom: Ms Lee\nSubject: English study group\n\nDear pupils,\n\nSeveral pupils have asked for extra practice before secondary school. From next Tuesday, I will run a short English study group in Room 305 after school. We will read one information text, discuss useful vocabulary and complete a quick editing task each week. Please bring a notebook and tell me by Monday if you would like to join. The group is not only for pupils who find English difficult; it is also for anyone who wants to practise sharing ideas clearly.\n\nBest wishes,\nMs Lee' },
        prompt: 'Which pupil is the study group designed for?', promptZh: '這個學習小組為哪類學生而設？', options: ['Any pupil who wants to improve English communication', 'Only pupils with the highest marks', 'Only pupils who find English difficult', 'Pupils who do not bring notebooks'], answer: 0,
        explanation: 'Ms Lee says the group is for pupils who need support and for anyone who wants to share ideas clearly.', explanationZh: 'Ms Lee 說小組既適合需要支援的學生，也適合想清楚表達想法的任何學生。', hint: 'Use the final sentence to infer the intended group. 利用最後一句推論適合參加的人。'
      },
      {
        id: 'read-report-main-idea', section: 'Section B · Reading', sectionZh: '乙部 · 閱讀', route: 'read',
        passage: { title: 'Information report · A quieter canteen', text: 'The Student Council recently asked pupils how the school canteen could become a more comfortable place at lunchtime. Many pupils enjoyed the food but said that the noise made it hard to talk with friends. The council first suggested adding more tables, but the survey showed that space was limited. Instead, the school tested a quieter queueing system and placed simple signs reminding pupils to return trays carefully. After two weeks, teachers noticed fewer long queues and pupils reported that the canteen felt calmer. The council will collect more comments before deciding whether to make the changes permanent.' },
        prompt: 'What problem was the Student Council trying to solve?', promptZh: '學生會想解決甚麼問題？', options: ['The canteen was too noisy at lunchtime.', 'The canteen had no food.', 'Pupils had too much homework.', 'There were no school trips.'], answer: 0,
        explanation: 'The report says that many pupils found it hard to talk because of the noise in the canteen.', explanationZh: '報告說很多學生因餐廳噪音而難以與朋友交談。', hint: 'Look for the problem stated near the start of the report. 尋找報告開首提出的問題。'
      },
      {
        id: 'read-report-evidence', section: 'Section B · Reading', sectionZh: '乙部 · 閱讀', route: 'read',
        passage: { title: 'Information report · A quieter canteen', text: 'The Student Council recently asked pupils how the school canteen could become a more comfortable place at lunchtime. Many pupils enjoyed the food but said that the noise made it hard to talk with friends. The council first suggested adding more tables, but the survey showed that space was limited. Instead, the school tested a quieter queueing system and placed simple signs reminding pupils to return trays carefully. After two weeks, teachers noticed fewer long queues and pupils reported that the canteen felt calmer. The council will collect more comments before deciding whether to make the changes permanent.' },
        prompt: 'What evidence suggests that the test was helpful?', promptZh: '哪項證據顯示試行措施有幫助？', options: ['There were fewer long queues and the canteen felt calmer.', 'The school added more tables.', 'Pupils stopped eating lunch.', 'The council made the changes permanent immediately.'], answer: 0,
        explanation: 'The report gives two results after the test: fewer long queues and a calmer canteen.', explanationZh: '報告列出試行後的兩個結果：較少長龍及餐廳更寧靜。', hint: 'Find the results reported after the two-week test. 找出兩星期試行後的結果。'
      },
      {
        id: 'language-present-perfect', section: 'Section C · Language use', sectionZh: '丙部 · 語言運用', route: 'language',
        prompt: 'Choose the best sentence.', promptZh: '選出最佳句子。', options: ['I have already completed the application form.', 'I have already complete the application form.', 'I already have complete the application form.', 'I has already completed the application form.'], answer: 0,
        explanation: 'Use have + past participle: have completed.', explanationZh: '現在完成式要用 have 加過去分詞：have completed。', hint: 'Check the form after have. 留意 have 後的動詞形式。'
      },
      {
        id: 'language-conditional', section: 'Section C · Language use', sectionZh: '丙部 · 語言運用', route: 'language',
        prompt: 'Choose the best sentence.', promptZh: '選出最佳句子。', options: ['If we leave now, we will arrive before the talk starts.', 'If we will leave now, we will arrive before the talk starts.', 'If we left now, we will arrive before the talk starts.', 'If we leave now, we arrived before the talk starts.'], answer: 0,
        explanation: 'For a real future possibility, use present tense after if and will in the result.', explanationZh: '表示真實的未來可能時，if 後用現在式，結果用 will。', hint: 'Find the verb after if. 檢查 if 後的動詞。'
      },
      {
        id: 'language-passive', section: 'Section C · Language use', sectionZh: '丙部 · 語言運用', route: 'language',
        prompt: 'Choose the best sentence.', promptZh: '選出最佳句子。', options: ['The posters were designed by the Art Club.', 'The posters was designed by the Art Club.', 'The posters were design by the Art Club.', 'The posters designed by the Art Club.'], answer: 0,
        explanation: 'Posters is plural, so use were + designed.', explanationZh: 'posters 是複數，所以用 were 加 designed。', hint: 'Check whether the subject is singular or plural. 檢查主語是單數還是複數。'
      },
      {
        id: 'language-linker', section: 'Section C · Language use', sectionZh: '丙部 · 語言運用', route: 'language',
        prompt: 'Choose the best connector: “The activity was challenging; ______, the group completed it on time.”', promptZh: '選出最佳連接詞：「活動很具挑戰性；____，小組仍準時完成。」', options: ['however', 'because', 'so', 'if'], answer: 0,
        explanation: 'However shows a contrast between the difficulty and the successful result.', explanationZh: 'however 表示活動具挑戰性與成功完成之間的轉折。', hint: 'Decide whether the two ideas agree or contrast. 判斷兩個意思是相同還是轉折。'
      },
      {
        id: 'writing-welcome-day', section: 'Section D · Writing', sectionZh: '丁部 · 寫作', route: 'write',
        prompt: 'Your new secondary school will hold a Welcome Day for P6 pupils. Write 80–100 words for the school website to explain one activity that would help new pupils feel prepared. Include what pupils will do, why the activity is useful and one practical detail.', promptZh: '你的新中學將為小六學生舉辦迎新日。為學校網站寫 80–100 字，介紹一項能幫助新生作好準備的活動。包括學生會做甚麼、活動為何有用，以及一項實用詳情。',
        explanation: 'This is a self-checked writing task. After drafting, use the plan and checklist to improve content, organisation and language; no automatic content mark is given.', explanationZh: '這是自我檢查寫作題。完成草稿後，利用計劃和檢查表改善內容、組織和語言；系統不會自動評核內容。',
        writingTask: { target: '80–100 words', minWords: 50, plan: [['Purpose · 目的', 'Introduce one Welcome Day activity. · 介紹一項迎新日活動。'], ['Content · 內容', 'Say what pupils will do and why it helps. · 說明學生會做甚麼及其幫助。'], ['Practical detail · 實用詳情', 'Add a time, place, helper or item to bring. · 加入時間、地點、協助者或需帶備物品。'], ['Check · 檢查', 'Use paragraphs, linkers and accurate verb forms. · 使用段落、連接詞和正確動詞形式。']] },
        hint: 'Plan before you write: purpose → activity → reason → practical detail. 先規劃：目的 → 活動 → 理由 → 實用詳情。'
      }
    ]
  };
})();
