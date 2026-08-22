# Gemini Editing Guide｜Gemini 修改指南

This folder is a **static, multi-page HTML workspace** for Primary English Studio. It is designed so you can upload or open the repository in Gemini, ask Gemini to edit one named file, and review a small, clear change rather than changing the entire learning platform at once.

> **Keep the existing root `index.html` platform.** It remains the complete P1–P6, Pre-S1, S1 and S2 learning site. The `gemini-pages/` folder is a clean, independent HTML-first workspace that can grow safely alongside it.

## 1. What each file does

| File or folder | Modify it when you want to… | Avoid changing it when you only want to… |
|---|---|---|
| `index.html` | Change the standalone-lesson directory cards or explanatory text. | Change an individual lesson’s questions. |
| `s2/*.html` | Change a page title, page description, selected skill module, or add a page-specific note. | Edit questions, answers or bilingual feedback. |
| `data/s2-experiences-and-choices-data.js`, `data/s2-messages-and-media-data.js` and `data/s2-community-and-environment-data.js` | Add, remove or revise the matching S2 unit’s questions, passages, scripts, writing prompts, models and Chinese support. | Change the shared layout. |
| `assets/lesson.css` | Change colours, spacing, typography, page layout or mobile display for every standalone page. | Alter answer checking rules. |
| `assets/lesson.js` | Change shared quiz behaviour, local-only progress recording, word count or browser speech playback. | Change one question only. |
| `templates/lesson-template.html` | Create the starting file for a new independent lesson. | Use it as a live lesson without replacing all placeholder text. |

## 2. Safest editing workflow in Gemini

Open `gemini-pages/` and make one focused request at a time. First name the **exact file** Gemini should edit, then state what must stay unchanged. For example:

> “Edit `gemini-pages/data/s2-experiences-and-choices-data.js` only. Add four original S2 vocabulary questions about community projects. Keep English first, Traditional Chinese support, four options per question, and do not change the answer format.”

Then ask Gemini to show the complete changed file or a precise diff. Check the changed question text, the answer index and all Chinese support before replacing the file in your GitHub repository.

| Goal | Recommended Gemini request |
|---|---|
| Add a grammar question | “In `data/s2-community-and-environment-data.js`, add one original grammar item using the current 9-part grammar array format. Test a first conditional or quantity expression in a natural Hong Kong school or community context. Include Traditional Chinese support, four options, correct answer index, English and Chinese explanations, and a bilingual hint.” |
| Change a reading text | “Edit only the `reading.sets` entry with id `s2-mm-rset-2` in `data/s2-messages-and-media-data.js`. Keep two texts and exactly three questions. Preserve English-first wording, bilingual purposes, four options, explanations and hints.” |
| Add a standalone page | “Copy `templates/lesson-template.html` into `s1/s1_read_new_topic.html`. Set its body data attributes and linked data file. Do not change the shared CSS or JavaScript.” |
| Change all page colours | “Edit `assets/lesson.css` only. Keep contrast and mobile responsiveness. Change the blue accent system to a calm green-and-navy system.” |
| Change response behaviour | “Edit `assets/lesson.js` only. Do not remove local-only storage or the original-practice notice. Explain which functions you changed.” |

## 3. Understanding the S2 data files

Three complete S2 units are now available. **S2 Develop: Experiences and Choices** is stored in `data/s2-experiences-and-choices-data.js`. **S2 Connect: Messages and Media** is stored in `data/s2-messages-and-media-data.js`. **S2 Action: Community and Environment** is stored in `data/s2-community-and-environment-data.js`. All use the same six-skill data structure, so it is safer to copy an existing item and revise it than to invent a new format.

The first data file begins with:

```js
window.S2_EXPERIENCES_CHOICES = {
  notice: 'Original S2 practice for lower-secondary learners. It is not an official examination paper.',
  noticeZh: '原創中二初中練習，並非官方試卷。',
  // grammar, vocabulary, reading, listening, writing, speaking
};
```

Keep the outer names `window.S2_EXPERIENCES_CHOICES`, `window.S2_MESSAGES_MEDIA` and `window.S2_COMMUNITY_ENVIRONMENT` unchanged unless you also update `assets/lesson.js`. The shared script now uses its `UNIT_REGISTRY` near the top of the file; add one explicit registry entry when creating a genuinely new standalone unit.

### Objective-question checklist

All grammar, vocabulary, reading and listening items must have a clear correct answer, exactly four choices, English-first content and Traditional Chinese support. The correct answer must remain aligned with the answer index after any option order changes.

| Content type | Minimum required fields |
|---|---|
| Grammar | Unique id, context title/text, Chinese support prompt, four options, answer index, English explanation, Chinese explanation, hint. |
| Vocabulary | Word, Chinese meaning, English definition, example, prompt, correct answer text, four options. |
| Paired reading | Two labelled texts, English/Chinese purpose for each, three questions, four choices each, bilingual explanation and hint. |
| Listening | Script id/title/Chinese title/script plus four questions with bilingual prompts and explanations. |
| Writing | Id, bilingual title/prompt, plan and self-check; no automated quality score. |
| Speaking | Id, bilingual title/prompt, model and self-check; no automated speech-quality score. |

## 4. Create a new page

Copy `templates/lesson-template.html` into the appropriate year folder. Use lowercase underscore file names, for example `p6_write_environment.html`, `s1_read_student_profile.html` or `s2_listen_community_choices.html`.

Change only these values first:

```html
<body
  data-unit="s2-community-and-environment"
  data-module="reading"
  data-page-title="S2 Action Reading: Community and Environment"
  data-page-title-zh="中二行動閱讀：社區與環境">
```

The `data-module` values currently supported by the shared script are `grammar`, `vocabulary`, `reading`, `listening`, `writing` and `speaking`. A genuinely new unit also needs a matching data file, six independent pages, one entry in `assets/lesson.js` inside `UNIT_REGISTRY`, one directory section and matching audit entries.

## 5. Quality requirements for every new page

Each standalone page must retain the following student safeguards. It must label original S1/S2 content as **original practice**, not an official paper. It must show English first and Traditional Chinese as immediate support. Listening must be replayable. Writing and speaking may record a self-check but must not claim to provide automated language-quality assessment. Progress must remain in the browser only.

Before publishing, open the new page on a phone-sized viewport and check that the page can return to `gemini-pages/index.html`, that every button has a readable label, that four choices fit without clipping, and that paired reading moves into one column on a narrow screen.

## 6. Suggested conversion plan for the rest of the site

| Priority | Content to convert | Why it should be next |
|---|---|---|
| 1 | P6 Pre-S1, S1 Bridge and S1 Core | It is closest in structure to the completed S2 standalone pages. |
| 2 | P4–P6 advanced reading, writing, listening and speaking | These use longer texts and structured self-checks that benefit from distinct pages. |
| 3 | P1–P3 phonics, flashcards and games | These may need a small extra shared game module but can use the same folder and naming rules. |
| 4 | Parent / teacher view | Keep it separate because it reads local-only progress across multiple pages. |

## 7. Publish changes

After editing locally or in Gemini, commit the changed files to the `main` branch of the GitHub repository. GitHub Pages automatically republishes the static files. Do not rename or delete `index.html` at the repository root unless you explicitly intend to replace the existing complete platform.
