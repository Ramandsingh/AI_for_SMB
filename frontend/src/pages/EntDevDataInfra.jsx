import { Database, GitBranch, Layers, Zap, Shield, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Why Data Infrastructure Comes First',  level: 2 },
  { id: 's2', title: 'The Modern Data Stack for AI',         level: 2 },
  { id: 's3', title: 'Feature Engineering & Feature Stores', level: 2 },
  { id: 's4', title: 'Data Pipelines: Batch vs Streaming',   level: 2 },
  { id: 's5', title: 'Data Quality & Governance',            level: 2 },
  { id: 's6', title: 'Readiness Assessment',                 level: 2 },
];

const STACK_LAYERS = [
  {
    layer: 'Consumption Layer',
    icon: Zap,
    color: 'border-l-blue-500 bg-blue-50',
    iconColor: 'text-blue-600',
    tools: ['BI dashboards (Power BI, Tableau)', 'AI applications & APIs', 'Data science notebooks', 'Self-service analytics'],
    desc: 'Where AI models, analysts, and applications consume processed data.',
  },
  {
    layer: 'Semantic / Feature Layer',
    icon: Layers,
    color: 'border-l-purple-400 bg-purple-50',
    iconColor: 'text-purple-600',
    tools: ['dbt (data build tool)', 'Feature stores (Feast, Tecton)', 'Metrics layers (MetricFlow)', 'Vector indexes'],
    desc: 'Business logic, ML features, and embeddings defined once — consumed everywhere.',
  },
  {
    layer: 'Storage & Processing Layer',
    icon: Database,
    color: 'border-l-emerald-400 bg-emerald-50',
    iconColor: 'text-emerald-600',
    tools: ['Data Lakehouse (Databricks, Snowflake, BigQuery)', 'Apache Spark / Flink', 'Object storage (S3, ADLS, GCS)', 'Delta Lake / Apache Iceberg'],
    desc: 'The central store where structured, semi-structured, and unstructured data lives and is processed.',
  },
  {
    layer: 'Ingestion Layer',
    icon: GitBranch,
    color: 'border-l-amber-400 bg-amber-50',
    iconColor: 'text-amber-600',
    tools: ['Batch ETL (Fivetran, Airbyte)', 'Streaming (Kafka, Kinesis, Pub/Sub)', 'CDC (Debezium)', 'API connectors & webhooks'],
    desc: 'Moves data from source systems — databases, SaaS apps, IoT sensors, files — into the central store.',
  },
  {
    layer: 'Source Systems',
    icon: Shield,
    color: 'border-l-slate-300 bg-slate-50',
    iconColor: 'text-slate-500',
    tools: ['ERP / CRM (SAP, Salesforce)', 'Operational databases (PostgreSQL, MySQL)', 'SaaS applications', 'Sensors, logs, clickstreams'],
    desc: 'The origin of all enterprise data — systems of record and systems of engagement.',
  },
];

const FEATURE_STORE_CONCEPTS = [
  {
    concept: 'What is a Feature Store?',
    detail: 'A system that centralises the definition, computation, storage, and serving of ML features. Features are the input variables a model uses to make predictions — things like "customer 30-day spend" or "product return rate."',
  },
  {
    concept: 'Why Enterprises Need One',
    detail: 'Without a feature store, every team recomputes the same features differently. A "churn score" in the marketing model differs from "churn score" in the finance model. Feature stores create one authoritative version, reduce computation cost, and cut training-to-serving latency.',
  },
  {
    concept: 'Offline vs Online Serving',
    detail: 'Offline features (from a data warehouse) train models on historical data. Online features (from a low-latency key-value store like Redis) serve real-time predictions. A feature store manages both and keeps them consistent.',
  },
  {
    concept: 'Leading Platforms',
    detail: 'Feast (open source), Tecton (managed enterprise), Databricks Feature Store, AWS SageMaker Feature Store, Vertex AI Feature Store. Choice depends on cloud vendor and existing stack.',
  },
];

const PIPELINE_COMPARISON = [
  { aspect: 'Latency',         batch: 'Minutes to hours',       streaming: 'Milliseconds to seconds' },
  { aspect: 'Use cases',       batch: 'Training data, reports, overnight processing', streaming: 'Fraud detection, recommendations, alerting' },
  { aspect: 'Cost',            batch: 'Lower — runs periodically', streaming: 'Higher — always running' },
  { aspect: 'Complexity',      batch: 'Low — well-understood tooling', streaming: 'High — exactly-once semantics, state management' },
  { aspect: 'AI applications', batch: 'Model retraining, feature backfill', streaming: 'Real-time inference, online feature computation' },
  { aspect: 'Key tools',       batch: 'Apache Spark, dbt, Airflow', streaming: 'Kafka, Flink, Kinesis, Pub/Sub' },
];

