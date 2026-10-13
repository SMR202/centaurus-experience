import React, { useCallback } from "react";
import { View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Check, Ticket } from "lucide-react-native";
import {
  Button,
  EditorialArt,
  Empty,
  Notice,
  Photo,
  Row,
  Screen,
  T,
  Tag,
} from "@/components/ui";
import { useDemo } from "@/features/provider";
import { allOffers, remainingLabel } from "@/features/offers";
import { findPlace } from "@/data/catalog";
import { c, font } from "@/theme/tokens";
export default function OfferDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useDemo();
  const offer = allOffers(state).find((o) => o.id === id);
  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(
        () => dispatch({ type: "tick", seconds: 1 }),
        1000,
      );
      return () => clearInterval(timer);
    }, [dispatch]),
  );
  if (!offer)
    return (
      <Screen top={false}>
        <Empty
          title="Offer unavailable"
          body="This campaign may have been reset. Discover the current demo edit."
        />
        <Button
          label="Browse offers"
          onPress={() => router.replace("/offers")}
        />
      </Screen>
    );
  const claim = state.claims.find((c) => c.offerId === id);
  const expired = state.clock >= offer.expiresAt;
  return (
    <Screen top={false}>
      <Tag
        text={
          offer.kind === "drop"
            ? "DEMO DROP · CITY EDIT / 01"
            : "DEMO PROMOTION"
        }
      />
      {offer.kind === "drop" ? (
        <Photo name="centaurus" height={210} />
      ) : offer.category === "Food" ? (
        <Photo
          name={offer.id === "coffee-pause" ? "coffee" : "dining"}
          height={260}
        />
      ) : (
        <EditorialArt kind="event" large />
      )}
      <View style={{ gap: 12 }}>
        <T tone="label" color={c.goldText}>
          {findPlace(offer.storeId)?.name} · ILLUSTRATIVE ASSOCIATION
        </T>
        <T tone="display">{offer.title}</T>
        <T color={c.muted}>{offer.subtitle}</T>
      </View>
      {offer.kind === "drop" ? (
        <View
          style={{
            padding: 20,
            backgroundColor: c.ink,
            borderRadius: 14,
            gap: 8,
          }}
        >
          <T tone="label" color="#CBB48E">
            DEMO COUNTDOWN
          </T>
          <T
            tone="title"
            color="white"
            style={{ fontSize: 34, fontVariant: ["tabular-nums"] }}
          >
            {remainingLabel(offer.expiresAt - state.clock)}
          </T>
          <T tone="small" color="#CBD1D0">
            Synthetic clock · runs while this screen is open.{`\n`}Reset demo
            restores the full hour.
          </T>
        </View>
      ) : null}
      <Notice text="Demonstration only. This is not a real offer, discount or retailer release. No purchase is required; this voucher has no monetary value." />
      {claim ? (
        <View
          style={{
            padding: 22,
            gap: 16,
            backgroundColor: c.paper,
            borderWidth: 1,
            borderColor: c.line,
            borderRadius: 16,
          }}
        >
          <Row>
            <Check size={24} color={c.green} />
            <T tone="title">Saved to your wallet</T>
          </Row>
          <T style={{ fontFamily: font.bold, letterSpacing: 3 }}>
            {claim.token}
          </T>
          <T tone="small" color={c.alert}>
            Demo — not valid for redemption
          </T>
          <Button
            label="Open my wallet"
            icon={Ticket}
            onPress={() => router.push("/you")}
          />
        </View>
      ) : (
        <Button
          label={expired ? "Demo offer expired" : "Claim demo voucher"}
          icon={Ticket}
          disabled={expired}
          onPress={() => dispatch({ type: "claim", id })}
        />
      )}
      <Button
        label={`Directions to ${findPlace(offer.storeId)?.name}`}
        variant="blue"
        onPress={() =>
          router.push({
            pathname: "/navigation",
            params: { to: offer.storeId },
          })
        }
      />
      <Button
        label="Open destination"
        variant="secondary"
        onPress={() => router.push(`/store/${offer.storeId}`)}
      />
      <T tone="small" color={c.muted}>
        Prototype terms: one claim per demo reset. No stock, scarcity, price
        reduction or official participation is represented. Local claims persist
        on this device.
      </T>
    </Screen>
  );
}
