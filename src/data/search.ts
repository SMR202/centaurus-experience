import { places } from "./catalog";
import { Store } from "./types";
export function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = old;
    }
  }
  return row[b.length];
}
export function searchPlaces(
  query: string,
  category = "All",
  source: Store[] = places,
): Store[] {
  const q = query.toLowerCase().trim();
  return source.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (!q ||
        [p.name.toLowerCase(), ...p.keywords].some(
          (word) =>
            word.includes(q) || (q.length >= 4 && editDistance(word, q) <= 1),
        )),
  );
}
