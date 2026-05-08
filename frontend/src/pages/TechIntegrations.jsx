import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Email & Calendar',           level: 2 },
  { id: 's2', title: 'CRM',                        level: 2 },
  { id: 's3', title: 'ERP',                        level: 2 },
  { id: 's4', title: 'WMS & Supply Chain',          level: 2 },
  { id: 's5', title: 'Messaging: WhatsApp & Teams', level: 2 },
  { id: 's6', title: 'Excel & Spreadsheets',        level: 2 },
  { id: 's7', title: 'Integration Patterns',        level: 2 },
];

// tech tags: which underlying technology does the capability use?
// LLM · ML · NLP · OCR · ASR · RAG · CV · RPA · Rules

const EMAIL = {
  platforms: ['Microsoft Outlook + Copilot', 'Gmail + Duet AI (Google Workspace)', 'Superhuman AI', 'Front AI'],
  capabilities: [
    { cap: 'Triage & Classification',  tech: ['NLP', 'ML'],  desc: 'An NLP classifier reads and categorises incoming email — urgent, FYI, action required, newsletter — so humans focus on what matters. No manual filing.' },
    { cap: 'Draft Reply Suggestions',  tech: ['LLM'],        desc: 'An LLM reads the email thread and generates a contextually appropriate draft reply. Human reviews and sends. Reduces reply time from 5 minutes to 30 seconds.' },
    { cap: 'Thread Summarisation',     tech: ['LLM'],        desc: 'A 40-email thread summarised to 5 bullet points in one click by an LLM. Critical for anyone rejoining a conversation or managing high-volume mailboxes.' },
    { cap: 'Follow-up Nudges',         tech: ['Rules', 'ML'],desc: 'A rules engine plus ML pattern detection identifies emails with no reply and flags them for follow-up. Reduces dropped balls in sales and service workflows.' },
    { cap: 'Meeting Scheduling',       tech: ['LLM', 'API'], desc: 'An LLM extracts scheduling intent from email text and calls the calendar API to handle back-and-forth. Intent detection powered by NLP; execution by a software bot.' },
    { cap: 'Sentiment Analysis',       tech: ['NLP'],        desc: 'An NLP sentiment model scores incoming customer emails for frustration, urgency, or churn risk — flagging high-priority items before a human reads them.' },
  ],
  integration: 'Native for Microsoft 365 Copilot (Outlook) and Google Workspace AI (Gmail). Third-party tools connect via Microsoft Graph API or Gmail API.',
};

const CRM = {
  platforms: ['Salesforce Einstein AI', 'HubSpot AI', 'Microsoft Dynamics 365 Copilot', 'Pipedrive AI'],
  capabilities: [
    { cap: 'Lead Scoring',             tech: ['ML'],         desc: 'An ML classification model scores leads on likelihood to convert — using firmographic data, behavioural signals, and historical win patterns. Reps focus on highest-probability leads.' },
    { cap: 'Deal Risk Prediction',     tech: ['ML'],         desc: 'An ML model flags deals at risk of slipping — based on activity patterns, days since last contact, and stakeholder engagement — so reps can intervene before deals go cold.' },
    { cap: 'Conversation Intelligence',tech: ['ASR', 'LLM'], desc: 'ASR (speech recognition) transcribes call recordings; an LLM extracts topics, objections, commitments, and next steps — then logs them automatically in the CRM.' },
    { cap: 'CRM Auto-population',      tech: ['ASR', 'LLM'], desc: 'ASR converts call audio to text; an LLM structures it into CRM fields and activity logs. Eliminates post-call manual data entry entirely.' },
    { cap: 'Next Best Action',         tech: ['ML'],         desc: 'An ML recommendation model suggests the optimal next action for each deal — follow-up email, pricing discussion, demo — based on deal stage, rep behaviour, and win patterns.' },
    { cap: 'Forecast Intelligence',    tech: ['ML'],         desc: 'ML time-series and regression models analyse pipeline history and current signals to produce more accurate revenue forecasts than rep-by-rep manual estimation.' },
  ],
  integration: 'Native ML/LLM in Salesforce (Einstein), HubSpot, and Dynamics. ASR-based conversation intelligence (Gong, Chorus, Clari) integrates via API and call recording.',
};

