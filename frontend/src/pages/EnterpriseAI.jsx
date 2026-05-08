import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'What Enterprises Are Doing with AI',   level: 2 },
  { id: 's2', title: 'Where the Value Lives',                level: 2 },
  { id: 's3', title: 'How to Adopt AI',                      level: 2 },
  { id: 's4', title: 'When to Adopt AI',                     level: 2 },
  { id: 's5', title: 'How to Measure Its Value',             level: 2 },
];

const ENTERPRISE_ACTIONS = [
  {
    area: 'Customer Operations',
    icon: '💬',
    color: 'bg-sky-50 border-sky-200',
    examples: [
      'AI-powered service agents resolving Tier-1 queries without human escalation',
      'Real-time sentiment analysis across call transcripts',
      'Automated case summarisation and CRM updates after every interaction',
    ],
    stat: '40% reduction in average handle time — McKinsey, 2024',
  },
  {
    area: 'Finance & Risk',
    icon: '📊',
    color: 'bg-emerald-50 border-emerald-200',
    examples: [
      'Continuous fraud detection across millions of transactions',
      'Automated variance commentary in monthly management packs',
      'AI-assisted contract review for financial terms and obligations',
    ],
    stat: '50% faster close cycles reported by early adopters — Gartner, 2024',
  },
  {
    area: 'Supply Chain',
    icon: '🔗',
    color: 'bg-amber-50 border-amber-200',
    examples: [
      'Demand forecasting that ingests weather, events, and market signals',
      'Supplier risk monitoring with automated early-warning alerts',
      'Route and inventory optimisation updated in real time',
    ],
    stat: '15–20% inventory cost reduction through AI-optimised planning — WEF, 2024',
  },
  {
    area: 'Knowledge Work & Productivity',
    icon: '⚡',
    color: 'bg-purple-50 border-purple-200',
    examples: [
      'Microsoft 365 Copilot deployed across 100,000+ seat enterprise rollouts',
      'AI-generated first drafts for proposals, reports, and presentations',
      'Meeting transcription, action item extraction, and automatic follow-up',
    ],
    stat: '70% of Copilot users report saving 1+ hours per week — Microsoft, 2024',
  },
  {
    area: 'HR & Talent',
    icon: '🧑‍💼',
    color: 'bg-rose-50 border-rose-200',
    examples: [
      'AI screening and ranking of applicants against role criteria',
      'Personalised onboarding pathways and learning recommendations',
      'Attrition prediction to flag at-risk employees before they resign',
    ],
    stat: '35% reduction in time-to-hire reported by AI-augmented talent teams — Deloitte, 2024',
  },
];

const VALUE_AREAS = [
  {
    label: 'Labour Leverage',
    icon: '⚡',
    desc: 'The same team produces more. Tasks that required dedicated headcount become automated or dramatically compressed. Typical impact: 20–40% time reclaimed on targeted workflows.',
    example: 'A 10-person ops team with AI-assisted processing handles the workload previously requiring 13–14.',
  },
  {
    label: 'Decision Speed',
    icon: '🚀',
    desc: 'Analytical cycles that took days now take hours. Real-time insight surfacing changes which decisions leaders can act on — and when.',
    example: 'Weekly forecasting reports replaced by live dashboards that update as data arrives.',
  },
  {
    label: 'Consistency at Scale',
    icon: '✅',
    desc: 'Every output reflects best practice, not the best performer\'s practice. Variance across the team collapses. Quality is no longer dependent on who handles a task.',
    example: 'Customer proposal quality is consistent across 30 sales reps, not dependent on top performers.',
  },
  {
    label: 'New Revenue Streams',
    icon: '💰',
    desc: 'AI-powered personalisation, product recommendations, and predictive upsell unlock revenue that human processes cannot capture at scale.',
    example: 'Retailers using AI-driven recommendations report 10–30% lift in average order value.',
  },
  {
    label: 'Risk Reduction',
    icon: '🛡️',
    desc: 'Fewer errors, better compliance, earlier anomaly detection. AI-automated audit trails reduce regulatory exposure and the cost of human mistakes.',
    example: 'Finance teams reduce reconciliation errors by 60–80% with AI-assisted matching.',
  },
  {
    label: 'Competitive Positioning',
    icon: '🏆',
    desc: 'Early movers build capability advantages that are hard for slow followers to replicate. AI literacy, data infrastructure, and trained models compound over time.',
    example: 'Organisations who started AI pilots in 2022–23 are now scaling; late movers are still in discovery.',
  },
];

