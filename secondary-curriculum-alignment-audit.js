const fs = require('fs');
const vm = require('vm');

const secondary = fs.readFileSync('secondary/secondary.js', 'utf8');
const index = fs.readFileSync('secondary/index.html', 'utf8');
const alignment = fs.readFileSync('SECONDARY_ALIGNMENT_AUDIT.md', 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('s2-micro-missions.js', 'utf8'), context, { filename:'s2-micro-missions.js' });

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
if (!alignment.includes('HKEAA endorsement')) failures.push('alignment report missing scope boundary');
if (!alignment.includes('## References')) failures.push('alignment report missing official source references');

const missions = context.window.S2_MICRO_MISSIONS || {};
if ((missions.games || []).length < 10) failures.push(`S2 micro missions: ${(missions.games || []).length} games < 10`);
if ((missions.advancedWriting || []).length < 2) failures.push(`S2 micro missions: ${(missions.advancedWriting || []).length} writing challenges < 2`);
const sourceAware = (missions.games || []).filter((item) => /source|evidence|claim|record/i.test(`${item.title} ${item.prompt} ${item.explanation}`)).length;
const wellbeingAware = (missions.games || []).filter((item) => /wellbeing|boundary|schedule|break|plan/i.test(`${item.title} ${item.prompt} ${item.explanation}`)).length;
if (sourceAware < 4) failures.push(`S2 micro missions: source/evidence coverage ${sourceAware} < 4`);
if (wellbeingAware < 4) failures.push(`S2 micro missions: wellbeing coverage ${wellbeingAware} < 4`);

console.log(JSON.stringify({
  status: failures.length ? 'failed' : 'passed',
  checks: {
    stagesWithPathways: stages.length,
    routesPerStage: routes.length,
    s2MicroMissionGames: (missions.games || []).length,
    s2MicroWritingChallenges: (missions.advancedWriting || []).length,
    sourceAwareGames: sourceAware,
    wellbeingAwareGames: wellbeingAware
  },
  failures
}, null, 2));
process.exitCode = failures.length ? 1 : 0;
