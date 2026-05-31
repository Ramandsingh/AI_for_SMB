import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSections } from '../App';
import { useEffect } from 'react';
import { Search, ArrowRight, CheckCircle2 } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const STAGES = [
  { num: 1, label: 'Assistant',       pct: 20,  desc: 'Individuals use AI tools for personal productivity.',                                                tag: 'Entry'    },
  { num: 2, label: 'Accelerator',     pct: 40,  desc: 'AI embedded into specific processes to compress cycle times.',                                       tag: 'Early'    },
  { num: 3, label: 'Automator',       pct: 60,  desc: 'AI runs well-defined tasks end-to-end with minimal human touch.',                                    tag: 'Growth'   },
  { num: 4, label: 'Operator',        pct: 80,  desc: 'AI monitors, flags, and initiates — proactive intelligence layer.',                                  tag: 'Advanced' },
  { num: 5, label: 'Operating Model', pct: 100, desc: 'AI is embedded in how the business is designed to run.',                                             tag: 'Leader'   },
];

const STATS = [
  { value: '70–85%', label: 'AI projects fail without structure', source: 'Gartner',    alert: true  },
  { value: '40–60%', label: 'Daily time saved by enterprise AI',  source: 'OpenAI 2025', alert: false },
  { value: '2.7×',   label: 'Higher proficiency with training',   source: 'Larridin',   alert: false },
  { value: 'Stage 2→3', label: 'Highest financial impact window', source: 'MIT CISR',   alert: false },
];

const PATHS = [
  {
    id: 'new',
    label: 'New to AI',
    desc: "You're exploring what AI means for your organisation. Build literacy and identify your first moves.",
    color: 'blue',
    pages: [
      { to: '/p1',  label: 'Understanding AI' },
      { to: '/p2',  label: 'Maturity Journey' },
      { to: '/p7',  label: 'Technology & Tools' },
    ],
  },
  {
    id: 'building',
    label: 'Building Momentum',
    desc: 'You have early wins. Now formalise use cases, create a roadmap, and scale what works.',
    color: 'emerald',
    pages: [
      { to: '/p4',  label: 'Assessment & Discovery' },
      { to: '/p5',  label: 'Roadmap Options' },
      { to: '/p6',  label: 'ROI Calculator' },
    ],
  },
  {
    id: 'scaling',
    label: 'Scaling AI',
    desc: 'AI is running in production. Your focus is governance, agents, and org-wide capability.',
    color: 'violet',
    pages: [
      { to: '/p11', label: 'Org Contributions' },
      { to: '/p27', label: 'Governance & Risk' },
      { to: '/p41', label: 'Agents & Orchestration' },
    ],
  },
];

const PATH_COLOR = {
  blue:    { border: 'border-blue-500',    bg: 'bg-blue-50',    tag: 'bg-blue-100 text-blue-700',   link: 'text-blue-700 hover:text-blue-900', num: 'text-blue-600' },
  emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', tag: 'bg-emerald-100 text-emerald-700', link: 'text-emerald-700 hover:text-emerald-900', num: 'text-emerald-600' },
  violet:  { border: 'border-violet-500',  bg: 'bg-violet-50',  tag: 'bg-violet-100 text-violet-700',   link: 'text-violet-700 hover:text-violet-900', num: 'text-violet-600' },
};

const QUESTIONS = [
  { q: 'Are employees regularly using AI tools (Claude, Copilot, ChatGPT)?',         opts: ['No', 'Occasionally', 'Yes — most staff'] },
  { q: 'Are AI tools configured with your business context (policies, examples)?',    opts: ['No', 'Some tools', 'Yes — standard practice'] },
  { q: 'Do you have specific AI use cases mapped to business processes?',             opts: ['No', 'A few identified', 'Comprehensive list'] },
  { q: 'Are there AI-powered automations running with minimal human intervention?',   opts: ['No', 'Piloting one', 'Multiple in production'] },
  { q: 'Do you track ROI or measurable outcomes from AI initiatives?',                opts: ['No', 'Informally', 'Formally with metrics'] },
  { q: 'Do you have dedicated AI champions in key departments?',                      opts: ['No', 'One person', 'Multiple champions'] },
  { q: 'Does AI proactively surface insights or alerts without being prompted?',      opts: ['No', 'Planning to', 'Yes'] },
  { q: 'Is AI embedded in onboarding, hiring, or strategic planning?',               opts: ['No', 'Being considered', 'Yes'] },
  { q: 'Do you have formal AI governance and acceptable-use policies?',              opts: ['No', 'In progress', 'Yes'] },
  { q: 'Do AI tools connect to or interact with business systems or data sources?',  opts: ['No', 'Loosely', 'Integrated'] },
];

