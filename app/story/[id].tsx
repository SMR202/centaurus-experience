import React from "react";
import { View, Linking } from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { stories } from "@/data/stories";
import { Screen, T, Button, Tag, Empty, Row } from "@/components/ui";
import { BrandLogo } from "@/components/brand";
import { c } from "@/theme/tokens";
export default function Story() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = stories.find((s) => s.id === id);
  if (!story)
    return (
      <Screen>
        <Empty
          title="Story not found"
          body="Explore brand stories from Home."
        />
      </Screen>
    );
  return (
    <Screen top={false}>
      <Row>
        <BrandLogo id={story.id} name={story.brand} />
        <View>
          <T tone="label">{story.brand}</T>
          <T tone="small" color={c.muted}>
            {story.collection}
          </T>
        </View>
      </Row>
      <Image
        source={story.image}
        contentFit="contain"
        accessibilityLabel={`${story.brand} official campaign`}
        style={{
          width: "100%",
          aspectRatio: story.aspect,
          backgroundColor: c.paper,
          borderRadius: 12,
        }}
      />
      <Tag text="OFFICIAL BRAND CREATIVE" />
      <T tone="display">{story.title}</T>
      <T>{story.description}</T>
      <Button
        label={`Find ${story.brand} at Centaurus`}
        onPress={() => router.push(`/store/${story.id}`)}
      />
      <Button
        label="View the official collection"
        variant="secondary"
        onPress={() => {
          void Linking.openURL(story.source);
        }}
      />
      <T tone="small" color={c.muted}>
        Source: {story.source} · checked 10 October 2026. Campaign imagery is a
        brand reference, not a mall-exclusive offer. In-store availability is
        not verified. Copyright remains with the brand; private concept review
        only.
      </T>
    </Screen>
  );
}
