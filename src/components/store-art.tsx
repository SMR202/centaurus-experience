import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { Category } from "@/data/types";
import { T } from "./ui";
import { c } from "@/theme/tokens";
export function StoreArt({ category }: { category: Category }) {
  const beauty = category === "Beauty";
  return (
    <View
      style={{
        height: 265,
        backgroundColor: beauty ? "#D9E0D9" : "#DED3C4",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Svg viewBox="0 0 360 270" width="100%" height="100%">
        <Circle
          cx="280"
          cy="80"
          r="120"
          fill={beauty ? "#C5D1C6" : "#D0BCA3"}
        />
        {beauty ? (
          <>
            <Rect
              x="129"
              y="86"
              width="99"
              height="127"
              rx="16"
              fill="#EFE9DD"
              stroke="#9C927F"
            />
            <Rect x="151" y="53" width="54" height="36" rx="5" fill="#556550" />
            <Rect x="140" y="124" width="77" height="51" fill="#FEFCF5" />
            <Path d="M163 152H194" stroke="#AD8C59" strokeWidth="2" />
          </>
        ) : category === "Lifestyle" ? (
          <>
            <Path
              d="M106 100L99 220H261L254 100Z"
              fill="#EFE8D8"
              stroke="#AB9370"
              strokeWidth="2"
            />
            <Path
              d="M144 107V86C144 40 216 40 216 86V107"
              fill="none"
              stroke="#8E795F"
              strokeWidth="8"
            />
          </>
        ) : (
          <>
            <Path d="M99 30Q187 71 124 162T209 270H10V30Z" fill="#A8866C" />
            <Path
              d="M155 0Q265 89 183 163T290 270H169Q120 230 176 153T117 0Z"
              fill="#F2E7D3"
            />
            <Path
              d="M95 43Q169 90 123 156M214 89Q244 132 199 174"
              stroke="#D1B897"
              strokeWidth="3"
              fill="none"
            />
          </>
        )}
      </Svg>
      <View style={{ position: "absolute", bottom: 18, start: 20 }}>
        <T tone="label" color={c.ink}>
          {category.toUpperCase()} · AN EDITORIAL STUDY
        </T>
      </View>
    </View>
  );
}
