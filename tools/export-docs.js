#!/usr/bin/env node
/*
 * Regenerates docs/data/*.json and the generated tables in docs/BRANCHING.md
 * and docs/COPY.md straight from index.html + content.js.
 *
 *   node tools/export-docs.js
 *
 * Nothing here is hand-maintained: if the branch model changes in content.js,
 * rerun this and the docs follow. That is the whole point of it existing.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const content = fs.readFileSync(path.join(ROOT, 'content.js'), 'utf8');

/* ---------- reading the maps ----------
   content.js is a plain script of top-level consts, so it evaluates whole.
   index.html's maps live inside a <script> that touches the DOM, so those are
   pulled out one at a time by brace matching instead. */

function fromContent(names) {
  return new Function(content + ';return {' + names.join(',') + '};')();
}

function fromHtml(name) {
  const m = new RegExp('\\bconst\\s+' + name + '\\s*=\\s*[\\{\\[]').exec(html);
  if (!m) return null;
  const start = m.end !== undefined ? m.end : m.index + m[0].length;
  const i = start - 1;
  const open = html[i];
  const close = open === '{' ? '}' : ']';
  let depth = 0;
  for (let j = i; j < html.length; j++) {
    if (html[j] === open) depth++;
    else if (html[j] === close) {
      depth--;
      if (!depth) {
        try { return new Function('return ' + html.slice(i, j + 1))(); }
        catch (e) { return null; }
      }
    }
  }
  return null;
}

const C = fromContent([
  'GOALS', 'JTBD_MODE', 'WORKMODE', 'OCC_TITLE', 'OCC_EXTRA', 'OCCWHO', 'GOALWHO',
  'LEVELS', 'SKILLS', 'SKILLOUT', 'PRACTICE', 'PLAN_GF', 'WEEKONE', 'JTBD_TITLE',
  'FAM_PRACTISE', 'HERO_JTBD', 'HERO_GOAL', 'OUTBULLETS', 'MILESTONE',
  'BA_HEAD', 'BA_BULLETS', 'BA_SAY', 'BA_SAY_OCC', 'BAGENDER', 'BAIMG',
  'SARAH_OUT', 'SARAH_OUT_MODE', 'OUTCOME', 'OUTCOME_MODE', 'ACKCOPY',
  'SCORE_BASE', 'SCORE_MSG', 'SCORE_LABEL', 'IELTS',
]);

/* ---------- the reachable branch set ----------
   Mirrors exactly what renderJtbd() does at runtime: the work mode picks the
   JTBD list, and an occupation may inject one extra option on top. */

function jtbdFor(occ, goal) {
  const mode = C.WORKMODE[occ];
  let list = (C.JTBD_MODE[goal] && C.JTBD_MODE[goal][mode]) || C.GOALS[goal].jtbd;
  const extra = C.OCC_EXTRA && C.OCC_EXTRA[occ];
  if (extra && (!extra.goals || extra.goals.includes(goal)) && !list.some(j => j.id === extra.id)) {
    list = [extra, ...list];
  }
  return list;
}

const occupations = Object.keys(C.WORKMODE);
const goals = Object.keys(C.GOALS);
const modes = [...new Set(Object.values(C.WORKMODE))];

const pairs = new Map();      // "goal|family" -> { goals, labels, occupations }
const matrix = {};            // occupation -> goal -> [{id,label,fam}]

for (const occ of occupations) {
  matrix[occ] = { mode: C.WORKMODE[occ], title: C.OCC_TITLE[occ], goals: {} };
  for (const goal of goals) {
    const list = jtbdFor(occ, goal);
    matrix[occ].goals[goal] = list.map(j => ({ id: j.id, label: j.label, fam: j.fam }));
    for (const j of list) {
      const key = goal + '|' + j.fam;
      if (!pairs.has(key)) pairs.set(key, { goal, family: j.fam, labels: new Set(), occupations: new Set() });
      pairs.get(key).labels.add(j.label);
      pairs.get(key).occupations.add(occ);
    }
  }
}

