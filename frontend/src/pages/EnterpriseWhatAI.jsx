import { useState, useEffect } from 'react';
import { Megaphone, MessageSquare, BarChart2, Link2, Users, Code2, ShoppingCart, Wrench, Handshake, CheckCircle2, XCircle, Pencil, Plus, Trash2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Scale of Deployment',          level: 2 },
  { id: 's2', title: 'Deployment by Function',       level: 2 },
  { id: 's3', title: 'How Enterprises Are Organising for AI', level: 2 },
  { id: 's4', title: 'Build vs Buy vs Partner',      level: 2 },
  { id: 's5', title: 'What Separates Leaders from Laggards', level: 2 },
];

const STATS = [
  { figure: '72%', label: 'of organisations have adopted AI in at least one business function', source: 'McKinsey, 2024' },
  { figure: '$297B', label: 'enterprise AI software market by 2027', source: 'Gartner, 2024' },
  { figure: '1 in 3', label: 'large enterprises now have a dedicated Chief AI Officer or equivalent', source: 'Deloitte, 2024' },
  { figure: '5×', label: 'more AI patents filed in 2023 than in 2018 — investment is accelerating', source: 'WIPO, 2024' },
];

const ICON_MAP = { Megaphone, MessageSquare, BarChart2, Link2, Users, Code2 };
const ICON_OPTIONS = Object.keys(ICON_MAP);

const COLOR_OPTIONS = [
  'border-l-blue-400',
  'border-l-emerald-400',
  'border-l-amber-400',
  'border-l-purple-400',
  'border-l-rose-400',
  'border-l-slate-400',
];

const MATURITY_OPTIONS = ['Very High', 'High', 'Medium–High', 'Medium', 'Low'];

const MATURITY_VISUAL = {
  'Very High':   { pct: '92%', bar: 'bg-emerald-500', text: 'text-emerald-700' },
  'High':        { pct: '75%', bar: 'bg-blue-500',    text: 'text-blue-700'    },
  'Medium–High': { pct: '58%', bar: 'bg-amber-500',   text: 'text-amber-700'   },
  'Medium':      { pct: '42%', bar: 'bg-orange-400',  text: 'text-orange-600'  },
  'Low':         { pct: '20%', bar: 'bg-red-400',     text: 'text-red-600'     },
};

const ORG_MODELS = [
  {
    model: 'Centralised AI Team',
    desc: 'A dedicated AI centre of excellence (CoE) owns all AI strategy, tooling, and delivery. Business units submit use cases for the CoE to execute.',
    pros: ['Strong governance and consistency', 'Deep technical expertise', 'Clear accountability'],
    cons: ['Bottleneck for business units', 'Risk of building AI "for" rather than "with" the business', 'Slow iteration speed'],
    bestFor: 'Regulated industries (finance, healthcare) or early-stage AI programs',
  },
  {
    model: 'Federated / Hub and Spoke',
    desc: 'A central AI team sets standards, provides platforms, and offers support. Business units have embedded AI leads who drive adoption locally.',
    pros: ['Speed of local execution', 'Business context preserved', 'Scales across the organisation'],
    cons: ['Coordination overhead', 'Risk of inconsistent standards', 'Requires strong central governance'],
    bestFor: 'Mid-to-large enterprises with multiple business units at different AI maturity levels',
  },
  {
    model: 'Embedded / Decentralised',
    desc: 'AI capability is fully embedded in each business function. No central AI team — AI tools are adopted and operated by functional owners.',
    pros: ['Maximum agility', 'Fastest iteration', 'High business ownership'],
    cons: ['Risk of duplication', 'Governance gaps', 'Inconsistent data practices'],
    bestFor: 'Technology-native organisations or those with high digital maturity already',
  },
];

const BUILD_BUY = [
  {
    approach: 'Buy (SaaS AI)',
    icon: ShoppingCart,
    examples: 'Microsoft Copilot, Salesforce Einstein, ServiceNow AI, Workday AI',
    bestFor: 'Horizontal productivity use cases, standard workflows, rapid deployment',
    tradeoffs: 'Faster and cheaper to start. Less customisation. Vendor-dependent. Data stays in vendor\'s ecosystem.',
    timeline: '2–8 weeks to deploy',
  },
  {
    approach: 'Build on Foundation Models',
    icon: Wrench,
    examples: 'OpenAI API, Anthropic Claude API, Google Vertex AI, Azure OpenAI',
    bestFor: 'Proprietary use cases, custom workflows, competitive differentiation',
    tradeoffs: 'Higher investment. Full control over data and model behaviour. Requires technical capability. Scales well once built.',
    timeline: '8–24 weeks for first production deployment',
  },
  {
    approach: 'Partner / Managed AI',
    icon: Handshake,
    examples: 'Big 4 AI practices, specialist AI consultancies, system integrators',
    bestFor: 'Complex transformations, regulated industries, organisations without internal AI capability',
    tradeoffs: 'Expensive. Fast access to expertise. Risk of knowledge not transferring to internal team.',
    timeline: 'Variable — typically 3–12 months for major programs',
  },
];

