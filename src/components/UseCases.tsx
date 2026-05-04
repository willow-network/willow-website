import { useReveal } from '../lib/useReveal';

const CASES = [
  {
    label: '01 / DeFi & on-chain analytics',
    title: 'Audit data without trusting the dashboard.',
    body: 'Stop copying numbers from a black-box indexer. Every chart, every aggregate, every TVL figure can ship with the proof of the events it was computed from.',
  },
  {
    label: '02 / Compliance & enterprise',
    title: 'Logs that can’t be rewritten.',
    body: 'Long-horizon retention with cryptographic provenance. Build audit trails regulators can verify and counterparties can rely on, without re-running the pipeline.',
  },
  {
    label: '03 / AI agents',
    title: 'Memory and tools agents can prove.',
    body: 'Agents working with money, identity, or compliance need data they can stand behind. Willow gives them verified state, signed records, and content-addressed files out of the box.',
  },
] as const;

export default function UseCases() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="use-cases">
      <div className="container">
        <span className="eyebrow">Where it matters</span>
        <h2 className="section-title">
          Built for data that needs to hold up.
        </h2>
        <p className="section-lead">
          DeFi, compliance, AI — anywhere a wrong number, a missing record, or
          a mutated file is a real problem.
        </p>
        <div className="usecases reveal" ref={ref}>
          {CASES.map(({ label, title, body }) => (
            <div className="usecase" key={label}>
              <span className="usecase-label">{label}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
