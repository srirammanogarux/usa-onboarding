/* ============================================================
   Stimuler Onboarding · content.js
   The ~70 authored blocks. One driver per screen + one slotted
   word max. Blanks ({industry}, {name}, {weeks}) fill at runtime.
   ============================================================ */

/* ---------- occupations: stat line + the slot word ---------- */
const INDUSTRIES = {
  "careerbreak": {
    "slot": "your field",
    "stat": "Returning to work is far easier when English is not the thing holding you back.",
    "bars": [
      44,
      84
    ]
  },
  "freelancer": {
    "slot": "freelance work",
    "stat": "Freelancers who pitch in confident English win better clients and better rates.",
    "bars": [
      46,
      86
    ]
  },
  "office": {
    "slot": "your office",
    "stat": "In US offices, communication skill is the #1 factor in promotions.",
    "bars": [
      55,
      90
    ]
  },
  "business": {
    "slot": "your business",
    "stat": "Business owners with confident English win more clients and better deals.",
    "bars": [
      50,
      88
    ]
  },
  "jobseek": {
    "slot": "your field",
    "stat": "Candidates who interview confidently in English get 2 to 3 times more callbacks.",
    "bars": [
      40,
      85
    ]
  },
  "student": {
    "slot": "your studies",
    "stat": "Students who speak up score better and get remembered by professors.",
    "bars": [
      50,
      87
    ]
  },
  "home": {
    "slot": "your family’s daily life",
    "stat": "For your family, your English opens doors for everyone at home.",
    "bars": [
      50,
      85
    ]
  },
  "other": {
    "slot": "your work",
    "stat": "Whatever you do, confident English raises what you earn and where you go.",
    "bars": [
      50,
      85
    ]
  }
};

/* ---------- goals → the JTBD options each goal shows ---------- */
/* every option maps to ONE of 8 content families */
/* keys mirror Stimuler's live goal taxonomy (cannot change the set, only the copy) */
const GOALS = {
  ielts:      { label: 'IELTS', jtbd: [
    { id: 'band',       label: 'Pass the speaking test',           fam: 'exam' },
    { id: 'twomin',     label: 'Speak two minutes without freezing', fam: 'exam' },
    { id: 'audio',      label: 'Understand fast native audio',     fam: 'fastspeech' } ]},
  career:     { label: 'Improve my career', jtbd: [
    { id: 'interview',  label: 'Ace a job interview',              fam: 'interview' },
    { id: 'meetings',   label: 'Speak up in meetings',             fam: 'meetings' },
    { id: 'fastco',     label: 'Understand fast coworkers',        fam: 'fastspeech' },
    { id: 'boss',       label: 'Talk to my boss with confidence',  fam: 'interview' },
    { id: 'custcalls',  label: 'Handle customer calls',            fam: 'customer' } ]},
  convo:      { label: 'Improve social conversations', jtbd: [
  {
    "id": "neighbors",
    "fam": "smalltalk",
    "label": "Make small talk feel natural"
  },
  {
    "id": "meetnew",
    "fam": "smalltalk",
    "label": "Meet new people and make friends"
  },
  {
    "id": "offices",
    "fam": "services",
    "label": "Handle doctors and offices solo"
  },
  {
    "id": "inlaws",
    "fam": "family",
    "label": "Win over my partner’s family"
  }
]},
  travel:     { label: 'Travel', jtbd: [
    { id: 'airports',   label: 'Breeze through airports and hotels', fam: 'services' },
    { id: 'meetppl',    label: 'Make friends while traveling',     fam: 'smalltalk' },
    { id: 'problems',   label: 'Sort out any mix-up abroad',       fam: 'services' } ]},
  school:     { label: 'Excel at my school', jtbd: [
    { id: 'examoral',   label: 'Pass my speaking exam',            fam: 'exam' },
    { id: 'lectures',   label: 'Keep up with fast lectures',       fam: 'fastspeech' },
    { id: 'classtalk',  label: 'Speak up in class discussions',    fam: 'meetings' },
    { id: 'classmates', label: 'Make friends on campus',           fam: 'smalltalk' } ]},
  other:      { label: 'Any other goal', jtbd: [
    { id: 'nofear',     label: 'Speak without overthinking',       fam: 'smalltalk' },
    { id: 'friends',    label: 'Start conversations anywhere',     fam: 'smalltalk' },
    { id: 'native',     label: 'Understand native speakers at full speed', fam: 'fastspeech' },
    { id: 'someday',    label: 'Be ready when opportunity knocks', fam: 'interview' } ]}
};

/* ---------- hint scaffold: 4-part answer framework per family ---------- */
/* ---------- the first practice ----------
   Career varies by who the person is (work mode), because a freelancer's hard
   conversation is a price and an office worker's is an update. Every other goal has
   one strong question, since social English does not change with your job. */
const PRACTICE = {
  "career|office": {
    "ctx": "Your team is mid-discussion and your manager turns to you.",
    "q": "Can you give us a quick update on where things are?",
    "steps": [
      "Say where it stands",
      "Give the detail",
      "Name the blocker",
      "Say the next step"
    ],
    "parts": [
      "The redesign is on track for Friday.",
      "Three of the five screens are done.",
      "We are still waiting on copy for the last two.",
      "I will chase that today and confirm tomorrow."
    ]
  },
  "career|ownboss": {
    "ctx": "A client likes your work, and now they ask about money.",
    "q": "So what do you charge for this?",
    "steps": [
      "Say the number",
      "Say what is included",
      "Give the reason",
      "Hold it"
    ],
    "parts": [
      "My rate for this is two thousand.",
      "That covers the work, two rounds of changes, and the files.",
      "It takes me about three weeks of full days.",
      "That is my rate, and I think it is fair."
    ]
  },
  "career|jobhunt": {
    "ctx": "You are in the final interview for a job you want.",
    "q": "So, why should we hire you?",
    "steps": [
      "Answer it directly",
      "Give your reason",
      "Give an example",
      "Close it"
    ],
    "parts": [
      "I am a strong fit for this role.",
      "I stay calm under pressure, and my team trusts me.",
      "Last month I ran our busiest week with no mistakes.",
      "That is why I know I can deliver here."
    ]
  },
  "career|careerbreak": {
    "ctx": "The interviewer stops at the gap on your CV.",
    "q": "What were you doing during this time?",
    "steps": [
      "Name it plainly",
      "Say what you did",
      "Show it kept you sharp",
      "Bring it back"
    ],
    "parts": [
      "I took two years out to care for my family.",
      "I kept taking small projects through it.",
      "I finished a course in the last six months.",
      "I am ready to come back full time now."
    ]
  },
  "career|athome": {
    "ctx": "You are applying for your first role in years.",
    "q": "You have not worked for a while. Why now?",
    "steps": [
      "Answer it directly",
      "Say what changed",
      "Say what you bring",
      "Say what you want"
    ],
    "parts": [
      "My youngest started school this year.",
      "That gives me time I did not have before.",
      "I have run a household budget and schedule for years.",
      "I want to put that into a real job."
    ]
  },
  "career|student": {
    "ctx": "You are interviewing for your first internship.",
    "q": "You have no work experience. Why should we take you?",
    "steps": [
      "Answer it directly",
      "Give your reason",
      "Give an example",
      "Close it"
    ],
    "parts": [
      "I learn fast, and I finish what I start.",
      "I ran the events for our student society all year.",
      "We doubled the turnout in two terms.",
      "I would bring the same energy here."
    ]
  },
  "career|other": {
    "ctx": "You are interviewing for a job you want.",
    "q": "Tell me about yourself.",
    "steps": [
      "Start with now",
      "Say one strength",
      "Give an example",
      "Say what you want"
    ],
    "parts": [
      "Right now I work in customer support.",
      "What I am good at is staying calm with people.",
      "Last year I handled our busiest month with no complaints.",
      "I am looking for somewhere I can do more of that."
    ]
  },
  "convo": {
    "ctx": "You meet an old friend at a cafe after a long time. They sit down and ask:",
    "q": "So what are you doing these days?",
    "steps": [
      "Say what you do now",
      "Add one detail",
      "Say what is new",
      "Ask them back"
    ],
    "parts": [
      "I am still at the same company, but I moved to a new team last year.",
      "I work with customers now, and I like that part a lot.",
      "Outside work I started running in the mornings.",
      "What about you, are you still living near the old place?"
    ]
  },
  "travel": {
    "ctx": "There is no hot water in your hotel room. You go down to the desk, and the receptionist asks:",
    "q": "Can you tell me exactly what the problem is?",
    "steps": [
      "Say the problem",
      "Say what you tried",
      "Say what you need",
      "Confirm"
    ],
    "parts": [
      "There is no hot water in my room, three zero two.",
      "I ran the shower for ten minutes and it stayed cold.",
      "Could someone come and look at it this afternoon?",
      "I will be back by four, so any time after that works."
    ]
  },
  "school": {
    "ctx": "Your class is discussing whether students should keep their phones in lessons. The teacher turns to you and asks:",
    "q": "What is your opinion, and why do you think that?",
    "steps": [
      "Say your view",
      "Give your reason",
      "Give an example",
      "Close it"
    ],
    "parts": [
      "I think phones should stay in our bags during lessons.",
      "It is hard to listen when a screen keeps lighting up next to you.",
      "In our group project last week, nobody finished on time.",
      "So I would allow them at break, but not in class."
    ]
  },
  "ielts": {
    "ctx": "IELTS Speaking, Part 2. You have one minute to talk.",
    "q": "Describe a place you enjoy visiting.",
    "steps": [
      "Name it",
      "Say where and when",
      "Give the detail",
      "Say why it matters"
    ],
    "parts": [
      "I want to talk about a small beach near my home.",
      "It is about thirty minutes away, and I go most weekends.",
      "It is quiet, there is one cafe, and you can hear the water.",
      "I go there to think, and I always leave calmer."
    ]
  },
  "other": {
    "ctx": "You are meeting someone new who could open a door for you. They ask:",
    "q": "Tell me a little about yourself.",
    "steps": [
      "Start with now",
      "Say one strength",
      "Give an example",
      "Say what you want"
    ],
    "parts": [
      "Right now I am working and studying English on the side.",
      "What I am good at is sticking with things.",
      "I have practised every day for the last month.",
      "I want to use English without thinking about it."
    ]
  }
};

/* ---------- the model answer for the practice ----------
   The practice question comes from BA_SAY / BA_SAY_OCC, so it is the same question the
   before/after screen just showed them. These four parts answer THAT question.

   The four labels used to be one generic set for every family, which is why a
   clarification answer was labelled "start with your point / add an example". Each
   family now names its own four steps. */
