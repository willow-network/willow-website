import { useReveal } from '../lib/useReveal';

export default function Pitch() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="what">
      <div className="container">
        <div className="pitch-grid reveal" ref={ref}>
          <div>
            <span className="eyebrow">What we're building</span>
            <h2 className="pitch-headline">
              Every byte comes with{' '}
              <em>a proof</em>.
            </h2>
          </div>
          <div className="pitch-body">
            <p>
              Modern apps, audits, and AI agents all rely on data they can't
              independently verify. Indexers act as trusted middlemen,
              off-chain databases drift from the chains they describe, and
              files served from a CDN tell you nothing about provenance.
            </p>
            <p>
              <strong>Willow makes verification first-class.</strong> One
              hub-and-spoke protocol ships with native blockchain indexing,
              structured-data storage, and file storage — and every read
              returns a cryptographic proof that travels with the data.
            </p>
            <p>
              No trusted indexer. No invisible transformations. Just data,
              with the receipts to back it up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
