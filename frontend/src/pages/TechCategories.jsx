import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Large Language Models (LLMs)',       level: 2 },
  { id: 's2', title: 'Computer Vision',                    level: 2 },
  { id: 's3', title: 'Predictive & Analytical AI',         level: 2 },
  { id: 's4', title: 'Speech & Audio AI',                  level: 2 },
  { id: 's5', title: 'Agentic AI',                         level: 2 },
  { id: 's6', title: 'Choosing the Right Category',        level: 2 },
];

const LLMS = [
  { name: 'Claude (Anthropic)', icon: '🟠', strength: 'Long-document analysis, nuanced reasoning, safety-focused, enterprise compliance', bestFor: 'Legal, finance, complex document work, high-stakes outputs' },
  { name: 'GPT-4o (OpenAI)', icon: '🟢', strength: 'Multimodal (text + image + audio), broad capability, large plugin ecosystem', bestFor: 'General enterprise productivity, content creation, code generation' },
  { name: 'Gemini (Google)', icon: '🔵', strength: 'Google Workspace integration, search grounding, multimodal, long context', bestFor: 'Organisations deeply in Google ecosystem, research, large document sets' },
  { name: 'Llama 3 (Meta)', icon: '⚫', strength: 'Open source, can be self-hosted, no per-token cost at scale', bestFor: 'Organisations with sensitive data needing on-premise deployment' },
  { name: 'Mistral', icon: '🟣', strength: 'European, GDPR-native, efficient models for lower-cost inference', bestFor: 'European compliance, cost-sensitive deployments, multilingual work' },
];

const CV_USES = [
  { use: 'Quality Control', desc: 'Detect defects on production lines faster and more consistently than human inspection', icon: '🔍' },
  { use: 'Document OCR', desc: 'Convert scanned PDFs, handwritten forms, and images into structured, searchable data', icon: '📄' },
  { use: 'Retail Analytics', desc: 'Track shelf compliance, customer movement, and queue lengths without manual observation', icon: '🛒' },
  { use: 'Security & Access', desc: 'Facial recognition for identity verification in secure facilities', icon: '🔐' },
  { use: 'Construction Monitoring', desc: 'Detect safety violations (missing PPE, restricted zone entry) from camera feeds', icon: '🏗️' },
  { use: 'Medical Imaging', desc: 'Assist radiologists by flagging anomalies in X-rays, MRIs, and scans', icon: '🩻' },
];

const PREDICTIVE = [
  { type: 'Forecasting', examples: 'Demand, revenue, staffing, inventory, churn, cash flow', how: 'Learns historical patterns and projects them forward, incorporating external signals (seasonality, economy, events)' },
  { type: 'Classification', examples: 'Spam detection, fraud flagging, lead scoring, sentiment categorisation', how: 'Assigns inputs to predefined categories based on learned patterns' },
  { type: 'Anomaly Detection', examples: 'Fraud, network intrusions, manufacturing defects, financial irregularities', how: 'Identifies deviations from established normal patterns — even subtle ones' },
  { type: 'Recommendation', examples: 'Product recommendations, content personalisation, internal mobility matching', how: 'Identifies what users are likely to want based on behaviour patterns of similar users' },
  { type: 'Optimisation', examples: 'Pricing, routing, scheduling, inventory allocation', how: 'Finds the best solution from a large space of options given defined constraints and objectives' },
];

const SPEECH_USES = [
  { tech: 'Automatic Speech Recognition (ASR)', desc: 'Converts spoken audio to text. Powers meeting transcription tools like Otter.ai, Fireflies, and Microsoft Teams transcription.', tools: 'Whisper (OpenAI), Google Speech-to-Text, AWS Transcribe' },
  { tech: 'Text-to-Speech (TTS)', desc: 'Converts written text to natural-sounding speech. Used in customer service IVR, accessibility tools, and content generation.', tools: 'ElevenLabs, Google TTS, Amazon Polly' },
  { tech: 'Voice Analysis', desc: 'Analyses tone, sentiment, and emotional state from voice patterns. Used in call centre quality monitoring.', tools: 'Cogito, Observe.AI, CallMiner' },
  { tech: 'Real-time Translation', desc: 'Translates spoken language in real time across 100+ languages. Enables multilingual customer service and global team collaboration.', tools: 'DeepL, Google Translate API, Microsoft Translator' },
];

const AGENTIC = [
  { capability: 'Multi-step task execution', desc: 'An agent receives a high-level goal ("research this company and prepare a briefing") and breaks it into steps, executes each, and returns the result.' },
  { capability: 'Tool use', desc: 'Agents can call external APIs, run searches, read files, write to databases, send emails — connecting AI reasoning to real-world actions.' },
  { capability: 'Memory', desc: 'Agents can maintain context across conversations and sessions — remembering past interactions, user preferences, and prior decisions.' },
  { capability: 'Multi-agent coordination', desc: 'Multiple specialised AI agents collaborate on complex tasks: one researches, one writes, one reviews. Each is an expert in its domain.' },
];

