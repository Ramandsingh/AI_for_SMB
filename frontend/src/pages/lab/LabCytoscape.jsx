import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cytoscape from 'cytoscape';

// ── Use-case graph definitions ────────────────────────────────────────────────
const USE_CASES = [
  {
    id: 'concepts',
    title: 'AI Concept Knowledge Graph',
    desc: 'Explore how core AI concepts relate — from tokenisation and embeddings through RAG pipelines to agentic orchestration. Click any node to highlight its connections.',
    link: '/p39',
    linkLabel: 'How LLMs Work →',
    altLinks: [{ to: '/p40', label: 'Retrieval & Memory' }, { to: '/p41', label: 'Agents & Orchestration' }],
    color: '#6366f1',
    elements: [
      // nodes
      { data: { id: 'transformer', label: 'Transformer\nArchitecture', type: 'hub' } },
      { data: { id: 'llm', label: 'LLM', type: 'hub' } },
      { data: { id: 'token', label: 'Tokenisation', type: 'concept' } },
      { data: { id: 'embed', label: 'Embeddings', type: 'concept' } },
      { data: { id: 'context', label: 'Context\nWindow', type: 'concept' } },
      { data: { id: 'rag', label: 'RAG', type: 'hub' } },
      { data: { id: 'vecdb', label: 'Vector DB', type: 'concept' } },
      { data: { id: 'chunk', label: 'Chunking', type: 'concept' } },
      { data: { id: 'agents', label: 'Agents', type: 'hub' } },
      { data: { id: 'tools', label: 'Tools /\nSkills', type: 'concept' } },
      { data: { id: 'harness', label: 'Harness', type: 'concept' } },
      { data: { id: 'finetune', label: 'Fine-tuning', type: 'concept' } },
      { data: { id: 'prompt', label: 'Prompt\nEngineering', type: 'concept' } },
      // edges
      { data: { source: 'transformer', target: 'llm' } },
      { data: { source: 'llm', target: 'token' } },
      { data: { source: 'llm', target: 'embed' } },
      { data: { source: 'llm', target: 'context' } },
      { data: { source: 'embed', target: 'rag' } },
      { data: { source: 'rag', target: 'vecdb' } },
      { data: { source: 'rag', target: 'chunk' } },
      { data: { source: 'llm', target: 'agents' } },
      { data: { source: 'agents', target: 'tools' } },
      { data: { source: 'agents', target: 'harness' } },
      { data: { source: 'agents', target: 'rag' } },
      { data: { source: 'llm', target: 'finetune' } },
      { data: { source: 'llm', target: 'prompt' } },
    ],
    layout: { name: 'cose', padding: 30, nodeRepulsion: 6000, idealEdgeLength: 80 },
  },
  {
    id: 'labs',
    title: 'AI Lab Ecosystem Map',
    desc: 'See how the top AI labs relate through their flagship models, open-source releases, and shared research lineages.',
    link: '/p35',
    linkLabel: 'OpenAI →',
    altLinks: [{ to: '/p36', label: 'Anthropic' }, { to: '/p37', label: 'Google' }, { to: '/p38', label: 'Chinese Labs' }],
    color: '#0ea5e9',
    elements: [
      { data: { id: 'openai', label: 'OpenAI', type: 'hub' } },
      { data: { id: 'anthropic', label: 'Anthropic', type: 'hub' } },
      { data: { id: 'google', label: 'Google\nDeepMind', type: 'hub' } },
      { data: { id: 'deepseek', label: 'DeepSeek', type: 'hub' } },
      { data: { id: 'alibaba', label: 'Alibaba\n(Qwen)', type: 'hub' } },
      { data: { id: 'gpt4o', label: 'GPT-4o', type: 'model' } },
      { data: { id: 'o3', label: 'o1 / o3', type: 'model' } },
      { data: { id: 'claude', label: 'Claude\nOpus/Sonnet', type: 'model' } },
      { data: { id: 'mcp', label: 'MCP\nProtocol', type: 'model' } },
      { data: { id: 'gemini', label: 'Gemini\n2.5 Pro', type: 'model' } },
      { data: { id: 'gemma', label: 'Gemma\n(open)', type: 'model' } },
      { data: { id: 'r1', label: 'DeepSeek-R1\n(MIT)', type: 'model' } },
      { data: { id: 'qwen', label: 'Qwen 2.5\n(Apache)', type: 'model' } },
      { data: { id: 'rlhf', label: 'RLHF /\nCAI', type: 'research' } },
      { data: { id: 'transformer', label: 'Transformer\nPaper', type: 'research' } },
      { data: { source: 'openai', target: 'gpt4o' } },
      { data: { source: 'openai', target: 'o3' } },
      { data: { source: 'anthropic', target: 'claude' } },
      { data: { source: 'anthropic', target: 'mcp' } },
      { data: { source: 'google', target: 'gemini' } },
      { data: { source: 'google', target: 'gemma' } },
      { data: { source: 'deepseek', target: 'r1' } },
      { data: { source: 'alibaba', target: 'qwen' } },
      { data: { source: 'openai', target: 'rlhf' } },
      { data: { source: 'anthropic', target: 'rlhf' } },
      { data: { source: 'google', target: 'transformer' } },
      { data: { source: 'transformer', target: 'openai' } },
      { data: { source: 'r1', target: 'qwen', label: 'open-source' } },
    ],
    layout: { name: 'cose', padding: 30, nodeRepulsion: 7000, idealEdgeLength: 100 },
  },
  {
    id: 'learning',
    title: 'Learning Path Dependency Map',
    desc: 'A directed graph of the 1-year AI curriculum — prerequisite chains from Python foundations through to GenAI deployment.',
    link: '/learn',
    linkLabel: 'Learning Hub →',
    altLinks: [{ to: '/learn/q1', label: 'Q1 Foundations' }, { to: '/learn/q4', label: 'Q4 GenAI & MLOps' }],
    color: '#10b981',
    elements: [
      { data: { id: 'q1', label: 'Q1\nFoundations', type: 'hub' } },
      { data: { id: 'q2', label: 'Q2\nClassical ML', type: 'hub' } },
      { data: { id: 'q3', label: 'Q3\nDeep Learning', type: 'hub' } },
      { data: { id: 'q4', label: 'Q4\nGenAI & MLOps', type: 'hub' } },
      { data: { id: 'python', label: 'Python', type: 'concept' } },
      { data: { id: 'numpy', label: 'NumPy\nPandas', type: 'concept' } },
      { data: { id: 'maths', label: 'Linear Algebra\nCalculus', type: 'concept' } },
      { data: { id: 'sklearn', label: 'Scikit-Learn\nPipelines', type: 'concept' } },
      { data: { id: 'xgb', label: 'XGBoost\nRandom Forest', type: 'concept' } },
      { data: { id: 'pytorch', label: 'PyTorch', type: 'concept' } },
      { data: { id: 'cnn', label: 'CNNs\nRNNs', type: 'concept' } },
      { data: { id: 'hf', label: 'Hugging\nFace', type: 'concept' } },
      { data: { id: 'llmapi', label: 'LLM APIs\nRAG', type: 'concept' } },
      { data: { id: 'fastapi', label: 'FastAPI\nDocker', type: 'concept' } },
      { data: { source: 'q1', target: 'python' } },
      { data: { source: 'q1', target: 'numpy' } },
      { data: { source: 'q1', target: 'maths' } },
      { data: { source: 'q1', target: 'q2' } },
      { data: { source: 'q2', target: 'sklearn' } },
      { data: { source: 'q2', target: 'xgb' } },
      { data: { source: 'q2', target: 'q3' } },
      { data: { source: 'q3', target: 'pytorch' } },
      { data: { source: 'q3', target: 'cnn' } },
      { data: { source: 'q3', target: 'hf' } },
      { data: { source: 'q3', target: 'q4' } },
      { data: { source: 'q4', target: 'llmapi' } },
      { data: { source: 'q4', target: 'fastapi' } },
      { data: { source: 'maths', target: 'sklearn' } },
      { data: { source: 'numpy', target: 'pytorch' } },
    ],
    layout: { name: 'breadthfirst', directed: true, padding: 30, spacingFactor: 1.2 },
  },
  {
    id: 'enterprise',
    title: 'Enterprise AI Adoption Flow',
    desc: 'How the Enterprise Context pages connect — from understanding what AI does, finding value, choosing adoption timing, to measuring impact.',
    link: '/p12',
    linkLabel: 'What Enterprises Do →',
    altLinks: [{ to: '/p13', label: 'Where the Value Is' }, { to: '/p16', label: 'How to Measure Value' }],
    color: '#f59e0b',
    elements: [
      { data: { id: 'what', label: 'What\nEnterprises Do', type: 'hub' } },
      { data: { id: 'value', label: 'Where the\nValue Is', type: 'hub' } },
      { data: { id: 'how', label: 'How to\nAdopt AI', type: 'hub' } },
      { data: { id: 'when', label: 'When to\nAdopt AI', type: 'hub' } },
      { data: { id: 'measure', label: 'How to\nMeasure', type: 'hub' } },
      { data: { id: 'automation', label: 'Task\nAutomation', type: 'concept' } },
      { data: { id: 'knowledge', label: 'Knowledge\nWork', type: 'concept' } },
      { data: { id: 'decision', label: 'Decision\nSupport', type: 'concept' } },
      { data: { id: 'pilots', label: 'Pilots &\nProof of Concept', type: 'concept' } },
      { data: { id: 'scale', label: 'Scale &\nEmbedding', type: 'concept' } },
      { data: { id: 'roi', label: 'ROI\nCalculation', type: 'concept' } },
      { data: { id: 'kpi', label: 'AI KPIs\n& Metrics', type: 'concept' } },
      { data: { id: 'readiness', label: 'Readiness\nAssessment', type: 'concept' } },
      { data: { source: 'what', target: 'automation' } },
      { data: { source: 'what', target: 'knowledge' } },
      { data: { source: 'what', target: 'decision' } },
      { data: { source: 'what', target: 'value' } },
      { data: { source: 'value', target: 'how' } },
      { data: { source: 'how', target: 'pilots' } },
      { data: { source: 'how', target: 'scale' } },
      { data: { source: 'when', target: 'readiness' } },
      { data: { source: 'value', target: 'when' } },
      { data: { source: 'how', target: 'when' } },
      { data: { source: 'scale', target: 'measure' } },
      { data: { source: 'measure', target: 'roi' } },
      { data: { source: 'measure', target: 'kpi' } },
      { data: { source: 'readiness', target: 'pilots' } },
    ],
    layout: { name: 'cose', padding: 30, nodeRepulsion: 5500, idealEdgeLength: 90 },
  },
  {
    id: 'techstack',
    title: 'Production AI Technology Stack',
    desc: 'The layers of a production LLM application — from user interface down through API, orchestration, retrieval, and infrastructure.',
    link: '/p7',
    linkLabel: 'Technology & Tools →',
    altLinks: [{ to: '/p40', label: 'Retrieval & Memory' }, { to: '/p41', label: 'Agents & Orchestration' }],
    color: '#8b5cf6',
    elements: [
      { data: { id: 'ui', label: 'React UI\nFrontend', type: 'hub' } },
      { data: { id: 'api', label: 'FastAPI\nBackend', type: 'hub' } },
      { data: { id: 'llmapi', label: 'LLM API\n(Anthropic / OpenAI)', type: 'hub' } },
      { data: { id: 'rag', label: 'RAG\nPipeline', type: 'hub' } },
      { data: { id: 'vecstore', label: 'Vector Store\n(pgvector/Pinecone)', type: 'concept' } },
      { data: { id: 'docstore', label: 'Document\nStore', type: 'concept' } },
      { data: { id: 'orchestrate', label: 'Orchestration\n(LangChain / SDK)', type: 'concept' } },
      { data: { id: 'cache', label: 'Prompt\nCaching', type: 'concept' } },
      { data: { id: 'auth', label: 'Auth &\nPermissions', type: 'concept' } },
      { data: { id: 'monitor', label: 'Logging &\nObservability', type: 'concept' } },
      { data: { id: 'docker', label: 'Docker\nContainers', type: 'concept' } },
      { data: { id: 'db', label: 'MySQL /\nPostgres', type: 'concept' } },
      { data: { source: 'ui', target: 'auth' } },
      { data: { source: 'ui', target: 'api' } },
      { data: { source: 'api', target: 'orchestrate' } },
      { data: { source: 'api', target: 'monitor' } },
      { data: { source: 'api', target: 'db' } },
      { data: { source: 'orchestrate', target: 'llmapi' } },
      { data: { source: 'orchestrate', target: 'rag' } },
      { data: { source: 'llmapi', target: 'cache' } },
      { data: { source: 'rag', target: 'vecstore' } },
      { data: { source: 'rag', target: 'docstore' } },
      { data: { source: 'docker', target: 'api' } },
      { data: { source: 'docker', target: 'vecstore' } },
    ],
    layout: { name: 'cose', padding: 30, nodeRepulsion: 6000, idealEdgeLength: 95 },
  },
  {
    id: 'maturity',
    title: 'AI Maturity Journey Graph',
    desc: 'Progression from AI-Aware to AI-Native — stages, transitions, and the capability milestones that characterise each level.',
    link: '/p2',
    linkLabel: 'Maturity Journey →',
    altLinks: [{ to: '/p34', label: 'Maturity Canvas' }, { to: '/p4', label: 'Assessment & Discovery' }],
    color: '#ec4899',
    elements: [
      { data: { id: 'l1', label: 'Level 1\nAI-Aware', type: 'hub' } },
      { data: { id: 'l2', label: 'Level 2\nExperimenting', type: 'hub' } },
      { data: { id: 'l3', label: 'Level 3\nScaling', type: 'hub' } },
      { data: { id: 'l4', label: 'Level 4\nTransforming', type: 'hub' } },
      { data: { id: 'l5', label: 'Level 5\nAI-Native', type: 'hub' } },
      { data: { id: 'train', label: 'Staff\nTraining', type: 'concept' } },
      { data: { id: 'poc', label: 'Proof of\nConcept', type: 'concept' } },
      { data: { id: 'data', label: 'Data\nInfrastructure', type: 'concept' } },
      { data: { id: 'govn', label: 'AI\nGovernance', type: 'concept' } },
      { data: { id: 'platform', label: 'AI\nPlatform', type: 'concept' } },
      { data: { id: 'culture', label: 'AI-First\nCulture', type: 'concept' } },
      { data: { id: 'feedback', label: 'Continuous\nLearning Loop', type: 'concept' } },
      { data: { source: 'l1', target: 'train' } },
      { data: { source: 'l1', target: 'l2' } },
      { data: { source: 'l2', target: 'poc' } },
      { data: { source: 'l2', target: 'l3' } },
      { data: { source: 'l3', target: 'data' } },
      { data: { source: 'l3', target: 'govn' } },
      { data: { source: 'l3', target: 'l4' } },
      { data: { source: 'l4', target: 'platform' } },
      { data: { source: 'l4', target: 'l5' } },
      { data: { source: 'l5', target: 'culture' } },
      { data: { source: 'l5', target: 'feedback' } },
      { data: { source: 'feedback', target: 'l2' } },
      { data: { source: 'poc', target: 'data' } },
    ],
    layout: { name: 'breadthfirst', directed: true, padding: 30, spacingFactor: 1.3 },
  },
];

