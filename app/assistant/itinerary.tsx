import React, { useState } from "react";
import { Switch, View } from "react-native";
import { router } from "expo-router";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react-native";
import {
  Button,
  Chips,
  IconButton,
  Notice,
  Row,
  Screen,
  T,
  Tag,
} from "@/components/ui";
import { findPlace } from "@/data/catalog";
import { useDemo } from "@/features/provider";
import { itineraryDistance, optimizeStops } from "@/map/graph";
import { c } from "@/theme/tokens";
export default function Itinerary() {
  const { state, dispatch } = useDemo();
  const [note, setNote] = useState(""),
    [add, setAdd] = useState("Coffee");
  const items = state.itinerary.map(findPlace).filter((p) => p !== undefined);
  const update = (ids: string[]) => {
    dispatch({ type: "itinerary", ids });
    setNote("");
  };
  const swap = (i: number, j: number) => {
    if (j < 0 || j >= items.length) return;
    const ids = [...state.itinerary];
    [ids[i], ids[j]] = [ids[j], ids[i]];
    update(ids);
  };
  return (
    <Screen top={false}>
      <Tag text="ILLUSTRATIVE MULTI-STOP PLAN" />
      <T tone="display">Your evening,{`\n`}beautifully unhurried.</T>
      <T>Shopping, a good meal and one more story.</T>
      <Row style={{ justifyContent: "space-between" }}>
        <T>Step-free throughout</T>
        <Switch
          accessibilityLabel="Step-free itinerary"
          value={state.stepFree}
          onValueChange={(value) => dispatch({ type: "step-free", value })}
        />
      </Row>
      {items.map((p, i) => (
        <View
          key={p.id}
          style={{
            padding: 18,
            gap: 14,
            borderRadius: 16,
            backgroundColor: c.paper,
          }}
        >
          <Row>
            <Tag text={`STOP ${i + 1}`} />
            <T tone="title" style={{ flex: 1 }}>
              {p.name}
            </T>
          </Row>
          <T tone="small">{p.category} · demo sequence</T>
          <Row>
            <IconButton
              label={`Move ${p.name} earlier`}
              icon={ArrowUp}
              disabled={i === 0}
              onPress={() => swap(i, i - 1)}
            />
            <IconButton
              label={`Move ${p.name} later`}
              icon={ArrowDown}
              disabled={i === items.length - 1}
              onPress={() => swap(i, i + 1)}
            />
            <IconButton
              label={`Remove ${p.name}`}
              icon={X}
              onPress={() =>
                update(state.itinerary.filter((id) => id !== p.id))
              }
            />
          </Row>
          <Button
            label={`Open ${p.name}`}
            variant="secondary"
            onPress={() => router.push(`/store/${p.id}`)}
          />
          <Button
            label={`Route to stop ${i + 1}`}
            variant="blue"
            onPress={() =>
              router.push({
                pathname: "/navigation",
                params: { to: p.id, from: i ? items[i - 1].nodeId : "G-entry" },
              })
            }
          />
        </View>
      ))}
      {!items.length ? (
        <Notice text="Your plan is empty. Add a stop below to begin again." />
      ) : null}
      <Chips
        items={["Coffee", "Shoes", "Dinner", "Movie"]}
        value={add}
        onChange={setAdd}
      />
      <Button
        label="Add stop"
        icon={Plus}
        variant="secondary"
        disabled={state.itinerary.includes(
          {
            Coffee: "gloria-jeans",
            Shoes: "adidas",
            Dinner: "broadway",
            Movie: "cineplex",
          }[add as "Coffee"],
        )}
        onPress={() => {
          const id = {
            Coffee: "gloria-jeans",
            Shoes: "adidas",
            Dinner: "broadway",
            Movie: "cineplex",
          }[add as "Coffee"];
          if (!state.itinerary.includes(id)) update([...state.itinerary, id]);
        }}
      />
      <Button
        label="Optimize walking order"
        disabled={items.length < 2}
        onPress={() => {
          const original = items.map((p) => p.nodeId);
          const optimized = optimizeStops("G-entry", original, state.stepFree);
          const savings =
            itineraryDistance("G-entry", original, state.stepFree) -
            itineraryDistance("G-entry", optimized, state.stepFree);
          const remaining = [...items];
          const ids = optimized.map((node) => {
            const i = remaining.findIndex((p) => p.nodeId === node);
            return remaining.splice(i, 1)[0].id;
          });
          dispatch({ type: "itinerary", ids });
          setNote(
            savings > 0
              ? `Illustrative saving: ${savings} m on the synthetic graph. Times and floor placements are not real.`
              : "This sequence already has the shortest distance on the demo graph.",
          );
        }}
      />
      {note ? <Notice text={note} /> : null}
      <Button
        label="Restore evening plan"
        variant="ghost"
        onPress={() => update(["adidas", "broadway", "cineplex"])}
      />
    </Screen>
  );
}
