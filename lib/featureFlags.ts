/**
 * Auto-scroll suave na secção da home marcada com `data-scroll-assist`
 * (ver `HomeView` e `useScrollAssist` em `useHeaderTheme`).
 * Definir `true` para reativar sem alterar o resto do fluxo.
 */
export const ENABLE_HOME_SCROLL_ASSIST = false;

/** Secção “Tradition you can taste” (grelha 3 colunas) na página About. */
export const ENABLE_ABOUT_EXPERIENCE_SECTION = false;

/** Secção de reviews / depoimentos na página About. */
export const ENABLE_ABOUT_TESTIMONIAL_SECTION = false;

/** Faixa de aviso de férias de agosto — remover após 21.08. */
export const ENABLE_VACATION_BANNER = false;

/**
 * Faixa "primeiro dia de aula" (locales "de" e "it", ver `app/[locale]/layout.tsx`).
 * Desativa-se sozinha a partir desta data — não é preciso mexer aqui depois.
 */
const SCHOOL_BANNER_END_DATE = "2026-09-15";

export function isSchoolBannerActive(): boolean {
  const todayInRome = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
  }).format(new Date());
  return todayInRome < SCHOOL_BANNER_END_DATE;
}
