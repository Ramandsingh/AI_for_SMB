import { Shield, Users, AlertTriangle, TrendingUp, CheckCircle2, XCircle, BarChart2, Layers } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'State of GenAI in the Enterprise',   level: 2 },
  { id: 's2', title: 'The Technology Trust Paradox',       level: 2 },
  { id: 's3', title: 'Four Enterprise Adopter Types',      level: 2 },
  { id: 's4', title: 'Workforce Transformation at Scale',  level: 2 },
  { id: 's5', title: 'The Governance Imperative',          level: 2 },
];

const SURVEY_FINDINGS = [
  { stat: '79%', label: 'of executives say GenAI will significantly change their organisation within 3 years', source: 'Deloitte AI Institute, 2024' },
  { stat: '2×', label: 'higher productivity gains reported by early adopters vs. followers', source: 'Deloitte AI Institute, 2024' },
  { stat: '39%', label: 'of all work hours could be augmented by GenAI at current technology levels', source: 'Deloitte, 2024' },
  { stat: '22%', label: 'of enterprises have "substantial" AI governance in place — the critical gap', source: 'Deloitte AI Institute, 2024' },
];

const ADOPTION_TREND = [
  { year: '2022', pct: 24, label: 'Regular GenAI use in enterprise' },
  { year: '2023 Q1', pct: 33, label: 'Regular GenAI use in enterprise' },
  { year: '2023 Q4', pct: 47, label: 'Regular GenAI use in enterprise' },
  { year: '2024 Q2', pct: 61, label: 'Regular GenAI use in enterprise' },
  { year: '2024 Q4', pct: 74, label: 'Regular GenAI use in enterprise' },
];

const TRUST_GAPS = [
  { group: 'C-suite executives', trust: 61, color: 'bg-blue-600', label: '"Highly trust" AI outputs' },
  { group: 'Middle management', trust: 44, color: 'bg-blue-400', label: '"Highly trust" AI outputs' },
  { group: 'Frontline knowledge workers', trust: 38, color: 'bg-blue-200', label: '"Highly trust" AI outputs' },
  { group: 'Customer-facing employees', trust: 29, color: 'bg-slate-200', label: '"Highly trust" AI outputs' },
];

const TRUST_CAUSES = [
  { cause: 'Executives make strategic decisions with AI outputs at a high level of abstraction — errors are harder to detect', mitigant: 'Build feedback loops from frontline to leadership on AI error rates. Include frontline workers in AI evaluation processes.' },
  { cause: 'Frontline workers see AI errors directly and personally — they have learned its failure modes', mitigant: 'Use frontline feedback as a quality signal, not a resistance problem. Workers who flag errors are improving the system.' },
  { cause: 'AI confidence-calibration is poor — it presents incorrect outputs with the same confidence as correct ones', mitigant: 'Require uncertainty quantification for high-stakes AI outputs. "I don\'t know" is a valid, valuable AI response.' },
];

const ADOPTER_TYPES = [
  {
    type: 'Pacesetters',
    share: '14%',
    color: 'bg-emerald-600 text-white',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    characteristics: [
      'Full GenAI integration across core business functions',
      'Significant, measured ROI with board-level reporting',
      'Strong AI governance frameworks in place before scaling',
      'AI literacy training for 50%+ of workforce',
      'Named AI executives with cross-functional mandate',
    ],
    roi: 'Reporting 20–30% productivity gains and measurable revenue impact',
  },
  {
    type: 'Explorers',
    share: '28%',
    color: 'bg-blue-600 text-white',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    characteristics: [
      'Active GenAI pilots across multiple functions',
      'Growing investment, increasing executive attention',
      'Limited scaling infrastructure — each pilot is independent',
      'Governance developing, not yet enterprise-wide',
      'AI talent concentrated in IT; business units building capability',
    ],
    roi: 'Reporting productivity wins in pilots but limited enterprise-level impact',
  },
  {
    type: 'Followers',
    share: '35%',
    color: 'bg-amber-500 text-white',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    characteristics: [
      'Cautious adoption — few pilots, governance-first approach',
      'Waiting for technology to mature or regulation to clarify',
      'AI investment below industry average as % of revenue',
      'Risk aversion driven by regulatory and reputational concerns',
      'No enterprise AI strategy — function-level experimentation only',
    ],
    roi: 'Minimal AI impact. At risk of falling permanently behind sector leaders',
  },
  {
    type: 'Bystanders',
    share: '23%',
    color: 'bg-slate-500 text-white',
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    characteristics: [
      'Minimal or no GenAI investment',
      'Watching sector developments; no AI strategy',
      'Leadership does not view AI as a near-term priority',
      'Typically SMBs, highly regulated industries, or organisations with very high technical debt',
      'Significant catch-up investment required to reach Explorer status',
    ],
    roi: 'No AI impact. Vulnerability to disruption increasing quarterly',
  },
];

