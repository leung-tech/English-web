# S1–S3 to DSE Foundation English Roadmap

**Author:** Manus AI  
**Status:** Proposed next-phase content plan  
**Scope:** Original junior-secondary English grammar and reading modules for the existing Primary English Studio. This is a learning bridge, **not official HKDSE material or a substitute for school teaching**.

## 1. Rationale and boundary

The current P6 transition modules already establish sentence accuracy, short information-text reading, linked-cloze work and purposeful writing. The next strand should introduce **S1–S3 first**, then gradually develop skills that are useful for later senior-secondary English. The Education Bureau publishes English Language Education curriculum documentation for both primary and secondary levels, so the expansion should retain a staged progression instead of presenting DSE work immediately after primary school.[1]

The DSE foundation label should describe transferable habits, rather than replicate official papers. Public HKEAA information distinguishes English Language Papers 1–4 and School-based Assessment; its published samples also separately present Papers 1, 2 and 3.[2][3] The first release should therefore build Paper-1-style reading habits and grammar-in-context accuracy only. Writing, listening and integrated skills can be added after the grammar and reading foundation is stable.

> **Content rule:** Every future S1–S3 and DSE-foundation item must be original, bilingual for learning support, age-appropriate and labelled as practice rather than an official HKEAA question.

## 2. Recommended module architecture

| Stage | Grammar-in-context focus | Reading focus | Student output | Initial content target |
|---|---|---|---|---:|
| **S1 Bridge** | Sentence parts; present/past/future choices; subject–verb agreement; articles; countability; basic conjunctions | Notices, school webpages, profiles, short information articles; retrieve detail and infer simple meaning | Choose, repair and explain one sentence; identify a detail with text evidence | 24 grammar items; 6 passages |
| **S2 Develop** | Present perfect vs past; modals; comparatives; relative clauses; to-infinitive/gerund; adverbial clauses | Blog posts, reports, interviews and two short related texts; purpose, tone and comparison | Complete a short cloze; explain purpose or contrast using evidence | 30 grammar items; 8 passages |
| **S3 Prepare** | Passive voice; conditionals; reported speech; participles; noun phrases; cohesion/reference | Feature articles, opinion texts, reviews and paired perspectives; viewpoint, claim/evidence and vocabulary-in-context | Edit a short paragraph; compare two viewpoints | 36 grammar items; 10 passages |
| **DSE Foundation** | Text-based editing, clause control, cohesion and register choice | Original multi-text reading sets; skimming, scanning, inference, attitude and evidence selection | Timed reading strategy check and an evidence note | 24 mixed grammar/editing items; 6 multi-text sets |

## 3. Learner journey and reusable interaction pattern

Each grade stage should contain two routes: **Grammar in context** and **Reading workshop**. A grammar session should begin with a 60-second diagnostic, present a short context, ask 6–8 objective items, and end with one error-explanation card. A reading session should include the text, question navigation, bilingual support available after the first attempt, and a short “evidence finder” reflection.

The DSE Foundation route should remain locked until the S1–S3 curriculum map is released or clearly marked as an optional preview. It should avoid high-stakes score language. Instead, its result page should report strengths such as “detail retrieval”, “inference”, “text connection” and “editing accuracy”, followed by one recommended S1–S3 practice module.

## 4. Content-release order

| Release | Deliverable | Dependency | Acceptance gate |
|---|---|---|---|
| **A — S1 Bridge** | Grammar in context, short reading workshop, bilingual explanations and a diagnostic | Secondary data schema and module navigation | Every question has a unique ID, answer, explanation, Chinese support and text/source label |
| **B — S2 Develop** | Aspect/clauses pack, comparative-text reading and short cloze | S1 analytics tags and review routing | At least two questions test each stated grammar focus; all passages have purpose and genre labels |
| **C — S3 Prepare** | Editing lab, paired-viewpoint reading and evidence selection | S2 modules and text-comparison renderer | Pair passages are balanced in length and questions cite a clear supporting phrase |
| **D — DSE Foundation** | Original multi-text reading and text-based editing diagnostic | Completed S1–S3 sequence and adaptive review | Clear original-practice disclaimer, no copied HKEAA items, timed mode optional and accessibility tested |

## 5. Shared data and quality rules

Every new item should include `id`, `stage`, `route`, `module`, `objective`, `difficulty`, `prompt`, `promptZh`, `answer`, `explanation`, `explanationZh`, and `tags`. Reading items additionally require a genre label, a passage identifier and an evidence note. Data should be checked for duplicate IDs, valid option indexes, bilingual fields and links between questions and passages.

The first live implementation should remain account-free. Existing local review data can store skills or tags but must not infer a student’s ability from a small number of attempts. Parent/teacher wording should explicitly frame all results as a prompt for the next practice, not as a label.

## 6. Decision for the next build

Proceed with **Release A — S1 Bridge** after the current P1–P3 reward update. It is the most appropriate next module because it extends the existing P6 transition work without prematurely presenting full DSE-style assessment. Its first two units should be:

1. **S1 Grammar in Context: School Life and Routines**, covering subject–verb agreement, articles, countability, time expressions and because/so/although.
2. **S1 Reading Workshop: Finding Evidence**, using six original school-life texts with main idea, detail, vocabulary-in-context and simple-inference questions.

## References

[1]: https://www.edb.gov.hk/en/curriculum-development/kla/eng-edu/curriculum-documents.html "Education Bureau — English Language Education: Curriculum Documents"
[2]: https://www.hkeaa.edu.hk/en/hkdse/assessment/subject_information/category_a_subjects/eng_lang/faq_q/q2.html "HKEAA — FAQs on English Language"
[3]: https://www.hkeaa.edu.hk/en/HKDSE/assessment/subject_information/category_a_subjects/eng_lang/sp/2025.html "HKEAA — English Language Samples of Candidates’ Performance, 2025"