const SELECTOR = [
  { need: 'Write, summarise, or analyse text documents', category: 'LLM', examples: 'Claude, GPT-4o, Gemini' },
  { need: 'Generate images, analyse photos, read visual content', category: 'Computer Vision', examples: 'GPT-4V, Claude Vision, Google Vision API' },
  { need: 'Forecast demand, detect fraud, score leads', category: 'Predictive AI', examples: 'Custom ML, Salesforce Einstein, DataRobot' },
  { need: 'Transcribe meetings, analyse calls, convert speech', category: 'Speech AI', examples: 'Whisper, Otter.ai, Observe.AI' },
  { need: 'Automate multi-step workflows end-to-end', category: 'Agentic AI', examples: 'Anthropic Claude with tools, OpenAI Assistants' },
  { need: 'Answer questions from your internal documents', category: 'LLM + RAG', examples: 'Any LLM with document retrieval layer' },
  { need: 'Personalise recommendations for customers', category: 'Recommendation AI', examples: 'Amazon Personalise, Google Rec AI' },
];

export default function TechCategories() {
  return (
    <PageWrapper
      badge="Page 18 — Technology of AI"
      title="Categories of AI"
      subtitle="The main families of AI technology — what each does, where it is used, and which tools lead each category in 2024–25."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Large Language Models (LLMs)</h2>
        <p className="text-slate-500 text-sm mb-4">LLMs are the most commercially significant AI category in 2024. They are trained on vast amounts of text and can generate, summarise, classify, translate, and reason about language at human (and often super-human) quality.</p>
        <div className="card bg-blue-50 border-blue-200 mb-5 text-sm text-blue-800">
          <strong>How they work (briefly):</strong> LLMs predict the next word (or "token") in a sequence, having learned statistical relationships between words across trillions of examples. This simple mechanic produces emergent capabilities — reasoning, translation, coding — that were not explicitly trained.
        </div>
        <h3 className="font-bold text-slate-700 mb-3">Leading LLMs in 2025</h3>
        <div className="space-y-3">
          {LLMS.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-center gap-2 mb-1">
                <span>{m.icon}</span>
                <h3 className="font-bold text-slate-800">{m.name}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-1"><strong>Strength:</strong> {m.strength}</p>
              <p className="text-sm text-blue-600"><strong>Best for:</strong> {m.bestFor}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Computer Vision</h2>
        <p className="text-slate-500 text-sm mb-4">AI that understands images and video — classifying objects, reading text from scans, detecting anomalies, and tracking movement. In 2024, most leading LLMs are also multimodal, meaning they process images as well as text.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CV_USES.map((u) => (
            <div key={u.use} className="card">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{u.icon}</span>
                <h3 className="font-bold text-slate-800">{u.use}</h3>
              </div>
              <p className="text-sm text-slate-500">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Predictive & Analytical AI</h2>
        <p className="text-slate-500 text-sm mb-4">The oldest commercially deployed category of AI — using machine learning to find patterns in structured data and make predictions. This is the AI behind demand forecasting, fraud detection, and recommendation engines.</p>
        <div className="space-y-3">
          {PREDICTIVE.map((p) => (
            <div key={p.type} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{p.type}</h3>
              <p className="text-xs text-blue-600 mb-1"><strong>Examples:</strong> {p.examples}</p>
              <p className="text-sm text-slate-500">{p.how}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Speech & Audio AI</h2>
        <p className="text-slate-500 text-sm mb-4">AI that understands, generates, and analyses spoken language. Practically relevant for customer service, meeting productivity, and multilingual operations.</p>
        <div className="space-y-3">
          {SPEECH_USES.map((s) => (
            <div key={s.tech} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{s.tech}</h3>
              <p className="text-sm text-slate-500 mb-2">{s.desc}</p>
              <p className="text-xs text-slate-400"><strong>Tools:</strong> {s.tools}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Agentic AI</h2>
        <p className="text-slate-500 text-sm mb-4">The frontier category for 2025–2026. Agentic AI moves beyond answering questions to taking autonomous actions — browsing the web, running code, calling APIs, and completing multi-step tasks with minimal human supervision.</p>
        <div className="card bg-amber-50 border-amber-200 mb-4 text-sm text-amber-800">
          <strong>Important context:</strong> Agentic AI is commercially early-stage. It is powerful in constrained, well-defined workflows and unreliable in open-ended tasks. Human-in-the-loop design remains essential in 2025.
        </div>
        <div className="space-y-3">
          {AGENTIC.map((a) => (
            <div key={a.capability} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{a.capability}</h3>
              <p className="text-sm text-slate-500">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Choosing the Right Category</h2>
        <p className="text-slate-500 text-sm mb-4">Match your use case to the right AI category. Using an LLM for demand forecasting, or predictive ML for document summarisation, produces poor results.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">If you need to…</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">Use this category</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">Leading tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SELECTOR.map((s, i) => (
                <tr key={i}>
                  <td className="py-3 text-slate-700 pr-4">{s.need}</td>
                  <td className="py-3 pr-4"><span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{s.category}</span></td>
                  <td className="py-3 text-slate-400 text-xs">{s.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageWrapper>
  );
}
