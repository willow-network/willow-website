export type FAQItem = {
  q: string;
  /** Markdown-ish: paragraphs separated by blank lines. Inline links written
   *  as [text](url) get rendered as anchors. Keep it simple — no headings or
   *  lists in answers. */
  a: string;
};

export const FAQ: FAQItem[] = [
  {
    q: 'What is Willow?',
    a: "Willow is verifiable data infrastructure. It indexes blockchain data, stores structured records, and serves files — and every query returns a cryptographic proof you can verify yourself, so you don't have to trust the operator.",
  },
  {
    q: 'How is Willow different from The Graph or Dune?',
    a: "The Graph is decentralized indexing without integrated proofs — you still have to trust whichever indexer is serving your data. Dune is centralized analytics with no verification layer at all. Willow ships with cryptographic proofs as a first-class feature, on a single protocol that also covers structured data storage and file storage.",
  },
  {
    q: 'What does "verifiable" actually mean?',
    a: 'Every query returns the data plus a Merkle proof linking it back to a state root committed on-chain. Your client — browser, Lambda, or enclave — checks the math. If anyone tampers with the data anywhere along the path, the proof fails. You do not have to trust the indexer, the database operator, or anyone else in between.',
  },
  {
    q: "What's a subgrove?",
    a: 'A subgrove is your namespaced scope on the Willow network. You register one, configure what to index or store, and fund it for indexer or storage time. Think of it like a project or schema in a database — except the data lives on a verifiable network and queries come with proofs.',
  },
  {
    q: 'What chains do you support?',
    a: 'Currently Ethereum and major EVM L2s. The architecture is chain-agnostic; new chains get added based on partner demand. If you need a specific chain, [tell us](mailto:info@willow.tech).',
  },
  {
    q: 'How much does it cost?',
    a: 'Free during devnet, except for subgrove deployment which is pay-per-use. Custom dashboards and partnerships are priced per engagement. Mainnet pricing will be announced ahead of launch; early customers will be grandfathered in.',
  },
  {
    q: 'Can my data stay private?',
    a: 'Yes. Private subgroves keep your data on your infrastructure and only commit state-root hashes to the public chain. Data is encrypted at rest with XChaCha20-Poly1305, with explicit grant, revoke, and rotate operations for keys you share with collaborators.',
  },
  {
    q: 'Is Willow open source?',
    a: 'The SDKs are open source — TypeScript, Python, Rust, Go, Swift, and React Hooks. The core protocol is currently closed during the managed-service phase; the roadmap moves toward open source as the network decentralizes.',
  },
  {
    q: 'When is mainnet?',
    a: 'Currently on devnet. Mainnet timeline depends on partner readiness, audits, and a few protocol features still in flight. Subscribe to the newsletter or join the Discord for updates.',
  },
  {
    q: 'How do I get started?',
    a: 'Open the [Explorer](https://explorer.willow.tech), register a subgrove, and point it at a contract you care about. SDKs are available in six languages plus a LangChain integration. If you want help wiring it into something specific, [request a call](https://tally.so/r/Me8BqM).',
  },
];
