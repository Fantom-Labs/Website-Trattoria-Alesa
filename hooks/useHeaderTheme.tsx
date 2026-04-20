"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { HeaderThemeName } from "@/lib/tokens";
import {
  findThemeAtReferenceLine,
  getReferenceLineY,
} from "@/lib/scrollReferenceTheme";
import { usePathname } from "@/i18n/navigation";
import { useScrollAssist, type UseScrollAssistOptions } from "@/hooks/useScrollAssist";

type HeaderThemeContextValue = {
  theme: HeaderThemeName;
};

const HeaderThemeContext = createContext<HeaderThemeContextValue>({
  theme: "light",
});

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}

const DEFAULT_SECTION_SELECTOR = "main [data-header-theme]";
/** Só a secção 2 da home (intro) — ver `HomeView` e `useScrollAssist`. */
const SCROLL_ASSIST_SECTION_SELECTOR = "main [data-scroll-assist]";

export type HeaderThemeBridgeProps = {
  children: ReactNode;
  /**
   * Pixels abaixo da base do header medida no viewport.
   * Derivado do design original: anchor 96px − header desktop 88px = 8px.
   * Garante uma margem mínima para evitar flicker na borda exata entre secções.
   */
  lineOffsetPx?: number;
  /** Seletor para nós com `data-header-theme` dentro do conteúdo. */
  sectionSelector?: string;
  /** Tema quando não há secções ou antes da primeira deteção. */
  defaultTheme?: HeaderThemeName;
  /**
   * Assistente de scroll suave (só na home, só na secção com `data-scroll-assist`).
   * Desativado com prefers-reduced-motion. Default: true
   */
  scrollAssist?: boolean;
  /** Opções avançadas passadas ao useScrollAssist (ex.: `durationMs`). */
  scrollAssistOptions?: UseScrollAssistOptions;
};

export function HeaderThemeBridge({
  children,
  lineOffsetPx = 8,
  sectionSelector = DEFAULT_SECTION_SELECTOR,
  defaultTheme = "light",
  scrollAssist = true,
  scrollAssistOptions,
}: HeaderThemeBridgeProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<HeaderThemeName>(defaultTheme);
  const lastStableTheme = useRef<HeaderThemeName>(defaultTheme);

  const applyDocumentTheme = useCallback((next: HeaderThemeName) => {
    setTheme((prev) => (prev === next ? prev : next));
    if (document.documentElement.dataset.headerTheme !== next) {
      document.documentElement.dataset.headerTheme = next;
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      document.documentElement.dataset.reducedMotion = mq.matches
        ? "reduce"
        : "no-preference";
    };
    syncReducedMotion();
    mq.addEventListener("change", syncReducedMotion);
    return () => mq.removeEventListener("change", syncReducedMotion);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.headerTheme = defaultTheme;
    lastStableTheme.current = defaultTheme;

    let rafId = 0;

    const pickTheme = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const lineY = getReferenceLineY(header, lineOffsetPx);

      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(sectionSelector),
      );

      if (nodes.length === 0) {
        lastStableTheme.current = defaultTheme;
        applyDocumentTheme(defaultTheme);
        return;
      }

      const found = findThemeAtReferenceLine(nodes, lineY);
      if (found !== null) {
        lastStableTheme.current = found;
        applyDocumentTheme(found);
      } else {
        applyDocumentTheme(lastStableTheme.current);
      }
    };

    const schedulePick = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        pickTheme();
      });
    };

    pickTheme();

    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick);

    const headerEl = document.querySelector<HTMLElement>("[data-site-header]");
    const ro = new ResizeObserver(() => schedulePick());
    ro.observe(document.body);
    if (headerEl) ro.observe(headerEl);

    return () => {
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
      ro.disconnect();
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [
    applyDocumentTheme,
    defaultTheme,
    lineOffsetPx,
    pathname,
    sectionSelector,
  ]);

  const isHome = pathname === "/";

  useScrollAssist({
    ...scrollAssistOptions,
    sectionSelector:
      scrollAssistOptions?.sectionSelector ?? SCROLL_ASSIST_SECTION_SELECTOR,
    enabled:
      isHome &&
      scrollAssist &&
      (scrollAssistOptions?.enabled !== false),
  });

  const value = useMemo(() => ({ theme }), [theme]);

  return (
    <HeaderThemeContext.Provider value={value}>
      {children}
    </HeaderThemeContext.Provider>
  );
}
