import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '7.1 The Four Enablers',         level: 2 },
  { id: 's2', title: '7.2 Tools by Maturity Stage',   level: 2 },
  { id: 's3', title: '7.3 Reference Technical Stack', level: 2 },
  { id: 's4', title: '7.4 Governance & Risk',         level: 2 },
  { id: 's5', title: '7.5 Procurement Guidance',      level: 2 },
];

const ENABLERS = [
  { num: '01', title: 'Tools', icon: '🔧', color: 'border-sky-200 bg-sky-50', desc: 'The right software for the maturity stage. For most organisations starting out, this is a mix of configured commercial AI products — not custom builds. Sizing: typically $200–$600 per user per year across all AI tools combined at Stage 1–2.' },
  { num: '02', title: 'People', icon: '👥', color: 'border-emerald-200 bg-emerald-50', desc: 'Three roles: an executive sponsor who owns the value (not just the budget), functional champions one per deployment area, and a technical guide who can translate between business and technology. Missing any one of these predicts failure.' },
  { num: '03', title: 'Processes', icon: '🔄', color: 'border-amber-200 bg-amber-50', desc: 'For each use case: where does a human review AI output? What\'s the quality check? What\'s the escalation path? How does the team give feedback? These decisions are what make AI safe to deploy — and what most projects skip.' },
  { num: '04', title: 'Data & Context', icon: '📂', color: 'border-purple-200 bg-purple-50', desc: 'AI is only as good as what it knows about the business. A generic AI gives generic answers. Load it with your policies, examples, and reference materials and it gives your answers. This is cheap to do and almost nobody does it well.' },
];

const TOOLS_BY_STAGE = [
  {
    stage: 'Stage 1 — Assistant',
    tools: [
      { name: 'Microsoft 365 Copilot', use: 'Embedded in Teams, Outlook, Word, Excel. Low-friction entry for Microsoft shops.', cost: '~$30/user/mo' },
      { name: 'Claude Teams / Pro',    use: 'Superior long-document reasoning and business writing. Best for document-heavy workflows.', cost: '~$25/user/mo' },
      { name: 'ChatGPT Teams',         use: 'Broad capability, familiarity advantage. Good for general-purpose tasks.', cost: '~$25/user/mo' },
      { name: 'Google Gemini',         use: 'Natural fit for Google Workspace users. Strong at structured data and spreadsheets.', cost: '~$22/user/mo' },
    ],
  },
  {
    stage: 'Stage 2 — Accelerator',
    tools: [
      { name: 'Claude Projects / Custom GPTs', use: 'Pre-load business context, policies, examples. Every query is now in your business context, not a generic one.', cost: 'Included in Teams tier' },
      { name: 'Gong / Chorus / Fireflies',     use: 'Meeting and call AI — transcription, coaching, CRM summaries.', cost: '$80–$150/user/mo' },
      { name: 'Dext / Ramp / Expensify AI',    use: 'Finance-specific AI for receipt and invoice processing.', cost: '$20–$80/user/mo' },
      { name: 'Apollo.io / Clay',              use: 'AI-enriched prospecting and sales intelligence.', cost: '$50–$150/user/mo' },
    ],
  },
  {
    stage: 'Stage 3 — Automator',
    tools: [
      { name: 'n8n (self-hosted)',     use: 'Open-source workflow automation. Connects AI tools to legacy systems via file watching, email, CSV.', cost: '$0 self-hosted' },
      { name: 'Power Automate',        use: 'Microsoft-native RPA and workflow automation. Best for Microsoft 365 environments.', cost: 'From $15/user/mo' },
      { name: 'Custom tools (FastAPI + React)', use: 'Standalone AI applications built for specific workflows. AI processes, humans review exceptions.', cost: 'Build cost only' },
      { name: 'Langfuse / Helicone',   use: 'LLM call monitoring, cost tracking, prompt debugging. Essential from day one of custom builds.', cost: 'Free tier available' },
    ],
  },
  {
    stage: 'Stage 4 — Operator',
    tools: [
      { name: 'Agent platforms',       use: 'Claude Tool Use, OpenAI Assistants, LangGraph for multi-step agentic workflows.', cost: 'API consumption' },
      { name: 'LlamaIndex / LangChain',use: 'Orchestration for RAG, document retrieval, multi-agent systems.', cost: 'Open source' },
      { name: 'Monitoring dashboards', use: 'Custom dashboards showing AI-generated signals alongside operational KPIs.', cost: 'Build cost' },
      { name: 'Vector databases',      use: 'pgvector (Postgres extension) for most SME workloads. Pinecone/Qdrant for larger document volumes.', cost: 'pgvector: free' },
    ],
  },
];

