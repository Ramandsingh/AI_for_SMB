import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Training vs Inference',        level: 2 },
  { id: 's2', title: 'How LLMs Generate Text',       level: 2 },
  { id: 's3', title: 'Embeddings & Vector Search',   level: 2 },
  { id: 's4', title: 'RAG: Connecting AI to Your Data', level: 2 },
  { id: 's5', title: 'Fine-tuning vs Prompting',     level: 2 },
  { id: 's6', title: 'What Compute Powers AI',       level: 2 },
];

const TRAINING_STEPS = [
  { step: '1', title: 'Data Collection', desc: 'Massive datasets are assembled — for an LLM, this means most of the public internet, books, code, and scientific literature. GPT-4 is estimated to have trained on ~1 trillion words.' },
  { step: '2', title: 'Tokenisation', desc: 'Text is broken into "tokens" — roughly word fragments. "dashboard" might become ["dash", "board"]. The model operates on tokens, not characters or full words.' },
  { step: '3', title: 'Neural Network Training', desc: 'A network of billions of parameters (numerical weights) is adjusted to predict the next token in sequences. This runs on thousands of GPUs for months. GPT-4 training is estimated at $100M+.' },
  { step: '4', title: 'RLHF: Human Feedback', desc: 'Human raters compare model outputs and rank them. The model learns to prefer outputs humans rated more helpful, honest, and harmless. This step makes LLMs usable.' },
  { step: '5', title: 'Safety & Alignment', desc: 'Additional training filters harmful outputs, adds refusal behaviour, and aligns the model with usage policies. This is where different models diverge significantly in character.' },
];

const INFERENCE_CONCEPTS = [
  { concept: 'Context Window', desc: 'The maximum amount of text an LLM can "see" at once — its working memory. GPT-4: 128K tokens (~100K words). Claude 3: 200K tokens. Larger context = longer documents in a single pass.' },
  { concept: 'Temperature', desc: 'Controls randomness in output. Temperature = 0 produces deterministic, consistent answers. Temperature = 1 produces more creative, varied responses. Most production deployments use 0.1–0.3.' },
  { concept: 'Tokens', desc: 'The unit of measurement for LLM input and output. API pricing is per-token. 1,000 tokens ≈ 750 words. An average email is 200–400 tokens; a full contract might be 5,000–50,000 tokens.' },
  { concept: 'Latency', desc: 'The delay between sending a prompt and receiving output. Typically 1–10 seconds for a standard query. Faster models (like Claude Haiku or GPT-4o Mini) trade some accuracy for lower latency.' },
];

const EMBEDDING_STEPS = [
  { step: 'Step 1', title: 'Text → Numbers', desc: 'Any text — a sentence, paragraph, or document — is converted into a vector: a list of hundreds or thousands of numbers representing its meaning in multi-dimensional space.' },
  { step: 'Step 2', title: 'Semantic Similarity', desc: '"Invoice payment due date" and "when does the bill need to be paid?" produce similar vectors even though they share no words. This is the power of embeddings — meaning, not keywords.' },
  { step: 'Step 3', title: 'Vector Database', desc: 'Millions of embedded documents are stored in a vector database (Pinecone, Weaviate, pgvector). Queries retrieve the most semantically similar chunks in milliseconds.' },
  { step: 'Step 4', title: 'Answer Generation', desc: 'The retrieved chunks are passed to an LLM with the user\'s question. The LLM answers from the retrieved context — not from its general training data.' },
];

const RAG_BENEFITS = [
  { benefit: 'Your data, not just training data', desc: 'The LLM answers from your documents, policies, and records — not generic internet knowledge.' },
  { benefit: 'Up-to-date information', desc: 'LLMs have a training cutoff date. RAG retrieves live documents — no knowledge staleness.' },
  { benefit: 'Verifiable sources', desc: 'RAG systems can cite the source document for every answer — critical for compliance and audit.' },
  { benefit: 'No model retraining required', desc: 'Add new documents to the vector database. The LLM automatically has access without expensive retraining.' },
];

