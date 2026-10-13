import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { router } from "expo-router";
import { Car, Check, RotateCcw } from "lucide-react-native";
import {
  Button,
  Chips,
  Notice,
  Row,
  Screen,
  Section,
  T,
  Tag,
} from "@/components/ui";
import { useDemo } from "@/features/provider";
import { demoMeta } from "@/data/catalog";
import { c, font } from "@/theme/tokens";
export default function Parking() {
  const { state, dispatch } = useDemo();
  const [floor, setFloor] = useState(state.parking?.floor ?? "B2"),
    [zone, setZone] = useState(state.parking?.zone ?? "C"),
    [space, setSpace] = useState(state.parking?.space ?? ""),
    [editing, setEditing] = useState(!state.parking),
    [undo, setUndo] = useState(state.parking);
  return (
    <Screen top={false}>
      <Row>
        <Car size={30} color={c.goldText} />
        <Tag text="MANUAL PARKING · DEMO" />
      </Row>
      <T tone="display">Enjoy the day.{`\n`}We’ll remember the spot.</T>
      <Notice text="Save a level and zone manually. No number plate recognition, automatic detection or live car tracking." />
      {state.parking && !editing ? (
        <>
          <View
            style={{
              padding: 26,
              backgroundColor: c.ink,
              borderRadius: 18,
              gap: 14,
            }}
          >
            <T tone="label" color="#D6C2A0">
              YOUR SAVED SPOT
            </T>
            <T tone="display" color="white">
              {state.parking.floor} / {state.parking.zone}
            </T>
            <T color="white">
              {state.parking.space
                ? `Space ${state.parking.space}`
                : "No space number added"}
            </T>
            <T tone="small" color="#CBD1D0">
              Saved on this device · illustrative zones
            </T>
          </View>
          <Button
            label="Find my car"
            variant="blue"
            onPress={() =>
              router.push({
                pathname: "/navigation",
                params: { to: "parking" },
              })
            }
          />
          <Button
            label="Edit parking spot"
            variant="secondary"
            onPress={() => setEditing(true)}
          />
          <Button
            label="Clear saved spot"
            variant="ghost"
            onPress={() => {
              setUndo(state.parking);
              dispatch({ type: "parking", spot: null });
              setEditing(true);
            }}
          />
        </>
      ) : (
        <>
          <Section title="Parking level" />
          <Chips
            items={["B2", "B1"]}
            value={floor}
            onChange={(v) => setFloor(v as "B1" | "B2")}
          />
          <Section title="Section / zone" />
          <Chips items={["A", "B", "C", "D"]} value={zone} onChange={setZone} />
          <View style={{ gap: 8 }}>
            <T style={{ fontFamily: font.bold }}>Space number (optional)</T>
            <TextInput
              accessibilityLabel="Space number"
              value={space}
              onChangeText={setSpace}
              maxLength={12}
              placeholder="For example, 24"
              placeholderTextColor={c.muted}
              style={{
                minHeight: 54,
                backgroundColor: c.paper,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: c.line,
                fontFamily: font.regular,
                fontSize: 16,
                color: c.text,
              }}
            />
          </View>
          <Button
            label="Save my car"
            icon={Check}
            onPress={() => {
              dispatch({
                type: "parking",
                spot: { ...demoMeta, floor, zone, space: space.trim() },
              });
              setEditing(false);
              setUndo(null);
            }}
          />
          {state.parking ? (
            <Button
              label="Cancel editing"
              variant="secondary"
              onPress={() => setEditing(false)}
            />
          ) : undo ? (
            <Button
              label="Undo clear parking"
              icon={RotateCcw}
              variant="secondary"
              onPress={() => {
                dispatch({ type: "parking", spot: undo });
                setEditing(false);
                setUndo(null);
              }}
            />
          ) : null}
        </>
      )}
      <T tone="small" color={c.muted}>
        B1/B2 and zones are prototype choices, not a verified parking plan.
        Follow signs for the real parking layout.
      </T>
    </Screen>
  );
}
