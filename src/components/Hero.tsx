import { LINKS } from '../lib/links';
import { ArrowRight, ArrowUpRight } from './Icons';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="hero-badge">
          <span className="dot" aria-hidden="true" />
          Pre-seed open · Seed round opening soon
        </span>
        <h1>
          Data you can <em>prove</em>.
        </h1>
        <p className="hero-sub">
          Index any chain. Store any record. Serve any file. Every step
          backed by a cryptographic proof.
        </p>
        <div className="hero-ctas">
          <a
            href={LINKS.explorer}
            className="btn btn--primary"
            target="_blank"
            rel="noreferrer"
          >
            Try the Explorer
            <ArrowUpRight />
          </a>
          <a href="#get-involved" className="btn btn--secondary">
            Talk to us
            <ArrowRight />
          </a>
        </div>
        <div className="hero-meta" aria-hidden="true">
          <span>Hub-and-spoke architecture</span>
          <span>Proofs at every step</span>
          <span>Live on devnet</span>
        </div>
      </div>
    </section>
  );
}
