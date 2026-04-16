"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type InViewOnceOptions = {
  rootMargin?: string;
  threshold?: number;
  revealDelayMs?: number;
  trigger?: "intersection" | "immediate";
};

export function useInViewOnce(options: InViewOnceOptions = {}) {
  const { rootMargin, threshold, revealDelayMs = 0, trigger = "intersection" } = options;
  const [node, setNode] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);
  const intersectionDoneRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ref = useCallback((el: Element | null) => {
    if (el === null) {
      intersectionDoneRef.current = false;
    }
    setNode(el);
  }, []);

  useEffect(() => {
    if (trigger !== "immediate") return;
    const id = requestAnimationFrame(() => setInView(true));
    return () => cancelAnimationFrame(id);
  }, [trigger]);

  useEffect(() => {
    if (trigger !== "intersection" || !node || intersectionDoneRef.current) return;

    const finish = () => {
      if (intersectionDoneRef.current) return;
      intersectionDoneRef.current = true;
      setInView(true);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || intersectionDoneRef.current) continue;
          obs.disconnect();
          if (revealDelayMs > 0) {
            timerRef.current = setTimeout(finish, revealDelayMs);
          } else {
            finish();
          }
          break;
        }
      },
      {
        rootMargin: rootMargin ?? "0px 0px -10% 0px",
        threshold: threshold ?? 0.12,
      },
    );

    obs.observe(node);
    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [node, rootMargin, threshold, revealDelayMs, trigger]);

  return { ref, inView };
}
