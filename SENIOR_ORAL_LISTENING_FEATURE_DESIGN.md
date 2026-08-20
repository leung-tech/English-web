# Senior Oral and Listening Feature Design

## Listening flow

Senior-primary listening sessions contain four comprehension questions drawn from two short scripts. Before playback, pupils see the question but not the transcript. The **Play audio · 播放錄音** button uses browser speech playback, and the existing replay behaviour remains available. After a pupil checks an answer, the transcript appears with a short explanation. This preserves the useful exam habit of listening for the main idea and details before reading.

## Oral-presentation flow

Each P4–P6 oral task becomes a structured speaking card rather than a single model sentence. The card includes the following layers:

| Layer | Function |
|---|---|
| Topic and duration | States the presentation purpose and target duration, from 45 seconds in P4 to 90–120 seconds in P6. |
| Model delivery | Plays a short exemplar through the same English speech playback control. |
| Four-step plan | Shows Opening, Point 1, Point 2 and Closing with adaptable sentence frames. |
| Key language | Highlights useful connectors and topic phrases without presenting a script to memorise. |
| Speaking self-check | Lets pupils confirm that they gave a complete spoken response at a clear pace. |

## Design principles

The existing bilingual, English-first system is retained. Senior activities receive a **P4–P6 ORAL PRACTICE · 高小聆聽與口語** label, and the speaking plan appears beneath the audio player, before the self-check. The transcript is deliberately hidden until an answer has been checked in listening activities; the oral model can be viewed in its plan immediately because the aim is imitation and adaptation.

## Online publishing approach

The repository is static HTML, CSS and JavaScript, so it can be published as a GitHub Pages site from the `main` branch root. No server-side keys or services are needed. After publishing, the public URL will allow students to use the browser-provided English speech playback directly online.
