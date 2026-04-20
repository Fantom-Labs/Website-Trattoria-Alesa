import { SectionContainer } from "@/components/layout/SectionContainer";
import { Divider } from "@/components/layout/Divider";
import { ExperienceGalleryImage } from "@/components/home/ExperienceGalleryImage";
import { getTranslations } from "next-intl/server";

export async function ExperienceSection() {
  const t = await getTranslations("Home");

  return (
    <section data-header-theme="brown" className="py-20 sm:py-24">
      <SectionContainer className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-3 lg:items-stretch lg:gap-5 xl:gap-6">
        <div className="order-1 flex min-w-0 w-full flex-col lg:min-h-0">
          <div className="mx-auto w-[80%] min-w-0">
            <ExperienceGalleryImage
              src="/images/img-1.png"
              alt={t("experience.imageAlt")}
              caption={t("experience.captionLeft")}
            />
          </div>
        </div>

        <div className="order-2 flex min-w-0 w-full flex-col items-center justify-center space-y-5 py-2 text-center lg:order-2 lg:min-h-0 lg:self-stretch lg:py-0">
          <h2 className="max-w-lg font-sans text-3xl font-semibold tracking-wide text-steel-grey sm:text-[32px]">
            {t("experience.title")}
          </h2>
          <Divider className="mx-auto w-full max-w-md" />
          <p className="max-w-md text-base leading-relaxed text-warm-brown sm:text-lg">{t("experience.body")}</p>
        </div>

        <div className="order-3 flex min-w-0 w-full flex-col items-stretch lg:min-h-0">
          <div className="mx-auto w-[80%] min-w-0">
            <ExperienceGalleryImage
              src="/images/img-2.png"
              alt={t("experience.imageAlt2")}
              caption={t("experience.captionRight")}
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
