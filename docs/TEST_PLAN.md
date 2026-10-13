# Test plan

Automate graph correctness, step-free edge exclusion, route optimization, search synonyms/typos, point idempotency and campaign approval. Run TypeScript and ESLint. Smoke all seven journeys in the exported web app with real screenshots; check persistence across reload and reset. Check 360px layout, large text, map control operation and offline bundled assets.

Native release gate: install matching Expo Go, scan local QR on iOS and Android, repeat all journeys, check keyboard, safe areas, VoiceOver/TalkBack, Dynamic Type and reduced motion. This Windows environment cannot establish iOS device results; do not claim unperformed native tests.
