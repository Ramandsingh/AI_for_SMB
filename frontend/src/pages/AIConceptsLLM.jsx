import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Tokenisation',            level: 2 },
  { id: 's2', title: 'Embeddings',              level: 2 },
  { id: 's3', title: 'Context Window',          level: 2 },
  { id: 's4', title: 'Temperature & Sampling',  level: 2 },
  { id: 's5', title: 'How LLMs Actually Work',  level: 2 },
  { id: 's6', title: 'Karpathy Reference',      level: 2 },
];

const TOKEN_EXAMPLES = [
  { text: '"Hello, world!"', tokens: 4, note: 'Common words split at punctuation' },
  { text: '"ChatGPT"', tokens: 3, note: 'Uncommon compound words split more' },
  { text: '"Tokenisation"', tokens: 4, note: 'British spellings may differ from American' },
  { text: '"I"', tokens: 1, note: 'Single common letters/words = 1 token' },
  { text: '"1234567890"', tokens: 7, note: 'Numbers tokenise unpredictably — often 1 digit each' },
  { text: '"🤖"', tokens: 3, note: 'Emoji use multiple tokens due to UTF-8 encoding' },
];

const EMBEDDING_CONCEPTS = [
  { concept: 'Vector representation', desc: 'Every word, sentence, or document is converted to a list of numbers (typically 768–3072 dimensions). Similar meanings produce numerically similar vectors.' },
  { concept: 'Semantic similarity', desc: 'Cosine similarity between vectors measures semantic closeness. "King" and "Queen" have similar vectors. "King" and "Bicycle" do not. This enables semantic search — find documents by meaning, not just keywords.' },
  { concept: 'Embedding models', desc: 'text-embedding-3-small (OpenAI), text-embedding-ada-002, voyage-3 (Voyage AI), Cohere Embed. These are separate from generation models — their job is encoding, not generating text.' },
  { concept: 'Use cases', desc: 'RAG (embed documents, retrieve by similarity), semantic search, recommendation, clustering, classification, duplicate detection.' },
];

const CONTEXT_FACTS = [
  { fact: '~750 words', tokens: '1,000 tokens', note: 'Rough conversion: 1K tokens ≈ 750 English words' },
  { fact: '1 page of text', tokens: '~500 tokens', note: 'Dense paragraphs with punctuation' },
  { fact: 'This planning document', tokens: '~4,000 tokens', note: 'Typical long document' },
  { fact: 'The entire Harry Potter series', tokens: '~500,000 tokens', note: 'Within Gemini/Claude 1M context' },
  { fact: 'Average codebase (50 files)', tokens: '~50,000–200,000 tokens', note: 'Within reach of modern context windows' },
];

const SAMPLING_PARAMS = [
  { param: 'Temperature', low: '0.0 — Deterministic. Always picks the most probable next token. Best for: code, structured data, factual Q&A.', high: '1.0–2.0 — Highly random. Creative, surprising, sometimes incoherent. Best for: creative writing, brainstorming.', sweet: '0.7 for most applications' },
  { param: 'Top-p (nucleus)', low: '0.1 — Only considers the top 10% probability mass. Very focused.', high: '0.95 — Allows wide vocabulary range. More varied outputs.', sweet: '0.95 (often left at default)' },
  { param: 'Top-k', low: '1 — Only the single most likely token (greedy decoding)', high: '100+ — Considers many alternatives at each step', sweet: 'Often not set; top-p is usually sufficient' },
  { param: 'Max tokens', low: 'Short responses (1–50) — good for classification labels', high: 'Long responses (4096+) — documents, analysis', sweet: 'Set based on expected output length' },
];

