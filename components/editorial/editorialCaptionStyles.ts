import { cn } from "@/lib/utils";

/** Legenda sobreposta — padrão visual das imagens editoriais do site (secções 3, 4, 5, …). */
export const editorialFigcaptionClassName = cn(
  "pointer-events-none absolute inset-x-0 bottom-0 z-10",
  "bg-gradient-to-t from-black/75 via-black/35 to-transparent",
  "px-5 pb-5 pt-20 text-left text-sm leading-snug text-white sm:px-6 sm:pb-6 sm:text-base",
);

export const editorialCaptionTextClassName = "font-sans italic tracking-wide";
