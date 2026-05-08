import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The $4.4 Trillion Opportunity',    level: 2 },
  { id: 's2', title: 'Six Value Categories',             level: 2 },
  { id: 's3', title: 'Value by Business Size',           level: 2 },
  { id: 's4', title: 'Where Value Does NOT Come From',   level: 2 },
  { id: 's5', title: 'Short-term vs Long-term Value',    level: 2 },
];

const VALUE_CATS = [
  {
    num: '01', icon: '⚡', label: 'Labour Leverage',
    color: 'bg-blue-50 border-blue-200',
    headline: '20–40% time reclaimed on targeted workflows',
    desc: 'AI handles the volume-constrained, repetitive portion of knowledge work — the tasks that consume time without requiring judgment. The same team produces more, or a smaller team produces the same.',
    examples: [
      'Email triage and draft replies: 2 hours/day → 20 minutes/day per person',
      'Report writing: first draft in 5 minutes, not 2 hours',
      'Invoice processing: 3 minutes per invoice → under 10 seconds',
      'Meeting notes and action items: automated vs 30–45 minutes manually',
    ],
    caution: 'Labour leverage compounds — but only if reclaimed time is redirected to higher-value work. If teams simply do less, the ROI never materialises.',
  },
  {
    num: '02', icon: '🚀', label: 'Decision Speed',
    color: 'bg-emerald-50 border-emerald-200',
    headline: 'Days-to-hours compression on analytical cycles',
    desc: 'AI compresses the gap between data and decision. When analysis that took a week takes hours, different decisions become possible — earlier, with more options still open.',
    examples: [
      'Weekly forecasting reports replaced by live dashboards updating as data arrives',
      'M&A due diligence: document review in days vs weeks',
      'Customer pricing decisions: real-time recommendation vs 3-day approval cycle',
      'Risk assessment: continuous monitoring vs periodic manual review',
    ],
    caution: 'Speed advantage is only valuable if the organisation is structured to act on faster information. Decision latency is often cultural, not analytical.',
  },
  {
    num: '03', icon: '✅', label: 'Consistency & Quality',
    color: 'bg-amber-50 border-amber-200',
    headline: '50–80% error rate reduction on targeted tasks',
    desc: 'Every output reflects best practice, not the best performer\'s practice. Quality variance collapses. The output of the weakest performer in a team approaches that of the strongest when AI assists consistently.',
    examples: [
      'Proposal quality consistent across 30 sales reps — not just top performers',
      'Compliance checks run on every document, not just those time permits',
      'Code review: automated checks catch 80% of common errors before human review',
      'Customer communications: tone and accuracy consistent across 200 agents',
    ],
    caution: 'AI consistency can entrench errors at scale if the underlying process or prompt design is flawed. Human review remains essential for high-stakes outputs.',
  },
  {
    num: '04', icon: '💰', label: 'Revenue Generation',
    color: 'bg-purple-50 border-purple-200',
    headline: '10–30% revenue lift in AI-optimised commerce',
    desc: 'AI unlocks revenue that human-scale personalisation cannot capture: hyper-personalised recommendations, dynamic pricing, predictive upsell triggers, and proactive retention before churn occurs.',
    examples: [
      'Product recommendation engines driving 10–30% average order value lift',
      'Dynamic pricing responding to demand signals in near-real-time',
      'Churn prediction enabling proactive retention with 40–60% save rates',
      'AI-generated personalised outreach outperforming generic campaigns by 3–5×',
    ],
    caution: 'Revenue impact is often the hardest to attribute cleanly to AI. Build measurement methodology before deployment, not after.',
  },
  {
    num: '05', icon: '🛡️', label: 'Risk & Compliance',
    color: 'bg-rose-50 border-rose-200',
    headline: 'Cost-of-error avoidance: often 5–10× the tool cost',
    desc: 'AI provides continuous, scalable monitoring that human review cannot match at volume. The value is in catching what would have been missed — regulatory breaches, fraud, data anomalies, contract risks.',
    examples: [
      'Fraud detection: catching patterns across millions of transactions simultaneously',
      'Contract review: 95%+ accuracy on risk clause identification vs 70–80% manual',
      'Regulatory monitoring: continuous compliance scanning vs periodic audit',
      'Cyber threat detection: anomaly detection at machine speed',
    ],
    caution: 'Risk reduction value is invisible when it works — the prevented loss never appears in the P&L. Build counterfactual analysis into your value measurement.',
  },
  {
    num: '06', icon: '🏆', label: 'Competitive Positioning',
    color: 'bg-slate-50 border-slate-200',
    headline: 'Compounding advantage — hardest to quantify, hardest to replicate',
    desc: 'AI capability advantages compound over time. Early movers build data assets, trained models, AI-literate workforces, and optimised processes that late movers cannot replicate quickly. This is the most durable form of AI value.',
    examples: [
      'Proprietary data + fine-tuned models create a moat competitors cannot buy',
      'AI-literate workforce takes 18–24 months to build from scratch',
      'Customer experience advantages become self-reinforcing through data feedback loops',
      'Speed advantages accumulate — faster iteration produces compounding product improvements',
    ],
    caution: 'Competitive advantage requires sustained investment. One AI initiative is a project. Sustained capability building is a strategy.',
  },
];

