import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Chips,
  Empty,
  Photo,
  PlaceRow,
  Screen,
  SearchField,
  T,
} from "@/components/ui";
import { stores, offers } from "@/data/catalog";
import { searchPlaces } from "@/data/search";
import { c } from "@/theme/tokens";
export default function Dine() {
  const [query, setQuery] = useState(""),
    [cuisine, setCuisine] = useState("All");
  const list = searchPlaces(query, "Dining", stores).filter(
    (s) => cuisine === "All" || s.cuisine === cuisine,
  );
  return (
    <Screen top={false}>
      <T tone="label" color={c.goldText}>
        A TASTE OF YOUR DAY
      </T>
      <T tone="display">Stay for the good part.</T>
      <Photo name="dining" height={230} />
      <T tone="small" color={c.muted}>
        Category editorial photo by Ivan Torres; not a restaurant’s menu.
      </T>
      <SearchField
        value={query}
        onChange={setQuery}
        placeholder="Find a café or restaurant"
      />
      <Chips
        items={[
          "All",
          "Coffee",
          "Bakery",
          "Pizza",
          "Asian",
          "Pakistani",
          "Fast food",
        ]}
        value={cuisine}
        onChange={setCuisine}
      />
      {list.map((p) => (
        <View key={p.id} style={{ gap: 10 }}>
          <PlaceRow place={p} />
          {offers
            .filter((offer) => offer.storeId === p.id)
            .map((offer) => (
              <Button
                key={offer.id}
                label={`Demo offer · ${offer.title}`}
                variant="ghost"
                onPress={() => router.push(`/offer/${offer.id}`)}
              />
            ))}
          <Button
            label={`Directions to ${p.name}`}
            variant="secondary"
            onPress={() =>
              router.push({ pathname: "/navigation", params: { to: p.id } })
            }
          />
        </View>
      ))}
      {!list.length ? (
        <Empty
          title="Try another taste"
          body="Clear the search or choose another cuisine."
        />
      ) : null}
      <T tone="small" color={c.muted}>
        Names appear in the official mall directory. Menus, ordering and current
        availability are not connected.
      </T>
    </Screen>
  );
}
