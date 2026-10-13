import { PathResult } from "./graph";
export function routeGuidance(
  path: PathResult,
  step: number,
  destination: string,
) {
  const current = path.nodes[step],
    next = path.nodes[step + 1],
    previous = path.nodes[step - 1];
  const arrived = step >= path.nodes.length - 1;
  const transition = !!next && current.floor !== next.floor;
  const remaining = path.edges
    .slice(step)
    .reduce((sum, e) => sum + e.metres, 0);
  let turn: "straight" | "left" | "right" | "floor" | "arrived" = "straight";
  if (arrived) turn = "arrived";
  else if (transition) turn = "floor";
  else if (previous && previous.floor === current.floor && next) {
    const ax = current.x - previous.x,
      ay = current.y - previous.y,
      bx = next.x - current.x,
      by = next.y - current.y;
    const cross = ax * by - ay * bx;
    if (cross > 0) turn = "right";
    else if (cross < 0) turn = "left";
  }
  const target =
    next?.id === path.nodes.at(-1)?.id
      ? destination
      : next?.label.toLowerCase();
  const instruction = arrived
    ? `Arrived at ${destination}`
    : transition
      ? `Take the ${path.edges[step].kind === "lift" ? "lift" : "stairs"} to ${next!.floor}`
      : `${turn === "left" ? "Turn left" : turn === "right" ? "Turn right" : "Continue straight"}`;
  return {
    arrived,
    transition,
    remaining,
    minutes: remaining ? Math.max(1, Math.ceil(remaining / 65)) : 0,
    turn,
    instruction,
    detail: transition
      ? "Confirm below when you reach the next floor."
      : arrived
        ? "Destination reached in the simulation."
        : `${path.edges[step]?.metres ?? 0} m · toward ${target}`,
  };
}