const STAGE_RESULTS = [
  { stage: 1, label: 'Stage 1 — Assistant',       range: [0,2],  pages: ['/p1','/p7','/p9'],  pageLabels: ['Understanding AI', 'Technology & Tools', 'Learning Approach'],     desc: 'Your organisation is beginning its AI journey. Focus on building literacy, selecting the right entry-level tools, and establishing a learning culture.' },
  { stage: 2, label: 'Stage 2 — Accelerator',     range: [3,4],  pages: ['/p2','/p5','/p10'], pageLabels: ['Maturity Journey', 'Roadmap Options', 'Individual Adoption'],     desc: 'You have early traction. Now formalise use cases, compress process cycle times, and invest in individual-level adoption across functions.' },
  { stage: 3, label: 'Stage 3 — Automator',       range: [5,6],  pages: ['/p4','/p6','/p11'], pageLabels: ['Assessment & Discovery', 'ROI Calculator', 'Org Contributions'], desc: 'AI is delivering real value in places. Your priority is structured assessment, governance, and scaling what works across the organisation.' },
  { stage: 4, label: 'Stage 4 — Operator',        range: [7,8],  pages: ['/p3','/p7','/p11'], pageLabels: ['Role Impact Map', 'Technology & Tools', 'Org Contributions'],   desc: 'AI is embedded in operations. Focus on the intelligent layer — agents, monitoring, and connecting AI to broader organisational goals.' },
  { stage: 5, label: 'Stage 5 — Operating Model', range: [9,10], pages: ['/p2','/p8','/p11'], pageLabels: ['Maturity Journey', 'Pitch & Narrative', 'Org Contributions'],   desc: 'AI is core to how you operate. Your conversation has shifted to strategic AI design, market differentiation, and AI-native workflows.' },
];

