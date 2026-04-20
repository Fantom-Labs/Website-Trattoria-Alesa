import { SectionContainer } from "@/components/layout/SectionContainer";
import { getTranslations } from "next-intl/server";

type Props = {
  previewUrl: string;
  viewUrl: string;
};

export async function MenuPdfEmbed({ previewUrl, viewUrl }: Props) {
  const t = await getTranslations("Menu");

  return (
    <SectionContainer className="py-6">
      <div className="overflow-hidden rounded-lg border border-warm-brown/20 bg-white shadow-sm">
        <iframe
          title={t("pdfFrameTitle")}
          src={previewUrl}
          className="h-[min(85vh,900px)] w-full border-0"
          allow="fullscreen"
        />
      </div>
      <p className="mt-4 text-center text-sm text-warm-brown">
        <a
          href={viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-dark-slate underline decoration-warm-brown/40 underline-offset-4 hover:decoration-dark-slate"
        >
          {t("openInDrive")}
        </a>
      </p>
    </SectionContainer>
  );
}
