import { offers } from "@/data/catalog";
import { Offer } from "@/data/types";
import { DemoState } from "./state";
export const allOffers = (state: DemoState): Offer[] => [
  ...offers,
  ...state.campaigns
    .filter((c) => c.status === "approved")
    .map((c) => ({
      ...c,
      subtitle:
        "Created in the local retailer demo. No retailer participation implied.",
      category: "Experience" as const,
      kind: "offer" as const,
      expiresAt: 14400,
    })),
];
export function remainingLabel(seconds: number) {
  const s = Math.max(0, seconds);
  return `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
