"use client";

import { EditorialFigcaption } from "@/components/editorial/EditorialFigcaption";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";
import { easeStandard, layout as layoutMetrics, motion as motionTokens } from "@/lib/tokens";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { createElement, type CSSProperties } from "react";

type Props = {
  alt: string;
  src: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** `primary`: impacto editorial (1.2s). `secondary`: mais breve — não saturar. */
  preset?: "primary" | "secondary";
  /** `hero`: full-bleed hero. `default`: altura de conteúdo (80dvh por defeito), exceto hero. */
  layout?: "default" | "hero";
  /** Revela no mount (hero acima da dobra). */
  revealOnMount?: boolean;
  /** Legenda editorial (mesmo padrão das galerias); o root passa a ser <figure>. */
  caption?: string;
};

export function RevealImage({
  className,
  alt,
  src,
  sizes,
  priority,
  preset = "primary",
  layout = "default",
  revealOnMount = false,
  caption,
}: Props) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce(
    revealOnMount
      ? { trigger: "immediate", revealDelayMs: 0 }
      : { revealDelayMs: 140 },
  );
  const insetStart = preset === "primary" ? motionTokens.revealImageInsetStart : 0.06;
  const duration = preset === "primary" ? motionTokens.highlight : motionTokens.standard;
  const ease = `cubic-bezier(${easeStandard.join(",")})`;

  const clipHidden = `inset(${insetStart * 100}% ${insetStart * 100}% ${insetStart * 100}% ${insetStart * 100}%)`;
  const clipOpen = "inset(0% 0% 0% 0%)";
  const revealed = reduce || inView;

  const defaultHeightStyle: CSSProperties = {
    height: `${layoutMetrics.contentImageViewportPercent}dvh`,
  };

  const rootClass = cn(
    "relative w-full overflow-hidden",
    layout === "hero"
      ? "h-full min-h-[32rem] rounded-none"
      : "min-h-[12rem] w-full rounded-none sm:min-h-[14rem]",
    className,
  );

  return createElement(
    caption ? "figure" : "div",
    {
      ref,
      className: rootClass,
      style: layout === "hero" ? undefined : defaultHeightStyle,
    },
    <div
      key="clip"
      className="absolute inset-0 origin-center will-change-[clip-path,transform]"
      style={{
        clipPath: revealed ? clipOpen : clipHidden,
        transform: revealed ? "scale(1)" : "scale(1.02)",
        transition: reduce
          ? "none"
          : `clip-path ${duration}s ${ease}, transform ${duration}s ${ease}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>,
    caption ? (
      <EditorialFigcaption
        key="cap"
        caption={caption}
        overlayVisible={revealed}
        overlayTransitionDurationSec={duration}
      />
    ) : null,
  );
}
