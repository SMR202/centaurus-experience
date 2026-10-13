import { Campaign, Claim, Member, ParkingSpot, Receipt } from "../data/types";
import { demoMeta, offers, rewards } from "../data/catalog";
export interface DemoState {
  version: 1;
  walkthroughSeen: boolean;
  saved: string[];
  claims: Claim[];
  redeemed: string[];
  member: Member;
  receipt: Receipt;
  parking: ParkingSpot | null;
  stepFree: boolean;
  inside: boolean;
  notifications: { events: boolean; offers: boolean };
  interested: string[];
  itinerary: string[];
  campaigns: Campaign[];
  clock: number;
}
export const initialState = (): DemoState => ({
  version: 1,
  walkthroughSeen: false,
  saved: [],
  claims: [],
  redeemed: [],
  member: {
    ...demoMeta,
    name: "Guest member",
    tier: "Gold preview",
    points: 1200,
  },
  receipt: {
    ...demoMeta,
    id: "receipt-001",
    storeId: "khaadi",
    amount: 12500,
    points: 250,
    status: "draft",
  },
  parking: null,
  stepFree: false,
  inside: false,
  notifications: { events: false, offers: false },
  interested: [],
  itinerary: ["adidas", "broadway", "cineplex"],
  campaigns: [],
  clock: 0,
});
export type Action =
  | { type: "walkthrough-seen" }
  | { type: "save"; id: string }
  | { type: "claim"; id: string }
  | { type: "redeem"; id: string }
  | { type: "receipt-submit" }
  | { type: "receipt-credit" }
  | { type: "parking"; spot: ParkingSpot | null }
  | { type: "step-free"; value: boolean }
  | { type: "inside"; value: boolean }
  | { type: "notify"; key: "events" | "offers"; value: boolean }
  | { type: "interest"; id: string }
  | { type: "itinerary"; ids: string[] }
  | { type: "submit-campaign"; title: string; storeId: string }
  | { type: "review-campaign"; id: string; approve: boolean }
  | { type: "tick"; seconds: number }
  | { type: "reset" }
  | { type: "hydrate"; state: DemoState };
const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
export function reducer(s: DemoState, a: Action): DemoState {
  switch (a.type) {
    case "hydrate":
      return a.state;
    case "walkthrough-seen":
      return { ...s, walkthroughSeen: true };
    case "reset":
      return { ...initialState(), walkthroughSeen: s.walkthroughSeen };
    case "save":
      return { ...s, saved: toggle(s.saved, a.id) };
    case "claim": {
      const offer =
        offers.find((o) => o.id === a.id) ??
        s.campaigns.find((c) => c.id === a.id && c.status === "approved");
      if (
        !offer ||
        s.claims.some((c) => c.offerId === a.id) ||
        ("expiresAt" in offer && s.clock >= offer.expiresAt)
      )
        return s;
      return {
        ...s,
        claims: [
          ...s.claims,
          {
            ...demoMeta,
            id: `claim-${a.id}`,
            offerId: a.id,
            token: `DEMO-${String(s.claims.length + 1).padStart(4, "0")}`,
          },
        ],
      };
    }
    case "redeem": {
      const r = rewards.find((r) => r.id === a.id);
      if (!r || s.redeemed.includes(a.id) || s.member.points < r.points)
        return s;
      return {
        ...s,
        member: { ...s.member, points: s.member.points - r.points },
        redeemed: [...s.redeemed, a.id],
      };
    }
    case "receipt-submit":
      return s.receipt.status === "draft"
        ? { ...s, receipt: { ...s.receipt, status: "pending" } }
        : s;
    case "receipt-credit":
      return s.receipt.status === "pending"
        ? {
            ...s,
            receipt: { ...s.receipt, status: "credited" },
            member: { ...s.member, points: s.member.points + s.receipt.points },
          }
        : s;
    case "parking":
      return { ...s, parking: a.spot };
    case "step-free":
      return { ...s, stepFree: a.value };
    case "inside":
      return { ...s, inside: a.value };
    case "notify":
      return { ...s, notifications: { ...s.notifications, [a.key]: a.value } };
    case "interest":
      return { ...s, interested: toggle(s.interested, a.id) };
    case "itinerary":
      return { ...s, itinerary: a.ids };
    case "submit-campaign":
      return a.title.trim()
        ? {
            ...s,
            campaigns: [
              ...s.campaigns,
              {
                ...demoMeta,
                id: `campaign-${s.campaigns.length + 1}`,
                title: a.title.trim().slice(0, 80),
                storeId: a.storeId,
                status: "pending",
                note: "Demo promotion. No retailer participation implied.",
              },
            ],
          }
        : s;
    case "review-campaign":
      return {
        ...s,
        campaigns: s.campaigns.map((c) =>
          c.id === a.id && c.status === "pending"
            ? { ...c, status: a.approve ? "approved" : "rejected" }
            : c,
        ),
      };
    case "tick":
      return { ...s, clock: s.clock + Math.max(0, a.seconds) };
  }
}