const SIZE_DATA = [
  {
    size: 'Large Enterprise (500+)',
    icon: '🏢',
    primary: 'Supply chain, fraud detection, AIOps, enterprise-wide productivity tools',
    typical_roi: '18–36 month payback on large programs; immediate on SaaS tools',
    advantage: 'Data volumes enable powerful custom models',
    barrier: 'Legacy systems, governance complexity, change management at scale',
  },
  {
    size: 'Mid-Market (50–500)',
    icon: '🏬',
    primary: 'Customer service automation, sales intelligence, finance automation',
    typical_roi: '6–18 month payback; faster iteration than enterprise',
    advantage: 'Enough data for meaningful AI, less governance overhead',
    barrier: 'Limited internal AI expertise; must buy or partner heavily',
  },
  {
    size: 'SME (10–50)',
    icon: '🏪',
    primary: 'Productivity tools (Copilot, Claude), proposal automation, email/reporting',
    typical_roi: '3–9 month payback on SaaS tool adoption; immediate on some workflows',
    advantage: 'Fastest adoption speed; no legacy systems; every hour saved is felt',
    barrier: 'Limited data for custom models; relies on general-purpose AI tools',
  },
];

const NOT_VALUE = [
  { myth: 'Deploying more AI tools = more value', reality: 'Tools unused or poorly adopted generate zero value. One well-deployed tool outperforms ten underused ones.' },
  { myth: 'AI improves broken processes', reality: 'AI scales the existing process — including its flaws. Fix the process first, then automate.' },
  { myth: 'AI eliminates the need for good data', reality: 'AI amplifies what data quality you have. Garbage in, garbage out — faster.' },
  { myth: 'The value is in the AI model itself', reality: 'The value is in the workflow change the model enables. The model is a component, not the outcome.' },
  { myth: 'Headcount reduction is the primary goal', reality: 'Organisations that lead with headcount reduction see lower adoption and morale damage. Productivity and capability uplift generate more value with less resistance.' },
];

