/** Nomes dos idiomas no seletor — a bandeira é `LocaleFlag` (SVG), não emoji. */
export const localeDisplay = {
  de: { label: "Deutsch" },
  en: { label: "English" },
  it: { label: "Italiano" },
} as const;

export type LocaleDisplayKey = keyof typeof localeDisplay;

export function getLocaleDisplay(locale: string) {
  return localeDisplay[locale as LocaleDisplayKey] ?? localeDisplay.de;
}