const ERP = {
  platforms: ['SAP S/4HANA with Joule', 'Oracle Fusion AI', 'Microsoft Dynamics 365', 'NetSuite AI'],
  capabilities: [
    { cap: 'Invoice Processing',       tech: ['OCR', 'ML'],  desc: 'OCR extracts text from any invoice format — PDF, scanned image, email — then an ML model classifies fields (vendor, amount, due date) and matches to the PO. No manual AP keying.' },
    { cap: 'Variance Commentary',      tech: ['LLM'],        desc: 'An LLM ingests actuals vs budget figures and generates plain-English management commentary explaining key variances — eliminating 2–4 hours of finance writing per close cycle.' },
    { cap: 'Demand Forecasting',       tech: ['ML'],         desc: 'ML time-series models improve ERP demand planning by incorporating external signals (weather, events, economic data) that traditional rules-based MRP ignores.' },
    { cap: 'Anomaly Detection',        tech: ['ML'],         desc: 'An unsupervised ML model monitors transactions for patterns consistent with fraud, errors, or policy violations — surfacing exceptions before they become problems.' },
    { cap: 'Procurement Optimisation', tech: ['ML'],         desc: 'ML models analyse purchase history, supplier performance, and market data to recommend preferred suppliers, optimal order quantities, and timing.' },
    { cap: 'Cash Flow Forecasting',    tech: ['ML'],         desc: 'ML regression models predict cash position 30–90 days out using AR/AP ageing, seasonality patterns, and current pipeline — more accurately than Excel-based models.' },
  ],
  integration: 'Native in SAP (Joule LLM layer), Oracle, and Dynamics. Middleware (MuleSoft, Boomi) connects third-party ML/OCR tools to ERP data via API or direct database.',
};

const WMS = {
  platforms: ['Manhattan Associates WMS', 'Blue Yonder (JDA)', 'SAP Extended Warehouse Management', 'Oracle WMS'],
  capabilities: [
    { cap: 'Slotting Optimisation',        tech: ['ML'],         desc: 'An ML optimisation model analyses order patterns and product velocity to continuously re-slot warehouse locations — reducing pick travel distance by 15–30%.' },
    { cap: 'Picking Route Optimisation',   tech: ['ML'],         desc: 'Combinatorial ML algorithms generate optimal pick paths for each order wave based on current inventory locations, aisle traffic, and picker starting position.' },
    { cap: 'Labour Forecasting',           tech: ['ML'],         desc: 'ML forecasting models predict daily labour requirements from order volumes, product mix, and historical productivity data — enabling accurate advance staffing.' },
    { cap: 'Inbound Processing',           tech: ['OCR', 'ML'],  desc: 'OCR reads delivery documentation (packing slips, BOLs); an ML matcher cross-references against open POs and generates putaway directives automatically.' },
    { cap: 'Exception Management',         tech: ['ML', 'Rules'],desc: 'An ML classifier identifies exceptions (damaged goods, overages, shortages) and a rules engine routes each to the appropriate resolution workflow — no manual triage.' },
    { cap: 'Demand-driven Replenishment',  tech: ['ML'],         desc: 'ML demand forecasts drive replenishment triggers — replacing static reorder points with dynamic signals that simultaneously reduce stockouts and overstock.' },
  ],
  integration: 'WMS connects to ERP via API or EDI. The ML/OCR layer sits on top of the existing WMS via the vendor\'s native AI product or a middleware integration layer.',
};

