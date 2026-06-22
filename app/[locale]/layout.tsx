import "../globals.css";

import { VacationBanner } from "@/components/layout/VacationBanner";
import { WhatsAppFloater } from "@/components/links/WhatsAppFloater";
import { SiteFooter } from "@/components/nav/SiteFooter";
import { SiteFooterMenuGate } from "@/components/nav/SiteFooterMenuGate";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { IntroSplash } from "@/components/splash/IntroSplash";
import { HeaderThemeBridge } from "@/hooks/useHeaderTheme";
import { routing } from "@/i18n/routing";
import { ENABLE_VACATION_BANNER } from "@/lib/featureFlags";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tSkip = await getTranslations({ locale, namespace: "Skip" });
  const tBanner = ENABLE_VACATION_BANNER
    ? await getTranslations({ locale, namespace: "VacationBanner" })
    : null;

  return (
    <html
      lang={locale}
      data-header-theme="light"
      className={`${body.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-cream font-sans text-dark-slate">
        <NextIntlClientProvider messages={messages}>
          <IntroSplash />
          <HeaderThemeBridge>
            <div className="sticky top-0 z-50">
              {tBanner && <VacationBanner message={tBanner("message")} />}
              <SiteHeader />
            </div>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-cream focus:px-4 focus:py-2 focus:text-dark-slate"
            >
              {tSkip("toContent")}
            </a>
            <main
              id="main-content"
              className="flex min-h-0 flex-1 flex-col"
            >
              {children}
            </main>
          </HeaderThemeBridge>
          <SiteFooterMenuGate>
            <SiteFooter />
          </SiteFooterMenuGate>
          <WhatsAppFloater />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
