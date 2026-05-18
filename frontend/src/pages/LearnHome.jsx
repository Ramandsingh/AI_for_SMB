import { NavLink } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'About This Curriculum', level: 2 },
  { id: 's2', title: 'Quarter Overview',       level: 2 },
  { id: 's3', title: 'How to Use This Guide',  level: 2 },
];

const QUARTERS = [
  {
    q: 'Q1',
    to: '/learn/q1',
    title: 'Foundations of Programming & Mathematics',
    months: 'Months 1–3',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    topics: ['Python syntax, OOP, data structures', 'NumPy & Pandas for data handling', 'Algorithms & O(n) complexity', 'Linear algebra, calculus, probability'],
    outcome: 'Write, read, and debug Python code. Understand the mathematics underpinning machine learning.',
  },
  {
    q: 'Q2',
    to: '/learn/q2',
    title: 'Classical Machine Learning & Data Engineering',
    months: 'Months 4–6',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    topics: ['Supervised learning: regression, classification', 'Ensemble methods: Random Forest, XGBoost', 'Unsupervised: clustering, PCA', 'Feature engineering & Scikit-Learn pipelines'],
    outcome: 'Build and evaluate classical ML models. Prepare production-quality data pipelines.',
  },
  {
    q: 'Q3',
    to: '/learn/q3',
    title: 'Deep Learning & Neural Network Architectures',
    months: 'Months 7–9',
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    text: 'text-violet-700',
    dot: 'bg-violet-500',
    topics: ['MLPs, CNNs for computer vision', 'RNNs and LSTM sequence models', 'Transformers and self-attention', 'PyTorch / TensorFlow + Hugging Face'],
    outcome: 'Train deep neural networks. Fine-tune transformer models from Hugging Face Hub.',
  },
  {
    q: 'Q4',
    to: '/learn/q4',
    title: 'Generative AI, MLOps & Capstone Deployment',
    months: 'Months 10–12',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    topics: ['LLMs, fine-tuning, RAG, vector databases', 'Prompt engineering: zero-shot, few-shot, CoT', 'Agentic frameworks & orchestration', 'FastAPI, Docker, cloud deployment, ethics'],
    outcome: 'Deploy a production LLM application with API, containerisation, and ethical guardrails.',
  },
];

const PREREQS = [
  { item: 'Computer with Python 3.10+ installed', required: true },
  { item: 'Basic comfort with a terminal / command line', required: true },
  { item: 'Google Colab account (free)', required: true },
  { item: 'NVIDIA GPU or cloud compute budget (~$20–50/mo)', required: false },
  { item: 'Hugging Face account (free)', required: false },
];

export default function LearnHome() {
  return (
    <PageWrapper
      badge="Learning Hub"
      title="1-Year AI Training Curriculum"
      subtitle="A structured path from foundational programming and mathematics to deployable, production-grade AI systems. Designed for ~10–15 hours per week."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">About This Curriculum</h2>
        <p className="text-slate-500 text-sm mb-5">This curriculum is designed for practitioners who want to understand AI deeply — not just use it. It covers the full stack: mathematics, classical ML, deep learning, and modern generative AI — ending with a deployable production application.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Duration', value: '12 months', sub: '3 months per quarter' },
            { label: 'Weekly commitment', value: '10–15 hrs', sub: 'Self-paced; adjust to your schedule' },
            { label: 'Outcome', value: 'Production AI', sub: 'Deployed LLM app with API + Docker' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <p className="text-lg font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-slate-700 mb-3">Prerequisites</h3>
        <div className="space-y-2">
          {PREREQS.map((p) => (
            <div key={p.item} className="flex items-center gap-3 text-sm">
              <span className={p.required ? 'text-emerald-500' : 'text-slate-300'}>
                {p.required ? '✓' : '○'}
              </span>
              <span className={p.required ? 'text-slate-700' : 'text-slate-400'}>
                {p.item}
                {!p.required && <span className="ml-1 text-xs">(optional)</span>}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Quarter Overview</h2>
        <p className="text-slate-500 text-sm mb-5">Each quarter builds directly on the previous. Do not skip quarters — the mathematical and programming foundations in Q1–Q2 are load-bearing for everything that follows.</p>
        <div className="space-y-4">
          {QUARTERS.map((q) => (
            <NavLink key={q.q} to={q.to} className="block card hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${q.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {q.q}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{q.title}</h3>
                    <span className="text-xs text-slate-400 flex-shrink-0">{q.months}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {q.topics.map((t) => (
                      <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${q.bg} ${q.text} border`}>{t}</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400"><strong className="text-slate-500">Quarter outcome:</strong> {q.outcome}</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0">→</span>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">How to Use This Guide</h2>
        <div className="space-y-3">
          {[
            { n: '1', title: 'Work sequentially', desc: 'Each quarter depends on the previous. Q1 mathematics is used in Q2 gradient descent. Q2 ML concepts are used in Q3 neural networks. Q3 transformer understanding underpins Q4 LLMs.' },
            { n: '2', title: 'Build projects, not just notebooks', desc: 'Each quarter should produce a working artefact — a cleaned dataset, a trained model, a fine-tuned network, a deployed API. Projects reinforce concepts better than reading alone.' },
            { n: '3', title: 'Use Karpathy as a companion', desc: 'For Q3–Q4, Andrej Karpathy\'s "Let\'s build GPT from scratch" and "Neural Networks: Zero to Hero" series provide the best bottom-up intuition available freely online. See the How LLMs Work page for links.' },
            { n: '4', title: 'Adjust pace, not sequence', desc: 'If you have prior Python experience, move through Q1 Months 1–2 quickly. If you have prior ML experience, Q2 may be a review. Never skip the mathematics section — it compounds.' },
            { n: '5', title: 'Join communities', desc: 'fast.ai forums, Hugging Face Discord, and the Andrej Karpathy community are the highest-signal learning communities for this curriculum path.' },
          ].map((s) => (
            <div key={s.n} className="card flex gap-4 items-start">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-sm flex items-center justify-center flex-shrink-0">{s.n}</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