const DATA_QUALITY_PILLARS = [
  { pillar: 'Completeness', desc: 'No missing values in critical fields. Monitored via null-rate checks on ingestion.' },
  { pillar: 'Accuracy',     desc: 'Data reflects the real world. Validated against source systems and business rules.' },
  { pillar: 'Consistency',  desc: 'Same concept defined identically across systems — one "customer ID" format, one "revenue" definition.' },
  { pillar: 'Timeliness',   desc: 'Data arrives within the SLA required by the consuming model or dashboard.' },
  { pillar: 'Lineage',      desc: 'Every dataset traces back to its source. Essential for debugging AI outputs and regulatory compliance.' },
];

const READINESS_ITEMS = [
  { item: 'Centralised data store — not data scattered across departmental silos', ready: true },
  { item: 'Data documented: schemas, owners, refresh schedules known', ready: true },
  { item: 'Data quality monitoring in place with alerting on failures', ready: true },
  { item: 'Historical data available — at minimum 12–18 months for training most models', ready: true },
  { item: 'Consistent identifiers across systems (customer ID, product ID)', ready: true },
  { item: 'Sensitive data classified and access controls applied', ready: true },
  { item: 'Data scattered across spreadsheets and departmental databases', ready: false },
  { item: 'No documented data ownership or definitions', ready: false },
  { item: 'Less than 6 months of historical data in accessible form', ready: false },
  { item: 'No monitoring of data pipeline health', ready: false },
];

