# Copy, by branch

Every user-facing string that changes with an answer, and where it comes from.
The per-branch tables at the bottom are generated; run `node tools/export-docs.js`
after editing `content.js` and they update. Machine-readable version:
[`data/copy.json`](data/copy.json).

---

## House rules

These hold everywhere in the flow and are worth knowing before writing a line.

- **No em dashes or en dashes** in user-facing copy. The exporter and the review
  scripts both check for them.
- **No emoji in UI.** Country flags on the language question are the one exception.
- **Gold is progress and reward only.** It is not a decorative accent, and it is
  not used for interactive elements. Indigo is interactive.
- **White is commitment.** The primary CTA and the selected state, nothing else.
- **Written for A2.** Short words, concrete situations, no idioms. "say your price
  without getting nervous", not "say your price and hold it".
- **No text is highlighted inside form questions.** Context screens may highlight,
  form questions may not.

---

## Where each string lives

| screen | slot | source | keyed on |
|---|---|---|---|
| `ack` | acknowledgement | `ACKCOPY` | native language (Spanish gets Spanish, all others English) |
| `ctxout` | Sarah's line | `SARAH_OUT`, `SARAH_OUT_MODE` | goal, then work mode |
| `ctxout` | stat + badge + citation | `OUTCOME`, `OUTCOME_MODE` | goal, then work mode |
| `qjtbd` | the options themselves | `GOALS[g].jtbd`, `JTBD_MODE`, `OCC_EXTRA` | goal x work mode |
| `ctxba` | heading | `BA_HEAD` | `goal\|family` |
| `ctxba` | before / after bullets | `BA_BULLETS` | `goal\|family` |
| `ctxba` | the quoted moment | `BA_SAY`, `BA_SAY_OCC` | family, occupation override |
| `ctxba` | artwork | `images/ba2/` | goal x family x gender x state |
| `ctxfeat` | claim, number, unit, pills | `SKILLOUT[skill]` | skill |
| `act` / `acthint` / `listen` | scenario + question | `PRACTICE` | goal, and work mode when the goal is career |
| `acthint` | the four-part model answer | `PRACTICE[key].steps` / `.parts` | same |
| `score` | per-skill message | `SCORE_MSG[skill][band]` | skill x score band |
| `plan` | title claim | `HERO_JTBD` / `HERO_GOAL` / `PLAN_GF[].hero` | lane x tier |
| `plan` | "what we start with" | `JTBD_TITLE` / `PLAN_GF[].title` | `goal\|family` |
| `plan` | first three sessions | `WEEKONE` / `PLAN_GF[].week` | `goal\|family` |
| `plan` | end outcomes | `OUTBULLETS` / `PLAN_GF[].out` | `goal\|family` |
| `plan` | focus section | `SKILLOUT[skill].head` / `.body` | skill |
| `plan` | proof line | `OCCWHO` or `GOALWHO` + `FAM_PRACTISE` | goal, occupation |
| `letter` | the future-self note | `LETTERS` | goal |

---

## The plan title

The title is the one string built from four answers at once, so it is worth
spelling out. `planLane()` and `planTier()` decide the shape:

**Lane** comes from the timeframe.

- 30 days or fewer -> **short lane**, JTBD-led. "Sriram, in 2 weeks, you will
  stop pausing in the speaking test."
- longer -> **long lane**, goal-led. "Sriram, in 3 months, English stops blocking
  your career."

The reasoning: a two-week promise has to be small and concrete or it is not
credible, and a three-month promise should be about the life change, not one
conversation. The JTBD does not disappear on the long lane - it becomes the
"what we start with" section instead.

**Tier** comes from minutes per day multiplied by days, bucketed into `light`,
`std` and `deep`. Every claim exists at all three, so a five-minute commitment
never makes a deep-tier promise.

The name comes first and the timeframe is a numeral, because that is the part
that has to land: `Sriram, in 3 months, <claim>.`

