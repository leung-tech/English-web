(() => {
  const mission = (id, title, titleZh, missionInfo, bank, prompt, promptZh, options, answer, explanation, explanationZh, hint) => ({
    id, title, titleZh, mission: missionInfo, phraseBank: bank, prompt, promptZh, options, answer, explanation, explanationZh, hint
  });

  window.S2_MICRO_MISSIONS = { games: [
    mission(
      's2-mm01',
      'Digital citizenship mission: Verify before reposting',
      '數碼公民任務：轉發前先核實',
      {
        chain:'Digital citizenship mission · 數碼公民任務鏈',
        step:'Step 1 / 3 · Check the message',
        stepZh:'第 1 / 3 步 · 核對訊息',
        goal:'A class chat says that Friday’s activity has been cancelled. Decide what must be checked before anyone reposts it.',
        goalZh:'班群訊息指星期五的活動已取消。請判斷任何人轉發前必須核對甚麼。',
        next:'Next move: verify the source and date, then decide whether the message is current.',
        nextZh:'下一步：核實來源和日期，再判斷訊息是否最新。'
      },
      ['check the source and date', 'repost it immediately', 'trust the number of shares'],
      'Choose the safest action: “Before reposting the cancellation notice, _____.”',
      '選擇最安全行動：「在轉發取消活動的通告前，_____。」',
      ['check the source and date', 'repost it immediately', 'trust the number of shares', 'remove the message title'],
      0,
      'Checking the source and date helps you decide whether the message is reliable and current.',
      '核實來源和日期有助你判斷訊息是否可靠及最新。',
      'Many shares do not prove that a message is current. 很多人分享不代表訊息是最新。'
    ),
    mission(
      's2-mm02',
      'Digital citizenship mission: Protect a group photo',
      '數碼公民任務：保護小組照片',
      {
        chain:'Digital citizenship mission · 數碼公民任務鏈',
        step:'Step 2 / 3 · Respect permission',
        stepZh:'第 2 / 3 步 · 尊重同意',
        goal:'Your group wants to upload a photo from a science activity. Choose the action that respects everyone in the image.',
        goalZh:'小組想上載科學活動的照片。請選擇尊重相中每個人的行動。',
        next:'Next move: ask first, then choose a suitable audience and caption.',
        nextZh:'下一步：先詢問，再選擇合適的受眾及說明文字。'
      },
      ['ask for permission', 'share without thinking', 'post every name'],
      'Complete the responsible plan: “We should _____ before uploading the photo.”',
      '完成負責任的計劃：「上載照片前，我們應 _____。」',
      ['ask for permission', 'share without thinking', 'post every name', 'ignore the class rule'],
      0,
      'Ask for permission before uploading a group photo because each person should have a choice about their image.',
      '上載小組照片前應先取得同意，因為每個人都應對自己的影像有選擇。',
      'The photo includes people other than you. 相片包括你以外的人。'
    ),
    mission(
      's2-mm03',
      'Digital citizenship mission: Reply with evidence',
      '數碼公民任務：以證據回應',
      {
        chain:'Digital citizenship mission · 數碼公民任務鏈',
        step:'Step 3 / 3 · Write a respectful reply',
        stepZh:'第 3 / 3 步 · 寫出尊重回應',
        goal:'A classmate says the activity is definitely cancelled, but you have not found an official update. Choose a reply that is polite and evidence-based.',
        goalZh:'同學說活動一定取消，但你尚未找到官方更新。請選擇有禮且以證據為本的回應。',
        next:'Mission complete: use the same check–permission–reply sequence in a future class chat.',
        nextZh:'任務完成：日後在班群中也可運用「核實—同意—回應」步驟。'
      },
      ['I could not find an official update yet.', 'You are wrong.', 'Everyone knows it is cancelled.'],
      'Choose the best reply: “_____ Could we check the school notice together?”',
      '選擇最佳回應：「_____ 我們可否一起核對學校通告？」',
      ['I could not find an official update yet.', 'You are wrong.', 'Everyone knows it is cancelled.', 'Do not share anything ever.'],
      0,
      'The reply stays respectful, explains the evidence gap and suggests a practical next check.',
      '這個回應保持尊重、說明證據不足，並建議實際的下一步核實。',
      'Disagree with a claim, not with the person. 不同意主張，不要攻擊對方。'
    ),
    mission(
      's2-mm04',
      'Wellbeing mission: Choose a priority',
      '身心平衡任務：選擇優先次序',
      {
        chain:'Wellbeing mission · 身心平衡任務鏈',
        step:'Step 1 / 3 · Read the timetable',
        stepZh:'第 1 / 3 步 · 閱讀時間表',
        goal:'You have a group presentation tomorrow, vocabulary practice for next week and a message from a friend. Choose the sensible first action.',
        goalZh:'你明天要作小組簡報、下星期才要溫習詞彙，朋友亦傳來訊息。請選擇合理的第一步。',
        next:'Next move: reserve focused time for the most urgent task, then plan the rest.',
        nextZh:'下一步：為最緊急工作預留專注時間，然後安排其餘事項。'
      },
      ['prioritise the presentation', 'avoid every task', 'do the least urgent task first'],
      'Choose the best plan: “I should _____ before checking social media.”',
      '選擇最佳計劃：「在看社交媒體前，我應先 _____。」',
      ['prioritise the presentation', 'avoid every task', 'do the least urgent task first', 'wait for someone else'],
      0,
      'Prioritising means starting with the work that has the closest deadline or greatest importance.',
      '排列優先次序是先處理限期最近或最重要的工作。',
      'Which task is due first? 哪一項工作最先到期？'
    ),
    mission(
      's2-mm05',
      'Wellbeing mission: Build a realistic plan',
      '身心平衡任務：建立可行計劃',
      {
        chain:'Wellbeing mission · 身心平衡任務鏈',
        step:'Step 2 / 3 · Make a workable schedule',
        stepZh:'第 2 / 3 步 · 建立可行時間表',
        goal:'After planning your presentation, you also want to revise vocabulary without giving up all rest and hobbies.',
        goalZh:'安排簡報後，你亦想溫習詞彙，同時不放棄所有休息和興趣。',
        next:'Next move: include a short break, then review whether the plan still feels manageable.',
        nextZh:'下一步：加入短暫休息，再檢視計劃是否仍可應付。'
      },
      ['set aside time', 'use every minute for work', 'forget the plan'],
      'Complete the plan: “I will _____ for vocabulary practice after dinner.”',
      '完成計劃：「晚飯後，我會 _____ 溫習詞彙。」',
      ['set aside time', 'use every minute for work', 'forget the plan', 'set aside the homework forever'],
      0,
      'Set aside time means reserving a realistic time period for one planned activity.',
      'set aside time 指為一項已計劃的活動預留實際時間。',
      'A plan works better when each activity has a reasonable time slot. 每項活動有合理時間段，計劃便更易實行。'
    ),
    mission(
      's2-mm06',
      'Wellbeing mission: Review and adjust',
      '身心平衡任務：檢討與調整',
      {
        chain:'Wellbeing mission · 身心平衡任務鏈',
        step:'Step 3 / 3 · Keep the plan sustainable',
        stepZh:'第 3 / 3 步 · 維持可持續計劃',
        goal:'You have studied with focus for forty minutes and notice that you are rereading the same sentence. Choose the next action.',
        goalZh:'你已專心溫習四十分鐘，並發現自己重複閱讀同一句。請選擇下一步。',
        next:'Mission complete: use priority–schedule–review to make the next study session more manageable.',
        nextZh:'任務完成：下次溫習可運用「優先—時間表—檢討」令安排更易應付。'
      },
      ['take a short break', 'work without rest', 'ignore the sign of tiredness'],
      'Choose the best next step: “I will _____, stretch and then continue.”',
      '選擇最佳下一步：「我會 _____、伸展身體，然後繼續。」',
      ['take a short break', 'work without rest', 'ignore the sign of tiredness', 'cancel every task'],
      0,
      'A short planned break can help you return to focused study without abandoning the plan.',
      '有計劃的短暫休息可幫助你重拾專注，而不是放棄計劃。',
      'The goal is balance, not doing nothing. 目標是平衡，不是甚麼也不做。'
    ),
    mission(
      's2-mm07',
      'Digital citizenship mission: Distinguish a claim from evidence',
      '數碼公民任務：分辨主張與證據',
      {
        chain:'Digital citizenship extension · 數碼公民延伸任務',
        step:'Extension 1 / 4 · Examine the evidence',
        stepZh:'延伸 1 / 4 · 檢視證據',
        goal:'A post claims that a new study app “always improves results”, but it only quotes one anonymous comment. Choose language that describes the evidence accurately.',
        goalZh:'一則帖文聲稱新溫習應用程式「一定改善成績」，但只引用一則匿名留言。請選擇能準確描述證據的語言。',
        next:'Next move: identify the claim, the named source and the evidence that is still missing.',
        nextZh:'下一步：找出主張、具名來源，以及仍然欠缺的證據。'
      },
      ['does not establish that', 'proves that', 'guarantees that'],
      'Choose the most accurate completion: “One anonymous comment _____ the app improves every student’s results.”',
      '選擇最準確完成句：「一則匿名留言 _____ 該應用程式改善每位學生的成績。」',
      ['does not establish that', 'proves that', 'guarantees that', 'makes it certain that'],
      0,
      'Does not establish that is precise because one anonymous comment is too limited to support a broad claim about every student.',
      'does not establish that 很準確，因為一則匿名留言太有限，不能支持關於每位學生的廣泛主張。',
      'Match the strength of your wording to the strength of the evidence. 用語力度要配合證據力度。'
    ),
    mission(
      's2-mm08',
      'Digital citizenship mission: Attribute information responsibly',
      '數碼公民任務：負責任地標示資料來源',
      {
        chain:'Digital citizenship extension · 數碼公民延伸任務',
        step:'Extension 2 / 4 · Attribute a source',
        stepZh:'延伸 2 / 4 · 標示來源',
        goal:'Your group is preparing a club notice using attendance figures from the school office. Choose the phrase that shows where the figure came from.',
        goalZh:'你的小組正使用校務處的出席數字撰寫學會通告。請選擇能說明數字來源的片語。',
        next:'Next move: keep the original source, date and context when you summarise information.',
        nextZh:'下一步：概括資料時保留原來的來源、日期及語境。'
      },
      ['according to the attendance record', 'everybody knows that', 'it is obvious that'],
      'Choose the most responsible opener: “_____ , the club had more visitors during the trial week.”',
      '選擇最負責任開首：「_____，學會在試行週有較多訪客。」',
      ['According to the attendance record', 'Everybody knows that', 'It is obvious that', 'Without any source'],
      0,
      'According to the attendance record attributes the statement to a checkable source instead of presenting it as an unsupported fact.',
      'according to the attendance record 把主張連結到可核實來源，而非當作沒有根據的事實。',
      'A reader should be able to ask, “Where did this figure come from?” 讀者應能追問：「這個數字從哪裡來？」'
    ),
    mission(
      's2-mm09',
      'Wellbeing mission: Set a realistic boundary',
      '身心平衡任務：設定實際界線',
      {
        chain:'Wellbeing extension · 身心平衡延伸任務',
        step:'Extension 3 / 4 · Protect focused time',
        stepZh:'延伸 3 / 4 · 保護專注時間',
        goal:'You want to work on a group draft without ignoring friends or family. Choose a phrase that sets a clear and respectful boundary.',
        goalZh:'你想完成小組草稿，同時不忽略朋友或家人。請選擇能清晰而尊重地設定界線的片語。',
        next:'Next move: communicate when you will reply and make the study period short enough to keep.',
        nextZh:'下一步：說明何時回覆，並把溫習時段設定為能實踐的長度。'
      },
      ['set a reasonable boundary', 'answer every message at once', 'work until exhausted'],
      'Choose the best plan: “I will _____ by finishing the draft first and replying at 8:30.”',
      '選擇最佳計劃：「我會 _____，先完成草稿，晚上八時半再回覆。」',
      ['set a reasonable boundary', 'answer every message at once', 'work until exhausted', 'avoid everyone for a week'],
      0,
      'Set a reasonable boundary protects focused work while still giving others a clear time for a reply.',
      'set a reasonable boundary 保障專注工作，同時清楚說明回覆他人的時間。',
      'A useful boundary is specific, respectful and realistic. 有用的界線要具體、尊重且可實行。'
    ),
    mission(
      's2-mm10',
      'Wellbeing mission: Revise a plan after feedback',
      '身心平衡任務：根據回饋修訂計劃',
      {
        chain:'Wellbeing extension · 身心平衡延伸任務',
        step:'Extension 4 / 4 · Revise the plan',
        stepZh:'延伸 4 / 4 · 修訂計劃',
        goal:'After one week, your timetable includes too many tasks on Wednesday and no rest time. Choose the action that uses feedback responsibly.',
        goalZh:'一星期後，你發現時間表把太多任務安排在星期三，沒有休息時間。請選擇負責任地運用回饋的行動。',
        next:'Mission complete: apply the evidence–boundary–review sequence to a future study or group-work plan.',
        nextZh:'任務完成：日後的溫習或小組計劃可運用「證據—界線—檢討」步驟。'
      },
      ['adjust the schedule', 'repeat the same plan without checking', 'remove every activity'],
      'Choose the best response: “I should _____ by moving one task and adding a short break.”',
      '選擇最佳回應：「我應 _____，把一項任務改期並加入短暫休息。」',
      ['adjust the schedule', 'repeat the same plan without checking', 'remove every activity', 'pretend the problem is not there'],
      0,
      'Adjust the schedule is a measured response: it uses what you noticed to make one practical change instead of giving up the whole plan.',
      'adjust the schedule 是適度回應：利用觀察到的情況作一項實際改動，而非放棄整個計劃。',
      'Reviewing a plan means making evidence-based changes. 檢討計劃是根據證據作出改動。'
    )
  ], advancedWriting: [
    {
      id:'s2-mm-w01',
      level:'advanced',
      title:'Digital Citizenship Writing Challenge: A responsible class-chat reply',
      titleZh:'數碼公民寫作挑戰：負責任的班群回應',
      minWords:100,
      prompt:'Write a 100–130 word reply for a class chat. An undated post claims that Friday’s activity is cancelled. You cannot find an official update. Explain what should be checked, write one respectful sentence to classmates, and suggest a practical next step. Do not pretend that the activity is definitely cancelled or definitely continuing.',
      promptZh:'為班群寫一則 100–130 字回應。一則沒有日期的帖文聲稱星期五活動已取消，但你找不到官方更新。說明應核對甚麼、寫一句給同學的尊重回應，並提出實際下一步。不可假裝活動一定取消或一定繼續。',
      sourcePack:[
        ['Task evidence · 任務資料','The post has no date and no named source. The school website shows last week’s notice only.'],
        ['Audience and purpose · 受眾與目的','Classmates need a calm, accurate message before they decide whether to change their plans.'],
        ['Vocabulary target · 目標詞彙','official update; verify; source; date; according to; may; respectful; confirm; reliable.']
      ],
      paragraphMap:[
        ['1. Cautious opening · 謹慎開首','State what the post claims and what is still unknown.'],
        ['2. Evidence check · 核實證據','Name the missing source/date and explain why they matter.'],
        ['3. Respectful response · 尊重回應','Use a calm sentence that asks classmates not to overstate the claim.'],
        ['4. Next step · 下一步','Suggest one reliable place or person to check and a time to update the group.']
      ],
      languageBank:['The post claims that…','However, I could not find…','Before we change our plans, we should verify…','According to…','The information may be out of date.','Could we wait for confirmation from…?'],
      model:'The post claims that Friday’s activity has been cancelled. However, I could not find an official update on the school website. The message has no date or named source, so the information may be out of date.\n\nBefore we change our plans, we should verify the notice with the activity teacher or the school office. Please do not repost the claim as a confirmed fact yet. Could we check again at lunchtime and update the group when we have a reliable answer?',
      selfCheck:'I used cautious language rather than an overconfident claim. I named the missing source/date, wrote respectfully for classmates and suggested a reliable next step. This original challenge develops junior-secondary digital-literacy and formal-response skills; it is not an official HKDSE task or marking scheme.'
    },
    {
      id:'s2-mm-w02',
      level:'advanced',
      title:'Wellbeing Writing Challenge: A realistic study-plan proposal',
      titleZh:'身心平衡寫作挑戰：可行的溫習計劃建議',
      minWords:110,
      prompt:'Write a 110–140 word proposal for your class mentor. A class poll shows that many students finish homework late on Wednesday, and several say they have no regular break after school. Recommend a two-week study-and-break trial. Use the finding carefully, explain two practical actions, acknowledge one limitation and state how the class could review the trial.',
      promptZh:'為班主任寫一份 110–140 字建議書。班內調查顯示許多學生星期三很晚才完成家課，亦有學生表示放學後沒有固定休息。建議兩星期的溫習與休息試行。謹慎使用調查發現、解釋兩項實際行動、承認一項限制，並說明班級可如何檢討試行。',
      sourcePack:[
        ['Original class finding · 原創班級發現','In a class poll, 18 of 30 students said that Wednesday homework often takes longer than expected.'],
        ['Possible limitation · 可能限制','A small class poll may not show every student’s home routine, and some students have fixed family responsibilities.'],
        ['Vocabulary target · 目標詞彙','prioritise; set aside; sustainable; manageable; limitation; trial; monitor; feedback; on balance.']
      ],
      paragraphMap:[
        ['1. Purpose and finding · 目的與發現','State the purpose and report the class poll without saying it proves every student has the same problem.'],
        ['2. Practical action 1 · 實際行動一','Recommend one focused, time-limited homework action.'],
        ['3. Practical action 2 and limitation · 實際行動二及限制','Include a short break or boundary, then acknowledge a difference in students’ routines.'],
        ['4. Review · 檢討','Explain how the class could monitor the two-week trial and decide on a next step.']
      ],
      languageBank:['The class poll suggests that…','We could set aside…','To keep the plan manageable,…','One limitation is that…','After a two-week trial,…','On balance, I recommend…'],
      model:'The class poll suggests that some students find Wednesday homework harder to manage, as 18 of 30 students said that it often takes longer than expected. I recommend a two-week study-and-break trial.\n\nFirst, students could set aside one focused 30-minute homework period before using social media. Second, they could take a short planned break before starting a second task. One limitation is that students have different family routines, so the plan should remain flexible.\n\nAfter the trial, the class could monitor completion times and collect anonymous feedback. On balance, this would help us build a more sustainable routine without treating one survey as a final answer.',
      selfCheck:'I used the poll as limited evidence, gave two workable actions, acknowledged a limitation and explained how to review the trial. This original challenge develops junior-secondary proposal writing and evidence-aware response skills; it is not an official HKDSE task or marking scheme.'
    }
  ]};
})();
