import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '11.1 How AI Reshapes Roles',           level: 2 },
  { id: 's2', title: '11.2 The New Role Taxonomy',           level: 2 },
  { id: 's3', title: '11.3 AI and Team Structure',           level: 2 },
  { id: 's4', title: '11.4 Measuring Organisational Value',  level: 2 },
  { id: 's5', title: '11.5 AI in Strategic Planning',        level: 2 },
];

const ROLE_SHIFTS = [
  {
    from: 'Produces outputs manually',        to: 'Reviews, edits, and improves AI-produced outputs',
    impact: 'Speed increases 3–5×. Quality depends on reviewer skill, not writer speed.',
    stage: 'Stage 1–2',
  },
  {
    from: 'Answers routine questions',        to: 'Designs the AI that answers routine questions, handles escalations',
    impact: 'Customer-facing roles shift from response volume to exception quality.',
    stage: 'Stage 2–3',
  },
  {
    from: 'Extracts and formats data manually', to: 'Defines what the AI should extract and validates its accuracy',
    impact: 'Finance and ops roles shift from production to governance and quality.',
    stage: 'Stage 2–3',
  },
  {
    from: 'Manages process execution',        to: 'Manages AI-automated processes and intervenes on exceptions',
    impact: 'Operations leadership shifts from throughput management to exception and improvement management.',
    stage: 'Stage 3–4',
  },
  {
    from: 'Gathers and synthesises information', to: 'Evaluates AI-synthesised information and applies judgment',
    impact: 'Analysis and research roles shift from data gathering to interpretation and decision quality.',
    stage: 'Stage 2–4',
  },
];

const NEW_ROLES = [
  { title: 'AI Champion (per function)', desc: 'Owns AI capability within their function. Maintains use case libraries, runs office hours, trains peers, and surfaces new opportunities. Part of the existing team — not a separate hire.', time: '20–30% of role', when: 'Stage 2+' },
  { title: 'AI Programme Owner', desc: 'Coordinates AI adoption across functions. Owns the roadmap, the ROI tracking, and the relationship with external technical partners. Reports to senior leadership.', time: 'Dedicated if scale warrants', when: 'Stage 3+' },
  { title: 'Prompt Engineer / AI Configurator', desc: 'Designs and maintains the prompts, context documents, and configurations that make AI tools work well for the organisation. Sits between technical and functional teams.', time: 'Part-time to full-time depending on scale', when: 'Stage 2–3' },
  { title: 'AI Governance Lead', desc: 'Owns the acceptable-use policy, data handling framework, vendor relationships, and audit/compliance requirements for AI tools.', time: '10–20% of IT or Compliance role', when: 'Stage 2+' },
  { title: 'AI-Native Hire', desc: 'New hires expected to be fluent in AI tools from day one. AI proficiency becomes a baseline expectation in job descriptions, not a nice-to-have.', time: 'Hiring standard, not a role', when: 'Stage 3+' },
];

const TEAM_PATTERNS = [
  {
    pattern: 'Leaner teams, higher output',
    desc: 'At Stage 3, a team of 4 with well-deployed AI can produce the output of 6. This doesn\'t mean reducing headcount immediately — it means the business can grow revenue without proportionally growing headcount.',
    signal: 'Team output grows; headcount stays flat or grows slowly.',
  },
  {
    pattern: 'Redistribution of skills within teams',
    desc: 'Junior roles that previously handled high-volume routine work shift toward review, quality control, and exception handling. Senior roles shift toward more complex judgment and strategic work that AI cannot do.',
    signal: 'Job descriptions change. "Strong writing skills" becomes "strong editing and judgment skills."',
  },
  {
    pattern: 'Cross-functional AI capability',
    desc: 'Functions that were siloed begin to share AI tools, prompt libraries, and use cases. The finance manager\'s email triage approach works for procurement. The sales team\'s proposal generator adapts for customer success.',
    signal: 'Use cases spread laterally without central direction.',
  },
  {
    pattern: 'Faster onboarding',
    desc: 'New staff with AI assistance reach full productivity faster. The organisation\'s knowledge — in procedures, examples, Q&A libraries — becomes accessible to new staff through AI from day one rather than needing months of mentoring.',
    signal: 'Time-to-productivity for new hires decreases.',
  },
];

const VALUE_METRICS = [
  { category: 'Productivity', metrics: ['Hours per output unit (before/after AI)', 'Output volume per FTE per month', 'Cycle time for key processes (quote to send, month-end close, onboarding)'] },
  { category: 'Quality',      metrics: ['Error rate in AI-assisted vs. manual outputs', 'Customer satisfaction on AI-supported interactions', 'Revision rounds on AI-produced documents vs. manually produced'] },
  { category: 'Capability',   metrics: ['Number of active AI use cases per function', 'Champion engagement score (self-reported)', '% of staff using AI tools 3+ times per week'] },
  { category: 'Financial',    metrics: ['Cost per output unit vs. prior period', 'Revenue per FTE (if growth without headcount)', 'AI tool cost vs. value delivered (ROI)'] },
];

