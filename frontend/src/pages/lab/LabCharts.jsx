import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  Legend,
} from 'recharts';

// ── Spider / Radar ────────────────────────────────────────────────────────────
const RADAR_DATA = [
  { dim: 'Strategy',    yours: 65, leader: 92 },
  { dim: 'Data',        yours: 45, leader: 88 },
  { dim: 'Technology',  yours: 72, leader: 90 },
  { dim: 'Talent',      yours: 38, leader: 85 },
  { dim: 'Governance',  yours: 28, leader: 78 },
  { dim: 'Culture',     yours: 55, leader: 82 },
];

// ── Bar Chart ─────────────────────────────────────────────────────────────────
const BAR_DATA = [
  { function: 'IT & Dev',    adoption: 92, color: '#2563eb' },
  { function: 'Marketing',   adoption: 76, color: '#3b82f6' },
  { function: 'Finance',     adoption: 74, color: '#60a5fa' },
  { function: 'Cust. Svc',   adoption: 71, color: '#93c5fd' },
  { function: 'Supply Chain',adoption: 58, color: '#bfdbfe' },
  { function: 'HR',          adoption: 44, color: '#dbeafe' },
];

// ── Heatmap ───────────────────────────────────────────────────────────────────
const HOURS = ['6am','8am','10am','12pm','2pm','4pm','6pm','8pm'];
const DAYS  = ['Mon','Tue','Wed','Thu','Fri'];
function randVal(seed) { return ((seed * 1237 + 89) % 97) + 3; }
const HEATMAP = DAYS.map((d, di) =>
  HOURS.map((h, hi) => ({ day: d, hour: h, val: randVal(di * 11 + hi * 7) }))
);

function heatColor(v) {
  if (v < 20) return '#f0f9ff';
  if (v < 40) return '#bae6fd';
  if (v < 60) return '#38bdf8';
  if (v < 80) return '#0284c7';
  return '#0c4a6e';
}

// ── Maturity Matrix ───────────────────────────────────────────────────────────
const MAT_DIMS  = ['Strategy','Data','Technology','Talent','Governance'];
const MAT_STAGES = ['S1','S2','S3','S4','S5'];
const MAT_VALS = [
  [1,2,3,4,5],
  [0,1,2,4,5],
  [1,2,3,4,5],
  [0,1,1,3,4],
  [0,0,2,3,5],
];
function matColor(v) {
  const c = ['#f8fafc','#dbeafe','#93c5fd','#3b82f6','#1d4ed8','#1e3a8a'];
  return c[Math.min(v, 5)];
}

// ── Coverage Table (dot size) ─────────────────────────────────────────────────
const COVER_TOOLS  = ['Copilot M365','GitHub Copilot','Claude API','Salesforce AI','ServiceNow AI'];
const COVER_ROLES  = ['Exec','Manager','Analyst','Engineer','Support'];
const COVER_MATRIX = [
  [5,4,3,2,3],
  [1,2,2,5,1],
  [3,3,4,3,2],
  [2,3,4,5,2],
  [1,2,3,3,4],
];

