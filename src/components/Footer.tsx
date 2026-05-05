import { LINKS } from '../lib/links';
import { IconDiscord, IconGithub, IconX } from './Icons';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo size={28} variant="light" />
            <p>
              Verifiable data infrastructure. Indexing, structured records,
              and file storage — every step backed by a cryptographic proof.
            </p>
            <div className="footer-socials">
              <a
                href={LINKS.discord}
                target="_blank"
                rel="noreferrer"
                aria-label="Willow on Discord"
              >
                <IconDiscord />
              </a>
              <a
                href={LINKS.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Willow on X"
              >
                <IconX />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Willow on GitHub"
              >
                <IconGithub />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li>
                <a href={LINKS.explorer} target="_blank" rel="noreferrer">
                  Explorer
                </a>
              </li>
              <li>
                <a href={LINKS.yieldnest} target="_blank" rel="noreferrer">
                  YieldNest demo
                </a>
              </li>
              <li>
                <a href={LINKS.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href={LINKS.calendly} target="_blank" rel="noreferrer">
                  Investors
                </a>
              </li>
              <li>
                <a href={LINKS.emailPartners}>Partners</a>
              </li>
              <li>
                <a href={LINKS.emailHref}>{LINKS.email}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href={LINKS.discord} target="_blank" rel="noreferrer">
                  Discord
                </a>
              </li>
              <li>
                <a href={LINKS.twitter} target="_blank" rel="noreferrer">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href={LINKS.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Willow. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
            Verifiable by design.
          </span>
        </div>
      </div>
    </footer>
  );
}
