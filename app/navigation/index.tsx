import React, { useCallback, useEffect, useState } from "react";
import {
  AppState,
  ScrollView,
  Switch,
  View,
  useWindowDimensions,
} from "react-native";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import {
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Check,
  Pause,
  Play,
  RotateCcw,
  X,
  MoveVertical,
  Footprints,
} from "lucide-react-native";
import { Button, Empty, Row, Screen, T } from "@/components/ui";
import { PressFeedback } from "@/components/motion";
import { BrandLogo } from "@/components/brand";
import { findPlace } from "@/data/catalog";
import { FloorId } from "@/data/types";
import { useDemo } from "@/features/provider";
import { parkingNode, shortestPath } from "@/map/graph";
import { routeGuidance } from "@/map/route-guidance";
import { IndoorMap } from "@/map/indoor-map";
import { c, font } from "@/theme/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Navigation() {
  const insets = useSafeAreaInsets();
  const compact = useWindowDimensions().height < 740;
  const { to = "adidas", from = "G-entry" } = useLocalSearchParams<{
    to: string;
    from?: string;
  }>();
  const { state, dispatch } = useDemo();
  const place = findPlace(to);
  const dest =
    place && to === "parking" && state.parking
      ? {
          ...place,
          name: `Your car · ${state.parking.floor} / ${state.parking.zone}${state.parking.space ? " / " + state.parking.space : ""}`,
        }
      : place;
  const target =
    to === "parking" && state.parking
      ? parkingNode(state.parking)
      : dest?.nodeId;
  const path = target ? shortestPath(from, target, state.stepFree) : null;
  const [started, setStarted] = useState(false),
    [step, setStep] = useState(0),
    [paused, setPaused] = useState(false),
    [auto, setAuto] = useState(false),
    [ended, setEnded] = useState(false),
    [focused, setFocused] = useState(true),
    [appActive, setAppActive] = useState(true),
    [previewFloor, setPreviewFloor] = useState<FloorId | null>(null),
    [mapHeight, setMapHeight] = useState(350);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );
  useEffect(() => {
    const sub = AppState.addEventListener("change", (s) =>
      setAppActive(s === "active"),
    );
    return () => sub.remove();
  }, []);
  const endIndex = path ? path.nodes.length - 1 : 0;
  const guidance =
    path && dest
      ? routeGuidance(path, Math.min(step, endIndex), dest.name)
      : null;
  useEffect(() => {
    if (
      !focused ||
      !appActive ||
      !auto ||
      !started ||
      paused ||
      guidance?.arrived ||
      guidance?.transition
    )
      return;
    const timer = setTimeout(
      () => setStep((s) => Math.min(endIndex, s + 1)),
      2200,
    );
    return () => clearTimeout(timer);
  }, [
    auto,
    started,
    paused,
    endIndex,
    focused,
    appActive,
    step,
    guidance?.arrived,
    guidance?.transition,
  ]);
  if (!dest || !path || !guidance)
    return (
      <Screen top={false}>
        <Empty
          title="No demo route available"
          body="Choose a destination from Explore to start a new route."
        />
        <Button
          label="Open Explore"
          onPress={() => router.replace("/explore")}
        />
      </Screen>
    );
  const current = path.nodes[Math.min(step, endIndex)];
  const shownFloor = started ? current.floor : (previewFloor ?? current.floor);
  const routeFloors = [...new Set(path.nodes.map((n) => n.floor))];
  const Icon = guidance.arrived
    ? Check
    : guidance.transition
      ? MoveVertical
      : guidance.turn === "left"
        ? ArrowLeft
        : guidance.turn === "right"
          ? ArrowRight
          : ArrowUp;
  const begin = () => {
    setStarted(true);
    setStep(0);
    setPaused(false);
    setEnded(false);
    setAuto(false);
    setPreviewFloor(null);
  };
  return (
    <View style={{ flex: 1, backgroundColor: c.paper }}>
      <Stack.Screen
        options={{ title: started ? "Route simulation" : "Directions" }}
      />
      {started ? (
        <View
          accessibilityLiveRegion="polite"
          style={{
            paddingHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: guidance.arrived ? c.green : c.blue,
          }}
        >
          <Row>
            <Icon size={32} color="white" />
            <View style={{ flex: 1, gap: 3 }}>
              <T
                color="white"
                style={{ fontFamily: font.bold, fontSize: 21, lineHeight: 27 }}
              >
                {paused ? "Simulation paused" : guidance.instruction}
              </T>
              <T tone="small" color="#EDF4FF">
                {guidance.transition
                  ? "Floor change · auto-play waits for confirmation"
                  : guidance.detail}
              </T>
            </View>
          </Row>
        </View>
      ) : null}
      <Row
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: c.paper,
          justifyContent: "space-between",
        }}
      >
        <T tone="label" style={{ fontSize: 10, letterSpacing: 1 }}>
          DEMO ROUTE
        </T>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 6,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {routeFloors.map((f) => (
            <PressFeedback
              key={f}
              accessibilityRole="button"
              accessibilityLabel={`Preview floor ${f}`}
              accessibilityState={{
                selected: shownFloor === f,
                disabled: started,
              }}
              disabled={started && shownFloor !== f}
              onPress={() => {
                if (!started) setPreviewFloor(f);
              }}
              style={{
                minWidth: 48,
                minHeight: 44,
                paddingHorizontal: 12,
                borderRadius: 10,
                backgroundColor: shownFloor === f ? c.ink : c.bg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <T
                tone="small"
                color={shownFloor === f ? "white" : c.text}
                style={{ fontFamily: font.bold }}
              >
                {f === "G" ? "G" : f}
              </T>
            </PressFeedback>
          ))}
        </ScrollView>
      </Row>
      <View
        style={{ flex: 1, minHeight: compact ? 140 : 210 }}
        onLayout={(e) => setMapHeight(e.nativeEvent.layout.height)}
      >
        <IndoorMap
          height={mapHeight}
          edgeToEdge
          floor={shownFloor}
          route={path.nodes}
          completed={started ? path.nodes.slice(0, step + 1) : []}
          position={current}
          selected={dest.id}
        />
      </View>
      <View
        style={{
          backgroundColor: c.paper,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTopWidth: 1,
          borderColor: c.line,
          paddingBottom: Math.max(insets.bottom, 12),
        }}
      >
        <View
          style={{
            height: 4,
            width: 36,
            backgroundColor: c.line,
            borderRadius: 2,
            alignSelf: "center",
            marginTop: 9,
          }}
        />
        <ScrollView
          style={{ maxHeight: compact ? 160 : started ? 230 : 250 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 14,
            paddingBottom: 12,
            gap: 14,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Row>
            <BrandLogo id={dest.id} name={dest.name} size={48} />
            <View style={{ flex: 1, gap: 2 }}>
              <T
                style={{ fontFamily: font.bold, fontSize: 20, lineHeight: 26 }}
              >
                {dest.name}
              </T>
              <T tone="small" color={c.muted}>
                {started
                  ? `${guidance.minutes} min · ${guidance.remaining} m remaining`
                  : `${path.minutes} min walk · ${path.metres} m`}{" "}
                · illustrative
              </T>
            </View>
          </Row>
          {started ? (
            <>
              <View
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: endIndex, now: step }}
                style={{ height: 4, borderRadius: 4, backgroundColor: c.line }}
              >
                <View
                  style={{
                    height: 4,
                    borderRadius: 4,
                    width: `${(endIndex ? step / endIndex : 1) * 100}%`,
                    backgroundColor: guidance.arrived ? c.green : c.blue,
                  }}
                />
              </View>
              {guidance.arrived ? (
                <T tone="small" color={c.green}>
                  Arrival confirmed in the demo. Your physical location is not
                  tracked.
                </T>
              ) : (
                <Row>
                  <View style={{ flex: 1 }}>
                    <Button
                      label={paused ? "Resume" : "Pause"}
                      variant="secondary"
                      icon={paused ? Play : Pause}
                      onPress={() => setPaused((p) => !p)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button
                      label={auto ? "Auto on" : "Auto off"}
                      variant="secondary"
                      icon={Play}
                      onPress={() => setAuto((a) => !a)}
                    />
                  </View>
                </Row>
              )}
            </>
          ) : (
            <>
              <Row style={{ justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <T style={{ fontFamily: font.bold }}>Step-free route</T>
                  <T tone="small" color={c.muted}>
                    {state.stepFree
                      ? "Lifts for every floor change"
                      : "Standard route may include stairs"}
                  </T>
                </View>
                <Switch
                  accessibilityLabel="Step-free route"
                  value={state.stepFree}
                  onValueChange={(value) => {
                    dispatch({ type: "step-free", value });
                    setPreviewFloor(null);
                  }}
                  trackColor={{ true: c.blue }}
                />
              </Row>
              <Row style={{ gap: 8 }}>
                <Footprints size={16} color={c.muted} />
                <T tone="small" color={c.muted} style={{ flex: 1 }}>
                  {from === "G-entry" ? "Main entrance" : "Starting point"}{" "}
                  {path.nodes[0].floor} →{" "}
                  {routeFloors.length > 1
                    ? (state.stepFree ? "Lift" : "Stairs") + " → "
                    : ""}
                  {dest.name} {path.nodes.at(-1)?.floor}
                </T>
              </Row>
              {ended ? (
                <T tone="small" color={c.blue}>
                  Route ended. Restart whenever you’re ready.
                </T>
              ) : null}
            </>
          )}
          {!compact ? (
            <T
              tone="small"
              color={c.muted}
              style={{ fontSize: 11, lineHeight: 16 }}
            >
              Simulated position, floor plan and distances. Follow mall signage
              during a real visit.
            </T>
          ) : null}
        </ScrollView>
        <View style={{ paddingHorizontal: 20, gap: 8 }}>
          {!started ? (
            <Button
              label="Start simulation"
              variant="blue"
              icon={NavigationIcon}
              onPress={begin}
            />
          ) : guidance.arrived ? (
            <Row>
              <View style={{ flex: 1 }}>
                <Button
                  label="Explore destination"
                  icon={Check}
                  onPress={() => router.replace(`/store/${dest.id}`)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  label="Restart simulation"
                  icon={RotateCcw}
                  variant="secondary"
                  onPress={begin}
                />
              </View>
            </Row>
          ) : (
            <Button
              label={
                guidance.transition ? "Continue on next floor" : "Next step"
              }
              variant="blue"
              disabled={paused}
              onPress={() => setStep((s) => Math.min(endIndex, s + 1))}
            />
          )}
          {started ? (
            <Button
              label="End route"
              variant="ghost"
              icon={X}
              onPress={() => {
                setStarted(false);
                setAuto(false);
                setStep(0);
                setEnded(true);
                setPreviewFloor(null);
              }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
const NavigationIcon = ArrowUp;
