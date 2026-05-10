import { TrendingUp, AlertTriangle, CheckCircle2, XCircle, Target, BarChart2, Layers, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The AI Value Realisation Gap',        level: 2 },
  { id: 's2', title: 'The AI-Ready Assessment',             level: 2 },
  { id: 's3', title: 'Full Potential AI: Operating Model',  level: 2 },
  { id: 's4', title: 'Where AI Creates Enterprise Value',   level: 2 },
  { id: 's5', title: 'What Successful Adopters Do Differently', level: 2 },
];

const GAP_CAUSES = [
  {
    cause: 'Poor use case selection',
    detail: 'Organisations pick AI use cases based on technical feasibility, not business value. The result is a portfolio of working AI systems that nobody cares about. Bain\'s research finds that the top quartile of value-creating use cases generates 80% of total program ROI — most companies never find them because they start with what\'s easy, not what matters.',
    pct: '47%',
    pctLabel: 'of enterprise AI failures Bain attributes to wrong use case selection',
  },
  {
    cause: 'Technology-led rather than business-led programs',
    detail: 'When the AI program is owned by IT or a central AI team, it optimises for technical performance — model accuracy, inference speed, deployment throughput. When it is owned by the business, it optimises for revenue impact, customer outcome, and margin. The difference in value capture between these two approaches is 3–4× in Bain\'s research.',
    pct: '61%',
    pctLabel: 'of enterprise AI programs are primarily IT-led, not business-led',
  },
  {
    cause: 'Inadequate change management investment',
    detail: 'The single most consistent finding in Bain\'s post-mortem analysis of failed AI programs: organisations invest 10–20× more in technology than in the people change required to make that technology work. AI tools that are not embedded in daily workflows have zero business value. Adoption is not automatic — it is managed.',
    pct: '73%',
    pctLabel: 'of AI value is dependent on process and behaviour change, not the model',
  },
  {
    cause: 'Measuring the wrong things',
    detail: 'Pilot programs are declared successful based on technical metrics (accuracy, latency, uptime). Production programs are evaluated on adoption metrics (active users, sessions). Neither metric captures what boards and investors care about: revenue, margin, customer satisfaction, and competitive position. The absence of business measurement makes it impossible to prioritise investment or prove value.',
    pct: '82%',
    pctLabel: 'of AI programs Bain audited had no business outcome measurement framework at launch',
  },
];

const AI_READY_DIMS = [
  {
    dim: 'Data',
    score_q: 'Can you access clean, governed, labelled data for your priority use cases within 2 weeks?',
    gap_impact: 'High',
    actions: ['Audit data quality by use case domain', 'Establish data stewardship by business function', 'Build data pipelines before model development, not after'],
  },
  {
    dim: 'Technology',
    score_q: 'Is your infrastructure cloud-native, API-first, and capable of serving real-time model inference at production scale?',
    gap_impact: 'Medium',
    actions: ['Assess cloud migration status of core systems', 'Standardise ML platform (MLflow, SageMaker, Azure ML)', 'Define production infrastructure requirements early — not post-pilot'],
  },
  {
    dim: 'Talent',
    score_q: 'Do you have ≥10 ML engineers, data scientists, and AI product managers? Can your broader workforce use AI tools?',
    gap_impact: 'High',
    actions: ['Hire at least one senior ML engineer before the first production deployment', 'Launch AI literacy program for all knowledge workers', 'Identify and develop internal AI champions in each business unit'],
  },
  {
    dim: 'Operating Model',
    score_q: 'Are AI use cases owned by business leaders with P&L accountability — not just IT sponsors?',
    gap_impact: 'Very High',
    actions: ['Assign a named business owner to every AI initiative', 'Create cross-functional AI squads (business + data + engineering)', 'Remove the handoff between IT and business — they must work together'],
  },
  {
    dim: 'Culture',
    score_q: 'Are experimentation and failure tolerated? Do leaders model AI tool usage?',
    gap_impact: 'Medium',
    actions: ['CEOs and executives should visibly use AI tools — behaviour is permission', 'Reward teams that run fast experiments, even when they fail', 'Celebrate AI use cases that fail fast and generate learning'],
  },
];

