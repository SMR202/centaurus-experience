import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Check, ReceiptText } from "lucide-react-native";
import { Button, Notice, Row, Screen, T, Tag } from "@/components/ui";
import { useDemo } from "@/features/provider";
import { formatPKR } from "@/lib/i18n";
import { c, font } from "@/theme/tokens";
export default function Receipt() {
  const { state, dispatch } = useDemo();
  const receipt = state.receipt;
  return (
    <Screen top={false}>
      <Tag text="SAMPLE RECEIPT · NO CAMERA OR OCR" />
      <View
        style={{
          padding: 28,
          backgroundColor: c.paper,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: c.line,
          gap: 22,
        }}
      >
        <ReceiptText size={30} color={c.goldText} />
        <T tone="title">A little shopping.{`\n`}A little thank you.</T>
        <T tone="label">PREPOPULATED DEMO RECEIPT</T>
        <Row style={{ justifyContent: "space-between" }}>
          <T>Destination</T>
          <T style={{ fontFamily: font.bold }}>Khaadi</T>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <T>Receipt reference</T>
          <T>DEMO-001</T>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <T>Sample total</T>
          <T>{formatPKR(receipt.amount)}</T>
        </Row>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: c.line,
            paddingTop: 20,
            gap: 8,
          }}
        >
          <Row style={{ justifyContent: "space-between" }}>
            <T>Demo points</T>
            <T tone="title">+{receipt.points}</T>
          </Row>
          <T tone="small" color={c.muted}>
            9 October 2026 · 4:30 pm PKT
          </T>
        </View>
      </View>
      <Notice text="This is a local prefilled example, not an uploaded or scanned receipt. Review it, then demonstrate verification." />
      {receipt.status === "draft" ? (
        <Button
          label="Submit sample receipt"
          onPress={() => dispatch({ type: "receipt-submit" })}
        />
      ) : receipt.status === "pending" ? (
        <>
          <Tag text="PENDING VERIFICATION" />
          <T>
            The receipt is in the demo review queue. Continue below to
            demonstrate the award.
          </T>
          <Button
            label="Simulate verification · award 250 points"
            onPress={() => dispatch({ type: "receipt-credit" })}
          />
        </>
      ) : (
        <>
          <Row>
            <Check size={28} color={c.green} />
            <T tone="title">250 points added</T>
          </Row>
          <T>
            Your balance is now {state.member.points.toLocaleString("en-PK")}{" "}
            demo points. This receipt cannot be credited twice.
          </T>
          <Button
            label="Explore your rewards"
            onPress={() => router.replace("/club")}
          />
        </>
      )}
      <Button
        label="Back to Club"
        variant="secondary"
        onPress={() => router.replace("/club")}
      />
    </Screen>
  );
}
