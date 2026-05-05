import { useState, type FormEvent } from 'react';
import { ArrowRight } from './Icons';

// HubSpot Forms API — submits directly so we control the styling.
// Same data lands in the same HubSpot form record as the iframe embed would.
const PORTAL_ID = '243766609';
const FORM_ID = '1b8ba7ae-eeb1-4d67-88be-eb8ac8da9c05';
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterCta() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [{ objectTypeId: '0-1', name: 'email', value }],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        return;
      }

      const data = await res.json().catch(() => null);
      const msg =
        data?.errors?.[0]?.message ||
        data?.message ||
        'Something went wrong. Try again in a moment.';
      setErrorMsg(msg);
      setStatus('error');
    } catch {
      setErrorMsg('Network error. Try again in a moment.');
      setStatus('error');
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-text">
          <span className="eyebrow">Stay in the loop</span>
          <h2 className="newsletter-title">
            Get updates from the Willow team.
          </h2>
          <p className="newsletter-lead">
            New features, partner launches, and posts from the team. No spam,
            unsubscribe any time.
          </p>
        </div>

        <div className="newsletter-form-wrap">
          {status === 'success' ? (
            <div className="newsletter-success" role="status">
              You're in. Look out for updates from the team.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <div className="newsletter-row">
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="you@yourdomain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status === 'loading' || !email.trim()}
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  <ArrowRight />
                </button>
              </div>
              {status === 'error' && (
                <p className="newsletter-error" role="alert">
                  {errorMsg}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
