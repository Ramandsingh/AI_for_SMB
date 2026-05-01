import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '5.1 The Three Adoption Tiers',   level: 2 },
  { id: 's2', title: '5.2 Sequencing for Cost-Sensitive Businesses', level: 2 },
  { id: 's3', title: '5.3 The Phased Commercial Model', level: 2 },
  { id: 's4', title: '5.4 Industry Quick Wins',         level: 2 },
];

const TIERS = [
  {
    num: 'Tier 1', label: 'AI as Smart Assistant',
    color: 'border-slate-300',
    scope: 'Configured commercial AI tools with prompt libraries and training. No integration, no custom development.',
    examples: ['Proposal and document drafting', 'Email triage with AI suggestions', 'Meeting notes and summaries', 'Research and competitor monitoring'],
    timeline: '4–6 weeks',
    cost: 'SaaS licensing + advisory. Typically $5k–$25k including enablement.',
    risk: 'Low — fully reversible. Adoption risk is the main variable.',
    bestFor: 'First AI initiative. Building literacy before spending on custom builds.',
  },
  {
    num: 'Tier 2', label: 'Standalone AI Tools',
    color: 'border-blue-300 bg-blue-50',
    scope: 'Lightweight custom tools that sit alongside existing systems. No integration required — humans bridge the gap.',
    examples: ['Invoice data extraction from PDFs', 'Contract clause reviewer', 'Customer email classifier with draft replies', 'Proposal generator from inputs'],
    timeline: '8–12 weeks per tool',
    cost: 'Moderate build cost. Typically $40k–$120k per tool including enablement.',
    risk: 'Low–Medium. The technology works; adoption and process clarity are the variables.',
    bestFor: 'After Tier 1 proves value. When a specific pain point is well-defined and volume justifies building.',
  },
  {
    num: 'Tier 3', label: 'Lightweight Integration',
    color: 'border-blue-500 bg-blue-100',
    scope: 'Use RPA, file watchers, or simple scripts to connect AI tools to legacy systems without modifying them.',
    examples: ['AI reads nightly export, produces output, emails result', 'File watcher triggers AI processing on new documents', 'Shared folder automation with CSV import/export', 'Email-to-system automation via n8n or Power Automate'],
    timeline: '3–6 months per integration',
    cost: 'Higher — typically $80k–$250k including integration, governance, and change management.',
    risk: 'Medium. Integration complexity and data governance become significant factors.',
    bestFor: 'Only after Tier 1 or 2 has proven value. When automation would compound across high volume.',
  },
];

const COMMERCIAL_PHASES = [
  { phase: 'Phase A', title: 'Value Assessment', price: '$15k–$40k', weeks: '3–4 weeks', deliverable: 'Prioritised AI opportunity map with ROI estimates, confidence levels, and recommended sequence. The client owns this deliverable whether or not they proceed.', commitment: 'Fixed price. No obligation to proceed to Phase B.' },
  { phase: 'Phase B', title: 'Proof of Value', price: '$40k–$120k', weeks: '6–10 weeks', deliverable: 'One use case implemented with success metric agreed upfront. Measured against baseline. Result determines Phase C.', commitment: 'Fixed price. Partial payment tied to hitting success metric if desired.' },
  { phase: 'Phase C', title: 'Scale', price: 'TBM or managed service', weeks: 'Ongoing', deliverable: 'Rollout across additional use cases identified in Phase A. Only triggered if Phase B hits its number.', commitment: 'Time-and-materials or annual managed service. Triggered by results, not promises.' },
];

const QUICK_WINS = [
  { use: 'Email Triage & Draft Replies',         cost: 'Low',  timeline: '2–4 wks',  roi: '★★★★★' },
  { use: 'Document Summarisation',               cost: 'Low',  timeline: '1–2 wks',  roi: '★★★★☆' },
  { use: 'Proposal & Quote Generation',          cost: 'Med',  timeline: '4–6 wks',  roi: '★★★★★' },
  { use: 'Invoice Data Extraction',              cost: 'Low',  timeline: '3–4 wks',  roi: '★★★★★' },
  { use: 'Meeting Notes & Action Items',         cost: 'Low',  timeline: '1 wk',     roi: '★★★★☆' },
  { use: 'Customer Query Classification',        cost: 'Med',  timeline: '4–5 wks',  roi: '★★★★☆' },
  { use: 'Demand Forecasting Augmentation',      cost: 'High', timeline: '8–12 wks', roi: '★★★☆☆' },
  { use: 'Contract & Terms Review',              cost: 'Med',  timeline: '4–6 wks',  roi: '★★★★☆' },
  { use: 'Sales Call Summarisation & CRM',       cost: 'Low',  timeline: '2–3 wks',  roi: '★★★★☆' },
  { use: 'Market & Competitor Monitoring',       cost: 'Low',  timeline: '2–4 wks',  roi: '★★★☆☆' },
];

