(() => {
  // Original S1–S3 contextual cloze practice. It is curriculum-aligned
  // preparation only, not an official examination paper or answer key.
  const q = (id, contextTitle, context, contextZh, options, answer, explanation, explanationZh, hint) => ({
    id,
    contextTitle,
    context: `${context}\n\n${contextZh}`,
    prompt: 'Choose the best word to complete the passage.',
    promptZh: '選出最適合填入段落的字詞。',
    options,
    answer,
    explanation,
    explanationZh,
    hint,
  });

  window.S1_S3_CONTEXTUAL_CLOZE_2026 = {
    s1Cloze: { questions: [
      q('s1-cc-01', 'Mini cloze: Class garden', 'Our class is starting a small garden. We will plant herbs in recycled containers, _____ we will water them every Monday and Thursday.', '我們班正開始一個小花園。我們會在回收容器種植香草，_____會在每逢星期一和星期四澆水。', ['and', 'but', 'because', 'although'], 0, 'And joins two planned actions that add information: planting herbs and watering them. The sentence does not show a contrast, reason or concession.', 'and 連接兩個補充的計劃行動：種植香草及澆水。句子沒有表示對比、原因或讓步。', 'Are the two actions added together? 這兩個行動是否互相補充？'),
      q('s1-cc-02', 'Mini cloze: Class garden', 'The plants need sunlight, _____ the class placed the containers near the windows.', '植物需要陽光，_____全班把容器放在窗邊。', ['so', 'or', 'while', 'unless'], 0, 'So introduces a result. Because the plants need sunlight, the class chose a place near the windows.', 'so 引出結果。因為植物需要陽光，全班選擇把容器放在窗邊。', 'Which word shows a result? 哪個字表示結果？'),
      q('s1-cc-03', 'Mini cloze: Class garden', 'If the soil is dry, the garden helpers _____ it before lunch.', '如果泥土乾了，園藝助手會在午飯前_____它。', ['will water', 'watered', 'are watering', 'has watered'], 0, 'This is a first conditional: if + present simple (is) and will + base verb in the main clause. Therefore, will water is correct.', '這是第一類條件句：if 從句用一般現在式（is），主句用 will + 動詞原形。因此 will water 正確。', 'Match If the soil is dry with a future result. 將 If the soil is dry 配合未來結果。'),
    ] },
    s2Cloze: { questions: [
      q('s2-cc-01', 'Mini cloze: Screen-time survey', 'The student council has collected comments about screen time. Several students said they had _____ their phones away during homework time.', '學生會已收集有關螢幕時間的意見。幾位學生說他們在做功課時已把電話_____。', ['put', 'putting', 'puts', 'to put'], 0, 'After had, use the past participle. Put has the same base form, past form and past participle, so had put is correct.', 'had 後使用過去分詞。put 的原形、過去式和過去分詞相同，因此 had put 正確。', 'After had, look for a past participle. had 後尋找過去分詞。'),
      q('s2-cc-02', 'Mini cloze: Screen-time survey', '_____ the comments came from one year group, the council will ask other students before suggesting a school-wide change.', '_____意見來自一個年級，學生會會先詢問其他學生，才建議全校改變。', ['Although', 'Therefore', 'For example', 'Meanwhile'], 0, 'Although introduces a limitation or contrast: the comments are useful, but they represent only one year group. This supports asking more students.', 'Although 引出限制或對比：這些意見有用，但只代表一個年級，因此需要詢問更多學生。', 'The first clause limits the evidence. 第一個子句限制證據範圍。'),
      q('s2-cc-03', 'Mini cloze: Screen-time survey', 'The council wants a solution that is practical _____ different families’ routines.', '學生會希望有一個方案，既實際又_____不同家庭的作息。', ['for', 'at', 'of', 'with'], 0, 'Practical for means suitable or workable for a group of people. Here, the solution should suit different families’ routines.', 'practical for 表示對某群人而言合適或可行。這裡方案應配合不同家庭的作息。', 'Learn the phrase practical for someone. 記住 practical for someone 這個片語。'),
    ] },
    s3Cloze: { questions: [
      q('s3-cc-01', 'Mini cloze: Community feedback report', 'The committee received feedback from residents and shop owners. The comments _____ before a final recommendation is written.', '委員會收到居民和店主的意見。最終建議書寫好前，這些意見必須_____。', ['must be compared', 'must compare', 'are must compared', 'must comparing'], 0, 'The comments receive the action. After must, use the passive form be + past participle: must be compared.', '意見是接受動作的一方。must 後使用被動語態 be + 過去分詞：must be compared。', 'Build the passive in three parts: must + be + compared. 用三部分組成被動語態：must + be + compared。'),
      q('s3-cc-02', 'Mini cloze: Community feedback report', 'The first survey was useful; _____, it did not include people who visit the area only at weekends.', '第一份調查很有用；_____，它沒有包括只在週末到訪該區的人。', ['however', 'therefore', 'for instance', 'similarly'], 0, 'However signals a contrast or qualification. The second clause limits how complete the survey evidence is.', 'however 表示對比或限制。第二個子句限制調查證據的完整程度。', 'Does the second clause add a limit to the first? 第二個子句是否為第一個子句補充限制？'),
      q('s3-cc-03', 'Mini cloze: Community feedback report', 'The report explains _____ the committee will use comments, observations and sales records together.', '報告解釋委員會_____把意見、觀察及銷售紀錄一起使用。', ['how', 'how will', 'that how', 'what will'], 0, 'After explains, use a noun clause with statement word order: how the committee will use. Do not use question word order.', '在 explains 後，用陳述語序的名詞子句：how the committee will use。不要使用問句語序。', 'In a noun clause, place the subject before will. 名詞子句中，把主語放在 will 前。'),
    ] },
  };
})();
