import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
import {
  Button,
  EditorialArt,
  Empty,
  Notice,
  Screen,
  T,
  Tag,
} from "@/components/ui";
import { events } from "@/data/catalog";
import { useDemo } from "@/features/provider";
export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const e = events.find((e) => e.id === id);
  const { state, dispatch } = useDemo();
  if (!e)
    return (
      <Screen top={false}>
        <Empty
          title="Event unavailable"
          body="Browse What’s on for sample events."
        />
      </Screen>
    );
  const interested = state.interested.includes(id);
  return (
    <Screen top={false}>
      <EditorialArt kind="event" large />
      <Tag text="DEMO EVENT" />
      <T tone="display">{e.title}</T>
      <T>{e.date}</T>
      <T>{e.description}</T>
      <Button
        label={
          interested ? "Interest saved · tap to undo" : "Register demo interest"
        }
        icon={Check}
        onPress={() => dispatch({ type: "interest", id })}
      />
      {interested ? (
        <Notice text="Your interest is saved locally. No registration has been sent and no real event booking exists." />
      ) : null}
      <Button
        label="Directions to demo meeting point"
        variant="blue"
        onPress={() =>
          router.push({ pathname: "/navigation", params: { to: e.storeId } })
        }
      />
    </Screen>
  );
}
