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
    label: 'nginx-proxy (shared)',
    port: '80 → host :80 → container :80',
    icon: Globe,
    color: { ring: 'ring-blue-200', bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    runtime: 'nginx:1.25-alpine',
    summary: 'Shared nginx-proxy Docker container that serves all path-based sites on this host. Static files (Vite build output) are served via host volume mount — no image rebuild needed for frontend changes. Per-site location snippets live in conf.d/sites/*.conf; a shared 00-base.conf includes them all. Each site manages its own snippet independently.',
    config: 'deploy/nginx/site.conf.template → conf.d/sites/ai-smb.conf',
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
    port: '3002 (container) · 3101 (host, health checks only) · ai-smb-backend:3002 (Docker DNS)',
    icon: Server,
    color: { ring: 'ring-emerald-200', bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    runtime: 'node:22-alpine',
    summary: 'Single-file Express REST API (backend/server.js). Handles all DB reads/writes, file uploads (multer → MySQL LONGBLOB), and serves all /api/* routes. Joins both ai-smb-net (to reach MySQL) and nginx-proxy_default (so nginx can reach it by container name via Docker DNS — no host port needed). runMigrations() on every boot creates and evolves tables idempotently.',
    config: 'backend/server.js',
    apis: [
      { name: '/api/health', role: 'DB status, table list, column checks' },
      { name: '/api/planning', role: 'GET + POST — load and autosave planning doc' },
      { name: '/api/assessments', role: 'POST — save AI readiness quiz results' },
      { name: '/api/companies', role: 'GET / POST / PUT / DELETE — client CRM records' },
      { name: '/api/roi-calculations', role: 'POST — save ROI calculator results' },
      { name: '/api/enterprise/functions', role: 'GET — enterprise AI function seed data' },
      { name: '/api/lab/pdf/*', role: 'Upload, download, annotations, fabric canvas data' },
      { name: '/api/lab/gallery', role: 'GET + POST — image upload and listing' },
      { name: '/api/lab/excalidraw', role: 'GET + POST — save and load whiteboard drawings' },
      { name: '/api/lab/database-platforms', role: 'GET — no-code DB comparison data' },
      { name: '/api/chat', role: 'POST — Claude AI chat proxy via Anthropic SDK' },
      { name: '/api/server-ip', role: 'GET — returns LAN_IP env var for display' },
    ],
    deps: [
      { name: 'Express', role: 'HTTP server + routing' },
      { name: 'mysql2/promise', role: 'MySQL client (async pool)' },
      { name: 'multer (memoryStorage)', role: 'Multipart file uploads → buffer → LONGBLOB' },
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
    summary: 'Persisted via named volume ai-smb-mysql-data — survives container restarts and rebuilds. init.sql runs only on first boot (empty data dir). All schema changes after first boot go through runMigrations() in the backend. max_allowed_packet=256M for LONGBLOB file storage.',
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
  { step: '5', label: 'DOCKER_BUILDKIT=0 build', detail: 'Legacy builder — skips Docker Hub registry auth on restricted networks. manualChunks in vite.config.js splits the bundle into vendor chunks (<2 MB each) to prevent Rollup OOM. Layer cache reused when package.json unchanged (fast path ~36s build).' },
  { step: '6', label: 'docker compose up -d', detail: 'All containers restarted. MySQL untouched (data in named volume). runMigrations() runs on backend startup.' },
  { step: '7', label: 'Health check', detail: 'curl http://127.0.0.1:3101/api/health (direct to backend, bypasses nginx); reports container status in Actions log' },
];

const TRAFFIC = [
  { label: 'Browser', sub: 'port 80 — public or LAN IP', icon: Globe, color: 'blue' },
  { label: 'nginx-proxy :80', sub: 'static files via volume mount\nproxies /api/* → backend', icon: Layers, color: 'blue' },
  { label: 'Express :3002', sub: 'REST API\nrunMigrations on boot', icon: Server, color: 'emerald' },
  { label: 'MySQL :3306', sub: 'named volume\nai-smb-mysql-data', icon: Database, color: 'orange' },
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
        <div className="px-4 pb-4 border-t border-slate-200/60 pt-3 space-y-3">
          {svc.apis && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">API Routes</p>
              <div className="grid grid-cols-1 gap-1">
                {svc.apis.map(d => (
                  <div key={d.name} className="flex items-baseline gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                    <span className="text-xs font-semibold text-slate-700 font-mono">{d.name}</span>
                    <span className="text-xs text-slate-400 flex-1">— {d.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
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
          </div>
          <p className="text-xs text-slate-400 font-mono">config: {svc.config}</p>
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
      { id: 'traffic',    label: 'Request Flow' },
      { id: 'services',   label: 'Services' },
      { id: 'networking', label: 'Docker Networking' },
      { id: 'cicd',       label: 'CI / CD' },
      { id: 'nginx',      label: 'nginx Routing' },
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
            <p><span className="font-semibold text-slate-700">External access:</span> browser → host :80 → nginx-proxy container :80 (direct, no translation)</p>
            <p><span className="font-semibold text-slate-700">API proxy:</span> nginx rewrites <code className="bg-slate-100 px-1 rounded">/api/*</code> → <code className="bg-slate-100 px-1 rounded">ai-smb-backend:3002</code> via Docker network</p>
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

      {/* Docker Networking */}
      <section id="networking" className="mb-10">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Docker Networking</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-3">
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Each Docker Compose project creates its own private bridge network. Containers on different networks cannot see each other — even on the same machine. This caused a <span className="font-semibold text-slate-700">502 Bad Gateway</span> when nginx tried to proxy to <code className="bg-white px-1 rounded">127.0.0.1:3101</code>: that address is the nginx <em>container's own loopback</em>, not the host's.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold text-red-700 mb-2">Before — broken</p>
              <pre className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{`nginx-proxy_default network:
  nginx-proxy  ✓

ai-smb-net network:
  ai-smb-backend  ✓
  ai-smb-mysql    ✓

nginx config:
  proxy_pass http://127.0.0.1:3101
  → hits nginx container's loopback
  → 502 Bad Gateway`}</pre>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-2">After — fixed</p>
              <pre className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{`nginx-proxy_default network:
  nginx-proxy      ✓
  ai-smb-backend   ✓  ← joined both

ai-smb-net network:
  ai-smb-backend   ✓  ← still here
  ai-smb-mysql     ✓

nginx config:
  proxy_pass http://ai-smb-backend:3002
  → Docker DNS resolves container name
  → works`}</pre>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            The fix: declare <code className="bg-white px-1 rounded">nginx-proxy_default</code> as an external network in <code className="bg-white px-1 rounded">docker-compose.yml</code> and attach the backend to it. Docker's internal DNS then resolves <code className="bg-white px-1 rounded">ai-smb-backend</code> to the correct container IP. The host port <code className="bg-white px-1 rounded">127.0.0.1:3101</code> is kept only for health checks run directly on the server.
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-amber-700">Rule of thumb — </span>
          if two Docker Compose projects need to talk, put a shared network in between and use container names, not <code className="bg-white px-1 rounded">localhost</code>. <code className="bg-white px-1 rounded">localhost</code> inside a container is always that container's own loopback.
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
            <p className="text-xs text-slate-600">package.json unchanged → npm install layer cached → Vite build ~36s. manualChunks keeps the largest chunk under 2 MB (was 6.4 MB) — no Rollup OOM.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
            <p className="text-xs font-semibold text-violet-700 mb-1">Slow path (new dependency)</p>
            <p className="text-xs text-slate-600">package.json changed → full npm install → ~8 min for frontend (Mermaid, PDF.js, etc.), ~2 min for backend.</p>
          </div>
        </div>
      </section>

      {/* nginx Routing */}
      <section id="nginx" className="mt-10">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">nginx Routing</h2>

        {/* Journey */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">How a request gets here</p>
          <div className="space-y-2">
            {[
              { step: '1', label: 'DNS', detail: 'A domain name (e.g. shop.mycompany.com) is resolved to a server IP by DNS. Without a domain, you go straight to the IP.' },
              { step: '2', label: 'IP → server', detail: 'The request arrives at the host machine on a port (e.g. :80). The OS hands it to whatever process is listening — in this case, the nginx container.' },
              { step: '3', label: 'server_name — which site?', detail: 'nginx reads the Host header the browser sent. It compares it against server_name in each config file. The matching block handles the request. server_name _ is a catch-all — it matches anything, including raw IP addresses.' },
              { step: '4', label: 'location — which folder?', detail: 'Inside the matching server block, nginx checks the URL path against location rules. Each location maps a path to a folder on disk (root / alias) or to an upstream service (proxy_pass).' },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-3 items-start">
                <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">{item.step}</div>
                  {i < arr.length - 1 && <div className="w-px h-4 bg-slate-200 mt-1" />}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain vs Path */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold text-blue-700 mb-2">Domain-based routing</p>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">Different hostnames hit the same IP. nginx uses <code className="bg-white px-1 rounded">server_name</code> to send each to a different config. DNS is what points the names to the IP.</p>
            <pre className="text-xs bg-white rounded-lg p-3 text-slate-700 leading-relaxed overflow-auto">{`shop.mycompany.com  → /srv/sites/shop/
dash.mycompany.com  → /srv/sites/dash/

# shop.conf
server_name shop.mycompany.com;
root /srv/sites/shop/current;

# dash.conf
server_name dash.mycompany.com;
root /srv/sites/dash/current;`}</pre>
          </div>

          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-xs font-semibold text-violet-700 mb-2">Path-based routing</p>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">One hostname, multiple apps distinguished by URL path. No DNS or domain needed — works on a raw IP. Each <code className="bg-white px-1 rounded">location</code> maps a path to a folder or upstream.</p>
            <pre className="text-xs bg-white rounded-lg p-3 text-slate-700 leading-relaxed overflow-auto">{`192.168.68.6/ai     → /srv/sites/ai/
192.168.68.6/notes  → /srv/sites/notes/

server_name _;   # catch-all

location /ai/ {
  alias /srv/sites/ai/current/;
}
location /notes/ {
  alias /srv/sites/notes/current/;
}`}</pre>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 leading-relaxed">
          <span className="font-semibold text-slate-700">Rule of thumb — </span>
          <span className="font-semibold text-slate-700">server_name</span> is the door (which site does this request belong to).{' '}
          <span className="font-semibold text-slate-700">location</span> is the room (once inside, where does it go). Domain-based needs DNS. Path-based works on a raw IP but requires SPAs to set <code className="bg-slate-100 px-1 rounded">base</code> in vite.config.js and <code className="bg-slate-100 px-1 rounded">basename</code> in React Router.
        </div>
      </section>
    </div>
  );
}
