import { LINKS } from '../lib/links';
import { useReveal } from '../lib/useReveal';
import { ArrowRight, ArrowUpRight } from './Icons';

export default function Showcase() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section section--soft" id="showcase">
      <div className="container">
        <div className="showcase reveal" ref={ref}>
          <div className="showcase-text">
            <span className="eyebrow">In production</span>
            <h2>
              Live with our first partner, <em>YieldNest</em>.
            </h2>
            <p>
              <a
                href={LINKS.yieldnest}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--accent)',
                  borderBottom: '1px solid var(--accent)',
                }}
              >
                yieldnest.willow.tech
              </a>{' '}
              is a verified analytics dashboard for the YieldNest protocol —
              every chart, every TVL number, every vault stat is backed by
              indexed events you can audit yourself.
            </p>
            <p>
              Want a dashboard like this for your protocol or treasury? We
              partner with teams to spin up Willow-verified dashboards on
              your own subdomain — your data, our verification stack.
            </p>
            <div className="showcase-actions">
              <a
                href={LINKS.yieldnest}
                className="btn btn--primary"
                target="_blank"
                rel="noreferrer"
              >
                View YieldNest
                <ArrowUpRight />
              </a>
              <a
                href={LINKS.emailDashboard}
                className="btn btn--secondary"
              >
                Request a dashboard
                <ArrowRight />
              </a>
            </div>
          </div>
          <a
            href={LINKS.yieldnest}
            target="_blank"
            rel="noreferrer"
            className="showcase-visual"
            aria-label="Visit yieldnest.willow.tech"
          >
            <img
              src="/yieldnest-screenshot.jpg"
              alt="The YieldNest dashboard at yieldnest.willow.tech, showing live indexing stats, registered subgroves, and an entity-share donut chart — all backed by Willow proofs."
              loading="lazy"
              width={1440}
              height={900}
            />
            <span className="showcase-stamp">Willow verified</span>
          </a>
        </div>
      </div>
    </section>
  );
}