const SCAFFOLD = {
  interview: { steps:['Answer it directly','Give your reason','Give an example','Close it'],
    parts:['I am a strong fit for this role.',
           'I stay calm under pressure, and my team trusts me.',
           'Last month I ran our busiest week with no mistakes.',
           'That is why I know I can deliver here.'] },
  pitch: { steps:['Say the number','Say what is included','Give the reason','Hold it'],
    parts:['My rate for this is two thousand.',
           'That covers the work, two rounds of changes, and the files.',
           'It takes me about three weeks of full days.',
           'That is my rate, and I think it is fair.'] },
  crew: { steps:['Start with the goal','Give the order','Name the risk','Confirm the finish'],
    parts:['Today we finish the east wall.',
           'Frame first, then the panels after lunch.',
           'If the delivery is late, we start the south side instead.',
           'Inspection should clear by four.'] },
  meetings: { steps:['Say your view','Give your reason','Give an example','Suggest the step'],
    parts:['I see one risk in this plan.',
           'The timeline leaves no room for testing.',
           'Last release, one extra week of testing saved us.',
           'So I suggest we add that week.'] },
  fastspeech: { steps:['Say what you got','Check the key part','Ask for the rest','Confirm'],
    parts:['I got most of that.',
           'You need the report before the call, yes?',
           'Can you say the time again?',
           'Got it. I will have it ready.'] },
  customer: { steps:['Answer directly','Give the reason','Give an example','Recommend'],
    parts:['Yes, there is a real difference.',
           'This one lasts about twice as long.',
           'People who buy the cheaper one are usually back within a year.',
           'For how you use it, I would take this one.'] },
  services: { steps:['Name the problem','Say when it started','Add one detail','Say what you need'],
    parts:['I have a pain in my lower back.',
           'It started about a week ago.',
           'It is worse in the morning and after I sit for long.',
           'I would like to know what is causing it.'] },
  smalltalk: { steps:['Give the short answer','Add one detail','Give an example','Turn it back'],
    parts:['I work in design, and I moved here last year.',
           'Most of my week is spent talking to customers.',
           'Last weekend I finally tried the market everyone talks about.',
           'What about you, are you from here?'] },
  family: { steps:['Answer honestly','Give the detail','Say what you notice','Ask for help'],
    parts:['She is doing well, better than last term.',
           'She reads to me most nights now.',
           'She still slows down on the longer words.',
           'What could we do at home to help with that?'] },
  exam: { steps:['Name it','Say where and when','Give the detail','Say why it matters'],
    parts:['I want to talk about a small beach near my home.',
           'It is about thirty minutes away, and I go most weekends.',
           'It is quiet, there is one cafe, and you can hear the water.',
           'I go there to think, and I always leave calmer.'] },
  pronunciation: { steps:['Say it slowly','Break the word','Say it again','Use it'],
    parts:['Let me say that again, slowly.',
           'Play-ing. Two parts, the stress is on the first.',
           'Playing. That is closer.',
           'The children are playing outside.'] }
};


/* ---------- pronunciation practice pairs (hint-user results flow) ---------- */
/* two tricky words per family, both present in that family's SCAFFOLD passage */
const PRONWORDS = {
  /* Keyed the same as PRACTICE, because these two words must actually occur in
     that set's passage. Keying them on the JTBD family let the practice copy be
     rewritten underneath them, and the highlight then matched nothing. */
  'career|office':[
    {w:'redesign',   parts:['re','de','sign'], ph:'ree.di.zain',   tip:'Three beats, stress the last one', start:52},
    {w:'confirm',    parts:['con','fir','m'],  ph:'kun.furm',      tip:'The first beat is short: kun',    start:48}],
  'career|ownboss':[
    {w:'thousand',   parts:['thou','san','d'], ph:'thow.zund',     tip:'The middle sound is a soft z',     start:51},
    {w:'covers',     parts:['co','ver','s'],   ph:'kuh.vurz',      tip:'Ends on a z, not an s',            start:47}],
  'career|jobhunt':[
    {w:'pressure',   parts:['pre','ssu','re'], ph:'preh.shur',     tip:'The double s sounds like sh',      start:52},
    {w:'deliver',    parts:['de','liv','er'],  ph:'duh.li.vur',    tip:'Stress the middle beat: li',       start:48}],
  'career|careerbreak':[
    {w:'projects',   parts:['pro','jec','ts'], ph:'pro.jekts',     tip:'Keep the ts crisp at the end',     start:50},
    {w:'finished',   parts:['fi','ni','shed'], ph:'fi.nisht',      tip:'The ending is sht, not shed',      start:47}],
  'career|athome':[
    {w:'household',  parts:['house','hol','d'],ph:'howss.hold',    tip:'Two beats, no gap between them',   start:51},
    {w:'schedule',   parts:['sche','du','le'], ph:'ske.jool',      tip:'The sch sounds like sk',           start:46}],
  'career|student':[
    {w:'society',    parts:['so','ci','ety'],  ph:'suh.sai.uh.tee',tip:'Four beats, stress sai',           start:49},
    {w:'doubled',    parts:['dou','ble','d'],  ph:'duh.buld',      tip:'The ou is short: duh',             start:52}],
  'career|other':[
    {w:'customer',   parts:['cus','to','mer'], ph:'kus.tuh.mur',   tip:'Three beats, stress kus',          start:53},
    {w:'complaints', parts:['com','plain','ts'],ph:'kum.playnts',  tip:'Land the ts at the end',           start:48}],
  'convo':[
    {w:'company',    parts:['com','pa','ny'],  ph:'kum.puh.nee',   tip:'Stress the first beat: kum',       start:52},
    {w:'mornings',   parts:['mor','ning','s'], ph:'mor.ningz',     tip:'Ends on a z sound',                start:49}],
  'travel':[
    {w:'afternoon',  parts:['af','ter','noon'],ph:'af.tur.noon',   tip:'Three beats, stress noon',         start:50},
    {w:'minutes',    parts:['mi','nu','tes'],  ph:'mi.nits',       tip:'Two beats only: mi.nits',          start:47}],
  'school':[
    {w:'lessons',    parts:['le','sson','s'],  ph:'le.sunz',       tip:'The double s is one soft s',       start:51},
    {w:'project',    parts:['pro','jec','t'],  ph:'pro.jekt',      tip:'The j is sharp',                   start:48}],
  'ielts':[
    {w:'weekends',   parts:['week','end','s'], ph:'week.endz',     tip:'Ends on a z sound',                start:52},
    {w:'thirty',     parts:['thir','t','y'],   ph:'thur.tee',      tip:'Soft th, tongue out',              start:46}],
  'other':[
    {w:'practised',  parts:['prac','ti','sed'],ph:'prak.tist',     tip:'The ending is st, not sed',        start:50},
    {w:'studying',   parts:['stu','dy','ing'], ph:'stuh.dee.ing',  tip:'Three beats, stress stuh',         start:47}]
};

/* ---------- before/after vignettes, keyed by occupation ---------- */
const OCCBA = {
  "office": {
    "q": "Can you walk us through your idea?",
    "before": "… Yes… I mean… the plan is… sorry, one moment.",
    "after": "Sure. Three steps, and the first one saves us money today.",
    "testi": {
      "quote": "I led my first full meeting in English last week.",
      "name": "Priya S.",
      "city": "Toronto"
    }
  },
  "freelancer": {
    "q": "So what do you charge for this?",
    "before": "… It depends… I can send… email later?",
    "after": "My rate is fixed, and here is exactly what you get for it.",
    "testi": {
      "quote": "I stopped undercharging the moment I could explain my value.",
      "name": "Andrea C.",
      "city": "Austin"
    }
  },
  "business": {
    "q": "Can you do a better price?",
    "before": "… Price is… price. Is good price…",
    "after": "I hear you. Here is why it costs what it costs.",
    "testi": {
      "quote": "Negotiating in English used to scare me. Not anymore.",
      "name": "Luis M.",
      "city": "Austin"
    }
  },
  "jobseek": {
    "q": "So, why should we hire you?",
    "before": "… Sorry, can you repeat the question?",
    "after": "I stay calm under pressure, and my team trusts me. Let me give you an example.",
    "testi": {
      "quote": "I walked out of my interview smiling.",
      "name": "Ana M.",
      "city": "Dallas"
    }
  },
  "student": {
    "q": "What do you think about this reading?",
    "before": "… I agree… with the… other points.",
    "after": "I see it differently, and here is why.",
    "testi": {
      "quote": "I finally raise my hand in seminars.",
      "name": "Wei L.",
      "city": "Boston"
    }
  },
  "home": {
    "q": "How is your daughter doing with her reading?",
    "before": "… She is… good… thank you…",
    "after": "She loves it. I would like ideas to challenge her more.",
    "testi": {
      "quote": "Parent-teacher meetings do not scare me anymore.",
      "name": "Rosa D.",
      "city": "San Jose"
    }
  },
  "careerbreak": {
    "q": "So, what have you been doing since your last role?",
    "before": "… I was… at home… some time…",
    "after": "I took time out for family, and I kept my skills sharp. Here is how.",
    "testi": {
      "quote": "The gap stopped being the thing I was afraid of.",
      "name": "Neha R.",
      "city": "Chicago"
    }
  },
  "other": {
    "q": "So, tell me about yourself.",
    "before": "… I am… how to say… normal person…",
    "after": "Three things about me, and one of them surprises people.",
    "testi": {
      "quote": "I stopped rehearsing sentences in my head first.",
      "name": "Elif A.",
      "city": "Berlin"
    }
  }
};

/* ---------- skill beat: motivation + coverage, not a feature demo ---------- */
const SKILLOUT = {
  fluency:      {
                  title: 'Learners who stay<br>talk without pausing.',
                  lead: 'They practice', n: 500,
                  unit: 'real conversations before it stops feeling hard',
                  tags: ['Job interviews','Team meetings','Small talk','Phone calls','Client pitches','Meeting new people','Asking for help','Telling a story','Disagreeing politely','Ordering food'], head: 'Speak confidently as you<br>practice with <em>real feedback</em>.',
                  body: '500 real conversations, practiced until it stops feeling hard.',
                  big: '500+', bigLab: 'real conversation scenarios',
                  chips: ['Interviews', 'Meetings', 'Small talk', 'Phone calls'],
                  testi: { quote: 'I stopped rehearsing sentences in my head. Now I just talk.', name: 'Priya S.', city: 'Toronto' } },
  pronunciation:{
                  title: 'Learners who stay<br>get understood.',
                  lead: 'They drill', n: 44,
                  unit: 'English sounds, until they land every time',
                  tags: ['TH sounds','Word stress','Vowel length','Word endings','R and L','V and W','Silent letters','Sentence rhythm','Linking words','Intonation'], head: 'Sound like a native with<br><em>pronunciation practice</em>.',
                  body: 'All 44 English sounds, drilled until they land every time.',
                  big: '44', bigLab: 'English sounds covered',
                  chips: ['Word stress', 'Vowel length', 'Th sounds', 'Endings'],
                  testi: { quote: 'Nobody asks me to repeat myself anymore.', name: 'Diego A.', city: 'Miami' } },
  vocabulary:   {
                  title: 'Learners who stay<br>find words faster.',
                  lead: 'They learn', n: 3000,
                  unit: 'high-use words and phrases they actually reach for',
                  tags: ['Work words','Everyday words','Linking phrases','Idioms','Polite requests','Describing problems','Opinions','Numbers and dates','Phrasal verbs','Small talk openers'], head: 'Find the right words with<br><em>daily word practice</em>.',
                  body: '3,000 high-use words and phrases, learned until you actually reach for them.',
                  big: '3,000', bigLab: 'high-use words and phrases',
                  chips: ['Work words', 'Everyday words', 'Linking phrases', 'Idioms'],
                  testi: { quote: 'My words finally match what I am trying to say.', name: 'Lucía P.', city: 'Los Ángeles' } },
  grammar:      {
                  title: 'Learners who stay<br>make fewer mistakes.',
                  lead: 'They master', n: 120,
                  unit: 'grammar rules, practiced inside real sentences',
                  tags: ['Tenses','Articles','Prepositions','Word order','Questions','Plurals','Conditionals','Modals','Comparatives','Reported speech'], head: 'Speak correctly with<br><em>grammar practice</em>.',
                  body: '120 grammar rules, practiced inside real sentences.',
                  big: '120', bigLab: 'grammar rules covered',
                  chips: ['Tenses', 'Articles', 'Prepositions', 'Word order'],
                  testi: { quote: 'I stopped guessing tenses. It just comes out right now.', name: 'Wei L.', city: 'Boston' } }
};

