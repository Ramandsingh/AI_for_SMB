import { NavLink } from 'react-router-dom';
import {
  Target, Table2, Workflow, ShieldAlert, Wrench, CheckCircle2,
  ChevronRight, ArrowRight, AlertOctagon,
} from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Quarter Objective',                            level: 2 },
  { id: 's2', title: 'Module 1 — Structured Output & Data',         level: 2 },
  { id: 's3', title: 'Module 2 — Visual Linear Pipelines',          level: 2 },
  { id: 's4', title: 'Module 3 — Verification & Hallucination',     level: 2 },
  { id: 's5', title: 'Recommended Tools',                           level: 2 },
  { id: 's6', title: 'Quarter 2 Outcomes',                          level: 2 },
];

const PIPELINE_STEPS = [
  {
    n: 1,
    label: 'Trigger',
    detail: 'Incoming lead form submitted on website',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    accent: 'bg-blue-500',
    human: false,
  },
  {
    n: 2,
    label: 'AI Draft',
    detail: 'AI generates a personalized response email using lead data',
    color: 'bg-violet-100 text-violet-700 border-violet-200',
    accent: 'bg-violet-500',
    human: false,
  },
  {
    n: 3,
    label: 'Log',
    detail: 'Lead details auto-logged to tracking spreadsheet',
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    accent: 'bg-slate-400',
    human: false,
  },
  {
    n: 4,
    label: 'Alert',
    detail: 'Sales team notified via Slack with lead summary',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accent: 'bg-emerald-500',
    human: false,
  },
];

const RED_FLAGS = [
  {
    flag: 'Specific numbers without sources',
    detail: 'If the AI cites a statistic or figure, ask it where that number comes from. If it cannot cite a primary source, treat the number as unverified.',
    icon: '🔢',
  },
  {
    flag: 'Confident answers to recent-event questions',
    detail: 'AI models have knowledge cutoff dates. Any question about current events, recent regulations, or the latest market data should be independently verified.',
    icon: '📅',
  },
  {
    flag: 'Step-by-step reasoning that sounds plausible but feels off',
    detail: 'AI can construct logically-structured arguments that are factually wrong. If the conclusion surprises you, challenge each step of the reasoning path individually.',
    icon: '🔗',
  },
];

const TOOLS = [
  {
    name: 'Zapier',
    category: 'Automation',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    desc: 'Connect 6,000+ apps with drag-and-drop automation flows. Best for quick wins between SaaS tools you already use.',
    useCase: 'New CRM entry → create task in Asana → notify team on Slack',
  },
  {
    name: 'Make.com',
    category: 'Automation',
    color: 'bg-violet-50 border-violet-200 text-violet-700',
    desc: 'Visual pipeline builder with advanced branching logic. More powerful than Zapier for complex multi-step workflows.',
    useCase: 'Parse incoming email → extract data → update spreadsheet → send summary',
  },
  {
    name: 'Microsoft Power Automate',
    category: 'Automation',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    desc: 'Native Microsoft 365 automation. Best when your organization already runs on the Microsoft ecosystem.',
    useCase: 'SharePoint file uploaded → Copilot summary → Teams notification → email approval',
  },
  {
    name: 'Notion AI',
    category: 'AI Writing',
    color: 'bg-slate-50 border-slate-200 text-slate-700',
    desc: 'Embedded AI within your Notion workspace. Ideal for turning raw notes and meeting records into structured documents.',
    useCase: 'Paste raw meeting notes → AI structures into agenda items + action list',
  },
  {
    name: 'Google Workspace Gemini',
    category: 'Enterprise AI',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    desc: 'AI integrated across Gmail, Docs, Sheets, and Slides. Summarize, draft, and analyze without leaving Google Workspace.',
    useCase: 'Summarize email thread → draft reply → add action items to Calendar',
  },
  {
    name: 'Microsoft 365 Copilot',
    category: 'Enterprise AI',
    color: 'bg-blue-50 border-blue-300 text-blue-800',
    desc: 'AI across Word, Excel, PowerPoint, Outlook, and Teams. Pull insights from your entire Microsoft environment.',
    useCase: 'Synthesize Teams meeting + attached report → draft PowerPoint deck',
  },
];

const OUTCOMES = [
  'Take a PDF invoice, email, or raw data file and extract it into a clean, structured table ready for import.',
  'Build a working 3-step automation connecting two tools you already use (email, spreadsheets, Slack, or CRM).',
  'Identify and flag at least two types of AI hallucination in a sample AI output before acting on it.',
  'Apply the "Trust-but-Verify" ritual to any AI output that will inform a business decision.',
  'Explain to a colleague how to turn an unstructured prompt into a data pipeline using a no-code tool.',
];

