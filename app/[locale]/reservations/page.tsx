import { WhatsAppButton } from "@/components/links/WhatsAppButton";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ReservationsPage() {
  const t = await getTranslations("Reservations");

  return (
    <div
      className="flex min-h-[calc(100dvh-4rem)] flex-col bg-[#fcf9f1] lg:min-h-[calc(100dvh-5.5rem)]"
      data-header-theme="brown"
    >
      <div className="relative h-[min(52vw,14rem)] w-full shrink-0 overflow-hidden sm:h-[min(44vw,18rem)] lg:h-[min(36vw,22rem)]">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) max(100vw, 70vh), 100vw"
          quality={90}
          className="object-cover object-[center_32%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/60"
          aria-hidden
        />
      </div>

      <SectionContainer as="div" className="flex flex-1 flex-col pb-16 sm:pb-20">
        <header className="border-b border-stone-200/90 py-8 sm:py-10 lg:py-12">
          <h1 className="font-sans text-[clamp(1.65rem,4.2vw,3.15rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <span className="block text-[#C5A059]">{t("headlineLine1")}</span>
            <span className="block text-dark-slate">{t("headlineLine2")}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-warm-brown sm:mt-10 sm:text-lg">
            {t("body")}
          </p>
        </header>

        <div className="flex flex-1 flex-col gap-10 py-10 sm:gap-12 sm:py-12 lg:py-14">
          <div className="max-w-xl">
            <WhatsAppButton labelKey="button" fullWidth className="sm:w-auto sm:min-w-[14rem]" />
          </div>

          <footer className="mt-auto border-t border-stone-200/90 pt-8 sm:pt-10">
            <p className="max-w-2xl text-sm leading-relaxed text-warm-brown sm:text-base">{t("secondary")}</p>
            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                {t("contactLink")}
              </Button>
            </div>
          </footer>
        </div>
      </SectionContainer>
    </div>
  );
}
