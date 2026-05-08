import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The Market Timing Reality',        level: 2 },
  { id: 's2', title: 'Organisational Readiness Signals', level: 2 },
  { id: 's3', title: 'Sector-Specific Timing',           level: 2 },
  { id: 's4', title: 'The Cost of Waiting',              level: 2 },
  { id: 's5', title: 'Decision Framework',               level: 2 },
];

const TIMING_WAVES = [
  {
    wave: 'Wave 1: Innovators (2020–2022)',
    icon: '🚀',
    color: 'bg-purple-50 border-purple-300',
    desc: 'A small number of technology-native organisations built custom AI models. Required deep technical capability and high risk tolerance. Most experiments failed, but survivors built significant capability advantages.',
    who: 'Big Tech, AI-native startups, leading financial institutions',
    lesson: 'Taught the world what worked. Created the playbooks everyone else is now following.',
  },
  {
    wave: 'Wave 2: Early Adopters (2022–2024)',
    icon: '📈',
    color: 'bg-blue-50 border-blue-300',
    desc: 'The generative AI inflection point (ChatGPT, GPT-4, Claude). Enterprise AI became accessible without deep ML expertise. First serious enterprise deployments of Microsoft Copilot, AI customer service, and AI-assisted coding.',
    who: 'Enterprise leaders in professional services, technology, financial services',
    lesson: 'Established that AI creates real productivity value. Proved the business case. Built first-mover capability advantages.',
  },
  {
    wave: 'Wave 3: Early Majority (2024–2026)',
    icon: '🌊',
    color: 'bg-emerald-50 border-emerald-300',
    desc: 'AI is becoming table stakes in competitive industries. Organisations deploying AI at scale. This is the current wave — the most important strategic window for most organisations.',
    who: 'Mid-market and large enterprise across all major sectors',
    lesson: 'The window to establish competitive differentiation before AI becomes a baseline expectation. Moving now is still "early" in most sectors.',
  },
  {
    wave: 'Wave 4: Late Majority (2026–2028)',
    icon: '⏳',
    color: 'bg-amber-50 border-amber-300',
    desc: 'AI is expected, not differentiated. Organisations without AI capability will struggle to compete on cost, speed, and quality. The conversation shifts from "should we?" to "why are we so behind?"',
    who: 'Laggards catching up under competitive pressure',
    lesson: 'The cost of starting here is not just higher investment — it is 4+ years of compounding disadvantage to recover.',
  },
];

const READINESS = [
  {
    category: 'Strategic',
    icon: '🎯',
    items: [
      { signal: 'At least one C-suite sponsor who owns AI outcomes, not just approves budget', ready: true },
      { signal: 'A specific business problem to solve — not "we should do AI"', ready: true },
      { signal: 'Board or leadership aware of competitive AI landscape in your sector', ready: true },
      { signal: 'Pursuing AI purely because competitors are — no internal conviction', ready: false },
      { signal: 'AI is "owned" by IT with no business co-sponsorship', ready: false },
    ],
  },
  {
    category: 'Data',
    icon: '🗄️',
    items: [
      { signal: 'Data exists for at least one target use case, even if imperfect', ready: true },
      { signal: 'Someone owns data quality and access decisions', ready: true },
      { signal: 'Data from target workflows is digital (not purely paper-based)', ready: true },
      { signal: 'No data exists for any candidate use case and there is no plan to create it', ready: false },
      { signal: 'Data governance is completely absent — no access controls, no ownership', ready: false },
    ],
  },
  {
    category: 'People',
    icon: '🧑‍💼',
    items: [
      { signal: 'At least one motivated internal champion who will drive adoption', ready: true },
      { signal: 'A team willing to run a 6-week pilot and tolerate imperfect early results', ready: true },
      { signal: 'Leadership willing to communicate openly about AI\'s role', ready: true },
      { signal: 'Universal staff resistance with no internal advocates', ready: false },
      { signal: 'Leadership unwilling to address the "what does this mean for jobs?" question', ready: false },
    ],
  },
  {
    category: 'Capability',
    icon: '🔧',
    items: [
      { signal: 'Internal or accessible external resource to support tool evaluation', ready: true },
      { signal: 'Budget approved for a time-limited pilot (even small — £5–20k range)', ready: true },
      { signal: 'At least one use case that is addressable with off-the-shelf AI tools (no custom build required)', ready: true },
      { signal: 'No budget, no sponsor, no use case — pure aspiration with no enablement', ready: false },
      { signal: 'Insisting on building custom AI before validating any use case', ready: false },
    ],
  },
];

const SECTORS = [
  { sector: 'Financial Services', urgency: 'Critical', color: 'bg-red-50 border-red-300 text-red-800', note: 'Fraud detection, compliance monitoring, and customer AI are live at competitors. Every month of delay is measurable in cost and risk exposure.' },
  { sector: 'Professional Services', urgency: 'Critical', color: 'bg-red-50 border-red-300 text-red-800', note: 'AI-assisted research, proposal drafting, and document review are active at leading firms. Clients are beginning to expect AI-augmented speed and depth.' },
  { sector: 'Retail & E-commerce', urgency: 'High', color: 'bg-amber-50 border-amber-300 text-amber-800', note: 'Personalisation and inventory optimisation at AI leaders are creating cost and conversion advantages. 18–24 months before this becomes a baseline expectation.' },
  { sector: 'Healthcare', urgency: 'High', color: 'bg-amber-50 border-amber-300 text-amber-800', note: 'Clinical documentation, diagnostic assistance, and patient flow AI are in active deployment. Regulatory complexity slows but does not prevent adoption.' },
  { sector: 'Manufacturing', urgency: 'Medium–High', color: 'bg-yellow-50 border-yellow-300 text-yellow-800', note: 'Predictive maintenance and quality control AI are creating efficiency gaps between adopters and non-adopters. 2–3 year window to stay competitive.' },
  { sector: 'Education', urgency: 'Medium', color: 'bg-green-50 border-green-300 text-green-800', note: 'Personalised learning and administrative AI are emerging. Less competitive pressure than commercial sectors — but student and employer expectations are rising.' },
  { sector: 'Construction & Trades', urgency: 'Medium', color: 'bg-green-50 border-green-300 text-green-800', note: 'Document management, estimation, and project monitoring AI are early-stage. More runway than most sectors — but procurement and tendering AI is accelerating.' },
];

