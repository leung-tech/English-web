window.JUNIOR_REWARDS = {
  title: 'Junior Star Trail',
  titleZh: '初小星星學習旅程',
  points: {
    correct: 10,
    attempt: 3
  },
  badges: [
    {
      id: 'first-spark',
      mark: '★',
      title: 'First Spark',
      titleZh: '起步星光',
      description: 'Complete your first phonics or listening answer.',
      descriptionZh: '完成第一題拼音或聆聽練習。',
      condition: { type: 'attempted', value: 1 }
    },
    {
      id: 'sound-scout',
      mark: 'S',
      title: 'Sound Scout',
      titleZh: '聲音小偵探',
      description: 'Try five Phonics & story game questions.',
      descriptionZh: '完成 5 題拼音與故事遊戲。',
      condition: { type: 'phonicsAttempted', value: 5 }
    },
    {
      id: 'listening-lantern',
      mark: 'L',
      title: 'Listening Lantern',
      titleZh: '聆聽小燈籠',
      description: 'Try five Listening lab questions.',
      descriptionZh: '完成 5 題聆聽練習室。',
      condition: { type: 'listeningAttempted', value: 5 }
    },
    {
      id: 'word-wizard',
      mark: 'W',
      title: 'Word Wizard',
      titleZh: '詞語小魔法師',
      description: 'Answer five Phonics & story game questions correctly.',
      descriptionZh: '答對 5 題拼音與故事遊戲。',
      condition: { type: 'phonicsCorrect', value: 5 }
    },
    {
      id: 'careful-ear',
      mark: 'E',
      title: 'Careful Ear',
      titleZh: '細心小耳朵',
      description: 'Answer five Listening lab questions correctly.',
      descriptionZh: '答對 5 題聆聽練習室。',
      condition: { type: 'listeningCorrect', value: 5 }
    },
    {
      id: 'junior-trailblazer',
      mark: 'T',
      title: 'Junior Trailblazer',
      titleZh: '初小學習先鋒',
      description: 'Answer twenty junior phonics or listening questions correctly.',
      descriptionZh: '累計答對 20 題初小拼音或聆聽題。',
      condition: { type: 'correct', value: 20 }
    }
  ]
};