---

## Per-branch copy

Each block below is one reachable `goal|family` pair, showing every slot it fills
and whether it comes from a `PLAN_GF` override or the family default.

<!-- plan:start -->
### `career|customer`

JTBD options that land here: "Handle a walk-in customer", "Handle customer calls"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: take a customer call without worrying<br>std: handle any customer call calmly<br>deep: handle any customer, even an angry one |
| title claim, long lane (> 30 days) | light: English stops slowing you down at work<br>std: English stops blocking your career<br>deep: English is no longer a problem at work |
| "what we start with" title | Customer calls |
| first three sessions | Opening the call<br>A complaint you did not cause<br>Saying no, keeping the customer |
| end outcomes | Open a call without a script<br>Explain a problem you did not cause<br>Say no and keep the customer<br>Handle a complaint without freezing |
| graph milestone | you take it unprepared |
| proof line | ...practicing customer calls with Sarah |
| before/after heading | Every customer call<br>stays calm. |
| before/after, before column | You rehearse before calls<br>Complaints make you freeze<br>You pass the hard ones on |
| before/after, after column | You pick up any call<br>You stay calm when they are not<br>You say no and keep them |
| artwork | `images/ba2/ba_career_customer_{f|m}_{before|after}.webp` |

### `career|fastspeech`

JTBD options that land here: "Understand fast clients", "Understand fast coworkers"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: stop asking people to repeat<br>std: understand fast speakers the first time<br>deep: understand anyone, at any speed |
| title claim, long lane (> 30 days) | light: English stops slowing you down at work<br>std: English stops blocking your career<br>deep: English is no longer a problem at work |
| "what we start with" title | Keeping up with fast speakers |
| first three sessions | A fast speaker, full speed<br>Catching numbers and names<br>Asking one good question |
| end outcomes | Follow a fast speaker without stopping them<br>Catch numbers, dates and names first time<br>Ask one clarifying question, not three<br>Keep up on a group call |
| graph milestone | you stop asking twice |
| proof line | ...practicing keeping up with fast speakers with Sarah |
| before/after heading | Fast coworkers stop<br>losing you. |
| before/after, before column | You ask them to repeat<br>You lose the thread halfway<br>You nod without understanding |
| before/after, after column | You keep up at full speed<br>You catch names and numbers<br>You ask one clear question |
| artwork | `images/ba2/ba_career_fastspeech_{f|m}_{before|after}.webp` |

### `career|interview`

JTBD options that land here: "Ace a job interview", "Answer "tell me about yourself"", "Explain a gap in my CV", "Land an internship", "Speak up in interviews", "Start working again", "Talk about skills I built at home", "Talk to my boss with confidence"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: stop freezing in interviews<br>std: answer any interview question calmly<br>deep: walk into any interview and speak freely |
| title claim, long lane (> 30 days) | light: English stops slowing you down at work<br>std: English stops blocking your career<br>deep: English is no longer a problem at work |
| "what we start with" title | Your next interview |
| first three sessions | "Tell me about yourself"<br>Why you want this role<br>The gap they will ask about |
| end outcomes | Answer "tell me about yourself" without freezing<br>Explain a gap or a change calmly<br>Ask the interviewer your own questions<br>Hold your answer when they push back |
| graph milestone | you answer without a pause |
| proof line | ...practicing for interviews with Sarah |
| before/after heading | Interviews stop<br>being the hard part. |
| before/after, before column | You rehearse for hours<br>Your mind goes blank<br>You answer too short |
| before/after, after column | You think on your feet<br>You give real examples<br>You ask them questions |
| artwork | `images/ba2/ba_career_interview_{f|m}_{before|after}.webp` |

### `career|meetings`