function DotCell({ value }) {
  const r = value === 0 ? 0 : 4 + value * 3.5;
  const colors = ['#f1f5f9','#bfdbfe','#60a5fa','#2563eb','#1e40af','#1e3a8a'];
  return (
    <td style={{ width: 64, height: 44, textAlign: 'center', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9' }}>
      {value > 0 && (
        <svg width={r*2} height={r*2} style={{ margin: 'auto', display: 'block' }}>
          <circle cx={r} cy={r} r={r} fill={colors[value]} opacity={0.9} />
        </svg>
      )}
    </td>
  );
}

export default function LabCharts() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">recharts · RadarChart · BarChart · custom SVG</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Data Visualisation</h1>
      <p className="text-slate-500 text-sm mb-8">Spider chart, bar chart, heatmap, maturity matrix, and coverage table — all in one view.</p>

      <div className="space-y-8">

        {/* Spider + Bar side by side */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Spider */}
          <div className="card">
            <p className="text-sm font-bold text-slate-700 mb-1">AI Readiness Spider Chart</p>
            <p className="text-xs text-slate-400 mb-3">Your organisation vs. sector leaders</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius={90}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false} />
                <Radar name="Your Org" dataKey="yours" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                <Radar name="Sector Leader" dataKey="leader" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 2" />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar */}
          <div className="card">
            <p className="text-sm font-bold text-slate-700 mb-1">AI Adoption by Function</p>
            <p className="text-xs text-slate-400 mb-3">% of enterprises with production AI (2024)</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: 8, right: 32 }}>
                <XAxis type="number" domain={[0,100]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="function" tick={{ fontSize: 11 }} width={76} />
                <Tooltip formatter={v => `${v}%`} />
                <Bar dataKey="adoption" radius={[0,4,4,0]} label={{ position: 'right', fontSize: 10, fill: '#64748b', formatter: v => `${v}%` }}>
                  {BAR_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap */}
        <div className="card">
          <p className="text-sm font-bold text-slate-700 mb-1">AI Tool Usage Heatmap</p>
          <p className="text-xs text-slate-400 mb-4">Relative intensity by day and hour (simulated)</p>
          <div className="overflow-x-auto">
            <table style={{ borderCollapse: 'separate', borderSpacing: 4 }}>
              <thead>
                <tr>
                  <th style={{ width: 32 }} />
                  {HOURS.map(h => <th key={h} style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', width: 44, textAlign: 'center', paddingBottom: 4 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day, di) => (
                  <tr key={day}>
                    <td style={{ fontSize: 11, fontWeight: 600, color: '#64748b', paddingRight: 8, textAlign: 'right' }}>{day}</td>
                    {HEATMAP[di].map((cell, hi) => (
                      <td key={hi} title={`${day} ${cell.hour}: ${cell.val}`} style={{ width: 44, height: 28, background: heatColor(cell.val), borderRadius: 4, cursor: 'default' }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400">Low</span>
              {['#f0f9ff','#bae6fd','#38bdf8','#0284c7','#0c4a6e'].map(c => (
                <div key={c} style={{ width: 20, height: 14, background: c, borderRadius: 3 }} />
              ))}
              <span className="text-xs text-slate-400">High</span>
            </div>
          </div>
        </div>

        {/* Maturity Matrix */}
        <div className="card">
          <p className="text-sm font-bold text-slate-700 mb-1">AI Maturity Matrix</p>
          <p className="text-xs text-slate-400 mb-4">Required capability level per dimension at each maturity stage (0=none, 5=optimised)</p>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-500 pb-2 pr-4">Dimension</th>
                  {MAT_STAGES.map(s => (
                    <th key={s} className="text-center text-xs font-semibold text-slate-500 pb-2 w-16">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MAT_DIMS.map((dim, di) => (
                  <tr key={dim}>
                    <td className="text-sm text-slate-700 py-1.5 pr-4 font-medium">{dim}</td>
                    {MAT_STAGES.map((_, si) => (
                      <td key={si} className="text-center py-1.5">
                        <div
                          className="w-12 h-8 rounded-lg mx-auto flex items-center justify-center text-xs font-bold"
                          style={{ background: matColor(MAT_VALS[di][si]), color: MAT_VALS[di][si] >= 4 ? '#fff' : '#1e293b' }}
                        >
                          {MAT_VALS[di][si]}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coverage Table */}
        <div className="card">
          <p className="text-sm font-bold text-slate-700 mb-1">Coverage Table · Tool × Role</p>
          <p className="text-xs text-slate-400 mb-4">Dot size = capability depth (1–5). Larger dot = deeper integration for that role.</p>
          <div className="overflow-x-auto">
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', fontSize: 11, color: '#94a3b8', fontWeight: 600, paddingRight: 12, paddingBottom: 8 }}>Tool</th>
                  {COVER_ROLES.map(r => (
                    <th key={r} style={{ width: 64, textAlign: 'center', fontSize: 11, color: '#94a3b8', fontWeight: 600, paddingBottom: 8 }}>{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVER_TOOLS.map((tool, ti) => (
                  <tr key={tool}>
                    <td style={{ fontSize: 12, color: '#374151', fontWeight: 600, paddingRight: 12, borderBottom: '1px solid #f1f5f9', paddingTop: 4, paddingBottom: 4, whiteSpace: 'nowrap' }}>{tool}</td>
                    {COVER_ROLES.map((_, ri) => <DotCell key={ri} value={COVER_MATRIX[ti][ri]} />)}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400">Coverage:</span>
              {[1,2,3,4,5].map(v => {
                const r = 4 + v * 3.5;
                const colors = ['#f1f5f9','#bfdbfe','#60a5fa','#2563eb','#1e40af','#1e3a8a'];
                return (
                  <div key={v} className="flex items-center gap-1">
                    <svg width={r*2} height={r*2}><circle cx={r} cy={r} r={r} fill={colors[v]} /></svg>
                    <span className="text-xs text-slate-400">{v}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
