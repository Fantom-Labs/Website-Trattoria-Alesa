import { HeroSection } from "@/components/home/HeroSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Divider } from "@/components/layout/Divider";
import { RevealText } from "@/components/reveal/RevealText";
import { TestimonialSection } from "@/components/ui/testimonial-section";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const reviewIds = ["0", "1", "2"] as const;

export default async function AboutPage() {
  const t = await getTranslations("About");
  const tHome = await getTranslations("Home");

  return (
    <>
      <HeroSection
        media={
          <div className="relative h-full min-h-full w-full">
            <Image
              src="/images/img-1.png"
              alt={t("hero.mediaAlt")}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        }
      />

      <ExperienceSection />

      <div className="bg-cream pb-24 pt-10 sm:pt-14">
        <SectionContainer className="space-y-12">
          <header className="space-y-4" data-header-theme="brown">
            <RevealText
              as="h1"
              text={t("title")}
              className="font-display text-4xl tracking-wide text-dark-slate sm:text-5xl"
            />
            <p className="text-lg leading-relaxed text-warm-brown">{t("lede")}</p>
          </header>

          <section data-header-theme="brown" className="space-y-4">
            <h2 className="font-display text-2xl text-dark-slate">{t("storyTitle")}</h2>
            <Divider />
            <p className="leading-relaxed text-warm-brown">{t("storyBody")}</p>
          </section>

          <section data-header-theme="dapietro" className="space-y-4 rounded-sm bg-warm-brown/10 p-8">
            <h2 className="font-display text-2xl text-dark-slate">{t("philosophyTitle")}</h2>
            <Divider />
            <p className="leading-relaxed text-warm-brown">{t("philosophyBody")}</p>
          </section>

          <section data-header-theme="brown" className="space-y-4">
            <h2 className="font-display text-2xl text-dark-slate">{t("nonnaTitle")}</h2>
            <Divider />
            <p className="leading-relaxed text-warm-brown">{t("nonnaBody")}</p>
          </section>

          <p className="font-display text-xl text-dark-slate">{t("closing")}</p>
        </SectionContainer>
      </div>

      <TestimonialSection
        title={tHome("reviews.title")}
        items={reviewIds.map((id) => ({
          quote: tHome(`reviews.items.${id}.quote`),
          name: tHome(`reviews.items.${id}.name`),
          role: tHome(`reviews.items.${id}.role`),
          avatarAlt: tHome(`reviews.items.${id}.avatarAlt`),
        }))}
      />
    </>
  );
}
