import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { ArrowUpRight, ReceiptText } from "lucide-react-native";
import {
  Button,
  Photo,
  Row,
  Screen,
  Section,
  T,
  Tag,
  Towers,
} from "@/components/ui";
import { rewards } from "@/data/catalog";
import { useDemo } from "@/features/provider";
import { c, font } from "@/theme/tokens";
export default function Club() {
  const { state } = useDemo();
  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <T tone="label" color={c.goldText}>
          REWARDS, WITH EVERY VISIT
        </T>
        <T tone="title" style={{ fontSize: 30, lineHeight: 36 }}>
          Centaurus Club
        </T>
        <T color={c.muted}>Your points, rewards and receipts in one place.</T>
      </View>
      <View
        style={{
          padding: 26,
          backgroundColor: c.ink,
          borderRadius: 20,
          gap: 28,
          overflow: "hidden",
        }}
      >
        <Row style={{ justifyContent: "space-between" }}>
          <View>
            <T
              tone="label"
              color="#D6C2A0"
              style={{ fontSize: 15, letterSpacing: 3 }}
            >
              CENTAURUS
            </T>
            <T tone="small" color="#D6C2A0" style={{ letterSpacing: 4 }}>
              C L U B
            </T>
          </View>
          <Towers size={67} />
        </Row>
        <View>
          <T tone="display" color="white" style={{ fontSize: 42 }}>
            {state.member.points.toLocaleString("en-PK")}
          </T>
          <T tone="small" color="#D6C2A0">
            demo points to make your day
          </T>
        </View>
        <Row style={{ justifyContent: "space-between" }}>
          <T tone="small" color="white">
            {state.member.name}
          </T>
          <Tag text="GOLD PREVIEW" dark />
        </Row>
      </View>
      <Tag text="DEMO MEMBERSHIP" />
      <Button
        label="Scan a sample receipt"
        icon={ReceiptText}
        onPress={() => router.push("/club/receipt")}
      />
      <View style={{ gap: 16 }}>
        <Section title="Rewards to discover" />
        <Photo name="coffee" height={180} />
        {rewards.map((reward) => (
          <View
            key={reward.id}
            style={{
              paddingVertical: 16,
              gap: 12,
              borderBottomWidth: 1,
              borderColor: c.line,
            }}
          >
            <Row style={{ justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <T style={{ fontFamily: font.bold }}>{reward.title}</T>
                <T tone="small" color={c.muted}>
                  {reward.points} demo points
                </T>
              </View>
              <Tag
                text={
                  state.redeemed.includes(reward.id)
                    ? "IN WALLET"
                    : "DEMO REWARD"
                }
              />
            </Row>
            <Button
              label={`View ${reward.title.toLowerCase()}`}
              icon={ArrowUpRight}
              variant="secondary"
              onPress={() =>
                router.push({
                  pathname: "/club/reward",
                  params: { id: reward.id },
                })
              }
            />
          </View>
        ))}
      </View>
      <View style={{ gap: 14 }}>
        <Section title="Points activity" />
        <Row style={{ justifyContent: "space-between" }}>
          <T tone="small">Welcome balance · demonstration</T>
          <T>+1,200</T>
        </Row>
        {state.receipt.status !== "draft" ? (
          <Row style={{ justifyContent: "space-between" }}>
            <T tone="small">Sample receipt · {state.receipt.status}</T>
            <T>{state.receipt.status === "credited" ? "+250" : "Pending"}</T>
          </Row>
        ) : null}
        {state.redeemed.map((id) => (
          <Row key={id} style={{ justifyContent: "space-between" }}>
            <T tone="small">{rewards.find((r) => r.id === id)?.title}</T>
            <T>−{rewards.find((r) => r.id === id)?.points}</T>
          </Row>
        ))}
      </View>
      <T tone="small" color={c.muted}>
        Benefits shown are concepts for discussion. Points and rewards are local
        demonstration data, with no real monetary value.
      </T>
    </Screen>
  );
}
