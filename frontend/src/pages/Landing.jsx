import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const STAGES = [
  { num: 1, label: 'Assistant',       value: '20%', desc: 'Individuals use AI tools for personal productivity.' },
  { num: 2, label: 'Accelerator',     value: '40%', desc: 'AI embedded into specific processes to compress cycle times.' },
  { num: 3, label: 'Automator',       value: '60%', desc: 'AI runs well-defined tasks end-to-end with minimal human touch.' },
  { num: 4, label: 'Operator',        value: '80%', desc: 'AI monitors, flags, and initiates — proactive intelligence layer.' },
  { num: 5, label: 'Operating Model', value: '100%',desc: 'AI is embedded in how the business is designed to run.' },
];

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
  {
    label: 'Foundation',
    color: 'blue',
    summary: 'Core AI literacy — what AI is, how adoption matures, and how it lands across roles.',
    pages: [
      { to: '/p1',  label: 'Understanding AI',      desc: 'What AI is, what it does, and the five ways it creates business value.' },
      { to: '/p2',  label: 'Maturity Journey',       desc: 'The five-stage arc from Assistant to Operating Model, with evidence.' },
      { to: '/p34', label: 'Maturity Canvas',        desc: 'A visual canvas to map your current AI maturity state.' },
      { to: '/p3',  label: 'Role Impact Map',        desc: 'How AI lands differently across roles and competency levels.' },
    ],
  },
  {
    label: 'Planning',
    color: 'emerald',
    summary: 'Structured discovery, roadmapping, and financial justification for AI initiatives.',
    pages: [
      { to: '/p4',  label: 'Assessment & Discovery', desc: 'Structured methodology to evaluate AI readiness and opportunity.' },
      { to: '/p5',  label: 'Roadmap Options',        desc: 'Three adoption tiers and a phased commercial model.' },
      { to: '/p6',  label: 'ROI Calculator',         desc: 'Model your own numbers — payback period, annual saving, ROI.' },
    ],
  },
  {
    label: 'Implementation',
    color: 'indigo',
    summary: 'Technology choices and learning culture for scaling AI across the organisation.',
    pages: [
      { to: '/p7',  label: 'Technology & Tools',     desc: 'The four enablers, tools by stage, and governance frameworks.' },
      { to: '/p9',  label: 'Learning Approach',      desc: 'How organisations build AI capability deliberately over time.' },
    ],
  },
  {
    label: 'People & Culture',
    color: 'violet',
    summary: 'Individual adoption paths and how AI reshapes roles, teams, and value creation.',
    pages: [
      { to: '/p10', label: 'Individual Adoption',    desc: 'Practical AI adoption pathways for individual contributors.' },
      { to: '/p11', label: 'Org Contributions',      desc: 'How AI reshapes roles, teams, and organisational value creation.' },
    ],
  },
  {
    label: 'Technology of AI',
    color: 'cyan',
    summary: 'Deep-dive into AI mechanics — categories, how it works, deployment, and a full glossary.',
    pages: [
      { to: '/p17', label: 'What Is AI',             desc: 'Definitions, scope, and the difference between AI, ML, and GenAI.' },
      { to: '/p18', label: 'Categories of AI',       desc: 'Narrow vs. general AI, ML types, and where each applies.' },
      { to: '/p19', label: 'How AI Works',           desc: 'Training, inference, embeddings — the mechanics demystified.' },
      { to: '/p20', label: 'Where AI Deploys',       desc: 'Cloud, edge, on-device — deployment models and trade-offs.' },
      { to: '/p21', label: 'AI & Your Tech Stack',   desc: 'How AI integrates with your existing systems and data.' },
      { to: '/p22', label: 'Glossary',               desc: 'Plain-language definitions of 50+ AI terms.' },
    ],
  },
  {
    label: 'Enterprise Context',
    color: 'amber',
    summary: 'What enterprises do with AI, where value accumulates, and how to measure it.',
    pages: [
      { to: '/p12', label: 'What Enterprises Do',   desc: 'The enterprise AI landscape and where SMBs fit in.' },
      { to: '/p13', label: 'Where the Value Is',    desc: 'Value pools, ROI evidence, and where AI pays back fastest.' },
      { to: '/p14', label: 'How to Adopt AI',       desc: 'Proven adoption models and what separates leaders from laggards.' },
      { to: '/p15', label: 'When to Adopt AI',      desc: 'Timing decisions, sequencing, and avoiding premature investment.' },
      { to: '/p16', label: 'How to Measure Value',  desc: 'KPIs, measurement frameworks, and reporting AI outcomes.' },
    ],
  },
  {
    label: 'Executive Insights',
    color: 'rose',
    summary: 'Frameworks and findings from BCG, McKinsey, Bain, and Deloitte on AI adoption.',
    pages: [
      { to: '/p29', label: 'BCG',      desc: "BCG's AI maturity model, case evidence, and transformation playbook." },
      { to: '/p30', label: 'McKinsey', desc: "McKinsey's global AI survey insights and value realisation data." },
      { to: '/p31', label: 'Bain',     desc: "Bain's perspective on AI for the middle market and SMBs." },
      { to: '/p32', label: 'Deloitte', desc: "Deloitte's AI governance and workforce transformation guidance." },
    ],
  },
  {
    label: 'Top AI Labs',
    color: 'slate',
    summary: 'Profiles of the leading AI research organisations shaping the industry.',
    pages: [
      { to: '/p35', label: 'OpenAI',       desc: "OpenAI's models, products, and enterprise offerings." },
      { to: '/p36', label: 'Anthropic',    desc: "Anthropic's Claude models, safety approach, and enterprise tools." },
      { to: '/p37', label: 'Google',       desc: "Google's Gemini models, Vertex AI, and enterprise AI suite." },
      { to: '/p38', label: 'Chinese Labs', desc: 'DeepSeek, Qwen, and the Chinese AI ecosystem landscape.' },
    ],
  },
  {
    label: 'AI Model Concepts',
    color: 'purple',
    summary: 'How large language models, retrieval systems, and AI agents actually work.',
    pages: [
      { to: '/p39', label: 'How LLMs Work',           desc: 'Transformers, tokenisation, and the mechanics of language models.' },
      { to: '/p40', label: 'Retrieval & Memory',      desc: 'RAG, vector databases, and how AI accesses your knowledge.' },
      { to: '/p41', label: 'Agents & Orchestration',  desc: 'Multi-step AI agents, tool use, and autonomous AI pipelines.' },
    ],
  },
  {
    label: 'Enterprise AI Development',
    color: 'orange',
    summary: 'Building AI capabilities at scale — data, platforms, governance, and teams.',
    pages: [
      { to: '/p23', label: 'Data Infrastructure',     desc: 'The data foundation required to power enterprise AI reliably.' },
      { to: '/p24', label: 'The AI Factory',          desc: 'MLOps, model pipelines, and the enterprise AI operating model.' },
      { to: '/p25', label: 'Foundation Models & RAG', desc: 'Choosing models, fine-tuning vs. RAG, and deployment patterns.' },
      { to: '/p26', label: 'Enterprise AI Platforms', desc: 'Azure AI, AWS Bedrock, Google Vertex — platform comparison.' },
      { to: '/p27', label: 'Governance & Risk',       desc: 'AI governance frameworks, risk management, and compliance.' },
      { to: '/p28', label: 'Building the AI Team',    desc: 'Roles, skills, and org structures for AI-native companies.' },
    ],
  },
  {
    label: 'Learning Hub',
    color: 'teal',
    summary: 'A structured 4-quarter curriculum from AI fundamentals to GenAI and MLOps.',
    pages: [
      { to: '/learn',    label: 'Learning Hub',       desc: 'Overview of the 4-quarter AI learning programme.' },
      { to: '/learn/q1', label: 'Q1 — Foundations',   desc: 'Statistics, Python basics, and AI literacy.' },
      { to: '/learn/q2', label: 'Q2 — Classical ML',  desc: 'Supervised, unsupervised, and ensemble learning.' },
      { to: '/learn/q3', label: 'Q3 — Deep Learning', desc: 'Neural networks, CNNs, transformers, and fine-tuning.' },
      { to: '/learn/q4', label: 'Q4 — GenAI & MLOps', desc: 'Prompt engineering, RAG, agents, and model deployment.' },
    ],
  },
  {
    label: 'Your AI Fit',
    color: 'green',
    summary: 'Personalised AI fit analysis based on your role, industry, and goals.',
    pages: [
      { to: '/p33', label: 'How AI Fits You', desc: 'An interactive planner matching AI tools to your specific context.' },
    ],
  },
  {
    label: 'Experimental UI',
    color: 'fuchsia',
    summary: 'Live demos of data visualisation, AI chat, upload, and diagramming libraries.',
    pages: [
      { to: '/lab',            label: 'Lab Home',             desc: 'Overview of all experimental UI components and demos.' },
      { to: '/lab/upload',     label: 'Image Upload',         desc: 'Uppy drag-and-drop file upload with gallery and QR code.' },
      { to: '/lab/graph',      label: 'Site Graph',           desc: 'React Flow visualisation of all dashboard pages.' },
      { to: '/lab/chat',       label: 'Chat Agent',           desc: 'Multi-mode chat: SDK streaming, assistant-ui, modal widget.' },
      { to: '/lab/arch',       label: 'Architecture Diagram', desc: 'Editable architecture diagram built with React Flow.' },
      { to: '/lab/timeline',   label: 'Timeline',             desc: 'D3-powered timeline visualisation component.' },
      { to: '/lab/charts',     label: 'Data Viz',             desc: 'Recharts demo — bar, line, area, pie, radar charts.' },
      { to: '/lab/calendar',   label: 'Calendar',             desc: 'Ant Design Calendar component integration.' },
      { to: '/lab/database',   label: 'Database Platforms',   desc: 'Comparison of self-hosted no-code/low-code data tools.' },
      { to: '/lab/cytoscape',  label: 'Cytoscape Graph',      desc: 'Interactive network graph with physics simulation.' },
      { to: '/lab/flowcharts', label: 'Flowcharts',           desc: 'Live Mermaid.js and nomnoml diagram editors.' },
      { to: '/lab/excalidraw', label: 'Excalidraw',           desc: 'Collaborative whiteboard and sketch tool integration.' },
    ],
  },
];

