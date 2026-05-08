import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, TrendingUp, Network, ClipboardList, GitBranch, Calculator, Cpu, Mic2, BookOpen, UserCheck, Building2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const STAGES = [
  { num: 1, label: 'Assistant',      color: 'bg-slate-200 text-slate-700',    value: '20%', desc: 'Individuals use AI tools for personal productivity.' },
  { num: 2, label: 'Accelerator',    color: 'bg-blue-100 text-blue-700',      value: '40%', desc: 'AI embedded into specific processes to compress cycle times.' },
  { num: 3, label: 'Automator',      color: 'bg-blue-300 text-blue-800',      value: '60%', desc: 'AI runs well-defined tasks end-to-end with minimal human touch.' },
  { num: 4, label: 'Operator',       color: 'bg-blue-500 text-white',         value: '80%', desc: 'AI monitors, flags, and initiates — proactive intelligence layer.' },
  { num: 5, label: 'Operating Model',color: 'bg-blue-700 text-white',         value: '100%',desc: 'AI is embedded in how the business is designed to run.' },
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
  { stage: 1, label: 'Stage 1 — Assistant',       range: [0,2],  pages: ['/p1','/p7','/p9'], pageLabels: ['Understanding AI', 'Technology & Tools', 'Learning Approach'],       desc: 'Your organisation is beginning its AI journey. Focus on building literacy, selecting the right entry-level tools, and establishing a learning culture.' },
  { stage: 2, label: 'Stage 2 — Accelerator',     range: [3,4],  pages: ['/p2','/p5','/p10'],pageLabels: ['Maturity Journey', 'Roadmap Options', 'Individual Adoption'],       desc: 'You have early traction. Now formalise use cases, compress process cycle times, and invest in individual-level adoption across functions.' },
  { stage: 3, label: 'Stage 3 — Automator',       range: [5,6],  pages: ['/p4','/p6','/p11'],pageLabels: ['Assessment & Discovery', 'ROI Calculator', 'Org Contributions'],   desc: 'AI is delivering real value in places. Your priority is structured assessment, governance, and scaling what works across the organisation.' },
  { stage: 4, label: 'Stage 4 — Operator',        range: [7,8],  pages: ['/p3','/p7','/p11'],pageLabels: ['Role Impact Map', 'Technology & Tools', 'Org Contributions'],     desc: 'AI is embedded in operations. Focus on the intelligent layer — agents, monitoring, and connecting AI to broader organisational goals.' },
  { stage: 5, label: 'Stage 5 — Operating Model', range: [9,10], pages: ['/p2','/p8','/p11'],pageLabels: ['Maturity Journey', 'Pitch & Narrative', 'Org Contributions'],     desc: 'AI is core to how you operate. Your conversation has shifted to strategic AI design, market differentiation, and AI-native workflows.' },
];

const NAV_TILES = [
  { to: '/p1',  icon: Lightbulb,    title: 'Understanding AI',        desc: 'What AI is, what it does, and the five ways it creates business value.' },
  { to: '/p2',  icon: TrendingUp,   title: 'Maturity Journey',        desc: 'The five-stage arc from Assistant to Operating Model, with evidence.' },
  { to: '/p3',  icon: Network,      title: 'Role Impact Map',         desc: 'How AI lands differently across roles and competency levels.' },
  { to: '/p4',  icon: ClipboardList,title: 'Assessment & Discovery',  desc: 'Structured methodology to evaluate AI readiness and opportunity.' },
  { to: '/p5',  icon: GitBranch,    title: 'Roadmap Options',         desc: 'Three adoption tiers and a phased commercial model.' },
  { to: '/p6',  icon: Calculator,   title: 'ROI Calculator',          desc: 'Model your own numbers — payback period, annual saving, ROI.' },
  { to: '/p7',  icon: Cpu,          title: 'Technology & Tools',      desc: 'The four enablers, tools by stage, and governance frameworks.' },
  { to: '/p8',  icon: Mic2,         title: 'Pitch & Narrative',       desc: 'The six-beat pitch structure and objection handling library.' },
  { to: '/p9',  icon: BookOpen,     title: 'Learning Approach',       desc: 'How organisations build AI capability deliberately over time.' },
  { to: '/p10', icon: UserCheck,    title: 'Individual Adoption',     desc: 'Practical AI adoption pathways for individual contributors.' },
  { to: '/p11', icon: Building2,    title: 'Org Contributions',       desc: 'How AI reshapes roles, teams, and organisational value creation.' },
];

function getStageResult(score) {
  return STAGE_RESULTS.find(s => score >= s.range[0] && score <= s.range[1]) || STAGE_RESULTS[0];
}

export default function Landing() {
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
      subtitle="A structured guide for business leaders — from first awareness to operational value. Start with the self-assessment to find where you are today, or jump directly to the section most relevant to you."
      sections={[]}
    >
      {/* 5-Stage Maturity Curve */}
      <section id="maturity-curve" className="mb-12">
        <h2 className="mb-1">The AI Adoption Staircase</h2>
        <p className="text-slate-500 text-sm mb-6">AI isn't a destination — it's a staircase. Each stage builds on the last and prepares the organisation for the next.</p>

        <div className="flex gap-2 items-end mb-4">
          {STAGES.map((s) => (
            <div key={s.num} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`w-full rounded-t-lg flex items-end justify-center pb-3 text-xs font-bold transition-all`}
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

      {/* Self-Assessment */}
      <section id="self-assessment" className="mb-12">
        <h2 className="mb-1">Where are you today?</h2>
        <p className="text-slate-500 text-sm mb-6">Answer 10 questions to identify your current maturity stage and get a recommended reading path.</p>

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

      {/* Navigation Tiles */}
      <section id="navigation" className="mb-12">
        <h2 className="mb-1">All Sections</h2>
        <p className="text-slate-500 text-sm mb-6">Jump directly to any section of the dashboard.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_TILES.map((tile) => {
            const TileIcon = tile.icon;
            return (
              <Link
                key={tile.to}
                to={tile.to}
                className="card-interactive group"
              >
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                    <TileIcon size={18} className="text-blue-600" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors text-sm mb-1">{tile.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{tile.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Evidence strip */}
      <section id="evidence" className="card bg-slate-800 text-white border-0">
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
    </PageWrapper>
  );
}
