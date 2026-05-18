import {
  // Shared
  ResponsiveContainer, Tooltip, Legend, Cell,
  XAxis, YAxis, CartesianGrid,
  // Line / Area / Composed
  LineChart, Line, AreaChart, Area, ComposedChart, Bar, ReferenceLine,
  // Bar (existing)
  BarChart,
  // Radar (existing)
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  // Pie / Donut
  PieChart, Pie, Sector,
  // Radial
  RadialBarChart, RadialBar,
  // Scatter / Bubble
  ScatterChart, Scatter, ZAxis,
  // Treemap
  Treemap,
  // Funnel
  FunnelChart, Funnel, LabelList,
  // Sankey
  Sankey,
  // Sunburst
  SunburstChart,
} from 'recharts';

// ════════════════════════════════════════════════════════════════════════════
// Data
// ════════════════════════════════════════════════════════════════════════════

// Trend ─────────────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const LINE_DATA = MONTHS.map((m, i) => ({
  month: m,
  adoption: Math.round(32 + i * 5.5 + (i % 3) * 2),
  benchmark: Math.round(28 + i * 4),
}));

const AREA_DATA = MONTHS.map((m, i) => ({
  month: m,
  Productivity: Math.round(20 + i * 3 + (i % 2) * 3),
  Analytics:    Math.round(15 + i * 2.5),
  Automation:   Math.round(10 + i * 2 + (i % 4) * 2),
  GenAI:        Math.round(2 + i * 4),
}));

const COMPOSED_DATA = [
  { q: 'Q1 23', budget: 120, roi: 95,  margin: -25 },
  { q: 'Q2 23', budget: 150, roi: 140, margin: -10 },
  { q: 'Q3 23', budget: 180, roi: 190, margin: 10  },
  { q: 'Q4 23', budget: 200, roi: 260, margin: 60  },
  { q: 'Q1 24', budget: 240, roi: 340, margin: 100 },
  { q: 'Q2 24', budget: 280, roi: 430, margin: 150 },
];

// Comparison ─────────────────────────────────────────────────────────────────
const RADAR_DATA = [
  { dim: 'Strategy',   yours: 65, leader: 92 },
  { dim: 'Data',       yours: 45, leader: 88 },
  { dim: 'Technology', yours: 72, leader: 90 },
  { dim: 'Talent',     yours: 38, leader: 85 },
  { dim: 'Governance', yours: 28, leader: 78 },
  { dim: 'Culture',    yours: 55, leader: 82 },
];

const BAR_DATA = [
  { function: 'IT & Dev',     adoption: 92, color: '#2563eb' },
  { function: 'Marketing',    adoption: 76, color: '#3b82f6' },
  { function: 'Finance',      adoption: 74, color: '#60a5fa' },
  { function: 'Cust. Svc',    adoption: 71, color: '#93c5fd' },
  { function: 'Supply Chain', adoption: 58, color: '#bfdbfe' },
  { function: 'HR',           adoption: 44, color: '#dbeafe' },
];

const RADIAL_DATA = [
  { name: 'Governance', value: 28,  fill: '#ef4444' },
  { name: 'Talent',     value: 38,  fill: '#f97316' },
  { name: 'Data',       value: 45,  fill: '#eab308' },
  { name: 'Culture',    value: 55,  fill: '#22c55e' },
  { name: 'Strategy',   value: 65,  fill: '#3b82f6' },
  { name: 'Technology', value: 72,  fill: '#8b5cf6' },
];

// Composition ─────────────────────────────────────────────────────────────────
const PIE_DATA = [
  { name: 'Data & Infrastructure', value: 35, color: '#2563eb' },
  { name: 'Model & Platform',      value: 28, color: '#3b82f6' },
  { name: 'Integration',           value: 20, color: '#60a5fa' },
  { name: 'Training & Change',     value: 17, color: '#93c5fd' },
];

const DONUT_DATA = [
  { name: 'Predictive Analytics', value: 30, color: '#10b981' },
  { name: 'Process Automation',   value: 25, color: '#34d399' },
  { name: 'NLP / GenAI',          value: 22, color: '#6ee7b7' },
  { name: 'Computer Vision',      value: 13, color: '#a7f3d0' },
  { name: 'Recommendation',       value: 10, color: '#d1fae5' },
];

