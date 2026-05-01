import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '4.1 Principles of Good Assessment', level: 2 },
  { id: 's2', title: '4.2 The Assessment Toolkit',        level: 2 },
  { id: 's3', title: '4.3 Role & Task Opportunity Map',   level: 2 },
  { id: 's4', title: '4.4 What a Good Assessment Produces', level: 2 },
];

const TOOLKIT = [
  { name: 'Structured Work Observation',  icon: '👁️', duration: '2–4 hrs per role', desc: 'Sit alongside staff with their permission. Watch what they do between systems — that\'s where the opportunity lives. Look for copy-paste patterns, document reading, email triage, manual classification.', tip: 'A trained observer watching for 4 hours tells you more than a week of screen recordings — and earns trust rather than destroying it.' },
  { name: 'Task Diaries',                 icon: '📓', duration: '1 week self-report', desc: 'Give each participant a simple form to log tasks in 15–30 minute blocks: what they did, what systems they used, what frustrated them, what felt like wasted time.', tip: 'Staff do this willingly when framed as "help us find ways to make your job easier." You get directional data with their own commentary.' },
  { name: 'Process Walkthroughs',         icon: '🗺️', duration: '1 hr per process', desc: 'Ask someone to walk you through a typical process with actual paperwork and screens in front of them. Record the session (with consent) rather than their ongoing work.', tip: 'One hour of this per key process gives extraordinary insight and is a collaborative activity, not surveillance.' },
  { name: '"Show Me Your Inbox"',         icon: '📬', duration: '45–60 min', desc: 'Ask to sit with someone and have them walk through their last 20 emails and what each required. Repeat for last 10 tasks or calls. Repetitive patterns appear within the first 5 examples.', tip: 'Most AI opportunities are hiding in email threads. This technique surfaces them fast.' },
  { name: 'Consented Time Tracking',      icon: '⏱️', duration: '1–2 week data collection', desc: 'Tools like Toggl or RescueTime let users see where their time goes and opt to share aggregated summaries. Flips the dynamic — it\'s a tool for the employee, and you see the output.', tip: 'RescueTime uses AI to categorise activity and can produce role-level summaries without exposing individual content.' },
  { name: 'Meeting & Call Observation',   icon: '🎤', duration: 'Ongoing / consented', desc: 'Tools like Fireflies, Otter, or Gong capture meetings and calls. Often reveal bottlenecks — what gets discussed repeatedly, where decisions stall, which handoffs break down.', tip: 'Richer signal than individual task observation because meetings expose organisational friction, not just personal inefficiency.' },
];

const MAP_PHASES = [
  {
    phase: 'Phase 1', title: 'Role Decomposition',
    desc: 'For each key role, break the job into 8–15 recurring tasks. Not "manage the warehouse" but "receive inbound shipments", "resolve stock discrepancies", "respond to supplier delivery queries", "produce weekly stock report".',
    output: 'A list of discrete, named tasks per role — the unit of analysis for everything that follows.',
    time: 'Half a day per role (interview + one observation session)',
  },
  {
    phase: 'Phase 2', title: 'Task Characterisation',
    desc: 'For each task, capture: frequency (daily/weekly/monthly), time per instance, inputs (what comes in and from where), outputs (what gets produced and for whom), systems touched, judgment required, and pain level (1–5 from the person doing it).',
    output: 'A structured dataset with volumetrics and pain quantification that makes ROI estimates defensible.',
    time: '1–2 hours per role after observation data collected',
  },
  {
    phase: 'Phase 3', title: 'AI Opportunity Mapping',
    desc: 'Evaluate each task against AI suitability criteria: Is it language-heavy? Pattern-based? Does it involve reading documents or drafting content? Is the input unstructured and output structured? Does it require reasoning over reusable context? Score and rank.',
    output: 'A prioritised opportunity list per role. Frequency × time saved × pain = indicative ROI rank.',
    time: 'Half a day with the assessment team',
  },
];

