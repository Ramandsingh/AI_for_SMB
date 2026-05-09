import { Users, Code2, Brain, BarChart2, Shield, Lightbulb, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The Digital Maturity Prerequisite',     level: 2 },
  { id: 's2', title: 'Core Roles in an AI Engineering Team',  level: 2 },
  { id: 's3', title: 'Structuring the AI Organisation',       level: 2 },
  { id: 's4', title: 'Build vs Buy vs Partner: Talent',       level: 2 },
  { id: 's5', title: 'Budget Framework & ROI Tracking',       level: 2 },
];

const DIGITAL_MATURITY_STAGES = [
  {
    stage: 'Incidental',
    desc: 'AI used ad hoc by individuals. No AI strategy. Technology integration happens by accident, not design. Value is isolated and invisible at an organisational level.',
    ai_readiness: 'Lowest — individual AI tools only. No infrastructure or team.',
    priority: 'Digital literacy, basic tool adoption, leadership alignment.',
    color: 'bg-slate-100 text-slate-700',
  },
  {
    stage: 'Intentional',
    desc: 'An AI strategy exists but scaling is limited. AI use cases are identified but siloed. Training gaps, tool fragmentation, and user adoption challenges are common.',
    ai_readiness: 'Low-medium — pilots possible. Infrastructure is immature.',
    priority: 'Use case prioritisation, data foundation work, first AI product role.',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    stage: 'Integrated',
    desc: 'Cross-functional AI strategies in place with leadership buy-in. Measurable AI value demonstrated. Streamlined processes and shared data infrastructure across functions.',
    ai_readiness: 'Medium-high — production AI deployments in multiple functions.',
    priority: 'MLOps maturity, AI governance framework, Centre of Excellence formation.',
    color: 'bg-blue-300 text-blue-900',
  },
  {
    stage: 'Optimised',
    desc: 'AI is embedded in organisational culture and day-to-day operations. Data-driven decision-making is the default. Continuous improvement loops are automated.',
    ai_readiness: 'Highest — AI factory operational. Multiple model pipelines in production.',
    priority: 'Advanced model development, competitive AI differentiation, AI-native products.',
    color: 'bg-blue-700 text-white',
  },
];

const CORE_ROLES = [
  {
    role: 'ML Engineer',
    icon: Code2,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    primary: 'Builds, trains, evaluates, and deploys machine learning models. Owns the end-to-end model development pipeline.',
    skills: ['Python (PyTorch, TensorFlow, scikit-learn)', 'Feature engineering and data pipelines', 'Model evaluation and testing', 'Deployment and serving infrastructure'],
    ratio: '1 per 2–3 use cases in production',
    where: 'Core team in any organisation building custom models',
  },
  {
    role: 'Data Engineer',
    icon: BarChart2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    primary: 'Builds and maintains the data infrastructure that AI models depend on. Owns pipelines, storage, and data quality.',
    skills: ['SQL, dbt, Apache Spark', 'Data pipeline orchestration (Airflow, Prefect)', 'Cloud data platforms (Snowflake, BigQuery, Databricks)', 'Data quality monitoring'],
    ratio: '1:1 with ML Engineers in the early stages',
    where: 'Essential before any other AI hire — no model works without clean, accessible data',
  },
  {
    role: 'MLOps / AI Platform Engineer',
    icon: Shield,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    primary: 'Builds and operates the infrastructure that enables the ML team to develop, train, and deploy models efficiently and reliably.',
    skills: ['Kubernetes, Docker, CI/CD', 'Cloud AI platforms (SageMaker, Vertex, Azure ML)', 'Experiment tracking (MLflow, W&B)', 'Monitoring (Evidently, Arize, WhyLabs)'],
    ratio: '1 per 4–6 ML Engineers (but critical early)',
    where: 'Hire when the team has ≥2 models in production or is wasting >20% of time on infrastructure',
  },
  {
    role: 'AI/ML Scientist',
    icon: Brain,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    primary: 'Research-oriented role exploring novel model architectures, training techniques, and state-of-the-art methods. Brings new capabilities into the engineering team.',
    skills: ['Deep research background (often PhD)', 'Model architecture innovation', 'Literature review and experimental design', 'Statistical analysis'],
    ratio: '1 per 8–12 ML Engineers (rarely needed at early stage)',
    where: 'Frontier model development or organisations seeking genuine research differentiation',
  },
  {
    role: 'AI Product Manager',
    icon: Lightbulb,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    primary: 'Translates business problems into AI use cases. Owns the roadmap for AI products. Bridges between technical teams and business stakeholders.',
    skills: ['AI product roadmapping', 'Data literacy (not coding)', 'Stakeholder management', 'ROI framework definition and measurement'],
    ratio: '1 per 5–8 engineers, or per major AI product',
    where: 'Often the highest-leverage hire — a great AI PM multiplies the impact of the whole engineering team',
  },
  {
    role: 'AI Governance & Risk Analyst',
    icon: Users,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    primary: 'Owns the model risk management framework, regulatory compliance, and internal AI ethics review. Works with Legal, Risk, and Compliance.',
    skills: ['Regulatory frameworks (EU AI Act, SR 11-7)', 'Model risk management', 'Bias and fairness testing methodologies', 'Policy writing and audit preparation'],
    ratio: '1 per organisation (not per team) — shared service',
    where: 'Regulated industries (finance, healthcare, insurance). Required for EU AI Act high-risk systems.',
  },
];

