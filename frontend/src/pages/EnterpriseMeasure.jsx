import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Why Measurement Fails',             level: 2 },
  { id: 's2', title: 'The Four-Level Framework',          level: 2 },
  { id: 's3', title: 'KPIs by Use Case Type',             level: 2 },
  { id: 's4', title: 'Building Your Measurement System',  level: 2 },
  { id: 's5', title: 'Reporting to Stakeholders',         level: 2 },
];

const FAILURE_MODES = [
  { mode: 'Measuring activity instead of outcomes', example: '"We deployed 3 AI tools" or "200 employees were trained" — neither tells you if anything improved.' },
  { mode: 'Measuring after deployment, not before', example: 'Without a baseline measurement, you cannot prove AI caused the improvement. Correlation is not attribution.' },
  { mode: 'Using only quantitative metrics', example: 'Time saved is important, but quality of output, employee confidence, and decision accuracy matter too — and are often missed.' },
  { mode: 'Measuring only the first 30 days', example: 'AI value is not linear. Early results are often below the long-run performance as users build confidence and processes are refined.' },
  { mode: 'Assigning ROI to the tool, not the workflow', example: 'The tool does not generate ROI. The changed workflow does. Measure the workflow before and after, not the tool.' },
  { mode: 'Ignoring the counterfactual', example: '"We saved 200 hours" is meaningless if you don\'t know whether those hours were redirected to higher-value work or simply absorbed.' },
];

const FOUR_LEVELS = [
  {
    level: 'Level 1: Activity',
    icon: '🔧',
    color: 'bg-slate-50 border-slate-200',
    question: 'Is the AI working as intended?',
    desc: 'These metrics confirm the AI is functioning correctly and being used. They are necessary but not sufficient for proving value. High activity with low outcome impact means the deployment design is wrong.',
    metrics: [
      { name: 'Tasks automated per period', how: 'Log AI interactions vs manual equivalents', freq: 'Weekly' },
      { name: 'AI output accuracy rate', how: 'Sample-based human review of AI outputs', freq: 'Weekly' },
      { name: 'Exception/correction rate', how: 'Track how often humans override AI outputs', freq: 'Weekly' },
      { name: 'User adoption rate', how: '% of eligible users actively using the tool', freq: 'Monthly' },
      { name: 'Volume processed without human touch', how: 'Track end-to-end automated completions', freq: 'Weekly' },
    ],
    warning: 'High activity metrics with flat outcome metrics means users are engaged but the workflow design is not capturing value. Redesign the human–AI handoff.',
  },
  {
    level: 'Level 2: Productivity',
    icon: '⚡',
    color: 'bg-blue-50 border-blue-200',
    question: 'Is the AI saving time and reducing cost?',
    desc: 'These metrics quantify the direct efficiency gains. They are the most commonly measured — and the most commonly overstated when baselines are not established correctly.',
    metrics: [
      { name: 'Average time per task (before vs after)', how: 'Time-stamped task logs or sampling', freq: 'Monthly' },
      { name: 'Hours saved per user per week', how: 'Self-reported (calibrated) + process timing', freq: 'Monthly' },
      { name: 'Cost per unit of output', how: 'Labour cost × time per task', freq: 'Monthly' },
      { name: 'Throughput increase', how: 'Volume of outputs produced in same time period', freq: 'Monthly' },
      { name: 'Cycle time reduction', how: 'End-to-end process time before vs after', freq: 'Monthly' },
    ],
    warning: 'Time saved is only valuable if it is redirected. Track what employees do with reclaimed time. Unredirected time savings appear on no P&L.',
  },
  {
    level: 'Level 3: Business Outcome',
    icon: '📈',
    color: 'bg-emerald-50 border-emerald-200',
    question: 'Did the AI contribute to a business result?',
    desc: 'These metrics connect AI activity to the outcomes that appear on P&Ls and dashboards. They require causal attribution — often the hardest part of AI measurement — but also the most credible evidence of value.',
    metrics: [
      { name: 'Revenue influenced by AI (e.g. upsell, retention)', how: 'A/B test AI vs non-AI workflow groups', freq: 'Quarterly' },
      { name: 'Customer satisfaction / NPS change', how: 'Track CSAT/NPS for AI-assisted interactions', freq: 'Monthly' },
      { name: 'Error-related cost avoidance', how: 'Audit errors caught by AI vs historical miss rate × cost-per-error', freq: 'Quarterly' },
      { name: 'Speed-to-market improvement', how: 'Cycle time for AI-supported vs baseline processes', freq: 'Quarterly' },
      { name: 'Employee retention in AI-augmented roles', how: 'Track turnover in teams using AI vs baseline', freq: 'Annually' },
    ],
    warning: 'Attribution is hard. Use controlled comparisons where possible. If not, use pre/post analysis with clear period boundaries and document confounding factors.',
  },
  {
    level: 'Level 4: Strategic',
    icon: '🏆',
    color: 'bg-purple-50 border-purple-200',
    question: 'Is AI building a durable competitive advantage?',
    desc: 'These metrics measure whether the organisation is building AI as a capability — not just deploying tools. Strategic metrics are leading indicators of competitive position 2–3 years out.',
    metrics: [
      { name: 'AI literacy index', how: '% staff at each training level (aware, guided, independent, champion)', freq: 'Quarterly' },
      { name: 'Use cases in production vs pilot', how: 'Track pipeline from idea to production', freq: 'Quarterly' },
      { name: 'Time from use case to production', how: 'Measure deployment cycle time improvement', freq: 'Quarterly' },
      { name: 'Data asset quality score', how: 'Self-assessed + third-party data quality audit', freq: 'Annually' },
      { name: 'AI-driven revenue as % of total', how: 'Revenue traceable to AI-enabled capabilities', freq: 'Annually' },
    ],
    warning: 'Strategic metrics are slow-moving and hard to attribute. Report them annually alongside the faster-moving Level 1–3 metrics. They are the scoreboard for the long game.',
  },
];

