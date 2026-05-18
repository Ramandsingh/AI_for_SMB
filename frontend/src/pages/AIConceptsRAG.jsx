import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'What is RAG',            level: 2 },
  { id: 's2', title: 'Vector Databases',        level: 2 },
  { id: 's3', title: 'Chunking Strategies',     level: 2 },
  { id: 's4', title: 'Hybrid Search',           level: 2 },
  { id: 's5', title: 'Memory Types',            level: 2 },
  { id: 's6', title: 'RAG Failure Modes',       level: 2 },
];

const RAG_STEPS = [
  { n: '1', title: 'Ingest', desc: 'Documents are split into chunks, converted to embeddings, and stored in a vector database. This is done once (or incrementally as new content arrives).', color: 'bg-blue-100 text-blue-700' },
  { n: '2', title: 'Retrieve', desc: 'At query time, the user\'s question is embedded. A vector similarity search returns the top-k most relevant chunks from the database.', color: 'bg-violet-100 text-violet-700' },
  { n: '3', title: 'Augment', desc: 'The retrieved chunks are injected into the LLM prompt as context — placed before or alongside the user\'s question in the system or human message.', color: 'bg-amber-100 text-amber-700' },
  { n: '4', title: 'Generate', desc: 'The LLM reads the question + retrieved context and generates an answer grounded in the retrieved content. With citations enabled, it can reference exact passages.', color: 'bg-emerald-100 text-emerald-700' },
];

const RAG_WHY = [
  { problem: 'Training data cutoff', rag: 'RAG can inject current information — no retraining needed.' },
  { problem: 'Hallucination on specifics', rag: 'Ground answers in actual source documents. Citations prove what was used.' },
  { problem: 'Private/proprietary data', rag: 'Your internal documents never leave your infrastructure. No fine-tuning required.' },
  { problem: 'Regulatory explainability', rag: 'Every answer can be traced to a source document and specific passage.' },
  { problem: 'Cost of fine-tuning', rag: 'RAG with a vector store is far cheaper than fine-tuning a model on each new document set.' },
];

const VECTOR_DBS = [
  {
    name: 'Pinecone',
    type: 'Managed cloud',
    best: 'Production RAG at scale',
    desc: 'Fully managed. No infrastructure to run. Strong performance and developer experience. Generous free tier (1 index, 100K vectors). Most popular for serverless applications.',
    pricing: 'Free tier available. Pay-as-you-go: ~$0.096/hour per pod',
  },
  {
    name: 'Weaviate',
    type: 'Cloud or self-host',
    best: 'Hybrid search + rich metadata',
    desc: 'Open-source. Supports both vector search and BM25 keyword search natively. Rich filtering. Can be self-hosted (Docker) or used as managed cloud service.',
    pricing: 'Free self-hosted. Cloud: ~$25/month starter',
  },
  {
    name: 'Chroma',
    type: 'Self-hosted / embedded',
    best: 'Development & prototyping',
    desc: 'Lightweight, easy to set up in Python. Runs embedded (in-process) for development. Can be deployed as a server. Default choice for LangChain/LlamaIndex tutorials.',
    pricing: 'Free, open-source',
  },
  {
    name: 'pgvector',
    type: 'PostgreSQL extension',
    best: 'Existing Postgres stack',
    desc: 'Add vector search to your existing PostgreSQL database. No new infrastructure. Approximate nearest-neighbour search via HNSW and IVFFlat indexes. Sufficient for most SMB use cases.',
    pricing: 'Free. Just add the extension to your Postgres.',
  },
  {
    name: 'Qdrant',
    type: 'Cloud or self-host',
    best: 'High performance + filtering',
    desc: 'Written in Rust for high throughput. Strong payload filtering — combine semantic search with structured filters (date range, category, etc.) in a single query.',
    pricing: 'Free self-hosted. Cloud: free tier available',
  },
];

const CHUNKING_STRATEGIES = [
  {
    strategy: 'Fixed-size',
    desc: 'Split at N tokens with M token overlap between chunks. Simple. Fast. Blind to semantic boundaries — can split a sentence mid-thought.',
    pros: 'Simple, fast, predictable',
    cons: 'Breaks semantic units; can split sentences',
    bestFor: 'First prototype, homogeneous text',
  },
  {
    strategy: 'Recursive character splitting',
    desc: 'Try to split on paragraph → sentence → word → character boundaries in order. Preferred approach in LangChain. Respects natural document structure.',
    pros: 'Respects semantic boundaries better than fixed',
    cons: 'Variable chunk sizes; harder to reason about',
    bestFor: 'General-purpose documents, articles',
  },
  {
    strategy: 'Semantic chunking',
    desc: 'Embed each sentence. Start a new chunk when cosine similarity between adjacent sentences drops below a threshold — indicates a topic shift.',
    pros: 'Chunks are semantically coherent',
    cons: 'Slower (requires embedding each sentence); chunk sizes vary widely',
    bestFor: 'Long reports, research papers with section jumps',
  },
  {
    strategy: 'Parent-document',
    desc: 'Index small chunks for retrieval, but return the full parent document (or larger chunk) to the LLM as context. Better precision in retrieval, better context in generation.',
    pros: 'Best of both worlds: precise retrieval + full context',
    cons: 'More complex implementation; parent storage overhead',
    bestFor: 'Long documents where both precision and coverage matter',
  },
];

