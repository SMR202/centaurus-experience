import React from "react";
import { Tabs } from "expo-router";
import {
  House,
  Compass,
  Ticket,
  CreditCard,
  UserRound,
} from "lucide-react-native";
import { c, font } from "@/theme/tokens";
import { t } from "@/lib/i18n";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.ink,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: {
          backgroundColor: c.paper,
          borderTopColor: c.line,
          paddingTop: 8,
          minHeight: 70,
        },
        tabBarLabelStyle: {
          fontFamily: font.medium,
          fontSize: 11,
          paddingBottom: 6,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {[
        { name: "index", title: t("home"), icon: House },
        { name: "explore", title: t("explore"), icon: Compass },
        { name: "offers", title: t("offers"), icon: Ticket },
        { name: "club", title: t("club"), icon: CreditCard },
        { name: "you", title: t("you"), icon: UserRound },
      ].map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <Icon size={22} strokeWidth={focused ? 2 : 1.5} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
