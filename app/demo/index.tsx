import React, { useState } from "react";
import { Switch, View } from "react-native";
import { router } from "expo-router";
import { RotateCcw, Store, ShieldCheck } from "lucide-react-native";
import { Button, Notice, Row, Screen, Section, T, Tag } from "@/components/ui";
import { useDemo } from "@/features/provider";
import { c } from "@/theme/tokens";
export default function Demo() {
  const { state, dispatch } = useDemo();
  const [confirm, setConfirm] = useState(false),
    [reset, setReset] = useState(false);
  return (
    <Screen top={false}>
      <Tag text="PRESENTATION CONTROLS" />
      <T tone="display">One experience.{`\n`}Every perspective.</T>
      <T color={c.muted}>
        Switch between the visitor, retailer and operations story. All changes
        stay on this device.
      </T>
      <Row style={{ justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <T>Inside the mall</T>
          <T tone="small" color={c.muted}>
            {state.inside
              ? "Home uses simulated arrival context."
              : "Home uses before-arrival context."}
          </T>
        </View>
        <Switch
          accessibilityLabel="Inside the mall demo mode"
          value={state.inside}
          onValueChange={(value) => dispatch({ type: "inside", value })}
        />
      </Row>
      <Button
        label="Return to visitor Home"
        onPress={() => router.replace("/")}
      />
      <Section title="The retailer story" />
      <Button
        label="Retailer offer editor"
        icon={Store}
        variant="secondary"
        onPress={() => router.push("/demo/retailer")}
      />
      <Button
        label="Operations & campaign review"
        icon={ShieldCheck}
        variant="secondary"
        onPress={() => router.push("/demo/admin")}
      />
      <Section title="Rehearsal tools" />
      <T>Demo clock: {Math.floor(state.clock / 60)} minutes elapsed.</T>
      <Button
        label="Advance demo clock by 30 minutes"
        variant="secondary"
        onPress={() => dispatch({ type: "tick", seconds: 1800 })}
      />
      <Button
        label="Reset demo"
        icon={RotateCcw}
        variant="secondary"
        onPress={() => {
          setConfirm(true);
          setReset(false);
        }}
      />
      {confirm ? (
        <View
          style={{
            gap: 14,
            padding: 20,
            backgroundColor: c.paper,
            borderRadius: 14,
          }}
        >
          <T tone="title">Start a fresh demonstration?</T>
          <T>
            This clears saved places, vouchers, parking, receipt progress,
            campaigns and rewards on this device. Points return to 1,200.
          </T>
          <Button
            label="Reset all demo data"
            variant="danger"
            onPress={() => {
              dispatch({ type: "reset" });
              setConfirm(false);
              setReset(true);
            }}
          />
          <Button
            label="Keep my demo"
            variant="ghost"
            onPress={() => setConfirm(false)}
          />
        </View>
      ) : null}
      {reset ? (
        <Notice text="Demo reset. Balance: 1,200 points. Receipt, wallet, campaigns, saved places and parking are clear." />
      ) : null}
      <Button
        label="Prototype boundaries & credits"
        variant="ghost"
        onPress={() => router.push("/about")}
      />
    </Screen>
  );
}