JTBD options that land here: "Speak up in meetings", "Speak up in meetings again"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say one thing in every meeting<br>std: speak up in meetings without planning it<br>deep: lead the talking in your meetings |
| title claim, long lane (> 30 days) | light: English stops slowing you down at work<br>std: English stops blocking your career<br>deep: English is no longer a problem at work |
| "what we start with" title | Speaking up in meetings |
| first three sessions | Saying your point first<br>Disagreeing without softening it<br>Summarising the decision |
| end outcomes | Say your point while it is still relevant<br>Interrupt politely and be heard<br>Disagree without softening it away<br>Summarise the decision out loud |
| graph milestone | you speak before it ends |
| proof line | ...practicing speaking up in meetings with Sarah |
| before/after heading | The room hears you<br>while it still matters. |
| before/after, before column | You plan it too long<br>The moment passes<br>You agree to avoid talking |
| before/after, after column | You speak in the moment<br>You disagree politely<br>You sum up the decision |
| artwork | `images/ba2/ba_career_meetings_{f|m}_{before|after}.webp` |

### `career|pitch`

JTBD options that land here: "Chase a late payment", "Explain and defend my price", "Negotiate the offer", "Pitch on a client call", "Win a new client"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say your price out loud<br>std: say your price without getting nervous<br>deep: talk about money with any client |
| title claim, long lane (> 30 days) | light: English stops slowing you down at work<br>std: English stops blocking your career<br>deep: English is no longer a problem at work |
| "what we start with" title | Defending your price |
| first three sessions | "So what do you charge for this?"<br>What is included, in one breath<br>When they say it is too expensive |
| end outcomes | Say your price without softening it<br>Explain what is included in one breath<br>Answer "that is too expensive" calmly<br>Chase a late payment without apologising |
| graph milestone | you say the number first |
| proof line | ...practicing their price conversations with Sarah |
| before/after heading | Clients hear your value,<br>not your hesitation. |
| before/after, before column | You drop your rate first<br>You avoid the money talk<br>You explain it by email |
| before/after, after column | You say the number<br>You explain what is included<br>You handle “too expensive” |
| artwork | `images/ba2/ba_career_pitch_{f|m}_{before|after}.webp` |

### `career|smalltalk`

