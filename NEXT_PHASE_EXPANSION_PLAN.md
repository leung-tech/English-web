# Primary English Studio — Next-Phase Expansion Blueprint

**Purpose.** This blueprint moves the website from a broad, static practice bank into a clearer learning cycle: students should be able to learn a small target, practise it in several skills, receive a useful diagnosis, and return to the most important items. It preserves the existing English-first, Traditional-Chinese-support design and keeps the first release usable without student accounts.

## 1. Starting point and planning principle

The platform already covers the core P1–P6 skills, including junior phonics and games, vocabulary, grammar, reading, writing, listening, speaking, senior reading analysis, writing models, role-play and listening checks. The prior expansion audit, however, noted that several core banks still have only a small number of activities per level. The next phase should therefore prioritise **repeatable learning pathways and deeper practice sets**, rather than add isolated cards.[1]

> **Design rule:** Every new item must serve a named grade, skill, topic, learning objective and error pattern. A student should never receive a random question without knowing what it practises or what to do next.

| Planning objective | What success looks like |
|---|---|
| More usable repetition | Students can practise the same objective in a new context rather than seeing the same question again. |
| Clear progression | Junior learners move from sound and word recognition to sentences and short texts; senior learners move from strategy practice to timed assessment tasks. |
| Actionable feedback | Results identify a skill and a next step, not merely a total score. |
| Low-friction access | The core experience remains available on phones without sign-in, external services or personal data collection. |

## 2. Recommended content architecture: themed learning cycles

The recommended next release should organise content into **four themed learning cycles per grade**. Each cycle combines the four skills around one age-appropriate context, so vocabulary and grammar are reinforced instead of appearing as separate drills. The cycles can be released in batches, beginning with two per grade and then expanding to four.

| Grade band | Suggested cycle themes | Primary outcomes |
|---|---|---|
| P1–P3 | Me and My World; School and Play; Food, Home and Community; Weather, Health and Adventures | Phonics, high-frequency words, sentence frames, simple instructions, picture-supported reading and speaking. |
| P4–P6 | Healthy Communities; Nature, Travel and Culture; Digital Life and Future Choices; Service, Goals and Secondary-School Readiness | Vocabulary in context, tense control, inference, note-taking, organised writing and reasoned oral responses. |

### Standard content pack for each learning cycle

A repeatable pack makes content production, quality control and future updates predictable. Each pack should contain the following original bilingual materials.

| Component | P1–P3 version | P4–P6 version |
|---|---|---|
| Word and sound set | 8–10 words, phonics focus, picture/clue cards and sound discrimination | 10–12 topic words, collocations, word families and vocabulary-in-context questions |
| Language focus | 6–8 sentence-frame, word-order or grammar-use items | 8–10 grammar-in-context and proofreading items with concise explanations |
| Reading | Two short picture-supported texts with four total questions | Two different genres with six total questions, including inference, reference and vocabulary-in-context |
| Listening | One replayable script with four questions and a transcript | Two scripts with note-taking prompts, four questions each and transcript-based review |
| Writing and speaking | One guided sentence/picture task and a 30-second oral prompt | One genre-linked planner, a model paragraph or model answer, and a 60–90 second oral prompt |
| Review | Five mixed retrieval questions with immediate next-step advice | Six mixed retrieval questions plus an assessment-strategy reminder |

At four cycles per grade, this approach creates 24 reusable learning packs. It would add structure and meaningful variety while allowing the existing question bank to remain available as free practice.

## 3. New learner-facing modules

### A. Smart Review and Daily Mission — first priority

The current local review list should become a **Smart Review** area. It will group missed items by skill, objective and recency; recommend a short five-to-eight-question session; and show a clear next action such as “Practise past tense again” or “Review word meaning in context.” A daily mission can combine one vocabulary item, one language-use item, one reading/listening item and one apply task, all selected from the learner’s current grade and review state.

The implementation should extend the existing local-progress records with stable item IDs, objective tags, attempt count, latest result and a next-review date. This produces a useful adaptive loop without storing personal data on a server.

