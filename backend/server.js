const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'ai_dashboard_user',
  password: process.env.DB_PASSWORD || 'change_me_password',
  database: process.env.DB_NAME || 'ai_dashboard_db',
  waitForConnections: true,
  connectionLimit: 10,
};

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

async function runMigrations(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS companies (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      name         VARCHAR(200) NOT NULL,
      industry     VARCHAR(100),
      size         VARCHAR(50),
      contact_name VARCHAR(100),
      notes        TEXT,
      created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [aCols] = await db.query(`SHOW COLUMNS FROM assessments LIKE 'company_id'`);
  if (!aCols.length) {
    await db.query(`ALTER TABLE assessments ADD COLUMN company_id INT, ADD CONSTRAINT fk_assess_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL`);
  }

  const [rCols] = await db.query(`SHOW COLUMNS FROM roi_calculations LIKE 'company_id'`);
  if (!rCols.length) {
    await db.query(`ALTER TABLE roi_calculations ADD COLUMN company_id INT, ADD CONSTRAINT fk_roi_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL`);
  }
}

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const db = await getPool();
    await db.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ── Companies ─────────────────────────────────────────────────────────────────
app.get('/api/companies', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query('SELECT * FROM companies ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/companies', async (req, res) => {
  const { name, industry, size, contact_name, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  try {
    const db = await getPool();
    const [result] = await db.query(
      'INSERT INTO companies (name, industry, size, contact_name, notes) VALUES (?, ?, ?, ?, ?)',
      [name, industry || null, size || null, contact_name || null, notes || null]
    );
    const [rows] = await db.query('SELECT * FROM companies WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/companies/:id', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query('SELECT * FROM companies WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Assessments ───────────────────────────────────────────────────────────────
app.post('/api/assessments', async (req, res) => {
  const { answers, score, stage, stageLabel, recommendedPages, company_id } = req.body;
  try {
    const db = await getPool();
    const [result] = await db.query(
      'INSERT INTO assessments (answers, score, stage, stage_label, recommended_pages, company_id) VALUES (?, ?, ?, ?, ?, ?)',
      [JSON.stringify(answers), score, stage, stageLabel, JSON.stringify(recommendedPages), company_id || null]
    );
    res.json({ id: result.insertId, score, stage, stageLabel, recommendedPages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/assessments/:id', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query('SELECT * FROM assessments WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ROI ───────────────────────────────────────────────────────────────────────
app.post('/api/roi', async (req, res) => {
  const {
    roleName, hoursPerTask, frequencyPerMonth, hourlyRate,
    aiUpliftPct, toolCostMonthly, annualSaving, paybackMonths, roi24m, roi36m, company_id,
  } = req.body;
  try {
    const db = await getPool();
    const [result] = await db.query(
      `INSERT INTO roi_calculations
       (role_name, hours_per_task, frequency_per_month, hourly_rate,
        ai_uplift_pct, tool_cost_monthly, annual_saving, payback_months, roi_24m, roi_36m, company_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [roleName, hoursPerTask, frequencyPerMonth, hourlyRate,
       aiUpliftPct, toolCostMonthly, annualSaving, paybackMonths, roi24m, roi36m, company_id || null]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/roi/models', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query('SELECT * FROM roi_models ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3002;
app.listen(PORT, async () => {
  console.log(`Backend running on port ${PORT}`);
  try {
    const db = await getPool();
    await runMigrations(db);
    console.log('Database migrations complete');
  } catch (err) {
    console.error('Migration error:', err.message);
  }
});