const COMPARE = [
  {
    method: 'Prompt Engineering',
    icon: '✏️',
    cost: 'Free',
    speed: 'Immediate',
    when: 'You want to change how the model responds — its tone, format, focus, or persona. The model\'s knowledge does not change.',
    example: '"You are a professional financial analyst. Summarise the following document in three bullet points, focusing on risk."',
    limit: 'Limited by the model\'s existing knowledge. Cannot teach the model new facts.',
  },
  {
    method: 'RAG (Retrieval-Augmented Generation)',
    icon: '🔍',
    cost: 'Low–Medium',
    speed: '1–4 weeks to implement',
    when: 'You want the model to answer from your specific documents, databases, or policies. No change to the model itself.',
    example: 'A customer service bot that answers questions from your product manuals and support docs.',
    limit: 'Quality depends on retrieval quality. Works poorly for tasks requiring deep reasoning across many documents simultaneously.',
  },
  {
    method: 'Fine-tuning',
    icon: '🔧',
    cost: 'High',
    speed: '4–12 weeks',
    when: 'You need the model to behave differently (adopt a specific communication style, domain expertise, or output format) across all interactions.',
    example: 'Training a model on 5,000 examples of your company\'s proposal writing style so it always writes like your best proposal writer.',
    limit: 'Expensive. Risk of "catastrophic forgetting" — model can lose general capability when overfitted to narrow domain.',
  },
];

const COMPUTE = [
  { component: 'GPU (Graphics Processing Unit)', role: 'The primary compute for AI training and inference. Originally designed for graphics, ideal for the matrix maths AI requires. NVIDIA dominates — their H100 chip is the most sought-after AI hardware.', examples: 'NVIDIA H100, A100, consumer RTX series' },
  { component: 'TPU (Tensor Processing Unit)', role: 'Google\'s custom chip, optimised specifically for AI workloads. Powers Google\'s models and is available via Google Cloud.', examples: 'Google TPU v4, v5' },
  { component: 'Cloud AI Services', role: 'For most businesses, compute means API calls to cloud providers — Azure OpenAI, AWS Bedrock, Google Vertex. You pay per token; the hardware is invisible.', examples: 'Azure OpenAI, AWS Bedrock, Google Vertex AI' },
  { component: 'Edge AI', role: 'Running AI models locally on devices (phones, laptops, industrial machines) without a cloud connection. Used where latency, privacy, or connectivity matters.', examples: 'Apple Neural Engine, Qualcomm AI chips, on-device LLMs (Llama, Phi-3)' },
];