### B. Mini Assessment Studio — second priority

Add an assessment mode for deliberate, exam-like practice. P1–P3 would receive 10–12 minute Foundation Checks with audio, picture cues and short texts. P4–P6 would receive 20–25 minute Skills Checks that combine reading, language use, listening and a short writing plan. Students should be able to pause, resume in the same browser, submit once, and read a bilingual diagnostic by skill.

The screen should use a simple timer, question navigator, accessible audio replay controls and a results page that links directly to Smart Review. Timed mode should be optional; practice mode should remain untimed and encouraging.

### C. P1–P3 Phonics Path — content priority

Convert the existing phonics game into a visible progression. The path should cover letter sounds, CVC words, short vowels, consonant blends, common digraphs, long-vowel patterns and high-frequency words. Each step needs a listen-and-choose activity, a sort or match activity, a short decodable reading line and a “say it” prompt. Completion should unlock the next step but always allow replay of earlier steps.

### D. P4–P6 Reading Strategy Workshop — content priority

Build a dedicated workshop with short, genre-specific lessons before practice. The first six strategy lessons should be: finding evidence, inference, vocabulary from context, pronoun reference, writer’s purpose and main-idea summary. Every lesson should use a worked example, a highlighted evidence line, a “why this answer” explanation and a second unseen item.

New senior passages should be distributed across email, notice, news report, blog, magazine article, letter, information text and opinion writing. Each passage needs a model analysis, not merely answers, so that the existing high-score approach is consistent across reading and writing.

### E. Writing Workshop: Plan, Build, Check — third priority

The writing-model library should be extended into a student production flow. After choosing a genre, the student completes a planner, selects useful vocabulary and sentence patterns, writes a draft in a structured text area, and uses a self-check panel. The self-check should cover task completion, paragraphing, tense consistency, linking words, punctuation and a genre-specific feature such as greeting/closing in an email or proposal recommendation.

Start with two additional practice tasks per existing P4–P6 genre. Keep the high-score model separate from the student’s own writing to discourage copying. The system can save drafts only in the browser until the user chooses a future account-based version.

### F. Record and Reflect Speaking Lab — third priority

Add optional in-browser recording, playback and self-reflection for oral presentation and role-play. Students should record a 30–90 second response, replay it, then tick a simple bilingual rubric: clear opening, complete sentences, topic vocabulary, connecting words, volume/pacing and conclusion. No recording should leave the device in the initial version; students explicitly choose whether to delete or retain a local draft.

## 4. Speech-feedback and progress options

Automated scoring is not required for the first expansion and should not delay the content roadmap. The two viable approaches below have different privacy, setup and learning-value implications.

| Approach | Student experience and trade-offs | Cost | Setup complexity |
|---|---|---:|---:|
| **Browser-only Record and Reflect** | Students record, replay and assess themselves with a bilingual rubric. It is private, works without accounts and supports deliberate oral rehearsal, but it does not generate automated pronunciation scores. | No additional service cost | Low |
| **Account-based teacher/AI feedback** | Students can save recordings and drafts, while a teacher dashboard or automated engine returns targeted feedback. It enables richer longitudinal progress but needs authentication, secure storage, consent and ongoing service management. | Ongoing hosting and service cost | High |

The browser-only route is a strong first implementation because it is compatible with the present static site and protects young learners’ privacy. The richer feedback route should be treated as a separate product decision, made only after requirements for school access, parent consent, retention and moderation are agreed.

## 5. Content data standard and quality controls

All new items should follow a shared schema: `id`, `grade`, `band`, `cycle`, `skill`, `subskill`, `objective`, `prompt`, `promptZh`, `answer`, `choices`, `explanation`, `explanationZh`, `difficulty`, `sourceType` and `reviewTags`. Audio items also need `script`, `scriptZh` and replay metadata. Writing tasks need `genre`, `wordRange`, `rubric` and `checklist`.

