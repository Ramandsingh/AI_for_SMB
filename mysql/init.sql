CREATE DATABASE IF NOT EXISTS ai_dashboard_db;
USE ai_dashboard_db;

CREATE TABLE IF NOT EXISTS assessments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answers JSON NOT NULL,
  score INT NOT NULL,
  stage VARCHAR(50) NOT NULL,
  stage_label VARCHAR(100) NOT NULL,
  recommended_pages JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS roi_calculations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role_name VARCHAR(100),
  hours_per_task DECIMAL(6,2),
  frequency_per_month INT,
  hourly_rate DECIMAL(10,2),
  ai_uplift_pct INT,
  tool_cost_monthly DECIMAL(10,2),
  annual_saving DECIMAL(12,2),
  payback_months DECIMAL(6,1),
  roi_24m DECIMAL(8,2),
  roi_36m DECIMAL(8,2)
);

CREATE TABLE IF NOT EXISTS roi_models (
  id INT AUTO_INCREMENT PRIMARY KEY,
  use_case VARCHAR(200) NOT NULL,
  description TEXT,
  typical_hours_saved_monthly DECIMAL(6,2),
  confidence_level ENUM('High','Medium','Low') DEFAULT 'Medium',
  typical_timeline_weeks INT,
  indicative_monthly_cost DECIMAL(10,2)
);

INSERT INTO roi_models (use_case, description, typical_hours_saved_monthly, confidence_level, typical_timeline_weeks, indicative_monthly_cost) VALUES
('Email Triage & Draft Replies', 'AI classifies incoming emails and drafts contextual replies for human review', 20, 'High', 4, 150),
('Document Summarisation', 'AI reads and summarises long reports, contracts, and documents', 15, 'High', 2, 100),
('Proposal & Quote Generation', 'AI drafts proposals from templates, past examples, and brief inputs', 30, 'High', 6, 200),
('Invoice Data Extraction', 'AI extracts structured data from PDF invoices for system import', 25, 'High', 4, 120),
('Meeting Notes & Action Items', 'AI transcribes meetings and produces structured notes with actions', 10, 'High', 1, 80),
('Customer Query Classification', 'AI categorises and routes incoming customer queries', 18, 'Medium', 5, 140),
('Demand Forecasting Augmentation', 'AI enhances forecasting accuracy using historical patterns', 12, 'Medium', 10, 300),
('Contract & Terms Review', 'AI flags key clauses, obligations, and risk terms in contracts', 22, 'Medium', 6, 180),
('Sales Call Summarisation', 'AI produces structured call summaries and CRM update drafts', 16, 'High', 3, 110),
('Market & Competitor Monitoring', 'AI aggregates and summarises relevant market intelligence daily', 8, 'Medium', 4, 130);

