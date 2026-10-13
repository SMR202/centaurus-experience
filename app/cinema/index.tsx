import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Chips,
  EditorialArt,
  Notice,
  Screen,
  T,
  Tag,
} from "@/components/ui";
import { films } from "@/data/catalog";
import { c } from "@/theme/tokens";
export default function Cinema() {
  const [date, setDate] = useState("Fri 9 Oct"),
    [selection, setSelection] = useState<{ film: string; time: string } | null>(
      null,
    );
  return (
    <Screen top={false}>
      <Tag text="FICTIONAL FILMS · SAMPLE SHOWTIMES" />
      <T tone="display">One more story{`\n`}before you go.</T>
      <Chips
        items={["Fri 9 Oct", "Sat 10 Oct", "Sun 11 Oct"]}
        value={date}
        onChange={(d) => {
          setDate(d);
          setSelection(null);
        }}
      />
      {films.map((f, i) => (
        <View
          key={f.id}
          style={{
            gap: 14,
            paddingBottom: 24,
            borderBottomWidth: 1,
            borderColor: c.line,
          }}
        >
          <EditorialArt kind={i ? "orbit" : "film"} large />
          <T tone="display" style={{ fontSize: 34, lineHeight: 38 }}>
            {f.title}
          </T>
          <T tone="small" color={c.muted}>
            {f.genre} · {f.minutes} min · Original sample artwork
          </T>
          <Chips
            items={f.times}
            value={selection?.film === f.id ? selection.time : ""}
            onChange={(time) => setSelection({ film: f.id, time })}
          />
          {selection?.film === f.id ? (
            <View
              style={{
                gap: 14,
                padding: 18,
                backgroundColor: c.paper,
                borderRadius: 14,
              }}
            >
              <T tone="title">Your sample movie night</T>
              <T>
                {date} 2026 · {selection.time} PKT
              </T>
              <Notice text="Booking integration planned. No tickets, seats or live showtimes are available. This selection is only a demonstration." />
              <Button
                label="Navigate to Cineplex"
                variant="blue"
                onPress={() =>
                  router.push({
                    pathname: "/navigation",
                    params: { to: "cineplex" },
                  })
                }
              />
              <Button
                label="Clear selection"
                variant="ghost"
                onPress={() => setSelection(null)}
              />
            </View>
          ) : null}
        </View>
      ))}
      <Button
        label="About Cineplex"
        variant="secondary"
        onPress={() => router.push("/store/cineplex")}
      />
    </Screen>
  );
}
