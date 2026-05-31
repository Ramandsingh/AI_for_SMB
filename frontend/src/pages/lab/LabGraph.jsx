import { useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { useNavigate } from 'react-router-dom';
import 'reactflow/dist/style.css';

// ── Section metadata ──────────────────────────────────────────────────────────
const SECTIONS = {
  Overview:                    { color: '#1e293b' },
  Foundation:                  { color: '#1d4ed8' },
  Planning:                    { color: '#7c3aed' },
  Implementation:              { color: '#0f766e' },
  'People & Culture':          { color: '#be185d' },
  'Sales Toolkit':             { color: '#b45309' },
  'Technology of AI':          { color: '#0369a1' },
  'Enterprise Context':        { color: '#065f46' },
  'Executive Insights':        { color: '#1e3a8a' },
  'Enterprise AI Development': { color: '#312e81' },
  'Your AI Fit':               { color: '#047857' },
  'Learning Hub':              { color: '#0284c7' },
  'Business Hub':              { color: '#7c3aed' },
  'Experimental UI':           { color: '#374151' },
  Admin:                       { color: '#64748b' },
};

// ── Page definitions ──────────────────────────────────────────────────────────
const PAGE_DEFS = [
  // Overview
  { id: 'home',         section: 'Overview',                   title: 'Dashboard Home',          route: '/' },
  // Foundation
  { id: 'p1',           section: 'Foundation',                  title: 'Understanding AI',        route: '/p1' },
  { id: 'p2',           section: 'Foundation',                  title: 'Maturity Journey',        route: '/p2' },
  { id: 'p34',          section: 'Foundation',                  title: 'Maturity Canvas',         route: '/p34' },
  { id: 'p3',           section: 'Foundation',                  title: 'Role Impact Map',         route: '/p3' },
  // Planning
  { id: 'p4',           section: 'Planning',                    title: 'Assessment & Discovery',  route: '/p4' },
  { id: 'p5',           section: 'Planning',                    title: 'Roadmap Options',         route: '/p5' },
  { id: 'p6',           section: 'Planning',                    title: 'ROI Calculator',          route: '/p6' },
  // Implementation
  { id: 'p7',           section: 'Implementation',              title: 'Technology & Tools',      route: '/p7' },
  { id: 'p9',           section: 'Implementation',              title: 'Learning Approach',       route: '/p9' },
  // People & Culture
  { id: 'p10',          section: 'People & Culture',            title: 'Individual Adoption',     route: '/p10' },
  { id: 'p11',          section: 'People & Culture',            title: 'Org Contributions',       route: '/p11' },
  // Sales Toolkit
  { id: 'p8',           section: 'Sales Toolkit',               title: 'Pitch & Narrative',       route: '/p8' },
  // Technology of AI
  { id: 'p17',          section: 'Technology of AI',            title: 'What Is AI',              route: '/p17' },
  { id: 'p18',          section: 'Technology of AI',            title: 'Categories of AI',        route: '/p18' },
  { id: 'p19',          section: 'Technology of AI',            title: 'How AI Works',            route: '/p19' },
  { id: 'p20',          section: 'Technology of AI',            title: 'Where AI Deploys',        route: '/p20' },
  { id: 'p21',          section: 'Technology of AI',            title: 'AI & Your Tech Stack',    route: '/p21' },
  { id: 'p22',          section: 'Technology of AI',            title: 'Glossary',                route: '/p22' },
  // Enterprise Context
  { id: 'p12',          section: 'Enterprise Context',          title: 'What Enterprises Do',     route: '/p12' },
  { id: 'p13',          section: 'Enterprise Context',          title: 'Where the Value Is',      route: '/p13' },
  { id: 'p14',          section: 'Enterprise Context',          title: 'How to Adopt AI',         route: '/p14' },
  { id: 'p15',          section: 'Enterprise Context',          title: 'When to Adopt AI',        route: '/p15' },
  { id: 'p16',          section: 'Enterprise Context',          title: 'How to Measure Value',    route: '/p16' },
  // Executive Insights
  { id: 'p29',          section: 'Executive Insights',          title: 'BCG',                     route: '/p29' },
  { id: 'p30',          section: 'Executive Insights',          title: 'McKinsey',                route: '/p30' },
  { id: 'p31',          section: 'Executive Insights',          title: 'Bain',                    route: '/p31' },
  { id: 'p32',          section: 'Executive Insights',          title: 'Deloitte',                route: '/p32' },
  // Enterprise AI Development
  { id: 'p23',          section: 'Enterprise AI Development',   title: 'Data Infrastructure',     route: '/p23' },
  { id: 'p24',          section: 'Enterprise AI Development',   title: 'The AI Factory',          route: '/p24' },
  { id: 'p25',          section: 'Enterprise AI Development',   title: 'Foundation Models & RAG', route: '/p25' },
  { id: 'p26',          section: 'Enterprise AI Development',   title: 'Enterprise AI Platforms', route: '/p26' },
  { id: 'p27',          section: 'Enterprise AI Development',   title: 'Governance & Risk',       route: '/p27' },
  { id: 'p28',          section: 'Enterprise AI Development',   title: 'Building the AI Team',    route: '/p28' },
  // Your AI Fit
  { id: 'p33',              section: 'Your AI Fit',    title: 'How AI Fits You',         route: '/p33' },
  // Learning Hub
  { id: 'learn',            section: 'Learning Hub',   title: 'Learning Hub Home',       route: '/learn' },
  { id: 'learn-q1',         section: 'Learning Hub',   title: 'Q1 — Foundations',        route: '/learn/q1' },
  { id: 'learn-q2',         section: 'Learning Hub',   title: 'Q2 — Classical ML',       route: '/learn/q2' },
  { id: 'learn-q3',         section: 'Learning Hub',   title: 'Q3 — Deep Learning',      route: '/learn/q3' },
  { id: 'learn-q4',         section: 'Learning Hub',   title: 'Q4 — GenAI & MLOps',      route: '/learn/q4' },
  { id: 'learn-python',     section: 'Learning Hub',   title: 'Python Syntax',           route: '/learn/q1/python-syntax' },
  // Business Hub
  { id: 'biz',              section: 'Business Hub',   title: 'Biz Learning Hub',        route: '/biz' },
  { id: 'biz-q1',           section: 'Business Hub',   title: 'Q1 — Tool Fluency',       route: '/biz/q1' },
  { id: 'biz-q2',           section: 'Business Hub',   title: 'Q2 — Workflows',          route: '/biz/q2' },
  { id: 'biz-q3',           section: 'Business Hub',   title: 'Q3 — Dept Playbooks',     route: '/biz/q3' },
  { id: 'biz-q4',           section: 'Business Hub',   title: 'Q4 — Orchestration',      route: '/biz/q4' },
  { id: 'biz-industries',   section: 'Business Hub',   title: 'Industry Use Cases',      route: '/biz/industries' },
  { id: 'biz-usecases',     section: 'Business Hub',   title: 'Dept Use Cases',          route: '/biz/usecases' },
  // Experimental UI
  { id: 'lab',              section: 'Experimental UI', title: 'Lab Home',               route: '/lab' },
  { id: 'lab-upload',       section: 'Experimental UI', title: 'Image Upload',           route: '/lab/upload' },
  { id: 'lab-graph',        section: 'Experimental UI', title: 'Site Graph',             route: '/lab/graph' },
  { id: 'lab-chat',         section: 'Experimental UI', title: 'Chat Agent',             route: '/lab/chat' },
  { id: 'lab-arch',         section: 'Experimental UI', title: 'Architecture',           route: '/lab/arch' },
  { id: 'lab-timeline',     section: 'Experimental UI', title: 'Timeline',               route: '/lab/timeline' },
  { id: 'lab-charts',       section: 'Experimental UI', title: 'Data Viz',               route: '/lab/charts' },
  { id: 'lab-calendar',     section: 'Experimental UI', title: 'Calendar',               route: '/lab/calendar' },
  { id: 'lab-database',     section: 'Experimental UI', title: 'Database Platforms',     route: '/lab/database' },
  { id: 'lab-cytoscape',    section: 'Experimental UI', title: 'Cytoscape Graph Viz',    route: '/lab/cytoscape' },
  { id: 'lab-flowcharts',   section: 'Experimental UI', title: 'Flowcharts · Mermaid',   route: '/lab/flowcharts' },
  { id: 'lab-pdf',          section: 'Experimental UI', title: 'PDF Viewer · Markup',    route: '/lab/pdf' },
  { id: 'lab-excalidraw',   section: 'Experimental UI', title: 'Excalidraw',             route: '/lab/excalidraw' },
  // Admin
  { id: 'admin',            section: 'Admin',           title: 'Companies',              route: '/admin' },
  { id: 'admin-lessons',    section: 'Admin',           title: 'Lessons Learned',        route: '/admin/lessons' },
  { id: 'planning',         section: 'Admin',           title: 'Planning',               route: '/planning' },
  { id: 'pitch',            section: 'Admin',           title: 'Pitch & Narrative',      route: '/p8' },
];

// ── Cluster origin positions ───────────────────────────────────────────────────
const CLUSTER_ORIGINS = {
  'Overview':                    { x: 50,   y: 50   },
  'Foundation':                  { x: 50,   y: 200  },
  'Planning':                    { x: 350,  y: 200  },
  'Implementation':              { x: 650,  y: 200  },
  'People & Culture':            { x: 350,  y: 500  },
  'Sales Toolkit':               { x: 650,  y: 500  },
  'Technology of AI':            { x: 50,   y: 700  },
  'Enterprise Context':          { x: 550,  y: 700  },
  'Executive Insights':          { x: 1050, y: 700  },
  'Enterprise AI Development':   { x: 50,   y: 1100 },
  'Your AI Fit':                 { x: 1050, y: 200  },
  'Learning Hub':                { x: 1350, y: 700  },
  'Business Hub':                { x: 1350, y: 1100 },
  'Experimental UI':             { x: 1350, y: 200  },
  'Admin':                       { x: 1050, y: 1100 },
};

// ── Build node positions ───────────────────────────────────────────────────────
const COL_W = 230;
const ROW_H = 110;
const COLS  = 3;

function buildNodes() {
  const sectionCounters = {};
  return PAGE_DEFS.map((page) => {
    const origin = CLUSTER_ORIGINS[page.section] || { x: 0, y: 0 };
    const idx = sectionCounters[page.section] ?? 0;
    sectionCounters[page.section] = idx + 1;
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    return {
      id: page.id,
      type: 'page',
      position: { x: origin.x + col * COL_W, y: origin.y + row * ROW_H },
      data: {
        title:   page.title,
        route:   page.route,
        section: page.section,
        color:   SECTIONS[page.section]?.color ?? '#64748b',
      },
    };
  });
}

// ── Custom page node ───────────────────────────────────────────────────────────
function PageNode({ data, selected }) {
  return (
    <div
      style={{
        width: 200,
        borderRadius: 8,
        background: '#ffffff',
        border: `1px solid ${selected ? '#3b82f6' : '#e2e8f0'}`,
        boxShadow: selected ? '0 0 0 2px #3b82f6' : '0 1px 3px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 28,
          background: data.color,
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.section}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: '8px 10px' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#1e293b',
            lineHeight: 1.35,
            marginBottom: 3,
          }}
        >
          {data.title}
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>
          {data.route}
        </div>
      </div>
    </div>
  );
}

const NODE_TYPES = { page: PageNode };
const INITIAL_NODES = buildNodes();
const INITIAL_EDGES = [];

// ── Main component ─────────────────────────────────────────────────────────────
export default function LabGraph() {
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const onNodeClick = useCallback(
    (_, node) => {
      navigate(node.data.route);
    },
    [navigate]
  );

  const miniMapNodeColor = useCallback((node) => {
    return node.data?.color ?? '#94a3b8';
  }, []);

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
            color: '#3b82f6',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 4,
            padding: '2px 8px',
            letterSpacing: '0.03em',
            alignSelf: 'flex-start',
            fontFamily: 'monospace',
            textDecoration: 'none',
          }}
        >
          reactflow · force-graph-layout ↗
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
          Site Graph
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: '#64748b',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          All pages on this dashboard — grouped by section. Click any node to navigate. Drag to rearrange.
        </p>
      </div>

      {/* ── Canvas ── */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.08 }}
          minZoom={0.1}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            color="#e2e8f0"
            gap={24}
          />
          <Controls />
          <MiniMap
            position="bottom-right"
            nodeColor={miniMapNodeColor}
            nodeBorderRadius={4}
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