const COLOR = {
  blue:    { bar: 'bg-blue-600',    dot: 'bg-blue-400',    hover: 'hover:bg-blue-50 group-hover:text-blue-700',    count: 'text-blue-500'    },
  emerald: { bar: 'bg-emerald-600', dot: 'bg-emerald-400', hover: 'hover:bg-emerald-50 group-hover:text-emerald-700', count: 'text-emerald-500' },
  indigo:  { bar: 'bg-indigo-600',  dot: 'bg-indigo-400',  hover: 'hover:bg-indigo-50 group-hover:text-indigo-700',  count: 'text-indigo-500'  },
  violet:  { bar: 'bg-violet-600',  dot: 'bg-violet-400',  hover: 'hover:bg-violet-50 group-hover:text-violet-700',  count: 'text-violet-500'  },
  cyan:    { bar: 'bg-cyan-600',    dot: 'bg-cyan-400',    hover: 'hover:bg-cyan-50 group-hover:text-cyan-700',    count: 'text-cyan-500'    },
  amber:   { bar: 'bg-amber-500',   dot: 'bg-amber-400',   hover: 'hover:bg-amber-50 group-hover:text-amber-700',   count: 'text-amber-500'   },
  rose:    { bar: 'bg-rose-600',    dot: 'bg-rose-400',    hover: 'hover:bg-rose-50 group-hover:text-rose-700',    count: 'text-rose-500'    },
  slate:   { bar: 'bg-slate-600',   dot: 'bg-slate-400',   hover: 'hover:bg-slate-50 group-hover:text-slate-700',   count: 'text-slate-500'   },
  purple:  { bar: 'bg-purple-600',  dot: 'bg-purple-400',  hover: 'hover:bg-purple-50 group-hover:text-purple-700',  count: 'text-purple-500'  },
  orange:  { bar: 'bg-orange-500',  dot: 'bg-orange-400',  hover: 'hover:bg-orange-50 group-hover:text-orange-700',  count: 'text-orange-500'  },
  teal:    { bar: 'bg-teal-600',    dot: 'bg-teal-400',    hover: 'hover:bg-teal-50 group-hover:text-teal-700',    count: 'text-teal-500'    },
  green:   { bar: 'bg-green-600',   dot: 'bg-green-400',   hover: 'hover:bg-green-50 group-hover:text-green-700',   count: 'text-green-500'   },
  fuchsia: { bar: 'bg-fuchsia-600', dot: 'bg-fuchsia-400', hover: 'hover:bg-fuchsia-50 group-hover:text-fuchsia-700', count: 'text-fuchsia-500' },
};

