> **Iteration 2 — 10 October 2026:** Real brand imagery, refined visitor hierarchy, an optional walkthrough, an in-app meeting guide, and rebuilt map-first Directions are now included. See [before/after review](docs/iteration-2/index.html), [meeting pitch](docs/iteration-2/MEETING_PITCH.md) and [QA](docs/iteration-2/QA.md). Brand assets are copyrighted private-pitch references; see [asset rights](docs/ASSET_LICENSES.md).

# Centaurus Experience

A guest-first Expo / React Native prototype for a day at The Centaurus Mall, Islamabad. Five tabs connect directory discovery, illustrative indoor navigation, demo promotions, Club rewards and a saved-car journey. All transactions stay on the device; no credentials or backend are required.

## Run

On the original Windows workspace, run `npm start` from the parent `centaurus-experience-app-expo-router-screens` folder. Its `start-phone.ps1` launcher resolves this project's junction, selects the isolated compatible Node runtime and starts the local Expo CLI in Expo Go mode on port 8082. Do not run `npx expo start` from that parent: the actual Expo package lives inside this application folder. Keep the terminal open and scan its QR code with the phone on the same network. `npm run start:tunnel` is available if LAN access fails (Expo may need its tunnel helper).

Use Node **22.16 or newer** (the SDK's minimum), npm, and a current browser. From this folder:

```sh
npm ci
npm start
```

Scan the Expo QR code on an iOS or Android device with an **SDK 57-compatible Expo Go**. Both phone and computer should be on the same network. Press `a` for an already configured Android emulator; `i` requires macOS and Xcode. If the installed Expo Go does not support this SDK, use an appropriate development build; do not silently change package versions.

```sh
npm run web            # Interactive browser development
npm run typecheck
npm run lint
npm test
npm run export:web     # Static web bundle + offline cache
npm run preview        # http://localhost:8094
```

Run `npm run export:web` to create the `dist/` presentation fallback, then `npm run preview` to serve it. Generated builds are excluded from Git. Open the preview once online, wait for the service worker to install, then reload; bundled imagery, fonts and app routes are cached. A first-ever browser visit still needs the local server. Expo Go cold startup without Metro was **not device-tested**. Prepare a standalone/development build for a truly independent native presentation.

This workstation stores the project and dependencies on D: through junctions because C: ran out of space. The portable ZIP contains ordinary source files and the web build, without those dependency junctions. Extract it to a disk with several GB free and run the commands above. No machine-specific path is required by the app.

## Present

Start at **You → Demo switcher → Reset demo → Reset all demo data**. Initial balance is 1,200 points. Follow [the seven-journey walkthrough](docs/DEMO_SCRIPT.md), use the [screenshot gallery](docs/SCREENSHOTS.md), and complete the [meeting checklist](docs/MEETING_CHECKLIST.md) on the actual presentation phones.

## Structure

```text
app/                 Expo Router tabs, details and workflow screens
src/components/      Native shared controls, artwork and destination sheet
src/features/        Typed reducer, persistence, scripted assistant
src/data/            Official-directory names and separate demo entities
src/map/             Synthetic graph, Dijkstra routing and SVG map
src/theme/           Palette, font and spacing conventions
src/lib/             Initial locale dictionary / Urdu direction metadata
assets/              Local photos, fonts, license texts and provenance
docs/                Product/design, data sources, evidence and handoff
tests/               Routing, state, search and approval invariants
scripts/             Static preview and offline-cache generation
```

## Engineering choices

Expo 57 and Expo Router provide native stacks and tabs. React Native primitives keep screens native; there are no DOM-only screen components. SVG draws the intentionally fictional floor plan and original editorial art. Gesture Handler supports the app shell, and the map has touch panning plus explicit zoom controls. Reanimated animates the simulated position; reduced motion removes its tween. Expo Image and Expo Font load local optimized assets. Lucide supplies consistent icons. AsyncStorage persists a typed reducer's local session. No analytics, camera, notifications, positioning or external AI service is connected. `expo-linear-gradient` is limited to readable photo overlays.

## Truthful boundaries and handoff

27 merchant names were checked against the official directory on 9 October 2026. Only individually supported floor assignments are displayed as confirmed. Other merchants say “Floor confirmation pending.” Synthetic graph floors and distances are **not real mall data**. Offers, counters, films, events, tokens, receipt credit and retailer approvals are visibly demonstrations. Photos show architectural or food context, not participating retailer stock.

No production mapping/localization, POS, payments, bookings, real redemption, fraud controls, push, shared location, AI recommendations or backend security is implemented. The initial locale dictionary is an English foundation with Urdu/RTL metadata, not a complete Urdu translation. Optional group sharing and calendar export were omitted. Admin counts describe this device's real demo state; there are no invented business KPIs.

See [QA results and device limits](docs/QA_RESULTS.md), [design audit](docs/DESIGN_AUDIT.md), [sources](docs/DATA_PROVENANCE.md), [asset licenses](docs/ASSET_LICENSES.md) and [implementation checkpoints](docs/IMPLEMENTATION_LOG.md). Dependency audit findings are recorded in QA; this is not a production security certification. Approved floor plans, content rights and real integration contracts are required before production.