JTBD options that land here: "Handle work small talk again", "Make friends at a new workplace", "Network on campus", "Network to find openings"
Source: `PLAN_GF['career|smalltalk']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say more than good morning<br>std: join the conversation at work<br>deep: talk easily with anyone at work |
| title claim, long lane (> 30 days) | light: English stops slowing you down at work<br>std: English stops blocking your career<br>deep: English is no longer a problem at work |
| "what we start with" title | Small talk at work |
| first three sessions | The first two minutes of the day<br>Lunch with people you barely know<br>Introducing yourself at an event |
| end outcomes | Join the conversation before work starts<br>Talk to people you barely know at lunch<br>Introduce yourself at a work event<br>Leave a conversation without it going flat |
| graph milestone | you start it |
| proof line | ...practicing small talk at work with Sarah |
| before/after heading | The right people<br>remember you. |
| before/after, before column | You skip the networking part<br>You run out after hello<br>You leave without a contact |
| before/after, after column | You start the conversation<br>You keep it going<br>You leave with a name |
| artwork | `images/ba2/ba_career_smalltalk_{f|m}_{before|after}.webp` |

### `convo|family`

JTBD options that land here: "Support my kids at school", "Win over my partner’s family"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: talk to the teacher without a script<br>std: talk to the teacher with confidence<br>deep: ask the teacher any question you want |
| title claim, long lane (> 30 days) | light: everyday conversations get easier<br>std: you talk to anyone without planning it<br>deep: you speak without thinking in your language first |
| "what we start with" title | Talking to teachers |
| first three sessions | Asking the teacher directly<br>Explaining your child’s situation<br>Speaking at a parent meeting |
| end outcomes | Ask the teacher a direct question<br>Explain your child’s situation clearly<br>Understand the form and fill it in<br>Speak up at a parent meeting |
| graph milestone | you ask directly |
| proof line | ...practicing talking to teachers with Sarah |
| before/after heading | You belong<br>in the room. |
| before/after, before column | You smile and stay quiet<br>You miss the joke<br>You let others speak for you |
| before/after, after column | You join in<br>You ask about them<br>They talk to you directly |
| artwork | `images/ba2/ba_convo_family_{f|m}_{before|after}.webp` |

### `convo|services`

JTBD options that land here: "Handle doctors and offices solo", "Talk to teachers and doctors solo"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: book an appointment on your own<br>std: handle the doctor and the bank on your own<br>deep: walk into any office and sort things out |
| title claim, long lane (> 30 days) | light: everyday conversations get easier<br>std: you talk to anyone without planning it<br>deep: you speak without thinking in your language first |
| "what we start with" title | Appointments and offices |
| first three sessions | Booking the appointment<br>Describing the problem<br>Asking what you usually skip |
| end outcomes | Book an appointment on the phone<br>Describe a problem clearly, first time<br>Ask the question you usually skip<br>Push back when the answer is wrong |
| graph milestone | you book it yourself |
| proof line | ...practicing appointments and offices with Sarah |
| before/after heading | You sort it out<br>on your own. |
| before/after, before column | You take someone with you<br>You skip your question<br>You accept a wrong answer |
| before/after, after column | You book it yourself<br>You describe it clearly<br>You ask again if it is wrong |
| artwork | `images/ba2/ba_convo_services_{f|m}_{before|after}.webp` |

### `convo|smalltalk`

JTBD options that land here: "Chat with colleagues outside work", "Get back into everyday chat", "Make friends at the school gate", "Make friends on campus", "Make small talk feel natural", "Meet new people and make friends", "Meet new people at events"
Source: family maps (`JTBD_TITLE` / `WEEKONE` / `OUTBULLETS` / `FAM_PRACTISE` / `HERO_JTBD`)

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say the first sentence to someone new<br>std: start a conversation with anyone<br>deep: talk to new people without thinking about it |
| title claim, long lane (> 30 days) | light: everyday conversations get easier<br>std: you talk to anyone without planning it<br>deep: you speak without thinking in your language first |
| "what we start with" title | Starting conversations |
| first three sessions | The first sentence<br>Keeping it going<br>Leaving politely |
| end outcomes | Start with a stranger instead of waiting<br>Keep it going past two exchanges<br>Tell a short story about yourself<br>Leave a conversation politely |
| graph milestone | you start it |
| proof line | ...practicing starting conversations with Sarah |
| before/after heading | Small talk stops<br>feeling like work. |
| before/after, before column | You wait to be spoken to<br>You answer in two words<br>You leave early |
| before/after, after column | You open with a question<br>You keep it going<br>You leave people smiling |
| artwork | `images/ba2/ba_convo_smalltalk_{f|m}_{before|after}.webp` |

### `ielts|exam`

JTBD options that land here: "Pass the speaking test", "Speak two minutes without freezing"
Source: `PLAN_GF['ielts|exam']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: stop pausing in the speaking test<br>std: answer every question in the speaking test<br>deep: speak in the test like you do outside it |
| title claim, long lane (> 30 days) | light: you stop guessing your band<br>std: you know your band before the test<br>deep: you get the band you need |
| "what we start with" title | Simple Speaking mock test |
| first three sessions | Part 1, the warm-up questions<br>Part 2, the two-minute turn<br>Part 3, the follow-ups |
| end outcomes | Speak for two minutes without stopping<br>Answer the follow-up you did not expect<br>Use the words the examiner rewards<br>Keep going when you lose the thread |
| graph milestone | you fill the two minutes |
| proof line | ...practicing full mock tests with Sarah |
| before/after heading | Exam day sounds<br>like practice. |
| before/after, before column | You freeze in part two<br>Pauses cost you marks<br>Your answers stay short |
| before/after, after column | You fill the two minutes<br>You handle follow ups<br>You use examiner words |
| artwork | `images/ba2/ba_ielts_exam_{f|m}_{before|after}.webp` |

