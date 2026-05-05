# Trattoria Alesa Website

Website institucional da Trattoria Alesa (Augsburg, Alemanha), com foco em narrativa visual, performance e navegacao simples para menu, reservas e contato.

# Documentação completa:

## Stack atual

- `next@16.2.4` (App Router)
- `react@19.2.4` + TypeScript
- Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/postcss`)
- `next-intl` para internacionalizacao
- Framer Motion para animacoes pontuais
- Deploy preparado para Netlify (`@netlify/plugin-nextjs`)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estrutura principal

- `app/`
  - `app/[locale]/layout.tsx`: layout localizado (provider i18n, header/footer, splash)
  - `app/[locale]/page.tsx`: home
  - `app/[locale]/about/page.tsx`
  - `app/[locale]/menu/page.tsx`
  - `app/[locale]/contact/page.tsx`
  - `app/[locale]/reservations/page.tsx`
  - `app/[locale]/not-found.tsx`
- `components/`: componentes por dominio (`home`, `nav`, `menu`, `contact`, `reveal`, `layout`, etc.)
- `i18n/`: roteamento e carga de mensagens
- `messages/`: traducoes em JSON
- `lib/`: feature flags, tokens e configs de links/env
- `public/`: imagens e videos estaticos

## Internacionalizacao (i18n)

- Locales suportados: `de`, `en`, `it`
- Locale padrao: `de`
- Prefixo de locale sempre na URL (`/de`, `/en`, `/it`)
- Mensagens carregadas por request em `i18n/request.ts` com fallback para locale padrao
- Middleware em `middleware.ts` aplica o roteamento localizado

## Configuracoes importantes

- `next.config.ts`
  - Plugin `next-intl`
  - `images.qualities` liberando `75`, `90`, `100`
  - formatos `avif` e `webp`
  - `remotePatterns` para `images.unsplash.com`
- `lib/featureFlags.ts`
  - `ENABLE_HOME_SCROLL_ASSIST` (atual: `false`)
  - `ENABLE_ABOUT_EXPERIENCE_SECTION` (atual: `false`)
  - `ENABLE_ABOUT_TESTIMONIAL_SECTION` (atual: `false`)

## Variaveis de ambiente usadas

Defina em `.env.local` quando necessario:

- `NEXT_PUBLIC_WHATSAPP_E164`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `NEXT_PUBLIC_MENU_DRIVE_FILE_ID`
- `NEXT_PUBLIC_MENU_ORDER_DRIVE_FILE_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_LINK_URL`

Se ausentes, o projeto usa fallbacks definidos em `lib/siteConfig.ts`.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` e sera feito redirect para o locale padrao.

## Qualidade

- Lint: `npm run lint`
- Tipagem: TypeScript em modo `strict`

## Observacoes

- Projeto privado de cliente.
- Integracao com CMS (ex.: Sanity) pode ser adicionada no futuro, mas ainda nao esta conectada neste repositorio.
