# Primary–Secondary Interface Split Plan

## Purpose

The current site will be divided into two audience-specific experiences. **Primary English Studio** will remain the default landing page for P1–P6. It will use brief English labels, immediate Traditional Chinese support, fewer choices on each screen, and no S1 or S2 cards. **Secondary English Studio** will be a separate entry at `secondary/` for S1 and S2 original practice.

> This split is about interface suitability, not removing content. Existing S1 and S2 content remains available in the secondary area and remains clearly labelled as original practice rather than official examination material.

## Navigation Design

| Area | URL | Learner | Interface rule |
|---|---|---|---|
| Primary English Studio | `/English-web/` | P1–P6 | Short labels, four skills, compact descriptions, no S1/S2 cards. |
| Secondary English Studio | `/English-web/secondary/` | S1–S2 | More detailed task titles, stage tabs, evidence-based reading and writing, and four-skill practice. |
| Gemini editable secondary pages | `/English-web/gemini-pages/` | Editors | Keeps individual editable HTML lesson pages and complete S2 Action preview. |

## Primary Simplification Rules

The primary home page should only ask learners to choose a year, choose a skill, choose a task, and start. English labels should normally be between one and five words. A single short Traditional Chinese line may support a label. Detailed learning explanations are kept inside an activity or the optional Year Scope page, not on the task-choice board.

The P6 Pre-S1 mock and revision guide remain in the primary version because they are P6 transition preparation. All S1 Bridge, S1 Core, S2 Develop, S2 Connect, and S2 Action cards are removed from the primary task lists.

## Secondary Page Design

`secondary/index.html` will load the existing original S1 and S2 data files, but will use its own `secondary.css` and `secondary.js`. It will show a short stage choice first: **S1 Start**, **S1 Core**, **S2 Develop**, **S2 Connect**, or **S2 Action**. Learners next choose one of four skills. Each practice screen provides only one task at a time, a progress indicator, concise bilingual task support, optional text-to-speech replay, and local-only progress.

The secondary page will use an independent local-storage namespace, so it cannot overwrite primary learners' progress. The current Gemini workspace stays a separate authoring surface rather than the main secondary student home page.

## Editing Boundaries for Gemini

| Change request | Recommended file |
|---|---|
| Add or revise S1/S2 task content | The relevant `s1-*.js` or `s2-*.js` data file. |
| Add a stage or module card | `secondary/secondary.js` module registry. |
| Change the secondary student interface | `secondary/index.html` and `secondary/secondary.css`. |
| Change primary labels or primary-only task cards | `app.js` route list and `index.html`. |
| Make individual editable lesson pages | `gemini-pages/` and its editing guide. |

## Acceptance Criteria

The primary P6 route no longer displays an S1 or S2 card. The primary page remains usable without loading secondary data files. The secondary homepage displays S1 and S2 practice routes independently. Existing question data, bilingual support, browser text-to-speech, and local-only progress continue to work in the secondary interface.
