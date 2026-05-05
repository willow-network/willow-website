/**
 * Post-build step: emit a per-post static HTML file under dist/blog/{slug}/
 * with post-specific OG tags so social crawlers (X, LinkedIn, Slack, etc.)
 * see the right card. Cloudflare Pages serves these static files in
 * preference to the SPA fallback. React Router then hydrates as normal.
 *
 * Source of truth for post metadata: src/blog/posts.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://willow.tech';

const posts = JSON.parse(
  readFileSync(resolve(ROOT, 'src/blog/posts.json'), 'utf8'),
);
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

function renderPostHtml(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const fullTitle = `${post.title} — Willow`;
  const description = escapeAttr(post.excerpt);
  const titleAttr = escapeAttr(fullTitle);
  const ogImage = `${SITE_URL}${post.ogImage}`;

  let html = indexHtml;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${titleAttr}</title>`);
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${titleAttr}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="article" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${ogImage}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:alt" content="${titleAttr}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );

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

let count = 0;
for (const post of posts) {
  const dir = resolve(ROOT, 'dist/blog', post.slug);
  mkdirSync(dir, { recursive: true });
  const html = renderPostHtml(post);
  writeFileSync(resolve(dir, 'index.html'), html);
  console.log(`  prerendered: blog/${post.slug}/index.html`);
  count++;
}

// Also generate a static dist/blog/index.html so the listing page has a real
// HTML file (otherwise it'd only be reachable via SPA fallback).
const blogIndexDir = resolve(ROOT, 'dist/blog');
mkdirSync(blogIndexDir, { recursive: true });
let blogIndexHtml = indexHtml;
blogIndexHtml = blogIndexHtml.replace(
  /<title>[^<]*<\/title>/,
  '<title>Blog — Willow</title>',
);
blogIndexHtml = blogIndexHtml.replace(
  /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
  '<meta property="og:title" content="Blog — Willow" />',
);
blogIndexHtml = blogIndexHtml.replace(
  /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
  `<meta property="og:url" content="${SITE_URL}/blog" />`,
);
writeFileSync(resolve(blogIndexDir, 'index.html'), blogIndexHtml);
console.log(`  prerendered: blog/index.html`);

console.log(`✓ prerender done (${count} post${count === 1 ? '' : 's'})`);
