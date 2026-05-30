import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCompany } from '../context/CompanyContext';
import { useSections } from '../App';
import {
  Building2, BookOpen, HardDrive, Zap, Database, Rocket,
  AlertTriangle, CheckCircle2, Info, XCircle,
} from 'lucide-react';

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing',
  'Professional Services', 'Education', 'Logistics', 'Construction', 'Other',
];
const SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];

const EMPTY_FORM = { name: '', industry: '', size: '', contact_name: '', notes: '' };

// ── Lessons Learned data ───────────────────────────────────────────────────────

const LESSONS = [
  {
    id: 'docker-persistence',
    category: 'Docker',
    icon: HardDrive,
    color: 'blue',
    title: 'File Persistence in Docker Containers',
    severity: 'critical',
    summary: "Any file written inside a container's filesystem is destroyed when the container restarts or is replaced. You must map persistent data to an external location.",
    problem: "Uploaded PDFs, gallery images, and any user data written to the container's local disk vanish completely on every deploy. Even a simple `docker compose restart` wipes them.",
    fix: 'Two patterns work: (1) Named volumes — mount a host directory or Docker volume into the container path where files are written (`volumes: - pdf_uploads:/app/uploads`). (2) Store files in MySQL as BLOBs (LONGBLOB / MEDIUMBLOB) — this project uses this approach for PDF files and gallery images so data persists in the `mysql_data` named volume regardless of which app container is running.',
    code: `# docker-compose.yml — named volume for file uploads
services:
  backend:
    volumes:
      - pdf_uploads:/app/uploads   # ← survives restarts

volumes:
  pdf_uploads:          # Docker manages this on the host
  mysql_data:           # MySQL data — already configured`,
    tags: ['volumes', 'persistence', 'uploads', 'BLOB'],
  },
  {
    id: 'docker-layer-cache',
    category: 'Docker',
    icon: Rocket,
    color: 'violet',
    title: 'Docker Layer Caching — npm Install is the Bottleneck',
    severity: 'fix-applied',
    summary: 'Using --no-cache in docker compose build forces a full npm install on every deploy, causing 10–15 minute deploys even when only a single JS file changed.',
    problem: 'The workflow was running `docker compose build --no-cache`, which tells Docker to ignore all cached layers and redo every step from scratch — including `npm ci` for the frontend (~3–5 min) and `npm install` for the backend (~1–2 min), on every single push.',
    fix: 'Remove --no-cache. Docker caches each Dockerfile instruction as a layer. Since `COPY package*.json ./` + `RUN npm ci` appear before `COPY . .`, the npm install layer is reused whenever package.json hasn\'t changed. Only a package.json change re-triggers the install. Also replaced `compose down + build + up` with `compose build + up --no-deps frontend backend` so MySQL is never restarted.',
    code: `# Before (10–15 min every deploy):
docker compose build --no-cache
docker compose up -d

# After (2–3 min for code-only changes):
docker compose build frontend backend     # uses layer cache
docker compose up -d --no-deps frontend backend  # MySQL untouched

# Dockerfile layer order that enables caching:
COPY package*.json ./          # ← only changes when deps change
RUN npm ci --only=production   # ← cached if above unchanged
COPY . .                       # ← source changes here, not above
RUN npm run build`,
    tags: ['layer-cache', 'npm ci', 'no-cache', 'deploy-speed'],
  },
  {
    id: 'vite-docker',
    category: 'Frontend / Vite',
    icon: Zap,
    color: 'amber',
    title: 'Vite Build Memory & Performance in Docker',
    severity: 'info',
    summary: 'Vite builds inside Docker require explicit memory limits and NODE_OPTIONS to avoid OOM crashes, especially with large dependency trees (Mermaid, PDF.js, Fabric.js).',
    problem: 'The default Node.js heap size (~1.5 GB) is too small for a build that bundles Mermaid (40+ diagram parsers), PDF.js, Fabric.js, and Recharts. Without the memory flag, `npm run build` silently crashes inside the container with a non-zero exit code.',
    fix: 'Set `ENV NODE_OPTIONS=--max-old-space-size=3072` in the frontend Dockerfile before the build step. This tells Node to allow up to 3 GB of heap for the build process. The resulting dist is then served by nginx (stage 2) with zero Node overhead — nginx is ~5 MB idle.',
    code: `# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent --legacy-peer-deps
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=3072   # ← required
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf`,
    tags: ['vite', 'OOM', 'node-options', 'nginx', 'multi-stage'],
  },
  {
    id: 'vite-chunk-warning',
    category: 'Frontend / Vite',
    icon: AlertTriangle,
    color: 'orange',
    title: 'Large Bundle Chunks — Mermaid & Excalidraw',
    severity: 'info',
    summary: 'Several dependencies (Mermaid, Excalidraw, Fabric.js) produce chunks >500 KB after minification. This is expected but worth understanding.',
    problem: 'Vite warns during build: "Some chunks are larger than 500 kB after minification." The main offenders are Mermaid (~1.1 MB gzip: 361 KB), the Excalidraw bundle (~1.8 MB), and PDF.js (~5.7 MB, gzip: ~1.5 MB). These bloat the initial load.',
    fix: 'Excalidraw is already lazy-loaded via `React.lazy()` — it only downloads when the user navigates to /lab/excalidraw. For Mermaid and PDF.js the chunks load per-route. To go further: split Mermaid diagram parsers with `manualChunks` in vite.config.js, or lazy-load LabPDF and LabFlowcharts the same way Excalidraw is handled.',
    code: `// App.jsx — lazy load heavy lab pages to reduce initial bundle:
const LabExcalidraw = lazy(() => import('./pages/lab/LabExcalidraw'));
const LabPDF        = lazy(() => import('./pages/lab/LabPDF'));
const LabFlowcharts = lazy(() => import('./pages/lab/LabFlowcharts'));

// Use with <Suspense fallback={null}> in the Route:
<Route path="/lab/pdf" element={
  <Suspense fallback={<Loader />}><LabPDF /></Suspense>
} />`,
    tags: ['bundle-size', 'lazy-loading', 'mermaid', 'code-splitting'],
  },
  {
    id: 'mysql-healthcheck',
    category: 'MySQL / Database',
    icon: Database,
    color: 'emerald',
    title: 'MySQL Startup Race — Always Use healthcheck + depends_on',
    severity: 'fix-applied',
    summary: 'MySQL takes 10–30 seconds to initialise. If the backend starts before MySQL is ready, all DB connections fail silently.',
    problem: 'Without a healthcheck, `depends_on: mysql` only waits for the MySQL container to start — not for MySQL to finish initialising the data directory and accepting connections. The backend would crash on startup with "ECONNREFUSED" or "Access denied", appear to be running, but serve 500s for every API call.',
    fix: 'Add a healthcheck to the MySQL service and reference it with `condition: service_healthy` in the backend depends_on. Docker will hold the backend start until mysqladmin ping succeeds — typically 15–30 seconds on first boot, near-instant on subsequent starts.',
    code: `# docker-compose.yml
mysql:
  image: mysql:8.0
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    interval: 10s
    timeout: 5s
    retries: 10       # waits up to 100s before declaring unhealthy

backend:
  depends_on:
    mysql:
      condition: service_healthy   # ← waits for ping, not just container start`,
    tags: ['healthcheck', 'depends_on', 'startup-order', 'ECONNREFUSED'],
  },
  {
    id: 'mysql-init-sql',
    category: 'MySQL / Database',
    icon: Database,
    color: 'teal',
    title: 'MySQL Init SQL Only Runs on First Boot',
    severity: 'info',
    summary: 'Files in /docker-entrypoint-initdb.d/ only execute when the data directory is empty — i.e., on the very first `docker compose up`. Schema changes after that require manual migration.',
    problem: 'Developers expect `/docker-entrypoint-initdb.d/init.sql` to re-run on every deploy, but it only runs once when MySQL initialises an empty data directory. Adding a new table to init.sql on a live deployment has no effect — the existing `mysql_data` volume already has a populated data directory.',
    fix: 'This project handles schema evolution in server.js via `runMigrations()` — an idempotent function that runs `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` on every backend startup. This pattern is safe to run repeatedly and handles adding new tables/columns without destroying existing data.',
    code: `// backend/server.js — idempotent migration runner
async function runMigrations() {
  // Safe to run on every boot — IF NOT EXISTS prevents duplicates
  await pool.query(\`
    CREATE TABLE IF NOT EXISTS pdf_fabric_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
      file_id INT NOT NULL UNIQUE,
      pages JSON,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  \`);
}`,
    tags: ['init.sql', 'migrations', 'schema', 'idempotent'],
  },
  {
    id: 'dockerignore',
    category: 'Docker',
    icon: HardDrive,
    color: 'slate',
    title: '.dockerignore — Prevent Cache Invalidation from node_modules',
    severity: 'fix-applied',
    summary: 'Without .dockerignore, the COPY . . step copies node_modules into the build context, which invalidates the npm install layer on every build even when package.json hasn\'t changed.',
    problem: 'Docker\'s build context is sent to the daemon before any layers are evaluated. If node_modules is in the context, Docker\'s cache key for `COPY . .` changes every time any node_module is modified — forcing a full npm reinstall even when only a .jsx file changed.',
    fix: 'Add .dockerignore files to frontend/ and backend/ that exclude node_modules, dist, .env files, and .git. This keeps the build context small (~KB instead of ~hundreds of MB) and ensures the cache key for `COPY . .` only changes when actual source files change.',
    code: `# frontend/.dockerignore  (and backend/.dockerignore)
node_modules    # ← most important — prevents cache invalidation
dist            # built output — not needed as build input
.env*           # secrets never go into the image
*.log
.git`,
    tags: ['.dockerignore', 'build-context', 'cache', 'node_modules'],
  },
];

