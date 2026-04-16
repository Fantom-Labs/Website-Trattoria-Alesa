"use client";

import { easeStandard, motion as motionTokens } from "@/lib/tokens";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";

const STORAGE_KEY = "ta_intro_splash_seen";

/** Entrada de marca: rápida (abaixo de ~2s), sem frustrar. */
export function IntroSplash() {
  const t = useTranslations("Splash");
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
    const id = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 1680);
    return () => window.clearTimeout(id);
  }, [mounted, visible, reduce]);

  if (!mounted || !visible) {
    return null;
  }

  if (reduce) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-start bg-dark-slate p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.82, duration: 0.42, ease }}
      onAnimationComplete={() => {
        setVisible(false);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      }}
    >
      <motion.div
        className="flex max-w-none flex-col items-start gap-3 text-left"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTokens.standard, ease }}
      >
        <motion.span
          className="font-display text-3xl tracking-[0.08em] text-cream sm:text-4xl"
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0.08em", opacity: 1 }}
          transition={{ duration: 0.72, ease }}
        >
          {t("title")}
        </motion.span>
        <motion.span
          className="max-w-md text-sm text-steel-grey sm:max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: motionTokens.micro, ease }}
        >
          {t("subtitle")}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
