import { MenuPdfEmbed } from "@/components/menu/MenuPdfEmbed";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { getTranslations } from "next-intl/server";
import { getMenuDrivePdfEmbed } from "@/lib/siteConfig";

export default async function MenuPage() {
  const t = await getTranslations("Menu");
  const driveMenu = getMenuDrivePdfEmbed();

  return (
    <div
      className="-mt-16 flex min-h-0 flex-1 flex-col overflow-hidden bg-cream pt-16 text-dark-slate lg:-mt-[5.5rem] lg:pt-[5.5rem]"
      data-header-theme="brown"
    >
      <h1 className="sr-only">{t("title")}</h1>

      {driveMenu ? (
        <MenuPdfEmbed
          variant="full"
          previewUrl={driveMenu.previewUrl}
          viewUrl={driveMenu.viewUrl}
        />
      ) : (
        <SectionContainer className="flex flex-1 flex-col justify-center py-12 text-center">
          <p className="mx-auto max-w-prose text-base leading-relaxed text-warm-brown">
            {t("pdfMissing")}
          </p>
        </SectionContainer>
      )}
    </div>
  );
}