const ORG_MODELS = [
  {
    model: 'Centralised AI CoE',
    desc: 'A single AI team serves the entire organisation. Business units submit use cases; the CoE delivers them.',
    when: 'Early-stage AI programs. Regulated industries. Organisations with <5 AI use cases.',
    pros: ['Deep expertise concentration', 'Consistent standards and tooling', 'Clear accountability'],
    cons: ['Bottleneck at scale', 'Risk of building AI "for" not "with" the business', 'Slow iteration'],
  },
  {
    model: 'Federated / Hub & Spoke',
    desc: 'A central AI platform team sets standards and provides shared infrastructure. Business units have embedded AI leads who execute locally.',
    when: 'Mid-to-large enterprises with multiple business units. Best model for scaling past 10+ use cases.',
    pros: ['Speed of local execution', 'Business context retained', 'Scales well'],
    cons: ['Governance coordination overhead', 'Risk of standards fragmentation', 'Harder to hire embedded roles'],
  },
  {
    model: 'Fully Embedded',
    desc: 'AI capability is fully distributed — engineers sit within product/functional teams. No central AI team.',
    when: 'Technology-native organisations with high digital maturity (Integrated or Optimised stage).',
    pros: ['Maximum agility', 'Fastest iteration', 'Strong business ownership'],
    cons: ['Risk of duplication and inconsistency', 'Hard to maintain shared standards', 'No single AI accountability point'],
  },
];

const TALENT_STRATEGIES = [
  {
    strategy: 'Hire directly',
    bestFor: 'Core ML Engineers and Data Engineers who will own long-term platform infrastructure',
    considerations: 'Competitive market. Expect 6–9 month time-to-hire for senior ML Engineers. Compensation benchmarks: £80k–£160k+ UK, $130k–$250k+ US for experienced roles.',
    risk: 'Slow to start. Knowledge is retained but building the team takes 12–18 months.',
  },
  {
    strategy: 'Upskill internal talent',
    bestFor: 'AI Product Managers from existing PM population. Data analysts moving to ML Engineering. Domain experts who become AI champions.',
    considerations: 'Takes 6–18 months to develop meaningful capability. Internal candidates retain institutional knowledge. Best for functional-specific AI roles, not core platform infrastructure.',
    risk: 'Not suitable for roles requiring deep ML expertise from scratch.',
  },
  {
    strategy: 'System integrator / consultancy',
    bestFor: 'First production AI system. Regulatory compliance programs. Specialist capabilities (LLMOps, security, enterprise integrations) where hiring is too slow.',
    considerations: 'Big 4 AI practices, specialist AI consultancies (Turing, Weights & Biases PS), hyperscaler professional services. High day rates (£2k–£10k+) justified by speed.',
    risk: 'Knowledge transfer risk. Knowledge stays with the consultant unless explicitly mitigated.',
  },
  {
    strategy: 'Managed AI / platform services',
    bestFor: 'Use cases well-served by SaaS AI (Copilot, Einstein, Salesforce AI). Organisations that want AI value without AI infrastructure.',
    considerations: 'Fastest path to value for standard use cases. Vendor dependency. Limited customisation. Data sovereignty considerations.',
    risk: 'Strategic dependency on vendor roadmap. Limited competitive differentiation.',
  },
];

