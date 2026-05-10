import { Target, Layers, Users, Shield, Zap, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The 10/20/70 Rule',                   level: 2 },
  { id: 's2', title: 'AI-First vs AI-Enabled',              level: 2 },
  { id: 's3', title: 'Five CEO Priorities for AI',          level: 2 },
  { id: 's4', title: 'BCG X: The Build Capability Mandate', level: 2 },
  { id: 's5', title: 'Responsible AI as Competitive Moat',  level: 2 },
];

const RULE_BREAKDOWN = [
  {
    pct: '10%',
    label: 'Algorithm',
    color: 'bg-blue-600',
    width: 'w-[10%]',
    detail: 'The model, the prompt, the technical AI component. The part most organisations over-invest in and over-fixate on. Necessary but not sufficient — interchangeable between competitors within 6–12 months.',
    icon: Zap,
  },
  {
    pct: '20%',
    label: 'Data & Technology',
    color: 'bg-blue-400',
    width: 'w-[20%]',
    detail: 'Data pipelines, cloud infrastructure, APIs, integration with existing systems. The foundation that allows the algorithm to function in production. Often underestimated during planning; the source of most deployment delays.',
    icon: Layers,
  },
  {
    pct: '70%',
    label: 'People & Process',
    color: 'bg-slate-200',
    width: 'w-[70%]',
    detail: 'Business process redesign, change management, workforce reskilling, leadership alignment, culture. The hardest part. The part competitors cannot copy quickly. Where 70% of AI transformation value actually lives — and where 70% of enterprise AI programs fail.',
    icon: Users,
  },
];

const AI_FIRST_COMPARE = [
  {
    dim: 'Starting point',
    enabled: 'Add AI to existing processes',
    first: 'Redesign processes around AI capabilities',
  },
  {
    dim: 'Value target',
    enabled: 'Efficiency gains — doing the same things faster',
    first: 'New capabilities — doing things that were not previously possible',
  },
  {
    dim: 'Org design',
    enabled: 'AI team as a service to business units',
    first: 'AI embedded in every product, function, and workflow',
  },
  {
    dim: 'Data strategy',
    enabled: 'Data project per AI initiative',
    first: 'Enterprise data platform treated as core infrastructure',
  },
  {
    dim: 'Investment horizon',
    enabled: '12–18 month payback expected per initiative',
    first: '3–5 year transformation with compounding returns',
  },
  {
    dim: 'Value captured',
    enabled: 'Baseline',
    first: '3–5× more value than AI-Enabled peers (BCG, 2024)',
  },
];

const CEO_PRIORITIES = [
  {
    n: '01',
    title: 'Set an ambition proportional to the AI opportunity',
    detail: 'Most CEOs treat AI as a cost program. Leaders treat it as a growth and reinvention program. BCG research shows that setting bold, board-level AI ambitions — not incremental efficiency targets — is the single strongest predictor of value capture. The companies capturing the most AI value set their targets by asking "what could we do if we were starting this business today with AI available from day one?" rather than "how much can we save?"',
    exec: 'Define a 3-year AI ambition in revenue and capability terms, not just cost reduction percentages.',
  },
  {
    n: '02',
    title: 'Build AI into core products and business model, not just operations',
    detail: 'The highest-value AI applications embed AI into what customers pay for — AI-enhanced products, AI-powered services, AI-driven experiences. Operational AI (automating internal processes) captures a fraction of the value of strategic AI. BCG finds that companies with AI in core products/services generate 3–5× more value than those using AI for efficiency only.',
    exec: 'Map your product portfolio: where can AI become a feature, not a back-office tool?',
  },
  {
    n: '03',
    title: 'Treat data as infrastructure — not a project',
    detail: 'Every AI initiative that hits a data problem reflects a governance failure, not an IT problem. World-class AI companies treat their data platform with the same permanence as their cloud infrastructure — funded from capex, run by a named executive, with a 5-year roadmap. They do not launch data projects per AI use case.',
    exec: 'Appoint a Chief Data Officer with P&L accountability, not just a technology remit.',
  },
  {
    n: '04',
    title: 'Rewire the organisation around AI workflows',
    detail: 'The 70% of AI value that lives in people and process requires structural change. This means redesigning job roles, retraining at scale, changing incentive structures, and measuring AI adoption as a business KPI. Companies that treat AI as a technology deployment — rather than a business transformation — leave the majority of available value on the table.',
    exec: 'Tie at least 30% of business unit leader bonuses to AI adoption and productivity metrics.',
  },
  {
    n: '05',
    title: 'Lead on responsible AI before regulators force you to',
    detail: 'BCG\'s research shows that enterprises with mature responsible AI (RAI) frameworks deploy AI 40% faster, with fewer pauses for incident investigation or regulatory review. Proactive governance is a speed advantage, not a compliance burden. Companies that wait for regulation are already operating at a disadvantage by the time it arrives.',
    exec: 'Fund an RAI program before any incident, not in response to one.',
  },
];

