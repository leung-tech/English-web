# Validation Notes

## Browser verification

The revised static site was opened locally in Chromium on 20 August 2026. The home page rendered successfully with the new **Primary English Studio** identity, a visible P1–P6 year selector, four skill-route cards, a year-scope summary and a clear **開始這個練習** call-to-action.

A P3 reading session was launched successfully. The practice screen displayed the passage, a multiple-choice question, the six-item progress path, the learner-habit panel and navigation controls. Selecting the correct response and choosing **核對答案** updated the completed-question count, displayed the explanation, changed the control to **下一題**, and updated the progress indicator.

## Follow-up browser checks

The Listening Lab interface should be checked for its replay control and transcript-after-answer pattern. Browser speech playback relies on the local browser speech service and requires a pupil to activate the replay button.

The four-skill selector was also tested after a completed reading item. Selecting **Listen** changed the active route styling, displayed the Listening Lab and Speak Aloud modules, updated the session length to four questions, and retained the learner’s local completed-question count.

The P3 Listening Lab was launched successfully. It displayed an audio replay control, withheld the transcript before marking, presented four answer choices, and showed an age-appropriate listening strategy. The replay button was activated without a page error; audio output depends on the browser’s local speech-synthesis service.

After selecting and marking the correct listening answer, the practice screen revealed the English transcript, displayed explanatory feedback, updated the learner’s completed-item total and enabled the next-question control. This confirms the intended listen-first, read-after-check interaction.

## Bilingual refinement validation

The refined home page was opened locally in Chromium. The desktop view rendered English-first labels with adjacent Traditional Chinese support across the header, year selector, four skill routes, activity modules, action area, progress metrics and year-scope summary. The new hierarchy preserved the English learning target while making navigation and curriculum intent easier to understand in Chinese.

The bilingual home screen maintained its four-route structure, year selector and clear action hierarchy in the browser. During the first scope-navigation check, the visible home view did not switch as expected; the navigation behaviour requires a focused follow-up check before publishing.

The year-scope navigation handler was verified by activating it directly and inspecting the rendered page. The bilingual curriculum map, category cards, English–Chinese topic chips and paired four-skill descriptions rendered successfully. The review also identified several specialised grammar labels that should receive explicit Chinese translations rather than a generic fallback; these will be completed before publication.

The final P6 scope check confirmed that all specialised grammar chips now use explicit Chinese companions, including past continuous, passive voice, conditionals, gerunds and infinitives, reported speech, pronouns, linkers and complex sentences. The P6 page title also displayed its English and Chinese forms correctly.

## Assessment writing feature validation

The Write route was tested at P4. It displayed the existing sentence-building, proofreading and planning activities, plus the new **High-score models · 呈分試高分範文** card carrying its P4–P6 assessment label. This confirms that the feature appears only at the intended senior-primary stage.

The P4 model library rendered successfully with two model selectors, a full email model, a bilingual task panel, five visible assessment criteria and P4–P6 tabs. The visual review found that the “Why it works · 閱卷重點” heading is shown twice because both the static page shell and dynamic renderer provide it; this small presentation issue will be corrected before release.

After the heading correction, the P4 library was re-opened and verified with one “Why it works · 閱卷重點” heading, five scoring criteria and a populated model composition. The library view, rubric and model data now render as intended.

## Writing support feature validation

The P6 proposal model was opened through the P4–P6 model library. Its new learning layer displayed three bilingual tabs—Common mistakes, Vocabulary builder and Sentence patterns—along with three genre-specific correction cards and an original-sentence practice box.

The P6 proposal page was visually checked with the Sentence patterns panel selected. It showed three adaptable English–Chinese frames, a model-specific original-writing prompt and a visible textarea, while preserving the full model composition and five-part scoring panel. Vocabulary and sentence-pattern tab switching was also confirmed programmatically.

## Interactive error-correction quiz validation

The P4 informal-email model was opened in the completed writing-support library. Its Quick correction quiz panel rendered with a bilingual question heading, a three-question progress label and three selectable correction choices.

The P4 quiz was tested with an incorrect first response. The panel marked the selected wrong option, revealed the correct option and displayed a bilingual grammar explanation. The remaining questions were completed successfully enough to reach the completion state, which showed a 2/3 practice score and a restart control. This confirms answer marking, feedback, progression, scoring and restart behaviour.

The complete writing-support preview also covered P5 and P6. The P5 formal-email model displayed three sentence-pattern cards and the five-part scoring panel. The P6 magazine-article model displayed a distinct three-question bilingual correction quiz, confirming that P4, P5 and P6 each load genre-specific models, writing-support resources, scoring guidance and quiz content.

## Senior listening and oral-practice validation

The P4 Listening comprehension module opened with a senior-specific Eco Club announcement question. It displayed a bilingual question, four answer choices, a replayable audio control and a four-question session indicator.

After the P4 listening answer was checked, the bilingual feedback and the titled English transcript appeared as intended. The P6 oral-presentation module was also opened successfully. It showed a replayable model-audio control, bilingual proposal prompt, four presentation-plan steps, four key-language prompts, a self-check and a two-activity session count.

The P6 oral self-check was completed and returned a successful completion message with the next-step control. The P5 Travel forum listening activity also loaded with a bilingual question, four answer choices and replayable audio. This confirms the P4–P6 senior listening scripts and oral-presentation modules work across all three target year levels.

The public GitHub Pages URL opened successfully. Its initial cached page still showed the pre-update generic P6 speaking title rather than the new oral-presentation plan, indicating that the Pages deployment needs to finish refreshing before final online verification. The published page itself is reachable; the live senior-oral assets will be rechecked after deployment status confirms completion.

After GitHub Pages reported a successful build, the public page loaded the new senior-oral data file but still used a cached earlier app.js, causing the generic P6 speaking card to appear despite the data object being present. The page will be updated with versioned script URLs to force the browser to retrieve the matching current application logic.

Final public deployment verification succeeded after versioned script URLs were published. The live P6 oral-presentation page loaded the senior oral library, showed the correct P6 proposal title, replayable model-audio control, 90–120 second duration label and all four presentation-plan steps. The online practice link is ready for student use.

## Listening vocabulary, quick checks and role-play validation

The P4 Listening vocabulary module opened as an eight-card session. A card initially showed only the English target word and revealed the Chinese meaning plus context sentence only after the reveal control was used.

