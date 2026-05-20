import { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import mermaid from 'mermaid';
import nomnoml from 'nomnoml';
import { ExternalLink, GitBranch, RotateCcw, Copy, Check } from 'lucide-react';

mermaid.initialize({ startOnLoad: false, theme: 'default', fontFamily: 'ui-sans-serif, system-ui, sans-serif' });

// ── Mermaid examples ──────────────────────────────────────────────────────────
const MERMAID_EXAMPLES = [
  {
    id: 'flowchart', label: 'Flowchart', icon: '⬡',
    desc: 'Process flows, decision trees',
    code: `flowchart TD
    A([Business Problem]) --> B{Labelled data\navailable?}
    B -->|Yes| C[Choose ML approach]
    B -->|No| D[Collect & label data]
    D --> C
    C --> E{Structured data?}
    E -->|Yes| F[Classical ML\nRandom Forest · XGBoost]
    E -->|No| G[LLM or Deep Learning]
    F --> H[Evaluate on hold-out set]
    G --> H
    H --> I{Meets business\nthreshold?}
    I -->|Yes| J[Deploy & Monitor]
    I -->|No| K[Tune / more data]
    K --> C
    J --> L([Production])`,
  },
  {
    id: 'sequence', label: 'Sequence', icon: '⟶',
    desc: 'API calls, system interactions',
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
    A->>L: System + context + user prompt
    L-->>A: Answer (streamed)
    A-->>U: Final response`,
  },
  {
    id: 'gantt', label: 'Gantt', icon: '▬',
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

    section Launch
    Pilot rollout            :d1, after c3, 14d
    Full deployment          :d3, after d1, 7d
    Review & next cycle      :milestone, after d3, 0d`,
  },
  {
    id: 'state', label: 'State', icon: '◎',
    desc: 'State machines, agent loops',
    code: `stateDiagram-v2
    [*] --> Idle : Agent initialised

    Idle --> Thinking : User message received
    Thinking --> ToolCall : Tool needed
    Thinking --> Responding : Direct answer ready

    ToolCall --> Executing : Tool approved
    ToolCall --> Responding : Tool denied

    Executing --> Thinking : Tool result returned
    Executing --> Error : Exception raised

    Error --> Thinking : Retry (≤3)
    Error --> Responding : Max retries hit

    Responding --> Idle : Response sent
    Responding --> [*] : Session ended`,
  },
  {
    id: 'mindmap', label: 'Mind Map', icon: '❋',
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
    Build
      Data Infrastructure
      AI Factory
      Governance
    Learn
      Python & Maths
      Classical ML
      Deep Learning
      GenAI & MLOps
    Labs
      Chat · Graphs
      Flowcharts
      Excalidraw`,
  },
  {
    id: 'er', label: 'ER Diagram', icon: '⊞',
    desc: 'Database schemas, data models',
    code: `erDiagram
    COMPANY {
      int id PK
      string name
      string industry
      string size
    }
    ASSESSMENT {
      int id PK
      int company_id FK
      json answers
      int score
      string stage
    }
    ROI_CALCULATION {
      int id PK
      int company_id FK
      string role_name
      decimal annual_saving
      decimal roi_24m
    }

    COMPANY ||--o{ ASSESSMENT : "has"
    COMPANY ||--o{ ROI_CALCULATION : "tracks"`,
  },
  {
    id: 'class', label: 'Class', icon: '⬜',
    desc: 'OOP class hierarchies, system design',
    code: `classDiagram
    class Agent {
      +String name
      +List~Tool~ tools
      +ModelAdapter adapter
      +run(message) Response
      +addTool(tool) void
    }
    class Tool {
      <<interface>>
      +String name
      +String description
      +execute(params) Any
    }
    class SearchTool {
      +String apiKey
      +execute(query) List
    }
    class CodeTool {
      +String runtime
      +execute(code) String
    }
    class ModelAdapter {
      +String modelId
      +complete(prompt) String
    }

    Agent --> ModelAdapter
    Agent "1" --> "*" Tool
    Tool <|-- SearchTool
    Tool <|-- CodeTool`,
  },
  {
    id: 'gitgraph', label: 'Git Graph', icon: '⎇',
    desc: 'Branch strategies, release flows',
    code: `gitGraph
    commit id: "Initial setup"
    branch feature/rag-pipeline
    checkout feature/rag-pipeline
    commit id: "Add embeddings"
    commit id: "Add vector store"
    checkout main
    branch feature/agent-loop
    checkout feature/agent-loop
    commit id: "Tool registry"
    commit id: "ReAct loop"
    checkout main
    merge feature/rag-pipeline id: "RAG merged"
    merge feature/agent-loop id: "Agents merged"
    commit id: "v1.0.0 release" tag: "v1.0"
    branch hotfix/token-limit
    checkout hotfix/token-limit
    commit id: "Fix max tokens"
    checkout main
    merge hotfix/token-limit id: "Hotfix applied"`,
  },
];

// ── nomnoml examples ──────────────────────────────────────────────────────────
const NOMNOML_EXAMPLES = [
  {
    id: 'class', label: 'Class Diagram', icon: '⬜',
    desc: 'Clean UML class diagrams',
    code: `#background: #f8fafc
#stroke: #475569
#fill: #f1f5f9; #e2e8f0
#font: 13
#fontSize: 13
#leading: 1.4
#padding: 12

[<abstract>Agent
  | name: string
  | tools: Tool[]
  | run(msg): Response]

[Tool
  | name: string
  | description: string
  |execute(params): any]

[SearchTool
  | apiKey: string
  | execute(query): List]

[CodeTool
  | runtime: string
  | execute(code): string]

[ModelAdapter
  | modelId: string
  | complete(prompt): string]

[Agent] -> [ModelAdapter]
[Agent] +-> [Tool]
[Tool] <:- [SearchTool]
[Tool] <:- [CodeTool]`,
  },
  {
    id: 'arch', label: 'Architecture', icon: '⬡',
    desc: 'System components and data flows',
    code: `#background: #f8fafc
#stroke: #475569
#fill: #dbeafe; #e0f2fe
#font: 13
#fontSize: 13
#leading: 1.4
#padding: 12

[<actor>User]

[<frame>React Frontend
  | [Chat UI]
  | [Dashboard Pages]
  | [Lab Tools]]

[<frame>Express Backend
  | [REST API]
  | [Auth Middleware]
  | [Migration Runner]]

[<database>MySQL
  | assessments
  | roi_models
  | lab_gallery]

[<frame>AI Services
  | [Claude API]
  | [Embeddings]
  | [Vector Store]]

[User] -> [React Frontend]
[React Frontend] -> [Express Backend]
[Express Backend] -> [MySQL]
[Express Backend] -> [AI Services]`,
  },
  {
    id: 'sequence', label: 'Sequence', icon: '⟶',
    desc: 'Message passing, process flow',
    code: `#background: #f8fafc
#stroke: #475569
#fill: #f0fdf4; #dcfce7
#font: 13
#fontSize: 13
#leading: 1.4
#padding: 12

[<actor>User] ask -> [App]
[App] embed -> [Embed API]
[Embed API] vector --> [App]
[App] search -> [Vector DB]
[Vector DB] chunks --> [App]
[App] prompt -> [LLM]
[LLM] answer --> [App]
[App] response --> [<actor>User]`,
  },
];

// ── When to use which ─────────────────────────────────────────────────────────
const DECISION_GUIDE = [
  {
    need: 'Process / decision flow',
    recommended: 'Mermaid flowchart',
    why: 'Readable syntax, excellent GitHub rendering, supports subgraphs and styling.',
    alt: 'nomnoml activity',
  },
  {
    need: 'API sequence diagram',
    recommended: 'Mermaid sequenceDiagram',
    why: 'First-class participant/message syntax, autonumber, loop/alt blocks.',
    alt: 'PlantUML sequence',
  },
  {
    need: 'Project timeline',
    recommended: 'Mermaid gantt',
    why: 'Only major browser-native Gantt library. Handles date math and milestones.',
    alt: 'None (Mermaid only option)',
  },
  {
    need: 'UML class diagram',
    recommended: 'nomnoml',
    why: 'Cleaner output than Mermaid class, more styling control, pure browser.',
    alt: 'Mermaid classDiagram, PlantUML',
  },
  {
    need: 'System architecture',
    recommended: 'nomnoml',
    why: 'Supports frames, actors, databases as first-class shapes. Very readable.',
    alt: 'Mermaid flowchart, ReactFlow',
  },
  {
    need: 'Interactive drag-and-drop',
    recommended: 'ReactFlow',
    why: 'Full React component control. Custom node types. Live in this lab at /lab/graph.',
    alt: 'Excalidraw (freehand)',
  },
  {
    need: 'Freehand whiteboard',
    recommended: 'Excalidraw',
    why: 'Hand-drawn aesthetic, great for brainstorming. Live in this lab at /lab/excalidraw.',
    alt: 'draw.io',
  },
  {
    need: 'Network / graph analysis',
    recommended: 'Cytoscape.js',
    why: 'Built for graph algorithms, clustering, large node counts. Live at /lab/cytoscape.',
    alt: 'D3.js force layout',
  },
  {
    need: 'Docs-as-code pipeline',
    recommended: 'Mermaid or Kroki',
    why: 'GitHub/GitLab render Mermaid natively. Kroki handles 30+ formats via server API.',
    alt: 'PlantUML + CI plugin',
  },
];

// ── Other libraries reference ─────────────────────────────────────────────────
const OTHER_LIBS = [
  {
    name: 'PlantUML', url: 'https://plantuml.com', license: 'GPL/MIT',
    render: 'Java / server',
    sample: '@startuml\nAlice -> Bob: Hello\nBob --> Alice: Hi!\n@enduml',
    note: 'Gold standard for enterprise UML. Requires Java locally or a render server.',
  },
  {
    name: 'Graphviz / viz.js', url: 'https://viz-js.com', license: 'MIT / EPL-2.0',
    render: 'Browser (WASM)',
    sample: 'digraph G {\n  A -> B -> C\n  A -> C\n}',
    note: 'DOT language. Pure graph layout — not flowcharts. Runs Graphviz compiled to WASM.',
  },
  {
    name: 'Markmap', url: 'https://markmap.js.org', license: 'MIT',
    render: 'Browser (D3)',
    sample: '# Root\n## Branch A\n### Leaf 1\n## Branch B',
    note: 'Converts Markdown headings into a collapsible, interactive mind map SVG.',
  },
  {
    name: 'Kroki', url: 'https://kroki.io', license: 'MIT',
    render: 'Server (self-host)',
    sample: 'POST https://kroki.io/{format}/svg\n{ "diagram_source": "..." }',
    note: 'One API for 30+ formats. Self-host or use the public endpoint. Great for docs pipelines.',
  },
  {
    name: 'D2', url: 'https://d2lang.com', license: 'Mozilla PL 2.0',
    render: 'CLI / server',
    sample: 'frontend -> backend: HTTP\nbackend -> db: SQL',
    note: 'Modern diagram scripting language with beautiful layouts. CLI-first, no browser renderer.',
  },
];

// ── Utilities ─────────────────────────────────────────────────────────────────
let mmdSeq = 0;

function MermaidPanel({ examples }) {
  const [activeId, setActiveId] = useState(examples[0].id);
  const [codes, setCodes] = useState(() => Object.fromEntries(examples.map(e => [e.id, e.code])));
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState(null);
  const [copied, setCopied] = useState(false);

  const active = examples.find(e => e.id === activeId);
  const code = codes[activeId];

  useEffect(() => {
    let live = true;
    setSvg(''); setErr(null);
    mermaid.render(`mmd-${++mmdSeq}`, code.trim())
      .then(r => { if (live) setSvg(r.svg); })
      .catch(e => { if (live) setErr(String(e.message || e).split('\n')[0]); });
    return () => { live = false; };
  }, [code, activeId]);

  const reset = useCallback(() => setCodes(c => ({ ...c, [activeId]: active.code })), [activeId, active.code]);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  }, [code]);

  return (
    <div className="card p-0 overflow-hidden">
      {/* Diagram type tabs */}
      <div className="flex border-b border-slate-100 overflow-x-auto">
        {examples.map(e => (
          <button key={e.id} onClick={() => setActiveId(e.id)}
            className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 border-b-2 ${
              activeId === e.id
                ? 'border-blue-500 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{e.icon}</span> {e.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-400">{active.desc} · edit code to update preview</p>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg transition-colors">
            <RotateCcw size={10} /> Reset
          </button>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg transition-colors">
            {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Editor + Preview split */}
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        <textarea
          value={code}
          onChange={e => setCodes(c => ({ ...c, [activeId]: e.target.value }))}
          className="w-full h-72 lg:h-80 px-4 py-4 text-sm font-mono text-slate-100 bg-slate-900 resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
        />
        <div className="bg-white min-h-72 lg:min-h-80 flex items-center justify-center p-4 overflow-auto">
          {err
            ? <div className="text-xs font-mono text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 w-full">{err}</div>
            : svg
              ? <div dangerouslySetInnerHTML={{ __html: svg }} className="w-full flex justify-center" />
              : <div className="text-slate-300 text-sm">Rendering…</div>
          }
        </div>
      </div>
    </div>
  );
}

function NomnomlPanel({ examples }) {
  const [activeId, setActiveId] = useState(examples[0].id);
  const [codes, setCodes] = useState(() => Object.fromEntries(examples.map(e => [e.id, e.code])));
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState(null);
  const [copied, setCopied] = useState(false);

  const active = examples.find(e => e.id === activeId);
  const code = codes[activeId];

  useEffect(() => {
    try {
      const result = nomnoml.renderSvg(code);
      setSvg(result);
      setErr(null);
    } catch (e) {
      setErr(String(e.message || e));
    }
  }, [code, activeId]);

  const reset = useCallback(() => setCodes(c => ({ ...c, [activeId]: active.code })), [activeId, active.code]);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  }, [code]);

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex border-b border-slate-100 overflow-x-auto">
        {examples.map(e => (
          <button key={e.id} onClick={() => setActiveId(e.id)}
            className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 border-b-2 ${
              activeId === e.id
                ? 'border-violet-500 text-violet-700 bg-violet-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{e.icon}</span> {e.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-400">{active.desc} · edit code to update preview</p>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg transition-colors">
            <RotateCcw size={10} /> Reset
          </button>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg transition-colors">
            {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        <textarea
          value={code}
          onChange={e => setCodes(c => ({ ...c, [activeId]: e.target.value }))}
          className="w-full h-72 lg:h-80 px-4 py-4 text-sm font-mono text-slate-100 bg-slate-900 resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
        />
        <div className="bg-white min-h-72 lg:min-h-80 flex items-center justify-center p-4 overflow-auto">
          {err
            ? <div className="text-xs font-mono text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 w-full">{err}</div>
            : svg
              ? <div dangerouslySetInnerHTML={{ __html: svg }} className="w-full flex justify-center" />
              : <div className="text-slate-300 text-sm">Rendering…</div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const LIBS = ['mermaid', 'nomnoml', 'guide'];

export default function LabFlowcharts() {
  const [activeLib, setActiveLib] = useState('mermaid');

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-slate-800 flex-shrink-0 mt-0.5">
          <GitBranch size={18} className="text-slate-200" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Diagram & Flowchart Options</h1>
          <p className="text-slate-500 text-sm">
            Open-source browser-native diagram libraries — live editors, syntax comparison, and a decision guide for picking the right tool.
          </p>
        </div>
      </div>

      {/* Library selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveLib('mermaid')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
            activeLib === 'mermaid'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'
          }`}
        >
          <span className="text-base">⬡</span>
          Mermaid.js
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activeLib === 'mermaid' ? 'bg-blue-500 text-blue-100' : 'bg-slate-100 text-slate-500'}`}>8 types</span>
        </button>
        <button
          onClick={() => setActiveLib('nomnoml')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
            activeLib === 'nomnoml'
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700'
          }`}
        >
          <span className="text-base">⬜</span>
          nomnoml
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activeLib === 'nomnoml' ? 'bg-violet-500 text-violet-100' : 'bg-slate-100 text-slate-500'}`}>UML</span>
        </button>
        <button
          onClick={() => setActiveLib('guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
            activeLib === 'guide'
              ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800'
          }`}
        >
          All Libraries + Decision Guide
        </button>
      </div>

      {/* ── MERMAID PANEL ──────────────────────────────────────────────────── */}
      {activeLib === 'mermaid' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <a href="https://mermaid.js.org" target="_blank" rel="noopener noreferrer"
              className="font-bold text-slate-800 hover:text-blue-700 transition-colors flex items-center gap-1">
              Mermaid.js <ExternalLink size={13} />
            </a>
            <a href="https://github.com/mermaid-js/mermaid" target="_blank" rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1">
              mermaid-js/mermaid <ExternalLink size={11} />
            </a>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">MIT</span>
            <span className="text-xs text-slate-400">v11 · installed</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Text-to-diagram library with 12+ diagram types. Renders directly in the browser as SVG. Native support in GitHub, GitLab, Notion, Confluence, and VS Code.
          </p>
          <MermaidPanel examples={MERMAID_EXAMPLES} />

          <div className="mt-4 card bg-slate-900 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Install & use</p>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed">{`npm install mermaid

import mermaid from 'mermaid';
mermaid.initialize({ startOnLoad: false, theme: 'default' });

const { svg } = await mermaid.render('unique-id', \`
  flowchart LR
    A[Start] --> B[Process] --> C[End]
\`);
document.getElementById('diagram').innerHTML = svg;`}</pre>
          </div>
        </div>
      )}

      {/* ── NOMNOML PANEL ──────────────────────────────────────────────────── */}
      {activeLib === 'nomnoml' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <a href="https://nomnoml.com" target="_blank" rel="noopener noreferrer"
              className="font-bold text-slate-800 hover:text-violet-700 transition-colors flex items-center gap-1">
              nomnoml <ExternalLink size={13} />
            </a>
            <a href="https://github.com/skanaar/nomnoml" target="_blank" rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-violet-600 flex items-center gap-1">
              skanaar/nomnoml <ExternalLink size={11} />
            </a>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">MIT</span>
            <span className="text-xs text-slate-400">v1.7 · installed</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Minimal UML diagram tool with clean output and powerful styling directives. Excellent for class diagrams and architecture sketches. No dependencies, pure browser SVG.
          </p>

          <div className="card bg-amber-50 border-amber-200 p-4 mb-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">nomnoml vs Mermaid for UML</p>
            <p className="text-xs text-amber-800 leading-relaxed">
              nomnoml produces cleaner, more compact class diagrams than Mermaid. It supports frames, actors, and databases as first-class shapes — ideal for architecture diagrams.
              Mermaid wins on variety (Gantt, sequence, git graph) and ecosystem (GitHub rendering).
            </p>
          </div>

          <NomnomlPanel examples={NOMNOML_EXAMPLES} />

          <div className="mt-4 card bg-slate-900 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Install & use</p>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed">{`npm install nomnoml

import nomnoml from 'nomnoml';

// Render directly to SVG string
const svg = nomnoml.renderSvg(\`
  [User] -> [App]
  [App] -> [Database]
\`);
document.getElementById('diagram').innerHTML = svg;

// Or draw to a canvas element
nomnoml.draw(canvasElement, source);`}</pre>
          </div>
        </div>
      )}

      {/* ── GUIDE PANEL ────────────────────────────────────────────────────── */}
      {activeLib === 'guide' && (
        <div>
          {/* Decision guide */}
          <h2 className="text-base font-bold text-slate-800 mb-1">When to use which library</h2>
          <p className="text-sm text-slate-500 mb-4">Pick based on your specific diagram need, not the most popular library.</p>

          <div className="card p-0 overflow-hidden mb-8">
            <div className="grid grid-cols-12 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-100 px-4 py-2.5 gap-3">
              <div className="col-span-3">You need…</div>
              <div className="col-span-3">Use this</div>
              <div className="col-span-4">Why</div>
              <div className="col-span-2">Alternatives</div>
            </div>
            {DECISION_GUIDE.map((row, i) => (
              <div key={i} className={`grid grid-cols-12 gap-3 px-4 py-3 text-xs border-b border-slate-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <div className="col-span-3 text-slate-700 font-medium">{row.need}</div>
                <div className="col-span-3">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{row.recommended}</span>
                </div>
                <div className="col-span-4 text-slate-500 leading-relaxed">{row.why}</div>
                <div className="col-span-2 text-slate-400">{row.alt}</div>
              </div>
            ))}
          </div>

          {/* Other libraries */}
          <h2 className="text-base font-bold text-slate-800 mb-1">Other open-source options</h2>
          <p className="text-sm text-slate-500 mb-4">Libraries that don't run purely in the browser or cover specific niches.</p>

          <div className="space-y-3 mb-8">
            {OTHER_LIBS.map(lib => (
              <div key={lib.name} className="card">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <a href={lib.url} target="_blank" rel="noopener noreferrer"
                    className="font-bold text-slate-800 hover:text-blue-700 transition-colors flex items-center gap-1 text-sm">
                    {lib.name} <ExternalLink size={11} />
                  </a>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{lib.license}</span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{lib.render}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">{lib.note}</p>
                <pre className="text-xs font-mono text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 leading-relaxed">{lib.sample}</pre>
              </div>
            ))}
          </div>

          {/* Links to other lab tools */}
          <h2 className="text-base font-bold text-slate-800 mb-1">Interactive canvas tools — already in this lab</h2>
          <p className="text-sm text-slate-500 mb-4">For drag-and-drop diagrams, freehand drawing, or graph analysis — use these lab demos.</p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { to: '/lab/graph', name: 'ReactFlow', desc: 'Node-based graph editor — custom nodes, edge routing, minimap.', color: 'blue' },
              { to: '/lab/excalidraw', name: 'Excalidraw', desc: 'Hand-drawn whiteboard — persistent scenes, free-form sketching.', color: 'violet' },
              { to: '/lab/cytoscape', name: 'Cytoscape.js', desc: '6 live network graphs — knowledge graph, tech stack, learning paths.', color: 'emerald' },
            ].map(item => (
              <NavLink key={item.to} to={item.to}
                className="card group hover:-translate-y-0.5 transition-transform duration-150 block">
                <p className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors text-sm mb-1">
                  {item.name} →
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