const BCG_X_POINTS = [
  { point: 'Advisory alone is insufficient', detail: 'BCG launched BCG X — its tech build and design unit — because strategy without execution capability is becoming obsolete. The same logic applies to enterprise AI: external advice must be backed by internal build capacity.' },
  { point: 'The "build muscle" is a strategic asset', detail: 'Enterprises that build internal AI engineering capability compound. Each AI product built creates proprietary data, institutional knowledge, and faster iteration cycles. Enterprises that outsource all AI build remain dependent on vendors indefinitely.' },
  { point: 'Platform thinking before use cases', detail: 'BCG X finds that companies that build a shared AI platform (model access, data pipelines, evaluation frameworks) before scaling use cases deploy 3× faster and at 60% of the cost of companies building each use case independently.' },
  { point: 'The modern CTO mandate', detail: 'The CTO role has shifted from infrastructure management to AI product leadership. CTOs who cannot articulate the build vs. buy decision for each AI capability — and own the roadmap — are misaligned with where enterprise value creation is moving.' },
];

const RAI_BENEFITS = [
  { metric: '40%', label: 'faster AI deployment in enterprises with mature RAI frameworks', source: 'BCG, 2024' },
  { metric: '2.3×', label: 'higher user trust scores for AI systems with explainability built in', source: 'BCG, 2024' },
  { metric: '61%', label: 'of AI incidents that caused reputational damage were preventable with existing governance tools', source: 'BCG, 2024' },
];