const MEMORY_TYPES = [
  {
    type: 'In-context memory',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    what: 'The current conversation history — everything in the context window right now.',
    capacity: 'Limited by context window (128K–1M tokens)',
    persistence: 'Lost when session ends',
    best: 'Short conversations, within-session reference',
  },
  {
    type: 'External memory',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    what: 'A vector database or key-value store that persists across sessions. Retrieved via similarity search at query time.',
    capacity: 'Unlimited (scale horizontally)',
    persistence: 'Persists across sessions',
    best: 'Long-term user context, knowledge bases, conversation history',
  },
  {
    type: 'Parametric memory',
    color: 'text-violet-700 bg-violet-50 border-violet-200',
    what: 'Knowledge encoded into the model\'s weights during training. Cannot be selectively updated — requires fine-tuning or retraining.',
    capacity: 'Fixed by model architecture',
    persistence: 'Until model is retrained',
    best: 'General world knowledge, widely applicable skills',
  },
  {
    type: 'Cache / KV cache',
    color: 'text-slate-600 bg-slate-50 border-slate-200',
    what: 'GPU-level cache of attention key-value pairs for repeated prompt prefixes. Enables prompt caching in Claude/Gemini — re-use identical system prompts cheaply.',
    capacity: 'Limited by GPU memory',
    persistence: 'Minutes to hours (configurable)',
    best: 'Large system prompts reused across many requests',
  },
];

const RAG_FAILURES = [
  { failure: 'Retrieval recall failure', cause: 'The relevant chunk is not retrieved — wrong embedding model, chunk too small, query too different from document phrasing.', fix: 'Improve chunking; use hybrid search; query expansion; re-ranking.' },
  { failure: 'Context window overflow', cause: 'Too many chunks retrieved; each chunk is too large. Context fills up, model misses some content.', fix: 'Reduce chunk size; reduce top-k; use re-ranking to select best chunks only.' },
  { failure: 'Hallucination despite context', cause: 'Model ignores retrieved context and answers from parametric memory. More common when query doesn\'t match context well.', fix: 'Strengthen system prompt: "Only answer using the provided context. If not found, say so." Citations help enforce this.' },
  { failure: 'Stale index', cause: 'Documents updated but vector index not refreshed. Model answers from outdated chunks.', fix: 'Implement incremental indexing pipeline; add document update timestamps; periodically full re-index.' },
  { failure: 'Semantic mismatch', cause: 'User asks "what is our refund policy?" but docs contain "returns and exchanges procedure." Embedding similarity is low despite conceptual match.', fix: 'Keyword expansion; generate hypothetical answer then search (HyDE); multiple query variants.' },
];