function getStageResult(score) {
  return STAGE_RESULTS.find(s => score >= s.range[0] && score <= s.range[1]) || STAGE_RESULTS[0];
}

function SectionCard({ group }) {
  const c = COLOR[group.color] || COLOR.slate;
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className={`${c.bar} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">{group.label}</h3>
          <span className="text-white/70 text-xs font-medium">{group.pages.length} pages</span>
        </div>
        <p className="text-white/80 text-xs mt-0.5 leading-snug">{group.summary}</p>
      </div>
      <div className="bg-white divide-y divide-slate-50">
        {group.pages.map((page) => (
          <Link
            key={page.to}
            to={page.to}
            className={`flex items-start gap-2.5 px-4 py-2.5 group transition-colors ${c.hover}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.dot}`} />
            <div>
              <p className="text-xs font-semibold text-slate-800 group-hover:text-inherit transition-colors leading-tight">{page.label}</p>
              <p className="text-xs text-slate-400 leading-snug mt-0.5">{page.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const TABS = ['Overview', 'Quick Maturity Assessment', 'All Sections'];

export default function Landing() {
  const [tab, setTab] = useState('Overview');
  const [answers, setAnswers]   = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]     = useState(null);

  const handleAnswer = (qi, ai) => {
    const next = [...answers];
    next[qi] = ai;
    setAnswers(next);
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, a) => acc + (a ?? 0), 0);
    setResult(getStageResult(score));
    setSubmitted(true);
    setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const allAnswered = answers.every(a => a !== null);

  return (
    <PageWrapper
      title="AI Adoption Dashboard"
      subtitle="A structured guide for business leaders — from first awareness to operational value."
      sections={[]}
    >
      {/* Tab Bar */}
      <div className="flex gap-1 mb-8 border-b border-slate-200 pb-0">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border border-b-0 transition-all -mb-px ${
              tab === t
                ? 'bg-white text-blue-700 border-slate-200 shadow-sm'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Overview ─────────────────────────────────────── */}
      {tab === 'Overview' && (
        <>
          <section className="mb-12">
            <h2 className="mb-1">The AI Adoption Staircase</h2>
            <p className="text-slate-500 text-sm mb-6">AI isn't a destination — it's a staircase. Each stage builds on the last and prepares the organisation for the next.</p>

            <div className="flex gap-2 items-end mb-4">
              {STAGES.map((s) => (
                <div key={s.num} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg flex items-end justify-center pb-3 text-xs font-bold"
                    style={{ height: s.value, minHeight: 60, background: `hsl(${210 + s.num * 10}, ${40 + s.num * 10}%, ${70 - s.num * 8}%)`, color: s.num >= 4 ? 'white' : '#1e3a8a' }}
                  >
                    {s.num}
                  </div>
                  <span className={`text-xs font-semibold text-center leading-tight px-1 ${s.num >= 4 ? 'text-blue-700' : 'text-slate-600'}`}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4">
              {STAGES.map((s) => (
                <div key={s.num} className="card py-3 px-3 text-xs text-slate-600 leading-snug">
                  <p className="font-semibold text-slate-800 mb-1">{s.label}</p>
                  {s.desc}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="card bg-slate-50 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-800 text-sm mb-1">Not sure where you are?</p>
                <p className="text-slate-500 text-xs">Take the 10-question self-assessment to identify your current maturity stage and get a personalised reading path.</p>
              </div>
              <button
                onClick={() => setTab('Quick Maturity Assessment')}
                className="btn-primary text-sm px-5 py-2.5 flex-shrink-0"
              >
                Start Assessment →
              </button>
            </div>
          </section>

          <section className="mb-10">
            <div className="card bg-slate-50 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-800 text-sm mb-1">Know what you're looking for?</p>
                <p className="text-slate-500 text-xs">Browse all {SECTION_GROUPS.reduce((n, g) => n + g.pages.length, 0)} pages organised across {SECTION_GROUPS.length} sections — hover to see what each page covers.</p>
              </div>
              <button
                onClick={() => setTab('All Sections')}
                className="btn-primary text-sm px-5 py-2.5 flex-shrink-0"
              >
                Explore All Sections →
              </button>
            </div>
          </section>

          <section className="card bg-slate-800 text-white border-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Evidence Base</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { stat: '70–85%', label: 'AI project failure rate without structure (Gartner)' },
                { stat: '40–60%', label: 'Daily time saved by enterprise AI users (OpenAI 2025)' },
                { stat: '2.7×',   label: 'Higher AI proficiency with formal training (Larridin)' },
                { stat: '5→3',    label: 'Stage 2→3 = highest financial impact transition (MIT CISR)' },
              ].map((e) => (
                <div key={e.stat}>
                  <p className="text-2xl font-bold text-blue-400 mb-1">{e.stat}</p>
                  <p className="text-xs text-slate-400 leading-snug">{e.label}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Tab 2: Quick Maturity Assessment ────────────────────── */}
      {tab === 'Quick Maturity Assessment' && (
        <section>
          <div className="mb-6">
            <h2 className="mb-1">Where are you today?</h2>
            <p className="text-slate-500 text-sm">Answer 10 questions to identify your current maturity stage and get a recommended reading path.</p>
          </div>

          <div className="space-y-4">
            {QUESTIONS.map((q, qi) => (
              <div key={qi} className="card py-4">
                <p className="text-sm font-medium text-slate-800 mb-3">
                  <span className="text-slate-400 mr-2">{qi + 1}.</span>{q.q}
                </p>
                <div className="flex flex-wrap gap-2">
                  {q.opts.map((opt, ai) => (
                    <button
                      key={ai}
                      onClick={() => handleAnswer(qi, ai)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                        answers[qi] === ai
                          ? 'bg-blue-600 text-white border-blue-600 font-medium'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`mt-6 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              allAnswered
                ? 'btn-primary'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            {allAnswered ? 'See My Maturity Stage →' : `Answer all ${QUESTIONS.length} questions to continue`}
          </button>

          {submitted && result && (
            <div id="result" className="mt-8 card border-blue-200 bg-blue-50">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {result.stage}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Your current stage</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{result.label}</h3>
                  <p className="text-slate-600 text-sm mb-4">{result.desc}</p>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Recommended reading</p>
                  <div className="flex flex-wrap gap-2">
                    {result.pages.map((path, i) => (
                      <Link
                        key={path}
                        to={path}
                        className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        {result.pageLabels[i]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Tab 3: All Sections ──────────────────────────────────── */}
      {tab === 'All Sections' && (
        <section>
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="mb-1">All Sections</h2>
              <p className="text-slate-500 text-sm">
                {SECTION_GROUPS.reduce((n, g) => n + g.pages.length, 0)} pages across {SECTION_GROUPS.length} sections — click any page to navigate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {SECTION_GROUPS.map((group) => (
              <SectionCard key={group.label} group={group} />
            ))}
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
