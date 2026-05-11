import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BackgroundVariant,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Clock, DollarSign, AlertCircle, ArrowRight, X } from 'lucide-react';

const STAGES = [
  {
    num: 1,
    label: 'Assistant',
    tagline: 'Individual AI tool use',
    looks: 'Individuals use AI tools (Claude, Copilot, ChatGPT) for their own work. Every interaction is human-initiated and human-reviewed.',
    value: 'Personal productivity. Time reclaimed at individual level. Better outputs from average performers.',
    investment: '$200–$500 per user/yr',
    timeline: '2–4 weeks',
    constraint: 'User adoption — value trapped at individual level',
    orgs: '~35%',
    readyNext: 'When multiple staff consistently produce better work faster and you have identified 2–3 processes to accelerate.',
    header: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', num: '#64748b' },
    body: { bg: '#ffffff', accent: '#cbd5e1' },
  },
  {
    num: 2,
    label: 'Accelerator',
    tagline: 'AI speeds up core processes',
    looks: 'AI is embedded into specific workflows to compress cycle time. Proposals that took 3 days take 4 hours. Process still runs as before — just faster.',
    value: 'Cycle time compression. Throughput increase. Faster decisions.',
    investment: '$40k–$120k per use case',
    timeline: '8–12 weeks per use case',
    constraint: 'Process clarity — AI cannot accelerate a poorly defined process',
    orgs: '~28%',
    readyNext: 'When you have measurable cycle time data and a backlog of 3+ additional processes ready.',
    header: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', num: '#2563eb' },
    body: { bg: '#f0f9ff', accent: '#93c5fd' },
  },
  {
    num: 3,
    label: 'Automator',
    tagline: 'AI runs tasks end-to-end',
    looks: 'AI runs well-defined tasks with minimal human involvement. Humans handle exceptions only. Lightweight automation begins — file watchers, email ingestion, RPA.',
    value: 'Headcount leverage at scale. Error reduction. 24/7 operation.',
    investment: '$80k–$250k incl. integration & governance',
    timeline: '3–6 months per automation',
    constraint: 'Governance — exception-handling, audit trails, and ownership required first',
    orgs: '~20%',
    readyNext: 'When automated processes have run reliably for 3+ months and business trusts AI outputs.',
    header: { bg: '#2563eb', text: '#ffffff', border: '#1d4ed8', num: '#93c5fd' },
    body: { bg: '#eff6ff', accent: '#3b82f6' },
  },
  {
    num: 4,
    label: 'Operator',
    tagline: 'AI monitors, flags, recommends',
    looks: 'AI becomes a proactive intelligence layer — it monitors, flags, recommends, and initiates within defined boundaries. Anomalies surfaced before month-end. Risk caught earlier.',
    value: 'Better decisions with better information, faster. Problems caught before they compound.',
    investment: 'Multi-quarter programs + data foundation',
    timeline: '6–18 months per domain',
    constraint: 'Data quality and organisational trust — requires earlier-stage foundation',
    orgs: '~12%',
    readyNext: 'When AI-generated signals are consistently acted on and processes designed around them.',
    header: { bg: '#1d4ed8', text: '#ffffff', border: '#1e40af', num: '#93c5fd' },
    body: { bg: '#eff6ff', accent: '#1d4ed8' },
  },
  {
    num: 5,
    label: 'Operating Model',
    tagline: 'AI embedded in the business design',
    looks: 'AI is not a layer on top of the business — it\'s how the business is designed to run. New processes start with AI embedded. Removing AI would require redesigning the business.',
    value: 'Strategic advantage. Cost structures and offerings competitors cannot match.',
    investment: 'Enterprise strategy — years, not months',
    timeline: '2–5 year cumulative journey',
    constraint: 'Leadership vision and sustained investment across all maturity stages',
    orgs: '~5%',
    readyNext: 'This is the destination. The journey is the value.',
    header: { bg: '#0f172a', text: '#ffffff', border: '#1e3a8a', num: '#60a5fa' },
    body: { bg: '#f0f9ff', accent: '#1e3a8a' },
  },
];

const STATS = [
  { label: 'Maturity Stages', value: '5', sub: 'Assistant → Operating Model' },
  { label: 'Full Journey', value: '2–5 yrs', sub: 'Cumulative investment' },
  { label: 'Key Inflection', value: 'Stage 2→3', sub: 'Biggest ROI jump' },
  { label: 'Most Orgs', value: 'Stage 1–2', sub: '~63% of enterprises' },
];

