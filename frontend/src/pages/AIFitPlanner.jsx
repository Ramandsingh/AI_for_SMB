import { useState } from 'react';
import { BarChart2, Users, Zap, ShieldAlert, GitMerge, FileCheck, ChevronDown, ChevronUp, CheckCircle2, ArrowRight, BookOpen, Wrench, Target, Clock } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'The Three Organisational Pillars', level: 2 },
  { id: 's2', title: 'What Do You Want AI To Do?',       level: 2 },
  { id: 's3', title: 'Your Next Step',                   level: 2 },
];

const PILLARS = [
  {
    icon: BookOpen,
    label: 'Policies',
    color: 'border-l-blue-500',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    question: 'When and how is AI allowed to be used?',
    what: 'A written policy that defines acceptable and prohibited AI use — for employees, contractors, and third parties. Without one, every person in your organisation is making their own judgment about what data can go into an AI tool, which outputs can be used without review, and when a customer must be told they are interacting with AI.',
    covers: [
      'Data classification: what data may be entered into which AI tools (public, internal, confidential, regulated)',
      'Prohibited uses: personal data of EU residents into consumer AI tools; regulated outputs without human review',
      'Disclosure: when customers and employees must be informed they are interacting with AI',
      'Output verification: which AI outputs require human review before acting on them',
      'Incident reporting: what to do when an AI system produces harmful, incorrect, or discriminatory output',
    ],
    gap: 'Without a policy, a single employee uploading a customer database to ChatGPT creates a data breach you are responsible for. Most enterprises discover they need a policy because of an incident, not before one.',
    action: 'Draft your AI acceptable use policy before your next AI tool is deployed. It takes one week. An incident costs one year.',
  },
  {
    icon: CheckCircle2,
    label: 'Standards',
    color: 'border-l-emerald-500',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    question: 'Which AI tools are approved, for what purpose?',
    what: 'An approved tool register that maps specific AI products to permitted use cases, data types, and user roles. This removes ambiguity — staff do not need to ask whether they can use a tool; they can look it up. It also creates a procurement and security baseline: every approved tool has been reviewed for data handling, security, and contractual obligations.',
    covers: [
      'Tool catalogue: Microsoft 365 Copilot for productivity, GitHub Copilot for development, approved LLM APIs for internal tools',
      'Permitted use per tool: what types of work each tool is approved for and which data classifications may be used',
      'Prohibited combinations: which tools must not receive which categories of data (e.g., no customer PII in consumer AI tools)',
      'Approval process: how employees request a new AI tool, and who reviews and approves it',
      'Review cadence: how often the approved list is updated as the market evolves',
    ],
    gap: 'Without standards, you have a shadow AI problem: staff using unapproved tools with company data, invisible to IT and legal. This is already happening in most organisations.',
    action: 'Publish an approved AI tool list this quarter. Include at least one approved tool per major job family — or people will find their own.',
  },
  {
    icon: Wrench,
    label: 'Implementation',
    color: 'border-l-purple-500',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    question: 'Has the organisation actually provided tools and training?',
    what: 'Policy and standards are worthless if staff do not have access to approved AI tools and the training to use them effectively. Implementation means the organisation takes responsibility for provisioning, configuration, and capability development — not leaving each employee to find and learn AI tools on their own.',
    covers: [
      'Provisioning: approved AI tools deployed to appropriate users with correct licences and access controls',
      'Configuration: tools configured with data loss prevention, audit logging, and approved model versions',
      'Executive training: AI literacy for leaders — how to set strategy, evaluate AI programs, govern risk',
      'Manager training: how to redesign team workflows around AI, how to evaluate AI outputs, how to lead adoption',
      'Staff training: role-specific AI fluency — how to use approved tools for their specific job tasks',
      'Technical training: AI engineering capability for teams building or deploying AI systems',
    ],
    gap: 'Organisations that deploy AI tools without training see 20–30% adoption rates. Organisations that run structured training programs see 70–80% active daily use within 90 days.',
    action: 'Treat AI training as infrastructure, not a one-off event. Schedule quarterly AI capability updates alongside tool deployments.',
  },
];