### `ielts|fastspeech`

JTBD options that land here: "Understand fast native audio"
Source: `PLAN_GF['ielts|fastspeech']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: understand more of the listening test<br>std: follow the audio at full speed<br>deep: understand the audio the first time |
| title claim, long lane (> 30 days) | light: you stop guessing your band<br>std: you know your band before the test<br>deep: you get the band you need |
| "what we start with" title | Fast audio in the test |
| first three sessions | Native speed, with no slowing down<br>Catching numbers, dates and names<br>Hearing the answer change mid sentence |
| end outcomes | Follow native speed without falling behind<br>Catch numbers, dates and names first time<br>Hear the answer change mid sentence<br>Stay with a long talk to the end |
| graph milestone | you stop asking twice |
| proof line | ...practicing fast listening for the test with Sarah |
| before/after heading | The audio stops<br>going too fast. |
| before/after, before column | You lose the speaker halfway<br>You miss the numbers<br>You guess the answer |
| before/after, after column | You follow the whole clip<br>You catch dates and names<br>You answer from what you heard |
| artwork | `images/ba2/ba_ielts_fastspeech_{f|m}_{before|after}.webp` |

### `other|fastspeech`

JTBD options that land here: "Understand native speakers at full speed"
Source: `PLAN_GF['other|fastspeech']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: stop pretending you understood<br>std: understand native speakers the first time<br>deep: understand anyone, at any speed |
| title claim, long lane (> 30 days) | light: English gets easier every week<br>std: English stops getting in your way<br>deep: you use English without thinking about it |
| "what we start with" title | Understanding native speakers |
| first three sessions | A native speaker at full speed<br>Catching what actually matters<br>Asking them to repeat it, once |
| end outcomes | Follow a native speaker without stopping them<br>Catch the part that actually matters<br>Ask once instead of nodding along<br>Keep up when everyone talks at once |
| graph milestone | you stop asking twice |
| proof line | ...practicing with fast native speakers with Sarah |
| before/after heading | Native speed stops<br>leaving you behind. |
| before/after, before column | You ask people to repeat<br>You lose the thread<br>You nod without understanding |
| before/after, after column | You keep up at full speed<br>You catch what matters<br>You ask one clear question |
| artwork | `images/ba2/ba_other_fastspeech_{f|m}_{before|after}.webp` |

### `other|interview`

JTBD options that land here: "Be ready when opportunity knocks"
Source: `PLAN_GF['other|interview']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: introduce yourself without freezing<br>std: be ready when the chance comes<br>deep: speak well whenever it matters |
| title claim, long lane (> 30 days) | light: English gets easier every week<br>std: English stops getting in your way<br>deep: you use English without thinking about it |
| "what we start with" title | Being ready when it matters |
| first three sessions | Saying who you are in three lines<br>Why you, in one answer<br>The question you hope they skip |
| end outcomes | Introduce yourself without rehearsing it<br>Say what you are good at without shrinking<br>Answer the question you hoped they would skip<br>Sound like yourself when it matters |
| graph milestone | you answer without a pause |
| proof line | ...practicing for the moments that matter with Sarah |
| before/after heading | You are ready<br>when it comes. |
| before/after, before column | You put it off<br>You feel unprepared<br>You let the chance pass |
| before/after, after column | You speak when asked<br>You say what you mean<br>You take the chance |
| artwork | `images/ba2/ba_other_interview_{f|m}_{before|after}.webp` |

### `other|smalltalk`

JTBD options that land here: "Speak without overthinking", "Start conversations anywhere"
Source: `PLAN_GF['other|smalltalk']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say it without planning it first<br>std: speak without practising in your head<br>deep: stop translating before you speak |
| title claim, long lane (> 30 days) | light: English gets easier every week<br>std: English stops getting in your way<br>deep: you use English without thinking about it |
| "what we start with" title | Speaking without overthinking |
| first three sessions | Saying it before you translate it<br>Keeping it going past two lines<br>Letting a small mistake pass |
| end outcomes | Say it before you translate it in your head<br>Keep a conversation going past two lines<br>Let a small mistake pass and carry on<br>Start instead of waiting to be spoken to |
| graph milestone | you start it |
| proof line | ...practicing speaking without overthinking with Sarah |
| before/after heading | You speak<br>before you overthink. |
| before/after, before column | You plan the sentence first<br>The moment passes<br>You stay quiet |
| before/after, after column | You just say it<br>The words keep coming<br>You enjoy talking |
| artwork | `images/ba2/ba_other_smalltalk_{f|m}_{before|after}.webp` |

