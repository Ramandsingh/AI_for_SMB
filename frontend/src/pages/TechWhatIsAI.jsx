import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'A Working Definition',          level: 2 },
  { id: 's2', title: 'A Brief History',               level: 2 },
  { id: 's3', title: 'Narrow vs General vs Super AI', level: 2 },
  { id: 's4', title: 'AI vs Automation vs Software',  level: 2 },
  { id: 's5', title: 'The Current Inflection Point',  level: 2 },
];

const HISTORY = [
  { year: '1950', icon: '🧠', event: 'Alan Turing proposes the "Turing Test" — can a machine think?', impact: 'Established the foundational question that still shapes AI research.' },
  { year: '1956', icon: '🏫', event: 'Dartmouth Conference coins the term "Artificial Intelligence"', impact: 'AI becomes a formal academic discipline. Early optimism was extreme — most predictions were off by 50+ years.' },
  { year: '1980s', icon: '📋', event: 'Expert Systems era — rules-based AI encoding human expertise', impact: 'First commercial AI deployments. Fragile, expensive to maintain, unable to generalise.' },
  { year: '1997', icon: '♟️', event: 'IBM Deep Blue defeats world chess champion Garry Kasparov', impact: 'Proved narrow AI could outperform humans in specific tasks. Did not generalise to other tasks.' },
  { year: '2006–12', icon: '🔬', event: 'Deep Learning breakthrough — neural networks with many layers', impact: 'Image recognition, speech recognition, and translation suddenly became viable at scale.' },
  { year: '2017', icon: '⚡', event: 'Google publishes "Attention Is All You Need" — the Transformer paper', impact: 'The architectural foundation for all modern LLMs. GPT, Claude, Gemini all trace to this paper.' },
  { year: '2020', icon: '🚀', event: 'GPT-3 released — 175 billion parameters, human-quality text', impact: 'First model that non-technical users could interact with productively. Marked the start of the current era.' },
  { year: '2022', icon: '🌊', event: 'ChatGPT reaches 100 million users in 2 months (fastest in history)', impact: 'AI becomes a mainstream business and consumer tool. Enterprise adoption accelerates dramatically.' },
  { year: '2024–25', icon: '🔄', event: 'Multimodal AI, agentic AI, and reasoning models emerge', impact: 'AI moves from text-only to image/audio/video, and from answering to taking autonomous action.' },
];

const AI_TYPES = [
  {
    type: 'Narrow AI (Weak AI)',
    icon: '🎯',
    color: 'bg-blue-50 border-blue-200',
    desc: 'Designed to perform one specific task extremely well. Cannot generalise beyond its training domain. This is all AI that exists today.',
    examples: ['Chess-playing AI (only plays chess)', 'Facial recognition (only identifies faces)', 'Spam filters (only classify email)', 'ChatGPT (only generates text — cannot drive a car)'],
    reality: 'Every AI tool you will use in business is narrow AI. It is powerful within its domain and useless outside it.',
  },
  {
    type: 'General AI (AGI)',
    icon: '🤖',
    color: 'bg-amber-50 border-amber-200',
    desc: 'AI that can perform any intellectual task a human can — learning, reasoning, adapting across domains without specific programming. Does not yet exist.',
    examples: ['Could learn chess AND write code AND diagnose disease AND hold conversation', 'Would understand context across completely different domains', 'Would transfer learning from one task to an unrelated one'],
    reality: 'Timeline is genuinely uncertain — estimates range from 5 to 50+ years. Current LLMs seem capable but are fundamentally different from AGI.',
  },
  {
    type: 'Superintelligence (ASI)',
    icon: '🌌',
    color: 'bg-slate-50 border-slate-200',
    desc: 'AI that surpasses human intelligence in every domain simultaneously. Theoretical. Frequently discussed in risk literature but not relevant to current business decisions.',
    examples: ['Would solve problems humans cannot even formulate correctly', 'Self-improving — could design better versions of itself'],
    reality: 'Interesting for long-range risk thinking. Not relevant to your AI adoption strategy in 2024–2026.',
  },
];

const COMPARISON = [
  {
    label: 'Traditional Software',
    icon: '💾',
    how: 'Executes explicit rules written by a programmer. "If X, then Y."',
    example: 'A payroll system calculates salary exactly as the formula specifies.',
    limitation: 'Cannot handle inputs it was not explicitly programmed for.',
  },
  {
    label: 'Automation (RPA)',
    icon: '🤖',
    how: 'Mimics human actions on software interfaces — clicks, copies, pastes. No intelligence, just repetition.',
    example: 'A bot extracts invoice data by clicking the same fields in the same screen every time.',
    limitation: 'Breaks when the screen layout changes. Cannot interpret context or variation.',
  },
  {
    label: 'Artificial Intelligence',
    icon: '🧠',
    how: 'Learns patterns from data. Handles variation, ambiguity, and novel inputs it has never seen before.',
    example: 'An AI reads any invoice — regardless of format, layout, or language — and extracts the correct data.',
    limitation: 'Requires training data. Can be confidently wrong. Needs monitoring and governance.',
  },
];

