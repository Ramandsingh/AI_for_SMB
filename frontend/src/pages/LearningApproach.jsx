import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '9.1 Why Learning Approach Matters',    level: 2 },
  { id: 's2', title: '9.2 The Learning Progression Model',   level: 2 },
  { id: 's3', title: '9.3 Organisational Learning Modes',    level: 2 },
  { id: 's4', title: '9.4 Building a Learning Infrastructure', level: 2 },
  { id: 's5', title: '9.5 Measuring Learning Effectiveness', level: 2 },
];

const PROGRESSION = [
  {
    level: 'Awareness',       color: 'border-slate-200 bg-slate-50',
    dot: 'bg-slate-400',
    what: 'Staff understand what AI is and have a basic vocabulary. They can articulate the four capabilities (Read, Write, Decide, Predict) and name 2–3 tools relevant to their function.',
    how: 'Town hall or team briefing, 60–90 minutes. Capability cards per role. A short Q&A that addresses job security concerns directly.',
    measure: 'Staff can accurately describe one AI use case relevant to their role.',
    common: 'Rushing past this level. Staff who don\'t understand what AI is will find workarounds to avoid using it.',
  },
  {
    level: 'Guided Use',      color: 'border-blue-100 bg-blue-50',
    dot: 'bg-blue-400',
    what: 'Staff use AI tools with templates, prompt libraries, and guided workflows. They produce AI-assisted outputs but follow structured input patterns rather than crafting their own prompts.',
    how: 'Role-specific use case libraries. Prompt templates they copy and paste. Weekly office hours. Champion-led lunch-and-learns.',
    measure: 'Staff use AI for at least one task per week. Time saved is measurable.',
    common: 'Giving staff access to tools with no structure and calling it training. Guided use requires guides.',
  },
  {
    level: 'Independent Use', color: 'border-blue-200 bg-blue-100',
    dot: 'bg-blue-500',
    what: 'Staff craft their own prompts, adapt templates, and identify new use cases unprompted. They are making AI part of their standard workflow rather than an extra step.',
    how: 'Advanced prompt workshops. AI journal (5 minutes weekly — what worked, what didn\'t). Peer sharing sessions.',
    measure: 'Staff initiate new use cases without prompting. AI tool usage is consistent across the week, not just on training days.',
    common: 'Assuming independent use happens naturally. It needs a structured nudge — the AI journal and peer sharing make it social and visible.',
  },
  {
    level: 'Champion / Propagator', color: 'border-blue-300 bg-blue-200',
    dot: 'bg-blue-600',
    what: 'Staff actively spread AI capability within their function. They design new use cases, train peers, improve prompt libraries, and advocate internally for AI adoption.',
    how: 'Formal champion role with protected time. Access to advanced tools and experimentation budget. Recognition as the function\'s AI lead.',
    measure: 'Number of peers using AI consistently. New use cases identified per quarter. Champion\'s function shows measurably higher AI productivity than others.',
    common: 'Champions burning out because they\'re doing the AI advocate role on top of their existing job. Protected time is non-negotiable.',
  },
  {
    level: 'Capability Builder', color: 'border-blue-600 bg-blue-700',
    dot: 'bg-blue-800',
    what: 'Staff design and build AI capabilities for their function — configuring tools, building prompt systems, or working with technical teams to create custom solutions. Not every organisation reaches here in every function.',
    how: 'Technical AI training (API access, prompt engineering, workflow design). Participation in AI tool procurement and design decisions.',
    measure: 'New AI tools or configurations shipped per quarter. Reduction in reliance on external technical support for AI improvements.',
    common: 'Expecting this level without the organisational infrastructure to support it. Capability builders need autonomy, budget, and technical access.',
  },
];

