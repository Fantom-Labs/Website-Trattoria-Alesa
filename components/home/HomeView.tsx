import { WhatsAppButton } from "@/components/links/WhatsAppButton";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Divider } from "@/components/layout/Divider";
import { EditorialCoverImage } from "@/components/editorial/EditorialCoverImage";
import { ExperienceGalleryImage } from "@/components/home/ExperienceGalleryImage";
import { SectionEnter } from "@/components/reveal/SectionEnter";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function HomeView() {
  const t = await getTranslations("Home");

  return (
    <>
      <HeroSection
        media={
          <div className="relative h-full min-h-full w-full">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/video-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={t("hero.mediaAlt")}
            />
          </div>
        }
      />

      <section
        data-header-theme="brown"
        data-scroll-assist
        className="bg-cream py-20 sm:py-24"
      >
        <SectionContainer>
          <SectionEnter className="max-w-none text-left sm:max-w-[50vw]">
            <p className="text-2xl font-normal leading-8 tracking-normal text-warm-brown">
              {t("intro.body")}
            </p>
          </SectionEnter>
        </SectionContainer>
      </section>

      <section data-header-theme="brown" className="bg-cream py-16 sm:py-20 lg:py-24">
        <SectionContainer>
          <div className="grid w-full grid-cols-1 items-start gap-12 sm:gap-14 lg:grid-cols-3 lg:gap-12 xl:gap-16 2xl:gap-20">
            <div className="order-1 min-w-0 lg:order-1">
              <ExperienceGalleryImage
                variant="panel"
                src="/images/img-7.png"
                alt={t("highlightFlip.imageLeftAlt")}
                caption={t("highlightFlip.captionLeft")}
              />
            </div>

            <div className="order-2 min-w-0 lg:order-2">
              <ExperienceGalleryImage
                variant="panel"
                src="/images/img-8.png"
                alt={t("highlightFlip.imageMidAlt")}
                caption={t("highlightFlip.captionMid")}
              />
            </div>

            <SectionEnter className="order-3 flex max-w-lg flex-col gap-6 text-left lg:order-3 lg:max-w-none lg:pl-4">
              <h3 className="text-[18px] font-bold uppercase leading-relaxed tracking-normal text-steel-grey">
                {t("highlightFlip.eyebrow")}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-warm-brown sm:text-lg">
                {t("highlightFlip.body")}
              </p>
              <Link
                href="/about"
                className="mt-1 w-fit text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-grey underline decoration-steel-grey/55 underline-offset-[7px] transition-colors hover:text-dark-slate hover:decoration-dark-slate/45 sm:text-[11px]"
              >
                {t("highlightFlip.discover")}
              </Link>
            </SectionEnter>
          </div>
        </SectionContainer>
      </section>

      <section
        data-header-theme="brown"
        className="grid h-dvh w-full grid-cols-2 gap-0 overflow-hidden"
        aria-label={t("splitScreen.ariaLabel")}
      >
        <EditorialCoverImage
          className="h-full w-full"
          src="/images/img-5.png"
          alt={t("splitScreen.imageLeftAlt")}
          caption={t("splitScreen.captionLeft")}
          sizes="50vw"
        />
        <EditorialCoverImage
          className="h-full w-full"
          src="/images/img-9.png"
          alt={t("splitScreen.imageRightAlt")}
          caption={t("splitScreen.captionRight")}
          sizes="50vw"
        />
      </section>

      <section data-header-theme="brown" className="bg-cream py-16 sm:py-20 lg:py-24">
        <SectionContainer>
          <div className="grid w-full grid-cols-1 items-start gap-12 sm:gap-14 lg:grid-cols-3 lg:gap-12 xl:gap-16 2xl:gap-20">
            <SectionEnter className="order-1 flex max-w-lg flex-col gap-6 text-left lg:max-w-none lg:pr-4">
              <h3 className="text-[18px] font-bold uppercase leading-relaxed tracking-normal text-steel-grey">
                {t("highlight.eyebrow")}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-warm-brown sm:text-lg">
                {t("highlight.body")}
              </p>
              <Link
                href="/about"
                className="mt-1 w-fit text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-grey underline decoration-steel-grey/55 underline-offset-[7px] transition-colors hover:text-dark-slate hover:decoration-dark-slate/45 sm:text-[11px]"
              >
                {t("highlight.discover")}
              </Link>
            </SectionEnter>

            <div className="order-2 min-w-0 lg:order-2">
              <ExperienceGalleryImage
                variant="panel"
                src="/images/img-3.png"
                alt={t("highlight.imageMidAlt")}
                caption={t("highlight.captionMid")}
              />
            </div>

            <div className="order-3 min-w-0 lg:order-3">
              <ExperienceGalleryImage
                variant="panel"
                src="/images/img-4.png"
                alt={t("highlight.imageRightAlt")}
                caption={t("highlight.captionRight")}
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section data-header-theme="brown" className="bg-neutral-200 py-20 text-[#171717] sm:py-24">
        <SectionContainer className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <SectionEnter className="min-w-0 space-y-3">
            <h2 className="font-display text-3xl tracking-wide text-[#171717] sm:text-4xl">{t("cta.title")}</h2>
            <p className="text-sm leading-relaxed text-[#171717] sm:text-base">{t("cta.body")}</p>
          </SectionEnter>
          <div className="w-full shrink-0 sm:w-auto">
            <WhatsAppButton
              labelNamespace="Home.cta"
              labelKey="button"
              textLink
            />
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
