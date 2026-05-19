import { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle, Tag, Database, ChevronLeft, ChevronRight } from 'lucide-react';

const COLOR_MAP = {
  blue:   { border: 'border-l-blue-400',   header: 'bg-blue-600',   badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  violet: { border: 'border-l-violet-400', header: 'bg-violet-600', badge: 'bg-violet-50 text-violet-700 border-violet-200' },
  emerald:{ border: 'border-l-emerald-400',header: 'bg-emerald-600',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  amber:  { border: 'border-l-amber-400',  header: 'bg-amber-500',  badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  rose:   { border: 'border-l-rose-400',   header: 'bg-rose-600',   badge: 'bg-rose-50 text-rose-700 border-rose-200' },
  indigo: { border: 'border-l-indigo-400', header: 'bg-indigo-600', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  cyan:   { border: 'border-l-cyan-400',   header: 'bg-cyan-600',   badge: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  orange: { border: 'border-l-orange-400', header: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700 border-orange-200' },
};

// ── Logo with initial fallback ────────────────────────────────────────────────
function Logo({ src, name, color }) {
  const [failed, setFailed] = useState(false);
  const initials = name.slice(0, 2).toUpperCase();
  const c = COLOR_MAP[color] || COLOR_MAP.blue;

  if (failed || !src) {
    return (
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${c.header}`}>
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-100 flex-shrink-0 p-1"
      onError={() => setFailed(true)}
    />
  );
}

// ── Screenshot carousel ───────────────────────────────────────────────────────
function Screenshots({ urls, name }) {
  const [idx, setIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState({});

  if (!urls || urls.length === 0) return null;

  const valid = urls.filter((_, i) => !imgFailed[i]);
  if (valid.length === 0) return null;

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50" style={{ aspectRatio: '16/9' }}>
      <img
        key={urls[idx]}
        src={urls[idx]}
        alt={`${name} screenshot ${idx + 1}`}
        className="w-full h-full object-cover"
        onError={() => setImgFailed(f => ({ ...f, [idx]: true }))}
      />
      {urls.length > 1 && (
        <>
          <button
            onClick={() => setIdx(i => (i - 1 + urls.length) % urls.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white transition-all"
          ><ChevronLeft size={14} /></button>
          <button
            onClick={() => setIdx(i => (i + 1) % urls.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white transition-all"
          ><ChevronRight size={14} /></button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {urls.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Platform card ─────────────────────────────────────────────────────────────
function PlatformCard({ platform }) {
  const c = COLOR_MAP[platform.color] || COLOR_MAP.blue;

  return (
    <div className={`card border-l-4 ${c.border} p-0 overflow-hidden`}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-100">
        <Logo src={platform.logo_url} name={platform.name} color={platform.color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-800 text-base">{platform.name}</h3>
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              Visit ↗
            </a>
            {platform.badge && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                platform.badge.startsWith('⭐') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                platform.badge.startsWith('⚠') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {platform.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{platform.tagline}</p>
        </div>
      </div>

      {/* Screenshots */}
      {platform.screenshot_urls?.length > 0 && (
        <div className="px-5 pt-4">
          <Screenshots urls={platform.screenshot_urls} name={platform.name} />
        </div>
      )}

      {/* Features + Limitations */}
      <div className="px-5 py-4 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500" /> Key Features
          </p>
          <ul className="space-y-1.5">
            {(platform.features || []).map((f, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <AlertTriangle size={12} className="text-amber-500" /> Free Tier Limitations
          </p>
          <ul className="space-y-1.5">
            {(platform.limitations || []).map((l, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tags */}
      {platform.tags?.length > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {platform.tags.map(tag => (
            <span key={tag} className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${c.badge}`}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-200" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
      <div className="h-36 bg-slate-100 rounded-xl mb-4" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-3 bg-slate-100 rounded" />)}</div>
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-3 bg-slate-100 rounded" />)}</div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LabDatabase() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/lab/database-platforms')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => { setPlatforms(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          Open Source · Self-Hosted · No-Code / Low-Code
        </span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Interactive Database Platforms</h1>
      <p className="text-slate-500 text-sm mb-8">
        Top free &amp; open-source self-hosted platforms for data management. Each card covers features, free-tier limitations (row caps, access controls, automations), and sample views. Data served from MySQL via <code className="font-mono text-xs bg-slate-100 px-1 rounded">GET /api/lab/database-platforms</code>.
      </p>

      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => <Skeleton key={i} />)}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          <strong>Failed to load platforms:</strong> {error}
          <br />
          <span className="text-xs text-red-500">Make sure the backend is running and the database is seeded.</span>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {platforms.map(p => <PlatformCard key={p.id} platform={p} />)}
        </div>
      )}
    </div>
  );
}