const FRAMEWORKS = [
  {
    source: 'McKinsey Global Institute',
    subtitle: 'The State of AI — 2024 Global Survey',
    url: 'mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    color: 'border-l-blue-500',
    steps: [
      { step: '1', label: 'Value Mapping', desc: 'Identify the 3–5 workflows where AI can deliver the highest ROI relative to implementation complexity. Start narrow.' },
      { step: '2', label: 'Data Readiness', desc: 'Assess whether the data required for your use cases exists, is accessible, and is sufficiently clean. Fix gaps before building.' },
      { step: '3', label: 'Build Capability', desc: 'Invest in AI literacy across the organisation — not just technical teams. Business users who understand AI are the primary adoption lever.' },
      { step: '4', label: 'Pilot → Scale', desc: 'Run a 6–12 week proof of concept on one workflow. Measure rigorously. Only scale what produces verified outcomes.' },
    ],
    insight: '72% of organisations have adopted AI in at least one function in 2024, up from 50% in prior years. Productivity and cost reduction remain the top drivers.',
  },
  {
    source: 'Gartner',
    subtitle: 'AI Adoption and Risk Framework — 2024',
    url: 'gartner.com/en/topics/artificial-intelligence',
    color: 'border-l-emerald-500',
    steps: [
      { step: '1', label: 'Classify Use Cases', desc: 'Segment AI use cases by risk level and business impact. High-risk decisions (credit, hiring, medical) require different governance than low-risk automation.' },
      { step: '2', label: 'Establish Governance First', desc: 'Define who owns AI outputs, how errors are detected, and what the escalation path is. Governance unlocks speed — it doesn\'t slow it.' },
      { step: '3', label: 'Progressive Complexity', desc: 'Start with AI-assisted decisions (human in the loop), then move to AI-recommended, then AI-automated as trust and accuracy are established.' },
      { step: '4', label: 'Continuous Monitoring', desc: 'AI models drift as the world changes. Build ongoing monitoring into operations — not just deployment.' },
    ],
    insight: 'Gartner predicts enterprise AI software spend will reach $297B by 2027. Organisations without AI governance frameworks are 3x more likely to experience costly AI failures.',
  },
  {
    source: 'World Economic Forum',
    subtitle: 'Future of Jobs Report — AI Edition, 2025',
    url: 'weforum.org/reports/the-future-of-jobs-report-2025',
    color: 'border-l-purple-500',
    steps: [
      { step: '1', label: 'Lead with People Strategy', desc: 'The #1 barrier to AI adoption is not technology — it is workforce readiness. Invest in reskilling and change management before tooling.' },
      { step: '2', label: 'Human–AI Collaboration Model', desc: 'Design workflows where AI handles volume and pattern-matching; humans handle exceptions, judgment, and relationships.' },
      { step: '3', label: 'Inclusive Adoption', desc: 'AI benefits compound when adoption is organisation-wide, not siloed in a digital team. Frontline workers with AI tools outperform digital-team-only deployments.' },
      { step: '4', label: 'Track Jobs Transformation', desc: 'Map which roles are augmented, transformed, or displaced. Communicate openly and invest in transitions — this determines adoption velocity.' },
    ],
    insight: '85 million jobs may be displaced by AI by 2025, but 97 million new roles are emerging. Net positive — but only for organisations that actively manage the transition.',
  },
];

const READINESS_SIGNALS = [
  { signal: 'A specific, painful workflow exists that is repetitive and data-rich', ready: true },
  { signal: 'Leadership is visibly sponsoring the initiative — not just tolerating it', ready: true },
  { signal: 'A small, motivated team is willing to run a 6-week pilot', ready: true },
  { signal: 'Data for the use case exists, even if imperfect', ready: true },
  { signal: 'The organisation has tolerance for iteration — not expecting perfection on day one', ready: true },
  { signal: 'Waiting for a perfect use case before starting anything', ready: false },
  { signal: 'No executive sponsor — AI is owned only by IT or a mid-level team', ready: false },
  { signal: 'Data doesn\'t exist or is completely inaccessible for the target use case', ready: false },
  { signal: 'Expecting AI to solve a strategy problem rather than an execution one', ready: false },
];

const METRICS = [
  {
    level: 'Activity',
    icon: '🔧',
    color: 'bg-slate-50 border-slate-200',
    desc: 'What is the AI doing, and how accurately?',
    metrics: [
      'Tasks automated per week / month',
      'AI output accuracy rate (vs human-reviewed baseline)',
      'Error or exception rate requiring human correction',
      'Volume processed without human intervention',
    ],
  },
  {
    level: 'Productivity',
    icon: '⚡',
    color: 'bg-blue-50 border-blue-200',
    desc: 'What time and cost is the AI saving?',
    metrics: [
      'Hours saved per employee per week',
      'Cycle time reduction (e.g. days to hours on a workflow)',
      'Cost per transaction before vs after AI',
      'Headcount required for equivalent output',
    ],
  },
  {
    level: 'Business Outcome',
    icon: '📈',
    color: 'bg-emerald-50 border-emerald-200',
    desc: 'What business result did the AI contribute to?',
    metrics: [
      'Revenue influenced (e.g. AI-driven upsell lift)',
      'Customer satisfaction / NPS change',
      'Error-related cost avoidance (compliance, rework)',
      'Speed-to-market improvement on AI-supported processes',
    ],
  },
  {
    level: 'Strategic',
    icon: '🏆',
    color: 'bg-purple-50 border-purple-200',
    desc: 'Is AI building a durable competitive advantage?',
    metrics: [
      'AI literacy score across the organisation (% staff trained)',
      'Number of AI use cases in production vs pilot',
      'Time from use case identified to production deployment',
      'Data asset quality improvements over time',
    ],
  },
];