/* ---------- level beat: where you are now, where this takes you ---------- */
/* how an occupation is named back to the user on the summary */
const OCC_TITLE = {
  "office": "Office professional",
  "freelancer": "Freelancer",
  "business": "Business owner",
  "jobseek": "Job seeker",
  "student": "Student",
  "home": "At home",
  "careerbreak": "Career break",
  "other": "Learner"
};
/* what the first practice actually asks, per JTBD family */
const PRACTICE_ASK = {
  interview:'interview question', pitch:'question from a client', crew:'question on site',
  meetings:'question in a meeting', fastspeech:'question at full speed',
  customer:'question from a customer', services:'question at an appointment',
  smalltalk:'everyday question', family:'question from a teacher',
  exam:'IELTS speaking question', pronunciation:'question out loud'
};

/* Sarah on the level beat — reassurance, and the honest answer for the top two levels */
const CEFR_ORDER = ['A1','A2','B1','B2','C1','C2'];
const SARAH_LVL = {
  A1:'Starting out is the fastest stretch there is. Two levels up is very doable.',
  A2:'You know more than you think. Most people place themselves a level low.',
  B1:'Most people place themselves a level low. Two levels up is very doable.',
  B2:'You are further along than you think. Two levels up is very doable.',
  C1:'You are close to the top already. One more level and it stops being effort.',
  C2:'At your level the gap is not knowledge. It is holding it when the pressure is on.'
};

/* superseded by CEFR_ORDER + two-up on the level beat; kept out of the flow */

/* ---------- work mode: what actually changes the conversation ----------
   13 occupations collapse to 8 modes for WORDING. Imagery stays per-occupation. */
/* occupations without their own before/after artwork borrow the closest set */
/* occupations that have gender-specific before/after art generated; others fall back */
const BAGENDER = new Set([]);
const BAIMG = {
  "freelancer": "business",
  "careerbreak": "jobseek"
};
const WORKMODE = {
  "careerbreak": "careerbreak",
  "office": "office",
  "freelancer": "ownboss",
  "business": "ownboss",
  "jobseek": "jobhunt",
  "home": "athome",
  "student": "student",
  "other": "other"
};
/* one option that belongs to this occupation alone, pinned to the top of its list */
/* pinned to the top of the list — but only for the goals where a work conversation belongs.
   Without the `goals` gate a freelancer choosing Travel was offered "Pitch on a client call". */
const OCC_EXTRA = {
  freelancer: { id:'clientcall', label:'Pitch on a client call',    fam:'pitch',     goals:['career'] },
  business:   { id:'walkin',     label:'Handle a walk-in customer', fam:'customer',  goals:['career'] }
};
/* JTBD overrides, only where the goal's base list is wrong for that mode */
const JTBD_MODE = {
  "career": {
    "ownboss": [
      {
        "id": "newclient",
        "label": "Win a new client",
        "fam": "pitch"
      },
      {
        "id": "price",
        "label": "Explain and defend my price",
        "fam": "pitch"
      },
      {
        "id": "fastcli",
        "label": "Understand fast clients",
        "fam": "fastspeech"
      },
      {
        "id": "payment",
        "label": "Chase a late payment",
        "fam": "pitch"
      }
    ],
    "jobhunt": [
      {
        "id": "interview",
        "fam": "interview",
        "label": "Ace a job interview"
      },
      {
        "id": "tellme",
        "fam": "interview",
        "label": "Answer \"tell me about yourself\""
      },
      {
        "id": "network",
        "fam": "smalltalk",
        "label": "Network to find openings"
      },
      {
        "id": "offer",
        "fam": "pitch",
        "label": "Negotiate the offer"
      }
    ],
    "student": [
      {
        "id": "intern",
        "label": "Land an internship",
        "fam": "interview"
      },
      {
        "id": "gradint",
        "label": "Speak up in interviews",
        "fam": "interview"
      },
      {
        "id": "network",
        "label": "Network on campus",
        "fam": "smalltalk"
      }
    ],
    "athome": [
      {
        "id": "startagain",
        "fam": "interview",
        "label": "Start working again"
      },
      {
        "id": "homeskills",
        "fam": "interview",
        "label": "Talk about skills I built at home"
      },
      {
        "id": "meetings",
        "fam": "meetings",
        "label": "Speak up in meetings"
      },
      {
        "id": "newwork",
        "fam": "smalltalk",
        "label": "Make friends at a new workplace"
      }
    ],
    "careerbreak": [
      {
        "id": "gap",
        "fam": "interview",
        "label": "Explain a gap in my CV"
      },
      {
        "id": "interview",
        "fam": "interview",
        "label": "Ace a job interview"
      },
      {
        "id": "backin",
        "fam": "meetings",
        "label": "Speak up in meetings again"
      },
      {
        "id": "worktalk",
        "fam": "smalltalk",
        "label": "Handle work small talk again"
      }
    ]
  },
  "convo": {
    "ownboss": [
      {
        "id": "events",
        "fam": "smalltalk",
        "label": "Meet new people at events"
      },
      {
        "id": "neighbors",
        "fam": "smalltalk",
        "label": "Make small talk feel natural"
      },
      {
        "id": "offices",
        "fam": "services",
        "label": "Handle doctors and offices solo"
      },
      {
        "id": "inlaws",
        "fam": "family",
        "label": "Win over my partner’s family"
      }
    ],
    "student": [
      {
        "id": "campus",
        "label": "Make friends on campus",
        "fam": "smalltalk"
      },
      {
        "id": "neighbors",
        "label": "Make small talk feel natural",
        "fam": "smalltalk"
      },
      {
        "id": "offices",
        "label": "Handle doctors and offices solo",
        "fam": "services"
      }
    ],
    "athome": [
      {
        "id": "kidshelp",
        "fam": "family",
        "label": "Support my kids at school"
      },
      {
        "id": "teachers",
        "fam": "services",
        "label": "Talk to teachers and doctors solo"
      },
      {
        "id": "gate",
        "fam": "smalltalk",
        "label": "Make friends at the school gate"
      },
      {
        "id": "inlaws",
        "fam": "family",
        "label": "Win over my partner’s family"
      }
    ],
    "jobhunt": [
      {
        "id": "meetnew",
        "fam": "smalltalk",
        "label": "Meet new people and make friends"
      },
      {
        "id": "neighbors",
        "fam": "smalltalk",
        "label": "Make small talk feel natural"
      },
      {
        "id": "offices",
        "fam": "services",
        "label": "Handle doctors and offices solo"
      },
      {
        "id": "inlaws",
        "fam": "family",
        "label": "Win over my partner’s family"
      }
    ],
    "careerbreak": [
      {
        "id": "backchat",
        "fam": "smalltalk",
        "label": "Get back into everyday chat"
      },
      {
        "id": "meetnew",
        "fam": "smalltalk",
        "label": "Meet new people and make friends"
      },
      {
        "id": "offices",
        "fam": "services",
        "label": "Handle doctors and offices solo"
      },
      {
        "id": "kidshelp",
        "fam": "family",
        "label": "Support my kids at school"
      }
    ],
    "office": [
      {
        "id": "neighbors",
        "fam": "smalltalk",
        "label": "Make small talk feel natural"
      },
      {
        "id": "colleagues",
        "fam": "smalltalk",
        "label": "Chat with colleagues outside work"
      },
      {
        "id": "offices",
        "fam": "services",
        "label": "Handle doctors and offices solo"
      },
      {
        "id": "inlaws",
        "fam": "family",
        "label": "Win over my partner’s family"
      }
    ]
  }
};
/* the outcome claim, where the money framing changes with the mode.
   Any mode whose claim the Azam study does not support gets our own data label. */
/* ---------- language acknowledgement (¡Perfecto!) ----------
   Spanish gets the Spanish build. Every other language gets English. */
const ACKCOPY = {
  es: {
    head: '\u00A1Perfecto!',
    rated: 'App mejor valorada',
    users: 'La elecci\u00F3n de<br>los usuarios',
    play:  'Mejor app con IA<br>Google Play 2023',
    testis: [
      { name:'Mar\u00EDa R. \u00B7 Houston \uD83C\uDDF2\uD83C\uDDFD', t:'Pas\u00E9 mi entrevista en ingl\u00E9s', b:'En 3 meses dej\u00E9 de congelarme. Todo empez\u00F3 aqu\u00ED\u2026' },
      { name:'Diego A. \u00B7 Miami \uD83C\uDDE8\uD83C\uDDF4', t:'Por fin me entienden', b:'Mi pronunciaci\u00F3n mejor\u00F3 tanto que ya nadie me pide repetir.' },
      { name:'Luc\u00EDa P. \u00B7 Madrid \uD83C\uDDEA\uD83C\uDDF8', t:'Mejor que clases caras', b:'Practico hablando de verdad, 10 minutos al d\u00EDa. Incre\u00EDble.' }
    ]
  },
  en: {
    head: 'Perfect!',
    rated: 'Top rated app',
    users: 'The choice of<br>learners worldwide',
    play:  'Best app with AI<br>Google Play 2023',
    testis: [
      { name:'Aisha N. \u00B7 Dubai \uD83C\uDDE6\uD83C\uDDEA', t:'I passed my interview in English', b:'In three months I stopped freezing. It started right here\u2026' },
      { name:'Ravi K. \u00B7 Bengaluru \uD83C\uDDEE\uD83C\uDDF3', t:'People understand me now', b:'My pronunciation improved so much that nobody asks me to repeat.' },
      { name:'Thuy N. \u00B7 Hanoi \uD83C\uDDFB\uD83C\uDDF3', t:'Better than expensive classes', b:'I practice real speaking, ten minutes a day. Incredible.' }
    ]
  }
};

/* the question the conversation mock opens with, per JTBD family */
const BENTO_ASK = {
  interview:'So, why should we hire you?', pitch:'So what do you charge for this?',
  crew:'Walk me through the plan for today.', meetings:'What do you think we should do?',
  fastspeech:'Sorry, did you catch all that?', customer:'Can you help me with my order?',
  services:'What seems to be the problem today?', smalltalk:'Busy weekend?',
  exam:'Describe a place you enjoy visiting.', family:'How is she doing with her reading?',
  pronunciation:'Could you say that again?'
};

/* the headline: what changes in their life, as a statement.
   Deliberately says something the bullets do NOT say, so the two do not overlap. */
const BA_HEAD = {
  "career|customer": "Every customer call<br>stays calm.",
  "career|fastspeech": "Fast coworkers stop<br>losing you.",
  "career|interview": "Interviews stop<br>being the hard part.",
  "career|meetings": "The room hears you<br>while it still matters.",
  "career|pitch": "Clients hear your value,<br>not your hesitation.",
  "career|smalltalk": "The right people<br>remember you.",
  "convo|family": "You belong<br>in the room.",
  "convo|services": "You sort it out<br>on your own.",
  "convo|smalltalk": "Small talk stops<br>feeling like work.",
  "ielts|exam": "Exam day sounds<br>like practice.",
  "ielts|fastspeech": "The audio stops<br>going too fast.",
  "other|fastspeech": "Native speed stops<br>leaving you behind.",
  "other|interview": "You are ready<br>when it comes.",
  "other|smalltalk": "You speak<br>before you overthink.",
  "school|exam": "Your oral exam<br>stops being scary.",
  "school|fastspeech": "Lectures stop<br>getting away from you.",
  "school|meetings": "Your idea reaches<br>the discussion.",
  "school|smalltalk": "Campus stops<br>feeling lonely.",
  "travel|services": "You handle the trip<br>on your own.",
  "travel|smalltalk": "Strangers become<br>travel friends."
};