### `school|exam`

JTBD options that land here: "Pass my speaking exam"
Source: `PLAN_GF['school|exam']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: stop going blank in your oral exam<br>std: answer every question in your oral exam<br>deep: speak in the exam like you do outside it |
| title claim, long lane (> 30 days) | light: you speak up in class more often<br>std: you speak in class without practising first<br>deep: English stops lowering your marks |
| "what we start with" title | Your speaking exam |
| first three sessions | The questions you know are coming<br>Explaining your answer, not just saying it<br>A question you did not prepare |
| end outcomes | Answer in full sentences, not one word<br>Explain your reason so it counts<br>Handle a question you did not prepare<br>Finish your turn without drying up |
| graph milestone | you fill the two minutes |
| proof line | ...practicing for their speaking exam with Sarah |
| before/after heading | Your oral exam<br>stops being scary. |
| before/after, before column | You blank in front of the teacher<br>Long pauses cost marks<br>You answer in one line |
| before/after, after column | You speak for the full time<br>You handle the follow up<br>You use the right words |
| artwork | `images/ba2/ba_school_exam_{f|m}_{before|after}.webp` |

### `school|fastspeech`

JTBD options that land here: "Keep up with fast lectures"
Source: `PLAN_GF['school|fastspeech']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: follow more of every lecture<br>std: follow a lecture at full speed<br>deep: understand lectures without extra effort |
| title claim, long lane (> 30 days) | light: you speak up in class more often<br>std: you speak in class without practising first<br>deep: English stops lowering your marks |
| "what we start with" title | Keeping up in lectures |
| first three sessions | A lecturer at full speed<br>Catching the terms that matter<br>Asking one question after class |
| end outcomes | Follow a lecture without falling behind<br>Catch the key terms and write them down<br>Ask the lecturer one clear question<br>Keep up when the class discusses it |
| graph milestone | you stop asking twice |
| proof line | ...practicing keeping up in lectures with Sarah |
| before/after heading | Lectures stop<br>getting away from you. |
| before/after, before column | You miss half the lecture<br>You copy without understanding<br>You ask friends afterwards |
| before/after, after column | You follow the lecturer<br>You catch the key points<br>You ask in the moment |
| artwork | `images/ba2/ba_school_fastspeech_{f|m}_{before|after}.webp` |

### `school|meetings`

