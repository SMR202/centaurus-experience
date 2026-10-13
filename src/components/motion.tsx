import React, { useState } from "react";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, { FadeIn, useReducedMotion } from "react-native-reanimated";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function PressFeedback({
  style,
  children,
  ...props
}: Omit<PressableProps, "style" | "children"> & {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();
  return (
    <AnimatedPressable
      {...props}
      aria-selected={props.accessibilityState?.selected}
      onPressIn={(e) => {
        setPressed(true);
        props.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        props.onPressOut?.(e);
      }}
      style={[
        style,
        {
          opacity: props.disabled ? 0.45 : pressed ? 0.78 : 1,
          transform: [{ scale: pressed && !reduced ? 0.98 : 1 }],
          transitionProperty: ["transform", "opacity"],
          transitionDuration: reduced ? 0 : 140,
        },
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <Animated.View
      entering={reduced ? undefined : FadeIn.duration(220)}
      style={{ gap: 20 }}
    >
      {children}
    </Animated.View>
  );
}
