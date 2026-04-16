import { WHATSAPP_FLOATER_HREF } from "@/lib/siteConfig";
import { getTranslations } from "next-intl/server";

export async function WhatsAppFloater() {
  const t = await getTranslations("Nav");

  return (
    <a
      href={WHATSAPP_FLOATER_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[90] flex size-[3.25rem] items-center justify-center rounded-full shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition-[transform,box-shadow] hover:scale-[1.04] hover:shadow-[0_10px_28px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-brown sm:bottom-6 sm:right-6 sm:size-[4.5rem]"
      aria-label={t("whatsappFloater")}
    >
      <img
        src="/wp-floater.svg"
        alt=""
        width={72}
        height={72}
        className="size-full select-none"
        draggable={false}
      />
    </a>
  );
}
