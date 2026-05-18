import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Gemini Model Family',       level: 2 },
  { id: 's2', title: 'Gemma (Open Weights)',       level: 2 },
  { id: 's3', title: 'NotebookLM',                 level: 2 },
  { id: 's4', title: 'Google AI Studio & API',     level: 2 },
  { id: 's5', title: 'Vertex AI',                  level: 2 },
  { id: 's6', title: 'DeepMind Research',          level: 2 },
];

const GEMINI_MODELS = [
  {
    name: 'Gemini 2.5 Pro',
    tag: 'Most capable',
    color: 'bg-blue-500',
    ctx: '1M tokens',
    desc: 'Google\'s most capable model. Excels at coding, maths, and reasoning. Experimental "thinking" mode for complex tasks. Best for agentic and research applications.',
    highlights: ['Best in class on HumanEval coding benchmarks (2025)', 'Deep Think mode for multi-step reasoning', 'Natively multimodal: text, images, audio, video, code'],
  },
  {
    name: 'Gemini 2.0 Flash',
    tag: 'Fast & affordable',
    color: 'bg-emerald-500',
    ctx: '1M tokens',
    desc: 'Optimised for speed and cost. Ideal for high-volume production applications. Supports real-time streaming and tool use. 2× faster than Gemini 1.5 Flash.',
    highlights: ['Sub-second first token latency', 'Native tool use + function calling', 'Live API for real-time multimodal interaction'],
  },
  {
    name: 'Gemini 2.0 Flash Thinking',
    tag: 'Reasoning',
    color: 'bg-purple-500',
    ctx: '32K tokens',
    desc: 'A version of Flash with explicit chain-of-thought reasoning. Surfaces its thinking process. Good for maths, science, and structured analysis tasks.',
    highlights: ['Shows reasoning steps in output', 'Better accuracy on STEM tasks', 'Free experimental tier via AI Studio'],
  },
];

const GEMMA_VARIANTS = [
  { name: 'Gemma 2', size: '2B, 9B, 27B', desc: 'Google\'s open-weights models. State-of-the-art at their size classes. Runs on a single GPU (9B on A100) or CPU (2B). MIT-licensed for commercial use.' },
  { name: 'CodeGemma', size: '2B, 7B', desc: 'Fine-tuned on code. Supports Python, JavaScript, Java, Kotlin, C++, and more. Designed for code completion in IDEs.' },
  { name: 'PaliGemma', size: '3B', desc: 'Vision-language model. Processes images and text together. Fine-tune on your own image-captioning or visual QA datasets.' },
  { name: 'RecurrentGemma', size: '2B', desc: 'Uses recurrent architecture instead of pure attention. More efficient for long sequences. Research-focused.' },
];

const NOTEBOOKLM_FEATURES = [
  { f: 'Source-grounded answers', d: 'All responses cite specific passages from your uploaded documents. No hallucination from general training data — only what\'s in your sources.' },
  { f: 'Multi-source synthesis', d: 'Upload up to 50 sources: PDFs, Google Docs, YouTube videos, web pages. Ask questions that draw across all of them.' },
  { f: 'Audio Overview', d: 'Generates a realistic podcast-style audio discussion of your sources. Two AI voices discuss the material conversationally.' },
  { f: 'Study guide generation', d: 'Automatically creates summaries, FAQs, and briefing docs from your uploaded materials.' },
  { f: 'Enterprise version', d: 'NotebookLM Plus: team sharing, higher limits, Workspace integration, admin controls. Available via Google One AI Premium.' },
];

const VERTEX_FEATURES = [
  { f: 'Model Garden', d: 'Access Gemini, Imagen, and 130+ open-source models (Llama, Mistral, etc.) from a single API. Enterprise SLAs, VPC, and data residency controls.' },
  { f: 'Vertex AI Search', d: 'Managed RAG service. Ingest documents, PDFs, web pages. Returns citations-grounded answers via Gemini. Enterprise search over internal knowledge bases.' },
  { f: 'Grounding with Google Search', d: 'Gemini API and Vertex can be given access to live Google Search results. Dramatically reduces hallucinations on current events and recent facts.' },
  { f: 'Agent Builder', d: 'No-code / low-code agent creation. Visual workflow builder. Connect to Workspace, BigQuery, and external APIs. Tool: Dialogflow CX integration.' },
  { f: 'MLOps', d: 'Pipelines, model registry, batch prediction, feature store, monitoring. Full lifecycle management for custom models alongside Gemini.' },
];

const DEEPMIND_AREAS = [
  { area: 'AlphaFold', desc: 'Solved the protein structure prediction problem (2020). AlphaFold 3 extended to DNA, RNA, and small molecules. Open database of 200M+ predicted structures.' },
  { area: 'Gemini development', desc: 'DeepMind researchers led the technical development of the Gemini model family, building on research lineages including PaLM, Chinchilla, and Flamingo.' },
  { area: 'AlphaCode', desc: 'Competition-level code generation. Predecessor to Gemini\'s coding capabilities. Placed in the top 50th percentile of competitive programmers (2022).' },
  { area: 'Reinforcement learning', desc: 'AlphaGo, AlphaZero, MuZero — mastered chess, shogi, Go, and Atari games. RL research now feeds into reasoning model training.' },
  { area: 'Lyria / MusicLM', desc: 'High-fidelity music generation. Creates music from text prompts or audio conditioning. Available via YouTube Dream Track in limited rollout.' },
  { area: 'Safety research', desc: 'Scalable oversight, interpretability (mechanistic interp via Transformer Circuits), and AI evaluation are active research areas alongside Anthropic and OpenAI.' },
];

