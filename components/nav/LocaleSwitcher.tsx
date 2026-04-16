"use client";

import { LocaleFlag } from "@/components/icons/LocaleFlag";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getLocaleDisplay, localeDisplay, type LocaleDisplayKey } from "@/lib/localeDisplay";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const locale = useLocale() as LocaleDisplayKey;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const current = getLocaleDisplay(locale);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-[#333] shadow-sm transition-colors hover:border-stone-400"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={t("chooseLanguage")}
        onClick={() => setOpen((v) => !v)}
      >
        <LocaleFlag locale={locale} />
        <span className="max-w-[5.5rem] truncate sm:max-w-[7rem]">{current.label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={cn("shrink-0 text-stone-500 transition-transform", open && "rotate-180")}
          aria-hidden
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute right-0 z-[70] mt-2 min-w-[10.5rem] rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
        >
          {routing.locales.map((loc) => {
            const item = localeDisplay[loc as LocaleDisplayKey];
            const active = loc === locale;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <Link
                  href={pathname}
                  locale={loc}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-[#C5A059]/12 font-medium text-[#8a703f]"
                      : "text-[#333] hover:bg-stone-50",
                  )}
                  onClick={() => setOpen(false)}
                >
                  <LocaleFlag locale={loc} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
