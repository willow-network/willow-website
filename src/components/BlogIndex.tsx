import { Link } from 'react-router-dom';
import { formatDate, POSTS, readingTimeMinutes } from '../blog/posts';
import { ArrowRight } from './Icons';

export default function BlogIndex() {
  return (
    <section className="section blog-section">
      <div className="container blog-container">
        <header className="blog-header">
          <span className="eyebrow">Blog</span>
          <h1 className="blog-title">Notes from the Willow team.</h1>
          <p className="blog-lead">
            Thinking out loud about verifiable data, indexing, and what we're
            building. Updated whenever we have something worth saying.
          </p>
        </header>

        <ul className="post-list">
          {POSTS.map((post) => (
            <li key={post.slug} className="post-list-item">
              <Link to={`/blog/${post.slug}`} className="post-list-link">
                <div className="post-list-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{readingTimeMinutes(post.content)} min read</span>
                </div>
                <h2 className="post-list-heading">{post.title}</h2>
                {post.subtitle && (
                  <p className="post-list-subtitle">{post.subtitle}</p>
                )}
                <p className="post-list-excerpt">{post.excerpt}</p>
                <span className="post-list-cta">
                  Read post
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
