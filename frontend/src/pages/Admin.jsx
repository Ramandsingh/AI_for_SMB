import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCompany } from '../context/CompanyContext';
import { useSections } from '../App';

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing',
  'Professional Services', 'Education', 'Logistics', 'Construction', 'Other',
];
const SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];

const EMPTY_FORM = { name: '', industry: '', size: '', contact_name: '', notes: '' };

const PIPELINE_STEPS = [
  {
    title: 'Commit with [deploy]',
    desc: 'Push to branch claude/docker-react-vite-mysql-PeMvf with [deploy] in the commit message. The GitHub Actions workflow only fires when the message contains this keyword — commits without it are silently ignored by the runner.',
    code: 'git commit -m "Add feature X [deploy]"',
  },
  {
    title: 'GitHub notifies your server',
    desc: "GitHub sends a job via HTTPS to the self-hosted runner agent running on MBserver. GitHub's cloud machines are not involved in the actual build — they only store the code and act as the trigger.",
  },
  {
    title: 'Runner checks out source code',
    desc: "The runner runs git checkout on the server, pulling all JSX files, configs, and Dockerfiles onto the server's disk.",
  },
  {
    title: 'Docker Stage 1 — Vite compiles JSX',
    desc: 'A temporary Node 20 container runs npm ci (cached if package.json unchanged) then npm run build. Vite compiles every .jsx file into plain HTML + JS + CSS in /app/dist/. The Node container is then discarded entirely.',
    code: 'npm run build  # JSX → /app/dist/ — static files, no Node needed to serve them',
  },
  {
    title: 'Docker Stage 2 — nginx image',
    desc: 'Only the /dist/ files are copied into a tiny nginx image. The final running container has no Node.js, no JSX, no npm — just static files and a web server config.',
  },
  {
    title: 'Containers restart',
    desc: 'docker compose up -d restarts nginx (port 3001) and the Express API. MySQL is never restarted — its data lives in a named Docker volume that survives every deploy.',
  },
  {
    title: 'Browser loads the app',
    desc: 'nginx returns the same index.html for every URL. React Router runs in the browser, reads the URL path, and renders the correct page component client-side. Only DB operations (assessments, ROI saves) hit the backend API at /api/*.',
  },
];

const BUILD_TIMES = [
  ['git checkout', 'Server (runner)', '~5 sec'],
  ['npm ci', 'Inside Docker, server', '~10 sec cached / ~2 min cold'],
  ['npm run build (Vite)', 'Inside Docker, server', '~1–3 min'],
  ['docker compose up', 'Server', '~10 sec'],
];

export default function Admin() {
  const { activeCompany, selectCompany } = useCompany();
  const { setSections } = useSections();

  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');
  const [tab, setTab]             = useState('companies');

  useEffect(() => {
    setSections([
      { id: 'clients',       label: 'Client List' },
      { id: 'active-client', label: 'Active Client' },
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
          Manage clients and view system documentation.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {[['companies', 'Companies'], ['architecture', 'Architecture']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'companies' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

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
      </div>}

      {tab === 'architecture' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-800 text-sm">The build runs on your server, not GitHub's cloud.</p>
            <p className="text-blue-700 text-sm mt-1">
              GitHub stores code and sends a trigger. Your server (MBserver) has a self-hosted runner agent
              that receives the job and does all the work locally.
            </p>
          </div>

          <div className="space-y-3">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={i} className="card flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{step.desc}</p>
                  {step.code && (
                    <pre className="mt-2 text-xs bg-slate-900 text-green-400 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">{step.code}</pre>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3">Typical Build Time</h3>
            <table className="text-sm w-full">
              <thead>
                <tr className="text-xs uppercase text-slate-400 border-b border-slate-100">
                  <th className="text-left pb-2 font-semibold">Step</th>
                  <th className="text-left pb-2 font-semibold">Where</th>
                  <th className="text-right pb-2 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BUILD_TIMES.map(([step, where, time]) => (
                  <tr key={step}>
                    <td className="py-2 font-medium text-slate-700">{step}</td>
                    <td className="py-2 text-slate-500">{where}</td>
                    <td className="py-2 text-right text-slate-600 font-mono text-xs">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3">Key Facts</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">→</span>The compiled <code className="bg-slate-100 px-1 rounded">/dist/</code> folder is never stored in GitHub — it lives only inside the Docker image on the server.</li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">→</span>Every deploy produces a fresh image from source. Docker layer caching skips npm ci if package.json hasn't changed.</li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">→</span>MySQL data lives in a named Docker volume and is never affected by deploys.</li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">→</span>Pages are "static" files but the app is a full React SPA — all routing and UI logic runs in the browser. The backend is only called for DB reads/writes.</li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">→</span>nginx's <code className="bg-slate-100 px-1 rounded">try_files $uri /index.html</code> means every URL path (including new routes) works without any nginx config changes.</li>
            </ul>
          </div>
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
