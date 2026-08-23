(() => {
  'use strict';

  const root = document.querySelector('#secondary-app');
  const $ = (selector) => document.querySelector(selector);
  const safeGet = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const safeSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[char]);
  const letters = ['A', 'B', 'C', 'D'];
  const state = { year: 's1', stage: 's1-bridge', route: 'read', moduleId: null, index: 0, selected: null, reorder: [], checked: false };
  const progressKey = 'secondary-english-studio-progress-v1';
  const draftKey = 'secondary-english-studio-drafts-v1';
  const progress = () => {
    const stored = safeGet(progressKey, { completed: 0, correct: 0, modules: {} });
    return { completed:Number(stored.completed || 0), correct:Number(stored.correct || 0), modules:stored.modules || {}, moduleStats:stored.moduleStats || {}, stageStats:stored.stageStats || {}, routeStats:stored.routeStats || {}, stageRouteStats:stored.stageRouteStats || {} };
  };
  const drafts = () => safeGet(draftKey, {});
  const getDraft = (moduleId) => drafts()[moduleId] || '';
  const saveDraft = (moduleId, value) => { const all = drafts(); all[moduleId] = value; safeSet(draftKey, all); };
  const clearDraft = (moduleId) => { const all = drafts(); delete all[moduleId]; safeSet(draftKey, all); };
  const mark = (moduleId, correct, objective = true) => {
    const record = progress();
    record.completed += 1;
    if (objective && correct) record.correct += 1;
    record.modules[moduleId] = (record.modules[moduleId] || 0) + 1;
    if (objective) {
      const module = moduleRegistry.find((item) => item.id === moduleId) || {};
      const update = (bucket, key) => { const item = bucket[key] || { attempted:0, correct:0 }; item.attempted += 1; if (correct) item.correct += 1; bucket[key] = item; };
      update(record.moduleStats, moduleId);
      update(record.stageStats, module.stage || 'unknown');
      update(record.routeStats, module.route || 'unknown');
      update(record.stageRouteStats, `${module.stage || 'unknown'}:${module.route || 'unknown'}`);
    }
    safeSet(progressKey, record);
  };

  const stageList = [
    { id:'s1-bridge', year:'s1', code:'S1 START', title:'School Life', titleZh:'校園生活起步', note:'A gentle bridge from P6 to S1.', noteZh:'由小六平穩銜接中一。', pathway:'Junior-secondary foundation: understand and use clear English in familiar school situations.', pathwayZh:'初中基礎：在熟悉的校園情境中理解及運用清晰英語。' },
    { id:'s1-core', year:'s1', code:'S1 CORE', title:'Everyday English', titleZh:'中一核心英語', note:'Build clear language for school and community.', noteZh:'建立校園與社區英語基礎。', pathway:'Junior-secondary focus: build vocabulary, grammar, reading and purposeful short responses.', pathwayZh:'初中重點：建立詞彙、文法、閱讀及有目的的短篇回應。' },
    { id:'s1-extend', year:'s1', code:'S1 EXTEND', title:'Community & Voice', titleZh:'社區與表達', note:'Use English to notice needs and share practical ideas.', noteZh:'用英語發現需要，提出實際想法。', pathway:'Junior-secondary application: explain a reason, cooperate politely and organise a practical message.', pathwayZh:'初中應用：說明理由、有禮合作及組織實用訊息。' },
    { id:'s2-develop', year:'s2', code:'S2 DEVELOP', title:'Experiences & Choices', titleZh:'經驗與選擇', note:'Compare evidence and make thoughtful choices.', noteZh:'比較證據，作出有理選擇。', pathway:'Junior-secondary development: compare options, explain experience and make supported choices.', pathwayZh:'初中發展：比較選項、說明經驗及作出有支持的選擇。' },
    { id:'s2-connect', year:'s2', code:'S2 CONNECT', title:'Messages & Media', titleZh:'訊息與媒體', note:'Understand sources, audience and purpose.', noteZh:'理解來源、受眾與目的。', pathway:'Junior-secondary development: identify source, audience and purpose before responding.', pathwayZh:'初中發展：回應前辨識資料來源、受眾及目的。' },
    { id:'s2-action', year:'s2', code:'S2 ACTION', title:'Community & Environment', titleZh:'社區與環境', note:'Notice a problem. Propose an action.', noteZh:'發現問題，提出行動。', pathway:'Junior-secondary application: turn a local issue into a clear proposal, reason and review plan.', pathwayZh:'初中應用：把社區問題轉化為清晰建議、理由及檢討計劃。' },
    { id:'s2-consolidate', year:'s2', code:'S2 CONSOLIDATE', title:'Evidence & Perspectives', titleZh:'證據與觀點', note:'Check sources, compare perspectives and respond fairly.', noteZh:'核實來源、比較觀點，作出公平回應。', pathway:'Junior-secondary consolidation: use evidence cautiously, choose register for audience and revise a practical response.', pathwayZh:'初中鞏固：謹慎運用證據、按受眾選擇語體，並修訂實用回應。' },
    { id:'s3-ready', year:'s3', code:'S3 READY', title:'Future & Response', titleZh:'未來與回應', note:'Interpret evidence, respond formally and prepare for the next stage.', noteZh:'解讀證據，正式回應，為下一階段作準備。', pathway:'Senior-secondary bridge: evaluate evidence limits, control tone and build a coherent formal response. Original preparation only—not an official HKDSE paper or marking scheme.', pathwayZh:'高中銜接：評估證據限制、控制語氣並建構連貫正式回應。只屬原創準備練習，並非官方 HKDSE 試卷或評分準則。' }
  ];

  const routeMeta = {
    read: { token:'R', title:'Read', zh:'閱讀', note:'Read closely. Find evidence.', noteZh:'細讀文章，找出證據。' },
    write: { token:'W', title:'Write', zh:'寫作', note:'Plan clearly. Write with purpose.', noteZh:'清楚規劃，有目的地寫作。' },
    listen: { token:'L', title:'Listen & Speak', zh:'聽說', note:'Listen for meaning. Respond clearly.', noteZh:'聽懂意思，清楚回應。' },
    language: { token:'A', title:'Apply', zh:'語言運用', note:'Use grammar and words in context.', noteZh:'在情境中運用文法與詞彙。' }
  };

  const moduleRegistry = [
    { id:'s1-bridge-grammar', stage:'s1-bridge', route:'language', symbol:'G', title:'Grammar in school life', zh:'校園語境文法', kind:'bridgeGrammar' },
    { id:'s1-bridge-vocabulary', stage:'s1-bridge', route:'language', symbol:'V', title:'School life words', zh:'校園生活詞彙', kind:'bridgeVocabulary' },
    { id:'s1-bridge-reading', stage:'s1-bridge', route:'read', symbol:'R', title:'Reading & cloze', zh:'閱讀與綜合填空', kind:'bridgeReading' },
    { id:'s1-bridge-listening', stage:'s1-bridge', route:'listen', symbol:'L', title:'Listening at school', zh:'校園聆聽', kind:'bridgeListening' },
    { id:'s1-bridge-writing', stage:'s1-bridge', route:'write', symbol:'W', title:'School writing starter', zh:'校園寫作起步', kind:'bridgeWriting' },

    { id:'s1-core-grammar', stage:'s1-core', route:'language', symbol:'G', title:'Grammar in context', zh:'語境文法', kind:'grammar', source:'S1_CORE_PATH' },
    { id:'s1-core-vocabulary', stage:'s1-core', route:'language', symbol:'V', title:'Vocabulary builder', zh:'詞彙建構', kind:'vocabulary', source:'S1_CORE_PATH' },
    { id:'s1-core-reading', stage:'s1-core', route:'read', symbol:'R', title:'Reading workshop', zh:'閱讀工作坊', kind:'reading', source:'S1_CORE_PATH' },
    { id:'s1-core-listening', stage:'s1-core', route:'listen', symbol:'L', title:'Listening lab', zh:'聆聽練習室', kind:'listening', source:'S1_CORE_PATH' },
    { id:'s1-core-writing', stage:'s1-core', route:'write', symbol:'W', title:'Writing workshop', zh:'寫作工作坊', kind:'writing', source:'S1_CORE_PATH' },
    { id:'s1-core-speaking', stage:'s1-core', route:'listen', symbol:'S', title:'Speaking studio', zh:'口語練習室', kind:'speaking', source:'S1_CORE_PATH' },

    { id:'s1-extend-grammar', stage:'s1-extend', route:'language', symbol:'G', title:'Grammar in action', zh:'行動語境文法', kind:'grammar', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-extend-vocabulary', stage:'s1-extend', route:'language', symbol:'V', title:'Community words', zh:'社區詞彙', kind:'vocabulary', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-extend-reading', stage:'s1-extend', route:'read', symbol:'R', title:'Community reading', zh:'社區閱讀', kind:'reading', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-extend-listening', stage:'s1-extend', route:'listen', symbol:'L', title:'Listen for action', zh:'聽懂行動訊息', kind:'listening', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-extend-writing', stage:'s1-extend', route:'write', symbol:'W', title:'Write to improve', zh:'寫作以改善', kind:'writing', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-extend-dialogue', stage:'s1-extend', route:'listen', symbol:'D', title:'Community dialogue', zh:'社區對話', kind:'dialogues', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-extend-speaking', stage:'s1-extend', route:'listen', symbol:'S', title:'Speak with purpose', zh:'有目的地說', kind:'speaking', source:'S1_EXTEND_COMMUNITY_VOICE' },
    { id:'s1-interaction-grammar', stage:'s1-extend', route:'language', symbol:'G+', title:'Interaction grammar clinic', zh:'互動文法診所', kind:'grammar', source:'S1_INTERACTION_PLUS' },
    { id:'s1-vocab-game', stage:'s1-extend', route:'language', symbol:'P', title:'Phrase builder game', zh:'片語建構遊戲', kind:'game', source:'S1_VOCAB_GAMES' },
    { id:'s1-grammar-quest', stage:'s1-extend', route:'language', symbol:'Q', title:'Grammar Quest: Build the message', zh:'文法闖關：建構訊息', kind:'game', source:'S1_GRAMMAR_QUEST' },
    { id:'s1-passive-quest', stage:'s1-extend', route:'language', symbol:'PV', title:'Passive voice quest', zh:'被動語態闖關', kind:'game', source:'S1_S3_GRAMMAR_EXPANSION', gameSet:'passive' },
    { id:'s1-conditionals-quest', stage:'s1-extend', route:'language', symbol:'IF', title:'Conditionals quest', zh:'條件句闖關', kind:'game', source:'S1_S3_GRAMMAR_EXPANSION', gameSet:'conditionals' },
    { id:'s1-varied-grammar-bank', stage:'s1-extend', route:'language', symbol:'G+', title:'Grammar in school and community', zh:'校園及社區文法題庫', kind:'grammar', source:'S1_S3_GRAMMAR_EXPANSION', bank:'s1Grammar' },
    { id:'s1-curriculum-grammar', stage:'s1-extend', route:'language', symbol:'CF', title:'Core grammar in context', zh:'核心文法語境練習', kind:'grammar', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s1Grammar' },
    { id:'s1-curriculum-reading', stage:'s1-extend', route:'read', symbol:'RS', title:'Reading strategy lab', zh:'閱讀策略練習室', kind:'reading', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s1Reading' },
    { id:'s1-curriculum-writing', stage:'s1-extend', route:'write', symbol:'WS', title:'Narrative & description scaffold', zh:'記敘與描寫寫作鷹架', kind:'advancedWriting', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s1Writing' },
    { id:'s1-genre-writing', stage:'s1-extend', route:'write', symbol:'W+', title:'Narrative & argument scaffolds', zh:'記敘與議論寫作鷹架', kind:'advancedWriting', source:'S1_GENRE_WRITING' },
    { id:'s1-varied-grammar', stage:'s1-extend', route:'language', symbol:'E', title:'Sentence repair clinic', zh:'句子修訂診所', kind:'grammar', source:'S1_VARIED_PRACTICE' },
    { id:'s1-varied-reading', stage:'s1-extend', route:'read', symbol:'R+', title:'Practical-text reading', zh:'實用文本閱讀', kind:'reading', source:'S1_VARIED_PRACTICE' },
    { id:'s1-varied-listening', stage:'s1-extend', route:'listen', symbol:'L+', title:'Key-detail listening', zh:'重點聆聽', kind:'listening', source:'S1_VARIED_PRACTICE' },
    { id:'s1-varied-writing', stage:'s1-extend', route:'write', symbol:'W+', title:'Notice writing planner', zh:'通告寫作規劃', kind:'writing', source:'S1_VARIED_PRACTICE' },
    { id:'s1-interaction-dialogue', stage:'s1-extend', route:'listen', symbol:'D+', title:'Interaction dialogue lab', zh:'互動對話室', kind:'dialogues', source:'S1_INTERACTION_PLUS' },
    { id:'s1-interaction-speaking', stage:'s1-extend', route:'listen', symbol:'S+', title:'Speaking response studio', zh:'口語回應工作坊', kind:'speaking', source:'S1_INTERACTION_PLUS' },

    { id:'s2-develop-grammar', stage:'s2-develop', route:'language', symbol:'G', title:'Grammar in context', zh:'語境文法', kind:'grammar', source:'S2_EXPERIENCES_CHOICES' },
    { id:'s2-develop-vocabulary', stage:'s2-develop', route:'language', symbol:'V', title:'Vocabulary choices', zh:'選擇詞彙', kind:'vocabulary', source:'S2_EXPERIENCES_CHOICES' },
    { id:'s2-develop-reading', stage:'s2-develop', route:'read', symbol:'R', title:'Compare & connect', zh:'比較與連結', kind:'reading', source:'S2_EXPERIENCES_CHOICES' },
    { id:'s2-develop-listening', stage:'s2-develop', route:'listen', symbol:'L', title:'Listening choices', zh:'選擇聆聽', kind:'listening', source:'S2_EXPERIENCES_CHOICES' },
    { id:'s2-develop-writing', stage:'s2-develop', route:'write', symbol:'W', title:'Writing choices', zh:'選擇寫作', kind:'writing', source:'S2_EXPERIENCES_CHOICES' },
    { id:'s2-develop-speaking', stage:'s2-develop', route:'listen', symbol:'S', title:'Speaking choices', zh:'選擇口語', kind:'speaking', source:'S2_EXPERIENCES_CHOICES' },

    { id:'s2-connect-grammar', stage:'s2-connect', route:'language', symbol:'G', title:'Grammar in context', zh:'語境文法', kind:'grammar', source:'S2_MESSAGES_MEDIA' },
    { id:'s2-connect-vocabulary', stage:'s2-connect', route:'language', symbol:'V', title:'Media messages', zh:'媒體訊息詞彙', kind:'vocabulary', source:'S2_MESSAGES_MEDIA' },
    { id:'s2-connect-reading', stage:'s2-connect', route:'read', symbol:'R', title:'Sources & voices', zh:'資料來源與聲音', kind:'reading', source:'S2_MESSAGES_MEDIA' },
    { id:'s2-connect-listening', stage:'s2-connect', route:'listen', symbol:'L', title:'Hear the message', zh:'聽清訊息', kind:'listening', source:'S2_MESSAGES_MEDIA' },
    { id:'s2-connect-writing', stage:'s2-connect', route:'write', symbol:'W', title:'Inform an audience', zh:'向受眾傳達訊息', kind:'writing', source:'S2_MESSAGES_MEDIA' },
    { id:'s2-connect-speaking', stage:'s2-connect', route:'listen', symbol:'S', title:'Report & respond', zh:'報告與回應', kind:'speaking', source:'S2_MESSAGES_MEDIA' },

    { id:'s2-action-grammar', stage:'s2-action', route:'language', symbol:'G', title:'Grammar in context', zh:'語境文法', kind:'grammar', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-vocabulary', stage:'s2-action', route:'language', symbol:'V', title:'Community words', zh:'社區詞彙', kind:'vocabulary', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-reading', stage:'s2-action', route:'read', symbol:'R', title:'Community & environment', zh:'社區與環境閱讀', kind:'reading', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-listening', stage:'s2-action', route:'listen', symbol:'L', title:'Hear the plan', zh:'聽懂行動計劃', kind:'listening', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-writing', stage:'s2-action', route:'write', symbol:'W', title:'Propose a change', zh:'提出改變建議', kind:'writing', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-advanced', stage:'s2-action', route:'write', symbol:'W+', title:'Advanced writing lab', zh:'進階寫作室', kind:'advancedWriting', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-dialogue', stage:'s2-action', route:'listen', symbol:'D', title:'Community dialogue lab', zh:'社區對話室', kind:'dialogues', source:'S2_COMMUNITY_ENVIRONMENT' },
    { id:'s2-action-speaking', stage:'s2-action', route:'listen', symbol:'S', title:'Recommend & report', zh:'推薦與報告', kind:'speaking', source:'S2_COMMUNITY_ENVIRONMENT' },

    { id:'s2-consolidate-grammar', stage:'s2-consolidate', route:'language', symbol:'G', title:'Grammar with evidence', zh:'證據語境文法', kind:'grammar', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-varied-grammar-bank', stage:'s2-consolidate', route:'language', symbol:'G+', title:'Grammar in evidence and viewpoints', zh:'證據與觀點文法題庫', kind:'grammar', source:'S1_S3_GRAMMAR_EXPANSION', bank:'s2Grammar' },
    { id:'s2-curriculum-grammar', stage:'s2-consolidate', route:'language', symbol:'CF', title:'Core grammar in context', zh:'核心文法語境練習', kind:'grammar', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s2Grammar' },
    { id:'s2-curriculum-reading', stage:'s2-consolidate', route:'read', symbol:'RS', title:'Reading strategy lab', zh:'閱讀策略練習室', kind:'reading', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s2Reading' },
    { id:'s2-curriculum-writing', stage:'s2-consolidate', route:'write', symbol:'WS', title:'Formal email & PEEL scaffold', zh:'正式電郵與 PEEL 寫作鷹架', kind:'advancedWriting', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s2Writing' },
    { id:'s2-consolidate-vocabulary', stage:'s2-consolidate', route:'language', symbol:'V', title:'Source words', zh:'來源詞彙', kind:'vocabulary', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-consolidate-reading', stage:'s2-consolidate', route:'read', symbol:'R', title:'Compare sources', zh:'比較來源', kind:'reading', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-consolidate-listening', stage:'s2-consolidate', route:'listen', symbol:'L', title:'Hear and check', zh:'聆聽與核實', kind:'listening', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-consolidate-writing', stage:'s2-consolidate', route:'write', symbol:'W', title:'Write with evidence', zh:'以證據寫作', kind:'writing', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-consolidate-dialogue', stage:'s2-consolidate', route:'listen', symbol:'D', title:'Source dialogue', zh:'來源對話', kind:'dialogues', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-consolidate-speaking', stage:'s2-consolidate', route:'listen', symbol:'S', title:'Compare and respond', zh:'比較與回應', kind:'speaking', source:'S2_CONSOLIDATE_EVIDENCE' },
    { id:'s2-interaction-grammar', stage:'s2-consolidate', route:'language', symbol:'G+', title:'Interaction grammar clinic', zh:'互動文法診所', kind:'grammar', source:'S2_INTERACTION_PLUS' },
    { id:'s2-vocab-game', stage:'s2-consolidate', route:'language', symbol:'P', title:'Meaning in context game', zh:'語境片語遊戲', kind:'game', source:'S2_VOCAB_GAMES' },
    { id:'s2-micro-missions', stage:'s2-consolidate', route:'language', symbol:'M', title:'Digital & wellbeing missions', zh:'數碼與身心平衡任務鏈', kind:'game', source:'S2_MICRO_MISSIONS' },
    { id:'s2-micro-writing', stage:'s2-consolidate', route:'write', symbol:'MW', title:'Digital & wellbeing writing challenges', zh:'數碼與身心平衡寫作挑戰', kind:'advancedWriting', source:'S2_MICRO_MISSIONS' },
    { id:'s2-grammar-quest', stage:'s2-consolidate', route:'language', symbol:'Q', title:'Grammar Quest: Shape the argument', zh:'文法闖關：建構論點', kind:'game', source:'S2_GRAMMAR_QUEST' },
    { id:'s2-genre-writing', stage:'s2-consolidate', route:'write', symbol:'W+', title:'Narrative & argument scaffolds', zh:'記敘與議論寫作鷹架', kind:'advancedWriting', source:'S2_GENRE_WRITING' },
    { id:'s2-varied-grammar', stage:'s2-consolidate', route:'language', symbol:'E', title:'Editing and evidence clinic', zh:'修訂與證據診所', kind:'grammar', source:'S2_VARIED_PRACTICE' },
    { id:'s2-varied-reading', stage:'s2-consolidate', route:'read', symbol:'R+', title:'Paired message reading', zh:'配對訊息閱讀', kind:'reading', source:'S2_VARIED_PRACTICE' },
    { id:'s2-varied-listening', stage:'s2-consolidate', route:'listen', symbol:'L+', title:'Meeting-note listening', zh:'會議筆記聆聽', kind:'listening', source:'S2_VARIED_PRACTICE' },
    { id:'s2-varied-writing', stage:'s2-consolidate', route:'write', symbol:'W+', title:'Proposal writing planner', zh:'建議書寫作規劃', kind:'writing', source:'S2_VARIED_PRACTICE' },
    { id:'s2-interaction-dialogue', stage:'s2-consolidate', route:'listen', symbol:'D+', title:'Interaction dialogue lab', zh:'互動對話室', kind:'dialogues', source:'S2_INTERACTION_PLUS' },
    { id:'s2-interaction-speaking', stage:'s2-consolidate', route:'listen', symbol:'S+', title:'Speaking response studio', zh:'口語回應工作坊', kind:'speaking', source:'S2_INTERACTION_PLUS' },

    { id:'s3-ready-grammar', stage:'s3-ready', route:'language', symbol:'G', title:'Grammar for precision', zh:'精準文法', kind:'grammar', source:'S3_READY_PATHWAY' },
    { id:'s3-ready-vocabulary', stage:'s3-ready', route:'language', symbol:'V', title:'Academic word bank', zh:'學術詞彙庫', kind:'vocabulary', source:'S3_READY_PATHWAY' },
    { id:'s3-ready-reading', stage:'s3-ready', route:'read', symbol:'R', title:'Evaluate sources', zh:'評估來源', kind:'reading', source:'S3_READY_PATHWAY' },
    { id:'s3-ready-listening', stage:'s3-ready', route:'listen', symbol:'L', title:'Listen and respond', zh:'聆聽與回應', kind:'listening', source:'S3_READY_PATHWAY' },
    { id:'s3-ready-writing', stage:'s3-ready', route:'write', symbol:'W', title:'Formal response', zh:'正式回應寫作', kind:'writing', source:'S3_READY_PATHWAY' },
    { id:'s3-ready-advanced', stage:'s3-ready', route:'write', symbol:'W+', title:'Advanced writing lab', zh:'進階寫作室', kind:'advancedWriting', source:'S3_READY_PATHWAY' },
    { id:'s3-dse-grammar', stage:'s3-ready', route:'language', symbol:'D', title:'Senior-secondary grammar lab', zh:'高中銜接文法室', kind:'grammar', source:'S3_DSE_PREP' },
    { id:'s3-varied-grammar-bank', stage:'s3-ready', route:'language', symbol:'G+', title:'Grammar in formal response', zh:'正式回應文法題庫', kind:'grammar', source:'S1_S3_GRAMMAR_EXPANSION', bank:'s3Grammar' },
    { id:'s3-lexical-logic', stage:'s3-ready', route:'language', symbol:'LX', title:'Lexical logic lab', zh:'詞彙邏輯室', kind:'grammar', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s3Logic' },
    { id:'s3-sentence-rebuild', stage:'s3-ready', route:'language', symbol:'↔', title:'Sentence rebuild lab', zh:'句式重組室', kind:'reorder', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s3Reorder' },
    { id:'s3-curriculum-reading', stage:'s3-ready', route:'read', symbol:'RS', title:'Critical reading strategy lab', zh:'批判閱讀策略練習室', kind:'reading', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s3Reading' },
    { id:'s3-curriculum-writing', stage:'s3-ready', route:'write', symbol:'WS', title:'Argument & sentence-variety scaffold', zh:'議論與句式變化寫作鷹架', kind:'advancedWriting', source:'S1_S3_CURRICULUM_PRACTICE', bank:'s3Writing' },
    { id:'s3-dse-writing', stage:'s3-ready', route:'write', symbol:'D+', title:'DSE bridge writing models', zh:'DSE 銜接寫作範本', kind:'advancedWriting', source:'S3_DSE_PREP' },
    { id:'s3-integrated-assessment', stage:'s3-ready', route:'read', symbol:'IS', title:'Integrated skills assessment', zh:'綜合能力測驗', kind:'integrated', source:'S3_DSE_INTEGRATED' },
    { id:'s3-integrated-writing', stage:'s3-ready', route:'write', symbol:'IR', title:'Integrated response planner', zh:'綜合回應規劃', kind:'advancedWriting', source:'S3_DSE_INTEGRATED' },
    { id:'s3-listen-speak-integration', stage:'s3-ready', route:'listen', symbol:'LS', title:'Listen-to-speak simulations', zh:'聽力轉口語模擬', kind:'simulation', source:'S3_DSE_INTEGRATED' },
    { id:'s3-ready-dialogue', stage:'s3-ready', route:'listen', symbol:'D', title:'Evaluate and revise', zh:'評估與修訂', kind:'dialogues', source:'S3_READY_PATHWAY' },
    { id:'s3-ready-speaking', stage:'s3-ready', route:'listen', symbol:'S', title:'Present with evidence', zh:'以證據表達', kind:'speaking', source:'S3_READY_PATHWAY' },
    { id:'s3-critical-grammar', stage:'s3-ready', route:'language', symbol:'G+', title:'Critical grammar clinic', zh:'批判性思考文法診所', kind:'grammar', source:'S3_CRITICAL_PLUS' },
    { id:'s3-vocab-game', stage:'s3-ready', route:'language', symbol:'P', title:'Precision challenge game', zh:'精準片語挑戰', kind:'game', source:'S3_VOCAB_GAMES' },
    { id:'s3-varied-grammar', stage:'s3-ready', route:'language', symbol:'E', title:'Precision editing clinic', zh:'精準修訂診所', kind:'grammar', source:'S3_VARIED_PRACTICE' },    { id:'s3-varied-reading', stage:'s3-ready', route:'read', symbol:'R+', title:'Applied source review', zh:'應用來源檢視', kind:'reading', source:'S3_VARIED_PRACTICE' },    { id:'s3-varied-listening', stage:'s3-ready', route:'listen', symbol:'L+', title:'Panel listening and notes', zh:'小組討論聆聽與筆記', kind:'listening', source:'S3_VARIED_PRACTICE' },    { id:'s3-varied-writing', stage:'s3-ready', route:'write', symbol:'W+', title:'Applied writing planners', zh:'應用寫作規劃', kind:'writing', source:'S3_VARIED_PRACTICE' },
    { id:'s3-critical-dialogue', stage:'s3-ready', route:'listen', symbol:'D+', title:'Critical dialogue lab', zh:'批判性對話室', kind:'dialogues', source:'S3_CRITICAL_PLUS' },
    { id:'s3-critical-speaking', stage:'s3-ready', route:'listen', symbol:'S+', title:'Critical response studio', zh:'批判性回應工作坊', kind:'speaking', source:'S3_CRITICAL_PLUS' },
    { id:'s3-speaking-simulation', stage:'s3-ready', route:'listen', symbol:'SIM', title:'Speaking simulation toolkit', zh:'口語模擬與量規', kind:'simulation', source:'S3_SPEAKING_SIMULATIONS' },
    { id:'s3-critical-writing', stage:'s3-ready', route:'write', symbol:'W+', title:'Critical writing lab', zh:'批判性寫作室', kind:'advancedWriting', source:'S3_CRITICAL_PLUS' }
  ];

  const source = (name) => window[name] || {};
  const stage = () => stageList.find((item) => item.id === state.stage) || stageList[0];
  const modulesForStage = () => moduleRegistry.filter((module) => module.stage === state.stage);
  const modulesForRoute = () => modulesForStage().filter((module) => module.route === state.route);
  const currentModule = () => moduleRegistry.find((module) => module.id === state.moduleId) || modulesForRoute()[0] || modulesForStage()[0];

  function normalizeTuple(tuple, type) {
    if (!Array.isArray(tuple)) return tuple || {};
    if (type === 'grammar') return { id: tuple[0], contextTitle: tuple[1], prompt: tuple[2], promptZh: tuple[3], options: tuple[4], answer: tuple[5], explanation: tuple[6], explanationZh: tuple[7], hint: tuple[8] };
    if (type === 'reading') return { id: tuple[0], contextTitle: tuple[1], context: tuple[2], prompt: tuple[3], promptZh: tuple[4], options: tuple[5], answer: tuple[6], explanation: tuple[7], explanationZh: tuple[8], hint: tuple[9] };
    if (type === 'vocabulary') return { word: tuple[0], zh: tuple[1], definition: tuple[2], example: tuple[3], prompt: tuple[4], answer: tuple[5], options: tuple[6] };
    return {};
  }

  function itemsFor(module) {
    if (!module) return [];
    if (module.kind === 'bridgeGrammar') return (window.S1_BRIDGE_GRAMMAR?.questions || []).map((item) => ({ ...item, type:'quiz' }));
    if (module.kind === 'bridgeReading') return (window.S1_BRIDGE_SKILLS?.readingCloze?.questions || []).map((item) => ({ ...item, type:'quiz' }));
    if (module.kind === 'bridgeVocabulary') return (window.S1_BRIDGE_SKILLS?.vocabulary?.items || []).map((item) => ({ ...normalizeTuple(item, 'vocabulary'), type:'vocabulary' }));
    if (module.kind === 'bridgeListening') return flattenListening(window.S1_BRIDGE_SKILLS?.listening?.scripts || []);
    if (module.kind === 'bridgeWriting') return (window.S1_BRIDGE_WRITING?.writing || []).map((item) => ({ ...item, type:'writing' }));

    const data = source(module.source);
    if (module.kind === 'grammar') return ((module.bank ? data[module.bank] : data.grammar)?.questions || []).map((item) => { const normalized = { ...normalizeTuple(item, 'grammar'), type:'quiz' }; return { ...normalized, dseAnalysis: module.id === 's3-varied-grammar-bank' ? data.s3FormalResponseAnalysis?.[normalized.id] : null }; });
    if (module.kind === 'vocabulary') return (data.vocabulary?.items || []).map((item) => ({ ...normalizeTuple(item, 'vocabulary'), type:'vocabulary' }));
    if (module.kind === 'reading') {
      const reading = (module.bank ? data[module.bank] : data.reading) || {};
      if (reading.questions) return reading.questions.map((item) => ({ ...normalizeTuple(item, 'reading'), type:'quiz' }));
      return (reading.sets || []).flatMap((set) => (set.questions || []).map((tuple) => ({
        id: tuple[0], contextTitle: set.title, contextTitleZh: set.titleZh,
        context: (set.texts || []).map((text) => `${text.label || ''} — ${text.title || ''}\n${text.text || ''}`).join('\n\n'),
        prompt: tuple[1], promptZh: tuple[2], options: tuple[3], answer: tuple[4], explanation: tuple[5], explanationZh: tuple[6], hint: tuple[7], type:'quiz'
      })));
    }
    if (module.kind === 'listening') return flattenListening(data.listening?.scripts || []);
    if (module.kind === 'integrated') return (data.integratedAssessments || []).flatMap((set) => (set.questions || []).map((tuple) => ({
      id:tuple[0], contextTitle:set.title, contextTitleZh:set.titleZh,
      context:(set.materials || []).map((material) => `${material[0]}\n${material[1]}`).join('\n\n'),
      prompt:tuple[1], promptZh:tuple[2], options:tuple[3], answer:tuple[4], explanation:tuple[5], explanationZh:tuple[6], hint:tuple[7], type:'quiz'
    })));
    if (module.kind === 'writing') return (data.writing || []).filter((item) => item.level !== 'advanced').map((item) => ({ ...item, type:'writing' }));
    if (module.kind === 'advancedWriting') return ((module.bank ? data[module.bank] : (data.advancedWriting || data.writing)) || []).filter((item) => item.level === 'advanced').map((item) => ({ ...item, type:'advancedWriting' }));
    if (module.kind === 'reorder') return (data[module.bank]?.items || []).map((item) => ({ ...item, type:'reorder' }));
    if (module.kind === 'speaking') return (data.speaking || []).map((item) => ({ ...item, type:'speaking' }));
    if (module.kind === 'dialogues') return (data.dialogues || []).map((item) => ({ ...item, type:'dialogue' }));
    if (module.kind === 'game') return (data.games || []).filter((item) => !module.gameSet || item.set === module.gameSet).map((item) => ({ ...item, type:'game' }));
    if (module.kind === 'simulation') return (data.simulations || []).map((item) => ({ ...item, type:'simulation' }));
    return [];
  }

  function flattenListening(scripts) {
    return scripts.flatMap((script) => (script.questions || []).map((raw, questionIndex) => {
      const item = Array.isArray(raw) ? { prompt:raw[0], promptZh:raw[1], options:raw[2], answer:raw[3], explanation:raw[4], explanationZh:raw[5] } : raw;
      return { ...item, id:`${script.id || script.title}-${questionIndex}`, type:'listening', contextTitle:script.title, contextTitleZh:script.titleZh, script:script.script || script.text || '' };
    }));
  }

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = 'en-GB';
    voice.rate = .86;
    window.speechSynthesis.speak(voice);
  };

  function chooseStage(stageId) {
    const next = stageList.find((item) => item.id === stageId);
    state.stage = stageId;
    state.year = next?.year || 's1';
    state.route = modulesForStage().some((item) => item.route === 'read') ? 'read' : 'language';
    state.moduleId = modulesForRoute()[0]?.id || null;
    state.index = 0; state.selected = null; state.checked = false;
    render();
  }

  function chooseRoute(route) {
    state.route = route;
    state.moduleId = modulesForRoute()[0]?.id || null;
    state.index = 0; state.selected = null; state.checked = false;
    render();
  }

  function chooseModule(moduleId) {
    state.moduleId = moduleId;
    state.index = 0; state.selected = null; state.checked = false;
    render();
  }

  function stageSkillProgress(stageId) {
    const record = progress();
    return Object.entries(routeMeta).map(([route, meta]) => ({ label:meta.token, zh:meta.zh, count:moduleRegistry.filter((module) => module.stage === stageId && module.route === route).reduce((sum, module) => sum + (record.modules[module.id] || 0), 0) }));
  }

  const accuracy = (stat) => stat?.attempted ? Math.round((stat.correct / stat.attempted) * 100) : null;

  function objectiveFeedback(moduleId) {
    const stat = progress().moduleStats[moduleId];
    const percent = accuracy(stat);
    if (percent === null || stat.attempted < 3) return '<section class="learning-feedback"><strong>Practice evidence · 練習證據</strong><span>Answer at least 3 objective questions for a useful pattern. · 完成至少 3 題客觀題後，才會顯示有意義的練習模式。</span></section>';
    const message = percent >= 75 ? ['Secure practice pattern. Try a new module or explain one answer aloud.','表現穩定；可嘗試新模組，或把其中一題答案說明給自己聽。'] : percent >= 50 ? ['Developing pattern. Re-read the explanation and practise the context again.','正在發展；重看解釋，並再次練習相關情境。'] : ['Review needed. Use the hint and complete one related game or clinic before retrying.','需要重溫；先使用提示，完成相關遊戲或診所，再重試。'];
    return `<section class="learning-feedback"><strong>Objective practice feedback · 客觀題練習回饋</strong><b>${percent}% · ${stat.correct}/${stat.attempted}</b><span>${message[0]}<em>${message[1]}</em></span></section>`;
  }

  function learningDashboard(stageId) {
    const record = progress();
    const stageStat = record.stageStats[stageId] || { attempted:0, correct:0 };
    const stagePercent = accuracy(stageStat);
    const routeRows = Object.entries(routeMeta).map(([route, meta]) => {
      const stat = record.stageRouteStats[`${stageId}:${route}`] || { attempted:0, correct:0 };
      const percent = accuracy(stat);
      return `<span><b>${meta.token}</b>${percent === null ? '—' : `${percent}%`}<small>${stat.attempted} objective · 客觀題</small></span>`;
    }).join('');
    const weak = moduleRegistry.filter((module) => module.stage === stageId).map((module) => ({ module, stat:record.moduleStats[module.id] })).filter((item) => item.stat?.attempted >= 3).sort((a, b) => accuracy(a.stat) - accuracy(b.stat))[0];
    const nextStep = weak ? `Next focus: ${escape(weak.module.title)} · 下一步重點：${escape(weak.module.zh)} (${accuracy(weak.stat)}%)` : 'Answer 3 objective questions in one module to unlock a focused next step. · 在同一模組完成 3 題客觀題以取得個人化下一步。';
    return `<section class="learning-dashboard"><div><p class="eyebrow">LEARNING INSIGHTS · 學習成效</p><h3>${stagePercent === null ? 'Not enough objective evidence yet' : `${stagePercent}% objective accuracy`}</h3><p>${stageStat.attempted} answered objective items · 已完成 ${stageStat.attempted} 題客觀題</p></div><div class="insight-routes">${routeRows}</div><p class="next-step">${nextStep}</p><p class="privacy-note">Local practice record only. It is not a diagnostic, school record or score prediction. Writing and speaking are not automatically scored.<span class="zh">紀錄只儲存在此瀏覽器；並非診斷、學校紀錄或分數預測。寫作與口語不會被自動評核。</span></p><button class="secondary compact" data-clear-progress>Clear local progress & drafts · 清除本機進度及草稿</button></section>`;
  }

  function renderShell() {
    const record = progress();
    const activeStage = stage();
    const stageProgress = stageSkillProgress(activeStage.id);
    return `
      <section class="hero">
        <div>
          <p class="eyebrow">S1–S3 ENGLISH PRACTICE · 中學英文練習</p>
          <h1>Read with evidence.<br><em>Respond with purpose.</em></h1>
          <p>Choose a stage and one skill. Build secure English for school, community and everyday ideas.</p>
          <p class="zh">選擇階段及技能，逐步建立閱讀、寫作、聆聽、口語與語言運用能力。</p>
          <div class="hero-actions"><button class="primary" data-try-s1-quest>Try S1 Grammar Quest · 試玩 S1 文法闖關</button><button class="secondary hero-dse-demo" data-try-s3-formal>Try S3 Formal Response Lab · 試玩 S3 正式回應文法室</button><small>Choose an answer, then check it to see live feedback. The S3 lab also shows a DSE-bridge solution path. · 選擇答案後核對，即可查看即時回饋；S3 文法室另有 DSE 銜接解題步驟。</small></div>
        </div>
        <aside class="hero-notice"><strong>${escape(activeStage.code)}</strong><p>${escape(activeStage.title)}<br><span class="zh">${escape(activeStage.titleZh)}</span></p><span class="notice-tag">ORIGINAL PRACTICE · 原創練習</span></aside>
      </section>
      <section class="start-guide" aria-label="首次使用指引"><header><strong>Start in 4 steps · 四步開始</strong><span>Follow the numbered controls below. · 跟著下方的編號選項練習。</span></header><div class="guide-steps"><div class="guide-step"><b>1</b><span><strong>Choose a stage</strong><small>選擇 S1、S2 或 S3 的學習階段。</small></span></div><div class="guide-step"><b>2</b><span><strong>Choose a skill</strong><small>選閱讀、寫作、聽說或語言運用。</small></span></div><div class="guide-step"><b>3</b><span><strong>Choose a module</strong><small>選一個主題，題目會在右方出現。</small></span></div><div class="guide-step"><b>4</b><span><strong>Answer, check, next</strong><small>完成客觀題後查看即時回饋，再做下一題。</small></span></div></div></section>
      <section class="workspace">
        <aside class="rail">
          <section><p class="eyebrow">YOUR PROGRESS · 學習進度</p><h2>${record.completed} tasks</h2><p>Local to this browser only.<br>只儲存在此瀏覽器。</p><div class="mini-progress"><i style="width:${Math.min(100, record.completed * 3)}%"></i></div><div class="skill-progress">${stageProgress.map((item) => `<span><b>${item.label}</b>${item.count} ${escape(item.zh)}</span>`).join('')}</div></section>
          ${learningDashboard(activeStage.id)}
          <section><p class="eyebrow">CHOOSE A STAGE · 選擇階段</p><div class="stage-list">${stageList.map((item) => `<button class="stage-btn ${item.id === state.stage ? 'active' : ''}" data-stage="${item.id}"><b>${escape(item.code)} · ${escape(item.title)}</b><span>${escape(item.titleZh)}</span></button>`).join('')}</div></section>
          <section><p class="eyebrow">CHOOSE A SKILL · 選擇技能</p><div class="route-list">${Object.entries(routeMeta).map(([id, meta]) => `<button class="route-btn ${id === state.route ? 'active' : ''}" data-route="${id}"><i class="route-token">${meta.token}</i><b>${meta.title}<span>${meta.zh}</span></b></button>`).join('')}</div></section>
        </aside>
        <section class="main-panel">${renderModules()}${renderTask()}</section>
      </section>`;
  }

  function renderModules() {
    const route = routeMeta[state.route];
    const modules = modulesForRoute();
    return `<header class="section-head"><div><p class="eyebrow">${escape(stage().code)} · ${escape(route.title.toUpperCase())}</p><h2>${escape(route.title)} <span class="zh">${escape(route.zh)}</span></h2></div><p>${escape(route.note)}<br><span class="zh">${escape(route.noteZh)}</span></p></header>
      <aside class="pathway-note"><strong>Capability pathway · 能力範圍</strong><span>${escape(stage().pathway || '')}<em>${escape(stage().pathwayZh || '')}</em></span></aside>
      <div class="module-grid">${modules.length ? modules.map((module) => `<button class="module-card ${module.id === currentModule()?.id ? 'active' : ''}" data-module="${module.id}"><i class="module-symbol">${escape(module.symbol)}</i><h3>${escape(module.title)}</h3><p>${escape(module.zh)}</p><small>${escape(stage().code)} · ORIGINAL</small></button>`).join('') : '<div class="empty">Choose another skill. · 請選擇其他技能。</div>'}</div>`;
  }

  function renderTask() {
    const module = currentModule();
    if (!module) return '<section class="task-board"><div class="empty">This stage is being prepared. · 此階段正在準備中。</div></section>';
    const items = itemsFor(module);
    if (!items.length) return `<section class="task-board"><div class="empty">This original module is being prepared. · 此原創單元正在準備中。</div></section>`;
    if (state.index >= items.length) state.index = 0;
    const item = items[state.index];
    const header = `<section class="task-board"><header class="task-top"><div><p class="eyebrow">${escape(stage().code)} · ${escape(module.title.toUpperCase())}</p><h2>${escape(module.title)} <span class="zh">${escape(module.zh)}</span></h2><small>Original practice · 原創練習</small></div><span class="step">${state.index + 1} / ${items.length}</span></header>`;
    const body = renderItem(item, module, items.length);
    return `${header}${body}</section>`;
  }

  function bilingualLine(english, chinese) {
    return `${escape(english || '')}${chinese ? `<span class="zh">${escape(chinese)}</span>` : ''}`;
  }

  function renderDseAnalysis(analysis) {
    if (!analysis) return '';
    const steps = Array.isArray(analysis.steps) ? analysis.steps : [];
    const stepsZh = Array.isArray(analysis.stepsZh) ? analysis.stepsZh : [];
    return `<section class="dse-analysis"><header><p class="eyebrow">DSE BRIDGE SOLUTION PATH · DSE 銜接解題步驟</p><h3>${escape(analysis.focus || 'Formal response reasoning')} <span class="zh">${escape(analysis.focusZh || '')}</span></h3><p>This original S3 analysis develops transferable senior-secondary response skills. It is not an official HKDSE question, marking scheme or predicted result.<span class="zh">本原創中三解析培養可轉移的高中回應技巧；並非官方 HKDSE 題目、評分準則或成績預測。</span></p></header><ol>${steps.map((step, index) => `<li><b>${index + 1}</b><span>${escape(step)}<em>${escape(stepsZh[index] || '')}</em></span></li>`).join('')}</ol><div class="dse-transfer"><strong>DSE bridge connection · DSE 銜接重點</strong><span>${escape(analysis.transfer || '')}<em>${escape(analysis.transferZh || '')}</em></span></div></section>`;
  }

  function renderItem(item, module) {
    if (item.type === 'writing' || item.type === 'advancedWriting') return renderWriting(item, module);
    if (item.type === 'speaking') return renderSpeaking(item, module);
    if (item.type === 'dialogue') return renderDialogue(item, module);
    if (item.type === 'game') return renderGame(item, module);
    if (item.type === 'simulation') return renderSimulation(item, module);
    if (item.type === 'reorder') return renderReorder(item, module);
    const context = item.context || item.script || '';
    const title = item.contextTitle || item.word || '';
    const prompt = item.type === 'vocabulary' ? (item.prompt || `Which word matches: ${item.definition || item.word}?`) : item.prompt;
    const promptZh = item.type === 'vocabulary' ? (item.zh || '') : item.promptZh;
    const options = item.options || [];
    const answer = Number(item.answer || 0);
    return `${context ? `<article class="context"><strong>${escape(title || (item.type === 'listening' ? 'Listening script' : 'Read this text'))}</strong>${item.type === 'listening' ? `<button class="secondary" data-say="${escape(context)}">▶ Replay script · 重播內容</button>` : ''}<div>${escape(context)}</div></article>` : (item.type === 'vocabulary' ? `<article class="context"><strong>${escape(item.word)}</strong><span class="zh">${escape(item.zh || '')}</span><div>${escape(item.definition || '')}<br><em>${escape(item.example || '')}</em></div></article>` : '')}
      ${item.format ? `<span class="format-chip">${escape(item.format)}<em>${escape(item.formatZh || '')}</em></span>` : ''}
      <p class="prompt">${bilingualLine(prompt, promptZh)}</p>
      <div class="options">${options.map((option, index) => { const resultClass = state.checked ? (index === answer ? 'correct' : (index === state.selected ? 'wrong' : '')) : (index === state.selected ? 'selected' : ''); return `<button class="option ${resultClass}" data-option="${index}"><b>${letters[index] || index + 1}</b><span>${escape(option)}</span></button>`; }).join('')}</div>
      <div class="controls"><button class="primary" data-check="true">Check answer · 核對答案</button><button class="secondary" data-next="true">Next · 下一題</button>${item.hint ? `<button class="secondary" data-hint="${escape(item.hint)}">Hint · 提示</button>` : ''}</div>
      ${state.checked ? `<div class="feedback ${state.selected === answer ? 'good' : 'bad'}"><strong>${state.selected === answer ? '✓ Good thinking.' : 'Try the evidence again.'}</strong><br>${bilingualLine(item.explanation || '', item.explanationZh || '')}</div>${renderDseAnalysis(item.dseAnalysis)}${objectiveFeedback(module.id)}` : ''}`;
  }

  function renderReorder(item, module) {
    const selected = state.reorder || [];
    const available = (item.chunks || []).map((chunk, index) => ({ chunk, index })).filter((part) => !selected.includes(part.index));
    const correct = Array.isArray(item.answer) && selected.length === item.answer.length && selected.every((part, index) => part === item.answer[index]);
    return `<article class="rebuild-card"><p class="eyebrow">SENTENCE REBUILD · 句式重組</p><h3>${escape(item.title || '')}<span class="zh">${escape(item.titleZh || '')}</span></h3><p>${bilingualLine(item.prompt || '', item.promptZh || '')}</p><section class="rebuild-answer"><strong>Your sequence · 你的排序</strong><div>${selected.length ? selected.map((index, order) => `<button class="rebuild-chip selected" data-reorder-remove="${index}" ${state.checked ? 'disabled' : ''}><b>${order + 1}</b>${escape(item.chunks[index])}</button>`).join('') : '<span class="rebuild-empty">Select the chunks below. · 從下方選擇句塊。</span>'}</div></section><section class="rebuild-bank"><strong>Sentence chunks · 句子組件</strong><div>${available.map((part) => `<button class="rebuild-chip" data-reorder-add="${part.index}" ${state.checked ? 'disabled' : ''}>${escape(part.chunk)}</button>`).join('')}</div></section><div class="controls"><button class="primary" data-check-reorder>Check sequence · 核對排序</button><button class="secondary" data-reorder-reset ${state.checked ? 'disabled' : ''}>Reset · 重設</button><button class="secondary" data-next>Next rebuild · 下一題</button>${item.hint ? `<button class="secondary" data-hint="${escape(item.hint)}">Hint · 提示</button>` : ''}</div>${state.checked ? `<div class="feedback ${correct ? 'good' : 'bad'}"><strong>${correct ? '✓ Accurate rebuild.' : 'Check the sentence pattern again.'}</strong><br>${bilingualLine(item.explanation || '', item.explanationZh || '')}<span class="correct-sentence">${escape(item.correctSentence || '')}</span></div>${objectiveFeedback(module.id)}` : ''}</article>`;
  }

  function renderGame(item, module) {
    const options = item.options || [];
    const answer = Number(item.answer || 0);
    const mission = item.mission || null;
    return `${mission ? `<article class="mission-brief"><div class="mission-head"><span>${escape(mission.chain || 'Micro mission · 微型任務')}</span><b>${escape(mission.step || '')}<em>${escape(mission.stepZh || '')}</em></b></div><h3>${escape(item.title || '')}<span class="zh">${escape(item.titleZh || '')}</span></h3><p>${escape(mission.goal || '')}<span class="zh">${escape(mission.goalZh || '')}</span></p><div class="mission-next"><strong>Next move · 下一步</strong><span>${escape(mission.next || '')}<em>${escape(mission.nextZh || '')}</em></span></div></article>` : ''}${item.phraseBank?.length ? `<article class="phrase-bank"><strong>${escape(item.bankLabel || 'Phrase bank · 片語庫')}</strong><div>${item.phraseBank.map((phrase) => `<span>${escape(phrase)}</span>`).join('')}</div></article>` : ''}
      <p class="prompt">${bilingualLine(item.prompt || 'Choose the best phrase.', item.promptZh || '')}</p>
      <div class="options">${options.map((option, index) => { const resultClass = state.checked ? (index === answer ? 'correct' : (index === state.selected ? 'wrong' : '')) : (index === state.selected ? 'selected' : ''); return `<button class="option ${resultClass}" data-option="${index}"><b>${letters[index] || index + 1}</b><span>${escape(option)}</span></button>`; }).join('')}</div>
      <div class="controls"><button class="primary" data-check="true">Check phrase · 核對片語</button><button class="secondary" data-next="true">Next round · 下一回合</button>${item.hint ? `<button class="secondary" data-hint="${escape(item.hint)}">Hint · 提示</button>` : ''}</div>
      ${state.checked ? `<div class="feedback ${state.selected === answer ? 'good' : 'bad'}"><strong>${state.selected === answer ? '✓ Strong choice.' : 'Try for greater precision.'}</strong><br>${bilingualLine(item.explanation || '', item.explanationZh || '')}</div>${objectiveFeedback(module.id)}` : ''}`;
  }

  function renderSimulation(item) {
    const rubric = item.rubric || [];
    const checks = item.selfCheck || [];
    return `${item.audioScript ? `<article class="context"><strong>${escape(item.audioTitle || 'Listening input · 聆聽內容')}</strong><button class="secondary" data-say="${escape(item.audioScript)}">▶ Replay input · 重播內容</button><div>${escape(item.audioScript)}</div></article>` : ''}
      ${item.listeningFocus?.length ? `<article class="phrase-bank"><strong>Listening note targets · 聆聽筆記重點</strong><div>${item.listeningFocus.map((focus) => `<span>${escape(focus)}</span>`).join('')}</div></article>` : ''}
      <article class="simulation-card"><strong>Scenario · 情境</strong><p>${escape(item.roleCard || '')}</p><span class="zh">${escape(item.roleCardZh || '')}</span><small>${escape(item.time || '')}<span class="zh">${escape(item.timeZh || '')}</span></small></article>
      ${item.languageBank?.length ? `<article class="phrase-bank"><strong>Useful language · 有用語句</strong><div>${item.languageBank.map((phrase) => `<span>${escape(phrase)}</span>`).join('')}</div></article>` : ''}
      <div class="controls"><button class="primary" data-say="${escape(item.model || item.roleCard || '')}">▶ Play model · 播放示範</button></div>
      ${item.model ? `<article class="context"><strong>Model response · 示範回應</strong>${escape(item.model)}</article>` : ''}
      <section class="rubric"><h3>Practice rubric · 練習評量量規</h3><p>This descriptive rubric supports self-checking or teacher feedback. It is not an official marking scheme and does not create an automated score.<span class="zh">此描述性量規供自評或老師回饋，並非官方評分準則，亦不會產生自動分數。</span></p>${rubric.map((row) => { const pair = Array.isArray(row) ? { title:row[0], text:row[1] } : row; return `<article><strong>${escape(pair.title || '')}</strong><span>${escape(pair.text || '')}</span></article>`; }).join('')}</section>
      ${checks.length ? `<ol class="plan-list">${checks.map((check) => `<li>${escape(check)}</li>`).join('')}</ol>` : ''}
      <div class="feedback">Practise once, adapt the situation, then use the rubric to set one next-step goal.<span class="zh">先練習一次，再調整情境；使用量規訂立一項下一步目標。</span></div>`;
  }

  function renderWriting(item) {
    const pack = item.sourcePack || item.pack || [];
    const plan = Array.isArray(item.paragraphMap || item.plan) ? (item.paragraphMap || item.plan) : (item.plan ? [item.plan] : []);
    const target = item.minWords || item.minimumWords || (item.type === 'advancedWriting' ? 140 : 100);
    return `${pack.length ? `<div class="writing-pack">${pack.map((part) => { const pair = Array.isArray(part) ? { title:part[0], text:part[1] } : part; return `<article><strong>${escape(pair.title || pair.label || '')}</strong><p>${escape(pair.text || pair.detail || pair.value || '')}</p></article>`; }).join('')}</div>` : ''}
      <p class="prompt">${bilingualLine(item.prompt || item.title || 'Write your response.', item.promptZh || item.titleZh || '')}</p>
      ${plan.length ? `<ol class="plan-list">${plan.map((step) => { const pair = Array.isArray(step) ? { title:step[0], text:step[1] } : step; return `<li>${escape(typeof pair === 'string' ? pair : pair.title || pair.text || '')}${typeof pair === 'object' && (pair.text || pair.zh) ? `<span class="zh">${escape(pair.text || pair.zh)}</span>` : ''}</li>`; }).join('')}</ol>` : ''}
      ${item.audioScript ? `<article class="context"><strong>${escape(item.audioTitle || 'Listening input · 聆聽內容')}</strong><button class="secondary" data-say="${escape(item.audioScript)}">▶ Replay input · 重播內容</button><div>${escape(item.audioScript)}</div></article>` : ''}
      ${item.languageBank?.length ? `<article class="context"><strong>Language bank · 句式庫</strong>${item.languageBank.map(escape).join(' · ')}</article>` : ''}
      ${item.model ? `<article class="model-exemplar"><strong>Original model for analysis · 原創範本供分析</strong><p>${escape(item.model)}</p><span>This is original practice support, not an official HKDSE script or marking exemplar.<br>此為原創練習支援，並非官方 HKDSE 範本或評分示例。</span></article>` : ''}
      <textarea class="draft" id="draft" placeholder="Write in English here… · 在此以英文寫作…">${escape(getDraft(currentModule().id))}</textarea>
      <div class="word-row"><span id="word-count">${getDraft(currentModule().id).trim().split(/\s+/).filter(Boolean).length} words · ${getDraft(currentModule().id).trim().split(/\s+/).filter(Boolean).length} 字</span><span>Target: ${target}+ words · 最少 ${target} 字</span></div>
      <div class="controls"><button class="primary" data-record-writing="${target}">Record completion · 記錄完成</button><button class="secondary" data-say="${escape(item.model || item.prompt || '')}">▶ Replay task · 重播題目</button><button class="secondary" data-clear-draft>Clear saved draft · 清除已儲存草稿</button></div>
      <div class="feedback">This is a completion self-check. It does not score language quality automatically.<span class="zh">此為完成自我檢查，不會自動評核語言質素。</span></div>`;
  }

  function renderSpeaking(item) {
    const model = item.model || item.example || '';
    const checks = Array.isArray(item.selfCheck || item.checklist) ? (item.selfCheck || item.checklist) : (item.selfCheck ? [item.selfCheck] : []);
    return `<p class="prompt">${bilingualLine(item.prompt || item.title || 'Speak clearly and use your plan.', item.promptZh || item.titleZh || '')}</p>
      ${model ? `<article class="context"><strong>Model · 示範</strong>${escape(model)}</article>` : ''}
      <div class="controls"><button class="primary" data-say="${escape(model || item.prompt || '')}">▶ Play model · 播放示範</button></div>
      ${checks.length ? `<ol class="plan-list">${checks.map((check) => `<li>${escape(check)}</li>`).join('')}</ol>` : ''}
      <div class="feedback">Speak, adapt one detail, then self-check your completion. No automated speech-quality score is given.<span class="zh">先說一遍，再自行改動一個細節；本頁不會自動評核口語質素。</span></div>`;
  }

  function renderDialogue(item) {
    const lines = item.lines || item.dialogue || [];
    const checkpoint = item.checkpoints?.[0] || item.questions?.[0] || {};
    const cleanLines = lines.map((line) => Array.isArray(line) ? { speaker:line[0], text:line[1] } : (typeof line === 'string' ? { speaker:'', text:line } : line));
    const options = checkpoint.options || [];
    const answer = Number(checkpoint.answer || 0);
    return `<p class="prompt">${bilingualLine(item.goal || item.prompt || item.title || 'Listen, respond and adapt.', item.goalZh || item.promptZh || item.titleZh || '')}</p>
      <div class="controls"><button class="primary" data-say="${escape(cleanLines.map((line) => line.text || line.line || '').join(' '))}">▶ Play dialogue · 播放完整對話</button></div>
      <div class="dialogue">${cleanLines.map((line, index) => `<div class="line ${index % 2 ? 'b' : ''}"><b>${escape(line.speaker || line.role || '')}</b>${escape(line.text || line.line || '')}</div>`).join('')}</div>
      ${checkpoint.prompt ? `<article class="context"><strong>${escape(checkpoint.prompt)}</strong><span class="zh">${escape(checkpoint.promptZh || '')}</span></article>
      <div class="options">${options.map((option, index) => { const resultClass = state.checked ? (index === answer ? 'correct' : (index === state.selected ? 'wrong' : '')) : (index === state.selected ? 'selected' : ''); return `<button class="option ${resultClass}" data-option="${index}"><b>${letters[index] || index + 1}</b><span>${escape(option)}</span></button>`; }).join('')}</div>
      <div class="controls"><button class="primary" data-check>Check answer · 核對答案</button>${state.checked ? '<button class="secondary" data-next>Next dialogue · 下一個對話</button>' : ''}</div>
      ${state.checked ? `<div class="feedback ${state.selected === answer ? 'good' : 'bad'}"><strong>${state.selected === answer ? '✓ Good thinking.' : 'Try the evidence again.'}</strong><br>${bilingualLine(checkpoint.explanation || '', checkpoint.explanationZh || '')}</div>${objectiveFeedback(module.id)}` : ''}` : '<div class="feedback">Practise both roles. Then change one detail to make the dialogue your own.<span class="zh">練習兩個角色後，修改一個細節，讓對話變成你自己的版本。</span></div>'}`;
  }

  function checkCurrentAnswer() {
    const items = itemsFor(currentModule());
    const item = items[state.index];
    if (!item) return;
    if (item.type === 'reorder') {
      const answer = item.answer || [];
      if ((state.reorder || []).length !== answer.length) return;
      state.checked = true;
      mark(currentModule().id, state.reorder.every((part, index) => part === answer[index]));
      render();
      return;
    }
    if (state.selected === null) return;
    const answer = item.type === 'dialogue' ? item.checkpoints?.[0]?.answer : item.answer;
    state.checked = true;
    mark(currentModule().id, Number(answer || 0) === state.selected);
    render();
  }

  function bind() {
    root.querySelectorAll('[data-stage]').forEach((button) => button.addEventListener('click', () => chooseStage(button.dataset.stage)));
    root.querySelectorAll('[data-try-s1-quest]').forEach((button) => button.addEventListener('click', () => { state.stage = 's1-extend'; state.year = 's1'; state.route = 'language'; state.moduleId = 's1-grammar-quest'; state.index = 0; state.selected = null; state.reorder = []; state.checked = false; render(); }));
    root.querySelectorAll('[data-try-s3-formal]').forEach((button) => button.addEventListener('click', () => { state.stage = 's3-ready'; state.year = 's3'; state.route = 'language'; state.moduleId = 's3-varied-grammar-bank'; state.index = 0; state.selected = null; state.reorder = []; state.checked = false; render(); }));
    root.querySelectorAll('[data-route]').forEach((button) => button.addEventListener('click', () => chooseRoute(button.dataset.route)));
    root.querySelectorAll('[data-module]').forEach((button) => button.addEventListener('click', () => chooseModule(button.dataset.module)));
    root.querySelectorAll('[data-option]').forEach((button) => button.addEventListener('click', () => { if (!state.checked) { state.selected = Number(button.dataset.option); render(); } }));
    root.querySelectorAll('[data-check]').forEach((button) => { button.onclick = checkCurrentAnswer; });
    root.querySelectorAll('[data-check-reorder]').forEach((button) => { button.onclick = checkCurrentAnswer; });
    root.querySelectorAll('[data-reorder-add]').forEach((button) => button.addEventListener('click', () => { if (!state.checked) { state.reorder.push(Number(button.dataset.reorderAdd)); render(); } }));
    root.querySelectorAll('[data-reorder-remove]').forEach((button) => button.addEventListener('click', () => { if (!state.checked) { state.reorder = state.reorder.filter((index) => index !== Number(button.dataset.reorderRemove)); render(); } }));
    root.querySelectorAll('[data-reorder-reset]').forEach((button) => button.addEventListener('click', () => { if (!state.checked) { state.reorder = []; render(); } }));
    root.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => { const items = itemsFor(currentModule()); state.index = (state.index + 1) % items.length; state.selected = null; state.reorder = []; state.checked = false; render(); }));
    root.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => { const message = document.createElement('div'); message.className = 'feedback'; message.innerHTML = `<strong>Hint · 提示</strong><br>${escape(button.dataset.hint)}`; button.closest('.task-board').appendChild(message); button.remove(); }));
    root.querySelectorAll('[data-say]').forEach((button) => button.addEventListener('click', () => speak(button.dataset.say)));
    const draft = $('#draft');
    if (draft) draft.addEventListener('input', () => { const count = draft.value.trim().split(/\s+/).filter(Boolean).length; $('#word-count').textContent = `${count} words · ${count} 字`; saveDraft(currentModule().id, draft.value); });
    root.querySelectorAll('[data-clear-draft]').forEach((button) => button.addEventListener('click', () => { clearDraft(currentModule().id); render(); }));
    root.querySelectorAll('[data-clear-progress]').forEach((button) => button.addEventListener('click', () => { localStorage.removeItem(progressKey); localStorage.removeItem(draftKey); render(); }));
    root.querySelectorAll('[data-record-writing]').forEach((button) => button.addEventListener('click', () => { const count = ($('#draft')?.value || '').trim().split(/\s+/).filter(Boolean).length; const target = Number(button.dataset.recordWriting); const box = document.createElement('div'); box.className = `feedback ${count >= target ? 'good' : 'bad'}`; box.innerHTML = count >= target ? '<strong>✓ Completion recorded locally.</strong><br>Keep checking your evidence, organisation and accuracy.' : `<strong>Keep writing.</strong><br>You have ${count} words. Aim for at least ${target}.`; button.closest('.task-board').appendChild(box); if (count >= target) mark(currentModule().id, true, false); }));
  }

  function render() { root.innerHTML = renderShell(); bind(); }
  state.moduleId = modulesForRoute()[0]?.id || null;
  render();
})();
