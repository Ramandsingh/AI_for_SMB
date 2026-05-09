import { Brain, Search, Zap, Settings, ArrowRight, Database, RefreshCw } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The Three Integration Strategies',     level: 2 },
  { id: 's2', title: 'The F5 AI Factory Building Blocks',    level: 2 },
  { id: 's3', title: 'RAG: Architecture & Pipeline',         level: 2 },
  { id: 's4', title: 'Fine-Tuning: When & How',             level: 2 },
  { id: 's5', title: 'Production Considerations',           level: 2 },
];

const INTEGRATION_STRATEGIES = [
  {
    strategy: 'API / Prompt Engineering',
    icon: Zap,
    color: 'border-l-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    when: 'The foundation model already knows enough. You need speed, not customisation.',
    how: 'Call a hosted API (OpenAI, Anthropic Claude, Google Gemini) with a well-engineered system prompt and few-shot examples. The model’s general knowledge handles the task.',
    cost: 'Lowest. Pay-per-token. No infra to manage.',
    latency: '0.5–3 seconds per response.',
    customisation: 'Limited — model cannot know your proprietary data or internal terminology.',
    examples: 'Email drafting, summarisation, code completion, general Q&A',
    limits: 'Hallucination risk on proprietary facts. Context window limits. Cannot learn from your data.',
  },
  {
    strategy: 'Retrieval-Augmented Generation (RAG)',
    icon: Search,
    color: 'border-l-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    when: 'You need answers grounded in your own documents, policies, or live data — without retraining a model.',
    how: 'At inference time, retrieve relevant chunks from a vector database and inject them into the prompt as context. The model reasons over your retrieved content, not just its training data.',
    cost: 'Moderate. Vector DB storage and query costs. No GPU training budget.',
    latency: '1–5 seconds including retrieval hop.',
    customisation: 'High for knowledge grounding. Cannot change model reasoning style.',
    examples: 'Internal Q&A, policy chatbots, contract review, customer support with live KB',
    limits: 'Retrieval quality determines output quality. Requires clean, indexed enterprise content.',
  },
  {
    strategy: 'Fine-Tuning',
    icon: Settings,
    color: 'border-l-purple-400',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    when: 'You need consistent style, tone, format, or domain vocabulary that prompting alone cannot achieve — and you have labelled training examples.',
    how: 'Take a pre-trained foundation model and continue training it on your curated examples. Weights are adjusted to reflect your patterns. The fine-tuned model becomes your own.',
    cost: 'High. GPU compute for training runs + storage. Ongoing retraining costs as data evolves.',
    latency: 'Same as base model at inference time.',
    customisation: 'Highest for behaviour and style. Can instil domain vocabulary, output format, and reasoning patterns.',
    examples: 'Customer service tone, legal document formatting, medical note style, code in internal frameworks',
    limits: 'Requires 100–100,000 labelled examples. Risk of catastrophic forgetting. Expensive to keep current.',
  },
];