/* ---------- the moment, keyed on the JTBD family ----------
   This is the fix for the real defect: the question and the two answers used to key on
   occupation alone, so an office worker who chose "ace a job interview" was shown a
   question about walking the room through an idea. The family decides the moment.
   BA_SAY_OCC overrides it only where the occupation genuinely changes what is asked. */
const BA_SAY = {
  interview: { q:'So, why should we hire you?',
               before:'\u2026 Sorry, can you repeat the question?',
               after:'I stay calm under pressure, and my team trusts me. Let me give you an example.' },
  pitch:     { q:'So what do you charge for this?',
               before:'\u2026 It depends\u2026 I can send\u2026 email later?',
               after:'My rate is fixed, and here is exactly what you get for it.' },
  crew:      { q:'Walk me through the plan for today.',
               before:'\u2026 First we\u2026 do the thing\u2026 with the\u2026',
               after:'Crew starts on the east wall. Inspection clears by noon.' },
  meetings:  { q:'What do you think we should do?',
               before:'\u2026 I agree\u2026 with the other points.',
               after:'I see it differently, and here is why.' },
  fastspeech:{ q:'Sorry, did you catch all that?',
               before:'\u2026 Yes\u2026 yes\u2026 no problem.',
               after:'Most of it. Can you say the second part again?' },
  customer:  { q:'Is there a difference between these two?',
               before:'\u2026 This one is\u2026 also good\u2026',
               after:'Big difference. This one lasts twice as long, and here is why.' },
  services:  { q:'What seems to be the problem today?',
               before:'\u2026 The pain is\u2026 here\u2026 sometimes\u2026',
               after:'It started last week, and it is worse in the morning.' },
  smalltalk: { q:'So, tell me about yourself.',
               before:'\u2026 I am\u2026 how to say\u2026 normal person\u2026',
               after:'Three things about me, and one of them surprises people.' },
  family:    { q:'How is she doing with her reading?',
               before:'\u2026 She is\u2026 good\u2026 thank you\u2026',
               after:'She loves it. I would like ideas to challenge her more.' },
  exam:      { q:'Describe a place you enjoy visiting.',
               before:'\u2026 I like\u2026 the beach\u2026 it is nice\u2026',
               after:'A small beach near my home. I go there to think, and here is why.' }
};
/* occupation x family, only where the occupation changes the question being asked */
const BA_SAY_OCC = {
  "business|pitch": {
    "q": "Can you do a better price?",
    "before": "… Price is… price. Is good price…",
    "after": "I hear you. Here is why it costs what it costs."
  },
  "office|meetings": {
    "q": "Can you walk us through your idea?",
    "before": "… Yes… I mean… the plan is… sorry, one moment.",
    "after": "Sure. Three steps, and the first one saves us money today."
  },
  "student|meetings": {
    "q": "What do you think about this reading?",
    "before": "… I agree… with the… other points.",
    "after": "I see it differently, and here is why."
  },
  "careerbreak|interview": {
    "q": "What have you been doing since your last role?",
    "before": "… I was… at home… some time…",
    "after": "I took time out for family, and I kept my skills sharp. Here is how."
  }
};

/* ---------- the two columns, per JTBD family ----------
   Before is what they recognise in themselves today. After is what replaces it.
   Neither repeats the headline: the headline is the outcome, these are the behaviours. */
const BA_BULLETS = {
  "career|customer": {
    "before": [
      "You rehearse before calls",
      "Complaints make you freeze",
      "You pass the hard ones on"
    ],
    "after": [
      "You pick up any call",
      "You stay calm when they are not",
      "You say no and keep them"
    ]
  },
  "career|fastspeech": {
    "before": [
      "You ask them to repeat",
      "You lose the thread halfway",
      "You nod without understanding"
    ],
    "after": [
      "You keep up at full speed",
      "You catch names and numbers",
      "You ask one clear question"
    ]
  },
  "career|interview": {
    "before": [
      "You rehearse for hours",
      "Your mind goes blank",
      "You answer too short"
    ],
    "after": [
      "You think on your feet",
      "You give real examples",
      "You ask them questions"
    ]
  },
  "career|meetings": {
    "before": [
      "You plan it too long",
      "The moment passes",
      "You agree to avoid talking"
    ],
    "after": [
      "You speak in the moment",
      "You disagree politely",
      "You sum up the decision"
    ]
  },
  "career|pitch": {
    "before": [
      "You drop your rate first",
      "You avoid the money talk",
      "You explain it by email"
    ],
    "after": [
      "You say the number",
      "You explain what is included",
      "You handle “too expensive”"
    ]
  },
  "career|smalltalk": {
    "before": [
      "You skip the networking part",
      "You run out after hello",
      "You leave without a contact"
    ],
    "after": [
      "You start the conversation",
      "You keep it going",
      "You leave with a name"
    ]
  },
  "convo|family": {
    "before": [
      "You smile and stay quiet",
      "You miss the joke",
      "You let others speak for you"
    ],
    "after": [
      "You join in",
      "You ask about them",
      "They talk to you directly"
    ]
  },
  "convo|services": {
    "before": [
      "You take someone with you",
      "You skip your question",
      "You accept a wrong answer"
    ],
    "after": [
      "You book it yourself",
      "You describe it clearly",
      "You ask again if it is wrong"
    ]
  },
  "convo|smalltalk": {
    "before": [
      "You wait to be spoken to",
      "You answer in two words",
      "You leave early"
    ],
    "after": [
      "You open with a question",
      "You keep it going",
      "You leave people smiling"
    ]
  },
  "ielts|exam": {
    "before": [
      "You freeze in part two",
      "Pauses cost you marks",
      "Your answers stay short"
    ],
    "after": [
      "You fill the two minutes",
      "You handle follow ups",
      "You use examiner words"
    ]
  },
  "ielts|fastspeech": {
    "before": [
      "You lose the speaker halfway",
      "You miss the numbers",
      "You guess the answer"
    ],
    "after": [
      "You follow the whole clip",
      "You catch dates and names",
      "You answer from what you heard"
    ]
  },
  "other|fastspeech": {
    "before": [
      "You ask people to repeat",
      "You lose the thread",
      "You nod without understanding"
    ],
    "after": [
      "You keep up at full speed",
      "You catch what matters",
      "You ask one clear question"
    ]
  },
  "other|interview": {
    "before": [
      "You put it off",
      "You feel unprepared",
      "You let the chance pass"
    ],
    "after": [
      "You speak when asked",
      "You say what you mean",
      "You take the chance"
    ]
  },
  "other|smalltalk": {
    "before": [
      "You plan the sentence first",
      "The moment passes",
      "You stay quiet"
    ],
    "after": [
      "You just say it",
      "The words keep coming",
      "You enjoy talking"
    ]
  },
  "school|exam": {
    "before": [
      "You blank in front of the teacher",
      "Long pauses cost marks",
      "You answer in one line"
    ],
    "after": [
      "You speak for the full time",
      "You handle the follow up",
      "You use the right words"
    ]
  },
  "school|fastspeech": {
    "before": [
      "You miss half the lecture",
      "You copy without understanding",
      "You ask friends afterwards"
    ],
    "after": [
      "You follow the lecturer",
      "You catch the key points",
      "You ask in the moment"
    ]
  },
  "school|meetings": {
    "before": [
      "You plan it too long",
      "The topic moves on",
      "You agree to stay safe"
    ],
    "after": [
      "You speak while it counts",
      "You disagree politely",
      "You build on others"
    ]
  },
  "school|smalltalk": {
    "before": [
      "You eat lunch alone",
      "You answer in two words",
      "You leave early"
    ],
    "after": [
      "You start the conversation",
      "You keep it going",
      "You make plans"
    ]
  },
  "travel|services": {
    "before": [
      "You point instead of asking",
      "You accept the wrong room",
      "You avoid the front desk"
    ],
    "after": [
      "You ask for what you need",
      "You fix problems yourself",
      "You get things changed"
    ]
  },
  "travel|smalltalk": {
    "before": [
      "You keep to yourself",
      "You answer in two words",
      "You miss the invite"
    ],
    "after": [
      "You start the conversation",
      "You swap stories",
      "You get invited along"
    ]
  }
};


/* ---------- Sarah on the outcome screen ----------
   Same axis as OUTCOME (goal, with career branching by work mode). She sits below the
   graph and closes it: the daily commitment, ending on their own outcome word. */
const SARAH_OUT = {
  career: 'Ten minutes of real practice a day is what gets you promoted.',
  ielts:  'Ten minutes of real practice a day is what moves your band.',
  convo:  'Ten minutes of real practice a day is what makes conversations easy.',
  travel: 'Ten minutes of real practice a day is what lets you go anywhere.',
  school: 'Ten minutes of real practice a day is what lifts your marks.',
  other:  'Ten minutes of real practice a day is what makes you fluent.'
};
const SARAH_OUT_MODE = {
  "career": {
    "ownboss": "Ten minutes of real practice a day is what wins you better clients.",
    "jobhunt": "Ten minutes of real practice a day is what gets you the callback.",
    "athome": "Ten minutes of real practice a day is what gets you back to work.",
    "careerbreak": "Ten minutes of real practice a day is what gets you back in the room."
  }
};


/* the first three sessions, named from their JTBD */
const WEEKONE = {
  interview:    ['"Tell me about yourself"','Why you want this role','The gap they will ask about'],
  pitch:        ['"So what do you charge for this?"','What is included, in one breath','When they say it is too expensive'],
  crew:         ['The morning brief','Flagging a problem fast','Pushing back on a deadline'],
  meetings:     ['Saying your point first','Disagreeing without softening it','Summarising the decision'],
  fastspeech:   ['A fast speaker, full speed','Catching numbers and names','Asking one good question'],
  customer:     ['Opening the call','A complaint you did not cause','Saying no, keeping the customer'],
  services:     ['Booking the appointment','Describing the problem','Asking what you usually skip'],
  smalltalk:    ['The first sentence','Keeping it going','Leaving politely'],
  family:       ['Asking the teacher directly','Explaining your child\u2019s situation','Speaking at a parent meeting'],
  exam:         ['Part 1, the warm-up questions','Part 2, the two-minute turn','Part 3, the follow-ups'],
  pronunciation:['The sounds you miss most','Your name and your job','A phone call, first time']
};
/* the JTBD as a section title */
const JTBD_TITLE = {
  interview:'Your next interview', pitch:'Defending your price', crew:'Running the daily brief',
  meetings:'Speaking up in meetings', fastspeech:'Keeping up with fast speakers', customer:'Customer calls',
  services:'Appointments and offices', smalltalk:'Starting conversations', family:'Talking to teachers',
  exam:'The speaking test', pronunciation:'The sounds that cost you'
};

