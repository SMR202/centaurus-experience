import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Car,
  Check,
  ChevronRight,
  Coffee,
  Film,
  Gift,
  MapPin,
  MessageCircle,
  Search as SearchIcon,
  ShoppingBag,
  Sparkles,
  Ticket,
  Utensils,
  type LucideIcon,
} from "lucide-react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { c, font } from "@/theme/tokens";
import { Store } from "@/data/types";
import { floorLabel } from "@/data/catalog";
import { useDemo } from "@/features/provider";
import { BrandLogo } from "./brand";
import { PressFeedback } from "./motion";
import { t } from "@/lib/i18n";
export const photos = {
  centaurus: require("../../assets/photos/centaurus.webp"),
  coffee: require("../../assets/photos/coffee.webp"),
  dining: require("../../assets/photos/dining.webp"),
};
export function T({
  children,
  style,
  tone = "body",
  color,
  ...props
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  tone?: "body" | "small" | "label" | "title" | "display";
  color?: string;
  numberOfLines?: number;
  accessibilityRole?: "header";
}) {
  const styles: Record<string, TextStyle> = {
    body: { fontSize: 16, lineHeight: 24 },
    small: { fontSize: 13, lineHeight: 20 },
    label: {
      fontFamily: font.bold,
      fontSize: 11,
      letterSpacing: 1.6,
      lineHeight: 18,
    },
    title: { fontFamily: font.bold, fontSize: 24, lineHeight: 30 },
    display: { fontFamily: font.display, fontSize: 40, lineHeight: 43 },
  };
  return (
    <Text
      {...props}
      style={[
        { fontFamily: font.regular, color: color ?? c.text },
        styles[tone],
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function Screen({
  children,
  top = true,
}: {
  children: React.ReactNode;
  top?: boolean;
}) {
  const inset = useSafeAreaInsets();
  const { ready, storageError } = useDemo();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: top ? Math.max(inset.top, 16) : 20,
          paddingBottom: Math.max(inset.bottom, 20) + 16,
          gap: 24,
        }}
      >
        {!ready ? <ActivityIndicator color={c.gold} /> : null}
        {storageError ? (
          <Notice text="Local saving is unavailable. You can still use this session; changes may be lost when closed." />
        ) : null}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export function Row({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center", gap: 12 }, style]}
    >
      {children}
    </View>
  );
}
export function Button({
  label,
  onPress,
  variant = "primary",
  icon: Icon = ArrowRight,
  disabled = false,
  testID,
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "blue" | "danger";
  icon?: LucideIcon;
  disabled?: boolean;
  testID?: string;
}) {
  const bg =
    variant === "primary"
      ? c.ink
      : variant === "blue"
        ? c.blue
        : variant === "danger"
          ? c.alert
          : variant === "secondary"
            ? c.paper
            : "transparent";
  const color = ["primary", "blue", "danger"].includes(variant)
    ? c.paper
    : c.text;
  return (
    <PressFeedback
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      accessibilityState={{ disabled }}
      onPress={onPress}
      style={{
        minHeight: 52,
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: bg,
        borderWidth: variant === "secondary" ? 1 : 0,
        borderColor: c.line,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <T
        style={{ fontFamily: font.bold, fontSize: 15, flexShrink: 1 }}
        color={color}
      >
        {label}
      </T>
      <Icon size={19} color={color} strokeWidth={1.8} />
    </PressFeedback>
  );
}
export function IconButton({
  label,
  icon: Icon,
  onPress,
  disabled = false,
}: {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 48,
        height: 48,
        opacity: disabled ? 0.4 : 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? c.line : c.paper,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: c.line,
      })}
    >
      <Icon size={21} color={c.text} strokeWidth={1.7} />
    </Pressable>
  );
}
export function Tag({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: dark ? "#344348" : c.paleGold,
      }}
    >
      <T
        tone="label"
        color={dark ? "#FFFFFF" : c.goldText}
        style={{ fontSize: 10, letterSpacing: 1 }}
      >
        {text}
      </T>
    </View>
  );
}
export function Notice({ text }: { text: string }) {
  return (
    <View
      style={{
        padding: 14,
        backgroundColor: c.paleBlue,
        borderRadius: 10,
        borderStartWidth: 3,
        borderStartColor: c.blue,
      }}
    >
      <T tone="small" color="#284265">
        {text}
      </T>
    </View>
  );
}
export function SearchField({
  value,
  onChange,
  placeholder = t("search"),
  autoFocus = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <Row
      style={{
        backgroundColor: c.paper,
        borderWidth: 1,
        borderColor: c.line,
        borderRadius: 12,
        paddingHorizontal: 16,
        minHeight: 56,
      }}
    >
      <SearchIcon size={20} color={c.muted} />
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={c.muted}
        autoFocus={autoFocus}
        autoCorrect={false}
        style={{
          flex: 1,
          minHeight: 54,
          color: c.text,
          fontFamily: font.regular,
          fontSize: 15,
        }}
      />
      {value ? (
        <Pressable
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          onPress={() => onChange("")}
          style={{ minWidth: 48, minHeight: 48, justifyContent: "center" }}
        >
          <T tone="small">Clear</T>
        </Pressable>
      ) : null}
    </Row>
  );
}
export function Chips({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {items.map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          accessibilityRole="button"
          accessibilityState={{ selected: item === value }}
          accessibilityLabel={item}
          style={{
            minHeight: 48,
            justifyContent: "center",
            paddingHorizontal: 17,
            borderRadius: 24,
            backgroundColor: value === item ? c.ink : c.paper,
            borderWidth: 1,
            borderColor: value === item ? c.ink : c.line,
          }}
        >
          <T
            tone="small"
            style={{ fontFamily: font.medium }}
            color={value === item ? c.paper : c.text}
          >
            {item}
          </T>
        </Pressable>
      ))}
    </ScrollView>
  );
}
export function Section({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Row style={{ justifyContent: "space-between" }}>
      <T tone="title" accessibilityRole="header" style={{ flex: 1 }}>
        {title}
      </T>
      {action && onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={{ minHeight: 48, justifyContent: "center", paddingStart: 8 }}
        >
          <T tone="small" style={{ fontFamily: font.medium }}>
            {action} →
          </T>
        </Pressable>
      ) : null}
    </Row>
  );
}
export function Photo({
  name,
  height = 200,
  style,
}: {
  name: keyof typeof photos;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <View
      style={[
        {
          height,
          overflow: "hidden",
          backgroundColor: c.paleGold,
          borderRadius: 14,
        },
        style,
      ]}
    >
      {failed ? (
        <View style={{ padding: 24 }}>
          <T tone="display">A moment to discover.</T>
          <T tone="small">Editorial image unavailable</T>
        </View>
      ) : (
        <Image
          source={photos[name]}
          contentFit="cover"
          accessibilityLabel={
            name === "centaurus"
              ? "Centaurus towers, Islamabad"
              : "Category editorial photography"
          }
          style={{ width: "100%", height: "100%" }}
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}
export function Hero() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Discover the city edit"
      onPress={() => router.push("/offer/city-edit")}
      style={{
        height: 355,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: c.ink,
      }}
    >
      <Image
        source={photos.centaurus}
        contentFit="cover"
        contentPosition="center"
        style={{ ...absolute }}
      />
      <LinearGradient
        colors={[
          "rgba(20,32,37,0.03)",
          "rgba(20,32,37,0.12)",
          "rgba(20,32,37,0.96)",
        ]}
        locations={[0, 0.35, 1]}
        style={absolute}
      />
      <View style={{ position: "absolute", top: 18, start: 18 }}>
        <Tag text="ISLAMABAD, DISCOVERED" dark />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 23,
          start: 24,
          end: 24,
          gap: 10,
        }}
      >
        <T
          tone="display"
          color="white"
          style={{ fontSize: 39, lineHeight: 39 }}
        >
          A little discovery.{`\n`}A whole day.
        </T>
        <Row style={{ justifyContent: "space-between" }}>
          <T tone="small" color="#EBE8E0">
            Your next chapter starts here.
          </T>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={21} color={c.ink} />
          </View>
        </Row>
      </View>
    </Pressable>
  );
}
const absolute = {
  position: "absolute" as const,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
export function Towers({
  color = c.gold,
  size = 80,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M15 83V27L33 17V83M41 83V18L60 8V83M68 83V28L86 18V83M6 88Q48 67 94 88"
        stroke={color}
        strokeWidth={1.5}
        fill="none"
      />
      {[35, 45, 55, 65].map((y) => (
        <Path
          key={y}
          d={`M16 ${y}H33 M42 ${y - 8}H60 M69 ${y}H86`}
          stroke={color}
          strokeWidth={0.7}
        />
      ))}
    </Svg>
  );
}
export function EditorialArt({
  kind = "style",
  large = false,
}: {
  kind?: "style" | "film" | "orbit" | "event";
  large?: boolean;
}) {
  return (
    <View
      style={{
        height: large ? 290 : 185,
        backgroundColor:
          kind === "event"
            ? "#D4BB93"
            : kind === "style"
              ? "#D9DFD9"
              : kind === "film"
                ? "#173D57"
                : "#242D3F",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 360 260"
        preserveAspectRatio="xMidYMid slice"
      >
        {kind === "style" ? (
          <>
            <Circle cx="265" cy="80" r="128" fill="#CED5CE" />
            <Path
              d="M-20 250L255 -20M30 290L310 -20M100 290L375 -20"
              stroke="#B7C1B6"
              strokeWidth="30"
            />
            <Path
              d="M78 151C116 162 119 107 140 110L190 145L249 157Q282 168 284 193L266 210L100 205Q63 199 78 151Z"
              fill="#F8F7F2"
              stroke="#7A897A"
              strokeWidth="2"
            />
            <Path
              d="M83 190L279 190M155 137L188 147M145 147L177 157M135 158L165 168"
              stroke="#8C9789"
              strokeWidth="3"
            />
          </>
        ) : kind === "event" ? (
          <>
            <Rect
              x="80"
              y="70"
              width="90"
              height="170"
              rx="45"
              fill="#9E674E"
            />
            <Circle cx="230" cy="150" r="68" fill="#E8D7B9" />
            <Path
              d="M186 95L280 231M168 135L268 250"
              stroke="#AD8C59"
              strokeWidth="5"
            />
          </>
        ) : (
          <>
            <Circle
              cx="250"
              cy="60"
              r="60"
              fill={kind === "film" ? "#DFC9A2" : "#CDA276"}
            />
            <Path
              d="M-10 210Q90 110 195 210T380 180V280H-10Z"
              fill={kind === "film" ? "#2F6374" : "#414D69"}
            />
            <Path
              d="M-10 240Q120 155 230 240T380 220V280H-10Z"
              fill="#142025"
            />
            {[30, 65, 110, 180, 310, 335].map((x, i) => (
              <Circle key={x} cx={x} cy={20 + i * 17} r="1.3" fill="white" />
            ))}
          </>
        )}
      </Svg>
      <View style={{ position: "absolute", bottom: 18, start: 18 }}>
        <T
          tone="label"
          color={kind === "style" || kind === "event" ? c.ink : "#EADAC5"}
        >
          {kind === "style"
            ? "CITY EDIT / 01"
            : kind === "event"
              ? "CRAFT. CULTURE. CONVERSATION."
              : "CENTAURUS PICTURES · SAMPLE"}
        </T>
      </View>
    </View>
  );
}
export function PlaceRow({
  place,
  onPress,
}: {
  place: Store;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${place.name}`}
      onPress={onPress ?? (() => router.push(`/store/${place.id}`))}
      style={({ pressed }) => ({
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: c.line,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Row>
        <BrandLogo id={place.id} name={place.name} />
        <View style={{ flex: 1, gap: 3 }}>
          <T style={{ fontFamily: font.bold }}>{place.name}</T>
          <T tone="small" color={c.muted}>
            {place.demo ? "Illustrative service point" : place.category} ·{" "}
            {place.floor ? floorLabel(place) : "Floor pending"}
          </T>
        </View>
        <ChevronRight size={18} color={c.muted} />
      </Row>
    </Pressable>
  );
}
export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <View style={{ paddingVertical: 28, gap: 10, alignItems: "flex-start" }}>
      <SearchIcon size={28} color={c.goldText} />
      <T tone="title">{title}</T>
      <T color={c.muted}>{body}</T>
    </View>
  );
}
export function AskEntry() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Ask Centaurus"
      onPress={() => router.push("/assistant")}
      style={{ padding: 20, backgroundColor: c.ink, borderRadius: 14 }}
    >
      <Row>
        <MessageCircle size={26} color="#C9AE82" />
        <View style={{ flex: 1 }}>
          <T color="white" style={{ fontFamily: font.bold }}>
            Plan your visit
          </T>
          <T tone="small" color="#C5CCCC">
            Ask Centaurus · shopping, dining & more
          </T>
        </View>
        <ArrowRight size={21} color="white" />
      </Row>
    </Pressable>
  );
}
export function QuickLinks() {
  const list: [string, LucideIcon, string][] = [
    ["Stores", ShoppingBag, "/explore"],
    ["Offers", Ticket, "/offers"],
    ["Food", Utensils, "/dine"],
    ["Movies", Film, "/cinema"],
  ];
  return (
    <Row style={{ justifyContent: "space-between" }}>
      {list.map(([label, Icon, url]) => (
        <Pressable
          accessibilityRole="button"
          key={label}
          onPress={() => router.push(url as never)}
          style={{
            flex: 1,
            alignItems: "center",
            gap: 8,
            minHeight: 80,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: c.paper,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: c.line,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={23} color={c.text} strokeWidth={1.5} />
          </View>
          <T tone="small" style={{ fontFamily: font.medium }}>
            {label}
          </T>
        </Pressable>
      ))}
    </Row>
  );
}
export const icons = {
  ArrowRight,
  Bookmark,
  Car,
  Check,
  Coffee,
  Gift,
  MapPin,
  Sparkles,
  Ticket,
};