The P5 Listening quick check loaded six replayable items with four answer choices. A correct response displayed immediate bilingual feedback and the short transcript. The P6 Role-play module loaded a bilingual goal, six A/B dialogue lines, separate Role A and Role B audio controls, four useful phrases and a speaking self-check.

The public site was verified after the extension deployment. At P6, the Listen route showed Listening vocabulary, Listening quick check and Role-play practice in addition to the existing modules. The live role-play session loaded the secondary-school advice title, six dialogue turns and separate Role A and Role B audio controls.

## Junior games and advanced reading validation

The P1 Apply route showed four modules, including the new Phonics & story game and Word Match. The phonics game launched with replayable audio, a bilingual prompt and four selectable answers.

The P2 Word Match activity showed a Word Match label, hidden clue panel, Chinese meaning and English clue after reveal, plus a self-check. The P6 Advanced reading workshop showed the Magazine article genre, a long-form original passage and four answer options. After checking an answer, it displayed bilingual feedback and a three-part model analysis with text clue, model answer and reading-strategy explanation.

The P3 Phonics & story game loaded six replayable game questions. The P4 Advanced reading workshop launched a School news report session, while P5 launched a Travel blog session; each displayed four questions, the bilingual genre label and the selected year level.

The public deployment was checked after the update. The P1 Apply route displayed Vocabulary, Grammar, Phonics & story game and Word Match. The P6 Read route displayed Advanced reading workshop, which launched a Magazine article with the model-analysis flow available after answer checking.

## Full question-bank expansion validation

Initial integration testing confirmed that the expansion banks loaded into each category. The session-selection limits were then raised so students receive the enlarged sets rather than the earlier shorter default sessions. Final validation will confirm the updated session counts across junior and senior modules.

Final local count checks confirmed that displayed and launched session sizes match: P1 Grammar 8, P1 Reading 8, P1 Listening 6, P2 Phonics & story game 8, P4 Listening 6, P4 Writing planner 6, P5 Advanced reading 5, and P6 Role-play 3.

A complete P6 Advanced reading session was sampled across all five questions. It included Magazine article, Formal letter and the newly added Opinion column, and every question displayed the model-analysis panel after checking.

The public site loaded QUESTION_BANK_EXPANSION successfully. Online checks confirmed P1 Grammar (8 questions), P4 Listening (6 questions), P6 Advanced reading (5 questions) and P6 Role-play (3 questions), with the displayed and launched counts matching.

All six high-score writing models were checked locally. Each model’s interactive grammar/error-correction quiz now contains four questions, including the new genre-specific extension item.

The final public deployment loaded QUESTION_BANK_EXPANSION and all six writing-model correction quizzes. Each of the P4, P5 and P6 models now has four interactive error-correction questions online.

## Comprehensive quality review

Desktop homepage review at 1280 × 1100 found no horizontal overflow, no empty buttons and no unlabelled data-entry fields. The document contained one user-facing hero H1 and separate view headings for scope, models, results and review.

The Grammar & patterns module had one bilingual field mismatch. It was corrected to show the Chinese title 「文法與句型」 and its separate English/Chinese description. A sweep of all grades and four routes found no module cards with missing bilingual labels.

Responsive homepage screenshots were reviewed at 1280 × 1100 and 390 × 844. The desktop hierarchy, route cards, sidebar and practice area were aligned without overlap. The mobile layout stacked the year selector, progress panel and hero correctly; navigation controls remained visible, with no horizontal overflow observed. The compact header and hero text stayed readable at the tested width.

The P6 writing-model library showed the two appropriate P6 models, five rubric criteria and four study tabs. The model screen and the interactive grammar-quiz tab had no horizontal overflow; the quiz showed one bilingual prompt, three answer choices and a check control.

The P5 listening session was checked after an answer was marked. Replay audio, bilingual feedback, transcript reveal, hint, previous/next controls and six-step progress navigation all rendered without overlap. The transcript remained hidden before marking and appeared only after feedback was produced.

A broad launch scan covered 75 available grade-route-module combinations across P1–P6. Every checked module entered either a practice session or its appropriate model-library route without browser exceptions, and no checked desktop state produced horizontal overflow.

Mobile screenshots of the P6 high-score writing library showed readable header text, visible return control, responsive P4–P6 grade tabs and a single-column model picker. No text collision or horizontal clipping was observed in the tested top section.

The final accessibility-oriented DOM check found no duplicate IDs and no unnamed buttons, inputs or text areas in the active model-library view. The tested page width matched the 1280px viewport without horizontal overflow.

## Hong Kong learning-cycle expansion

A new original P1–P6 Hong Kong learning-cycle bank was added for school, transport, community, environment, rainy-day safety, heritage, accessibility and reading-community contexts. The bank extends vocabulary, grammar, reading, sentence ordering, proofreading, writing, speaking, junior listening, phonics/story games, word matching, senior listening, listening flashcards, quick checks, role-play and advanced reading.

The revised content audit loaded both the original expansion and the Hong Kong learning-cycle bank. It passed all P1–P6 coverage thresholds and JavaScript syntax checks. In a local browser run, P6 Advanced Reading loaded seven active questions and opened an interactive passage with four answer options and bilingual question support.

A direct browser check confirmed that the new P6 Proposal extract, “A Safer Path to the Community Centre”, contains two questions with Chinese prompts, explanations and model-analysis text. The loaded expansion bank now provides every grade with 12 added vocabulary words, 4 grammar questions, 3 reading passages, 5 writing prompts and 5 speaking prompts. P1–P3 each have 4 added listening items, while P4–P6 each have 2 added senior listening scripts.

## P1–P3 games and Pre-S1 readiness mock expansion

A local P1 check confirmed that the expanded Phonics & story game lists 18 available questions. A launched game item displayed a replay-audio control, one English-first prompt with Traditional Chinese support and four selectable choices. The content audit also confirmed that each P1–P3 expansion bank now holds at least 12 phonics/story-game items and 10 listening items.

The new P6 Pre-S1 readiness mock appeared under Language use with a visible “PRE-S1 STYLE · 原創銜接” label and a description of its listening, reading, language-use and writing coverage. Its first item launched as Question 1 of 12 and displayed replayable audio, an English-first/Traditional-Chinese question and four answer choices. The unit explicitly identifies itself as original P6-to-S1 readiness practice rather than an official Education Bureau paper.

