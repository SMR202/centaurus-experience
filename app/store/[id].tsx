import { Image } from "expo-image";
import { BrandLogo } from "@/components/brand";
import { brandAssets } from "@/data/brand-assets";
import React from "react";
import { Linking, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Bookmark, Check, MapPin } from "lucide-react-native";
import {
  Button,
  Empty,
  Notice,
  PlaceRow,
  Row,
  Screen,
  Section,
  T,
  Tag,
} from "@/components/ui";
import { findPlace, floorLabel, offers, stores } from "@/data/catalog";
import { useDemo } from "@/features/provider";
import { c } from "@/theme/tokens";
export default function StoreDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = findPlace(id);
  const { state, dispatch } = useDemo();
  if (!p)
    return (
      <Screen top={false}>
        <Empty
          title="Destination not found"
          body="Choose a place from the directory."
        />
        <Button
          label="Browse directory"
          onPress={() => router.replace("/explore")}
        />
      </Screen>
    );
  const saved = state.saved.includes(id);
  const offer = offers.find((o) => o.storeId === id);
  return (
    <Screen top={false}>
      <Stack.Screen options={{ title: p.name }} />
      <View style={{ gap: 8 }}>
        <Tag
          text={p.demo ? "ILLUSTRATIVE SERVICE" : p.category.toUpperCase()}
        />
        <Row>
          <BrandLogo id={id} name={p.name} size={64} />
          <T tone="title" style={{ flex: 1, fontSize: 30, lineHeight: 36 }}>
            {p.name}
          </T>
        </Row>
        <Row>
          <MapPin size={16} color={c.goldText} />
          <T tone="small" color={c.muted}>
            {floorLabel(p)}
          </T>
        </Row>
      </View>
      <Button
        label="Directions"
        variant="blue"
        onPress={() =>
          router.push({ pathname: "/navigation", params: { to: id } })
        }
      />
      <Button
        label={saved ? "Saved · tap to remove" : "Save this place"}
        icon={saved ? Check : Bookmark}
        variant="secondary"
        onPress={() => dispatch({ type: "save", id })}
      />
      {brandAssets[id]?.store ? (
        <View style={{ gap: 8 }}>
          <Image
            source={brandAssets[id].store}
            contentFit="cover"
            accessibilityLabel={`${p.name} storefront, published by Centaurus`}
            style={{ width: "100%", height: 210, borderRadius: 14 }}
          />
          <T tone="small" color={c.muted}>
            Storefront from the official Centaurus directory.
          </T>
        </View>
      ) : null}
      <T>{p.description}</T>
      <Notice text="Directions use a synthetic demonstration map. No real location, store inventory or opening hours are available." />
      {offer ? (
        <View style={{ gap: 12 }}>
          <Section title="Demo offer" />
          <Tag text="DEMO PROMOTION" />
          <T tone="title">{offer.title}</T>
          <T tone="small" color={c.muted}>
            Illustrative association only. No retailer participation implied.
          </T>
          <Button
            label="Explore demo offer"
            variant="secondary"
            onPress={() => router.push(`/offer/${offer.id}`)}
          />
        </View>
      ) : null}
      {id === "cineplex" ? (
        <Button
          label="Browse sample showtimes"
          onPress={() => router.push("/cinema")}
        />
      ) : null}
      {!p.demo ? (
        <Button
          label="View official directory source"
          variant="ghost"
          onPress={() => {
            void Linking.openURL(brandAssets[id]?.source ?? p.sourceUrl);
          }}
        />
      ) : null}
      <View>
        <Section title="Keep discovering" />
        {stores
          .filter((x) => x.category === p.category && x.id !== p.id)
          .slice(0, 3)
          .map((s) => (
            <PlaceRow key={s.id} place={s} />
          ))}
      </View>
    </Screen>
  );
}
