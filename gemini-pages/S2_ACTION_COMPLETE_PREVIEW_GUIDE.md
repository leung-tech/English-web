# S2 Action Complete Preview — Gemini Editing Guide

## Purpose

`S2 Action: Community and Environment` now has a **complete standalone preview**. It lets an editor or learner switch between grammar, vocabulary, paired reading, listening, standard writing, advanced evidence-led writing, community dialogue, and speaking in one browser page.

Open `s2-action-complete.html` to preview the entire unit. It is a static GitHub Pages page and has no account, server, upload, or external API requirement.

## Edit the right file

| If you want to change… | Edit this file | Do not edit unless needed |
|---|---|---|
| Questions, passages, scripts, writing source pack, dialogue turns, Chinese support | `data/s2-community-and-environment-data.js` | The interface or shared interaction logic. |
| The complete preview page’s outer HTML shell, page title, or script/style links | `s2-action-complete.html` | Individual question or dialogue content. |
| Complete-preview colours, mobile layout, cards, dialogue bubbles, and form layout | `assets/s2-action-complete.css` | Quiz answer checking or data structure. |
| Complete-preview navigation, answer checking, speech replay, word count, self-checks, and local progress | `assets/s2-action-complete.js` | A single lesson item. |
| A focused individual page for advanced writing or dialogue | `s2/s2_action_write_advanced_green_proposal.html` or `s2/s2_action_dialogue_community_environment.html` | The matching source data. |
| The original full student platform | `../app.js` and `../s2-community-and-environment.js` | The Gemini complete preview only. |

## Current content structure

The source data object is `window.S2_COMMUNITY_ENVIRONMENT`. Its standard sections are `grammar`, `vocabulary`, `reading`, `listening`, `writing`, and `speaking`. This unit also has a `dialogues` section.

The advanced writing task is inside `writing` and has `level: 'advanced'`. Retain the following fields when revising it: `sourcePack`, `paragraphMap`, `languageBank`, `prompt`, `promptZh`, and `selfCheck`.

Each dialogue in `dialogues` contains `roles`, `dialogue`, `language`, `checkpoints`, and `selfCheck`. Each checkpoint has one exact correct response among four options. Keep the option and `answer` index aligned.

## Safe Gemini requests

> “Edit only `data/s2-community-and-environment-data.js`. In the advanced writing task, replace the source pack with three original school-community facts. Keep the 140–170 word requirement, four-part paragraph map, language bank, Traditional Chinese support, and no automatic quality assessment.”

> “Edit only the second item in `dialogues` of `data/s2-community-and-environment-data.js`. Add one original turn for Role B and revise the two response checkpoints accordingly. Retain two roles, English-first text, Traditional Chinese support, four choices each, explanations, and a safe next step.”

> “Edit only `assets/s2-action-complete.css`. Make the complete preview use a calmer green and sand colour system. Do not remove responsive rules, focus visibility, or the current desktop/mobile layout.”

> “Edit only `assets/s2-action-complete.js`. Add a visible local-progress summary, but do not add accounts, uploads, external data collection, or automated writing or speaking scores.”

## Required learner safeguards

All new material must remain **original practice**, not an official examination paper. Write English first and add immediate Traditional Chinese support. Listening and role dialogue must remain replayable using browser speech. Writing and speaking completion may be recorded locally, but must never claim to assess language quality automatically. Keep progress in browser storage only.
