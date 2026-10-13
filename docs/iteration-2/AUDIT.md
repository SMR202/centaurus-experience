# Iteration 2 audit — 10 October 2026



Goal: a visitor should know where to go; a presenter should demonstrate value without narrating around the UI. Fresh 390×844 browser screenshots were captured before changes. Native screen-reader, phone gestures and hardware performance cannot be inferred from these captures.



1. **Home — functional, weak prioritization.** [Capture](01-before-home.png). Search is clear, but a 355px hero and decorative copy consume most of the viewport. The architecture links unexpectedly to a shoe promotion. Parking is icon-only and the assistant is below the fold. Move visitor tasks before editorial discovery; retain one branded lead image and literal labels. No forced onboarding.

2. **Explore — usable, visually generic.** [Capture](02-before-explore.png). A large serif headline precedes two rows of similar pills; only four merchants fit. Every merchant has the same bag glyph. Use a compact title, true Directory/Map segmented control, recognizable logos and category/floor metadata. Keep search/clear and readable selected states.

3. **Adidas detail — functional, low credibility.** [Capture](03-before-store.png). A generic shoe illustration dominates; real identity and Directions appear much later. Replace with the official directory storefront and brand mark, reduce header height, use meaningful brand copy, and group directions/save. Keep factual floors separate from simulated routes.



Shared fixes: one restrained motion system, compact meaningful labels, source-backed imagery, clear discovery versus claimable-demo content, repeatable optional walkthrough, explicit meeting route. Preserve all local transaction invariants. Screenshots show large controls and legible default text, but do not establish full accessibility compliance.



4. **Directions — rebuilt after the user's explicit follow-up.** [Before](07-before-navigation.png) / [After](08-after-navigation-preview.png). Previously the stretched map was below the start action, tiny letters acted as amenities, and controls competed for attention. The replacement preserves geometric proportions, shows shops/corridors/amenities, draws route and completed segments distinctly, previews floors, and follows the simulated active floor. The fixed action area keeps Continue and End available. A small-phone check found vertical overflow and prompted a compact panel; [320px evidence](15-small-phone-navigation.png) now shows End above the viewport bottom.

## Implemented result

- Recognition: 26 official merchant logos and 22 directory storefront images replace generic merchant sketches; real SAPPHIRE/Outfitters campaign creative gives Home and Offers a concrete editorial identity.
- Hierarchy: search and shortcuts before campaign; Directions before store imagery; literal utility headings; Directory/Map is visually distinct from category filters.
- Control: optional four-step tour, remembered dismissal, Back/Skip, reopen in You; simulation pause, explicit floor handoff and always reachable End.
- Feedback: remaining distance and route progress reconcile with graph edges; arrival is explicit; receipt and wallet flows retain consistent local state.
- Accessibility: 48px primary actions, contained logos, text scaling inherited from native text, reduced-motion behavior, compact navigation for short viewports. Native assistive-technology validation remains outstanding.

[Meeting pitch](MEETING_PITCH.md) · [QA evidence and limits](QA.md) · [Screenshot review](index.html).
