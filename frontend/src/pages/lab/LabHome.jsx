import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Share2, MessageSquare, Box, Clock, BarChart2, CalendarDays, FlaskConical, StickyNote, Pencil, Check, X, Database, PenLine, Network } from 'lucide-react';

const NOTES_KEY = 'lab-home-notes';
const DEFAULT_NOTES = `## Key Libraries

**@uppy/core + @uppy/react** — File upload. v5 breaking changes: CSS paths changed to /css/, Dashboard import path changed to '@uppy/react/dashboard', useWebcam returns prop-getter functions.

**recharts** — Charts. SunburstChart, Sankey, Treemap, FunnelChart all available. Use ResponsiveContainer for fluid widths.

**reactflow** — Graph/diagram UI. Custom node types registered via nodeTypes prop. Force layout via d3-force plugin.

**antd** — Ant Design. Calendar, DatePicker, Modal. Requires ConfigProvider for theme tokens.

**@anthropic-ai/sdk** — Claude API. Default to claude-opus-4-7 with adaptive thinking for complex tasks.

**@assistant-ui/react** — Chat UI primitives. AssistantModalPrimitive for floating modal widget. AssistantRuntimeProvider + useLocalRuntime(adapter) for mock/local runtime. Real backend: replace adapter.run() with a fetch to /api/chat. useChatRuntime() from @assistant-ui/react-ai-sdk for Vercel AI SDK integration.`;

