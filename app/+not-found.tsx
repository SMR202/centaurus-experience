import React from "react";
import { router } from "expo-router";
import { Button, Empty, Screen } from "@/components/ui";
export default function NotFound() {
  return (
    <Screen top={false}>
      <Empty
        title="Let’s get you back"
        body="This page is not part of the experience. Start again from Home."
      />
      <Button label="Go Home" onPress={() => router.replace("/")} />
    </Screen>
  );
}
