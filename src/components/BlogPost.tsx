import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  formatDate,
  POST_BY_SLUG,
  readingTimeMinutes,
} from '../blog/posts';
import { LINKS } from '../lib/links';
import { ArrowLeft, ArrowUpRight } from './Icons';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = POST_BY_SLUG[slug];

  useEffect(() => {
    if (!post) return;
    const fullTitle = `${post.title} — Willow`;
    const url = `https://willow.tech/blog/${post.slug}`;
    const ogImage = `https://willow.tech${post.ogImage}`;

    document.title = fullTitle;
    setMeta('name', 'description', post.excerpt);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', post.excerpt);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', 'article');
    setMeta('name', 'twitter:image', ogImage);

    return () => {
      document.title = 'Willow — Verifiable data infrastructure';
      setMeta(
        'name',
        'description',
        'Willow indexes blockchain data, stores structured records, and serves files — every step backed by a cryptographic proof.',
      );
      setMeta('property', 'og:title', 'Willow — Verifiable data infrastructure');
      setMeta(
        'property',
        'og:description',
        'Index any chain, store any record, serve any file — with a cryptographic proof at every step.',
      );
      setMeta('property', 'og:url', 'https://willow.tech');
      setMeta('property', 'og:image', 'https://willow.tech/og-image.png');
      setMeta('property', 'og:type', 'website');
      setMeta('name', 'twitter:image', 'https://willow.tech/og-image.png');
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="section blog-section">
      <div className="container blog-container">
        <Link to="/blog" className="post-back">
          <ArrowLeft />
          All posts
        </Link>

        <header className="post-header">
          <div className="post-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTimeMinutes(post.content)} min read</span>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          {post.subtitle && (
            <p className="post-subtitle">{post.subtitle}</p>
          )}
        </header>

        <div className="post-body">
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
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="post-footer">
          <div>
            <h3>Build on Willow.</h3>
            <p>
              Spin up a subgrove on devnet, or come talk to us about a
              partnership.
            </p>
          </div>
          <div className="post-footer-actions">
            <a
              href={LINKS.explorer}
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              Try the Explorer
              <ArrowUpRight />
            </a>
            <a href={LINKS.requestCall} className="btn btn--secondary" target="_blank" rel="noreferrer">
              Request a call
              <ArrowUpRight />
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
}
