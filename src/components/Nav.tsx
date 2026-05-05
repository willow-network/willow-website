import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LINKS } from '../lib/links';
import { ArrowUpRight } from './Icons';
import Logo from './Logo';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section anchors live on the home page; from any other route, prefix with /
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // When already on the home page, the brand link doesn't change the route,
  // so the ScrollManager doesn't fire — handle the scroll-to-top manually.
  const handleBrandClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <a href={sectionHref('what')} className="nav-link">What it is</a>
          <a href={sectionHref('pillars')} className="nav-link">Capabilities</a>
          <a href={sectionHref('showcase')} className="nav-link">Showcase</a>
          <a href={sectionHref('get-involved')} className="nav-link">Get involved</a>
          <Link to="/blog" className="nav-link">Blog</Link>
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
