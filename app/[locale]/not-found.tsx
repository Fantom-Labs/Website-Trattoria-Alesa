import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="bg-cream py-24" data-header-theme="brown">
      <SectionContainer className="space-y-6 text-left">
        <h1 className="font-display text-4xl text-dark-slate">{t("title")}</h1>
        <p className="text-warm-brown">{t("body")}</p>
        <Button href="/">{t("home")}</Button>
      </SectionContainer>
    </div>
  );
}