const WORKFORCE_FINDINGS = [
  {
    finding: 'AI augments, not replaces — in the near term',
    detail: 'Deloitte\'s workforce research finds that across 15 industries, AI primarily augments existing roles rather than eliminating them over a 3-year horizon. The roles most transformed are knowledge-intensive roles — analysts, lawyers, finance professionals, engineers — not manual or trade roles. The transformation is scope expansion, not headcount reduction.',
    stat: '39% of tasks across all knowledge worker roles are candidates for GenAI augmentation',
  },
  {
    finding: 'The reskilling investment gap is the biggest workforce risk',
    detail: 'Deloitte finds that enterprises spend 3× more on AI technology than on the workforce development required to make that technology deliver value. This is the primary driver of low AI adoption rates in deployed systems. Tools that no one uses have zero ROI.',
    stat: 'Only 32% of organisations have a formal AI reskilling program for knowledge workers',
  },
  {
    finding: 'AI users report higher satisfaction, not lower',
    detail: 'Contrary to the common narrative that AI threatens job satisfaction, Deloitte\'s worker surveys find that employees who actively use AI tools report 18% higher job satisfaction, 23% higher engagement scores, and significantly lower intention to leave. The mechanism: AI removes the routine tasks workers find least meaningful, freeing them for higher-value work.',
    stat: 'Workers using AI tools daily report 18% higher job satisfaction vs. non-users',
  },
  {
    finding: 'AI anxiety is highest among workers who have not used AI yet',
    detail: 'Deloitte finds an inverse relationship between AI exposure and AI anxiety. Workers who have never used AI tools are 3× more anxious about AI\'s impact on their role than workers who use AI daily. The implication: the fastest and cheapest way to reduce AI resistance is to give people hands-on access to AI tools, not to manage the change communication more carefully.',
    stat: 'Non-users are 3× more anxious about AI than daily users — exposure is the cure',
  },
];

const GOV_ELEMENTS = [
  { element: 'Board-level AI literacy', current: '28%', target: '80%', gap: 'Critical', detail: 'Deloitte finds a 0.67 correlation between board AI literacy and enterprise AI ROI. Boards that cannot interrogate AI risk reports cannot govern AI programs effectively.' },
  { element: 'Enterprise AI policy', current: '41%', target: '100%', gap: 'High', detail: 'Acceptable use policies covering employee GenAI use, data handling, vendor procurement, and output verification. Without this, every employee is making governance decisions individually.' },
  { element: 'Model inventory', current: '34%', target: '100%', gap: 'High', detail: 'A register of every AI model in production: owner, use case, risk tier, performance metrics, last validation date. Without a complete inventory, governance is impossible.' },
  { element: 'AI incident response plan', current: '29%', target: '100%', gap: 'Critical', detail: 'A defined process for when an AI system produces harmful, discriminatory, or factually incorrect outputs at scale. The enterprises that do not have this plan discover they need it at the worst possible moment.' },
  { element: 'Third-party AI vendor due diligence', current: '47%', target: '100%', gap: 'Medium', detail: 'Requirements for AI vendors: data processing agreements, model cards, security certifications, bias testing documentation, right to audit. Without this, the enterprise inherits the vendor\'s AI risks.' },
];

