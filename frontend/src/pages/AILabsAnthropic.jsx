import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Claude Model Family',       level: 2 },
  { id: 's2', title: 'Design Philosophy',          level: 2 },
  { id: 's3', title: 'Constitutional AI',          level: 2 },
  { id: 's4', title: 'Claude Code & Tooling',      level: 2 },
  { id: 's5', title: 'Model Context Protocol',     level: 2 },
  { id: 's6', title: 'API Features',               level: 2 },
];

const CLAUDE_MODELS = [
  {
    name: 'Claude Opus',
    tag: 'Most capable',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    dot: 'bg-amber-500',
    desc: 'Anthropic\'s most intelligent model. Best for complex reasoning, nuanced writing, research synthesis, and multi-step agentic tasks. Highest quality, highest cost.',
    ctx: '1M tokens',
    pricing: '$5 / $25 per 1M in/out',
    notes: ['Extended thinking (adaptive) — reasons before responding', 'Best coding quality across all languages', 'Document analysis up to ~750,000 words in context'],
  },
  {
    name: 'Claude Sonnet',
    tag: 'Balanced',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    dot: 'bg-blue-500',
    desc: 'The most popular model for production use. Strong performance at moderate cost. Recommended default for enterprise applications.',
    ctx: '1M tokens',
    pricing: '$3 / $15 per 1M in/out',
    notes: ['Adaptive thinking support', 'Best latency-to-quality ratio in the family', 'Streaming with tool use and citations'],
  },
  {
    name: 'Claude Haiku',
    tag: 'Fast & cheap',
    color: 'text-slate-600 bg-slate-50 border-slate-200',
    dot: 'bg-slate-400',
    desc: 'Designed for high-throughput, low-latency tasks. Classification, summarisation, routing, and structured data extraction at scale.',
    ctx: '200K tokens',
    pricing: '$1 / $5 per 1M in/out',
    notes: ['Sub-second response times for short inputs', 'Cheapest Claude model', 'Best for real-time user-facing features'],
  },
];

const PRINCIPLES = [
  {
    principle: 'Helpful',
    desc: 'Claude should provide genuine, substantive help — not watered-down, over-cautious responses. Anthropic explicitly trains against "assistant-brained" compliance and values honesty over helpfulness when they conflict.',
    color: 'text-emerald-700 bg-emerald-50',
  },
  {
    principle: 'Harmless',
    desc: 'Avoid producing content that causes real-world harm — not just following rules for appearances. The threshold is calibrated: Claude errs toward helpfulness unless harm is plausible and material.',
    color: 'text-blue-700 bg-blue-50',
  },
  {
    principle: 'Honest',
    desc: 'Never knowingly convey false beliefs. Proactively share relevant information. Distinguish clearly between confidence levels. Epistemic cowardice — giving vague answers to avoid controversy — is a violation of honesty norms.',
    color: 'text-amber-700 bg-amber-50',
  },
];

const CLAUDE_CODE_FEATURES = [
  { f: 'CLI interface', d: 'Runs in your terminal. Understands your entire codebase via file reading, grep, and bash execution.' },
  { f: 'Multi-file editing', d: 'Plans and executes edits across multiple files to implement features, fix bugs, and refactor code.' },
  { f: 'Agentic mode', d: 'Claude autonomously reads errors, iterates, runs tests, and fixes issues without step-by-step instructions.' },
  { f: 'MCP integration', d: 'Connect external tools (GitHub, databases, APIs) directly into Claude\'s context via Model Context Protocol servers.' },
  { f: 'Custom instructions', d: 'CLAUDE.md files in project roots give Claude persistent context about conventions, architecture, and preferences.' },
  { f: 'Hooks', d: 'Shell commands that run before/after tool use — enforce linting, add logging, or block dangerous operations.' },
];

const MCP_CONCEPTS = [
  { term: 'Protocol', def: 'Open standard (JSON-RPC over stdio or HTTP) defining how AI models communicate with external tools and data sources.' },
  { term: 'MCP Server', def: 'A process that exposes tools, resources, and prompts. Can wrap any API: databases, filesystems, GitHub, Slack, custom services.' },
  { term: 'MCP Client', def: 'The AI host (Claude Code, Claude.ai, custom apps). Discovers and calls tools exposed by connected servers.' },
  { term: 'Tools', def: 'Callable functions the AI can invoke — e.g. read_file(), query_database(), send_email(). Described as JSON schema.' },
  { term: 'Resources', def: 'Data the AI can read — files, database rows, API responses. Addressable by URI.' },
  { term: 'Sampling', def: 'MCP servers can request the AI to generate text, enabling recursive AI-powered tool logic.' },
];

