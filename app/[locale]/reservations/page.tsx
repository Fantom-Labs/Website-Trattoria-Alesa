import { WhatsAppButton } from "@/components/links/WhatsAppButton";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export default async function ReservationsPage() {
  const t = await getTranslations("Reservations");

  return (
    <div className="bg-cream pb-24 pt-10 sm:pt-14" data-header-theme="brown">
      <SectionContainer className="space-y-8">
        <h1 className="font-display text-4xl tracking-wide text-dark-slate sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-base leading-relaxed text-warm-brown sm:text-lg">{t("body")}</p>
        <WhatsAppButton labelKey="button" fullWidth className="sm:w-auto sm:min-w-[12rem]" />
        <p className="text-sm text-warm-brown">{t("secondary")}</p>
        <Button href="/contact" variant="secondary">
          {t("contactLink")}
        </Button>
      </SectionContainer>
    </div>
  );
}
