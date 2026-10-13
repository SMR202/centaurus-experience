import React, { useEffect, useState } from "react";
import { PanResponder, Platform, Pressable, View } from "react-native";
import Svg, { Circle, G, Path, Rect, Text as SvgText } from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  LocateFixed,
  Minus,
  Plus,
  MoveVertical,
  Footprints,
  Navigation2,
} from "lucide-react-native";
import { FloorId, RouteNode } from "@/data/types";
import { places } from "@/data/catalog";
import { c, font } from "@/theme/tokens";
import { IconButton, T } from "@/components/ui";
import { getNode, parkingNode } from "./graph";
import { useDemo } from "@/features/provider";

export function IndoorMap({
  floor,
  route = [],
  position,
  selected,
  onSelect,
  height = 380,
  edgeToEdge = false,
  completed = [],
}: {
  floor: FloorId;
  route?: RouteNode[];
  position?: RouteNode;
  selected?: string;
  onSelect?: (id: string) => void;
  height?: number;
  edgeToEdge?: boolean;
  completed?: RouteNode[];
}) {
  const { state } = useDemo();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(350);
  const reduced = useReducedMotion();
  const scale = Math.min(width / 350, height / 420),
    ox = (width - 350 * scale) / 2,
    oy = (height - 420 * scale) / 2;
  const px = useSharedValue(position?.x ?? 175),
    py = useSharedValue(position?.y ?? 375);
  useEffect(() => {
    px.value = withTiming(position?.x ?? 175, { duration: reduced ? 0 : 850 });
    py.value = withTiming(position?.y ?? 375, { duration: reduced ? 0 : 850 });
  }, [position, px, py, reduced]);
  const marker = useAnimatedStyle(() => ({
    position: "absolute",
    left: ox + px.value * scale - 10,
    top: oy + py.value * scale - 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: c.blue,
    borderWidth: 4,
    borderColor: "white",
    boxShadow: "0 0 0 7px rgba(40,105,219,.14)",
  }));
  const [panControl] = useState(() => {
    let origin = { x: 0, y: 0 },
      last = { x: 0, y: 0 };
    return {
      reset: () => {
        last = { x: 0, y: 0 };
        setPan(last);
      },
      gesture: PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 8 || Math.abs(g.dy) > 8,
        onPanResponderGrant: () => {
          origin = last;
        },
        onPanResponderMove: (_, g) => {
          last = {
            x: Math.max(-110, Math.min(110, origin.x + g.dx)),
            y: Math.max(-130, Math.min(130, origin.y + g.dy)),
          };
          setPan(last);
        },
      }),
    };
  });
  const visible = places
    .map((p) =>
      p.id === "parking" && state.parking
        ? { ...p, nodeId: parkingNode(state.parking) }
        : p,
    )
    .filter((p) => getNode(p.nodeId).floor === floor);
  const groups = new Map<string, typeof visible>();
  visible.forEach((p) =>
    groups.set(p.nodeId, [...(groups.get(p.nodeId) ?? []), p]),
  );
  const drawPath = (nodes: RouteNode[]) =>
    nodes
      .map((n, i) =>
        n.floor === floor
          ? `${i && nodes[i - 1].floor === floor ? "L" : "M"}${n.x} ${n.y}`
          : "",
      )
      .join(" ");
  const path = drawPath(route),
    travelled = drawPath(completed);
  const destination = route.at(-1);
  const basement = floor.startsWith("B");
  const units = [
    [27, 40, 91, 86],
    [232, 40, 91, 86],
    [27, 148, 80, 82],
    [243, 148, 80, 82],
    [27, 257, 91, 85],
    [232, 257, 91, 85],
  ];
  return (
    <View
      style={{
        height,
        backgroundColor: "#E9EEE9",
        overflow: "hidden",
        borderRadius: edgeToEdge ? 0 : 18,
      }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View
        {...panControl.gesture.panHandlers}
        style={{
          height,
          width: "100%",
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: zoom },
          ],
        }}
      >
        <Svg
          width="100%"
          height={height}
          viewBox="0 0 350 420"
          preserveAspectRatio="xMidYMid meet"
          accessibilityLabel={`Illustrative indoor map, ${floor}; blue line shows the route`}
        >
          <Path d="M0 10H350M0 410H350" stroke="#DCE3DC" strokeWidth="16" />
          <Rect x="15" y="24" width="320" height="372" rx="19" fill="#D5DDD5" />
          <Rect
            x="11"
            y="19"
            width="328"
            height="372"
            rx="18"
            fill="#FFFFFF"
            stroke="#CBD4CC"
            strokeWidth="1.5"
          />
          <Path
            d="M175 373V86M68 85H280M68 190H280M68 300H280"
            stroke="#F3F4F0"
            strokeWidth="36"
            strokeLinecap="round"
          />
          {units.map(([x, y, w, h], i) => {
            const group = groups.get(`${floor}-p${i}`) ?? [];
            const p = group.find((p) => p.id === selected) ?? group[0];
            const active = group.some((p) => p.id === selected);
            const n = getNode(`${floor}-p${i}`);
            const label = basement
              ? `ZONE ${String.fromCharCode(65 + i)}`
              : (p?.name ?? "Shops");
            return (
              <G key={i}>
                <Rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="3"
                  fill={
                    active
                      ? "#E0ECFF"
                      : p?.category === "Dining"
                        ? "#F5E8D5"
                        : i % 3 === 0
                          ? "#F0ECE4"
                          : "#E9EDE9"
                  }
                  stroke={active ? "#89ADE7" : "#D9DED7"}
                  strokeWidth="1.3"
                />
                <Path
                  d={
                    i % 2 === 0
                      ? `M${x + w} ${n.y - 8}V${n.y + 8}`
                      : `M${x} ${n.y - 8}V${n.y + 8}`
                  }
                  stroke="white"
                  strokeWidth="4"
                />
                {basement
                  ? [0, 1, 2].map((j) => (
                      <Path
                        key={j}
                        d={`M${x + 10 + j * 25} ${y + 10}v20h19v-20 M${x + 10 + j * 25} ${y + h - 10}v-20h19v20`}
                        stroke="#CCD4CB"
                        fill="none"
                      />
                    ))
                  : null}
                <SvgText
                  fontFamily={
                    Platform.OS === "web" ? "Arial, sans-serif" : font.medium
                  }
                  x={x + w / 2}
                  y={n.y - (active ? 25 : 7)}
                  textAnchor="middle"
                  fontSize={Math.min(15, (label.length > 13 ? 9 : 11) / scale)}
                  fontWeight="600"
                  fill={active ? "#205AAE" : "#4F5E55"}
                >
                  {label.length > 20 ? label.slice(0, 18) + "…" : label}
                </SvgText>
                <SvgText
                  fontFamily={
                    Platform.OS === "web" ? "Arial, sans-serif" : font.medium
                  }
                  x={x + w / 2}
                  y={n.y + (active ? -12 : 9)}
                  textAnchor="middle"
                  fontSize={Math.min(11, 8 / scale)}
                  fill="#7B857C"
                >
                  {group.length > 1
                    ? `+${group.length - 1} nearby`
                    : basement
                      ? "PARKING"
                      : (p?.category ?? "SHOPS")}
                </SvgText>
              </G>
            );
          })}
          <Rect x="127" y="126" width="20" height="34" rx="10" fill="#DDE8D8" />
          <Rect x="203" y="126" width="20" height="34" rx="10" fill="#DDE8D8" />
          <Rect x="127" y="226" width="20" height="28" rx="10" fill="#DDE8D8" />
          <Rect x="203" y="226" width="20" height="28" rx="10" fill="#DDE8D8" />
          <SvgText
            fontFamily={
              Platform.OS === "web" ? "Arial, sans-serif" : font.medium
            }
            x="175"
            y="47"
            textAnchor="middle"
            fontSize={Math.min(11, 8 / scale)}
            letterSpacing="1.4"
            fill="#8A938A"
          >
            NORTH GALLERY
          </SvgText>
          <SvgText
            fontFamily={
              Platform.OS === "web" ? "Arial, sans-serif" : font.medium
            }
            x="175"
            y="354"
            textAnchor="middle"
            fontSize={Math.min(11, 8 / scale)}
            letterSpacing="1.4"
            fill="#8A938A"
          >
            {basement ? "PARKING LOBBY" : "SOUTH GALLERY"}
          </SvgText>
          {path ? (
            <>
              <Path
                d={path}
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d={path}
                fill="none"
                stroke="#2877E2"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : null}
          {travelled ? (
            <Path
              d={travelled}
              fill="none"
              stroke="#96B8E9"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <Rect
            x="119"
            y="178"
            width="26"
            height="26"
            rx="7"
            fill="#FFFFFF"
            stroke="#B9C7BC"
          />
          <Rect
            x="205"
            y="178"
            width="26"
            height="26"
            rx="7"
            fill="#FFFFFF"
            stroke="#B9C7BC"
          />
          <Path
            d="M125 196v-11h14v11 M129 188v6m-2-2 2 2 2-2 M135 194v-6m-2 2 2-2 2 2"
            stroke="#64766A"
            strokeWidth="1.3"
            fill="none"
          />
          <Path
            d="M211 198v-4h4v-4h4v-4h5"
            stroke="#64766A"
            strokeWidth="1.7"
            fill="none"
          />
          <SvgText
            fontFamily={
              Platform.OS === "web" ? "Arial, sans-serif" : font.medium
            }
            x="132"
            y="217"
            fontSize={Math.min(11, 8 / scale)}
            textAnchor="middle"
            fill="#65766A"
          >
            LIFT
          </SvgText>
          <SvgText
            fontFamily={
              Platform.OS === "web" ? "Arial, sans-serif" : font.medium
            }
            x="219"
            y="217"
            fontSize={Math.min(11, 8 / scale)}
            textAnchor="middle"
            fill="#65766A"
          >
            STAIRS
          </SvgText>
          {destination?.floor === floor ? (
            <G>
              <Circle
                cx={destination.x}
                cy={destination.y}
                r="11"
                fill="#2869DB"
                stroke="white"
                strokeWidth="3"
              />
              <Circle
                cx={destination.x}
                cy={destination.y}
                r="3"
                fill="white"
              />
            </G>
          ) : null}
          <Path d="M155 390h40" stroke="#9BAE9C" strokeWidth="3" />
          <SvgText
            fontFamily={
              Platform.OS === "web" ? "Arial, sans-serif" : font.medium
            }
            x="175"
            y="410"
            fontSize="9"
            fontWeight="600"
            textAnchor="middle"
            fill="#64746A"
          >
            {floor === "G" ? "MAIN ENTRANCE" : `${floor} · ILLUSTRATIVE FLOOR`}
          </SvgText>
        </Svg>
        {onSelect &&
          [...groups]
            .filter(([id]) => id.includes("-p"))
            .map(([id, group]) => {
              const n = getNode(id);
              const next =
                group[
                  (group.findIndex((p) => p.id === selected) + 1) % group.length
                ];
              return (
                <Pressable
                  key={id}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${next.name}${group.length > 1 ? ` in cluster of ${group.length}` : ""}`}
                  onPress={() => onSelect(next.id)}
                  style={{
                    position: "absolute",
                    left: ox + n.x * scale - 24,
                    top: oy + n.y * scale - 24,
                    width: 48,
                    height: 48,
                  }}
                />
              );
            })}
        {!position || position.floor === floor ? (
          <Animated.View pointerEvents="none" style={marker} />
        ) : null}
      </View>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          backgroundColor: "#FFFFFFEE",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 8,
        }}
      >
        <T tone="label" style={{ fontSize: 10, letterSpacing: 0.5 }}>
          {floor === "G"
            ? "GROUND FLOOR"
            : floor.startsWith("B")
              ? `BASEMENT ${floor.slice(1)}`
              : `LEVEL ${floor.slice(1)}`}
        </T>
        {!edgeToEdge ? (
          <T
            tone="small"
            style={{ fontSize: 10, lineHeight: 14 }}
            color={c.muted}
          >
            Illustrative indoor map
          </T>
        ) : null}
      </View>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 16,
          top: 16,
          alignItems: "center",
          gap: 2,
        }}
      >
        <T style={{ fontFamily: font.bold, fontSize: 10, lineHeight: 14 }}>N</T>
        <Navigation2 size={18} color="#607568" fill="#607568" />
      </View>
      <View style={{ position: "absolute", right: 12, bottom: 12, gap: 6 }}>
        <IconButton
          label="Zoom in"
          icon={Plus}
          disabled={zoom >= 2}
          onPress={() => setZoom((z) => Math.min(2, z + 0.25))}
        />
        <IconButton
          label="Zoom out"
          icon={Minus}
          disabled={zoom <= 1}
          onPress={() => setZoom((z) => Math.max(1, z - 0.25))}
        />
        <IconButton
          label="Recenter map"
          icon={LocateFixed}
          onPress={() => {
            panControl.reset();
            setZoom(1);
          }}
        />
      </View>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 12,
          bottom: 12,
          backgroundColor: "#FFFFFFEA",
          padding: 8,
          borderRadius: 8,
          gap: 3,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <MoveVertical size={12} color={c.muted} />
          <T tone="small" style={{ fontSize: 10, lineHeight: 14 }}>
            Lift
          </T>
          <Footprints size={12} color={c.muted} />
          <T tone="small" style={{ fontSize: 10, lineHeight: 14 }}>
            Walk
          </T>
        </View>
        <T
          tone="small"
          style={{ fontSize: 10, lineHeight: 14 }}
          color={c.muted}
        >
          Drag to pan · {Math.round(zoom * 100)}%
        </T>
      </View>
    </View>
  );
}
