import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useReducedMotion } from "react-native-reanimated";
import { DemoProvider } from "@/features/provider";
import { c, font } from "@/theme/tokens";
export { ErrorBoundary } from "expo-router";
export default function Layout() {
  const [loaded, error] = useFonts({
    DMSans_400Regular: require("../assets/fonts/DMSans_400Regular.ttf"),
    DMSans_500Medium: require("../assets/fonts/DMSans_500Medium.ttf"),
    DMSans_700Bold: require("../assets/fonts/DMSans_700Bold.ttf"),
    CormorantGaramond_600SemiBold: require("../assets/fonts/CormorantGaramond_600SemiBold.ttf"),
  });
  const reduced = useReducedMotion();
  if (!loaded && !error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: c.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={c.gold} />
      </View>
    );
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#E6E8E4" }}>
      <SafeAreaProvider>
        <DemoProvider>
          <View
            style={{
              flex: 1,
              width: "100%",
              maxWidth: 640,
              alignSelf: "center",
              backgroundColor: c.bg,
            }}
          >
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: c.bg },
                headerTintColor: c.text,
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: font.medium, fontSize: 17 },
                headerBackButtonDisplayMode: "minimal",
                contentStyle: { backgroundColor: c.bg },
                animation: reduced ? "none" : "slide_from_right",
              }}
            >
              <Stack.Screen
                name="walkthrough"
                options={{ title: "A quick tour", presentation: "modal" }}
              />
              <Stack.Screen
                name="story/[id]"
                options={{ title: "Brand story" }}
              />
              <Stack.Screen
                name="demo/presentation"
                options={{ title: "Meeting guide" }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="store/[id]"
                options={{ title: "Destination" }}
              />
              <Stack.Screen
                name="navigation/index"
                options={{ title: "Your route" }}
              />
              <Stack.Screen
                name="offer/[id]"
                options={{ title: "The Centaurus edit" }}
              />
              <Stack.Screen
                name="club/receipt"
                options={{ title: "Sample receipt" }}
              />
              <Stack.Screen
                name="club/reward"
                options={{ title: "Club reward" }}
              />
              <Stack.Screen
                name="parking/index"
                options={{ title: "Your parking" }}
              />
              <Stack.Screen
                name="assistant/index"
                options={{ title: "Ask Centaurus" }}
              />
              <Stack.Screen
                name="assistant/itinerary"
                options={{ title: "Your evening" }}
              />
              <Stack.Screen
                name="dine/index"
                options={{ title: "Dine at Centaurus" }}
              />
              <Stack.Screen
                name="cinema/index"
                options={{ title: "At the movies" }}
              />
              <Stack.Screen
                name="event/index"
                options={{ title: "What’s on" }}
              />
              <Stack.Screen
                name="event/[id]"
                options={{ title: "A date to discover" }}
              />
              <Stack.Screen
                name="demo/index"
                options={{ title: "Demo switcher" }}
              />
              <Stack.Screen
                name="demo/retailer"
                options={{ title: "Retailer studio" }}
              />
              <Stack.Screen
                name="demo/admin"
                options={{ title: "Centaurus operations" }}
              />
              <Stack.Screen
                name="about"
                options={{ title: "About this prototype" }}
              />
            </Stack>
          </View>
        </DemoProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
