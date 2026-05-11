import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// ── Custom node component ──────────────────────────────────────────────────────
function ArchNode({ data }) {
  return (
    <div
      style={{
        width: 180,
        borderRadius: 10,
        background: data.bg,
        border: `2px solid ${data.borderColor}`,
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: data.headerBg,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>{data.icon}</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.title}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: '8px 12px 10px' }}>
        <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>
          {data.subtitle}
        </div>
        {data.tags && data.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {data.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: data.tagColor,
                  background: data.tagBg,
                  border: `1px solid ${data.borderColor}`,
                  borderRadius: 4,
                  padding: '1px 6px',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Docker Compose annotation node ────────────────────────────────────────────
function DockerLabel() {
  return (
    <div
      style={{
        width: 860,
        height: 340,
        border: '2px dashed #94a3b8',
        borderRadius: 12,
        background: 'rgba(241,245,249,0.55)',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '10px 16px',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#64748b',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Docker Compose Network
      </span>
    </div>
  );
}

const NODE_TYPES = { arch: ArchNode, dockerLabel: DockerLabel };

// ── Node definitions ───────────────────────────────────────────────────────────
const INITIAL_NODES = [
  // Docker Compose background annotation
  {
    id: 'docker-bg',
    type: 'dockerLabel',
    position: { x: 300, y: 50 },
    data: {},
    draggable: false,
    selectable: false,
    zIndex: -1,
  },
  // Browser
  {
    id: 'browser',
    type: 'arch',
    position: { x: 50, y: 200 },
    data: {
      icon: '🌐',
      title: 'Browser',
      subtitle: 'Client — any modern browser',
      tags: ['HTTP/HTTPS', 'SPA'],
      bg: '#ffffff',
      borderColor: '#1e293b',
      headerBg: '#1e293b',
      tagBg: '#f1f5f9',
      tagColor: '#334155',
    },
  },
  // Nginx
  {
    id: 'nginx',
    type: 'arch',
    position: { x: 350, y: 120 },
    data: {
      icon: '⚡',
      title: 'Nginx',
      subtitle: 'Port 3001 — reverse proxy',
      tags: ['nginx:alpine', ':3001'],
      bg: '#dcfce7',
      borderColor: '#16a34a',
      headerBg: '#16a34a',
      tagBg: '#f0fdf4',
      tagColor: '#15803d',
    },
  },
  // React SPA
  {
    id: 'react-spa',
    type: 'arch',
    position: { x: 350, y: 280 },
    data: {
      icon: '⚛️',
      title: 'React SPA',
      subtitle: 'Vite build — static assets',
      tags: ['React 18', 'Vite 5', ':3001'],
      bg: '#dbeafe',
      borderColor: '#2563eb',
      headerBg: '#2563eb',
      tagBg: '#eff6ff',
      tagColor: '#1d4ed8',
    },
  },
  // Express API
  {
    id: 'express-api',
    type: 'arch',
    position: { x: 700, y: 200 },
    data: {
      icon: '🚀',
      title: 'Express API',
      subtitle: 'Port 3002 — internal only',
      tags: ['Node.js v20', ':3002', 'REST'],
      bg: '#fef3c7',
      borderColor: '#d97706',
      headerBg: '#d97706',
      tagBg: '#fffbeb',
      tagColor: '#b45309',
    },
  },
  // MySQL 8
  {
    id: 'mysql',
    type: 'arch',
    position: { x: 1000, y: 200 },
    data: {
      icon: '🗄️',
      title: 'MySQL 8',
      subtitle: 'Port 3306 — internal only',
      tags: ['mysql:8.0', ':3306', 'InnoDB'],
      bg: '#f3e8ff',
      borderColor: '#9333ea',
      headerBg: '#9333ea',
      tagBg: '#faf5ff',
      tagColor: '#7e22ce',
    },
  },
];

// ── Edge definitions ───────────────────────────────────────────────────────────
const edgeStyle = { stroke: '#64748b', strokeWidth: 1.5 };
const markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 16, height: 16 };

const labelStyle = {
  fontSize: 10,
  fill: '#475569',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const INITIAL_EDGES = [
  {
    id: 'browser-nginx',
    source: 'browser',
    target: 'nginx',
    animated: false,
    label: 'HTTPS :3001',
    labelStyle,
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    style: edgeStyle,
    markerEnd,
  },
  {
    id: 'nginx-react',
    source: 'nginx',
    target: 'react-spa',
    animated: false,
    label: 'Static files',
    labelStyle,
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    style: edgeStyle,
    markerEnd,
  },
  {
    id: 'react-express',
    source: 'react-spa',
    target: 'express-api',
    animated: false,
    label: 'REST /api/*',
    labelStyle,
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    style: edgeStyle,
    markerEnd,
  },
  {
    id: 'express-mysql',
    source: 'express-api',
    target: 'mysql',
    animated: false,
    label: 'mysql2/promise',
    labelStyle,
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    style: edgeStyle,
    markerEnd,
  },
];

// ── Main component ─────────────────────────────────────────────────────────────
export default function LabArch() {
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc' }}>
      {/* ── Header ── */}
      <div
        style={{
          flexShrink: 0,
          padding: '14px 24px 12px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <a
          href="https://reactflow.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            color: '#64748b',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: 4,
            padding: '2px 8px',
            letterSpacing: '0.03em',
            alignSelf: 'flex-start',
            fontFamily: 'monospace',
            textDecoration: 'none',
          }}
        >
          reactflow · custom-nodes ↗
        </a>
        <h1
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: '#0f172a',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Architecture Diagram
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: '#64748b',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Docker Compose stack — Frontend · Backend · Database. Click and drag nodes to rearrange.
        </p>
      </div>

      {/* ── Canvas ── */}
      <div style={{ flex: 1, minHeight: 'max(60vh, 380px)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Lines}
            color="#f1f5f9"
            gap={30}
          />
          <Controls position="bottom-left" />
        </ReactFlow>
      </div>
    </div>
  );
}
