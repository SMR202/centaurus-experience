# Centaurus Experience — design direction

## North star
A recognizable mall companion that is easy to present. Tasks lead; official brand imagery provides personality. The October 2026 iteration replaces generic editorial sketches on core shopping surfaces with source-backed storefronts, logos and campaign references requested by the user for a private meeting prototype.

## Register and audience
Native visitor product for Islamabad, English now, Urdu later. Home includes editorial discovery; directory, navigation, membership and presentation controls use product hierarchy. No Japan-market scope. Preserve native stacks, tabs, safe areas and text scaling.

## Runtime ownership
`src/theme/tokens.ts` is canonical (Model B): ivory #F7F5F0, white #FFFFFF, graphite #1D2327, muted #697078, line #E7E3DA, ink #142025, gold #AD8C59, text gold #7B6038, route blue #2869DB, success #26745D, alert #B8563F. Components consume these tokens; this document mirrors their meaning.

DM Sans owns task headings, body and controls. Cormorant Garamond is reserved for a small number of editorial titles and Club. 4/8 spacing rhythm, 20–24 outer gutters, 48px minimum targets. Compact functional page headers replace poetic multi-line utility headings. Brand marks use contained images with white space, never redrawn approximations.

## Composition and signature
Home: brand/location → search → four task shortcuts → one authentic seasonal feature → familiar brands → plan the visit / Club. A fine itinerary connector and explicit next stop unify discovery and routing. Campaign images retain their composition; text beneath an image is preferable to covering existing artwork. No auto-advancing carousels.

## Motion
Shared press feedback (small scale, 140ms), one 220ms content entrance, 850ms route marker between simulation steps. Tour steps animate as a coherent panel, never scatter or loop. Reduced motion removes transforms and animated entrances; all actions retain equivalent text/state feedback.

## Content and rights
Public retailer campaigns are source-backed inspiration, not verified in-mall offers. Do not attach a fabricated discount or claim action to a real campaign. Claims remain a separate labeled demo section. Official marks/photos are retained with source URLs and rights-holder attribution for private review; production usage clearance remains pending. Preserve unknown floor labels and synthetic navigation disclosure.

## Indoor navigation revision
Map-first Directions keeps the route canvas above a fixed action area. Correct aspect ratio, contained shop areas, corridors, amenity symbols, blue path and muted completed path distinguish purpose. Preview route floors; active navigation follows the current floor. Lift/stair handoffs require explicit Continue even with auto-play. Pause, remaining distance, arrival, restart and End remain available. All geometry is synthetic. Apple and Google map references inform hierarchy, not copied assets or an assertion of real localization.