export default function AIConceptsRAG() {
  return (
    <PageWrapper
      badge="Page 40 — AI Model Concepts"
      title="Retrieval & Memory"
      subtitle="Retrieval-Augmented Generation (RAG), vector databases, chunking strategies, hybrid search, and memory types — the foundation of knowledge-grounded AI applications."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">What is RAG</h2>
        <p className="text-slate-500 text-sm mb-5">Retrieval-Augmented Generation (RAG) solves LLMs' core limitation: they only know what was in their training data. RAG lets you ground any LLM in your own documents, databases, and live data — without fine-tuning.</p>
        <div className="space-y-3 mb-6">
          {RAG_STEPS.map((s) => (
            <div key={s.n} className="card flex gap-4 items-start">
              <div className={`w-7 h-7 rounded-full ${s.color} font-bold text-sm flex items-center justify-center flex-shrink-0`}>{s.n}</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-slate-700 mb-3">Why RAG instead of fine-tuning?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">Problem</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">How RAG helps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RAG_WHY.map((r) => (
                <tr key={r.problem}>
                  <td className="py-2.5 text-slate-700 pr-4">{r.problem}</td>
                  <td className="py-2.5 text-slate-500">{r.rag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Vector Databases</h2>
        <p className="text-slate-500 text-sm mb-4">Vector databases store embeddings and support fast approximate nearest-neighbour (ANN) search. Choose based on your scale, infrastructure constraints, and whether you need filtering or hybrid search.</p>
        <div className="space-y-4">
          {VECTOR_DBS.map((db) => (
            <div key={db.name} className="card">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-800">{db.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{db.type}</span>
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold">Best for: {db.best}</p>
                </div>
                <span className="text-xs text-slate-400 text-right flex-shrink-0">{db.pricing}</span>
              </div>
              <p className="text-sm text-slate-500">{db.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Chunking Strategies</h2>
        <p className="text-slate-500 text-sm mb-5">Chunking — splitting documents into pieces for embedding — is one of the most important and overlooked variables in RAG quality. Wrong chunk size causes retrieval failures more often than embedding model quality.</p>
        <div className="space-y-4">
          {CHUNKING_STRATEGIES.map((c) => (
            <div key={c.strategy} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.strategy}</h3>
              <p className="text-sm text-slate-500 mb-3">{c.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-emerald-50 rounded-lg px-3 py-2">
                  <p className="font-semibold text-emerald-700 mb-0.5">Pros</p>
                  <p className="text-slate-600">{c.pros}</p>
                </div>
                <div className="bg-red-50 rounded-lg px-3 py-2">
                  <p className="font-semibold text-red-600 mb-0.5">Cons</p>
                  <p className="text-slate-600">{c.cons}</p>
                </div>
                <div className="bg-blue-50 rounded-lg px-3 py-2">
                  <p className="font-semibold text-blue-700 mb-0.5">Best for</p>
                  <p className="text-slate-600">{c.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-amber-50 border-amber-200 text-amber-800 text-sm">
          <strong>Rule of thumb:</strong> Start with recursive character splitting at 1000 tokens with 200 token overlap. Evaluate retrieval quality empirically — then optimise chunk size for your specific documents and queries.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Hybrid Search</h2>
        <p className="text-slate-500 text-sm mb-4">Pure vector search fails when users search by exact keywords, product codes, or names — semantics alone isn't enough. Hybrid search combines vector similarity with keyword (BM25) scoring.</p>
        <div className="space-y-3">
          {[
            { title: 'BM25 (keyword search)', desc: 'Traditional term-frequency search. Exact matches score high. Fails on synonyms and paraphrase. Best for: product names, codes, IDs, boolean lookups.' },
            { title: 'Dense vector search', desc: 'Semantic similarity via embeddings. Handles synonyms, paraphrase, and concept matching. Fails on exact string matches. Best for: meaning-based queries.' },
            { title: 'Hybrid fusion (Reciprocal Rank Fusion)', desc: 'Merge ranked results from both methods. Each document\'s final score combines its keyword rank and semantic rank. Simple formula: 1/(k + rank_keyword) + 1/(k + rank_vector). Consistently outperforms either alone.' },
            { title: 'Re-ranking', desc: 'After initial retrieval (fast/approximate), run a cross-encoder model to re-score the top-k candidates against the query. Cross-encoders attend to query AND document together — far more accurate than bi-encoder similarity alone. Cohere Rerank, BGE-Reranker, Jina Reranker are popular options.' },
          ].map((c) => (
            <div key={c.title} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.title}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Memory Types</h2>
        <p className="text-slate-500 text-sm mb-5">LLM-based systems have three distinct types of memory. Understanding which type to use for each purpose is essential for building reliable agents and applications.</p>
        <div className="space-y-3">
          {MEMORY_TYPES.map((m) => (
            <div key={m.type} className={`card border ${m.color}`}>
              <h3 className="font-bold mb-2">{m.type}</h3>
              <p className="text-sm mb-3">{m.what}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="font-semibold opacity-70 mb-0.5">Capacity</p>
                  <p>{m.capacity}</p>
                </div>
                <div>
                  <p className="font-semibold opacity-70 mb-0.5">Persistence</p>
                  <p>{m.persistence}</p>
                </div>
                <div>
                  <p className="font-semibold opacity-70 mb-0.5">Best for</p>
                  <p>{m.best}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">RAG Failure Modes</h2>
        <p className="text-slate-500 text-sm mb-4">RAG systems fail in predictable ways. Understanding the failure modes before deployment helps design robust pipelines from the start.</p>
        <div className="space-y-3">
          {RAG_FAILURES.map((f) => (
            <div key={f.failure} className="card">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.failure}</h3>
                  <p className="text-xs text-slate-500 mb-1"><strong>Cause:</strong> {f.cause}</p>
                  <p className="text-xs text-emerald-700"><strong>Fix:</strong> {f.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