const LEADER_FACTORS = [
  { factor: 'Clear executive sponsorship with a named AI owner at C-suite level', leader: true },
  { factor: 'Data strategy and governance in place before AI deployment', leader: true },
  { factor: 'AI value measured in business outcomes — not just technical metrics', leader: true },
  { factor: 'Workforce reskilling treated as core to the AI program, not an afterthought', leader: true },
  { factor: 'Iterative deployment — pilot, measure, scale — rather than big-bang programs', leader: true },
  { factor: 'AI capability viewed as an organisational asset, not an IT project', leader: true },
  { factor: 'AI owned solely by the technology function with no business co-ownership', leader: false },
  { factor: 'Pursuing only large, complex use cases — ignoring quick wins', leader: false },
  { factor: 'No measurement framework — success defined by deployment, not outcomes', leader: false },
  { factor: 'Change management treated as optional or a post-launch activity', leader: false },
];

const STATIC_FUNCTIONS = [
  { id: 1, name: 'Marketing & Sales', icon_name: 'Megaphone', color: 'border-l-blue-400', maturity: 'High', stat: 'Sales teams using LLM-assisted outreach report 40–50% higher pipeline conversion — Salesforce, 2024', uses: ['[LLM] Personalised content generation at scale — emails, ads, product descriptions drafted and varied per segment', '[ML] Lead scoring and propensity-to-buy models updated in real time from CRM and behavioural data', '[ML] Dynamic pricing and offer management — price optimisation models responding to demand signals', '[ASR + LLM] Conversation intelligence: call recordings transcribed (ASR) and analysed (LLM) to coach reps', '[ML] Campaign performance forecasting before launch — predicting conversion likelihood from historical patterns'] },
  { id: 2, name: 'Customer Service', icon_name: 'MessageSquare', color: 'border-l-emerald-400', maturity: 'High', stat: '35% reduction in cost-per-contact in large-scale deployments — Gartner, 2024', uses: ['[LLM + RAG] Tier-1 query resolution via LLM chatbot connected to knowledge base (RAG) — 50–70% deflection rates', '[LLM + RAG] Real-time agent assist — LLM surfaces relevant answers from docs during live calls', '[NLP] Sentiment analysis across all channels: NLP models score tone and urgency to flag at-risk customers', '[ASR + LLM] Automated case summarisation: ASR transcribes calls, LLM writes the case note and updates CRM', '[ML] Proactive outreach based on churn prediction models flagging at-risk customers before they contact you'] },
  { id: 3, name: 'Finance & Accounting', icon_name: 'BarChart2', color: 'border-l-amber-400', maturity: 'High', stat: '50% faster close cycles in finance teams using OCR + LLM tooling — McKinsey, 2024', uses: ['[OCR + ML] Automated three-way matching: OCR reads invoices; ML matches to PO and GR without manual keying', '[ML] Continuous fraud monitoring — unsupervised ML models detect anomalous transaction patterns in real time', '[LLM] Management commentary generated by LLM from structured actuals-vs-budget data — eliminates manual writing', '[LLM + NLP] Contract review: LLM reads documents and flags financial terms, obligations, and risk clauses', '[ML] Cash flow forecasting: ML regression models predict 30–90 day position from AR/AP and pipeline data'] },
  { id: 4, name: 'Supply Chain & Operations', icon_name: 'Link2', color: 'border-l-purple-400', maturity: 'Medium–High', stat: '15–20% inventory cost reduction through ML-optimised planning — WEF, 2025', uses: ['[ML] Demand forecasting: time-series ML models incorporate weather, events, and economic indicators', '[ML] Supplier risk monitoring: ML classifies risk signals and triggers early-warning alerts', '[ML] Predictive maintenance: ML models score equipment failure probability from sensor data (IoT)', '[ML] Route and inventory optimisation: combinatorial ML updated continuously from live operational data', '[CV] Quality control via computer vision (CV) cameras detecting defects on production lines in real time'] },
  { id: 5, name: 'HR & People', icon_name: 'Users', color: 'border-l-rose-400', maturity: 'Medium', stat: '35% reduction in time-to-hire using NLP + ML screening tools — Deloitte, 2024', uses: ['[NLP + ML] Applicant screening: NLP parses CVs; ML ranks candidates against structured role criteria', '[LLM + RAG] Personalised learning pathways: LLM recommends content based on role and assessed skill gaps', '[ML] Attrition prediction: ML models score flight risk from engagement signals and historical patterns', '[ML + NLP] Internal mobility matching: NLP + ML surface open roles to qualified internal candidates', '[LLM + RAG] Policy Q&A chatbot: LLM answers HR policy questions from the employee handbook via RAG'] },
  { id: 6, name: 'IT & Software Development', icon_name: 'Code2', color: 'border-l-slate-400', maturity: 'Very High', stat: 'Developers using LLM coding tools complete tasks 55% faster — GitHub, 2024', uses: ['[LLM] Code completion and generation (GitHub Copilot, Cursor) — adopted by 55%+ of enterprise dev teams', '[LLM] Automated test generation and vulnerability scanning from code context', '[LLM + ML] Incident response: LLM suggests root cause and remediation; ML anomaly detection triggers alerts', '[ML] AIOps: ML models detect infrastructure anomalies and forecast capacity needs', '[LLM + RAG] Knowledge base and documentation: LLM generates and updates docs from code and tickets (RAG)'] },
];