const AI_FACTORY_BLOCKS = [
  {
    block: 'Inference',
    desc: 'Making predictions or generating outputs from a pre-trained model. The model applies learned knowledge to new data. This is the highest-frequency operation in a deployed AI factory.',
    layer: 'Production',
    color: 'bg-blue-600',
  },
  {
    block: 'Inference with RAG',
    desc: 'Elevates basic inference by pulling additional context from vector databases in real time. Retrieved context is injected into the prompt before the model generates a response.',
    layer: 'Production',
    color: 'bg-blue-500',
  },
  {
    block: 'RAG Corpus Management',
    desc: 'The offline data pipeline that makes RAG possible: data ingestion → normalisation → tokenisation → embedding generation → indexing into vector stores and knowledge graphs.',
    layer: 'Data pipeline',
    color: 'bg-emerald-600',
  },
  {
    block: 'Fine-Tuning',
    desc: 'Adjusting an existing model’s weights on domain-specific data. Feedback data from production inference pipelines flows back into fine-tuning, creating a continuous improvement loop.',
    layer: 'Model development',
    color: 'bg-purple-600',
  },
  {
    block: 'Training',
    desc: 'Constructing a new model from scratch: data collection, preprocessing, architecture selection, training execution, validation, and testing. The full lifecycle.',
    layer: 'Model development',
    color: 'bg-purple-800',
  },
  {
    block: 'External Services (Agentic)',
    desc: 'Live, real-time API calls to external data sources — websites, databases, SaaS tools — during inference. Distinguished from RAG Corpus Management by the absence of pre-processing.',
    layer: 'Production',
    color: 'bg-amber-600',
  },
  {
    block: 'Development',
    desc: 'All workflows for building, maintaining, and deploying AI application components: front-end apps, LLM orchestration frameworks (LangChain, LlamaIndex), source control, CI/CD.',
    layer: 'Engineering',
    color: 'bg-slate-600',
  },
];

const RAG_PHASES = [
  {
    phase: 'Phase 1 — Corpus Preparation (Offline)',
    color: 'border-emerald-300',
    bg: 'bg-emerald-50',
    steps: [
      { step: 'Data Ingestion',         detail: 'Collect raw enterprise data: documents, PDFs, wikis, database records, emails, transcripts. Connectors pull from SharePoint, Confluence, S3, databases.' },
      { step: 'Normalisation',          detail: 'Convert disparate formats (PDF, DOCX, HTML, JSON) into a consistent, processable structure. Handle encoding, remove boilerplate, preserve metadata.' },
      { step: 'Chunking',               detail: 'Split documents into segments that fit within model context windows. Chunk strategy (fixed-size, semantic, hierarchical) significantly affects retrieval quality.' },
      { step: 'Embedding Generation',   detail: 'Each chunk is passed through an embedding model (e.g. text-embedding-3-large, Ada 002, Cohere Embed) to produce a dense vector representation of its meaning.' },
      { step: 'Indexing',               detail: 'Vectors stored in a vector database (Pinecone, Weaviate, pgvector, Azure AI Search, FAISS). Metadata indexed for filtering (date, department, access level).' },
    ],
  },
  {
    phase: 'Phase 2 — Inference with RAG (Runtime)',
    color: 'border-blue-300',
    bg: 'bg-blue-50',
    steps: [
      { step: 'Query received',         detail: 'User query enters the orchestration layer. May be rewritten (query expansion) for better retrieval coverage.' },
      { step: 'Retrieval',              detail: 'Query is embedded using the same model used at indexing time. Vector similarity search returns the top-k most relevant chunks from the vector database.' },
      { step: 'Context injection',      detail: 'Retrieved chunks are inserted into the prompt as additional context — "Here is the relevant information from our knowledge base: [...]."' },
      { step: 'LLM generation',         detail: 'The model receives the augmented prompt (original query + retrieved context) and generates a response grounded in retrieved enterprise knowledge.' },
      { step: 'Response & citation',    detail: 'Output returned to user, optionally with source citations linking back to the source documents for auditability.' },
    ],
  },
];

const FINE_TUNING_TYPES = [
  {
    type: 'Supervised Fine-Tuning (SFT)',
    when: 'You have labelled input–output pairs — examples of what the model should produce given a specific input.',
    data: '500–0,000+ example pairs. Data quality matters more than quantity.',
    use: 'Teaching the model a consistent output format, tone, or domain-specific response style.',
    platforms: 'Available on GPT-4.1-nano (Azure), Llama 4 Scout, most open-source models via Hugging Face.',
  },
  {
    type: 'Reinforcement Fine-Tuning (RFT)',
    when: 'You have a verifiable reward signal — cases where the model’s answer can be objectively assessed as correct or incorrect.',
    data: 'Reward function or human preference data (RLHF). Harder to produce than SFT pairs.',
    use: 'Reasoning tasks: math, logic, code correctness, multi-step problem solving.',
    platforms: 'Azure AI Foundry (o4-mini). OpenAI API. Internally via TRL library.',
  },
  {
    type: 'Parameter-Efficient Fine-Tuning (PEFT / LoRA)',
    when: 'You want fine-tuning without the full GPU cost of adjusting all model weights.',
    data: 'Same as SFT, but the training process only updates a small subset of parameters (low-rank adapters).',
    use: 'Cost-efficient adaptation of large models. Many enterprises use LoRA adapters on open-source models (Llama, Mistral).',
    platforms: 'Hugging Face PEFT library, Axolotl, LLaMA Factory.',
  },
];

