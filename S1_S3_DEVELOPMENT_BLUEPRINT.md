# S1–S3 Secondary English Studio Development Blueprint

## Learning progression

The expanded secondary pathway will use an English-first bilingual interface and retain the existing statement that every task is original practice rather than an official examination paper. The learning journey moves deliberately from accurate everyday communication in S1, through evidence-led and audience-aware communication in S2, to analytical and independent secondary-school readiness in S3.

| Year | Learning focus | Grammar and language use | Reading and listening | Writing and speaking |
|---|---|---|---|---|
| S1 | **Navigate and participate** | Present and past forms, plans and rules, modals, comparisons, pronouns, question forms, basic linkers and paragraph control. | School communication, personal email, notices, blogs, short profiles and structured dialogues. | Friendly and practical school communication, short recounts, clear requests, short presentations and pair role-play. |
| S2 | **Connect and apply** | Present perfect, future choices, conditionals, passive forms, relative clauses, reporting language, comparison, purpose and contrast. | Evidence across paired texts, community issues, media messages, announcements and structured interviews. | Audience-aware email, article, proposal and report writing; evidence-led discussion, recommendation and response. |
| S3 | **Interpret and prepare** | Tense control in extended texts, complex sentences, reported speech, passive voice, modals and degree of certainty, conditionals, cohesive devices and editing for precision. | Articles, features, opinion pieces, data-supported notices, interviews, source comparison and note-taking. | Formal email, feature article, analytical response, proposal, speech and collaborative problem solving. |

## New and extended units

| Stage | Unit ID | Unit | Core context | New core bank target |
|---|---|---|---|---:|
| S1 | `s1-extend` | **S1 Extend: Community and Voice** | School participation, wellbeing, local places and practical communication. | 18 grammar, 20 vocabulary, 12 reading, 12 listening, 4 writing, 4 speaking, 2 dialogues. |
| S2 | `s2-consolidate` | **S2 Consolidate: Evidence and Perspectives** | Source comparison, choices, media literacy and community decisions. | 20 grammar, 22 vocabulary, 12 paired-reading, 12 listening, 4 writing, 4 speaking, 2 dialogues. |
| S3 | `s3-explore` | **S3 Explore: Identity and Perspective** | Identity, interests, culture and point of view. | 20 grammar, 22 vocabulary, 12 reading, 12 listening, 4 writing, 4 speaking, 2 dialogues. |
| S3 | `s3-engage` | **S3 Engage: Information and Influence** | Information quality, media messages, study habits and informed decisions. | 20 grammar, 22 vocabulary, 12 paired-reading, 12 listening, 4 writing, 4 speaking, 2 dialogues. |
| S3 | `s3-ready` | **S3 Ready: Future, Community and Response** | Future pathways, community proposals and structured problem solving. | 20 grammar, 22 vocabulary, 12 paired-reading, 12 listening, 4 writing, 4 speaking, 2 dialogues and 1 source-led advanced proposal. |

## Interaction and tracking design

The data will remain in human-editable JavaScript files, one file per expansion unit, so that a teacher or Gemini user can modify the material without touching the page layout. All new modules will use the existing quiz, vocabulary, listening, writing, speaking and dialogue schemas. The secondary interface will gain a **Progress Overview** showing each selected stage's local completion by skill, a **Mixed Review** module which samples grammar, vocabulary, reading and listening items for a selected stage, and **local saved drafts** for writing tasks. Data never leave the browser.

| Function | Student behaviour | Boundaries |
|---|---|---|
| Skill progress overview | See completed practice by Read, Write, Listen & Speak, and Apply. | Browser-local only; no sign-in or upload. |
| Mixed review | Receive a compact varied practice set from the selected stage. | Feedback explains answers; it is labelled original practice. |
| Saved writing drafts | Return to a locally saved draft for the current writing task. | The site records text locally; it gives no automated score or language-quality claim. |
| Dialogue checkpoints | Select and check purposeful replies within role-play. | Students rehearse and self-check; no speech assessment is claimed. |
| Study guidance | View a concise skill strategy after a completed task. | Guidance supports learning and does not represent official marking criteria. |

## Delivery order

The build will first add the S1 Extend bank and its two dialogues, then add an S2 Consolidate unit to strengthen the existing S2 route. It will then introduce the S3 stage and its three units. Shared functionality is implemented once in `secondary/secondary.js`, so that it applies consistently to S1, S2 and S3. A schema-and-editing guide will accompany the new files.