export default function Assessment() {
  return (
    <PageWrapper
      badge="Page 4 — Planning"
      title="Assessment & Discovery Methodology"
      subtitle="How to evaluate an organisation's AI readiness before committing to a roadmap — ethically, collaboratively, and with results that stick."
      sections={SECTIONS}
    >
      {/* 4.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">4.1 Principles of Good Assessment</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[
            { principle: 'Observation beats surveillance', icon: '🤝', desc: 'Watch people work with their awareness and consent. Covert recording destroys trust, creates legal liability, and captures theatre rather than truth.' },
            { principle: 'Collaborative discovery', icon: '🗣️', desc: 'Treat staff as partners in identifying opportunities. They know where the pain is — your job is to give them a structured way to surface it.' },
            { principle: 'Evidence before recommendation', icon: '📊', desc: 'Every AI opportunity should trace to an observed task, a volumetric, and a pain score. Speculation without evidence produces roadmaps nobody believes.' },
          ].map(p => (
            <div key={p.principle} className="card">
              <span className="text-2xl mb-2 block">{p.icon}</span>
              <p className="font-semibold text-slate-800 text-sm mb-2">{p.principle}</p>
              <p className="text-slate-600 text-xs">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="card border-red-200 bg-red-50 text-sm">
          <p className="font-semibold text-red-800 mb-1">⚠️ The screen-recording detour — what not to do</p>
          <p className="text-red-700">Installing screen recorders on employee computers to "identify AI opportunities" triggers legal exposure in most jurisdictions (PDPA, GDPR, Australian Privacy Act), destroys the trust of the champions you need for adoption, captures sensitive customer and financial data you haven't consented to process, and produces 40+ hours of footage per person with terrible signal-to-noise. The six techniques below all achieve the same insight without the risk.</p>
        </div>
      </section>

      {/* 4.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">4.2 The Assessment Toolkit</h2>
        <div className="space-y-4">
          {TOOLKIT.map((t) => (
            <div key={t.name} className="card">
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-sm">{t.name}</h3>
                    <span className="badge-blue">{t.duration}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{t.desc}</p>
                  <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">💡 {t.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">4.3 The Role & Task AI Opportunity Map</h2>
        <p className="text-sm text-slate-500 mb-5">A three-phase methodology that converts observed work into a prioritised, defensible AI roadmap.</p>
        <div className="space-y-4">
          {MAP_PHASES.map((p, i) => (
            <div key={p.phase} className="card flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{i+1}</div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs text-blue-600 font-semibold">{p.phase}</span>
                  <h3 className="text-sm">{p.title}</h3>
                  <span className="ml-auto badge-amber">{p.time}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{p.desc}</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-xs font-semibold text-slate-500">Output: </span>
                  <span className="text-xs text-slate-600">{p.output}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scoring criteria */}
        <div className="card mt-6">
          <p className="font-semibold text-slate-800 text-sm mb-3">AI Suitability Scoring Criteria</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Is the task language-heavy? (reading, writing, classifying)',
              'Is it pattern-based and repetitive?',
              'Is the input unstructured (documents, emails) and output structured?',
              'Does it require reasoning over context that can be pre-loaded?',
              'Is the volume high enough to justify the effort?',
              'Is the judgment required low enough for AI to be trusted?',
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="text-blue-500 font-bold mt-0.5">✓</span> {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">4.4 What a Good Assessment Produces</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Prioritised Opportunity Map', desc: 'Every role, every key task, scored for AI suitability and ranked by indicative value. Presented visually to leadership.' },
            { title: 'Confidence Levels', desc: 'Each opportunity marked High / Medium / Low confidence based on how well-defined the task is and whether similar implementations exist.' },
            { title: 'ROI Estimates', desc: 'Conservative, evidence-based saving estimates per opportunity — showing working so the CFO can check the assumptions.' },
            { title: 'Recommended Sequence', desc: 'Which opportunities to attack first, second, and third — based on value, confidence, and organisational readiness.' },
          ].map(d => (
            <div key={d.title} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-2">{d.title}</p>
              <p className="text-slate-600 text-sm">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="card border-blue-200 bg-blue-50 mt-4 text-sm">
          <p className="font-semibold text-blue-800 mb-1">The deliverable clients value most</p>
          <p className="text-blue-700">A well-executed assessment produces something the business could not have produced itself: a map of where AI creates value in their specific context, with numbers they can take to a board and logic they can defend. That's a standalone deliverable worth paying for — even if the business doesn't proceed to implementation immediately.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