const SECTION_GROUPS = [
  { label: 'Foundation',               color: 'blue',    summary: 'Core AI literacy — what AI is, how adoption matures, and how it lands across roles.',                         pages: [{ to: '/p1',  label: 'Understanding AI' }, { to: '/p2', label: 'Maturity Journey' }, { to: '/p34', label: 'Maturity Canvas' }, { to: '/p3', label: 'Role Impact Map' }] },
  { label: 'Planning',                  color: 'emerald', summary: 'Structured discovery, roadmapping, and financial justification for AI initiatives.',                            pages: [{ to: '/p4',  label: 'Assessment & Discovery' }, { to: '/p5', label: 'Roadmap Options' }, { to: '/p6', label: 'ROI Calculator' }] },
  { label: 'Implementation',            color: 'indigo',  summary: 'Technology choices and learning culture for scaling AI across the organisation.',                                pages: [{ to: '/p7',  label: 'Technology & Tools' }, { to: '/p9', label: 'Learning Approach' }] },
  { label: 'People & Culture',          color: 'violet',  summary: 'Individual adoption paths and how AI reshapes roles, teams, and value creation.',                               pages: [{ to: '/p10', label: 'Individual Adoption' }, { to: '/p11', label: 'Org Contributions' }] },
  { label: 'Technology of AI',          color: 'cyan',    summary: 'Deep-dive into AI mechanics — categories, how it works, deployment, and a full glossary.',                      pages: [{ to: '/p17', label: 'What Is AI' }, { to: '/p18', label: 'Categories of AI' }, { to: '/p19', label: 'How AI Works' }, { to: '/p20', label: 'Where AI Deploys' }, { to: '/p21', label: 'AI & Your Tech Stack' }, { to: '/p22', label: 'Glossary' }] },
  { label: 'Enterprise Context',        color: 'amber',   summary: 'What enterprises do with AI, where value accumulates, and how to measure it.',                                  pages: [{ to: '/p12', label: 'What Enterprises Do' }, { to: '/p13', label: 'Where the Value Is' }, { to: '/p14', label: 'How to Adopt AI' }, { to: '/p15', label: 'When to Adopt AI' }, { to: '/p16', label: 'How to Measure Value' }] },
  { label: 'Executive Insights',        color: 'rose',    summary: 'Frameworks and findings from BCG, McKinsey, Bain, and Deloitte on AI adoption.',                                pages: [{ to: '/p29', label: 'BCG' }, { to: '/p30', label: 'McKinsey' }, { to: '/p31', label: 'Bain' }, { to: '/p32', label: 'Deloitte' }] },
  { label: 'Top AI Labs',               color: 'slate',   summary: 'Profiles of the leading AI research organisations shaping the industry.',                                        pages: [{ to: '/p35', label: 'OpenAI' }, { to: '/p36', label: 'Anthropic' }, { to: '/p37', label: 'Google' }, { to: '/p38', label: 'Chinese Labs' }] },
  { label: 'AI Model Concepts',         color: 'purple',  summary: 'How large language models, retrieval systems, and AI agents actually work.',                                     pages: [{ to: '/p39', label: 'How LLMs Work' }, { to: '/p40', label: 'Retrieval & Memory' }, { to: '/p41', label: 'Agents & Orchestration' }] },
  { label: 'Enterprise AI Development', color: 'orange',  summary: 'Building AI capabilities at scale — data, platforms, governance, and teams.',                                   pages: [{ to: '/p23', label: 'Data Infrastructure' }, { to: '/p24', label: 'The AI Factory' }, { to: '/p25', label: 'Foundation Models & RAG' }, { to: '/p26', label: 'Enterprise AI Platforms' }, { to: '/p27', label: 'Governance & Risk' }, { to: '/p28', label: 'Building the AI Team' }] },
  { label: 'Learning Hub',              color: 'teal',    summary: 'A structured 4-quarter curriculum from AI fundamentals to GenAI and MLOps.',                                    pages: [{ to: '/learn', label: 'Learning Hub' }, { to: '/learn/q1', label: 'Q1 — Foundations' }, { to: '/learn/q2', label: 'Q2 — Classical ML' }, { to: '/learn/q3', label: 'Q3 — Deep Learning' }, { to: '/learn/q4', label: 'Q4 — GenAI & MLOps' }] },
  { label: 'Your AI Fit',               color: 'green',   summary: 'Personalised AI fit analysis based on your role, industry, and goals.',                                         pages: [{ to: '/p33', label: 'How AI Fits You' }] },
  { label: 'Experimental UI',           color: 'fuchsia', summary: 'Live demos of data visualisation, AI chat, upload, and diagramming libraries.',                                 pages: [{ to: '/lab', label: 'Lab Home' }, { to: '/lab/upload', label: 'Image Upload' }, { to: '/lab/graph', label: 'Site Graph' }, { to: '/lab/chat', label: 'Chat Agent' }, { to: '/lab/arch', label: 'Architecture' }, { to: '/lab/charts', label: 'Data Viz' }, { to: '/lab/pdf', label: 'PDF Viewer' }] },
];

const SECTION_COLOR = {
  blue:    { bar: 'bg-blue-600',    dot: 'bg-blue-400',    link: 'hover:bg-blue-50 hover:text-blue-700' },
  emerald: { bar: 'bg-emerald-600', dot: 'bg-emerald-400', link: 'hover:bg-emerald-50 hover:text-emerald-700' },
  indigo:  { bar: 'bg-indigo-600',  dot: 'bg-indigo-400',  link: 'hover:bg-indigo-50 hover:text-indigo-700' },
  violet:  { bar: 'bg-violet-600',  dot: 'bg-violet-400',  link: 'hover:bg-violet-50 hover:text-violet-700' },
  cyan:    { bar: 'bg-cyan-600',    dot: 'bg-cyan-400',    link: 'hover:bg-cyan-50 hover:text-cyan-700' },
  amber:   { bar: 'bg-amber-500',   dot: 'bg-amber-400',   link: 'hover:bg-amber-50 hover:text-amber-700' },
  rose:    { bar: 'bg-rose-600',    dot: 'bg-rose-400',    link: 'hover:bg-rose-50 hover:text-rose-700' },
  slate:   { bar: 'bg-slate-600',   dot: 'bg-slate-400',   link: 'hover:bg-slate-50 hover:text-slate-700' },
  purple:  { bar: 'bg-purple-600',  dot: 'bg-purple-400',  link: 'hover:bg-purple-50 hover:text-purple-700' },
  orange:  { bar: 'bg-orange-500',  dot: 'bg-orange-400',  link: 'hover:bg-orange-50 hover:text-orange-700' },
  teal:    { bar: 'bg-teal-600',    dot: 'bg-teal-400',    link: 'hover:bg-teal-50 hover:text-teal-700' },
  green:   { bar: 'bg-green-600',   dot: 'bg-green-400',   link: 'hover:bg-green-50 hover:text-green-700' },
  fuchsia: { bar: 'bg-fuchsia-600', dot: 'bg-fuchsia-400', link: 'hover:bg-fuchsia-50 hover:text-fuchsia-700' },
};

