import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'DeepSeek',               level: 2 },
  { id: 's2', title: 'Qwen (Alibaba)',          level: 2 },
  { id: 's3', title: 'Kimi (Moonshot AI)',      level: 2 },
  { id: 's4', title: 'Baidu ERNIE',             level: 2 },
  { id: 's5', title: 'Benchmark Comparison',    level: 2 },
  { id: 's6', title: 'Open-Source Impact',      level: 2 },
  { id: 's7', title: 'Context & Compliance',    level: 2 },
];

const DEEPSEEK_MODELS = [
  { name: 'DeepSeek-R1', tag: 'Reasoning', desc: 'Chain-of-thought reasoning model. Competitive with OpenAI o1 on AIME, MATH, and coding benchmarks. Released January 2025 — shocked the AI industry with frontier performance at dramatically lower training cost.' },
  { name: 'DeepSeek-V3', tag: 'Mixture-of-Experts', desc: '671B total parameters, 37B active per token (MoE architecture). Competitive with GPT-4o on most benchmarks. Released December 2024. Cost to train: ~$6M — a fraction of comparable Western models.' },
  { name: 'DeepSeek-Coder-V2', tag: 'Code specialist', desc: 'Specialised for code generation and understanding. MoE architecture. Strong performance on HumanEval and SWE-bench. Open-weights under DeepSeek licence.' },
];

const QWEN_MODELS = [
  { name: 'Qwen 2.5', tag: 'General purpose', desc: 'Alibaba\'s flagship open-weights model family. Available in 0.5B–72B sizes. 7B and 72B variants are among the strongest open-source models at their size classes. Apache 2.0 licence on most variants.' },
  { name: 'Qwen 2.5-Coder', tag: 'Code', desc: 'Specialised coding variant. 7B and 32B sizes. Competitive with Codestral and DeepSeek-Coder. Supports function calling and structured output.' },
  { name: 'QwQ', tag: 'Reasoning (experimental)', desc: 'Qwen\'s reasoning model. Open-weights. Uses extended chain-of-thought. Often verbose but strong on difficult STEM problems.' },
  { name: 'Qwen-VL', tag: 'Vision-language', desc: 'Multimodal model supporting image understanding. Available via Qwen API (Alibaba Cloud). Competitive with GPT-4o Vision on document understanding tasks.' },
];

const KIMI_FEATURES = [
  { f: '1M token context', d: 'Among the first models to ship a production 1M-token context window. Particularly strong for full-book analysis, long code repositories, and lengthy legal documents.' },
  { f: 'Kimi k1.5', d: 'Reasoning model released January 2025. Uses "long chain-of-thought" training — the model thinks for many tokens before answering. Reportedly competitive with o1 on some benchmarks.' },
  { f: 'Kimi API', d: 'Available via API for developers. Strong Chinese-language performance alongside English. Pricing competitive with GPT-4o mini for comparable quality.' },
];

const ERNIE_FEATURES = [
  { f: 'ERNIE 4.0', d: 'Baidu\'s flagship LLM. Integrated with Baidu Search for real-time grounding. Strong Chinese-language performance.' },
  { f: 'ERNIE Speed / Lite', d: 'Smaller, cheaper variants for high-volume workloads. Available via Baidu AI Cloud (Qianfan platform).' },
  { f: 'Wenxin Yige (ERNIE-ViLG)', d: 'Text-to-image generation. Chinese aesthetic style. Integrated into Baidu\'s consumer apps.' },
  { f: 'Market position', d: 'Dominant in Chinese enterprise market. Partnerships with major Chinese banks, telecoms, and government agencies. 200M+ users on the ERNIE Bot consumer app.' },
];

const BENCHMARKS = [
  { model: 'GPT-4o', org: 'OpenAI', mmlu: '88.7', humaneval: '90.2', math: '76.6', origin: '🇺🇸' },
  { model: 'Claude Opus', org: 'Anthropic', mmlu: '86.8', humaneval: '84.9', math: '60.1', origin: '🇺🇸' },
  { model: 'Gemini 2.5 Pro', org: 'Google', mmlu: '90.0', humaneval: '87.0', math: '91.0', origin: '🇺🇸' },
  { model: 'DeepSeek-V3', org: 'DeepSeek', mmlu: '88.5', humaneval: '89.1', math: '90.2', origin: '🇨🇳' },
  { model: 'DeepSeek-R1', org: 'DeepSeek', mmlu: '90.8', humaneval: '92.3', math: '97.3', origin: '🇨🇳' },
  { model: 'Qwen 2.5 72B', org: 'Alibaba', mmlu: '86.1', humaneval: '86.0', math: '83.1', origin: '🇨🇳' },
];

const OPEN_SOURCE = [
  { contribution: 'DeepSeek-R1 weights', impact: 'Full model weights released on Hugging Face under MIT licence. Distilled versions (1.5B–70B) enable local reasoning model deployment.' },
  { contribution: 'DeepSeek MoE research', impact: 'Published training methodology showing how to achieve frontier performance with MoE architecture at dramatically reduced compute cost. Adopted by several research groups.' },
  { contribution: 'Qwen model series', impact: 'Apache 2.0 licensed weights across size spectrum. Among the most downloaded models on Hugging Face. Strong multilingual performance fills a gap left by Western open-source models.' },
  { contribution: 'MiniMax Text-01', impact: 'MiniMax released Text-01 with a 1M token context window under open weights. Competes directly with Gemini 1.5 Pro in long-context benchmarks.' },
];

