# Centaurus — meeting walkthrough

Open **You → Meeting guide · seven live journeys** for buttons into the actual app. Allow 6–8 minutes. Begin with **You → Demo switcher → Reset demo** so points, campaigns and vouchers start from their known state. The optional tour remains dismissed; reopen it from You if needed.

Opening: “The app turns a mall visit into one connected experience: find a destination, reach it comfortably, discover something relevant, and have a reason to return.”

1. **Find Adidas — 60 seconds.** Search from Home, open the real directory identity/storefront, then Directions. The map is now the main surface. Preview Ground and Level 1. Say: “Visitors understand their destination before they start walking.”
2. **Accessible navigation — 60 seconds.** Compare the 204 m standard route with the 216 m lift route. Start, turn Auto on, and let the blue position marker move. The simulation waits at the lift. Explain the floor handoff, press Continue on next floor, and let it reach arrival. Show End route and Restart. All lengths, positions and geometry are synthetic.
3. **Discovery and a voucher — 45 seconds.** Offers → Brand stories shows sourced SAPPHIRE and Outfitters creative. Switch to Demo offers; claim The city in motion. Show the persistent wallet result. Do not describe it as a real Adidas offer.
4. **Return visits — 60 seconds.** Club starts at 1,200 demo points. Submit the sample Khaadi receipt, show pending review, award 250 points, then redeem the 400-point coffee reward. The wallet balance is 1,050. Say: “The visitor can see exactly what happened to their points.”
5. **Parking — 30 seconds.** Save B2 / C / 24, leave the screen, then Find my car. Preview the basement plan. This is manual storage and simulated routing, not plate recognition.
6. **Plan the evening — 45 seconds.** Ask Centaurus for shoes, dinner and a movie. Reorder the three stops, compare optimization, then open the first destination. This is a deterministic local assistant.
7. **The retailer loop — 60 seconds.** Create a local retailer campaign; show the operations approval queue; approve; open Offers → Demo offers. Say: “The consumer experience has an operational counterpart.”

Close: “Which visitor journey should we pilot first, and what operational data can we connect to make it real?”

## Before the room

- Run `npm start` from the supplied workspace launcher, keep the terminal open, and use the same Wi-Fi on the phone and PC. Expo Go opens the QR code. Use `npm run start:tunnel` if the venue blocks local devices from reaching each other.
- Rehearse once on the actual iPhone and Android phone. Browser and bundle checks do not establish device gesture or screen-reader quality.
- Keep a charged phone, laptop preview and the screenshot review available. Source images/fonts are local; the demo has no backend dependency. External source links still require internet.
- Present the artwork as private concept reference. Brand copyright remains with its owners; public release needs clearance. Mall floor plans and indoor positioning must be supplied/validated for a production pilot.

## Reference rationale

[Apple’s map design guidance](https://developer.apple.com/design/human-interface-guidelines/maps/) informed the map-first hierarchy and selective annotation. [Google’s indoor-map guidance](https://support.google.com/maps/answer/2803784?hl=en) informed explicit floor selection. Neither source provides Centaurus geometry or a positioning integration for this prototype.

Creative: [Centaurus directory](https://thecentaurusmall.com/brands/), [SAPPHIRE](https://pk.sapphireonline.pk/), [Outfitters](https://outfitters.com.pk/). Per-file source URLs and rights status are in `assets/brand-provenance.json`.