const VALUE_TYPES = [
  {
    type: 'Productivity',
    icon: BarChart2,
    headline: '15–30% knowledge worker productivity gains',
    color: 'border-l-blue-400',
    detail: 'The most measurable and fastest-to-realise AI value. Time saved on research, drafting, analysis, and routine decision-making. Bain typically models this as 15% in Year 1 rising to 25–30% by Year 3 as AI tools mature and workers develop fluency. Baseline: Bain client portfolio, 2024.',
    examples: ['LLM-assisted financial modelling: 40% faster report production', 'AI-generated first draft contracts: 50% reduction in drafting time', 'Automated market research synthesis: 8× throughput'],
  },
  {
    type: 'Revenue Growth',
    icon: TrendingUp,
    headline: '5–15% revenue uplift in AI-augmented commercial functions',
    color: 'border-l-emerald-400',
    detail: 'AI applied to commercial functions — pricing, sales outreach, campaign optimisation, product recommendations — generates measurable revenue uplift. Bain finds this takes longer to realise (12–24 months to model and deploy at scale) but generates higher NPV than productivity gains because it compounds.',
    examples: ['ML dynamic pricing: 4–8% revenue uplift (retail, travel)', 'LLM-personalised outreach: 40–50% pipeline conversion improvement', 'AI recommendation engines: 10–30% basket size increase (e-commerce)'],
  },
  {
    type: 'Risk Reduction',
    icon: AlertTriangle,
    headline: '20–40% reduction in fraud, compliance, and quality losses',
    color: 'border-l-amber-400',
    detail: 'AI in risk functions reduces losses from fraud, regulatory non-compliance, product quality failures, and supplier risk events. Bain highlights this as underinvested relative to its financial impact — particularly in financial services, manufacturing, and pharma, where losses from undetected risk events dwarf AI investment costs.',
    examples: ['ML fraud detection: 25–40% fraud loss reduction (financial services)', 'CV quality control: 30% defect escape rate reduction (manufacturing)', 'NLP contract risk flagging: 50% reduction in missed obligations'],
  },
  {
    type: 'Customer Experience',
    icon: Target,
    headline: 'NPS improvement of 8–20 points in AI-enhanced customer journeys',
    color: 'border-l-purple-400',
    detail: 'AI-powered personalisation, faster resolution, and proactive service create measurable NPS and CSAT improvements. Bain\'s research links superior CX to 4–8× higher customer lifetime value — making CX-focused AI investments high-NPV even with modest adoption metrics.',
    examples: ['AI deflection + agent assist: 35% reduction in cost-per-contact', 'Personalised recommendations: 15% increase in repeat purchase rate', 'Proactive churn outreach: 20–25% retention improvement on flagged cohorts'],
  },
];

const DIFFERENTIATORS = [
  { practice: 'Start with the business problem — not the technology', detail: 'Successful adopters define the outcome they want to move (revenue, cost, risk, NPS) before selecting any AI approach. "We want to use LLMs" is not a strategy. "We want to reduce our cost-per-contact by 30% while maintaining a CSAT above 4.2" is a strategy that AI can serve.' },
  { practice: 'Build for scale from day one — pilots that are designed to stay pilots, will', detail: 'Bain finds that pilots designed without production architecture, governance, and business ownership never scale. The discipline of building as if you are already at scale — even at pilot stage — is what separates the 11% who scale from the 89% who don\'t.' },
  { practice: 'Measure business outcomes, not AI metrics', detail: 'Model accuracy, inference latency, and API uptime are engineering metrics, not business metrics. Business metrics are revenue per customer, cost per resolution, time-to-close, and defect rate. Every AI initiative must have a defined business metric it is accountable for before it receives funding.' },
  { practice: 'Invest in change management proportional to technology investment', detail: 'The rule Bain recommends: for every dollar spent on AI technology, spend 50 cents on change management — training, communication, process redesign, and incentive alignment. Most organisations spend 5 cents.' },
  { practice: 'Establish AI ownership at business unit level — not just in the AI team', detail: 'The AI team builds. The business owns. Every production AI system must have a named business owner who is accountable for its outcomes, who sits in the business, and who has the authority to shut it down if it stops performing. This is not optional governance; it is the operational structure that makes AI programs deliver.' },
];

