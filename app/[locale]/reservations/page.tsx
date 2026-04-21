import { WhatsAppButton } from "@/components/links/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ReservationsPage() {
  const t = await getTranslations("Reservations");

  return (
    <div
      className="relative flex h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:h-[calc(100dvh-5.5rem)] lg:max-h-[calc(100dvh-5.5rem)]"
      data-header-theme="brown"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <section
        aria-labelledby="reservations-title"
        className="relative z-10 w-full max-w-lg space-y-8 rounded-none border border-stone-300 bg-cream p-8 shadow-xl sm:max-w-xl sm:p-10"
      >
        <h1
          id="reservations-title"
          className="text-[18px] font-bold uppercase leading-relaxed tracking-normal text-steel-grey"
        >
          {t("title")}
        </h1>
        <p className="text-base leading-relaxed text-warm-brown sm:text-lg">{t("body")}</p>
        <WhatsAppButton labelKey="button" fullWidth className="sm:w-auto sm:min-w-[12rem]" />
        <p className="text-sm text-warm-brown">{t("secondary")}</p>
        <Button href="/contact" variant="secondary">
          {t("contactLink")}
        </Button>
      </section>
    </div>
  );
}