function getStageResult(score) {
  return STAGE_RESULTS.find(s => score >= s.range[0] && score <= s.range[1]) || STAGE_RESULTS[0];
}

const TOTAL_PAGES = SECTION_GROUPS.reduce((n, g) => n + g.pages.length, 0);

const TABS = ['Overview', 'Quick Assessment', 'All Sections'];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ group }) {
  const c = SECTION_COLOR[group.color] || SECTION_COLOR.slate;
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
      <div className={`${c.bar} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">{group.label}</h3>
          <span className="text-white/60 text-xs font-medium tabular-nums">{group.pages.length} pages</span>
        </div>
        <p className="text-white/75 text-xs mt-1 leading-snug">{group.summary}</p>
      </div>
      <div className="divide-y divide-slate-50">
        {group.pages.map(page => (
          <Link key={page.to} to={page.to}
            className={`flex items-center gap-2.5 px-4 py-2.5 transition-colors group ${c.link}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
            <span className="text-xs font-semibold text-slate-700 group-hover:text-inherit transition-colors">{page.label}</span>
            <ArrowRight size={10} className="ml-auto text-slate-300 group-hover:text-current transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Landing() {
  const { setSections } = useSections();
  const [tab, setTab]           = useState('Overview');
  const [answers, setAnswers]   = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]     = useState(null);
  const [sectionFilter, setSectionFilter] = useState('');

  useEffect(() => { setSections([]); }, []);

  const answeredCount = answers.filter(a => a !== null).length;
  const allAnswered   = answeredCount === QUESTIONS.length;

  const handleAnswer = (qi, ai) => {
    const next = [...answers]; next[qi] = ai; setAnswers(next);
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, a) => acc + (a ?? 0), 0);
    setResult(getStageResult(score));
    setSubmitted(true);
    setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const filteredGroups = useMemo(() => {
    const q = sectionFilter.toLowerCase();
    if (!q) return SECTION_GROUPS;
    return SECTION_GROUPS.filter(g =>
      g.label.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.pages.some(p => p.label.toLowerCase().includes(q))
    );
  }, [sectionFilter]);

  return (
    <div>
      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 px-6 py-6 mb-6 overflow-hidden relative">
        {/* subtle grid texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">AI Adoption Dashboard</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
            From first awareness to<br className="hidden sm:block" /> operational value.
          </h1>
          <p className="text-slate-400 text-sm mb-5 max-w-xl">
            A structured guide for business leaders navigating the five stages of AI adoption — built for SMBs, grounded in evidence.
          </p>
          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.value} className={`rounded-xl px-3 py-3 ${s.alert ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-white/5 border border-white/10'}`}>
                <p className={`text-xl font-extrabold tabular-nums mb-0.5 ${s.alert ? 'text-amber-400' : 'text-white'}`}>{s.value}</p>
                <p className="text-xs text-slate-400 leading-snug">{s.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            {t}
            {t === 'Quick Assessment' && answeredCount > 0 && !submitted && (
              <span className="ml-1.5 text-xs bg-blue-100 text-blue-700 rounded-full px-1.5 py-0.5">{answeredCount}/{QUESTIONS.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Overview ──────────────────────────────────────────────── */}
      {tab === 'Overview' && (
        <>
          {/* Staircase */}
          <section className="mb-8">
            <div className="flex items-end justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">The AI Adoption Staircase</h2>
                <p className="text-slate-500 text-xs mt-0.5">Five stages — each builds on the last.</p>
              </div>
              <button onClick={() => setTab('Quick Assessment')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                Where am I? <ArrowRight size={11} />
              </button>
            </div>

            {/* Bars */}
            <div className="flex gap-2 items-end h-36 mb-3">
              {STAGES.map((s, i) => {
                const hue = 210 + i * 12;
                const light = 68 - i * 10;
                return (
                  <div key={s.num} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-bold tabular-nums" style={{ color: `hsl(${hue},60%,${light - 10}%)` }}>{s.pct}%</span>
                    <div className="w-full rounded-t-lg relative flex items-end justify-center pb-2"
                      style={{ height: `${s.pct}%`, background: `hsl(${hue},${45 + i * 8}%,${light}%)` }}>
                      <span className="text-xs font-extrabold text-white/90">{s.num}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage labels + descriptions — F-pattern grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {STAGES.map((s, i) => {
                const hue = 210 + i * 12;
                const light = 68 - i * 10;
                return (
                  <div key={s.num} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-extrabold" style={{ color: `hsl(${hue},60%,${light - 5}%)` }}>S{s.num}</span>
                      <span className="text-xs font-semibold text-slate-700">{s.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{s.desc}</p>
                    <span className="inline-block mt-1.5 text-xs px-1.5 py-0.5 rounded-full font-semibold"
                      style={{ background: `hsl(${hue},60%,93%)`, color: `hsl(${hue},60%,${light - 15}%)` }}>
                      {s.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Path chooser */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Where are you today?</h2>
            <p className="text-slate-500 text-xs mb-4">Pick the path that best describes your organisation — each links directly to the most relevant content.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PATHS.map(path => {
                const c = PATH_COLOR[path.color];
                return (
                  <div key={path.id} className={`rounded-xl border-l-4 ${c.border} ${c.bg} border border-slate-200 p-4`}>
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${c.tag}`}>{path.label}</span>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{path.desc}</p>
                    <div className="space-y-1">
                      {path.pages.map((p, i) => (
                        <Link key={p.to} to={p.to}
                          className={`flex items-center gap-2 text-xs font-semibold ${c.link} transition-colors group`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-white border ${c.border}`}>
                            <span className={c.num}>{i + 1}</span>
                          </span>
                          {p.label}
                          <ArrowRight size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick links row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <button onClick={() => setTab('Quick Assessment')}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all text-left group">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Not sure where you stand?</p>
                <p className="text-slate-500 text-xs mt-0.5">10 questions · 2 minutes · personalised reading path</p>
              </div>
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <ArrowRight size={14} className="text-blue-600" />
              </span>
            </button>
            <button onClick={() => setTab('All Sections')}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-sm transition-all text-left group">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Browse all content</p>
                <p className="text-slate-500 text-xs mt-0.5">{TOTAL_PAGES} pages · {SECTION_GROUPS.length} sections · searchable</p>
              </div>
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                <ArrowRight size={14} className="text-slate-600" />
              </span>
            </button>
          </section>
        </>
      )}

      {/* ── Tab 2: Quick Assessment ───────────────────────────────────────── */}
      {tab === 'Quick Assessment' && (
        <section>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900">Where are you today?</h2>
              <span className="text-xs font-semibold text-slate-500">
                {answeredCount} / {QUESTIONS.length} answered
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            {QUESTIONS.map((q, qi) => (
              <div key={qi} className={`rounded-xl border p-4 transition-colors ${answers[qi] !== null ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start gap-2 mb-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${answers[qi] !== null ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {answers[qi] !== null ? <CheckCircle2 size={12} /> : qi + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-800">{q.q}</p>
                </div>
                <div className="flex flex-wrap gap-2 pl-7">
                  {q.opts.map((opt, ai) => (
                    <button key={ai} onClick={() => handleAnswer(qi, ai)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all font-medium ${
                        answers[qi] === ai
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'
                      }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={!allAnswered}
            className={`mt-5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              allAnswered ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}>
            {allAnswered ? <>See My Maturity Stage <ArrowRight size={14} /></> : `Answer all ${QUESTIONS.length} questions to continue`}
          </button>

          {submitted && result && (
            <div id="result" className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-sm">
                  {result.stage}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Your current stage</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{result.label}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{result.desc}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Recommended reading</p>
                  <div className="flex flex-wrap gap-2">
                    {result.pages.map((path, i) => (
                      <Link key={path} to={path}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                        {result.pageLabels[i]} <ArrowRight size={10} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Tab 3: All Sections ───────────────────────────────────────────── */}
      {tab === 'All Sections' && (
        <section>
          {/* Header + search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">All Sections</h2>
              <p className="text-slate-500 text-xs mt-0.5">{TOTAL_PAGES} pages · {SECTION_GROUPS.length} sections</p>
            </div>
            <div className="relative sm:w-56">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={sectionFilter}
                onChange={e => setSectionFilter(e.target.value)}
                placeholder="Filter sections or pages…"
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Search size={28} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-medium">No sections match "{sectionFilter}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredGroups.map(group => <SectionCard key={group.label} group={group} />)}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