const USE_CASE_KPIS = [
  {
    type: 'Document Processing (invoices, contracts, reports)',
    icon: '📄',
    kpis: [
      'Processing time per document (before vs after)',
      'Error rate: fields extracted incorrectly',
      'Straight-through processing rate (no human touch)',
      'Cost per document processed',
    ],
    baseline: 'Sample 50–100 documents processed manually before deployment. Time each step.',
  },
  {
    type: 'Customer Service & Query Handling',
    icon: '💬',
    kpis: [
      'First contact resolution rate (AI vs human baseline)',
      'Average handle time: AI-assisted vs unassisted',
      'Deflection rate: % resolved without escalation',
      'Customer satisfaction score on AI-handled interactions',
    ],
    baseline: 'Extract 3-month historical averages for handle time, resolution rate, and CSAT before deployment.',
  },
  {
    type: 'Content & Proposal Generation',
    icon: '✏️',
    kpis: [
      'Time to first draft: AI-assisted vs baseline',
      'Number of revision rounds required',
      'Win rate on AI-assisted proposals (for sales use cases)',
      'Output quality score (peer-reviewed sample)',
    ],
    baseline: 'Track time from brief to submitted proposal over 3 months. Note number of revision cycles.',
  },
  {
    type: 'Data Analysis & Reporting',
    icon: '📊',
    kpis: [
      'Time to produce report (AI-assisted vs manual)',
      'Accuracy of AI-generated analysis (human-verified sample)',
      'Number of insights surfaced that were previously missed',
      'Decision cycle time using AI-generated reports',
    ],
    baseline: 'Time one complete reporting cycle from data extraction to stakeholder delivery before AI deployment.',
  },
  {
    type: 'Sales & Lead Management',
    icon: '🎯',
    kpis: [
      'Lead-to-opportunity conversion rate (AI-scored vs unscored)',
      'Sales cycle length: AI-assisted vs baseline',
      'Pipeline coverage and forecast accuracy',
      'Revenue per rep: AI-assisted vs non-AI-assisted',
    ],
    baseline: 'Pull 6-month historical CRM data on conversion rates, cycle length, and win rates by rep.',
  },
];

const REPORTING_AUDIENCES = [
  {
    audience: 'Board / Executive',
    frequency: 'Quarterly',
    focus: 'Business outcome and strategic metrics. ROI, competitive positioning, programme health.',
    format: 'One-page summary: investment, returns, risks, next milestones. No technical detail.',
  },
  {
    audience: 'Business Unit Leaders',
    frequency: 'Monthly',
    focus: 'Productivity and outcome metrics for their function. What\'s working, what needs attention.',
    format: 'Function-level dashboard: time saved, cost impact, quality metrics, adoption rate.',
  },
  {
    audience: 'AI Programme Team',
    frequency: 'Weekly',
    focus: 'Activity and productivity metrics. Model performance, adoption blockers, sprint progress.',
    format: 'Operational dashboard: detailed metrics, trend lines, exception flags.',
  },
  {
    audience: 'End Users',
    frequency: 'Monthly',
    focus: 'Personal productivity gains. Positive reinforcement of adoption behaviour.',
    format: '"Your AI impact" — personal time saved, tasks automated, quality improvements.',
  },
];

