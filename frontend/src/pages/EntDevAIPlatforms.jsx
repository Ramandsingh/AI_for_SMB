import { Cloud, Shield, Layers, BarChart2, GitBranch, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The Enterprise AI Platform Landscape',  level: 2 },
  { id: 's2', title: 'Azure AI Foundry — Deep Dive',         level: 2 },
  { id: 's3', title: 'AWS SageMaker',                        level: 2 },
  { id: 's4', title: 'Google Vertex AI',                     level: 2 },
  { id: 's5', title: 'Platform Selection Framework',         level: 2 },
];

const PLATFORM_OVERVIEW = [
  {
    platform: 'Azure AI Foundry',
    vendor: 'Microsoft',
    tagline: 'Unified governance-first enterprise AI development platform',
    strength: 'Deepest integration with Microsoft 365, Teams, and enterprise identity (Entra ID). 1,800+ model catalog. Policy propagation from organisation level to individual project.',
    models: 'OpenAI GPT-4o/4.1, o3/o4-mini, Meta Llama 4, Microsoft Phi-4, Mistral, open-source',
    bestFor: 'Microsoft-centric enterprises, regulated industries, organisations requiring multi-level governance',
    color: 'border-l-blue-500',
  },
  {
    platform: 'AWS SageMaker',
    vendor: 'Amazon Web Services',
    tagline: 'End-to-end ML platform with deep AWS ecosystem integration',
    strength: 'Broadest ML tooling depth. Mature feature store (SageMaker Feature Store), model registry, and automated deployment pipelines. Ground Truth for labelling. Bedrock for managed foundation model access.',
    models: 'Amazon Titan, Meta Llama, Anthropic Claude, Stability AI, Cohere, Mistral — via Bedrock',
    bestFor: 'AWS-native organisations, teams with established ML workflows, high-volume batch inference',
    color: 'border-l-amber-500',
  },
  {
    platform: 'Google Vertex AI',
    vendor: 'Google Cloud',
    tagline: 'Google-native AI platform with unmatched Gemini integration',
    strength: 'Native Gemini model access including multimodal. Best TPU access for large-scale training. AutoML for lower-code use cases. Vertex AI Search and Conversation for managed RAG.',
    models: 'Gemini 1.5/2.0 Pro/Flash/Ultra, Imagen, Chirp (speech), PaLM 2, open-source via Model Garden',
    bestFor: 'Google Cloud-native organisations, multimodal AI use cases, large-scale custom model training',
    color: 'border-l-emerald-500',
  },
];

const FOUNDRY_HIERARCHY = [
  {
    level: 'Foundry Resource',
    role: 'Organisation-level governance',
    controls: ['Network access policies', 'Security and identity (Entra ID)', 'Model deployment governance', 'Spend and quota limits'],
    detail: 'The top-level Azure resource. Security configurations set here automatically propagate down to all hubs and projects. IT administrators manage enterprise-wide guardrails at this level.',
    color: 'bg-blue-800 text-white',
    borderColor: 'border-blue-700',
  },
  {
    level: 'Hub',
    role: 'Team collaboration boundary',
    controls: ['Public/private network isolation', 'Encryption key management', 'Managed virtual networks', 'Shared compute pool and quotas'],
    detail: 'The environment where a team collaborates. Three networking isolation modes at creation: Public, Private with Internet Outbound, Private with Approved Outbound. Compute is shared across all projects in the hub.',
    color: 'bg-blue-600 text-white',
    borderColor: 'border-blue-500',
  },
  {
    level: 'Project',
    role: 'Individual development workspace',
    controls: ['Model training and fine-tuning', 'Prompt Flow development', 'Agent building', 'Evaluation runs and deployments'],
    detail: 'Where teams do actual AI work. Isolated from other projects within the same hub. Inherits security and compute settings from the parent hub but manages its own experiments and deployments.',
    color: 'bg-blue-400 text-white',
    borderColor: 'border-blue-300',
  },
];