export default function ConsultDeloitte() {
  return (
    <PageWrapper
      badge="Executive Insights · Deloitte"
      title="AI at Scale: Trust, Governance & Workforce"
      subtitle="Deloitte AI Institute's research on the governance gap, the trust paradox, and what distinguishes enterprises building durable AI capability from those accumulating AI debt."
      sections={SECTIONS}
    >
      <div className="card bg-slate-800 text-white border-0 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Deloitte AI Institute, 2024</p>
        <p className="text-2xl font-extrabold text-white mb-1">The governance gap is widening</p>
        <p className="text-slate-300 text-sm">GenAI adoption is accelerating faster than governance infrastructure. The enterprises that will face the most serious AI incidents in 2025–2026 are those deploying at scale today without the governance frameworks that make deployment safe and trustworthy.</p>
      </div>

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">State of GenAI in the Enterprise</h2>
        <p className="text-slate-500 text-sm mb-6">Deloitte's quarterly State of Generative AI in the Enterprise survey tracks adoption, governance readiness, and ROI across 2,000+ global enterprises. Key findings from the 2024 research programme.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {SURVEY_FINDINGS.map(s => (
            <div key={s.stat} className="card text-center">
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{s.stat}</p>
              <p className="text-xs text-slate-500 leading-tight mb-2">{s.label}</p>
              <p className="text-xs font-semibold text-slate-400">{s.source}</p>
            </div>
          ))}
        </div>
        <div className="card mb-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">Enterprise GenAI adoption rate (% regularly using GenAI)</p>
          <div className="space-y-2">
            {ADOPTION_TREND.map((t) => (
              <div key={t.year} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-16 flex-shrink-0">{t.year}</span>
                <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${t.pct}%` }}
                  >
                    <span className="text-xs text-white font-bold">{t.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Source: Deloitte AI Institute quarterly survey, 2022–2024</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">The Technology Trust Paradox</h2>
        <p className="text-slate-500 text-sm mb-6">Deloitte's most counterintuitive finding: executives trust AI significantly more than frontline workers — despite frontline workers having direct, daily exposure to AI outputs and their errors. This trust gap is a structural risk to AI adoption programs.</p>
        <div className="space-y-2 mb-6">
          {TRUST_GAPS.map((t) => (
            <div key={t.group} className="card py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600 w-44 flex-shrink-0">{t.group}</span>
                <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.trust}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-700 w-10 text-right flex-shrink-0">{t.trust}%</span>
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-400 text-right">% who "highly trust" AI outputs for their work — Deloitte, 2024</p>
        </div>
        <div className="space-y-3">
          {TRUST_CAUSES.map((c, i) => (
            <div key={i} className="card">
              <p className="text-sm text-slate-700 mb-2 leading-relaxed"><strong className="text-slate-800">Why it happens:</strong> {c.cause}</p>
              <p className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2"><strong>Mitigation:</strong> {c.mitigant}</p>
            </div>
          ))}
        </div>
        <div className="card bg-amber-50 border-amber-200 mt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800"><strong>The adoption risk:</strong> When executives mandate AI adoption based on their high trust levels, and frontline workers resist based on their low trust, the resulting conflict is framed as culture resistance. It is actually a rational disagreement about AI reliability based on direct experience. Resolve it by closing the trust gap — not by overriding the resistance.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Four Enterprise Adopter Types</h2>
        <p className="text-slate-500 text-sm mb-6">Deloitte's segmentation of enterprise GenAI adopters into four distinct profiles. The distribution matters: 58% of large enterprises are currently Followers or Bystanders — the cohort most at risk of being permanently disadvantaged by sector leaders who are already scaling.</p>
        <div className="space-y-4">
          {ADOPTER_TYPES.map((a) => (
            <div key={a.type} className={`card border-2 ${a.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${a.color}`}>{a.type}</span>
                <span className="text-2xl font-extrabold text-slate-200">{a.share}</span>
                <span className="text-xs text-slate-400">of large enterprises</span>
              </div>
              <ul className="space-y-1 mb-3">
                {a.characteristics.map((c, i) => (
                  <li key={i} className={`flex items-start gap-2 text-xs ${a.bg} rounded px-2 py-1`}>
                    <span className="text-slate-400 flex-shrink-0 mt-0.5">→</span>
                    <span className="text-slate-700">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-slate-600 bg-slate-50 rounded px-2 py-1.5">{a.roi}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Workforce Transformation at Scale</h2>
        <p className="text-slate-500 text-sm mb-6">Deloitte's workforce research directly challenges several dominant narratives about AI and employment. The findings have significant implications for how executives communicate about AI, design change programs, and allocate investment between technology and people.</p>
        <div className="space-y-4">
          {WORKFORCE_FINDINGS.map((w) => (
            <div key={w.finding} className="card">
              <div className="flex items-start gap-3 mb-2">
                <Users size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="font-bold text-slate-800 text-sm">{w.finding}</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3 pl-6">{w.detail}</p>
              <p className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 ml-6">{w.stat}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">The Governance Imperative</h2>
        <p className="text-slate-500 text-sm mb-6">Deloitte's governance research shows that organisations with strong AI governance frameworks deploy 2× more AI use cases than those without — because governance eliminates the ambiguity that causes teams to pause, escalate, or avoid AI altogether. Governance accelerates; its absence is the brake.</p>
        <div className="space-y-3">
          {GOV_ELEMENTS.map((g) => (
            <div key={g.element} className="card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-blue-600" />
                  <p className="text-sm font-bold text-slate-800">{g.element}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${g.gap === 'Critical' ? 'bg-red-100 text-red-700' : g.gap === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {g.gap} gap
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Current adoption</span>
                    <span className="font-semibold text-slate-600">{g.current}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: g.current }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{g.detail}</p>
            </div>
          ))}
        </div>
        <div className="card bg-blue-900 text-white border-0 mt-6">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Deloitte bottom line</p>
          <p className="text-sm text-slate-200 leading-relaxed">The enterprises that will have the most significant AI-related incidents in the next 24 months are those scaling fastest without proportional governance investment. The enterprises that will generate the most durable AI value are those treating governance, trust, and workforce development as first-class investments — not afterthoughts. The race is not to deploy the most AI. It is to deploy the most AI sustainably.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
