import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Email & Calendar',        level: 2 },
  { id: 's2', title: 'CRM',                     level: 2 },
  { id: 's3', title: 'ERP',                     level: 2 },
  { id: 's4', title: 'WMS & Supply Chain',       level: 2 },
  { id: 's5', title: 'Messaging: WhatsApp & Teams', level: 2 },
  { id: 's6', title: 'Excel & Spreadsheets',    level: 2 },
  { id: 's7', title: 'Integration Patterns',    level: 2 },
];

const EMAIL = {
  platforms: ['Microsoft Outlook + Copilot', 'Gmail + Duet AI (Google Workspace)', 'Superhuman AI', 'Front AI'],
  capabilities: [
    { cap: 'Triage & Classification', desc: 'AI reads and categorises incoming email — urgent, FYI, action required, newsletter — so humans focus on what matters. Filters noise without deleting.' },
    { cap: 'Draft Reply Suggestions', desc: 'Based on email content, AI drafts a contextually appropriate reply. Human reviews and sends. Reduces reply time from 5 minutes to 30 seconds.' },
    { cap: 'Thread Summarisation', desc: 'A 40-email thread summarised to 5 bullet points in one click. Critical for anyone rejoining a conversation or managing high-volume mailboxes.' },
    { cap: 'Follow-up Nudges', desc: 'AI identifies emails that received no reply and flags them for follow-up. Reduces dropped balls in sales and customer service workflows.' },
    { cap: 'Meeting Scheduling', desc: 'AI reads "let\'s find a time" email and handles scheduling back-and-forth. Integrates with calendar availability directly.' },
    { cap: 'Sentiment Analysis', desc: 'Flags customer emails showing frustration, urgency, or churn risk so they are prioritised for human review.' },
  ],
  integration: 'Native for Microsoft 365 Copilot (Outlook) and Google Workspace AI (Gmail). Third-party tools connect via Microsoft Graph API or Gmail API.',
};

const CRM = {
  platforms: ['Salesforce Einstein AI', 'HubSpot AI', 'Microsoft Dynamics 365 Copilot', 'Pipedrive AI'],
  capabilities: [
    { cap: 'Lead Scoring', desc: 'AI analyses lead attributes, behaviour, and firmographic data to rank likelihood of conversion. Reps focus effort on highest-probability leads.' },
    { cap: 'Deal Risk Prediction', desc: 'AI flags deals at risk of slipping — based on activity patterns, days since last contact, stakeholder engagement. Prevents surprise losses.' },
    { cap: 'Conversation Intelligence', desc: 'Call recordings transcribed, analysed, and summarised. Key topics, objections, commitments, and next steps extracted automatically.' },
    { cap: 'CRM Auto-population', desc: 'After calls and meetings, AI generates structured notes and logs activities directly into CRM records. Eliminates manual data entry.' },
    { cap: 'Next Best Action', desc: 'AI recommends the optimal next action for each deal — follow-up email, product demo, pricing conversation — based on deal stage and history.' },
    { cap: 'Forecast Intelligence', desc: 'AI analyses pipeline patterns to produce more accurate revenue forecasts than rep-by-rep manual submission.' },
  ],
  integration: 'Native AI in Salesforce (Einstein), HubSpot, and Dynamics. Third-party conversation intelligence (Gong, Chorus, Clari) integrates via API and call recording.',
};

const ERP = {
  platforms: ['SAP S/4HANA with AI', 'Oracle Fusion with AI', 'Microsoft Dynamics 365', 'NetSuite AI'],
  capabilities: [
    { cap: 'Invoice Processing', desc: 'AI reads any invoice format — PDF, email, scanned — extracts header and line data, matches to PO, and posts to ledger. Replaces manual AP entry.' },
    { cap: 'Variance Commentary', desc: 'AI analyses actuals vs budget and generates management commentary explaining key variances — eliminating 2–4 hours of finance team writing per close.' },
    { cap: 'Demand Forecasting', desc: 'AI improves ERP demand planning by incorporating external signals (weather, events, economic indicators) that rules-based MRP ignores.' },
    { cap: 'Anomaly Detection', desc: 'AI monitors transactions for patterns consistent with fraud, errors, or policy violations. Surfaces exceptions for human review before they become problems.' },
    { cap: 'Procurement Optimisation', desc: 'AI analyses purchase history and market data to recommend preferred suppliers, optimal order quantities, and timing.' },
    { cap: 'Cash Flow Forecasting', desc: 'AI predicts cash position 30–90 days out based on AR/AP patterns, seasonality, and current pipeline — more accurately than spreadsheet models.' },
  ],
  integration: 'Native AI in SAP (Joule), Oracle, and Dynamics. Middleware platforms (MuleSoft, Boomi) connect third-party AI to ERP data via APIs or direct database connectors.',
};

