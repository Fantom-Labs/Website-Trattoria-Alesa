"use client";

import { OpenInNewTabIcon } from "@/components/icons/OpenInNewTab";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type MenuPdfUrls = {
  previewUrl: string;
  viewUrl: string;
};

type Props = {
  main: MenuPdfUrls;
  order: MenuPdfUrls | null;
};

export function MenuPdfFullClient({ main, order }: Props) {
  const t = useTranslations("Menu");
  const [active, setActive] = useState<"main" | "order">("main");

  const current = active === "order" && order ? order : main;
  const hasOrder = Boolean(order);

  const iframeTitle = active === "order" && order ? t("pdfFrameTitleOrders") : t("pdfFrameTitle");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 w-full flex-1">
        <iframe
          key={active}
          title={iframeTitle}
          src={current.previewUrl}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
          loading="lazy"
        />
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-stone-200/90 px-4 py-3 sm:gap-4 sm:py-4">
        {hasOrder ? (
          <>
            <Button
              type="button"
              variant={active === "main" ? "primary" : "secondary"}
              onClick={() => setActive("main")}
            >
              {t("menuTabMain")}
            </Button>
            <Button
              type="button"
              variant={active === "order" ? "primary" : "secondary"}
              onClick={() => setActive("order")}
            >
              {t("menuTabTakeaway")}
            </Button>
          </>
        ) : null}
        <Button
          externalHref={current.viewUrl}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OpenInNewTabIcon className="size-4 shrink-0 opacity-90" />
          {t("openInNewTab")}
        </Button>
      </div>
    </div>
  );
}
