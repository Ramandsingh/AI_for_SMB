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