const TREEMAP_DATA = [
  { name: 'Enterprise', size: 480, color: '#1d4ed8' },
  { name: 'Cloud',      size: 340, color: '#2563eb' },
  { name: 'Data Ops',   size: 280, color: '#3b82f6' },
  { name: 'Security',   size: 220, color: '#60a5fa' },
  { name: 'Dev Tools',  size: 180, color: '#93c5fd' },
  { name: 'Analytics',  size: 160, color: '#bfdbfe' },
  { name: 'Automation', size: 140, color: '#2563eb' },
  { name: 'Collab',     size: 100, color: '#3b82f6' },
];

const FUNNEL_DATA = [
  { name: 'Identified',   value: 240, fill: '#1d4ed8' },
  { name: 'Assessed',     value: 178, fill: '#2563eb' },
  { name: 'Piloted',      value: 112, fill: '#3b82f6' },
  { name: 'Approved',     value: 68,  fill: '#60a5fa' },
  { name: 'Production',   value: 34,  fill: '#93c5fd' },
];

// Distribution & Correlation ─────────────────────────────────────────────────
const SCATTER_DATA = [
  { size: 120, maturity: 72, name: 'IT' },
  { size: 85,  maturity: 55, name: 'Marketing' },
  { size: 200, maturity: 80, name: 'Finance' },
  { size: 60,  maturity: 38, name: 'HR' },
  { size: 150, maturity: 65, name: 'Ops' },
  { size: 40,  maturity: 28, name: 'Legal' },
  { size: 95,  maturity: 60, name: 'Sales' },
  { size: 180, maturity: 78, name: 'R&D' },
  { size: 70,  maturity: 45, name: 'Support' },
];

const HOURS = ['6am','8am','10am','12pm','2pm','4pm','6pm','8pm'];
const DAYS  = ['Mon','Tue','Wed','Thu','Fri'];
function randVal(seed) { return ((seed * 1237 + 89) % 97) + 3; }
const HEATMAP = DAYS.map((d, di) =>
  HOURS.map((h, hi) => ({ day: d, hour: h, val: randVal(di * 11 + hi * 7) }))
);
function heatColor(v) {
  if (v < 20) return '#f0f9ff'; if (v < 40) return '#bae6fd';
  if (v < 60) return '#38bdf8'; if (v < 80) return '#0284c7';
  return '#0c4a6e';
}

// Flow & Hierarchy ─────────────────────────────────────────────────────────────
const SANKEY_DATA = {
  nodes: [
    { name: 'AI Budget' },
    { name: 'Data Infra' },
    { name: 'ML Models' },
    { name: 'Integration' },
    { name: 'Training' },
    { name: 'Cost Saving' },
    { name: 'Revenue Lift' },
    { name: 'Efficiency' },
  ],
  links: [
    { source: 0, target: 1, value: 30 },
    { source: 0, target: 2, value: 40 },
    { source: 0, target: 3, value: 20 },
    { source: 0, target: 4, value: 10 },
    { source: 1, target: 5, value: 15 },
    { source: 1, target: 7, value: 15 },
    { source: 2, target: 5, value: 20 },
    { source: 2, target: 6, value: 20 },
    { source: 3, target: 6, value: 10 },
    { source: 3, target: 7, value: 10 },
    { source: 4, target: 7, value: 10 },
  ],
};

const SUNBURST_DATA = {
  name: 'AI Org',
  children: [
    { name: 'Engineering', children: [
      { name: 'ML Eng',    value: 40 },
      { name: 'Data Eng',  value: 30 },
      { name: 'DevOps',    value: 20 },
    ]},
    { name: 'Product', children: [
      { name: 'AI PM',     value: 25 },
      { name: 'Design',    value: 15 },
    ]},
    { name: 'Science', children: [
      { name: 'Research',  value: 30 },
      { name: 'Analytics', value: 20 },
    ]},
    { name: 'Governance', children: [
      { name: 'Risk',      value: 15 },
      { name: 'Ethics',    value: 10 },
    ]},
  ],
};

// Custom SVG ──────────────────────────────────────────────────────────────────
const WATERFALL = [
  { label: 'Baseline', value: 100, type: 'base'    },
  { label: 'Automation', value: 45, type: 'pos'    },
  { label: 'Analytics',  value: 30, type: 'pos'    },
  { label: 'Training cost', value: -20, type: 'neg' },
  { label: 'Infra cost', value: -15, type: 'neg'   },
  { label: 'Total ROI', value: 140, type: 'total'  },
];

