import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '3.1 The Competency Axis',     level: 2 },
  { id: 's2', title: '3.2 Role-by-Role Impact',     level: 2 },
  { id: 's3', title: '3.3 Building Champions',      level: 2 },
  { id: 's4', title: '3.4 Handling Resistance',     level: 2 },
];

const ROLES = [
  {
    title: 'Operations / Warehouse Manager',
    icon: '📦',
    pain: ['Manual receiving and dispatch paperwork', 'Stock discrepancy investigation', 'Chasing suppliers for delivery updates', 'Training new staff on procedures'],
    opportunities: ['AI-drafted supplier chase emails from thread context', 'Automated stock discrepancy reports from count data', 'AI-assisted incident reporting from voice or photo input', 'Procedure Q&A chatbot trained on your SOPs'],
    tools: 'Claude/ChatGPT Teams, mobile AI scanning, voice-to-text tools',
    competency: 'Low — minimal change to daily routine',
    timeline: '2–4 weeks to first value',
    value: 'High volume, high frequency tasks',
  },
  {
    title: 'Finance Manager / Controller',
    icon: '💰',
    pain: ['Month-end variance commentary', 'Reading and summarising long contracts', 'Answering repeated questions from department heads', 'Manual invoice processing'],
    opportunities: ['AI-drafted variance commentary from raw numbers', 'Contract clause extraction and risk flagging', 'Finance policy Q&A from pre-loaded documents', 'Invoice data extraction to CSV for system import'],
    tools: 'Claude Projects with chart-of-accounts context, Excel Copilot, Dext/Ramp for invoices',
    competency: 'Medium — adapts workflows, uses templates',
    timeline: '2–3 weeks to first value',
    value: 'High-value professional time reclaimed',
  },
  {
    title: 'Sales Leader / Account Manager',
    icon: '🤝',
    pain: ['Slow proposal and quote production', 'CRM data entry after calls', 'Inconsistent pipeline reporting', 'Prospect research consuming selling time'],
    opportunities: ['AI proposal generation from brief inputs and past examples', 'Call transcription with structured CRM summaries', 'AI-enriched prospect research in minutes', 'Consistent sales narrative across the team'],
    tools: 'Gong/Fireflies for calls, Apollo/Clay for prospecting, Claude for proposals',
    competency: 'Low to Medium — templates and guided use',
    timeline: '1–2 weeks to first value',
    value: 'Selling time recovered, conversion improved',
  },
  {
    title: 'Procurement / Supplier Manager',
    icon: '🏭',
    pain: ['Reading and comparing supplier contracts', 'Tracking supplier performance across sources', 'Drafting RFQ and tender documents', 'Managing supplier email volume'],
    opportunities: ['Contract comparison and terms flagging', 'Supplier email triage with draft replies', 'AI-assisted RFQ drafting from specification inputs', 'Supplier risk monitoring from news and data feeds'],
    tools: 'Claude for contracts, n8n for email automation, shared Claude Project with supplier context',
    competency: 'Medium — process redesign required',
    timeline: '3–6 weeks to first value',
    value: 'Contract risk reduced, response time halved',
  },
  {
    title: 'Customer Service Lead',
    icon: '🎧',
    pain: ['High email/ticket volume with repetitive queries', 'Inconsistent response quality across the team', 'Escalation identification taking too long', 'Knowledge not captured or accessible'],
    opportunities: ['AI email classification and draft reply generation', 'Knowledge base Q&A for first-line resolution', 'Escalation pattern detection from ticket data', 'Consistent tone and policy application across team'],
    tools: 'Claude Projects with product/policy context, Intercom/Zendesk AI features, email automation',
    competency: 'Low — works within existing email/ticket tools',
    timeline: '1–3 weeks to first value',
    value: 'Response time and quality both improve',
  },
  {
    title: 'Owner / MD / General Manager',
    icon: '🏢',
    pain: ['Strategic analysis taking too long', 'Board report preparation consuming management time', 'Keeping across a broad range of information', 'Decision-making without fast, reliable analysis'],
    opportunities: ['Executive briefing documents from multiple inputs', 'Competitive and market intelligence summaries', 'AI-assisted board narrative from operational data', 'Decision support through structured analysis'],
    tools: 'Claude for analysis and writing, Perplexity for research, dedicated executive AI workspace',
    competency: 'Low — AI as strategic thinking partner',
    timeline: '1 week to first value',
    value: 'Strategic leverage on leader\'s time',
  },
  {
    title: 'IT Lead (Enablement Role)',
    icon: '💻',
    pain: ['Scattered AI tool requests with no governance', 'Security and data handling concerns', 'Supporting non-technical users with AI tools', 'No visibility of AI usage or costs'],
    opportunities: ['AI tool governance framework and policy', 'Centralised AI procurement and access management', 'Security review process for AI tools', 'Usage monitoring and cost management'],
    tools: 'Microsoft Entra for SSO, Langfuse/Helicone for monitoring, enterprise SaaS governance tools',
    competency: 'High — technical enablement role',
    timeline: '4–8 weeks to establish governance',
    value: 'Risk controlled; adoption accelerated safely',
  },
];

