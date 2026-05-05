"use client";

import { OpenInNewTabIcon } from "@/components/icons/OpenInNewTab";
import { Button } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export type MenuPdfUrls = {
  previewUrl: string;
  viewUrl: string;
};

type ActiveTab = "main" | "order";

type Props = {
  main: MenuPdfUrls;
  order: MenuPdfUrls | null;
};

export function MenuPdfFullClient({ main, order }: Props) {
  const t = useTranslations("Menu");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<ActiveTab>("main");
  const [mainLoaded, setMainLoaded] = useState(false);
  const [orderLoaded, setOrderLoaded] = useState(false);

  const hasOrder = Boolean(order);
  const showingOrder = active === "order" && hasOrder;
  const current = showingOrder && order ? order : main;

  useEffect(() => {
    if (!hasOrder && active === "order") {
      setActive("main");
    }
  }, [active, hasOrder]);

  const loadingActive = showingOrder ? !orderLoaded : !mainLoaded;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 w-full flex-1">
        {loadingActive ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream/70 backdrop-blur-[1px]">
            <div className="relative h-[clamp(56px,18vmin,120px)] w-[clamp(88px,28vmin,190px)]">
              {reduceMotion ? (
                <Image
                  src="/logo.svg"
                  alt=""
                  fill
                  priority
                  className="object-contain opacity-95"
                  sizes="(max-width: 768px) 180px, 190px"
                />
              ) : (
                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    opacity: [0, 1],
                    scale: [0.92, 1.07],
                  }}
                  transition={{
                    duration: 0.95,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <Image
                    src="/logo.svg"
                    alt=""
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 180px, 190px"
                  />
                </motion.div>
              )}
            </div>
            <span className="sr-only">{t("loadingPdf")}</span>
          </div>
        ) : null}

        <iframe
          title={t("pdfFrameTitle")}
          src={main.previewUrl}
          className={`absolute inset-0 h-full w-full border-0 ${showingOrder ? "hidden" : "block"}`}
          allow="fullscreen"
          loading="eager"
          onLoad={() => setMainLoaded(true)}
        />

        {order ? (
          <iframe
            title={t("pdfFrameTitleOrders")}
            src={order.previewUrl}
            className={`absolute inset-0 h-full w-full border-0 ${showingOrder ? "block" : "hidden"}`}
            allow="fullscreen"
            loading="eager"
            onLoad={() => setOrderLoaded(true)}
          />
        ) : null}
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-stone-200/90 px-4 py-3 sm:gap-4 sm:py-4">
        {hasOrder ? (
          <>
            <Button
              type="button"
              variant={!showingOrder ? "primary" : "secondary"}
              onClick={() => setActive("main")}
            >
              {t("menuTabMain")}
            </Button>
            <Button
              type="button"
              variant={showingOrder ? "primary" : "secondary"}
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
