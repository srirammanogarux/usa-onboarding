/* ============================================================================
   SPEAKING TASK CONTENT
   Everything the learner is asked to say, in one place. Edit this file and
   refresh; there is no build step.

   Three maps live here, and they depend on each other, which is why they are
   together rather than scattered:

     PRACTICE   the question and the model answer, per cohort
     AFFIRM     what an A1 or A2 beginner reads instead, per goal
     PRONWORDS  the two words drilled afterwards, per cohort

   THE ONE RULE THAT MATTERS
   Every word in PRONWORDS must actually appear in that cohort's `parts`, and
   the same for AFFIRM's words against its `lines`. The pronunciation screen
   highlights those words inside the passage the learner just read, so a word
   that is not in the text highlights nothing and teaches something they never
   said. `node tools/export-docs.js` checks this and will tell you if it breaks.

   HOUSE STYLE FOR THIS FILE
     q       short and concrete, 4 to 8 words. The learner has to answer it.
     steps   four labels, 3 to 4 words each, plain verbs
     parts   four sentences, 5 to 9 words each, about 25 words total.
             No numbers that are awkward to say out loud, no idioms, no
             vocabulary above A2 where a simpler word exists, and no names.
     spelling is American: favorite, practiced, traveling.

   There is deliberately no scenario line. The question carries the situation on
   its own, and a paragraph above it only crowded the screen.
   ========================================================================= */

