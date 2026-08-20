/* Hong Kong learning cycles: original P1–P6 content for repeat practice across the four skills. */
(() => {
  const bank = window.QUESTION_BANK_EXPANSION ||= {};
  const add = (key, grade, items) => {
    bank[key] ||= {};
    bank[key][grade] ||= [];
    bank[key][grade].push(...items);
  };

  // Shared language-use expansion: Hong Kong school, transport, community and environment contexts.
  add('words', 1, ['ferry', 'ticket', 'harbour', 'garden', 'seed', 'water']);
  add('words', 2, ['station', 'platform', 'map', 'helmet', 'market', 'rainy']);
  add('words', 3, ['country park', 'trail', 'ranger', 'stream', 'rubbish bin', 'careful']);
  add('words', 4, ['neighbourhood', 'collection', 'heritage', 'traffic', 'reduce', 'volunteer']);
  add('words', 5, ['preparedness', 'shelter', 'route', 'reliable', 'survey', 'resource']);
  add('words', 6, ['accessibility', 'initiative', 'consultation', 'sustainable', 'priority', 'participation']);

  add('grammar', 1, [
    ['Choose the correct sentence.', ['The ferry is at the pier.', 'The ferry are at the pier.', 'The ferry am at the pier.', 'The ferry be at the pier.'], 'Use is with one ferry.', '選出正確句子。', '一艘渡輪用 is。'],
    ['Choose the correct sentence.', ['I can water the seed.', 'I can waters the seed.', 'I can watering the seed.', 'I can to water the seed.'], 'After can, use the base verb water.', '選出正確句子。', 'can 後要用動詞原形 water。']
  ]);
  add('grammar', 2, [
    ['Choose the correct sentence.', ['There are three people on the platform.', 'There is three people on the platform.', 'There are three person on the platform.', 'There be three people on the platform.'], 'Use are and people for more than one person.', '選出正確句子。', '多於一人要用 are 和 people。'],
    ['Choose the correct sentence.', ['Mum is buying fruit at the market now.', 'Mum are buying fruit at the market now.', 'Mum buying fruit at the market now.', 'Mum buys fruit at the market now.'], 'Now signals an action happening at this moment: is buying.', '選出正確句子。', 'now 表示正在進行的動作，要用 is buying。']
  ]);
  add('grammar', 3, [
    ['Choose the correct sentence.', ['We walked carefully on the country-park trail.', 'We walk carefully on the country-park trail yesterday.', 'We walked careful on the country-park trail.', 'We were walk carefully on the country-park trail.'], 'The walk is finished, so use walked. Carefully describes how the class walked.', '選出正確句子。', '已完成的步行用 walked；carefully 描述怎樣步行。'],
    ['Choose the correct sentence.', ['The stream is cleaner than the drain.', 'The stream is clean than the drain.', 'The stream is more clean than the drain.', 'The stream cleaner than the drain.'], 'For the short adjective clean, use cleaner when comparing two things.', '選出正確句子。', '比較兩樣事物時，短形容詞 clean 變成 cleaner。']
  ]);
  add('grammar', 4, [
    ['Choose the correct sentence.', ['Our class is going to collect old books on Friday.', 'Our class are going to collect old books on Friday.', 'Our class going to collect old books on Friday.', 'Our class is going collect old books on Friday.'], 'A class is one group, so use is going to.', '選出正確句子。', '一班同學視為一個群體，要用 is going to。'],
    ['Choose the correct sentence.', ['Plastic bottles should be placed in the blue bin.', 'Plastic bottles should be place in the blue bin.', 'Plastic bottles should placed in the blue bin.', 'Plastic bottles should be placing in the blue bin.'], 'After should be, use the past participle placed.', '選出正確句子。', 'should be 後要用過去分詞 placed。']
  ]);
  add('grammar', 5, [
    ['Choose the correct sentence.', ['The school has used this safety route since September.', 'The school has used this safety route for September.', 'The school used this safety route since September.', 'The school has use this safety route since September.'], 'Use since with a starting point such as September.', '選出正確句子。', 'since 後接開始時間，例如 September。'],
    ['Choose the correct sentence.', ['If the rain gets heavier, we will stay at the shelter.', 'If the rain will get heavier, we will stay at the shelter.', 'If the rain got heavier, we will stay at the shelter.', 'If the rain gets heavier, we stayed at the shelter.'], 'Use present tense after if and will in the result.', '選出正確句子。', '第一類條件句：if 後用現在式，結果用 will。']
  ]);
  add('grammar', 6, [
    ['Choose the correct sentence.', ['The survey results were discussed at the meeting.', 'The survey results was discussed at the meeting.', 'The survey results were discuss at the meeting.', 'The survey results discussed at the meeting.'], 'Plural results take were + past participle.', '選出正確句子。', '複數 results 要用 were 加過去分詞。'],
    ['Choose the correct sentence.', ['If I were on the committee, I would improve the ramp.', 'If I was on the committee, I will improve the ramp.', 'If I were on the committee, I will improve the ramp.', 'If I am on the committee, I would improve the ramp.'], 'For an imagined situation, use if I were and I would.', '選出正確句子。', '假設情況要用 if I were 和 I would。']
  ]);

  add('reading', 1, [
    { title: 'A Ferry Ride', text: 'On Sunday, Ming goes on a ferry with Dad. They buy two tickets at the pier. Ming looks at the blue water and the tall buildings. At the end of the ride, he waves at the ferry driver.', questions: [
      ['Who goes on the ferry with Ming?', ['Dad', 'His teacher', 'His sister', 'A doctor'], 'Ming goes on a ferry with Dad.', '明和誰乘搭渡輪？', '明和爸爸一起乘搭渡輪。'],
      ['What does Ming look at?', ['The blue water', 'A football field', 'A yellow bus', 'A classroom'], 'Ming looks at the blue water and the tall buildings.', '明看著甚麼？', '明看著藍色的海水和高樓。']
    ] },
    { title: 'Our Small Garden', text: 'Class 1B has a small garden near the hall. Amy puts a seed in the soil. Ken gives it water every morning. After two weeks, they see a little green plant. The class is happy.', questions: [
      ['Where is the small garden?', ['Near the hall', 'On the ferry', 'At the market', 'Under a desk'], 'The garden is near the hall.', '小花園在哪裡？', '小花園在禮堂附近。'],
      ['Who gives the seed water?', ['Ken', 'Amy', 'The driver', 'Dad'], 'Ken gives the seed water every morning.', '誰為種子澆水？', 'Ken 每天早上為種子澆水。']
    ] }
  ]);
  add('reading', 2, [
    { title: 'At the MTR Station', text: 'On Friday, Ella goes to the museum with her class. At the MTR station, she follows her teacher and stands behind the yellow line. Ella checks the station map before the train arrives. She feels excited about the visit.', questions: [
      ['Where is Ella going?', ['To the museum', 'To the beach', 'To the hospital', 'To the market'], 'Ella is going to the museum with her class.', 'Ella 要到哪裡？', 'Ella 和同學到博物館。'],
      ['What does Ella check?', ['The station map', 'A recipe', 'Her lunch tray', 'A storybook'], 'Ella checks the station map.', 'Ella 查看甚麼？', 'Ella 查看車站地圖。']
    ] },
    { title: 'A Market List', text: 'Mum and Leo go to the wet market on Saturday. They buy fish, tomatoes and oranges. Leo carries the light bag and Mum carries the heavy bag. At home, they wash the fruit before lunch.', questions: [
      ['What does Leo carry?', ['The light bag', 'The heavy bag', 'A bicycle', 'A school desk'], 'Leo carries the light bag.', 'Leo 拿著甚麼？', 'Leo 拿著輕的袋子。'],
      ['What do they wash at home?', ['The fruit', 'The train', 'The platform', 'The helmet'], 'They wash the fruit before lunch.', '他們在家洗甚麼？', '他們午餐前清洗水果。']
    ] }
  ]);
  add('reading', 3, [
    { title: 'The Country Park Map', text: 'Class 3D visited a country park on Tuesday. A ranger showed the pupils a map before they started walking. The map had a blue trail to a waterfall and a red trail to a picnic area. The class chose the blue trail because they wanted to hear the water. Everyone put rubbish in a bin before going home.', questions: [
      ['Why did the class choose the blue trail?', ['They wanted to hear the water.', 'It was closer to school.', 'It had a market.', 'They wanted to buy tickets.'], 'The blue trail led to a waterfall, so the class chose it to hear the water.', '為甚麼同學選擇藍色路線？', '藍色路線通往瀑布，他們想聽水聲。'],
      ['What can we infer about the class?', ['They cared for the park.', 'They got lost on the trail.', 'They did not listen to the ranger.', 'They wanted to stay overnight.'], 'They used a rubbish bin before leaving, which shows care for the park.', '從文章可推論同學怎樣？', '他們離開前把垃圾放進垃圾桶，表示他們愛護郊野公園。']
    ] },
    { title: 'A Kind Bus Driver', text: 'After school, Nora waited for a bus in the rain. When the bus arrived, the driver opened the door and waited for an elderly man with a walking stick. Nora moved her bag so the man could sit down. The driver thanked Nora before the bus left the stop.', questions: [
      ['Why did the driver wait?', ['An elderly man needed time to get on.', 'The bus was empty.', 'Nora had lost a ticket.', 'It was time for lunch.'], 'The driver waited for an elderly man with a walking stick.', '司機為甚麼等候？', '一位拿著拐杖的長者需要時間上車。'],
      ['Why did the driver thank Nora?', ['She made space for the man.', 'She drove the bus.', 'She bought a new bag.', 'She found a map.'], 'Nora moved her bag so the man could sit down.', '司機為甚麼感謝 Nora？', 'Nora 移開書包讓長者坐下。']
    ] }
  ]);
  add('reading', 4, [
    { title: 'Neighbourhood Eco Fair', text: 'The Community Centre will hold an Eco Fair next Saturday from 10 a.m. to 1 p.m. Visitors can bring clean plastic bottles, old books and small working toys to exchange. There will also be a repair table where volunteers will mend loose buttons and simple broken items. Families should bring their own reusable bags.', questions: [
      ['Which item can visitors bring to exchange?', ['Old books', 'Hot food', 'School uniforms only', 'Wet umbrellas'], 'The notice lists old books as an item for exchange.', '訪客可帶哪一項物品交換？', '通告列出舊書可供交換。'],
      ['Why should families bring reusable bags?', ['To carry exchanged items without using new plastic bags.', 'To repair buttons.', 'To enter the hall early.', 'To borrow a library book.'], 'The fair focuses on reducing waste, so reusable bags help families carry items without using new plastic bags.', '為甚麼家庭應帶備環保袋？', '活動著重減少廢物，環保袋可用來攜帶交換物品而不用新膠袋。']
    ] },
    { title: 'A Heritage Walk', text: 'P4 pupils joined a heritage walk in their district. Their guide showed them an old clock tower, a former market building and a street with small family shops. Before the visit, pupils had read short information cards. During the walk, they took notes about how the area had changed. Afterwards, each group made a poster for the school corridor.', questions: [
      ['What did pupils do during the walk?', ['They took notes about changes in the area.', 'They bought new clocks.', 'They cleaned the market.', 'They practised for Sports Day.'], 'The passage says pupils took notes during the walk.', '同學在步行參觀期間做了甚麼？', '文章說同學在途中記錄地區的改變。'],
      ['What was the purpose of the poster?', ['To share what the groups had learned.', 'To sell family-shop products.', 'To give directions to the market.', 'To collect clock parts.'], 'The poster was made after the information-gathering visit, so it shares the groups’ learning.', '海報的目的為何？', '同學在收集資料後製作海報，目的是分享所學。']
    ] }
  ]);
  add('reading', 5, [
    { title: 'Rainy-Day Travel Plan', text: 'After checking the weather forecast, Class 5A changed its outdoor service plan. Heavy rain was expected in the afternoon, so the class arranged to visit the elderly centre in the morning and complete an indoor card-making activity after lunch. The teacher asked pupils to bring raincoats, keep their mobile phones charged and travel in small groups with adult helpers. The new plan was shared with families two days before the visit.', questions: [
      ['Why did the class change its plan?', ['Heavy rain was expected in the afternoon.', 'The elderly centre was closed forever.', 'Pupils had finished all their cards.', 'The class wanted a longer holiday.'], 'The forecast expected heavy rain in the afternoon.', '班別為甚麼更改計劃？', '天氣預報顯示下午預計有大雨。'],
      ['Which action shows good preparedness?', ['Sharing the new plan with families before the visit.', 'Ignoring the weather forecast.', 'Travelling alone without an adult.', 'Leaving phones uncharged.'], 'Sharing a clear plan early helps families prepare safely.', '哪個行動顯示良好準備？', '及早向家庭發放清楚計劃，有助大家安全準備。']
    ] },
    { title: 'The Water-Saving Survey', text: 'The Green Team surveyed pupils about water use at school. Most pupils said that they turned off taps after washing their hands, but some noticed dripping taps near the playground. The team measured the problem for one week and gave the principal a report. The report suggested repairing the taps and placing reminder stickers above sinks. In the following month, the school used less water than before.', questions: [
      ['What problem did some pupils notice?', ['Dripping taps near the playground', 'A broken school gate', 'Too many reading books', 'No rain in the city'], 'Some pupils noticed dripping taps near the playground.', '部分同學發現甚麼問題？', '他們發現操場附近有滴水的水龍頭。'],
      ['What evidence shows that the team’s suggestions helped?', ['The school used less water in the following month.', 'The team stopped measuring taps.', 'Pupils removed the stickers.', 'The principal left the school.'], 'Using less water after the changes is evidence that the suggestions helped.', '甚麼證據顯示建議有效？', '改變後下個月用水量減少，顯示建議有效。']
    ] }
  ]);
  add('reading', 6, [
    { title: 'A More Accessible Route', text: 'P6 pupils carried out a neighbourhood walk to find ways to make the route to their community centre easier for everyone. They noticed that one pavement was too narrow for a wheelchair and that a busy crossing had no clear warning sign. The group photographed the areas, spoke politely with local shopkeepers and wrote a proposal with two practical suggestions. They recommended a wider path beside the centre and a bright sign near the crossing. The group also explained that these improvements would help young children, elderly residents and people with disabilities.', questions: [
      ['What was the purpose of the neighbourhood walk?', ['To find ways to make a route easier for everyone.', 'To choose a new school uniform.', 'To sell photographs to shopkeepers.', 'To organise a sports competition.'], 'The first sentence states the purpose of the walk.', '社區步行考察的目的為何？', '首句說明考察旨在找出讓路線更方便所有人的方法。'],
      ['Why did the group give two practical suggestions?', ['They wanted the proposal to solve the problems they had observed.', 'They wanted to make the route longer.', 'They did not speak with any residents.', 'They only wanted to help shopkeepers.'], 'Their suggestions directly respond to the narrow pavement and unclear crossing.', '小組為甚麼提出兩項實際建議？', '建議直接回應他們觀察到的窄行人路和不清楚的過路提示。']
    ] },
    { title: 'The Shared Book Box', text: 'A youth group placed a weatherproof book box beside the community centre. Residents could take a book, leave a book or write a short recommendation on a card. At first, the box was used mostly by younger children. The group then asked a local author to visit and invited elderly residents to share stories about their favourite childhood books. Within two months, the book box contained books for different ages and the recommendation cards had become a popular way to choose a new title.', questions: [
      ['What changed after the group invited more people to join?', ['The book box offered books for different ages.', 'The community centre closed the box.', 'Only young children could use it.', 'Residents stopped writing cards.'], 'The passage says that the box later contained books for different ages.', '小組邀請更多人參與後有甚麼改變？', '文章說書箱後來有適合不同年齡的書籍。'],
      ['What is the writer’s purpose?', ['To show how a small initiative can encourage reading in a community.', 'To explain how to build a weatherproof box.', 'To compare two local authors.', 'To advertise a book shop.'], 'The passage focuses on how the shared book box grew into a useful community reading activity.', '作者的寫作目的為何？', '文章重點是共享書箱如何發展成有用的社區閱讀活動。']
    ] }
  ]);

  add('sentences', 1, ['The ferry is near the harbour.', 'I can water the small seed.']);
  add('sentences', 2, ['We wait behind the yellow line.', 'Mum is buying fruit at the market.']);
  add('sentences', 3, ['The ranger showed us a country-park map.', 'We put our rubbish in the bin.']);
  add('sentences', 4, ['Our class is going to collect old books.', 'Reusable bags should be brought to the fair.']);
  add('sentences', 5, ['The safety route has been used since September.', 'The Green Team gave the principal a useful report.']);
  add('sentences', 6, ['The accessibility survey was completed by P6 pupils.', 'If I were on the committee, I would improve the route.']);

  add('proofreading', 1, [['The ferry are at the pier.', 'The ferry is at the pier.'], ['I can waters the seed.', 'I can water the seed.']]);
  add('proofreading', 2, [['There is three people on the platform.', 'There are three people on the platform.'], ['Mum are buying fruit now.', 'Mum is buying fruit now.']]);
  add('proofreading', 3, [['We walk on the trail yesterday.', 'We walked on the trail yesterday.'], ['The stream is clean than the drain.', 'The stream is cleaner than the drain.']]);
  add('proofreading', 4, [['Our class are going to collect books.', 'Our class is going to collect books.'], ['Plastic bottles should be place in the blue bin.', 'Plastic bottles should be placed in the blue bin.']]);
  add('proofreading', 5, [['The school has used the route for September.', 'The school has used the route since September.'], ['If the rain will get heavier, we will stay inside.', 'If the rain gets heavier, we will stay inside.']]);
  add('proofreading', 6, [['The survey results was discussed yesterday.', 'The survey results were discussed yesterday.'], ['If I were on the committee, I will improve the ramp.', 'If I were on the committee, I would improve the ramp.']]);

  add('writing', 1, ['Write two sentences about a ferry ride. Include a colour or a place word.', 'Write two sentences about watering a class plant. Use I can or We can.']);
  add('writing', 2, ['Write three sentences about a class trip by MTR. Include a safety rule.', 'Write three sentences about buying healthy food at a market.']);
  add('writing', 3, ['Write a four-sentence diary entry about a country-park visit. Use first, then and finally.', 'Write a short story about helping an elderly passenger. Include how the person felt.']);
  add('writing', 4, ['Write a notice for a neighbourhood Eco Fair. Include the time, place and two items to bring.', 'Write a short report about a heritage walk in your district. Use past tense and sequence words.']);
  add('writing', 5, ['Write an 80-word safety message for pupils on a rainy day. Give clear advice and reasons.', 'Write a short report explaining how your school can save water. Include one finding and two suggestions.']);
  add('writing', 6, ['Write a proposal to improve an accessible route near your school. Include a problem, two suggestions and expected results.', 'Write a magazine article about a shared reading project in your community. Explain why pupils should join.']);

  add('speaking', 1, ['I go on a ferry with ____. I can see ____.', 'Our class plant is ____. We give it ____.']);
  add('speaking', 2, ['On a class trip, I stand behind ____. I look at ____.', 'At the market, I can buy ____. It is ____.']);
  add('speaking', 3, ['At the country park, I saw ____. I felt ____ because ____.', 'I can help an elderly passenger by ____.']);
  add('speaking', 4, ['Our neighbourhood can be greener if we ____.', 'At an Eco Fair, pupils should bring ____ because ____.']);
  add('speaking', 5, ['If heavy rain starts, pupils should ____ because ____.', 'Our school can save water by ____. One benefit is ____.']);
  add('speaking', 6, ['I would improve accessibility near our school by ____. This would help ____.', 'A community reading initiative should include ____ because ____.']);

  add('juniorListening', 1, [
    ['We are on the ferry. Please sit with your family and look at the harbour.', 'Where are the speakers?', ['On the ferry', 'At the library', 'In the classroom', 'At the market'], 'The speaker says they are on the ferry.', '說話者在哪裡？', '說話者說他們在渡輪上。'],
    ['Our class plant is small. Mia gives it water every day.', 'Who gives the plant water?', ['Mia', 'The driver', 'Dad', 'The ranger'], 'Mia gives the plant water every day.', '誰每天為植物澆水？', 'Mia 每天為植物澆水。']
  ]);
  add('juniorListening', 2, [
    ['At the station, please stand behind the yellow line and wait for the train.', 'Where should you stand?', ['Behind the yellow line', 'On the train roof', 'Under a chair', 'At the market'], 'The instruction says to stand behind the yellow line.', '你應站在哪裡？', '指示說站在黃線後面。'],
    ['Mum is buying tomatoes and oranges at the market.', 'What is Mum buying?', ['Tomatoes and oranges', 'Tickets and maps', 'Books and pens', 'Shoes and hats'], 'Mum is buying tomatoes and oranges.', '媽媽買了甚麼？', '媽媽買了番茄和橙。']
  ]);
  add('juniorListening', 3, [
    ['The ranger says, “Please stay on the trail and do not pick flowers.”', 'What should pupils do?', ['Stay on the trail', 'Pick flowers', 'Run into the stream', 'Leave rubbish'], 'The ranger asks pupils to stay on the trail.', '學生應做甚麼？', '護林員請學生留在小徑上。'],
    ['Nora moved her bag so an elderly man could sit down on the bus.', 'Why did Nora move her bag?', ['To make a seat for the man', 'To catch a train', 'To buy fruit', 'To carry a map'], 'She moved her bag so the man could sit down.', 'Nora 為甚麼移開書包？', '她移開書包讓長者坐下。']
  ]);

  add('juniorGame', 1, [
    ['ferry', 'Which sound starts the word?', '哪個聲音是這個字的開首？', ['f', 'b', 'm', 't'], 0, 'Ferry starts with /f/.', 'ferry 的開首聲音是 /f/。'],
    ['The seed is in the soil.', 'Where is the seed?', '種子在哪裡？', ['In the soil', 'On the ferry', 'Under a hat', 'At the station'], 0, 'The seed is in the soil.', '種子在泥土裡。']
  ]);
  add('juniorGame', 2, [
    ['platform', 'Which word did you hear?', '你聽到哪個字？', ['platform', 'plant', 'plane', 'playground'], 0, 'The word is platform.', '這個字是 platform。'],
    ['Please stand behind the yellow line.', 'Where should you stand?', '你應站在哪裡？', ['Behind the yellow line', 'In the train', 'On the map', 'At home'], 0, 'Stand behind the yellow line.', '站在黃線後面。']
  ]);
  add('juniorGame', 3, [
    ['trail', 'Which word did you hear?', '你聽到哪個字？', ['trail', 'train', 'tree', 'tray'], 0, 'The word is trail.', '這個字是 trail。'],
    ['The ranger showed us a map.', 'Who showed the class a map?', '誰向班別展示地圖？', ['The ranger', 'The bus driver', 'The doctor', 'The chef'], 0, 'The ranger showed the map.', '護林員展示地圖。']
  ]);

  add('juniorMatch', 1, [['ferry', 'a boat that carries people across water', '渡輪'], ['harbour', 'a place where boats come and go', '海港'], ['seed', 'a small thing that can grow into a plant', '種子']]);
  add('juniorMatch', 2, [['platform', 'the place where you wait for a train', '月台'], ['market', 'a place where people buy fresh food', '街市'], ['helmet', 'a hard hat that protects your head', '頭盔']]);
  add('juniorMatch', 3, [['ranger', 'a person who looks after a country park', '護林員'], ['trail', 'a path for walking in a park', '小徑'], ['stream', 'a small flow of water', '小溪']]);

  add('seniorListening', 4, [{
    id: 'p4-eco-fair-announcement', title: 'Neighbourhood Eco Fair announcement', titleZh: '社區環保市集廣播',
    script: 'The Neighbourhood Eco Fair will take place this Saturday at the Community Centre. Pupils can bring clean bottles, old books or working toys to exchange. Please arrive at ten o’clock with a reusable bag. Volunteers will also show families how to repair loose buttons and reuse simple materials.',
    questions: [
      { prompt: 'Where will the Eco Fair take place?', promptZh: '環保市集會在哪裡舉行？', options: ['At the Community Centre', 'At the MTR station', 'At the country park', 'At the school canteen'], answer: 0, explanation: 'The announcement says the fair will take place at the Community Centre.', explanationZh: '廣播說市集在社區中心舉行。' },
      { prompt: 'What should pupils bring?', promptZh: '學生應帶備甚麼？', options: ['A reusable bag', 'A sports uniform', 'A raincoat only', 'A library card'], answer: 0, explanation: 'Pupils should arrive with a reusable bag.', explanationZh: '學生應帶環保袋到場。' },
      { prompt: 'What will volunteers show families?', promptZh: '義工會向家庭示範甚麼？', options: ['How to repair and reuse simple items', 'How to cook lunch', 'How to drive a ferry', 'How to plant a forest'], answer: 0, explanation: 'Volunteers will show families how to repair loose buttons and reuse materials.', explanationZh: '義工會示範修補鬆脫鈕扣和重用簡單材料。' }
    ]
  }]);
  add('seniorListening', 5, [{
    id: 'p5-rainy-route-report', title: 'Rainy-day route radio report', titleZh: '雨天路線電台報導',
    script: 'The school has published a rainy-day route for pupils who walk home. When the rain becomes heavy, pupils should use the covered walkway beside the sports hall and wait with an adult at the school gate if necessary. The route avoids the low path near the stream. Families can check the school website for updates before three o’clock.',
    questions: [
      { prompt: 'Which route should pupils use in heavy rain?', promptZh: '大雨時學生應使用哪一條路線？', options: ['The covered walkway beside the sports hall', 'The low path near the stream', 'The running track', 'The car park exit'], answer: 0, explanation: 'The report tells pupils to use the covered walkway.', explanationZh: '報導指示學生使用體育館旁的有蓋通道。' },
      { prompt: 'Why should pupils avoid the low path?', promptZh: '學生為甚麼應避免低窪小徑？', options: ['It is not part of the safer rainy-day route.', 'It has more shops.', 'It is closer to the hall.', 'It is open only at noon.'], answer: 0, explanation: 'The report explains that the rainy-day route avoids the low path near the stream.', explanationZh: '報導說雨天路線避開溪流旁的低窪小徑。' },
      { prompt: 'Where can families find updates?', promptZh: '家庭可在哪裡查看最新消息？', options: ['On the school website', 'On a ferry ticket', 'At the market', 'In a storybook'], answer: 0, explanation: 'Families can check the school website for updates.', explanationZh: '家庭可在學校網站查看最新消息。' }
    ]
  }]);
  add('seniorListening', 6, [{
    id: 'p6-accessibility-forum', title: 'Accessibility forum report', titleZh: '無障礙論壇報導',
    script: 'At the school accessibility forum, P6 representatives shared the results of a neighbourhood walk. They found a narrow pavement near the community centre and an unclear crossing sign. The group proposed a wider path and brighter warning signs. The principal praised the pupils for collecting evidence before making recommendations and promised to share the proposal with the centre manager.',
    questions: [
      { prompt: 'What problem did pupils find near the community centre?', promptZh: '學生在社區中心附近發現甚麼問題？', options: ['A narrow pavement', 'A noisy library', 'A closed sports hall', 'An empty market'], answer: 0, explanation: 'The representatives found a narrow pavement near the centre.', explanationZh: '代表發現中心附近的行人路很窄。' },
      { prompt: 'What did the group propose?', promptZh: '小組提出甚麼建議？', options: ['A wider path and brighter signs', 'A new ferry route', 'A longer school day', 'A larger canteen'], answer: 0, explanation: 'They proposed a wider path and brighter warning signs.', explanationZh: '他們建議加闊通道及增設更明亮的警告標誌。' },
      { prompt: 'Why did the principal praise the pupils?', promptZh: '校長為甚麼稱讚學生？', options: ['They collected evidence before making recommendations.', 'They finished the walk quickly.', 'They bought new signs.', 'They avoided the forum.'], answer: 0, explanation: 'The principal praised the group for using evidence before making recommendations.', explanationZh: '校長稱讚小組先收集證據才提出建議。' }
    ]
  }]);

  add('flashcards', 4, [['exchange','交換','to give one thing and receive another','Families can exchange old books at the Eco Fair.'], ['repair','修補','to fix something that is broken','A volunteer can repair a loose button.'], ['heritage','文化遺產','buildings, stories or traditions from the past','The class learned about local heritage on the walk.']]);
  add('flashcards', 5, [['forecast','天氣預報','a report about future weather','We checked the forecast before the visit.'], ['preparedness','準備工作','being ready for a possible problem','A clear plan is part of rainy-day preparedness.'], ['dripping','滴水的','letting small drops of water fall','The team reported a dripping tap.']]);
  add('flashcards', 6, [['accessibility','無障礙便利性','how easy a place is for everyone to use','The survey focused on accessibility near the centre.'], ['evidence','證據','facts that support an idea','The pupils collected evidence before writing their proposal.'], ['initiative','倡議／主動行動','a new plan or action to solve a problem','The shared book box was a community reading initiative.']]);

  add('checks', 4, [
    ['hk-p4-check-1', 'The Eco Fair starts at ten o’clock at the Community Centre.', 'When does the Eco Fair start?', '環保市集幾時開始？', ['At 10:00', 'At 9:00', 'At 1:00', 'At 3:00'], 0, 'It starts at ten o’clock.', '市集在十時開始。'],
    ['hk-p4-check-2', 'Please bring a reusable bag to carry your exchanged items.', 'Why should families bring a reusable bag?', '家庭為甚麼應帶環保袋？', ['To carry exchanged items', 'To repair a button', 'To buy a ticket', 'To make a map'], 0, 'The bag is for carrying items from the exchange.', '環保袋用來攜帶交換物品。']
  ]);
  add('checks', 5, [
    ['hk-p5-check-1', 'In heavy rain, use the covered walkway beside the sports hall.', 'Which route should pupils use?', '學生應使用哪條路線？', ['The covered walkway', 'The low path', 'The running track', 'The stream path'], 0, 'The report recommends the covered walkway.', '報導建議使用有蓋通道。'],
    ['hk-p5-check-2', 'The Green Team measured dripping taps for one week.', 'What did the Green Team measure?', '環保小組量度了甚麼？', ['Dripping taps', 'Bus tickets', 'Book boxes', 'Sports scores'], 0, 'The team measured the dripping-tap problem.', '小組量度滴水水龍頭的問題。']
  ]);
  add('checks', 6, [
    ['hk-p6-check-1', 'The group proposed a wider path near the community centre.', 'What did the group propose?', '小組提出甚麼建議？', ['A wider path', 'A new uniform', 'A longer lunch break', 'A bus ticket'], 0, 'They proposed a wider path.', '他們建議加闊通道。'],
    ['hk-p6-check-2', 'Pupils collected evidence before they made recommendations.', 'What did pupils do before making recommendations?', '學生在提出建議前做了甚麼？', ['Collected evidence', 'Built a ferry', 'Closed a library', 'Started a race'], 0, 'They collected evidence first.', '他們先收集證據。']
  ]);

  add('roleplays', 4, [{
    id: 'p4-eco-fair-helper', title: 'Ask about an Eco Fair activity', titleZh: '詢問環保市集活動', goal: 'Ask a volunteer where to place an item and how the exchange works.', goalZh: '向義工詢問應把物品放在哪裡，以及交換如何進行。', roles: ['Pupil', 'Volunteer'],
    dialogue: [['A', 'Excuse me. Where should I put these old books?'], ['B', 'Please place them on the exchange table near the door.'], ['A', 'May I choose another book after that?'], ['B', 'Yes. You may take one book from the table.']],
    language: ['Excuse me.', 'Where should I put ...?', 'May I ...?', 'Please place ...'], selfCheck: 'I asked politely and used a clear question about the activity. · 我已禮貌提問並清楚詢問活動安排。'
  }]);
  add('roleplays', 5, [{
    id: 'p5-rainy-day-advice', title: 'Give rainy-day travel advice', titleZh: '提供雨天出行建議', goal: 'Ask about a safe route home and give one reason for the advice.', goalZh: '詢問安全回家路線，並為建議提供一個理由。', roles: ['Pupil', 'Teacher'],
    dialogue: [['A', 'What should we do if the rain becomes heavier?'], ['B', 'Use the covered walkway beside the sports hall.'], ['A', 'Why should we avoid the low path?'], ['B', 'It may become unsafe near the stream.']],
    language: ['What should we do if ...?', 'Why should we ...?', 'Use ...', 'It may become ...'], selfCheck: 'I asked for advice and gave a clear safety reason. · 我已詢問建議並提供清楚的安全理由。'
  }]);
  add('roleplays', 6, [{
    id: 'p6-accessibility-suggestion', title: 'Discuss an accessibility suggestion', titleZh: '討論無障礙建議', goal: 'Suggest one change to a local route and respond to a question about who it will help.', goalZh: '提出一項改善本地路線的建議，並回答它會幫助哪些人的問題。', roles: ['Student A', 'Student B'],
    dialogue: [['A', 'I suggest a brighter sign near the crossing.'], ['B', 'Who would this change help?'], ['A', 'It would help young children, elderly residents and visitors.'], ['B', 'That is a practical idea. We should include it in our proposal.']],
    language: ['I suggest ...', 'Who would ... help?', 'It would help ...', 'We should ...'], selfCheck: 'I made a practical suggestion and explained who would benefit. · 我已提出實際建議並解釋誰會受惠。'
  }]);

  add('advancedReading', 4, [{
    genre: 'Event notice', genreZh: '活動通告', title: 'Eco Fair Book Exchange',
    text: 'The school Eco Fair will be held in the covered playground on 12 October. Pupils may bring up to three clean storybooks that they have finished reading. Each book should have the pupil’s name inside. At the exchange desk, pupils will receive a token for every accepted book. They can use the tokens to choose different books after lunch. Please do not bring colouring books with missing pages or books that are too damaged to read.',
    questions: [
      ['What will pupils receive for each accepted book?', '每本被接受的書籍，學生會收到甚麼？', ['A token', 'A new bag', 'A lunch ticket', 'A library card'], 0, 'The notice says pupils will receive a token for every accepted book.', '通告說每本被接受的書可獲一個代幣。', ['receive a token for every accepted book', 'Pupils will receive a token for each accepted book.', 'Locate the instruction at the exchange desk.']],
      ['Why should pupils not bring badly damaged books?', '為甚麼學生不應帶來嚴重損壞的書？', ['They may be too damaged to read.', 'They are too expensive.', 'They cannot fit in a bag.', 'They belong to the teacher.'], 0, 'The final instruction says not to bring books that are too damaged to read.', '最後的指示說不要帶來損壞得無法閱讀的書。', ['too damaged to read', 'They should not bring them because other pupils need readable books.', 'Use the final rule to explain the reason.']]
    ]
  }]);
  add('advancedReading', 5, [{
    genre: 'Information report', genreZh: '資訊報告', title: 'Making Schools Ready for Heavy Rain',
    text: 'Heavy rain can affect the journey to and from school. A prepared school checks drains, keeps covered waiting areas clear and gives families accurate updates. Pupils also have a role. They should bring a raincoat when necessary, follow adults’ instructions and avoid flooded paths. After one rainy season, one school found that clear route maps helped pupils arrive more calmly because they knew where to wait and which entrances to use. Preparation cannot stop the rain, but it can reduce confusion and help everyone make safer choices.',
    questions: [
      ['What did the school find helpful after one rainy season?', '一個雨季後，學校發現甚麼有幫助？', ['Clear route maps', 'Longer lessons', 'More flooded paths', 'Fewer adult helpers'], 0, 'The report says clear route maps helped pupils arrive more calmly.', '報告說清晰的路線圖有助學生更安心地到校。', ['clear route maps helped pupils arrive more calmly', 'One helpful measure was providing clear route maps.', 'Look for the reported finding after the example school.']],
      ['Which sentence best states the main idea?', '哪一句最能概括主旨？', ['Preparation helps schools make safer choices during heavy rain.', 'Raincoats can stop all rain.', 'Pupils should never walk to school.', 'Schools should close after every storm.'], 0, 'The report explains practical preparation that reduces confusion and supports safer decisions.', '報告解釋實際準備如何減少混亂並支持更安全的決定。', ['Preparation cannot stop the rain, but it can reduce confusion', 'The main idea is that preparation improves safety during heavy rain.', 'The conclusion restates the central message of the whole report.']]
    ]
  }]);
  add('advancedReading', 6, [{
    genre: 'Proposal extract', genreZh: '建議書節錄', title: 'A Safer Path to the Community Centre',
    text: 'Our P6 class proposes two improvements to the path between the MTR exit and the Community Centre. First, a raised strip should be added beside the crossing so that people with low vision can notice where the road begins. Second, the narrow section of pavement should be widened near the centre entrance. During our survey, we observed a wheelchair user needing to wait while other pedestrians passed. These changes would make the route more comfortable for everyone, including families with pushchairs and elderly residents. We recommend testing the improvements during the next school term and collecting comments from users before making further changes.',
    questions: [
      ['What evidence supports widening the pavement?', '哪項證據支持加闊行人路？', ['A wheelchair user had to wait while others passed.', 'The MTR exit was closed.', 'The class wanted a new playground.', 'Families did not use the centre.'], 0, 'The survey observed a wheelchair user needing to wait at the narrow section.', '調查觀察到輪椅使用者在狹窄位置需要等候。', ['a wheelchair user needing to wait while other pedestrians passed', 'The pavement should be widened because it is too narrow for people to pass easily.', 'Use the survey observation as evidence for the proposal.']],
      ['Why does the writer recommend collecting comments after the test?', '作者為甚麼建議測試後收集意見？', ['To improve the plan using users’ experience.', 'To make the route shorter.', 'To stop people using the centre.', 'To replace the proposal with a poster.'], 0, 'User comments can show whether the tested changes work well before further decisions are made.', '使用者意見可顯示測試中的改變是否有效，才作進一步決定。', ['collecting comments from users before making further changes', 'The group wants evidence from users before deciding what to do next.', 'A proposal is stronger when it tests an idea and evaluates feedback.']]
    ]
  }]);
})();
