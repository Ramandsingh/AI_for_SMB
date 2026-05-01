import { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '6.1 The ROI Framework',        level: 2 },
  { id: 's2', title: '6.2 Interactive ROI Calculator',level: 2 },
  { id: 's3', title: '6.3 Pre-Built Use Case Models', level: 2 },
  { id: 's4', title: '6.4 Handling Uncertainty',      level: 2 },
];

const PRE_BUILT = [
  { use: 'Email Triage & Draft Replies',    hrs: 20, freq: 22, rate: 65,  uplift: 50, tool: 120 },
  { use: 'Invoice Data Extraction',         hrs: 25, freq: 22, rate: 55,  uplift: 70, tool: 100 },
  { use: 'Proposal Generation',             hrs: 30, freq: 18, rate: 80,  uplift: 50, tool: 180 },
  { use: 'Contract Review & Flagging',      hrs: 22, freq: 8,  rate: 90,  uplift: 40, tool: 150 },
  { use: 'Meeting Notes & CRM Updates',     hrs: 10, freq: 22, rate: 70,  uplift: 60, tool: 80  },
  { use: 'Customer Query Classification',   hrs: 18, freq: 22, rate: 55,  uplift: 55, tool: 130 },
  { use: 'Demand Forecasting Augmentation', hrs: 12, freq: 4,  rate: 85,  uplift: 30, tool: 280 },
  { use: 'Market Intelligence Monitoring',  hrs: 8,  freq: 22, rate: 75,  uplift: 65, tool: 110 },
];

function calcROI({ hrs, freq, rate, upliftPct, toolMonthly, adoptionPct = 100 }) {
  const effectiveUplift = upliftPct * (adoptionPct / 100);
  const monthlyHoursSaved = hrs * freq * (effectiveUplift / 100);
  const monthlySaving = monthlyHoursSaved * rate;
  const monthlyToolCost = toolMonthly;
  const monthlyNet = monthlySaving - monthlyToolCost;
  const annualNet = monthlyNet * 12;
  const totalInvestment = toolMonthly * 12;
  const payback = totalInvestment > 0 && monthlyNet > 0 ? totalInvestment / monthlyNet : null;
  const roi24 = totalInvestment > 0 ? ((annualNet * 2 - totalInvestment) / totalInvestment) * 100 : 0;
  const roi36 = totalInvestment > 0 ? ((annualNet * 3 - totalInvestment) / totalInvestment) * 100 : 0;
  return { monthlyHoursSaved, monthlySaving, monthlyNet, annualNet, payback, roi24, roi36 };
}

function fmt(n) {
  return n == null ? '—' : `$${Math.round(n).toLocaleString()}`;
}