const COMPLIANCE_NOTES = [
  { topic: 'Data residency', note: 'Using Chinese AI APIs means data transits through infrastructure in China. For EU/UK organisations this raises GDPR Art.46 transfer mechanism questions. For US federal contractors, additional export control review is needed.' },
  { topic: 'Self-hosted (open weights)', note: 'DeepSeek-R1 and Qwen 2.5 weights can be downloaded and run locally — no data leaves your infrastructure. This resolves data residency concerns entirely. Requires GPU hardware.' },
  { topic: 'Export controls', note: 'US BIS export controls on advanced AI chips (H100, A100) affect Chinese lab training capacity. Ongoing regulatory evolution — monitor for changes.' },
  { topic: 'Usage policies', note: 'All Chinese AI models have usage policies. Content restrictions aligned with Chinese internet regulations apply on hosted APIs. Open-weights deployments are subject to your jurisdiction\'s laws.' },
  { topic: 'Practical recommendation', note: 'For most SMB use cases: use the open-weight versions locally, or use the hosted API for non-sensitive tasks. The quality-to-cost ratio of DeepSeek and Qwen is genuinely compelling for development and internal tooling.' },
];

export default function AILabsChinese() {
  return (
    <PageWrapper
      badge="Page 38 — Top AI Labs"
      title="Chinese AI Labs"
      subtitle="DeepSeek, Qwen, Kimi, and Baidu — an overview of China's leading AI models, their open-source contributions, and geopolitical context for practitioners."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">DeepSeek</h2>
        <p className="text-slate-500 text-sm mb-1">Based in Hangzhou, China. Founded 2023. Backed by High-Flyer quantitative trading fund. DeepSeek's R1 release in January 2025 triggered significant market reaction — demonstrating frontier model quality at a fraction of the training cost of comparable Western models.</p>
        <div className="card bg-slate-900 text-slate-300 text-xs font-mono mb-4 mt-3">
          <span className="text-slate-500">Training cost:</span> DeepSeek-V3 — $5.6M compute cost (estimated) vs ~$100M+ for GPT-4 class models
        </div>
        <div className="space-y-3">
          {DEEPSEEK_MODELS.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{m.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{m.tag}</span>
              </div>
              <p className="text-sm text-slate-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Qwen (Alibaba)</h2>
        <p className="text-slate-500 text-sm mb-4">Developed by Alibaba Cloud's Qwen team. The most broadly adopted Chinese open-source model family globally. Strong multilingual performance — particularly Chinese/English bilingual tasks.</p>
        <div className="space-y-3">
          {QWEN_MODELS.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{m.name}</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{m.tag}</span>
              </div>
              <p className="text-sm text-slate-500">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="card mt-3 bg-emerald-50 border-emerald-200 text-emerald-800 text-sm">
          <strong>Availability:</strong> Weights on Hugging Face (<code>Qwen/Qwen2.5-7B-Instruct</code>). Hosted API via Alibaba Cloud DashScope. Also available via Ollama for local inference.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Kimi (Moonshot AI)</h2>
        <p className="text-slate-500 text-sm mb-4">Moonshot AI is a Beijing-based startup (founded 2023, backed by Alibaba, Tencent). Kimi was one of the first production models to offer a 1M token context window.</p>
        <div className="space-y-3">
          {KIMI_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Baidu ERNIE</h2>
        <p className="text-slate-500 text-sm mb-4">Baidu is China's search giant. ERNIE (Enhanced Representation through Knowledge Integration) is their LLM, deeply integrated with Baidu Search and Chinese knowledge graphs.</p>
        <div className="space-y-3">
          {ERNIE_FEATURES.map((f) => (
            <div key={f.f} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{f.f}</h3>
              <p className="text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Benchmark Comparison</h2>
        <p className="text-slate-500 text-sm mb-4">Scores are approximate and change with model updates. Benchmarks measure specific skills — real-world task performance varies. Use as directional guidance only.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left pb-3 text-slate-600 font-semibold">Model</th>
                <th className="text-left pb-3 text-slate-600 font-semibold">Org</th>
                <th className="text-right pb-3 text-slate-600 font-semibold">MMLU</th>
                <th className="text-right pb-3 text-slate-600 font-semibold">HumanEval</th>
                <th className="text-right pb-3 text-slate-600 font-semibold">MATH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BENCHMARKS.map((b) => (
                <tr key={b.model}>
                  <td className="py-2.5 text-slate-700 font-semibold pr-2">
                    <span className="mr-1.5">{b.origin}</span>{b.model}
                  </td>
                  <td className="py-2.5 text-slate-400 pr-2">{b.org}</td>
                  <td className="py-2.5 text-right text-slate-600">{b.mmlu}</td>
                  <td className="py-2.5 text-right text-slate-600">{b.humaneval}</td>
                  <td className="py-2.5 text-right text-slate-600">{b.math}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Sources: published model papers and Hugging Face Open LLM Leaderboard (2025). Scores not directly comparable across benchmarks.</p>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Open-Source Impact</h2>
        <p className="text-slate-500 text-sm mb-4">Chinese labs have made disproportionately large open-source contributions relative to their market share. This has democratised access to frontier capabilities for developers globally.</p>
        <div className="space-y-3">
          {OPEN_SOURCE.map((c) => (
            <div key={c.contribution} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.contribution}</h3>
              <p className="text-sm text-slate-500">{c.impact}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s7" className="section-anchor mb-10">
        <h2 className="mb-2">Context & Compliance</h2>
        <p className="text-slate-500 text-sm mb-4">This section provides factual context for organisations evaluating Chinese AI tools. The goal is informed decision-making, not advocacy for any position.</p>
        <div className="space-y-3">
          {COMPLIANCE_NOTES.map((c) => (
            <div key={c.topic} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.topic}</h3>
              <p className="text-sm text-slate-500">{c.note}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