const MESSAGING = [
  {
    platform: 'WhatsApp Business',
    icon: '💬',
    uses: [
      'Customer service chatbot (LLM) — answers common queries 24/7 via WhatsApp without human agents',
      'Order status updates, delivery notifications, appointment confirmations via automated bot (Script/API)',
      'Lead qualification — an LLM chatbot asks screening questions and scores responses before handoff to a human',
      'Payment reminders via scheduled bot (Script) with LLM-generated personalised message text',
      'Internal operations in markets where WhatsApp is the primary business communication tool (APAC, LATAM, MENA)',
    ],
    tools: 'Twilio, MessageBird, WATI, 360dialog — connect WhatsApp Business API to LLM or scripted bot backends',
  },
  {
    platform: 'Microsoft Teams + Copilot',
    icon: '🟦',
    uses: [
      'Meeting transcription (ASR) and summarisation (LLM) — action items extracted and distributed automatically',
      'LLM-generated meeting recaps sent to all participants within minutes of call ending',
      '"Catch me up" — LLM summarises missed channel messages and meeting transcripts in natural language',
      'In-meeting co-pilot (LLM + RAG): surfaces relevant documents and past decisions during live calls',
      'Teams bots (LLM + RAG) for HR Q&A, IT helpdesk, and internal knowledge base search',
    ],
    tools: 'Microsoft Copilot (LLM, native), Teams AI Library for custom LLM bots, Viva Engage AI',
  },
  {
    platform: 'Slack + AI',
    icon: '⚡',
    uses: [
      'Slack AI (LLM): channel summarisation, thread search, DM drafting assistance',
      'Workflow automation (Script/Bot) with LLM decision nodes in Slack Workflow Builder',
      'Custom LLM bots via Slack API for internal tools and helpdesk ticket handling',
      'Connecting to external LLMs (Claude, GPT) via Slack app integrations for on-demand reasoning',
    ],
    tools: 'Slack AI (native LLM), Zapier for Slack + AI, custom Bolt app framework',
  },
];

const EXCEL = [
  { cap: 'Formula Generation',      tech: ['LLM'],        desc: 'Describe the calculation in plain English — an LLM (Copilot) generates the correct Excel formula. Eliminates formula lookup and syntax errors for non-technical users.' },
  { cap: 'Data Analysis & Insights',tech: ['LLM', 'ML'],  desc: 'An LLM describes patterns and anomalies in your dataset; underlying ML models power the trend detection. Acts like a junior analyst running over your data.' },
  { cap: 'PivotTable Creation',     tech: ['LLM'],        desc: 'Describe the analysis in plain English — the LLM interprets intent and builds the PivotTable and chart automatically. No drag-and-drop required.' },
  { cap: 'Data Cleaning',           tech: ['ML', 'LLM'],  desc: 'ML pattern detection identifies inconsistencies (mixed date formats, duplicates, naming variants); the LLM suggests and applies corrections.' },
  { cap: 'Natural Language Queries',tech: ['NLP', 'LLM'], desc: 'NLP intent parsing + LLM reasoning lets you ask questions of your spreadsheet in plain English. "Which customers had the highest order value in March?" returns a highlighted answer.' },
  { cap: 'Macro & Script Generation',tech: ['LLM'],       desc: 'Describe the automation task — the LLM writes the VBA macro or Python script. Non-technical users can automate repetitive Excel operations without coding knowledge.' },
];

const PATTERNS = [
  {
    pattern: 'Native AI / Embedded Tool',
    desc: 'An LLM or ML model built directly into the SaaS tool you already use. No integration work required.',
    examples: 'Copilot in Outlook (LLM), Einstein in Salesforce (ML), Duet in Google Workspace (LLM)',
    pros: 'Zero integration effort. Familiar UI. Data stays in existing system.',
    cons: 'Limited to the vendor\'s model choices. Cannot mix best-in-class AI across tools.',
  },
  {
    pattern: 'API Integration',
    desc: 'Your existing system calls an LLM or ML API to process data and return results — written to your system by a script or custom code.',
    examples: 'CRM calls Claude API to score a lead (ML). ERP calls GPT-4 API to draft commentary (LLM).',
    pros: 'Use the best model for each task. Full prompt control. Best-in-class outputs.',
    cons: 'Requires developer resource. API cost management needed. Latency must be considered.',
  },
  {
    pattern: 'Middleware / iPaaS',
    desc: 'A no-code/low-code integration platform (Zapier, Make, MuleSoft) routes data between your systems and AI models — acting as a bot/automation layer.',
    examples: 'New CRM lead (trigger) → Zapier bot → LLM scoring → CRM updated → Slack alert to rep',
    pros: 'No-code or low-code. Fast to build. Good for simple linear workflows.',
    cons: 'Becomes complex for non-linear logic. Adds a vendor dependency layer.',
  },
  {
    pattern: 'AI Overlay / Co-pilot Layer',
    desc: 'A browser extension, desktop app, or background script reads your screen or clipboard and feeds context to an LLM — works with any tool, even those without APIs.',
    examples: 'Copilot reading open documents. Browser-based LLM assistant alongside any web tool.',
    pros: 'Works with any tool without API access. Low integration cost.',
    cons: 'Relies on screen-reading or browser extension. Less reliable than native API integration.',
  },
];

