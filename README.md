# Trattoria Alesa — Marketing Website

Production-oriented marketing site for **Trattoria Alesa**, an Italian trattoria in **Hochzoll, Augsburg (Germany)**. The goal is a calm, editorial feel—think “quiet Italian living room”—with clear paths to the menu, reservations, and contact, without sacrificing performance or maintainability.

This README is written for **technical recruiters and hiring managers** who want a fast picture of stack, scope, and how the work was approached.

---

## Client context & needs

Trattoria Alesa needed a site that:

- **Reflects the brand**: warm typography, restrained motion, photography-led storytelling—not a generic restaurant template.
- **Serves an international audience**: content and navigation work across **German, Italian, and English** (locale-prefixed URLs and shared UI patterns).
- **Converts**: obvious CTAs for **reservations**, **WhatsApp**, and **Instagram**, with accessible navigation and skip links.
- **Stays fast**: App Router, static generation where it makes sense, and image-heavy sections handled with care for Core Web Vitals.

Non-technical stakeholders care about clarity and trust; the implementation prioritizes **semantic structure**, **SEO metadata per locale**, and **consistent design tokens** so future content and layout changes stay cheap.

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 16** (App Router) |
| UI | **React 19**, **TypeScript** |
| Styling | **Tailwind CSS v4** (utility-first, design tokens in CSS) |
| i18n | **next-intl** — JSON message catalogs (`messages/de.json`, `it.json`, `en.json`), `generateStaticParams` for locales |
| Motion | **Framer Motion** (splash and micro-interactions where they add meaning) |
| Primitives | **Radix UI** (e.g. avatar patterns where accessibility matters) |
| Utilities | **clsx**, **tailwind-merge** for predictable `className` composition |
| Quality | **ESLint** (Next.js config) |
| Deploy | **Netlify** (`@netlify/plugin-nextjs` in devDependencies — Next runtime on Netlify) |

Typography uses **`next/font/google`**: **DM Sans** (body) and **Cormorant Garamond** (display), loaded with `display: "swap"` to limit layout shift.

---

## CMS (planned): Sanity

**Headless CMS integration with [Sanity](https://www.sanity.io/) is planned** so editors can update copy, imagery, and structured content without touching the repo. Today, **all strings live in locale JSON files** under `messages/`; the architecture (server components + `next-intl`) is compatible with gradually **sourcing strings and page modules from Sanity** (e.g. Portable Text, references, preview workflows) while keeping the same routes and components.

Nothing is wired to Sanity in this repository yet—when it lands, expect a `sanity` schema package or studio app, typed queries (e.g. GROQ), and optional draft/preview routes.

---

## Project structure (high level)

- **`app/[locale]/`** — Locale-scoped routes (`/de`, `/it`, `/en`), layouts, and metadata.
- **`components/`** — Feature UI (home, nav, splash, links, etc.) split by domain rather than one flat “components” dump.
- **`i18n/`** — Routing config and request setup for `next-intl`.
- **`messages/`** — Source of truth for translated copy until Sanity is connected.
- **`public/images/`** — Static photography and assets.

---

## Notable technical choices

- **App Router + server-first data**: translations resolved on the server via `next-intl/server`, keeping bundles lean for marketing pages.
- **Locale in the URL**: predictable for SEO and sharing; static params generated for supported locales.
- **Motion with intent**: splash and transitions support the brand without competing with readability.
- **Accessibility-minded patterns**: skip-to-content, semantic landmarks, and Radix where complex widgets appear.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to a default locale (see `i18n/routing`).

```bash
npm run build   # production build
npm run start   # run production server locally
npm run lint    # ESLint
```

---

## Environment & deployment

Configure any future secrets (e.g. Sanity API tokens, preview URLs) via environment variables in your host—**Netlify** is the intended deployment path for this project.

---

## License / ownership

Private client project; not licensed for redistribution.
