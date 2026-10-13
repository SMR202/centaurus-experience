export type Intent = "coffee" | "evening" | "prayer" | "offers" | "unknown";
export function resolveIntent(text: string): Intent {
  const q = text.toLowerCase();
  if (/plan|evening|movie|dinner|shoes/.test(q)) return "evening";
  if (/coffee|café|cafe|tea/.test(q)) return "coffee";
  if (/prayer|namaz|mosque/.test(q)) return "prayer";
  if (/offer|discount|nearby/.test(q)) return "offers";
  return "unknown";
}
export const prompts = [
  "Where can I get coffee?",
  "Plan shoes then dinner then a movie",
  "Find a prayer room",
  "What discounts are nearby?",
];
