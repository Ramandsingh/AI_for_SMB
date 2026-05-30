import { NavLink } from 'react-router-dom';
import {
  Target, Network, ShieldCheck, Library, CheckCircle2, ChevronRight, Users, GitBranch,
} from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Quarter Objective',                            level: 2 },
  { id: 's2', title: 'Module 1 — Multi-Agent Systems',              level: 2 },
  { id: 's3', title: 'Module 2 — Human-in-the-Loop Protocol',       level: 2 },
  { id: 's4', title: 'Module 3 — Corporate Prompt & Workflow Library', level: 2 },
  { id: 's5', title: 'Quarter 4 Outcomes',                          level: 2 },
];

const AGENTS = [
  { role: 'Writer',             color: 'blue',    desc: 'Generates first-draft content from brief, data, and templates.' },
  { role: 'Auditor',            color: 'amber',   desc: 'Reviews output for factual accuracy and internal consistency.' },
  { role: 'Compliance Officer', color: 'rose',    desc: 'Flags regulatory, legal, or policy violations before submission.' },
  { role: 'Summariser',         color: 'emerald', desc: 'Condenses long outputs into executive-ready briefings.' },
];

const HITL_STEPS = [
  { step: 1, label: 'Trigger',           human: false, desc: 'Incoming data or event starts the automated loop.' },
  { step: 2, label: 'AI Gather & Draft', human: false, desc: 'Agents collect relevant context and produce a draft output.' },
  { step: 3, label: '★ Human Review',    human: true,  desc: 'A person reads the draft, edits if needed, and approves or rejects.' },
  { step: 4, label: 'AI Refine',         human: false, desc: 'If revisions requested, agents incorporate feedback and re-draft.' },
  { step: 5, label: '★ Final Authorise', human: true,  desc: 'Human gives explicit final sign-off before publish, send, or submit.' },
];

const OUTCOMES = [
  'Explain how specialist AI agents divide labour and pass outputs between roles',
  'Identify at least 3 workflows in your department suitable for HITL automation',
  'Build a review checkpoint template — at what step does a human approve?',
  'Package 5+ high-performing prompt sequences as shareable Prompt Cards',
  'Present a Workflow Library prototype to a peer team and gather adoption feedback',
];

