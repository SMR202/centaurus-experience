import {
  Category,
  Drop,
  Event,
  Film,
  Floor,
  FloorId,
  Offer,
  PointOfInterest,
  Provenance,
  Reward,
  Store,
} from "./types";
export const directoryUrl = "https://thecentaurusmall.com/brands/";
export const demoMeta: Provenance = {
  sourceUrl: "local://centaurus-demo",
  verification: "demo",
  demo: true,
};
export const floorIds: FloorId[] = ["B2", "B1", "G", "L1", "L2", "L3", "L4"];
export const floors: Floor[] = floorIds.map((id) => ({
  ...demoMeta,
  id,
  name:
    id === "G"
      ? "Ground"
      : id.startsWith("B")
        ? "Basement " + id.slice(1)
        : "Level " + id.slice(1),
}));
type Seed = [string, string, Category, FloorId?, string?];
const seeds: Seed[] = [
  ["adidas", "Adidas", "Shoes"],
  ["khaadi", "Khaadi", "Fashion"],
  ["aldo", "Aldo", "Shoes"],
  ["sapphire", "Sapphire", "Fashion"],
  ["outfitters", "Outfitters", "Fashion"],
  ["nike", "Nike", "Shoes"],
  ["skechers", "Skechers", "Shoes"],
  ["levis", "Levi’s", "Fashion"],
  ["charles-keith", "Charles & Keith", "Shoes"],
  ["miniso", "Miniso", "Lifestyle"],
  ["body-shop", "The Body Shop", "Beauty"],
  ["sana-safinaz", "Sana Safinaz", "Fashion"],
  ["j", "J.", "Fashion"],
  ["alkaram", "Alkaram", "Fashion"],
  ["cinnabon", "Cinnabon", "Dining", "G", "Bakery"],
  ["koa", "KOA", "Fashion", "L3"],
  ["taana-baana", "Taana Baana", "Fashion", "L1"],
  ["imrozia", "Imrozia Serene", "Fashion", "L2"],
  ["bachaa-party", "Bachaa Party", "Lifestyle", "L3"],
  ["gloria-jeans", "Gloria Jean’s", "Dining", undefined, "Coffee"],
  ["broadway", "Broadway Pizza", "Dining", undefined, "Pizza"],
  ["ginyaki", "Ginyaki", "Dining", undefined, "Asian"],
  ["bundu-khan", "Bundu Khan", "Dining", undefined, "Pakistani"],
  ["kfc", "KFC", "Dining", undefined, "Fast food"],
  ["mcdonalds", "McDonald’s", "Dining", undefined, "Fast food"],
  ["cineplex", "Cineplex", "Entertainment"],
  ["allied-bank", "Allied Bank", "Services"],
];
const demoFloors: Record<string, FloorId> = {
  adidas: "L1",
  khaadi: "G",
  aldo: "L1",
  "gloria-jeans": "L2",
  broadway: "L4",
  ginyaki: "L4",
  "bundu-khan": "L4",
  kfc: "L4",
  mcdonalds: "L4",
  cineplex: "L4",
  "allied-bank": "G",
};
export const stores: Store[] = seeds.map(
  ([id, name, category, floor, cuisine], i) => ({
    id,
    name,
    category,
    floor,
    cuisine,
    nodeId: `${demoFloors[id] ?? floor ?? "L2"}-p${i % 6}`,
    sourceUrl: floor
      ? "https://thecentaurusmall.com/team_group/shop/"
      : directoryUrl,
    verification: "directory",
    demo: false,
    description:
      category === "Dining"
        ? "Make room for a pause in your day. Find this destination in the official mall directory."
        : category === "Entertainment"
          ? "Make a film the final stop of your visit. Browse our clearly marked sample programme."
          : "A destination in the Centaurus directory. Explore the mall, save your favourites and plan your visit.",
    keywords: [
      category.toLowerCase(),
      ...(category === "Shoes"
        ? ["sneakers", "trainers", "sports", "footwear"]
        : []),
      ...(cuisine ? [cuisine.toLowerCase()] : []),
    ],
    image:
      cuisine === "Coffee" || cuisine === "Bakery"
        ? "coffee"
        : category === "Dining"
          ? "dining"
          : undefined,
  }),
);
export const pois: PointOfInterest[] = [
  {
    id: "restroom",
    name: "Restrooms",
    kind: "toilet",
    nodeId: "L1-p4",
    keywords: ["toilet", "washroom", "bathroom", "wc", "restroom"],
  },
  {
    id: "prayer",
    name: "Prayer space",
    kind: "prayer",
    nodeId: "L2-p5",
    keywords: ["prayer", "mosque", "namaz", "salah"],
  },
  {
    id: "lift",
    name: "Central lift",
    kind: "lift",
    nodeId: "G-lift",
    keywords: ["elevator", "lift", "accessible"],
  },
  {
    id: "exit",
    name: "Main entrance / exit",
    kind: "exit",
    nodeId: "G-entry",
    keywords: ["exit", "entrance", "gate"],
  },
  {
    id: "parking",
    name: "Saved car",
    kind: "parking",
    nodeId: "B2-p2",
    keywords: ["car", "parking", "park"],
  },
  {
    id: "atm",
    name: "ATM point",
    kind: "atm",
    nodeId: "G-p5",
    keywords: ["atm", "cash", "bank"],
  },
].map((p) => ({
  ...p,
  ...demoMeta,
  category: "Services",
  description:
    "Illustrative service point. Ask the mall information desk for its actual location.",
})) as PointOfInterest[];
export const places: Store[] = [...stores, ...pois];
export const findPlace = (id: string) => places.find((s) => s.id === id);
export const floorLabel = (s: Store) =>
  s.floor
    ? `${floors.find((f) => f.id === s.floor)?.name} · directory`
    : "Floor confirmation pending";
