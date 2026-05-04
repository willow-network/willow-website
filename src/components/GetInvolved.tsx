import { LINKS } from '../lib/links';
import { useReveal } from '../lib/useReveal';
import { ArrowRight, ArrowUpRight } from './Icons';

export default function GetInvolved() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="get-involved">
      <div className="container">
        <span className="eyebrow">Get involved</span>
        <h2 className="section-title">
          Build with us, talk to us, or back us.
        </h2>
        <p className="section-lead">
          Willow is in active development with a live devnet, a working
          explorer, and a growing community. Pick the door that fits.
        </p>
        <div className="pillars reveal" ref={ref}>
          <article className="pillar is-primary">
            <span className="pillar-tag">Builders</span>
            <h3>Try the Explorer</h3>
            <p>
              Spin up a subgrove on devnet, point our indexers at any chain
              or contract, and verify the proofs in your browser. Pay-per-
              subgrove during devnet — everything else is free.
            </p>
            <a href={LINKS.explorer} target="_blank" rel="noreferrer">
              Open the Explorer
              <ArrowUpRight />
            </a>
          </article>

          <article className="pillar">
            <span className="pillar-tag">Community</span>
            <h3>Join the Discord</h3>
            <p>
              Early users, contributors, and partners hang out in our
              Discord. Ask questions, share what you're building, and get
              direct access to the team.
            </p>
            <a href={LINKS.discord} target="_blank" rel="noreferrer">
              Join Discord
              <ArrowUpRight />
            </a>
          </article>

          <article className="pillar">
            <span className="pillar-tag">Investors & Partners</span>
            <h3>Book a call</h3>
            <p>
              Closing pre-seed and opening seed shortly. We're also actively
              partnering with protocols that want verified dashboards or
              custom indexing on Willow.
            </p>
            <a href={LINKS.calendly} target="_blank" rel="noreferrer">
              Book a call
              <ArrowUpRight />
            </a>
            <a
              href={LINKS.emailHref}
              style={{
                marginTop: '0.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
              }}
            >
              or email {LINKS.email}
              <ArrowRight />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
