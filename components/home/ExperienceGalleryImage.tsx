"use client";

import { EditorialFigcaption } from "@/components/editorial/EditorialFigcaption";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";
import { easeGalleryImage, layout, motion as motionTokens } from "@/lib/tokens";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { createElement, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** "tall" = galeria experiência; "panel" = highlight editorial (retrato). */
  variant?: "tall" | "panel";
  /** Legenda sobreposta (ex.: highlight); o root passa a ser <figure> para a11y. */
  caption?: string;
};

export function ExperienceGalleryImage({
  src,
  alt,
  className,
  variant = "tall",
  caption,
}: Props) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce({
    revealDelayMs: motionTokens.galleryImageRevealDelayMs,
  });
  const ease = [...easeGalleryImage] as [number, number, number, number];
  const revealed = reduce || inView;
  const scaleStart = motionTokens.galleryImageScaleStart;

  const rootClass = cn(
    "relative w-full max-w-full overflow-hidden rounded-none min-h-[12rem] sm:min-h-[14rem]",
    className,
  );

  const rootStyle: CSSProperties = {
    height: `${layout.contentImageViewportPercent}dvh`,
  };

  return createElement(
    caption ? "figure" : "div",
    { ref, className: rootClass, style: rootStyle },
    <motion.div
      key="reveal"
      className="absolute inset-0 will-change-transform"
      style={{ transformOrigin: "50% 50%" }}
      initial={{ scale: scaleStart }}
      animate={{ scale: revealed ? 1 : scaleStart }}
      transition={{
        duration: reduce ? 0 : motionTokens.galleryImageRevealDuration,
        ease,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        quality={variant === "panel" ? 95 : 100}
        className="object-cover"
      />
    </motion.div>,
    caption ? (
      <EditorialFigcaption
        key="cap"
        caption={caption}
        overlayVisible={revealed}
        overlayTransitionDurationSec={motionTokens.galleryImageRevealDuration}
      />
    ) : null,
  );
}
