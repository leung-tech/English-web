(() => {
  const item = (prompt, options, explanation, promptZh, explanationZh) => [prompt, options, explanation, promptZh, explanationZh];
  const bank = window.QUESTION_BANK_EXPANSION ||= {};
  bank.grammar ||= {};

  const grammar = {
    1: [
      item('Choose the correct word: “_____ am ready for school.”', ['I', 'Me', 'My', 'Mine'], 'Use I when the word is the subject of the sentence.', '選出正確詞語：「_____ 已準備好上學。」', '當詞語是句子的主語時，用 I。'),
      item('Choose the correct sentence.', ['She has a red bag.', 'She have a red bag.', 'She are a red bag.', 'She has red bag.'], 'Use has with one person such as she, and use a before one red bag.', '選出正確句子。', '一個人如 she 用 has；一個紅色書包前用 a。'),
      item('Choose the correct phrase: “_____ orange is on the desk.”', ['An', 'A', 'The are', 'Some is'], 'Use an before a word beginning with a vowel sound such as orange.', '選出正確片語：「_____ 橙在書桌上。」', 'orange 以母音音開始，前面用 an。'),
      item('Choose the correct sentence.', ['The two cats are small.', 'The two cat are small.', 'The two cats is small.', 'The two cat is small.'], 'Two needs a plural noun, cats, and are.', '選出正確句子。', 'two 後用複數名詞 cats，並配合 are。'),
      item('Choose the correct sentence.', ['I can swim.', 'I can swims.', 'I can swimming.', 'I am can swim.'], 'Use can + base verb: can swim.', '選出正確句子。', 'can 後接動詞原形：can swim。'),
      item('Choose the correct sentence.', ['The toy is under the chair.', 'The toy is under chair the.', 'The toy are under the chair.', 'The toy under is the chair.'], 'Use is for one toy. Under tells the place.', '選出正確句子。', '一件玩具用 is；under 說明位置。'),
      item('Choose the correct question.', ['What is your name?', 'What your name is?', 'What are your name?', 'What is name your?'], 'A singular what-question can begin with What is.', '選出正確問句。', '單數 what 問句可用 What is 開始。'),
      item('Choose the correct sentence.', ['Where is the bus?', 'Where the bus is?', 'Where is bus?', 'Where is the bus'], 'A question begins with a capital letter and ends with a question mark.', '選出正確句子。', '問句以大寫字母開始，並以問號結束。')
    ],
    2: [
      item('Choose the correct question.', ['Does Leo play football on Friday?', 'Do Leo plays football on Friday?', 'Does Leo plays football on Friday?', 'Leo does play football on Friday?'], 'Use Does + base verb for one person: Does Leo play…?', '選出正確問句。', '一個人用 Does + 動詞原形：Does Leo play…?'),
      item('Choose the correct sentence.', ['Mia does not like spicy food.', 'Mia do not likes spicy food.', 'Mia does not likes spicy food.', 'Mia not like spicy food.'], 'Use does not + base verb with Mia: does not like.', '選出正確句子。', 'Mia 用 does not + 動詞原形：does not like。'),
      item('Choose the correct sentence.', ['There is some water in the bottle.', 'There are some water in the bottle.', 'There is many water in the bottle.', 'There are a water in the bottle.'], 'Water is uncountable, so use there is some water.', '選出正確句子。', 'water 是不可數名詞，用 there is some water。'),
      item('Choose the correct question.', ['Are there any apples in the bag?', 'Is there any apples in the bag?', 'Are there some apples in the bag?', 'There are any apples in the bag?'], 'Use Are there any + plural noun in this question.', '選出正確問句。', '此問句用 Are there any + 複數名詞。'),
      item('Choose the correct sentence.', ['We usually eat lunch at twelve.', 'We eat usually lunch at twelve.', 'We usually eats lunch at twelve.', 'We are usually eat lunch at twelve.'], 'Usually comes before the main verb. With we, use eat.', '選出正確句子。', 'usually 放在主要動詞前；we 配合 eat。'),
      item('Choose the correct sentence.', ['My brother is reading now.', 'My brother reading now.', 'My brother are reading now.', 'My brother reads now.'], 'Now is a clue for is + verb-ing with one person.', '選出正確句子。', 'now 是一個人用 is + 動詞-ing 的提示。'),
      item('Choose the correct phrase: “We have art class _____ Monday.”', ['on', 'at', 'in', 'under'], 'Use on before a day of the week.', '選出正確片語：「我們 _____ 星期一有美術課。」', '星期幾前用 on。'),
      item('Choose the correct sentence.', ['The ball is between the two boxes.', 'The ball is between the two box.', 'The ball are between the two boxes.', 'The ball is next two boxes.'], 'Between is used for a place in the middle of two things.', '選出正確句子。', 'between 用於兩件事物中間的位置。')
    ],
    3: [
      item('Choose the correct sentence about yesterday.', ['We watched a film yesterday.', 'We watch a film yesterday.', 'We watching a film yesterday.', 'We have watched a film yesterday.'], 'Yesterday is a finished past time, so use watched.', '選出正確句子，內容關於昨天。', 'yesterday 是已完成的過去時間，所以用 watched。'),
      item('Choose the correct sentence.', ['Sam ate noodles for dinner.', 'Sam eated noodles for dinner.', 'Sam eats noodles for dinner yesterday.', 'Sam has ate noodles for dinner.'], 'The past form of eat is ate.', '選出正確句子。', 'eat 的過去式是 ate。'),
      item('Choose the best future plan.', ['We are going to visit the science museum on Saturday.', 'We going to visit the science museum on Saturday.', 'We are visit the science museum on Saturday.', 'We visited the science museum on Saturday.'], 'Use are going to + base verb for a planned future activity.', '選出最合適的未來計劃。', '已計劃的未來活動用 are going to + 動詞原形。'),
      item('Choose the correct sentence.', ['The blue whale is bigger than the dolphin.', 'The blue whale is biggest than the dolphin.', 'The blue whale is more big than the dolphin.', 'The blue whale bigger than the dolphin.'], 'Use bigger than to compare two animals.', '選出正確句子。', '比較兩隻動物用 bigger than。'),
      item('Choose the correct sentence.', ['Mount Tai is the highest hill in the park.', 'Mount Tai is higher hill in the park.', 'Mount Tai is the higher hill in the park.', 'Mount Tai is most high hill in the park.'], 'Use the + superlative when comparing a group: the highest.', '選出正確句子。', '在一組事物中比較時，用 the + 最高級：the highest。'),
      item('Choose the best connector: “I stayed inside _____ it was raining.”', ['because', 'but', 'or', 'so'], 'Because introduces the reason for staying inside.', '選出最佳連接詞：「我留在室內 _____ 正在下雨。」', 'because 引出留在室內的原因。'),
      item('Choose the correct sentence.', ['Mum called me when I got home.', 'Mum called I when I got home.', 'Mum called my when I got home.', 'Mum called mine when I got home.'], 'Use me as the object after called.', '選出正確句子。', 'called 後用受格 me。'),
      item('Choose the correct sentence.', ['If it is sunny tomorrow, we will have a picnic.', 'If it will be sunny tomorrow, we will have a picnic.', 'If it is sunny tomorrow, we had a picnic.', 'If sunny tomorrow, we will have a picnic.'], 'For a real future condition, use if + present, then will + base verb.', '選出正確句子。', '真實未來條件句用 if + 現在式，再用 will + 動詞原形。')
    ],
    4: [
      item('Choose the correct sentence.', ['Our class has collected old books this week.', 'Our class have collected old books this week.', 'Our class collecting old books this week.', 'Our class has collect old books this week.'], 'Our class is one group, so use has + past participle: has collected.', '選出正確句子。', 'our class 是一個群組，用 has + 過去分詞：has collected。'),
      item('Choose the correct sentence about a finished past time.', ['I visited the exhibition last Saturday.', 'I have visited the exhibition last Saturday.', 'I have visit the exhibition last Saturday.', 'I was visit the exhibition last Saturday.'], 'Last Saturday is a finished past time, so use visited.', '選出正確句子，內容關於已完成的過去時間。', 'last Saturday 是已完成的過去時間，所以用 visited。'),
      item('Choose the correct rule.', ['You must wear a helmet when you ride a bike.', 'You must to wear a helmet when you ride a bike.', 'You must wearing a helmet when you ride a bike.', 'You must wears a helmet when you ride a bike.'], 'Use must + base verb for a strong rule.', '選出正確規則。', '強烈規則用 must + 動詞原形。'),
      item('Choose the best advice.', ['You should drink water after exercise.', 'You should to drink water after exercise.', 'You should drinking water after exercise.', 'You should drinks water after exercise.'], 'Use should + base verb for advice.', '選出最佳建議。', '建議用 should + 動詞原形。'),
      item('Choose the correct sentence.', ['This puzzle is more difficult than that one.', 'This puzzle is difficulter than that one.', 'This puzzle is most difficult than that one.', 'This puzzle more difficult that one.'], 'Use more difficult than for a longer adjective.', '選出正確句子。', '較長形容詞用 more difficult than。'),
      item('Choose the correct sentence.', ['Although the bus was late, we arrived on time.', 'Although the bus was late, but we arrived on time.', 'Although the bus was late, so we arrived on time.', 'Although was the bus late, we arrived on time.'], 'Although already shows contrast, so do not add but or so.', '選出正確句子。', 'although 已表示轉折，因此不加 but 或 so。'),
      item('Choose the correct phrase: “The concert starts _____ 6:30 p.m.”', ['at', 'on', 'in', 'between'], 'Use at before an exact time.', '選出正確片語：「音樂會 _____ 晚上六時半開始。」', '確實時間前用 at。'),
      item('Choose the correct sentence.', ['The boy who won the quiz thanked his team.', 'The boy which won the quiz thanked his team.', 'The boy where won the quiz thanked his team.', 'The boy whose won the quiz thanked his team.'], 'Use who for a person in a short relative clause.', '選出正確句子。', '簡短關係子句中指人用 who。')
    ]
  };

  Object.entries(grammar).forEach(([grade, items]) => {
    bank.grammar[grade] ||= [];
    bank.grammar[grade].push(...items);
  });

  window.P1_P4_GRAMMAR_FOCUS = grammar;
})();