const LEARNING_MODES = [
  { mode: 'Formal training',           freq: 'Quarterly',       best: 'New concepts and tool introductions. Milestone capability assessments.', not: 'Day-to-day skill building — too infrequent to build habit.' },
  { mode: 'Use case libraries',        freq: 'Living document',  best: 'The most used learning resource in most organisations. Role-specific, practical, immediately applicable.', not: 'Passive reading — needs to be paired with guided practice.' },
  { mode: 'Office hours',              freq: 'Weekly',           best: 'Where actual behaviour change happens. Real problems, real AI, immediate feedback. The champion\'s most valuable activity.', not: 'Scaling across large teams — becomes a bottleneck without peer multipliers.' },
  { mode: 'Peer sharing',              freq: 'Fortnightly',      best: 'Normalises AI use. Surfaces unexpected use cases. Makes adoption visible and social.', not: 'Introducing new concepts — not the right format for structured learning.' },
  { mode: 'AI journal / reflection',   freq: 'Weekly (5 min)',   best: 'Builds the reflection habit that turns accidental learning into deliberate skill development.', not: 'Teams without psychological safety — the journal only works if people can write honestly.' },
  { mode: 'Experiment days',           freq: 'Monthly (half-day)',best: 'Structured time for champions to explore new tools and use cases without immediate deliverable pressure.', not: 'Operational teams in peak periods — timing matters.' },
];

