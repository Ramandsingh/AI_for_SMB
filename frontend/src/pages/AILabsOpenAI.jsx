import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'GPT Model Family',    level: 2 },
  { id: 's2', title: 'DALL·E & Image Gen',  level: 2 },
  { id: 's3', title: 'Whisper & Audio',     level: 2 },
  { id: 's4', title: 'Sora & Video',        level: 2 },
  { id: 's5', title: 'Assistants & Responses API', level: 2 },
  { id: 's6', title: 'Fine-tuning',         level: 2 },
  { id: 's7', title: 'Operator Tier & Safety', level: 2 },
];

const GPT_MODELS = [
  {
    name: 'GPT-4o',
    tag: 'Flagship multimodal',
    color: 'bg-emerald-500',
    desc: 'Processes text, images, and audio natively in a single model. Faster and cheaper than GPT-4 Turbo with equivalent or better quality. Powers ChatGPT and the API default.',
    ctx: '128K tokens',
    strengths: ['Multimodal: text + image + audio in one pass', 'Fastest GPT-4 class latency', 'Vision analysis and image understanding', 'Real-time voice conversation mode'],
    pricing: '$2.50 / $10.00 per 1M in/out tokens',
  },
  {
    name: 'o1 / o3',
    tag: 'Reasoning models',
    color: 'bg-blue-500',
    desc: '"Thinks before it answers" — uses a chain-of-thought reasoning process before producing output. Dramatically better at maths, science, coding, and complex multi-step problems.',
    ctx: '200K tokens',
    strengths: ['Competition-level maths and coding', 'Multi-step logical reasoning', 'Research and analysis tasks', 'o3 is the strongest reasoning model released (2024)'],
    pricing: '$15 / $60 per 1M in/out tokens (o1)',
  },
  {
    name: 'GPT-4o mini',
    tag: 'Cost-efficient',
    color: 'bg-slate-400',
    desc: 'Smaller, cheaper, faster version of GPT-4o. Suitable for high-volume tasks where full GPT-4o quality is not needed. Replaces the older GPT-3.5 Turbo in most workflows.',
    ctx: '128K tokens',
    strengths: ['Very low cost for high-volume pipelines', 'Excellent for classification and summarisation', 'Structured output support', 'Good function-calling accuracy'],
    pricing: '$0.15 / $0.60 per 1M in/out tokens',
  },
];

const ASSISTANTS_FEATURES = [
  { f: 'Persistent threads', d: 'Conversations stored server-side — no need to manage message history yourself.' },
  { f: 'Built-in tools', d: 'Code interpreter runs Python in a sandboxed container. File search retrieves content from uploaded documents via vector store.' },
  { f: 'Function calling', d: 'Define custom tools as JSON schema; the model decides when to call them and returns structured arguments.' },
  { f: 'Responses API', d: 'New stateful API (2025) that replaces Completions for multi-turn use cases. Supports streaming, tool use, and built-in memory.' },
  { f: 'Streaming', d: 'Server-Sent Events for real-time token-by-token output — essential for chat interfaces.' },
];

const FINETUNING_WHEN = [
  { situation: 'Consistent tone or style', when: true, note: 'Few-shot prompting in the system prompt is often sufficient first.' },
  { situation: 'Domain-specific vocabulary', when: true, note: 'Medical, legal, or proprietary terms not in the base model.' },
  { situation: 'Structured output format', when: false, note: 'JSON mode + function calling usually solves this without fine-tuning.' },
  { situation: 'Reduce prompt length at scale', when: true, note: 'Teach the model behaviour so you can shorten prompts at high volume.' },
  { situation: 'Add new knowledge', when: false, note: 'Use RAG — fine-tuning doesn\'t reliably inject factual knowledge.' },
  { situation: 'Reduce hallucinations', when: false, note: 'Fine-tuning can make hallucinations worse. Use grounding and retrieval.' },
];

const OPERATOR_LAYERS = [
  { layer: 'OpenAI', role: 'Sets absolute model policy. Defines what cannot be unlocked by anyone below.' },
  { layer: 'Operator', role: 'You (the developer). Configure system prompt, enable/disable capabilities for your use case via the API.' },
  { layer: 'User', role: 'End users of your application. Can only act within what the operator has permitted.' },
];