const WAITING_COSTS = [
  { cost: 'Compounding capability gap', detail: 'Competitors building AI literacy and model quality today will have 2–3 years of compounding advantage by the time you start. Data and workflow optimisation advantages do not reset.' },
  { cost: 'Talent market', detail: 'AI-literate employees increasingly prefer organisations investing in AI capability. Late movers will find it harder and more expensive to hire and retain the workforce they need.' },
  { cost: 'Customer expectations', detail: 'As AI-native competitors improve speed and personalisation, customer expectations rise. Meeting "table stakes" in 2027 requires capabilities that are "innovative" today.' },
  { cost: 'Cost structure', detail: 'Organisations deploying AI at scale will operate at structurally lower costs. Late movers will face pricing and margin pressure from competitors with compounding efficiency advantages.' },
  { cost: 'Investment cost', detail: 'The cost of starting is not getting lower. SaaS AI tool costs are rising. Implementation expertise is becoming scarcer and more expensive as demand increases. Starting later costs more.' },
];

const DECISION_TREE = [
  { q: 'Do you have a specific, painful workflow that consumes significant time?', yes: 'Continue', no: 'Spend 2 weeks on use case discovery before doing anything else.' },
  { q: 'Does data exist for that workflow, even imperfectly?', yes: 'Continue', no: 'Either fix the data gap (document the workflow digitally) or pick a different use case.' },
  { q: 'Is there a named business owner willing to spend 6 weeks running a pilot?', yes: 'Continue', no: 'Find the owner first. Without business ownership, AI programs consistently fail.' },
  { q: 'Is there budget (even modest) and executive awareness?', yes: 'Start your pilot now.', no: 'Build the business case using the ROI Calculator in this dashboard, then secure sponsorship.' },
];

export default function EnterpriseWhen() {
  return (
    <PageWrapper
      badge="Page 15 — Enterprise Context"
      title="When to Adopt AI"
      subtitle="The strategic timing of AI adoption — the adoption waves, what signals readiness, sector-specific urgency, and the real cost of waiting."
      sections={SECTIONS}
    >

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The Market Timing Reality</h2>
        <p className="text-slate-500 text-sm mb-6">
          AI adoption is playing out in waves. Understanding which wave you are currently in — and what the next wave looks like — is essential for calibrating urgency correctly.
        </p>
        <div className="space-y-4">
          {TIMING_WAVES.map((w) => (
            <div key={w.wave} className={`card border ${w.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{w.icon}</span>
                <h3 className="font-bold text-slate-800">{w.wave}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">{w.desc}</p>
              <p className="text-xs text-slate-500 mb-1"><strong>Who:</strong> {w.who}</p>
              <p className="text-xs bg-white/70 rounded px-2 py-1 text-slate-600"><strong>Lesson:</strong> {w.lesson}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Organisational Readiness Signals</h2>
        <p className="text-slate-500 text-sm mb-6">Readiness is not binary. These signals indicate where you are ready to move and where gaps need addressing first.</p>
        <div className="space-y-5">
          {READINESS.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-bold text-slate-700">{cat.category} Readiness</h3>
              </div>
              <div className="space-y-1.5">
                {cat.items.map((item, i) => (
                  <div key={i} className={`flex items-start gap-2.5 rounded-xl px-3 py-2 text-sm border ${
                    item.ready ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <span className="flex-shrink-0 font-bold">{item.ready ? '✓' : '✗'}</span>
                    <span>{item.signal}</span>
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
        <h2 className="mb-4">Sector-Specific Timing</h2>
        <p className="text-slate-500 text-sm mb-6">Urgency varies by sector. This is a calibrated view of where AI adoption pressure is highest and how much runway remains for deliberate action.</p>
        <div className="space-y-2">
          {SECTORS.map((s) => (
            <div key={s.sector} className={`card border ${s.color}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold">{s.sector}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/50">{s.urgency}</span>
              </div>
              <p className="text-sm">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">The Cost of Waiting</h2>
        <p className="text-slate-500 text-sm mb-6">Waiting has a cost. It is rarely visible in the moment — but it compounds, and it is measurable in retrospect.</p>
        <div className="space-y-3">
          {WAITING_COSTS.map((w, i) => (
            <div key={i} className="card border-l-4 border-l-red-400">
              <p className="font-semibold text-slate-800 mb-1">{w.cost}</p>
              <p className="text-sm text-slate-500">{w.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Decision Framework</h2>
        <p className="text-slate-500 text-sm mb-6">Four questions. If you can answer yes to all four, you should start a pilot now — not next quarter.</p>
        <div className="space-y-3">
          {DECISION_TREE.map((d, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm mb-2">{d.q}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-emerald-50 rounded-lg px-3 py-1.5 text-xs text-emerald-700"><strong>Yes →</strong> {d.yes}</div>
                    <div className="bg-amber-50 rounded-lg px-3 py-1.5 text-xs text-amber-700"><strong>No →</strong> {d.no}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
