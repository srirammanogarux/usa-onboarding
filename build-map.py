#!/usr/bin/env python3
"""Build the funnel map v2 — every screen of the CURRENT prototype shown as a live,
branch-aware embed. Re-run after any prototype change:  python3 build-map.py"""
import os, shutil, json

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(SRC, '..', 'funnel-v2'))
APP = os.path.join(OUT, 'app')

# ---------- the app the map embeds (same origin, so it stays controllable) ----------
os.makedirs(APP, exist_ok=True)
for f in ['index.html', 'content.js', 'tokens.css']:
    shutil.copy2(os.path.join(SRC, f), APP)
for d in ['fonts', 'images', 'videos', 'video']:
    s, t = os.path.join(SRC, d), os.path.join(APP, d)
    if os.path.isdir(s):
        shutil.rmtree(t, ignore_errors=True)
        shutil.copytree(s, t)

# ---------- the floor plan: id, label, what drives it ----------
PHASES = [
    ('1 · Intro', 'Video splash, three feature beats, sign-up', [
        ('hero',      'Splash + feature beats', ''),
        ('signup',    'Sign up', ''),
    ]),
    ('2 · Profile', 'Language, then name, then the number — every ask answered with something back', [
        ('q5',        'Native language', ''),
        ('ack',       '¡Perfecto! peer proof', 'native language'),
        ('q6',        'App language', 'native language'),
        ('q2',        'Name', ''),
        ('ackname',   'Nice to meet you', 'name'),
        ('qphone',    'Phone (skippable)', ''),
        ('q1',        'Where did you hear about us', 'device'),
        ('q3',        'About you (age + gender)', ''),
    ]),
    ('3 · Motivation', 'Occupation, then goal, then the outcome that goal is worth', [
        ('qgoal',     'What are you learning English for', ''),
        ('ctxout',    'Outcome beat', 'goal'),
        ('qocc',      'Current situation', ''),
        ('qfield',    'Field (working professionals only)', 'situation = working'),
        ('qjtbd',     'Which conversation', 'goal'),
        ('ctxba',     'Before / After', 'occupation · JTBD'),
    ]),
    ('3b · IELTS only', 'Replaces the JTBD question when the goal is IELTS', [
        ('qwhy',      'Why IELTS', 'goal = ielts'),
        ('ackielts',  'Reason acknowledgement', 'IELTS reason'),
        ('qwhen',     'Exam date', 'goal = ielts'),
        ('qband',     'Band target', 'goal = ielts'),
    ]),
    ('4 · Calibration', 'Skill, level, expectation, and the daily commitment', [
        ('qskill',    'Sharpen first', ''),
        ('ctxfeat',   'Skill beat: coverage + proof', 'skill'),
        ('qlevel',    'Current level', ''),
        ('ctxsci',    'Your level vs where this takes you', 'level'),
        ('qtime',     'How soon', ''),
        ('qdaily',    'Minutes a day + hours graph', 'timeframe'),
    ]),
    ('5 · Permission + runway', 'One ask, then the runway into practice', [
        ('qnotif',    'Notification ask', 'minutes'),
        ('qsummary',  'Everything is ready', 'all answers'),
    ]),
    ('6 · Activation', 'The first practice. Confident users speak, hesitant users take the hint', [
        ('act',       'Speak task', 'JTBD · occupation'),
        ('listen',    'Listening (mic path)', ''),
        ('score',     'Score (mic path)', 'skill'),
        ('acthint',   'Hint: 4-part framework', 'JTBD'),
        ('hintscore', 'Hint results + pronunciation', 'JTBD · level'),
    ]),
    ('7 · Plan → Pay', 'Conviction first, conversion second', [
        ('loader',    'Personalizing your plan', 'JTBD · minutes'),
        ('plan',      'The plan', 'every answer'),
        ('letter',    'Promise + signature', 'name · goal · minutes'),
        ('paywall',   'Paywall', 'goal'),
        ('exitoffer', 'Exit offer', 'goal'),
        ('bridge',    'Into the app', ''),
    ]),
]