export default function AILabsOpenAI() {
  const [expandedModel, setExpandedModel] = useState(null);

  return (
    <PageWrapper
      badge="Page 35 — Top AI Labs"
      title="OpenAI"
      subtitle="GPT models, DALL·E, Whisper, Sora, and the Assistants API — an overview of OpenAI's product portfolio, capabilities, and pricing for practitioners."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">GPT Model Family</h2>
        <p className="text-slate-500 text-sm mb-5">OpenAI offers two model lines: GPT (general-purpose language) and o-series (reasoning-optimised). Choose based on task complexity and latency tolerance.</p>
        <div className="space-y-4">
          {GPT_MODELS.map((m) => (
            <div key={m.name} className="card cursor-pointer" onClick={() => setExpandedModel(expandedModel === m.name ? null : m.name)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${m.color} flex-shrink-0 mt-1`} />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-slate-800">{m.name}</h3>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{m.tag}</span>
                    </div>
                    <p className="text-sm text-slate-500">{m.desc}</p>
                  </div>
                </div>
                <span className="text-slate-300 text-xs flex-shrink-0 mt-1">{expandedModel === m.name ? '▲' : '▼'}</span>
              </div>
              {expandedModel === m.name && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Strengths</p>
                    <ul className="space-y-1">
                      {m.strengths.map((s) => (
                        <li key={s} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Context window</p>
                      <p className="text-sm text-slate-700">{m.ctx}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Pricing</p>
                      <p className="text-sm text-slate-700 font-mono">{m.pricing}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">DALL·E & Image Generation</h2>
        <p className="text-slate-500 text-sm mb-4">DALL·E 3 is OpenAI's image generation model, accessible via API. It produces photorealistic and artistic images from text prompts.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'DALL·E 3', desc: 'Current model. Better prompt adherence than DALL·E 2. Integrated into ChatGPT Plus. Supports 1024×1024, 1792×1024, 1024×1792 outputs.', tag: 'Current' },
            { title: 'GPT-4o Vision', desc: 'The GPT-4o base model also analyses and describes images. Combined with DALL·E this creates a generate-evaluate loop for iterative image work.', tag: 'Multimodal' },
            { title: 'Pricing', desc: '$0.040 per image at standard quality (1024×1024). HD quality doubles the cost. No monthly fee — pure pay-per-use.', tag: 'Cost' },
            { title: 'Practical limits', desc: 'Does not produce real people by default. Content policy prohibits violence, adult content, and copyright-infringing styles. Not as strong as Midjourney for photorealism.', tag: 'Limits' },
          ].map((c) => (
            <div key={c.title} className="card">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{c.tag}</span>
                <h3 className="font-bold text-slate-800 text-sm">{c.title}</h3>
              </div>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Whisper & Audio</h2>
        <p className="text-slate-500 text-sm mb-4">Whisper is OpenAI's open-source speech-to-text model. It is among the most accurate ASR systems available, supports 100+ languages, and runs locally.</p>
        <div className="space-y-3">
          {[
            { title: 'Whisper (open-source)', desc: 'Released under MIT licence. Run locally with no per-use cost. Five model sizes (tiny → large-v3) trade accuracy for speed. The "large-v3" model rivals or beats commercial ASR for most use cases.' },
            { title: 'Whisper API (hosted)', desc: '$0.006 per minute of audio. Accepts MP3, MP4, WAV, FLAC, and more. Returns transcript, timestamps, and detected language. Maximum file size 25MB.' },
            { title: 'TTS API', desc: 'Text-to-speech with 6 voices (alloy, echo, fable, onyx, nova, shimmer). Produces near-natural speech. $0.015 per 1K characters. Suitable for voice-over, accessibility, and IVR.' },
            { title: 'Real-time voice (GPT-4o Realtime)', desc: 'Streaming voice-to-voice conversation API. Input audio processed directly by GPT-4o (no separate ASR step). Enables sub-300ms latency conversational agents.' },
          ].map((c) => (
            <div key={c.title} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.title}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Sora & Video Generation</h2>
        <p className="text-slate-500 text-sm mb-4">Sora generates realistic video from text prompts. Released to ChatGPT Pro/Plus subscribers in late 2024. API access in preview.</p>
        <div className="card bg-amber-50 border-amber-200 text-amber-800 text-sm mb-4">
          <strong>Status (2025):</strong> Sora is available to ChatGPT Plus/Pro users via the web interface. API access is in limited preview. Not yet broadly available for production applications.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Max length', value: 'Up to 60 seconds (Plus) / 20s (Pro limit varies)' },
            { label: 'Resolution', value: '1080p. Aspect ratios: 16:9, 9:16, 1:1' },
            { label: 'Key capability', value: 'Maintains temporal consistency — objects persist correctly across frames' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <p className="text-sm font-semibold text-slate-700">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Assistants & Responses API</h2>
        <p className="text-slate-500 text-sm mb-4">OpenAI offers two stateful API surfaces for building multi-turn applications. The Responses API is the newer, recommended interface.</p>
        <div className="space-y-3">
          {ASSISTANTS_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Fine-tuning</h2>
        <p className="text-slate-500 text-sm mb-5">Fine-tuning lets you adapt a base GPT model on your own examples. It is often overused — prompt engineering and RAG solve most problems more cheaply.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">Situation</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">Use fine-tuning?</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FINETUNING_WHEN.map((r) => (
                <tr key={r.situation}>
                  <td className="py-3 text-slate-700 pr-4">{r.situation}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.when ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                      {r.when ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 text-xs">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s7" className="section-anchor mb-10">
        <h2 className="mb-2">Operator Tier & Safety</h2>
        <p className="text-slate-500 text-sm mb-4">OpenAI's usage policy creates a three-layer principal hierarchy for applications built on the API.</p>
        <div className="space-y-3 mb-6">
          {OPERATOR_LAYERS.map((l) => (
            <div key={l.layer} className="card flex gap-4 items-start">
              <span className="font-bold text-slate-800 w-20 flex-shrink-0">{l.layer}</span>
              <p className="text-sm text-slate-500">{l.role}</p>
            </div>
          ))}
        </div>
        <div className="card bg-blue-50 border-blue-200 text-blue-800 text-sm">
          <strong>Stargate infrastructure:</strong> OpenAI's joint venture with SoftBank, Oracle, and MGX — $500B data centre build-out announced in 2025. Designed to support the compute requirements of future reasoning and agentic models at national scale.
        </div>
      </section>
    </PageWrapper>
  );
}
