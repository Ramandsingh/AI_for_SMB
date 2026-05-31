import { useEffect, useState } from 'react';
import { useSections } from '../App';
import {
  Globe, Server, Database, Container, GitBranch,
  ArrowDown, ArrowRight, Package, ChevronDown, ChevronRight,
  Cpu, Layers, Zap, Shield,
} from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'frontend',
    label: 'frontend',
    port: '80 (internal) · 3001 (host)',
    icon: Globe,
    color: { ring: 'ring-blue-200', bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    runtime: 'nginx:1.25-alpine',
    summary: 'Two-stage Docker build. Stage 1 runs Vite to produce a static dist/. Stage 2 copies dist/ into nginx and serves it. nginx also reverse-proxies /api/* to the backend container.',
    config: 'frontend/nginx.conf',
    deps: [
      { name: 'React 18', role: 'UI framework' },
      { name: 'Vite', role: 'Build tool + dev server' },
      { name: 'Tailwind CSS', role: 'Utility CSS' },
      { name: 'React Router v6', role: 'Client-side routing' },
      { name: 'Fuse.js', role: 'Fuzzy site search' },
      { name: 'Axios', role: 'HTTP client' },
      { name: 'PDF.js (pdfjs-dist)', role: 'PDF rendering in canvas' },
      { name: 'Fabric.js v5', role: 'Canvas annotation layer' },
      { name: 'pdf-lib', role: 'Client-side PDF annotation export' },
      { name: 'React Flow', role: 'Node graph (site map, arch diagram)' },
      { name: 'Recharts', role: 'Data visualisation charts' },
      { name: 'Mermaid', role: 'Flowchart / diagram rendering' },
      { name: 'Ant Design', role: 'Calendar component' },
      { name: 'Cytoscape.js', role: 'Knowledge graph' },
      { name: 'Excalidraw', role: 'Whiteboard canvas (lazy-loaded)' },
      { name: 'Uppy', role: 'Image upload with drag-and-drop' },
      { name: 'Lucide React', role: 'Icon library' },
    ],
  },
  {
    id: 'backend',
    label: 'backend',
    port: '3002 (internal only)',
    icon: Server,
    color: { ring: 'ring-emerald-200', bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    runtime: 'node:20-alpine',
    summary: 'Express REST API. Handles all database reads/writes, file uploads (multer → MySQL LONGBLOB), PDF annotation persistence, and AI chat proxy. runMigrations() runs on every boot — safe idempotent schema evolution via CREATE TABLE IF NOT EXISTS + SHOW COLUMNS guards.',
    config: 'backend/server.js',
    deps: [
      { name: 'Express', role: 'HTTP server + routing' },
      { name: 'mysql2/promise', role: 'MySQL client (async pool)' },
      { name: 'multer (memoryStorage)', role: 'Multipart file uploads → buffer' },
      { name: 'pdf-lib', role: 'Server-side PDF annotation baking' },
      { name: 'uuid', role: 'UUID v4 for file IDs' },
      { name: 'cors', role: 'CORS headers for dev mode' },
      { name: 'anthropic SDK', role: 'Claude AI chat endpoint (/api/chat)' },
    ],
  },
  {
    id: 'mysql',
    label: 'mysql',
    port: '3306 (internal only)',
    icon: Database,
    color: { ring: 'ring-orange-200', bg: 'bg-orange-50', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
    runtime: 'mysql:8.0',
    summary: 'Persisted via named volume mysql_data — survives container restarts and rebuilds. init.sql runs only on first boot (empty data dir). All schema changes after first boot go through runMigrations() in the backend. max_allowed_packet=256M for LONGBLOB file storage.',
    config: 'mysql/init.sql + backend/server.js runMigrations()',
    deps: [
      { name: 'companies', role: 'Client company CRM records' },
      { name: 'assessments', role: 'AI readiness quiz results' },
      { name: 'roi_calculations', role: 'ROI calculator saves' },
      { name: 'pdf_files', role: 'PDFs stored as LONGBLOB' },
      { name: 'pdf_fabric_data', role: 'Per-page annotation JSON' },
      { name: 'pdf_annotations', role: 'Highlight / comment records' },
      { name: 'planning_doc', role: 'Markdown planning notes (autosave)' },
      { name: 'lab_gallery', role: 'Uploaded images as MEDIUMBLOB' },
      { name: 'lab_excalidraw', role: 'Whiteboard canvas JSON' },
      { name: 'lab_calendar_events', role: 'Calendar event records' },
      { name: 'database_platforms', role: 'No-code DB comparison seed data' },
    ],
  },
];

const CICD = [
  { step: '1', label: 'git push', detail: 'Push to claude/docker-react-vite-mysql-PeMvf or main' },
  { step: '2', label: 'GitHub Actions trigger', detail: 'Workflow runs only if commit message contains [deploy]' },
  { step: '3', label: 'Self-hosted runner', detail: 'Runs on the Mac Mini server; must be running as a service (svc.sh start)' },
  { step: '4', label: 'Write .env', detail: 'Secrets injected from GitHub Secrets: DB_ROOT_PASSWORD, DB_USER, DB_PASSWORD, DB_NAME, LAN_IP' },
  { step: '5', label: 'DOCKER_BUILDKIT=0 build', detail: 'Legacy builder used — skips Docker Hub registry auth on restricted networks. Layer cache reused when package.json unchanged (fast path ~2 min).' },
  { step: '6', label: 'docker compose up -d', detail: 'All containers restarted. MySQL untouched (data in named volume). runMigrations() runs on backend startup.' },
  { step: '7', label: 'Health check', detail: 'curl frontend :3001 + /api/health; reports container status in Actions log' },
];

const TRAFFIC = [
  { label: 'Browser', sub: 'external :3 or LAN :3001', icon: Globe, color: 'blue' },
  { label: 'nginx :80', sub: 'serves static React app\nproxies /api/* → backend', icon: Layers, color: 'blue' },
  { label: 'Express :3002', sub: 'REST API\nrunMigrations on boot', icon: Server, color: 'emerald' },
  { label: 'MySQL :3306', sub: 'persistent named volume\nmysql_data', icon: Database, color: 'orange' },
];

const COLOR = {
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    dot: 'bg-blue-400' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-700',  dot: 'bg-orange-400' },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function ServiceCard({ svc }) {
  const [open, setOpen] = useState(false);
  const Icon = svc.icon;
  const c = svc.color;

  return (
    <div className={`rounded-xl border ${c.ring.replace('ring', 'border')} ${c.bg} overflow-hidden`}>
      <button className="w-full text-left p-4" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white shadow-sm`}>
            <Icon size={16} className={c.icon} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-mono text-sm font-bold text-slate-800">{svc.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{svc.runtime}</span>
            </div>
            <p className="text-xs text-slate-500 font-mono">{svc.port}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{svc.summary}</p>
          </div>
          <span className="text-slate-300 flex-shrink-0 mt-1">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-200/60 pt-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            {svc.id === 'mysql' ? 'Tables' : 'Dependencies'}
          </p>
          <div className="grid grid-cols-1 gap-1">
            {svc.deps.map(d => (
              <div key={d.name} className="flex items-baseline gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                <span className="text-xs font-semibold text-slate-700 font-mono">{d.name}</span>
                <span className="text-xs text-slate-400 flex-1">— {d.role}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 font-mono">config: {svc.config}</p>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Stack() {
  const { setSections } = useSections();

  useEffect(() => {
    setSections([
      { id: 'traffic',  label: 'Request Flow' },
      { id: 'services', label: 'Services' },
      { id: 'cicd',     label: 'CI / CD' },
    ]);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="badge">Admin</span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Tech Stack</h1>
        <p className="mt-2 text-slate-500">
          How this app is built and deployed — three Docker containers, one nginx reverse proxy, and a GitHub Actions self-hosted runner.
        </p>
      </div>

      {/* Request flow */}
      <section id="traffic" className="mb-10">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Request Flow</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
            {TRAFFIC.map((node, i) => {
              const Icon = node.icon;
              const c = COLOR[node.color];
              return (
                <div key={node.label} className="flex sm:flex-row flex-col items-center gap-2 flex-1">
                  <div className={`flex-1 flex flex-col items-center text-center px-3 py-3 rounded-xl border ${c.border} ${c.bg} min-w-0`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 bg-white shadow-sm`}>
                      <Icon size={15} className={c.text} />
                    </div>
                    <p className={`text-xs font-bold ${c.text}`}>{node.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug whitespace-pre-line">{node.sub}</p>
                  </div>
                  {i < TRAFFIC.length - 1 && (
                    <div className="flex-shrink-0 text-slate-300 sm:mx-1">
                      <ArrowRight size={14} className="hidden sm:block" />
                      <ArrowDown size={14} className="block sm:hidden" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Port mapping note */}
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500">
            <p><span className="font-semibold text-slate-700">External access:</span> router forwards :3 → host :3001 → nginx :80</p>
            <p><span className="font-semibold text-slate-700">API proxy:</span> nginx rewrites <code className="bg-slate-100 px-1 rounded">/api/*</code> → <code className="bg-slate-100 px-1 rounded">http://backend:3002</code></p>
            <p><span className="font-semibold text-slate-700">DB access:</span> backend only — MySQL port 3306 not exposed to host</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mb-10">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Docker Services</h2>
        <div className="space-y-3">
          {SERVICES.map(svc => <ServiceCard key={svc.id} svc={svc} />)}
        </div>
      </section>

      {/* CI/CD */}
      <section id="cicd">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">CI / CD Pipeline</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
          {CICD.map((item, i) => (
            <div key={item.step} className="flex gap-3 items-start">
              <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                  {item.step}
                </div>
                {i < CICD.length - 1 && <div className="w-px h-5 bg-slate-200 mt-1" />}
              </div>
              <div className="pb-3">
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">Fast path (code only)</p>
            <p className="text-xs text-slate-600">package.json unchanged → npm install layer cached → rebuild in ~2 min. Only changed source files re-copy.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
            <p className="text-xs font-semibold text-violet-700 mb-1">Slow path (new dependency)</p>
            <p className="text-xs text-slate-600">package.json changed → full npm install → ~8 min for frontend (Mermaid, PDF.js, etc.), ~2 min for backend.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
