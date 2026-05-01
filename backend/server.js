const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'smb_user',
  password: process.env.DB_PASSWORD || 'smb_password',
  database: process.env.DB_NAME || 'ai_smb_db',
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

app.get('/api/health', async (req, res) => {
  try {
    const db = await getPool();
    await db.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/assessments', async (req, res) => {
  const { answers, score, stage, stageLabel, recommendedPages } = req.body;
  try {
    const db = await getPool();
    const [result] = await db.query(
      'INSERT INTO assessments (answers, score, stage, stage_label, recommended_pages) VALUES (?, ?, ?, ?, ?)',
      [JSON.stringify(answers), score, stage, stageLabel, JSON.stringify(recommendedPages)]
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

app.post('/api/roi', async (req, res) => {
  const {
    roleName, hoursPerTask, frequencyPerMonth, hourlyRate,
    aiUpliftPct, toolCostMonthly,
    annualSaving, paybackMonths, roi24m, roi36m
  } = req.body;
  try {
    const db = await getPool();
    const [result] = await db.query(
      `INSERT INTO roi_calculations
       (role_name, hours_per_task, frequency_per_month, hourly_rate,
        ai_uplift_pct, tool_cost_monthly, annual_saving, payback_months, roi_24m, roi_36m)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [roleName, hoursPerTask, frequencyPerMonth, hourlyRate,
       aiUpliftPct, toolCostMonthly, annualSaving, paybackMonths, roi24m, roi36m]
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

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
