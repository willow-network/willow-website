import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { formatLegalDate, LEGAL_DOCS, type LegalDoc } from '../legal/pages';

type Props = {
  slug: LegalDoc['slug'];
};

export default function LegalPage({ slug }: Props) {
  const doc = LEGAL_DOCS[slug];

  useEffect(() => {
    if (!doc) return;
    const fullTitle = `${doc.title} — Willow`;
    document.title = fullTitle;
    return () => {
      document.title = 'Willow — Cryptographically verifiable data infrastructure';
    };
  }, [doc]);

  if (!doc) return <Navigate to="/" replace />;

  return (
    <article className="section legal-section">
      <div className="container legal-container">
        <span className="eyebrow">Legal</span>
        <h1 className="legal-title">{doc.title}</h1>
        <p className="legal-kind">{doc.kind}</p>
        <p className="legal-meta">
          Effective {formatLegalDate(doc.effectiveDate)}
        </p>

        <div className="legal-body">
          <ReactMarkdown
            components={{
              a: ({ href, children, ...rest }) => {
                const external = href?.startsWith('http');
                return (
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    {...rest}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
