import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Deployment Concepts',           level: 2 },
  { id: 's2', title: 'Small Enterprise Deployment',   level: 2 },
  { id: 's3', title: 'Large Enterprise Deployment',   level: 2 },
  { id: 's4', title: 'Data Residency & Compliance',   level: 2 },
  { id: 's5', title: 'Choosing Your Model',           level: 2 },
];

const CONCEPTS = [
  {
    model: 'Public Cloud API',
    icon: '☁️',
    color: 'bg-blue-50 border-blue-200',
    how: 'Your data is sent to a third-party provider (OpenAI, Anthropic, Google) over HTTPS. The model processes it on their infrastructure and returns a result. You pay per token.',
    pros: ['Zero infrastructure to manage', 'Instant access to latest models', 'Scales to any volume automatically', 'No upfront investment'],
    cons: ['Data leaves your environment', 'Variable cost at high volume', 'Dependent on provider uptime and pricing', 'Context window limits apply'],
    bestFor: 'Most SME deployments. Any use case where data is not highly sensitive.',
  },
  {
    model: 'Private Cloud (VPC)',
    icon: '🔒',
    color: 'bg-emerald-50 border-emerald-200',
    how: 'Model deployed in your own cloud tenant (Azure, AWS, GCP) or via a provider\'s enterprise offering (Azure OpenAI, AWS Bedrock). Data stays within your cloud environment.',
    pros: ['Data stays in your cloud tenant', 'SLA-backed enterprise agreements', 'Configurable access controls', 'No data used for model training'],
    cons: ['More expensive than public API', 'Configuration and governance overhead', 'Still cloud-dependent'],
    bestFor: 'Mid-market and enterprise with data compliance requirements. Financial services, healthcare, legal.',
  },
  {
    model: 'On-Premise / Self-Hosted',
    icon: '🏢',
    color: 'bg-amber-50 border-amber-200',
    how: 'Open-source models (Llama, Mistral) or licensed models run on your own hardware or private data centre. Data never leaves your physical environment.',
    pros: ['Maximum data control', 'No per-token cost at scale', 'Works in air-gapped environments', 'No vendor dependency'],
    cons: ['Significant hardware investment (GPU servers)', 'Requires ML engineering capability to maintain', 'Models typically less capable than frontier cloud models', 'Slow to access latest improvements'],
    bestFor: 'Government, defence, banking, healthcare — any regulated industry with strict data sovereignty requirements.',
  },
  {
    model: 'Edge Deployment',
    icon: '📱',
    color: 'bg-purple-50 border-purple-200',
    how: 'Smaller, optimised models run directly on end-user devices — phones, laptops, industrial sensors — without internet connectivity.',
    pros: ['Works offline', 'Zero latency', 'No data transmission', 'Very low operating cost'],
    cons: ['Limited model capability vs cloud', 'Requires device hardware capable of running AI', 'Harder to update and maintain'],
    bestFor: 'Field operations, manufacturing floor, remote locations, mobile apps requiring offline capability.',
  },
];

const SME_TIERS = [
  {
    tier: 'Tier 1: Out-of-the-box AI tools',
    icon: '🟢',
    investment: 'Low (£10–100/user/month)',
    examples: ['Microsoft 365 Copilot — AI across Word, Excel, Outlook, Teams', 'Google Workspace AI — AI in Docs, Gmail, Meet, Sheets', 'Notion AI — documents and knowledge base', 'Otter.ai / Fireflies — meeting transcription and summaries', 'Grammarly / Jasper — writing assistance'],
    setup: 'Days. No technical skill required. Add to existing subscriptions.',
    dataHandling: 'Data processed by vendor. Enterprise agreements available that limit training use.',
    bestFor: 'Every organisation. Start here. This is where 70% of SME AI value comes from.',
  },
  {
    tier: 'Tier 2: AI via no-code platforms',
    icon: '🟡',
    investment: 'Medium (£200–2,000/month)',
    examples: ['Zapier AI — workflow automation with AI steps', 'Make (formerly Integromat) — AI-powered automation flows', 'Bubble + AI — AI-enabled app building without code', 'Retool — internal tools with AI components'],
    setup: '1–4 weeks. Requires workflow design but no coding.',
    dataHandling: 'Depends on platform. Most offer enterprise data agreements.',
    bestFor: 'Automating specific repetitive workflows. Connecting AI to existing tools without developers.',
  },
  {
    tier: 'Tier 3: API-based custom deployment',
    icon: '🔴',
    investment: 'Higher (developer cost + API cost)',
    examples: ['OpenAI / Anthropic API — direct LLM integration into your systems', 'Azure OpenAI — enterprise-grade LLM with VPC isolation', 'Custom RAG implementation — LLM on your own documents'],
    setup: '4–12 weeks. Requires developer resource.',
    dataHandling: 'Configurable. VPC options available for sensitive data.',
    bestFor: 'Use cases not addressable by Tier 1–2. Competitive differentiation through custom AI capability.',
  },
];