const PRODUCTION_RISKS = [
  { risk: 'Training–serving skew',    detail: 'The retrieval or input data at inference time differs from what the model was trained/fine-tuned on. Manifests as silent performance degradation.', mitigation: 'Feature stores, consistent preprocessing pipelines, schema validation at serving time.' },
  { risk: 'Context window overflow',  detail: 'Too many retrieved chunks overfill the model\'s context window, causing truncation or performance degradation.',                                       mitigation: 'Chunk size optimisation, reranker models (Cohere Rerank, BGE-Reranker) to select top k before injection.' },
  { risk: 'Retrieval hallucination',  detail: 'The retrieval step returns irrelevant chunks, and the model generates a confident answer based on wrong context.',                                     mitigation: 'Hybrid search (keyword + semantic), metadata filtering, retrieval confidence thresholds, citation verification.' },
  { risk: 'Corpus staleness',         detail: 'The indexed knowledge base diverges from the current state of source documents. Users get answers based on outdated information.',                   mitigation: 'Continuous ingestion pipelines with incremental reindexing on document change events.' },
  { risk: 'Latency at scale',         detail: 'RAG adds a retrieval round-trip on top of LLM generation latency. At high request volumes, this compounds.',                                         mitigation: 'Caching frequent queries, approximate nearest neighbour (ANN) indexes, asynchronous retrieval.' },
];

