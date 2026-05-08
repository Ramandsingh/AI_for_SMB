import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'McKinsey: Value-First Adoption',      level: 2 },
  { id: 's2', title: 'Gartner: Governance-Led Adoption',    level: 2 },
  { id: 's3', title: 'WEF: People-First Adoption',          level: 2 },
  { id: 's4', title: 'What All Three Agree On',             level: 2 },
  { id: 's5', title: 'Your 90-Day Starting Point',          level: 2 },
];

const MCKINSEY = {
  source: 'McKinsey Global Institute',
  ref: 'The State of AI — 2024 Global Survey & McKinsey AI Adoption Playbook',
  color: 'border-blue-400',
  tagline: '"Start with value, build with data, scale with capability."',
  phases: [
    {
      phase: '1', name: 'Value Mapping',
      desc: 'Before touching technology, identify the 3–5 workflows where AI delivers the highest ROI relative to implementation complexity. Use a 2×2 of value vs difficulty. Start in the top-left quadrant: high value, low complexity.',
      actions: [
        'Interview department heads on their 3 most time-consuming and error-prone workflows',
        'Quantify the time and cost of each — even rough estimates reveal priority order',
        'Map against available data: does the data needed for AI already exist?',
        'Select one "lighthouse" use case that is both high-value and achievable in 6 weeks',
      ],
    },
    {
      phase: '2', name: 'Data Readiness Assessment',
      desc: 'AI is only as good as its inputs. McKinsey finds that 60% of failed AI pilots trace their failure to data quality or availability issues that were not surfaced before build started.',
      actions: [
        'Audit data availability for your lighthouse use case: is it accessible, structured, recent?',
        'Identify data gaps and either resolve them or revise the use case scope',
        'Establish data governance basics: who owns it, who can access it, how fresh must it be?',
        'Document your "data debt" — you will need to address it as you scale',
      ],
    },
    {
      phase: '3', name: 'Capability Building',
      desc: 'McKinsey\'s research consistently finds that business user AI literacy — not technical tooling — is the primary differentiator between high- and low-performing AI adopters.',
      actions: [
        'Train business users on AI fundamentals and the specific tools being deployed',
        'Identify 1–2 "AI champions" per department who will drive adoption locally',
        'Invest in prompt engineering capability across the team — not just the technical function',
        'Build a small internal community of practice to share what works',
      ],
    },
    {
      phase: '4', name: 'Pilot → Measure → Scale',
      desc: 'Run a 6–12 week proof of concept. Measure rigorously against a pre-defined success metric. Only scale use cases that produce verified outcomes — not those that "feel like they\'re working."',
      actions: [
        'Define success metrics before the pilot starts — time saved, error rate, output quality',
        'Run a controlled comparison: AI-assisted vs non-AI-assisted on the same workflow',
        'Review results at week 6 with business owner and technical lead together',
        'If it works: build a scaling plan. If not: diagnose before pivoting, not instead of it',
      ],
    },
  ],
  keystat: '72% of AI value in high-performing organisations comes from fewer than 5 use cases, scaled deeply — not from many shallow deployments.',
};

const GARTNER = {
  source: 'Gartner',
  ref: 'AI Adoption and Risk Framework 2024 & Hype Cycle for Artificial Intelligence',
  color: 'border-emerald-400',
  tagline: '"Governance is not the enemy of speed — it is the prerequisite for it."',
  phases: [
    {
      phase: '1', name: 'Use Case Classification',
      desc: 'Not all AI use cases carry equal risk. Gartner\'s framework classifies use cases on two axes: business impact (high/low) and risk level (high/low). Each quadrant requires a different governance approach and approval process.',
      actions: [
        'High-impact, low-risk (e.g. document summarisation): fast-track, minimal governance',
        'High-impact, high-risk (e.g. credit decisions, HR screening): executive approval, bias testing, audit trail',
        'Low-impact, low-risk (e.g. meeting transcription): self-service, user discretion',
        'Low-impact, high-risk: do not deploy — risk exceeds value',
      ],
    },
    {
      phase: '2', name: 'Governance Framework First',
      desc: 'Gartner\'s research shows organisations that establish AI governance before scaling are 3× less likely to experience a costly AI failure or public incident. Governance unlocks speed — it does not slow it.',
      actions: [
        'Define: who is accountable when an AI output is wrong?',
        'Define: what is the escalation path from AI decision to human review?',
        'Define: how are AI models monitored for accuracy drift over time?',
        'Publish an internal AI use policy that covers acceptable use, data handling, and disclosure',
      ],
    },
    {
      phase: '3', name: 'Progressive Automation',
      desc: 'Gartner advocates a three-stage automation progression that builds trust before removing human oversight. This is not caution — it is risk-adjusted speed.',
      actions: [
        'Stage 1 — AI-Assisted: AI suggests, human decides. All outputs reviewed before action.',
        'Stage 2 — AI-Recommended: AI recommends, human approves. Spot-check reviews only.',
        'Stage 3 — AI-Automated: AI acts, exception handling only. Human reviews anomalies.',
        'Advance each use case through stages based on accuracy evidence, not time elapsed',
      ],
    },
    {
      phase: '4', name: 'Continuous Monitoring',
      desc: 'AI models drift as the world changes. Data patterns shift, language evolves, business rules change. Gartner finds that 40% of AI models degrade meaningfully within 12 months of deployment without monitoring.',
      actions: [
        'Build output quality monitoring into every production deployment from day one',
        'Set accuracy thresholds that trigger automatic human review escalation',
        'Schedule quarterly model performance reviews with business owners',
        'Track "shadow metrics" — what human reviewers are correcting, and why',
      ],
    },
  ],
  keystat: 'Organisations with formal AI governance see 3× fewer costly AI failures and 40% higher stakeholder trust scores — Gartner, 2024.',
};

