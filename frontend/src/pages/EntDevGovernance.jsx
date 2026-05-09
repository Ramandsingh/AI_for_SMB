import { Shield, AlertTriangle, FileText, CheckCircle2, XCircle, Scale } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Why Governance Is Infrastructure',     level: 2 },
  { id: 's2', title: 'OECD AI Principles',                  level: 2 },
  { id: 's3', title: 'EU AI Act Risk Classification',       level: 2 },
  { id: 's4', title: 'Model Risk Management',               level: 2 },
  { id: 's5', title: 'Enterprise AI Policy Framework',      level: 2 },
];

const OECD_PRINCIPLES = [
  {
    principle: '1. Inclusive growth, sustainable development, and well-being',
    detail: 'AI should benefit people and planet broadly. Enterprises must assess whether AI deployments create or exacerbate inequality — in workforce displacement, access to services, or environmental impact from compute.',
    enterprise: 'Workforce impact assessments before deploying automation. Environmental reporting for AI compute. Algorithmic fairness audits in hiring, lending, and credit decisions.',
  },
  {
    principle: '2. Human-centred values and fairness',
    detail: 'AI systems must respect the rule of law, human rights, democratic values, and diversity. AI outputs must be contestable — humans must be able to challenge automated decisions.',
    enterprise: 'Every high-stakes AI decision must have a human override path. Bias testing across demographic groups for any model touching people decisions. Documentation of protected attributes and model behaviour on subgroups.',
  },
  {
    principle: '3. Transparency and explainability',
    detail: 'People interacting with AI systems must know they are doing so, and must be able to understand how AI-influenced decisions affecting them were made.',
    enterprise: 'Disclose when customers interact with AI. Maintain model cards documenting training data, performance, and limitations. Implement explainability tools (SHAP, LIME) for decisions about credit, employment, or insurance.',
  },
  {
    principle: '4. Robustness, security, and safety',
    detail: 'AI systems should function correctly under expected and adversarial conditions, and fail safely. Security measures must guard against adversarial attacks and data poisoning.',
    enterprise: 'Red-teaming for LLMs before production deployment. Adversarial robustness testing. Prompt injection defences. Fallback mechanisms when confidence thresholds are not met. Drift monitoring to detect silent degradation.',
  },
  {
    principle: '5. Accountability',
    detail: 'AI actors — developers, deployers, operators — are accountable for the outcomes of AI systems they design or deploy. Responsibility is not transferred to the AI.',
    enterprise: 'Named model owners for every production AI system. Audit trails linking predictions to the model version, training data snapshot, and inference timestamp. Board-level AI risk reporting for material deployments.',
  },
];

const EU_AI_RISK_TIERS = [
  {
    tier: 'Unacceptable Risk',
    color: 'bg-red-700 text-white',
    borderColor: 'border-red-600',
    banned: true,
    desc: 'Prohibited by the EU AI Act. These systems are banned outright.',
    examples: [
      'Biometric categorisation based on sensitive attributes (race, political opinion)',
      'Real-time remote biometric identification in public spaces (with narrow exceptions)',
      'Social scoring by governments',
      'Manipulative AI that exploits psychological vulnerabilities',
      'AI for predictive policing of individuals',
    ],
    enterprise: 'These applications are entirely prohibited. Enterprise counsel must ensure no use case falls into this category before any AI project is approved.',
  },
  {
    tier: 'High Risk',
    color: 'bg-red-100 text-red-800',
    borderColor: 'border-red-300',
    banned: false,
    desc: 'Permitted but subject to mandatory conformity assessment, registration, and ongoing monitoring.',
    examples: [
      'AI in recruitment and HR decisions (CV screening, performance management)',
      'Credit scoring and insurance pricing',
      'AI in education and vocational training',
      'Medical devices and diagnostics',
      'Critical infrastructure management',
      'Law enforcement and judicial applications',
    ],
    enterprise: 'Must register in the EU AI Act database. Requires technical documentation, human oversight mechanisms, logging, accuracy testing, cybersecurity measures, and regular audits.',
  },
  {
    tier: 'Limited Risk',
    color: 'bg-amber-100 text-amber-800',
    borderColor: 'border-amber-300',
    banned: false,
    desc: 'Permitted with transparency obligations only.',
    examples: [
      'Chatbots and virtual assistants (must disclose they are AI)',
      'AI-generated content (must be labelled)',
      'Emotion recognition systems (disclosure required)',
    ],
    enterprise: 'Disclose AI interaction to users. Watermark or label AI-generated content. Light compliance burden but legal requirement.',
  },
  {
    tier: 'Minimal Risk',
    color: 'bg-emerald-100 text-emerald-800',
    borderColor: 'border-emerald-300',
    banned: false,
    desc: 'Permitted with no mandatory obligations under the Act. Covers the vast majority of enterprise AI use cases.',
    examples: [
      'AI-enabled spam filters',
      'Recommendation systems for content',
      'Inventory optimisation and demand forecasting',
      'Internal productivity tools',
    ],
    enterprise: 'No mandatory regulatory requirements. Best practice frameworks and internal governance policies still apply.',
  },
];