JTBD options that land here: "Speak up in class discussions"
Source: `PLAN_GF['school|meetings']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say one thing in class<br>std: speak up in class without practising first<br>deep: start the discussion in class |
| title claim, long lane (> 30 days) | light: you speak up in class more often<br>std: you speak in class without practising first<br>deep: English stops lowering your marks |
| "what we start with" title | Speaking up in class |
| first three sessions | Saying your idea first<br>Disagreeing with a classmate<br>Building on what someone said |
| end outcomes | Say your idea while it is still the topic<br>Disagree with a classmate politely<br>Build on what someone else said<br>Answer when the teacher looks at you |
| graph milestone | you speak before it ends |
| proof line | ...practicing speaking up in class with Sarah |
| before/after heading | Your idea reaches<br>the discussion. |
| before/after, before column | You plan it too long<br>The topic moves on<br>You agree to stay safe |
| before/after, after column | You speak while it counts<br>You disagree politely<br>You build on others |
| artwork | `images/ba2/ba_school_meetings_{f|m}_{before|after}.webp` |

### `school|smalltalk`

JTBD options that land here: "Make friends on campus"
Source: `PLAN_GF['school|smalltalk']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say the first line on campus<br>std: start conversations on campus<br>deep: make friends easily at school |
| title claim, long lane (> 30 days) | light: you speak up in class more often<br>std: you speak in class without practising first<br>deep: English stops lowering your marks |
| "what we start with" title | Making friends on campus |
| first three sessions | The first line before class<br>Joining a group that is already talking<br>Making a plan for later |
| end outcomes | Start a conversation before class<br>Join a group that is already talking<br>Ask someone to study or eat together<br>Keep it going the second time you meet |
| graph milestone | you start it |
| proof line | ...practicing making friends on campus with Sarah |
| before/after heading | Campus stops<br>feeling lonely. |
| before/after, before column | You eat lunch alone<br>You answer in two words<br>You leave early |
| before/after, after column | You start the conversation<br>You keep it going<br>You make plans |
| artwork | `images/ba2/ba_school_smalltalk_{f|m}_{before|after}.webp` |

### `travel|services`

JTBD options that land here: "Breeze through airports and hotels", "Sort out any mix-up abroad"
Source: `PLAN_GF['travel|services']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: ask for what you need at the hotel<br>std: sort out any problem on your own<br>deep: travel without worrying about English |
| title claim, long lane (> 30 days) | light: you handle the basics on your own<br>std: you travel and handle everything yourself<br>deep: you travel without worrying about English |
| "what we start with" title | Airports, hotels and mix-ups |
| first three sessions | Checking in and asking for what you need<br>Something is wrong with the room<br>A connection you just missed |
| end outcomes | Check in and ask for what you need<br>Say what is wrong with the room<br>Sort out a missed flight at the desk<br>Ask for help when the plan changes |
| graph milestone | you book it yourself |
| proof line | ...practicing airports and hotels with Sarah |
| before/after heading | You handle the trip<br>on your own. |
| before/after, before column | You point instead of asking<br>You accept the wrong room<br>You avoid the front desk |
| before/after, after column | You ask for what you need<br>You fix problems yourself<br>You get things changed |
| artwork | `images/ba2/ba_travel_services_{f|m}_{before|after}.webp` |

### `travel|smalltalk`

JTBD options that land here: "Make friends while traveling"
Source: `PLAN_GF['travel|smalltalk']`

| slot | copy |
|---|---|
| title claim, short lane (<= 30 days) | light: say the first line to a stranger<br>std: make friends while you travel<br>deep: talk to anyone you meet abroad |
| title claim, long lane (> 30 days) | light: you handle the basics on your own<br>std: you travel and handle everything yourself<br>deep: you travel without worrying about English |
| "what we start with" title | Meeting people as you travel |
| first three sessions | The first line with a stranger<br>Where you are from, made interesting<br>Making a plan with someone new |
| end outcomes | Start with a stranger in a hostel or a cafe<br>Say where you are from without a script<br>Make a plan with someone you just met<br>Leave the conversation on good terms |
| graph milestone | you start it |
| proof line | ...practicing meeting people abroad with Sarah |
| before/after heading | Strangers become<br>travel friends. |
| before/after, before column | You keep to yourself<br>You answer in two words<br>You miss the invite |
| before/after, after column | You start the conversation<br>You swap stories<br>You get invited along |
| artwork | `images/ba2/ba_travel_smalltalk_{f|m}_{before|after}.webp` |

<!-- plan:end -->
