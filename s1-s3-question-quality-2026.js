(function () {
  const hintByPrompt = {
    'Which reply best responds to the librarian’s concern about group discussions?': ['Choose the reply that respects both quiet reading and careful discussion.', '選擇同時尊重安靜閱讀和小心討論的回應。'],
    'Which question is the clearest way to check one missing detail?': ['Look for a polite question that names one specific missing detail.', '找出有禮而且指出一項具體遺漏資料的問題。'],
    'Choose the strongest reply for Student A after the manager worries that two portions may slow the queue.': ['A strong reply should acknowledge the concern, use evidence and offer a workable step.', '有力回應要承認顧慮、運用證據並提出可行步驟。'],
    'Which next step would make the trial evidence-led?': ['Choose an action that compares relevant information before and after the trial.', '選擇能比較試行前後相關資料的行動。'],
    'Which reply best shows that Student A has compared the two options and chosen a safe first step?': ['Look for a reply that weighs both options and includes sensible preparation.', '找出比較兩個選項並包括合理準備的回應。'],
    'What condition does the volunteer set before a supervised garden visit?': ['Find the condition the volunteer gives before the visit can happen.', '找出義工提出、探訪可進行前必須符合的條件。'],
    'Which response is the safest next step?': ['Before sharing an unclear claim, check both the source and how current it is.', '分享不清楚的說法前，先核對來源及是否最新。'],
    'Which reply best balances the benefit and concern?': ['Choose the option that keeps a benefit while directly addressing the concern.', '選擇既保留好處又直接處理顧慮的選項。'],
    'Which change should the writer prioritise?': ['Prioritise details that make the proposal practical and reviewable.', '優先處理令建議可行及可檢視的細節。'],
    'Which method presents the two accounts most fairly?': ['A fair comparison names sources and explains a difference without erasing either account.', '公平比較會指出來源、解釋差異，不會抹去任何一方的說法。'],
    'Which question best checks a practical detail?': ['The strongest question politely asks about a specific preparation detail.', '最好的問題會有禮地詢問一項具體準備細節。'],
    'Which reply shows fair cooperation?': ['Fair cooperation shares tasks while allowing people to support one another.', '公平合作會分配工作，同時容許互相支援。'],
    'What information should the revised notice include first?': ['A useful notice begins with the essential practical details readers need.', '有用通告應先寫讀者所需的基本實用資料。'],
    'What is the most responsible next step?': ['Do not pass on an uncertain claim until a current official source is checked.', '未核對最新官方來源前，不要轉發不確定說法。'],
    'Which evidence should be reviewed after the trial?': ['A fair review uses more than one relevant source of evidence.', '公平檢討會使用多於一種相關證據。'],
    'Which revision is most balanced?': ['Prefer a claim that states its evidence and does not overgeneralise.', '選擇有證據根據且不過度概括的說法。'],
    'Which statement best recognises the survey limitation?': ['A critical answer explains both what the evidence supports and what it cannot prove.', '批判性答案要說明證據支持甚麼，以及它不能證明甚麼。'],
    'Which revision is most precise?': ['Choose language that gives the evidence scope instead of claiming it applies to everyone.', '選擇交代證據範圍、而非聲稱適用所有人的句子。'],
    'What should the student prioritise?': ['Consider what the decision-maker needs to judge feasibility and evidence.', '想想決策者需要甚麼資料來判斷可行性和證據。'],
  };
  const roots = [
    ['s1', window.S1_EXTEND_COMMUNITY_VOICE], ['s2', window.S2_COMMUNITY_ENVIRONMENT],
    ['s2', window.S2_CONSOLIDATE_EVIDENCE], ['s3', window.S3_READY_PATHWAY],
    ['s1', window.S1_INTERACTION_PLUS], ['s2', window.S2_INTERACTION_PLUS], ['s3', window.S3_CRITICAL_PLUS],
  ];
  roots.forEach(([grade, bank]) => {
    (bank?.dialogues || []).forEach((dialogue, dialogueIndex) => {
      (dialogue.checkpoints || []).forEach((checkpoint, checkpointIndex) => {
        checkpoint.grade = grade;
        checkpoint.id = checkpoint.id || `${dialogue.id || `${grade}-dialogue-${dialogueIndex + 1}`}-checkpoint-${checkpointIndex + 1}`;
        if (!checkpoint.hint) {
          const pair = hintByPrompt[checkpoint.prompt] || ['Read the dialogue again and choose the option supported by its evidence or practical purpose.', '再次閱讀對話，選擇由當中證據或實際目的支持的選項。'];
          checkpoint.hint = pair[0];
          checkpoint.hintZh = pair[1];
        }
      });
    });
  });
})();