const SEVERITY_META = {
  critical:     { label: 'Critical',     bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    icon: XCircle },
  'fix-applied': { label: 'Fixed',       bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  icon: CheckCircle2 },
  info:         { label: 'Info',          bg: 'bg-slate-50',  border: 'border-slate-200',  text: 'text-slate-600',  icon: Info },
};

const COLOR_MAP = {
  blue:    { bg: 'bg-blue-100',    text: 'text-blue-700' },
  violet:  { bg: 'bg-violet-100',  text: 'text-violet-700' },
  amber:   { bg: 'bg-amber-100',   text: 'text-amber-700' },
  orange:  { bg: 'bg-orange-100',  text: 'text-orange-700' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  teal:    { bg: 'bg-teal-100',    text: 'text-teal-700' },
  slate:   { bg: 'bg-slate-100',   text: 'text-slate-700' },
};

const CATEGORIES = ['All', 'Docker', 'Frontend / Vite', 'MySQL / Database'];

function LessonCard({ lesson }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_META[lesson.severity];
  const col = COLOR_MAP[lesson.color];
  const Icon = lesson.icon;
  const SevIcon = sev.icon;

  return (
    <div className={`rounded-xl border ${sev.border} ${sev.bg} overflow-hidden`}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${col.bg}`}>
            <Icon size={15} className={col.text} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sev.bg} ${sev.text} border ${sev.border} flex items-center gap-1`}>
                <SevIcon size={10} />
                {sev.label}
              </span>
              <span className="text-xs text-slate-400">{lesson.category}</span>
            </div>
            <p className="text-sm font-bold text-slate-800 leading-snug">{lesson.title}</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{lesson.summary}</p>
          </div>
          <span className="text-slate-300 text-xs flex-shrink-0 mt-1">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-200/60 pt-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Problem</p>
            <p className="text-xs text-slate-700 leading-relaxed">{lesson.problem}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Fix / Lesson</p>
            <p className="text-xs text-slate-700 leading-relaxed">{lesson.fix}</p>
          </div>
          {lesson.code && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Code</p>
              <pre className="bg-slate-900 text-slate-100 rounded-lg p-3 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">{lesson.code}</pre>
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {lesson.tags.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LessonsTab() {
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? LESSONS : LESSONS.filter(l => l.category === cat);

  const counts = {
    critical:      LESSONS.filter(l => l.severity === 'critical').length,
    'fix-applied': LESSONS.filter(l => l.severity === 'fix-applied').length,
    info:          LESSONS.filter(l => l.severity === 'info').length,
  };

  return (
    <div>
      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { key: 'critical',      label: 'Critical Gotchas',   icon: XCircle,      bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700' },
          { key: 'fix-applied',   label: 'Fixes Applied',      icon: CheckCircle2, bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700' },
          { key: 'info',          label: 'Informational',      icon: Info,         bg: 'bg-slate-50',  border: 'border-slate-200',  text: 'text-slate-600' },
        ].map(({ key, label, icon: Icon, bg, border, text }) => (
          <div key={key} className={`rounded-xl border ${border} ${bg} p-3 flex items-center gap-2`}>
            <Icon size={16} className={text} />
            <div>
              <p className={`text-xl font-extrabold ${text}`}>{counts[key]}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              cat === c ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
            {c} {c === 'All' ? `(${LESSONS.length})` : `(${LESSONS.filter(l => l.category === c).length})`}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map(l => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}

// ── Main Admin Component ───────────────────────────────────────────────────────

export default function Admin() {
  const { activeCompany, selectCompany } = useCompany();
  const { setSections } = useSections();

  const [tab, setTab] = useState('companies');
  const [companies, setCompanies]   = useState([]);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  useEffect(() => {
    setSections([
      { id: 'clients',        label: 'Client List' },
      { id: 'active-client',  label: 'Active Client' },
    ]);
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const { data } = await axios.get('/api/companies');
      setCompanies(data);
    } catch {
      setError('Could not load companies from server.');
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { data } = await axios.post('/api/companies', form);
      setCompanies(prev => [...prev, data]);
      selectCompany(data);
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch {
      setError('Failed to create company. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <span className="badge">Admin</span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Admin</h1>
        <p className="mt-2 text-slate-500">
          Manage client companies and review engineering lessons learned from this build.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {[
          { id: 'companies',  label: 'Companies',       icon: Building2 },
          { id: 'lessons',    label: 'Lessons Learned', icon: BookOpen  },
        ].map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'lessons' ? (
        <LessonsTab />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ── Left: company list ─────────────────────────────── */}
          <section id="clients">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-700 uppercase tracking-wide">Clients</h2>
              <button
                onClick={() => { setShowForm(true); setError(''); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white shadow-sm"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}
              >
                <span className="text-base leading-none">+</span> New Client
              </button>
            </div>

            {companies.length === 0 && !saving && (
              <div className="card text-center py-14 text-slate-400">
                <p className="text-5xl mb-3">🏢</p>
                <p className="font-medium">No companies yet.</p>
                <p className="text-sm mt-1">Click <strong>+ New Client</strong> to get started.</p>
              </div>
            )}

            <ul className="space-y-2">
              {companies.map(c => {
                const isActive = activeCompany?.id === c.id;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => selectCompany(isActive ? null : c)}
                      className="w-full text-left card hover:shadow-md transition-all duration-150"
                      style={isActive ? { borderColor: '#3b82f6', borderWidth: 2 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ background: isActive ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : '#94a3b8' }}
                        >
                          {c.name[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{c.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {[c.industry, c.size ? `${c.size} employees` : null].filter(Boolean).join(' · ') || 'No details added'}
                          </p>
                        </div>
                        {isActive && (
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex-shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ── Right: form or active company detail ────────────── */}
          <section id="active-client">
            {showForm ? (
              <div className="card">
                <h3 className="font-semibold text-slate-800 text-base mb-4">New Client</h3>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <form onSubmit={handleCreate} className="space-y-3">
                  <Field label="Company Name *">
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="input"
                      placeholder="Acme Corp"
                    />
                  </Field>
                  <Field label="Industry">
                    <select
                      value={form.industry}
                      onChange={e => setForm({ ...form, industry: e.target.value })}
                      className="input"
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </Field>
                  <Field label="Company Size">
                    <select
                      value={form.size}
                      onChange={e => setForm({ ...form, size: e.target.value })}
                      className="input"
                    >
                      <option value="">Select size</option>
                      {SIZES.map(s => <option key={s} value={s}>{s} employees</option>)}
                    </select>
                  </Field>
                  <Field label="Contact Name">
                    <input
                      value={form.contact_name}
                      onChange={e => setForm({ ...form, contact_name: e.target.value })}
                      className="input"
                      placeholder="Jane Smith"
                    />
                  </Field>
                  <Field label="Notes">
                    <textarea
                      value={form.notes}
                      onChange={e => setForm({ ...form, notes: e.target.value })}
                      className="input"
                      rows={3}
                      placeholder="Initial discovery notes…"
                    />
                  </Field>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}
                    >
                      {saving ? 'Saving…' : 'Create & Make Active'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setError(''); }}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : activeCompany ? (
              <div className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}
                  >
                    {activeCompany.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg leading-tight">{activeCompany.name}</p>
                    <p className="text-sm text-blue-500 font-semibold mt-0.5">Active Client</p>
                  </div>
                </div>
                <dl className="space-y-2 text-sm">
                  {activeCompany.industry && <Row label="Industry" value={activeCompany.industry} />}
                  {activeCompany.size     && <Row label="Size"     value={`${activeCompany.size} employees`} />}
                  {activeCompany.contact_name && <Row label="Contact" value={activeCompany.contact_name} />}
                  {activeCompany.notes && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <dt className="text-slate-500 mb-1">Notes</dt>
                      <dd className="text-slate-700">{activeCompany.notes}</dd>
                    </div>
                  )}
                </dl>
                <button
                  onClick={() => selectCompany(null)}
                  className="mt-5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Clear active client
                </button>
              </div>
            ) : (
              <div className="card text-center py-14 text-slate-400">
                <p className="text-5xl mb-3">👆</p>
                <p className="font-medium">No active client</p>
                <p className="text-sm mt-1">Select a company from the list to make it active.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-800">{value}</dd>
    </div>
  );
}
