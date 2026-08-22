const fs = require('fs');
const vm = require('vm');

const checks = [
  { file:'s1-extend-community-voice.js', key:'S1_EXTEND_COMMUNITY_VOICE', min:{ grammar:18, vocabulary:20, reading:12, listening:12, writing:4, speaking:4, dialogues:2 } },
  { file:'s2-consolidate-evidence.js', key:'S2_CONSOLIDATE_EVIDENCE', min:{ grammar:12, vocabulary:12, reading:8, listening:8, writing:3, speaking:3, dialogues:2 } },
  { file:'s3-ready-pathway.js', key:'S3_READY_PATHWAY', min:{ grammar:12, vocabulary:12, reading:8, listening:8, writing:4, speaking:4, dialogues:2, advancedWriting:1 } }
];

function load(file, key) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename:file });
  return context.window[key];
}
function count(section) {
  if (!section) return 0;
  if (Array.isArray(section.questions)) return section.questions.length;
  if (Array.isArray(section.items)) return section.items.length;
  if (Array.isArray(section.scripts)) return section.scripts.reduce((n, item) => n + (item.questions || []).length, 0);
  if (Array.isArray(section.sets)) return section.sets.reduce((n, item) => n + (item.questions || []).length, 0);
  return Array.isArray(section) ? section.length : 0;
}

const failures = [];
const report = checks.map(({ file, key, min }) => {
  const data = load(file, key);
  const counts = {
    grammar: count(data.grammar), vocabulary: count(data.vocabulary), reading: count(data.reading),
    listening: count(data.listening), writing: count(data.writing), speaking: count(data.speaking),
    dialogues: count(data.dialogues), advancedWriting: count(data.advancedWriting)
  };
  Object.entries(min).forEach(([skill, target]) => { if (counts[skill] < target) failures.push(`${key}: ${skill} ${counts[skill]} < ${target}`); });
  return { key, counts };
});
console.log(JSON.stringify({ status:failures.length ? 'failed' : 'passed', report, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
