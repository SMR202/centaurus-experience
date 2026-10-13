import { SegmentedControl } from "@/components/segmented-control";
import React, { useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  AskEntry,
  Chips,
  Empty,
  Notice,
  PlaceRow,
  Screen,
  SearchField,
  Section,
  T,
} from "@/components/ui";
import { places, floorIds, findPlace } from "@/data/catalog";
import { FloorId } from "@/data/types";
import { searchPlaces } from "@/data/search";
import { IndoorMap } from "@/map/indoor-map";
import { getNode } from "@/map/graph";
import { c } from "@/theme/tokens";
import { DestinationSheet } from "@/components/destination-sheet";
export default function Explore() {
  const { q, place } = useLocalSearchParams<{ q?: string; place?: string }>();
  return (
    <ExploreContent key={`${q ?? ""}-${place ?? ""}`} q={q} place={place} />
  );
}
function ExploreContent({ q, place }: { q?: string; place?: string }) {
  const [query, setQuery] = useState(q ?? "");
  const [category, setCategory] = useState("All");
  const [floor, setFloor] = useState<FloorId>(
    place && findPlace(place) ? getNode(findPlace(place)!.nodeId).floor : "G",
  );
  const [view, setView] = useState(place ? "Map" : "Directory");
  const [selected, setSelected] = useState<string | undefined>(place);
  const [sheetOpen, setSheetOpen] = useState(!!place);
  const select = (id: string) => {
    setSelected(id);
    setSheetOpen(true);
  };
  const results = searchPlaces(query, category);
  const chosen = selected ? findPlace(selected) : undefined;
  return (
    <Screen>
      <View style={{ gap: 6 }}>
        <T tone="label" color={c.goldText}>
          THE DIRECTORY
        </T>
        <T tone="title" style={{ fontSize: 30, lineHeight: 36 }}>
          Explore
        </T>
      </View>
      <SearchField value={query} onChange={setQuery} />
      <SegmentedControl
        items={["Directory", "Map"]}
        value={view}
        onChange={setView}
      />
      <Chips
        items={[
          "All",
          "Fashion",
          "Shoes",
          "Dining",
          "Beauty",
          "Lifestyle",
          "Entertainment",
          "Services",
        ]}
        value={category}
        onChange={setCategory}
      />
      {view === "Map" ? (
        <>
          <Notice text="Illustrative map. Pins and floors here are simulated; this is not a real mall floor plan." />
          <Chips
            items={floorIds}
            value={floor}
            onChange={(f) => {
              setFloor(f as FloorId);
              setSelected(undefined);
              setSheetOpen(false);
            }}
          />
          <IndoorMap floor={floor} selected={selected} onSelect={select} />
          <DestinationSheet
            place={sheetOpen ? chosen : undefined}
            onClose={() => setSheetOpen(false)}
          />
          <Section title={`On demo floor ${floor}`} />
          {results
            .filter((p) => getNode(p.nodeId).floor === floor)
            .map((p) => (
              <PlaceRow key={p.id} place={p} onPress={() => select(p.id)} />
            ))}
          {!results.some((p) => getNode(p.nodeId).floor === floor) ? (
            <Empty
              title="Nothing on this demo floor"
              body="Choose another floor or clear your search."
            />
          ) : null}
        </>
      ) : (
        <View>
          <Section title={`${results.length} destinations`} />
          <T tone="small" color={c.muted}>
            Merchant names sourced from the official directory.
          </T>
          {results.map((p) => (
            <PlaceRow key={p.id} place={p} />
          ))}
          {!results.length ? (
            <Empty
              title="Let’s try another search"
              body="Try a name, category or service — like “coffee” or “toilet”."
            />
          ) : null}
        </View>
      )}
      <AskEntry />
      <T tone="small" color={c.muted}>
        {places.length} curated destinations and demo service points.
      </T>
    </Screen>
  );
}
