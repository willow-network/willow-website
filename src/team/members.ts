export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  /** Path under /public — set to null while we use placeholder initials. */
  photo: string | null;
};

export const TEAM: TeamMember[] = [
  {
    slug: 'paul-delucia',
    name: 'Paul DeLucia',
    title: 'Founder & CEO',
    bio: 'Lead researcher on the cryptographic database powering Willow. Core contributor to Dash blockchain.',
    photo: null,
  },
  {
    slug: 'eric-gleeson',
    name: 'Eric Gleeson',
    title: 'Co-Founder & COO',
    bio: '10+ years in operations with direct relationships to institutional finance leaders. Driving GTM and partnerships.',
    photo: null,
  },
  {
    slug: 'wisdom-ogwu',
    name: 'Wisdom Ogwu',
    title: 'Founding Engineer',
    bio: 'Lead developer on the cryptographic database powering Willow. ZK expert, previously Scroll.',
    photo: null,
  },
  {
    slug: 'pavel-burylichev',
    name: 'Pavel Burylichev',
    title: 'Founding Engineer',
    bio: 'Former contributor to The Graph. Senior distributed systems architect.',
    photo: null,
  },
  {
    slug: 'kevin-obrien',
    name: "Kevin O'Brien",
    title: 'Founding Investor & Accelerator',
    bio: 'Founder, Verdicti Ventures (Venture Accelerator). Venture partner at RockTree Capital.',
    photo: null,
  },
];

/** Returns "PD" from "Paul DeLucia". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}