const MRM_COMPONENTS = [
  {
    component: 'Model Inventory',
    detail: 'A centralised register of every AI model in production: name, version, owner, use case, data sources, performance metrics, risk tier, and deployment date. The foundation of enterprise model governance.',
    tools: 'MLflow Model Registry, Azure AI Foundry Model Catalog, custom CMDB entries',
  },
  {
    component: 'Pre-Deployment Validation',
    detail: 'Structured validation gates that a model must pass before production deployment: performance on held-out data, bias and fairness testing, adversarial robustness, and business metric alignment. Documented, signed off by model owner and risk function.',
    tools: 'Model cards, evaluation frameworks (Azure AI Foundry Evaluations, Great Expectations, custom test suites)',
  },
  {
    component: 'Ongoing Monitoring',
    detail: 'Continuous measurement of model performance in production. Data drift detection (input distribution shift), concept drift detection (prediction quality degradation), and business metric tracking. Automated alerts when thresholds are breached.',
    tools: 'WhyLabs, Evidently AI, Arize AI, Azure Monitor, SageMaker Model Monitor',
  },
  {
    component: 'Model Lineage & Audit Trail',
    detail: 'For every prediction made by a production model: what input data was used, which model version made the decision, what the output was, and when. Required for regulatory compliance in finance, healthcare, and insurance.',
    tools: 'OpenLineage, MLflow Tracking, cloud-native logging (CloudTrail, Azure Monitor Logs)',
  },
  {
    component: 'Periodic Re-validation',
    detail: 'Scheduled review of every model at minimum annually, or triggered by material change in business context, data distribution, or regulatory requirement. Follows the same validation process as initial deployment.',
    tools: 'Model governance calendar, risk committee review, documented sign-off workflow',
  },
];

const POLICY_ELEMENTS = [
  { element: 'Acceptable Use Policy',    desc: 'Defines permitted and prohibited uses of AI within the organisation. Explicitly bans high-risk EU AI Act applications. Governs employee use of external AI tools (ChatGPT, Copilot, third-party APIs).' },
  { element: 'Data Classification for AI', desc: 'Defines which data categories may be used to train or fine-tune AI models, and which may be passed to external API providers. Typically: public, internal, confidential, regulated.' },
  { element: 'Procurement Standards',   desc: 'Requirements for third-party AI vendors: data processing agreements, model cards, security certifications, bias testing documentation, right to audit.' },
  { element: 'AI Incident Response',    desc: 'Defined process for when an AI system produces harmful, incorrect, or discriminatory outputs at scale. Escalation path, investigation process, communication protocol, remediation timeline.' },
  { element: 'Employee Training',        desc: 'Mandatory AI literacy training covering acceptable use, data handling, bias recognition, and output verification. Role-specific training for model developers and AI product owners.' },
  { element: 'Board-Level Reporting',   desc: 'Quarterly AI risk report to board covering: active AI model inventory, material incidents, regulatory developments, and strategic AI risk posture. Aligns with emerging SEC and FCA disclosure expectations.' },
];

