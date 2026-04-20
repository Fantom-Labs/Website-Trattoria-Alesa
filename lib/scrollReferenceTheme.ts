import { layout, type HeaderThemeName } from "@/lib/tokens";

const VALID_THEMES: ReadonlySet<HeaderThemeName> = new Set([
  "light",
  "brown",
  "dapietro",
]);

/**
 * Linha de referência no viewport (px desde o topo): base do header + offset.
 * Se o header não existir, usa altura de layout + offset.
 */
export function getReferenceLineY(
  headerEl: HTMLElement | null,
  offsetPx: number,
): number {
  const safeOffset = Number.isFinite(offsetPx) ? offsetPx : 0;
  if (headerEl) {
    return headerEl.getBoundingClientRect().bottom + safeOffset;
  }
  return layout.headerHeightPx + safeOffset;
}

export function parseHeaderThemeFromDataset(
  raw: string | undefined,
): HeaderThemeName | null {
  if (!raw) return null;
  const v = raw.trim() as HeaderThemeName;
  return VALID_THEMES.has(v) ? v : null;
}

/**
 * Primeira secção (ordem do DOM) cuja caixa contém a linha:
 * top <= lineY && bottom > lineY.
 * Ignora nós sem `data-header-theme` válido e continua a procurar.
 */
export function findThemeAtReferenceLine(
  sections: HTMLElement[],
  lineY: number,
): HeaderThemeName | null {
  for (const el of sections) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= lineY && rect.bottom > lineY) {
      const theme = parseHeaderThemeFromDataset(el.dataset.headerTheme);
      if (theme) return theme;
    }
  }
  return null;
}