export const offers: Offer[] = [
  {
    ...demoMeta,
    id: "city-edit",
    storeId: "adidas",
    title: "The city in motion",
    subtitle: "A fresh perspective on your everyday route.",
    category: "Style",
    kind: "drop",
    releaseName: "CITY EDIT / 01",
    expiresAt: 3600,
  } as Drop,
  {
    ...demoMeta,
    id: "coffee-pause",
    storeId: "gloria-jeans",
    title: "Make time for coffee",
    subtitle: "A little pause. A better afternoon.",
    category: "Food",
    kind: "offer",
    expiresAt: 7200,
  },
  {
    ...demoMeta,
    id: "dinner-edit",
    storeId: "broadway",
    title: "A table for your evening",
    subtitle: "Round off your visit with something good.",
    category: "Food",
    kind: "offer",
    expiresAt: 10800,
  },
];
export const rewards: Reward[] = [
  {
    ...demoMeta,
    id: "coffee",
    title: "Your coffee moment",
    points: 400,
    description: "A sample café reward to demonstrate the Club wallet.",
  },
  {
    ...demoMeta,
    id: "parking",
    title: "A smoother arrival",
    points: 600,
    description: "An illustrative parking benefit for your next visit.",
  },
];
export const events: Event[] = [
  {
    ...demoMeta,
    id: "design-weekend",
    title: "The makers’ weekend",
    date: "17 October 2026 · 4:00 pm PKT",
    description:
      "A sample gathering of craft, conversation and independent design. Save your interest to rehearse the event journey. This is not a scheduled mall event.",
    storeId: "exit",
  },
  {
    ...demoMeta,
    id: "family-afternoon",
    title: "Small moments, big smiles",
    date: "18 October 2026 · 3:00 pm PKT",
    description:
      "A fictional family afternoon for the prototype. Registration is stored on this device only.",
    storeId: "bachaa-party",
  },
];
export const films: Film[] = [
  {
    ...demoMeta,
    id: "blue-hour",
    title: "The Blue Hour",
    genre: "Fictional drama",
    minutes: 112,
    times: ["3:30 pm", "6:15 pm", "9:00 pm"],
  },
  {
    ...demoMeta,
    id: "orbit",
    title: "Beyond the Orbit",
    genre: "Fictional adventure",
    minutes: 126,
    times: ["2:45 pm", "5:30 pm", "8:30 pm"],
  },
];