/* what the social-proof line says people like them are practicing */
const FAM_PRACTISE = {
  interview:'practicing for interviews', pitch:'practicing their price conversations',
  crew:'practicing the daily brief', meetings:'practicing speaking up in meetings',
  fastspeech:'practicing keeping up with fast speakers', customer:'practicing customer calls',
  services:'practicing appointments and offices', smalltalk:'practicing starting conversations',
  family:'practicing talking to teachers', exam:'practicing for the speaking test',
  pronunciation:'practicing the sounds that cost them'
};

/* ---------- plan hero: the promise ----------
   Timeframe picks the lane (<=30 days -> JTBD, longer -> goal).
   minutes x days picks the tier, so a small commitment never makes a big claim. */
const HERO_JTBD = {
  interview:    { light:'stop freezing in interviews', std:'answer any interview question calmly', deep:'walk into any interview and speak freely' },
  pitch:        { light:'say your price out loud', std:'say your price without getting nervous', deep:'talk about money with any client' },
  crew:         { light:'be understood the first time you say it',  std:'say the plan once and have it land',          deep:'run the brief without repeating yourself' },
  meetings:     { light:'say one thing in every meeting', std:'speak up in meetings without planning it', deep:'lead the talking in your meetings' },
  fastspeech:   { light:'stop asking people to repeat', std:'understand fast speakers the first time', deep:'understand anyone, at any speed' },
  customer:     { light:'take a customer call without worrying', std:'handle any customer call calmly', deep:'handle any customer, even an angry one' },
  services:     { light:'book an appointment on your own', std:'handle the doctor and the bank on your own', deep:'walk into any office and sort things out' },
  smalltalk:    { light:'say the first sentence to someone new', std:'start a conversation with anyone', deep:'talk to new people without thinking about it' },
  family:       { light:'talk to the teacher without a script', std:'talk to the teacher with confidence', deep:'ask the teacher any question you want' },
  exam:         { light:'stop pausing in the speaking test', std:'answer every question in the speaking test', deep:'speak in the test like you do outside it' },
  pronunciation:{ light:'be asked to repeat less',                  std:'be understood the first time',                deep:'stop thinking about how you sound' }
};
const HERO_GOAL = {
  career:{ light:'English stops slowing you down at work', std:'English stops blocking your career', deep:'English is no longer a problem at work' },
  ielts: { light:'you stop guessing your band', std:'you know your band before the test', deep:'you get the band you need' },
  convo: { light:'everyday conversations get easier', std:'you talk to anyone without planning it', deep:'you speak without thinking in your language first' },
  travel:{ light:'you handle the basics on your own', std:'you travel and handle everything yourself', deep:'you travel without worrying about English' },
  school:{ light:'you speak up in class more often', std:'you speak in class without practising first', deep:'English stops lowering your marks' },
  other: { light:'English gets easier every week', std:'English stops getting in your way', deep:'you use English without thinking about it' }
};
/* what the long-lane subline says we start with */
const HERO_START = {
  interview:'your next interview', pitch:'defending your price', crew:'running the daily brief',
  meetings:'speaking up in meetings', fastspeech:'keeping up with fast speakers', customer:'customer calls',
  services:'appointments and offices', smalltalk:'starting conversations', family:'talking to teachers',
  exam:'the speaking test', pronunciation:'the sounds that cost you'
};
/* section B: exactly what they will be able to do at the end of their timeframe */
const OUTBULLETS = {
  interview:    ['Answer "tell me about yourself" without freezing','Explain a gap or a change calmly','Ask the interviewer your own questions','Hold your answer when they push back'],
  pitch:        ['Say your price without softening it','Explain what is included in one breath','Answer "that is too expensive" calmly','Chase a late payment without apologising'],
  crew:         ['Give the day’s plan in one pass','Flag a safety issue fast and clearly','Understand instructions the first time','Push back when the timeline is wrong'],
  meetings:     ['Say your point while it is still relevant','Interrupt politely and be heard','Disagree without softening it away','Summarise the decision out loud'],
  fastspeech:   ['Follow a fast speaker without stopping them','Catch numbers, dates and names first time','Ask one clarifying question, not three','Keep up on a group call'],
  customer:     ['Open a call without a script','Explain a problem you did not cause','Say no and keep the customer','Handle a complaint without freezing'],
  services:     ['Book an appointment on the phone','Describe a problem clearly, first time','Ask the question you usually skip','Push back when the answer is wrong'],
  smalltalk:    ['Start with a stranger instead of waiting','Keep it going past two exchanges','Tell a short story about yourself','Leave a conversation politely'],
  family:       ['Ask the teacher a direct question','Explain your child’s situation clearly','Understand the form and fill it in','Speak up at a parent meeting'],
  exam:         ['Speak for two minutes without stopping','Answer the follow-up you did not expect','Use the words the examiner rewards','Keep going when you lose the thread'],
  pronunciation:['Be understood on the first try','Say your own name and job clearly','Fix the sounds that cost you most','Stop repeating yourself on the phone']
};
/* ---------- goal x family overrides for the plan ----------
   Nine JTBD families are reachable from more than one goal, so family alone is not
   enough: exam under school is a classroom oral, not IELTS Part 2; services under
   travel is a hotel desk, not a doctor. Only the pairs that genuinely differ live
   here. Anything absent falls back to the family map, which is written for the goal
   that owns the family most (career for interview/pitch/meetings/customer/fastspeech,
   convo for services/smalltalk/family, ielts for exam). */
const PLAN_GF = {
  'ielts|exam':{
    title:'Simple Speaking mock test', practise:'practicing full mock tests',
    week:['Part 1, the warm-up questions','Part 2, the two-minute turn','Part 3, the follow-ups'],
    out:['Speak for two minutes without stopping','Answer the follow-up you did not expect','Use the words the examiner rewards','Keep going when you lose the thread'],
    hero:{light:'stop pausing in the speaking test',std:'answer every question in the speaking test',deep:'speak in the test like you do outside it'}},

  'school|exam':{
    title:'Your speaking exam', practise:'practicing for their speaking exam',
    week:['The questions you know are coming','Explaining your answer, not just saying it','A question you did not prepare'],
    out:['Answer in full sentences, not one word','Explain your reason so it counts','Handle a question you did not prepare','Finish your turn without drying up'],
    hero:{ light:'stop going blank in your oral exam', std:'answer every question in your oral exam', deep:'speak in the exam like you do outside it' }},

  'ielts|fastspeech':{
    title:'Fast audio in the test', practise:'practicing fast listening for the test',
    week:['Native speed, with no slowing down','Catching numbers, dates and names','Hearing the answer change mid sentence'],
    out:['Follow native speed without falling behind','Catch numbers, dates and names first time','Hear the answer change mid sentence','Stay with a long talk to the end'],
    hero:{ light:'understand more of the listening test', std:'follow the audio at full speed', deep:'understand the audio the first time' }},

  'school|fastspeech':{
    title:'Keeping up in lectures', practise:'practicing keeping up in lectures',
    week:['A lecturer at full speed','Catching the terms that matter','Asking one question after class'],
    out:['Follow a lecture without falling behind','Catch the key terms and write them down','Ask the lecturer one clear question','Keep up when the class discusses it'],
    hero:{ light:'follow more of every lecture', std:'follow a lecture at full speed', deep:'understand lectures without extra effort' }},

  'other|fastspeech':{
    title:'Understanding native speakers', practise:'practicing with fast native speakers',
    week:['A native speaker at full speed','Catching what actually matters','Asking them to repeat it, once'],
    out:['Follow a native speaker without stopping them','Catch the part that actually matters','Ask once instead of nodding along','Keep up when everyone talks at once'],
    hero:{ light:'stop pretending you understood', std:'understand native speakers the first time', deep:'understand anyone, at any speed' }},

  'other|interview':{
    title:'Being ready when it matters', practise:'practicing for the moments that matter',
    week:['Saying who you are in three lines','Why you, in one answer','The question you hope they skip'],
    out:['Introduce yourself without rehearsing it','Say what you are good at without shrinking','Answer the question you hoped they would skip','Sound like yourself when it matters'],
    hero:{ light:'introduce yourself without freezing', std:'be ready when the chance comes', deep:'speak well whenever it matters' }},

  'school|meetings':{
    title:'Speaking up in class', practise:'practicing speaking up in class',
    week:['Saying your idea first','Disagreeing with a classmate','Building on what someone said'],
    out:['Say your idea while it is still the topic','Disagree with a classmate politely','Build on what someone else said','Answer when the teacher looks at you'],
    hero:{ light:'say one thing in class', std:'speak up in class without practising first', deep:'start the discussion in class' }},

  'travel|services':{
    title:'Airports, hotels and mix-ups', practise:'practicing airports and hotels',
    week:['Checking in and asking for what you need','Something is wrong with the room','A connection you just missed'],
    out:['Check in and ask for what you need','Say what is wrong with the room','Sort out a missed flight at the desk','Ask for help when the plan changes'],
    hero:{ light:'ask for what you need at the hotel', std:'sort out any problem on your own', deep:'travel without worrying about English' }},

  'career|smalltalk':{
    title:'Small talk at work', practise:'practicing small talk at work',
    week:['The first two minutes of the day','Lunch with people you barely know','Introducing yourself at an event'],
    out:['Join the conversation before work starts','Talk to people you barely know at lunch','Introduce yourself at a work event','Leave a conversation without it going flat'],
    hero:{ light:'say more than good morning', std:'join the conversation at work', deep:'talk easily with anyone at work' }},

  'travel|smalltalk':{
    title:'Meeting people as you travel', practise:'practicing meeting people abroad',
    week:['The first line with a stranger','Where you are from, made interesting','Making a plan with someone new'],
    out:['Start with a stranger in a hostel or a cafe','Say where you are from without a script','Make a plan with someone you just met','Leave the conversation on good terms'],
    hero:{ light:'say the first line to a stranger', std:'make friends while you travel', deep:'talk to anyone you meet abroad' }},

  'school|smalltalk':{
    title:'Making friends on campus', practise:'practicing making friends on campus',
    week:['The first line before class','Joining a group that is already talking','Making a plan for later'],
    out:['Start a conversation before class','Join a group that is already talking','Ask someone to study or eat together','Keep it going the second time you meet'],
    hero:{ light:'say the first line on campus', std:'start conversations on campus', deep:'make friends easily at school' }},

  'other|smalltalk':{
    title:'Speaking without overthinking', practise:'practicing speaking without overthinking',
    week:['Saying it before you translate it','Keeping it going past two lines','Letting a small mistake pass'],
    out:['Say it before you translate it in your head','Keep a conversation going past two lines','Let a small mistake pass and carry on','Start instead of waiting to be spoken to'],
    hero:{ light:'say it without planning it first', std:'speak without practising in your head', deep:'stop translating before you speak' }}
};

/* the cohort in the social-proof line. Occupation only means something under career;
   every other goal describes the person better than their job does. */
const GOALWHO = {
  ielts:'IELTS candidates', travel:'travellers', school:'students',
  convo:'everyday learners', other:'learners'
};


/* ---------- the first-practice report ----------
   Four skills, each with a line for the band it lands in. The skill they told us they
   care about is scored lowest on purpose: it is the reason the plan exists. */