const PRACTICE = {

  /* ---------- CAREER ---------- split by work mode, because a freelancer and
     a job seeker are not having the same conversation ---------------------- */

  'career|office': {
    who:   'Working professional',
    q:     'How are things going at work?',
    steps: ['Say how it is going', 'Give one detail', 'Say what is next', 'Close it'],
    parts: ['Things are going well at work.',
            'I am busy, but I like my team.',
            'We finish a big project this week.',
            'After that it should be calmer.'],
    es: { q: '¿Cómo te va en el trabajo?',
          steps: ['Di cómo va', 'Da un detalle', 'Di qué sigue', 'Ciérralo'],
          parts: ['En el trabajo todo va bien.', 'Estoy ocupado, pero me gusta mi equipo.', 'Terminamos un proyecto grande esta semana.', 'Después de eso será más tranquilo.'] }
  },

  'career|ownboss': {
    who:   'Freelancer or business owner',
    q:     'So what do you charge for this?',
    steps: ['Say the price', 'Say what is included', 'Give the reason', 'Hold your price'],
    parts: ['My price for this is two thousand.',
            'That covers the work and two changes.',
            'It takes me about three weeks.',
            'I think that is a fair price.'],
    es: { q: '¿Y cuánto cobras por esto?',
          steps: ['Di el precio', 'Di qué incluye', 'Da la razón', 'Mantén tu precio'],
          parts: ['Mi precio por esto es dos mil.', 'Eso incluye el trabajo y dos cambios.', 'Me toma unas tres semanas.', 'Creo que es un precio justo.'] }
  },

  'career|jobhunt': {
    who:   'Looking for a job',
    q:     'So, why should we hire you?',
    steps: ['Answer it directly', 'Give your reason', 'Give an example', 'Close it'],
    parts: ['I am a good fit for this position.',
            'I stay calm when things get busy.',
            'Last month I ran our busiest week.',
            'I know I can do the same here.'],
    es: { q: '¿Por qué deberíamos contratarte?',
          steps: ['Responde directo', 'Da tu razón', 'Da un ejemplo', 'Ciérralo'],
          parts: ['Encajo bien en este puesto.', 'Me mantengo tranquilo cuando hay mucho trabajo.', 'El mes pasado dirigí nuestra semana más ocupada.', 'Sé que puedo hacer lo mismo aquí.'] }
  },

  'career|careerbreak': {
    who:   'On a career break',
    q:     'What were you doing during the career break?',
    steps: ['Name it plainly', 'Say what you did', 'Show you kept going', 'Bring it back'],
    parts: ['I took two years off for my family.',
            'I kept doing small projects in that time.',
            'I also finished a short course.',
            'I am ready to work full time now.'],
    es: { q: '¿Qué hiciste durante tu pausa laboral?',
          steps: ['Dilo claramente', 'Di qué hiciste', 'Muestra que seguiste', 'Vuelve al presente'],
          parts: ['Tomé dos años libres por mi familia.', 'Seguí haciendo proyectos pequeños en ese tiempo.', 'También terminé un curso corto.', 'Ahora estoy listo para trabajar tiempo completo.'] }
  },

  /* someone at home full time is answering the same question, so they get the
     same task rather than a near-duplicate written twice */
  'career|athome': {
    who:   'At home full time',
    q:     'What were you doing during the career break?',
    steps: ['Name it plainly', 'Say what you did', 'Show you kept going', 'Bring it back'],
    parts: ['I took two years off for my family.',
            'I kept doing small projects in that time.',
            'I also finished a short course.',
            'I am ready to work full time now.'],
    es: { q: '¿Qué hiciste durante tu pausa laboral?',
          steps: ['Dilo claramente', 'Di qué hiciste', 'Muestra que seguiste', 'Vuelve al presente'],
          parts: ['Tomé dos años libres por mi familia.', 'Seguí haciendo proyectos pequeños en ese tiempo.', 'También terminé un curso corto.', 'Ahora estoy listo para trabajar tiempo completo.'] }
  },

  'career|student': {
    who:   'Student',
    q:     'You have no work experience. Why take you?',
    steps: ['Answer it directly', 'Give your reason', 'Give an example', 'Close it'],
    parts: ['I learn fast and I finish my work.',
            'I ran the events for our student group.',
            'We doubled the numbers in one year.',
            'I would bring the same energy here.'],
    es: { q: 'No tienes experiencia laboral. ¿Por qué tú?',
          steps: ['Responde directo', 'Da tu razón', 'Da un ejemplo', 'Ciérralo'],
          parts: ['Aprendo rápido y termino mi trabajo.', 'Organicé los eventos de nuestro grupo estudiantil.', 'Duplicamos los números en un año.', 'Traería la misma energía aquí.'] }
  },

  'career|other': {
    who:   'Something else',
    q:     'Tell me about yourself.',
    steps: ['Start with now', 'Say one strength', 'Give an example', 'Say what you want'],
    parts: ['Right now I work in customer support.',
            'I am good at staying calm with people.',
            'Last year I handled our busiest month.',
            'I want to do more of that.'],
    es: { q: 'Háblame de ti.',
          steps: ['Empieza con el ahora', 'Di una fortaleza', 'Da un ejemplo', 'Di qué quieres'],
          parts: ['Ahora trabajo en atención al cliente.', 'Se me da bien mantener la calma con la gente.', 'El año pasado manejé nuestro mes más ocupado.', 'Quiero hacer más de eso.'] }
  },

  /* ---------- EVERY OTHER GOAL ---------- one task each ------------------- */

  convo: {
    who:   'Improve social conversations',
    q:     'So what are you doing these days?',
    steps: ['Answer it', 'Add one detail', 'Say what is new', 'Ask them back'],
    parts: ['I am good. Still at the same job.',
            'I work with people every day.',
            'I started running in the mornings.',
            'What about you?'],
    es: { q: '¿Y qué haces estos días?',
          steps: ['Respóndelo', 'Añade un detalle', 'Di qué hay de nuevo', 'Pregunta tú también'],
          parts: ['Estoy bien. Sigo en el mismo trabajo.', 'Trabajo con gente todos los días.', 'Empecé a correr por las mañanas.', '¿Y tú?'] }
  },

  travel: {
    who:   'Travel',
    q:     'What is your dream travel destination?',
    steps: ['Name the place', 'Say why', 'Give one detail', 'Say when'],
    parts: ['My dream place is Japan.',
            'I want to see the old temples.',
            'I would also like to try the food.',
            'I hope to go there next year.'],
    es: { q: '¿Cuál es tu destino de viaje soñado?',
          steps: ['Di el lugar', 'Di por qué', 'Da un detalle', 'Di cuándo'],
          parts: ['Mi lugar soñado es Japón.', 'Quiero ver los templos antiguos.', 'También me gustaría probar la comida.', 'Espero ir el año que viene.'] }
  },

  school: {
    who:   'Excel at school',
    q:     'What is your favorite hobby?',
    steps: ['Name it', 'Say how often', 'Give one detail', 'Say why you like it'],
    parts: ['My favorite hobby is painting.',
            'I paint almost every weekend.',
            'I like to paint people and places.',
            'It helps me relax after school.'],
    es: { q: '¿Cuál es tu pasatiempo favorito?',
          steps: ['Dilo', 'Di con qué frecuencia', 'Da un detalle', 'Di por qué te gusta'],
          parts: ['Mi pasatiempo favorito es pintar.', 'Pinto casi todos los fines de semana.', 'Me gusta pintar personas y lugares.', 'Me ayuda a relajarme después de clase.'] }
  },

  ielts: {
    who:   'IELTS',
    q:     'Describe a place you enjoy visiting.',
    steps: ['Name it', 'Say where it is', 'Give one detail', 'Say why you like it'],
    parts: ['There is a small beach near my home.',
            'It is about thirty minutes away.',
            'It is quiet and you can hear the water.',
            'I always leave feeling calm.'],
    es: { q: 'Describe un lugar que te gusta visitar.',
          steps: ['Dilo', 'Di dónde está', 'Da un detalle', 'Di por qué te gusta'],
          parts: ['Hay una playa pequeña cerca de mi casa.', 'Está a unos treinta minutos.', 'Es tranquila y se oye el agua.', 'Siempre me voy sintiéndome en calma.'] }
  },

  other: {
    who:   'Any other goal',
    q:     'Tell me a little about yourself.',
    steps: ['Start with now', 'Say one strength', 'Give an example', 'Say what you want'],
    parts: ['Right now I work and study English.',
            'I am good at sticking with things.',
            'I have practiced every day this month.',
            'I want to use English without thinking.'],
    es: { q: 'Háblame un poco de ti.',
          steps: ['Empieza con el ahora', 'Di una fortaleza', 'Da un ejemplo', 'Di qué quieres'],
          parts: ['Ahora trabajo y estudio inglés.', 'Se me da bien ser constante.', 'He practicado todos los días este mes.', 'Quiero usar el inglés sin pensarlo.'] }
  }
};