// ── Cytoscape renderer ────────────────────────────────────────────────────────
function CyGraph({ useCase }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy previous instance
    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    const accentColor = useCase.color;

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: useCase.elements,
      layout: { ...useCase.layout, animate: true, animationDuration: 400 },
      style: [
        {
          selector: 'node[type="hub"]',
          style: {
            'background-color': accentColor,
            'label': 'data(label)',
            'color': '#ffffff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '10px',
            'font-weight': '700',
            'font-family': 'Inter, system-ui, sans-serif',
            'width': '70px',
            'height': '70px',
            'text-wrap': 'wrap',
            'text-max-width': '62px',
            'border-width': '0px',
            'shape': 'ellipse',
            'text-outline-width': 0,
          },
        },
        {
          selector: 'node[type="model"]',
          style: {
            'background-color': '#ffffff',
            'border-color': accentColor,
            'border-width': '2px',
            'label': 'data(label)',
            'color': '#334155',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '9px',
            'font-weight': '600',
            'font-family': 'Inter, system-ui, sans-serif',
            'width': '58px',
            'height': '58px',
            'text-wrap': 'wrap',
            'text-max-width': '52px',
          },
        },
        {
          selector: 'node[type="concept"]',
          style: {
            'background-color': '#f8fafc',
            'border-color': '#cbd5e1',
            'border-width': '1.5px',
            'label': 'data(label)',
            'color': '#475569',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '9px',
            'font-weight': '500',
            'font-family': 'Inter, system-ui, sans-serif',
            'width': '54px',
            'height': '54px',
            'text-wrap': 'wrap',
            'text-max-width': '48px',
          },
        },
        {
          selector: 'node[type="research"]',
          style: {
            'background-color': '#fef3c7',
            'border-color': '#f59e0b',
            'border-width': '1.5px',
            'label': 'data(label)',
            'color': '#92400e',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '9px',
            'font-weight': '600',
            'font-family': 'Inter, system-ui, sans-serif',
            'width': '52px',
            'height': '52px',
            'text-wrap': 'wrap',
            'text-max-width': '46px',
          },
        },
        {
          selector: 'edge',
          style: {
            'line-color': '#e2e8f0',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'width': 1.5,
            'arrow-scale': 0.8,
            'opacity': 0.8,
          },
        },
        {
          selector: 'node:selected',
          style: {
            'border-color': accentColor,
            'border-width': '3px',
            'overlay-color': accentColor,
            'overlay-padding': '6px',
            'overlay-opacity': 0.08,
          },
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': accentColor,
            'target-arrow-color': accentColor,
            'width': 2.5,
            'opacity': 1,
          },
        },
        {
          selector: '.highlighted',
          style: {
            'border-color': accentColor,
            'border-width': '3px',
          },
        },
        {
          selector: '.faded',
          style: {
            'opacity': 0.2,
          },
        },
      ],
    });

    // Hover: highlight neighbours
    cyRef.current.on('tap', 'node', function (evt) {
      const node = evt.target;
      const cy = cyRef.current;
      cy.elements().removeClass('highlighted faded');
      const neighbourhood = node.closedNeighborhood();
      cy.elements().not(neighbourhood).addClass('faded');
      neighbourhood.addClass('highlighted');
    });

    // Tap on background: reset
    cyRef.current.on('tap', function (evt) {
      if (evt.target === cyRef.current) {
        cyRef.current.elements().removeClass('highlighted faded');
      }
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [useCase]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '340px', background: '#f8fafc', borderRadius: '12px' }}
    />
  );
}