export default function AILabsGoogle() {
  return (
    <PageWrapper
      badge="Page 37 — Top AI Labs"
      title="Google DeepMind"
      subtitle="Gemini models, Gemma open weights, NotebookLM, Vertex AI enterprise platform, and DeepMind's research contributions to AI."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Gemini Model Family</h2>
        <p className="text-slate-500 text-sm mb-5">Gemini is Google's flagship multimodal model family, available via the Gemini API (consumer + developer) and Vertex AI (enterprise). Key differentiator: 1M token context window — one of the largest available.</p>
        <div className="space-y-4">
          {GEMINI_MODELS.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${m.color} flex-shrink-0 mt-1.5`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{m.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{m.tag}</span>
                    <span className="text-xs text-slate-400 ml-auto">{m.ctx}</span>
                  </div>
                  <p className="text-sm text-slate-500">{m.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {m.highlights.map((h) => (
                  <div key={h} className="bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-600">
                    {h}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-blue-50 border-blue-200 text-blue-800 text-sm">
          <strong>Pricing note:</strong> Gemini 2.0 Flash is available free via Google AI Studio up to generous rate limits. Gemini 2.5 Pro is paid: ~$1.25/$5 per 1M in/out tokens (≤200K context). Google AI Studio has no waitlist for most regions.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Gemma (Open Weights)</h2>
        <p className="text-slate-500 text-sm mb-4">Gemma is Google's family of open-weight models. Unlike Gemini (API only), Gemma weights are downloadable for local inference, fine-tuning, and self-hosted deployment.</p>
        <div className="space-y-3">
          {GEMMA_VARIANTS.map((g) => (
            <div key={g.name} className="card">
              <div className="flex items-start gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-800">{g.name}</h3>
                    <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{g.size} params</span>
                  </div>
                  <p className="text-sm text-slate-500">{g.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-amber-50 border-amber-200 text-amber-800 text-sm">
          <strong>Download from:</strong> Hugging Face (<code>google/gemma-2-9b-it</code>) or Kaggle. Runs on Ollama locally. Quantized versions (GGUF) available for CPU inference.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">NotebookLM</h2>
        <p className="text-slate-500 text-sm mb-4">NotebookLM is Google's AI research assistant. Upload your own documents and it becomes an expert on them — answering questions, writing summaries, and creating audio content from your sources.</p>
        <div className="space-y-3">
          {NOTEBOOKLM_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-emerald-50 border-emerald-200 text-emerald-800 text-sm">
          <strong>SMB use case:</strong> Upload competitor reports, policy documents, lengthy contracts, or industry research. Ask questions across the whole corpus. The Audio Overview feature converts dry reports into consumable podcast summaries.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Google AI Studio & API</h2>
        <p className="text-slate-500 text-sm mb-4">Google AI Studio is the developer-facing interface for the Gemini API. No credit card required to start. Generous free tier for prototyping.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Playground', desc: 'Test Gemini models directly in browser. Tune system instructions, temperature, safety settings. Export to code in Python, JS, or REST.' },
            { title: 'Structured output', desc: 'Built-in JSON mode. Define a response schema and Gemini returns valid JSON every time. No parsing failures.' },
            { title: 'File API', desc: 'Upload images, audio, video, and documents (up to 2GB). Files stored for 48 hours and referenceable in prompts.' },
            { title: 'Google Search grounding', desc: 'One-line integration to give Gemini access to live web search. Dramatically reduces hallucinations on current facts.' },
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
        <h2 className="mb-2">Vertex AI</h2>
        <p className="text-slate-500 text-sm mb-4">Vertex AI is Google Cloud's enterprise AI platform — providing access to Gemini and other models with enterprise-grade security, compliance, and MLOps tooling.</p>
        <div className="space-y-3">
          {VERTEX_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-slate-50 border-slate-200 text-sm text-slate-600">
          <strong>When to choose Vertex AI over direct Gemini API:</strong> When you need data residency controls, VPC Service Controls, existing Google Cloud infrastructure, enterprise SLAs, or access to non-Google models (Llama, Mistral) alongside Gemini.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">DeepMind Research</h2>
        <p className="text-slate-500 text-sm mb-4">DeepMind (merged with Google Brain in 2023 as Google DeepMind) drives Alphabet's fundamental AI research. Several DeepMind breakthroughs have had industry-wide impact.</p>
        <div className="space-y-3">
          {DEEPMIND_AREAS.map((a) => (
            <div key={a.area} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{a.area}</h3>
              <p className="text-sm text-slate-500">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
