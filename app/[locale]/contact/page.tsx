import { SectionContainer } from "@/components/layout/SectionContainer";
import { Divider } from "@/components/layout/Divider";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tNav = await getTranslations("Nav");

  return (
    <div className="bg-cream pb-24 pt-10 sm:pt-14" data-header-theme="brown">
      <SectionContainer className="space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-4xl tracking-wide text-dark-slate sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-base leading-relaxed text-warm-brown sm:text-lg">{t("intro")}</p>
        </header>

        <Divider />

        <dl className="grid gap-8 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-grey">
              {t("addressLabel")}
            </dt>
            <dd className="mt-2 whitespace-pre-line text-sm leading-relaxed text-dark-slate">
              {t("addressLines")}
            </dd>
          </div>
          <div className="min-w-0 space-y-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-steel-grey">
                {t("phoneLabel")}
              </dt>
              <dd className="mt-2">
                <a className="text-sm text-warm-brown underline-offset-4 hover:underline" href={`tel:${t("phone").replace(/\s/g, "")}`}>
                  {t("phone")}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-steel-grey">
                {t("emailLabel")}
              </dt>
              <dd className="mt-2">
                <a className="break-all text-sm text-warm-brown underline-offset-4 hover:underline" href={`mailto:${t("email")}`}>
                  {t("email")}
                </a>
              </dd>
            </div>
          </div>
          <div className="min-w-0 sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-grey">
              {t("hoursLabel")}
            </dt>
            <dd className="mt-2 whitespace-pre-line text-sm leading-relaxed text-dark-slate">
              {t("hours")}
            </dd>
          </div>
        </dl>

        <p className="text-sm leading-relaxed text-warm-brown">{t("note")}</p>

        <Button href="/reservations" variant="primary">
          {tNav("reserve")}
        </Button>
      </SectionContainer>
    </div>
  );
}
