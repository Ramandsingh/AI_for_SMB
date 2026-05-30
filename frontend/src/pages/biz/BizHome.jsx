import { NavLink } from 'react-router-dom';
import { TrendingUp, BookOpen, Library, ChevronRight, Users, ArrowRight } from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The 20-80 Rule',          level: 2 },
  { id: 's2', title: 'Who This Is For',          level: 2 },
  { id: 's3', title: 'Your 1-Year Journey',      level: 2 },
  { id: 's4', title: 'Reference Library',        level: 2 },
];

const ROLES = [
  { emoji: '💰', label: 'Finance',              to: '/biz/q3' },
  { emoji: '📣', label: 'Marketing & Sales',    to: '/biz/q3' },
  { emoji: '⚙️', label: 'Operations',           to: '/biz/q3' },
  { emoji: '🧑‍🤝‍🧑', label: 'HR & People',          to: '/biz/q3' },
  { emoji: '⚖️', label: 'Legal & Compliance',   to: '/biz/q3' },
  { emoji: '🖥️', label: 'IT',                   to: '/biz/q3' },
  { emoji: '🧭', label: 'Strategy',             to: '/biz/q3' },
  { emoji: '🔬', label: 'Research',             to: '/biz/q3' },
];

const QUARTERS = [
  {
    q: 'Q1',
    to: '/biz/q1',
    title: 'Tool Fluency & The Personal AI Copilot',
    months: 'Months 1–3',
    objective: 'Eliminate AI anxiety. Build daily productivity baselines.',
    outcomes: [
      'Master enterprise AI tools (Copilot, Gemini)',
      'Apply RACE prompting framework consistently',
      'Perform structured data tasks without IT support',
    ],
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    dot: 'bg-blue-400',
  },
  {
    q: 'Q2',
    to: '/biz/q2',
    title: 'Connected Workflows & Low-Code Pipelines',
    months: 'Months 4–6',
    objective: 'Move from one-off prompts to multi-step automated data streams.',
    outcomes: [
      'Extract structured data from unstructured sources',
      'Build basic automations with Zapier or Make.com',
      'Apply Trust-but-Verify hallucination defense',
    ],
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    dot: 'bg-emerald-400',
  },
  {
    q: 'Q3',
    to: '/biz/q3',
    title: 'Functional Specialization & Department Playbooks',
    months: 'Months 7–9',
    objective: 'Deploy AI playbooks tailored to your department\'s exact needs.',
    outcomes: [
      'Execute 5+ high-value use cases in your function',
      'Navigate regulatory and data requirements for your domain',
      'Mentor peers in your department',
    ],
    gradient: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    text: 'text-violet-700',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-800',
    dot: 'bg-violet-400',
  },
  {
    q: 'Q4',
    to: '/biz/q4',
    title: 'Human-in-the-Loop Orchestration & Scale',
    months: 'Months 10–12',
    objective: 'Elevate from task execution to AI workflow orchestration.',
    outcomes: [
      'Understand multi-agent collaboration concepts',
      'Build HITL review checkpoints into automated loops',
      'Create and share reusable prompt and workflow templates',
    ],
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    dot: 'bg-amber-400',
  },
];