export default function OrgContributions() {
  return (
    <PageWrapper
      badge="Page 11 — People & Culture"
      title="AI's Role in Organisational Contributions"
      subtitle="How AI changes the nature of roles, reshapes team structure, and creates compounding organisational value — for leaders thinking about the medium-term."
      sections={SECTIONS}
    >
      {/* 11.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">11.1 How AI Reshapes Roles</h2>
        <p className="text-sm text-slate-500 mb-5">AI doesn't replace roles — it changes what roles do. Understanding the shift helps leaders set expectations, redesign workflows, and hire differently.</p>
        <div className="space-y-3">
          {ROLE_SHIFTS.map((r, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="badge bg-red-100 text-red-700 text-xs">Before</span>
                    <span className="text-sm text-slate-700">{r.from}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <span className="badge bg-emerald-100 text-emerald-700 text-xs">After</span>
                    <span className="text-sm font-medium text-slate-800">{r.to}</span>
                  </div>
                  <p className="text-xs text-slate-500">{r.impact}</p>
                </div>
                <span className="badge-blue flex-shrink-0">{r.stage}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card border-blue-200 bg-blue-50 mt-4 text-sm">
          <p className="font-semibold text-blue-800 mb-1">The key framing for staff</p>
          <p className="text-blue-700">AI is replacing tasks, not roles. The people who thrive are those who develop the judgment to evaluate, improve, and direct AI outputs — not those who resist using it. Leaders who frame this clearly, early, reduce resistance significantly.</p>
        </div>
      </section>

      {/* 11.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">11.2 The New Role Taxonomy</h2>
        <p className="text-sm text-slate-500 mb-5">New responsibilities that emerge as AI matures in the organisation. Most are additions to existing roles, not new headcount.</p>
        <div className="space-y-4">
          {NEW_ROLES.map((r) => (
            <div key={r.title} className="card flex gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 flex-wrap mb-2">
                  <h3 className="text-sm">{r.title}</h3>
                  <span className="badge-blue text-xs ml-auto">{r.when}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{r.desc}</p>
                <span className="badge bg-slate-100 text-slate-600">Time: {r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">11.3 AI and Team Structure</h2>
        <div className="space-y-4">
          {TEAM_PATTERNS.map((p) => (
            <div key={p.pattern} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-2">{p.pattern}</p>
              <p className="text-sm text-slate-600 mb-3">{p.desc}</p>
              <div className="flex items-start gap-2 bg-emerald-50 rounded-lg px-3 py-2">
                <span className="text-emerald-500 text-xs font-bold mt-0.5 flex-shrink-0">Signal:</span>
                <p className="text-xs text-emerald-700">{p.signal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">11.4 Measuring Organisational Value</h2>
        <p className="text-sm text-slate-500 mb-5">A measurement framework across four categories. Pick 2–3 metrics to track — not all of them. Measuring everything is the same as measuring nothing.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {VALUE_METRICS.map((v) => (
            <div key={v.category} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-3">{v.category}</p>
              <ul className="space-y-2">
                {v.metrics.map(m => (
                  <li key={m} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">·</span>{m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="card border-amber-200 bg-amber-50 mt-4 text-sm">
          <p className="font-semibold text-amber-800 mb-1">The trap: measuring too early</p>
          <p className="text-amber-700">Don't measure AI ROI in the first 30 days. The first month is adoption, not value realisation. Measure consistently from month 2 onwards, against a baseline captured before deployment. Early measurement of immature adoption underestimates the eventual value and can kill programmes that would have delivered.</p>
        </div>
      </section>

      {/* 11.5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">11.5 AI in Strategic Planning</h2>
        <div className="space-y-3">
          {[
            { title: 'AI capability as a strategic asset',         desc: 'At Stage 3 and beyond, AI capability becomes a competitive differentiator — not just an efficiency tool. Build it into strategic planning as an organisational capability, with investment levels and development milestones, not just a line item in the IT budget.' },
            { title: 'Hiring for AI-native capability',            desc: 'As AI becomes standard in the workforce, the quality of an organisation\'s AI capability depends on who it hires and how it develops them. Hiring managers need to assess AI fluency. Job descriptions need to set expectations. Onboarding needs to build capability from day one.' },
            { title: 'Competitive intelligence on AI adoption',    desc: 'Monitor where competitors are on the AI maturity curve. The organisations that get to Stage 3 first in your industry gain compounding advantages — in cost, speed, and quality. Understanding the competitive landscape helps you sequence your own investment.' },
            { title: 'AI in board-level conversation',             desc: 'AI maturity should be a standing board agenda item at Stage 3+. Not a technology update — a strategic capability review. Where are we on the curve? What does the next stage require? What\'s the investment case? What\'s the risk of not progressing?' },
          ].map(s => (
            <div key={s.title} className="card flex gap-4">
              <div className="w-2 bg-blue-600 rounded-full flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{s.title}</p>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