The writing item opened as Question 12 of 12 with a long-response textarea, a bilingual content plan and a stated 80–100 word target. A 55-word test draft was accepted as a completed self-check and showed feedback that clearly distinguishes the word-count completion from any automatic content or quality score.

The local result screen was visually reviewed. It displayed the objective score as a fraction, separately stated the writing self-check status, included the original-practice disclaimer and showed both return and review controls without clipping or overlap.

## P6 revision checklist and junior progress tracker

A local P6 check opened the new Pre-S1 vocabulary & grammar review from the Language use route. The module showed the “P6 REVIEW · 重點複習” label, three bilingual vocabulary groups and eight grammar/editing cards with model sentences and correction reminders.

The Parent / Teacher panel opened with a clear device-only privacy notice, three summary measures and six P1–P3 skill rows. After one P1 Phonics & story game answer and one P1 Listening lab answer, the panel immediately showed two local attempts, separate P1 phonics/listening records, accuracy figures and the latest local activity date. No student name, account, cloud sync or external transmission is used.

The desktop tracker panel was visually reviewed: summary cards, P1–P3 skill rows, local-record controls and privacy copy were readable without overlap or clipping. The P6 revision screen also rendered all 12 vocabulary cards and all 8 grammar cards. The P6 screen’s two-column vocabulary/grammar layout was visually checked and remained readable; a page reload retained the device-local junior progress record.

The published website was verified after deployment. It loaded the 12-item vocabulary / 8-item grammar Pre-S1 revision guide and opened the Parent / Teacher panel with all six P1–P3 skills rows.

## P6 extended reading and integrated cloze expansion

A local P6 Pre-S1 mock session launched as Question 1 of 22 with 22 visible question-navigation controls. The new original content adds four extended-reading questions and six integrated-cloze questions to the existing listening, reading, language use and writing sections.

The extended-reading item appeared as Question 12 of 22 with its full magazine article, English-first/Traditional-Chinese question and four answer choices. The integrated-cloze item appeared as Question 16 of 22 with the complete six-blank passage, a clearly numbered blank prompt, bilingual support and four answer choices.

A correct integrated-cloze response produced immediate English and Traditional-Chinese grammar feedback and a visible Next control. The desktop question screen was visually reviewed: the passage, four choices, answer feedback, 22-question navigation path and action controls all remained readable without overlap or clipping.

The published website was verified after deployment. The live mock exposed all six sections and the expected 22 items, including four extended-reading questions and six integrated-cloze questions.

## P6 Pre-S1 writing model and rubric

The local P6 writing library opened the new “Three Smart Habits for a Calm Start” Pre-S1 readiness article. The selected item displayed the explicit original-practice label, five model-specific 4/4 rubric criteria and all four writing-support study tabs.

The desktop writing page was visually reviewed: the model selector, task, exemplar, five rubric cards and writing-support area were readable without clipping or overlap. The Quick correction quiz opened as Question 1 of 4 with three answer options and bilingual support.

The published website was verified after deployment. It loaded the original Pre-S1 writing model with its explicit label, five rubric criteria, four sentence patterns and four correction-quiz questions.

## P1–P3 star points and badge rewards

The local Parent / Teacher panel displayed three reward-summary cards and six locked badges on a new reward record. A real P1 Phonics & story game answer then awarded 10 local star points, updated the P1 phonics attempt/correct record and unlocked the First Spark / 起步星光 badge. The immediate feedback toast clearly reported both the points and new badge.

The desktop reward board was visually reviewed. Its three summary cards, six badges, earned-versus-progress states, star values and private-to-this-browser notice remained readable without overlap or clipping.

At a 390px viewport, the top navigation and Parent / Teacher header wrapped without clipping; the local-record and return controls remained distinct and reachable. The reward board's narrow-screen grid uses the dedicated one-column summary and single-column badge rules.

The published website was verified after deployment. The live build loaded the 10-star-correct / 3-star-attempt rules, six badge definitions, three reward-summary cards and six badge cards in the Parent / Teacher view. The S1–S3 to DSE foundation roadmap was included as a published project document.

## S1 Bridge — School Life and Routines

The local P6 Apply route displayed the S1 Bridge: School Life & Routines module with its bilingual S1 transition description. The module loaded 16 original items and began a 12-question session. A sampled Library Helper Email question displayed its full school-life context, four options and bilingual prompt. A correct response produced immediate English grammar feedback and adjacent Traditional Chinese explanation, then enabled question navigation.

The desktop session view was visually reviewed. The passage, two-line bilingual prompt, all four answer controls, feedback block and 12-question navigation were readable without clipping or overlap.

At a 390px viewport, the P6 rail, S1 Bridge session title, progress indicator and Library Helper Email context remained readable without horizontal overflow. The responsive one-column practice layout preserved the content flow for the passage, bilingual prompt and answer choices.

The published website was verified after deployment. The P6 Apply route contained the S1 Bridge module, and the live page loaded all 16 original items across four school-life contexts. It generated a 12-question practice session with a bilingual prompt and four answer controls.

## S1 Bridge — Reading, Cloze, Vocabulary and Listening

The local P6 Read route displayed the S1 Bridge Reading & cloze module with its bilingual S1 transition description. The module loaded ten original items and began a ten-question session. A sampled Club Sampler comprehension question displayed the full school-life text, four options and bilingual prompt. A correct response returned immediate English feedback with a Traditional Chinese explanation and enabled question navigation.

A sampled integrated-cloze item showed the full A More Organised Morning message, numbered blanks, bilingual prompt and four context-appropriate connector choices. The S1 Bridge School life vocabulary module loaded all 12 items into a 12-question session; a sampled volunteer item showed the English scenario, a Traditional Chinese meaning cue and four selectable answers.

The S1 Bridge School life listening module loaded two scripts and eight questions into an eight-question session. A sampled Lunchtime Planning Meeting item displayed the Play audio control, four choices and bilingual question. The replay control and transcript reveal control were both available; opening the transcript made the English script panel visible.

The desktop listening view was visually reviewed. The audio panel, bilingual question, four answer controls, checking action, navigation and eight-question progress path were readable without clipping or overlap.

At a 390px viewport, the P6 rail, S1 Bridge Reading & cloze session title, ten-question progress indicator and A More Organised Morning integrated-cloze text remained readable without horizontal overflow. The one-column mobile layout preserved the long text flow for the bilingual practice experience.