const OBJECTIONS = [
  { role: 'Operations staff',  objection: '"AI will take my job."',           response: 'AI is taking the parts of your job you hate — the paperwork and repetitive emails. Your job gets better, not smaller.' },
  { role: 'Finance team',      objection: '"The numbers won\'t be right."',   response: 'AI produces a first draft — you review it. The calculation logic is yours; AI just writes it up faster.' },
  { role: 'Sales reps',        objection: '"Customers want to talk to me, not a machine."', response: 'They still talk to you. AI handles the preparation and admin so you have more time for the conversation.' },
  { role: 'Senior staff',      objection: '"I\'ve done this for 20 years — I don\'t need AI."', response: 'Your expertise is the most valuable input AI gets. It makes your knowledge accessible to the whole team, not just those you can personally mentor.' },
];

export default function RoleImpactMap() {
  const [selected, setSelected] = useState(null);

  return (
    <PageWrapper
      badge="Page 3 — Foundation"
      title="The Role Impact Map"
      subtitle="AI lands differently across roles and competency levels. This page makes AI tangible for the specific people in your organisation."
      sections={SECTIONS}
    >
      {/* 3.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">3.1 The Competency Axis</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { level: 'Low',    desc: 'Wants AI to just work with minimal change to daily routine. Uses configured tools from templates.', stage: 'Value at Stage 1–2', color: 'border-slate-200' },
            { level: 'Medium', desc: 'Will adapt workflows and processes. Needs guidance, examples, and templates to customise further.', stage: 'Value at Stage 2–3', color: 'border-blue-200 bg-blue-50' },
            { level: 'High',   desc: 'Will customise, extend, and build AI tools for their function. Becomes the local champion.', stage: 'Value at Stage 3+', color: 'border-blue-400 bg-blue-100' },
          ].map((c) => (
            <div key={c.level} className={`card border ${c.color}`}>
              <p className="text-sm font-bold text-slate-800 mb-1">Competency: {c.level}</p>
              <p className="text-sm text-slate-600 mb-3">{c.desc}</p>
              <span className="badge-blue text-xs">{c.stage}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-4">Stage 3+ automation requires at least a few medium-competency champions in key functions. Low-competency users drive the majority of adoption volume at Stages 1 and 2.</p>
      </section>

      {/* 3.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">3.2 Role-by-Role Impact Cards</h2>
        <p className="text-sm text-slate-500 mb-5">Select a role to see its full impact card. Each card is self-contained — share the relevant one with the person it describes.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {ROLES.map((r, i) => (
            <button
              key={r.title}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`card text-left py-3 px-4 transition-all ${selected === i ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
            >
              <span className="text-2xl mb-2 block">{r.icon}</span>
              <p className="text-xs font-semibold text-slate-700 leading-snug">{r.title}</p>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="card border-blue-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="text-3xl">{ROLES[selected].icon}</span>
              <div>
                <h3 className="text-base">{ROLES[selected].title}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="badge-blue">{ROLES[selected].competency}</span>
                  <span className="badge-green">{ROLES[selected].timeline}</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-slate-700 mb-2">Pain points</p>
                <ul className="space-y-1.5">
                  {ROLES[selected].pain.map(p => <li key={p} className="text-slate-600 flex gap-2"><span className="text-red-400 mt-0.5">→</span>{p}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-700 mb-2">AI opportunities</p>
                <ul className="space-y-1.5">
                  {ROLES[selected].opportunities.map(o => <li key={o} className="text-slate-600 flex gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{o}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-slate-700 mb-1">Recommended tools</p>
                <p className="text-slate-600">{ROLES[selected].tools}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700 mb-1">Expected value</p>
                <p className="text-slate-600">{ROLES[selected].value}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">3.3 Building Champions</h2>
        <div className="card mb-4">
          <p className="text-sm font-semibold text-slate-800 mb-2">The "tech-comfortable 2IC" pattern</p>
          <p className="text-sm text-slate-600 leading-relaxed">In most functions, the champion isn't the leader — it's the most curious, technically comfortable person one level below. The finance manager's analyst. The sales leader's most adaptable rep. The warehouse manager's senior pick. Find them first; the leader's buy-in follows naturally once results are visible.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          {[
            { need: 'Time', desc: 'Protected time to learn, experiment, and support colleagues — not squeezed into their existing role.' },
            { need: 'Recognition', desc: 'Formal acknowledgement as the function\'s AI lead. Not just unofficial — named, with status.' },
            { need: 'Authority', desc: 'Permission to change how their function uses AI without getting every decision approved.' },
          ].map(n => (
            <div key={n.need} className="card border-emerald-200 bg-emerald-50">
              <p className="font-semibold text-emerald-800 mb-1">{n.need}</p>
              <p className="text-emerald-700 text-xs">{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">3.4 Handling Resistance</h2>
        <div className="space-y-3">
          {OBJECTIONS.map((o) => (
            <div key={o.objection} className="card">
              <p className="text-xs text-slate-400 mb-1">{o.role}</p>
              <p className="text-sm font-medium text-slate-700 mb-2">"{o.objection}"</p>
              <p className="text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">↳ {o.response}</p>
            </div>
          ))}
        </div>
        <div className="card border-amber-200 bg-amber-50 mt-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">When resistance is a signal</p>
          <p className="text-sm text-amber-700">If resistance is strong and widespread, check whether you've picked the wrong use case — not the wrong people. Resistance that says "this won't work here" often means the use case doesn't address a real pain point for the people being asked to change. Go back to discovery.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