const WEF = {
  source: 'World Economic Forum',
  ref: 'Future of Jobs Report 2025 & WEF AI Governance Alliance Framework',
  color: 'border-purple-400',
  tagline: '"The technology is ready. The people readiness is what determines outcomes."',
  phases: [
    {
      phase: '1', name: 'People Strategy First',
      desc: 'The WEF\'s research across 1,000+ global employers identifies workforce readiness — not technology — as the #1 barrier to AI adoption. Investing in tools before investing in people produces tools that gather dust.',
      actions: [
        'Conduct an AI readiness survey: what do employees know, fear, and want?',
        'Design a tiered training programme: awareness → guided use → independent use → champion',
        'Communicate openly about AI\'s role — ambiguity creates fear; clarity creates engagement',
        'Involve employees in use case selection — they know which tasks they hate most',
      ],
    },
    {
      phase: '2', name: 'Human–AI Collaboration Design',
      desc: 'The WEF advocates designing workflows where AI and humans each do what they do best. AI handles volume, pattern-matching, and consistency. Humans handle exceptions, relationships, ethics, and creativity.',
      actions: [
        'Map each workflow: which steps are pattern-based (AI), which require judgment (human)?',
        'Design handoff points explicitly — where does AI output pass to human review?',
        'Avoid "automation bias": train teams not to accept AI outputs uncritically',
        'Create feedback loops: human corrections improve AI over time if captured systematically',
      ],
    },
    {
      phase: '3', name: 'Inclusive Deployment',
      desc: 'WEF research shows that AI adoption concentrated in a digital team or IT function produces 40–60% lower organisational benefit than adoption distributed across frontline workers. Inclusivity is not an ESG goal — it is a return maximiser.',
      actions: [
        'Include frontline workers in AI tool selection — they have the highest-frequency workflows',
        'Remove access barriers: licensing, training, manager permission, language',
        'Measure adoption rates by department and seniority level — gaps indicate barriers',
        'Celebrate early adopters visibly to accelerate peer diffusion',
      ],
    },
    {
      phase: '4', name: 'Transparent Transition Management',
      desc: 'The WEF projects net job creation from AI — but only for organisations that actively manage the transition. Passive approaches produce disruption without benefit. The organisations that manage this well gain adoption speed as a direct result.',
      actions: [
        'Map which roles are augmented (grow in scope), transformed (change significantly), or displaced',
        'Communicate transition plans clearly and early — uncertainty is more damaging than change',
        'Invest in reskilling for affected roles: AI changes what skills are valuable, not that skills matter',
        'Build new AI-native roles: Champion, Programme Owner, Prompt Specialist, Governance Lead',
      ],
    },
  ],
  keystat: '85M jobs displaced, 97M new roles created by 2025 — net positive, but only for organisations actively managing the workforce transition. — WEF, 2025.',
};

const CONSENSUS = [
  { point: 'Start with a specific, high-value use case — not an AI strategy document', detail: 'All three frameworks agree: action creates learning that planning cannot. A 6-week pilot teaches more than 6 months of strategy.' },
  { point: 'Business ownership is non-negotiable', detail: 'AI programs owned only by technology fail at a significantly higher rate. Business units must co-own the use case, the metrics, and the outcome.' },
  { point: 'Measure outcomes, not activities', detail: 'Not how many tools deployed, not how many staff trained. Only: what business result improved, by how much, because of AI?' },
  { point: 'Iteration is the model — not perfection', detail: 'The first version will be imperfect. The goal of a pilot is to learn fast, not to launch perfectly. Organisations waiting for certainty before starting never start.' },
  { point: 'Data is infrastructure — treat it as such', detail: 'All three sources identify data quality and availability as the most common technical failure point. Data investment before AI investment pays off.' },
  { point: 'Culture determines ceiling', detail: 'Technology is not the constraint. Organisations with strong AI cultures consistently outperform those with strong AI tools but weak adoption cultures.' },
];