function MaturityNode({ data, selected }) {
  const s = data;
  return (
    <div
      style={{
        width: 210,
        borderRadius: 12,
        overflow: 'hidden',
        border: `2px solid ${selected ? '#3b82f6' : s.header.border}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(59,130,246,0.25), 0 8px 24px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        background: s.body.bg,
        cursor: 'pointer',
        transition: 'box-shadow 150ms',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: s.header.border, width: 8, height: 8, border: 'none' }} />

      {/* Header */}
      <div style={{ background: s.header.bg, padding: '10px 12px 8px', borderBottom: `1px solid ${s.header.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: s.num <= 2 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: s.num <= 2 ? s.header.num : '#fff',
            flexShrink: 0,
          }}>
            {s.num}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: s.header.text, lineHeight: 1.2 }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 10, color: s.num <= 2 ? '#64748b' : 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}>{s.tagline}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, color: '#64748b', lineHeight: 1.5 }}>
          {s.looks.length > 90 ? s.looks.slice(0, 88) + '…' : s.looks}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.03)', borderRadius: 6, padding: '5px 7px' }}>
            <p style={{ margin: 0, fontSize: 9, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Timeline</p>
            <p style={{ margin: 0, fontSize: 10, color: '#475569', fontWeight: 600 }}>{s.timeline}</p>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.03)', borderRadius: 6, padding: '5px 7px' }}>
            <p style={{ margin: 0, fontSize: 9, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Orgs here</p>
            <p style={{ margin: 0, fontSize: 10, color: '#475569', fontWeight: 600 }}>{s.orgs}</p>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} style={{ background: s.header.border, width: 8, height: 8, border: 'none' }} />
    </div>
  );
}

const nodeTypes = { maturity: MaturityNode };

const INITIAL_NODES = STAGES.map((s, i) => ({
  id: String(s.num),
  type: 'maturity',
  position: { x: i * 260, y: 60 },
  data: s,
  selectable: true,
  draggable: true,
}));

const INITIAL_EDGES = STAGES.slice(0, -1).map((_, i) => ({
  id: `e${i + 1}-${i + 2}`,
  source: String(i + 1),
  target: String(i + 2),
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6', width: 16, height: 16 },
  style: { stroke: '#3b82f6', strokeWidth: 2 },
  label: i === 1 ? '⚡ Key ROI jump' : undefined,
  labelStyle: { fontSize: 9, fontWeight: 600, fill: '#2563eb' },
  labelBgStyle: { fill: '#eff6ff', rx: 4 },
}));

export default function MaturityCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selected, setSelected] = useState(null);

  const onNodeClick = useCallback((_, node) => {
    setSelected(prev => prev?.num === node.data.num ? null : node.data);
  }, []);

  const onPaneClick = useCallback(() => setSelected(null), []);

  return (
    <div style={{ padding: '2rem 2rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>
          Foundation · Visual Tool
        </p>
        <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#0f172a' }}>AI Maturity Flow Canvas</h1>
        <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
          Interactive journey map — click any stage to explore details. Drag nodes to rearrange.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: '1rem' }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px' }}>
            <p style={{ margin: '0 0 2px', fontSize: 18, fontWeight: 800, color: '#1e40af' }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#374151' }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div style={{
        height: '52vh',
        minHeight: 320,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <ReactFlow
          nodes={nodes.map(n => ({ ...n, selected: selected?.num === n.data.num }))}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.35 }}
          nodesConnectable={false}
          deleteKeyCode={null}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.2} color="#cbd5e1" />
          <Controls style={{ bottom: 12, left: 12, top: 'auto' }} />
        </ReactFlow>
      </div>

      {/* Detail panel */}
      {selected ? (
        <div style={{
          marginTop: 14,
          background: '#fff',
          border: `2px solid ${selected.header.border}`,
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}>
          {/* Panel header */}
          <div style={{ background: selected.header.bg, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: selected.num <= 2 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800,
                color: selected.num <= 2 ? selected.header.num : '#fff',
              }}>{selected.num}</div>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: selected.header.text }}>Stage {selected.num} — {selected.label}</p>
                <p style={{ margin: 0, fontSize: 11, color: selected.num <= 2 ? '#64748b' : 'rgba(255,255,255,0.6)' }}>{selected.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: selected.num <= 2 ? '#94a3b8' : 'rgba(255,255,255,0.6)', borderRadius: 6 }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Panel body */}
          <div style={{ padding: '16px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>What it looks like</p>
              <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{selected.looks}</p>

              <p style={{ margin: '14px 0 6px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Value created</p>
              <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{selected.value}</p>
            </div>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { icon: Clock, label: 'Timeline', val: selected.timeline },
                  { icon: DollarSign, label: 'Investment', val: selected.investment },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                      <Icon size={11} color="#94a3b8" />
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{val}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <AlertCircle size={11} color="#f97316" />
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dominant constraint</p>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#9a3412' }}>{selected.constraint}</p>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <ArrowRight size={11} color="#2563eb" />
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Ready for next stage when</p>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#1e40af' }}>{selected.readyNext}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 14, padding: '14px 18px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>Click any stage node to explore its details here</p>
        </div>
      )}
    </div>
  );
}
