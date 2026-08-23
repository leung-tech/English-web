(() => {
  const studio = window.SENIOR_ENGLISH_STUDIO;
  if (!studio) return;
  const add = (module) => studio.modules.push(module);

  const paper3Items = {
    s4: {
      id:'s4-p3-01',
      title:'Paper 3 Skills Lab: Community Reading Pop-up',
      titleZh:'卷三技能室：社區流動閱讀站',
      level:'S4 build',
      taskType:'Original listening and integrated-skills practice · 原創聆聽及綜合能力練習',
      audioTitle:'Listening input · 聆聽輸入',
      audioScript:'Hello Reading Club volunteers. Here is the final plan for our Community Reading Pop-up. The event will take place on Saturday, 18 October, from 10 a.m. to 12 noon at Harbour Community Hall. Please arrive by 9:35 so that we can set up the book tables. Each volunteer will work with two younger readers for a twenty-minute reading chat. Bring your name badge, a pen and one book from the shared list. The hall can provide chairs and water, but not extra books. If you cannot attend, email the coordinator before Wednesday so that another volunteer can be invited. After the event, complete the short reflection form by Monday afternoon. We will use the comments to decide whether to run a second session in November.',
      sourcePack:[
        ['Source A · Event notice','Community Reading Pop-up\nSaturday, 18 October · Harbour Community Hall\n10:00–12:00 (volunteers arrive 09:35)\nBring: name badge, pen, one shared-list book\nProvided: chairs and water\nContact: readingclub@school.example'],
        ['Source B · Volunteer message','Some younger readers prefer picture books, while others want short mystery stories. Please ask each reader what they would enjoy before choosing a book. Keep the conversation friendly and let the child explain one favourite part.'],
        ['Source C · Coordinator note','A follow-up session is possible in November. The club will consider attendance, volunteer reflections and the children’s comments before deciding.']
      ],
      noteItems:[
        {label:'date',prompt:'Choose the best note for the event date.','promptZh':'選出最適合作為活動日期的筆記。',options:['Sat 18 Oct','18/10? morning','October reading','Saturday after school'],answer:0,explanation:'Keep the weekday and date; omit unnecessary full-sentence wording.','explanationZh':'保留星期及日期；省略不必要的完整句式。'},
        {label:'arrival',prompt:'Choose the clearest abbreviated arrival note.','promptZh':'選出最清晰的到達時間縮寫。',options:['arr. 9:35 a.m.','arrive at community hall','come early','set up tables'],answer:0,explanation:'The note keeps the action and precise time.','explanationZh':'筆記保留行動及準確時間。'},
        {label:'grouping',prompt:'Which note accurately records the volunteer arrangement?','promptZh':'哪項筆記準確記錄義工安排？',options:['1 vol. : 2 young readers / 20 min','2 volunteers / 1 reader','20 readers / 2 hours','read alone for 20 min'],answer:0,explanation:'Use a compact ratio plus duration.','explanationZh':'使用精簡比例加上時長。'},
        {label:'materials',prompt:'Which note separates what volunteers bring from what the hall provides?','promptZh':'哪項筆記能分開義工自備及禮堂提供的物品？',options:['Bring: badge, pen, 1 bk; hall: chairs + water','Bring chairs and water','Hall provides all books','Bring a reflection form'],answer:0,explanation:'The note preserves the source distinction, which is important for task accuracy.','explanationZh':'筆記保留資料來源的區分，有助回應任務時準確。'},
        {label:'absence',prompt:'Choose the best action note for an absence.','promptZh':'選出缺席時的最佳行動筆記。',options:['email coord. by Wed','tell a friend later','skip reflection','wait until Sat'],answer:0,explanation:'The instruction needs both action and deadline.','explanationZh':'指示需要同時保留行動和期限。'},
        {label:'review',prompt:'Which note gives the basis for deciding on a November session?','promptZh':'哪項筆記說明決定是否在十一月舉行活動的依據？',options:['review: att., vol. refl., children comments','November = confirmed','only book choice','water supply'],answer:0,explanation:'The coordinator names three evidence sources for the later decision.','explanationZh':'統籌者列出三項供日後決定使用的證據來源。'}
      ],
      sourceChecklist:[
        'I can identify the time, place and action in the listening input.','I can distinguish the event notice from the volunteer message.','I can use the coordinator note only for the follow-up decision, not as a confirmed promise.'
      ],
      integrationPlan:'You are the student helper writing a 70–90 word reminder for volunteers. State the arrival time, list what to bring, explain how to choose a book for a younger reader, and mention what will be reviewed before a November session is considered.',
      integrationPlanZh:'你是學生助手，為義工寫一則 70–90 字提醒。寫出到達時間、列出要帶的物品、解釋如何為較年幼讀者選書，並提及考慮十一月活動前會檢視甚麼。',
      responseMap:[['Purpose and audience · 目的及讀者','Open as a friendly but clear reminder for volunteers.'],['Accurate logistics · 準確安排','Use Source A and the listening input for time, place and materials.'],['Reader-aware action · 讀者為本行動','Use Source B to explain how volunteers should choose a book.'],['Cautious follow-up · 謹慎跟進','Use Source C to describe a possible review, not a guaranteed next event.']],
      languageBank:['Please arrive by…','Remember to bring…','Before choosing a book, ask…','The club will review… before considering…','Thank you for helping to…'],
      selfReview:['My note choices preserve exact details and deadlines.','I selected information from more than one source.','I did not turn a possible November session into a confirmed event.','My plan matches the purpose and volunteer audience.'],
      revisionMoves:['Replace one full sentence in your notes with a meaningful abbreviation.','Underline each source detail in your plan and check that it comes from the correct source.','Check whether your final sentence states a review rather than a promise.']
    },
    s5: {
      id:'s5-p3-01',
      title:'Paper 3 Skills Lab: Shared Study Space Proposal',
      titleZh:'卷三技能室：共享溫習空間建議',
      level:'S5 analyse',
      taskType:'Original listening and integrated-skills practice · 原創聆聽及綜合能力練習',
      audioTitle:'Listening input · 聆聽輸入',
      audioScript:'Good afternoon, members of the Student Space Review Team. We have received preliminary feedback on the shared study space trial. During the first two weeks, the room was open on Tuesdays and Thursdays from 4:15 to 5:00 p.m. Forty-six different students signed in, but attendance was higher on Thursdays. Several students praised the quiet table near the window. Others asked for a small discussion corner because they were preparing for group presentations. Staff raised one concern: the room was sometimes left untidy after the final session. For the next two-week trial, we will keep the quiet table, add four discussion seats and ask each group to return materials before leaving. Please submit your short recommendation by Friday, 7 November. Your recommendation should explain whether the revised arrangement is worth continuing and how the team can collect fair feedback from students and staff.',
      sourcePack:[
        ['Source A · Trial record','Shared Study Space — first two weeks\nOpen: Tue + Thu, 16:15–17:00\nUsers: 46 different students\nPattern: Thu attendance higher\nPositive comment: quiet table near window'],
        ['Source B · Student comments','“I could complete a reading task without interruptions.”\n“Could there be a small space where my group can rehearse a presentation?”\n“We need a reminder about returning markers and papers.”'],
        ['Source C · Staff message','The trial may continue only if the space remains safe and usable for all. Staff can provide a sign-in sheet and a short exit question, but they cannot supervise extra rooms.']
      ],
      noteItems:[
        {label:'schedule',prompt:'Which note records the opening schedule without unnecessary words?','promptZh':'哪項筆記以不多餘的方式記錄開放時間？',options:['Tue/Thu 16:15–17:00','two afternoons after school','Tuesdays and Thursdays, maybe later','open every day'],answer:0,explanation:'Use abbreviated days plus an exact time range.','explanationZh':'使用縮寫日子及準確時間範圍。'},
        {label:'users',prompt:'Choose the note that distinguishes a total group of users from a daily attendance figure.','promptZh':'選出能分辨總使用人數與每日出席數字的筆記。',options:['46 different users / 2 wks','46 each day','46 staff members','46 seats'],answer:0,explanation:'The listening input says forty-six different students over the first two weeks.','explanationZh':'聆聽輸入指出首兩星期有四十六名不同學生。'},
        {label:'pattern',prompt:'Which note captures the attendance pattern?','promptZh':'哪項筆記記錄出席模式？',options:['Thu > Tue att.','Tue = Thu','no sign-in','only morning use'],answer:0,explanation:'The compact comparison preserves the pattern without inventing numbers.','explanationZh':'精簡比較保留模式而不虛構數字。'},
        {label:'revision',prompt:'Which note records the next-trial revision accurately?','promptZh':'哪項筆記準確記錄下一輪試行的修訂？',options:['keep quiet tbl + add 4 discussion seats','remove quiet table','add extra rooms','change to online only'],answer:0,explanation:'The revised arrangement keeps the quiet table and adds four discussion seats.','explanationZh':'修訂安排保留安靜桌，並增加四個討論座位。'},
        {label:'deadline',prompt:'Choose the best deadline note for the recommendation.','promptZh':'選出建議書的最佳截止日期筆記。',options:['rec. due Fri 7 Nov','Friday recommendation','submit next week','7 days'],answer:0,explanation:'The note keeps task type, weekday and exact date.','explanationZh':'筆記保留任務類型、星期及準確日期。'},
        {label:'constraint',prompt:'Which note accurately records the staff constraint?','promptZh':'哪項筆記準確記錄職員限制？',options:['staff: sign-in + exit Q; no extra-room supervision','staff will supervise all rooms','students need no feedback','trial is permanent'],answer:0,explanation:'The constraint matters when you make a feasible recommendation.','explanationZh':'提出可行建議時，這項限制十分重要。'}
      ],
      sourceChecklist:[
        'I can distinguish an observation from a student preference.','I can use the staff message to test whether a proposal is feasible.','I can compare the listening input with the written sources before recommending an action.'
      ],
      integrationPlan:'You are writing a 120–150 word recommendation to the Student Space Review Team. Recommend whether the revised trial should continue. Use one attendance pattern, one student need, one staff constraint and one fair feedback method.',
      integrationPlanZh:'你正向學生空間檢討小組寫一篇 120–150 字建議。建議修訂後的試行應否繼續。使用一項出席模式、一項學生需要、一項職員限制及一個公平收集意見的方法。',
      responseMap:[['Position with scope · 有範圍的立場','Give a clear recommendation for a further limited trial, not a permanent claim.'],['Evidence comparison · 比較證據','Use the attendance pattern and a student need from different sources.'],['Feasibility · 可行性','Respond directly to the staff supervision constraint.'],['Review method · 檢討方法','Suggest a short, fair feedback process for users and staff.']],
      languageBank:['The evidence suggests that…','A further limited trial would be worthwhile because…','However, the proposal must take account of…','To make the review fair,…','On balance, I recommend…'],
      selfReview:['I used a pattern without exaggerating what it proves.','I combined a written source and listening detail.','I addressed the staff constraint rather than ignoring it.','My recommendation includes a practical review method.'],
      revisionMoves:['Use arrows, symbols or abbreviations in notes only when their meaning remains clear.','Mark which sentence uses a finding, which uses a preference and which uses a constraint.','Add a short condition to avoid presenting a trial as a permanent solution.']
    },
    s6: {
      id:'s6-p3-01',
      title:'Paper 3 Skills Lab: Youth Services Information Campaign',
      titleZh:'卷三技能室：青年服務資訊行動',
      level:'S6 respond',
      taskType:'Original listening and integrated-skills practice · 原創聆聽及綜合能力練習',
      audioTitle:'Listening input · 聆聽輸入',
      audioScript:'Thank you for joining the Youth Services Information Campaign briefing. Our aim is not simply to post more messages. We need to help young people find accurate support at the right time. A pilot survey of 82 students found that many wanted one short page explaining where to seek academic, wellbeing and career support. However, the survey did not include every year group, so we should treat it as a starting point rather than a complete picture. The campaign will begin with a printed guide and a mobile-friendly page. Each service description must include a contact route, opening hours and a date showing when the information was checked. We will ask student ambassadors to test the page for clarity, while service staff will check factual accuracy. The first version should be ready by 15 January. After one month, the team will review page visits, anonymous user comments and any repeated questions. If a service changes its hours, the page must be updated within five working days.',
      sourcePack:[
        ['Source A · Pilot survey summary','82 students responded.\nMost requested: one short guide to academic, wellbeing and career support.\nImportant limit: not every year group took part.\nPreferred formats: printed guide + mobile-friendly page.'],
        ['Source B · Service directory note','Every service entry should show: contact route; opening hours; last-checked date.\nUsers should be able to identify whether the service is school-based, community-based or online.'],
        ['Source C · Editorial concern','A short guide can make information accessible, but it may become misleading if details are not reviewed. A visible update date helps readers judge whether an entry is current.']
      ],
      noteItems:[
        {label:'aim',prompt:'Choose the best note for the campaign aim.','promptZh':'選出行動目的的最佳筆記。',options:['aim: accurate support @ right time','post more msgs','one survey only','promote one service'],answer:0,explanation:'The aim is usefulness and accuracy, not merely more messages.','explanationZh':'目的在於實用與準確，而不只是更多訊息。'},
        {label:'evidence',prompt:'Which note represents the survey evidence cautiously?','promptZh':'哪項筆記以謹慎方式表達調查證據？',options:['82 resp.; starting pt., not all yrs','82 = all students','82 proves final design','survey unnecessary'],answer:0,explanation:'The note keeps the number and its limitation.','explanationZh':'筆記同時保留數字及其限制。'},
        {label:'formats',prompt:'Which note accurately records the first campaign formats?','promptZh':'哪項筆記準確記錄首輪行動形式？',options:['print guide + mobile page','video only','printed posters only','social media every day'],answer:0,explanation:'Both formats are named in the briefing and survey summary.','explanationZh':'兩種形式均在簡報及調查摘要中列明。'},
        {label:'entry',prompt:'Which note records the required information for every service entry?','promptZh':'哪項筆記記錄每項服務資料的必要內容？',options:['contact, hrs, last-checked date','student name, grade, score','photos and slogans only','no update information'],answer:0,explanation:'These details help users act and judge whether information is current.','explanationZh':'這些資料幫助使用者行動及判斷資訊是否最新。'},
        {label:'checking',prompt:'Choose the note that distinguishes the two checking roles.','promptZh':'選出能分辨兩個核實角色的筆記。',options:['ambassadors: clarity; staff: facts','ambassadors: facts only','staff: design only','no checking needed'],answer:0,explanation:'The roles are complementary: clarity testing and factual checking.','explanationZh':'兩個角色互補：清晰度測試及事實核實。'},
        {label:'review',prompt:'Which note records both the review timing and update rule?','promptZh':'哪項筆記同時記錄檢討時間及更新規則？',options:['review +1 mo.; changes ≤5 workdays','review next year','update when convenient','no review'],answer:0,explanation:'The campaign requires a one-month review and updates within five working days of a change.','explanationZh':'行動要求一個月後檢討，服務更改後五個工作天內更新。'}
      ],
      sourceChecklist:[
        'I can separate a survey finding from a universal conclusion.','I can use the directory note to specify what trustworthy information includes.','I can connect the editorial concern to a review and update procedure.'
      ],
      integrationPlan:'You are preparing a 170–210 word editorial proposal for the school website. Recommend how the information campaign should present support services responsibly. Use the survey cautiously, specify essential information for each entry, explain two checking roles, and propose a review/update process.',
      integrationPlanZh:'你正為學校網站準備一篇 170–210 字社論建議。建議資訊行動應如何負責任地呈現支援服務。謹慎使用調查、列明每項資料的必要內容、解釋兩個核實角色，並提出檢討／更新程序。',
      responseMap:[['Opening and claim · 開首及立場','State that access requires accuracy, clarity and regular review.'],['Cautious evidence use · 謹慎運用證據','Use the 82 responses as a starting point and acknowledge the sample limitation.'],['Trustworthy design · 可信設計','Specify contact, hours, last-checked date and service type.'],['Accountability · 問責','Explain the ambassador/staff roles and the one-month review plus five-working-day update rule.']],
      languageBank:['The pilot survey indicates…, although…','Accessible information should not be confused with oversimplified information.','Each entry ought to identify…','Student ambassadors can test clarity, whereas staff should verify…','A visible update date enables readers to…','Accordingly, the campaign should be reviewed…'],
      selfReview:['My evidence claim matches the survey limitation.','I integrated details from the listening input and at least two written sources.','I explained why accuracy, clarity and an update date work together.','My review proposal is specific and does not promise certainty.'],
      revisionMoves:['Use a slash, colon or arrow only if it helps you retrieve the source meaning quickly.','Check that each recommendation is supported by a detail from the information pack.','Replace one unsupported certainty word with a bounded recommendation such as should, may or ought to.']
    }
  };

  Object.entries(paper3Items).forEach(([stage, item]) => {
    add({ id:`${stage}-paper3`, stage, skill:'paper3', symbol:'P3', title:'Paper 3 skills lab', zh:'卷三聆聽及綜合能力', type:'paper3', items:[item] });
  });
})();
