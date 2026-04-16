"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/siteConfig";
import { useTranslations } from "next-intl";

type Props = {
  labelKey: string;
  labelNamespace?: string;
  className?: string;
  fullWidth?: boolean;
  /** Underline text link (same language as in-page “+ discover more +” links). */
  textLink?: boolean;
};

const textLinkBase =
  "mt-1 inline-flex min-h-0 w-fit items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-grey underline decoration-steel-grey/55 underline-offset-[7px] transition-colors hover:text-dark-slate hover:decoration-dark-slate/45 sm:text-[11px]";

export function WhatsAppButton({
  labelKey,
  labelNamespace = "Reservations",
  className,
  fullWidth,
  textLink,
}: Props) {
  const tLabel = useTranslations(labelNamespace);
  const tRes = useTranslations("Reservations");
  const href = buildWhatsAppUrl(tRes("whatsappPrefill"));

  if (textLink) {
    return (
      <a
        href={href}
        className={cn(textLinkBase, fullWidth && "w-full", className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tLabel(labelKey)}
      </a>
    );
  }

  return (
    <Button
      externalHref={href}
      variant="primary"
      className={className}
      fullWidth={fullWidth}
    >
      {tLabel(labelKey)}
    </Button>
  );
}