const WMS = {
  platforms: ['Manhattan Associates WMS', 'Blue Yonder (JDA)', 'SAP Extended Warehouse Management', 'Oracle WMS'],
  capabilities: [
    { cap: 'Slotting Optimisation', desc: 'AI analyses order patterns and product velocity to continuously optimise warehouse slot assignments — reducing pick travel distance by 15–30%.' },
    { cap: 'Picking Route Optimisation', desc: 'AI generates optimal pick paths for each order wave based on current inventory locations, traffic, and picker position.' },
    { cap: 'Labour Forecasting', desc: 'AI forecasts daily labour requirements based on order volumes, product mix, and historical productivity — enabling accurate staffing.' },
    { cap: 'Inbound Processing', desc: 'AI reads delivery documentation, cross-references against POs, and directs putaway — reducing inbound processing time.' },
    { cap: 'Exception Management', desc: 'AI identifies exceptions (damaged goods, overages, shortages) and routes them to the appropriate resolution workflow automatically.' },
    { cap: 'Demand-driven Replenishment', desc: 'AI triggers replenishment based on predicted demand, not just reorder points — reducing stockouts and overstock simultaneously.' },
  ],
  integration: 'WMS integrates with ERP via API or EDI. AI layer typically sits on top of existing WMS through a middleware layer or the WMS vendor\'s native AI product.',
};

const MESSAGING = [
  {
    platform: 'WhatsApp Business AI',
    icon: '💬',
    uses: [
      'Customer service automation — answer common queries 24/7 via AI chatbot on WhatsApp',
      'Order status updates, delivery notifications, appointment confirmations at scale',
      'Lead qualification — AI asks screening questions before handoff to human',
      'Payment reminders and collection — conversational AI following up on overdue accounts',
      'Internal operations in markets where WhatsApp is the primary business tool (APAC, LATAM, MENA)',
    ],
    tools: 'Twilio, MessageBird, WATI, 360dialog — connect WhatsApp Business API to AI backends',
  },
  {
    platform: 'Microsoft Teams + Copilot',
    icon: '🟦',
    uses: [
      'Meeting transcription, summarisation, and action item extraction (Teams Premium + Copilot)',
      'AI-generated meeting recaps sent to all participants within minutes of call ending',
      '"Catch me up" — AI summarises missed messages and meetings in natural language',
      'In-meeting AI: surface relevant documents, previous decisions, and participant context during calls',
      'Teams-native chatbots for HR, IT helpdesk, and internal knowledge base Q&A',
    ],
    tools: 'Microsoft Copilot (native), Viva Engage AI, Teams AI Library for custom bots',
  },
  {
    platform: 'Slack + AI',
    icon: '⚡',
    uses: [
      'Slack AI: channel summarisation, thread search, and DM drafting assistance',
      'Workflow automation with AI decision nodes (Slack Workflow Builder + AI)',
      'Custom AI bots integrated via Slack API for internal tools and helpdesks',
      'Connecting to external AI (Claude, GPT) via Slack app integrations',
    ],
    tools: 'Slack AI (native), Zapier for Slack + AI, custom Bolt apps',
  },
];

