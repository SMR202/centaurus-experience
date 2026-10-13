import React from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useReducedMotion } from "react-native-reanimated";
import { Store } from "@/data/types";
import { floorLabel } from "@/data/catalog";
import { Button, IconButton, Row, T, Tag } from "./ui";
import { c } from "@/theme/tokens";
export function DestinationSheet({
  place,
  onClose,
}: {
  place: Store | undefined;
  onClose: () => void;
}) {
  const inset = useSafeAreaInsets();
  const reduced = useReducedMotion();
  return (
    <Modal
      visible={!!place}
      transparent
      animationType={reduced ? "none" : "slide"}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(20,32,37,.32)",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss destination sheet"
          onPress={onClose}
          style={{ flex: 1 }}
        />
        {place ? (
          <View
            accessibilityViewIsModal
            style={{
              backgroundColor: c.bg,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "80%",
              paddingBottom: Math.max(20, inset.bottom),
            }}
          >
            <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
              <Row style={{ justifyContent: "space-between" }}>
                <Tag text="SELECTED DESTINATION" />
                <IconButton
                  label="Close destination"
                  icon={X}
                  onPress={onClose}
                />
              </Row>
              <T tone="display">{place.name}</T>
              <T>
                {place.category} · {floorLabel(place)}
              </T>
              <T tone="small" color={c.muted}>
                This pin is a synthetic placement on an illustrative map.
              </T>
              <Button
                label={`Directions to ${place.name}`}
                variant="blue"
                onPress={() => {
                  onClose();
                  router.push({
                    pathname: "/navigation",
                    params: { to: place.id },
                  });
                }}
              />
              <Button
                label="View destination details"
                variant="secondary"
                onPress={() => {
                  onClose();
                  router.push(`/store/${place.id}`);
                }}
              />
            </ScrollView>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