Every content batch should pass automated checks for unique item IDs, bilingual fields, valid answer keys, plausible option counts, reading/listening transcript availability, word-range fit, and grade-appropriate metadata. Visual review should continue at desktop and 390px mobile widths, with a full keyboard pass for new buttons, tabs, recording controls and timers.

## 6. Recommended delivery sequence

| Release | Scope | Main deliverables | Completion evidence |
|---|---|---|---|
| **Release 1: Learn–Review Loop** | Foundations | Data tags, Smart Review, Daily Mission, two themed cycles per grade | Five-to-eight-item targeted session works; all items retain bilingual support; results link to a named next step. |
| **Release 2: Guided Assessment** | Assessment readiness | P1–P3 Foundation Checks; P4–P6 Skills Checks; diagnostic result pages | Timed and untimed modes work; progress can resume locally; result breakdown matches question tags. |
| **Release 3: Deeper Production** | Writing and speaking | Plan–Build–Check writing tasks; Record and Reflect; expanded phonics and reading workshops | Draft/record controls are clear on mobile; checklists are grade-appropriate; no media leaves the device by default. |
| **Future decision: Managed feedback** | Optional service layer | Accounts, consent flow, secure saved work, educator overview and optional automated feedback | Privacy and retention requirements approved before development; service costs and safeguarding process documented. |

## 7. First build backlog

The immediate build backlog should be deliberately narrow: implement the item metadata layer, create Smart Review and Daily Mission, then author the first twelve themed packs—two for each grade. This gives the product a complete adaptive loop and enough structured content to test with real learners before committing to a larger authoring batch.

The next authoring sprint should prioritise common high-value gaps: P1–P3 phonics progression, P4–P6 inference and vocabulary-in-context reading, and writing self-check tasks. Mini assessments should be built only after the question metadata is in place, because their reports depend on reliable skill tagging.

## References

[1]: https://github.com/leung-tech/English-web/blob/main/QUESTION_BANK_EXPANSION_PLAN.md "Existing question-bank expansion plan"

## 8. Priority, dependencies and acceptance gates

The work should be sequenced by learning value and dependency, not simply by the attractiveness of a new screen. Smart Review and item metadata are the enabling layer: assessment diagnostics and daily recommendations cannot be reliable until every question identifies the skill and objective it measures.

| Priority | Work package | Why it comes now | Key dependency | Acceptance gate |
|---:|---|---|---|---|
| P0 | Item metadata and content-audit upgrade | Makes review, reports and balanced assessments trustworthy | Existing bank migration | Every active item has a unique ID, bilingual support, objective tag and valid answer/explanation. |
| P1 | Smart Review and Daily Mission | Turns existing practice into a repeatable habit loop | P0 | A learner can complete a targeted 5–8 item mission, see why items were selected and revisit weak objectives. |
| P1 | First 12 themed packs | Gives the new loop sufficiently varied, connected material | P0 | Two complete cycles exist for every grade and each contains all designated skills. |
| P2 | Mini Assessment Studio | Adds assessment readiness without weakening the routine practice experience | P0 and P1 | Reports accurately aggregate results by tagged skill, and local pause/resume works in desktop and mobile browsers. |
| P2 | Phonics Path and Reading Strategy Workshop | Creates visible progression for the two grade bands | P0 | Each published strategy step has a worked example, unseen practice item and clear next-step link. |
| P3 | Writing Workshop and Record and Reflect | Deepens learner production after sufficient target language and review are available | P0 and P1 | Draft/record actions, self-checks and deletion work on a 390px phone without data leaving the device by default. |
| Decision gate | Managed accounts and automated feedback | Adds service and safeguarding obligations beyond the current site | Privacy, consent and operating model | No work begins until the school/parent access model, retention policy and support ownership are approved. |

A practical first release should be scoped as **P0 + P1**, rather than attempting all modules at once. It creates the greatest learning benefit from the question bank that already exists, and its results will show whether students need more content depth, more assessment practice or stronger production support next.
