import { useEffect, useState, type MouseEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LINKS } from '../lib/links';
import { ArrowUpRight } from './Icons';
import Logo from './Logo';

const SECTION_IDS = [
  'what',
  'pillars',
  'how-it-works',
  'showcase',
  'get-involved',
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is currently visible (only on the home page).
  // The rootMargin shrinks the trigger zone to roughly the upper-middle of
  // the viewport so a section becomes "active" when its top crosses there,
  // not the moment any pixel enters the screen.
  useEffect(() => {
    if (!onHome) {
      setActiveSection(null);
      return;
    }

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        // Pick the section whose top is closest to the trigger zone top.
        const sorted = [...intersecting].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        setActiveSection(sorted[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  // Section anchors live on the home page; from any other route, prefix with /
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const sectionClass = (id: string) =>
    `nav-link nav-link--section${
      onHome && activeSection === id ? ' is-active' : ''
    }`;

  // When already on the home page, the brand link doesn't change the route,
  // so the ScrollManager doesn't fire — handle the scroll-to-top manually.
  // Also clear any leftover hash (e.g. /#pillars) so the URL bar is clean.
  // Using history.replaceState rather than navigate() avoids racing with
  // ScrollManager, which would otherwise instant-scroll on its own.
  const handleBrandClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onHome) {
      e.preventDefault();
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(null);
    }
  };

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link
          to="/"
          className="nav-brand"
          aria-label="Willow home"
          onClick={handleBrandClick}
        >
          <Logo size={28} />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <a href={sectionHref('what')} className={sectionClass('what')}>What it is</a>
          <a href={sectionHref('pillars')} className={sectionClass('pillars')}>Capabilities</a>
          <a href={sectionHref('how-it-works')} className={sectionClass('how-it-works')}>How it works</a>
          <a href={sectionHref('showcase')} className={sectionClass('showcase')}>Showcase</a>
          <a href={sectionHref('get-involved')} className={sectionClass('get-involved')}>Get involved</a>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `nav-link${isActive ? ' is-active' : ''}`
            }
          >
            Blog
          </NavLink>
          <a
            href={LINKS.explorer}
            className="btn btn--primary nav-cta"
            target="_blank"
            rel="noreferrer"
          >
            Try the Explorer
            <ArrowUpRight />
          </a>
        </nav>
      </div>
    </header>
  );
}
