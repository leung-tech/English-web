const fs = require('fs');
const vm = require('vm');

const secondary = fs.readFileSync('secondary/secondary.js', 'utf8');
const index = fs.readFileSync('secondary/index.html', 'utf8');
const alignment = fs.readFileSync('SECONDARY_ALIGNMENT_AUDIT.md', 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('s2-micro-missions.js', 'utf8'), context, { filename:'s2-micro-missions.js' });
vm.runInContext(fs.readFileSync('s1-s3-curriculum-practice.js', 'utf8'), context, { filename:'s1-s3-curriculum-practice.js' });
vm.runInContext(fs.readFileSync('s1-s3-framework-extension-2.js', 'utf8'), context, { filename:'s1-s3-framework-extension-2.js' });

const stages = ['s1-bridge', 's1-core', 's1-extend', 's2-develop', 's2-connect', 's2-action', 's2-consolidate', 's3-ready'];
const routes = ['read', 'write', 'listen', 'language'];
const failures = [];

stages.forEach((stage) => {
  const stagePattern = new RegExp(`id:'${stage}'[^}]*pathway:`);
  if (!stagePattern.test(secondary)) failures.push(`${stage}: missing capability pathway note`);
  routes.forEach((route) => {
    const modulePattern = new RegExp(`stage:'${stage}', route:'${route}'`);
    if (!modulePattern.test(secondary)) failures.push(`${stage}: missing ${route} route`);
  });
});

if (!secondary.includes('Original preparation only—not an official HKDSE paper or marking scheme.')) {
  failures.push('S3: missing bounded senior-secondary bridge statement');
}
if (!index.includes('s2-micro-missions.js')) failures.push('S2 micro-mission data file is not loaded');
if (!index.includes('s1-s3-curriculum-practice.js')) failures.push('curriculum framework data file is not loaded');
if (!index.includes('s1-s3-framework-extension-2.js')) failures.push('second curriculum framework extension is not loaded');
if (!alignment.includes('HKEAA endorsement')) failures.push('alignment report missing scope boundary');
if (!alignment.includes('## References')) failures.push('alignment report missing official source references');

const missions = context.window.S2_MICRO_MISSIONS || {};
if ((missions.games || []).length < 10) failures.push(`S2 micro missions: ${(missions.games || []).length} games < 10`);
if ((missions.advancedWriting || []).length < 2) failures.push(`S2 micro missions: ${(missions.advancedWriting || []).length} writing challenges < 2`);
const sourceAware = (missions.games || []).filter((item) => /source|evidence|claim|record/i.test(`${item.title} ${item.prompt} ${item.explanation}`)).length;
const wellbeingAware = (missions.games || []).filter((item) => /wellbeing|boundary|schedule|break|plan/i.test(`${item.title} ${item.prompt} ${item.explanation}`)).length;
if (sourceAware < 4) failures.push(`S2 micro missions: source/evidence coverage ${sourceAware} < 4`);
if (wellbeingAware < 4) failures.push(`S2 micro missions: wellbeing coverage ${wellbeingAware} < 4`);

const curriculum = context.window.S1_S3_CURRICULUM_PRACTICE || {};
const curriculumCounts = {
  s1Grammar: curriculum.s1Grammar?.questions?.length || 0,
  s1Reading: curriculum.s1Reading?.questions?.length || 0,
  s1Writing: curriculum.s1Writing?.length || 0,
  s2Grammar: curriculum.s2Grammar?.questions?.length || 0,
  s2Reading: curriculum.s2Reading?.questions?.length || 0,
  s2Writing: curriculum.s2Writing?.length || 0,
  s3LexicalLogic: curriculum.s3Logic?.questions?.length || 0,
  s3SentenceRebuild: curriculum.s3Reorder?.items?.length || 0,
  s3Reading: curriculum.s3Reading?.questions?.length || 0,
  s3Writing: curriculum.s3Writing?.length || 0
};
const curriculumMinimums = { s1Grammar:20, s1Reading:16, s1Writing:2, s2Grammar:20, s2Reading:16, s2Writing:2, s3LexicalLogic:24, s3SentenceRebuild:20, s3Reading:16, s3Writing:2 };
Object.entries(curriculumMinimums).forEach(([key, minimum]) => { if (curriculumCounts[key] < minimum) failures.push(`curriculum framework: ${key} ${curriculumCounts[key]} < ${minimum}`); });
if (!secondary.includes("id:'s3-sentence-rebuild'")) failures.push('S3: missing sentence rebuild module route');
if (!secondary.includes('data-check-reorder')) failures.push('S3: missing interactive sentence rebuild check control');

console.log(JSON.stringify({
  status: failures.length ? 'failed' : 'passed',
  checks: {
    stagesWithPathways: stages.length,
    routesPerStage: routes.length,
    s2MicroMissionGames: (missions.games || []).length,
    s2MicroWritingChallenges: (missions.advancedWriting || []).length,
    sourceAwareGames: sourceAware,
    wellbeingAwareGames: wellbeingAware,
    curriculumFramework: curriculumCounts
  },
  failures
}, null, 2));
process.exitCode = failures.length ? 1 : 0;