export default function EnterpriseWhatAI() {
  const [functions, setFunctions] = useState(STATIC_FUNCTIONS);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    fetch('/api/enterprise/functions')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setFunctions)
      .catch(() => {});
  }, []);

  function startEdit(fn) {
    setEditingId(fn.id);
    setDraft({ ...fn, uses: [...fn.uses] });
    setSaveMsg('');
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  function updateDraft(field, value) {
    setDraft(d => ({ ...d, [field]: value }));
  }

  function updateUse(i, val) {
    setDraft(d => { const uses = [...d.uses]; uses[i] = val; return { ...d, uses }; });
  }

  function addUse() {
    setDraft(d => ({ ...d, uses: [...d.uses, ''] }));
  }

  function removeUse(i) {
    setDraft(d => { const uses = d.uses.filter((_, idx) => idx !== i); return { ...d, uses }; });
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/enterprise/functions/${draft.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error('Save failed');
      const updated = await res.json();
      setFunctions(fns => fns.map(f => f.id === updated.id ? updated : f));
      setSaveMsg('Saved');
      setEditingId(null);
      setDraft(null);
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('Error saving — check backend');
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageWrapper
      badge="Page 12 — Enterprise Context"
      title="What Enterprises Are Doing with AI"
      subtitle="The scale, depth, and organisational approach enterprises are taking to AI — grounded in the latest global research and deployment data."
      sections={SECTIONS}
    >

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Scale of Deployment</h2>
        <p className="text-slate-500 text-sm mb-6">
          Enterprise AI has moved decisively from pilot to production. The numbers below represent the current baseline — not a future forecast.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {STATS.map((s) => {
            const pct = s.figure.endsWith('%') ? parseFloat(s.figure) : null;
            const frac = s.figure === '1 in 3' ? 33 : null;
            const fill = pct ?? frac;
            return (
              <div key={s.figure} className="card text-center">
                <p className="text-3xl font-extrabold text-blue-600 mb-1">{s.figure}</p>
                {fill != null && (
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden mx-3 mb-2">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${fill}%` }} />
                  </div>
                )}
                <p className="text-xs text-slate-500 leading-tight mb-2">{s.label}</p>
                <p className="text-xs font-semibold text-slate-400">{s.source}</p>
              </div>
            );
          })}
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>The inflection point has passed.</strong> For most industries, the question is no longer whether to deploy AI — it is how fast to scale existing pilots and where to focus next investment. Organisations still in "exploration mode" are already behind the operational baseline of their sector leaders.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2>Deployment by Function</h2>
          {saveMsg && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${saveMsg === 'Saved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {saveMsg}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm mb-6">
          AI value is not uniformly distributed. These six functions account for the majority of enterprise AI value creation and show the highest adoption rates.
          <span className="ml-2 text-xs text-slate-400">(Hover a card to edit)</span>
        </p>
        <div className="space-y-4">
          {functions.map((f) => {
            if (editingId === f.id && draft) {
              const EditIcon = ICON_MAP[draft.icon_name] || Megaphone;
              return (
                <div key={f.id} className={`card border-l-4 ${draft.color} ring-2 ring-blue-200`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-2 rounded-xl bg-blue-50 flex-shrink-0">
                      <EditIcon size={16} className="text-blue-600" />
                    </span>
                    <span className="text-sm font-semibold text-blue-700">Editing</span>
                    <button onClick={cancelEdit} className="ml-auto text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">Cancel</button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Function name</label>
                      <input
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={draft.name}
                        onChange={e => updateDraft('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Maturity level</label>
                      <select
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                        value={draft.maturity}
                        onChange={e => updateDraft('maturity', e.target.value)}
                      >
                        {MATURITY_OPTIONS.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Icon</label>
                      <select
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                        value={draft.icon_name}
                        onChange={e => updateDraft('icon_name', e.target.value)}
                      >
                        {ICON_OPTIONS.map(i => <option key={i}>{i}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Colour accent</label>
                      <select
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                        value={draft.color}
                        onChange={e => updateDraft('color', e.target.value)}
                      >
                        {COLOR_OPTIONS.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Stat / source line</label>
                    <input
                      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={draft.stat || ''}
                      onChange={e => updateDraft('stat', e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-600">Use cases</label>
                      <button onClick={addUse} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                        <Plus size={12} /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {draft.uses.map((u, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <textarea
                            rows={2}
                            className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                            value={u}
                            onChange={e => updateUse(i, e.target.value)}
                          />
                          <button onClick={() => removeUse(i)} className="text-slate-300 hover:text-red-400 transition-colors cursor-pointer mt-2">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button onClick={cancelEdit} className="btn-ghost text-xs">Cancel</button>
                    <button onClick={save} disabled={saving} className="btn-primary text-xs">
                      {saving ? 'Saving…' : 'Save changes'}
                    </button>
                  </div>
                </div>
              );
            }

            const FuncIcon = ICON_MAP[f.icon_name] || Megaphone;
            return (
              <div key={f.id} className={`card border-l-4 ${f.color} group relative`}>
                <button
                  onClick={() => startEdit(f)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 cursor-pointer"
                  title="Edit"
                >
                  <Pencil size={13} className="text-slate-500 hover:text-blue-600" />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2.5 rounded-xl bg-slate-100 flex-shrink-0">
                    <FuncIcon size={18} className="text-slate-600" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800">{f.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                        <div
                          className={`h-full rounded-full ${MATURITY_VISUAL[f.maturity]?.bar || 'bg-slate-300'}`}
                          style={{ width: MATURITY_VISUAL[f.maturity]?.pct || '50%' }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${MATURITY_VISUAL[f.maturity]?.text || 'text-slate-500'}`}>
                        {f.maturity} adoption
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-1 mb-3">
                  {f.uses.map((u, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-slate-300 flex-shrink-0 mt-0.5">→</span>{u}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mt-1">{f.stat}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">How Enterprises Are Organising for AI</h2>
        <p className="text-slate-500 text-sm mb-6">
          How you structure AI capability is as important as the technology choices. Three dominant models have emerged.
        </p>
        <div className="space-y-4">
          {ORG_MODELS.map((m) => (
            <div key={m.model} className="card">
              <h3 className="font-bold text-slate-800 text-base mb-2">{m.model}</h3>
              <p className="text-sm text-slate-600 mb-3">{m.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 mb-1">Strengths</p>
                  <ul className="space-y-1">{m.pros.map((p, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start"><CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />{p}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 mb-1">Risks</p>
                  <ul className="space-y-1">{m.cons.map((c, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start"><XCircle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />{c}</li>)}</ul>
                </div>
              </div>
              <p className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-1"><strong>Best for:</strong> {m.bestFor}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Build vs Buy vs Partner</h2>
        <p className="text-slate-500 text-sm mb-6">
          Most enterprises use all three — the key is matching the approach to the use case type and organisational capability.
        </p>
        <div className="space-y-4">
          {BUILD_BUY.map((b) => {
            const BuildIcon = b.icon;
            return (
            <div key={b.approach} className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-lg bg-slate-100 flex-shrink-0">
                  <BuildIcon size={16} className="text-slate-600" />
                </span>
                <h3 className="font-bold text-slate-800">{b.approach}</h3>
                <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{b.timeline}</span>
              </div>
              <p className="text-xs text-slate-500 mb-1"><strong>Examples:</strong> {b.examples}</p>
              <p className="text-xs text-slate-500 mb-2"><strong>Best for:</strong> {b.bestFor}</p>
              <p className="text-xs text-slate-600 bg-slate-50 rounded px-2 py-1.5">{b.tradeoffs}</p>
            </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">What Separates Leaders from Laggards</h2>
        <p className="text-slate-500 text-sm mb-6">
          McKinsey's 2024 research across 1,000+ organisations identified these consistent differentiators between organisations generating significant AI value and those that are not.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {LEADER_FACTORS.map((f, i) => (
            <div key={i} className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-sm border ${
              f.leader ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {f.leader
                ? <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                : <XCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
              }
              <span>{f.factor}</span>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
