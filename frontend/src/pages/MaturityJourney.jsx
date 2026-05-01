import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '2.1 The Five Stages',           level: 2 },
  { id: 's2', title: '2.2 Why You Can\'t Skip Stages', level: 2 },
  { id: 's3', title: '2.3 Where the Biggest Value Is', level: 2 },
  { id: 's4', title: '2.4 Framework Alignment',        level: 2 },
];

const STAGES = [
  {
    num: 1, label: 'Assistant', color: 'border-slate-300 bg-slate-50',
    badge: 'badge bg-slate-200 text-slate-700',
    looks: 'Individuals use AI tools (Claude, Copilot, ChatGPT) to help with their own work. A human initiates every interaction, reviews every output, and decides what to do with it.',
    value: 'Personal productivity. Time reclaimed at the individual level. Better outputs from average performers.',
    investment: 'SaaS licensing + training. $200–$500 per user per year.',
    timeline: 'Productive within 2–4 weeks.',
    constraint: 'User adoption — value is trapped at the individual level.',
    readyNext: 'When multiple staff consistently produce better work faster, and you have identified 2–3 processes that could be accelerated.',
  },
  {
    num: 2, label: 'Accelerator', color: 'border-blue-200 bg-blue-50',
    badge: 'badge bg-blue-100 text-blue-700',
    looks: 'AI is embedded into specific processes to speed them up. The process still runs as before, but AI compresses the slow steps. Proposals that took 3 days take 4 hours.',
    value: 'Process cycle time compression. Throughput increase. Faster decisions.',
    investment: '$40k–$120k per use case (build + enablement).',
    timeline: '8–12 weeks per use case.',
    constraint: 'Process clarity — AI cannot accelerate a poorly defined process.',
    readyNext: 'When you have measurable cycle time data showing AI\'s impact, and a backlog of 3+ additional processes ready for acceleration.',
  },
  {
    num: 3, label: 'Automator', color: 'border-blue-300 bg-blue-100',
    badge: 'badge bg-blue-200 text-blue-800',
    looks: 'AI runs well-defined tasks end-to-end with minimal human involvement. Humans handle exceptions only. This is where lightweight automation (file watchers, email ingestion, RPA) begins.',
    value: 'Headcount leverage at scale. Error reduction through consistent execution. 24/7 operation.',
    investment: '$80k–$250k including integration and governance work.',
    timeline: '3–6 months per automation.',
    constraint: 'Governance — you need exception-handling, audit trails, and ownership defined before automating.',
    readyNext: 'When automated processes have run reliably for 3+ months and the business trusts AI outputs in defined scenarios.',
  },
  {
    num: 4, label: 'Operator', color: 'border-blue-500 bg-blue-200',
    badge: 'badge bg-blue-500 text-white',
    looks: 'AI becomes a proactive intelligence layer — it monitors, flags, recommends, and initiates within defined boundaries. Anomalies are surfaced before month-end. Risk is identified earlier.',
    value: 'Better decisions with better information, faster. Problems caught earlier. Leadership attention directed to what actually matters.',
    investment: 'Multi-quarter programs. Requires data foundation and change management.',
    timeline: '6–18 months per domain.',
    constraint: 'Data and organisational trust — requires the foundation built in earlier stages.',
    readyNext: 'When AI-generated signals are consistently acted on and the business has designed processes around them.',
  },
  {
    num: 5, label: 'Operating Model', color: 'border-blue-700 bg-blue-700',
    badge: 'badge bg-blue-700 text-white',
    looks: 'AI is not a layer on top of the business — it\'s part of how the business is designed to run. New processes start with AI embedded. Removing AI would require redesigning the business.',
    value: 'Strategic advantage. Offerings and cost structures competitors cannot match. New market opportunities.',
    investment: 'Enterprise strategy — years, not months. Executive-level commitment.',
    timeline: '2–5 years cumulative journey.',
    constraint: 'Leadership vision and sustained investment across multiple maturity stages.',
    readyNext: 'This is the destination. The journey is the value.',
  },
];

const FRAMEWORKS = [
  { framework: 'This Model',   s1: 'Assistant',    s2: 'Accelerator', s3: 'Automator',  s4: 'Operator',   s5: 'Operating Model' },
  { framework: 'Gartner',      s1: 'Awareness',    s2: 'Active',      s3: 'Operational',s4: 'Systemic',   s5: 'Transformational' },
  { framework: 'MIT CISR',     s1: 'Experimenting',s2: 'Building',    s3: 'Scaling',    s4: 'Embedding',  s5: '— (4 stages)' },
  { framework: 'MITRE',        s1: 'Initial',      s2: 'Adopted',     s3: 'Defined',    s4: 'Managed',    s5: 'Optimized' },
];

