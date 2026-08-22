const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, 'gemini-pages');
const errors = [];
const expectedPages = [
  ['s2/s2_grammar_experiences_choices.html', 'grammar', 's2-experiences-and-choices', 's2-experiences-and-choices-data.js'],
  ['s2/s2_vocabulary_experiences_choices.html', 'vocabulary', 's2-experiences-and-choices', 's2-experiences-and-choices-data.js'],
  ['s2/s2_read_compare_connect.html', 'reading', 's2-experiences-and-choices', 's2-experiences-and-choices-data.js'],
  ['s2/s2_listen_experiences_choices.html', 'listening', 's2-experiences-and-choices', 's2-experiences-and-choices-data.js'],
  ['s2/s2_write_experiences_choices.html', 'writing', 's2-experiences-and-choices', 's2-experiences-and-choices-data.js'],
  ['s2/s2_speak_experiences_choices.html', 'speaking', 's2-experiences-and-choices', 's2-experiences-and-choices-data.js'],
  ['s2/s2_connect_grammar_messages_media.html', 'grammar', 's2-messages-and-media', 's2-messages-and-media-data.js'],
  ['s2/s2_connect_vocabulary_messages_media.html', 'vocabulary', 's2-messages-and-media', 's2-messages-and-media-data.js'],
  ['s2/s2_connect_read_sources_voices.html', 'reading', 's2-messages-and-media', 's2-messages-and-media-data.js'],
  ['s2/s2_connect_listen_messages_media.html', 'listening', 's2-messages-and-media', 's2-messages-and-media-data.js'],
  ['s2/s2_connect_write_inform_audience.html', 'writing', 's2-messages-and-media', 's2-messages-and-media-data.js'],
  ['s2/s2_connect_speak_report_respond.html', 'speaking', 's2-messages-and-media', 's2-messages-and-media-data.js'],
  ['s2/s2_action_grammar_community_environment.html', 'grammar', 's2-community-and-environment', 's2-community-and-environment-data.js'],
  ['s2/s2_action_vocabulary_community_environment.html', 'vocabulary', 's2-community-and-environment', 's2-community-and-environment-data.js'],
  ['s2/s2_action_read_community_environment.html', 'reading', 's2-community-and-environment', 's2-community-and-environment-data.js'],
  ['s2/s2_action_listen_community_environment.html', 'listening', 's2-community-and-environment', 's2-community-and-environment-data.js'],
  ['s2/s2_action_write_propose_change.html', 'writing', 's2-community-and-environment', 's2-community-and-environment-data.js'],
  ['s2/s2_action_speak_recommend_report.html', 'speaking', 's2-community-and-environment', 's2-community-and-environment-data.js']
];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

expect(fs.existsSync(path.join(root, 'assets/lesson.css')), 'Missing shared lesson.css');
expect(fs.existsSync(path.join(root, 'assets/lesson.js')), 'Missing shared lesson.js');
expect(fs.existsSync(path.join(root, 'data/s2-experiences-and-choices-data.js')), 'Missing S2 Develop data file');
expect(fs.existsSync(path.join(root, 'data/s2-messages-and-media-data.js')), 'Missing S2 Connect data file');
expect(fs.existsSync(path.join(root, 'data/s2-community-and-environment-data.js')), 'Missing S2 Action data file');
expect(fs.existsSync(path.join(root, 'GEMINI_EDITING_GUIDE.md')), 'Missing Gemini editing guide');
expect(fs.existsSync(path.join(root, 'templates/lesson-template.html')), 'Missing standalone lesson template');

for (const [file, moduleName, unitId, dataFile] of expectedPages) {
  expect(fs.existsSync(path.join(root, file)), `Missing standalone page: ${file}`);
  if (!fs.existsSync(path.join(root, file))) continue;
  const html = read(file);
  expect(html.includes(`data-unit="${unitId}"`), `${file} must declare its data unit`);
  expect(html.includes(`data-module="${moduleName}"`), `${file} must declare data-module="${moduleName}"`);
  expect(html.includes('../assets/lesson.css'), `${file} must load shared lesson.css`);
  expect(html.includes(`../data/${dataFile}`), `${file} must load its S2 data file`);
  expect(html.includes('../assets/lesson.js'), `${file} must load shared lesson.js`);
  expect(html.includes('gemini-pages/index.html') === false, `${file} must use its relative directory link rather than a hard-coded deployment URL`);
}

