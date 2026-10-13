export const languages = {
  en: { name: "English", direction: "ltr" },
  ur: { name: "اردو", direction: "rtl" },
} as const;
const en = {
  home: "Home",
  explore: "Explore",
  offers: "Offers",
  club: "Club",
  you: "You",
  search: "Search stores, food & more",
  demo: "Interactive prototype",
  floorPending: "Floor confirmation pending",
};
export type TranslationKey = keyof typeof en;
export const t = (key: TranslationKey) => en[key];
export const formatPKR = (amount: number) =>
  `PKR ${amount.toLocaleString("en-PK")}`;
