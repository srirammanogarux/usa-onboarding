/* ============================================================================
   SPEAKING TASK CONTENT
   Everything the learner is asked to say, in one place. Edit this file and
   refresh; there is no build step.

   Three maps live here, and they depend on each other, which is why they are
   together rather than scattered:

     PRACTICE   the scenario, the question and the model answer, per cohort
     AFFIRM     what an A1 or A2 beginner reads instead, per goal
     PRONWORDS  the two words drilled afterwards, per cohort

   THE ONE RULE THAT MATTERS
   Every word in PRONWORDS must actually appear in that cohort's `parts`, and
   the same for AFFIRM's words against its `lines`. The pronunciation screen
   highlights those words inside the passage the learner just read, so a word
   that is not in the text highlights nothing and teaches something they never
   said. `node tools/export-docs.js` checks this and will tell you if it breaks.

   HOUSE STYLE FOR THIS FILE
     ctx     one or two lines, names the situation, hands off with "asks:"
             keep under ~100 characters or it wraps to a third line
     q       short and concrete, 4 to 8 words. The learner has to answer it.
     steps   four labels, 3 to 4 words each, plain verbs
     parts   four sentences, 5 to 9 words each, about 28 words total.
             No numbers that are awkward to say out loud, no idioms, no
             vocabulary above A2 where a simpler word exists.
   ========================================================================= */

const PRACTICE = {

  /* ---------- CAREER ---------- split by work mode, because a freelancer and
     a job seeker are not having the same conversation ---------------------- */

  'career|office': {
    who:   'Working professional',
    ctx:   'Your team is mid-discussion and your manager turns to you.',
    q:     'Can you give us a quick update?',
    steps: ['Say where it is', 'Give one detail', 'Say what is left', 'Say the next step'],
    parts: ['The work is going well.',
            'Three of the five screens are done.',
            'We are still waiting on the last two.',
            'I will finish them this week.']
  },

  'career|ownboss': {
    who:   'Freelancer or business owner',
    ctx:   'A client likes your work, and now they ask about money.',
    q:     'So what do you charge for this?',
    steps: ['Say the price', 'Say what is included', 'Give the reason', 'Hold your price'],
    parts: ['My price for this is two thousand.',
            'That covers the work and two changes.',
            'It takes me about three weeks.',
            'I think that is a fair price.']
  },

  'career|jobhunt': {
    who:   'Looking for a job',
    ctx:   'You are in the final interview for a job you want.',
    q:     'So, why should we hire you?',
    steps: ['Answer it directly', 'Give your reason', 'Give an example', 'Close it'],
    parts: ['I am a good fit for this position.',
            'I stay calm when things get busy.',
            'Last month I ran our busiest week.',
            'I know I can do the same here.']
  },

  'career|careerbreak': {
    who:   'On a career break',
    ctx:   'The interviewer stops at the gap on your CV.',
    q:     'What were you doing during this time?',
    steps: ['Name it plainly', 'Say what you did', 'Show you kept going', 'Bring it back'],
    parts: ['I took two years off for my family.',
            'I kept doing small projects in that time.',
            'I also finished a short course.',
            'I am ready to work full time now.']
  },

  'career|athome': {
    who:   'At home full time',
    ctx:   'You are applying for your first job in years.',
    q:     'You have not worked for a while. Why now?',
    steps: ['Answer it directly', 'Say what changed', 'Say what you bring', 'Say what you want'],
    parts: ['My youngest started school this year.',
            'So now I have time to work.',
            'I have run a home and a budget.',
            'I want to use those skills at work.']
  },

  'career|student': {
    who:   'Student',
    ctx:   'You are interviewing for your first internship.',
    q:     'You have no work experience. Why take you?',
    steps: ['Answer it directly', 'Give your reason', 'Give an example', 'Close it'],
    parts: ['I learn fast and I finish my work.',
            'I ran the events for our student group.',
            'We doubled the numbers in one year.',
            'I would bring the same energy here.']
  },

  'career|other': {
    who:   'Something else',
    ctx:   'You are interviewing for a job you want.',
    q:     'Tell me about yourself.',
    steps: ['Start with now', 'Say one strength', 'Give an example', 'Say what you want'],
    parts: ['Right now I work in customer support.',
            'I am good at staying calm with people.',
            'Last year I handled our busiest month.',
            'I want to do more of that.']
  },

  /* ---------- EVERY OTHER GOAL ---------- one scenario each --------------- */

  convo: {
    who:   'Improve social conversations',
    ctx:   'You meet an old friend at a cafe after a long time. They ask:',
    q:     'So what are you doing these days?',
    steps: ['Say what you do', 'Add one detail', 'Say what is new', 'Ask them back'],
    parts: ['I am still at the same company.',
            'I work with customers now, and I like it.',
            'I also started running in the mornings.',
            'What about you? What is new?']
  },

  travel: {
    who:   'Travel',
    ctx:   'There is no hot water in your hotel room. At the desk, they ask:',
    q:     'What is the problem?',
    steps: ['Say the problem', 'Say what you tried', 'Say what you need', 'Say thank you'],
    parts: ['There is no hot water in my room.',
            'I tried the shower and it stayed cold.',
            'Can someone come and fix it today?',
            'Thank you for your help.']
  },

  school: {
    who:   'Excel at school',
    ctx:   'Your class is debating phones in lessons. The teacher asks:',
    q:     'What do you think, and why?',
    steps: ['Say your view', 'Give your reason', 'Give an example', 'Close it'],
    parts: ['I think phones should stay in our bags.',
            'It is hard to listen with a screen on.',
            'Last week nobody finished our group work.',
            'So I would allow them at break.']
  },

  ielts: {
    who:   'IELTS',
    ctx:   'IELTS Speaking, Part 2. You have one minute to talk.',
    q:     'Describe a place you enjoy visiting.',
    steps: ['Name it', 'Say where it is', 'Give one detail', 'Say why you like it'],
    parts: ['There is a small beach near my home.',
            'It is about thirty minutes away.',
            'It is quiet and you can hear the water.',
            'I always leave feeling calm.']
  },

  other: {
    who:   'Any other goal',
    ctx:   'You are meeting someone new who could open a door for you. They ask:',
    q:     'Tell me a little about yourself.',
    steps: ['Start with now', 'Say one strength', 'Give an example', 'Say what you want'],
    parts: ['Right now I work and study English.',
            'I am good at sticking with things.',
            'I have practised every day this month.',
            'I want to use English without thinking.']
  }
};