const HOW_LLM_STEPS = [
  { n: '1', title: 'Tokenise input', desc: 'Your prompt is split into tokens using a vocabulary of ~100K BPE token types. Each token maps to an integer ID.' },
  { n: '2', title: 'Embed tokens', desc: 'Token IDs are converted to high-dimensional vectors via an embedding table. Each token position also adds a positional encoding.' },
  { n: '3', title: 'Transformer layers', desc: 'The vectors pass through N transformer layers (e.g., 96 for GPT-4). Each layer has: self-attention (tokens attend to each other) + feed-forward network. This is where "reasoning" happens.' },
  { n: '4', title: 'Self-attention', desc: 'Each token computes Q (query), K (key), V (value) projections. Attention scores = softmax(QK^T / √d). Each token aggregates information from all other tokens weighted by relevance.' },
  { n: '5', title: 'Next token prediction', desc: 'The final layer outputs a probability distribution over all ~100K tokens. The model predicts: "given everything so far, what is the most likely next token?"' },
  { n: '6', title: 'Repeat', desc: 'The predicted token is appended to the context and the whole process repeats until the model outputs an end-of-sequence token or reaches max_tokens.' },
];

export default function AIConceptsLLM() {
  return (
    <PageWrapper
      badge="Page 39 — AI Model Concepts"
      title="How LLMs Work"
      subtitle="Tokenisation, embeddings, context windows, sampling parameters, and the mechanics of transformer-based language models — explained for practitioners."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Tokenisation</h2>
        <p className="text-slate-500 text-sm mb-4">LLMs don't process words or characters — they process <strong>tokens</strong>. A token is a chunk of text, typically 2–5 characters. Most models use Byte-Pair Encoding (BPE): frequent word fragments become single tokens; rare or long words are split into several.</p>
        <div className="card bg-violet-50 border-violet-200 text-violet-800 text-sm mb-5">
          <strong>Why it matters:</strong> You pay per token, not per word. Pricing, context limits, and generation speed all depend on token count. Code, JSON, and structured text use more tokens per character than plain prose.
        </div>
        <h3 className="font-bold text-slate-700 mb-3">Example token counts</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">Text</th>
                <th className="text-right pb-3 text-slate-600 font-semibold">Tokens</th>
                <th className="text-left pb-3 text-slate-600 font-semibold pl-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TOKEN_EXAMPLES.map((e) => (
                <tr key={e.text}>
                  <td className="py-2.5 font-mono text-slate-700">{e.text}</td>
                  <td className="py-2.5 text-right font-bold text-violet-600">{e.tokens}</td>
                  <td className="py-2.5 text-slate-400 pl-4">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card bg-slate-50 text-sm text-slate-600">
          <strong>BPE (Byte-Pair Encoding):</strong> Start with individual bytes. Iteratively merge the most frequent adjacent pair into a new token. Repeat until vocabulary size is reached (~100K tokens for GPT-4). Common English words become single tokens; rare words are split.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Embeddings</h2>
        <p className="text-slate-500 text-sm mb-4">Embeddings convert text into numerical vectors — coordinates in a high-dimensional space where semantically similar text is numerically close. They are the foundation of semantic search, RAG, and recommendation systems.</p>
        <div className="space-y-3">
          {EMBEDDING_CONCEPTS.map((c) => (
            <div key={c.concept} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.concept}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-slate-900 text-slate-300 text-xs font-mono">
          <p className="text-slate-400 mb-1"># Conceptual example: embedding similarity</p>
          <p>embed("I love dogs")   → [0.12, -0.34, 0.87, ...]</p>
          <p>embed("I adore dogs")  → [0.13, -0.32, 0.85, ...]  ← very close</p>
          <p>embed("stock market")  → [-0.82, 0.15, -0.44, ...] ← far away</p>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Context Window</h2>
        <p className="text-slate-500 text-sm mb-4">The context window is the maximum number of tokens an LLM can see at once — its working memory. Everything outside the window is invisible to the model.</p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">Real-world equivalent</th>
                <th className="text-right pb-3 text-slate-600 font-semibold">Token count</th>
                <th className="text-left pb-3 text-slate-600 font-semibold pl-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CONTEXT_FACTS.map((c) => (
                <tr key={c.fact}>
                  <td className="py-2.5 text-slate-700">{c.fact}</td>
                  <td className="py-2.5 text-right font-bold text-blue-600">{c.tokens}</td>
                  <td className="py-2.5 text-slate-400 pl-4">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { model: 'GPT-4o', ctx: '128K tokens', note: '~96K words' },
            { model: 'Claude Opus/Sonnet', ctx: '1M tokens', note: '~750K words' },
            { model: 'Gemini 2.5 Pro', ctx: '1M tokens', note: '~750K words' },
          ].map((m) => (
            <div key={m.model} className="card text-center bg-blue-50 border-blue-200">
              <p className="font-bold text-blue-800 text-sm">{m.model}</p>
              <p className="text-lg font-bold text-blue-600 my-1">{m.ctx}</p>
              <p className="text-xs text-blue-500">{m.note}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-amber-50 border-amber-200 text-amber-800 text-sm">
          <strong>Lost in the middle:</strong> Research shows LLMs perform best when relevant content is at the start or end of the context. Information buried in the middle of very long contexts is more likely to be ignored — even if it technically "fits" in the window.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Temperature & Sampling</h2>
        <p className="text-slate-500 text-sm mb-5">LLMs generate text probabilistically. Sampling parameters control <em>how</em> the model picks the next token from the probability distribution at each step.</p>
        <div className="space-y-4">
          {SAMPLING_PARAMS.map((s) => (
            <div key={s.param} className="card">
              <h3 className="font-bold text-slate-800 mb-2">{s.param}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="font-semibold text-blue-700 mb-1">Low value</p>
                  <p className="text-slate-600">{s.low}</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="font-semibold text-amber-700 mb-1">High value</p>
                  <p className="text-slate-600">{s.high}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="font-semibold text-emerald-700 mb-1">Recommended</p>
                  <p className="text-slate-600">{s.sweet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">How LLMs Actually Work</h2>
        <p className="text-slate-500 text-sm mb-5">A simplified walk-through of inference — what happens between sending a prompt and receiving the first token of output.</p>
        <div className="space-y-3">
          {HOW_LLM_STEPS.map((s) => (
            <div key={s.n} className="card flex gap-4 items-start">
              <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold text-sm flex items-center justify-center flex-shrink-0">{s.n}</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-slate-50 border-slate-200 text-sm text-slate-600">
          <strong>Scale:</strong> GPT-3 has 175B parameters. GPT-4 is estimated at ~1.8T parameters across a mixture-of-experts architecture. During inference, all these weights must fit in GPU memory (or be paged). This is why frontier models require hundreds of A100/H100 GPUs to serve at scale.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Karpathy Reference</h2>
        <p className="text-slate-500 text-sm mb-4">Andrej Karpathy (ex-Tesla AI Director, ex-OpenAI) has produced the most accessible deep-technical explanations of how LLMs work available publicly.</p>
        <div className="space-y-3">
          {[
            {
              title: '"Let\'s build GPT from scratch"',
              url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
              desc: '2-hour YouTube video implementing a GPT from scratch in ~200 lines of Python. Covers character-level language model → attention → transformer blocks. Essential viewing for anyone who wants to truly understand the architecture.',
            },
            {
              title: '"Intro to Large Language Models"',
              url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
              desc: '1-hour video covering: what LLMs are, how they\'re trained (pre-training + fine-tuning + RLHF), capabilities and limitations, and where the field is going. Excellent non-technical primer.',
            },
            {
              title: '"Let\'s build the GPT tokenizer"',
              url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
              desc: 'Deep dive into BPE tokenisation — implements the GPT-4 tokenizer from scratch. Explains why tokens are fundamental to model behaviour and limitations.',
            },
            {
              title: 'llm.c',
              url: 'https://github.com/karpathy/llm.c',
              desc: 'GPT-2 training and inference in ~1000 lines of pure C. Shows that LLMs are not magic — the core algorithm fits on a screen. CUDA and CPU implementations available.',
            },
          ].map((r) => (
            <div key={r.title} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{r.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{r.desc}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-700 hover:underline break-all"
              >
                {r.url} ↗
              </a>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
