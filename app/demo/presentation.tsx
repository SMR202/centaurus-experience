import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Screen, T, Button, Tag, Section } from "@/components/ui";
import { c } from "@/theme/tokens";
const chapters = [
  [
    "01",
    "Find Adidas",
    "A familiar brand becomes an immediate destination. Show Directions, start the route and advance to arrival.",
    "/store/adidas",
  ],
  [
    "02",
    "Make access effortless",
    "Compare standard and step-free routes. Show the lift transition and the always-available End route control.",
    "/navigation?to=adidas",
  ],
  [
    "03",
    "Turn discovery into a visit",
    "Claim the demo drop, show its wallet state, then open store directions.",
    "/offer/city-edit",
  ],
  [
    "04",
    "Give visitors a reason to return",
    "Submit the sample receipt: 1,200 → 1,450 points. Redeem the 400-point reward: 1,050 points.",
    "/club",
  ],
  [
    "05",
    "Remember the whole visit",
    "Save B2, zone C, space 24. Browse elsewhere, then return to the saved car.",
    "/parking",
  ],
  [
    "06",
    "Connect the evening",
    "Ask for shoes, dinner and a movie. Edit the itinerary and compare the optimized route.",
    "/assistant",
  ],
  [
    "07",
    "Close the retailer loop",
    "Create a local campaign, approve it in operations, then see it appear in Offers.",
    "/demo/retailer",
  ],
];
export default function Presentation() {
  return (
    <Screen top={false}>
      <Tag text="PRESENTER GUIDE · 6–8 MINUTES" />
      <T tone="display">One visit. Seven useful moments.</T>
      <T>
        “Centaurus becomes easier to explore, easier to enjoy, and easier to
        return to.”
      </T>
      <T tone="small" color={c.muted}>
        Each button opens the real interactive journey. Use Back to return here.
        Start from Demo switcher → Reset demo for the point totals below.
      </T>
      {chapters.map(([n, title, body, url]) => (
        <View
          key={n}
          style={{
            gap: 12,
            paddingVertical: 16,
            borderTopWidth: 1,
            borderColor: c.line,
          }}
        >
          <T tone="label" color={c.goldText}>
            CHAPTER {n}
          </T>
          <Section title={title} />
          <T color={c.muted}>{body}</T>
          <Button
            label={`Open chapter ${n}`}
            variant="secondary"
            onPress={() => router.push(url as never)}
          />
        </View>
      ))}
      <Section title="The closing question" />
      <T>
        “Which visitor journey should we pilot first, and what operational data
        can we connect to make it real?”
      </T>
      <T tone="small" color={c.muted}>
        Indoor position, routes, vouchers, points and campaign approvals are
        local simulations. Brand artwork is a sourced reference. No live
        bookings, payments or retailer integrations are connected.
      </T>
      <Button label="Open demo switcher" onPress={() => router.push("/demo")} />
    </Screen>
  );
}
