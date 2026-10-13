export interface Provenance {
  sourceUrl: string;
  verification: "directory" | "demo" | "pending";
  demo: boolean;
}
export type FloorId = "B2" | "B1" | "G" | "L1" | "L2" | "L3" | "L4";
export interface Floor extends Provenance {
  id: FloorId;
  name: string;
}
export type Category =
  | "Fashion"
  | "Shoes"
  | "Dining"
  | "Beauty"
  | "Lifestyle"
  | "Entertainment"
  | "Services";
export interface Store extends Provenance {
  id: string;
  name: string;
  category: Category;
  floor?: FloorId;
  nodeId: string;
  description: string;
  keywords: string[];
  cuisine?: string;
  image?: "coffee" | "dining";
}
export interface PointOfInterest extends Store {
  kind: "toilet" | "prayer" | "lift" | "exit" | "parking" | "atm";
}
export interface RouteNode extends Provenance {
  id: string;
  floor: FloorId;
  x: number;
  y: number;
  label: string;
}
export interface RouteEdge extends Provenance {
  from: string;
  to: string;
  metres: number;
  kind: "walk" | "stairs" | "lift";
}
export interface Offer extends Provenance {
  id: string;
  storeId: string;
  title: string;
  subtitle: string;
  category: "Style" | "Food" | "Experience";
  kind: "offer" | "drop";
  expiresAt: number;
}
export interface Drop extends Offer {
  kind: "drop";
  releaseName: string;
}
export interface Claim extends Provenance {
  id: string;
  offerId: string;
  token: string;
}
export interface Reward extends Provenance {
  id: string;
  title: string;
  points: number;
  description: string;
}
export interface Member extends Provenance {
  name: string;
  tier: string;
  points: number;
}
export interface Event extends Provenance {
  id: string;
  title: string;
  date: string;
  description: string;
  storeId: string;
}
export interface Film extends Provenance {
  id: string;
  title: string;
  genre: string;
  minutes: number;
  times: string[];
}
export interface ParkingSpot extends Provenance {
  floor: "B1" | "B2";
  zone: string;
  space: string;
}
export interface Receipt extends Provenance {
  id: string;
  storeId: string;
  amount: number;
  points: number;
  status: "draft" | "pending" | "credited";
}
export interface Campaign extends Provenance {
  id: string;
  title: string;
  storeId: string;
  status: "pending" | "approved" | "rejected";
  note: string;
}