BRANCHES = [
    ('career', 'Career',  'interview', 'Ace a job interview'),
    ('convo',  'Social',  'smalltalk', 'Make small talk feel natural'),
    ('travel', 'Travel',  'services',  'Breeze through airports and hotels'),
    ('school', 'School',  'meetings',  'Speak up in class discussions'),
    ('ielts',  'IELTS',   'exam',      'Pass the speaking test'),
    ('other',  'Other',   'smalltalk', 'Speak without overthinking'),
]
OCCS = [('student', 'Student'), ('freelancer', 'Freelancer'), ('business', 'Business owner'),
        ('home', 'Homemaker'), ('careerbreak', 'Career break'), ('jobseek', 'Job seeker'),
        ('working:office', 'Pro / office'), ('working:healthcare', 'Pro / healthcare'),
        ('working:restaurant', 'Pro / hospitality'), ('working:retail', 'Pro / retail'),
        ('working:construction', 'Pro / trades'), ('working:factory', 'Pro / factory'),
        ('working:driver', 'Pro / driving'), ('other', 'Other')]
SKILLS = [('fluency', 'Fluency'), ('pronunciation', 'Pronunciation'),
          ('vocabulary', 'Vocabulary'), ('grammar', 'Grammar')]
LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']
MINS = [5, 10, 15, 30, 60]

total = sum(len(f) for _, _, f in PHASES)

def strips():
    out, n = [], 0
    for name, note, floors in PHASES:
        cards = []
        for sid, label, drv in floors:
            n += 1
            tag = f'<span class="drv">{drv}</span>' if drv else ''
            cards.append(f'''      <figure class="card" data-screen="{sid}">
        <div class="frame"><div class="ph"><iframe data-src="app/index.html?embed=1&jump={sid}" loading="lazy" title="{label}"></iframe></div>
          <button class="zoom" data-screen="{sid}" data-label="{label}">Open</button></div>
        <figcaption><b>{n}</b> {label} {tag}</figcaption>
      </figure>''')
        out.append(f'''  <section class="phase" data-phase="{name}">
    <header><h2>{name}</h2><span class="pc">{len(floors)} screens</span><p>{note}</p></header>
    <div class="strip">
{chr(10).join(cards)}
    </div>
  </section>''')
    return '\n'.join(out)

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stimuler · Onboarding Map</title>
<link rel="stylesheet" href="app/tokens.css">
<style>
*{{box-sizing:border-box;}}
body{{margin:0;background:#07060D;color:var(--text-hi);font-family:var(--font-body);
  display:grid;grid-template-columns:1fr 296px;min-height:100vh;align-items:start;}}
