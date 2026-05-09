import { Factory, Server, Cpu, Network, Package, Activity, CheckCircle2, XCircle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'What Is an AI Factory?',               level: 2 },
  { id: 's2', title: 'The Four Infrastructure Layers',        level: 2 },
  { id: 's3', title: 'The AI Development Pipeline',          level: 2 },
  { id: 's4', title: 'MLOps: Operating the Factory',         level: 2 },
  { id: 's5', title: 'Cloud vs On-Prem vs Hybrid',           level: 2 },
];

const INFRA_LAYERS = [
  {
    layer: '1 · Compute',
    icon: Cpu,
    color: 'border-l-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    components: [
      { name: 'GPU clusters', detail: 'NVIDIA H100/A100 GPUs for training large models. B200 for frontier work. 8–512 GPUs per training job for enterprise-scale models.' },
      { name: 'CPU compute', detail: 'Data preprocessing, serving infrastructure, and feature computation do not always require GPUs.' },
      { name: 'Accelerators', detail: 'Google TPUs, AWS Trainium, Intel Gaudi — alternative accelerators optimising for cost efficiency on specific workloads.' },
      { name: 'Inference hardware', detail: 'Serving requires different hardware than training. NVIDIA T4/L4 for cost-efficient inference. TensorRT for optimised serving.' },
    ],
    note: 'The GPU shortage (2023–2025) drove enterprises to reserve compute capacity years ahead. Hyperscalers now provide reserved and spot GPU instances to smooth access.',
  },
  {
    layer: '2 · High-Performance Storage',
    icon: Server,
    color: 'border-l-emerald-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    components: [
      { name: 'Parallel file systems', detail: 'GPFS, Lustre, WekaFS — purpose-built for the high-throughput sequential reads required during model training.' },
      { name: 'Object storage', detail: 'S3, ADLS Gen2, GCS — scalable and cheap storage for training datasets, model checkpoints, and artefacts.' },
      { name: 'NVMe SSD tiers', detail: 'For dataset caching close to compute — eliminates the I/O bottleneck that makes GPUs idle during data loading.' },
      { name: 'Model registry', detail: 'Versioned, structured storage for trained model artefacts, metadata, and lineage (MLflow, Weights & Biases, Neptune).' },
    ],
    note: 'Storage bandwidth, not raw GPU count, is often the binding constraint in large training runs. A100 GPUs can consume data faster than commodity storage can deliver it.',
  },
  {
    layer: '3 · Networking',
    icon: Network,
    color: 'border-l-purple-500',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    components: [
      { name: 'InfiniBand / RDMA', detail: '400 Gb/s+ interconnects between GPU nodes for distributed training. NVIDIA NVLink + NVSwitch for intra-node GPU communication.' },
      { name: 'High-speed Ethernet', detail: '100–400 Gb/s RoCE (RDMA over Converged Ethernet) as a lower-cost alternative for less latency-sensitive training.' },
      { name: 'Low-latency serving', detail: 'Inference APIs require p99 latency under 500ms. Content delivery networks and edge caching reduce network round-trip for globally distributed inference.' },
    ],
    note: 'Distributed training across hundreds of GPUs is communication-bound. A 10% improvement in interconnect bandwidth can reduce training time by 30%+ on multi-node jobs.',
  },
  {
    layer: '4 · Orchestration & Management',
    icon: Package,
    color: 'border-l-amber-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    components: [
      { name: 'Kubernetes', detail: 'Container orchestration for training jobs, serving deployments, and pipeline workers. NVIDIA GPU Operator manages GPU resources in K8s clusters.' },
      { name: 'Slurm / Ray', detail: 'Slurm for HPC-style batch job scheduling. Ray for distributed Python workloads (Ray Train, Ray Serve, Ray Data).' },
      { name: 'Pipeline orchestration', detail: 'Airflow, Prefect, Metaflow — coordinate multi-step ML pipelines from data ingestion through model promotion.' },
      { name: 'Experiment tracking', detail: 'MLflow, Weights & Biases, Comet — log hyperparameters, metrics, artefacts across training runs for reproducibility.' },
    ],
    note: 'The orchestration layer determines how efficiently compute is utilised. Idle GPU time from poor scheduling costs enterprises thousands of dollars per hour at scale.',
  },
];

