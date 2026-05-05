import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Nav from './components/Nav';
import NewsletterCta from './components/NewsletterCta';
import NotFound from './components/NotFound';

// Lazy-load blog and legal routes — keeps react-markdown out of the homepage bundle.
const BlogIndex = lazy(() => import('./components/BlogIndex'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const LegalPage = lazy(() => import('./components/LegalPage'));

/** Scrolls to top on route change, or to the hash anchor if one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Nav />
      <main>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<LegalPage slug="privacy" />} />
            <Route path="/terms" element={<LegalPage slug="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <NewsletterCta />
      <Footer />
    </BrowserRouter>
  );
}