/* ============================================================================
   WHAT A BEGINNER READS INSTEAD
   A1 and A2 do not answer an interview question. They read a short affirmation
   about themselves, personalised by goal. {name} is replaced at render time.
   ========================================================================= */

const AFFIRM = {
  career: { lines: ['My name is {name}.', 'I am learning English for my work.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['learning', 'practice'] },
  ielts:  { lines: ['My name is {name}.', 'I am learning English for my exam.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['exam', 'practice'] },
  convo:  { lines: ['My name is {name}.', 'I am learning English to talk with people.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['people', 'learning'] },
  travel: { lines: ['My name is {name}.', 'I am learning English to travel.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['travel', 'learning'] },
  school: { lines: ['My name is {name}.', 'I am learning English for school.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['English', 'practice'] },
  other:  { lines: ['My name is {name}.', 'I am learning English.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['learning', 'practice'] }
};

/* ============================================================================
   THE TWO DRILL WORDS
   Chosen from the text above, so the pronunciation screen can only ever teach a
   word the learner actually said.

     w      the word, exactly as it appears in the passage
     parts  three chunks that spell the word; the middle one is highlighted gold
     ph     how it sounds, in plain letters
     tip    one short line, quote the sound with curly quotes to bold it
     start  the score it opens on, before they practise
   ========================================================================= */

const WORD = {
  waiting:   { w:'waiting',   parts:['wai','t','ing'],   ph:'way.ting',      tip:'Two beats: way.ting',            start:52 },
  finish:    { w:'finish',    parts:['fi','ni','sh'],    ph:'fi.nish',       tip:'Ends soft on ‘sh’',              start:48 },
  thousand:  { w:'thousand',  parts:['thou','san','d'],  ph:'thow.zund',     tip:'The middle sound is a soft ‘z’', start:51 },
  covers:    { w:'covers',    parts:['co','ver','s'],    ph:'kuh.vurz',      tip:'Ends on a ‘z’, not an s',        start:47 },
  position:  { w:'position',  parts:['po','si','tion'],  ph:'puh.zi.shun',   tip:'The ‘tion’ sounds like shun',    start:50 },
  busiest:   { w:'busiest',   parts:['bu','si','est'],   ph:'bi.zee.est',    tip:'Three beats: bi.zee.est',        start:46 },
  family:    { w:'family',    parts:['fa','mi','ly'],    ph:'fam.uh.lee',    tip:'Three beats, not two',           start:49 },
  projects:  { w:'projects',  parts:['pro','jec','ts'],  ph:'pro.jekts',     tip:'Keep the ‘ts’ crisp',            start:52 },
  youngest:  { w:'youngest',  parts:['youn','ge','st'],  ph:'yung.gest',     tip:'Starts like ‘young’',            start:50 },
  budget:    { w:'budget',    parts:['bu','dge','t'],    ph:'buh.jit',       tip:'The ‘dge’ sounds like j',        start:47 },
  student:   { w:'student',   parts:['stu','den','t'],   ph:'stew.dnt',      tip:'Two beats: stew.dnt',            start:51 },
  energy:    { w:'energy',    parts:['e','ner','gy'],    ph:'en.ur.jee',     tip:'The ‘gy’ sounds like jee',       start:48 },
  customer:  { w:'customer',  parts:['cus','to','mer'],  ph:'kus.tuh.mur',   tip:'Stress the first beat ‘kus’',    start:53 },
  company:   { w:'company',   parts:['com','pa','ny'],   ph:'kum.puh.nee',   tip:'Stress the first beat ‘kum’',    start:52 },
  mornings:  { w:'mornings',  parts:['mor','ning','s'],  ph:'mor.ningz',     tip:'Ends on a ‘z’ sound',            start:49 },
  water:     { w:'water',     parts:['wa','te','r'],     ph:'waw.tur',       tip:'Two beats: waw.tur',             start:50 },
  shower:    { w:'shower',    parts:['sho','we','r'],    ph:'show.ur',       tip:'Two beats: show.ur',             start:47 },
  listen:    { w:'listen',    parts:['lis','te','n'],    ph:'li.sn',         tip:'The ‘t’ is silent',              start:51 },
  allow:     { w:'allow',     parts:['a','llo','w'],     ph:'uh.low',        tip:'Stress the second beat ‘low’',   start:48 },
  thirty:    { w:'thirty',    parts:['thir','t','y'],    ph:'thur.tee',      tip:'Soft ‘th’, tongue out',          start:46 },
  minutes:   { w:'minutes',   parts:['mi','nu','tes'],   ph:'mi.nits',       tip:'Two beats only: mi.nits',        start:49 },
  practised: { w:'practised', parts:['prac','ti','sed'], ph:'prak.tist',     tip:'The ending is ‘st’, not sed',    start:50 },
  English:   { w:'English',   parts:['Eng','li','sh'],   ph:'ing.glish',     tip:'It starts with ‘ing’',           start:47 },
  learning:  { w:'learning',  parts:['lear','n','ing'],  ph:'lur.ning',      tip:'The ‘ear’ sounds like ur',       start:48 },
  practice:  { w:'practice',  parts:['prac','ti','ce'],  ph:'prak.tis',      tip:'End short on ‘tis’',             start:52 },
  exam:      { w:'exam',      parts:['e','xa','m'],      ph:'ig.zam',        tip:'The ‘x’ sounds like gz',         start:50 },
  people:    { w:'people',    parts:['peo','p','le'],    ph:'pee.pul',       tip:'Two beats: pee.pul',             start:49 },
  travel:    { w:'travel',    parts:['tra','ve','l'],    ph:'tra.vul',       tip:'Two beats: tra.vul',             start:51 }
};

/* which two words each cohort drills. Both must appear in that cohort's parts. */
const PRONWORDS = {
  'career|office':     [WORD.waiting,  WORD.finish],
  'career|ownboss':    [WORD.thousand, WORD.covers],
  'career|jobhunt':    [WORD.position, WORD.busiest],
  'career|careerbreak':[WORD.family,   WORD.projects],
  'career|athome':     [WORD.youngest, WORD.budget],
  'career|student':    [WORD.student,  WORD.energy],
  'career|other':      [WORD.customer, WORD.busiest],
  convo:               [WORD.company,  WORD.mornings],
  travel:              [WORD.water,    WORD.shower],
  school:              [WORD.listen,   WORD.allow],
  ielts:               [WORD.thirty,   WORD.minutes],
  other:               [WORD.practised, WORD.English]
};

/* the beginner affirmations name their words by key; resolve them to the data */
Object.values(AFFIRM).forEach(a => { a.words = a.words.map(k => WORD[k]); });