export default function LearningApproach() {
  return (
    <PageWrapper
      badge="Page 9 — Implementation"
      title="Learning Approach for Organisations"
      subtitle="How organisations build genuine AI capability over time — deliberately, across levels of competency, with structure that prevents the graveyard of unused tools."
      sections={SECTIONS}
    >
      {/* 9.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">9.1 Why Learning Approach Matters</h2>
        <div className="card bg-blue-900 text-white border-0 mb-6">
          <p className="text-lg font-semibold text-blue-100 mb-2">The graveyard of AI pilots is full of perfectly built tools nobody opens.</p>
          <p className="text-sm text-blue-300 leading-relaxed">Technology is not the constraint. Adoption is. The difference between an AI initiative that compounds over time and one that dies in month three is almost never the quality of the AI — it's whether the organisation has a learning infrastructure that converts tool access into habitual use.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { stat: '2.7×', label: 'Higher proficiency with formal training vs. self-guided', source: 'Larridin Research' },
            { stat: '4.1×', label: 'Higher user satisfaction with structured programs', source: 'Larridin Research' },
            { stat: '3.2×', label: 'Higher productivity gains vs. informal adoption', source: 'Larridin Research' },
          ].map(s => (
            <div key={s.stat} className="card text-center">
              <p className="text-3xl font-bold text-blue-600 mb-1">{s.stat}</p>
              <p className="text-xs text-slate-600 mb-2">{s.label}</p>
              <span className="badge bg-slate-100 text-slate-500">{s.source}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">9.2 The Learning Progression Model</h2>
        <p className="text-sm text-slate-500 mb-5">Five levels of AI competency. Not everyone needs to reach level 5 — most functions need 80% of staff at levels 2–3 and one or two people at level 4.</p>
        <div className="space-y-4">
          {PROGRESSION.map((p, i) => (
            <div key={p.level} className={`card border ${p.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${p.dot}`} />
                <h3 className={`text-base ${i === 4 ? 'text-white' : ''}`}>Level {i + 1} — {p.level}</h3>
              </div>
              <div className={`grid sm:grid-cols-2 gap-4 text-sm ${i === 4 ? 'text-blue-100' : 'text-slate-600'}`}>
                <div>
                  <p className={`text-xs font-semibold mb-1 ${i === 4 ? 'text-blue-200' : 'text-slate-500'}`}>What it looks like</p>
                  <p>{p.what}</p>
                </div>
                <div>
                  <p className={`text-xs font-semibold mb-1 ${i === 4 ? 'text-blue-200' : 'text-slate-500'}`}>How to build it</p>
                  <p className="mb-3">{p.how}</p>
                  <p className={`text-xs font-semibold mb-1 ${i === 4 ? 'text-blue-200' : 'text-slate-500'}`}>Measure of success</p>
                  <p className="text-xs">{p.measure}</p>
                </div>
              </div>
              <div className={`mt-4 pt-3 border-t text-xs ${i === 4 ? 'border-blue-500 text-blue-300' : 'border-slate-200 text-amber-700 bg-amber-50 rounded-lg px-3 py-2'}`}>
                <span className="font-semibold">Common mistake: </span>{p.common}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">9.3 Organisational Learning Modes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left p-3 font-semibold border border-slate-200">Mode</th>
                <th className="text-left p-3 font-semibold border border-slate-200">Cadence</th>
                <th className="text-left p-3 font-semibold border border-slate-200">Best for</th>
                <th className="text-left p-3 font-semibold border border-slate-200">Not for</th>
              </tr>
            </thead>
            <tbody>
              {LEARNING_MODES.map((m, i) => (
                <tr key={m.mode} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 font-medium text-slate-700">{m.mode}</td>
                  <td className="p-3 border border-slate-200 text-slate-500 text-xs">{m.freq}</td>
                  <td className="p-3 border border-slate-200 text-emerald-700 text-xs">{m.best}</td>
                  <td className="p-3 border border-slate-200 text-amber-700 text-xs">{m.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 9.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">9.4 Building a Learning Infrastructure</h2>
        <div className="space-y-3">
          {[
            { title: 'Role-specific use case libraries',   desc: 'One living document per function. Not a generic AI guide — written in the function\'s language with their examples. The most-used learning resource. Updated monthly by champions as new use cases emerge.' },
            { title: 'Prompt template collections',        desc: '"Here\'s the prompt — fill in the blanks." Not prompt engineering education. Specific, role-appropriate templates that work out of the box and give people confidence on day one.' },
            { title: 'Champion network',                   desc: 'One champion per function with protected time, formal recognition, and authority to change how their function operates. The network meets monthly to share what\'s working across functions.' },
            { title: 'Weekly office hours',                desc: 'A dedicated slot — even 30 minutes per week — where anyone can bring a real AI problem and get live help. This is where behaviour change actually happens. The champion runs it; leadership attends occasionally to signal importance.' },
            { title: 'AI journal practice',                desc: 'Five minutes per week: what AI task did I try this week? What worked? What didn\'t? What would I do differently? Shared in a team channel. Makes learning visible and social, builds the reflection habit that compounds.' },
          ].map(i => (
            <div key={i.title} className="card flex gap-4">
              <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{i.title}</p>
                <p className="text-slate-600 text-sm">{i.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">9.5 Measuring Learning Effectiveness</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { metric: 'Adoption rate', how: '% of eligible staff using AI tools at least 3× per week after 8 weeks. Target: 60%+ for Tier 1 tools.', why: 'The leading indicator for everything else. Low adoption means the learning program isn\'t working.' },
            { metric: 'Use case breadth', how: 'Number of distinct use cases being used per function per month. Track via champion reports.', why: 'Breadth indicates independent use is emerging — staff are finding their own applications beyond the initial training.' },
            { metric: 'Hours claimed back', how: 'Self-reported time saved per user per week. Survey monthly. Even rough numbers are valuable for ROI reporting.', why: 'The business outcome metric. If adoption is high but no time is being saved, the use cases are wrong, not the training.' },
            { metric: 'Champion health', how: 'Are champions still engaged? Are they producing new use cases? A disengaged champion is a leading indicator of programme stall.', why: 'Champions are the learning infrastructure\'s engine. Their engagement predicts the rest of the programme\'s trajectory.' },
          ].map(m => (
            <div key={m.metric} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-1">{m.metric}</p>
              <p className="text-slate-500 text-xs mb-2">{m.how}</p>
              <p className="text-xs text-blue-700 bg-blue-50 rounded px-2 py-1.5">{m.why}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
