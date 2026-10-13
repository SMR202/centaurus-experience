# UX contract

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Buttons / form fields | src/components/ui.tsx | shared native controls | primary, secondary, ghost, blue, danger | browser + typecheck |
| Search | SearchField + data/search.ts | local directory | partial, fuzzy, category | domain tests + clear/empty flow |
| Choice controls | Chips and SegmentedControl | local screen state | category / mutually exclusive view | selected states + narrow view |
| Navigation | Expo Router | app/ routes | tabs, stack, sheet | back/close and seven journeys |
| Feedback | Notice / inline local status | reducer state | info, success, recoverable error | claim, credit, reset tests |
| Modal | DestinationSheet / walkthrough | native Modal / Expo stack modal | destination / optional guide | close, skip, back, reduced motion |
| Motion | src/components/motion.tsx | component motion constants | press / entrance | reduced motion + no hidden actions |
| Persistence | features/provider.tsx + state.ts | AsyncStorage version 1 | migration defaults / reset | reducer tests + reload |
| Scrolling | Screen native ScrollView | existing platform behavior | screen / horizontal discovery rail | narrow + enlarged text |

Native primitives are canonical; no DOM forms/tables/selects are needed. Local searches update immediately, clear remains available, no remote race exists. Walkthrough is optional, skippable, reopenable from You, and never blocks guest use. Remember dismissal/completion independently of financial demo state. A meeting guide opens actual existing screens and explains the next action; it does not simulate task completion.

Primary labels name actions (Find a store, Get directions, Save car). Claims and point changes remain idempotent. Show persistent result state after success. Reset requires the existing confirmation. All route geometry/position is synthetic; real campaign inspiration cannot be redeemed. No new network service, login, location permission or tracking is introduced.

Map ownership: `src/map/indoor-map.tsx`; route guidance: `src/map/route-guidance.ts`; graph: `src/map/graph.ts`. Distances decrease by traversed edges, arrival is the terminal node. Auto-play pauses on screen/app background and before any floor transition. Floor preview never changes the route or points. Zoom/recenter are button alternatives to panning. The source of business behavior remains PRODUCT_BRIEF.md and the user’s 10 October iteration request.
