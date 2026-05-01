import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '1.1 What AI Actually Is',          level: 2 },
  { id: 's2', title: '1.2 The Four Capabilities',        level: 2 },
  { id: 's3', title: '1.3 Legacy Systems Are Not a Blocker', level: 2 },
  { id: 's4', title: '1.4 Five Ways AI Creates Value',   level: 2 },
  { id: 's5', title: '1.5 Common Misconceptions',        level: 2 },
];

const CAPABILITIES = [
  { icon: '📖', label: 'Reads',   color: 'bg-sky-50 border-sky-200',   desc: 'Ingests documents, emails, contracts, reports, images, and makes sense of them.', examples: ['Extracting data from invoices', 'Summarising long contracts', 'Classifying customer complaints', 'Reading CVs against job descriptions'] },
  { icon: '✏️', label: 'Writes',  color: 'bg-emerald-50 border-emerald-200', desc: 'Drafts documents, emails, reports, proposals, and structured outputs.', examples: ['Monthly variance commentary', 'Customer response drafts', 'Proposal sections', 'Meeting summaries'] },
  { icon: '🔀', label: 'Decides', color: 'bg-amber-50 border-amber-200',   desc: 'Classifies, routes, recommends, and flags based on learned patterns.', examples: ['Expense categorisation', 'Customer ticket routing', 'Anomaly flagging', 'Lead prioritisation'] },
  { icon: '📈', label: 'Predicts',color: 'bg-purple-50 border-purple-200',  desc: 'Forecasts, scores, and projects based on historical patterns in data.', examples: ['Demand forecasting', 'Churn prediction', 'Credit scoring', 'Maintenance scheduling'] },
];

const VALUE_TYPES = [
  { num: '01', title: 'Labour Leverage',      icon: '⚡', desc: 'The same team accomplishes more — or a smaller team accomplishes the same. Typically 20–40% time reduction on targeted tasks.', metric: '20–40% time reduction on targeted tasks' },
  { num: '02', title: 'Speed to Outcome',     icon: '🚀', desc: 'Things that took days take hours. Cycle time compression changes what decisions become possible — and when.', metric: 'Days → hours on document-heavy tasks' },
  { num: '03', title: 'Consistency & Quality',icon: '✅', desc: 'Every output reflects best practice, not the best performer\'s practice. Reduces quality variance across the team.', metric: 'Error rate reductions of 50–80% documented' },
  { num: '04', title: 'Capability Access',    icon: '🔓', desc: 'Smaller organisations gain access to capabilities previously only affordable for large enterprises — research, analysis, drafting.', metric: 'Enterprise-grade capability at SaaS subscription cost' },
  { num: '05', title: 'Risk Reduction',       icon: '🛡️', desc: 'Fewer errors, better compliance, earlier problem detection. Quantified as cost-of-error avoided and regulatory exposure reduced.', metric: 'Compliance errors reduced; audit trails automated' },
];

const MISCONCEPTIONS = [
  { myth: '"AI needs perfect data to work."',          truth: 'AI adds value on messy, unstructured data — emails, PDFs, notes. Imperfect data is its strength, not a dealbreaker.' },
  { myth: '"AI requires ERP or system integration."',  truth: 'Most early AI value comes from working on the inputs and outputs humans already handle — no system integration required.' },
  { myth: '"AI will replace our people."',             truth: 'AI replaces tasks, not roles. It handles the repetitive, volume-constrained work so people focus on judgment and relationships.' },
  { myth: '"We need an IT team to deploy AI."',        truth: 'Commercial AI products (Copilot, Claude, ChatGPT Teams) are SaaS tools — a non-technical leader can set them up in days.' },
  { myth: '"AI is just for large companies."',         truth: 'SMEs with 10–200 employees often see faster ROI because they have less bureaucracy slowing adoption.' },
];

export default function UnderstandingAI() {
  return (
    <PageWrapper
      badge="Page 1 — Foundation"
      title="Understanding AI for Your Business"
      subtitle="AI defined in language business leaders understand. Nothing else in this dashboard makes sense without this foundation."
      sections={SECTIONS}
    >
      {/* 1.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">1.1 What AI Actually Is</h2>
        <div className="card bg-blue-50 border-blue-200 mb-6">
          <p className="text-slate-700 text-base leading-relaxed">
            <strong>AI is software that can read, write, decide, and predict the way a capable employee can — but at the speed and scale of a computer.</strong> It doesn't replace judgment; it handles the parts of knowledge work that are repetitive, pattern-based, or volume-constrained.
          </p>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Every AI use case in your business is some combination of these four capabilities. Once leaders see this clearly, they start spotting opportunities on their own — which is exactly the right outcome from this page.
        </p>
      </section>

      {/* 1.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">1.2 The Four Capabilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CAPABILITIES.map((c) => (
            <div key={c.label} className={`card border ${c.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="text-base">AI that {c.label}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-3">{c.desc}</p>
              <ul className="space-y-1">
                {c.examples.map(e => (
                  <li key={e} className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 1.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">1.3 Legacy Systems Are Not a Blocker</h2>
        <div className="card mb-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            For organisations with 10+ year-old ERP, WMS, or accounting systems, AI adoption doesn't require rebuilding your stack. The principle is <strong>augmentation around the edges</strong> — AI works on the inputs and outputs that people are already handling manually.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your legacy systems stay untouched. AI handles documents, emails, reports — the unstructured content that surrounds every system. A staff member uploads an invoice PDF; AI extracts the data; the result drops into the legacy system via CSV import. No integration project. No ERP modification.
          </p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
          <span className="text-xl">💡</span>
          <span>The typical first AI project at a legacy-systems business adds value in 4–8 weeks with zero system modifications.</span>
        </div>
      </section>

      {/* 1.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">1.4 Five Ways AI Creates Value</h2>
        <div className="space-y-3">
          {VALUE_TYPES.map((v) => (
            <div key={v.num} className="card flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">{v.icon}</div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-slate-400 font-mono">{v.num}</span>
                  <h3>{v.title}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-2">{v.desc}</p>
                <span className="badge-green text-xs">{v.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1.5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">1.5 Common Misconceptions</h2>
        <div className="space-y-3">
          {MISCONCEPTIONS.map((m) => (
            <div key={m.myth} className="card border-slate-200">
              <p className="text-sm font-medium text-red-700 mb-1.5">✗ {m.myth}</p>
              <p className="text-sm text-emerald-700">✓ {m.truth}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
