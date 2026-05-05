import privacy from './privacy.md?raw';
import terms from './terms.md?raw';

export type LegalDoc = {
  slug: 'privacy' | 'terms';
  title: string;
  /** Plain-language label for the document's role. */
  kind: string;
  /** ISO date (YYYY-MM-DD). */
  effectiveDate: string;
  content: string;
};

export const LEGAL_DOCS: Record<LegalDoc['slug'], LegalDoc> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    kind: 'How we handle data on willow.tech.',
    effectiveDate: '2026-05-06',
    content: privacy,
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    kind: 'The rules for using willow.tech.',
    effectiveDate: '2026-05-06',
    content: terms,
  },
};

export function formatLegalDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