const PIPELINE_STAGES = [
  { stage: 'Data Preparation',   detail: 'Raw data collected, cleaned, labelled, and split into train/validation/test sets. Stored in the data lakehouse. Features engineered and registered in the feature store.',           time: 'Typically 40–60% of total project time' },
  { stage: 'Experimentation',    detail: 'Data scientists run iterative experiments: model architecture selection, hyperparameter search, feature selection. Tracked in an experiment registry for reproducibility.',      time: 'Days to weeks per iteration' },
  { stage: 'Training',           detail: 'Selected model trained on the full dataset using GPU compute. Distributed training across multiple nodes for large models. Checkpoints saved to model registry.',                 time: 'Hours to weeks for large models' },
  { stage: 'Evaluation',         detail: 'Model performance validated against held-out test set. Bias and fairness assessments. Business metric validation. Red-teaming for LLMs. Gating criteria applied.',              time: 'Days — cannot be rushed' },
  { stage: 'Packaging',          detail: 'Model serialised (ONNX, TorchScript, SavedModel), containerised (Docker), and documented. Inference optimisation applied (quantisation, pruning, TensorRT compilation).',       time: '1–5 days' },
  { stage: 'Deployment',         detail: 'Model deployed to serving infrastructure. A/B or canary rollout. Endpoint registered in API gateway. Integration tests run against production-equivalent environment.',          time: '1–2 weeks for first deployment; hours for redeployment' },
  { stage: 'Monitoring',         detail: 'Live model monitored for data drift, concept drift, prediction quality, latency, and throughput. Automated alerts trigger retraining pipeline when performance degrades.',      time: 'Continuous' },
];

const MLOPS_PRACTICES = [
  { practice: 'CI/CD for ML', desc: 'Automated pipelines that test, validate, and deploy model changes — the same discipline applied to software engineering, applied to model development.' },
  { practice: 'Continuous Training (CT)', desc: 'Models retrained automatically on a schedule or triggered by drift detection — not just once at project launch.' },
  { practice: 'Model versioning', desc: 'Every model version tracked with its training data snapshot, hyperparameters, evaluation metrics, and deployment history. Rollback is instant.' },
  { practice: 'Shadow mode deployment', desc: 'New model runs in parallel with the incumbent, receiving live traffic but not affecting responses. Metrics compared before traffic is cut over.' },
  { practice: 'Drift monitoring', desc: 'Statistical tests detect when incoming data distribution diverges from training distribution — the primary cause of silent model degradation in production.' },
  { practice: 'Model cards & documentation', desc: 'Structured documentation of model purpose, training data, performance across subgroups, known limitations, and intended use — required for regulated industries.' },
];

const DEPLOYMENT_COMPARISON = [
  {
    model: 'Public Cloud',
    examples: 'AWS, Azure, GCP',
    pros: ['No upfront CapEx', 'Instant GPU availability', 'Managed ML services', 'Global infrastructure'],
    cons: ['Ongoing cost at scale', 'Data residency constraints', 'Vendor dependency', 'Egress costs'],
    bestFor: 'Most enterprises, especially those starting out or with variable workloads',
  },
  {
    model: 'On-Premises',
    examples: 'NVIDIA DGX, custom GPU clusters',
    pros: ['Predictable cost at high utilisation', 'Full data sovereignty', 'Low latency to internal systems', 'No egress fees'],
    cons: ['High CapEx', 'Long procurement cycles', 'Operational burden', 'Capacity planning complexity'],
    bestFor: 'Regulated industries (finance, healthcare, defence) or very high, stable GPU utilisation (>70%)',
  },
  {
    model: 'Hybrid',
    examples: 'On-prem base + cloud burst',
    pros: ['Base load on-prem (cost-efficient)', 'Burst capacity in cloud', 'Data sovereignty for sensitive workloads'],
    cons: ['Operational complexity', 'Requires mature networking and security', 'Harder to optimise across environments'],
    bestFor: 'Large enterprises with established on-prem infrastructure and variable training workloads',
  },
];

