import { NavLink } from 'react-router-dom';
import {
  Target, Laptop, PenLine, Terminal, CheckCircle2, AlertTriangle, ChevronRight,
} from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Quarter Objective',                        level: 2 },
  { id: 's2', title: 'Module 1 — Enterprise Cowork Space',       level: 2 },
  { id: 's3', title: 'Module 2 — Business Prompt Engineering',   level: 2 },
  { id: 's4', title: 'Module 3 — Desktop CLI Toolkit',           level: 2 },
  { id: 's5', title: 'Quarter 1 Outcomes',                       level: 2 },
];

const ENTERPRISE_SKILLS = [
  {
    title: 'Meeting Synthesis',
    desc: 'Generate accurate, structured meeting summaries — with action items, owners, and deadlines — directly from transcripts or notes.',
  },
  {
    title: 'Context-Aware Email Threading',
    desc: 'Draft responses and follow-ups that are aware of the full email chain. Stop re-explaining context every time.',
  },
  {
    title: 'Multi-Document Cross-Referencing',
    desc: 'Ask questions that span multiple documents simultaneously — contracts, policies, reports — without reading each one.',
  },
  {
    title: 'Unstructured Draft Cleanup',
    desc: 'Take messy voice notes, bullet fragments, or stream-of-consciousness input and transform them into polished, structured documents.',
  },
  {
    title: 'Spreadsheet & Data Queries',
    desc: 'Ask questions about your data in plain English. Copilot and Gemini can write Excel formulas, filter data, and create pivot summaries on request.',
  },
  {
    title: 'Presentation Drafting',
    desc: 'Turn an outline or a data file into a full slide deck draft. Revise structure and tone with follow-up prompts in the same session.',
  },
];

const RACE = [
  {
    letter: 'R',
    color: 'blue',
    label: 'Role',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
    badge: 'bg-blue-600',
    desc: 'Who you are telling the AI to be',
    example: 'You are a senior financial analyst at a mid-size manufacturing company.',
  },
  {
    letter: 'A',
    color: 'emerald',
    label: 'Action',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-600',
    desc: 'Exactly what you want it to do',
    example: 'Write a 3-paragraph executive summary of the attached Q3 results.',
  },
  {
    letter: 'C',
    color: 'violet',
    label: 'Context',
    bg: 'bg-violet-50 border-violet-200',
    text: 'text-violet-700',
    badge: 'bg-violet-600',
    desc: 'Background information it needs',
    example: 'The audience is our board of directors. The results beat expectations by 8%.',
  },
  {
    letter: 'E',
    color: 'amber',
    label: 'Expectation',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-600',
    desc: 'Format and constraints for the output',
    example: 'Use formal language. Maximum 200 words. No bullet points. End with one forward-looking sentence.',
  },
];

const OUTCOMES = [
  'Use Microsoft 365 Copilot or Google Gemini to synthesize a meeting into structured notes within 2 minutes of it ending.',
  'Write a RACE-formatted prompt for any recurring task in your role and achieve a usable first draft on the first attempt.',
  'Cross-reference two or more documents to answer a question — without reading either document in full.',
  'Clean and structure unformatted notes or voice memos into a polished, shareable document.',
  'Explain the RACE framework to a colleague and help them write their first structured prompt.',
];