export default function ConsultBCG() {
  return (
    <PageWrapper
      badge="Executive Insights · BCG"
      title="AI Strategy: The BCG Perspective"
      subtitle="Boston Consulting Group's core frameworks for enterprise AI — how the world's leading companies are capturing AI value, and why most are not."
      sections={SECTIONS}
    >
      <div className="card bg-slate-800 text-white border-0 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">BCG research finding, 2024</p>
        <p className="text-2xl font-extrabold text-white mb-1">Only 4% of companies</p>
        <p className="text-slate-300 text-sm">have achieved full AI scale — despite 85% reporting active AI programs. The gap is not technology. It is strategy, organisation, and execution discipline.</p>
      </div>

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The 10/20/70 Rule</h2>
        <p className="text-slate-500 text-sm mb-6">BCG's most cited AI framework: how the value of an AI transformation actually breaks down across its three components. The distribution has held consistent across hundreds of enterprise AI programs.</p>
        <div className="space-y-4">
          {RULE_BREAKDOWN.map((r) => {
            const RIcon = r.icon;
            return (
              <div key={r.label} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${r.label === 'People & Process' ? 'bg-slate-100' : 'bg-blue-50'}`}>
                    <RIcon size={20} className={r.label === 'People & Process' ? 'text-slate-500' : 'text-blue-600'} />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-slate-800">{r.pct}</p>
                    <p className="text-sm font-semibold text-slate-600">{r.label}</p>
                  </div>
                  <div className="flex-1 ml-2">
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${r.color} ${r.width}`} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{r.detail}</p>
              </div>
            );
          })}
        </div>
        <div className="card bg-amber-50 border-amber-200 mt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800"><strong>The executive implication:</strong> If your AI program budget allocates more than 30% to technology and data combined, your investment is skewed toward the component that produces 30% of the value. Rebalance toward change management, reskilling, and process redesign — or expect underperformance relative to investment.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">AI-First vs AI-Enabled</h2>
        <p className="text-slate-500 text-sm mb-6">BCG draws a sharp distinction between companies that bolt AI onto existing operations (AI-Enabled) and those that redesign their business model around AI capabilities (AI-First). The value gap between the two approaches is 3–5×.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 w-32">Dimension</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 bg-slate-50 rounded-tl-lg">AI-Enabled</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-blue-700 bg-blue-50 rounded-tr-lg">AI-First</th>
              </tr>
            </thead>
            <tbody>
              {AI_FIRST_COMPARE.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 px-3 text-xs font-semibold text-slate-600">{row.dim}</td>
                  <td className="py-2.5 px-3 text-xs text-slate-500 bg-slate-50">{row.enabled}</td>
                  <td className={`py-2.5 px-3 text-xs bg-blue-50 ${i === AI_FIRST_COMPARE.length - 1 ? 'text-blue-800 font-bold' : 'text-blue-700'}`}>{row.first}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Five CEO Priorities for AI</h2>
        <p className="text-slate-500 text-sm mb-6">BCG's research across 1,500+ organisations identifies five decisions that separate CEOs who capture material AI value from those who manage expensive pilots.</p>
        <div className="space-y-4">
          {CEO_PRIORITIES.map((p) => (
            <div key={p.n} className="card">
              <div className="flex items-start gap-4">
                <span className="text-3xl font-extrabold text-slate-100 leading-none flex-shrink-0 font-mono">{p.n}</span>
                <div>
                  <p className="font-bold text-slate-800 mb-2">{p.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{p.detail}</p>
                  <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <strong>Executive action:</strong> {p.exec}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">BCG X: The Build Capability Mandate</h2>
        <p className="text-slate-500 text-sm mb-6">BCG launched BCG X — its technology build and design unit — in recognition that strategy consulting without engineering execution capability is increasingly insufficient. The enterprise lesson is the same: AI ambition without internal build muscle is a strategy that cannot compound.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {BCG_X_POINTS.map((x) => (
            <div key={x.point} className="card">
              <div className="flex items-start gap-2 mb-2">
                <Target size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-slate-800">{x.point}</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{x.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Responsible AI as Competitive Moat</h2>
        <p className="text-slate-500 text-sm mb-6">BCG's research challenges the common executive view of responsible AI (RAI) as a compliance overhead. Organisations with mature RAI frameworks deploy AI faster, with higher adoption rates and lower incident-driven pauses. Governance is a speed advantage, not a brake.</p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {RAI_BENEFITS.map((m) => (
            <div key={m.metric} className="card text-center">
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{m.metric}</p>
              <p className="text-xs text-slate-500 leading-tight mb-2">{m.label}</p>
              <p className="text-xs font-semibold text-slate-400">{m.source}</p>
            </div>
          ))}
        </div>
        <div className="card border-2 border-blue-100">
          <p className="text-sm font-semibold text-slate-800 mb-3">BCG's five responsible AI principles (enterprise implementation)</p>
          <div className="space-y-2">
            {[
              { p: 'Fairness', d: 'Bias testing on every model touching people decisions before and after deployment. Demographic parity reporting included in model cards.' },
              { p: 'Explainability', d: 'Every production AI decision that affects a customer, employee, or supplier must have a human-readable explanation path. Not optional.' },
              { p: 'Reliability', d: 'Drift monitoring, fallback mechanisms, and defined confidence thresholds for every production model. No "set and forget" deployments.' },
              { p: 'Privacy', d: 'Data minimisation by design. No personal data used in model training without explicit legal basis and data subject notification.' },
              { p: 'Security', d: 'Red-teaming and adversarial testing for LLMs before production. Prompt injection defences. Vendor security certifications as procurement requirement.' },
            ].map(({ p, d }) => (
              <div key={p} className="flex gap-3 items-start">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span className="text-xs font-bold text-slate-700 w-24">{p}</span>
                </div>
                <span className="text-xs text-slate-500">{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card bg-blue-900 text-white border-0 mt-4">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">BCG bottom line</p>
          <p className="text-sm text-slate-200 leading-relaxed">The enterprises that will dominate in five years are not the ones that move fastest on AI today. They are the ones building AI-First operating models, developing internal build capability, and embedding responsible governance — while their competitors are still running pilots and waiting for technology costs to fall.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