const SCORE_BASE = { fluency:64, vocabulary:58, pronunciation:61, grammar:71 };
const SCORE_MSG = {
  fluency:{
    weak:'Long pauses broke your answer up.',
    mid:'You paused a few times mid-sentence.',
    strong:'You kept going without stopping.'},
  vocabulary:{
    weak:'You reached for the same few words.',
    mid:'Your words worked, but they repeated.',
    strong:'You reached for the right words.'},
  pronunciation:{
    weak:'Some words were hard to catch.',
    mid:'A few sounds landed soft.',
    strong:'You were easy to understand.'},
  grammar:{
    weak:'Tenses slipped more than once.',
    mid:'A couple of tense slips crept in.',
    strong:'Your sentences held together.'}
};
const SCORE_LABEL = { fluency:'Fluency', vocabulary:'Vocabulary',
  pronunciation:'Pronunciation', grammar:'Grammar' };


/* ---------- Spanish UI ----------
   Applied when the user answers "Si, en espanol" at q6. The pass in index.html
   walks the active screen's text nodes and swaps anything it finds here, so a
   missing entry degrades to English rather than breaking. Anything the learner
   is meant to practise in English is marked data-en in the markup and skipped.
   {name} is substituted back after lookup. */

/* the plan title's claim, per goal and tier. Assembled in JS, so it cannot go
   through the DOM pass. Keyed the same as HERO_GOAL. */
const ES_GOAL = {
  career:{ light:'el inglés deja de frenarte en el trabajo', std:'el inglés deja de bloquear tu carrera', deep:'el inglés ya no es un problema en el trabajo' },
  ielts: { light:'dejas de adivinar tu banda', std:'sabes tu banda antes del examen', deep:'consigues la banda que necesitas' },
  convo: { light:'las conversaciones del día a día se vuelven más fáciles', std:'hablas con cualquiera sin planearlo', deep:'hablas sin pensar primero en tu idioma' },
  travel:{ light:'te manejas solo con lo básico', std:'viajas y resuelves todo por tu cuenta', deep:'viajas sin preocuparte por el inglés' },
  school:{ light:'participas más en clase', std:'hablas en clase sin ensayarlo antes', deep:'el inglés deja de bajarte las notas' },
  other: { light:'el inglés se te hace más fácil cada semana', std:'el inglés deja de estorbarte', deep:'usas el inglés sin pensarlo' }
};
/* the timeframe phrase and the month names the plan prints */
const ES_WHEN = { '2 weeks':'2 semanas', '1 month':'1 mes', '3 months':'3 meses',
  '6 months':'6 meses', '1 year':'1 año' };
const ES_MONTH = { January:'enero', February:'febrero', March:'marzo', April:'abril',
  May:'mayo', June:'junio', July:'julio', August:'agosto', September:'septiembre',
  October:'octubre', November:'noviembre', December:'diciembre' };

const ES = {
  'A tiny nudge for your {n} minutes a day. No spam, ever.':'Un pequeño recordatorio para tus {n} minutos al día. Sin spam, nunca.',
  'Can’t find words? Try this':'¿No encuentras las palabras? Prueba esto',
  'Tap the mic and read':'Toca el micro y lee',
  'A note from future {name}':'Una nota del {name} del futuro',
  'I, {name}, will practice {n} minutes a day.':'Yo, {name}, practicaré {n} minutos al día.',
  '{name}, {n} weeks from now':'{name}, dentro de {n} semanas',
  '{name}, {n} week from now':'{name}, dentro de {n} semana',
  'That was a real rep of':'Eso fue una práctica real de',
  '. Imagine week three.':'. Imagina la semana tres.',
  'Everything’s ready,':'Todo está listo,',
  'Unlock {name}’s plan':'Desbloquea el plan de {name}',
  'Wait, {name}…':'Espera, {name}…',
  'Your plan stays saved. This price does not.':'Tu plan se guarda. Este precio no.',
  'Unlimited speaking practice with Sarah':'Práctica de conversación ilimitada con Sarah',
  'Progress you can see, week by week':'Progreso que se ve, semana a semana',
  'Analyzing your speech sample':'Analizando tu muestra de voz',
  /* buttons and chrome */
  'Continue':'Continuar', 'Next':'Siguiente', 'Skip for now':'Omitir por ahora',
  'Build my plan':'Crear mi plan', 'Commit to my plan':'Comprometerme con mi plan',
  'Not now':'Ahora no', 'Allow':'Permitir', "Don't Allow":'No permitir',
  'See report':'Ver informe', 'View the research':'Ver el estudio',
  'Answer in your own words':'Responde con tus propias palabras',
  'Pause':'Pausa', 'Restart':'Reiniciar',

  /* qphone */
  '{name}, can you share your phone number?':'{name}, ¿nos compartes tu número de teléfono?',
  'Can you share your phone number?':'¿Nos compartes tu número de teléfono?',
  'We will share your weekly progress reports, nothing else. No spam, for sure!':
    'Te enviaremos tu informe semanal de progreso, nada más. Sin spam, de verdad.',
  'Works great with WhatsApp':'Funciona muy bien con WhatsApp',
  'Phone number':'Número de teléfono',

  /* qocc */
  '{name}, what best describes your current situation?':'{name}, ¿qué describe mejor tu situación actual?',
  'What best describes your current situation?':'¿Qué describe mejor tu situación actual?',
  "We'll build your practice around the conversations your day actually has.":
    'Crearemos tu práctica en torno a las conversaciones que de verdad tienes.',
  'Student':'Estudiante', 'Working professional':'Profesional', 'Freelancer':'Freelance',
  'Business owner':'Dueño de un negocio', 'Homemaker':'En casa a tiempo completo',
  'On a career break':'En pausa profesional', 'Looking for work':'Buscando trabajo',
  'Something else':'Otra cosa',

  /* qgoal */
  '{name}, what are you learning English for?':'{name}, ¿para qué estás aprendiendo inglés?',
  'What are you learning English for?':'¿Para qué estás aprendiendo inglés?',
  "We'll build your whole plan around this.":'Construiremos todo tu plan a partir de esto.',
  'Improve my career':'Mejorar mi carrera', 'Improve social conversations':'Conversar mejor con la gente',
  'Travel':'Viajar', 'Excel at my school':'Destacar en mis estudios', 'Any other goal':'Otro objetivo',

  /* IELTS sub-flow */
  'Which IELTS test are you taking?':'¿Qué examen IELTS vas a presentar?',
  'Academic':'Academic', 'General Training':'General Training',
  'Your admission is a speaking score away.':'Tu admisión está a un puntaje de speaking de distancia.',
  'When is your exam?':'¿Cuándo es tu examen?',
  'What band are you aiming for?':'¿Qué banda quieres alcanzar?',
  'Your plan will aim exactly there.':'Tu plan apuntará exactamente ahí.',
  'Good enough to qualify':'Suficiente para calificar',
  'Most university programs':'La mayoría de programas universitarios',
  'Competitive programs & visas':'Programas competitivos y visas',
  'Top schools and licensing':'Las mejores universidades y licencias',
  'Not sure yet':'Aún no lo sé',
  "Haven't booked yet":'Todavía no lo he reservado',

  /* qjtbd */
  '{name}, which conversation do you most want to nail?':'{name}, ¿qué conversación quieres dominar primero?',
  'Which conversation do you most want to nail?':'¿Qué conversación quieres dominar primero?',

  /* ctxba */
  'Before':'Antes', 'After':'Después',

  /* qskill */
  'What should we sharpen first?':'¿Qué reforzamos primero?',
  'Fluency':'Fluidez', 'Pronunciation':'Pronunciación', 'Vocabulary':'Vocabulario', 'Grammar':'Gramática',

  /* qlevel */
  '{name}, how would you describe your current level?':'{name}, ¿cómo describirías tu nivel actual?',
  'How would you describe your current level?':'¿Cómo describirías tu nivel actual?',
  'I’m completely new to English':'Soy totalmente nuevo en inglés',
  'I can take part in basic chats':'Puedo participar en conversaciones básicas',
  'I can handle short chats on familiar topics':'Puedo mantener charlas cortas sobre temas conocidos',
  'I can talk about everyday topics in detail':'Puedo hablar en detalle de temas cotidianos',
  'I can talk fluently with native speakers':'Puedo hablar con fluidez con nativos',
  'I can communicate like a native speaker':'Puedo comunicarme como un hablante nativo',

  /* level names, used on the graphs too */
  'Novice':'Principiante', 'Beginner':'Básico', 'Intermediate':'Intermedio',
  'Advanced':'Avanzado', 'Proficient':'Competente', 'Native':'Nativo',
  'Conversational level':'Nivel conversacional', 'Now':'Ahora', 'With Stimuler':'Con Stimuler',
  'Level':'Nivel', 'Time':'Tiempo',

  /* ctxsci */
  'Most people place themselves a level low. Two levels up is very doable.':
    'Casi todos se ubican un nivel por debajo. Subir dos niveles es muy alcanzable.',

  /* qtime */
  'How soon do you want to see progress?':'¿Qué tan pronto quieres ver resultados?',
  'Within 2 weeks':'En 2 semanas', 'Within a month':'En un mes', 'In 2–3 months':'En 2 o 3 meses',
  'In 3 months':'En 3 meses', 'In 6 months':'En 6 meses', 'Within a year':'En un año',

  /* qdaily */
  '{name}, how much will you practice daily?':'{name}, ¿cuánto vas a practicar cada día?',
  'How much will you practice daily?':'¿Cuánto vas a practicar cada día?',
  'Today':'Hoy',

  /* qnotif */
  'Practice sticks when Sarah reminds you.':'La práctica funciona cuando Sarah te lo recuerda.',
  '"Stimuler" Would Like to Send You Notifications':'"Stimuler" quiere enviarte notificaciones',
  'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.':
    'Las notificaciones pueden incluir alertas, sonidos y globos. Puedes configurarlas en Ajustes.',

  /* qsummary */
  "Everything's ready,":'Todo está listo,',
  'Your plan is built from':'Tu plan se construye a partir de',
  'One short practice':'Una práctica corta',
  'level':'nivel', 'focus':'enfoque',

  /* practice chrome */
  'Your first practice':'Tu primera práctica',
  'your speaking coach':'tu coach de conversación',
  'listening…':'escuchando…',
  'How to answer':'Cómo responder',
  'A simple 4-part answer.':'Una respuesta simple en 4 partes.',

  /* hintscore */
  'Your':'Tu', 'speech':'inglés hablado',

  /* score */
  'Your first score':'Tu primer puntaje',
  'Your first mock score':'Tu primer puntaje de simulacro',
  'Overall score':'Puntaje general',
  'Your starting point, before any practice.':'Tu punto de partida, antes de practicar.',
  'You reached for the same few words.':'Repetiste las mismas pocas palabras.',
  'Your words worked, but they repeated.':'Tus palabras funcionaron, pero se repitieron.',
  'You reached for the right words.':'Elegiste las palabras correctas.',
  'Tenses slipped more than once.':'Se te escaparon varios tiempos verbales.',
  'A couple of tense slips crept in.':'Se colaron un par de errores de tiempo verbal.',
  'Your sentences held together.':'Tus frases se sostuvieron bien.',
  'Some words were hard to catch.':'Algunas palabras costaron entenderse.',
  'A few sounds landed soft.':'Algunos sonidos quedaron débiles.',
  'You were easy to understand.':'Se te entendió con facilidad.',
  'Long pauses broke your answer up.':'Las pausas largas cortaron tu respuesta.',
  'You paused a few times mid-sentence.':'Hiciste algunas pausas a mitad de frase.',
  'You kept going without stopping.':'Seguiste hablando sin detenerte.',

  /* loader */
  'Personalizing your plan':'Personalizando tu plan',
  'Analyzing your speech sample':'Analizando tu muestra de voz',
  'Setting your 6 month target':'Fijando tu meta a 6 meses',

  /* plan */
  'Your personal plan is ready':'Tu plan personal está listo',
  'By then you will be able to':'Para entonces vas a poder',
  'What we start with':'Con esto empezamos',
  'By then you will have':'Para entonces habrás hecho',
  'real conversations':'conversaciones reales', 'new words':'palabras nuevas',
  'sounds mastered':'sonidos dominados', 'grammar fixes':'correcciones de gramática',
  'hours speaking out loud':'horas hablando en voz alta',
  "Here's why this plan suits you":'Por esto el plan encaja contigo',
  'Your focus':'Tu enfoque',

  /* letter */
  'Make it a promise.':'Conviértelo en una promesa.',
  'Press and hold to commit':'Mantén pulsado para comprometerte',
  'Keep holding':'Sigue pulsando',
  'Commitment made':'Compromiso hecho'
};