export default function BizQ2() {
  return (
    <PageWrapper
      badge="Q2"
      title="Connected Workflows & Low-Code Pipelines"
      subtitle="Months 4–6 · Transition from one-off prompts to multi-step, connected data streams."
      sections={SECTIONS}
    >
      {/* Objective banner */}
      <div className="card bg-emerald-50 border-emerald-200 text-emerald-800 text-sm mb-8 flex items-start gap-3">
        <Target className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5">Quarter Objective</strong>
          Move from one-off prompts to multi-step automated data streams. By the end of Q2 you will have built at least one live automation that handles a recurring task without manual effort.
        </div>
      </div>

      {/* ── s1: Quarter Objective ─────────────────────────────── */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Quarter Objective</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Duration',     value: 'Months 4–6',    sub: 'Builds directly on Q1 fluency' },
            { label: 'Modules',      value: '3 modules',     sub: 'All core — no optional skips' },
            { label: 'Focus',        value: 'Automation',    sub: 'Pipelines · Verification · Data' },
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

      {/* ── s2: Module 1 — Structured Output ──────────────────── */}
      <section id="s2" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">1</div>
          <h2>Module 1 — Structured Output & Data Transformation</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          AI can read messy, unstructured text and output it in any structured format you specify — CSV, tables, JSON, or formatted rows. This is one of the highest-leverage skills in a business context.
        </p>

        <div className="card mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Table2 className="w-4 h-4 text-emerald-500" />
            <h3 className="font-bold text-slate-800">The Core Technique: Force a Format</h3>
          </div>
          <p className="text-sm text-slate-500 mb-3">
            Add explicit output instructions to any prompt. Instead of asking AI to "summarize this invoice," ask it to "extract the vendor name, invoice number, line items, totals, and due date, and output them as a table with five columns."
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Prompt template</p>
            <p className="text-xs text-slate-700 font-mono leading-relaxed">
              Extract the following fields from the text below and output them as a table:
              <br />— Vendor Name &nbsp;&nbsp;— Invoice Number &nbsp;&nbsp;— Line Items &nbsp;&nbsp;— Total Amount &nbsp;&nbsp;— Due Date
              <br /><br />
              If a field is missing, write "Not found" in that cell.
              <br /><br />
              [Paste invoice text here]
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              source: 'Vendor strings',
              target: 'CRM-ready rows',
              detail: 'Unstructured vendor emails → Name, Contact, Product, Price, Terms columns',
              color: 'border-l-emerald-400',
            },
            {
              source: 'Raw email inquiries',
              target: 'Lead qualification table',
              detail: 'Inbound emails → Company, Contact, Need, Urgency, Budget qualifier',
              color: 'border-l-blue-400',
            },
            {
              source: 'PDF invoices',
              target: 'Accounts payable import',
              detail: 'Scanned invoice PDFs → structured CSV ready for accounting import',
              color: 'border-l-violet-400',
            },
          ].map((ex) => (
            <div key={ex.source} className={`card border-l-4 ${ex.color} p-4`}>
              <p className="text-xs text-slate-400 mb-1">Input</p>
              <p className="font-semibold text-slate-700 text-sm">{ex.source}</p>
              <ArrowRight className="w-3 h-3 text-slate-300 my-2" />
              <p className="text-xs text-slate-400 mb-0.5">Output</p>
              <p className="font-semibold text-slate-700 text-sm mb-1">{ex.target}</p>
              <p className="text-xs text-slate-400">{ex.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s3: Module 2 — Visual Pipelines ───────────────────── */}
      <section id="s3" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</div>
          <h2>Module 2 — Visual Linear Pipelines (No-Code)</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          No-code automation tools let you build multi-step workflows by connecting blocks visually — no programming required. The goal is to remove yourself as the manual link between tools that should be talking to each other automatically.
        </p>

        {/* Worked example pipeline */}
        <div className="card mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-slate-800">Worked Example: Lead Response Pipeline</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.n} className="flex sm:flex-col items-center flex-1">
                {/* Step box */}
                <div className={`flex-1 w-full rounded-xl border ${step.color} p-3 text-center`}>
                  <div className={`w-6 h-6 rounded-full ${step.accent} text-white text-xs font-bold flex items-center justify-center mx-auto mb-1.5`}>
                    {step.n}
                  </div>
                  <p className="font-bold text-sm mb-1">{step.label}</p>
                  <p className="text-xs leading-snug opacity-80">{step.detail}</p>
                </div>
                {/* Connector arrow (not after last item) */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="flex-shrink-0 flex items-center justify-center px-1 sm:py-1 sm:px-0">
                    <ArrowRight className="w-4 h-4 text-slate-300 sm:rotate-90 sm:-rotate-0 rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-4">
            This entire pipeline can be built in Zapier, Make.com, or Microsoft Power Automate in under 30 minutes with no coding. Once live, it runs automatically every time a new lead submits the form.
          </p>
        </div>

        <div className="card bg-slate-50 border-slate-200">
          <h3 className="font-bold text-slate-700 mb-2">Pipeline Design Principles</h3>
          <div className="space-y-2">
            {[
              { n: '1', tip: 'Start with a clear trigger', desc: 'Every automation begins with a single, specific event (a form submission, an email received, a file uploaded).' },
              { n: '2', tip: 'One step, one job',           desc: 'Each block in your pipeline should do exactly one thing. Simple chains are easier to debug and maintain.' },
              { n: '3', tip: 'Test with real data',         desc: 'Always run your pipeline with an actual test record before trusting it with production data.' },
              { n: '4', tip: 'Add an error notification',   desc: 'Configure a Slack or email alert for failed runs so broken automations do not go unnoticed.' },
            ].map((p) => (
              <div key={p.n} className="flex gap-3 items-start text-sm">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{p.n}</span>
                <div>
                  <strong className="text-slate-700">{p.tip}: </strong>
                  <span className="text-slate-500">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s4: Module 3 — Verification ───────────────────────── */}
      <section id="s4" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-rose-600 text-white text-xs font-bold flex items-center justify-center">3</div>
          <h2>Module 3 — Verification Rituals & Hallucination Defense</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          The <strong>Trust-but-Verify</strong> framework treats AI outputs the same way a good manager treats a new analyst's work: assume good intent and reasonable effort, but always cross-check before acting. This is especially critical when AI output will be used in customer-facing materials, financial decisions, or compliance documents.
        </p>

        <div className="card bg-rose-50 border-rose-200 mb-5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-rose-800 mb-1">The Corporate Verification Standard</h3>
            <p className="text-sm text-rose-700 leading-relaxed">
              Before any AI-generated content reaches a customer, a decision-maker, or a regulatory submission: (1) verify all factual claims against a primary source, (2) cross-examine the reasoning path — ask the AI to explain how it reached the conclusion, (3) check for anachronisms — has anything changed since the AI's knowledge cutoff?
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-700 mb-3">3 Red Flags to Watch For</h3>
        <div className="space-y-3">
          {RED_FLAGS.map((r) => (
            <div key={r.flag} className="card flex gap-4 items-start border-l-4 border-l-rose-300">
              <span className="text-2xl flex-shrink-0">{r.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertOctagon className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <h3 className="font-bold text-slate-800">{r.flag}</h3>
                </div>
                <p className="text-sm text-slate-500">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card bg-slate-50 border-slate-200 mt-5">
          <h3 className="font-bold text-slate-700 mb-2">Grounding Techniques</h3>
          <div className="space-y-2">
            {[
              { t: 'Add your source document', d: 'Paste or attach the actual document and instruct the AI to answer from it only. This anchors outputs to facts you can audit.' },
              { t: 'Ask "how do you know this?"', d: 'If the AI cites a fact, follow up with this question in the same session. Hallucinated citations tend to collapse under direct questioning.' },
              { t: 'Cross-examine the reasoning path', d: 'Ask the AI to walk through its reasoning step by step. Logical errors and unsupported leaps become visible at this level of detail.' },
            ].map((g) => (
              <div key={g.t} className="flex gap-3 items-start text-sm">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-slate-700">{g.t}: </strong>
                  <span className="text-slate-500">{g.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s5: Recommended Tools ─────────────────────────────── */}
      <section id="s5" className="section-anchor mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-4 h-4 text-slate-400" />
          <h2>Recommended Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOOLS.map((t) => (
            <div key={t.name} className={`card flex flex-col gap-2 border ${t.color.split(' ').find(c => c.startsWith('border-'))}`}>
              <div className="flex items-center gap-2">
                <span className={`badge text-xs ${t.color}`}>{t.category}</span>
              </div>
              <h3 className="font-bold text-slate-800">{t.name}</h3>
              <p className="text-sm text-slate-500 flex-1">{t.desc}</p>
              <div className="bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 mt-1">
                <p className="text-xs text-slate-400 font-semibold mb-0.5 uppercase tracking-wide">Example use</p>
                <p className="text-xs text-slate-600">{t.useCase}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── s6: Q2 Outcomes ───────────────────────────────────── */}
      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-4">Quarter 2 Outcomes</h2>
        <p className="text-slate-500 text-sm mb-5">
          These five outcomes are observable and testable. Do not advance to Q3 until you can demonstrate all five.
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
          <NavLink to="/biz/q4" className="btn-primary">
            Continue to Q4 <ChevronRight className="w-4 h-4" />
          </NavLink>
          <NavLink to="/biz" className="btn-ghost">
            ← Back to Hub
          </NavLink>
        </div>
      </section>
    </PageWrapper>
  );
}
