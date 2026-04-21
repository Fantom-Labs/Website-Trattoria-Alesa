import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { HeroSection } from "@/components/home/HeroSection";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tNav = await getTranslations("Nav");
  const tAbout = await getTranslations("About");

  const phoneHref = `tel:+${t("phone").replace(/\D/g, "")}`;

  return (
    <>
      <HeroSection
        media={
          <div className="relative h-full min-h-full w-full">
            <Image
              src="/images/img-1.png"
              alt={tAbout("hero.mediaAlt")}
              fill
              sizes="(max-width: 1023px) max(100vw, 100vh), 100vw"
              quality={90}
              className="object-cover"
              priority
            />
          </div>
        }
      />

      <ContactInfoSection
        headlineLine1={t("headlineLine1")}
        headlineLine2={t("headlineLine2")}
        infoBlockTitle={t("infoBlockTitle")}
        infoBlockSubtitle={t("infoBlockSubtitle")}
        addressLabel={t("addressLabel")}
        addressLines={t("addressLines")}
        hoursLabel={t("hoursLabel")}
        hours={t("hours")}
        phone={t("phone")}
        phoneHref={phoneHref}
        email={t("email")}
        note={t("note")}
        reserveLabel={tNav("reserve")}
      />
    </>
  );
}