function TechBadge({ tags }) {
  const COLOR = {
    LLM:   'bg-blue-100 text-blue-700',
    ML:    'bg-emerald-100 text-emerald-700',
    NLP:   'bg-sky-100 text-sky-700',
    OCR:   'bg-amber-100 text-amber-700',
    ASR:   'bg-purple-100 text-purple-700',
    RAG:   'bg-indigo-100 text-indigo-700',
    CV:    'bg-rose-100 text-rose-700',
    Rules: 'bg-slate-100 text-slate-500',
    API:   'bg-slate-100 text-slate-500',
  };
  return (
    <span className="inline-flex gap-1 ml-1.5 flex-wrap">
      {tags.map(t => (
        <span key={t} className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded ${COLOR[t] || 'bg-slate-100 text-slate-500'}`}>{t}</span>
      ))}
    </span>
  );
}

function CapGrid({ capabilities }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {capabilities.map((c) => (
        <div key={c.cap} className="card">
          <p className="font-bold text-slate-800 mb-1 flex items-center flex-wrap">
            {c.cap}
            {c.tech && <TechBadge tags={c.tech} />}
          </p>
          <p className="text-sm text-slate-500">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function TechIntegrations() {
  return (
    <PageWrapper
      badge="Page 21 — Technology of AI"
      title="How AI Fits with Your Current Technology"
      subtitle="How specific AI technologies — LLMs, ML models, OCR, ASR, and automation bots — integrate with the tools you already use. Each capability is tagged with the underlying technology."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Email & Calendar</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Platforms:</strong> {EMAIL.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration:</strong> {EMAIL.integration}</p>
        <CapGrid capabilities={EMAIL.capabilities} />
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">CRM</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Platforms:</strong> {CRM.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration:</strong> {CRM.integration}</p>
        <CapGrid capabilities={CRM.capabilities} />
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">ERP</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Platforms:</strong> {ERP.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration:</strong> {ERP.integration}</p>
        <CapGrid capabilities={ERP.capabilities} />
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">WMS & Supply Chain</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Platforms:</strong> {WMS.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration:</strong> {WMS.integration}</p>
        <CapGrid capabilities={WMS.capabilities} />
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Messaging: WhatsApp & Teams</h2>
        <div className="space-y-5">
          {MESSAGING.map((m) => (
            <div key={m.platform} className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{m.icon}</span>
                <h3 className="font-bold text-slate-800">{m.platform}</h3>
              </div>
              <ul className="space-y-1 mb-3">
                {m.uses.map((u, i) => <li key={i} className="flex gap-2 text-sm text-slate-600"><span className="text-slate-300 flex-shrink-0">→</span>{u}</li>)}
              </ul>
              <p className="text-xs text-slate-400"><strong>Tools:</strong> {m.tools}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Excel & Spreadsheets</h2>
        <p className="text-slate-500 text-sm mb-4">Microsoft Copilot for Excel and Google Sheets AI layer LLM reasoning on top of spreadsheet data. Each capability is powered by a specific underlying technology.</p>
        <CapGrid capabilities={EXCEL} />
      </section>

      <div className="section-divider" />

      <section id="s7" className="section-anchor mb-10">
        <h2 className="mb-2">Integration Patterns</h2>
        <p className="text-slate-500 text-sm mb-4">The four ways AI technologies connect to your existing systems — from zero-effort embedded tools to custom code.</p>
        <div className="space-y-4">
          {PATTERNS.map((p) => (
            <div key={p.pattern} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{p.pattern}</h3>
              <p className="text-sm text-slate-600 mb-2">{p.desc}</p>
              <p className="text-xs text-slate-500 mb-2"><strong>Examples:</strong> {p.examples}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50 rounded px-2 py-1.5 text-emerald-700"><strong>Advantage:</strong> {p.pros}</div>
                <div className="bg-red-50 rounded px-2 py-1.5 text-red-700"><strong>Constraint:</strong> {p.cons}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