const directory = read('index.html');
for (const [file] of expectedPages) expect(directory.includes(file), `Gemini page directory must link to ${file}`);

const context = { window: {} };
context.window.window = context.window;
vm.createContext(context);
vm.runInContext(read('data/s2-experiences-and-choices-data.js'), context);
vm.runInContext(read('data/s2-messages-and-media-data.js'), context);
vm.runInContext(read('data/s2-community-and-environment-data.js'), context);
const s2 = context.window.S2_EXPERIENCES_CHOICES;
expect(s2?.notice && s2?.noticeZh, 'S2 data must retain bilingual original-practice notice');
expect(s2?.grammar?.questions?.length === 16, 'S2 standalone grammar requires 16 questions');
expect(s2?.vocabulary?.items?.length === 18, 'S2 standalone vocabulary requires 18 items');
expect(s2?.reading?.sets?.length === 4, 'S2 standalone reading requires four paired-text sets');
expect(s2?.reading?.sets?.every((set) => set.texts?.length === 2 && set.questions?.length === 3), 'Each paired-text set needs two texts and three questions');
expect(s2?.listening?.scripts?.length === 3 && s2?.listening?.scripts?.every((script) => script.questions?.length === 4), 'S2 standalone listening requires three scripts with four questions each');
expect(s2?.writing?.length === 3, 'S2 standalone writing requires three tasks');
expect(s2?.speaking?.length === 3, 'S2 Develop standalone speaking requires three tasks');

const s2Connect = context.window.S2_MESSAGES_MEDIA;
expect(s2Connect?.notice && s2Connect?.noticeZh, 'S2 Connect data must retain bilingual original-practice notice');
expect(s2Connect?.grammar?.questions?.length === 24, 'S2 Connect standalone grammar requires 24 questions');
expect(s2Connect?.vocabulary?.items?.length === 26, 'S2 Connect standalone vocabulary requires 26 items');
expect(s2Connect?.reading?.sets?.length === 4, 'S2 Connect standalone reading requires four paired-text sets');
expect(s2Connect?.reading?.sets?.every((set) => set.texts?.length === 2 && set.questions?.length === 3), 'Each S2 Connect paired-text set needs two texts and three questions');
expect(s2Connect?.listening?.scripts?.length === 3 && s2Connect?.listening?.scripts?.every((script) => script.questions?.length === 4), 'S2 Connect standalone listening requires three scripts with four questions each');
expect(s2Connect?.writing?.length === 3, 'S2 Connect standalone writing requires three tasks');
expect(s2Connect?.speaking?.length === 3, 'S2 Connect standalone speaking requires three tasks');

const s2Action = context.window.S2_COMMUNITY_ENVIRONMENT;
expect(s2Action?.notice && s2Action?.noticeZh, 'S2 Action data must retain bilingual original-practice notice');
expect(s2Action?.grammar?.questions?.length === 16, 'S2 Action standalone grammar requires 16 questions');
expect(s2Action?.vocabulary?.items?.length === 18, 'S2 Action standalone vocabulary requires 18 items');
expect(s2Action?.reading?.sets?.length === 4, 'S2 Action standalone reading requires four paired-text sets');
expect(s2Action?.reading?.sets?.every((set) => set.texts?.length === 2 && set.questions?.length === 3), 'Each S2 Action paired-text set needs two texts and three questions');
expect(s2Action?.listening?.scripts?.length === 3 && s2Action?.listening?.scripts?.every((script) => script.questions?.length === 4), 'S2 Action standalone listening requires three scripts with four questions each');
expect(s2Action?.writing?.length === 3, 'S2 Action standalone writing requires three tasks');
expect(s2Action?.speaking?.length === 3, 'S2 Action standalone speaking requires three tasks');

console.log(JSON.stringify({
  status: errors.length ? 'issues_found' : 'passed',
  info: [`Standalone S2 pages checked: ${expectedPages.length}`, 'Standalone S2 content items checked: 208'],
  errors
}, null, 2));
process.exitCode = errors.length ? 1 : 0;
