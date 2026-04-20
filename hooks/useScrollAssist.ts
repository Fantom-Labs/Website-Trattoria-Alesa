"use client";

import { useEffect } from "react";
import { layout } from "@/lib/tokens";

/** Evita novo empurrão logo após um snap (ms). Curto o suficiente para encadear secções ao descer. */
const SNAP_COOLDOWN_MS = 550;

/** Mínimo de pixels a descer para valer a pena animar (evita micro-oscilações). */
const MIN_SNAP_DELTA_PX = 36;

export type UseScrollAssistOptions = {
  sectionSelector?: string;
  /**
   * Fração da altura da secção seguinte que tem de ficar visível ao descer
   * para disparar o empurrão (metade = 0.5). Default: 0.5
   */
  triggerRatio?: number;
  /** Ignora secções com altura inferior a este valor (px). Default: 80 */
  minSectionHeight?: number;
  enabled?: boolean;
  /**
   * Duração da animação de scroll (ms). Valores maiores = mais lento.
   * Default: 1800
   */
  durationMs?: number;
};

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Assistente só ao **descer**: quando, durante a rolagem, a secção seguinte
 * passa a ter mais de `triggerRatio` da altura visível, anima até alinhar o
 * topo da secção com a base do header.
 *
 * Cada frame usa `scrollTo({ behavior: "instant" })` para não combinar com
 * `scroll-behavior: smooth` do `html` (isso causava oscilação para cima/baixo).
 *
 * Cooldown curto após cada snap evita re-disparo no mesmo limiar.
 * Duração por defeito da animação: 1800 ms (ajustável com `durationMs`).
 *
 * Não cancela a animação em cada `wheel` para baixo — o assiste corre
 * **em paralelo** com a rolagem do utilizador.
 */
export function useScrollAssist({
  sectionSelector = "main [data-header-theme]",
  triggerRatio = 0.5,
  minSectionHeight = 80,
  enabled = true,
  durationMs = 1800,
}: UseScrollAssistOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let autoScrolling = false;
    let lastScrollY = window.scrollY;
    let scrollDir: "down" | "up" = "down";
    let lastKnownDir: "down" | "up" = "down";
    let safetyTimeoutId = 0;
    let animRafId = 0;
    let scheduleRafId = 0;
    let ratioMemory = new WeakMap<HTMLElement, number>();
    let lastSnapEndTime = -Infinity;

    const getHeaderBottom = (): number => {
      const el = document.querySelector<HTMLElement>("[data-site-header]");
      return el ? el.getBoundingClientRect().bottom : layout.headerHeightPx;
    };

    const instantScrollTo = (y: number) => {
      const top = Math.max(0, Math.round(y));
      window.scrollTo({ top, left: 0, behavior: "instant" });
    };

    const cancelAnim = () => {
      if (animRafId !== 0) {
        cancelAnimationFrame(animRafId);
        animRafId = 0;
      }
    };

    const finishAutoScroll = () => {
      autoScrolling = false;
      lastScrollY = window.scrollY;
      lastSnapEndTime = performance.now();
      clearTimeout(safetyTimeoutId);
      ratioMemory = new WeakMap();
    };

    const snapTo = (targetY: number) => {
      const safeTarget = Math.max(0, Math.round(targetY));
      const currentY = window.scrollY;

      if (safeTarget < currentY + MIN_SNAP_DELTA_PX) return;
      if (Math.abs(safeTarget - currentY) < 8) return;

      cancelAnim();
      finishAutoScroll();

      const startY = window.scrollY;
      const delta = safeTarget - startY;
      if (delta < MIN_SNAP_DELTA_PX) return;

      autoScrolling = true;
      lastSnapEndTime = -Infinity;

      const duration = Math.max(400, durationMs);
      const t0 = performance.now();

      const tick = (now: number) => {
        const elapsed = now - t0;
        const t = Math.min(1, elapsed / duration);
        const y = startY + delta * easeInOutCubic(t);
        instantScrollTo(y);
        if (t < 1) {
          animRafId = requestAnimationFrame(tick);
        } else {
          animRafId = 0;
          instantScrollTo(safeTarget);
          finishAutoScroll();
        }
      };

      animRafId = requestAnimationFrame(tick);
      safetyTimeoutId = window.setTimeout(() => {
        cancelAnim();
        instantScrollTo(safeTarget);
        finishAutoScroll();
      }, duration + 250);
    };

    const ratioForSectionDown = (
      rect: DOMRect,
      headerBottom: number,
      vh: number,
    ): number => {
      if (rect.height < minSectionHeight) return 0;
      if (rect.top > headerBottom && rect.top < vh) {
        return (vh - rect.top) / rect.height;
      }
      return 0;
    };

    const evaluate = () => {
      if (autoScrolling) return;
      if (scrollDir !== "down") return;
      if (performance.now() - lastSnapEndTime < SNAP_COOLDOWN_MS) return;

      const vh = window.innerHeight;
      const headerBottom = getHeaderBottom();
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(sectionSelector),
      );

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const ratio = ratioForSectionDown(rect, headerBottom, vh);
        const prev = ratioMemory.get(el) ?? 0;

        if (ratio >= triggerRatio && prev < triggerRatio) {
          snapTo(window.scrollY + rect.top - headerBottom);
          return;
        }

        ratioMemory.set(el, ratio);
      }
    };

    const scheduleEvaluate = () => {
      if (scheduleRafId !== 0) return;
      scheduleRafId = requestAnimationFrame(() => {
        scheduleRafId = 0;
        evaluate();
      });
    };

    const onScroll = () => {
      const current = window.scrollY;
      if (current !== lastScrollY) {
        const newDir = current > lastScrollY ? "down" : current < lastScrollY ? "up" : scrollDir;
        if (newDir !== lastKnownDir) {
          ratioMemory = new WeakMap();
          lastKnownDir = newDir;
        }
        scrollDir = newDir;
        lastScrollY = current;
      }
      if (autoScrolling) return;
      if (scrollDir !== "down") return;
      scheduleEvaluate();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scheduleRafId !== 0) {
        cancelAnimationFrame(scheduleRafId);
        scheduleRafId = 0;
      }
      clearTimeout(safetyTimeoutId);
      cancelAnim();
      finishAutoScroll();
    };
  }, [enabled, sectionSelector, triggerRatio, minSectionHeight, durationMs]);
}