const SPARK = [
  { label: 'AI Projects', data: [12,15,14,18,22,25,24,28,30,33,31,36], color: '#2563eb', delta: '+200%' },
  { label: 'Avg ROI',     data: [1.1,1.3,1.2,1.5,1.8,2.1,2.0,2.4,2.7,3.1,2.9,3.4], color: '#10b981', delta: '+209%' },
  { label: 'Adoption %',  data: [18,21,24,27,31,35,38,42,46,51,55,60], color: '#8b5cf6', delta: '+233%' },
  { label: 'Incidents',   data: [8,7,9,6,5,4,5,3,4,2,3,2], color: '#ef4444', delta: '-75%' },
];

const BULLET = [
  { label: 'Strategy',   actual: 65, target: 80, range: [0,40,65,100] },
  { label: 'Data',       actual: 45, target: 70, range: [0,30,50,100] },
  { label: 'Technology', actual: 72, target: 85, range: [0,45,70,100] },
  { label: 'Talent',     actual: 38, target: 60, range: [0,30,50,100] },
];

const MAT_DIMS   = ['Strategy','Data','Technology','Talent','Governance'];
const MAT_STAGES = ['S1','S2','S3','S4','S5'];
const MAT_VALS   = [[1,2,3,4,5],[0,1,2,4,5],[1,2,3,4,5],[0,1,1,3,4],[0,0,2,3,5]];
function matColor(v) {
  return ['#f8fafc','#dbeafe','#93c5fd','#3b82f6','#1d4ed8','#1e3a8a'][Math.min(v,5)];
}

const COVER_TOOLS  = ['Copilot M365','GitHub Copilot','Claude API','Salesforce AI','ServiceNow AI'];
const COVER_ROLES  = ['Exec','Manager','Analyst','Engineer','Support'];
const COVER_MATRIX = [[5,4,3,2,3],[1,2,2,5,1],[3,3,4,3,2],[2,3,4,5,2],[1,2,3,3,4]];
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

// ════════════════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════════════════
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{children}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function ChartCard({ title, sub, children }) {
  return (
    <div className="card">
      <p className="text-sm font-bold text-slate-700 mb-0.5">{title}</p>
      {sub && <p className="text-xs text-slate-400 mb-3">{sub}</p>}
      {children}
    </div>
  );
}

// Custom tooltip that works for most recharts charts
function CustomTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-2 text-xs">
      {label && <p className="font-semibold text-slate-600 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span></p>
      ))}
    </div>
  );
}

// Spark line (pure SVG, no recharts)
function SparkLine({ data, color, width = 120, height = 36 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const xStep = width / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * xStep;
    const y = height - ((v - min) / (max - min || 1)) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={data.length * xStep - xStep} cy={parseFloat(pts.split(' ').at(-1).split(',')[1])} r={3} fill={color} />
    </svg>
  );
}

// Gauge / meter (SVG arc)
function Gauge({ value, max = 100, color = '#2563eb', size = 140 }) {
  const r = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const startAngle = Math.PI * 0.75;
  const endAngle   = Math.PI * 2.25;
  const pct = Math.min(value / max, 1);
  const totalArc = endAngle - startAngle;
  const fillArc  = totalArc * pct;
  const toXY = a => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  const s  = toXY(startAngle);
  const e  = toXY(startAngle + fillArc);
  const eF = toXY(endAngle);
  const la = fillArc > Math.PI ? 1 : 0;
  return (
    <svg width={size} height={size * 0.75} style={{ display: 'block', margin: 'auto' }}>
      <path d={`M${s.x},${s.y} A${r},${r} 0 1 1 ${eF.x},${eF.y}`} fill="none" stroke="#e2e8f0" strokeWidth={12} strokeLinecap="round" />
      <path d={`M${s.x},${s.y} A${r},${r} 0 ${la} 1 ${e.x},${e.y}`} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={22} fontWeight={700} fill="#1e293b">{value}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize={10} fill="#94a3b8">/ {max}</text>
    </svg>
  );
}