// ── Feature badges ────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '🔗', label: 'Graph theory primitives', desc: 'Nodes, edges, directed/undirected, multigraph, compound (nested) graphs.' },
  { icon: '⚡', label: 'Fast rendering', desc: 'Canvas renderer handles 10,000+ elements. WebGL renderer for even larger graphs.' },
  { icon: '📐', label: 'Automatic layouts', desc: '15+ built-in layouts: cose, dagre, breadthfirst, circle, grid, cola, and more.' },
  { icon: '🎨', label: 'Rich styling', desc: 'CSS-like stylesheet with colours, shapes, line styles, labels, gradients.' },
  { icon: '🖱️', label: 'Interaction', desc: 'Pan, zoom, node drag, box select, tap/hover events — fully interactive.' },
  { icon: '🔌', label: 'Plugin ecosystem', desc: 'Dagre layout, popper.js tooltips, cxtmenu context menus, edgehandles for drawing edges.' },
];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LabCytoscape() {
  const [activeTab, setActiveTab] = useState(0);
  const uc = USE_CASES[activeTab];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl bg-violet-50 flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="8" cy="8" r="5" fill="#8b5cf6" />
            <circle cx="24" cy="8" r="5" fill="#6366f1" />
            <circle cx="16" cy="24" r="5" fill="#a78bfa" />
            <line x1="8" y1="8" x2="24" y2="8" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="8" y1="8" x2="16" y2="24" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="24" y1="8" x2="16" y2="24" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">Cytoscape.js</h1>
            <a
              href="https://js.cytoscape.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-200 font-semibold hover:bg-violet-100 transition-colors"
            >
              js.cytoscape.org ↗
            </a>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl">
            A graph theory library for visualising and analysing networks. Works entirely in the browser — no backend required. The 6 interactive graphs below use real dashboard content as the data.
          </p>
        </div>
      </div>

      {/* Feature strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {FEATURES.map((f) => (
          <div key={f.label} className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
            <span className="text-base flex-shrink-0">{f.icon}</span>
            <div>
              <p className="text-xs font-bold text-slate-700">{f.label}</p>
              <p className="text-xs text-slate-400 leading-snug">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Install snippet */}
      <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-xs text-slate-300 mb-8 flex items-center gap-4">
        <span className="text-slate-500 flex-shrink-0">npm install</span>
        <span className="text-emerald-400">cytoscape</span>
        <span className="text-slate-500 ml-auto">v3.33 · MIT licence</span>
      </div>

      {/* ── Use case section ── */}
      <h2 className="text-lg font-bold text-slate-800 mb-1">Dashboard Use Cases</h2>
      <p className="text-slate-400 text-sm mb-4">
        Six graph visualisations built from this dashboard's own content. Click any graph node to highlight its connections.
      </p>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {USE_CASES.map((uc, i) => (
          <button
            key={uc.id}
            onClick={() => setActiveTab(i)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all border ${
              activeTab === i
                ? 'text-white border-transparent'
                : 'text-slate-500 border-slate-200 bg-white hover:border-slate-300'
            }`}
            style={activeTab === i ? { background: uc.color, borderColor: uc.color } : {}}
          >
            {uc.title.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>

      {/* Active use case */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        {/* Card header */}
        <div className="px-5 py-4 border-b border-slate-100" style={{ borderLeft: `4px solid ${uc.color}` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 mb-1">{uc.title}</h3>
              <p className="text-sm text-slate-500">{uc.desc}</p>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <NavLink
                to={uc.link}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: uc.color }}
              >
                {uc.linkLabel}
              </NavLink>
              {uc.altLinks.map((al) => (
                <NavLink
                  key={al.to}
                  to={al.to}
                  className="text-xs px-3 py-1 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
                >
                  {al.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="p-4 bg-white">
          <CyGraph key={uc.id} useCase={uc} />
          <p className="text-xs text-slate-400 mt-2 text-center">
            Click a node to highlight its connections · Click the background to reset · Drag nodes to rearrange
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 rounded-xl bg-violet-50 border border-violet-200 px-4 py-3 text-sm text-violet-700">
        <strong>Integration pattern:</strong> Import cytoscape, create a container <code className="font-mono bg-violet-100 px-1 rounded">div</code> with a fixed height, and call <code className="font-mono bg-violet-100 px-1 rounded">cytoscape({"{ container, elements, layout, style }"})</code> inside a <code className="font-mono bg-violet-100 px-1 rounded">useEffect</code>. Always call <code className="font-mono bg-violet-100 px-1 rounded">cy.destroy()</code> in the cleanup function to avoid memory leaks.
      </div>
    </div>
  );
}