const BUDGET_FRAMEWORK = [
  { category: 'Compute', typical: '30–50%', detail: 'GPU instances for training, inference serving infrastructure, and MLOps tooling compute. Largest cost driver at scale.' },
  { category: 'Talent',  typical: '25–40%', detail: 'Engineers, data scientists, AI PMs. The most fixed cost — and hardest to right-size quickly.' },
  { category: 'Data',    typical: '10–20%', detail: 'Data labelling (human-in-the-loop), data cleaning, licensing of external datasets, feature store infrastructure.' },
  { category: 'Tooling', typical: '5–15%',  detail: 'MLOps platforms (W&B, MLflow enterprise), observability tools, experiment tracking, model registries.' },
  { category: 'Governance & Compliance', typical: '5–10%', detail: 'Legal review, regulatory assessments, audit tooling, model risk management activities. Often under-budgeted.' },
];

export default function EntDevTeam() {
  return (
    <PageWrapper
      badge="Enterprise AI Development · Page 28"
      title="Building the Enterprise AI Engineering Team"
      subtitle="The people, structures, and economic models behind enterprise AI capability — grounded in what consistently works across organisations at different stages of digital maturity."
      sections={SECTIONS}
    >
      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">The Digital Maturity Prerequisite</h2>
        <p className="text-slate-500 text-sm mb-2">Before investing in an AI engineering team, enterprises must understand their digital maturity level — it determines which AI capabilities are feasible and where to start.</p>
        <p className="text-xs text-slate-400 mb-6">Source: Whatfix Digital Maturity Model, 2025–26 edition</p>
        <div className="space-y-3">
          {DIGITAL_MATURITY_STAGES.map((s, i) => (
            <div key={s.stage} className="card overflow-hidden py-0 px-0">
              <div className={`px-4 py-2 flex items-center gap-3 ${s.color}`}>
                <span className="text-xs font-bold opacity-60">{i + 1}</span>
                <span className="font-bold text-sm">{s.stage}</span>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-slate-600 mb-2">{s.desc}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <p className="text-xs"><span className="font-semibold text-slate-700">AI readiness: </span><span className="text-slate-500">{s.ai_readiness}</span></p>
                  <p className="text-xs"><span className="font-semibold text-blue-700">Priority investment: </span><span className="text-slate-500">{s.priority}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">Core Roles in an AI Engineering Team</h2>
        <p className="text-slate-500 text-sm mb-6">The six roles that appear in every mature enterprise AI team — with the hiring sequence that works in practice (data before models, platform before scale).</p>
        <div className="space-y-4">
          {CORE_ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.role} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`p-2.5 rounded-xl ${r.iconBg} flex-shrink-0`}>
                    <Icon size={18} className={r.iconColor} />
                  </span>
                  <div>
                    <p className="font-bold text-slate-800">{r.role}</p>
                    <p className="text-xs text-slate-400">{r.ratio}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">{r.primary}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.skills.map(s => (
                    <span key={s} className="text-xs bg-slate-100 text-slate-600 rounded-md px-2 py-0.5">{s}</span>
                  ))}
                </div>
                <p className="text-xs bg-blue-50 border border-blue-100 text-blue-700 rounded-lg px-3 py-2"><strong>When to hire: </strong>{r.where}</p>
              </div>
            );
          })}
        </div>
        <div className="card bg-slate-50 border-slate-200 mt-4">
          <p className="text-sm font-semibold text-slate-800 mb-2">Recommended hiring sequence</p>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {['Data Engineer', '→', 'ML Engineer', '→', 'AI Product Manager', '→', 'MLOps Engineer', '→', 'AI Governance Analyst', '→', 'ML Scientist'].map((s, i) => (
              <span key={i} className={s === '→' ? 'text-slate-300 text-base' : 'badge bg-blue-100 text-blue-700'}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Structuring the AI Organisation</h2>
        <p className="text-slate-500 text-sm mb-6">Three dominant AI organisational models. Most enterprises start with centralised and migrate toward federated as they scale past 10+ use cases.</p>
        <div className="space-y-4">
          {ORG_MODELS.map(m => (
            <div key={m.model} className="card">
              <p className="font-bold text-slate-800 mb-1">{m.model}</p>
              <p className="text-xs text-slate-500 mb-3">{m.desc}</p>
              <p className="text-xs bg-blue-50 text-blue-700 rounded-lg px-3 py-1.5 mb-3"><strong>Best when: </strong>{m.when}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 mb-1">Strengths</p>
                  <ul className="space-y-1">{m.pros.map((p, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0 mt-0.5" />{p}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 mb-1">Trade-offs</p>
                  <ul className="space-y-1">{m.cons.map((c, i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-red-400 flex-shrink-0">—</span>{c}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Build vs Buy vs Partner: Talent</h2>
        <p className="text-slate-500 text-sm mb-6">The same three-way decision that applies to AI technology applies to AI talent. Most enterprises use a blend.</p>
        <div className="space-y-3">
          {TALENT_STRATEGIES.map(t => (
            <div key={t.strategy} className="card">
              <p className="font-bold text-slate-800 text-sm mb-1">{t.strategy}</p>
              <p className="text-xs text-blue-700 mb-2"><strong>Best for:</strong> {t.bestFor}</p>
              <p className="text-xs text-slate-500 mb-2 leading-relaxed">{t.considerations}</p>
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5"><strong>Risk:</strong> {t.risk}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Budget Framework & ROI Tracking</h2>
        <p className="text-slate-500 text-sm mb-6">How the AI development budget typically distributes across cost categories — and how to track return against investment.</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Category</th>
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Typical Share</th>
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">What it covers</th>
              </tr>
            </thead>
            <tbody>
              {BUDGET_FRAMEWORK.map((b, i) => (
                <tr key={b.category} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 font-semibold text-slate-800">{b.category}</td>
                  <td className="p-3 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-700 w-14">{b.typical}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: b.typical.split('–')[1] || b.typical }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-slate-200 text-xs text-slate-500">{b.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card text-sm">
          <p className="font-semibold text-slate-800 mb-2">ROI tracking for the AI engineering team</p>
          <div className="space-y-2">
            {[
              { metric: 'Models in production',       desc: 'Total number of AI models or automations running in production environments — the primary output measure of the AI factory.' },
              { metric: 'Time to production',         desc: 'Average calendar weeks from use case kick-off to first production deployment. Target: under 12 weeks for a well-run team.' },
              { metric: 'Model uptime & reliability', desc: 'Percentage of inference requests served successfully. Target: >99.5% for business-critical models.' },
              { metric: 'Business value attributed',  desc: 'Aggregate annual value from AI use cases — hours saved, revenue influenced, cost reduced — mapped to specific model outputs.' },
              { metric: 'Cost per inference',         desc: 'Total inference compute cost ÷ number of predictions. Tracks efficiency of the serving layer over time.' },
            ].map(r => (
              <div key={r.metric} className="flex gap-3 items-start text-xs">
                <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold text-slate-800">{r.metric}: </span><span className="text-slate-500">{r.desc}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