const FOUNDRY_CAPABILITIES = [
  {
    capability: 'Foundry Models (1,800+ catalog)',
    icon: Layers,
    detail: 'Curated catalog of foundation models deployable from the portal. Two deployment modes: Managed Compute (dedicated VMs, full lifecycle control, ideal for fine-tuning) and Serverless API (pay-per-token, instant access, no hardware management). Includes OpenAI reasoning models (o3, o4-mini), Meta Llama 4, Microsoft Phi-4, and hundreds of open-source models.',
  },
  {
    capability: 'Foundry Agent Service',
    icon: GitBranch,
    detail: 'Managed runtime for building, evaluating, and scaling AI agents. Core primitives: Threads (conversation history), Runs (the agent\'s reasoning loop), and Tools (built-in: Azure AI Search, Bing, SharePoint, code interpreter — or custom function tools). Supports multi-agent patterns. Identity management, content safety, and observability are built-in — teams don\'t implement these independently.',
  },
  {
    capability: 'Foundry IQ (RAG grounding)',
    icon: Cloud,
    detail: 'Powered by Azure AI Search. Centralises RAG workflows into a single grounding API. Reimagines RAG as a dynamic reasoning process rather than a one-time lookup. Connects agents to multiple enterprise data sources via one entry point. Enforces user access permissions and data classifications during retrieval — so employees only retrieve content they\'re authorised to see.',
  },
  {
    capability: 'Prompt Flow',
    icon: BarChart2,
    detail: 'Visual and code-based orchestration tool for building LLM pipelines. Defines chains as a Directed Acyclic Graph (DAG) — each node is a step: LLM call, Python function, API call, or conditional logic. Azure-native equivalent of LangGraph. Built-in versioning, evaluation, and deployment. Integrates with fine-tuned model endpoints.',
  },
  {
    capability: 'Evaluation Framework',
    icon: CheckCircle2,
    detail: 'Built-in evaluators covering coherence, relevance, groundedness, and safety. Custom evaluators (LLM-as-a-judge, code-based) for internal standards. Continuous evaluation automatically assesses sampled production traffic and surfaces quality/safety/performance signals via Azure Monitor. Enables regression detection over model versions.',
  },
  {
    capability: 'Responsible AI & Security',
    icon: Shield,
    detail: 'Models subject to Microsoft\'s Responsible AI review. Content Safety API filters harmful outputs. Model transparency reports give customers visibility into risk and mitigation. Network-level controls: disabling public network access on the hub secures all child deployments. Zero-trust enforced at the DPU layer (NVIDIA BlueField-3) for network isolation.',
  },
];

const SAGEMAKER_COMPONENTS = [
  { component: 'SageMaker Studio',         desc: 'Unified IDE for data science — notebooks, experiments, pipelines, model registry all in one browser-based environment.' },
  { component: 'SageMaker Feature Store',  desc: 'Online and offline feature store with automatic consistency between training (offline) and serving (online) environments.' },
  { component: 'SageMaker Pipelines',      desc: 'Managed CI/CD for ML — automated training, evaluation, and deployment pipelines with conditional logic and approval gates.' },
  { component: 'SageMaker Model Registry', desc: 'Centralised registry for model versions with metadata, evaluation metrics, and deployment history. Supports approval workflows.' },
  { component: 'SageMaker Ground Truth',   desc: 'Managed data labelling service using a combination of human labellers and automated pre-labelling to generate training datasets.' },
  { component: 'Amazon Bedrock',           desc: 'Managed foundation model service — Claude, Llama, Titan, Stable Diffusion — via API. Fine-tuning and knowledge bases (RAG) available without infrastructure.' },
];

const VERTEX_COMPONENTS = [
  { component: 'Vertex AI Workbench',      desc: 'Managed Jupyter notebooks with pre-installed ML frameworks and direct access to Google Cloud storage and compute.' },
  { component: 'Vertex AI Pipelines',      desc: 'Managed Kubeflow Pipelines — containerised ML pipeline orchestration. Native integration with Google Cloud services.' },
  { component: 'Model Garden',             desc: 'Access to 150+ foundation models including Gemini, Imagen, Chirp, and open-source models. Deploy with one click.' },
  { component: 'Vertex AI Search',         desc: 'Managed RAG — connects to enterprise data sources (Cloud Storage, BigQuery, Spanner) and serves grounded responses via API.' },
  { component: 'AutoML',                   desc: 'Automated model training for tabular, image, text, and video data. Minimal ML expertise required for structured prediction tasks.' },
  { component: 'Vertex AI Feature Store',  desc: 'Managed feature store with online serving via Bigtable and offline storage via BigQuery. Consistent feature definitions across training and serving.' },
];

const SELECTION_CRITERIA = [
  { criterion: 'Existing cloud footprint',    azure: '★★★ — Microsoft 365, Azure native',  aws: '★★★ — AWS services deeply integrated', gcp: '★★ — Google Workspace, GCP native' },
  { criterion: 'Enterprise governance needs', azure: '★★★ — Hub/Project policy propagation', aws: '★★ — IAM + Service Control Policies', gcp: '★★ — IAM + Org policies' },
  { criterion: 'Foundation model breadth',   azure: '★★★ — 1,800+ models, OpenAI access',   aws: '★★★ — Bedrock multi-model access',   gcp: '★★★ — Gemini + Model Garden' },
  { criterion: 'ML tooling depth',           azure: '★★ — Strong with AML backend',         aws: '★★★ — Most mature MLOps tooling',    gcp: '★★ — Pipelines + AutoML' },
  { criterion: 'Custom training scale',      azure: '★★ — ND A100 / H100 clusters',         aws: '★★ — P4d/P4de instances, Trainium',  gcp: '★★★ — TPU v5, best for large models' },
  { criterion: 'Agent / agentic AI',         azure: '★★★ — Foundry Agent Service',          aws: '★★ — Bedrock Agents',                gcp: '★★ — Vertex AI Agent Builder' },
  { criterion: 'Microsoft 365 integration',  azure: '★★★ — Native (Copilot, Teams)',        aws: '✗ Not applicable',                  gcp: '✗ Not applicable' },
];