/* ============================================================================
   WHAT A BEGINNER READS INSTEAD
   A1 and A2 do not answer a question. They read a short affirmation about
   themselves, personalised by goal. {name} is replaced at render time.
   ========================================================================= */

const AFFIRM = {
  career: { lines: ['My name is {name}.', 'I am learning English for my work.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['learning', 'practice'] ,
            es: ['Me llamo {name}.', 'Estoy aprendiendo inglés para mi trabajo.', 'Voy a practicar un poco cada día.', 'Sé que puedo hacerlo.'] },
  ielts:  { lines: ['My name is {name}.', 'I am learning English for my exam.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['exam', 'practice'] ,
            es: ['Me llamo {name}.', 'Estoy aprendiendo inglés para mi examen.', 'Voy a practicar un poco cada día.', 'Sé que puedo hacerlo.'] },
  convo:  { lines: ['My name is {name}.', 'I am learning English to talk with people.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['people', 'learning'] ,
            es: ['Me llamo {name}.', 'Estoy aprendiendo inglés para hablar con la gente.', 'Voy a practicar un poco cada día.', 'Sé que puedo hacerlo.'] },
  travel: { lines: ['My name is {name}.', 'I am learning English to travel.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['travel', 'learning'] ,
            es: ['Me llamo {name}.', 'Estoy aprendiendo inglés para viajar.', 'Voy a practicar un poco cada día.', 'Sé que puedo hacerlo.'] },
  school: { lines: ['My name is {name}.', 'I am learning English for school.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['English', 'practice'] ,
            es: ['Me llamo {name}.', 'Estoy aprendiendo inglés para la escuela.', 'Voy a practicar un poco cada día.', 'Sé que puedo hacerlo.'] },
  other:  { lines: ['My name is {name}.', 'I am learning English.',
                    'I will practice a little every day.', 'I know I can do this.'],
            words: ['learning', 'practice'] ,
            es: ['Me llamo {name}.', 'Estoy aprendiendo inglés.', 'Voy a practicar un poco cada día.', 'Sé que puedo hacerlo.'] }
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
  finish:    { w:'finish',    parts:['fi','ni','sh'],    ph:'fi.nish',     tip:'Ends soft on ‘sh’',              start:48 },
  project:   { w:'project',   parts:['pro','jec','t'],   ph:'pro.jekt',    tip:'The ‘j’ is sharp',               start:52 },
  thousand:  { w:'thousand',  parts:['thou','san','d'],  ph:'thow.zund',   tip:'The middle sound is a soft ‘z’', start:51 },
  covers:    { w:'covers',    parts:['co','ver','s'],    ph:'kuh.vurz',    tip:'Ends on a ‘z’, not an s',        start:47 },
  position:  { w:'position',  parts:['po','si','tion'],  ph:'puh.zi.shun', tip:'The ‘tion’ sounds like shun',    start:50 },
  busiest:   { w:'busiest',   parts:['bu','si','est'],   ph:'bi.zee.est',  tip:'Three beats: bi.zee.est',        start:46 },
  family:    { w:'family',    parts:['fa','mi','ly'],    ph:'fam.uh.lee',  tip:'Three beats, not two',           start:49 },
  projects:  { w:'projects',  parts:['pro','jec','ts'],  ph:'pro.jekts',   tip:'Keep the ‘ts’ crisp',            start:52 },
  student:   { w:'student',   parts:['stu','den','t'],   ph:'stew.dnt',    tip:'Two beats: stew.dnt',            start:51 },
  energy:    { w:'energy',    parts:['e','ner','gy'],    ph:'en.ur.jee',   tip:'The ‘gy’ sounds like jee',       start:48 },
  customer:  { w:'customer',  parts:['cus','to','mer'],  ph:'kus.tuh.mur', tip:'Stress the first beat ‘kus’',    start:53 },
  mornings:  { w:'mornings',  parts:['mor','ning','s'],  ph:'mor.ningz',   tip:'Ends on a ‘z’ sound',            start:49 },
  Japan:     { w:'Japan',     parts:['Ja','pa','n'],     ph:'juh.pan',     tip:'Stress the second beat ‘pan’',   start:50 },
  temples:   { w:'temples',   parts:['tem','ple','s'],   ph:'tem.pulz',    tip:'Two beats: tem.pulz',            start:47 },
  favorite:  { w:'favorite',  parts:['fa','vo','rite'],  ph:'fay.vrit',    tip:'Two beats, not three',           start:46 },
  relax:     { w:'relax',     parts:['re','la','x'],     ph:'ri.laks',     tip:'Stress the second beat ‘laks’',  start:51 },
  thirty:    { w:'thirty',    parts:['thir','t','y'],    ph:'thur.tee',    tip:'Soft ‘th’, tongue out',          start:46 },
  minutes:   { w:'minutes',   parts:['mi','nu','tes'],   ph:'mi.nits',     tip:'Two beats only: mi.nits',        start:49 },
  practiced: { w:'practiced', parts:['prac','ti','ced'], ph:'prak.tist',   tip:'The ending is ‘st’, not ced',    start:50 },
  English:   { w:'English',   parts:['Eng','li','sh'],   ph:'ing.glish',   tip:'It starts with ‘ing’',           start:47 },
  people:    { w:'people',    parts:['peo','p','le'],    ph:'pee.pul',     tip:'Two beats: pee.pul',             start:49 },
  learning:  { w:'learning',  parts:['lear','n','ing'],  ph:'lur.ning',    tip:'The ‘ear’ sounds like ur',       start:48 },
  practice:  { w:'practice',  parts:['prac','ti','ce'],  ph:'prak.tis',    tip:'End short on ‘tis’',             start:52 },
  exam:      { w:'exam',      parts:['e','xa','m'],      ph:'ig.zam',      tip:'The ‘x’ sounds like gz',         start:50 },
  travel:    { w:'travel',    parts:['tra','ve','l'],    ph:'tra.vul',     tip:'Two beats: tra.vul',             start:51 }
};

/* which two words each cohort drills. Both must appear in that cohort's parts. */
const PRONWORDS = {
  'career|office':     [WORD.project,   WORD.finish],
  'career|ownboss':    [WORD.thousand,  WORD.covers],
  'career|jobhunt':    [WORD.position,  WORD.busiest],
  'career|careerbreak':[WORD.family,    WORD.projects],
  'career|athome':     [WORD.family,    WORD.projects],
  'career|student':    [WORD.student,   WORD.energy],
  'career|other':      [WORD.customer,  WORD.busiest],
  convo:               [WORD.people,    WORD.mornings],
  travel:              [WORD.Japan,     WORD.temples],
  school:              [WORD.favorite,  WORD.relax],
  ielts:               [WORD.thirty,    WORD.minutes],
  other:               [WORD.practiced, WORD.English]
};

/* the beginner affirmations name their words by key; resolve them to the data */
Object.values(AFFIRM).forEach(a => { a.words = a.words.map(k => WORD[k]); });
