import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowUpRight } from "lucide-react-native";
import { stories } from "@/data/stories";
import { PressFeedback } from "./motion";
import { Row, T } from "./ui";
import { c, font } from "@/theme/tokens";
export function StoryCard({
  story = stories[0],
  compact = false,
}: {
  story?: (typeof stories)[number];
  compact?: boolean;
}) {
  return (
    <PressFeedback
      accessibilityRole="button"
      accessibilityLabel={`Read ${story.brand} brand story`}
      onPress={() => router.push(`/story/${story.id}`)}
      style={{
        overflow: "hidden",
        borderRadius: 16,
        backgroundColor: c.paper,
        borderWidth: 1,
        borderColor: c.line,
      }}
    >
      <Image
        source={story.image}
        contentFit="cover"
        accessibilityLabel={`${story.brand} official ${story.collection} campaign`}
        style={{ width: "100%", height: compact ? 180 : 215 }}
      />
      <View style={{ padding: 18, gap: 7 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <T tone="label" color={c.goldText}>
            {story.brand} · BRAND STORY
          </T>
          <ArrowUpRight size={19} color={c.text} />
        </Row>
        <T tone="display" style={{ fontSize: 30, lineHeight: 33 }}>
          {story.title}
        </T>
        <T tone="small" style={{ fontFamily: font.medium }}>
          {story.collection} · Discover the collection
        </T>
      </View>
    </PressFeedback>
  );
}
