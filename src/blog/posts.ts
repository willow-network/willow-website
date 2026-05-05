import manifest from './posts.json';
import introducingWillow from './posts/introducing-willow.md?raw';

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  excerpt: string;
  ogImage: string;
  content: string;
};

const CONTENT: Record<string, string> = {
  'introducing-willow': introducingWillow,
};

export const POSTS: Post[] = manifest.map((p) => ({
  ...p,
  content: CONTENT[p.slug] ?? '',
}));

export const POST_BY_SLUG = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
) as Record<string, Post>;

const WORDS_PER_MIN = 230;

export function readingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
