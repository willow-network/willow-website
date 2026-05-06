import { useReveal } from '../lib/useReveal';

const CODE = `import { WillowClient, verifyQueryResponse } from '@willow/sdk';

const client = new WillowClient({
  apiUrl: 'https://api.willow.tech',
});

// Query a subgrove with a Merkle proof attached
const result = await client.data.query('yieldnest-vaults', {
  filter: { vault: '0xa1b2...' },
  include_proof: true,
});

// Verify the proof locally — no trusted indexer in the path
const { valid } = await verifyQueryResponse(result);

if (valid) {
  // Data is provably authentic; safe to use.
  console.log(result.data);
}`;

export default function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section section--soft" id="how-it-works">
      <div className="container">
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">Query, verify, ship.</h2>
        <p className="section-lead">
          Every Willow query returns the data plus a cryptographic proof
          anchored to the chain's consensus state root. Your client verifies
          it locally — no trusted indexer in the path.
        </p>

        <div className="how-grid reveal" ref={ref}>
          <ol className="how-steps">
            <li className="how-step">
              <span className="how-step-num">01</span>
              <div>
                <h3>Query</h3>
                <p>
                  Call the SDK with a subgrove ID and filter. Same shape as
                  a normal database query.
                </p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-step-num">02</span>
              <div>
                <h3>Receive</h3>
                <p>
                  Willow returns the matching rows plus a Merkle proof
                  anchored to the on-chain state root.
                </p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-step-num">03</span>
              <div>
                <h3>Verify</h3>
                <p>
                  Your client checks the math locally. If anything's off,
                  the proof fails. Otherwise the data is provably authentic.
                </p>
              </div>
            </li>
          </ol>

          <div className="how-code">
            <div className="how-code-bar">
              <span className="how-code-dot" />
              <span className="how-code-dot" />
              <span className="how-code-dot" />
              <span className="how-code-lang">TypeScript</span>
            </div>
            <pre className="how-code-block">
              <code>{CODE}</code>
            </pre>
          </div>
        </div>

        <p className="how-footnote">
          Underneath: GroveDB Merkle proofs · CometBFT consensus root ·
          validator-signed state commits. Same primitives, six SDKs
          (TypeScript · Python · Rust · Go · Swift · React Hooks).
        </p>
      </div>
    </section>
  );
}
