/**
 * Post-build step: emit per-route static HTML files under dist/{path}/index.html
 * with route-specific OG / Twitter / title / description tags so social
 * crawlers (X, LinkedIn, Slack, Telegram, etc.) see the right card.
 *
 * Cloudflare Pages serves these static files in preference to the SPA
 * fallback. React Router then hydrates as normal.
 *
 * Sources of truth:
 *   - Blog post metadata: src/blog/posts.json
 *   - Static page metadata: STATIC_PAGES const below
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://willow.tech';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const posts = JSON.parse(
  readFileSync(resolve(ROOT, 'src/blog/posts.json'), 'utf8'),
);

// Non-blog routes that need their own OG cards. The landing page (/) keeps
// the defaults baked into index.html — only routes that should preview
// differently from the homepage go here.
const STATIC_PAGES = [
  {
    path: 'explained',
    title: 'Willow, in plain English — Willow',
    description:
      'What Willow does, no jargon. Every piece of data comes with a mathematical seal anyone can check — by you, your phone, or an AI agent.',
    sitemap: { changefreq: 'monthly', priority: '0.7' },
  },
  {
    path: 'blog',
    title: 'Blog — Willow',
    description:
      'Notes from the team building Willow — verifiable data infrastructure, on-chain indexing, and what comes next.',
    // Already in the sitemap explicitly below; no entry needed here.
  },
  {
    path: 'team',
    title: 'Team — Willow',
    description:
      'The people building Willow — researchers, distributed-systems engineers, and operators shipping verifiable data infrastructure.',
  },
  {
    path: 'faq',
    title: 'FAQ — Willow',
    description:
      "Common questions about Willow — what it does, how it works, who it's for.",
  },
];

// --- inject font preloads --------------------------------------------------
// @fontsource bundles a woff2 per (family, subset, weight, style). For English
// text the browser only fetches the "latin" subset, but it doesn't *know* it
// needs them until CSS is parsed. Preloading the critical files makes them
// fetch in parallel with HTML/CSS so they're available on first paint.
{
  const assetsDir = resolve(ROOT, 'dist/assets');
  const files = readdirSync(assetsDir);
  const find = (pattern) => {
    const match = files.find((f) => pattern.test(f));
    return match ? `/assets/${match}` : null;
  };
  const criticalFonts = [
    find(/^inter-latin-400-normal-.*\.woff2$/),
    find(/^inter-latin-600-normal-.*\.woff2$/),
    find(/^instrument-serif-latin-400-normal-.*\.woff2$/),
    find(/^instrument-serif-latin-400-italic-.*\.woff2$/),
  ].filter(Boolean);

  const preloadTags = criticalFonts
    .map(
      (href) =>
        `    <link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin="anonymous" />`,
    )
    .join('\n');

  const indexPath = resolve(ROOT, 'dist/index.html');
  let html = readFileSync(indexPath, 'utf8');
  if (!html.includes('rel="preload"') && preloadTags) {
    html = html.replace('</head>', `${preloadTags}\n  </head>`);
    writeFileSync(indexPath, html);
    console.log(`✓ injected ${criticalFonts.length} font preloads`);
  }
}

const indexHtml = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf8');

function escapeAttr(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    console.warn(`  WARN: tag not matched: ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

// Apply the full set of title / description / OG / Twitter tags. Used by
// every prerendered page so they all stay in sync — the only thing the old
// /blog block was missing (and the source of "blog has no custom OG card").
function applyMeta(html, { url, title, description, ogImage, type }) {
  const titleAttr = escapeAttr(title);
  const descAttr = escapeAttr(description);

  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${titleAttr}</title>`],
    [
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${descAttr}" />`,
    ],
    [
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${titleAttr}" />`,
    ],
    [
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${descAttr}" />`,
    ],
    [
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:type" content="${type}" />`,
    ],
    [
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${url}" />`,
    ],
    [
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${ogImage}" />`,
    ],
    [
      /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image:alt" content="${titleAttr}" />`,
    ],
    [
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${ogImage}" />`,
    ],
    [
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${titleAttr}" />`,
    ],
    [
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${descAttr}" />`,
    ],
    [
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:url" content="${url}" />`,
    ],
  ];

  for (const [pattern, replacement] of replacements) {
    html = replaceTag(html, pattern, replacement);
  }
  return html;
}

function renderPostHtml(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const fullTitle = `${post.title} — Willow`;
  const ogImage = `${SITE_URL}${post.ogImage}`;

  let html = applyMeta(indexHtml, {
    url,
    title: fullTitle,
    description: post.excerpt,
    ogImage,
    type: 'article',
  });

  // Inject article schema for richer search snippets
  const articleSchema = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    url,
    mainEntityOfPage: url,
  })}</script>`;
  html = html.replace('</head>', `    ${articleSchema}\n  </head>`);

  return html;
}

// --- prerender blog posts --------------------------------------------------

let postCount = 0;
for (const post of posts) {
  const dir = resolve(ROOT, 'dist/blog', post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), renderPostHtml(post));
  console.log(`  prerendered: blog/${post.slug}/index.html`);
  postCount++;
}

// --- prerender static pages ------------------------------------------------

for (const page of STATIC_PAGES) {
  const url = `${SITE_URL}/${page.path}`;
  const html = applyMeta(indexHtml, {
    url,
    title: page.title,
    description: page.description,
    ogImage: DEFAULT_OG_IMAGE,
    type: 'website',
  });
  const dir = resolve(ROOT, 'dist', page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html);
  console.log(`  prerendered: ${page.path}/index.html`);
}

console.log(
  `✓ prerender done (${postCount} post${postCount === 1 ? '' : 's'}, ${STATIC_PAGES.length} static pages)`,
);

// --- sitemap.xml -----------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: SITE_URL + '/', changefreq: 'monthly', priority: '1.0', lastmod: today },
  { loc: SITE_URL + '/explained', changefreq: 'monthly', priority: '0.7', lastmod: today },
  { loc: SITE_URL + '/blog', changefreq: 'weekly', priority: '0.8', lastmod: today },
  ...posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: p.date,
  })),
  { loc: SITE_URL + '/team', changefreq: 'monthly', priority: '0.6', lastmod: today },
  { loc: SITE_URL + '/faq', changefreq: 'monthly', priority: '0.6', lastmod: today },
  { loc: SITE_URL + '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: today },
  { loc: SITE_URL + '/terms', changefreq: 'yearly', priority: '0.3', lastmod: today },
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (u) =>
      `  <url>\n` +
      `    <loc>${u.loc}</loc>\n` +
      `    <lastmod>${u.lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`,
  ),
  '</urlset>',
].join('\n');

writeFileSync(resolve(ROOT, 'dist/sitemap.xml'), sitemap);
console.log(`✓ sitemap.xml (${urls.length} urls)`);
