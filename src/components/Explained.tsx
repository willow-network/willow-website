import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../lib/links';
import { ArrowRight, ArrowUpRight } from './Icons';
import { useReveal } from '../lib/useReveal';

export default function Explained() {
  useEffect(() => {
    document.title = 'Willow, in plain English';
    return () => {
      document.title =
        'Willow — Cryptographically verifiable data infrastructure';
    };
  }, []);

  const headRef = useReveal<HTMLDivElement>();
  const analogyRef = useReveal<HTMLDivElement>();
  const thingsRef = useReveal<HTMLUListElement>();
  const matterRef = useReveal<HTMLUListElement>();

  return (
    <article className="explain">
      <section className="section explain-hero">
        <div className="container explain-container">
          <div className="reveal" ref={headRef}>
            <span className="eyebrow">In plain English</span>
            <h1 className="explain-title">
              Willow, in <em>plain English</em>.
            </h1>
            <p className="explain-lead">
              A friends-and-family explainer. No jargon. Promise.
            </p>
          </div>
        </div>
      </section>

      <section className="section explain-section">
        <div className="container explain-container">
          <h2 className="explain-h2">The problem.</h2>
          <p className="explain-p">
            When you open your bank's app, a stock app, a fitness tracker —
            the data on your screen comes from somewhere. A company runs a
            database. Software or an employee put numbers into it. You have
            no way to know if those numbers are real, or if they were the
            same yesterday, or if anyone has touched them in between.
          </p>
          <p className="explain-p">
            For most things, that's fine. You trust the company. But
            sometimes the stakes are higher — an audit, a financial record,
            an AI agent acting on your behalf, something someone might
            want to dispute years from now. In those cases, "trust the
            company" isn't enough.
          </p>
        </div>
      </section>

      <section className="section section--soft explain-section">
        <div className="container explain-container">
          <div className="reveal" ref={analogyRef}>
            <span className="eyebrow">The idea</span>
            <h2 className="explain-h2">A seal you can check.</h2>
            <p className="explain-p">
              Picture the foil seal under the cap of an aspirin bottle. The
              seal doesn't make the medicine inside any safer — but if it's
              broken when you open it, you know something happened that
              shouldn't have.
            </p>
            <p className="explain-p">
              <strong>Willow puts a similar seal on data.</strong> Every
              piece of data Willow gives you comes with a tiny mathematical
              seal attached. Anyone can check the seal — your phone, a
              friend, an AI agent — and the math will tell them, with
              certainty, whether anything has changed since the data left
              the source.
            </p>
            <p className="explain-p">
              If the seal is intact, the data is genuine. If it's broken,
              you know not to trust it. No person or company in the middle
              whose word you have to take.
            </p>
          </div>
        </div>
      </section>

      <section className="section explain-section">
        <div className="container explain-container">
          <h2 className="explain-h2">What Willow actually does.</h2>
          <p className="explain-p explain-p--lead">
            Three things. All three come with the seal.
          </p>
          <ul className="explain-things reveal" ref={thingsRef}>
            <li className="explain-thing">
              <span className="explain-thing-num">01</span>
              <div>
                <h3>It watches blockchains.</h3>
                <p>
                  Blockchains are the public record-books behind crypto —
                  Bitcoin, Ethereum, and others. Willow reads what happens
                  on them and turns it into something apps can use, with a
                  seal proving every line came from the real chain.
                </p>
              </div>
            </li>
            <li className="explain-thing">
              <span className="explain-thing-num">02</span>
              <div>
                <h3>It stores records.</h3>
                <p>
                  Like rows in a spreadsheet — a list of customers, scores,
                  sensor readings, anything. Stored with the seal, so
                  anyone reading them later can prove they haven't been
                  edited or fabricated.
                </p>
              </div>
            </li>
            <li className="explain-thing">
              <span className="explain-thing-num">03</span>
              <div>
                <h3>It stores files.</h3>
                <p>
                  Photos, PDFs, videos. Same idea: every file comes with a
                  seal proving it's the same file that was uploaded, byte
                  for byte.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--soft explain-section">
        <div className="container explain-container">
          <h2 className="explain-h2">Why it matters now.</h2>
          <ul className="explain-matters reveal" ref={matterRef}>
            <li>
              <h3>AI agents.</h3>
              <p>
                When an AI agent makes a decision based on data — a price,
                a balance, a record of what someone said — there should be
                a way to check it didn't get fooled. Willow gives the agent
                a seal it can verify before it acts.
              </p>
            </li>
            <li>
              <h3>Deepfakes and AI-generated content.</h3>
              <p>
                As fakes get cheaper, "where did this come from, and has it
                been changed?" becomes a question we'll all need to answer.
              </p>
            </li>
            <li>
              <h3>Audits and compliance.</h3>
              <p>
                Today auditors ask for data and trust the company to give
                them the right data. Sealed data can be checked years
                later, by anyone, without needing the company to vouch for
                it.
              </p>
            </li>
            <li>
              <h3>Journalism and evidence.</h3>
              <p>
                A photo, a document, a record of a transaction — sealed at
                the moment of capture, provably unchanged ever after.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section explain-section">
        <div className="container explain-container">
          <h2 className="explain-h2">That's the whole pitch.</h2>
          <p className="explain-p">
            If you want the technical version, the rest of the site is
            written for developers. The{' '}
            <Link to="/" className="explain-inline-link">
              homepage
            </Link>{' '}
            covers the architecture, and the{' '}
            <a
              href={LINKS.explorer}
              target="_blank"
              rel="noreferrer"
              className="explain-inline-link"
            >
              explorer
            </a>{' '}
            lets you watch real proofs being checked in your browser.
          </p>
          <div className="explain-cta-row">
            <Link to="/" className="btn btn--secondary">
              Back to the homepage
              <ArrowRight />
            </Link>
            <a
              href={LINKS.explorer}
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              Try the Explorer
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