/* the graph's middle milestone, named rather than "Week 3" */
const MILESTONE = {
  interview:'you answer without a pause', pitch:'you say the number first', crew:'they stop asking twice',
  meetings:'you speak before it ends', fastspeech:'you stop asking twice', customer:'you take it unprepared',
  services:'you book it yourself', smalltalk:'you start it', family:'you ask directly',
  exam:'you fill the two minutes', pronunciation:'they get it first time'
};

const OUTCOME_MODE = {
  "career": {
    "ownboss": {
      "head": "Freelancers who pitch in fluent English<br><em>win better clients</em>.",
      "src": "Based on Stimuler learner data, 2025",
      "badge": [
        "Rates",
        "+40%"
      ],
      "end": "Better clients"
    },
    "jobhunt": {
      "head": "Candidates who speak fluently<br>get <em>called back more</em>.",
      "src": "Based on Stimuler learner data, 2025",
      "badge": [
        "Callbacks",
        "2×"
      ],
      "end": "Offer"
    },
    "athome": {
      "head": "Going back to work is easier when<br><em>English is not the barrier</em>.",
      "src": "Based on Stimuler learner data, 2025",
      "badge": [
        "Confidence",
        "3×"
      ],
      "end": "Back at work"
    },
    "careerbreak": {
      "head": "A career break is not a gap when<br>you can <em>explain it clearly</em>.",
      "src": "Based on Stimuler learner data, 2025",
      "badge": [
        "Callbacks",
        "2×"
      ],
      "end": "Back in"
    }
  }
};

/* ---------- outcome beat after the goal (goal headline + occupation proof) ----------
   Only the career/job claim carries an external citation (Azam et al. is a real study on
   English proficiency and wages). Everything else is labelled as our own learner data —
   placeholder numbers, not invented academic sources. */
const OUTCOME = {
  career: { head: 'Professionals with fluent English earn up to <em>34% more</em>.',
            src: 'Based on Azam et al. (University of Chicago Press), 2013',
            badge: ['Salary', '+34%'], end:'Promotion' },
  ielts:  { head: 'Speaking is where most<br>IELTS candidates <em>lose the band</em>.',
            src: 'Based on Stimuler learner data, 2025',
            badge: ['Band', '+1.0'], end:'Band 7+' },
  convo:  { head: 'Confident speakers have<br><em>3× more</em> daily conversations.',
            src: 'Based on Stimuler learner data, 2025',
            badge: ['Confidence', '3\u00D7'], end:'Easy talk' },
  travel: { head: 'Travellers who speak up get<br><em>better help, faster</em>.',
            src: 'Based on Stimuler learner data, 2025',
            badge: ['Ease', '+68%'], end:'Anywhere' },
  school: { head: 'Students who speak in class<br>score <em>higher in orals</em>.',
            src: 'Based on Stimuler learner data, 2025',
            badge: ['Grades', '+22%'], end:'Top marks' },
  other:  { head: 'Fluent English opens doors<br>you have not <em>knocked on yet</em>.',
            src: 'Based on Stimuler learner data, 2025',
            badge: ['Fluency', '4\u00D7'], end:'Fluent' }
};

/* ---------- progress beat: headline per JTBD family, proof line per family x occupation ---------- */
const FAMHEADS = {
  interview:     'Next interview,<br><em>you lead the room.</em>',
  meetings:      'Next meeting,<br><em>your voice is in it.</em>',
  fastspeech:    'Fast speakers,<br><em>and you keep up.</em>',
  customer:      'Every customer call,<br><em>calm and clear.</em>',
  services:      'Doctor, DMV, bank,<br><em>done on your own.</em>',
  smalltalk:     'Neighbors and cafes,<br><em>words come easy.</em>',
  family:        'Teachers and school forms,<br><em>you handle it all.</em>',
  exam:          'Exam day comes,<br><em>and you are ready.</em>',
  pitch:         'Name your price,<br><em>and hold it.</em>',
  crew:          'Say the plan once,<br><em>and it lands.</em>',
  pronunciation: 'Say it once,<br><em>understood at once.</em>'
};
const OCCWHO = {
  "careerbreak": "people returning to work",
  "office": "office professionals",
  "business": "business owners",
  "freelancer": "freelancers",
  "jobseek": "job seekers",
  "student": "students",
  "home": "parents",
  "other": "learners"
};
const FAMSTATS = {
  interview:     '<b>87% of {who}</b> on Stimuler feel interview-ready within 6 weeks of daily practice.',
  meetings:      '<b>4 in 5 {who}</b> on Stimuler speak up in meetings within a month.',
  fastspeech:    '<b>82% of {who}</b> on Stimuler follow fast native speakers within 5 weeks.',
  customer:      '<b>85% of {who}</b> on Stimuler handle customer conversations confidently within a month.',
  services:      '<b>4 in 5 {who}</b> on Stimuler handle appointments and offices solo within a month.',
  smalltalk:     '<b>86% of {who}</b> on Stimuler start conversations first within a month.',
  family:        '<b>9 in 10 {who}</b> on Stimuler help their kids in English within 6 weeks.',
  exam:          '<b>Most {who}</b> on Stimuler jump a full band after 8 weeks of daily practice.',
  pitch:         '<b>84% of {who}</b> on Stimuler quote their price without hesitating within a month.',
  crew:          '<b>4 in 5 {who}</b> on Stimuler are understood first time on site within a month.',
  pronunciation: '<b>9 in 10 {who}</b> on Stimuler hear "say that again" far less within a month.'
};



/* ---------- the 8 families ---------- */
/* each: before/after chat script · testimonial · activation recipe */
const FAMILIES = {
  interview: {
    label: 'high-stakes questions',
    before: [ ['them','So, why should we hire you?'], ['me','…'], ['me','Sorry, can you repeat the question?'] ],
    after:  [ ['them','So, why should we hire you?'], ['me','I stay calm under pressure, and my team trusts me. Let me give you an example.'], ['them','Great answer.'] ],
    testi:  { quote: 'Pasé mi entrevista en inglés. They called back the next day.', name: 'Ana M.', city: 'Dallas' },
    act: {
      question: 'You’re interviewing for a role in {industry}. Introduce yourself.',
      hint: 'I have __ years of experience in __. I’m good at __. I want this role because __.',
      model: 'I’m a {industry} worker with three years of experience. My strength is staying calm under pressure. I want this role because I’m ready to grow.'
    }
  },
  pitch: {
    label: 'winning the work',
    before: [ ['them','So what would this cost me?'], ['me','…'], ['me','It depends… I can send you an email later?'] ],
    after:  [ ['them','So what would this cost me?'], ['me','My rate is fixed, and here is exactly what you get for it.'], ['them','That sounds fair. Let us start.'] ],
    testi:  { quote: 'I stopped undercharging the moment I could explain my value.', name: 'Andrea C.', city: 'Austin' },
    act: {
      question: 'A client asks what you charge for {industry} work. Answer them.',
      hint: 'My rate is __. That covers __. Most clients choose it because __.',
      model: 'My rate is fixed for this scope. It covers the work and two rounds of changes. Clients choose it because they know the cost up front.'
    }
  },
  crew: {
    label: 'instructions that land',
    before: [ ['them','Walk me through the plan for today.'], ['me','…'], ['me','First we… do the thing… with the…'] ],
    after:  [ ['them','Walk me through the plan for today.'], ['me','Crew starts on the east wall. Inspection clears by noon.'], ['them','Good. Go ahead.'] ],
    testi:  { quote: 'The foreman hears me right the first time now.', name: 'Jozef P.', city: 'Newark' },
    act: {
      question: 'Your supervisor asks for today’s plan on a {industry} shift. Give it.',
      hint: 'First we __. Then __. It should be done by __.',
      model: 'First we finish the east side. Then we move the material inside. It should be done by noon.'
    }
  },
  meetings: {
    label: 'speaking up in a group',
    before: [ ['them','Any thoughts on this?'], ['me','…'], ['me','No, all good.'] ],
    after:  [ ['them','Any thoughts on this?'], ['me','Yes, one idea. If we change the schedule, we save two hours.'], ['them','Good point, let’s try it.'] ],
    testi:  { quote: 'I stopped freezing in meetings. My boss noticed in two weeks.', name: 'María R.', city: 'Houston' },
    act: {
      question: 'Your team asks for a quick update on your work in {industry}. Give it.',
      hint: 'This week I worked on __. It went __. Next, I will __.',
      model: 'This week I finished my main task early. Everything went well. Next, I will help the team with the new schedule.'
    }
  },
  fastspeech: {
    label: 'understanding fast speakers',
    before: [ ['them','Sowe’regonnamovethemeetingupcanyoucover?'], ['me','…'], ['me','*nods and hopes*'] ],
    after:  [ ['them','So we’re gonna move the meeting up, can you cover?'], ['me','Sure. Just to confirm, you mean the 3pm one?'], ['them','Exactly.'] ],
    testi:  { quote: 'Ya no pido que repitan. I catch it the first time now.', name: 'Luis F.', city: 'Phoenix' },
    act: {
      question: 'Someone in {industry} just spoke too fast. Ask them to confirm what they said, politely.',
      hint: 'Just to confirm, you mean __? So first I should __, right?',
      model: 'Just to confirm, you mean the afternoon meeting? So first I should finish this order, right? Thanks for checking.'
    }
  },
  customer: {
    label: 'customer conversations',
    before: [ ['them','Hi, how long will it take?'], ['me','…'], ['me','Yes. Okay. Yes.'] ],
    after:  [ ['them','Hi, how long will it take?'], ['me','About ten minutes. Can I get you anything while you wait?'], ['them','That’d be great!'] ],
    testi:  { quote: 'Mis propinas subieron. Customers actually chat with me now.', name: 'Diego A.', city: 'Miami' },
    act: {
      question: 'A customer in {industry} asks how long it will take. Respond and offer help.',
      hint: 'It will take about __. Meanwhile, can I __? Thank you for __.',
      model: 'It will take about ten minutes. Meanwhile, can I get you some water? Thank you for waiting.'
    }
  },
  services: {
    label: 'appointments & offices',
    before: [ ['them','Reason for your visit?'], ['me','…'], ['me','*shows phone with translation*'] ],
    after:  [ ['them','Reason for your visit?'], ['me','I’ve had a headache for three days. It gets worse at night.'], ['them','Got it, let’s take a look.'] ],
    testi:  { quote: 'Fui al doctor sola por primera vez. Sin traductor.', name: 'Carmen L.', city: 'Chicago' },
    act: {
      question: 'You’re at an appointment. Explain your situation and what you need.',
      hint: 'I’m here because __. It started __. I need __.',
      model: 'I’m here because I need to renew my documents. It started last month. I need to know which forms to fill out.'
    }
  },
  smalltalk: {
    label: 'everyday conversation',
    before: [ ['them','Crazy weather today, right?'], ['me','…'], ['me','*smiles and walks away*'] ],
    after:  [ ['them','Crazy weather today, right?'], ['me','Seriously! And they say it gets worse this weekend. Any plans?'], ['them','Ha, staying inside!'] ],
    testi:  { quote: 'Hice mi primera amiga americana en el gym. Just by talking.', name: 'Sofía P.', city: 'Austin' },
    act: {
      question: 'Someone friendly asks about your weekend. Keep the conversation going.',
      hint: 'This weekend I __. It was __. What about you, did you __?',
      model: 'This weekend I visited my cousin and we cooked together. It was really fun. What about you, did you do anything special?'
    }
  },
  exam: {
    label: 'speaking exams',
    before: [ ['them','Describe a place you love. You have one minute.'], ['me','…'], ['me','I like… place. Is good.'] ],
    after:  [ ['them','Describe a place you love. You have one minute.'], ['me','My grandmother’s kitchen. It smells like coffee, and everyone talks at once.'], ['them','Excellent detail.'] ],
    testi:  { quote: 'Subí una banda entera en speaking. My examiner smiled.', name: 'Valeria T.', city: 'New York' },
    act: {
      question: 'Exam question: describe a place that matters to you, in one minute.',
      hint: 'The place is __. I go there when __. It matters because __.',
      model: 'The place is my grandmother’s kitchen. I go there when I need to feel at home. It matters because my whole family gathers there.'
    }
  },
  family: {
    label: 'family moments',
    before: [ ['them','Mom, what does this homework say?'], ['me','…'], ['me','Ask your teacher tomorrow.'] ],
    after:  [ ['them','Mom, what does this homework say?'], ['me','It says to describe your favorite animal in three sentences. Let’s do it together.'], ['them','You’re the best!'] ],
    testi:  { quote: 'Ahora leo con mis hijos en inglés every night.', name: 'Rosa M.', city: 'Los Angeles' },
    act: {
      question: 'Your child asks for help with English homework. Explain it simply.',
      hint: 'This homework asks you to __. First, __. Then, __.',
      model: 'This homework asks you to describe your favorite animal. First, choose the animal. Then, write three simple sentences about it.'
    }
  }
};

