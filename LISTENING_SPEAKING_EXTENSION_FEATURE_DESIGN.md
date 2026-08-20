# Listening and Speaking Extension Feature Design

## Module placement

Three P4–P6-only cards are added beneath the existing **Listen · 聆聽與口語** route. The cards preserve the existing English-first, Chinese-support pattern.

| Module | Session type | Completion action |
|---|---|---|
| Vocabulary flashcards · 聆聽詞彙卡 | Eight tap-to-reveal cards linked to the listening scripts | Reveal the card, listen to the word, and confirm that it can be used in a sentence. |
| Listening quick check · 聽後小測 | Six short replayable audio questions with immediate bilingual feedback | Select an answer and press Check answer. |
| Role-play practice · 角色對話 | Two scenario dialogues with separate Role A and Role B audio prompts | Hear the model, practise both roles, then complete a speaking self-check. |

## Flashcard interaction

The card begins with the English target word. Pressing **Reveal meaning · 顯示意思** opens the Chinese meaning, pupil-friendly definition and a sentence from the listening context. A compact **Play word · 播放字詞** control uses the browser’s English voice. The user must reveal the card before recording a self-check.

## Listening-check interaction

A listening item provides a short audio excerpt, a question and four options. The learner can replay the excerpt before pressing **Check answer · 核對答案**. The answer state is marked immediately, with a bilingual explanation. Incorrect items enter the existing review list so that students can try them again.

## Role-play interaction

A role-play panel has a clear goal, role labels, the written model dialogue and two optional voice controls: **Listen to A · 聽 A 角色** and **Listen to B · 聽 B 角色**. The speaking model is transparent and adaptable; pupils use the supplied useful phrases to vary their own response. The feature deliberately avoids automatic pronunciation scoring or saving recordings.

> This is a low-risk oral-practice design: children keep control of their voice, can practise alone or in pairs, and receive structure without an unreliable automated pronunciation judgement.