const colorMap = {
  blue:    'bg-blue-100 text-blue-700 border-blue-200',
  amber:   'bg-amber-100 text-amber-700 border-amber-200',
  rose:    'bg-rose-100 text-rose-700 border-rose-200',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function BizQ4() {
  return (
    <PageWrapper
      badge="Q4"
      title="Human-in-the-Loop Orchestration & Scale"
      subtitle="Months 10–12 · Elevate from task execution to orchestrating AI workflows across your organisation."
      sections={SECTIONS}
    >
      {/* s1: Quarter Objective */}
      <section id="s1" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Target size={18} className="text-amber-600" />
          <h2 className="text-xl font-bold text-slate-800">Quarter Objective</h2>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            By Q4 you have strong individual AI skills and department playbooks. This quarter you <strong>connect the dots</strong> — learning how AI agents can collaborate, where humans must stay in the loop, and how to package everything you have learned so your entire organisation benefits.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {['Understand multi-agent collaboration at a conceptual level', 'Build explicit human approval checkpoints into automated flows', 'Create a reusable Prompt & Workflow Library for your organisation'].map(o => (
              <div key={o} className="bg-white/70 rounded-lg p-3 text-xs text-slate-700 flex items-start gap-2">
                <ChevronRight size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
                {o}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* s2: Multi-Agent Systems */}
      <section id="s2" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Network size={18} className="text-violet-600" />
          <h2 className="text-xl font-bold text-slate-800">Module 1 — Introduction to Multi-Agent Systems</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Multi-agent systems assign distinct roles to specialised AI agents that hand work to each other — like a panel of experts collaborating on a document. <strong>No coding required</strong> — this module is conceptual.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-violet-600" />
            <p className="text-sm font-semibold text-slate-700">The Panel-of-Experts Model</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AGENTS.map(a => (
              <div key={a.role} className={`rounded-lg border p-3 ${colorMap[a.color]}`}>
                <p className="text-xs font-bold mb-1">{a.role}</p>
                <p className="text-xs leading-relaxed opacity-90">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 overflow-x-auto py-2">
            {AGENTS.map((a, i) => (
              <div key={a.role} className="flex items-center gap-2 flex-shrink-0">
                <div className={`rounded-md px-2 py-1 text-xs font-semibold border ${colorMap[a.color]}`}>{a.role}</div>
                {i < AGENTS.length - 1 && <GitBranch size={12} className="text-slate-400 rotate-90" />}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Agents pass outputs along the chain. Each specialist improves the result before it reaches you.</p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
          <strong>Key insight:</strong> You are the <em>orchestrator</em> — you define the goal, the agents, and the rules. You don't need to understand how each agent works internally; you need to understand what each one is responsible for.
        </div>
      </section>

      <div className="section-divider" />

      {/* s3: HITL */}
      <section id="s3" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck size={18} className="text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Module 2 — Human-in-the-Loop (HITL) Protocol Management</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          AI can gather, analyse, and draft — but <strong>a human must explicitly authorise final actions</strong> (sending, publishing, submitting). HITL protocols are the checkpoints that keep you in control.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">5-Step HITL Workflow</p>
          </div>
          <div className="divide-y divide-slate-100">
            {HITL_STEPS.map(s => (
              <div key={s.step} className={`flex items-start gap-4 px-5 py-4 ${s.human ? 'bg-blue-50/50' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.human ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {s.step}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${s.human ? 'text-blue-700' : 'text-slate-700'}`}>{s.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
                {s.human && (
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">HUMAN GATE</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { title: 'Authorisation',  desc: 'Only a named human can trigger the final "send" or "publish" action. The AI cannot do it autonomously.' },
            { title: 'Audit Trail',    desc: 'Every human approval is time-stamped and logged — who approved, when, and what version they saw.' },
            { title: 'Rollback Plan',  desc: 'If an automated action produces an error, there is always a manual override and a way to reverse it.' },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-bold text-slate-800 mb-1">{c.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* s4: Prompt & Workflow Library */}
      <section id="s4" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Library size={18} className="text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-800">Module 3 — The Corporate Prompt & Workflow Library</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Package high-performing prompt sequences and low-code workflow templates into a shared library so successful automations scale horizontally across your organisation.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-slate-100 bg-emerald-50 flex items-center justify-between">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Prompt Card Template</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Example</span>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-4 text-xs">
            {[
              { label: 'Name',           value: 'Competitive Tender Response' },
              { label: 'Use Case',       value: 'Draft a compliant, persuasive response to an incoming RFP in under 30 minutes.' },
              { label: 'Department',     value: 'Sales / Business Development' },
              { label: 'Tested By',      value: 'J. Okafor, Senior BD Manager — tested on 12 real RFPs (Q3 cohort)' },
              { label: 'Sample Output',  value: '"Executive Summary: We propose a phased implementation…" [750-word structured response]' },
            ].map(f => (
              <div key={f.label}>
                <p className="font-semibold text-slate-600 mb-0.5">{f.label}</p>
                <p className="text-slate-700 leading-relaxed">{f.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="font-semibold text-slate-600 mb-1">RACE Prompt</p>
              <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-700 leading-relaxed border border-slate-200">
                Role: You are a senior bid manager with 15 years of public sector tendering experience.<br />
                Action: Write a compliant executive summary and three key differentiator sections for the RFP below.<br />
                Context: Our company profile: [paste]. The RFP requirements: [paste]. Previous winning bid themes: [paste].<br />
                Expectation: Max 800 words. Use headers. End with a one-paragraph call to action.
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { title: 'Discoverability',  desc: 'Tag each card by department, use case, and AI tool so colleagues can search and find templates quickly.' },
            { title: 'Version Control',  desc: 'Track prompt versions. If a model update changes behaviour, you can compare outputs against the original.' },
            { title: 'Contribution Loop', desc: 'Make it easy for anyone to submit a new card. Reviewed by a department champion before publishing.' },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-bold text-slate-800 mb-1">{c.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* s5: Outcomes */}
      <section id="s5" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-800">Quarter 4 Outcomes</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-4">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">{o}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <NavLink to="/biz" className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
            ← Back to Hub Home
          </NavLink>
          <NavLink to="/biz/usecases" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Browse Department Use Cases →
          </NavLink>
        </div>
      </section>
    </PageWrapper>
  );
}