export default function EntDevGovernance() {
  return (
    <PageWrapper
      badge="Enterprise AI Development · Page 27"
      title="AI Governance & Risk Framework"
      subtitle="Governance is not a constraint on AI deployment — it is the infrastructure that makes sustainable, trustworthy AI deployment possible at scale. Enterprises that get this right move faster, not slower."
      sections={SECTIONS}
    >
      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Why Governance Is Infrastructure</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { stat: '$4.5M',   label: 'average cost of an AI-related data breach', source: 'IBM Security, 2024' },
            { stat: '€35M',    label: 'maximum fine for EU AI Act high-risk violations', source: 'EU AI Act, 2024' },
            { stat: '68%',     label: 'of executives say AI governance is a board-level priority', source: 'Deloitte, 2024' },
          ].map(s => (
            <div key={s.stat} className="card text-center">
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{s.stat}</p>
              <p className="text-xs text-slate-500 leading-tight mb-2">{s.label}</p>
              <p className="text-xs font-semibold text-slate-400">{s.source}</p>
            </div>
          ))}
        </div>
        <div className="card text-sm">
          <p className="font-semibold text-slate-800 mb-2">Governance as an accelerant</p>
          <p className="text-slate-600 leading-relaxed">Organisations with mature AI governance frameworks deploy more AI use cases, not fewer. Clear policies remove the ambiguity that causes teams to pause, escalate, or avoid AI altogether. Pre-approved risk tiers, established data use policies, and defined validation gates turn governance from a barrier into a fast lane — teams know what is in scope and can proceed without case-by-case approval.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">OECD AI Principles</h2>
        <p className="text-slate-500 text-sm mb-2">The OECD Principles on AI (2019, revised 2024) are the foundational international framework for responsible AI. Adopted by 46+ countries and referenced in most national AI regulatory frameworks including the EU AI Act.</p>
        <p className="text-xs text-slate-400 mb-6">Source: OECD.AI, OECD Principles on Artificial Intelligence, 2024 revision</p>
        <div className="space-y-4">
          {OECD_PRINCIPLES.map((p, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3 mb-2">
                <Scale size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-slate-800 text-sm">{p.principle}</p>
              </div>
              <p className="text-xs text-slate-500 mb-2 leading-relaxed pl-6">{p.detail}</p>
              <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 ml-6"><strong>Enterprise application:</strong> {p.enterprise}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">EU AI Act Risk Classification</h2>
        <p className="text-slate-500 text-sm mb-2">The EU AI Act (in force August 2024, phased compliance 2025–2027) classifies AI systems into four risk tiers with proportionate obligations. Applies to AI systems used in the EU, regardless of where the developer is based.</p>
        <p className="text-xs text-slate-400 mb-6">Note: Enterprises operating globally should also monitor the US Executive Order on AI, UK AI Safety Institute guidance, and emerging APAC frameworks which reference these tiers.</p>
        <div className="space-y-4">
          {EU_AI_RISK_TIERS.map(t => (
            <div key={t.tier} className={`card border-2 ${t.borderColor}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 ${t.color}`}>
                {t.banned ? <XCircle size={13} /> : <CheckCircle2 size={13} />}
                {t.tier}
              </div>
              <p className="text-xs text-slate-500 mb-3">{t.desc}</p>
              <div className="mb-3">
                <p className="text-xs font-semibold text-slate-700 mb-1">Example use cases</p>
                <ul className="space-y-1">
                  {t.examples.map((e, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start">
                      <span className="text-slate-300 flex-shrink-0 mt-0.5">→</span>{e}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2"><strong className="text-slate-700">Enterprise action: </strong>{t.enterprise}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Model Risk Management</h2>
        <p className="text-slate-500 text-sm mb-6">Model risk management (MRM) originated in financial services (SR 11-7 guidance) but its principles apply to any enterprise deploying consequential AI. The five components below constitute a complete MRM framework.</p>
        <div className="space-y-3">
          {MRM_COMPONENTS.map(m => (
            <div key={m.component} className="card">
              <div className="flex items-start gap-3">
                <FileText size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{m.component}</p>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">{m.detail}</p>
                  <p className="text-xs text-blue-600"><strong>Tools:</strong> {m.tools}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Enterprise AI Policy Framework</h2>
        <p className="text-slate-500 text-sm mb-6">The six policy elements every enterprise AI program needs in place before scaling beyond pilots.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {POLICY_ELEMENTS.map(p => (
            <div key={p.element} className="card">
              <div className="flex items-start gap-2 mb-2">
                <Shield size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-slate-800">{p.element}</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="card bg-blue-900 text-white border-0 mt-6">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">The governance maturity arc</p>
          <div className="space-y-2">
            {[
              { stage: 'Reactive',   desc: 'No formal policies. Teams make ad-hoc AI decisions. Risks managed after incidents.' },
              { stage: 'Defined',    desc: 'Acceptable use policy exists. Basic data classification in place. Informal model inventory.' },
              { stage: 'Managed',    desc: 'MRM framework operational. High-risk AI systems identified and validated. Board-level reporting.' },
              { stage: 'Optimised',  desc: 'Continuous monitoring. Automated compliance checks in CI/CD pipeline. Governance enables, not blocks, deployment.' },
            ].map(s => (
              <div key={s.stage} className="flex gap-3 items-start">
                <span className="text-xs font-bold text-blue-300 w-20 flex-shrink-0">{s.stage}</span>
                <span className="text-xs text-slate-300">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
