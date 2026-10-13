# Iteration 2 verification — 10 October 2026

## Scope

Preserved the local graph, transactions and seven demo journeys. Reworked Home, directory rows, store identity, Offers, Club/You headers, shared press feedback, optional walkthrough, presenter guide, and the complete Directions layout/map rendering. New images are bundled locally and explicitly attributed.

## Automated checks

- TypeScript strict check: passed.
- ESLint: passed after removing the unused navigation import.
- 14 domain tests: passed. Includes graph reachability, step-free exclusion of stairs, route continuity, optimization, search, idempotent claims/points, campaign approval, tour dismissal/reset isolation and guidance remaining-distance/floor transitions.
- Expo exports for web, iOS and Android: passed. These are bundle/asset checks, not physical-device certification.
- The premium web static auditor reported 93 `affordance.actionless-button` findings. Its parser lowercases the native `Button` component and recognizes `onClick`, not React Native `onPress`. These are framework false positives, not 93 dead controls. The app's Button requires `onPress` in TypeScript; the native action audit and browser tests verify the relevant wiring. Preserve the raw report rather than claiming a clean strict-tool result.

## Browser checks in this iteration

Actual running Expo app, 390×844 and 320×667 viewports:

- Optional tour: Next, Back, completion and persisted dismissal after reload. Tour re-entry available in You.
- Search no-results → Clear recovery and segmented-control selected accessibility state verified.
- In-app meeting guide → chapter 01 → Adidas → Directions verified.
- Home/Explore/store: genuine local logos and storefronts; search remains available; Directions precedes the photograph.
- Brand story opens the correct source-backed detail. Real campaigns and claimable demos are separated.
- Demo claim succeeds, creates DEMO-0001, and remains in You.
- Receipt pending → +250 credit → 400-point reward → 1,050 balance, both reward and voucher in wallet.
- Parking B2 / C / 24 saves and routes to that basement zone.
- Route comparison: standard 204 m, step-free 216 m. Preview destination floor, zoom to 125%, recenter, pause/resume, floor handoff, auto-play arrival, restart and End verified. Auto-play remains stopped at the floor transition until confirmation.
- Small phone: End route bottom is at 655px in a 667px viewport after compact-layout fix. The map shrinks on small screens; zoom controls remain available.
- Browser error log: no errors at final navigation review. Reduced motion was enabled in the review browser, and controls remained fully functional.

The earlier complete seven-journey browser rehearsal is recorded in `docs/QA_RESULTS.md`. This iteration replays the changed core surfaces and navigation; assistant/retailer invariants remain covered by domain tests. No claim is made that the unchanged full seven flows were replayed on two physical devices today.

## Remaining validation

Physical iPhone/Android gestures, native font scaling, VoiceOver/TalkBack and non-reduced animation smoothness need a rehearsal on the actual devices. Geometry, positions, timings, vouchers and rewards remain simulations. Official brand creative is copyrighted private-review material with no production permission established. Unknown real store floors remain marked pending; map floors are illustrative.
