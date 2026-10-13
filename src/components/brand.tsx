import React, { useState } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { brandAssets } from "@/data/brand-assets";
import { c, font } from "@/theme/tokens";
export function BrandLogo({
  id,
  name,
  size = 56,
}: {
  id: string;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const asset = brandAssets[id];
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: c.paper,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: c.line,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {asset && !failed ? (
        <Image
          source={asset.logo}
          contentFit="contain"
          accessibilityLabel={`${name} logo`}
          onError={() => setFailed(true)}
          style={{ width: size - 10, height: size - 10 }}
        />
      ) : (
        <Text style={{ fontFamily: font.bold, fontSize: 16, color: c.muted }}>
          {name
            .split(" ")
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </Text>
      )}
    </View>
  );
}
