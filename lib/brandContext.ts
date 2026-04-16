/**
 * Internal reference for authors and AI — user-facing strings live in messages/*.json.
 */
export const brandContext = {
  name: "Trattoria Alesa",
  location: {
    area: "Hochzoll",
    city: "Augsburg",
    country: "Germany",
  },
  positioning:
    "An Italian living room in Germany — authentic dishes, fresh ingredients, recipes handed down.",
  emotionalAnchor: "Like at Nonna’s — warm, familiar, quietly elegant (not fine dining, not fast food).",
  tone: {
    do: [
      "Use sensory, simple, authentic language.",
      "Sound warm without exaggeration.",
      "Prefer casual elegance over hype.",
    ],
    avoid: [
      "Generic marketing phrases and superlatives like “best restaurant”.",
      "Over-promising or tourist-trap clichés.",
    ],
  },
  ux: {
    primaryConversion: "WhatsApp reservation",
    rules: [
      "Mobile-first layouts; German copy is often longer — avoid fixed widths on text blocks.",
      "No pagination on marketing pages.",
      "Prefer smooth scroll within page sections.",
      "Keep hierarchy clean and loading fast.",
      "Motion is progressive revelation (timing + scroll + hierarchy), not decoration — sparing RevealImage, RevealText only on headlines, CTAs stay quick and readable.",
    ],
  },
  i18n: {
    locales: ["de", "en", "it"] as const,
    defaultLocale: "de",
    constraints: [
      "Do not translate English literally into German or Italian — adapt for natural rhythm.",
      "Layouts must tolerate longer German strings without overflow.",
    ],
  },
} as const;
