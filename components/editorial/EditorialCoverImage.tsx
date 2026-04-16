import { EditorialFigcaption } from "@/components/editorial/EditorialFigcaption";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Imagem de capa com legenda editorial (mesmo padrão das galerias com animação).
 * Sem motion — usar onde `ExperienceGalleryImage` não se aplica.
 */
export function EditorialCoverImage({
  src,
  alt,
  caption,
  sizes,
  className,
  priority,
}: Props) {
  return (
    <figure className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}>
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
      <EditorialFigcaption caption={caption} />
    </figure>
  );
}