const STACK = [
  { layer: 'Frontend / UI',            rec: 'React + Vite (rich UI) or Streamlit (internal tools, fastest build)', alt: 'Next.js for public-facing or SSR needs' },
  { layer: 'Backend / Logic',          rec: 'Python + FastAPI (AI-heavy, best ecosystem fit)', alt: 'Node.js + Express for JavaScript-oriented teams' },
  { layer: 'AI / LLM Layer',          rec: 'Anthropic Claude API (documents, reasoning, writing)', alt: 'OpenAI GPT-4o; Ollama (local) for sensitive data' },
  { layer: 'Embeddings',              rec: 'OpenAI text-embedding-3 or Voyage AI', alt: 'Ollama local embeddings for air-gapped environments' },
  { layer: 'Data — Structured',       rec: 'PostgreSQL + pgvector extension', alt: 'Pinecone or Qdrant if document volume exceeds 500k chunks' },
  { layer: 'Data — Documents',        rec: 'Azure Blob / AWS S3 / Cloudflare R2', alt: 'SharePoint or Google Drive for Microsoft/Google shops' },
  { layer: 'I/O Bridges',             rec: 'Shared folders, email ingestion, CSV import/export', alt: 'n8n for automation; Microsoft Graph API for M365' },
  { layer: 'Authentication',          rec: 'Microsoft Entra ID (Azure AD) for M365 shops', alt: 'Auth0 or Clerk for standalone deployments' },
  { layer: 'Hosting',                 rec: 'Azure Container Apps or AWS ECS Fargate', alt: 'Hetzner / DigitalOcean VPS ($20–50/mo) for cost-sensitive' },
  { layer: 'Observability',           rec: 'Langfuse (LLM-specific) + Sentry (application errors)', alt: 'Helicone as alternative LLM monitor' },
];

const GOV_ITEMS = [
  { area: 'Data handling',     detail: 'Classify data before putting it into AI tools. Customer PII and financial data need explicit classification, access controls, and vendor data-processing agreements.' },
  { area: 'Acceptable use',    detail: 'Publish a clear policy: what AI tools are approved, what data can be used with them, what outputs require human review, and what\'s never permitted.' },
  { area: 'Human-in-the-loop', detail: 'For every automated output that affects a customer, a financial record, or a compliance obligation — define the human review checkpoint before deploying.' },
  { area: 'Audit & logging',   detail: 'Log every AI call: input, output, user, timestamp. You cannot improve what you cannot see, and you\'ll need this for compliance and performance monitoring.' },
  { area: 'Vendor risk',       detail: 'Understand your LLM vendor\'s data retention policy. Enterprise tiers of Claude and OpenAI do not train on your data by default — confirm this in writing.' },
];

export default function Technology() {
  return (
    <PageWrapper
      badge="Page 7 — Implementation"
      title="Technology, Tools & Enablers"
      subtitle="The practical 'what do we actually need in place' page. What to buy, what to build, what to govern, and in what order."
      sections={SECTIONS}
    >
      {/* 7.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">7.1 The Four Enablers</h2>
        <p className="text-sm text-slate-500 mb-4">AI is an amplifier. It makes a well-run business more effective and a poorly-run one more chaotic, faster. These four enablers determine which one you become.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {ENABLERS.map((e) => (
            <div key={e.num} className={`card border ${e.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{e.icon}</span>
                <div>
                  <span className="text-xs text-slate-400 font-mono">{e.num}</span>
                  <h3 className="text-sm">{e.title}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">7.2 Tools by Maturity Stage</h2>
        <div className="space-y-5">
          {TOOLS_BY_STAGE.map((ts) => (
            <div key={ts.stage}>
              <p className="text-sm font-semibold text-slate-700 mb-2">{ts.stage}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left p-2.5 font-medium border border-slate-200 w-48">Tool</th>
                      <th className="text-left p-2.5 font-medium border border-slate-200">Best for</th>
                      <th className="text-left p-2.5 font-medium border border-slate-200 w-36">Indicative cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ts.tools.map((t, i) => (
                      <tr key={t.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2.5 border border-slate-200 font-medium text-slate-700">{t.name}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-600">{t.use}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-500 text-xs">{t.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">7.3 Reference Technical Stack</h2>
        <p className="text-sm text-slate-500 mb-4">The default stack for a standalone AI tool built alongside legacy systems. Start with the simplest option that works — defer infrastructure decisions until you have a reason to upgrade.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left p-3 font-semibold border border-slate-200 w-40">Layer</th>
                <th className="text-left p-3 font-semibold border border-slate-200">Recommendation</th>
                <th className="text-left p-3 font-semibold border border-slate-200">Alternative</th>
              </tr>
            </thead>
            <tbody>
              {STACK.map((s, i) => (
                <tr key={s.layer} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 font-medium text-slate-700">{s.layer}</td>
                  <td className="p-3 border border-slate-200 text-slate-600">{s.rec}</td>
                  <td className="p-3 border border-slate-200 text-slate-400 text-xs">{s.alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">7.4 Governance & Risk</h2>
        <div className="space-y-3">
          {GOV_ITEMS.map(g => (
            <div key={g.area} className="card flex gap-4">
              <div className="w-2 bg-blue-600 rounded-full flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{g.area}</p>
                <p className="text-slate-600 text-sm">{g.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7.5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">7.5 Procurement & Licensing Guidance</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          {[
            { title: 'Per-seat vs. consumption-based', desc: 'Per-seat pricing is predictable — good for budgeting. Consumption-based scales with usage — good for variable or low-volume use cases. Most SMEs should start per-seat for planning simplicity.' },
            { title: 'What to negotiate', desc: 'Annual commitment over monthly for 15–20% discount. Data residency and retention terms. SLA for enterprise-tier support. Right to exit clause if the product materially changes.' },
            { title: 'Multi-vendor vs. single platform', desc: 'Multi-vendor gives you the best tool per use case and avoids lock-in. Single-platform is cheaper to manage and easier to govern. Most organisations start single-platform and diversify as maturity increases.' },
            { title: 'Budget for API costs', desc: 'A rough rule: $0.01–$0.10 per document-heavy interaction with Claude. For most SMEs, total monthly API cost is well under what a single staff member costs for the hours saved. Track it from day one with Langfuse.' },
          ].map(p => (
            <div key={p.title} className="card">
              <p className="font-semibold text-slate-800 mb-2">{p.title}</p>
              <p className="text-slate-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
