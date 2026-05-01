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

export default function Admin() {
  const { activeCompany, selectCompany } = useCompany();
  const { setSections } = useSections();

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
      <div className="mb-8">
        <span className="badge">Admin</span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Company Profiles</h1>
        <p className="mt-2 text-slate-500 text-lg">
          Switch between client companies or add a new one. The active company is linked to all assessments and ROI calculations.
        </p>
      </div>

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