const NINETY_DAY = [
  { week: 'Weeks 1–2', label: 'Use Case Selection', tasks: ['Run a value mapping workshop with department heads', 'Score 5–8 candidate use cases on value × difficulty', 'Select one lighthouse use case with a named business owner'] },
  { week: 'Weeks 3–4', label: 'Data & Tool Assessment', tasks: ['Audit data availability and quality for the selected use case', 'Evaluate 2–3 AI tool options (build vs buy)', 'Define success metrics before anything is built'] },
  { week: 'Weeks 5–8', label: 'Pilot Deployment', tasks: ['Deploy AI-assisted workflow to a small group (5–10 people)', 'Train participants on tool use and prompt design', 'Run parallel: AI-assisted vs baseline for 3–4 weeks'] },
  { week: 'Weeks 9–10', label: 'Measure & Review', tasks: ['Compare results against pre-defined success metrics', 'Interview pilot participants: what worked, what did not', 'Document learnings and share with leadership'] },
  { week: 'Weeks 11–12', label: 'Decision Point', tasks: ['Scale decision: expand, refine, or pivot', 'If scaling: build a 6-month rollout plan', 'Identify use case #2 and begin the process again'] },
];

function Framework({ data }) {
  return (
    <div className={`card border-l-4 ${data.color}`}>
      <div className="mb-4">
        <p className="font-bold text-slate-900 text-base">{data.source}</p>
        <p className="text-xs text-slate-500 mt-0.5 mb-2">{data.ref}</p>
        <p className="text-sm italic text-slate-600 bg-slate-50 rounded px-3 py-2">{data.tagline}</p>
      </div>
      <div className="space-y-4">
        {data.phases.map((p) => (
          <div key={p.phase} className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{p.phase}</span>
              <h3 className="font-bold text-slate-800">{p.name}</h3>
            </div>
            <p className="text-sm text-slate-600 mb-3">{p.desc}</p>
            <ul className="space-y-1">
              {p.actions.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-300 flex-shrink-0 mt-0.5">→</span>{a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-white rounded-lg px-3 py-2 border border-slate-100 text-xs text-slate-600">
        <strong>Key finding:</strong> {data.keystat}
      </div>
    </div>
  );
}

export default function EnterpriseHowAdopt() {
  return (
    <PageWrapper
      badge="Page 14 — Enterprise Context"
      title="How to Adopt AI"
      subtitle="Step-by-step adoption guidance from McKinsey, Gartner, and the World Economic Forum — the three most authoritative global sources on enterprise AI adoption."
      sections={SECTIONS}
    >

      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">McKinsey: Value-First Adoption</h2>
        <Framework data={MCKINSEY} />
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Gartner: Governance-Led Adoption</h2>
        <Framework data={GARTNER} />
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">WEF: People-First Adoption</h2>
        <Framework data={WEF} />
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">What All Three Agree On</h2>
        <p className="text-slate-500 text-sm mb-6">Despite different emphases, McKinsey, Gartner, and the WEF converge on six principles. These are the highest-confidence recommendations in enterprise AI adoption.</p>
        <div className="space-y-3">
          {CONSENSUS.map((c, i) => (
            <div key={i} className="card">
              <p className="font-semibold text-slate-800 mb-1">{c.point}</p>
              <p className="text-sm text-slate-500">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Your 90-Day Starting Point</h2>
        <p className="text-slate-500 text-sm mb-6">A practical 90-day plan that synthesises all three frameworks into a sequence any organisation can follow regardless of size or current AI maturity.</p>
        <div className="space-y-3">
          {NINETY_DAY.map((d) => (
            <div key={d.week} className="card">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex-shrink-0">{d.week}</span>
                <h3 className="font-bold text-slate-800">{d.label}</h3>
              </div>
              <ul className="space-y-1">
                {d.tasks.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-slate-300 flex-shrink-0">→</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="card bg-slate-800 text-white mt-6">
          <p className="font-bold text-sm mb-2">The only prerequisite</p>
          <p className="text-slate-300 text-sm leading-relaxed">You do not need a perfect data strategy, a dedicated AI team, or executive-approved budget to start. You need one use case, one business owner, and 6 weeks. Everything else follows from what you learn.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