// Waterfall bar (SVG)
function WaterfallChart({ data }) {
  const barW = 44;
  const gap  = 14;
  const H    = 180;
  const maxV = 160;
  let running = 0;
  const bars = data.map(d => {
    const base = d.type === 'base' || d.type === 'total' ? 0 : running;
    const start = d.type === 'neg' ? base + d.value : base;
    const end   = d.type === 'neg' ? base : base + d.value;
    if (d.type !== 'total') running += d.value;
    return { ...d, start, end };
  });
  const totalW = data.length * (barW + gap);
  return (
    <svg width="100%" viewBox={`0 0 ${totalW + 20} ${H + 40}`}>
      {bars.map((b, i) => {
        const x = 10 + i * (barW + gap);
        const yTop = H - (b.end / maxV) * H;
        const yBot = H - (b.start / maxV) * H;
        const bH   = Math.max(yBot - yTop, 2);
        const fill = b.type === 'pos' ? '#22c55e' : b.type === 'neg' ? '#ef4444' : b.type === 'total' ? '#2563eb' : '#94a3b8';
        return (
          <g key={i}>
            <rect x={x} y={yTop} width={barW} height={bH} fill={fill} opacity={0.85} rx={3} />
            <text x={x + barW/2} y={yTop - 4} textAnchor="middle" fontSize={10} fill={fill} fontWeight={600}>
              {b.value > 0 ? '+' : ''}{b.value}
            </text>
            <text x={x + barW/2} y={H + 14} textAnchor="middle" fontSize={9} fill="#64748b">{b.label}</text>
          </g>
        );
      })}
      <line x1={10} y1={H} x2={totalW + 10} y2={H} stroke="#e2e8f0" strokeWidth={1} />
    </svg>
  );
}

