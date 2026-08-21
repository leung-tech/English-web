const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, 'gemini-pages');
const errors = [];
const expectedPages = [
  ['s2/s2_grammar_experiences_choices.html', 'grammar'],
  ['s2/s2_vocabulary_experiences_choices.html', 'vocabulary'],
  ['s2/s2_read_compare_connect.html', 'reading'],
  ['s2/s2_listen_experiences_choices.html', 'listening'],
  ['s2/s2_write_experiences_choices.html', 'writing'],
  ['s2/s2_speak_experiences_choices.html', 'speaking']
];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

expect(fs.existsSync(path.join(root, 'assets/lesson.css')), 'Missing shared lesson.css');
expect(fs.existsSync(path.join(root, 'assets/lesson.js')), 'Missing shared lesson.js');
expect(fs.existsSync(path.join(root, 'data/s2-experiences-and-choices-data.js')), 'Missing S2 data file');
expect(fs.existsSync(path.join(root, 'GEMINI_EDITING_GUIDE.md')), 'Missing Gemini editing guide');
expect(fs.existsSync(path.join(root, 'templates/lesson-template.html')), 'Missing standalone lesson template');

for (const [file, moduleName] of expectedPages) {
  expect(fs.existsSync(path.join(root, file)), `Missing standalone page: ${file}`);
  if (!fs.existsSync(path.join(root, file))) continue;
  const html = read(file);
  expect(html.includes('data-unit="s2-experiences-and-choices"'), `${file} must declare the S2 data unit`);
  expect(html.includes(`data-module="${moduleName}"`), `${file} must declare data-module="${moduleName}"`);
  expect(html.includes('../assets/lesson.css'), `${file} must load shared lesson.css`);
  expect(html.includes('../data/s2-experiences-and-choices-data.js'), `${file} must load S2 data`);
  expect(html.includes('../assets/lesson.js'), `${file} must load shared lesson.js`);
  expect(html.includes('gemini-pages/index.html') === false, `${file} must use its relative directory link rather than a hard-coded deployment URL`);
}

const directory = read('index.html');
for (const [file] of expectedPages) expect(directory.includes(file), `Gemini page directory must link to ${file}`);

const context = { window: {} };
context.window.window = context.window;
vm.createContext(context);
vm.runInContext(read('data/s2-experiences-and-choices-data.js'), context);
const s2 = context.window.S2_EXPERIENCES_CHOICES;
expect(s2?.notice && s2?.noticeZh, 'S2 data must retain bilingual original-practice notice');
expect(s2?.grammar?.questions?.length === 16, 'S2 standalone grammar requires 16 questions');
expect(s2?.vocabulary?.items?.length === 18, 'S2 standalone vocabulary requires 18 items');
expect(s2?.reading?.sets?.length === 4, 'S2 standalone reading requires four paired-text sets');
expect(s2?.reading?.sets?.every((set) => set.texts?.length === 2 && set.questions?.length === 3), 'Each paired-text set needs two texts and three questions');
expect(s2?.listening?.scripts?.length === 3 && s2?.listening?.scripts?.every((script) => script.questions?.length === 4), 'S2 standalone listening requires three scripts with four questions each');
expect(s2?.writing?.length === 3, 'S2 standalone writing requires three tasks');
expect(s2?.speaking?.length === 3, 'S2 standalone speaking requires three tasks');

console.log(JSON.stringify({
  status: errors.length ? 'issues_found' : 'passed',
  info: [`Standalone S2 pages checked: ${expectedPages.length}`, 'S2 standalone content items checked: 64'],
  errors
}, null, 2));
process.exitCode = errors.length ? 1 : 0;
