"use client";

import { LocaleSwitcher } from "@/components/nav/LocaleSwitcher";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { InstagramIcon } from "@/components/icons/Instagram";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { Link, usePathname } from "@/i18n/navigation";
import { getInstagramUrl } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { startTransition, useEffect, useState } from "react";

function NavLink({
  href,
  children,
  active,
  onDarkSection,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  /** Hero / fundo escuro: texto claro na barra com vidro escuro. */
  onDarkSection: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap border-b pb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-xs",
        onDarkSection
          ? active
            ? "border-[#C5A059] text-[#C5A059]"
            : "border-transparent text-white/90 hover:text-white"
          : active
            ? "border-[#C5A059] text-[#C5A059]"
            : "border-transparent text-[#666666] hover:text-[#333333]",
      )}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const { theme } = useHeaderTheme();
  /** `data-header-theme="light"` marca secções sobre fundo escuro (ex.: hero). */
  const onDarkSection = theme === "light";
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ig = getInstagramUrl();

  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  const left = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/menu", label: t("menu") },
  ] as const;

  const right = [
    { href: "/contact", label: t("contact") },
    { href: "/reservations", label: t("booking") },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  /** Barra clara (secções cream) → logo escuro; barra vidro no hero → logo claro. */
  const logoSrc = onDarkSection ? "/logo2.svg" : "/logo.svg";

  return (
    <>
      <header
        data-site-header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-200 ease-out",
          onDarkSection
            ? "border-white/15 bg-black/40 text-white backdrop-blur-md backdrop-saturate-150"
            : "border-stone-200 bg-white text-[#333333]",
        )}
      >
        <div className="relative h-16 w-full px-4 py-2 sm:px-6 lg:h-[5.5rem] lg:px-8 lg:py-1">
          {/* Desktop: largura total — links nas extremidades, logo ao centro da viewport */}
          <div className="hidden h-full w-full lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4 xl:gap-8">
            <nav
              className="flex h-full min-w-0 flex-wrap items-center justify-self-start gap-4 xl:gap-8"
              aria-label={t("primaryNav")}
            >
              {left.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={isActive(item.href)}
                  onDarkSection={onDarkSection}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex h-full items-center justify-center justify-self-center">
              <Link href="/" className="inline-flex items-center">
                <Image
                  key={logoSrc}
                  src={logoSrc}
                  alt={t("logoAlt")}
                  width={193}
                  height={63}
                  className="h-14 w-auto object-contain lg:h-14"
                  priority
                  unoptimized
                />
              </Link>
            </div>

            <div className="flex h-full min-w-0 items-center justify-self-end justify-end gap-3 sm:gap-4 xl:gap-6">
              <nav className="flex min-w-0 flex-wrap items-center justify-end gap-4 xl:gap-8">
                {right.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    active={isActive(item.href)}
                    onDarkSection={onDarkSection}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <LocaleSwitcher onDarkSection={onDarkSection} />
              {ig ? (
                <a
                  href={ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    onDarkSection
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-[#666666] hover:bg-stone-100 hover:text-[#333333]",
                  )}
                  aria-label={t("instagram")}
                >
                  <InstagramIcon />
                </a>
              ) : null}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex h-full w-full items-center justify-between gap-2 lg:hidden">
            <LocaleSwitcher onDarkSection={onDarkSection} />
            <Link href="/" className="min-w-0 flex-1 px-2 text-center">
              <Image
                key={logoSrc}
                src={logoSrc}
                alt={t("logoAlt")}
                width={175}
                height={56}
                className="mx-auto h-[calc(2.8125rem*0.7)] w-auto max-w-[min(60vw,calc(12.5rem*0.7))] object-contain"
                priority
                unoptimized
              />
            </Link>
            <button
              type="button"
              className={cn(
                "shrink-0 rounded-md p-2",
                onDarkSection
                  ? "text-white hover:bg-white/10"
                  : "text-[#333333] hover:bg-stone-100",
              )}
              aria-expanded={open}
              aria-controls="mobile-menu-panel"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span
                  className={cn(
                    "h-0.5 w-6 origin-center rounded-full bg-current transition-transform",
                    open && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-current transition-opacity",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 origin-center rounded-full bg-current transition-transform",
                    open && "-translate-y-2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
