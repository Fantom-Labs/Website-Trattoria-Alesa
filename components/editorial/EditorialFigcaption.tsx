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
  /**
   * `div` dentro da camada com transform (ex.: zoom da galeria): o gradiente
   * acompanha a escala. Nesse caso use um `<figcaption className="sr-only">`
   * irmão no `<figure>` para manter HTML e acessibilidade corretos.
   */
  as?: "figcaption" | "div";
};

export function EditorialFigcaption({
  caption,
  overlayVisible = true,
  overlayTransitionDurationSec = motionTokens.galleryImageRevealDuration,
  as = "figcaption",
}: Props) {
  const className = cn(
    editorialFigcaptionClassName,
    "transition-opacity ease-out",
    overlayVisible ? "opacity-100" : "opacity-0",
  );
  const style = { transitionDuration: `${overlayTransitionDurationSec}s` };

  if (as === "div") {
    return (
      <div aria-hidden className={className} style={style}>
        <span className={editorialCaptionTextClassName}>{caption}</span>
      </div>
    );
  }

  return (
    <figcaption className={className} style={style}>
      <span className={editorialCaptionTextClassName}>{caption}</span>
    </figcaption>
  );
}