export default function ROICalculator() {
  const [form, setForm] = useState({
    role: '',
    hrs: 10,
    freq: 20,
    rate: 70,
    upliftPct: 50,
    toolMonthly: 150,
  });
  const [adoption, setAdoption] = useState(50);
  const [result, setResult] = useState(null);
  const [models, setModels] = useState([]);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: parseFloat(v) || 0 }));

  useEffect(() => {
    const r = calcROI({
      hrs: form.hrs, freq: form.freq, rate: form.rate,
      upliftPct: form.upliftPct, toolMonthly: form.toolMonthly,
      adoptionPct: adoption,
    });
    setResult(r);
  }, [form, adoption]);

  useEffect(() => {
    setModels(PRE_BUILT.map(m => ({
      ...m,
      ...calcROI({ hrs: m.hrs, freq: m.freq, rate: m.rate, upliftPct: m.uplift, toolMonthly: m.tool, adoptionPct: 50 }),
    })));
  }, []);

  return (
    <PageWrapper
      badge="Page 6 — Planning"
      title="Value & ROI Calculation"
      subtitle="Tools to model the real financial impact of AI on your specific business — with assumptions you control and sensitivity analysis built in."
      sections={SECTIONS}
    >
      {/* 6.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">6.1 The ROI Framework</h2>
        <div className="flex gap-2 items-center flex-wrap mb-4 text-sm">
          {['1. Define the task', '→', '2. Quantify current state', '→', '3. Estimate AI-enabled state', '→', '4. Subtract costs', '→', '5. Express 3 ways'].map((s, i) => (
            <span key={i} className={s === '→' ? 'text-slate-300 text-xl' : 'badge bg-blue-100 text-blue-700 text-xs'}>{s}</span>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          {[
            { metric: 'Payback Period', desc: 'In months. Preferred by owners and operators — how long until I break even?', audience: 'Owner / Operations' },
            { metric: 'Annual Net Saving', desc: 'In dollars after costs. The number that goes on a budget line.', audience: 'CFO / Finance' },
            { metric: 'ROI % over 24–36 months', desc: 'The percentage return for a sustained investment horizon.', audience: 'Board / Investors' },
          ].map(m => (
            <div key={m.metric} className="card">
              <p className="font-semibold text-slate-800 mb-1">{m.metric}</p>
              <p className="text-slate-500 text-xs mb-2">{m.desc}</p>
              <span className="badge-blue text-xs">For: {m.audience}</span>
            </div>
          ))}
        </div>
        <div className="card border-amber-200 bg-amber-50 mt-4 text-sm">
          <p className="font-semibold text-amber-800 mb-1">Conservative assumptions beat aggressive ones</p>
          <p className="text-amber-700">If you believe AI saves 70% of task time, model 50%. If you expect 80% adoption, model 50%. Under-promising in the ROI case means reality beats the forecast — which builds trust and funds the next phase. A CFO who sees "347% ROI" in a vendor deck immediately discounts everything. Show your working and name your assumptions.</p>
        </div>
      </section>

      {/* 6.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">6.2 Interactive ROI Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <p className="text-sm font-semibold text-slate-700 mb-4">Inputs</p>
            <div className="space-y-4">
              {[
                { label: 'Role / Use Case (optional)', key: 'role', type: 'text', unit: '', min: 0, max: 0 },
                { label: 'Hours per task per month', key: 'hrs', type: 'number', unit: 'hrs', min: 1, max: 200 },
                { label: 'Working days per month', key: 'freq', type: 'number', unit: 'days', min: 1, max: 30 },
                { label: 'Fully-loaded hourly rate', key: 'rate', type: 'number', unit: '$/hr', min: 20, max: 500 },
                { label: 'Estimated AI time uplift', key: 'upliftPct', type: 'number', unit: '%', min: 5, max: 90 },
                { label: 'Monthly tool cost', key: 'toolMonthly', type: 'number', unit: '$/mo', min: 0, max: 10000 },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-slate-600 block mb-1">{f.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      min={f.min || undefined}
                      max={f.max || undefined}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                    />
                    {f.unit && <span className="text-xs text-slate-400 w-10 text-right">{f.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div className="card bg-blue-900 text-white border-0">
              <p className="text-sm font-semibold text-blue-300 mb-4">Results at {adoption}% adoption</p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-blue-300">Hours saved / month</p>
                  <p className="text-3xl font-bold">{Math.round(result.monthlyHoursSaved)}<span className="text-lg font-normal text-blue-300"> hrs</span></p>
                </div>
                <div>
                  <p className="text-xs text-blue-300">Monthly net saving</p>
                  <p className="text-2xl font-bold text-emerald-400">{fmt(result.monthlyNet)}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-300">Annual net saving</p>
                  <p className="text-2xl font-bold text-emerald-400">{fmt(result.annualNet)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-700">
                  <div>
                    <p className="text-xs text-blue-300">Payback period</p>
                    <p className="text-xl font-bold">{result.payback ? `${result.payback.toFixed(1)} mo` : '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-300">24-month ROI</p>
                    <p className="text-xl font-bold text-emerald-400">{result.roi24 > 0 ? `${Math.round(result.roi24)}%` : '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Adoption sensitivity */}
        <div className="card">
          <p className="text-sm font-semibold text-slate-700 mb-3">Adoption sensitivity — run the same calculation at different adoption rates</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {[30, 50, 70, 90].map(pct => (
              <button
                key={pct}
                onClick={() => setAdoption(pct)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${adoption === pct ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {pct}% adoption
              </button>
            ))}
          </div>
          {result && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-2 text-slate-500 font-medium">Adoption</th>
                    <th className="text-right p-2 text-slate-500 font-medium">Annual Saving</th>
                    <th className="text-right p-2 text-slate-500 font-medium">Payback</th>
                    <th className="text-right p-2 text-slate-500 font-medium">24m ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {[30, 50, 70, 90].map(pct => {
                    const r = calcROI({ hrs: form.hrs, freq: form.freq, rate: form.rate, upliftPct: form.upliftPct, toolMonthly: form.toolMonthly, adoptionPct: pct });
                    return (
                      <tr key={pct} className={`${pct === adoption ? 'bg-blue-50 font-semibold' : ''}`}>
                        <td className="p-2 text-slate-700">{pct}%</td>
                        <td className={`p-2 text-right ${r.annualNet > 0 ? 'text-emerald-700' : 'text-red-600'}`}>{fmt(r.annualNet)}</td>
                        <td className="p-2 text-right text-slate-600">{r.payback ? `${r.payback.toFixed(1)} mo` : '—'}</td>
                        <td className={`p-2 text-right ${r.roi24 > 0 ? 'text-emerald-700' : 'text-red-600'}`}>{r.roi24 > 0 ? `${Math.round(r.roi24)}%` : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 6.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">6.3 Pre-Built Use Case Models</h2>
        <p className="text-sm text-slate-500 mb-4">Pre-populated at 50% adoption. Actual results vary — use as indicative benchmarks, not guarantees.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left p-3 font-semibold border border-slate-200">Use Case</th>
                <th className="text-right p-3 font-semibold border border-slate-200">Hrs Saved/Mo</th>
                <th className="text-right p-3 font-semibold border border-slate-200">Annual Net</th>
                <th className="text-right p-3 font-semibold border border-slate-200">Payback</th>
                <th className="text-right p-3 font-semibold border border-slate-200">24m ROI</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr key={m.use} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-200 text-slate-700">{m.use}</td>
                  <td className="p-3 border border-slate-200 text-right text-slate-600">{Math.round(m.monthlyHoursSaved)}</td>
                  <td className={`p-3 border border-slate-200 text-right font-medium ${m.annualNet > 0 ? 'text-emerald-700' : 'text-red-600'}`}>{fmt(m.annualNet)}</td>
                  <td className="p-3 border border-slate-200 text-right text-slate-600">{m.payback ? `${m.payback.toFixed(1)} mo` : '—'}</td>
                  <td className={`p-3 border border-slate-200 text-right font-medium ${m.roi24 > 0 ? 'text-emerald-700' : 'text-red-600'}`}>{m.roi24 > 0 ? `${Math.round(m.roi24)}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">6.4 Handling the "Will It Really Work for Us?" Question</h2>
        <div className="space-y-3">
          {[
            { q: 'How do you size the uncertainty?', a: 'Show the 30%–70% adoption range and the payback period at each. Most business cases remain positive at 30% adoption — which is the minimum realistic expectation for a well-run deployment. If it\'s not positive at 30%, the use case probably isn\'t right.' },
            { q: 'What should a proof-of-value engagement cost and deliver?', a: 'Phase B (Proof of Value) should cost less than 6 months\' expected return from the use case. If the annual net saving is $80k, a $40k pilot is proportionate. The pilot should measure against a pre-agreed baseline — not a gut feeling.' },
            { q: 'What success metrics should you set?', a: 'One primary metric (hours saved, error rate, cycle time), one secondary metric (quality score, user satisfaction), and one constraint metric (adoption rate — fail if fewer than X people are using it consistently after 8 weeks).' },
          ].map(item => (
            <div key={item.q} className="card">
              <p className="font-semibold text-slate-800 text-sm mb-2">{item.q}</p>
              <p className="text-slate-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