export default function BizQ1() {
  return (
    <PageWrapper
      badge="Q1"
      title="Tool Fluency & The Personal AI Copilot"
      subtitle="Months 1–3 · Eliminate AI anxiety and establish daily personal productivity baselines."
      sections={SECTIONS}
    >
      {/* Objective banner */}
      <div className="card bg-blue-50 border-blue-200 text-blue-800 text-sm mb-8 flex items-start gap-3">
        <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5">Quarter Objective</strong>
          Eliminate AI anxiety. Build daily productivity baselines using your company-approved tools. By the end of Q1 you should reach for AI before reaching for a search engine.
        </div>
      </div>

      {/* ── s1: Quarter Objective ──────────────────────────────── */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Quarter Objective</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Duration',    value: 'Months 1–3',   sub: '~4 hrs/week recommended' },
            { label: 'Modules',     value: '3 modules',    sub: 'Module 3 is optional (advanced)' },
            { label: 'Focus',       value: 'Daily tools',  sub: 'Copilot · Gemini · Prompting' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <p className="text-base font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s2: Module 1 ──────────────────────────────────────── */}
      <section id="s2" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</div>
          <h2>Module 1 — Enterprise Cowork Space</h2>
        </div>
        <p className="text-slate-500 text-sm mb-2">
          <strong className="text-slate-600">Tools covered:</strong> Microsoft 365 Copilot · Google Workspace Gemini
        </p>
        <p className="text-slate-500 text-sm mb-5">
          Your company has likely already paid for enterprise AI. This module teaches you to extract full value from it — not as a novelty, but as a daily work accelerator. Focus on the six high-frequency tasks that deliver the most time savings across every department.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ENTERPRISE_SKILLS.map((s, i) => (
            <div key={s.title} className="card flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s3: Module 2 — RACE ───────────────────────────────── */}
      <section id="s3" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</div>
          <h2>Module 2 — The Business Prompt Engineering Matrix</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          Most people under-use AI because their prompts are vague. The RACE framework is a four-part structure that consistently produces usable outputs on the first attempt — no technical background required.
        </p>

        {/* RACE 4-column breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {RACE.map((r) => (
            <div key={r.letter} className={`rounded-xl border ${r.bg} p-4`}>
              <div className={`w-8 h-8 rounded-lg ${r.badge} text-white font-extrabold text-base flex items-center justify-center mb-2`}>
                {r.letter}
              </div>
              <p className={`font-bold ${r.text} text-sm mb-1`}>{r.label}</p>
              <p className="text-xs text-slate-500 leading-snug">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Sample RACE prompt */}
        <div className="card bg-slate-50 border-slate-200 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <PenLine className="w-4 h-4 text-slate-400" />
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sample RACE Prompt</p>
          </div>
          <div className="space-y-2">
            {RACE.map((r) => (
              <div key={r.letter} className="flex gap-3 items-start text-sm">
                <span className={`font-extrabold ${r.text} w-5 flex-shrink-0`}>{r.letter}:</span>
                <span className="text-slate-600">{r.example}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Combined prompt you would paste in:</p>
            <p className="text-sm text-slate-700 leading-relaxed bg-white rounded-lg border border-slate-200 p-3 font-mono text-xs">
              You are a senior financial analyst at a mid-size manufacturing company. Write a 3-paragraph executive summary of the attached Q3 results. The audience is our board of directors. The results beat expectations by 8%. Use formal language. Maximum 200 words. No bullet points. End with one forward-looking sentence.
            </p>
          </div>
        </div>

        {/* Few-shot prompting */}
        <div className="card border-violet-200 bg-violet-50">
          <h3 className="font-bold text-violet-800 mb-1">Few-Shot Prompting — Matching Your Company's Voice</h3>
          <p className="text-sm text-violet-700 leading-relaxed">
            Feed the AI 2–3 examples of writing your company has already approved before asking it to produce new content. This is called <strong>few-shot prompting</strong>. The model learns your organization's tone, vocabulary, and style from the examples — without any technical setup. Simply add: <em>"Here are three examples of how we write at [Company]. Match this style exactly:"</em> followed by real samples.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s4: Module 3 — CLI Toolkit (ADVANCED) ────────────── */}
      <section id="s4" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-slate-400 text-white text-xs font-bold flex items-center justify-center">3</div>
          <h2>Module 3 — The Desktop CLI Toolkit</h2>
          <span className="badge badge-amber ml-1">Advanced — Optional</span>
        </div>

        <div className="card bg-amber-50 border-amber-200 text-amber-800 text-sm mb-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">This module is optional.</strong>
            Skip it if you are not comfortable with a terminal window — the other two modules give you 95% of Q1 value. Return to this module in Q2 or Q3 once you have built confidence.
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-5">
          A terminal is simply a text-based way to give your computer instructions. You do not need to learn programming to use it. This module focuses on using pre-packaged commands as simple execution toolkits for repetitive file tasks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: '📁',
              title: 'Batch File Renaming',
              desc: 'Rename hundreds of files according to a consistent naming convention in seconds — no manual clicking required.',
              cmd: 'for f in *.jpg; do mv "$f" "Q3-report-${f}"; done',
            },
            {
              icon: '📄',
              title: 'Split Multi-Page PDFs',
              desc: 'Divide a large PDF into individual pages or page ranges using a single command. Useful for distributing report sections.',
              cmd: 'pdftk large-report.pdf burst',
            },
            {
              icon: '🗜️',
              title: 'Compress Media Locally',
              desc: 'Reduce image and video file sizes before uploading to email or SharePoint — without third-party websites.',
              cmd: 'ffmpeg -i video.mp4 -crf 28 output.mp4',
            },
          ].map((t) => (
            <div key={t.title} className="card flex flex-col gap-2">
              <span className="text-xl">{t.icon}</span>
              <h3 className="font-bold text-slate-800">{t.title}</h3>
              <p className="text-sm text-slate-500 flex-1">{t.desc}</p>
              <code className="text-xs bg-slate-900 text-emerald-400 rounded-lg px-3 py-2 block font-mono leading-relaxed break-all">
                {t.cmd}
              </code>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-4">
          <Terminal className="w-3 h-3 inline mr-1" />
          All examples above run on macOS Terminal or Windows PowerShell. Commands are read-only-safe — they do not delete or overwrite files without an explicit flag.
        </p>
      </section>

      <div className="section-divider" />

      {/* ── s5: Q1 Outcomes ───────────────────────────────────── */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Quarter 1 Outcomes</h2>
        <p className="text-slate-500 text-sm mb-5">
          By the end of Q1 you should be able to demonstrate all five of the following. These are concrete, observable behaviours — not abstract concepts.
        </p>
        <div className="space-y-3">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="card flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{o}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <NavLink
            to="/biz/q2"
            className="btn-primary"
          >
            Continue to Q2 <ChevronRight className="w-4 h-4" />
          </NavLink>
          <NavLink to="/biz" className="btn-ghost">
            ← Back to Hub
          </NavLink>
        </div>
      </section>
    </PageWrapper>
  );
}
