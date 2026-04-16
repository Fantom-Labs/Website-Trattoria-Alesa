import { cn } from "@/lib/utils";

const supported = ["de", "en", "it"] as const;
type SupportedLocale = (typeof supported)[number];

function isSupported(locale: string): locale is SupportedLocale {
  return (supported as readonly string[]).includes(locale);
}

/** Bandeira em SVG (Alemanha / Reino Unido / Itália) — evita letras regionais no Windows sem emoji colorido. */
export function LocaleFlag({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const code = isSupported(locale) ? locale : "de";
  const base = cn(
    "inline-block shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10",
    "h-[11px] w-[17px] sm:h-3 sm:w-[18px]",
    className,
  );

  if (code === "de") {
    return (
      <svg viewBox="0 0 5 3" className={base} aria-hidden>
        <rect width="5" height="1" y="0" fill="#000000" />
        <rect width="5" height="1" y="1" fill="#DD0000" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    );
  }

  if (code === "it") {
    return (
      <svg viewBox="0 0 3 2" className={base} aria-hidden>
        <rect width="1" height="2" x="0" y="0" fill="#009246" />
        <rect width="1" height="2" x="1" y="0" fill="#FFFFFF" />
        <rect width="1" height="2" x="2" y="0" fill="#CE2B37" />
      </svg>
    );
  }

  /* en — Reino Unido (Union Jack simplificado, proporção 1:2) */
  return (
    <svg viewBox="0 0 60 30" className={base} aria-hidden>
      <rect width="60" height="30" fill="#012169" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        stroke="#C8102E"
        strokeWidth="3.5"
        strokeLinecap="square"
      />
      <path
        d="M30,0 V30 M0,15 H60"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="square"
      />
      <path
        d="M30,0 V30 M0,15 H60"
        stroke="#C8102E"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </svg>
  );
}
