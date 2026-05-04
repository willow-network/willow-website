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
          <div className="showcase-visual" aria-hidden="true">
            <div className="showcase-mock">
              <div className="showcase-mock-bar">
                <span /><span /><span />
              </div>
              <div className="showcase-mock-row head">
                <span>VAULT</span>
                <span>TVL</span>
                <span>APY</span>
              </div>
              <div className="showcase-mock-row">
                <span>ynETH</span>
                <span>$184.2M</span>
                <span>3.42%</span>
              </div>
              <div className="showcase-mock-row">
                <span>ynLSDe</span>
                <span>$92.7M</span>
                <span>4.18%</span>
              </div>
              <div className="showcase-mock-row">
                <span>ynBNB</span>
                <span>$54.3M</span>
                <span>2.91%</span>
              </div>
              <div className="showcase-mock-chart" />
            </div>
            <span className="showcase-stamp">Willow verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
