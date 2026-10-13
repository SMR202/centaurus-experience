import React from "react";
import { View } from "react-native";
import { PressFeedback } from "./motion";
import { T } from "./ui";
import { c, font } from "@/theme/tokens";
export function SegmentedControl({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: "row",
        padding: 4,
        borderRadius: 14,
        backgroundColor: "#EAE7DF",
      }}
    >
      {items.map((item) => (
        <PressFeedback
          key={item}
          accessibilityRole="tab"
          accessibilityLabel={item}
          accessibilityState={{ selected: value === item }}
          onPress={() => onChange(item)}
          style={{
            flex: 1,
            minHeight: 48,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: value === item ? c.paper : "transparent",
          }}
        >
          <T
            tone="small"
            style={{ fontFamily: value === item ? font.bold : font.regular }}
          >
            {item}
          </T>
        </PressFeedback>
      ))}
    </View>
  );
}
