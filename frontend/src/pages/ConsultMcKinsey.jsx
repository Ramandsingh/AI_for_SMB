import { TrendingUp, DollarSign, Users, Cpu, BarChart2, Star, ArrowRight, Layers } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The $4.4 Trillion Prize',          level: 2 },
  { id: 's2', title: 'Where the Value Concentrates',     level: 2 },
  { id: 's3', title: 'The AI High Performer Profile',    level: 2 },
  { id: 's4', title: 'Superagency in the Workplace',     level: 2 },
  { id: 's5', title: 'From Pilot to Scale',              level: 2 },
];

const VALUE_DOMAINS = [
  {
    domain: 'Customer Operations',
    share: '~25%',
    bar: 'w-[90%]',
    color: 'bg-blue-600',
    value: '$0.7–1.1T',
    detail: 'AI-driven customer service (deflection, resolution, NPS), hyper-personalisation at scale, proactive engagement from churn prediction models. The ROI is measurable within 90 days — cost-per-contact falls, CSAT rises. McKinsey finds this is where most enterprises have their first production-grade deployment.',
    examples: ['LLM chatbots with RAG: 50–70% tier-1 deflection', 'Agent assist: 35% handle time reduction', 'Churn models: 20–25% retention improvement on flagged cohorts'],
  },
  {
    domain: 'Marketing & Sales',
    share: '~22%',
    bar: 'w-[80%]',
    color: 'bg-blue-500',
    value: '$0.6–1.0T',
    detail: 'Personalised content at scale, lead scoring, dynamic pricing, and AI-augmented sales reps. McKinsey finds sales organisations using LLM-assisted outreach and ML-based targeting achieve 40–50% higher conversion on qualified pipeline — without proportional headcount growth.',
    examples: ['LLM content generation: 10× throughput vs. human-only', 'ML lead scoring: 40–50% higher pipeline conversion', 'Dynamic pricing: 3–8% revenue uplift in trials'],
  },
  {
    domain: 'Software Engineering',
    share: '~18%',
    bar: 'w-[65%]',
    color: 'bg-blue-400',
    value: '$0.5–0.9T',
    detail: 'Code generation and completion, automated testing, documentation, and AI-assisted code review. McKinsey\'s research quantifies this as a 25–45% reduction in engineering time-to-completion across production tasks. The implications for software R&D budgets — and headcount planning — are material at enterprise scale.',
    examples: ['Code completion (Copilot, Cursor): 55% faster task completion (GitHub)', 'Automated test generation: 40% reduction in QA cycle time', 'Vulnerability scanning: 3× more coverage vs. manual review'],
  },
  {
    domain: 'R&D & Product Development',
    share: '~15%',
    bar: 'w-[55%]',
    color: 'bg-blue-300',
    value: '$0.4–0.7T',
    detail: 'Drug discovery, materials science, product design iteration, and market research synthesis. The longest payback cycle but the largest option value. McKinsey highlights pharma (3–4 year compression in preclinical timelines) and manufacturing (ML-driven materials optimisation) as the leading verticals.',
    examples: ['ML in drug discovery: 30–50% reduction in candidate screening time', 'Generative design in engineering: 20% material cost reduction', 'AI market research synthesis: 8× throughput vs. analyst-only'],
  },
];

const HIGH_PERFORMER_TRAITS = [
  { trait: '3× more likely to have AI embedded in core products and services, not just operations', star: true },
  { trait: '5× more likely to have C-suite AI ownership beyond the CTO — CEO, CFO, and COO actively sponsor programs', star: true },
  { trait: 'Spend 3–4× more on AI as a percentage of revenue than industry average', star: true },
  { trait: 'Run centralised AI governance with decentralised execution — standards at centre, deployment at the edge', star: true },
  { trait: 'Measure AI programs on revenue and margin impact — not deployment speed or model accuracy', star: true },
  { trait: 'Have a named AI product owner for every production model, with P&L accountability', star: false },
  { trait: 'Treat AI talent acquisition as a board-level priority, not an HR function', star: false },
  { trait: 'Pilot fewer use cases but scale them faster — depth over breadth at the portfolio level', star: false },
];