export default function ConsultBain() {
  return (
    <PageWrapper
      badge="Executive Insights · Bain"
      title="Capturing AI Value: The Bain Framework"
      subtitle="Bain & Company's research on why most enterprises fail to capture AI value — and the five practices that separate the 11% who do."
      sections={SECTIONS}
    >
      <div className="card bg-slate-800 text-white border-0 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bain & Company research, 2024</p>
        <p className="text-2xl font-extrabold text-white mb-1">Only 11% of companies</p>
        <p className="text-slate-300 text-sm">successfully scale AI beyond the pilot stage — despite 74% of executives saying AI will significantly change their industry within 3 years. The bottleneck is not technology. It is strategy, operating model, and execution discipline.</p>
      </div>

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The AI Value Realisation Gap</h2>
        <p className="text-slate-500 text-sm mb-6">Bain's most important AI finding: the gap between investment and value capture is not explained by technology failure. It is explained by four systematic management failures, each measurable and preventable.</p>
        <div className="space-y-4">
          {GAP_CAUSES.map((g) => (
            <div key={g.cause} className="card">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-center flex-shrink-0">
                  <p className="text-2xl font-extrabold text-red-500">{g.pct}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm mb-0.5">{g.cause}</p>
                  <p className="text-xs text-slate-400">{g.pctLabel}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{g.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">The AI-Ready Assessment</h2>
        <p className="text-slate-500 text-sm mb-6">Bain's five-dimension readiness model. Organisations that rate highly on all five dimensions are 4× more likely to scale AI successfully. Most organisations have pockets of strength and significant gaps — the gaps predict where programs will stall.</p>
        <div className="space-y-3">
          {AI_READY_DIMS.map((d) => (
            <div key={d.dim} className="card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Layers size={15} className="text-blue-600" />
                  <p className="font-bold text-slate-800 text-sm">{d.dim}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.gap_impact === 'Very High' ? 'bg-red-100 text-red-700' : d.gap_impact === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  Gap impact: {d.gap_impact}
                </span>
              </div>
              <p className="text-xs text-slate-500 italic mb-2 pl-6">"{d.score_q}"</p>
              <div className="pl-6 space-y-1">
                {d.actions.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <ArrowRight size={11} className="text-blue-400 flex-shrink-0 mt-0.5" />{a}
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
        <h2 className="mb-4">Full Potential AI: Operating Model</h2>
        <p className="text-slate-500 text-sm mb-6">Bain's "Full Potential" framework challenges enterprises to capture 100% of the AI value available to them — not the easy 20% that comes from productivity tools. Full Potential AI requires a different operating model structure from traditional IT-led deployment.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Use case selection', wrong: 'IT or AI team identifies technically feasible use cases', right: 'Business units identify highest-value problems; AI team assesses feasibility' },
            { label: 'Program ownership', wrong: 'CTO or AI centre of excellence owns all AI programs', right: 'Named business leader owns each AI initiative with P&L accountability' },
            { label: 'Success measurement', wrong: 'Technical KPIs: accuracy, uptime, deployment speed', right: 'Business KPIs: revenue, cost, NPS, margin — measured before and after' },
            { label: 'Change management', wrong: 'Training delivered after deployment — "here\'s how to use the new tool"', right: 'Change program runs in parallel with technology build from day one' },
            { label: 'Funding model', wrong: 'Project-based funding per pilot; scaling requires new business case', right: 'Platform-based funding for AI infrastructure; use cases funded within the platform' },
            { label: 'Talent model', wrong: 'Central AI team does all AI work; business units are customers', right: 'Central team sets standards; embedded AI leads drive adoption in each function' },
          ].map(r => (
            <div key={r.label} className="card">
              <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">{r.label}</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 rounded-lg px-2.5 py-2">
                  <XCircle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />{r.wrong}
                </div>
                <div className="flex items-start gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-2.5 py-2">
                  <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />{r.right}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Where AI Creates Enterprise Value</h2>
        <p className="text-slate-500 text-sm mb-6">Bain's taxonomy of enterprise AI value — four categories with distinct investment horizons, measurement approaches, and risk profiles.</p>
        <div className="space-y-4">
          {VALUE_TYPES.map((v) => {
            const VIcon = v.icon;
            return (
              <div key={v.type} className={`card border-l-4 ${v.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-xl bg-slate-100 flex-shrink-0">
                    <VIcon size={16} className="text-slate-600" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{v.type}</p>
                    <p className="text-xs font-semibold text-blue-700">{v.headline}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{v.detail}</p>
                <div className="space-y-1">
                  {v.examples.map((e, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                      <ArrowRight size={11} className="text-blue-400 flex-shrink-0 mt-0.5" />{e}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">What Successful Adopters Do Differently</h2>
        <p className="text-slate-500 text-sm mb-6">Bain's analysis of the 11% of enterprises that successfully scale AI identifies five consistent practices. None are technical. All are strategic and organisational.</p>
        <div className="space-y-3">
          {DIFFERENTIATORS.map((d, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-extrabold text-slate-100 leading-none flex-shrink-0 font-mono">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm mb-1">{d.practice}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{d.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-blue-900 text-white border-0 mt-6">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Bain bottom line</p>
          <p className="text-sm text-slate-200 leading-relaxed">The AI value realisation gap is not a technology problem. It is a management problem. The enterprises closing that gap are not the ones with the most sophisticated models — they are the ones with the clearest business ownership, the most rigorous outcome measurement, and the most disciplined approach to change. The technology is the easy part.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