The published site was checked after deployment. The P6 language route contained the S1 Bridge School life vocabulary module and loaded 12 vocabulary items. The P6 listening route contained the S1 Bridge School life listening module and loaded two scripts with eight total questions. The P6 Read route contained the S1 Bridge Reading & cloze module; it loaded ten items into a 10-question session with a full Club Sampler text, bilingual prompt and four answer controls.

## S1 Core Path — Complete four-skills practice

The local P6 Read route displayed the new **S1 Core: Reading workshop · 中一核心：閱讀工作坊** card with the visible **S1 CORE · 原創練習** label. It loaded all 12 original questions across a student profile, a friendly email and a blog entry. A sampled task displayed the full text, four answer choices and an English-first question with Traditional Chinese support.

The local P6 Apply route loaded the 16-question **S1 Core: Grammar in context** module and the 18-question **S1 Core: Vocabulary builder** module. The grammar task displayed a school-life context, four answer choices and a bilingual sentence-completion prompt. The vocabulary task displayed a learning-habit or school-community situation, four options and a Chinese meaning cue. Both modules correctly used the existing immediate-feedback practice flow.

The local P6 Listen route loaded the eight-item **S1 Core: Listening lab** module. A sampled Timetable Change Announcement question showed a replayable audio control, four options and a bilingual question. The separate three-task **S1 Core: Speaking studio** loaded a model-audio control, an English-first/Traditional-Chinese task prompt and a spoken self-check.

The local P6 Write route loaded three **S1 Core: Writing workshop** tasks: friendly email, short recount and school-improvement notice response. Each task displayed the explicit **S1 CORE WRITING · 原創練習** label, a bilingual task, planning/self-check prompts, a long-response input field and an 80-word minimum writing self-check. The interface explicitly states that it records a completion self-check rather than issuing an automated language-quality score.

JavaScript syntax checks for `app.js` and `s1-core-path.js` passed. The updated `node .quality-audit.js` run passed all platform thresholds and validated 60 S1 Core items: 16 grammar, 18 vocabulary, 12 reading, 8 listening, 3 writing and 3 speaking tasks.

**Deployment follow-up:** Publish the S1 Core Path release, then perform the same P6 route checks on the GitHub Pages URL after the Pages build completes.

## S1 Core Path — Public deployment verification

GitHub Pages build run `32441225262` for commit `41632c8` completed successfully. The public P6 page at <https://leung-tech.github.io/English-web/> displayed all six S1 Core modules with the required **S1 CORE · 原創練習** label: Grammar in context (16), Vocabulary builder (18), Reading workshop (12), Listening lab (8), Writing workshop (3) and Speaking studio (3). The public Read route selected the S1 Core Reading workshop correctly and reported **12 QUESTIONS · 12 題**, confirming that the versioned data and application scripts were deployed together.

## S2 Develop — Local interface verification

The local P6 page displayed six new **S2 Develop · 中二發展** modules, each carrying the visible **S2 DEVELOP · 原創練習** label. The Apply route contained Grammar in context and Vocabulary choices; the Read route contained Compare and Connect; the Listen route contained Listening choices and Speaking choices; and the Write route contained Writing choices.

A local S2 Compare and Connect session opened successfully with a pair of original texts. The reading panel showed the S2 original-paired-text label, both labelled source texts, each text’s stated English and Traditional Chinese purpose, and four answer choices. This confirms that the new paired-text renderer is connected to the normal practice flow.

The remaining S2 local checks also passed. Grammar in context opened with a contextual sentence, bilingual prompt and four options; Vocabulary choices opened with four word-choice options and Traditional Chinese meaning support. Listening choices showed four options and the replay-audio control. Speaking choices showed both model-audio replay and a spoken self-check. Writing choices showed the **S2 DEVELOP WRITING · 原創練習** label, planning/self-check panels, a long-response text area and the explicit 100-word minimum self-check statement.

## S2 Develop — Public deployment follow-up

GitHub Pages workflow `32441759166` for commit `13e4dd4` completed successfully. However, the first public P6 page check still displayed the previous five Read-route modules and did not show the S2 Develop reading card. This is treated as a deployment/cache verification issue; the published HTML and versioned asset URLs must be checked before marking S2 public verification complete.

Repository and network checks confirm that commit `13e4dd4` is on the GitHub Pages `main` source and that the public `index.html` response already references `s2-experiences-and-choices.js?v=20260821-s2develop1` and `app.js?v=20260821-s2develop1`. The browser-rendered module list remained stale even after cache-busted page URLs, so the next diagnostic checks the runtime-loaded script content rather than the published HTML alone.

Runtime diagnostics found that the public document referenced the S2-versioned data and application scripts, the S2 data object existed, and a fresh network fetch of `app.js?v=20260821-s2develop1` contained the S2 routes. The rendered route still lacked S2 cards, which is consistent with an already loaded stale script resource in the validation browser. The release will therefore use a new, never-before-requested asset version for both the S2 data and application script before the final public check.

After the updated asset-version deployment, the public P6 Read route rendered all six expected cards, including `s2-develop-reading`. The public runtime reported the new `s2develop2` data and app script URLs and a live `S2_EXPERIENCES_CHOICES` object. The earlier stale-route display is therefore resolved; final checks can now proceed through the S2 interactive sessions.

The final public session checks passed for S2 paired reading and listening. The reading workshop displayed its original-practice label, two source texts, two bilingual-purpose blocks, four answer choices and a Traditional Chinese question prompt. The listening workshop opened the School Trip Planning Meeting with a replay-audio control, four choices and a Traditional Chinese question prompt.

The final public writing and speaking checks passed. The writing workshop opened the recommendation-email task with the **S2 DEVELOP WRITING · 原創練習** label, a long-response input, bilingual 100–120 word target and writing self-check support. The speaking workshop opened a 45–60 second comparison task with English-first wording, Traditional Chinese support, a replayable model-audio control and a speaking self-check. All six S2 Develop modules have now been verified publicly.

## Gemini-editable standalone HTML pages — Local verification

The new `gemini-pages/index.html` displayed the six S2 standalone lesson cards and clear navigation back to the existing full platform. The independent `s2/s2_read_compare_connect.html` page loaded without the legacy single-page application. It rendered the original-practice notice, bilingual title, two labelled reading texts with English/Traditional Chinese purpose statements, four answer choices, standalone progress information and an editing note that identifies the data file.