function EditableNotes() {
  const [saved, setSaved] = useState(() => localStorage.getItem(NOTES_KEY) ?? DEFAULT_NOTES);
  const [draft, setDraft] = useState(saved);
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  function startEdit() {
    setDraft(saved);
    setEditing(true);
  }

  function save() {
    setSaved(draft);
    localStorage.setItem(NOTES_KEY, draft);
    setEditing(false);
  }

  function discard() {
    setDraft(saved);
    setEditing(false);
  }

  return (
    <div className="mt-10 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <StickyNote size={15} className="text-amber-500" />
          <span className="text-sm font-bold text-slate-700">Library Notes</span>
          <span className="text-xs text-slate-400 font-normal">· saved to localStorage</span>
        </div>
        {!editing ? (
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <Pencil size={12} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={save}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <Check size={12} /> Save
            </button>
            <button
              onClick={discard}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <X size={12} /> Discard
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {editing ? (
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          className="w-full px-5 py-4 text-sm font-mono text-slate-700 bg-white resize-none focus:outline-none leading-relaxed"
          style={{ minHeight: 220 }}
          spellCheck={false}
        />
      ) : (
        <div
          className="px-5 py-4 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-mono bg-white cursor-text select-text"
          style={{ minHeight: 100 }}
          onClick={startEdit}
          title="Click to edit"
        >
          {saved || <span className="text-slate-300 italic">No notes yet — click to add some.</span>}
        </div>
      )}
    </div>
  );
}

const EXPERIMENTS = [
  {
    to: '/lab/upload',
    icon: Upload,
    title: 'Image Upload',
    library: 'Uppy',
    libraryUrl: 'https://uppy.io',
    color: 'border-l-violet-400',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    desc: 'Drag-and-drop file upload with webcam capture and mobile camera support. Handles previews, validation, and multi-file queuing.',
    tags: ['@uppy/core', '@uppy/dashboard', '@uppy/webcam'],
  },
  {
    to: '/lab/graph',
    icon: Share2,
    title: 'Site Graph',
    library: 'React Flow',
    libraryUrl: 'https://reactflow.dev',
    color: 'border-l-blue-400',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    desc: 'All pages on this site visualised as an interactive force graph — nodes grouped by section, edges showing content relationships.',
    tags: ['reactflow', 'force-layout'],
  },
  {
    to: '/lab/chat',
    icon: MessageSquare,
    title: 'Chat Agent',
    library: 'Anthropic SDK',
    libraryUrl: 'https://docs.anthropic.com',
    color: 'border-l-emerald-400',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    desc: 'AI chat interface placeholder — ready to connect to Claude via the Anthropic API for contextual Q&A across this dashboard.',
    tags: ['@anthropic-ai/sdk', 'streaming'],
  },
  {
    to: '/lab/arch',
    icon: Box,
    title: 'Architecture Diagram',
    library: 'React Flow',
    libraryUrl: 'https://reactflow.dev',
    color: 'border-l-slate-400',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    desc: 'Interactive system architecture showing the Docker Compose stack — containers, ports, data flows, and service dependencies.',
    tags: ['reactflow', 'custom-nodes'],
  },
  {
    to: '/lab/timeline',
    icon: Clock,
    title: 'Timeline',
    library: 'Custom',
    libraryUrl: null,
    color: 'border-l-amber-400',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    desc: 'Key milestones in enterprise AI — from the Transformer paper (2017) to agentic AI systems (2025). Scrollable vertical timeline.',
    tags: ['tailwind', 'intersection-observer'],
  },
  {
    to: '/lab/charts',
    icon: BarChart2,
    title: 'Data Visualisation',
    library: 'Recharts',
    libraryUrl: 'https://recharts.org',
    color: 'border-l-rose-400',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    desc: 'Spider/radar chart, heatmap, coverage table (dot-size encoding), maturity matrix, and bar chart — all on one canvas.',
    tags: ['recharts', 'RadarChart', 'custom-heatmap'],
  },
  {
    to: '/lab/calendar',
    icon: CalendarDays,
    title: 'AI Calendar',
    library: 'Ant Design',
    libraryUrl: 'https://ant.design/components/calendar',
    color: 'border-l-cyan-400',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    desc: 'Full-featured calendar using Ant Design — CRUD events, busy-day indicators, modal editor, and .ics download for any event.',
    tags: ['antd', 'Calendar', 'ics-export'],
  },
  {
    to: '/lab/database',
    icon: Database,
    title: 'Database Platforms',
    library: 'MySQL · REST API',
    libraryUrl: null,
    color: 'border-l-indigo-400',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    desc: 'Reference guide for top free & open-source no-code/low-code self-hosted database platforms — features, screenshots, and free-tier limitations.',
    tags: ['baserow', 'nocodb', 'grist', 'teable', 'mathesar'],
  },
  {
    to: '/lab/cytoscape',
    icon: Network,
    title: 'Graph Viz',
    library: 'Cytoscape.js',
    libraryUrl: 'https://js.cytoscape.org',
    color: 'border-l-violet-500',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    desc: '6 live interactive graph use cases built from this dashboard\'s own content — knowledge graphs, lab ecosystems, learning path dependencies, tech stacks, and more.',
    tags: ['cytoscape', 'graph-viz', 'network-analysis'],
  },
  {
    to: '/lab/excalidraw',
    icon: PenLine,
    title: 'Excalidraw',
    library: '@excalidraw/excalidraw',
    libraryUrl: 'https://excalidraw.com',
    color: 'border-l-violet-400',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    desc: 'Whiteboard tool with full scene persistence — create, save, rename, and delete drawings stored in MySQL with auto-generated thumbnails.',
    tags: ['whiteboard', 'canvas', 'excalidraw', 'crud'],
  },
];

export default function LabHome() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="p-2 rounded-xl bg-slate-800">
          <FlaskConical size={18} className="text-slate-200" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experimental</p>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">UI & React Features</h1>
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-8">
        Live experiments with React libraries — each subsection is a working implementation. Library name links to documentation.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {EXPERIMENTS.map((e) => {
          const EIcon = e.icon;
          return (
            <Link key={e.to} to={e.to} className={`card border-l-4 ${e.color} group hover:-translate-y-0.5 transition-transform duration-150 block`}>
              <div className="flex items-start gap-3 mb-3">
                <span className={`p-2.5 rounded-xl flex-shrink-0 ${e.iconBg}`}>
                  <EIcon size={18} className={e.iconColor} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-800">{e.title}</p>
                    {e.libraryUrl ? (
                      <a
                        href={e.libraryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={ev => ev.stopPropagation()}
                        className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {e.library} ↗
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{e.library}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{e.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {e.tags.map(t => (
                  <span key={t} className="text-xs font-mono text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <EditableNotes />
    </div>
  );
}
