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