export default function EntDevAIFactory() {
  return (
    <PageWrapper
      badge="Enterprise AI Development · Page 24"
      title="The AI Factory Model"
      subtitle="The AI factory is the industrial-scale infrastructure for building, training, and deploying AI models — treating AI development as an engineering discipline with reproducible, automated pipelines."
      sections={SECTIONS}
    >
      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">What Is an AI Factory?</h2>
        <div className="card bg-blue-900 text-white border-0 mb-6">
          <div className="flex items-start gap-3">
            <Factory size={24} className="text-blue-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-200 mb-2">Jensen Huang (NVIDIA CEO), 2024:</p>
              <p className="text-sm text-slate-200 leading-relaxed italic">"Every company will become an AI company. Every company needs an AI factory — infrastructure that takes in data and produces AI-generated intelligence as the output, just as a factory takes in raw materials and produces finished goods."</p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Input',  desc: 'Raw enterprise data — text, transactions, sensor readings, images, logs', icon: '→' },
            { label: 'Process', desc: 'Compute, algorithms, engineering pipelines, experimentation, validation', icon: '⚙' },
            { label: 'Output', desc: 'Trained models, predictions, recommendations, automated decisions at scale', icon: '→' },
          ].map(c => (
            <div key={c.label} className="card text-center">
              <p className="text-2xl mb-2 text-blue-400">{c.icon}</p>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="card text-sm">
          <p className="font-semibold text-slate-800 mb-2">From one-off projects to a factory</p>
          <p className="text-slate-600">Most enterprises begin with individual AI projects — a chatbot here, a forecasting model there. An AI factory is the shift from craft to manufacturing: standardised infrastructure, reusable components, automated pipelines, and governance that scales across every model across the organisation. The factory produces AI as a service, not as a series of bespoke engagements.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">The Four Infrastructure Layers</h2>
        <p className="text-slate-500 text-sm mb-6">Enterprise AI infrastructure is built in four layers, each with distinct requirements. Weaknesses in any layer constrain the entire factory.</p>
        <div className="space-y-4">
          {INFRA_LAYERS.map((l) => {
            const Icon = l.icon;
            return (
              <div key={l.layer} className={`card border-l-4 ${l.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`p-2 rounded-xl ${l.iconBg} flex-shrink-0`}>
                    <Icon size={18} className={l.iconColor} />
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">{l.layer}</h3>
                </div>
                <div className="space-y-2 mb-3">
                  {l.components.map(c => (
                    <div key={c.name} className="flex gap-2 text-sm">
                      <span className="text-slate-300 flex-shrink-0 mt-0.5">→</span>
                      <span><span className="font-semibold text-slate-700">{c.name}:</span> <span className="text-slate-500">{c.detail}</span></span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">{l.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">The AI Development Pipeline</h2>
        <p className="text-slate-500 text-sm mb-6">From data to deployed model — the seven stages of a production AI pipeline, with realistic time estimates.</p>
        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700" />
          <div className="space-y-3 pl-10">
            {PIPELINE_STAGES.map((s, i) => (
              <div key={s.stage} className="card relative">
                <div className="absolute -left-[2.25rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-blue-600 text-white z-10">
                  {i + 1}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{s.stage}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.detail}</p>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 whitespace-nowrap flex-shrink-0">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">MLOps: Operating the Factory</h2>
        <p className="text-slate-500 text-sm mb-6">MLOps (Machine Learning Operations) is the discipline of running AI pipelines in production reliably, efficiently, and at scale — applying DevOps principles to the full model lifecycle.</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {MLOPS_PRACTICES.map(p => (
            <div key={p.practice} className="card">
              <p className="text-sm font-semibold text-slate-800 mb-1">{p.practice}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="card bg-emerald-50 border-emerald-200 text-sm">
          <p className="font-semibold text-emerald-800 mb-1">MLOps maturity levels</p>
          <div className="space-y-1.5 mt-2">
            {[
              { level: 'Level 0', desc: 'Manual process — scripts, notebooks, manual deployment. Typical of early projects.' },
              { level: 'Level 1', desc: 'ML pipeline automation — automated training, but manual model deployment trigger.' },
              { level: 'Level 2', desc: 'CI/CD for ML — automated testing, validation gates, and deployment triggered by code or data changes.' },
            ].map(l => (
              <div key={l.level} className="flex gap-2 items-start">
                <span className="text-xs font-bold text-emerald-700 w-16 flex-shrink-0">{l.level}</span>
                <span className="text-xs text-emerald-800">{l.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Cloud vs On-Premises vs Hybrid</h2>
        <p className="text-slate-500 text-sm mb-6">Infrastructure location is a strategic decision driven by cost, data sovereignty, regulatory requirements, and workload patterns.</p>
        <div className="space-y-4">
          {DEPLOYMENT_COMPARISON.map(d => (
            <div key={d.model} className="card">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-slate-800">{d.model}</h3>
                <span className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">{d.examples}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 mb-1">Advantages</p>
                  <ul className="space-y-1">{d.pros.map((p, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start"><CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0 mt-0.5" />{p}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 mb-1">Trade-offs</p>
                  <ul className="space-y-1">{d.cons.map((c, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start"><XCircle size={11} className="text-red-400 flex-shrink-0 mt-0.5" />{c}</li>)}</ul>
                </div>
              </div>
              <p className="text-xs bg-blue-50 text-blue-700 rounded-lg px-3 py-1.5"><strong>Best for:</strong> {d.bestFor}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
