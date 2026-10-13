import { demoMeta, floorIds } from "../data/catalog";
import { FloorId, ParkingSpot, RouteEdge, RouteNode } from "../data/types";
export const parkingNode = (spot: ParkingSpot) =>
  `${spot.floor}-p${Math.max(0, ["A", "B", "C", "D"].indexOf(spot.zone))}`;
export const nodes: RouteNode[] = [];
export const edges: RouteEdge[] = [];
const positions = [
  [68, 85],
  [280, 85],
  [68, 190],
  [280, 190],
  [68, 300],
  [280, 300],
];
const edge = (
  from: string,
  to: string,
  metres: number,
  kind: RouteEdge["kind"] = "walk",
) => edges.push({ ...demoMeta, from, to, metres, kind });
for (const floor of floorIds) {
  const add = (suffix: string, x: number, y: number, label: string) =>
    nodes.push({ ...demoMeta, id: `${floor}-${suffix}`, floor, x, y, label });
  add("entry", 175, 375, "Entrance");
  add("south", 175, 300, "South gallery");
  add("hub", 175, 190, "Atrium");
  add("north", 175, 85, "North gallery");
  add("lift", 132, 190, "Lift");
  add("stairs", 218, 190, "Stairs");
  positions.forEach(([x, y], i) => {
    add(`p${i}`, x, y, `Destination ${i + 1}`);
    edge(
      `${floor}-p${i}`,
      `${floor}-${i < 2 ? "north" : i < 4 ? "hub" : "south"}`,
      36,
    );
  });
  edge(`${floor}-entry`, `${floor}-south`, 30);
  edge(`${floor}-south`, `${floor}-hub`, 44);
  edge(`${floor}-hub`, `${floor}-north`, 42);
  edge(`${floor}-hub`, `${floor}-lift`, 16);
  edge(`${floor}-hub`, `${floor}-stairs`, 16);
}
for (let i = 1; i < floorIds.length; i++) {
  edge(`${floorIds[i - 1]}-stairs`, `${floorIds[i]}-stairs`, 20, "stairs");
  edge(`${floorIds[i - 1]}-lift`, `${floorIds[i]}-lift`, 32, "lift");
}
export const getNode = (id: string) => nodes.find((n) => n.id === id)!;
export interface PathResult {
  nodes: RouteNode[];
  edges: RouteEdge[];
  metres: number;
  minutes: number;
}
export function shortestPath(
  from: string,
  to: string,
  stepFree = false,
): PathResult | null {
  if (!nodes.some((n) => n.id === from) || !nodes.some((n) => n.id === to))
    return null;
  const dist = new Map(nodes.map((n) => [n.id, Infinity]));
  const prev = new Map<string, { id: string; edge: RouteEdge }>();
  const unvisited = new Set(nodes.map((n) => n.id));
  dist.set(from, 0);
  while (unvisited.size) {
    let u = "";
    let best = Infinity;
    for (const id of unvisited) {
      if (dist.get(id)! < best) {
        u = id;
        best = dist.get(id)!;
      }
    }
    if (!u) break;
    if (u === to) break;
    unvisited.delete(u);
    for (const e of edges) {
      if (stepFree && e.kind === "stairs") continue;
      const v = e.from === u ? e.to : e.to === u ? e.from : null;
      if (!v || !unvisited.has(v)) continue;
      const d = best + e.metres;
      if (d < dist.get(v)!) {
        dist.set(v, d);
        prev.set(v, { id: u, edge: e });
      }
    }
  }
  if (!Number.isFinite(dist.get(to))) return null;
  const ids = [to];
  const pathEdges: RouteEdge[] = [];
  while (ids[0] !== from) {
    const p = prev.get(ids[0]);
    if (!p) return null;
    ids.unshift(p.id);
    pathEdges.unshift(p.edge);
  }
  const metres = dist.get(to)!;
  return {
    nodes: ids.map(getNode),
    edges: pathEdges,
    metres,
    minutes: Math.max(1, Math.ceil(metres / 65)),
  };
}
export function itineraryDistance(
  start: string,
  stops: string[],
  stepFree: boolean,
) {
  let sum = 0;
  let from = start;
  for (const to of stops) {
    const p = shortestPath(from, to, stepFree);
    if (!p) return Infinity;
    sum += p.metres;
    from = to;
  }
  return sum;
}
export function optimizeStops(
  start: string,
  stops: string[],
  stepFree: boolean,
): string[] {
  if (stops.length > 7) return stops;
  let best = [...stops],
    cost = itineraryDistance(start, stops, stepFree);
  const visit = (done: string[], left: string[]) => {
    if (!left.length) {
      const d = itineraryDistance(start, done, stepFree);
      if (d < cost) {
        cost = d;
        best = done;
      }
      return;
    }
    left.forEach((s, i) =>
      visit(
        [...done, s],
        left.filter((_, j) => i !== j),
      ),
    );
  };
  visit([], stops);
  return best;
}
export const floorOf = (id: string): FloorId => getNode(id).floor;
