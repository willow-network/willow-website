# willow-website

Marketing site for [Willow](https://willow.tech) — verifiable data infrastructure.

Single-page Vite + React + TypeScript site. Light theme, willow-green accent, minimal-by-design.

## Develop

```bash
npm install
npm run dev          # http://localhost:5180
npm run typecheck    # tsc -b --noEmit
npm run build        # tsc -b && vite build  →  ./dist
npm run preview      # serve the built bundle
```

## Project layout

```
src/
  App.tsx            top-level composition
  main.tsx           React mount
  styles.css         all styles (design tokens at top)
  lib/
    links.ts         single source of truth for all CTA URLs
    useReveal.ts     IntersectionObserver hook for scroll reveals
  components/
    Nav.tsx          sticky nav with logo + section links + Explorer CTA
    Hero.tsx         headline, sub, two primary CTAs
    Pitch.tsx        "what we're building" two-column
    Spokes.tsx       three capability cards (indexing / data / files)
    UseCases.tsx     three-column use-case grid
    Showcase.tsx     YieldNest partner spotlight + custom dashboard CTA
    GetInvolved.tsx  three CTAs: Builders / Community / Partners
    Footer.tsx       brand + links + socials
    Icons.tsx        small inline SVG icon set
public/
  willow-favicon.png
  willow-logo-full.png
```

## Design tokens

All colors, typography, spacing, and effects live as CSS custom properties at
the top of `src/styles.css`:

- **Accent** — `--accent: #2f7a5c` (willow green); soft `--accent-soft: #e8f1ec`
- **Surface** — light off-white `--bg: #fafaf7`; soft section `--surface-soft`; deep footer `--surface-deep`
- **Type** — Inter (UI) + Instrument Serif (display headlines)

Light mode only. Add a `[data-theme='dark']` block to `:root` if dark mode is
ever wanted.

## Editing copy & links

- **All outbound URLs** live in `src/lib/links.ts` — Calendly, Discord,
  Explorer, YieldNest, email subjects. Change in one place.
- **Section copy** lives inline in each component. Search by section name.

## Deploy

The output of `npm run build` is a fully static bundle in `dist/`. Two
recommended targets:

### Cloudflare Pages (recommended — DNS already lives there)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `npm run build` · Output directory: `dist`.
4. Add the `willow.tech` custom domain (DNS record auto-created).

### GitHub Pages

1. Push to GitHub.
2. Add a `.github/workflows/pages.yml` that runs `npm ci && npm run build` and
   uploads `dist/` via `actions/upload-pages-artifact` + `actions/deploy-pages`.
3. Settings → Pages → Source: GitHub Actions.
4. Configure custom domain.
