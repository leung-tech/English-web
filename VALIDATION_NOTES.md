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
