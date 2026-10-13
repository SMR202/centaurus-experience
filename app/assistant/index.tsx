import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Send, Sparkles } from "lucide-react-native";
import {
  Button,
  PlaceRow,
  Row,
  Screen,
  SearchField,
  T,
  Tag,
} from "@/components/ui";
import { prompts, resolveIntent, Intent } from "@/features/assistant";
import { findPlace } from "@/data/catalog";
import { c } from "@/theme/tokens";
export default function Assistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ query: string; intent: Intent }[]>(
    [],
  );
  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { query: text.trim(), intent: resolveIntent(text) },
    ]);
    setQuery("");
  };
  return (
    <Screen top={false}>
      <Row>
        <Sparkles color={c.goldText} size={28} />
        <Tag text="INTERACTIVE DEMO ASSISTANT" />
      </Row>
      <T tone="display">What would make{`\n`}your day?</T>
      <T color={c.muted}>
        A few ideas, a useful direction, a little less planning. Choose a
        question to begin.
      </T>
      <T tone="small" color={c.muted}>
        Scripted locally, not live AI. No inventory or real location access.
      </T>
      {prompts.map((p) => (
        <Button key={p} label={p} variant="secondary" onPress={() => send(p)} />
      ))}
      {messages.map((m, i) => (
        <View key={i} style={{ gap: 12 }}>
          <View
            style={{
              alignSelf: "flex-end",
              maxWidth: "92%",
              padding: 16,
              backgroundColor: c.paleGold,
              borderRadius: 16,
            }}
          >
            <T>{m.query}</T>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: c.paper,
              borderRadius: 16,
              gap: 14,
            }}
          >
            <T tone="label" color={c.goldText}>
              CENTAURUS
            </T>
            <T>
              {m.intent === "coffee"
                ? "For a coffee pause, Gloria Jean’s is listed in the mall directory. Its floor still needs confirmation."
                : m.intent === "evening"
                  ? "Let’s make an evening of it: shoes at Adidas, dinner at Broadway Pizza, then a sample movie at Cineplex. You can rearrange your stops."
                  : m.intent === "prayer"
                    ? "I can show a prayer space on the illustrative map. Please ask mall staff for the real location."
                    : m.intent === "offers"
                      ? "Explore our fictional offers for a preview of nearby discovery. “Nearby” uses the demo map; no live discounts are available."
                      : "I can help with coffee, prayer spaces, demo offers or an evening itinerary. Try one of the questions above."}
            </T>
            {m.intent === "coffee" ? (
              <>
                <PlaceRow place={findPlace("gloria-jeans")!} />
                <Button
                  label="Create coffee route"
                  variant="blue"
                  onPress={() =>
                    router.push({
                      pathname: "/navigation",
                      params: { to: "gloria-jeans" },
                    })
                  }
                />
              </>
            ) : m.intent === "evening" ? (
              <Button
                label="Build my evening"
                onPress={() => router.push("/assistant/itinerary")}
              />
            ) : m.intent === "prayer" ? (
              <>
                <PlaceRow place={findPlace("prayer")!} />
                <Button
                  label="Show illustrative prayer route"
                  onPress={() =>
                    router.push({
                      pathname: "/navigation",
                      params: { to: "prayer" },
                    })
                  }
                />
              </>
            ) : m.intent === "offers" ? (
              <Button
                label="Explore demo offers"
                onPress={() => router.push("/offers")}
              />
            ) : null}
          </View>
        </View>
      ))}
      <SearchField
        value={query}
        onChange={setQuery}
        placeholder="Ask about your visit"
      />
      <Button
        label="Send question"
        icon={Send}
        disabled={!query.trim()}
        onPress={() => send(query)}
      />
      {messages.length ? (
        <Button
          label="Clear conversation"
          variant="ghost"
          onPress={() => setMessages([])}
        />
      ) : null}
    </Screen>
  );
}
