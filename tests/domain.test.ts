import test from "node:test";
import assert from "node:assert/strict";
import { initialState, reducer } from "../src/features/state";
import { searchPlaces } from "../src/data/search";
import { demoMeta, places, stores } from "../src/data/catalog";
import {
  edges,
  itineraryDistance,
  optimizeStops,
  shortestPath,
} from "../src/map/graph";
import { resolveIntent } from "../src/features/assistant";

test("directory provenance separates facts from demo geometry", () => {
  assert.ok(stores.length >= 20);
  assert.ok(
    stores.every(
      (p) => p.sourceUrl.startsWith("https://thecentaurusmall.com/") && !p.demo,
    ),
  );
  assert.equal(stores.find((p) => p.id === "adidas")?.floor, undefined);
  assert.equal(stores.find((p) => p.id === "cinnabon")?.floor, "G");
  assert.ok(places.every((p) => shortestPath("G-entry", p.nodeId)));
});
test("standard route has stairs while step-free excludes every stair edge", () => {
  const standard = shortestPath("G-entry", "L1-p0")!;
  const accessible = shortestPath("G-entry", "L1-p0", true)!;
  assert.ok(standard.edges.some((e) => e.kind === "stairs"));
  assert.ok(accessible.edges.some((e) => e.kind === "lift"));
  assert.ok(accessible.edges.every((e) => e.kind !== "stairs"));
  assert.ok(accessible.metres > standard.metres);
  assert.equal(
    accessible.metres,
    accessible.edges.reduce((s, e) => s + e.metres, 0),
  );
});
test("every graph destination reachable step-free and malformed endpoints return no route", () => {
  for (const p of places) {
    const result = shortestPath("G-entry", p.nodeId, true);
    assert.ok(result);
    assert.equal(result.nodes.at(-1)?.id, p.nodeId);
  }
  assert.equal(shortestPath("missing", "G-entry"), null);
  assert.equal(shortestPath("G-entry", "missing"), null);
  assert.equal(shortestPath("G-entry", "G-entry")?.metres, 0);
});
test("route edges are contiguous and inverse routes have equal cost", () => {
  for (const target of ["B2-p2", "L1-p0", "L4-p1"]) {
    const route = shortestPath("G-entry", target)!;
    route.nodes
      .slice(1)
      .forEach((n, i) =>
        assert.ok(
          edges.some(
            (e) =>
              (e.from === n.id && e.to === route.nodes[i].id) ||
              (e.to === n.id && e.from === route.nodes[i].id),
          ),
        ),
      );
    assert.equal(route.metres, shortestPath(target, "G-entry")?.metres);
  }
});
test("optimizer improves a deliberately inefficient itinerary and preserves stops", () => {
  const stops = ["L4-p1", "L1-p0", "L2-p2"];
  const optimized = optimizeStops("G-entry", stops, true);
  assert.deepEqual([...optimized].sort(), [...stops].sort());
  assert.ok(
    itineraryDistance("G-entry", optimized, true) <
      itineraryDistance("G-entry", stops, true),
  );
  assert.deepEqual(optimizeStops("G-entry", [], true), []);
});
test("search supports partial names, typo and service synonyms", () => {
  for (const q of ["Adi", "adids"])
    assert.ok(searchPlaces(q).some((p) => p.id === "adidas"));
  for (const q of ["toilet", "washroom", "restroom"])
    assert.ok(searchPlaces(q).some((p) => p.id === "restroom"));
  assert.ok(searchPlaces("coffee").some((p) => p.id === "gloria-jeans"));
  assert.equal(searchPlaces("coffee", "Shoes").length, 0);
  assert.equal(searchPlaces("zzzyyxx").length, 0);
});
test("claim is idempotent and expires against deterministic local time", () => {
  let s = initialState();
  s = reducer(s, { type: "claim", id: "city-edit" });
  s = reducer(s, { type: "claim", id: "city-edit" });
  assert.equal(s.claims.length, 1);
  assert.equal(s.claims[0].demo, true);
  let expired = reducer(initialState(), { type: "tick", seconds: 3600 });
  expired = reducer(expired, { type: "claim", id: "city-edit" });
  assert.equal(expired.claims.length, 0);
});
test("receipt and reward reconcile exactly and prevent duplicate credit/debit", () => {
  let s = initialState();
  s = reducer(s, { type: "receipt-credit" });
  assert.equal(s.member.points, 1200);
  s = reducer(s, { type: "receipt-submit" });
  assert.equal(s.receipt.status, "pending");
  s = reducer(s, { type: "receipt-credit" });
  s = reducer(s, { type: "receipt-credit" });
  assert.equal(s.member.points, 1450);
  s = reducer(s, { type: "redeem", id: "coffee" });
  s = reducer(s, { type: "redeem", id: "coffee" });
  assert.equal(s.member.points, 1050);
  assert.deepEqual(s.redeemed, ["coffee"]);
});
test("insufficient balance cannot redeem and parking persists in state until reset", () => {
  let s = initialState();
  s.member.points = 100;
  assert.equal(reducer(s, { type: "redeem", id: "coffee" }).redeemed.length, 0);
  s = reducer(s, {
    type: "parking",
    spot: { ...demoMeta, floor: "B2", zone: "C", space: "24" },
  });
  assert.equal(s.parking?.space, "24");
  assert.deepEqual(reducer(s, { type: "reset" }), initialState());
});
test("campaign must be approved before it can be claimed and review is final", () => {
  let s = initialState();
  s = reducer(s, {
    type: "submit-campaign",
    title: "Weekend studio",
    storeId: "khaadi",
  });
  s = reducer(s, { type: "claim", id: "campaign-1" });
  assert.equal(s.claims.length, 0);
  s = reducer(s, { type: "review-campaign", id: "campaign-1", approve: true });
  s = reducer(s, { type: "review-campaign", id: "campaign-1", approve: false });
  assert.equal(s.campaigns[0].status, "approved");
  s = reducer(s, { type: "claim", id: "campaign-1" });
  assert.equal(s.claims.length, 1);
});
test("assistant intent boundaries are deterministic", () => {
  assert.equal(resolveIntent("Where can I get coffee?"), "coffee");
  assert.equal(resolveIntent("Plan shoes then dinner then a movie"), "evening");
  assert.equal(resolveIntent("Find a prayer room"), "prayer");
  assert.equal(resolveIntent("What discounts are nearby?"), "offers");
  assert.equal(resolveIntent("Do you have my shoe size?"), "unknown");
});