a{{color:inherit;}}
/* ---------- map ---------- */
.map{{padding:34px 30px 90px;min-width:0;}}
.title{{font-family:var(--font-display);font-weight:700;font-size:27px;letter-spacing:-.02em;}}
.sub{{margin-top:8px;font-size:14px;line-height:1.6;color:var(--text-mid);max-width:74ch;}}
.sub b{{color:var(--text-hi);font-weight:600;}}
.phase{{margin-top:38px;}}
.phase header{{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:14px;}}
.phase h2{{margin:0;font-family:var(--font-display);font-weight:600;font-size:12px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--gold-300);}}
.pc{{font-size:11.5px;color:var(--text-low);}}
.phase header p{{margin:0;flex:1 1 100%;font-size:13px;color:var(--text-low);}}
.strip{{display:flex;gap:16px;overflow-x:auto;padding:4px 2px 16px;scrollbar-width:thin;}}
.strip::-webkit-scrollbar{{height:8px;}}
.strip::-webkit-scrollbar-thumb{{background:#241f38;border-radius:4px;}}
.card{{margin:0;flex:none;width:212px;}}
.frame{{position:relative;width:212px;height:459px;border-radius:22px;overflow:hidden;
  background:#0D0B16;border:1px solid #241f38;box-shadow:0 18px 40px -22px #000;}}
.ph{{width:390px;height:844px;transform:scale(.5436);transform-origin:0 0;}}
.ph iframe{{width:390px;height:844px;border:0;display:block;background:#0D0B16;}}
.frame .zoom{{position:absolute;inset:0;width:100%;height:100%;background:rgba(8,6,18,.55);color:#fff;
  border:0;font:600 13px var(--font-display);opacity:0;cursor:pointer;transition:opacity .18s;}}
.frame:hover .zoom{{opacity:1;}}
figcaption{{margin-top:9px;font-size:12.5px;color:var(--text-mid);line-height:1.45;}}
figcaption b{{color:var(--text-low);font-weight:600;margin-right:5px;}}
.drv{{display:inline-block;margin-top:4px;padding:2px 7px;border-radius:999px;font-size:10.5px;
  background:rgba(240,163,47,.13);color:var(--gold-300);}}
/* ---------- controls ---------- */
.side{{position:sticky;top:0;height:100vh;overflow-y:auto;padding:34px 22px 40px;
  background:#0B0914;border-left:1px solid #1c1830;}}
.side h3{{margin:0 0 10px;font-family:var(--font-display);font-weight:600;font-size:11px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--text-low);}}
.side h3.mt{{margin-top:24px;}}
.chips{{display:flex;flex-wrap:wrap;gap:7px;}}
.chips button{{padding:7px 12px;border-radius:999px;font:500 12.5px var(--font-body);cursor:pointer;
  background:#15122414;background:rgba(255,255,255,.05);border:1px solid #241f38;color:var(--text-mid);}}
.chips button:hover{{border-color:#3a3358;color:var(--text-hi);}}
.chips button.on{{background:var(--indigo-500);border-color:var(--indigo-500);color:#fff;font-weight:600;}}
.side .note{{margin-top:22px;font-size:12px;line-height:1.6;color:var(--text-low);}}
/* ---------- zoom ---------- */
.modal{{position:fixed;inset:0;z-index:99;background:rgba(6,5,14,.86);backdrop-filter:blur(8px);
  display:none;align-items:center;justify-content:center;gap:26px;}}
.modal.on{{display:flex;}}
.modal .shell{{width:390px;height:844px;max-height:92vh;border-radius:34px;overflow:hidden;
  border:1px solid #2a2442;box-shadow:0 40px 90px -30px #000;background:#0D0B16;}}
.modal iframe{{width:390px;height:844px;border:0;display:block;}}
.modal .meta{{width:230px;color:var(--text-mid);font-size:13px;line-height:1.6;}}
.modal .meta h4{{margin:0 0 6px;font-family:var(--font-display);font-size:19px;color:var(--text-hi);}}
.modal .meta button{{margin-top:16px;padding:9px 15px;border-radius:999px;border:1px solid #2a2442;
  background:rgba(255,255,255,.06);color:var(--text-hi);font:600 12.5px var(--font-body);cursor:pointer;}}
@media(max-width:1000px){{body{{grid-template-columns:1fr;}}.side{{position:static;height:auto;border-left:0;border-top:1px solid #1c1830;}}}}
</style>
</head>
<body>
<main class="map">
  <div class="title">Stimuler · Onboarding Map</div>
  <p class="sub">Every screen of the live prototype, in order. These are not screenshots: each frame is the
  <b>real product running</b>, so the map can never drift. Pick a <b>branch</b> and the dials on the right and the whole
  strip re-renders for that person. Gold tags mark screens whose content is driven by an answer.
  <b>{total} screens</b> · hover a screen to open it full size and interact with it.</p>
{strips()}
</main>

<aside class="side">
  <h3>Branch</h3>
  <div class="chips" id="brChips"></div>
  <h3 class="mt">Occupation</h3>
  <div class="chips" id="occChips"></div>
  <h3 class="mt">Skill focus</h3>
  <div class="chips" id="skChips"></div>
  <h3 class="mt">Level</h3>
  <div class="chips" id="lvChips"></div>
  <h3 class="mt">Minutes a day</h3>
  <div class="chips" id="mnChips"></div>
  <p class="note">Branch drives the goal, the conversation family and every downstream scenario.
  Occupation drives the Before/After vignette and the proof lines. Skill drives the feature screen and the
  practice mix. Level drives the research headline and the plan's starting point.</p>
</aside>

<div class="modal" id="modal">
  <div class="shell"><iframe id="modalFrame" title="Screen"></iframe></div>
  <div class="meta"><h4 id="modalTitle"></h4><div id="modalSub"></div><button id="modalClose">Close</button></div>
</div>

<script>
const BR={json.dumps(BRANCHES)};
const OCCS={json.dumps(OCCS)};
const SKILLS={json.dumps(SKILLS)};
const LEVELS={json.dumps(LEVELS)};
const MINS={json.dumps(MINS)};
const state={{branch:'career',occ:'working:office',skill:'fluency',level:'B1',min:15}};

function qs(){{
  const b=BR.find(x=>x[0]===state.branch)||BR[0];
  return `&branch=${{state.branch}}&fam=${{b[2]}}&jl=${{encodeURIComponent(b[3])}}`+
         `&occ=${{state.occ.split(':')[0]}}${{state.occ.includes(':')?'&field='+state.occ.split(':')[1]:''}}`+
         `&skill=${{state.skill}}&level=${{state.level}}&min=${{state.min}}`;
}}

/* lazy: a frame only loads once it scrolls near the viewport */
const io=new IntersectionObserver(es=>es.forEach(e=>{{
  if(!e.isIntersecting)return;
  const f=e.target;
  if(f.dataset.loaded!=='1'){{f.src=f.dataset.src+qs();f.dataset.loaded='1';}}
  io.unobserve(f);
}}),{{rootMargin:'400px'}});
const frames=[...document.querySelectorAll('.ph iframe')];
frames.forEach(f=>io.observe(f));

function reload(){{
  frames.forEach(f=>{{
    if(f.dataset.loaded==='1')f.src=f.dataset.src+qs();
    else io.observe(f);
  }});
}}

function chipRow(el,items,key){{
  el.innerHTML=items.map(i=>{{
    const v=Array.isArray(i)?i[0]:i, l=Array.isArray(i)?i[1]:i;
    return `<button data-v="${{v}}" class="${{String(v)===String(state[key])?'on':''}}">${{l}}</button>`;
  }}).join('');
  el.addEventListener('click',e=>{{
    const b=e.target.closest('button');if(!b)return;
    state[key]=key==='min'?+b.dataset.v:b.dataset.v;
    [...el.children].forEach(c=>c.classList.toggle('on',c===b));
    reload();
  }});
}}
chipRow(document.getElementById('brChips'),BR.map(b=>[b[0],b[1]]),'branch');
chipRow(document.getElementById('occChips'),OCCS,'occ');
chipRow(document.getElementById('skChips'),SKILLS,'skill');
chipRow(document.getElementById('lvChips'),LEVELS,'level');
chipRow(document.getElementById('mnChips'),MINS,'min');

/* zoom */
const modal=document.getElementById('modal'),mf=document.getElementById('modalFrame');
document.addEventListener('click',e=>{{
  const z=e.target.closest('.zoom');if(!z)return;
  mf.src='app/index.html?embed=1&jump='+z.dataset.screen+qs();
  document.getElementById('modalTitle').textContent=z.dataset.label;
  document.getElementById('modalSub').textContent=z.dataset.screen+' · live and interactive';
  modal.classList.add('on');
}});
const close=()=>{{modal.classList.remove('on');mf.src='about:blank';}};
document.getElementById('modalClose').addEventListener('click',close);
modal.addEventListener('click',e=>{{if(e.target===modal)close();}});
addEventListener('keydown',e=>{{if(e.key==='Escape')close();}});
</script>
</body>
</html>
'''

open(os.path.join(OUT, 'index.html'), 'w').write(html)
print('built ->', OUT, f'({total} screens)')
