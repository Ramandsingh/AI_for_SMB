import { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import mermaid from 'mermaid';
import { ExternalLink, GitBranch, RotateCcw, Copy, Check } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  flowchart: { curve: 'basis', padding: 20 },
  sequence: { actorMargin: 60 },
});

// ── Example diagrams (AI/SMB-relevant content) ────────────────────────────────
const EXAMPLES = [
  {
    id: 'flowchart',
    label: 'Flowchart',
    icon: '⬡',
    desc: 'Decision trees, process maps',
    code: `flowchart TD
    A([Business Problem]) --> B{Is labelled data\navailable?}
    B -->|Yes| C[Choose ML approach]
    B -->|No| D[Collect & label data]
    D --> C
    C --> E{Structured data?}
    E -->|Yes| F[Classical ML\nRandom Forest · XGBoost]
    E -->|No| G[Deep Learning\nor LLM fine-tune]
    F --> H[Evaluate on hold-out set]
    G --> H
    H --> I{Accuracy meets\nbusiness threshold?}
    I -->|Yes| J[Deploy & Monitor]
    I -->|No| K[Tune / more data]
    K --> C
    J --> L([Production])`,
  },
  {
    id: 'sequence',
    label: 'Sequence',
    icon: '⟶',
    desc: 'API flows, system interactions',
    code: `sequenceDiagram
    autonumber
    participant U as User
    participant A as App
    participant E as Embed API
    participant V as Vector DB
    participant L as LLM

    U->>A: Ask question
    A->>E: Embed query text
    E-->>A: Query vector [1536-d]
    A->>V: top-k similarity search
    V-->>A: k relevant chunks + scores
    Note over A: Build prompt with chunks as context
    A->>L: System + user + context prompt
    L-->>A: Generated answer (streamed)
    A-->>U: Final response`,
  },
  {
    id: 'gantt',
    label: 'Gantt',
    icon: '▬',
    desc: 'Project timelines, milestones',
    code: `gantt
    title AI Implementation Roadmap
    dateFormat YYYY-MM-DD
    excludes weekends

    section Discovery
    Stakeholder interviews   :a1, 2025-02-03, 7d
    Data & systems audit     :a2, after a1, 7d
    AI readiness report      :a3, after a2, 5d

    section Foundation
    Data pipeline setup      :b1, after a3, 21d
    Model selection & PoC    :b2, after a3, 14d

    section Build
    MVP development          :c1, after b1, 28d
    Internal testing         :c2, after c1, 10d
    Iteration & fixes        :c3, after c2, 7d

    section Launch
    Pilot rollout            :d1, after c3, 14d
    Training & onboarding    :d2, after c3, 14d
    Full deployment          :d3, after d1, 7d
    Review & next cycle      :milestone, after d3, 0d`,
  },
  {
    id: 'state',
    label: 'State',
    icon: '◎',
    desc: 'State machines, agent loops',
    code: `stateDiagram-v2
    [*] --> Idle : Agent initialised

    Idle --> Thinking : User message received
    Thinking --> ToolCall : Tool needed
    Thinking --> Responding : Direct answer ready

    ToolCall --> Executing : Tool approved
    ToolCall --> Responding : Tool denied / no-op

    Executing --> Thinking : Tool result returned
    Executing --> Error : Tool raised exception

    Error --> Thinking : Retry (max 3x)
    Error --> Responding : Max retries exceeded

    Responding --> Idle : Response sent
    Responding --> [*] : Session timeout`,
  },
  {
    id: 'mindmap',
    label: 'Mind Map',
    icon: '❋',
    desc: 'Concept maps, topic trees',
    code: `mindmap
  root((AI for SMB))
    Understand
      What is AI
      How LLMs Work
      RAG & Memory
      Agents
    Plan
      Assessment
      ROI Calculator
      Roadmap
      Maturity Journey
    Build
      Data Infrastructure
      AI Factory
      Foundation Models
      Governance & Risk
    Learn
      Python & Maths
      Classical ML
      Deep Learning
      GenAI & MLOps
    Labs
      Chat Agent
      Graph Viz
      Flowcharts
      Diagrams`,
  },
  {
    id: 'er',
    label: 'ER Diagram',
    icon: '⊞',
    desc: 'Database schemas, data models',
    code: `erDiagram
    COMPANY {
      int id PK
      string name
      string industry
      string size
      timestamp created_at
    }
    ASSESSMENT {
      int id PK
      int company_id FK
      json answers
      int score
      string stage
      timestamp created_at
    }
    ROI_CALCULATION {
      int id PK
      int company_id FK
      string role_name
      decimal annual_saving
      decimal roi_24m
      decimal roi_36m
    }
    DATABASE_PLATFORM {
      int id PK
      string name
      string url
      json features
      json limitations
      string badge
      int sort_order
    }

    COMPANY ||--o{ ASSESSMENT : "has"
    COMPANY ||--o{ ROI_CALCULATION : "tracks"`,
  },
];