const families = [...new Set([...pairs.values()].map(p => p.family))].sort();
const pairList = [...pairs.entries()]
  .map(([key, v]) => ({
    key,
    goal: v.goal,
    family: v.family,
    labels: [...v.labels].sort(),
    occupations: [...v.occupations],
    override: !!C.PLAN_GF[key],
  }))
  .sort((a, b) => a.key.localeCompare(b.key));

/* ---------- copy resolution, exactly as the plan screen does it ---------- */

const resolve = (key, field, famMap, fallback) => {
  const o = C.PLAN_GF[key];
  if (o && o[field] !== undefined) return o[field];
  const fam = key.split('|')[1];
  return famMap[fam] !== undefined ? famMap[fam] : famMap[fallback];
};

const copy = pairList.map(p => ({
  key: p.key,
  goal: p.goal,
  family: p.family,
  jtbdLabels: p.labels,
  usesOverride: p.override,
  planTitleClaim: {
    shortLane: resolve(p.key, 'hero', C.HERO_JTBD, 'smalltalk'),
    longLane: C.HERO_GOAL[p.goal],
  },
  sectionTitle: resolve(p.key, 'title', C.JTBD_TITLE, 'smalltalk'),
  firstThreeSessions: resolve(p.key, 'week', C.WEEKONE, 'smalltalk'),
  endOutcomes: resolve(p.key, 'out', C.OUTBULLETS, 'smalltalk'),
  proofPractising: resolve(p.key, 'practise', C.FAM_PRACTISE, 'smalltalk'),
  graphMilestone: C.MILESTONE[p.family],
  beforeAfter: {
    heading: C.BA_HEAD[p.key] || null,
    bullets: C.BA_BULLETS[p.key] || null,   /* { before: [3], after: [3] } */
    quotedMoment: C.BA_SAY[p.family] || null,
    artwork: `images/ba2/ba_${p.goal}_${p.family}_{f|m}_{before|after}.webp`,
  },
}));

/* ---------- screens, in document order ---------- */

const screens = [...html.matchAll(/<section class="screen([^"]*)" id="([^"]+)"/g)]
  .map(m => ({ id: m[2], classes: m[1].trim().split(/\s+/).filter(Boolean) }));