const API_FEATURES = [
  { f: 'Prompt caching', d: 'Cache large system prompts or document context. Cached tokens re-priced at $0.30/1M (vs $3.00 full price). 90% cost reduction for repeated long contexts. Cache TTL 5 minutes (extendable to 1 hour).' },
  { f: 'Extended thinking', d: 'Adaptive thinking mode: Claude decides when and how long to reason internally before answering. Improves accuracy on hard maths, coding, and multi-step planning. No budget_tokens needed — fully adaptive.' },
  { f: 'Citations', d: 'Claude can attribute claims to source documents with exact quotes and document indices. Reduces hallucination in document-grounded applications.' },
  { f: 'Tool use / function calling', d: 'Define tools as JSON schema. Claude decides when to call them and returns structured arguments. Supports parallel tool calls.' },
  { f: 'Streaming', d: 'Server-Sent Events. Claude streams tokens as they are generated. Supports streaming with tool use and thinking blocks.' },
  { f: 'Vision', d: 'Send images (PNG, JPEG, GIF, WebP) up to 5MB. Claude describes, analyses, and reasons about visual content.' },
  { f: 'Batch API', d: 'Submit up to 10,000 requests in a single batch for 50% cost reduction. Results available within 24 hours. Ideal for offline processing.' },
];

export default function AILabsAnthropic() {
  return (
    <PageWrapper
      badge="Page 36 — Top AI Labs"
      title="Anthropic"
      subtitle="Claude model family, Constitutional AI safety research, Claude Code, and the Model Context Protocol — Anthropic's technical ecosystem for practitioners."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Claude Model Family</h2>
        <p className="text-slate-500 text-sm mb-5">Three tiers — Opus, Sonnet, Haiku — covering the full range from maximum capability to maximum speed. All models share a 1M token context window (Haiku: 200K).</p>
        <div className="space-y-4">
          {CLAUDE_MODELS.map((m) => (
            <div key={m.name} className={`card border ${m.color}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${m.dot} flex-shrink-0 mt-1.5`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-800">{m.name}</h3>
                    <span className="text-xs bg-white/80 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{m.tag}</span>
                  </div>
                  <p className="text-sm text-slate-600">{m.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-400">{m.ctx}</p>
                  <p className="text-xs font-mono text-slate-600 mt-0.5">{m.pricing}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                {m.notes.map((n) => (
                  <div key={n} className="bg-white/60 rounded-lg px-3 py-2 text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Design Philosophy</h2>
        <p className="text-slate-500 text-sm mb-5">Anthropic's core framework is HHH: Helpful, Harmless, Honest. These are not constraints layered on top of capability — they are integrated into the training process through Constitutional AI and RLAIF.</p>
        <div className="space-y-3">
          {PRINCIPLES.map((p) => (
            <div key={p.principle} className={`card ${p.color}`}>
              <h3 className="font-bold mb-1">{p.principle}</h3>
              <p className="text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-slate-50 border-slate-200">
          <p className="text-sm text-slate-600"><strong>Character consistency:</strong> Claude maintains the same values, personality, and ethical commitments across contexts. It is designed to have genuine opinions and push back when it disagrees — not to be a passive instruction-follower.</p>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Constitutional AI</h2>
        <p className="text-slate-500 text-sm mb-4">Constitutional AI (CAI) is Anthropic's training methodology for building safe models at scale — without requiring human labellers to evaluate every harmful response.</p>
        <div className="space-y-3">
          {[
            { step: '1', title: 'SL-CAI (Supervised)', desc: 'The model critiques and revises its own harmful outputs using a written "constitution" of principles — a set of rules about what good behaviour looks like. This creates supervised fine-tuning data without human annotation of harm.' },
            { step: '2', title: 'RLAIF (Reinforcement Learning from AI Feedback)', desc: 'A second AI model evaluates responses according to the constitution and generates a preference signal. This replaces human feedback in RLHF — scaling safety training without scaling human review teams.' },
            { step: '3', title: 'Result', desc: 'Models that internalise values rather than follow rules. Claude resists jailbreaks by reasoning from principles rather than matching prohibited patterns.' },
          ].map((s) => (
            <div key={s.step} className="card flex gap-4 items-start">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center flex-shrink-0">{s.step}</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Claude Code & Tooling</h2>
        <p className="text-slate-500 text-sm mb-4">Claude Code is Anthropic's CLI-based AI coding assistant. It runs in your terminal and has access to your entire codebase, shell, and external tools via MCP.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CLAUDE_CODE_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-slate-900 text-slate-200 font-mono text-xs">
          <p className="text-slate-400 mb-1"># Install</p>
          <p>npm install -g @anthropic-ai/claude-code</p>
          <p className="text-slate-400 mt-2 mb-1"># Run in project directory</p>
          <p>claude</p>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Model Context Protocol (MCP)</h2>
        <p className="text-slate-500 text-sm mb-4">MCP is an open protocol for connecting AI models to external data sources and tools. It standardises the interface between AI hosts (clients) and tool/data providers (servers).</p>
        <div className="space-y-3 mb-5">
          {MCP_CONCEPTS.map((c) => (
            <div key={c.term} className="card flex gap-4 items-start">
              <span className="font-bold text-blue-600 w-20 flex-shrink-0 text-sm">{c.term}</span>
              <p className="text-sm text-slate-500">{c.def}</p>
            </div>
          ))}
        </div>
        <div className="card bg-blue-50 border-blue-200 text-blue-800 text-sm">
          <strong>Ecosystem:</strong> MCP is open-source (spec on GitHub). Hundreds of community servers exist for GitHub, PostgreSQL, Brave Search, Slack, Notion, and more. Claude Code ships with built-in MCP client support.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">API Features</h2>
        <p className="text-slate-500 text-sm mb-4">Anthropic's API includes several production-critical features beyond basic message generation.</p>
        <div className="space-y-3">
          {API_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
