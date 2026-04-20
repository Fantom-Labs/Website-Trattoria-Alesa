# Trattoria Alesa — Website

Site para a **Trattoria Alesa**, uma trattoria italiana em **Hochzoll, Augsburg (Alemanha)**. O objetivo é uma sensação editorial e calma — no espírito de uma **“sala de estar italiana tranquila”** — com caminhos claros para o cardápio, reservas e contato.

---

## Contexto do cliente e necessidades

A Trattoria Alesa precisava de um site que:

- **Refletisse a marca**: tipografia acolhedora, movimento contido, narrativa guiada por fotografia — não um template genérico de restaurante.
- **Atendesse um público internacional**: conteúdo e navegação funcionam em **alemão, italiano e inglês** (URLs com prefixo de locale e padrões de UI compartilhados).
- **Convertesse**: CTAs evidentes para **reservas**, **WhatsApp** e **Instagram**, com navegação acessível e links de pular para o conteúdo.
- **Permanesse rápido**: App Router, geração estática onde faz sentido, e seções com muitas imagens tratadas com cuidado para os Core Web Vitals.

Stakeholders não técnicos se importam com clareza e confiança; a implementação prioriza **estrutura semântica**, **metadados de SEO por locale** e **tokens de design consistentes**, para que futuras mudanças de conteúdo e layout continuem baratas.

---

## Stack

| Camada | Escolha |
|--------|---------|
| Framework | **Next.js 16** (App Router) |
| UI | **React 19**, **TypeScript** |
| Estilização | **Tailwind CSS v4** (utility-first, tokens de design em CSS) |
| i18n | **next-intl** — catálogos de mensagens em JSON (`messages/de.json`, `it.json`, `en.json`), `generateStaticParams` para locales |
| Motion | **Framer Motion** (splash e microinterações onde agregam significado) |
| Primitivos | **Radix UI** (ex.: padrões de avatar onde a acessibilidade importa) |
| Utilitários | **clsx**, **tailwind-merge** para composição previsível de `className` |
| Qualidade | **ESLint** (config Next.js) |
| Deploy | **Netlify** (`@netlify/plugin-nextjs` em devDependencies — runtime Next na Netlify) |

A tipografia usa **`next/font/google`**: **DM Sans** (corpo) e **Cormorant Garamond** (display), carregadas com `display: "swap"` para limitar layout shift.

---

## CMS (planejado): Sanity

**Integração com CMS headless via [Sanity](https://www.sanity.io/) está planejada** para que editores possam atualizar textos, imagens e conteúdo estruturado sem mexer no repositório. Hoje, **todas as strings ficam em arquivos JSON por locale** em `messages/`; a arquitetura (server components + `next-intl`) é compatível com ir **puxando strings e módulos de página do Sanity aos poucos** (ex.: Portable Text, referências, fluxos de preview) mantendo as mesmas rotas e componentes.

Nada está conectado ao Sanity neste repositório ainda — quando entrar, espere um pacote de schemas `sanity` ou app do studio, consultas tipadas (ex.: GROQ) e rotas opcionais de rascunho/preview.

---

## Estrutura do projeto (visão geral)

- **`app/[locale]/`** — Rotas com locale (`/de`, `/it`, `/en`), layouts e metadados.
- **`components/`** — UI por feature (home, nav, splash, links etc.) dividida por domínio, em vez de um único “components” plano.
- **`i18n/`** — Config de roteamento e setup de request para `next-intl`.
- **`messages/`** — Fonte da verdade para textos traduzidos até o Sanity ser conectado.
- **`public/images/`** — Fotografia estática e assets.

---

## Escolhas técnicas relevantes

- **App Router + dados server-first**: traduções resolvidas no servidor via `next-intl/server`, mantendo bundles enxutos para páginas de marketing.
- **Locale na URL**: previsível para SEO e compartilhamento; params estáticos gerados para os locales suportados.
- **Motion com intenção**: splash e transições reforçam a marca sem competir com a leitura.
- **Padrões pensados em acessibilidade**: pular para o conteúdo, landmarks semânticos e Radix onde há widgets complexos.

---

## Primeiros passos

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — você será redirecionado para um locale padrão (veja `i18n/routing`).

```bash
npm run build   # build de produção
npm run start   # servidor de produção local
npm run lint    # ESLint
```

---

## Licença / propriedade

Projeto privado de cliente; não licenciado para redistribuição.

---

# Trattoria Alesa — Marketing Website

Production-oriented marketing site for **Trattoria Alesa**, an Italian trattoria in **Hochzoll, Augsburg (Germany)**. The goal is a calm, editorial feel—think “quiet Italian living room”—with clear paths to the menu, reservations, and contact, without sacrificing performance or maintainability.

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

## License / ownership

Private client project; not licensed for redistribution.