// ── Other open-source flowchart/diagram libraries ─────────────────────────────
const TEXT_TO_DIAGRAM = [
  {
    name: 'Mermaid.js',
    url: 'https://mermaid.js.org',
    license: 'MIT',
    types: 'Flowchart, Sequence, Gantt, Class, State, ER, Git, Mind Map, Pie',
    rendering: 'Browser SVG',
    note: 'Featured on this page. Best ecosystem support (VS Code, GitHub, Notion).',
    highlight: true,
  },
  {
    name: 'PlantUML',
    url: 'https://plantuml.com',
    license: 'GPL / MIT (core)',
    types: 'UML, sequence, component, deployment, timing, JSON, YAML',
    rendering: 'Server-side PNG/SVG or local Java',
    note: 'Gold standard for enterprise UML — requires Java or a remote render server.',
    highlight: false,
  },
  {
    name: 'Graphviz (viz.js)',
    url: 'https://viz-js.com',
    license: 'MIT (viz.js) / EPL-2.0 (Graphviz)',
    types: 'DOT language directed & undirected graphs',
    rendering: 'Browser via WASM',
    note: 'For pure graph layout (not flowcharts). Runs Graphviz compiled to WASM.',
    highlight: false,
  },
  {
    name: 'Markmap',
    url: 'https://markmap.js.org',
    license: 'MIT',
    types: 'Mind maps from Markdown headers',
    rendering: 'Browser SVG (D3)',
    note: 'One-trick: turn any Markdown outline into an interactive collapsible mind map.',
    highlight: false,
  },
  {
    name: 'nomnoml',
    url: 'https://nomnoml.com',
    license: 'MIT',
    types: 'UML class, activity, sequence (simplified)',
    rendering: 'Browser Canvas',
    note: 'Minimal, clean syntax for UML sketching. No dependencies beyond itself.',
    highlight: false,
  },
  {
    name: 'Kroki',
    url: 'https://kroki.io',
    license: 'MIT',
    types: 'Unified API for 30+ diagram formats (Mermaid, PlantUML, Graphviz, D2, …)',
    rendering: 'Server-side (self-host or cloud)',
    note: 'Diagram format aggregator — one HTTP API for every format. Great for docs pipelines.',
    highlight: false,
  },
];

const INTERACTIVE = [
  {
    name: 'ReactFlow',
    url: 'https://reactflow.dev',
    to: '/lab/graph',
    license: 'MIT',
    desc: 'Node-based graph editor. Custom node types, edge routing, minimap. Used in the Site Graph lab.',
  },
  {
    name: 'Excalidraw',
    url: 'https://excalidraw.com',
    to: '/lab/excalidraw',
    license: 'MIT',
    desc: 'Hand-drawn whiteboard. Persistent scenes in MySQL. Free-form, great for sketching.',
  },
  {
    name: 'Cytoscape.js',
    url: 'https://js.cytoscape.org',
    to: '/lab/cytoscape',
    license: 'MIT',
    desc: 'Network & graph analysis. 6 live use-case graphs in the Graph Viz lab.',
  },
  {
    name: 'D3.js',
    url: 'https://d3js.org',
    to: null,
    license: 'ISC',
    desc: 'Low-level SVG/Canvas binding for any custom visualization. Forces, trees, hierarchies.',
  },
];

// ── Mermaid renderer ──────────────────────────────────────────────────────────
let renderSeq = 0;