const GOALS = [
  {
    id: 'data',
    icon: BarChart2,
    label: 'Analyse data to find greater business opportunities',
    tagline: 'Turn your existing data into competitive intelligence and decisions you were previously too slow to make.',
    color: 'border-l-blue-400',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    approach: 'Predictive analytics and LLM-powered business intelligence. AI analyses patterns across your CRM, ERP, and operational data to surface opportunities — customer segments you are under-serving, products with unmet demand, pricing anomalies, and churn signals before they become revenue loss.',
    tools: [
      { name: 'Microsoft Copilot for Power BI', use: 'Natural language queries on your existing data — no SQL required' },
      { name: 'Databricks + MLflow', use: 'ML models on large structured datasets: customer segmentation, demand forecasting, churn prediction' },
      { name: 'OpenAI API / Claude API', use: 'LLM synthesis of unstructured data — call recordings, support tickets, survey responses — into business insight' },
      { name: 'Tableau AI / Looker', use: 'AI-assisted dashboard creation and automated narrative summaries of data trends' },
    ],
    metrics: [
      'Revenue opportunities identified and actioned per quarter',
      'Decision latency: time from data available to decision made',
      'Forecast accuracy: predicted vs actual for key business metrics',
    ],
    start90: 'Pick one revenue or cost metric your leadership team wishes they understood better. Connect the relevant data source to a BI tool with AI features. Run a 30-day pilot asking it one business question per week. Review the quality of answers. You will have a business case within 60 days.',
    readiness: ['You have clean, accessible data in at least one system (CRM, ERP, finance)', 'A business owner who will act on the insights AI surfaces — not just receive them', 'A willingness to let AI surface findings that may challenge current assumptions'],
  },
  {
    id: 'efficiency',
    icon: Users,
    label: 'Make staff more efficient and improve work-life balance',
    tagline: 'Give every employee more time for the work that actually matters — by removing the work that does not.',
    color: 'border-l-emerald-400',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    approach: 'LLM productivity tools that augment knowledge work: drafting, summarising, researching, formatting, and communicating. These tools do not replace judgment — they eliminate the low-value tasks that consume 30–40% of a knowledge worker\'s day, freeing them for the higher-value work they were hired to do.',
    tools: [
      { name: 'Microsoft 365 Copilot', use: 'AI across Word, Excel, PowerPoint, Outlook, Teams — drafts documents, summarises meetings, answers questions about your files' },
      { name: 'Google Workspace Duet AI', use: 'Same capability for Google Workspace users — Docs, Sheets, Slides, Gmail, Meet' },
      { name: 'Notion AI', use: 'Knowledge base, notes, and project management with AI writing and summarisation built in' },
      { name: 'Otter.ai / Fireflies', use: 'Automatic meeting transcription, summary, and action item extraction — eliminates manual note-taking' },
    ],
    metrics: [
      'Time saved per task type (benchmark before AI, measure after at 30 and 90 days)',
      'Employee satisfaction and engagement scores (AI users vs. non-users)',
      'Output per FTE: documents produced, decisions made, cases resolved per person per week',
    ],
    start90: 'Pilot Microsoft 365 Copilot or Google Duet AI with one team of 10–20 people. Measure time spent on the top 5 recurring tasks (email, meeting prep, report writing, data lookup, document review) in week 1. Measure again in week 8. The delta is your business case for broader rollout.',
    readiness: ['Microsoft 365 E3/E5 or Google Workspace Business licence (Copilot requires E3 minimum)', 'A team willing to genuinely change how they work — not just use a new tool on top of old habits', 'Manager commitment to redesign workflows, not just add AI to existing ones'],
  },
  {
    id: 'automate',
    icon: Zap,
    label: 'Automate simple and repetitive tasks',
    tagline: 'Remove the tasks your staff hate most — the ones that are high-volume, rule-based, and error-prone.',
    color: 'border-l-amber-400',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    approach: 'Intelligent process automation: RPA (Robotic Process Automation) combined with AI to handle tasks that involve unstructured inputs — invoices, forms, emails, documents. Pure RPA handles rigid, rule-based tasks. AI-enhanced RPA handles tasks where the input varies (different invoice layouts, free-text emails, handwritten forms).',
    tools: [
      { name: 'Microsoft Power Automate', use: 'Workflow automation across Microsoft 365 and connected apps — triggered by email, form submission, calendar events' },
      { name: 'UiPath', use: 'Enterprise RPA with AI document understanding — reads and extracts data from invoices, contracts, and forms regardless of layout' },
      { name: 'Zapier + AI actions', use: 'No-code automation between 5,000+ apps with AI steps built in — fastest way to automate simple multi-tool workflows' },
      { name: 'Azure Logic Apps', use: 'Enterprise-grade workflow automation with AI service integration — suitable for regulated industries requiring audit trails' },
    ],
    metrics: [
      'Process cycle time: end-to-end time for the automated process before and after',
      'Error rate: number of errors or exceptions per 1,000 transactions',
      'FTE hours redirected: hours previously spent on the task, now available for higher-value work',
    ],
    start90: 'List your top 10 highest-volume repetitive tasks across the organisation. Score each by volume (transactions/month), error rate, and staff frustration. Pick the top-scoring task. Map the process in detail. Build a Power Automate or UiPath pilot in 30 days. Measure cycle time and error rate in week 8.',
    readiness: ['A clear process map for the tasks you want to automate — automation amplifies process quality, not compensates for process chaos', 'IT permission to connect automation tools to your core systems', 'A process owner who will monitor the automation and handle exceptions'],
  },
  {
    id: 'fraud',
    icon: ShieldAlert,
    label: 'Hunt for fraud, risk, or compliance issues',
    tagline: 'Find what your human reviewers cannot — patterns that emerge across millions of transactions or documents.',
    color: 'border-l-red-400',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    approach: 'ML anomaly detection and pattern recognition on transaction, behavioural, and document data. AI does not replace human investigators — it triages the signal from the noise, surfacing the 0.1% of cases worth human attention from the 99.9% that are clean. False positive rates drop as the model learns from investigator feedback.',
    tools: [
      { name: 'Azure AI Fraud Protection', use: 'Real-time transaction scoring for payment fraud, account takeover, and abuse — connects to existing payment infrastructure' },
      { name: 'Darktrace', use: 'Network and user behaviour analytics for cybersecurity fraud — AI baseline of normal behaviour, alert on deviation' },
      { name: 'SAS Fraud Management', use: 'Enterprise fraud detection across financial services use cases — insurance, banking, claims' },
      { name: 'Custom ML (scikit-learn / XGBoost)', use: 'Build your own anomaly detection model on proprietary transaction data — highest accuracy for domain-specific fraud patterns' },
    ],
    metrics: [
      'Fraud catch rate: percentage of actual fraud events detected before loss',
      'False positive rate: percentage of legitimate transactions flagged (lower = better)',
      'Time to detect: average time from fraud event to detection and action',
    ],
    start90: 'Establish your baseline fraud rate across your highest-risk process — payment processing, expense claims, supplier invoices, or access requests. This number almost certainly does not exist yet. Build it first. Then label historical fraud cases. This labelled dataset is what trains your detection model. Without it, no AI tool can help you.',
    readiness: ['Historical transaction data with known fraud cases labelled (minimum 12 months, ideally 36)', 'A fraud operations team who will investigate AI-surfaced alerts — the model finds, humans decide', 'Tolerance for a 4–8 week model training period before production-quality detection'],
  },
  {
    id: 'optimise',
    icon: GitMerge,
    label: 'Optimise business processes end to end',
    tagline: 'Find the bottlenecks, inefficiencies, and waste in your operations that are invisible to the people inside them.',
    color: 'border-l-purple-400',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    approach: 'Process mining extracts the actual process — not the intended process — from your system event logs. It maps every path a case (order, claim, application) takes through your systems, finds where it stalls, loops, or deviates, and quantifies the cost. AI then recommends process redesign options and simulates the impact of changes before you implement them.',
    tools: [
      { name: 'Celonis', use: 'Enterprise process mining leader — connects to SAP, Salesforce, ServiceNow and maps actual process execution vs. intended design' },
      { name: 'UiPath Process Mining', use: 'Process mining integrated with RPA automation — identifies the process, then automates the fix in the same platform' },
      { name: 'Microsoft Process Advisor', use: 'Lighter-weight process mining built into Power Automate — suitable for teams already on Microsoft stack' },
      { name: 'IBM Process Mining', use: 'Enterprise process mining with simulation capability — model the impact of process changes before committing resources' },
    ],
    metrics: [
      'Process cycle time: end-to-end time for the target process, before and after optimisation',
      'Bottleneck frequency: how often and how long cases wait at each process step',
      'Process conformance: percentage of cases that follow the intended process path vs. deviate',
    ],
    start90: 'Connect Celonis or Microsoft Process Advisor to your highest-cost process system — order-to-cash, procure-to-pay, or incident-to-resolution. Let it run for 30 days without changing anything. The process map it produces will show you bottlenecks your operations team has been managing around for years without knowing their cost.',
    readiness: ['System event logs for the target process (most ERP and CRM systems generate these automatically)', 'A process owner with authority to act on findings — process mining that produces insights but no action is waste', 'Executive appetite to see what the process actually does, not what you believe it does'],
  },
  {
    id: 'validate',
    icon: FileCheck,
    label: 'Validate forms, improve data quality, reduce rework',
    tagline: 'Catch errors at the point of entry — before they become expensive downstream problems.',
    color: 'border-l-slate-400',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    approach: 'AI-powered data validation combines NLP (to understand the meaning and context of form inputs, not just the format), OCR (to extract data from uploaded documents), and ML classification (to flag inputs that are inconsistent, incomplete, or likely incorrect). Applied at submission, it reduces rework, downstream errors, and the manual review burden on operations teams.',
    tools: [
      { name: 'Azure AI Document Intelligence', use: 'Extract structured data from uploaded PDFs, images, and scanned documents — invoices, IDs, certificates, forms' },
      { name: 'Google Document AI', use: 'Same capability on Google Cloud — specialised pre-built models for common document types, custom models for proprietary forms' },
      { name: 'AWS Textract', use: 'OCR and form data extraction on AWS infrastructure — integrates with existing AWS workflows' },
      { name: 'Custom NLP validation', use: 'Build validation rules using NLP to check that free-text inputs are coherent, complete, and consistent with other fields' },
    ],
    metrics: [
      'Data quality score: percentage of submitted records that pass all validation checks on first submission',
      'Rework rate: percentage of submissions requiring correction after initial processing',
      'Manual review rate: percentage of submissions escalated for human review (AI handles the rest)',
    ],
    start90: 'Identify your highest-volume form or data entry point. Measure its current first-submission accuracy rate — the percentage of forms that pass validation without correction or rework. This number is almost always lower than people expect (typically 60–75% for manual entry, 40–60% for OCR without AI validation). Build AI validation for the top 5 error types first.',
    readiness: ['A clear definition of what "valid" means for each field — AI validates against rules you define', 'Historical form data labelled with error types — this trains the validation model', 'A downstream process owner who experiences the rework — they are your champion for this project'],
  },
];