export default function EnterpriseMeasure() {
  return (
    <PageWrapper
      badge="Page 16 — Enterprise Context"
      title="How to Measure AI Value"
      subtitle="A complete measurement framework for enterprise AI — from activity monitoring to strategic ROI. Including KPIs by use case, how to establish baselines, and how to report to different audiences."
      sections={SECTIONS}
    >

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Why Measurement Fails</h2>
        <p className="text-slate-500 text-sm mb-6">Most AI measurement fails not because the tools are wrong — but because the measurement design is wrong. These are the six most common failure modes.</p>
        <div className="space-y-3">
          {FAILURE_MODES.map((f, i) => (
            <div key={i} className="card border-l-4 border-l-red-400">
              <p className="font-semibold text-slate-800 mb-1">{f.mode}</p>
              <p className="text-sm text-slate-500 italic">{f.example}</p>
            </div>
          ))}
        </div>
        <div className="card bg-blue-50 border-blue-200 mt-4">
          <p className="text-sm text-blue-800 font-medium">
            The fix for all of these is the same: <strong>define your metrics and collect your baseline before deployment starts</strong>. Measurement is not a post-launch activity. It is a design input.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">The Four-Level Framework</h2>
        <p className="text-slate-500 text-sm mb-6">AI value must be measured at four levels simultaneously. Organisations that only measure activity (Level 1) consistently underestimate and misattribute value.</p>
        <div className="space-y-5">
          {FOUR_LEVELS.map((l) => (
            <div key={l.level} className={`card border ${l.color}`}>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{l.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-800">{l.level}</h3>
                  <p className="text-xs text-slate-500 italic">{l.question}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">{l.desc}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left pb-2 text-slate-500 font-semibold">Metric</th>
                      <th className="text-left pb-2 text-slate-500 font-semibold">How to measure</th>
                      <th className="text-left pb-2 text-slate-500 font-semibold">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {l.metrics.map((m, i) => (
                      <tr key={i}>
                        <td className="py-2 text-slate-700 font-medium pr-4">{m.name}</td>
                        <td className="py-2 text-slate-500 pr-4">{m.how}</td>
                        <td className="py-2 text-slate-500 whitespace-nowrap">{m.freq}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 bg-amber-50 rounded-lg px-3 py-2 text-xs text-amber-700">
                <strong>⚠ Watch out:</strong> {l.warning}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">KPIs by Use Case Type</h2>
        <p className="text-slate-500 text-sm mb-6">Different use cases require different metric sets. Use these as your starting point — adapt based on your specific workflow.</p>
        <div className="space-y-4">
          {USE_CASE_KPIS.map((u) => (
            <div key={u.type} className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{u.icon}</span>
                <h3 className="font-bold text-slate-800">{u.type}</h3>
              </div>
              <ul className="space-y-1 mb-3">
                {u.kpis.map((k, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-slate-300 flex-shrink-0">→</span>{k}
                  </li>
                ))}
              </ul>
              <div className="bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-600">
                <strong>Baseline approach:</strong> {u.baseline}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Building Your Measurement System</h2>
        <p className="text-slate-500 text-sm mb-6">A practical 4-step process for building a measurement system that survives contact with reality.</p>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Define metrics before deployment', desc: 'For each use case, agree on 3–5 metrics that would constitute success. Write them down. Get business owner sign-off. Do this before a single line of AI is deployed.' },
            { step: '2', title: 'Collect baselines before going live', desc: 'Measure the current state of every metric you plan to track. Run this for 2–4 weeks before deployment. Without a baseline, you are measuring nothing.' },
            { step: '3', title: 'Build a simple tracking mechanism', desc: 'A spreadsheet that team leads update weekly is better than a BI dashboard that nobody owns. Start simple. Complexity is for scale, not pilots.' },
            { step: '4', title: 'Review and report on a cadence', desc: 'Set a monthly review with the business owner. Present actual vs expected. Be honest about what is and is not working. Measurement exists to drive decisions, not to confirm narratives.' },
          ].map((s) => (
            <div key={s.step} className="card flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{s.step}</span>
              <div>
                <p className="font-semibold text-slate-800 mb-1">{s.title}</p>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Reporting to Stakeholders</h2>
        <p className="text-slate-500 text-sm mb-6">Different audiences need different views of AI value. Over-reporting technical metrics to executives destroys credibility. Under-reporting business outcomes to frontline users destroys engagement.</p>
        <div className="space-y-3">
          {REPORTING_AUDIENCES.map((r) => (
            <div key={r.audience} className="card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">{r.audience}</h3>
                <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">{r.frequency}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2"><strong>Focus:</strong> {r.focus}</p>
              <p className="text-xs bg-slate-50 rounded px-3 py-1.5 text-slate-500"><strong>Format:</strong> {r.format}</p>
            </div>
          ))}
        </div>
        <div className="card bg-slate-800 text-white mt-6">
          <p className="font-bold text-sm mb-2">The golden rule of AI reporting</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Report the truth, even when it is uncomfortable. AI programs that hide underperformance lose executive trust faster than programs that surface problems and present recovery plans. Credibility compounds — in both directions.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