function axisList() {
  const m = /const AX=\{([\s\S]*?)\n\};/.exec(html);
  if (!m) return {};
  const out = {};
  for (const ax of m[1].matchAll(/^\s{2}(\w+):\{label:'([^']+)'/gm)) out[ax[1]] = ax[2];
  return out;
}

const setOf = name => {
  const m = new RegExp('const ' + name + '\\s*=\\s*new Set\\(\\[([^\\]]*)\\]').exec(html);
  return m ? m[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean) : [];
};

const screenData = {
  order: screens.map(s => s.id),
  noBack: setOf('NO_BACK'),
  skipBack: setOf('SKIP_BACK'),
  variantAxes: fromHtml('VARIANTS'),
  /* AX evaluates runtime globals in its own initialiser, so it cannot be eval'd
     standalone; the axis keys and labels are read off the source instead. */
  axes: axisList(),
  devRailGroups: fromHtml('DN'),
};

/* ---------- write ---------- */

const dataDir = path.join(ROOT, 'docs', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const branching = {
  generatedFrom: ['index.html', 'content.js'],
  counts: {
    occupations: occupations.length,
    workModes: modes.length,
    goals: goals.length,
    reachableFamilies: families.length,
    reachableGoalFamilyPairs: pairList.length,
    distinctJtbdLabels: new Set(pairList.flatMap(p => p.labels)).size,
    planCopyOverrides: Object.keys(C.PLAN_GF).length,
    screens: screens.length,
  },
  goals: Object.fromEntries(goals.map(g => [g, { label: C.GOALS[g].label, defaultJtbd: C.GOALS[g].jtbd }])),
  workModes: modes,
  occupations: Object.fromEntries(occupations.map(o => [o, { mode: C.WORKMODE[o], title: C.OCC_TITLE[o], cohort: C.OCCWHO[o] }])),
  goalCohorts: C.GOALWHO,
  families,
  pairs: pairList,
  matrix,
  levels: C.LEVELS,
  skills: Object.keys(C.SKILLS),
};

fs.writeFileSync(path.join(dataDir, 'branching.json'), JSON.stringify(branching, null, 2));
fs.writeFileSync(path.join(dataDir, 'copy.json'), JSON.stringify({ pairs: copy, skills: C.SKILLOUT, practice: C.PRACTICE, score: { base: C.SCORE_BASE, messages: C.SCORE_MSG } }, null, 2));
fs.writeFileSync(path.join(dataDir, 'screens.json'), JSON.stringify(screenData, null, 2));

/* markdown tables, injected between markers so prose around them survives */

function inject(file, marker, body) {
  const p = path.join(ROOT, 'docs', file);
  if (!fs.existsSync(p)) return;
  const src = fs.readFileSync(p, 'utf8');
  const re = new RegExp(`(<!-- ${marker}:start -->)[\\s\\S]*?(<!-- ${marker}:end -->)`);
  if (!re.test(src)) { console.warn('  no marker ' + marker + ' in ' + file); return; }
  fs.writeFileSync(p, src.replace(re, `$1\n${body}\n$2`));
}

inject('BRANCHING.md', 'pairs', [
  '| # | goal | family | plan copy | JTBD options that lead here |',
  '|---|---|---|---|---|',
  ...pairList.map((p, i) =>
    `| ${i + 1} | \`${p.goal}\` | \`${p.family}\` | ${p.override ? '`PLAN_GF` override' : 'family default'} | ${p.labels.map(l => '"' + l + '"').join('<br>')} |`),
].join('\n'));

inject('BRANCHING.md', 'occupations', [
  '| occupation key | work mode | shown as | proof-line cohort |',
  '|---|---|---|---|',
  ...occupations.map(o => `| \`${o}\` | \`${C.WORKMODE[o]}\` | ${C.OCC_TITLE[o]} | ${C.OCCWHO[o]} |`),
].join('\n'));

inject('COPY.md', 'plan', copy.map(p => [
  `### \`${p.key}\``,
  '',
  `JTBD options that land here: ${p.jtbdLabels.map(l => '"' + l + '"').join(', ')}`,
  `Source: ${p.usesOverride ? '`PLAN_GF[\'' + p.key + '\']`' : 'family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)'}`,
  '',
  '| slot | copy |',
  '|---|---|',
  `| title claim, short lane (<= 30 days) | light: ${p.planTitleClaim.shortLane.light}<br>std: ${p.planTitleClaim.shortLane.std}<br>deep: ${p.planTitleClaim.shortLane.deep} |`,
  `| title claim, long lane (> 30 days) | light: ${p.planTitleClaim.longLane.light}<br>std: ${p.planTitleClaim.longLane.std}<br>deep: ${p.planTitleClaim.longLane.deep} |`,
  `| "what we start with" title | ${p.sectionTitle} |`,
  `| first three sessions | ${p.firstThreeSessions.join('<br>')} |`,
  `| end outcomes | ${p.endOutcomes.join('<br>')} |`,
  `| graph milestone | ${p.graphMilestone || '(none)'} |`,
  `| proof line | ...${p.proofPractising} with Sarah |`,
  `| before/after heading | ${p.beforeAfter.heading || '(falls back)'} |`,
  `| before/after, before column | ${(p.beforeAfter.bullets ? p.beforeAfter.bullets.before : []).join('<br>') || '(falls back)'} |`,
  `| before/after, after column | ${(p.beforeAfter.bullets ? p.beforeAfter.bullets.after : []).join('<br>') || '(falls back)'} |`,
  `| artwork | \`${p.beforeAfter.artwork}\` |`,
  '',
].join('\n')).join('\n'));

console.log('wrote docs/data/branching.json  ' + pairList.length + ' pairs, ' + occupations.length + ' occupations');
console.log('wrote docs/data/copy.json       ' + copy.length + ' resolved branch copy sets');
console.log('wrote docs/data/screens.json    ' + screens.length + ' screens');
console.log('injected tables into docs/BRANCHING.md and docs/COPY.md');
