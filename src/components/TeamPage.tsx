import { useEffect } from 'react';
import { initials, TEAM } from '../team/members';

export default function TeamPage() {
  useEffect(() => {
    document.title = 'Team — Willow';
    return () => {
      document.title = 'Willow — Cryptographically verifiable data infrastructure';
    };
  }, []);

  return (
    <section className="section team-section">
      <div className="container team-container">
        <header className="team-header">
          <span className="eyebrow">Team</span>
          <h1 className="team-title">The team building Willow.</h1>
          <p className="team-lead">
            Researchers, distributed-systems engineers, and operators
            shipping verifiable data infrastructure for what comes next.
          </p>
        </header>

        <ul className="team-list">
          {TEAM.map((m) => (
            <li className="team-card" key={m.slug}>
              <div className="team-photo">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} loading="lazy" />
                ) : (
                  <span className="team-photo-initials" aria-hidden="true">
                    {initials(m.name)}
                  </span>
                )}
              </div>
              <div className="team-meta">
                <h2 className="team-name">{m.name}</h2>
                <p className="team-role">{m.title}</p>
                <p className="team-bio">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