const SUPERAGENCY_EXAMPLES = [
  { role: 'Financial Analyst', before: 'Builds one model per week, reviews 50 data points per report', after: 'Runs 10 models in parallel with LLM-generated analysis, reviews 500 data points in same time', uplift: '10×' },
  { role: 'Legal Counsel', before: 'Reviews 3–5 contracts per day, flags obvious issues manually', after: 'AI pre-reviews 50+ contracts, counsel focuses on judgment and negotiation strategy', uplift: '10×' },
  { role: 'Software Engineer', before: 'Writes ~200 lines of tested, reviewed code per day', after: 'With AI pair programming and auto-testing, ships 4–8× more output in same hours', uplift: '5×' },
  { role: 'Customer Service Manager', before: 'Analyses weekly CSAT report, acts on previous week\'s data', after: 'Real-time AI insight dashboard — acts on today\'s signals, before issues compound', uplift: '7×' },
];

const SCALE_STAGES = [
  {
    stage: 'Foundation',
    timeline: 'Months 1–12',
    color: 'border-l-slate-300',
    actions: [
      'Establish enterprise data platform — clean, governed, accessible',
      'Hire or develop 10–20 core AI professionals (engineers, scientists, product managers)',
      'Define AI governance framework and acceptable use policy',
      'Identify and prioritise top 10 AI use cases by value and feasibility',
      'Launch 2–3 pilots with clear success metrics and business owners',
    ],
    trap: 'Launching too many pilots simultaneously. Breadth without depth produces nothing at scale.',
  },
  {
    stage: 'Scale',
    timeline: 'Months 12–36',
    color: 'border-l-blue-400',
    actions: [
      'Embed AI in core customer-facing products and internal workflows',
      'Build the shared AI platform — model access, evaluation, monitoring, deployment pipelines',
      'Expand AI literacy across the organisation — 30%+ of workforce trained',
      'Establish model risk management and production monitoring',
      'Move successful pilots to P&L-owned product lines, not IT projects',
    ],
    trap: 'Treating scale as "deploying more pilots." Scale means AI in the revenue model, not more proofs of concept.',
  },
  {
    stage: 'Transform',
    timeline: 'Months 36+',
    color: 'border-l-emerald-400',
    actions: [
      'Redesign business model with AI as a core value driver — not a support function',
      'Launch AI-native products competitors cannot replicate without your proprietary data',
      'Build AI into every new role description — no new hire works without AI tools',
      'Establish continuous AI R&D investment — not project-based funding',
      'Develop external AI ecosystem — partnerships, APIs, platform effects',
    ],
    trap: 'Stopping at efficiency. Transformation requires AI in the revenue model and the product, not just the back office.',
  },
];

