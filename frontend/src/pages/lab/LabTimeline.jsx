import { Clock } from 'lucide-react';

const EVENTS = [
  { year: '2017', month: 'Jun', title: 'Attention Is All You Need', type: 'research', detail: 'Google researchers publish the Transformer architecture. Self-attention replaces recurrence and convolution entirely. Every major language model today is built on this paper.', impact: 'Foundational' },
  { year: '2018', month: 'Oct', title: 'BERT — Bidirectional Language Understanding', type: 'research', detail: 'Google\'s BERT demonstrates that pre-training on large corpora and fine-tuning on specific tasks outperforms task-specific models. Transfers learning paradigm to NLP.', impact: 'Foundational' },
  { year: '2020', month: 'May', title: 'GPT-3: 175 Billion Parameters', type: 'model', detail: 'OpenAI releases GPT-3. In-context learning emerges — models perform tasks from examples in the prompt without weight updates. Enterprise interest begins in earnest.', impact: 'High' },
  { year: '2021', month: 'Jan', title: 'GitHub Copilot Technical Preview', type: 'product', detail: 'GitHub and OpenAI launch Copilot. LLM-assisted code generation enters professional software development. Developer productivity research begins accumulating.', impact: 'High' },
  { year: '2022', month: 'Nov', title: 'ChatGPT — Consumer Inflection', type: 'product', detail: 'OpenAI releases ChatGPT. 1 million users in 5 days; 100 million in 2 months. The fastest consumer product adoption in history. Enterprise board attention turns to AI overnight.', impact: 'Critical' },
  { year: '2023', month: 'Mar', title: 'GPT-4 and Multimodal AI', type: 'model', detail: 'GPT-4 introduces vision capability. Claude 2, Gemini Ultra, and Llama 2 launch. The frontier model race accelerates. Enterprise RAG deployments begin scaling.', impact: 'High' },
  { year: '2023', month: 'Mar', title: 'Microsoft Copilot for M365', type: 'product', detail: 'Microsoft embeds GPT-4 into Word, Excel, PowerPoint, Teams, and Outlook. The largest enterprise AI deployment in history begins rolling out to hundreds of millions of seats.', impact: 'Critical' },
  { year: '2023', month: 'Nov', title: 'Anthropic Claude 2 & EU AI Act Final Text', type: 'regulatory', detail: 'EU AI Act reaches final political agreement. Risk-tier classification, conformity assessment, and prohibited use categories become law. Compliance timelines: 2025–2027.', impact: 'High' },
  { year: '2024', month: 'Feb', title: 'Sora — Video Generation at Scale', type: 'model', detail: 'OpenAI\'s Sora demonstrates minute-long high-fidelity video generation. Generative AI extends to temporal media. Creative industry disruption becomes tangible.', impact: 'Medium' },
  { year: '2024', month: 'May', title: 'GPT-4o and Real-Time Voice AI', type: 'model', detail: 'GPT-4o delivers real-time voice conversation with emotional nuance. Latency drops to human-level. Voice AI moves from novelty to production-grade interface layer.', impact: 'High' },
  { year: '2024', month: 'Jun', title: 'EU AI Act Enters Force', type: 'regulatory', detail: 'EU AI Act published in Official Journal. 24-month implementation clock begins for high-risk AI systems. Enterprises with EU operations start mandatory compliance programs.', impact: 'Critical' },
  { year: '2024', month: 'Jul', title: 'Claude 3.5 Sonnet — Agentic Capabilities', type: 'model', detail: 'Anthropic\'s Claude 3.5 Sonnet sets new benchmarks. Computer Use enables AI to operate desktop applications. Agentic workflows — AI completing multi-step tasks autonomously — move to early production.', impact: 'High' },
  { year: '2025', month: 'Jan', title: 'DeepSeek R1 — Open-Source Reasoning', type: 'model', detail: 'DeepSeek releases R1 — a reasoning model matching GPT-o1 at a fraction of the training cost. Open weights. Resets assumptions about the capital required to build frontier models.', impact: 'Critical' },
  { year: '2025', month: 'Mar', title: 'Agentic AI Enterprise Deployment', type: 'enterprise', detail: 'AI agents — systems that plan, use tools, and complete multi-step tasks without human intervention per step — move from research to enterprise production. Governance frameworks begin catching up.', impact: 'High' },
];

const TYPE_STYLES = {
  research:   { bg: 'bg-slate-100',   text: 'text-slate-700',   dot: 'bg-slate-400'   },
  model:      { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500'    },
  product:    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  regulatory: { bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500'     },
  enterprise: { bg: 'bg-purple-100',  text: 'text-purple-700',  dot: 'bg-purple-500'  },
};

const IMPACT_COLOR = {
  Foundational: 'text-slate-800 font-extrabold',
  Critical: 'text-red-700 font-bold',
  High: 'text-blue-700 font-semibold',
  Medium: 'text-slate-500',
};

export default function LabTimeline() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Custom · Tailwind · no library</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">AI Milestones Timeline</h1>
      <p className="text-slate-500 text-sm mb-5">Key events in AI from the Transformer paper to agentic systems — the moments that changed enterprise AI strategy.</p>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(TYPE_STYLES).map(([type, s]) => (
          <span key={type} className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${s.bg} ${s.text}`}>{type}</span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-blue-300 to-slate-800" />

        <div className="space-y-6">
          {EVENTS.map((e, i) => {
            const ts = TYPE_STYLES[e.type];
            return (
              <div key={i} className="flex gap-4 relative">
                {/* Date */}
                <div className="w-16 flex-shrink-0 text-right pt-2">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{e.year}</p>
                  <p className="text-xs text-slate-400">{e.month}</p>
                </div>

                {/* Dot */}
                <div className="flex-shrink-0 relative z-10 mt-2.5">
                  <div className={`w-3 h-3 rounded-full ring-2 ring-white ${ts.dot}`} />
                </div>

                {/* Card */}
                <div className="flex-1 pb-2">
                  <div className="card py-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="font-bold text-slate-800 text-sm leading-tight">{e.title}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ts.bg} ${ts.text}`}>{e.type}</span>
                        <span className={`text-xs ${IMPACT_COLOR[e.impact]}`}>{e.impact}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{e.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