export default function EnterpriseValue() {
  return (
    <PageWrapper
      badge="Page 13 — Enterprise Context"
      title="Where Is the Value in Adopting AI"
      subtitle="A rigorous breakdown of where AI generates measurable business value — and where it does not. Grounded in McKinsey, Gartner, and WEF research."
      sections={SECTIONS}
    >

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The $4.4 Trillion Opportunity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-3xl font-extrabold text-blue-600 mb-1">$4.4T</p>
            <p className="text-xs text-slate-500">Annual value AI could add to global corporate profits</p>
            <p className="text-xs font-semibold text-slate-400 mt-1">McKinsey Global Institute</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-extrabold text-emerald-600 mb-1">75%</p>
            <p className="text-xs text-slate-500">of this value concentrated in just four functions: customer ops, marketing, software, R&D</p>
            <p className="text-xs font-semibold text-slate-400 mt-1">McKinsey, 2024</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-extrabold text-purple-600 mb-1">3–5×</p>
            <p className="text-xs text-slate-500">ROI reported by top-quartile AI adopters vs median adopters</p>
            <p className="text-xs font-semibold text-slate-400 mt-1">BCG, 2024</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The value is real and large — but it is not evenly distributed. Organisations that approach AI as a strategic capability systematically outperform those that treat it as a collection of tools. The difference is not the technology. It is the clarity about where value comes from and how to capture it.
        </p>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Six Value Categories</h2>
        <p className="text-slate-500 text-sm mb-6">Every AI use case generates value through one or more of these six mechanisms. Understanding which category a use case targets helps you size the opportunity and measure the right outcomes.</p>
        <div className="space-y-4">
          {VALUE_CATS.map((v) => (
            <div key={v.num} className={`card border ${v.color}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{v.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">{v.num}</span>
                    <h3 className="font-bold text-slate-800">{v.label}</h3>
                  </div>
                  <p className="text-xs font-semibold text-slate-500">{v.headline}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{v.desc}</p>
              <ul className="space-y-1 mb-3">
                {v.examples.map((ex, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-slate-300 flex-shrink-0">→</span>{ex}
                  </li>
                ))}
              </ul>
              <div className="bg-white/70 rounded-lg px-3 py-2 border border-white text-xs text-slate-500">
                <strong>⚠ Watch out:</strong> {v.caution}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Value by Business Size</h2>
        <p className="text-slate-500 text-sm mb-6">AI value is accessible at every scale — but where it concentrates and how fast it compounds differs significantly by organisation size.</p>
        <div className="space-y-4">
          {SIZE_DATA.map((s) => (
            <div key={s.size} className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{s.icon}</span>
                <h3 className="font-bold text-slate-800">{s.size}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs font-semibold text-slate-400 uppercase mb-1">Top use cases</p><p className="text-slate-600">{s.primary}</p></div>
                <div><p className="text-xs font-semibold text-slate-400 uppercase mb-1">Typical ROI timeline</p><p className="text-slate-600">{s.typical_roi}</p></div>
                <div><p className="text-xs font-semibold text-emerald-500 uppercase mb-1">Advantage</p><p className="text-slate-600">{s.advantage}</p></div>
                <div><p className="text-xs font-semibold text-red-400 uppercase mb-1">Primary barrier</p><p className="text-slate-600">{s.barrier}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Where Value Does NOT Come From</h2>
        <p className="text-slate-500 text-sm mb-6">These are the most common misunderstandings about AI value — each one leads to misallocated investment or failed programs.</p>
        <div className="space-y-3">
          {NOT_VALUE.map((n, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-lg mt-0.5 flex-shrink-0">✗</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{n.myth}</p>
                  <p className="text-sm text-slate-500 mt-1">{n.reality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Short-term vs Long-term Value</h2>
        <p className="text-slate-500 text-sm mb-6">AI generates value on two timescales. Most organisations only plan for the first.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card bg-blue-50 border-blue-200">
            <p className="font-bold text-blue-800 mb-3">Short-term Value (0–18 months)</p>
            <ul className="space-y-2 text-sm text-blue-700">
              {[
                'Time savings on repetitive workflows (measurable from week one)',
                'Error reduction on high-volume processes',
                'Faster turnaround on customer-facing outputs',
                'Reduced external spend (consultants, contractors, tools)',
                'Improved employee satisfaction from eliminating low-value work',
              ].map((item, i) => <li key={i} className="flex gap-2"><span className="flex-shrink-0">→</span>{item}</li>)}
            </ul>
          </div>
          <div className="card bg-purple-50 border-purple-200">
            <p className="font-bold text-purple-800 mb-3">Long-term Value (18 months+)</p>
            <ul className="space-y-2 text-sm text-purple-700">
              {[
                'Proprietary data assets that improve model performance over time',
                'AI-literate workforce with compounding capability advantages',
                'Customer experience differentiation that becomes self-reinforcing',
                'New business models enabled by AI-generated insights at scale',
                'Competitive moat: 18–24 months of capability that late movers cannot buy',
              ].map((item, i) => <li key={i} className="flex gap-2"><span className="flex-shrink-0">→</span>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="card bg-slate-800 text-white mt-4">
          <p className="font-bold text-sm mb-2">The compounding effect</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Organisations that start now get 18–24 months of operational learning, data accumulation, and workforce development before late movers begin. That gap does not close when a competitor finally starts. AI advantage compounds — it does not wait.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
