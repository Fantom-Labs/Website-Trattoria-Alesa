import { MenuPdfEmbed } from "@/components/menu/MenuPdfEmbed";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { getTranslations } from "next-intl/server";
import { getMenuDrivePdfEmbed } from "@/lib/siteConfig";

export default async function MenuPage() {
  const t = await getTranslations("Menu");
  const driveMenu = getMenuDrivePdfEmbed();

  return (
    <div className="bg-cream pb-24 pt-10 sm:pt-14" data-header-theme="brown">
      <SectionContainer className="pb-10 text-center">
        <h1 className="font-display text-4xl tracking-wide text-dark-slate sm:text-5xl">
          {t("title")}
        </h1>
      </SectionContainer>
      {driveMenu ? (
        <MenuPdfEmbed previewUrl={driveMenu.previewUrl} viewUrl={driveMenu.viewUrl} />
      ) : (
        <SectionContainer className="py-6 text-center">
          <p className="mx-auto max-w-prose text-base leading-relaxed text-warm-brown">
            {t("pdfMissing")}
          </p>
        </SectionContainer>
      )}
    </div>
  );
}
