"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import { motion, useReducedMotion } from "framer-motion";
import { easeStandard, motion as motionTokens } from "@/lib/tokens";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** `mount`: hero / above-the-fold (orquestração). `inView`: headlines em scroll. */
  trigger?: "inView" | "mount";
  /** Segundos antes da primeira palavra (só `mount`). */
  mountDelay?: number;
  /** Atraso extra por palavra em cima do stagger (segundos). */
  delayOffset?: number;
};

export function RevealText({
  text,
  as: Tag = "p",
  className,
  trigger = "inView",
  mountDelay = 0,
  delayOffset = 0,
}: Props) {
  const reduce = useReducedMotion();
  const { ref, inView: scrollInView } = useInViewOnce({
    revealDelayMs: trigger === "inView" ? 120 : 0,
  });
  const [mountPlay, setMountPlay] = useState(reduce || trigger !== "mount");

  useEffect(() => {
    if (reduce || trigger !== "mount") return;
    const t = window.setTimeout(() => setMountPlay(true), Math.round(mountDelay * 1000));
    return () => window.clearTimeout(t);
  }, [reduce, trigger, mountDelay]);

  const inView = trigger === "mount" ? mountPlay : scrollInView;
  const words = text.split(/\s+/).filter(Boolean);

  const ease = [...easeStandard] as [number, number, number, number];

  if (reduce) {
    return (
      <div ref={ref} className="min-w-0">
        <Tag className={className}>{text}</Tag>
      </div>
    );
  }

  return (
    <div ref={trigger === "inView" ? ref : undefined} className="min-w-0">
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="mr-[0.28em] inline-block">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                duration: motionTokens.revealTextDuration,
                delay: delayOffset + i * motionTokens.revealTextStagger,
                ease,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
