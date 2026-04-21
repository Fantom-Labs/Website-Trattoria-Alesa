import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { getTranslations } from "next-intl/server";

type Props = {
  previewUrl: string;
  viewUrl: string;
  /** Ocupa a altura útil da viewport (abaixo do header) para ver o máximo possível do PDF. */
  variant?: "full" | "card";
};

export async function MenuPdfEmbed({ previewUrl, viewUrl, variant = "full" }: Props) {
  const t = await getTranslations("Menu");

  if (variant === "full") {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="relative min-h-0 w-full flex-1">
          <iframe
            title={t("pdfFrameTitle")}
            src={previewUrl}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen"
            loading="lazy"
          />
        </div>
        <div className="flex shrink-0 justify-center border-t border-cream/15 px-4 py-3 sm:py-4">
          <Button
            externalHref={viewUrl}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="border-cream/50 text-cream hover:border-cream hover:bg-white/10 hover:text-cream focus-visible:outline-cream"
          >
            {t("openInNewTab")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SectionContainer className="py-6">
      <div className="relative mx-auto aspect-[210/297] w-full max-w-[210mm] overflow-hidden rounded-lg border border-cream/20 bg-white shadow-sm">
        <iframe
          title={t("pdfFrameTitle")}
          src={previewUrl}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          externalHref={viewUrl}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
          className="border-cream/50 text-cream hover:border-cream hover:bg-white/10 hover:text-cream focus-visible:outline-cream"
        >
          {t("openInNewTab")}
        </Button>
      </div>
    </SectionContainer>
  );
}
