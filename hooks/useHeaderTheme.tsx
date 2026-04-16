"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { HeaderThemeName } from "@/lib/tokens";

type HeaderThemeContextValue = {
  theme: HeaderThemeName;
};

const HeaderThemeContext = createContext<HeaderThemeContextValue>({
  theme: "light",
});

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}

export function HeaderThemeBridge({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeaderThemeName>("light");

  const applyDocumentTheme = useCallback((next: HeaderThemeName) => {
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.headerTheme = next;
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.headerTheme = "light";

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-header-theme]"),
    );

    if (nodes.length === 0) {
      return;
    }

    const anchor = 96;

    const pickTheme = () => {
      let next: HeaderThemeName = "light";
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top <= anchor) {
          const v = node.dataset.headerTheme as HeaderThemeName | undefined;
          if (v === "brown" || v === "dapietro" || v === "light") {
            next = v;
          }
        }
      }
      applyDocumentTheme(next);
    };

    pickTheme();

    const onScroll = () => {
      pickTheme();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const obs = new ResizeObserver(() => pickTheme());
    obs.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      obs.disconnect();
    };
  }, [applyDocumentTheme]);

  const value = useMemo(() => ({ theme }), [theme]);

  return (
    <HeaderThemeContext.Provider value={value}>
      {children}
    </HeaderThemeContext.Provider>
  );
}