export default function BizHome() {
  return (
    <PageWrapper
      badge="Business AI Learning Hub"
      title="AI for Business Professionals"
      subtitle="A practical 12-month program for non-technical professionals in every department. No coding required."
      sections={SECTIONS}
    >
      {/* ── Section 1: The 20-80 Rule ────────────────────────────── */}
      <section id="s1" className="section-anchor mb-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-8 sm:p-10 text-white shadow-xl">
          {/* decorative circles */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-500/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-violet-500/10" />

          <div className="relative z-10 flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-1 block">The Core Principle</span>
              <h2 className="text-white text-xl font-bold">The 20-80 Rule of Business AI</h2>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-5">
              <p className="text-4xl font-black text-blue-300 mb-2">20%</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                of the value comes from <strong className="text-white">understanding AI technology</strong> — knowing what it can do and how it works at a conceptual level.
              </p>
            </div>
            <div className="flex items-center justify-center text-slate-500 text-xl font-light">vs</div>
            <div className="flex-1 rounded-xl bg-blue-500/15 border border-blue-400/20 p-5">
              <p className="text-4xl font-black text-emerald-300 mb-2">80%</p>
              <p className="text-sm text-slate-200 leading-relaxed">
                of the value comes from <strong className="text-white">redesigning your everyday business processes</strong> around AI — changing how you work, not just what tools you use.
              </p>
            </div>
          </div>

          <p className="relative z-10 mt-6 text-sm text-slate-400 leading-relaxed max-w-2xl">
            This curriculum teaches you the 20% of conceptual knowledge you need — then spends the remaining 80% of its time on process redesign, workflow automation, and department-specific playbooks. That is where the ROI lives.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Section 2: Who This Is For ───────────────────────────── */}
      <section id="s2" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-slate-400" />
          <h2>Who This Is For</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          This program is built for professionals in business functions — not engineers or data scientists. Select your department to see tailored playbooks in Q3.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ROLES.map((r) => (
            <NavLink
              key={r.label}
              to={r.to}
              className="card-interactive flex flex-col items-center gap-2 p-4 text-center group hover:border-blue-300"
            >
              <span className="text-2xl">{r.emoji}</span>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors leading-snug">{r.label}</span>
              <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                Playbooks <ArrowRight className="w-3 h-3" />
              </span>
            </NavLink>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Section 3: 1-Year Journey ────────────────────────────── */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Your 1-Year Journey</h2>
        <p className="text-slate-500 text-sm mb-5">
          Four quarters, each building directly on the previous. You do not need any technical background to begin — only curiosity and a willingness to change how you work.
        </p>
        <div className="space-y-4">
          {QUARTERS.map((q) => (
            <NavLink
              key={q.q}
              to={q.to}
              className="block card hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Q badge */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${q.gradient} flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-sm`}>
                  {q.q}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{q.title}</h3>
                      <span className="text-xs text-slate-400">{q.months}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                  </div>

                  {/* Objective */}
                  <p className={`text-xs px-3 py-1.5 rounded-lg ${q.bg} ${q.text} border mb-3 inline-block font-medium`}>
                    Objective: {q.objective}
                  </p>

                  {/* Key outcomes */}
                  <div className="flex flex-wrap gap-1.5">
                    {q.outcomes.map((o) => (
                      <span key={o} className="text-xs text-slate-500 flex items-center gap-1">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${q.dot} flex-shrink-0`} />
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Section 4: Reference Library ─────────────────────────── */}
      <section id="s4" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Library className="w-4 h-4 text-slate-400" />
          <h2>Reference Library</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          Searchable databases of real-world AI applications. Use these as inspiration when identifying where AI can add value in your work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Industry Use Cases */}
          <NavLink
            to="/biz/industries"
            className="card-interactive group flex flex-col gap-3 hover:border-blue-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Industry Use Cases</h3>
                <p className="text-xs text-slate-400">275 use cases · 11 industries</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Real-world AI applications organized by vertical — from healthcare and financial services to manufacturing, retail, and professional services.
            </p>
            <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Browse industries <ArrowRight className="w-3 h-3" />
            </span>
          </NavLink>

          {/* Department Use Cases */}
          <NavLink
            to="/biz/usecases"
            className="card-interactive group flex flex-col gap-3 hover:border-emerald-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Department Use Cases</h3>
                <p className="text-xs text-slate-400">450+ use cases · 25 functions</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI applications organized by business function — Finance, Marketing, HR, Legal, Operations, and 20 more. Find your exact role and get tactical ideas immediately.
            </p>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Browse departments <ArrowRight className="w-3 h-3" />
            </span>
          </NavLink>
        </div>
      </section>
    </PageWrapper>
  );
}