The standalone S2 reading answer flow marked the correct choice, displayed English and Traditional Chinese feedback, and recorded one completion in the standalone browser-only progress store. The separate standalone listening page loaded a bilingual listening prompt, four choices and the replay-model control for the School Trip Planning Meeting, confirming that the shared lesson engine works across different HTML pages.

The standalone S2 writing page displayed the bilingual task, planning panel, long-response input and 100-word minimum. A local interaction test at exactly 100 words accepted the checked self-reflection and displayed a completion-only message; it did not claim to evaluate writing quality. The standalone browser-only progress store then contained the additional completed task.

The standalone S2 speaking page loaded the bilingual 45–60 second task, replay-model control and self-check. A local completion interaction displayed a completion-only message. The page did not show any automated spoken-English quality score or assessment claim, preserving the required student safeguard.

## Gemini-editable standalone HTML pages — Public deployment verification

GitHub Pages workflow `32443116010` for commit `224b232` completed successfully. The public Gemini workspace at <https://leung-tech.github.io/English-web/gemini-pages/> displayed six S2 standalone HTML lesson cards and the link to the editing guide. The public standalone reading URL loaded its original-practice notice, bilingual paired-text reading content, two purpose blocks, four interactive answer choices and the local-only progress description. The multi-page HTML workspace is publicly available without changing the original full learning platform.

## S2 Connect: Messages and Media — Local platform verification

The local full platform loaded `window.S2_MESSAGES_MEDIA` and, after selecting P6, rendered all six new S2 Connect modules with the original-practice label. The Apply route contained Grammar in Context and Media Messages; Read contained Sources and Voices; Listen contained Hear the Message and Report and Respond; Write contained Inform an Audience.

The local S2 Connect reading practice loaded a two-text paired-reading layout with the `S2 CONNECT · ORIGINAL PAIRED TEXTS` label and a bilingual purpose question. Listening, writing and speaking routes also loaded their respective S2 Connect prompts in the main practice view; their visible control labels were then checked separately because the verification page uses existing control identifiers rather than the provisional selector names used in the first DOM probe.

The S2 Connect speaking task displayed the existing `Play audio` control and speaking self-check. The S2 Connect writing task displayed the bilingual Responsible Online Notice prompt, a long-response text area and the 100–120 word target. These controls use the established platform element names and retain completion-only self-checking rather than automated quality scoring.

## S2 Connect: Messages and Media — Gemini standalone verification

The local standalone page `gemini-pages/s2/s2_connect_read_sources_voices.html` loaded the S2 CONNECT original-practice label, the `s2-messages-and-media-data.js` editing reference, two labelled texts, four answer choices and the shared feedback flow. Selecting the correct answer marked one option as correct and displayed the expected English and Traditional Chinese explanation.

## S2 Connect: Messages and Media — Public deployment verification

GitHub Pages workflow `32444165167` for commit `bb5afad` completed successfully. The public platform loaded `window.S2_MESSAGES_MEDIA`; after selecting P6, all six S2 Connect module identifiers were present across the language, reading, listening and writing routes.

## S2 Action: Community and Environment — Local platform verification

The local full platform loaded `window.S2_COMMUNITY_ENVIRONMENT`. After selecting P6, the S2 Action original-practice cards appeared across all four routes: Grammar in Context and Community Words in Apply; Community and Environment in Read; Hear the Plan and Recommend and Report in Listen; and Propose a Change in Write.

The local S2 Action paired-reading module showed the `S2 ACTION · ORIGINAL PAIRED TEXTS` label, two source texts, a bilingual question and four options in the full platform. The Gemini standalone page loaded the same two texts and 12-task sequence, showed `data/s2-community-and-environment-data.js` as the editing source, and used the new registry-provided learning focus: Evidence and action.

The expanded S2 Connect standalone grammar page displayed a 24-task sequence and its data-file reference. The S2 Action standalone listening page displayed a 12-task sequence, the Green Week briefing, four options, the browser speech replay control and the third-unit editing reference.

Selecting the correct S2 Action listening option marked the correct choice, returned the expected English and Traditional Chinese explanation, and revealed the listening transcript after checking the answer.

## S2 Action and S2 Connect expansion — Public deployment verification

GitHub Pages workflow `32542545903` for commit `c1c6b11` completed successfully. The public platform loaded `window.S2_COMMUNITY_ENVIRONMENT`; after selecting P6, all six S2 Action module identifiers were present across the language, reading, listening and writing routes.

The public S2 Connect grammar module opened with `Question 1 of 24`, four interactive options and bilingual content. The public Gemini S2 Action reading page displayed the Original Practice label, the two School Refill Station texts, 12-task sequence, four options, the third-unit data-file reference and the registry-defined Evidence and Action learning focus.

S2 Action advanced enhancement local verification: `gemini-pages/s2-action-complete.html` loaded all eight complete-unit navigation areas. The Advanced Writing Lab displayed the bilingual 140–170-word Green Canteen proposal, all three original source-pack cards, four-part paragraph map, language bank, draft field, word target and explicit completion-only self-check. The responsive desktop layout kept the navigation and source cards readable.
S2 Action complete-preview dialogue verification: the Community Dialogue Lab displayed the Green Canteen Meeting with both role labels, line-by-line dialogue, role-A/role-B/full-dialogue replay controls, useful-language prompts and the first checkpoint. Selecting the evidence-and-support-plan response then checking it highlighted the correct answer and displayed the English explanation with immediate Traditional Chinese support.
S2 Action enhancement main-platform verification: after selecting P6 locally, the Write route showed 9 practice options and the Listen route showed 15 practice options, reflecting the added S2 Action Advanced Writing Lab and Community Dialogue Lab entries alongside the existing S2 routes.
The local P6 Write route rendered a ninth practice card: `S2A+ S2 Action: Advanced writing lab / 中二行動：進階寫作室`, with the evidence-led source-pack description and S2 ACTION original-practice label.
The local main-platform S2 Action Advanced Writing Lab started successfully. Its student practice page showed the bilingual source pack, 140–170-word proposal brief, four-part evidence-led plan, language bank, writable response field and 140-word completion threshold without claiming automated writing-quality assessment.
The local standalone `s2_action_dialogue_community_environment.html` page loaded four dialogue checkpoints with the complete Green Canteen meeting, A/B replay buttons and the shared lesson engine. Selecting the evidence-and-support-plan choice and checking it displayed the correct result with the English explanation and Traditional Chinese support.
Public deployment verification: `gemini-pages/s2-action-complete.html?release=s2action2` loaded the complete S2 Action interface with all eight learning areas. The public Advanced Writing Lab displayed the original three-card source pack, bilingual 140–170-word brief, four-part paragraph map, language bank, writable draft area and completion-only self-check.
Public dialogue verification: the complete S2 Action page displayed the Green Canteen Meeting with A/B/full-dialogue replay controls, all dialogue lines, useful language, a bilingual evidence-led checkpoint and four response options. The shuffled correct response remained the evidence-and-support-plan option.
Primary–secondary split local verification: the simplified Primary English Studio displayed shorter home-page directions and an explicit S1–S2 secondary link. After selecting P6, the Read route showed only three primary modules, while route counts were Read 3, Write 4, Listen 5 and Apply 4. No S1 Bridge, S1 Core, S2 Develop, S2 Connect or S2 Action card appeared in the primary P6 route.