// Bullet chart (SVG)
function BulletRow({ label, actual, target, range }) {
  const W = 220;
  const H = 22;
  const [r0, r1, r2, r3] = range;
  const pct = v => ((v - r0) / (r3 - r0)) * W;
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs text-slate-600 w-20 text-right font-medium">{label}</span>
      <svg width={W} height={H}>
        <rect x={0} y={4} width={pct(r3)} height={H-8} fill="#f1f5f9" rx={2} />
        <rect x={0} y={4} width={pct(r2)} height={H-8} fill="#e2e8f0" rx={2} />
        <rect x={0} y={4} width={pct(r1)} height={H-8} fill="#cbd5e1" rx={2} />
        <rect x={0} y={6} width={pct(actual)} height={H-12} fill="#2563eb" rx={2} />
        <line x1={pct(target)} y1={0} x2={pct(target)} y2={H} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <span className="text-xs text-blue-600 font-bold">{actual}</span>
      <span className="text-xs text-slate-400">/ {target}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Page
// ════════════════════════════════════════════════════════════════════════════
export default function LabCharts() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <a href="https://recharts.org" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full hover:bg-rose-100 transition-colors" style={{ textDecoration: 'none' }}>
          recharts · custom SVG · 19 chart types ↗
        </a>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Data Visualisation</h1>
      <p className="text-slate-500 text-sm mb-8">
        19 chart types grouped by purpose — trend, comparison, composition, distribution, flow, and custom SVG.
      </p>

      <div className="space-y-10">

        {/* ── 1. Trend & Time Series ── */}
        <section>
          <SectionLabel>Trend &amp; Time Series</SectionLabel>
          <div className="space-y-6">

            {/* Line */}
            <ChartCard title="Line Chart · AI Adoption Rate" sub="Monthly adoption % vs. industry benchmark">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={LINE_DATA} margin={{ right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTip />} formatter={v => `${v}%`} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="adoption"  name="Your Org"  stroke="#2563eb" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Stacked Area */}
            <ChartCard title="Stacked Area Chart · AI Use by Category" sub="Relative share of AI tool categories over 12 months">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={AREA_DATA} margin={{ right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTip />} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="Productivity" stackId="1" stroke="#2563eb" fill="#bfdbfe" />
                  <Area type="monotone" dataKey="Analytics"    stackId="1" stroke="#8b5cf6" fill="#ddd6fe" />
                  <Area type="monotone" dataKey="Automation"   stackId="1" stroke="#10b981" fill="#a7f3d0" />
                  <Area type="monotone" dataKey="GenAI"        stackId="1" stroke="#f59e0b" fill="#fde68a" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Composed — Bar + Line */}
            <ChartCard title="Composed Chart · Budget vs ROI" sub="AI programme spend ($k) versus value delivered ($k)">
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={COMPOSED_DATA} margin={{ right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="q" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${v}k`} />
                  <Tooltip content={<CustomTip />} formatter={v => `$${v}k`} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="budget" name="Budget" fill="#bfdbfe" radius={[3,3,0,0]} />
                  <Line type="monotone" dataKey="roi" name="ROI" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: '#2563eb' }} />
                  <ReferenceLine y={0} stroke="#e2e8f0" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>
        </section>

        {/* ── 2. Comparison ── */}
        <section>
          <SectionLabel>Comparison</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Radar */}
            <ChartCard title="Radar / Spider Chart" sub="Your organisation vs. sector leaders">
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
            </ChartCard>

            {/* Bar */}
            <ChartCard title="Bar Chart · Horizontal" sub="% of enterprises with production AI (2024)">
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
            </ChartCard>

            {/* Radial Bar */}
            <ChartCard title="Radial Bar Chart" sub="AI readiness score per dimension (0–100)">
              <ResponsiveContainer width="100%" height={260}>
                <RadialBarChart innerRadius={30} outerRadius={110} data={RADIAL_DATA} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" background={{ fill: '#f8fafc' }} cornerRadius={4} label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 10 }} layout="vertical" align="right" verticalAlign="middle" />
                  <Tooltip formatter={v => `${v} / 100`} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Bullet */}
            <ChartCard title="Bullet Chart" sub="Actual vs target score per dimension. Bar = actual, tick = target.">
              <div className="pt-2">
                {BULLET.map(b => <BulletRow key={b.label} {...b} />)}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm inline-block bg-slate-200" /> Poor</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm inline-block bg-slate-300" /> Fair</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm inline-block bg-slate-400" /> Good</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-sm inline-block bg-blue-600" /> Actual</span>
                  <span className="flex items-center gap-1"><span className="w-0.5 h-4 inline-block bg-slate-900" /> Target</span>
                </div>
              </div>
            </ChartCard>

          </div>
        </section>

        {/* ── 3. Composition & Proportion ── */}
        <section>
          <SectionLabel>Composition &amp; Proportion</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Pie */}
            <ChartCard title="Pie Chart" sub="AI budget allocation by category">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name.split(' ')[0]} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {PIE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={v => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Donut */}
            <ChartCard title="Donut Chart" sub="AI use-case distribution across the organisation">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={DONUT_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                    {DONUT_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={v => `${v}%`} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Treemap */}
            <ChartCard title="Treemap" sub="AI investment by platform domain — area = relative spend">
              <ResponsiveContainer width="100%" height={220}>
                <Treemap data={TREEMAP_DATA} dataKey="size" aspectRatio={4/3}
                  content={({ x, y, width, height, name, root, depth }) => (
                    <g>
                      <rect x={x+1} y={y+1} width={width-2} height={height-2}
                        fill={TREEMAP_DATA.find(d => d.name === name)?.color ?? '#2563eb'} rx={3} opacity={0.85} />
                      {width > 40 && height > 24 && (
                        <text x={x+width/2} y={y+height/2} textAnchor="middle" dominantBaseline="middle"
                          fontSize={Math.min(11, width/7)} fill="#fff" fontWeight={600}>
                          {name}
                        </text>
                      )}
                    </g>
                  )}
                />
              </ResponsiveContainer>
            </ChartCard>

            {/* Funnel */}
            <ChartCard title="Funnel Chart" sub="AI project pipeline — from identification to production">
              <ResponsiveContainer width="100%" height={220}>
                <FunnelChart>
                  <Tooltip formatter={v => `${v} projects`} />
                  <Funnel dataKey="value" data={FUNNEL_DATA} isAnimationActive>
                    <LabelList position="right" fill="#64748b" fontSize={11} dataKey="name" />
                    <LabelList position="center" fill="#fff" fontSize={11} fontWeight={700} dataKey="value" />
                    {FUNNEL_DATA.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>
        </section>

        {/* ── 4. Distribution & Correlation ── */}
        <section>
          <SectionLabel>Distribution &amp; Correlation</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Scatter */}
            <ChartCard title="Scatter Chart" sub="Dept. headcount vs AI maturity score">
              <ResponsiveContainer width="100%" height={240}>
                <ScatterChart margin={{ top: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="size" name="Team Size" tick={{ fontSize: 10 }} label={{ value: 'Team size', position: 'insideBottom', offset: -4, fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis type="number" dataKey="maturity" name="Maturity" tick={{ fontSize: 10 }} domain={[0,100]} label={{ value: 'Maturity %', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return <div className="bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-2 text-xs"><p className="font-bold text-slate-700">{d?.name}</p><p className="text-slate-500">Team: {d?.size} · Maturity: {d?.maturity}%</p></div>;
                  }} />
                  <Scatter data={SCATTER_DATA} fill="#2563eb" fillOpacity={0.7}>
                    {SCATTER_DATA.map((d, i) => <Cell key={i} fill="#2563eb" />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Bubble (Scatter + ZAxis) */}
            <ChartCard title="Bubble Chart" sub="Team size × maturity × relative AI investment (bubble size)">
              <ResponsiveContainer width="100%" height={240}>
                <ScatterChart margin={{ top: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="size" name="Team Size" tick={{ fontSize: 10 }} />
                  <YAxis type="number" dataKey="maturity" name="Maturity" tick={{ fontSize: 10 }} domain={[0,100]} />
                  <ZAxis type="number" dataKey="size" range={[40, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return <div className="bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-2 text-xs"><p className="font-bold">{d?.name}</p><p className="text-slate-500">Team: {d?.size} · Maturity: {d?.maturity}%</p></div>;
                  }} />
                  <Scatter data={SCATTER_DATA} fill="#8b5cf6" fillOpacity={0.55} />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>

          {/* Heatmap */}
          <div className="card mt-6">
            <p className="text-sm font-bold text-slate-700 mb-0.5">Heatmap · AI Tool Usage</p>
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
                        <td key={hi} title={`${day} ${cell.hour}: ${cell.val}`}
                          style={{ width: 44, height: 28, background: heatColor(cell.val), borderRadius: 4 }} />
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
        </section>

        {/* ── 5. Flow & Hierarchy ── */}
        <section>
          <SectionLabel>Flow &amp; Hierarchy</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Sankey */}
            <ChartCard title="Sankey Diagram" sub="AI budget allocation to value outcomes">
              <ResponsiveContainer width="100%" height={260}>
                <Sankey data={SANKEY_DATA} nodeWidth={14} nodePadding={12} margin={{ top: 8, bottom: 8 }}>
                  <Tooltip />
                </Sankey>
              </ResponsiveContainer>
            </ChartCard>

            {/* Sunburst */}
            <ChartCard title="Sunburst Chart" sub="AI team structure — inner ring = dept., outer = role">
              <SunburstChart data={SUNBURST_DATA} dataKey="value" width="100%" height={260}>
                <Tooltip />
              </SunburstChart>
            </ChartCard>

          </div>
        </section>

        {/* ── 6. Custom SVG ── */}
        <section>
          <SectionLabel>Custom SVG &amp; Specialty</SectionLabel>

          {/* Waterfall + Gauge side by side */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Waterfall Chart" sub="AI ROI decomposition — green = gain, red = cost, blue = total">
              <WaterfallChart data={WATERFALL} />
            </ChartCard>

            <ChartCard title="Gauge / Meter" sub="Overall AI programme maturity score">
              <div className="flex flex-col items-center pt-2">
                <Gauge value={62} max={100} color="#2563eb" size={160} />
                <p className="text-xs text-slate-500 mt-1">Score 62 / 100 · <span className="text-amber-500 font-semibold">Developing</span></p>
                <div className="flex gap-3 mt-3 text-xs text-slate-400">
                  {[['0–30','#ef4444','Lagging'],['31–60','#f59e0b','Developing'],['61–80','#22c55e','Scaling'],['81–100','#2563eb','Leading']].map(([r,c,l]) => (
                    <span key={r} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: c }} />{l}</span>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Spark lines */}
          <div className="card mb-6">
            <p className="text-sm font-bold text-slate-700 mb-0.5">Spark Lines · KPI Summary</p>
            <p className="text-xs text-slate-400 mb-4">12-month mini trend per key metric</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SPARK.map(s => (
                <div key={s.label} className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-3">
                  <p className="text-xs font-semibold text-slate-600 mb-2">{s.label}</p>
                  <SparkLine data={s.data} color={s.color} width={110} height={36} />
                  <p className="text-sm font-bold mt-1.5" style={{ color: s.color }}>{s.delta} YoY</p>
                </div>
              ))}
            </div>
          </div>

          {/* Maturity Matrix */}
          <div className="card mb-6">
            <p className="text-sm font-bold text-slate-700 mb-0.5">Maturity Matrix</p>
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
                          <div className="w-12 h-8 rounded-lg mx-auto flex items-center justify-center text-xs font-bold"
                            style={{ background: matColor(MAT_VALS[di][si]), color: MAT_VALS[di][si] >= 4 ? '#fff' : '#1e293b' }}>
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
            <p className="text-sm font-bold text-slate-700 mb-0.5">Coverage Table · Tool × Role</p>
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

        </section>
      </div>
    </div>
  );
}
