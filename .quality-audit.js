const fs = require('fs');
const vm = require('vm');

const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const file of ['english-scope.js', 'writing-models.js', 'pre-s1-writing-model.js', 'senior-oral-listening.js', 'listening-speaking-extension.js', 'junior-senior-extension.js', 'question-bank-expansion.js', 'hong-kong-learning-cycles.js', 'junior-pre-s1-expansion.js', 'pre-s1-review-guide.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const issues = [];
const info = [];
const grades = [1, 2, 3, 4, 5, 6];
const expect = (condition, message) => { if (!condition) issues.push(message); };

for (const grade of grades) {
  expect(ctx.window.PRIMARY_ENGLISH_SCOPE?.[grade], `P${grade}: missing curriculum scope`);
  expect((ctx.window.PRIMARY_ENGLISH_SCOPE?.[grade]?.wordBank || []).length >= 10, `P${grade}: word bank has fewer than 10 base words`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.words?.[grade] || []).length >= 12, `P${grade}: fewer than 12 added vocabulary words`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.grammar?.[grade] || []).length >= 4, `P${grade}: fewer than 4 added grammar questions`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.reading?.[grade] || []).length >= 3, `P${grade}: fewer than 3 added reading passages`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.sentences?.[grade] || []).length >= 4, `P${grade}: fewer than 4 added sentence-builder prompts`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.proofreading?.[grade] || []).length >= 4, `P${grade}: fewer than 4 added proofreading pairs`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.writing?.[grade] || []).length >= 5, `P${grade}: fewer than 5 new writing prompts`);
  expect((ctx.window.QUESTION_BANK_EXPANSION?.speaking?.[grade] || []).length >= 5, `P${grade}: fewer than 5 new speaking prompts`);
  if (grade <= 3) {
    expect((ctx.window.QUESTION_BANK_EXPANSION?.juniorListening?.[grade] || []).length >= 10, `P${grade}: fewer than 10 added junior listening questions`);
    expect((ctx.window.QUESTION_BANK_EXPANSION?.juniorGame?.[grade] || []).length >= 12, `P${grade}: fewer than 12 added junior game questions`);
    expect((ctx.window.QUESTION_BANK_EXPANSION?.juniorMatch?.[grade] || []).length >= 6, `P${grade}: fewer than 6 added word-match cards`);
  } else {
    expect((ctx.window.QUESTION_BANK_EXPANSION?.seniorListening?.[grade] || []).length >= 2, `P${grade}: fewer than 2 added senior listening scripts`);
    expect((ctx.window.QUESTION_BANK_EXPANSION?.flashcards?.[grade] || []).length >= 5, `P${grade}: fewer than 5 added listening flashcards`);
    expect((ctx.window.QUESTION_BANK_EXPANSION?.checks?.[grade] || []).length >= 3, `P${grade}: fewer than 3 added listening quick checks`);
    expect((ctx.window.QUESTION_BANK_EXPANSION?.roleplays?.[grade] || []).length >= 2, `P${grade}: fewer than 2 added role plays`);
    expect((ctx.window.QUESTION_BANK_EXPANSION?.advancedReading?.[grade] || []).length >= 2, `P${grade}: fewer than 2 added advanced reading articles`);
  }
}

const models = ctx.window.WRITING_MODELS || [];
expect(models.length === 7, 'Writing model library should contain seven models');
const preS1WritingModel = models.find((model) => model.id === 'p6-pre-s1-calm-start');
expect(preS1WritingModel?.preS1 === true, 'Pre-S1 writing model is missing its readiness label');
expect(preS1WritingModel?.rubric?.length === 5, 'Pre-S1 writing model should contain five rubric criteria');
expect(preS1WritingModel?.model && preS1WritingModel?.task && preS1WritingModel?.taskZh, 'Pre-S1 writing model requires a bilingual task and exemplar');
expect((ctx.window.WRITING_MODEL_SUPPORT?.['p6-pre-s1-calm-start']?.patterns || []).length >= 4, 'Pre-S1 writing model requires four sentence patterns');

models.forEach((model) => {
  const quiz = ctx.window.WRITING_ERROR_QUIZZES?.[model.id] || [];
  expect(quiz.length === 4, `${model.id}: error-correction quiz should contain four questions`);
  quiz.forEach((item, index) => {
    expect(Array.isArray(item.options) && item.options.length === 3, `${model.id}: quiz ${index + 1} should contain three answer options`);
    expect(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length, `${model.id}: quiz ${index + 1} has an invalid answer index`);
  });
});

const preS1 = ctx.window.PRE_S1_ENGLISH_MOCK;
expect(preS1?.id === 'pre-s1-english-readiness', 'Pre-S1 readiness mock is missing');
expect(preS1?.questions?.length === 22, 'Pre-S1 readiness mock should contain 22 items');
expect(new Set((preS1?.questions || []).map((item) => item.section)).size === 6, 'Pre-S1 readiness mock should contain six sections');
expect((preS1?.questions || []).filter((item) => item.options).every((item) => item.options.length === 4 && Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length), 'Pre-S1 objective items require four valid options');
expect((preS1?.questions || []).filter((item) => item.writingTask).length === 1, 'Pre-S1 readiness mock should contain one writing self-check task');
expect((preS1?.questions || []).filter((item) => item.section === 'Section D · Extended reading').length === 4, 'Pre-S1 readiness mock should contain four extended-reading questions');
expect((preS1?.questions || []).filter((item) => item.section === 'Section E · Integrated cloze').length === 6, 'Pre-S1 readiness mock should contain six integrated-cloze questions');
expect((preS1?.questions || []).filter((item) => item.section === 'Section E · Integrated cloze').every((item) => item.passage?.title && item.promptZh && item.explanationZh), 'Integrated-cloze items require a passage and bilingual support');

const preS1Guide = ctx.window.PRE_S1_REVIEW_GUIDE;
expect(preS1Guide?.title && preS1Guide?.titleZh, 'Pre-S1 revision guide titles are missing');
expect((preS1Guide?.vocabulary || []).length === 3, 'Pre-S1 revision guide should contain three vocabulary groups');
expect((preS1Guide?.vocabulary || []).flatMap((group) => group.items || []).length >= 12, 'Pre-S1 revision guide should contain at least 12 vocabulary items');
expect((preS1Guide?.grammar || []).length >= 8, 'Pre-S1 revision guide should contain at least eight grammar points');

for (const grade of [4, 5, 6]) {
  const scripts = ctx.window.SENIOR_LISTENING_LIBRARY?.[grade] || [];
  const oral = ctx.window.SENIOR_ORAL_LIBRARY?.[grade] || [];
  expect(scripts.length >= 2, `P${grade}: senior listening library should have at least two original scripts`);
  expect(oral.length >= 2, `P${grade}: senior oral library should have at least two oral activities`);
}

info.push(`Grades checked: ${grades.length}`);
info.push(`Writing models checked: ${models.length}`);
info.push(`Writing quiz items checked: ${models.reduce((sum, model) => sum + (ctx.window.WRITING_ERROR_QUIZZES?.[model.id]?.length || 0), 0)}`);
info.push(`Pre-S1 mock items checked: ${preS1?.questions?.length || 0}`);
info.push(`Pre-S1 revision items checked: ${(preS1Guide?.vocabulary || []).flatMap((group) => group.items || []).length + (preS1Guide?.grammar || []).length}`);
console.log(JSON.stringify({ status: issues.length ? 'issues_found' : 'passed', info, issues }, null, 2));
process.exitCode = issues.length ? 1 : 0;