## Primary–secondary split verification

The simplified Primary English Studio was opened locally with its short bilingual directions and dedicated **S1–S2 · 中學版** navigation link. At P6, the four route counts were Read 3, Write 4, Listen 5 and Apply 4; no S1 Bridge, S1 Core, S2 Develop, S2 Connect or S2 Action card appeared in the primary route.

The independent Secondary English Studio opened separately with the five stage choices S1 Start, S1 Core, S2 Develop, S2 Connect and S2 Action, as well as a clear original-practice disclaimer and browser-local progress statement. During verification, the S2 Action paired-reading dataset exposed a shape mismatch. The converter was corrected and now displays the “School Refill Station” Text A/Text B pair, bilingual prompt and 1/12 question counter correctly.

The S2 Action write route was also verified locally. It shows three standard proposal-writing tasks and a separate Advanced Writing Lab. The advanced task displays its three-part source pack, 140–170 word prompt, four-part paragraph map, language bank, local word counter and clear notice that completion recording is not automated language-quality scoring.

The S2 Action Listen & Speak route was verified after the final data-conversion and dialogue updates. It displays the replayable listening task, Community Dialogue Lab and speaking task. In the dialogue lab, both A/B role turns, four checkpoint choices, answer marking, bilingual explanation and next-dialogue control were tested successfully. The final local quality audit passed for all six primary grades, seven writing models, Pre-S1 resources, S1 Core, and all three S2 modules; the Gemini standalone-page audit also passed all 20 pages and 213 content items. JavaScript syntax checks and the whitespace-difference check completed without errors.

Public deployment verification began successfully at the cache-busted primary URL. The deployed home page shows the simplified “Choose a year. Pick a skill. Start practising.” instruction and a visible **S1–S2 · 中學版** link in the top navigation.

The public P6 route was checked next and showed only three reading, four writing, five listening and four language-use primary modules; no S1 or S2 module card was present. The public Secondary English Studio then opened at `/secondary/` with separate Primary return navigation, all five S1–S2 stages, bilingual support, original-practice labels and browser-local progress wording.

On the public S2 Action page, the paired-reading task loaded both Text A and Text B with four answer options. The Community Dialogue Lab also loaded with four selectable bilingual checkpoint choices and a Check Answer control, confirming that the interactive S2 Action content is live on the independent secondary entry page.

S1 Extend local verification: the independent secondary page now lists the new **S1 EXTEND · Community & Voice** stage. Its Community Reading module loaded successfully with a full bilingual passage and four selectable answer options.

S1–S3 local expansion verification: the secondary interface now shows eight learning stages from S1 Start to S3 Ready and a browser-local skill-progress summary. The S3 Ready source-evaluation reading task loaded paired Text A/Text B context with four answer options.

The S3 formal-writing draft feature was tested locally. A nine-word draft was saved under the browser-local draft namespace, survived a route change and reappeared when the writing route was reopened; the student-facing clear-draft control is present. No account, upload or automated language-quality score is used.

The S1–S3 expansion audit passed: S1 Extend contains 18 grammar, 20 vocabulary, 12 reading, 12 listening, 4 writing, 4 speaking and 2 dialogue tasks; S2 Consolidate contains 12 grammar, 12 vocabulary, 8 paired-reading, 8 listening, 3 writing, 3 speaking and 2 dialogue tasks; S3 Ready contains 12 grammar, 12 vocabulary, 8 paired-reading, 8 listening, 4 writing, 4 speaking, 2 dialogue tasks and one advanced source-led writing lab. The existing site content audit, Gemini-page audit and whitespace-difference check also passed. S2 Consolidate’s paired-reading view was sampled locally and displayed both sources with four selectable answers.

Public S1–S3 verification succeeded at the cache-busted secondary URL. The deployed page lists all eight S1–S3 stages and the local skill-progress summary. S3 Ready loaded paired Text A/Text B source evaluation with four choices; its Write route listed both Formal Response and the Advanced Writing Lab.

S1–S3 interaction extension local verification: S3 Critical Writing Lab displayed four source-pack cards and a four-step paragraph map. The S3 Critical Dialogue Lab loaded its bilingual role-play with four selectable checkpoint options and the answer-check control.

S1–S3 interaction and critical-thinking extension audit passed. Each new year-level extension contains 12 contextual grammar questions, 4 structured speaking tasks and 3 checkpointed role-play dialogues. S3 Critical Plus additionally contains two 180–220 word evidence-led writing source packs. Existing site and Gemini-page audits also passed.

Public interaction and critical-thinking verification succeeded at the cache-busted secondary URL. S3 Critical Writing Lab displayed four source-pack cards and four paragraph-map steps, while S3 Critical Grammar Clinic loaded question 1 of 12 with four selectable answers.

S1–S3 vocabulary-game and S3 speaking-simulation local verification: S1 Phrase Builder displayed a three-item phrase bank, four answer options and a phrase-check control. S3 Speaking Simulation Toolkit loaded scenario 1 of 3, a playable model response and four descriptive rubric dimensions.

S1–S3 vocabulary games and S3 speaking simulations passed local validation and expanded audit. Each year level has six interactive phrase-game rounds; S3 has three original exam-style practice scenarios, each with a model response, target language, four descriptive rubric dimensions and self-check prompts. The rubric is explicitly not an official marking scheme and does not generate an automated score.

