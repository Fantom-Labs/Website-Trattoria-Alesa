"use client";

import type { ReactNode } from "react";

type Props = {
  media: ReactNode;
};

export function HeroSection({ media }: Props) {
  return (
    <section
      data-header-theme="light"
      className="relative -mt-16 h-[100dvh] overflow-hidden bg-dark-slate lg:-mt-[5.5rem]"
    >
      <div className="absolute inset-0">{media}</div>
    </section>
  );
}
