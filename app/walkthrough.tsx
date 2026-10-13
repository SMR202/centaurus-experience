import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import {
  Search,
  Navigation,
  Ticket,
  Wallet,
  ArrowLeft,
} from "lucide-react-native";
import { Screen, T, Row, Button, Tag } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { BrandLogo } from "@/components/brand";
import { useDemo } from "@/features/provider";
import { c, font } from "@/theme/tokens";
const steps = [
  {
    icon: Search,
    title: "Start with what you need.",
    tab: "HOME + EXPLORE",
    body: "Search a brand, a bite to eat, or a service like a washroom. Explore keeps the directory and map together.",
    example: "Try Adidas or coffee.",
  },
  {
    icon: Navigation,
    title: "See the way before you go.",
    tab: "DIRECTIONS",
    body: "Open any destination and tap Directions. Compare your route, choose step-free access, then start the guided simulation.",
    example: "Lift instructions appear when you change floors.",
  },
  {
    icon: Ticket,
    title: "Discover. Save. Enjoy.",
    tab: "OFFERS + CLUB",
    body: "Browse real brand stories in Offers. Try a clearly marked demo voucher, then explore sample receipt points and Club rewards.",
    example: "Brand stories and demo promotions are always separate.",
  },
  {
    icon: Wallet,
    title: "Everything stays with you.",
    tab: "YOU",
    body: "Your saved places, vouchers, rewards and parked car live in You. No account is needed for this preview.",
    example: "Reopen this tour from You whenever you like.",
  },
];
export default function Walkthrough() {
  const [index, setIndex] = useState(0);
  const { dispatch } = useDemo();
  const step = steps[index];
  const Icon = step.icon;
  const finish = () => {
    dispatch({ type: "walkthrough-seen" });
    router.replace("/");
  };
  return (
    <Screen top={false}>
      <Row style={{ justifyContent: "space-between" }}>
        <Tag text={`QUICK TOUR · ${index + 1} OF 4`} />
        <Button label="Skip tour" variant="ghost" onPress={finish} />
      </Row>
      <Row style={{ gap: 6 }}>
        {steps.map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 3,
              backgroundColor: i <= index ? c.gold : c.line,
            }}
          />
        ))}
      </Row>
      <Reveal key={index}>
        <View
          style={{
            minHeight: 200,
            backgroundColor: c.paper,
            borderRadius: 20,
            padding: 28,
            justifyContent: "center",
            gap: 24,
            borderWidth: 1,
            borderColor: c.line,
          }}
        >
          <Icon size={46} strokeWidth={1.3} color={c.goldText} />
          {index === 0 ? (
            <Row>
              <BrandLogo id="adidas" name="Adidas" />
              <BrandLogo id="khaadi" name="Khaadi" />
              <BrandLogo id="sapphire" name="Sapphire" />
            </Row>
          ) : (
            <T style={{ fontFamily: font.medium }}>{step.example}</T>
          )}
        </View>
        <T tone="label" color={c.goldText}>
          {step.tab}
        </T>
        <T tone="display" style={{ fontSize: 38, lineHeight: 41 }}>
          {step.title}
        </T>
        <T color={c.muted}>{step.body}</T>
      </Reveal>
      <Button
        label={index === 3 ? "Start exploring" : "Next"}
        onPress={() => (index === 3 ? finish() : setIndex(index + 1))}
      />
      {index > 0 ? (
        <Button
          label="Back"
          variant="ghost"
          icon={ArrowLeft}
          onPress={() => setIndex(index - 1)}
        />
      ) : null}
      <T tone="small" color={c.muted}>
        You’re in control. This tour never changes your saved places, points or
        vouchers.
      </T>
    </Screen>
  );
}
