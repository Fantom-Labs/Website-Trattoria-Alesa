export const brandColors = {
  steelGrey: "#84929E",
  warmBrown: "#7B6C62",
  darkSlate: "#171717",
  cream: "#F3F0ED",
} as const;

export const layout = {
  headerHeightPx: 88,
  /** Fração da altura da viewport (dvh) para imagens de conteúdo — exceto hero */
  contentImageViewportPercent: 80,
} as const;

/** Default easing: perceptually neutral, premium UI */
export const easeStandard = [0.25, 0.1, 0.25, 1] as const;

/** Galeria / imagens editoriais: desaceleração longa, menos “snap”. */
export const easeGalleryImage = [0.18, 0.82, 0.32, 1] as const;

/**
 * Motion tiers — use intentionally, not decoratively.
 * micro: hovers / small UI
 * standard: panels, text blocks
 * highlight: editorial image reveal
 * narrative: hero video / slow reveals
 */
export const motion = {
  micro: 0.2,
  standard: 0.6,
  highlight: 1.2,
  narrative: 1.5,
  /** Word-by-word headline rhythm */
  revealTextStagger: 0.02,
  /** Per-word motion length (keep short; stagger does the rhythm) */
  revealTextDuration: 0.45,
  menuDuration: 0.48,
  /** Scroll-triggered blocks: slight deferral so layout settles */
  scrollRevealDelay: 0.14,
  /** Zoom das imagens da galeria (experience + highlight) — mais longo = mais suave */
  galleryImageRevealDuration: 1.55,
  /** Zoom inicial ≈ 1/1.16 (~14%); antes ~1/1.4 (~40%) */
  galleryImageScaleStart: 1 / 1.16,
  /** Atraso antes do zoom após entrar em vista */
  galleryImageRevealDelayMs: 180,
  /** Initial clip inset for “curtain” image reveal (fraction 0–0.5) */
  revealImageInsetStart: 0.1,
  easeStandard,
} as const;

export type HeaderThemeName = "light" | "brown" | "dapietro";