CREATE TABLE IF NOT EXISTS lab_gallery (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  mime_type   VARCHAR(100) NOT NULL DEFAULT 'image/jpeg',
  file_data   LONGBLOB NOT NULL,
  file_size   INT,
  comment     TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS database_platforms (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  tagline         TEXT,
  url             VARCHAR(255),
  logo_url        VARCHAR(500),
  screenshot_urls JSON,
  features        JSON,
  limitations     JSON,
  tags            JSON,
  color           VARCHAR(30) DEFAULT 'blue',
  sort_order      INT DEFAULT 0
);

INSERT INTO database_platforms (name, tagline, url, logo_url, screenshot_urls, features, limitations, tags, color, sort_order) VALUES
('Baserow', 'Open source no-code database & Airtable alternative. Self-host via Docker or use Baserow cloud.', 'https://baserow.io', 'https://raw.githubusercontent.com/bram2w/baserow/master/web-frontend/modules/core/static/img/logo.svg', '["https://baserow.io/img/baserow-screenshot-grid.png","https://baserow.io/img/baserow-screenshot-gallery.png"]', '["Grid, gallery, kanban, calendar, and form views","REST API auto-generated for every table and field","Role-based access: admin, member, viewer per workspace","Webhooks triggered on row create/update/delete","Formula fields, lookup fields, link-to-table relations","Docker self-host or Baserow cloud — unlimited rows self-hosted"]', '["Free cloud plan capped at 5,000 rows and 5 GB storage","Row-level access rules (filter-based permissions) are premium","Public shared views are view-only — no per-viewer identity filter","Automations (save-triggered workflows) are premium only","No SSO / SAML on free tier — email auth only","Password-protected shared views require a premium plan"]', '["self-hosted","open-source","docker","rest-api","no-code"]', 'blue', 1),
('NocoDB', 'Turns any MySQL, PostgreSQL, or SQLite database into a smart spreadsheet UI with APIs and views.', 'https://nocodb.com', 'https://raw.githubusercontent.com/nocodb/nocodb/develop/packages/nc-gui/assets/img/icons/512x512-trans.png', '["https://raw.githubusercontent.com/nocodb/nocodb/develop/.github/assets/screenshots/22.png","https://raw.githubusercontent.com/nocodb/nocodb/develop/.github/assets/screenshots/23.png"]', '["Connects to MySQL, PostgreSQL, SQLite, MariaDB — your existing DB","Grid, gallery, form, kanban, and map views","REST & GraphQL API auto-generated per table","Shared views with optional password protection","Webhook triggers on record create/update/delete","Self-host via Docker, AGPL free and open source"]', '["Row-level access only via view filters — no per-user identity routing","No column-level hiding per user on free tier","Password-protected views use one shared password for all viewers","Save-triggered conditional actions require enterprise plan","Cloud attachment storage limited on free plan","No built-in audit log on open source version"]', '["self-hosted","open-source","postgresql","mysql","graphql","no-code"]', 'violet', 2),
('Grist', 'Spreadsheet meets database — Python formula columns, granular access rules, and sharable views.', 'https://getgrist.com', 'https://raw.githubusercontent.com/gristlabs/grist-core/main/static/icons/GristLogo.png', '["https://raw.githubusercontent.com/gristlabs/grist-core/main/static/img/docs/newsletters/2021-09/kanban.png","https://www.getgrist.com/wp-content/uploads/2023/10/grist-access-rules.png"]', '["Python-powered formula columns — full NumPy/Pandas access","Granular access rules at row, column, and table level","Link & filter views — each user sees only their data slice","Custom widgets (maps, charts) embeddable per page","Version history and document snapshots","Self-host via Docker (AGPL), free and open source"]', '["Free cloud plan: 5 documents, 5,000 rows per document","No SSO on free or free-plus plans","Column-level access rules are available but complex to configure","External webhooks on save require the Business plan","No native mobile app","Per-user row filtering requires careful formula-based access rule setup"]', '["self-hosted","open-source","python","access-rules","no-code"]', 'emerald', 3),
('Teable', 'Postgres-native, high-performance Airtable alternative — handles millions of rows with real-time collaboration.', 'https://teable.io', 'https://raw.githubusercontent.com/teableio/teable/develop/apps/nextjs-app/public/favicon/android-chrome-192x192.png', '["https://raw.githubusercontent.com/teableio/teable/develop/.github/screenshots/table-view.png","https://raw.githubusercontent.com/teableio/teable/develop/.github/screenshots/kanban-view.png"]', '["Built directly on PostgreSQL — millions of rows without performance degradation","Real-time collaboration with low latency multiplayer editing","Grid, gallery, kanban, calendar, and form views","REST API and plugin system for extensibility","Self-hostable under AGPL, actively developed","AI field assistant (beta) for formula suggestions"]', '["Relatively new product — some enterprise features still in development","No column-level access control on free tier yet","Automations are limited on the free self-hosted version","No SSO / SAML on free plan","Public shared views are read-only with no per-viewer row filtering","Password-protected shared views not available on free tier"]', '["self-hosted","open-source","postgresql","real-time","no-code"]', 'amber', 4),
('Mathesar', 'Web interface for PostgreSQL — schema design, data editing, and filtered views without writing SQL.', 'https://mathesar.org', 'https://raw.githubusercontent.com/mathesar-foundation/mathesar/develop/mathesar_ui/src/assets/images/mathesar_logo.svg', '["https://mathesar.org/assets/img/home/hero-screenshot.png","https://mathesar.org/assets/img/features/table-screenshot.png"]', '["Direct PostgreSQL interface — no proprietary data layer or migration required","Table editor, data explorer, and schema designer in the browser","Role-based access control matching native PostgreSQL roles","Shareable filtered views per user group","Works with existing databases — connect and start immediately","Fully self-hosted, free and open source (GPL)"]', '["No cloud hosted option — must self-host on your own infrastructure","No built-in automations or webhook triggers","Only grid/table view — no kanban, gallery, or calendar views","No native form builder for public data collection","Column-level access requires PostgreSQL role configuration by a DBA","No password-protected public sharing links"]', '["self-hosted","open-source","postgresql","sql","low-code"]', 'rose', 5);