export default function TechHowWork() {
  return (
    <PageWrapper
      badge="Page 19 — Technology of AI"
      title="How AI Works"
      subtitle="The technical mechanics of modern AI — training, inference, language generation, retrieval, and compute — explained for business leaders who need to make informed decisions without a CS degree."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Training vs Inference</h2>
        <p className="text-slate-500 text-sm mb-4">AI has two distinct phases. <strong>Training</strong> is how the model learns — expensive, done once. <strong>Inference</strong> is how the model is used — fast, done billions of times per day.</p>
        <h3 className="font-bold text-slate-700 mb-3">How Training Works</h3>
        <div className="space-y-3 mb-6">
          {TRAINING_STEPS.map((s) => (
            <div key={s.step} className="card flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{s.step}</span>
              <div>
                <p className="font-semibold text-slate-800 mb-1">{s.title}</p>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-slate-700 mb-3">Key Inference Concepts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INFERENCE_CONCEPTS.map((c) => (
            <div key={c.concept} className="card bg-slate-50">
              <p className="font-bold text-slate-800 text-sm mb-1">{c.concept}</p>
              <p className="text-xs text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">How LLMs Generate Text</h2>
        <p className="text-slate-500 text-sm mb-4">The mechanism is deceptively simple. Understanding it explains both LLMs' capabilities and their limitations.</p>
        <div className="space-y-4">
          {[
            { step: '1', title: 'You write a prompt', desc: 'Your text is tokenised and fed into the model. Every token is converted to a vector (a list of numbers representing its meaning in context).' },
            { step: '2', title: 'Attention: understanding context', desc: 'The Transformer\'s core mechanism — "attention" — allows every token to look at every other token and understand its relationship. This is what allows LLMs to understand "it" refers to "the contract" three paragraphs earlier.' },
            { step: '3', title: 'Next token prediction', desc: 'The model calculates a probability distribution over all possible next tokens (50,000+ options). The highest-probability token is selected. This repeats for every word in the output.' },
            { step: '4', title: 'Output assembled', desc: 'Tokens are converted back to text and streamed to you. The entire response is generated one token at a time — which is why you see text appearing word-by-word in most interfaces.' },
          ].map((s) => (
            <div key={s.step} className="card flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center flex-shrink-0">{s.step}</span>
              <div>
                <p className="font-semibold text-slate-800 mb-1">{s.title}</p>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-amber-50 border-amber-200 mt-4 text-sm text-amber-800">
          <strong>Why this explains hallucination:</strong> LLMs generate the most statistically probable next token — not the most factually correct one. When the correct answer is rare in training data, the model may confidently generate a plausible-sounding but incorrect answer. This is why human review of AI outputs remains essential.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Embeddings & Vector Search</h2>
        <p className="text-slate-500 text-sm mb-4">Embeddings convert language into numbers — enabling AI to understand meaning rather than just match keywords. This is the technology behind semantic search and the "connect AI to your documents" use case.</p>
        <div className="space-y-3">
          {EMBEDDING_STEPS.map((s) => (
            <div key={s.step} className="card flex items-start gap-3">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex-shrink-0">{s.step}</span>
              <div>
                <p className="font-semibold text-slate-800 mb-1">{s.title}</p>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">RAG: Connecting AI to Your Data</h2>
        <p className="text-slate-500 text-sm mb-4">Retrieval-Augmented Generation (RAG) is how enterprises make LLMs work from their own knowledge bases, documents, and databases — without retraining the model.</p>
        <div className="card bg-blue-50 border-blue-200 mb-5 text-sm text-blue-800">
          <strong>The RAG architecture:</strong> User question → retrieve relevant document chunks from vector database → pass chunks + question to LLM → LLM answers from retrieved context, not from general training.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RAG_BENEFITS.map((b) => (
            <div key={b.benefit} className="card">
              <p className="font-bold text-slate-800 text-sm mb-1">✓ {b.benefit}</p>
              <p className="text-xs text-slate-500">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Fine-tuning vs Prompting</h2>
        <p className="text-slate-500 text-sm mb-4">Three ways to customise AI behaviour — with very different costs, timelines, and tradeoffs.</p>
        <div className="space-y-4">
          {COMPARE.map((c) => (
            <div key={c.method} className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{c.icon}</span>
                <h3 className="font-bold text-slate-800">{c.method}</h3>
                <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{c.cost}</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{c.speed}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2"><strong>When to use:</strong> {c.when}</p>
              <p className="text-xs text-slate-500 bg-slate-50 rounded px-2 py-1.5 mb-2"><strong>Example:</strong> {c.example}</p>
              <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1.5"><strong>Limitation:</strong> {c.limit}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-4">What Compute Powers AI</h2>
        <p className="text-slate-500 text-sm mb-4">For most business AI deployments, compute is invisible — you pay per API call. But understanding the layers helps when making build vs buy vs self-host decisions.</p>
        <div className="space-y-3">
          {COMPUTE.map((c) => (
            <div key={c.component} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.component}</h3>
              <p className="text-sm text-slate-500 mb-2">{c.role}</p>
              <p className="text-xs text-slate-400"><strong>Examples:</strong> {c.examples}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
