"use client";

import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/icons/Instagram";
import { LocaleFlag } from "@/components/icons/LocaleFlag";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeDisplay, type LocaleDisplayKey } from "@/lib/localeDisplay";
import { getInstagramUrl } from "@/lib/siteConfig";
import { easeStandard, motion as motionTokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useId } from "react";

const locales = routing.locales;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const titleId = useId();
  const ig = getInstagramUrl();
  const ease = [...easeStandard] as [number, number, number, number];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const nav = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/menu", label: t("menu") },
    { href: "/contact", label: t("contact") },
    { href: "/reservations", label: t("booking") },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="sheet"
          className="fixed inset-0 z-[60] bg-black/35 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.micro, ease }}
        >
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-pointer"
            aria-label={t("closeMenu")}
            onClick={onClose}
          />
          <motion.nav
            id="mobile-menu-panel"
            className="absolute inset-x-0 top-0 z-10 max-h-dvh min-h-dvh overflow-y-auto border-b border-stone-200 bg-white px-4 pb-10 pt-6 text-[#333333] shadow-xl sm:px-6 lg:px-8"
            initial={reduce ? false : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: reduce ? 0 : motionTokens.menuDuration,
              ease,
            }}
          >
            <p id={titleId} className="sr-only">
              {t("menuTitle")}
            </p>

            <div className="mb-8 flex items-center justify-between gap-4 border-b border-stone-100 pb-6">
              <Link href="/" onClick={onClose} className="min-w-0 shrink">
                <Image
                  src="/logo.svg"
                  alt={t("logoAlt")}
                  width={200}
                  height={64}
                  className="h-10 w-auto object-contain object-left"
                  priority
                  unoptimized
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-md p-2.5 text-[#333333] transition-colors hover:bg-stone-100"
                aria-label={t("closeMenu")}
              >
                <span className="relative block h-5 w-5" aria-hidden>
                  <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </span>
              </button>
            </div>

            <ul className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block rounded-sm px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
                      isActive(item.href)
                        ? "text-[#C5A059]"
                        : "text-[#666666] hover:bg-stone-50 hover:text-[#333333]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-6">
              <span className="w-full text-xs font-semibold uppercase tracking-wider text-stone-500">
                {t("chooseLanguage")}
              </span>
              {locales.map((loc) => {
                const item = localeDisplay[loc as LocaleDisplayKey];
                return (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    onClick={onClose}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
                      loc === locale
                        ? "border-[#C5A059] text-[#C5A059]"
                        : "border-stone-300 text-[#666666] hover:border-stone-400",
                    )}
                  >
                    <LocaleFlag locale={loc} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {ig ? (
              <a
                href={ig}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-[#666666] hover:bg-stone-50"
                onClick={onClose}
              >
                <InstagramIcon />
                {t("instagram")}
              </a>
            ) : null}

            <div className="mt-8">
              <Button href="/reservations" variant="primary" fullWidth onClick={onClose}>
                {t("booking")}
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