/* ---------- skills → feature intro + feedback lens ---------- */
const SKILLS = {
  fluency:       { label: 'Fluency',       video: 'videos/conversation_c.mp4',
    intro: 'This is how you’ll train flow. Real conversations, zero judgment.',
    lens:  { headline: 'Your flow', points: ['Pauses mid-sentence', 'Filler words (um, este…)', 'Complete answers'] } },
  pronunciation: { label: 'Pronunciation', video: 'videos/Improve_c.mp4',
    intro: 'This is how you’ll be understood the first time. Word by word.',
    lens:  { headline: 'Your clarity', points: ['Words that were unclear', 'Sounds to sharpen', 'Stress & rhythm'] } },
  vocabulary:    { label: 'Vocabulary',    video: 'videos/Feedback_c.mp4',
    intro: 'This is how your words level up. Better ways to say what you mean.',
    lens:  { headline: 'Your words', points: ['Words you repeated', 'Stronger alternatives', 'New words to keep'] } },
  grammar:       { label: 'Grammar',       video: 'videos/grammar_c.mp4',
    intro: 'This is how your sentences get clean. Gentle fixes, as you speak.',
    lens:  { headline: 'Your structure', points: ['Sentence fixes', 'Tense slips', 'Patterns to practice'] } }
};

/* ---------- IELTS goal override ---------- */
/* the ONE documented exception to one-driver-per-screen:
   goal=ielts bends the flow toward the exam date.
   Overrides the stat beat + the expectation question, adds the band question. */
const IELTS = {
  stat: {
    head: 'Speaking is where IELTS points are lost.',
    line: 'Speaking is the lowest-scoring IELTS section worldwide. It is also the fastest to improve with daily practice.',
    bars: [55, 90],
    labels: ['Average speaking band · 5.9', 'With daily practice · 7.0+']
  },
  whyQ: {
    head: 'Which IELTS test are you taking?',
    opts: [
      { val: 'academic', label: 'Academic' },
      { val: 'general',  label: 'General Training' }
    ]
  },
  reasons: {
    academic: {
      ack: {
        head: 'Your admission is a speaking score away.',
        sub: 'Academic candidates use Stimuler to jump a full band in the weeks before the test.',
        testis: [
          { quote: 'From 6.0 to 7.0 in five weeks. My Master’s in Toronto is happening.', name: 'Priya K.', city: 'Hyderabad' },
          { quote: 'Speaking was my lowest band. Now it’s my highest.', name: 'Ana G.', city: 'Bogotá' },
          { quote: 'The examiner asked follow-ups. For the first time, I had answers.', name: 'Chen W.', city: 'Hanoi' }
        ]
      }
    },
    general: {
      ack: {
        head: 'Your career abroad starts out loud.',
        sub: 'General Training candidates hit their work and visa band with daily speaking practice.',
        testis: [
          { quote: 'Band 7 for my NHS nursing registration. Done.', name: 'Blessing O.', city: 'Lagos' },
          { quote: 'My work visa needed 7.0 in speaking. I got 7.5.', name: 'Arjun M.', city: 'Kochi' },
          { quote: 'Interviews in English stopped scaring me long before the exam did.', name: 'Carlos R.', city: 'Lima' }
        ]
      }
    }
  },
  examQ: {
    head: 'When is your exam?',
    opts: [
      { val: 'week',     label: 'Within 2 weeks' },
      { val: 'month',    label: 'Within a month' },
      { val: 'halfyear', label: 'In 2–3 months' },
      { val: 'year',     label: 'Haven’t booked yet' }
    ]
  },
  examWeeks: { week: 2, month: 4, halfyear: 10 },   /* year = not booked */
  ba: {
    head: 'Let’s change what the examiner hears.',
    beforeTag: 'Today · reads like Band 5.5',
    afterTag: 'After Stimuler · Band 7.0+'
  },
  skillQ: {
    head: 'Where do you lose points today?',
    sub: 'These are the four things the examiner scores.',
    labels: {
      fluency: 'Fluency & Coherence',
      pronunciation: 'Pronunciation',
      vocabulary: 'Lexical Resource (Vocabulary)',
      grammar: 'Grammatical Range & Accuracy'
    }
  },
  featHead: 'Scored like the real exam.',
  featIntro: {
    fluency: 'Sarah trains the pauses out. Long answers, no freezing, just like Part 2.',
    pronunciation: 'Sarah flags every sound the examiner would mark down. Word by word.',
    vocabulary: 'Sarah upgrades your words mid-answer. Lexical Resource is a coached skill.',
    grammar: 'Sarah scores your grammar on every answer, exactly like an examiner would.'
  },
  bands: ['6.0', '6.5', '7.0', '7.5+'],
  flag: b => (b && b !== 'na') ? `Band ${b}-ready` : 'Band-ready',
  planTitle: (name, b) => (b && b !== 'na') ? `${name}’s Path to Band ${b}` : `${name}’s IELTS Plan`,
  paceNote: (expKey, wks) => {
    const ew = IELTS.examWeeks[expKey];
    if (!ew) return `Not booked yet? You’ll walk in already ready.`;
    return wks <= ew
      ? `Your exam is in ~${ew} weeks. This pace makes you Band-ready in ~${wks}.`
      : `Your exam is in ~${ew} weeks. Go 30 minutes a day to be ready in time.`;
  }
};

/* ---------- levels (Praktika scale) → activation mode ---------- */
const LEVELS = [
  { id: 'A1', label: 'A1', desc: 'I’m completely new to English',            mode: 'read' },
  { id: 'A2', label: 'A2', desc: 'I can take part in basic chats',           mode: 'read' },
  { id: 'B1', label: 'B1', desc: 'I can handle short chats on familiar topics', mode: 'hint' },
  { id: 'B2', label: 'B2', desc: 'I can talk about everyday topics in detail',  mode: 'hint' },
  { id: 'C1', label: 'C1', desc: 'I can talk fluently with native speakers',    mode: 'impromptu' },
  { id: 'C2', label: 'C2', desc: 'I can communicate like a native speaker',     mode: 'impromptu' }
];


/* ---------- science beat (real, published findings) ---------- */
const SCIENCE = {
  headline: 'Proven in published research',
  stat: '4×',
  statLabel: 'faster speaking improvement than conventional classes',
  body: 'In a peer-reviewed study, learners using Stimuler improved speaking scores by 15.1 points in just 4 weeks. The conventional-teaching group improved 3.9.',
  source: 'Denistiani (2025), MATCHA Journal · DOI: 10.70152/matcha.v1i1.135',
  bars: { control: { v: 3.9, label: 'Regular classes' }, stimuler: { v: 15.1, label: 'With Stimuler' } }
};

/* ---------- commitment graph ---------- */
const COMMIT = {
  minutes: [5, 10, 15, 30, 40, 60],
  readyWeeks: { 5: 6, 10: 3, 15: 2, 30: 1, 40: 1, 60: 1 },   /* minutes/day → weeks to first milestone */
  flagByGoal: {
    ielts: 'Band-ready', career: 'Interview-ready', convo: 'Conversation-ready',
    travel: 'Travel-ready', school: 'Exam-ready', other: 'Speaking freely'
  }
};

/* ---------- plans (goal-keyed, blanks fill at runtime) ---------- */
/* ---------- future-me letters (goal-keyed) ---------- */
const LETTERS = {
  ielts:  'Band 7. I said the answers out loud in that exam room and I earned every point. The examiner asked follow-ups and I just answered.',
  career: 'I speak up now. In interviews, in meetings, I say what I actually think, in English, without rehearsing it in my head first. It started with a few minutes a day.',
  convo:  'The pharmacy, the school, the bank. I walk in and handle it myself now. Nobody translates for me anymore.',
  travel: 'I ordered, I asked, I joked with strangers in three different airports. The whole trip felt like mine.',
  school: 'I passed. Out loud, in full sentences, with time to spare. The examiner even smiled.',
  other:  'I talk to people. Just like that. The fear got a little smaller every single week, until one day it was gone.'
};

const PLANS = {
  ielts:      { title: '{name}’s IELTS Plan',      weeks: ['Structured answers that score', 'Fluency and coherence under time', 'Full mock speaking tests with Sarah'] },
  career:     { title: '{name}’s Career Plan',     weeks: ['Smooth phrasing under pressure', 'The questions you’ll actually get', 'Full mock conversations with Sarah'] },
  convo:      { title: '{name}’s Everyday Plan',   weeks: ['The phrases your day runs on', 'Real-time listening speed', 'Full real-life roleplays with Sarah'] },
  travel:     { title: '{name}’s Travel Plan',     weeks: ['The phrases every trip runs on', 'Listening at native speed', 'Full travel roleplays with Sarah'] },
  school:     { title: '{name}’s Exam Plan',       weeks: ['Structured answers that score', 'Speed and detail', 'Full mock exams with Sarah'] },
  other:      { title: '{name}’s Confidence Plan', weeks: ['Speaking without translating', 'Holding conversations longer', 'Real talks with Sarah, no script'] }
};