export default function Roadmap() {
  return (
    <PageWrapper
      badge="Page 5 — Planning"
      title="Roadmap Options & Cost-Sensitive Adoption"
      subtitle="Concrete pathways any organisation can choose from — sized and sequenced for constrained budgets and non-technical teams."
      sections={SECTIONS}
    >
      {/* 5.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">5.1 The Three Adoption Tiers</h2>
        <div className="space-y-4">
          {TIERS.map((t) => (
            <div key={t.num} className={`card border ${t.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-blue">{t.num}</span>
                <h3 className="text-base">{t.label}</h3>
                <div className="ml-auto flex gap-2">
                  <span className="badge bg-slate-100 text-slate-600">{t.timeline}</span>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">{t.scope}</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Example use cases</p>
                  <ul className="space-y-1">
                    {t.examples.map(e => <li key={e} className="text-slate-600 flex gap-1.5"><span className="text-blue-400">·</span>{e}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Typical investment</p>
                  <p className="text-slate-700">{t.cost}</p>
                  <p className="text-xs font-semibold text-slate-500 mt-3 mb-2">Risk profile</p>
                  <p className="text-slate-600">{t.risk}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Best for</p>
                  <p className="text-slate-600">{t.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">5.2 Sequencing for Cost-Sensitive Businesses</h2>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Start-with-what-you-have audit', desc: 'Most organisations on Microsoft 365 or Google Workspace have AI features sitting dormant — Copilot, Gemini, AI-powered features in existing SaaS. Activate and configure these before buying anything new.' },
            { step: '2', title: 'One tool, one function, one month', desc: 'Pick the highest-pain function and the simplest commercial AI tool. Run it for 30 days. Measure hours saved. This is your proof point for the next investment decision.' },
            { step: '3', title: '"Prove one, fund the next"', desc: 'Use the documented value from the first tool to justify the second. Each successful deployment builds the case for the next. No leap-of-faith required at any stage.' },
            { step: '4', title: 'Only then consider custom builds', desc: 'After 3–6 months of commercial tool use, the business can articulate specifically where off-the-shelf falls short. Now the custom build investment is justified and the business is ready to use it.' },
          ].map(s => (
            <div key={s.step} className="card flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{s.step}</div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{s.title}</p>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">5.3 The Phased Commercial Model</h2>
        <p className="text-sm text-slate-500 mb-5">A structure that de-risks the decision for cost-sensitive buyers. Each phase is independently valuable.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {COMMERCIAL_PHASES.map((p, i) => (
            <div key={p.phase} className={`card ${i === 1 ? 'border-blue-300 bg-blue-50' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="badge-blue">{p.phase}</span>
                <span className="text-xs font-medium text-slate-500">{p.weeks}</span>
              </div>
              <p className="font-semibold text-slate-800 text-sm mb-1">{p.title}</p>
              <p className="text-blue-700 text-sm font-semibold mb-3">{p.price}</p>
              <p className="text-slate-600 text-xs mb-3">{p.deliverable}</p>
              <p className="text-xs text-slate-400 italic">{p.commitment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">5.4 Proven Quick Wins</h2>
        <p className="text-sm text-slate-500 mb-4">Use cases that consistently produce measurable value. Ordered by typical ROI — start from the top.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left p-3 font-semibold border border-slate-200">Use Case</th>
                <th className="text-center p-3 font-semibold border border-slate-200">Cost</th>
                <th className="text-center p-3 font-semibold border border-slate-200">Timeline</th>
                <th className="text-center p-3 font-semibold border border-slate-200">Typical ROI</th>
              </tr>
            </thead>
            <tbody>
              {QUICK_WINS.map((q, i) => (
                <tr key={q.use} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 text-slate-700">{q.use}</td>
                  <td className={`p-3 border border-slate-200 text-center text-xs font-medium ${q.cost === 'Low' ? 'text-emerald-700' : q.cost === 'Med' ? 'text-amber-700' : 'text-red-700'}`}>{q.cost}</td>
                  <td className="p-3 border border-slate-200 text-center text-slate-600">{q.timeline}</td>
                  <td className="p-3 border border-slate-200 text-center text-amber-500 tracking-tight">{q.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageWrapper>
  );
}