function MermaidDiagram({ code }) {
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState(null);

  useEffect(() => {
    let live = true;
    const id = `mmd-${++renderSeq}`;
    mermaid.render(id, code.trim())
      .then(({ svg }) => { if (live) { setSvg(svg); setErr(null); } })
      .catch(e => { if (live) setErr(String(e.message || e).split('\n')[0]); });
    return () => { live = false; };
  }, [code]);

  if (err) return (
    <div className="p-4 text-xs font-mono text-red-600 bg-red-50 rounded-xl border border-red-200 leading-relaxed whitespace-pre-wrap">
      {err}
    </div>
  );
  if (!svg) return (
    <div className="flex items-center justify-center h-32 text-slate-300 text-sm">Rendering…</div>
  );
  return (
    <div
      className="flex justify-center items-center p-4 overflow-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LabFlowcharts() {
  const [activeId, setActiveId] = useState(EXAMPLES[0].id);
  const [codes, setCodes] = useState(() => Object.fromEntries(EXAMPLES.map(e => [e.id, e.code])));
  const [copied, setCopied] = useState(false);

  const active = EXAMPLES.find(e => e.id === activeId);
  const code = codes[activeId];

  const reset = useCallback(() => {
    setCodes(c => ({ ...c, [activeId]: active.code }));
  }, [activeId, active.code]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-slate-800 flex-shrink-0 mt-0.5">
          <GitBranch size={18} className="text-slate-200" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900">Flowchart Libraries</h1>
            <a
              href="https://github.com/mermaid-js/mermaid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              mermaid-js/mermaid <ExternalLink size={10} />
            </a>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">MIT</span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">v11</span>
          </div>
          <p className="text-slate-500 text-sm">
            Live Mermaid.js editor — text-to-diagram in the browser. Edit any example below, then compare other open-source options.
          </p>
        </div>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2 mb-8 mt-3">
        {['Flowchart', 'Sequence', 'Gantt', 'State', 'Mind Map', 'ER Diagram', 'Git Graph', 'Pie Chart', 'Class Diagram'].map(f => (
          <span key={f} className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">{f}</span>
        ))}
      </div>

      {/* Live Editor */}
      <div className="card p-0 overflow-hidden mb-8">
        {/* Diagram type tabs */}
        <div className="flex gap-0 border-b border-slate-100 overflow-x-auto">
          {EXAMPLES.map(e => (
            <button
              key={e.id}
              onClick={() => setActiveId(e.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 ${
                activeId === e.id
                  ? 'border-blue-500 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-base leading-none">{e.icon}</span>
              {e.label}
            </button>
          ))}
        </div>

        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">{active.desc} · editable below</p>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              <RotateCcw size={11} /> Reset
            </button>
            <button
              onClick={copy}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Split: editor + preview */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Code editor */}
          <div className="bg-slate-900 rounded-none">
            <textarea
              value={code}
              onChange={e => setCodes(c => ({ ...c, [activeId]: e.target.value }))}
              className="w-full h-72 lg:h-96 px-5 py-4 text-sm font-mono text-slate-100 bg-transparent resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
              placeholder="Mermaid diagram code…"
            />
          </div>

          {/* Rendered diagram */}
          <div className="bg-white min-h-72 lg:min-h-96 flex flex-col justify-center">
            <MermaidDiagram key={activeId} code={code} />
          </div>
        </div>
      </div>

      {/* ── Text-to-diagram comparison ─────────────────────────────────────── */}
      <h2 className="text-lg font-bold text-slate-800 mb-1">Text-to-Diagram Libraries</h2>
      <p className="text-sm text-slate-500 mb-4">Write diagram code, get SVG/PNG. No drag-and-drop — great for docs-as-code pipelines and version-controlled diagrams.</p>

      <div className="space-y-3 mb-8">
        {TEXT_TO_DIAGRAM.map(lib => (
          <div key={lib.name} className={`card flex gap-4 items-start ${lib.highlight ? 'border-blue-200 bg-blue-50/30' : ''}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <a
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-800 hover:text-blue-700 transition-colors"
                >
                  {lib.name} ↗
                </a>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{lib.license}</span>
                {lib.highlight && (
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">Featured above ↑</span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-2">{lib.note}</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600">
                <div><span className="font-semibold text-slate-400 uppercase tracking-wide text-[10px]">Diagram types </span>{lib.types}</div>
                <div><span className="font-semibold text-slate-400 uppercase tracking-wide text-[10px]">Rendering </span>{lib.rendering}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Interactive canvas libraries ───────────────────────────────────── */}
      <h2 className="text-lg font-bold text-slate-800 mb-1">Interactive Canvas Libraries</h2>
      <p className="text-sm text-slate-500 mb-4">Drag-and-drop node editors and freehand canvas tools — code-defined or user-drawn. All already demoed in this lab.</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {INTERACTIVE.map(lib => (
          <div key={lib.name} className="card flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-800 hover:text-blue-700 transition-colors text-sm"
              >
                {lib.name} ↗
              </a>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{lib.license}</span>
              {lib.to && (
                <NavLink
                  to={lib.to}
                  className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  View demo →
                </NavLink>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{lib.desc}</p>
          </div>
        ))}
      </div>

      {/* Install snippet */}
      <div className="mt-8 card bg-slate-900 text-slate-100 p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick start</p>
        <pre className="text-sm font-mono leading-relaxed text-slate-200">{`# Install
npm install mermaid

# React usage
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'default' });

const { svg } = await mermaid.render('diagram-id', \`
  flowchart LR
    A[Input] --> B[Process] --> C[Output]
\`);

// Inject SVG into DOM
element.innerHTML = svg;`}</pre>
      </div>
    </div>
  );
}