export default function ConsultMcKinsey() {
  return (
    <PageWrapper
      badge="Executive Insights · McKinsey"
      title="The GenAI Economic Opportunity"
      subtitle="McKinsey Global Institute's definitive analysis of where AI creates enterprise value — and what separates the companies already capturing it."
      sections={SECTIONS}
    >
      <div className="card bg-slate-800 text-white border-0 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">McKinsey State of AI, 2024</p>
        <p className="text-2xl font-extrabold text-white mb-1">65% of organisations</p>
        <p className="text-slate-300 text-sm">are now regularly using generative AI — double the proportion from early 2023. The adoption curve has inflected. The question is no longer if, but how fast and how well.</p>
      </div>

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The $4.4 Trillion Prize</h2>
        <p className="text-slate-500 text-sm mb-2">McKinsey Global Institute's 2023 analysis — the most comprehensive quantification of GenAI economic potential to date — estimates that generative AI could add <strong className="text-slate-700">$2.6 to $4.4 trillion annually</strong> across assessed use cases. This is equivalent to adding the GDP of the United Kingdom to the global economy, every year.</p>
        <p className="text-xs text-slate-400 mb-6">Source: McKinsey Global Institute, "The Economic Potential of Generative AI," 2023. Figures represent potential annual value at full adoption maturity.</p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { stat: '$4.4T', label: 'maximum annual GenAI value across assessed use cases', source: 'MGI, 2023' },
            { stat: '300+', label: 'use cases analysed across 63 industries', source: 'MGI, 2023' },
            { stat: '75%', label: 'of total value concentrated in just 4 business domains', source: 'MGI, 2023' },
          ].map(s => (
            <div key={s.stat} className="card text-center">
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{s.stat}</p>
              <p className="text-xs text-slate-500 leading-tight mb-2">{s.label}</p>
              <p className="text-xs font-semibold text-slate-400">{s.source}</p>
            </div>
          ))}
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800 leading-relaxed"><strong>The executive lens:</strong> Even capturing 10% of the value available to your organisation represents a material change to your P&L. McKinsey's analysis suggests that most large enterprises have $50–500M of AI value available in their current operations — the majority of it untapped. The question is not the size of the prize. It is the speed and discipline of capture.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Where the Value Concentrates</h2>
        <p className="text-slate-500 text-sm mb-6">75% of the total GenAI value opportunity sits in four domains. This concentration is the most important planning insight for executive AI investment decisions.</p>
        <div className="space-y-5">
          {VALUE_DOMAINS.map((d, idx) => (
            <div key={d.domain} className="card">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-extrabold text-slate-200 font-mono flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-slate-800">{d.domain}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">{d.share} of total</span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">{d.value}/yr</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.color} ${d.bar}`} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">{d.detail}</p>
              <div className="space-y-1">
                {d.examples.map((e, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                    <ArrowRight size={11} className="text-blue-400 flex-shrink-0 mt-0.5" />{e}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">The AI High Performer Profile</h2>
        <p className="text-slate-500 text-sm mb-6">McKinsey's State of AI survey identifies a cohort of organisations generating significantly above-average AI returns — "high performers." Their distinguishing characteristics are operational and strategic, not technological.</p>
        <div className="space-y-2">
          {HIGH_PERFORMER_TRAITS.map((t, i) => (
            <div key={i} className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-sm border ${t.star ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
              <Star size={14} className={`flex-shrink-0 mt-0.5 ${t.star ? 'text-blue-500 fill-blue-200' : 'text-slate-300'}`} />
              <span>{t.trait}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Superagency in the Workplace</h2>
        <p className="text-slate-500 text-sm mb-2">McKinsey's 2025 research introduces the concept of "superagency" — the condition where AI amplifies individual capability so dramatically that the effective output of a skilled professional is multiplied, not just improved. This is the dominant thesis for how AI changes the enterprise talent equation.</p>
        <p className="text-xs text-slate-400 mb-6">Source: McKinsey & Company, "Superagency in the Workplace," January 2025</p>
        <div className="space-y-3">
          {SUPERAGENCY_EXAMPLES.map((ex) => (
            <div key={ex.role} className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-slate-800 text-sm">{ex.role}</p>
                <span className="text-lg font-extrabold text-emerald-600">{ex.uplift} scope</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Without AI</p>
                  <p className="text-xs text-slate-600">{ex.before}</p>
                </div>
                <div className="bg-blue-50 rounded-lg px-3 py-2">
                  <p className="text-xs font-semibold text-blue-600 mb-1">With AI</p>
                  <p className="text-xs text-blue-700">{ex.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-blue-50 border-blue-200 mt-4">
          <p className="text-sm text-blue-800 leading-relaxed"><strong>The headcount implication:</strong> McKinsey is explicit that superagency does not translate directly into workforce reduction in the short term. It translates into each existing employee doing work that previously required more people — expanding scope, not shrinking headcount. Organisations that use AI purely to cut headcount miss the greater value of using the same headcount to generate more output, faster, with higher quality.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">From Pilot to Scale: The McKinsey Model</h2>
        <p className="text-slate-500 text-sm mb-6">McKinsey's three-stage model for enterprise AI transformation. Each stage has distinct priorities and common failure modes. Most enterprises are stuck in Stage 1 — running pilots — because they have not made the structural commitments Stage 2 requires.</p>
        <div className="space-y-4">
          {SCALE_STAGES.map((s) => (
            <div key={s.stage} className={`card border-l-4 ${s.color}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800">{s.stage}</h3>
                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{s.timeline}</span>
              </div>
              <ul className="space-y-1.5 mb-3">
                {s.actions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />{a}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <span className="text-amber-500 text-xs font-bold flex-shrink-0 mt-0.5">⚠ Trap:</span>
                <p className="text-xs text-amber-800">{s.trap}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
