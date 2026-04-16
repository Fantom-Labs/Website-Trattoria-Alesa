import {
  editorialCaptionTextClassName,
  editorialFigcaptionClassName,
} from "@/components/editorial/editorialCaptionStyles";

export function EditorialFigcaption({ caption }: { caption: string }) {
  return (
    <figcaption className={editorialFigcaptionClassName}>
      <span className={editorialCaptionTextClassName}>{caption}</span>
    </figcaption>
  );
}