const ENTERPRISE_ARCH = [
  { layer: 'Foundation Layer', desc: 'Core model selection and hosting. Enterprise agreements with OpenAI/Anthropic, or private deployment of open-source models on own cloud infrastructure.', examples: 'Azure OpenAI Service, AWS Bedrock, Google Vertex AI, self-hosted Llama' },
  { layer: 'Data & Context Layer', desc: 'Vector databases, data pipelines, and retrieval infrastructure. Connects enterprise knowledge bases to AI models in real time.', examples: 'Pinecone, Weaviate, Azure AI Search, PostgreSQL with pgvector' },
  { layer: 'Orchestration Layer', desc: 'Manages multi-step AI workflows, agent coordination, and tool calls. Routes tasks between models and external systems.', examples: 'LangChain, LlamaIndex, Microsoft Semantic Kernel, custom orchestration' },
  { layer: 'Application Layer', desc: 'User-facing AI applications: chatbots, co-pilots, automated workflows. Often built on existing enterprise platforms with AI extensions.', examples: 'Microsoft Copilot Studio, ServiceNow AI, Salesforce Einstein, custom apps' },
  { layer: 'Governance Layer', desc: 'Monitoring, logging, access control, bias detection, and cost management across all AI deployments.', examples: 'Azure AI Content Safety, Weights & Biases, custom monitoring, IAM policies' },
];

const COMPLIANCE = [
  { region: 'European Union', law: 'EU AI Act (2024) + GDPR', key: 'Risk-based classification of AI systems. High-risk AI (hiring, credit, law enforcement) requires documentation, testing, and human oversight. GDPR requires data minimisation and consent for personal data in AI training.', action: 'Classify your AI use cases by risk tier. Use vendors with EU data residency options. Review DPAs with all AI vendors.' },
  { region: 'United Kingdom', law: 'UK GDPR + ICO AI Guidance', key: 'Post-Brexit equivalent of GDPR. ICO has published specific AI guidance on transparency, fairness, and accountability. Sector regulators (FCA, CQC) have additional requirements.', action: 'Follow ICO guidance on AI transparency. Notify individuals when AI makes decisions affecting them.' },
  { region: 'Australia', law: 'Privacy Act + AI Ethics Framework', key: 'The Australian AI Ethics Framework (voluntary) and Privacy Act 1988 apply. Mandatory data breach notification. No AI-specific legislation yet — under review 2025.', action: 'Apply voluntary ethics framework. Ensure data breach notification readiness. Monitor regulatory developments.' },
  { region: 'United States', law: 'Sector-specific (FTC, HIPAA, CCPA)', key: 'No federal AI law yet. Sector regulations apply: HIPAA for healthcare, CCPA for California consumers, FTC Act for deceptive practices. Executive Order on AI (2023) directs agency guidance.', action: 'Apply sector-specific rules. Use vendor agreements that limit training use of data. Monitor state law developments.' },
];

