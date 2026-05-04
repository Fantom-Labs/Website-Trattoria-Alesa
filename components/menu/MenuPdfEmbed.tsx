import { OpenInNewTabIcon } from "@/components/icons/OpenInNewTab";
import { Button } from "@/components/ui/Button";
import { MenuPdfFullClient, type MenuPdfUrls } from "@/components/menu/MenuPdfFullClient";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { getTranslations } from "next-intl/server";

type Props = {
  main: MenuPdfUrls;
  order?: MenuPdfUrls | null;
  /** Ocupa a altura útil da viewport (abaixo do header) para ver o máximo possível do PDF. */
  variant?: "full" | "card";
};

export async function MenuPdfEmbed({ main, order = null, variant = "full" }: Props) {
  const t = await getTranslations("Menu");

  if (variant === "full") {
    return <MenuPdfFullClient main={main} order={order} />;
  }

  return (
    <SectionContainer className="py-6">
      <div className="relative mx-auto aspect-[210/297] w-full max-w-[210mm] overflow-hidden rounded-lg border border-stone-200/90 bg-white shadow-sm">
        <iframe
          title={t("pdfFrameTitle")}
          src={main.previewUrl}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          externalHref={main.viewUrl}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OpenInNewTabIcon className="size-4 shrink-0 opacity-90" />
          {t("openInNewTab")}
        </Button>
      </div>
    </SectionContainer>
  );
}
