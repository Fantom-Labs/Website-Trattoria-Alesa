"use client";

import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

type Props = {
  media: ReactNode;
  /** First intro paragraph (mobile only), same typography as intro section. */
  mobileIntroLead?: string;
  /** Booking CTA (mobile only), same label as menu — same horizontal inset as intro. */
  mobileBookingLabel?: string;
};

export function HeroSection({ media, mobileIntroLead, mobileBookingLabel }: Props) {
  return (
    <section
      data-header-theme="light"
      className="relative -mt-16 h-[100dvh] overflow-hidden bg-dark-slate lg:-mt-[5.5rem]"
    >
      <div className="absolute inset-0">{media}</div>
      {mobileIntroLead ? (
        <div className="pointer-events-none absolute inset-x-0 top-[calc(4rem+60px)] z-10 px-4 sm:px-6 lg:hidden">
          <p className="w-[75vw] max-w-full text-left text-2xl font-normal leading-8 tracking-normal text-[#F1F1F1]">
            {mobileIntroLead}
          </p>
        </div>
      ) : null}
      {mobileBookingLabel ? (
        <div className="absolute inset-x-0 bottom-8 z-10 px-4 sm:px-6 lg:hidden">
          <Button
            href="/reservations"
            variant="primary"
            className="w-full rounded-none"
          >
            {mobileBookingLabel}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
