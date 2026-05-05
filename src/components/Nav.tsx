import { useEffect, useState } from 'react';
import { LINKS } from '../lib/links';
import { ArrowUpRight } from './Icons';
import Logo from './Logo';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-brand" aria-label="Willow home">
          <Logo size={28} />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#what" className="nav-link">What it is</a>
          <a href="#pillars" className="nav-link">Capabilities</a>
          <a href="#showcase" className="nav-link">Showcase</a>
          <a href="#get-involved" className="nav-link">Get involved</a>
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
