"use client";

import { easeStandard } from "@/lib/tokens";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useEffect, useState } from "react";

const STORAGE_KEY = "ta_intro_splash_seen";

/** Tempo com o logo a “respirar” antes do fade do overlay. */
const HOLD_BEFORE_FADE_SEC = 2.1;
/** Fade do ecrã completo (inclui logo). */
const OVERLAY_FADE_SEC = 0.48;

export function IntroSplash() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ease = [...easeStandard] as [number, number, number, number];

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) {
          setVisible(false);
          return;
        }
      } catch {
        /* ignore */
      }
      setVisible(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted || !visible || reduce) return;
    const failsafeMs = Math.round((HOLD_BEFORE_FADE_SEC + OVERLAY_FADE_SEC + 0.5) * 1000);
    const id = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }, failsafeMs);
    return () => window.clearTimeout(id);
  }, [mounted, visible, reduce]);

  if (!mounted || !visible) {
    return null;
  }

  if (reduce) {
    return null;
  }

  const markSeen = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.div
      role="presentation"
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-cream"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: HOLD_BEFORE_FADE_SEC,
        duration: OVERLAY_FADE_SEC,
        ease,
      }}
      onAnimationComplete={markSeen}
    >
      <motion.div
        className="relative h-[clamp(56px,18vmin,120px)] w-[clamp(88px,28vmin,190px)]"
        animate={{
          opacity: [0, 1],
          scale: [0.92, 1.07],
        }}
        transition={{
          duration: 0.95,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <Image
          src="/logo.svg"
          alt=""
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 180px, 190px"
        />
      </motion.div>
    </motion.div>
  );
}
