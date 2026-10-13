# Implementation log

## 9 October 2026 — checkpoint A
Read full attached master brief. Workspace contains only empty work/ and outputs/ directories; no package manager, repository, source or navigation engine. Chose standalone Expo application. Official brand index accessible; some merchant detail requests fail. Preserve only verified details and label missing floors.

Created product brief, design tokens, decisions and implementation checklist before app implementation. Latest registry Expo is 57.0.27. Host Node 22.12 is below Expo's documented minimum; install an isolated Node 22.16 runtime in work/tools without changing the user's system installation.

## Checkpoint B — full application and first rehearsal
Implemented five tabs and secondary stacks, shared UI, 27 directory-listed merchants plus six explicitly simulated service points, licensed bundled photos and fonts, synthetic graph/Dijkstra routing, all local prototype domains and retailer approval state. No backend or credentials. Added 11 domain tests; all pass. TypeScript passes. Explicit source ESLint passes.

C: ran out of space during dependency installation. Only this task's files were moved to D:/CodexWork/centaurus-01a11f7f. The requested outputs/centaurus-experience path is a directory junction to its project folder. Metro initially failed on cross-drive assets; running the project and dependencies on D: fixed it. work/run.ps1 selects the isolated Node runtime. The final source archive will not contain junctions or dependencies.

Visual checks: 390×844 Home and Club inspected; route floor-change and arrival captured. Fixed SVG responder warnings by replacing press handlers with accessible 48-point native overlay buttons, corrected a decorative SVG accessibility prop for web, made End route a fixed footer, and disabled unavailable reorder/zoom actions. Added a real destination modal sheet. Category artwork now matches fashion, beauty, lifestyle and footwear rather than reusing shoes everywhere.

Journeys already rehearsed: Adidas search → details → standard/lift route comparison → pause/resume → floor transition → arrival → restart/end; drop claim → wallet → directions; sample receipt pending → award → reward → 1,050-point balance; parking B2/C/24 → browse/reload → saved marker route/arrival; evening plan → reorder/optimize (224m illustrative saving in test) → each destination and route → add/remove stop.

Both native platform exports succeeded (iOS and Android Hermes bundles). This is compilation evidence only; no physical device/emulator is available. Web production export succeeds. Replaced Google font barrel imports with four local font files, reducing exported font assets from 28 to 4. Added optional web offline precache generation and a local preview server.

Remaining at this checkpoint: finish retailer workflow smoke, map sheet controls, dining/cinema/events, narrow/large-text/reduced-motion and offline tests; final docs, gallery, meeting checklist, dependency audit notes and portable source ZIP. Review current state before resuming; do not repeat already-passing domain tests without changed logic.

## Checkpoint C — delivery

Completed the retailer submission → admin approval → consumer offer journey. All seven required journeys now pass in the browser. Secondary production checks passed for map selection/cluster cycling, cinema, event interest/undo, dining filters/empty state and reset cancel/confirm. Added associated offer links to dining entries. Final strict TypeScript and ESLint pass; 11 domain tests pass; all three platform exports pass.

Reviewed 360px, 390px and 130% text-proxy screenshots. Re-captured lazy-loaded public reference imagery after load so the research board shows actual app interfaces, not cookie/location overlays. No gated Mobbin material was accessed. Fixed automatic offline favicon requests with an original local SVG; repeated offline reload → search → store → route preview with zero page errors.

Added README, QA_RESULTS, DESIGN_AUDIT, SCREENSHOTS/gallery, MEETING_CHECKLIST and expanded asset licenses. Source archive includes the runnable static web fallback, excludes dependency/cache junctions and is verified for expected entries. The app is ready for browser rehearsal. Native device QA is an explicitly documented environment limit, not claimed complete; see the meeting checklist.

Resume: project sources are at the requested output junction; on this host `work/run.ps1` uses isolated Node 22.16. Dev server uses 8093 and static preview uses 8094. Portable users extract the ZIP and follow README. Do not overwrite source-backed floor facts with synthetic graph levels. Maintain demo labels and reset behavior when integrating approved mapping/content or a real backend later.


## 10 October 2026 — iteration 2
Audited actual Home/Explore/store/Directions screenshots, researched official merchant pages and current retailer campaigns, bundled 51 optimized assets with provenance, and replaced generic shopping surfaces. Added shared motion/brand/story/segmented primitives, optional persistent four-step tour and a seven-journey presenter guide. Rebuilt navigation as map-first, with proportionate map projection, shop/amenity labels, floor preview, completed path, 850ms marker movement, explicit floor handoff, decreasing distance, pause/resume, background suspension, arrival/restart/end and compact small-phone controls. No dependencies were added. Domain count increased from 11 to 14 tests. Read iteration-2/QA.md for the exact validation boundary and the web-only static auditor false positives.
