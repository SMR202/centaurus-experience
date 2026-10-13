# QA results — 9 October 2026

## Automated checks

- Strict TypeScript: passed, no errors.
- ESLint: passed using the explicit app/src/tests/scripts/config scope.
- Expo dependency compatibility: dependencies are up to date for SDK 57.
- 11 domain tests: all passed. They cover source/geometry separation, every destination's reachability, stairs exclusion, path continuity/distance, stop optimization, partial/fuzzy/synonym search, expiry and duplicate claims, point reconciliation, parking/reset, approval gating and scripted intent boundaries.
- Production export: web, iOS and Android all passed. Native Hermes bundles are compilation evidence, not device-runtime evidence.

## Seven required journeys

The seven full journeys were rehearsed in Chromium against Expo web at 390 × 844. The production export was then checked at 360 × 800, including offline search and navigation, sheets, secondary flows and reset.

| Journey | Observed outcome |
| --- | --- |
| Adidas | Partial search → details → standard preview 204 m / step-free 216 m → start → pause disables Next → resume → lift floor transition → arrival → restart/end. Distances are synthetic. |
| Drop | Claim created DEMO0001, wallet retained it, voucher detail opened retailer directions. Duplicate claims are blocked by reducer tests. |
| Club | 1,200 → pending sample receipt → +250 = 1,450 → reward −400 = 1,050. Wallet included both reward and voucher. No OCR or real redemption. |
| Parking | B2 / C / 24 saved across reload. Find car traversed two lift floor changes and arrived at the named saved spot. |
| Evening plan | Shopping/dinner/cinema itinerary created, reordered and optimized with 224 m illustrative savings. All three destinations opened and routed. Stop 2 used the preceding stop's origin. Add/remove/restore worked. |
| Step-free | Standard graph used stairs; accessible graph used lift edges. Floor-change instruction, continue, arrival and persistent End control worked. |
| Retailer | Khaadi campaign “The October studio edit” submitted → pending admin queue → approved → consumer Offers/detail. All state stayed local. |

## Additional checks

- Map floor changes, zoom/recenter, Adidas sheet, close, cluster cycling Taana Baana → Restrooms, and sheet details passed.
- Cinema date and sample time selection, planned-booking explanation and clear-selection passed.
- Event interest save/undo and meeting-point route passed.
- Dining cuisine/search, empty result and clear search passed; associated demo-offer links added in final audit.
- Reset cancel and confirmed reset both passed; initial balance restored to 1,200.
- Browser reload preserved local state. Offline production reload, bundled artwork/fonts, Adidas search/details and route preview passed after service-worker installation. Initial test revealed only an uncached automatic favicon request; a local favicon and cache entry were added.
- Narrow 360px and standard 390px screenshots reviewed. A 130% browser text/line-height stress check kept the Home title, hero and controls usable. This is a web proxy, **not** Dynamic Type certification. Native text scaling remains enabled.
- Reduced-motion media preference exercised with navigation. Native runtime screen-reader focus, hardware back, virtual keyboard, home-indicator insets and device-level text scaling remain phone checks.
- Broken source detail pages were handled with pending verification; no hours, ratings, prices, real events or exact coordinates were invented. No placeholder TODO screens.

## Environment limits and known gaps

This Windows machine had no attached Android device/emulator or Android SDK/adb, and no iOS runtime. Therefore neither platform has been manually certified. Repeat the meeting checklist on real iOS and Android phones. Web screenshots are genuine runtime captures, not native-device screenshots. Use the browser build as a fallback, not as evidence of native testing.

No backend is connected. Local storage has a versioned basic shape guard and a visible failure notice, not a production migration/security system. Urdu is architecture only; full translation and RTL layout validation remain future work. Group mode and calendar export were optional and omitted. Mobbin references required a paid plan; public screenshots from the other requested products were reviewed instead.

`npm audit` reported 28 advisory-chain entries (10 moderate, 18 high), involving transitive `braces`, `node-forge`, `decode-uri-component` and `uuid` paths. Suggested automated fixes included incompatible major SDK/router changes, so no forced downgrade was applied. These need dependency-by-dependency review before any production release; no production security claim is made. The demo has no credentialed backend or real commerce.

## Corrections made during QA

Resolved a Windows cross-drive Metro root issue, incompatible host Node version, SVG web responder errors, offscreen navigation clock activity, parking-zone targeting, non-entrance itinerary origin text, map-sheet scrolling, category-inappropriate store artwork and missing dining offer links. Retested the affected functionality. Removed failed-start diagnostic captures from the delivery gallery.