export default function MaturityJourney() {
  return (
    <PageWrapper
      badge="Page 2 — Foundation"
      title="The AI Maturity Journey"
      subtitle="The five-stage arc from first AI tools to AI-embedded operating models — with what each stage looks like, what it costs, and how to know you're ready to move."
      sections={SECTIONS}
    >
      {/* 2.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">2.1 The Five Stages Explained</h2>
        <div className="space-y-4">
          {STAGES.map((s) => (
            <div key={s.num} className={`card border ${s.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${s.num >= 4 ? 'bg-blue-600 text-white' : 'bg-white border border-blue-200 text-blue-700'}`}>
                  {s.num}
                </div>
                <h3 className={`text-base ${s.num === 5 ? 'text-white' : ''}`}>Stage {s.num} — {s.label}</h3>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ${s.num === 5 ? 'text-blue-100' : 'text-slate-600'}`}>
                <div>
                  <p className={`text-xs font-semibold mb-1 ${s.num === 5 ? 'text-blue-200' : 'text-slate-500'}`}>What it looks like</p>
                  <p className="leading-relaxed">{s.looks}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className={`text-xs font-semibold mb-0.5 ${s.num === 5 ? 'text-blue-200' : 'text-slate-500'}`}>Value created</p>
                    <p>{s.value}</p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold mb-0.5 ${s.num === 5 ? 'text-blue-200' : 'text-slate-500'}`}>Typical investment</p>
                    <p>{s.investment}</p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold mb-0.5 ${s.num === 5 ? 'text-blue-200' : 'text-slate-500'}`}>Dominant constraint</p>
                    <p>{s.constraint}</p>
                  </div>
                </div>
              </div>
              <div className={`mt-4 pt-4 border-t text-xs ${s.num === 5 ? 'border-blue-500 text-blue-200' : 'border-slate-200 text-slate-500'}`}>
                <span className="font-semibold">Ready to move to next stage when: </span>{s.readyNext}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">2.2 Why You Can't Skip Stages</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="card border-amber-200 bg-amber-50">
            <p className="text-sm font-semibold text-amber-800 mb-2">The organisational trust argument</p>
            <p className="text-sm text-amber-700">Each stage builds the muscle for trusting AI outputs. Businesses that skip to Stage 3 automation before proving Stage 2 value have no basis for trusting — or catching errors in — automated outputs. Trust cannot be shortcut; it's accumulated through experience.</p>
          </div>
          <div className="card border-amber-200 bg-amber-50">
            <p className="text-sm font-semibold text-amber-800 mb-2">The data and governance argument</p>
            <p className="text-sm text-amber-700">Stage 3 automation requires exception-handling processes that only emerge through Stage 2 operation. Stage 4 intelligence requires data quality that only comes from Stage 3 discipline. The later stages are built on the infrastructure of earlier ones.</p>
          </div>
        </div>
        <div className="card">
          <p className="text-sm font-semibold text-slate-800 mb-2">What the research shows</p>
          <p className="text-sm text-slate-600">Gartner 2025: AI initiatives in low-maturity organisations remain in production for 3+ years in only <strong>20%</strong> of cases. In high-maturity organisations that followed a staged approach, that figure is <strong>45%</strong>. The methodology doubles your chance of sustained success.</p>
        </div>
      </section>

      {/* 2.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">2.3 Where the Biggest Value Is</h2>
        <div className="card border-emerald-200 bg-emerald-50 mb-4">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">MIT CISR Research Finding (2025)</p>
          <p className="text-base font-semibold text-slate-800 mb-2">"The greatest financial impact is seen in the transition from Stage 2 to Stage 3."</p>
          <p className="text-sm text-slate-600">Moving from ad-hoc pilots and individual tool use (Accelerator) to scaled, systematic AI ways of working (Automator) is where organisations see the most significant returns — because it's the first point at which AI value compounds across the whole operation rather than accumulating individually.</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-700 leading-relaxed">For most organisations, the practical implication is clear: <strong>the Stage 2 → Stage 3 transition is the priority planning horizon</strong>, not the full journey to Stage 5. Get to Stage 3 reliably and the business has fundamentally changed how it operates. Everything after that builds on proven value.</p>
        </div>
      </section>

      {/* 2.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">2.4 Alignment with Established Frameworks</h2>
        <p className="text-slate-500 text-sm mb-4">This model aligns with recognised industry standards. Use Gartner with general business audiences; MIT CISR with tech-literate executives; MITRE with government or regulated-sector clients.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Framework</th>
                {[1,2,3,4,5].map(n => <th key={n} className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Stage {n}</th>)}
              </tr>
            </thead>
            <tbody>
              {FRAMEWORKS.map((fw, i) => (
                <tr key={fw.framework} className={i === 0 ? 'bg-blue-50' : 'hover:bg-slate-50'}>
                  <td className={`p-3 font-medium border border-slate-200 ${i === 0 ? 'text-blue-700' : 'text-slate-700'}`}>{fw.framework}</td>
                  {['s1','s2','s3','s4','s5'].map(k => (
                    <td key={k} className={`p-3 border border-slate-200 ${i === 0 ? 'text-blue-600' : 'text-slate-600'}`}>{fw[k]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageWrapper>
  );
}
