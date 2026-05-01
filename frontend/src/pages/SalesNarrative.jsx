import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '8.1 The Six-Beat Pitch',          level: 2 },
  { id: 's2', title: '8.2 Framings That Land',           level: 2 },
  { id: 's3', title: '8.3 Objection Handling Library',   level: 2 },
  { id: 's4', title: '8.4 Proposal Structure Templates', level: 2 },
];

const BEATS = [
  { num: 1, title: 'Name the shift',     color: 'bg-slate-700', body: '"AI isn\'t a future technology for your business — it\'s a current one. The question isn\'t whether to use it, it\'s where to apply it first and how to prove value."', purpose: 'Acknowledges the pressure they\'re already feeling. Positions you as the calm guide, not another hype vendor.' },
  { num: 2, title: 'Anchor to their reality', color: 'bg-slate-700', body: '"Before we talk about AI, let me play back what we know about your business." Reference their specific pain points, constraints, and what they\'ve told you.', purpose: 'Demonstrates you\'re not selling generic AI. You\'ve listened. This is their conversation, not your pitch.' },
  { num: 3, title: 'Define value in their language', color: 'bg-slate-700', body: 'Introduce the four value categories — but frame each using something the client has already said they care about. "You mentioned month-end is painful — that\'s time reclaimed."', purpose: 'Makes AI concrete and personal. Clients buy outcomes in their language, not AI features in yours.' },
  { num: 4, title: 'Show concrete opportunities', color: 'bg-blue-700', body: 'Three to five, no more. For each: the business problem, the AI approach, the estimated value in their units (hours, dollars, volume), the cost range, and the confidence level.', purpose: 'Specificity builds credibility. Naming confidence levels explicitly ("this one we\'ve done three times") is a differentiator in a market full of over-confident vendors.' },
  { num: 5, title: 'Propose the phased model', color: 'bg-blue-700', body: 'Phase A (Assessment, fixed price) → Phase B (Proof of Value, one use case, measurable) → Phase C (Scale, triggered only if B succeeds). "You only pay for the next phase if the previous one worked."', purpose: 'De-risks the buyer\'s decision. This is structurally different from asking for a large upfront commitment. Cost-sensitive buyers will move for this.' },
  { num: 6, title: 'Handle objections early', color: 'bg-blue-800', body: 'Name the three or four objections you know they\'re thinking before they raise them. Answer each directly and briefly. Then ask: "What else would you want us to think through?"', purpose: 'Proactively handling objections signals you\'ve sold this before and you\'re confident. It also signals honesty — you\'re not hiding from hard questions.' },
];

const FRAMINGS = [
  { title: 'The staircase metaphor', body: '"AI isn\'t a destination, it\'s a staircase. Each stage creates real value, each stage prepares the business for the next, and skipping stages is how AI programs fail. Our job is to help you climb deliberately."', why: 'Reframes AI from a technology purchase to an organisational capability. Positions your methodology as the thing that makes the difference.' },
  { title: 'The 70–85% failure statistic', body: '"Most AI projects fail — and they fail for predictable reasons: lack of governance, skipping maturity stages, inadequate enablement. Our methodology is specifically designed to avoid these failure patterns."', why: 'Reframes your advisory fee as insurance against the failure rate. Uncomfortable statistic, but it\'s exactly what justifies a structured approach over buying a tool.' },
  { title: 'The risk of inaction', body: '"The risk isn\'t that you spend money on AI and it doesn\'t work. The risk is that competitors spend less than you expect, get value faster than you expect, and compound that advantage for two years before you start."', why: 'Reframes inaction as the risky choice. For cost-sensitive buyers who are hesitating, this is the framing that breaks the logjam.' },
  { title: 'The buyer you\'re pitching to', body: '"The buyers who get the best outcomes from AI are the ones who want to be early enough to benefit and disciplined enough not to waste money on hype. That\'s exactly who this approach is built for."', why: 'Flatters without being sycophantic. Describes the ideal buyer in terms that make a cost-sensitive, skeptical business leader feel seen and understood.' },
];