export default function TechWhatIsAI() {
  return (
    <PageWrapper
      badge="Page 17 — Technology of AI"
      title="What Is AI"
      subtitle="A precise, jargon-free definition of artificial intelligence — what it is, what it is not, and why 2024 represents a genuine inflection point in its business relevance."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">A Working Definition</h2>
        <div className="card bg-blue-50 border-blue-200 mb-6">
          <p className="text-slate-700 text-base leading-relaxed">
            <strong>Artificial Intelligence is software that learns from data to perform tasks that previously required human intelligence — such as understanding language, recognising patterns, making decisions, and generating content.</strong>
          </p>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          The key word is <strong>learns</strong>. Traditional software follows explicit rules written by programmers. AI software identifies patterns in large datasets and develops its own rules — which is why it can handle inputs it has never seen before, and why it sometimes produces outputs that surprise even its creators.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          In practice, "AI" refers to a broad family of techniques — machine learning, deep learning, large language models, computer vision, and more. What they share is this: they improve through exposure to data rather than through explicit programming.
        </p>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">A Brief History</h2>
        <p className="text-slate-500 text-sm mb-6">AI has a 70-year history of overpromising and underdelivering — until the last 5 years, when it began delivering ahead of most forecasts.</p>
        <div className="space-y-3">
          {HISTORY.map((h) => (
            <div key={h.year} className="card flex items-start gap-4">
              <div className="flex-shrink-0 text-center">
                <p className="text-lg">{h.icon}</p>
                <p className="text-xs font-bold text-blue-600 mt-1">{h.year}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{h.event}</p>
                <p className="text-xs text-slate-500 mt-1">{h.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Narrow vs General vs Super AI</h2>
        <p className="text-slate-500 text-sm mb-6">Most AI discussion conflates three very different concepts. Business leaders need to be clear about which one they are actually talking about.</p>
        <div className="space-y-4">
          {AI_TYPES.map((t) => (
            <div key={t.type} className={`card border ${t.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{t.icon}</span>
                <h3 className="font-bold text-slate-800">{t.type}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{t.desc}</p>
              <ul className="space-y-1 mb-3">
                {t.examples.map((ex, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-500"><span className="flex-shrink-0">→</span>{ex}</li>
                ))}
              </ul>
              <div className="bg-white/70 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600">
                📌 {t.reality}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">AI vs Automation vs Software</h2>
        <p className="text-slate-500 text-sm mb-6">These three are frequently confused in business conversations. The distinction matters because it determines which problems each tool can solve.</p>
        <div className="space-y-4">
          {COMPARISON.map((c) => (
            <div key={c.label} className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{c.icon}</span>
                <h3 className="font-bold text-slate-800">{c.label}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-1"><strong>How:</strong> {c.how}</p>
              <p className="text-sm text-slate-600 mb-1"><strong>Example:</strong> {c.example}</p>
              <p className="text-sm text-red-600"><strong>Limitation:</strong> {c.limitation}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">The Current Inflection Point</h2>
        <p className="text-slate-500 text-sm mb-4">Three things converged in 2022–2024 to make AI genuinely useful for non-technical business users for the first time:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { icon: '📐', title: 'Transformer Architecture', desc: 'A new model design (2017) that could process language at scale. All modern LLMs are built on this.' },
            { icon: '⚡', title: 'Compute Scale', desc: 'The cost of training powerful models fell 1,000× between 2010 and 2024. Cloud GPU access democratised what previously required research labs.' },
            { icon: '💬', title: 'Natural Language Interfaces', desc: 'AI became accessible via plain English. No code, no technical training required. This is what changed business adoption.' },
          ].map((item) => (
            <div key={item.title} className="card text-center">
              <p className="text-3xl mb-2">{item.icon}</p>
              <p className="font-bold text-slate-800 mb-1">{item.title}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="card bg-slate-800 text-white">
          <p className="font-bold text-sm mb-2">The practical implication</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Before 2022, applying AI to a business problem required data scientists, months of development, and significant budget. Today, many high-value business AI applications can be deployed by non-technical users using commercial SaaS tools in days. This is the inflection point — and it is why AI adoption is now a business strategy question, not an IT infrastructure question.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
