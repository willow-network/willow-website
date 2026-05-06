import { Link } from 'react-router-dom';
import { formatDate, POSTS, readingTimeMinutes } from '../blog/posts';
import { ArrowRight } from './Icons';

export default function BlogIndex() {
  return (
    <section className="section blog-section">
      <div className="container blog-container">
        <header className="blog-header">
          <span className="eyebrow">Blog</span>
        </header>

        <ul className="post-list">
          {POSTS.map((post) => (
            <li key={post.slug} className="post-list-item">
              <Link to={`/blog/${post.slug}`} className="post-card">
                <div className="post-card-image">
                  <img
                    src={post.ogImage}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={630}
                  />
                </div>
                <div className="post-card-body">
                  <div className="post-card-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{readingTimeMinutes(post.content)} min read</span>
                  </div>
                  <h2 className="post-card-title">{post.title}</h2>
                  <p className="post-card-excerpt">{post.excerpt}</p>
                  <span className="post-card-cta">
                    Read post
                    <ArrowRight />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