export default function TechDeployment() {
  return (
    <PageWrapper
      badge="Page 20 — Technology of AI"
      title="Where AI Deploys"
      subtitle="Deployment models, infrastructure patterns, and practical guidance for small and large enterprise AI implementation — including data residency and compliance considerations."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Deployment Concepts</h2>
        <p className="text-slate-500 text-sm mb-6">Four fundamental deployment models — each with different cost, control, and compliance characteristics. Most organisations use a combination.</p>
        <div className="space-y-4">
          {CONCEPTS.map((c) => (
            <div key={c.model} className={`card border ${c.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="font-bold text-slate-800">{c.model}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{c.how}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 mb-1">Advantages</p>
                  <ul className="space-y-1">{c.pros.map((p, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-emerald-400 flex-shrink-0">✓</span>{p}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">Constraints</p>
                  <ul className="space-y-1">{c.cons.map((c2, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-red-400 flex-shrink-0">✗</span>{c2}</li>)}</ul>
                </div>
              </div>
              <p className="text-xs bg-white/70 rounded px-2 py-1 text-slate-600"><strong>Best for:</strong> {c.bestFor}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Small Enterprise Deployment</h2>
        <p className="text-slate-500 text-sm mb-4">For organisations with 5–200 employees, a three-tier approach matches investment to capability and risk appetite.</p>
        <div className="space-y-5">
          {SME_TIERS.map((t) => (
            <div key={t.tier} className="card">
              <div className="flex items-center gap-2 mb-3">
                <span>{t.icon}</span>
                <h3 className="font-bold text-slate-800">{t.tier}</h3>
                <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{t.investment}</span>
              </div>
              <div className="mb-3">
                <p className="text-xs font-semibold text-slate-500 mb-1">Tools</p>
                <ul className="space-y-1">{t.examples.map((ex, i) => <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-slate-300 flex-shrink-0">→</span>{ex}</li>)}</ul>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-50 rounded p-2"><p className="font-semibold text-slate-500 mb-0.5">Setup</p><p className="text-slate-600">{t.setup}</p></div>
                <div className="bg-slate-50 rounded p-2"><p className="font-semibold text-slate-500 mb-0.5">Data</p><p className="text-slate-600">{t.dataHandling}</p></div>
                <div className="bg-blue-50 rounded p-2"><p className="font-semibold text-blue-500 mb-0.5">Best for</p><p className="text-blue-700">{t.bestFor}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Large Enterprise Deployment</h2>
        <p className="text-slate-500 text-sm mb-4">Enterprise AI architecture is layered. Each layer has its own tooling, governance requirements, and ownership model.</p>
        <div className="space-y-3">
          {ENTERPRISE_ARCH.map((l, i) => (
            <div key={l.layer} className="card flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <p className="font-bold text-slate-800 mb-1">{l.layer}</p>
                <p className="text-sm text-slate-500 mb-1">{l.desc}</p>
                <p className="text-xs text-slate-400"><strong>Tools:</strong> {l.examples}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Data Residency & Compliance</h2>
        <p className="text-slate-500 text-sm mb-4">Where your data is processed, stored, and used for AI training is a material compliance question in most regulated markets.</p>
        <div className="space-y-3">
          {COMPLIANCE.map((c) => (
            <div key={c.region} className="card">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800">{c.region}</h3>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{c.law}</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">{c.key}</p>
              <p className="text-xs text-blue-700 bg-blue-50 rounded px-2 py-1.5"><strong>Action:</strong> {c.action}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Choosing Your Deployment Model</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">If you need…</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">Use this model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { need: 'Fastest start, lowest cost, general productivity', model: 'Public Cloud API (Tier 1 tools)' },
                { need: 'Custom workflows without developers', model: 'No-code platforms (Tier 2)' },
                { need: 'AI connected to your specific documents and data', model: 'RAG via cloud API or managed service' },
                { need: 'Data must stay in your cloud environment', model: 'Azure OpenAI / AWS Bedrock (Private VPC)' },
                { need: 'Data cannot leave your physical environment', model: 'Self-hosted open-source (Llama, Mistral)' },
                { need: 'Works without internet connection', model: 'Edge deployment' },
                { need: 'Maximum capability with enterprise compliance', model: 'Private cloud + enterprise LLM agreement' },
              ].map((r, i) => (
                <tr key={i}>
                  <td className="py-3 text-slate-600 pr-4">{r.need}</td>
                  <td className="py-3"><span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{r.model}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageWrapper>
  );
}
