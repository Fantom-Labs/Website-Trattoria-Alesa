import { AboutSplitIntro } from "@/components/about/AboutSplitIntro";
import { HeroSection } from "@/components/home/HeroSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { TestimonialSection } from "@/components/ui/testimonial-section";
import { ENABLE_ABOUT_TESTIMONIAL_SECTION } from "@/lib/featureFlags";
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
              sizes="(max-width: 1023px) max(100vw, 100vh), 100vw"
              quality={90}
              className="object-cover"
              priority
            />
          </div>
        }
      />

      <AboutSplitIntro
        heading={t("split.heading")}
        body={t("split.body")}
        imageAlt={t("split.imageAlt")}
      />

      <ExperienceSection />

      {ENABLE_ABOUT_TESTIMONIAL_SECTION ? (
        <TestimonialSection
          title={tHome("reviews.title")}
          items={reviewIds.map((id) => ({
            quote: tHome(`reviews.items.${id}.quote`),
            name: tHome(`reviews.items.${id}.name`),
            role: tHome(`reviews.items.${id}.role`),
            avatarAlt: tHome(`reviews.items.${id}.avatarAlt`),
          }))}
        />
      ) : null}
    </>
  );
}
