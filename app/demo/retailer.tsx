import React, { useState } from "react";
import { TextInput, View } from "react-native";
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
import { useDemo } from "@/features/provider";
import { c, font } from "@/theme/tokens";
export default function Retailer() {
  const { dispatch } = useDemo();
  const [title, setTitle] = useState("Your weekend, reimagined"),
    [merchant, setMerchant] = useState("Khaadi"),
    [submitted, setSubmitted] = useState(false);
  const names: Record<string, string> = {
    Khaadi: "khaadi",
    Adidas: "adidas",
    "Gloria Jean’s": "gloria-jeans",
  };
  return (
    <Screen top={false}>
      <Tag text="RETAILER STUDIO · LOCAL DEMO" />
      <T tone="display">Give your next story{`\n`}a place to begin.</T>
      <Notice text="Concept editor. You are not acting for a real retailer. Submitting creates a local demo campaign for review." />
      {submitted ? (
        <>
          <T tone="title">Campaign submitted for review</T>
          <T>
            The consumer app will show it after you approve it in the operations
            preview.
          </T>
          <Button
            label="Open admin review"
            onPress={() => router.push("/demo/admin")}
          />
          <Button
            label="Create another demo campaign"
            variant="secondary"
            onPress={() => {
              setSubmitted(false);
              setTitle("");
            }}
          />
        </>
      ) : (
        <>
          <T tone="label">ILLUSTRATIVE STORE ASSOCIATION</T>
          <Chips
            items={Object.keys(names)}
            value={merchant}
            onChange={setMerchant}
          />
          <View style={{ gap: 8 }}>
            <T>Campaign title</T>
            <TextInput
              accessibilityLabel="Campaign title"
              value={title}
              onChangeText={setTitle}
              maxLength={80}
              placeholder="Give your edit a name"
              placeholderTextColor={c.muted}
              style={{
                minHeight: 56,
                padding: 16,
                backgroundColor: c.paper,
                borderWidth: 1,
                borderColor: c.line,
                borderRadius: 12,
                fontFamily: font.regular,
                color: c.text,
                fontSize: 16,
              }}
            />
            <T tone="small" color={c.muted}>
              {title.length}/80 characters
            </T>
          </View>
          <T tone="label">VISITOR PREVIEW</T>
          <View
            style={{
              gap: 12,
              padding: 18,
              borderRadius: 16,
              backgroundColor: c.paper,
            }}
          >
            <EditorialArt kind="event" />
            <Tag text="DEMO PROMOTION" />
            <T tone="title">{title.trim() || "Your campaign title"}</T>
            <T tone="small">{merchant} · no participation implied</T>
          </View>
          <Button
            label="Submit campaign for review"
            disabled={title.trim().length < 4}
            onPress={() => {
              dispatch({
                type: "submit-campaign",
                title,
                storeId: names[merchant],
              });
              setSubmitted(true);
            }}
          />
          <Button
            label="Cancel and return"
            variant="ghost"
            onPress={() => router.back()}
          />
        </>
      )}
    </Screen>
  );
}