Public vocabulary-game and speaking-simulation verification succeeded at the cache-busted secondary URL. S3 Precision Challenge loaded round 1 of 6 with a three-item phrase bank and four selectable answers. S3 Speaking Simulation Toolkit loaded scenario 1 of 3 with four rubric dimensions and the explicit non-official, non-automated-score notice.

S1–S2 varied-practice local verification: S1 Practical-text Reading loaded four questions with four selectable answers. S2 Paired Message Reading loaded dual Text A/Text B context, question 1 of 4 and four selectable answers.

S3 varied-practice local verification: Applied Source Review loaded paired Text A/Text B, question 1 of 4 and four selectable answers. Applied Writing Planners loaded planner 1 of 2 with a five-step plan and language bank.

S1–S3 varied-practice audit passed. New coverage adds practical and paired-source reading, key-detail and panel listening, contextual sentence repair, evidence editing, precision editing and writing planners. S1 includes 6 grammar, 4 reading, 8 listening and 1 writing-planning item; S2 includes 6 grammar, 4 paired-reading, 4 listening and 1 proposal planner; S3 includes 6 precision-editing, 4 applied source-review, 4 panel-listening and 2 applied writing-planning items. Existing site and Gemini-page audits also passed.

Public varied-practice verification succeeded at the cache-busted secondary URL. S3 Applied Source Review loaded paired Text A/Text B with four answer options; Panel Listening loaded a replayable script and four answer options; Applied Writing Planners loaded planner 1 of 2 with five planning steps.

S3 DSE-preparation grammar and progress-dashboard local verification succeeded. After three correct Senior-secondary Grammar Lab answers, the module feedback showed 100% (3/3) with the secure-practice next step, while the S3 stage dashboard displayed 100% objective accuracy and Apply-route accuracy. The dashboard stated that it is local-only, not a diagnostic or score prediction, and that writing/speaking are not automatically scored.

S3 DSE-bridge writing local verification succeeded. The first model displayed a three-card source pack, four paragraph-map steps, a language bank, an original model exemplar and an explicit non-official-script notice. After recording a 205-word draft, the completion total updated locally while S3 objective accuracy stayed at 3/3 and no Writing objective score was created, confirming that writing completion is not automatically assessed for language quality.

DSE-preparation and local-progress-system quality audit passed. S3 DSE Prep includes 12 advanced grammar items and 2 original advanced writing models. The S1–S3 dashboard records only objective-question attempts, correct answers, accuracy by active stage and skill, and an evidence-based next step after at least three items. Writing and speaking remain completion/self-check activities without automated language-quality or speech scoring; records and drafts remain local and can be cleared.

Public S3 DSE-preparation and learning-insights verification succeeded at the cache-busted secondary URL. Senior-secondary Grammar Lab loaded question 1 of 12 with four answer options. DSE Bridge Writing Models loaded model 1 of 2 with a three-card source pack, original exemplar and non-official-script notice. The published dashboard also retained the explicit statement that writing and speaking are not automatically scored.

S1–S2 grammar-quest and genre-writing local verification succeeded. S1 Grammar Quest loaded round 1 of 12 with a three-item Grammar clues bank and four answer choices. S2 Narrative & Argument Scaffolds loaded item 1 of 2 with a three-card prompt pack, five-step paragraph map and original model exemplar.

S1–S2 grammar-quest and genre-writing quality audit passed. S1 Grammar Quest includes 12 basic-to-intermediate contextual rounds and S2 Grammar Quest includes 12 intermediate argument-building rounds. Each year has two original genre scaffolds: narrative and argument, each with a source/prompt pack, paragraph map, language bank, model for analysis and self-check. Existing site and Gemini-page audits also passed.

Public S1–S2 grammar-quest and genre-writing verification succeeded at the cache-busted secondary URL. S1 Grammar Quest loaded round 1 of 12 with a three-item Grammar clues bank and four answer choices. S2 Narrative & Argument Scaffolds loaded item 1 of 2 with a three-card pack, five-step plan and original model exemplar.

Local integrated-skills verification: S3 Integrated Skills Assessment loaded 1/8 with three source/listening materials and four response options; Listen-to-Speak Simulations loaded 1/2 with replay control, listening-note targets and four rubric rows. The new S1 Grammar Quest hero entry opened the intended quest and allowed answer selection, but the post-check correct-state class did not appear in the initial browser-console check. This interaction display issue requires correction before release.

S1 Grammar Quest interaction follow-up: the initial selection state rendered but the browser-console check did not trigger the prior check handler. The check control was refactored to use an explicit `checkCurrentAnswer` handler assigned directly to each check button; syntax verification passed before retesting.

Root cause found for the S1 Grammar Quest check display: `renderGame` attempted to call objective feedback with an undefined `module` reference after answer checking, which interrupted rerendering. The game renderer signature was corrected to receive the current module from `renderItem`; a full syntax and interaction retest follows.

S1 Grammar Quest demo retest succeeded after the renderer fix. The hero entry opened Grammar Quest 1/12; selecting the correct answer and checking it produced the `option correct` state and the expected bilingual explanation: “Each student is singular, so use wears.”

S3 DSE-bridge integrated-skills and listen-to-speak quality audit passed. The original integrated assessment includes 8 objective questions, the integrated response planner includes 1 source-and-listening-led advanced writing task, and the listening-to-speaking toolkit includes 2 simulations. The S1 live Grammar Quest entry and post-check feedback retest passed after the renderer fix. Existing full-site and Gemini-page audits also passed.

Public integrated-skills and quest-demo verification succeeded at the cache-busted secondary URL. The S1 hero demo produced a correct-answer state and bilingual explanation after selecting and checking the first answer. S3 Integrated Skills Assessment loaded 1/8 with three materials and four answer options; Listen-to-Speak Simulation loaded 1/2 with replay control, listening-note targets and four rubric rows.

Local grammar-bank verification succeeded. S1 Passive Voice Quest and Conditionals Quest each loaded 1/12 with three grammar clues and four choices. The new S1 Grammar in School and Community bank loaded 1/18 with a visible “Complete the message” type label and correct-answer feedback. The S2 evidence-and-viewpoints bank and S3 formal-response bank each loaded 1/18 with four choices and their respective question-format labels.

S1–S3 grammar expansion audit passed. New original content includes 12 S1 Passive Voice Quest rounds, 12 S1 Conditionals Quest rounds, and 18 contextual grammar items each for S1, S2 and S3. All new question banks use defined-answer objective feedback and rotating task labels; full-site and Gemini-page audits also passed.