const OBJECTIONS = [
  { obj: '"How do we know AI will work for us?"',          resp: '"We don\'t — with certainty — and anyone who tells you otherwise is selling. That\'s exactly why Phase A exists and why Phase B has a success metric agreed upfront. We replace speculation with evidence."' },
  { obj: '"What about data security?"',                    resp: '"Enterprise tiers of Claude and ChatGPT don\'t train on your data by default — we verify this contractually. For sensitive data, we can run models on your infrastructure. Here\'s our data handling framework."' },
  { obj: '"Our staff won\'t use it."',                     resp: '"This is the real risk, and it\'s why our methodology spends as much on adoption as on build. We design the tools to fit existing workflows, train champions in each function, and run regular office hours. Adoption is a deliverable, not an assumption."' },
  { obj: '"What if the technology changes?"',              resp: '"It will. Our architecture assumes model swaps every 12–18 months. We abstract the LLM layer so you get better and cheaper capability without rebuilding. Technology change is a feature, not a risk."' },
  { obj: '"We don\'t have time for this."',                resp: '"That\'s exactly why we start with commercial tools your team can use next week, not a six-month build project. The first 30 days reclaim time. Phase B is only 8–10 weeks. You\'ll have time back before the project ends."' },
  { obj: '"We tried AI before and it didn\'t work."',      resp: '"That\'s the most common response we hear, and the most useful. Walk me through what happened — the failure mode usually tells us exactly what to fix. Most AI project failures trace to one of four causes, all of which are preventable."' },
];

export default function SalesNarrative() {
  return (
    <PageWrapper
      badge="Page 8 — Sales Toolkit"
      title="The Pitch & Sales Narrative Toolkit"
      subtitle="The six-beat pitch structure, framings that land, objection handling library, and proposal templates for client conversations."
      sections={SECTIONS}
    >
      <div className="card border-amber-200 bg-amber-50 mb-8 text-sm">
        <p className="font-semibold text-amber-800 mb-1">Internal use</p>
        <p className="text-amber-700">This page contains internal sales guidance. Consider gating from client-facing deployments of this dashboard.</p>
      </div>

      {/* 8.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">8.1 The Six-Beat Pitch Structure</h2>
        <p className="text-sm text-slate-500 mb-5">Each beat builds on the last. Don't skip beats — they each do specific work in the conversation.</p>
        <div className="space-y-3">
          {BEATS.map((b) => (
            <div key={b.num} className={`rounded-xl p-5 text-white ${b.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">{b.num}</div>
                <h3 className="text-base text-white">{b.title}</h3>
              </div>
              <p className="text-sm text-slate-200 italic mb-3">{b.body}</p>
              <p className="text-xs text-slate-300 bg-white/10 rounded-lg px-3 py-2">Why this works: {b.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">8.2 Key Framings That Land</h2>
        <div className="space-y-4">
          {FRAMINGS.map((f) => (
            <div key={f.title} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-3">{f.title}</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 text-sm text-slate-600 italic mb-3">"{f.body}"</blockquote>
              <p className="text-xs text-emerald-700 bg-emerald-50 rounded px-3 py-2">Why it works: {f.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">8.3 Objection Handling Library</h2>
        <div className="space-y-3">
          {OBJECTIONS.map((o) => (
            <div key={o.obj} className="card">
              <p className="text-sm font-medium text-slate-800 mb-3">"{o.obj}"</p>
              <p className="text-sm text-blue-800 bg-blue-50 rounded-lg px-4 py-3 leading-relaxed">{o.resp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">8.4 Proposal Structure Templates</h2>
        <div className="space-y-4">
          {[
            {
              title: 'One-page leave-behind',
              sections: ['Business context (2 sentences showing you listened)', 'Three AI opportunities with indicative value (bullet each)', 'Proposed next step (specific, low-commitment)', 'Contact and credentials strip'],
            },
            {
              title: 'Client discussion document (4–6 pages)',
              sections: ['Executive summary — the staircase, where they are, what the next stage unlocks', 'AI definition in their language — four capabilities, five value categories', 'Opportunity map — 5–8 use cases with value, confidence, and sequence', 'The phased model — Phase A/B/C with pricing', 'Objection responses — pre-answered in the document', 'Evidence base — Gartner/MIT CISR citations, relevant statistics'],
            },
            {
              title: 'Full proposal',
              sections: ['Assessment findings', 'Recommended use case with ROI model (showing working)', 'Implementation approach and timeline', 'Team and credentials', 'Commercial terms and success metrics', 'Appendix: technical architecture, risk register, references'],
            },
          ].map(t => (
            <div key={t.title} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-3">{t.title}</p>
              <ul className="space-y-1.5">
                {t.sections.map(s => (
                  <li key={s} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
