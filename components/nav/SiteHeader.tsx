"use client";

import { LocaleSwitcher } from "@/components/nav/LocaleSwitcher";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { InstagramIcon } from "@/components/icons/Instagram";
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
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap border-b pb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-xs",
        active
          ? "border-[#C5A059] text-[#C5A059]"
          : "border-transparent text-[#666666] hover:border-stone-300 hover:text-[#333333]",
      )}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white text-[#333333]">
        <div className="relative h-16 w-full px-4 py-2 sm:px-6 lg:h-[5.5rem] lg:px-8 lg:py-3">
          {/* Desktop: largura total — links nas extremidades, logo ao centro da viewport */}
          <div className="hidden h-full w-full lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4 xl:gap-8">
            <nav
              className="flex h-full min-w-0 flex-wrap items-center justify-self-start gap-4 xl:gap-8"
              aria-label={t("primaryNav")}
            >
              {left.map((item) => (
                <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex h-full items-center justify-center justify-self-center">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt={t("logoAlt")}
                  width={220}
                  height={72}
                  className="h-16 w-auto object-contain lg:h-16"
                  priority
                />
              </Link>
            </div>

            <div className="flex h-full min-w-0 items-center justify-self-end justify-end gap-3 sm:gap-4 xl:gap-6">
              <nav className="flex min-w-0 flex-wrap items-center justify-end gap-4 xl:gap-8">
                {right.map((item) => (
                  <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <LocaleSwitcher />
              {ig ? (
                <a
                  href={ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-[#666666] transition-colors hover:bg-stone-100 hover:text-[#333333]"
                  aria-label={t("instagram")}
                >
                  <InstagramIcon />
                </a>
              ) : null}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex h-full w-full items-center justify-between gap-2 lg:hidden">
            <LocaleSwitcher />
            <Link href="/" className="min-w-0 flex-1 px-2 text-center">
              <Image
                src="/logo.png"
                alt={t("logoAlt")}
                width={200}
                height={64}
                className="mx-auto h-9 w-auto max-w-[min(48vw,10rem)] object-contain"
                priority
              />
            </Link>
            <button
              type="button"
              className="shrink-0 rounded-md p-2 text-[#333333] hover:bg-stone-100"
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
