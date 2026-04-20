import {
  editorialCaptionTextClassName,
  editorialFigcaptionClassName,
} from "@/components/editorial/editorialCaptionStyles";
import { cn } from "@/lib/utils";
import { motion as motionTokens } from "@/lib/tokens";

type Props = {
  caption: string;
  /**
   * Quando false, o gradiente fica invisível (opacity) para não mostrar
   * o “bloco” escuro à volta da imagem durante scale/clip.
   */
  overlayVisible?: boolean;
  /** Duração da transição de opacidade (s), alinhada à animação da imagem. */
  overlayTransitionDurationSec?: number;
};

export function EditorialFigcaption({
  caption,
  overlayVisible = true,
  overlayTransitionDurationSec = motionTokens.galleryImageRevealDuration,
}: Props) {
  return (
    <figcaption
      className={cn(
        editorialFigcaptionClassName,
        "transition-opacity ease-out",
        overlayVisible ? "opacity-100" : "opacity-0",
      )}
      style={{
        transitionDuration: `${overlayTransitionDurationSec}s`,
      }}
    >
      <span className={editorialCaptionTextClassName}>{caption}</span>
    </figcaption>
  );
}
