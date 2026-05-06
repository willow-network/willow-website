import { type ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

const CODE = `import { WillowClient, verifyQueryResponse } from '@willow/sdk';

const client = new WillowClient({ apiUrl: 'https://api.willow.tech' });

// Query a subgrove with a Merkle proof attached
const result = await client.data.query('yieldnest-vaults', {
  filter: { vault: '0xa1b2...' },
  include_proof: true,
});

// Verify the proof locally — no trusted indexer in the path
const { valid } = await verifyQueryResponse(result);

console.log(valid ? result.data : 'proof failed');`;

const KEYWORDS = new Set([
  'import',
  'from',
  'const',
  'let',
  'await',
  'if',
  'else',
  'new',
  'return',
  'export',
  'function',
  'true',
  'false',
  'null',
  'undefined',
]);

/** Tiny TS-flavored highlighter. Tokenizes comments, strings, keywords, and
 *  PascalCase identifiers; everything else falls through as plain text. */
function highlight(code: string): ReactNode[] {
  const re =
    /(\/\/[^\n]*)|('[^'\n]*')|("[^"\n]*")|(\b[a-zA-Z_$][\w$]*\b)|([\s\S])/g;
  const out: ReactNode[] = [];
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(code)) !== null) {
    const [, comment, sq, dq, word, other] = m;
    if (comment) {
      out.push(
        <span key={key++} className="tok-c">
          {comment}
        </span>,
      );
    } else if (sq || dq) {
      out.push(
        <span key={key++} className="tok-s">
          {sq ?? dq}
        </span>,
      );
    } else if (word) {
      if (KEYWORDS.has(word)) {
        out.push(
          <span key={key++} className="tok-k">
            {word}
          </span>,
        );
      } else if (/^[A-Z]/.test(word)) {
        out.push(
          <span key={key++} className="tok-t">
            {word}
          </span>,
        );
      } else {
        out.push(word);
      }
    } else if (other) {
      out.push(other);
    }
  }
  return out;
}

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
              <code>{highlight(CODE)}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
