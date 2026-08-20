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
