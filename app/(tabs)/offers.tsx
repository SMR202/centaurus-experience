import { StoryCard } from "@/components/story-card";
import { stories } from "@/data/stories";
import { SegmentedControl } from "@/components/segmented-control";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Chips,
  Empty,
  Notice,
  Row,
  Screen,
  Section,
  T,
  Tag,
} from "@/components/ui";
import { useDemo } from "@/features/provider";
import { allOffers } from "@/features/offers";
import { findPlace } from "@/data/catalog";
import { c } from "@/theme/tokens";
export default function Offers() {
  const { state } = useDemo();
  const [category, setCategory] = useState("All categories"),
    [filter, setFilter] = useState("All");
  const [mode, setMode] = useState("Brand stories");
  const list = allOffers(state)
    .filter(
      (o) =>
        (category === "All categories" || o.category === category) &&
        (filter !== "For you" || state.saved.includes(o.storeId)) &&
        (filter !== "Ending soon" || o.expiresAt - state.clock <= 3600),
    )
    .sort((a, b) => (filter === "Ending soon" ? a.expiresAt - b.expiresAt : 0));
  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <T tone="label" color={c.goldText}>
          DISCOVER SOMETHING NEW
        </T>
        <T tone="title" style={{ fontSize: 30, lineHeight: 36 }}>
          Offers & stories
        </T>
        <T color={c.muted}>Brand inspiration and a preview of mall rewards.</T>
      </View>
      <SegmentedControl
        items={["Brand stories", "Demo offers"]}
        value={mode}
        onChange={setMode}
      />
      {mode === "Brand stories" ? (
        <View style={{ gap: 24 }}>
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
          <T tone="small" color={c.muted}>
            Creative from official brand websites. These are collection
            references, not verified in-store promotions.
          </T>
          <Button
            label="Try a demo offer"
            variant="secondary"
            onPress={() => setMode("Demo offers")}
          />
        </View>
      ) : (
        <>
          <Notice text="Every offer is an illustrative demo promotion. No live discounts or retailer participation are implied." />
          <Chips
            items={["All", "For you", "Ending soon"]}
            value={filter}
            onChange={setFilter}
          />
          <Chips
            items={["All categories", "Style", "Food", "Experience"]}
            value={category}
            onChange={setCategory}
          />
          {list.map((o) => (
            <View
              key={o.id}
              style={{
                gap: 12,
                padding: 20,
                backgroundColor: c.paper,
                borderRadius: 14,
                borderBottomWidth: 1,
                borderColor: c.line,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open ${o.title}`}
                onPress={() => router.push(`/offer/${o.id}`)}
                style={{ gap: 12 }}
              >
                <Row style={{ justifyContent: "space-between" }}>
                  <Tag text={o.kind === "drop" ? "DEMO DROP" : "DEMO OFFER"} />
                  <T tone="small" color={c.muted}>
                    {state.claims.some((x) => x.offerId === o.id)
                      ? "In your wallet"
                      : state.clock >= o.expiresAt
                        ? "Demo expired"
                        : findPlace(o.storeId)?.name}
                  </T>
                </Row>
                <T tone="display" style={{ fontSize: 32, lineHeight: 36 }}>
                  {o.title}
                </T>
                <T color={c.muted}>{o.subtitle}</T>
              </Pressable>
              <Button
                label="View on illustrative map"
                variant="ghost"
                onPress={() =>
                  router.push({
                    pathname: "/explore",
                    params: { place: o.storeId },
                  })
                }
              />
            </View>
          ))}
          {!list.length ? (
            <Empty
              title={
                filter === "For you"
                  ? "Make it your edit"
                  : "No offers in this view"
              }
              body={
                filter === "For you"
                  ? "Save a destination to see its demo offers here."
                  : "Try a different category or show all offers."
              }
            />
          ) : null}
          <Section title="Made for discovery" />
          <T tone="small" color={c.muted}>
            For you uses your saved places on this device. No tracking or
            profiling.
          </T>
        </>
      )}
    </Screen>
  );
}