export default function EnterpriseAI() {
  return (
    <PageWrapper
      badge="Page 12 — Enterprise Context"
      title="Enterprise AI"
      subtitle="What the world's largest organisations are doing with AI, where the value comes from, and how to measure it — grounded in the top global research frameworks."
      sections={SECTIONS}
    >

      {/* ── S1: What enterprises are doing ─────────────────────── */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">What Enterprises Are Doing with AI</h2>
        <p className="text-slate-500 text-sm mb-6">
          Across industries, large organisations have moved from experimentation to operational deployment. Here are the five most common areas where enterprise AI is generating measurable impact.
        </p>
        <div className="space-y-4">
          {ENTERPRISE_ACTIONS.map((a) => (
            <div key={a.area} className={`card border ${a.color}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{a.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 mb-2">{a.area}</h3>
                  <ul className="space-y-1 mb-3">
                    {a.examples.map((ex, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-slate-400 mt-0.5 flex-shrink-0">→</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold text-slate-500 bg-white/60 rounded px-2 py-1 inline-block">
                    📌 {a.stat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── S2: Where value lives ───────────────────────────────── */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Where the Value Lives</h2>
        <p className="text-slate-500 text-sm mb-6">
          McKinsey estimates AI could add <strong>$4.4 trillion annually</strong> to global corporate profits. The value concentrates in six areas — each measurable, each applicable at any company size.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUE_AREAS.map((v) => (
            <div key={v.label} className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{v.icon}</span>
                <h3 className="font-bold text-slate-800">{v.label}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{v.desc}</p>
              <p className="text-xs text-slate-500 bg-slate-50 rounded px-2 py-1.5 border border-slate-100">
                <strong>Example:</strong> {v.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── S3: How to adopt ────────────────────────────────────── */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">How to Adopt AI</h2>
        <p className="text-slate-500 text-sm mb-6">
          Three of the world's most authoritative sources on AI adoption — McKinsey, Gartner, and the World Economic Forum — agree on the fundamentals. Here is what each recommends.
        </p>
        <div className="space-y-6">
          {FRAMEWORKS.map((f) => (
            <div key={f.source} className={`card border-l-4 ${f.color}`}>
              <div className="mb-4">
                <p className="font-bold text-slate-900 text-base">{f.source}</p>
                <p className="text-xs text-slate-500 mt-0.5">{f.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {f.steps.map((s) => (
                  <div key={s.step} className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{s.step}</span>
                      <span className="font-semibold text-slate-800 text-sm">{s.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg px-3 py-2 border border-slate-100 text-xs text-slate-600">
                <strong>Key finding:</strong> {f.insight}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── S4: When to adopt ───────────────────────────────────── */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">When to Adopt AI</h2>
        <p className="text-slate-500 text-sm mb-6">
          The question is no longer <em>whether</em> to adopt AI — it is <em>how quickly</em> to move and <em>where to start</em>. Use these signals to assess your readiness right now.
        </p>

        <div className="card mb-6 bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800 font-medium">
            <strong>The window is narrowing.</strong> Organisations who began serious AI pilots in 2022–2024 are now scaling production systems. Late movers in 2026+ are not just behind — they are catching up against competitors with compounding advantages in data, models, and capability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {READINESS_SIGNALS.map((s, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-sm border ${
                s.ready
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <span className="flex-shrink-0 mt-0.5 font-bold">{s.ready ? '✓' : '✗'}</span>
              <span>{s.signal}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Start before you feel ready.</strong> Every organisation that has successfully scaled AI will tell you the same thing: the act of running a pilot is what reveals the real requirements. Planning in isolation produces analysis paralysis, not readiness.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── S5: How to measure ──────────────────────────────────── */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">How to Measure Its Value</h2>
        <p className="text-slate-500 text-sm mb-6">
          AI value must be measured at four levels — from the operational (what the model is doing) to the strategic (is it building a durable advantage). Most organisations only measure the first two and miss the full picture.
        </p>

        <div className="space-y-4">
          {METRICS.map((m) => (
            <div key={m.level} className={`card border ${m.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{m.icon}</span>
                <h3 className="font-bold text-slate-800">Level: {m.level}</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3 italic">{m.desc}</p>
              <ul className="space-y-1">
                {m.metrics.map((metric, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-slate-300 flex-shrink-0">—</span>
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 card bg-slate-800 text-white">
          <p className="font-bold text-sm mb-2">⚠ Avoid Vanity Metrics</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            The number of AI tools deployed, the number of employees who attended an AI training, or the number of pilots launched are <strong>not</strong> value metrics. They are activity metrics. Value is only measured when it connects to time saved, cost avoided, revenue generated, or risk reduced — at a level that influences a business decision.
          </p>
        </div>
      </section>

    </PageWrapper>
  );
}
