# Gemini-Friendly HTML Refactor Plan

**Project:** Primary English Studio  
**Status:** Implementation in progress  
**Purpose:** Provide an explicit, static multi-page HTML structure that is straightforward to open, revise and extend in Gemini or another code editor.

## Design decision

The current application remains available as the **legacy all-in-one learning platform** at `index.html`. It already provides P1–P6, Pre-S1, S1 and S2 content, local-only tracking, review storage and the broader navigation experience. Replacing it in one change would risk breaking working lessons and student progress.

A new `gemini-pages/` area will therefore provide the requested editable model. It uses one clear HTML file per student-facing practice experience, a small set of shared CSS and JavaScript files, and one explicit content-data file per unit. The first converted unit is the complete S2 module **Experiences and Choices**. The same pattern can then be applied to P1–P6 and S1 units without changing the existing platform.

> **Editing rule:** Change lesson text and questions in `data/`; change layout in the page HTML files; change visual styling in `assets/lesson.css`; change only reusable practice behaviour in `assets/lesson.js`.

## Proposed directory map

```text
gemini-pages/
├── index.html                              # Page directory and links to every standalone lesson
├── GEMINI_EDITING_GUIDE.md                 # Step-by-step content and UI editing instructions
├── templates/
│   └── lesson-template.html                # Copy this to create a new standalone lesson page
├── assets/
│   ├── lesson.css                          # Shared responsive visual design for all standalone pages
│   └── lesson.js                           # Shared quiz, local progress and speech-synthesis behaviour
├── data/
│   └── s2-experiences-and-choices-data.js  # S2 unit data only; copied from the maintained S2 source
└── s2/
    ├── s2_grammar_experiences_choices.html
    ├── s2_vocabulary_experiences_choices.html
    ├── s2_read_compare_connect.html
    ├── s2_listen_experiences_choices.html
    ├── s2_write_experiences_choices.html
    └── s2_speak_experiences_choices.html
```

## Page contract

Every standalone HTML page declares only four editable settings in its `<body>` element:

| Attribute | Purpose | Example |
|---|---|---|
| `data-unit` | Selects the content unit in the data file | `s2-experiences-and-choices` |
| `data-module` | Selects the skill block | `grammar`, `reading`, `listening`, `writing`, `speaking` |
| `data-page-title` | Browser and visible page title | `S2 Grammar: Experiences and Choices` |
| `data-page-title-zh` | Traditional Chinese support title | `中二文法：經驗與選擇` |

The shared script reads the data, renders one question at a time, provides immediate bilingual feedback, stores standalone completion counts only in the browser, and uses the browser’s SpeechSynthesis API for replayable listening or speaking models. No account, upload or remote data storage is introduced.

## File naming convention for later expansion

| Learning area | Suggested path / filename | Example |
|---|---|---|
| P1–P3 foundation | `p1/`, `p2/`, `p3/` plus skill and topic | `p2_listen_daily_routines.html` |
| P4–P6 practice | `p4/`, `p5/`, `p6/` plus genre or skill | `p6_write_school_improvement.html` |
| Pre-S1 transition | `pre-s1/` plus focus | `pre-s1_reading_cloze.html` |
| S1 core / bridge | `s1/` plus focus | `s1_read_student_profiles.html` |
| S2 development | `s2/` plus focus | `s2_read_compare_connect.html` |
| Data files | `data/<unit>-data.js` | `s2-experiences-and-choices-data.js` |

## Conversion sequence

The S2 unit proves the full pattern across objective questions, paired readings, replayable listening, writing self-checks and speaking models. Once it is accepted, convert the existing content in this order: P6 Pre-S1 and S1, P4–P6 advanced reading/writing/listening, then P1–P3 foundational games. This order preserves the newest and most complex learning flows first while creating reusable conventions for all later pages.

## Compatibility boundary

The new multi-page lessons share **content themes and learning design** with the existing platform, but they do not replace or alter the legacy `index.html`, `app.js` or existing content files in this first refactor. Students can use either entry point. This protects the proven primary platform while giving Gemini a clean and simple HTML-first workspace.
