"use client";

import { EditorialFigcaption } from "@/components/editorial/EditorialFigcaption";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";
import { motion as motionTokens } from "@/lib/tokens";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Imagem de capa com legenda editorial (ex.: split screen na home).
 * Sem scale — a legenda/gradiente só aparece após entrada em vista (como nas
 * galerias com `ExperienceGalleryImage`), para não mostrar o bloco escuro
 * antes do enquadramento.
 */
export function EditorialCoverImage({
  src,
  alt,
  caption,
  sizes,
  className,
  priority,
}: Props) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce({
    revealDelayMs: motionTokens.galleryImageRevealDelayMs,
  });
  const revealed = reduce || inView;

  return (
    <figure ref={ref} className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
      <EditorialFigcaption
        caption={caption}
        overlayVisible={revealed}
        overlayTransitionDurationSec={motionTokens.galleryImageRevealDuration}
      />
    </figure>
  );
}
