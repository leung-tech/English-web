(() => {
  const studio = window.SENIOR_ENGLISH_STUDIO;
  if (!studio) return;
  const add = (module) => studio.modules.push(module);

  const paper2S4 = {
    id:'s4-p2-01',
    title:'Paper 2 Self-review Lab: Reading Partnership Email',
    titleZh:'卷二自我檢視室：閱讀合作電郵',
    level:'S4 build',
    taskType:'Original guided functional writing practice · 原創引導功能寫作練習',
    prompt:'Write a formal email to a community centre requesting a Saturday reading-partnership event. Explain the student need, propose a practical arrangement and make a courteous request for a reply.',
    promptZh:'寫一封正式電郵給社區中心，申請星期六閱讀合作活動。說明學生需要、提出實際安排，並禮貌地要求回覆。',
    planningSteps:[
      ['Audience and purpose · 讀者與目的','Underline who will read the email and what decision you want them to make.'],
      ['Selective source use · 選擇性資料運用','Choose one relevant student-need detail; do not turn a limited detail into a universal claim.'],
      ['Functional structure · 功能結構','Plan subject line, purpose, practical arrangement, request and courteous close.']
    ],
    structureMap:[
      ['Subject and opening · 主旨及開首','“Request for a Saturday Reading Partnership” and one sentence stating who is writing and why.','Makes the purpose immediately visible. · 讓目的即時清楚。'],
      ['Need with qualification · 需要及限定','Use one student detail, then state what it suggests rather than what it proves.','Controls overclaiming. · 控制過度概括。'],
      ['Practical proposal · 實際建議','Name a time, duration, small-group arrangement and support.','Shows feasibility. · 展示可行性。'],
      ['Courteous close · 禮貌結尾','Request consideration and offer to discuss details.','Matches the formal audience. · 配合正式讀者。']
    ],
    annotatedModel:[
      ['Purpose','Dear Community Centre Coordinator, I am writing on behalf of the school Reading Club to request a Saturday reading-partnership event.'],
      ['Qualified evidence','An original feedback form found that 24 of 35 members would value an opportunity to discuss books with community volunteers. Although this is a limited group, it suggests genuine interest in a structured exchange.'],
      ['Proposal','We would be grateful if the centre could consider a forty-five-minute discussion in small groups, supported by a librarian and volunteers.'],
      ['Close','Please let us know whether this arrangement may be feasible. Thank you for considering this request.']
    ],
    selfReview:[
      ['Content · 內容','I addressed every task point with a relevant detail.'],
      ['Content · 內容','I used evidence cautiously rather than claiming it proves too much.'],
      ['Organisation · 組織','My subject line and paragraphs make the purpose easy to follow.'],
      ['Organisation · 組織','My request and close match a formal email audience.'],
      ['Language · 語言','I used accurate formal request language, such as “We would be grateful if…”.'],
      ['Language · 語言','I checked verb forms, articles, agreement and punctuation.']
    ],
    revisionMoves:['Replace one vague adjective with a precise word, such as feasible, structured or courteous.','Read the purpose sentence aloud: can a busy reader understand it on first reading?','Check that each paragraph has one clear job.']
  };

  const paper2S5 = {
    id:'s5-p2-01',
    title:'Paper 2 Self-review Lab: Feature Article on Shared Space',
    titleZh:'卷二自我檢視室：共享空間專題文章',
    level:'S5 analyse',
    taskType:'Original extended writing practice · 原創延伸寫作練習',
    prompt:'Write a feature article for the school magazine explaining how a shared lunchtime space can meet different student needs. Use a scene-setting opening, two perspectives, one original observation and a reflective conclusion.',
    promptZh:'為校刊寫一篇專題文章，說明共享午飯空間如何回應不同學生需要。使用場景開首、兩個觀點、一項原創觀察及反思結論。',
    planningSteps:[
      ['Reader experience · 讀者體驗','Decide how your opening will make the school-magazine reader imagine the space.'],
      ['Perspective selection · 選擇觀點','Choose two different needs; avoid treating one as the only valid need.'],
      ['Reflective line · 反思主線','Plan one sentence that moves from the example to a wider point about inclusive design.']
    ],
    structureMap:[
      ['Scene-setting lead · 場景鋪陳開首','Describe one visible moment: a quiet table, a game corner or a student preparing for an activity.','Creates voice and reader interest. · 建立文風及讀者興趣。'],
      ['Perspective one and two · 兩個觀點','Develop a focus need and a social or restorative need using contrast.','Shows multi-dimensional thinking. · 展示多角度思考。'],
      ['Observation with limit · 有限制的觀察','Report what happened, then explain what it does and does not show.','Separates observation from conclusion. · 區分觀察與結論。'],
      ['Reflective conclusion · 反思結論','Return to the wider idea of choice, inclusion or shared responsibility.','Gives the article a purposeful ending. · 讓文章有目的結尾。']
    ],
    annotatedModel:[
      ['Scene','At first glance, the lunch area looked ordinary: a quiet table near the window and a small board-game corner beside it.'],
      ['Contrast','For one student, the table offered time to complete a task; by contrast, another student valued conversation before an afternoon activity.'],
      ['Limited evidence','During the one-week trial, 17 students used the quiet table and 21 joined the board-game area. The observation does not prove that every student needs one option.'],
      ['Reflection','What it does reveal is that a shared space works best when it recognises that rest is not identical for everyone.']
    ],
    selfReview:[
      ['Content · 內容','I developed two distinct student perspectives.'],
      ['Content · 內容','My observation is relevant and I did not exaggerate its meaning.'],
      ['Organisation · 組織','My opening creates a clear scene and my conclusion returns to a wider point.'],
      ['Organisation · 組織','I used contrast and reference words to connect paragraphs.'],
      ['Language · 語言','I used varied sentence openings and precise descriptive language.'],
      ['Language · 語言','I checked that participle phrases and pronouns have clear logical references.']
    ],
    revisionMoves:['Add one exact detail that a reader can picture.','Circle every however, by contrast or therefore; confirm that each link matches the logic.','Turn one simple sentence into a controlled complex sentence without making it unclear.']
  };

  const paper2S6 = {
    id:'s6-p2-01',
    title:'Paper 2 Self-review Lab: Policy Opinion Article',
    titleZh:'卷二自我檢視室：政策觀點文章',
    level:'S6 respond',
    taskType:'Original extended writing practice · 原創延伸寫作練習',
    prompt:'Write an opinion article arguing that public policy should present evidence transparently. Use an engaging opening, two dimensions of argument, a counterargument and rebuttal, and a cautious evidence-aware conclusion.',
    promptZh:'寫一篇觀點文章，主張公共政策應透明呈現證據。使用吸引開首、兩個論證角度、反方與駁論，以及謹慎而重視證據的結論。',
    planningSteps:[
      ['Position with scope · 有範圍的立場','State a clear position while avoiding a claim that one data point can settle every policy question.'],
      ['Argument dimensions · 論證角度','Choose two linked dimensions, such as trust and accessibility, or practical use and accountability.'],
      ['Counterargument logic · 反方邏輯','Represent one concern fairly before showing why a layered, reviewable response is stronger.']
    ],
    structureMap:[
      ['Hook and thesis · 開首及論點','Open with a concrete contrast between one number and a meaningful explanation.','Creates direction without empty rhetoric. · 建立方向但避免空泛修辭。'],
      ['Argument one · 理據一','Explain how method, exclusions and update date support informed interpretation.','Develops evidence literacy. · 發展證據素養。'],
      ['Argument two · 理據二','Explain how plain-language summaries and a question route improve access.','Links transparency to different users. · 把透明度連繫不同使用者。'],
      ['Counterargument and rebuttal · 反方及駁論','Concede that detailed notes can be demanding, then propose layered presentation.','Shows controlled evaluation. · 展示受控評鑑。'],
      ['Bounded conclusion · 有限結論','Recommend a pilot and a review rather than an absolute guarantee.','Matches the evidence boundary. · 配合證據界線。']
    ],
    annotatedModel:[
      ['Hook','A dashboard can display a large number without explaining whether that number is complete, current or meaningful.'],
      ['Argument','Transparency is strengthened when readers can see how figures were collected, what they exclude and when they were updated.'],
      ['Rebuttal','While critics contend that detailed notes are too complex, they overlook the value of layered design: a short summary can lead to fuller explanation when needed.'],
      ['Bounded conclusion','On balance, a reviewable pilot would improve access to evidence without claiming to settle every policy question.']
    ],
    selfReview:[
      ['Content · 內容','I developed two relevant dimensions of my argument.'],
      ['Content · 內容','I represented a counterargument fairly before rebutting it.'],
      ['Organisation · 組織','My topic sentences make the line of reasoning clear.'],
      ['Organisation · 組織','My conclusion is evidence-aware rather than absolute.'],
      ['Language · 語言','I used precise connectors and a varied range of controlled sentence patterns.'],
      ['Language · 語言','I checked that nominalisations and advanced phrases do not make my meaning vague.']
    ],
    revisionMoves:['Add a limiter such as may, can, tends to or warrants where evidence is incomplete.','Check that the rebuttal answers the same concern it introduces.','Replace one abstract noun string with a clear active clause if readability suffers.']
  };

  add({id:'s4-paper2',stage:'s4',skill:'paper2',symbol:'P2',title:'Paper 2 self-review lab',zh:'卷二自我檢視室',type:'paper2',items:[paper2S4]});
  add({id:'s5-paper2',stage:'s5',skill:'paper2',symbol:'P2',title:'Paper 2 structure lab',zh:'卷二結構分析室',type:'paper2',items:[paper2S5]});
  add({id:'s6-paper2',stage:'s6',skill:'paper2',symbol:'P2',title:'Paper 2 argument lab',zh:'卷二論證分析室',type:'paper2',items:[paper2S6]});

  const oralAdditions = {
    s4:[
      {id:'s4-o02',format:'group',title:'Group Interaction: Sustainable School Festival',titleZh:'小組互動：可持續校園節',roleCard:'You are one of four Student Festival Committee members. Discuss how the festival can reduce waste without making participation difficult. Work towards two agreed actions and one review method.',roleCardZh:'你是四名學生節慶委員會成員之一。討論節慶如何減少廢物而不令參與變得困難。達成兩項共識行動及一項檢討方法。',time:'Prepare 3 minutes · Discuss 4 minutes',timeZh:'準備 3 分鐘 · 討論 4 分鐘',scenario:['Proposal: replace single-use cups with a deposit cup system.','Concern: some students may forget to return cups.','Resource: Eco Club can run a collection point near the exit.'],peerPrompts:['Ask a classmate which action is most realistic.','Build on a suggestion before adding a concern.','Summarise the group’s two agreed actions near the end.'],languageBank:['Could we begin by considering…?','I see your point; however,…','One practical concern is…','Perhaps we could combine both ideas by…','So, are we agreeing that…?'],model:'I think the deposit cup system is worth trying because it can reduce single-use waste. I see the concern that some students may forget to return cups. Perhaps we could combine the system with a collection point near the exit and a clear reminder on each cup. That would make return easier. Shall we agree to test the collection point and ask the Eco Club to count returned cups after the festival?',rubric:[['Interaction · 互動','Invites, responds to and develops classmates’ ideas.'],['Task fulfilment · 任務完成','Contributes to two agreed actions and one review method.'],['Language · 語言','Uses clear agreeing, qualifying and proposing language.'],['Delivery · 表達','Speaks clearly and leaves space for others.']],selfCheck:['I referred to another speaker’s idea.','I added one practical concern or solution.','I helped the group reach a clear decision.'],structure:'group'},
      {id:'s4-o03',format:'individual',title:'Individual Response: Volunteer Reading Day',titleZh:'個人回應：義工閱讀日',roleCard:'You are inviting classmates to join a Volunteer Reading Day. Speak for 75–90 seconds to explain the purpose, describe one activity and address one possible hesitation.',roleCardZh:'你正邀請同學參加義工閱讀日。用 75–90 秒解釋目的、描述一項活動並回應一項可能的猶豫。',time:'Prepare 2 minutes · Speak 75–90 seconds',timeZh:'準備 2 分鐘 · 說話 75–90 秒',scenario:['Purpose: read with younger children at a community centre.','Activity: 30-minute paired reading and simple book discussion.','Hesitation: some students think they are not confident readers.'],languageBank:['The purpose of the day is…','One activity will be…','You do not need to be… to contribute because…','I would encourage you to…'],model:'The purpose of Volunteer Reading Day is to share books with younger children at the community centre. One activity will be a thirty-minute paired reading session followed by a simple discussion. Some classmates may feel that they are not confident readers. However, volunteers do not need to be experts; they need to be patient, prepared and willing to listen. I would encourage you to join because a small conversation about a book can make reading feel more welcoming.',rubric:[['Task response · 回應任務','Explains purpose, activity and hesitation clearly.'],['Organisation · 組織','Uses a clear beginning, development and close.'],['Language · 語言','Uses encouraging, audience-aware language.'],['Delivery · 表達','Uses a steady, inviting delivery.']],selfCheck:['I named the purpose and activity.','I addressed a realistic hesitation.','I ended with a clear invitation.'],structure:'individual'}
    ],
    s5:[
      {id:'s5-o02',format:'group',title:'Group Interaction: Community Heritage Campaign',titleZh:'小組互動：社區傳承行動',roleCard:'You are planning a community-heritage campaign for young residents. Discuss which format should be prioritised: a short video, a walking map or an interview exhibition. Reach a decision using audience, access and evidence considerations.',roleCardZh:'你正為年輕居民規劃社區傳承行動。討論應優先採用短片、步行地圖還是訪問展覽。從讀者、取用及證據角度達成決定。',time:'Prepare 3 minutes · Discuss 4–5 minutes',timeZh:'準備 3 分鐘 · 討論 4–5 分鐘',scenario:['Audience: secondary students and nearby families.','Access: not every resident uses the same digital platform.','Evidence: local residents can provide memories, but dates should be checked.'],peerPrompts:['Ask for another speaker’s reason before stating your preference.','Distinguish an engaging format from a reliable source.','Offer a compromise that improves access.'],languageBank:['Before we decide, could we clarify…?','The video may be engaging; nevertheless,…','We should verify… before…','A compromise would be to…','Can we summarise our decision as…?'],model:'Before we decide, could we clarify our main audience? A short video may be engaging for students; nevertheless, not every family uses the same platform. I would support a walking map with a small interview exhibition because it can be accessed in person and online. We should verify dates in residents’ stories before publishing them. A compromise would be to use short video clips on the map, so we combine engagement with access and evidence.',rubric:[['Interaction · 互動','Seeks clarification, responds to peers and negotiates a compromise.'],['Reasoning · 推理','Uses audience, access and evidence to justify a decision.'],['Language · 語言','Uses comparison, qualification and summary language.'],['Delivery · 表達','Maintains a collaborative and purposeful tone.']],selfCheck:['I asked or answered a question.','I used at least two decision criteria.','I helped state a group decision.'],structure:'group'},
      {id:'s5-o03',format:'individual',title:'Individual Response: Later Library Opening',titleZh:'個人回應：圖書館延長開放',roleCard:'You are speaking to a library committee. Speak for 90–105 seconds to recommend whether the library should trial later opening. Use one benefit, one concern and a review method.',roleCardZh:'你正在向圖書館委員會發言。用 90–105 秒建議圖書館是否應試行延長開放。使用一項好處、一項關注及一個檢討方法。',time:'Prepare 2 minutes · Speak 90–105 seconds',timeZh:'準備 2 分鐘 · 說話 90–105 秒',scenario:['Potential benefit: students and shift workers may have more access.','Concern: transport or staffing.','Review: sign-in record, exit comments and staff workload.'],languageBank:['On balance, I recommend…','A potential benefit is…','A legitimate concern is…','This could be addressed by…','The trial should be reviewed through…'],model:'On balance, I recommend a limited later-opening trial on two evenings each week. A potential benefit is that students and shift workers may have more access to a quiet study space. A legitimate concern is transport and staffing. This could be addressed by a six-week trial rather than a permanent promise. The library should review sign-in records, exit comments and staff workload before deciding whether to continue.',rubric:[['Task response · 回應任務','Gives a qualified recommendation with benefit, concern and review.'],['Reasoning · 推理','Explains why a limited trial is proportionate.'],['Language · 語言','Uses cautious recommendation language.'],['Delivery · 表達','Signals the recommendation, concern and review clearly.']],selfCheck:['I made a clear but qualified recommendation.','I explained one concern and response.','I named at least two review details.'],structure:'individual'}
    ],
    s6:[
      {id:'s6-o02',format:'group',title:'Group Interaction: Youth Wellbeing Policy',titleZh:'小組互動：青年身心健康政策',roleCard:'You are advising a youth-wellbeing panel. Discuss whether the first priority should be a quiet study zone, a peer-support programme or a device-boundary campaign. Reach a decision that acknowledges limited resources and a way to evaluate the choice.',roleCardZh:'你正在向青年身心健康小組提供建議。討論應優先採用安靜溫習區、同儕支援計劃還是裝置界線行動。達成一項承認資源有限並有評估方法的決定。',time:'Prepare 4 minutes · Discuss 5 minutes',timeZh:'準備 4 分鐘 · 討論 5 分鐘',scenario:['Need: students report different sources of pressure.','Resource: funding supports only one small first-stage pilot.','Evaluation: participation, short feedback and referral requests can be reviewed.'],peerPrompts:['Acknowledge why another option may still be valuable.','Ask how success would be evaluated.','Use a limited recommendation rather than an absolute claim.'],languageBank:['I acknowledge that…','Given the limited resource,…','The evidence would be stronger if…','A small pilot could be evaluated through…','I would support this on the condition that…'],model:'I acknowledge that each option may support students in a different way. Given the limited resource, I would support a small peer-support pilot because it can address isolation while referring students to further help when needed. However, the evidence would be stronger if the panel also records participation, short feedback and referral requests. I would support this on the condition that the panel reviews those findings before expanding the programme.',rubric:[['Interaction · 互動','Acknowledges alternatives and develops classmates’ contributions.'],['Evaluation · 評鑑','Uses resource limits and review evidence to justify a conditional decision.'],['Language · 語言','Uses qualified, evidence-aware language.'],['Delivery · 表達','Facilitates a balanced, collaborative discussion.']],selfCheck:['I acknowledged an alternative view.','I used a condition or limitation.','I proposed a review method.'],structure:'group'},
      {id:'s6-o03',format:'individual',title:'Individual Response: Transparent Data Dashboard',titleZh:'個人回應：透明數據儀表板',roleCard:'You are presenting to a public-information panel. Speak for 105–120 seconds to recommend a transparent data dashboard, explain one limitation of a single number and respond to one concern about complexity.',roleCardZh:'你正向公共資訊小組發言。用 105–120 秒建議建立透明數據儀表板，解釋單一數字的一項限制並回應一項關於複雜性的關注。',time:'Prepare 3 minutes · Speak 105–120 seconds',timeZh:'準備 3 分鐘 · 說話 105–120 秒',scenario:['Transparency: show method, exclusions and update date.','Limitation: one number may be only a partial indicator.','Concern: detailed notes may be difficult for ordinary users.'],languageBank:['The proposal I support is…','A single figure should not be interpreted as…','To address the concern about complexity,…','A layered design would allow…','On balance, the panel should…'],model:'The proposal I support is a transparent public-data dashboard. A single figure should not be interpreted as a complete evaluation because it may be only a partial indicator. To address the concern about complexity, the dashboard could use layered design: a short plain-language summary, followed by method notes, exclusions and update dates for readers who need more detail. On balance, the panel should run a reviewable pilot and ask users whether they can understand and use the information responsibly.',rubric:[['Task response · 回應任務','Explains proposal, limitation and response to complexity.'],['Critical thinking · 批判思考','Distinguishes transparency from unsupported certainty.'],['Language · 語言','Uses precise academic and qualifying language.'],['Delivery · 表達','Uses deliberate emphasis for limitation and conclusion.']],selfCheck:['I explained why one number may be incomplete.','I responded directly to the complexity concern.','I made a bounded, reviewable recommendation.'],structure:'individual'}
    ]
  };

  Object.entries(oralAdditions).forEach(([stage, items]) => {
    const oralModule = studio.modules.find((item) => item.stage === stage && item.skill === 'oral');
    if (oralModule) oralModule.items.push(...items);
  });
})();
