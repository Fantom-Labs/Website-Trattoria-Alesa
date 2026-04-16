"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";
import { easeStandard, motion as motionTokens } from "@/lib/tokens";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

type Props = {
  posterSrc: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  /** Hero: revelação imediata (~1.5s), sem scroll. */
  revealOnMount?: boolean;
};

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function RevealVideo({
  posterSrc,
  videoSrc,
  alt,
  className,
  revealOnMount = false,
}: Props) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const { ref, inView } = useInViewOnce({
    trigger: revealOnMount ? "immediate" : "intersection",
    revealDelayMs: revealOnMount ? 0 : 100,
    rootMargin: "0px",
    threshold: 0.28,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const duration = motionTokens.narrative;
  const ease = `cubic-bezier(${easeStandard.join(",")})`;
  const insetStart = motionTokens.revealImageInsetStart;
  const clipHidden = `inset(${insetStart * 100}% ${insetStart * 100}% ${insetStart * 100}% ${insetStart * 100}%)`;
  const clipOpen = "inset(0% 0% 0% 0%)";
  const revealed = reduceMotion || inView;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc || reduceMotion) return;
    if (revealed) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [revealed, videoSrc, reduceMotion]);

  const inner = !videoSrc || reduceMotion ? (
    <Image
      src={posterSrc}
      alt={alt}
      width={1600}
      height={900}
      className="h-full w-full object-cover"
      sizes="100vw"
      priority={revealOnMount}
    />
  ) : (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      poster={posterSrc}
      muted
      playsInline
      loop
      preload="metadata"
      aria-hidden
    >
      <source src={videoSrc} />
    </video>
  );

  return (
    <div
      ref={ref}
      className={cn("relative min-h-[inherit] overflow-hidden rounded-sm", className)}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 origin-center will-change-[clip-path,transform]"
        style={{
          clipPath: revealed ? clipOpen : clipHidden,
          transform: revealed ? "scale(1)" : "scale(1.02)",
          transition: reduceMotion
            ? "none"
            : `clip-path ${duration}s ${ease}, transform ${duration}s ${ease}`,
        }}
      >
        {inner}
      </div>
    </div>
  );
}
