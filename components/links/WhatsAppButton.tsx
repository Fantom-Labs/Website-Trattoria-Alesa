"use client";

import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/siteConfig";
import { useTranslations } from "next-intl";

type Props = {
  labelKey: string;
  labelNamespace?: string;
  className?: string;
  fullWidth?: boolean;
};

export function WhatsAppButton({
  labelKey,
  labelNamespace = "Reservations",
  className,
  fullWidth,
}: Props) {
  const tLabel = useTranslations(labelNamespace);
  const tRes = useTranslations("Reservations");
  const href = buildWhatsAppUrl(tRes("whatsappPrefill"));

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
