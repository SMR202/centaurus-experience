import React from "react";
import { Switch, View } from "react-native";
import { router } from "expo-router";
import { Car, CreditCard, Settings2 } from "lucide-react-native";
import {
  Button,
  Empty,
  PlaceRow,
  Row,
  Screen,
  Section,
  T,
  Tag,
} from "@/components/ui";
import { findPlace, rewards } from "@/data/catalog";
import { allOffers } from "@/features/offers";
import { useDemo } from "@/features/provider";
import { c, font } from "@/theme/tokens";
export default function You() {
  const { state, dispatch } = useDemo();
  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <T tone="label" color={c.goldText}>
          YOUR VISIT
        </T>
        <T tone="title" style={{ fontSize: 30, lineHeight: 36 }}>
          You
        </T>
        <T color={c.muted}>Welcome, guest. No sign-in needed.</T>
      </View>
      <Button
        label={`${state.member.points.toLocaleString("en-PK")} demo points · Centaurus Club`}
        icon={CreditCard}
        onPress={() => router.push("/club")}
      />
      <View style={{ gap: 14 }}>
        <Section title="Your wallet" />
        {state.claims.length === 0 && state.redeemed.length === 0 ? (
          <Empty
            title="Your wallet is ready"
            body="Claim a demo offer or redeem a Club reward to start your collection."
          />
        ) : null}
        {state.claims.map((claim) => (
          <View
            key={claim.id}
            style={{
              padding: 18,
              backgroundColor: c.paper,
              borderRadius: 14,
              gap: 12,
            }}
          >
            <Tag text="DEMO VOUCHER" />
            <T style={{ fontFamily: font.bold }}>
              {allOffers(state).find((o) => o.id === claim.offerId)?.title ??
                "Demo campaign"}
            </T>
            <T tone="small" color={c.muted}>
              {claim.token} · Not valid for redemption
            </T>
            <Button
              label="View voucher & directions"
              variant="secondary"
              onPress={() => router.push(`/offer/${claim.offerId}`)}
            />
          </View>
        ))}
        {state.redeemed.map((id) => (
          <View
            key={id}
            style={{
              padding: 18,
              backgroundColor: c.paleGold,
              borderRadius: 14,
              gap: 12,
            }}
          >
            <Tag text="CLUB DEMO REWARD" />
            <T>{rewards.find((r) => r.id === id)?.title}</T>
            <Button
              label="Show demo reward token"
              variant="secondary"
              onPress={() =>
                router.push({ pathname: "/club/reward", params: { id } })
              }
            />
          </View>
        ))}
      </View>
      <View style={{ gap: 12 }}>
        <Section title="Your parking" />
        <T color={c.muted}>
          {state.parking
            ? `${state.parking.floor} · Zone ${state.parking.zone}${state.parking.space ? ` · Space ${state.parking.space}` : ""}`
            : "Save a level and zone. Find it again when you’re ready."}
        </T>
        <Button
          label={state.parking ? "Find my car" : "Save my car"}
          icon={Car}
          variant="secondary"
          onPress={() => router.push("/parking")}
        />
      </View>
      <View>
        <Section title="Saved places" />
        {state.saved.length ? (
          state.saved.map((id) => {
            const p = findPlace(id);
            return p ? <PlaceRow key={id} place={p} /> : null;
          })
        ) : (
          <T color={c.muted}>Tap Save on any destination to keep it here.</T>
        )}
      </View>
      <View style={{ gap: 20 }}>
        <Section title="Preferences" />
        <Row style={{ justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <T>Prefer step-free routes</T>
            <T tone="small" color={c.muted}>
              Choose lifts throughout your visit.
            </T>
          </View>
          <Switch
            accessibilityLabel="Prefer step-free routes"
            value={state.stepFree}
            onValueChange={(value) => dispatch({ type: "step-free", value })}
            trackColor={{ true: c.blue }}
          />
        </Row>
        {(["offers", "events"] as const).map((key) => (
          <Row key={key} style={{ justifyContent: "space-between" }}>
            <View style={{ flex: 1 }}>
              <T>{key === "offers" ? "Offer" : "Event"} notifications</T>
              <T tone="small" color={c.muted}>
                Local preference only; nothing is sent.
              </T>
            </View>
            <Switch
              accessibilityLabel={`${key} notifications`}
              value={state.notifications[key]}
              onValueChange={(value) =>
                dispatch({ type: "notify", key, value })
              }
              trackColor={{ true: c.green }}
            />
          </Row>
        ))}
        <T tone="small" color={c.muted}>
          Language: English · Urdu support is planned.{`\n`}No location,
          contacts or notification permissions are requested.
        </T>
      </View>
      <Button
        label="Take a quick tour"
        variant="secondary"
        onPress={() => router.push("/walkthrough")}
      />
      <Button
        label="Meeting guide · seven live journeys"
        variant="secondary"
        onPress={() => router.push("/demo/presentation")}
      />
      <Button
        label="Demo switcher"
        icon={Settings2}
        variant="secondary"
        onPress={() => router.push("/demo")}
      />
      <Button
        label="Privacy, sources & about"
        variant="ghost"
        onPress={() => router.push("/about")}
      />
    </Screen>
  );
}
