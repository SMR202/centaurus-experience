import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Car, ArrowRight, MapPin } from "lucide-react-native";
import {
  Screen,
  T,
  Row,
  SearchField,
  QuickLinks,
  PlaceRow,
  Section,
  AskEntry,
  Button,
  IconButton,
  Tag,
  Photo,
} from "@/components/ui";
import { BrandLogo } from "@/components/brand";
import { StoryCard } from "@/components/story-card";
import { PressFeedback, Reveal } from "@/components/motion";
import { useDemo } from "@/features/provider";
import { searchPlaces } from "@/data/search";
import { stores } from "@/data/catalog";
import { c, font } from "@/theme/tokens";
export default function Home() {
  const [query, setQuery] = useState("");
  const { state, dispatch, ready } = useDemo();
  return (
    <Screen>
      <Row style={{ justifyContent: "space-between" }}>
        <View style={{ gap: 3 }}>
          <T tone="label" style={{ fontSize: 19, letterSpacing: 3 }}>
            CENTAURUS
          </T>
          <Row style={{ gap: 4 }}>
            <MapPin size={12} color={c.goldText} />
            <T tone="small" color={c.muted}>
              Islamabad ·{" "}
              {state.inside ? "Inside · simulated" : "Plan your visit"}
            </T>
          </Row>
        </View>
        <IconButton
          label="Your parking"
          icon={Car}
          onPress={() => router.push("/parking")}
        />
      </Row>
      <SearchField value={query} onChange={setQuery} />
      {query ? (
        <View>
          <Section
            title="Search results"
            action="All results"
            onPress={() =>
              router.push({ pathname: "/explore", params: { q: query } })
            }
          />
          {searchPlaces(query)
            .slice(0, 5)
            .map((p) => (
              <PlaceRow key={p.id} place={p} />
            ))}
          {!searchPlaces(query).length ? (
            <T>No matches. Try Adidas, coffee or washroom.</T>
          ) : null}
        </View>
      ) : (
        <>
          <QuickLinks />
          <Reveal>
            <StoryCard />
            {ready && !state.walkthroughSeen ? (
              <View
                style={{
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: c.paper,
                  borderWidth: 1,
                  borderColor: c.line,
                  gap: 8,
                }}
              >
                <T style={{ fontFamily: font.bold }}>
                  First visit? Find your way.
                </T>
                <T tone="small" color={c.muted}>
                  A 30-second tour of stores, routes and rewards.
                </T>
                <Row>
                  <View style={{ flex: 1 }}>
                    <Button
                      label="Take a quick tour"
                      variant="secondary"
                      onPress={() => router.push("/walkthrough")}
                    />
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => dispatch({ type: "walkthrough-seen" })}
                    style={{
                      minHeight: 48,
                      paddingHorizontal: 8,
                      justifyContent: "center",
                    }}
                  >
                    <T tone="small">Not now</T>
                  </Pressable>
                </Row>
              </View>
            ) : null}
          </Reveal>
          <View style={{ gap: 14 }}>
            <Section
              title="Your favourite brands"
              action="View all"
              onPress={() => router.push("/explore")}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 18 }}
            >
              {stores.slice(0, 8).map((p) => (
                <PressFeedback
                  key={p.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${p.name}`}
                  onPress={() => router.push(`/store/${p.id}`)}
                  style={{ width: 72, alignItems: "center", gap: 8 }}
                >
                  <BrandLogo id={p.id} name={p.name} size={68} />
                  <T tone="small" numberOfLines={1}>
                    {p.name}
                  </T>
                </PressFeedback>
              ))}
            </ScrollView>
          </View>
          <AskEntry />
          <View style={{ gap: 14 }}>
            <Section
              title="A little extra"
              action="All offers"
              onPress={() => router.push("/offers")}
            />
            <PressFeedback
              accessibilityRole="button"
              accessibilityLabel="See today's drop"
              onPress={() => router.push("/offer/city-edit")}
              style={{
                backgroundColor: c.ink,
                borderRadius: 16,
                padding: 22,
                gap: 14,
              }}
            >
              <Tag text="DEMO DROP" dark />
              <T
                tone="display"
                color="white"
                style={{ fontSize: 32, lineHeight: 36 }}
              >
                The city in motion
              </T>
              <Row style={{ justifyContent: "space-between" }}>
                <T tone="small" color="#D6DCDD">
                  Try a claim. Keep it in your wallet.
                </T>
                <ArrowRight size={20} color="white" />
              </Row>
            </PressFeedback>
          </View>
          <View style={{ gap: 14 }}>
            <Section title="Make an evening of it" />
            <Photo name="dining" height={190} />
            <Row>
              <View style={{ flex: 1 }}>
                <Button
                  label="Find food"
                  variant="secondary"
                  onPress={() => router.push("/dine")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  label="Movies"
                  variant="secondary"
                  onPress={() => router.push("/cinema")}
                />
              </View>
            </Row>
          </View>
          <Button
            label="Events & experiences"
            variant="ghost"
            onPress={() => router.push("/event")}
          />
          <T tone="small" color={c.muted}>
            Independent concept for private review. Brand imagery belongs to its
            owners. Routes, vouchers and rewards are demonstrations.
          </T>
        </>
      )}
    </Screen>
  );
}