const EXCEL = [
  { cap: 'Formula Generation', desc: 'Describe what you want in plain English ("average sales for Q3 excluding returns") — Copilot writes the formula. Eliminates formula lookup and syntax errors.' },
  { cap: 'Data Analysis & Insights', desc: 'AI analyses your dataset and surfaces trends, outliers, and patterns without you specifying what to look for. Acts like a junior analyst on your data.' },
  { cap: 'PivotTable Creation', desc: 'Describe the analysis ("show me revenue by region and product for the last 6 months") — AI builds the PivotTable and chart automatically.' },
  { cap: 'Data Cleaning', desc: 'AI identifies and fixes inconsistencies — mixed date formats, duplicate entries, inconsistent naming — that break downstream analysis.' },
  { cap: 'Natural Language Queries', desc: 'Ask questions of your spreadsheet in plain English. "Which customers had the highest order value in March?" returns a highlighted answer.' },
  { cap: 'Macro & Script Generation', desc: 'Describe an automation task — AI writes the VBA macro or Python script. Non-technical users can automate repetitive Excel tasks.' },
];

const PATTERNS = [
  {
    pattern: 'Native AI (Embedded)',
    desc: 'The simplest integration — AI built directly into the tool you already use.',
    examples: 'Copilot in Outlook, Einstein in Salesforce, Duet in Google Workspace',
    pros: 'Zero integration effort. Familiar UI. Data stays in existing system.',
    cons: 'Limited to the vendor\'s AI capability. Cannot mix best-in-class AI.',
  },
  {
    pattern: 'API Integration',
    desc: 'Your existing system calls an AI API to process data and return results into the existing workflow.',
    examples: 'CRM triggers AI to score a lead. ERP calls AI to draft commentary.',
    pros: 'Use the best AI model for each task. Full control over prompts and outputs.',
    cons: 'Requires developer resource. API cost management. Latency considerations.',
  },
  {
    pattern: 'Middleware / iPaaS',
    desc: 'An integration platform (Zapier, Make, MuleSoft) sits between your systems and AI — routing data, transforming formats, and triggering AI at the right moments.',
    examples: 'New CRM lead → Zapier → AI scoring → CRM updated → alert to rep',
    pros: 'No-code or low-code. Fast to build. Good for simple, linear workflows.',
    cons: 'Becomes complex for non-linear workflows. Vendor dependency.',
  },
  {
    pattern: 'AI Overlay / Co-pilot Layer',
    desc: 'A separate AI interface sits on top of existing systems, reading screen context or data and assisting in real time.',
    examples: 'Copilot reading your open documents. AI assistant in your browser alongside any tool.',
    pros: 'Works with any tool, even those without APIs. Low integration cost.',
    cons: 'Dependent on screen scraping or browser extension. Less reliable than API integration.',
  },
];

export default function TechIntegrations() {
  return (
    <PageWrapper
      badge="Page 21 — Technology of AI"
      title="How AI Fits with Your Current Technology"
      subtitle="How AI integrates with the tools you already use — email, CRM, ERP, WMS, WhatsApp, and Excel — with practical examples and integration patterns for each."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Email & Calendar</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Leading platforms:</strong> {EMAIL.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration method:</strong> {EMAIL.integration}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMAIL.capabilities.map((c) => (
            <div key={c.cap} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.cap}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">CRM</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Leading platforms:</strong> {CRM.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration method:</strong> {CRM.integration}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CRM.capabilities.map((c) => (
            <div key={c.cap} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.cap}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">ERP</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Leading platforms:</strong> {ERP.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration method:</strong> {ERP.integration}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ERP.capabilities.map((c) => (
            <div key={c.cap} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.cap}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">WMS & Supply Chain</h2>
        <p className="text-slate-500 text-sm mb-1"><strong>Leading platforms:</strong> {WMS.platforms.join(' · ')}</p>
        <p className="text-xs text-slate-400 mb-4"><strong>Integration method:</strong> {WMS.integration}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WMS.capabilities.map((c) => (
            <div key={c.cap} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.cap}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
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
        <p className="text-slate-500 text-sm mb-4">Microsoft Copilot for Excel and Google Sheets AI bring natural language to the world's most widely used analytical tool. Particularly valuable for finance, operations, and sales teams.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXCEL.map((c) => (
            <div key={c.cap} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{c.cap}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s7" className="section-anchor mb-10">
        <h2 className="mb-2">Integration Patterns</h2>
        <p className="text-slate-500 text-sm mb-4">How AI connects to existing systems — from zero-effort native integrations to custom API work.</p>
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
