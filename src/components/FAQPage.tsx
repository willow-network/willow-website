import { useEffect, type ReactNode } from 'react';
import { FAQ } from '../faq/questions';

/** Tiny inline-markdown renderer for FAQ answers — supports paragraphs and
 *  [label](url) links. Anything else falls through as plain text. */
function renderAnswer(text: string): ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return text.split(/\n\n+/).map((para, pi) => {
    const out: ReactNode[] = [];
    let cursor = 0;
    let match: RegExpExecArray | null;
    linkRegex.lastIndex = 0;
    while ((match = linkRegex.exec(para)) !== null) {
      if (match.index > cursor) {
        out.push(para.slice(cursor, match.index));
      }
      const [, label, href] = match;
      const external = href.startsWith('http');
      out.push(
        <a
          key={`${pi}-${match.index}`}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          {label}
        </a>,
      );
      cursor = match.index + match[0].length;
    }
    if (cursor < para.length) {
      out.push(para.slice(cursor));
    }
    return <p key={pi}>{out}</p>;
  });
}

export default function FAQPage() {
  useEffect(() => {
    document.title = 'FAQ — Willow';
    return () => {
      document.title = 'Willow — Cryptographically verifiable data infrastructure';
    };
  }, []);

  return (
    <section className="section faq-section">
      <div className="container faq-container">
        <header className="faq-header">
          <span className="eyebrow">FAQ</span>
          <h1 className="faq-title">Common questions.</h1>
          <p className="faq-lead">
            What people ask us most. Don't see yours? Email{' '}
            <a href="mailto:info@willow.tech">info@willow.tech</a> or join the{' '}
            <a
              href="https://discord.gg/BrrA56x24f"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
            .
          </p>
        </header>

        <ul className="faq-list">
          {FAQ.map((item, i) => (
            <li key={i} className="faq-item">
              <details>
                <summary>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <div className="faq-a">{renderAnswer(item.a)}</div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