Public grammar-expansion verification succeeded at the cache-busted secondary URL. S1 Passive Voice Quest loaded 1/12 and produced correct-answer feedback; S1 Conditionals Quest loaded 1/12 with three grammar clues. The new S1, S2 and S3 grammar banks loaded 1/18 each and displayed their contextual question-format labels.

Public S2 vocabulary and S3 formal-response verification succeeded at the cache-busted secondary URL. The S3 hero demo opened Grammar in Formal Response at 1/18, showed the "Edit for a formal response" format label, marked a correct answer and rendered a three-step Hedging and evidence scope DSE-bridge analysis with the original-practice disclaimer. The S2 Meaning in Context Game loaded at 1/24 with its phrase bank and bilingual prompt.

Public advanced-bank verification succeeded at the cache-busted secondary URL. The S1 Phrase Builder Game loaded 1/18, the S1 Grammar in School and Community bank loaded 1/24, and the S2 Meaning in Context Game loaded 1/36. S3 Grammar in Formal Response advanced to 19/30, showed the bilingual "Select the strongest evidence-based revision" format label, marked the correct answer and rendered a four-step DSE-bridge analysis with its transfer note.

Public micro-mission verification succeeded at the cache-busted secondary URL. The S2 Digital & wellbeing missions module loaded 1/6 with a bilingual Digital citizenship Step 1/3 mission card, next-move prompt and immediate correct-answer feedback. Its third task displayed the Step 3/3 respectful-reply completion state. The S1 Phrase Builder Game loaded 1/30.

Public S2 challenge and alignment verification succeeded at the cache-busted secondary URL. The S2 Digital & wellbeing missions module loaded advanced item 7/10 (Distinguish a claim from evidence) and gave correct-answer feedback. The S2 Digital & wellbeing writing challenges loaded 1/2 with a browser-local draft field and a capability pathway note. The S1 START School writing starter loaded 1/2 with a browser-local draft field and a 70–90 word email-reply task.

Public curriculum-framework verification succeeded at the cache-busted secondary URL. The S3 Lexical logic lab loaded 1/12. The S3 Sentence rebuild lab loaded 1/10 and, after the intended chunks were selected, returned green “Accurate rebuild.” feedback with the completed sentence. The S1 Reading strategy lab loaded 1/8. The S2 Formal email & PEEL scaffold loaded 1/1 with a browser-local draft field.

Public S3 advanced sentence-rebuild verification succeeded at the cache-busted secondary URL. The lab loaded 15 items. Item 11/15, “restrictive inversion”, accepted the intended sequence and returned green “Accurate rebuild.” feedback with “Under no circumstances should confidential data be shared without approval.” Item 12/15 displayed the Only when inversion task, and item 15/15 displayed the past participle phrase task.

Public framework-extension-two verification succeeded at the cache-busted secondary URL. S1 Core grammar in context loaded 13/20 with the added past-continuous item. S2 Formal email & PEEL scaffold loaded 1/2 with a local draft field. S3 Lexical logic loaded 13/24 with the added credible source-quality item. S3 Sentence rebuild loaded 19/20 with degree inversion; the intended sequence returned green “Accurate rebuild.” feedback and the complete sentence.

Public Senior English Studio verification succeeded at the cache-busted senior URL. S4 Advanced grammar loaded 1/10 and the correct inversion response returned green “Accurate response.” feedback. S5 Analytical reading loaded 1/8 with its original feature-article context. S6 Debate speech displayed a local draft field, updated the word count and showed the “No automated writing-quality score” boundary.

Public Senior English Studio four-skills verification succeeded at the cache-busted senior URL. S4 Listening loaded 1/6 with original replay and transcript reveal. S6 Oral synthesis showed its public-hearing role card, self-review rubric and no-automated-speaking-quality-score boundary. S5 Formal report writing loaded 1/2 with a precision vocabulary bank, two student models and revision challenges.

Public Senior English Studio Paper 2 and oral verification succeeded at the cache-busted senior URL. S4 Paper 2 displayed four structure cards, four annotated-model segments, six self-review checks and the no-official-mark boundary; a self-review check persisted locally. S4 Oral switched to the Group Interaction and showed peer prompts plus a rubric. S6 Oral switched to the Individual Response and showed the local speaking plan and no-automated-speaking-quality-score boundary.

## S4–S6 Paper 3 skills labs and S1–S3 data-processing bridge

The Senior English Studio now provides one original Paper 3 listening-and-integrated-skills lab at each level. S4 uses a Community Reading Pop-up, S5 uses a Shared Study Space Proposal and S6 uses a Youth Services Information Campaign. Every lab contains one original replayable listening input, three original written sources, six objective note-abbreviation checks, source-selection/self-review records saved only in the current browser, and a source-based response-planning field. Each lab visibly states that it is not an official HKDSE Paper 3, recording, data file, marking scheme, time simulation or score prediction, and that it provides no official Paper 3 or automated writing-quality score.

The S1–S3 curriculum-practice bank was extended with an original data-processing bridge: S1 gained four grammar and four school-notice reading items; S2 gained four grammar and four source-comparison items; S3 gained four evidence/accountability logic items, four cross-source reading items and three formal sentence rebuilds. Current audited totals are S1 24 grammar and 20 reading items, S2 24 grammar and 20 reading items, and S3 28 lexical-logic items, 23 sentence rebuilds and 20 reading items.

Validation completed successfully with `node --check` on all new and updated JavaScript files; `node senior-english-audit.js`; `node secondary-s1-s3-audit.js`; `node secondary-curriculum-alignment-audit.js`; `node .quality-audit.js`; and `git diff --check`. Local browser verification confirmed that S4 Paper 3 rendered the data file, replay control, all six notes, individual bilingual explanations after a 6/6 batch check, local progress update and browser-local response-plan persistence after a reload. S5 and S6 Paper 3 modules each loaded with their level-specific source packs, six note prompts and source-based planning requirements.

Public GitHub Pages verification succeeded after deployment workflow `32621380468` completed for commit `ab41228`. The cache-busted public S4 Paper 3 page showed the P3 navigation, original data file, replay/transcript controls, six note-abbreviation prompts, source-selection and self-review records, source-based planning field, and visible non-official/no-score boundaries. The cache-busted public S1–S3 page also loaded successfully after the same deployment; the committed, published source passed the expanded question-bank and curriculum-alignment audits.