export default function EntDevDataInfra() {
  return (
    <PageWrapper
      badge="Enterprise AI Development · Page 23"
      title="Enterprise Data Infrastructure for AI"
      subtitle="AI is only as good as the data it runs on. Before an enterprise can train, fine-tune, or reliably deploy AI models, it needs a data foundation — the right architecture, quality, and governance."
      sections={SECTIONS}
    >
      {/* S1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">Why Data Infrastructure Comes First</h2>
        <div className="card bg-blue-900 text-white border-0 mb-6">
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-blue-300">The foundational constraint: </span>
            87% of AI and machine learning projects never make it to production — and data problems (not model problems) are the primary cause. Gartner estimates that poor data quality costs organisations an average of $12.9M per year. Before investing in model development, enterprises must assess and often rebuild the data foundation.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Training data',  desc: 'AI models learn from historical examples. Without sufficient, clean, labelled data, models cannot learn what to predict.' },
            { label: 'Feature data',   desc: 'At inference time, the model needs the same input variables it trained on — in real time, at scale, consistently.' },
            { label: 'Feedback data',  desc: 'Production AI must be monitored. When predictions are wrong, corrected labels feed back into retraining loops.' },
          ].map(c => (
            <div key={c.label} className="card">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{c.label}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* S2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">The Modern Data Stack for AI</h2>
        <p className="text-slate-500 text-sm mb-6">The enterprise data stack has converged around a layered lakehouse architecture. Each layer has a distinct role and toolset.</p>
        <div className="space-y-3">
          {STACK_LAYERS.map((l) => {
            const Icon = l.icon;
            return (
              <div key={l.layer} className={`card border-l-4 ${l.color}`}>
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-white flex-shrink-0 shadow-sm">
                    <Icon size={16} className={l.iconColor} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm mb-1">{l.layer}</p>
                    <p className="text-xs text-slate-500 mb-2">{l.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {l.tools.map(t => (
                        <span key={t} className="text-xs bg-white border border-slate-200 text-slate-600 rounded-md px-2 py-0.5 font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card bg-slate-50 border-slate-200 mt-4 text-sm">
          <p className="font-semibold text-slate-800 mb-1">The Lakehouse Convergence</p>
          <p className="text-slate-600">Historically, enterprises ran separate data warehouses (for SQL analytics) and data lakes (for ML and unstructured data). The lakehouse architecture (Databricks Delta Lake, Apache Iceberg on Snowflake/BigQuery) merges both: ACID transactions and SQL performance on top of open-format object storage. This eliminates the data movement and synchronisation overhead that made ML pipelines brittle.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">Feature Engineering & Feature Stores</h2>
        <p className="text-slate-500 text-sm mb-6">Feature engineering — transforming raw data into model-ready inputs — is where most ML effort is spent. Feature stores industrialise this work.</p>
        <div className="space-y-3 mb-6">
          {FEATURE_STORE_CONCEPTS.map(f => (
            <div key={f.concept} className="card">
              <p className="text-sm font-semibold text-slate-800 mb-1">{f.concept}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
        <div className="card bg-amber-50 border-amber-200">
          <p className="text-sm font-semibold text-amber-800 mb-2">The training–serving skew problem</p>
          <p className="text-sm text-amber-700">The most common cause of AI models that perform well in testing but poorly in production: the features available at training time differ from what's available at serving time. Feature stores solve this by ensuring the offline (training) and online (serving) environments use identical feature logic and values.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Data Pipelines: Batch vs Streaming</h2>
        <p className="text-slate-500 text-sm mb-6">Most enterprise AI applications need both batch and streaming data. The choice of pipeline architecture directly determines what AI use cases are possible.</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Dimension</th>
                <th className="text-left p-3 font-semibold text-blue-700 border border-slate-200">Batch Processing</th>
                <th className="text-left p-3 font-semibold text-emerald-700 border border-slate-200">Stream Processing</th>
              </tr>
            </thead>
            <tbody>
              {PIPELINE_COMPARISON.map((r, i) => (
                <tr key={r.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 font-medium text-slate-700">{r.aspect}</td>
                  <td className="p-3 border border-slate-200 text-slate-600">{r.batch}</td>
                  <td className="p-3 border border-slate-200 text-slate-600">{r.streaming}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card bg-blue-50 border-blue-200 text-sm">
          <p className="font-semibold text-blue-800 mb-1">Lambda vs Kappa Architecture</p>
          <p className="text-blue-700">Enterprises running both batch and streaming pipelines must choose an architecture. Lambda runs separate batch and streaming layers merged at serving time — high complexity, high resilience. Kappa treats all processing as a stream (even batch jobs) — lower complexity but requires a robust streaming platform. Most modern data teams are moving to Kappa with Apache Flink or Kafka Streams.</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* S5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">Data Quality & Governance for AI</h2>
        <p className="text-slate-500 text-sm mb-6">AI amplifies data quality problems — a biased training set produces a biased model at scale. Data governance is not optional infrastructure; it is a prerequisite for responsible AI deployment.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {DATA_QUALITY_PILLARS.map(p => (
            <div key={p.pillar} className="card">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">{p.pillar}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="card border-slate-200 text-sm">
          <p className="font-semibold text-slate-800 mb-2">Key data governance tools for AI</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { tool: 'Data catalogues', examples: 'Alation, Collibra, DataHub, Unity Catalog', purpose: 'Document datasets, owners, schemas, and lineage' },
              { tool: 'Data quality monitoring', examples: 'Great Expectations, Monte Carlo, Soda', purpose: 'Automated checks on pipelines with alerting on anomalies' },
              { tool: 'Data lineage', examples: 'OpenLineage, Marquez, Atlan', purpose: 'Trace every dataset back through all transformations to source' },
              { tool: 'Access control', examples: 'Apache Ranger, Unity Catalog, AWS Lake Formation', purpose: 'Enforce row/column-level security on sensitive data' },
            ].map(g => (
              <div key={g.tool} className="bg-slate-50 rounded-xl p-3">
                <p className="font-semibold text-slate-800 text-xs mb-0.5">{g.tool}</p>
                <p className="text-xs text-slate-500 mb-1">{g.purpose}</p>
                <p className="text-xs text-blue-600 font-medium">{g.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* S6 */}
      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-4">Data Infrastructure Readiness Assessment</h2>
        <p className="text-slate-500 text-sm mb-6">Use this checklist to assess whether your data foundation is ready to support enterprise AI model development and deployment.</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {READINESS_ITEMS.map((r, i) => (
            <div key={i} className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-sm border ${
              r.ready ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <span className={`font-bold flex-shrink-0 mt-0.5 ${r.ready ? 'text-emerald-600' : 'text-red-500'}`}>{r.ready ? '✓' : '✗'}</span>
              <span>{r.item}</span>
            </div>
          ))}
        </div>
        <div className="card bg-slate-800 text-white border-0 mt-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Rule of thumb</p>
          <p className="text-sm text-slate-300">A team that achieves fewer than 4 of the 6 "ready" indicators will spend the majority of any AI project cleaning and restructuring data rather than building models. The investment in data infrastructure typically returns 3–5× in AI project efficiency — and is the primary differentiator between organisations that successfully deploy AI and those that stay in pilot mode.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
