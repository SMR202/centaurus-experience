import test from "node:test";
import assert from "node:assert/strict";
import { initialState, reducer } from "../src/features/state";
test("tour dismissal survives demo reset without changing financial state", () => {
  const start = initialState();
  const seen = reducer(start, { type: "walkthrough-seen" });
  assert.equal(start.walkthroughSeen, false);
  assert.equal(seen.walkthroughSeen, true);
  assert.deepEqual(seen.member, start.member);
  assert.deepEqual(seen.claims, start.claims);
  const credited = reducer(reducer(seen, { type: "receipt-submit" }), {
    type: "receipt-credit",
  });
  const reset = reducer(credited, { type: "reset" });
  assert.equal(reset.walkthroughSeen, true);
  assert.equal(reset.member.points, 1200);
  assert.equal(reset.receipt.status, "draft");
});
