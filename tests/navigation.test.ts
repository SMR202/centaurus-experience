import test from "node:test";
import assert from "node:assert/strict";
import { shortestPath } from "../src/map/graph";
import { routeGuidance } from "../src/map/route-guidance";
test("route guidance reconciles remaining distance and identifies every floor transition", () => {
  for (const stepFree of [false, true]) {
    const route = shortestPath("G-entry", "L1-p0", stepFree)!;
    let prior = route.metres;
    route.nodes.forEach((node, i) => {
      const g = routeGuidance(route, i, "Adidas");
      assert.ok(g.remaining <= prior);
      prior = g.remaining;
      assert.equal(
        g.transition,
        !!route.nodes[i + 1] && route.nodes[i + 1].floor !== node.floor,
      );
      if (g.transition)
        assert.match(g.instruction, stepFree ? /lift/ : /stairs/);
    });
    const end = routeGuidance(route, route.nodes.length - 1, "Adidas");
    assert.equal(end.arrived, true);
    assert.equal(end.remaining, 0);
    assert.equal(end.minutes, 0);
  }
});
test("walking maneuvers distinguish left and right and use the destination name", () => {
  const route = shortestPath("G-entry", "L1-p0", true)!;
  assert.equal(routeGuidance(route, 2, "Adidas").turn, "left");
  assert.equal(
    routeGuidance(route, route.nodes.length - 2, "Adidas").detail,
    "36 m · toward Adidas",
  );
  const reverse = shortestPath("G-north", "G-stairs")!;
  assert.equal(routeGuidance(reverse, 1, "Stairs").turn, "left");
});
