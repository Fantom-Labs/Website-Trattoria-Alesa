import { SectionContainer } from "@/components/layout/SectionContainer";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TikTokIcon } from "@/components/icons/TikTok";
import { Link } from "@/i18n/navigation";
import { getInstagramUrl, getTikTokUrl } from "@/lib/siteConfig";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const ig = getInstagramUrl();
  const tt = getTikTokUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-themed mt-auto border-t border-white/10">
      <SectionContainer className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 space-y-3">
          <p className="font-sans text-xl font-semibold uppercase tracking-wide">{t("brand")}</p>
          <p className="text-sm leading-relaxed text-cream/80">{t("tagline")}</p>
        </div>
        <div className="min-w-0 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-cream/60">
            {t("visit")}
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-cream/85">{t("address")}</p>
        </div>
        <div className="min-w-0 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-cream/60">
            {t("hoursTitle")}
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-cream/85">
            {t("hours")}
          </p>
        </div>
        <div className="min-w-0 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-cream/60">
            {t("connect")}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/contact" className="w-fit underline-offset-4 hover:underline">
              {t("contactLink")}
            </Link>
            <Link href="/reservations" className="w-fit underline-offset-4 hover:underline">
              {t("reserveLink")}
            </Link>
            {ig || tt ? (
              <div className="flex flex-row items-center justify-start gap-2">
                {ig ? (
                  <a
                    href={ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("instagram")}
                    className="inline-flex shrink-0 text-cream/80 transition-colors hover:text-cream"
                  >
                    <InstagramIcon className="shrink-0" />
                  </a>
                ) : null}
                {tt ? (
                  <a
                    href={tt}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("tiktok")}
                    className="inline-flex shrink-0 text-cream/80 transition-colors hover:text-cream"
                  >
                    <TikTokIcon className="shrink-0" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </SectionContainer>
      <div className="border-t border-white/10 px-4 py-6 text-left text-xs text-cream/55 sm:px-6 lg:px-8">
        {t("legal", { year })}
      </div>
    </footer>
  );
}