export default function AIFitPlanner() {
  const [openGoals, setOpenGoals] = useState(new Set());
  const [openPillars, setOpenPillars] = useState(new Set());

  function toggleGoal(id) {
    setOpenGoals(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function togglePillar(label) {
    setOpenPillars(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  const selectedGoals = GOALS.filter(g => openGoals.has(g.id));

  return (
    <PageWrapper
      badge="Planning"
      title="How Does AI Fit Into This?"
      subtitle="Before selecting tools or writing a business case, two questions define your AI strategy: how is AI governed in your organisation, and what do you actually want it to do?"
      sections={SECTIONS}
    >
      <div className="card bg-blue-50 border-blue-200 mb-8">
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Most AI programs fail before they start</strong> — not because the technology doesn't work, but because the organisation has not answered these two questions first. Use this page to map your governance foundations and your specific AI goals, then follow the tailored guidance for each.
        </p>
      </div>

      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">The Three Organisational Pillars</h2>
        <p className="text-slate-500 text-sm mb-6">Every organisation deploying AI needs these three foundations. Click each pillar to see what it covers, what the gap looks like without it, and what action to take.</p>

        <div className="space-y-3">
          {PILLARS.map((p) => {
            const PIcon = p.icon;
            const isOpen = openPillars.has(p.label);
            return (
              <div key={p.label} className={`card border-l-4 ${p.color} transition-all duration-150`}>
                <button
                  onClick={() => togglePillar(p.label)}
                  className="w-full flex items-center gap-3 cursor-pointer text-left"
                >
                  <span className={`p-2.5 rounded-xl flex-shrink-0 ${p.iconBg}`}>
                    <PIcon size={18} className={p.iconColor} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800">{p.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{p.question}</p>
                  </div>
                  {isOpen
                    ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" />
                    : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                  }
                </button>

                {isOpen && (
                  <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-600 leading-relaxed">{p.what}</p>

                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">What it covers</p>
                      <ul className="space-y-1.5">
                        {p.covers.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <ArrowRight size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />{c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
                      <span className="text-amber-500 font-bold text-xs flex-shrink-0 mt-0.5">Gap:</span>
                      <p className="text-xs text-amber-800">{p.gap}</p>
                    </div>

                    <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
                      <Target size={13} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-800"><strong>Action:</strong> {p.action}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">What Do You Want AI To Do?</h2>
        <p className="text-slate-500 text-sm mb-6">
          Select the goals that match your organisation's priorities. Each one opens with an AI approach, recommended tools, what to measure, and a specific 90-day starting point.
          {openGoals.size > 0 && (
            <span className="ml-2 text-blue-600 font-semibold">{openGoals.size} goal{openGoals.size > 1 ? 's' : ''} selected.</span>
          )}
        </p>

        <div className="space-y-3">
          {GOALS.map((g) => {
            const GIcon = g.icon;
            const isOpen = openGoals.has(g.id);
            return (
              <div
                key={g.id}
                className={`card border-l-4 ${g.color} transition-all duration-150 ${isOpen ? 'ring-2 ring-blue-100' : ''}`}
              >
                <button
                  onClick={() => toggleGoal(g.id)}
                  className="w-full flex items-center gap-3 cursor-pointer text-left"
                >
                  <span className={`p-2.5 rounded-xl flex-shrink-0 ${g.iconBg}`}>
                    <GIcon size={18} className={g.iconColor} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800">{g.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{g.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isOpen && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Selected</span>
                    )}
                    {isOpen
                      ? <ChevronUp size={16} className="text-slate-400" />
                      : <ChevronDown size={16} className="text-slate-400" />
                    }
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 space-y-5 border-t border-slate-100 pt-4">
                    {/* Approach */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AI approach</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{g.approach}</p>
                    </div>

                    {/* Tools */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommended tools</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {g.tools.map(t => (
                          <div key={t.name} className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                            <p className="text-xs font-semibold text-slate-800 mb-0.5">{t.name}</p>
                            <p className="text-xs text-slate-500">{t.use}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What to measure</p>
                      <div className="space-y-1.5">
                        {g.metrics.map((m, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <BarChart2 size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />{m}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Readiness */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What you need first</p>
                      <div className="space-y-1.5">
                        {g.readiness.map((r, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />{r}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 90-day start */}
                    <div className="bg-blue-900 text-white rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={13} className="text-blue-300" />
                        <p className="text-xs font-bold text-blue-300 uppercase tracking-wider">Your 90-day starting point</p>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{g.start90}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Your Next Step</h2>

        {selectedGoals.length === 0 ? (
          <div className="card bg-slate-50 border-slate-200 text-center py-8">
            <p className="text-slate-500 text-sm mb-2">Select your AI goals above to see a personalised summary here.</p>
            <p className="text-xs text-slate-400">You can select as many as apply — most organisations start with 1–2 goals in year one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="card bg-blue-50 border-blue-200">
              <p className="text-sm text-blue-800 mb-3">
                <strong>You have selected {selectedGoals.length} AI goal{selectedGoals.length > 1 ? 's' : ''}.</strong> Before starting on any of them, make sure the three pillars are in place. Then tackle goals in order of readiness — start where you already have the data, the process owner, and executive support.
              </p>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-800 mb-3">Your selected priorities</p>
              <div className="space-y-2">
                {selectedGoals.map((g, i) => {
                  const GIcon = g.icon;
                  return (
                    <div key={g.id} className={`flex items-center gap-3 rounded-xl border-l-4 ${g.color} bg-slate-50 px-3 py-2.5`}>
                      <span className="text-sm font-bold text-slate-400 font-mono w-5">{i + 1}</span>
                      <span className={`p-1.5 rounded-lg ${g.iconBg} flex-shrink-0`}>
                        <GIcon size={14} className={g.iconColor} />
                      </span>
                      <p className="text-sm font-semibold text-slate-700">{g.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-800 mb-3">The sequence that works</p>
              <div className="space-y-2">
                {[
                  { step: '1', label: 'Governance first', detail: 'Establish your acceptable use policy and approved tool list before any AI tool is deployed.' },
                  { step: '2', label: 'Pick one goal, one team', detail: 'Start with the goal where you have the best data, the strongest process owner, and executive support. Depth over breadth.' },
                  { step: '3', label: 'Measure from day one', detail: 'Baseline your chosen business metric before the AI tool is deployed. Without a baseline, you cannot prove value.' },
                  { step: '4', label: 'Train before you deploy', detail: 'Role-specific training for the pilot team before the tool goes live. Adoption rate drops 50% when training comes after deployment.' },
                  { step: '5', label: 'Review at 30, 60, 90 days', detail: 'Structured reviews with the business owner. If the metric is not moving by day 60, diagnose before you scale.' },
                ].map(s => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{s.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                      <p className="text-xs text-slate-500">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
