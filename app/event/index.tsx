import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Button, EditorialArt, Screen, T, Tag } from "@/components/ui";
import { events } from "@/data/catalog";
import { c } from "@/theme/tokens";
export default function Events() {
  return (
    <Screen top={false}>
      <T tone="display">A reason to come together.</T>
      <T color={c.muted}>A sample programme of moments beyond shopping.</T>
      {events.map((e) => (
        <View key={e.id} style={{ gap: 14 }}>
          <EditorialArt kind="event" />
          <Tag text="DEMO EVENT · NOT SCHEDULED" />
          <T tone="title">{e.title}</T>
          <T tone="small" color={c.muted}>
            {e.date}
          </T>
          <Button
            label={`Discover ${e.title.toLowerCase()}`}
            variant="secondary"
            onPress={() => router.push(`/event/${e.id}`)}
          />
        </View>
      ))}
    </Screen>
  );
}
