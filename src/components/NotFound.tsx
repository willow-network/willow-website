import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not found — Willow';
    return () => {
      document.title = 'Willow — Verifiable data infrastructure';
    };
  }, []);

  return (
    <section className="section notfound-section">
      <div className="container notfound-container">
        <span className="eyebrow">404</span>
        <h1 className="notfound-title">
          That page isn't <em>here</em>.
        </h1>
        <p className="notfound-lead">
          The URL you tried doesn't match anything on the site. It might have
          moved, or it might never have existed.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn--primary">
            Back to home
            <ArrowRight />
          </Link>
          <Link to="/blog" className="btn btn--secondary">
            Read the blog
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
