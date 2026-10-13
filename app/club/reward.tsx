import React from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Rect } from "react-native-svg";
import { Button, Empty, Notice, Photo, Screen, T, Tag } from "@/components/ui";
import { rewards } from "@/data/catalog";
import { useDemo } from "@/features/provider";
import { c } from "@/theme/tokens";
function DemoToken() {
  return (
    <Svg
      width={160}
      height={160}
      viewBox="0 0 21 21"
      accessibilityLabel="Decorative demo token, not a valid QR code"
    >
      <Rect width="21" height="21" fill="white" />
      {Array.from({ length: 169 }, (_, i) => {
        const x = i % 13,
          y = Math.floor(i / 13);
        return (x * 7 + y * 3) % 5 < 2 ? (
          <Rect key={i} x={x + 4} y={y + 4} width="1" height="1" fill={c.ink} />
        ) : null;
      })}
    </Svg>
  );
}
export default function Reward() {
  const { id = "coffee" } = useLocalSearchParams<{ id: string }>();
  const reward = rewards.find((r) => r.id === id);
  const { state, dispatch } = useDemo();
  if (!reward)
    return (
      <Screen top={false}>
        <Empty title="Reward unavailable" body="Choose a reward from Club." />
      </Screen>
    );
  const redeemed = state.redeemed.includes(id);
  return (
    <Screen top={false}>
      <Photo name="coffee" height={250} />
      <Tag text="DEMO REWARD" />
      <T tone="display">{reward.title}</T>
      <T>{reward.description}</T>
      <T tone="title">{reward.points} points</T>
      <T>
        Available balance: {state.member.points.toLocaleString("en-PK")} demo
        points
      </T>
      {redeemed ? (
        <View
          style={{
            padding: 24,
            alignItems: "center",
            gap: 10,
            backgroundColor: c.paper,
            borderRadius: 16,
          }}
        >
          <DemoToken />
          <T tone="title">Your reward is in your wallet</T>
          <T tone="small" color={c.alert}>
            Demo — not valid for redemption
          </T>
          <T tone="small">Decorative token · no scannable value</T>
        </View>
      ) : (
        <>
          <Notice
            text={`Redeeming deducts ${reward.points} demo points from your local balance. This does not issue a real benefit.`}
          />
          <Button
            label={
              state.member.points < reward.points
                ? "Not enough demo points"
                : "Redeem demo reward"
            }
            disabled={state.member.points < reward.points}
            onPress={() => dispatch({ type: "redeem", id })}
          />
        </>
      )}
      <Button
        label="Open my wallet"
        variant="secondary"
        onPress={() => router.push("/you")}
      />
    </Screen>
  );
}
