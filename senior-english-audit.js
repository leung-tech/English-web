const fs = require('fs');
const vm = require('vm');

const index = fs.readFileSync('senior/index.html', 'utf8');
const app = fs.readFileSync('senior/senior.js', 'utf8');
const research = fs.readFileSync('HK_SENIOR_ENGLISH_ALIGNMENT_RESEARCH.md', 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('senior/senior-data.js', 'utf8'), context, { filename: 'senior-data.js' });
vm.runInContext(fs.readFileSync('senior/senior-extension-2.js', 'utf8'), context, { filename: 'senior-extension-2.js' });
const data = context.window.SENIOR_ENGLISH_STUDIO || {};
const failures = [];

if (!index.includes('Original preparation only — not an official HKDSE paper, marking scheme or score prediction.')) failures.push('missing visible non-official HKDSE boundary');
if (!index.includes('senior-data.js') || !index.includes('senior-extension-2.js') || !index.includes('senior.js')) failures.push('senior assets are not loaded');
if (!app.includes('No automated writing-quality score')) failures.push('writing quality boundary is missing');
if (!app.includes('No automated speaking-quality score')) failures.push('speaking quality boundary is missing');
if (!app.includes('speechSynthesis')) failures.push('listening replay support is missing');
if (!research.includes('## References') || !research.includes('HKEAA')) failures.push('senior alignment research lacks official references');
if ((data.stages || []).length !== 3) failures.push('expected three S4-S6 stages');

const requirements = { s4:{ grammar:10, reading:12, writing:2, listening:6, oral:1 }, s5:{ grammar:10, reading:12, writing:2, listening:6, oral:1 }, s6:{ grammar:10, reading:12, writing:2, listening:6, oral:1 } };
const report = {};
Object.entries(requirements).forEach(([stage, minimums]) => {
  report[stage] = {};
  Object.entries(minimums).forEach(([skill, minimum]) => {
    const modules = (data.modules || []).filter((item) => item.stage === stage && item.skill === skill);
    const count = modules.reduce((total, item) => total + (item.items || []).length, 0);
    report[stage][skill] = count;
    if (count < minimum) failures.push(`${stage} ${skill}: ${count} < ${minimum}`);
  });
});

const allGrammar = (data.modules || []).filter((item) => item.skill === 'grammar').flatMap((item) => item.items || []);
['Inversion','Cleft sentence','Participle clause','Mixed conditional','Subjunctive'].forEach((topic) => {
  if (!allGrammar.some((item) => item.label.includes(topic))) failures.push(`missing advanced grammar topic: ${topic}`);
});
const allReading = (data.modules || []).filter((item) => item.skill === 'reading').flatMap((item) => item.items || []);
['Tone','Text matching','Summary cloze'].forEach((topic) => {
  if (!allReading.some((item) => item.label.includes(topic))) failures.push(`missing reading strategy: ${topic}`);
});
const allWriting = (data.modules || []).filter((item) => item.skill === 'writing').flatMap((item) => item.items || []);
['Op-ed','Formal report','Debate speech'].forEach((topic) => {
  if (!allWriting.some((item) => item.title.includes(topic))) failures.push(`missing writing scaffold: ${topic}`);
});
if (!allWriting.every((item) => Array.isArray(item.studentModels) && item.studentModels.length >= 1)) failures.push('writing scaffolds are missing student-model analysis resources');
if (!allWriting.every((item) => (item.vocabularyBank || item.languageBankExtra || []).length >= 1)) failures.push('writing scaffolds are missing vocabulary-bank resources');
const allListening = (data.modules || []).filter((item) => item.skill === 'listening').flatMap((item) => item.items || []);
if (!allListening.every((item) => item.audioScript && item.audioScript.length > 80)) failures.push('listening items are missing original replayable scripts');
const allOral = (data.modules || []).filter((item) => item.skill === 'oral').flatMap((item) => item.items || []);
if (!allOral.every((item) => item.roleCard && item.rubric && item.selfCheck)) failures.push('oral simulations are missing role card, rubric or self-check');

console.log(JSON.stringify({ status: failures.length ? 'failed' : 'passed', report, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