export default function EntDevFoundationRAG() {
  return (
    <PageWrapper
      badge="Enterprise AI Development · Page 25"
      title="Foundation Models & Enterprise RAG"
      subtitle="The three strategies for integrating foundation model intelligence into enterprise systems — and a technical deep-dive into RAG, the pattern most enterprises deploy first."
      sections={SECTIONS}
    >
      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The Three Integration Strategies</h2>
        <p className="text-slate-500 text-sm mb-6">Most enterprises use all three approaches across different use cases. The choice is not permanent — RAG applications often evolve to include fine-tuning as usage patterns emerge.</p>
        <div className="space-y-4">
          {INTEGRATION_STRATEGIES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.strategy} className={`card border-l-4 ${s.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`p-2.5 rounded-xl ${s.iconBg} flex-shrink-0`}>
                    <Icon size={18} className={s.iconColor} />
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">{s.strategy}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-2">
                    <p><span className="font-semibold text-slate-700">When to use:</span> <span className="text-slate-500">{s.when}</span></p>
                    <p><span className="font-semibold text-slate-700">How it works:</span> <span className="text-slate-500">{s.how}</span></p>
                    <p><span className="font-semibold text-slate-700">Examples:</span> <span className="text-slate-500">{s.examples}</span></p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-semibold text-slate-700">Cost:</span> <span className="text-slate-500">{s.cost}</span></p>
                    <p><span className="font-semibold text-slate-700">Customisation:</span> <span className="text-slate-500">{s.customisation}</span></p>
                    <p><span className="font-semibold text-amber-700">Limits:</span> <span className="text-slate-500">{s.limits}</span></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">The F5 AI Factory Building Blocks</h2>
        <p className="text-slate-500 text-sm mb-2">
          F5's AI factory reference architecture identifies seven distinct workload types that together constitute the complete enterprise AI system. Each building block has different infrastructure, data, and operational requirements.
        </p>
        <p className="text-xs text-slate-400 mb-6">Source: F5 AI Reference Architecture, 2024–25</p>
        <div className="space-y-2">
          {AI_FACTORY_BLOCKS.map((b, i) => (
            <div key={b.block} className="card py-3 px-4">
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${b.color}`}>{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-800 text-sm">{b.block}</p>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{b.layer}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-slate-50 border-slate-200 mt-4 text-sm">
          <p className="font-semibold text-slate-800 mb-1">The feedback loop</p>
          <p className="text-slate-600 text-xs leading-relaxed">Production inference outputs feed back into fine-tuning pipelines. Errors flagged by users become training examples. This continuous loop — deploy → observe → label → retrain — is what distinguishes an AI factory from a one-off model project.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">RAG: Architecture & Pipeline</h2>
        <p className="text-slate-500 text-sm mb-6">RAG operates in two distinct phases. The offline corpus preparation phase determines the quality ceiling of everything that follows at runtime.</p>
        <div className="space-y-6">
          {RAG_PHASES.map((phase) => (
            <div key={phase.phase} className={`card border-2 ${phase.color} ${phase.bg}`}>
              <p className="font-bold text-slate-800 mb-4 text-sm">{phase.phase}</p>
              <div className="space-y-3">
                {phase.steps.map((s, i) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">{i + 1}</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 mb-0.5">{s.step}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-blue-900 text-white border-0 mt-4">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Key distinction (F5 framework)</p>
          <p className="text-sm text-slate-200 leading-relaxed"><strong className="text-white">RAG Corpus Management</strong> (building block 3) covers offline data preparation — chunking, embedding, indexing — done in batch before any user query arrives. <strong className="text-white">External Services Integration</strong> (building block 6) covers live, real-time API calls during inference for agentic workflows. These have entirely different infrastructure and latency requirements.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Fine-Tuning: When & How</h2>
        <p className="text-slate-500 text-sm mb-6">Fine-tuning is often over-estimated as a starting point and under-used when RAG alone cannot meet the requirement. The decision is driven by data availability and the nature of the gap.</p>
        <div className="space-y-4">
          {FINE_TUNING_TYPES.map(f => (
            <div key={f.type} className="card">
              <p className="font-bold text-slate-800 text-sm mb-3">{f.type}</p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-2">
                  <p><span className="font-semibold text-slate-700">When to use:</span> <span className="text-slate-500">{f.when}</span></p>
                  <p><span className="font-semibold text-slate-700">Data requirement:</span> <span className="text-slate-500">{f.data}</span></p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold text-slate-700">Best for:</span> <span className="text-slate-500">{f.use}</span></p>
                  <p><span className="font-semibold text-blue-700">Platforms:</span> <span className="text-slate-500">{f.platforms}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-amber-50 border-amber-200 mt-4 text-sm">
          <p className="font-semibold text-amber-800 mb-1">The RAG-first principle</p>
          <p className="text-amber-700">Start with RAG before fine-tuning. RAG can be built in days; fine-tuning requires weeks. If RAG meets the quality bar, fine-tuning investment is rarely justified for knowledge grounding tasks. Fine-tuning adds value when the problem is style, format, or reasoning patterns — not knowledge.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Production Considerations</h2>
        <p className="text-slate-500 text-sm mb-6">RAG and fine-tuned systems in production introduce failure modes that prototyping does not surface. Each requires specific mitigations before enterprise-scale deployment.</p>
        <div className="space-y-3">
          {PRODUCTION_RISKS.map(r => (
            <div key={r.risk} className="card">
              <p className="text-sm font-semibold text-slate-800 mb-1">{r.risk}</p>
              <p className="text-xs text-slate-500 mb-2">{r.detail}</p>
              <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-1.5"><strong>Mitigation:</strong> {r.mitigation}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
