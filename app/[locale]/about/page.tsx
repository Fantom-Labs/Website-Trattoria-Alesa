import { HeroSection } from "@/components/home/HeroSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
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
