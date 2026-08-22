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
    )
  ]};
})();
