"use client";

import { easeStandard, motion as motionTokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Atraso leve após entrar no viewport (s) */
  delay?: number;
};

export function SectionEnter({ children, className, delay }: Props) {
  const reduce = useReducedMotion();
  const ease = [...easeStandard] as [number, number, number, number];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: motionTokens.standard,
        delay: delay !== undefined ? delay : motionTokens.scrollRevealDelay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
