# Design system

## Direction: a day in the capital
A warm editorial city guide anchored by real Centaurus architecture. Signature: a restrained three-tower line motif on the membership card and architectural framing around imagery. The map uses cool blue wayfinding, while the club uses muted gold. Avoid rendering all modules as identical cards.

Palette: ivory #F7F5F0; white #FFFFFF; graphite #1D2327; secondary #697078; line #E7E3DA; champagne #AD8C59; ink #142025; green #26745D; navigation #2869DB; alert #B8563F. Gold is decorative; small text uses darker ink for contrast.

Type: DM Sans for interface and directions, Cormorant Garamond semibold for selective editorial headlines. Bundled SIL Open Font License fonts. Body 15–16, secondary 13, section 24, display 36–42. Font scaling stays enabled.

Spacing: 4/8 rhythm, 24 outer gutters, 16 internal gaps, 48 minimum control height, subtle 12–20 corners. Main native screen is a scrolling composition. Search precedes hero. Quick links form a compact four-column band. Contextual assistant is in content so it never covers navigation.

Home composition:
```
CENTAURUS                      demo mode
Explore Centaurus
[ Search stores, food & more              ]
[ real architectural photo                ]
[ A little discovery. A whole day.        ]
Store       Offers      Food       Movies
Today at Centaurus                  See all
  editorial feature rail
Ask Centaurus
Home       Explore      Offers      Club     You
```

Map composition: floor chips → bounded pan/zoom diagram → selected place sheet → list/directions. In navigation, the maneuver precedes the map and End route stays fixed in the bottom footer. No real coordinates or location permissions.

Motion: native stack transitions, 220ms location movement, no looping decoration. Reduced motion removes position tween and automatic playback remains explicitly opt-in. Logical start/end spacing supports future RTL; English dictionary is the initial locale.

Plan critique: a generic cream-and-serif shop would obscure wayfinding. We reserve serif for Home, campaigns and Club; directory and route instructions use strong sans-serif. Real architecture gives the hero a specific local identity.


## Iteration 2 refinements
Runtime token ownership is maintained in src/theme/tokens.ts; DESIGN.md describes the current composition. Shared PressFeedback handles 140ms opacity/scale with reduced-motion support; Reveal uses a 220ms fade. BrandLogo contains official marks without stretching. StoryCard keeps copy outside original creative. Utility headers use DM Sans; serif is reserved for editorial stories. IndoorMap owns map projection and visual layers; Navigation owns instruction, floor selection, route status and fixed actions. On short phones the route detail panel scrolls independently to preserve primary actions.
