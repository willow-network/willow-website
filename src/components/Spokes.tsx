import { useReveal } from '../lib/useReveal';
import { IconIndex, IconRecords, IconFile } from './Icons';

const SPOKES = [
  {
    icon: IconIndex,
    title: 'Verifiable indexing',
    body: 'Index any chain. Every query returns a proof you can verify in the browser, in a Lambda, or inside an enclave.',
    tags: ['Ethereum', 'EVM L2s', 'Custom sources'],
  },
  {
    icon: IconRecords,
    title: 'Structured data',
    body: 'Store SQL-shaped records under your own subgrove. Schemas, queries, and updates are all signed by the chain.',
    tags: ['Schemas', 'Range queries', 'Merkle proofs'],
  },
  {
    icon: IconFile,
    title: 'File storage',
    body: 'Upload anything — chunked, content-addressed, Merkle-verified on download. Storage nodes stake and prove availability.',
    tags: ['Chunked', 'Encryption', 'Availability proofs'],
  },
] as const;

export default function Spokes() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section section--soft" id="pillars">
      <div className="container">
        <span className="eyebrow">Three first-class spokes</span>
        <h2 className="section-title">
          One protocol, every kind of data — all provable.
        </h2>
        <p className="section-lead">
          Storage and verification aren't bolt-on services. They're built into
          the protocol, exposed through one set of SDKs, and addressable from
          any client that can verify a proof.
        </p>
        <div className="cards-3 reveal" ref={ref}>
          {SPOKES.map(({ icon: Icon, title, body, tags }) => (
            <article className="card" key={title}>
              <span className="card-icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="card-tags">
                {tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