export default function EntDevAIPlatforms() {
  return (
    <PageWrapper
      badge="Enterprise AI Development · Page 26"
      title="Enterprise AI Platforms"
      subtitle="The three hyperscaler AI platforms that enterprises use to build, train, and deploy AI — with an in-depth look at Azure AI Foundry, the most complete governance-first platform for enterprise AI development."
      sections={SECTIONS}
    >
      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The Enterprise AI Platform Landscape</h2>
        <p className="text-slate-500 text-sm mb-6">The three major hyperscalers have converged on end-to-end AI development platforms. The choice between them is primarily driven by existing cloud footprint and governance requirements.</p>
        <div className="space-y-4">
          {PLATFORM_OVERVIEW.map(p => (
            <div key={p.platform} className={`card border-l-4 ${p.color}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="font-bold text-slate-800">{p.platform}</p>
                  <p className="text-xs text-slate-400">{p.vendor} · {p.tagline}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-2">{p.strength}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <p className="text-xs bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5"><span className="font-semibold text-slate-700">Models:</span> <span className="text-slate-500">{p.models}</span></p>
                <p className="text-xs bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5"><span className="font-semibold text-blue-700">Best for:</span> <span className="text-slate-600">{p.bestFor}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Azure AI Foundry — Deep Dive</h2>
        <p className="text-slate-500 text-sm mb-6">Azure AI Foundry (formerly Azure AI Studio) is Microsoft's unified enterprise AI development platform. It is organised as a governed three-tier hierarchy where security and policy propagate from the top down.</p>

        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Architectural Hierarchy</p>
        <div className="space-y-2 mb-6">
          {FOUNDRY_HIERARCHY.map((h, i) => (
            <div key={h.level} className={`rounded-2xl border ${h.borderColor} overflow-hidden`}>
              <div className={`${h.color} px-4 py-2 flex items-center gap-2`}>
                <span className="text-xs font-bold opacity-70">{i + 1}</span>
                <span className="font-bold text-sm">{h.level}</span>
                <span className="text-xs opacity-70 ml-1">— {h.role}</span>
              </div>
              <div className="px-4 py-3 bg-white">
                <p className="text-xs text-slate-600 mb-2">{h.detail}</p>
                <div className="flex flex-wrap gap-1.5">
                  {h.controls.map(c => (
                    <span key={c} className="text-xs bg-slate-100 text-slate-600 rounded-md px-2 py-0.5">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Core Platform Capabilities</p>
        <div className="space-y-3">
          {FOUNDRY_CAPABILITIES.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.capability} className="card py-4">
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-blue-50 flex-shrink-0">
                    <Icon size={16} className="text-blue-600" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm mb-1">{c.capability}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">AWS SageMaker</h2>
        <p className="text-slate-500 text-sm mb-6">SageMaker remains the most mature end-to-end ML platform for enterprises with established data science teams. Amazon Bedrock, its managed foundation model service, is the fastest path to GenAI on AWS.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {SAGEMAKER_COMPONENTS.map(c => (
            <div key={c.component} className="card py-3 px-4">
              <p className="text-xs font-bold text-amber-700 mb-1">{c.component}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Google Vertex AI</h2>
        <p className="text-slate-500 text-sm mb-6">Vertex AI is Google's unified ML platform, offering unmatched access to Gemini multimodal models and TPU-based training for large-scale custom model development.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {VERTEX_COMPONENTS.map(c => (
            <div key={c.component} className="card py-3 px-4">
              <p className="text-xs font-bold text-emerald-700 mb-1">{c.component}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Platform Selection Framework</h2>
        <p className="text-slate-500 text-sm mb-6">★★★ = best in class · ★★ = strong · ★ = adequate</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Selection Criterion</th>
                <th className="text-left p-3 font-semibold text-blue-700 border border-slate-200">Azure AI Foundry</th>
                <th className="text-left p-3 font-semibold text-amber-700 border border-slate-200">AWS SageMaker</th>
                <th className="text-left p-3 font-semibold text-emerald-700 border border-slate-200">Google Vertex AI</th>
              </tr>
            </thead>
            <tbody>
              {SELECTION_CRITERIA.map((r, i) => (
                <tr key={r.criterion} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 font-medium text-slate-700">{r.criterion}</td>
                  <td className="p-3 border border-slate-200 text-slate-600">{r.azure}</td>
                  <td className="p-3 border border-slate-200 text-slate-600">{r.aws}</td>
                  <td className="p-3 border border-slate-200 text-slate-600">{r.gcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card bg-slate-800 text-white border-0 mt-6 text-sm">
          <p className="font-semibold text-slate-300 mb-2">Practical guidance</p>
          <p className="text-slate-400 text-xs leading-relaxed">Most large enterprises are multi-cloud and will use more than one platform. A common pattern: Azure AI Foundry for GenAI application development and agent deployment (leveraging M365 integration), AWS SageMaker for trained ML model pipelines where the team already has deep AWS investment, and Google Vertex for multimodal or TPU-scale training workloads. The platforms are not mutually exclusive — they're complements.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
