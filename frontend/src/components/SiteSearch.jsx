import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react';
import SEARCH_INDEX from '../data/searchIndex';

const fuse = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'keywords', weight: 0.3 },
    { name: 'section', weight: 0.2 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
});

export default function SiteSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const search = useCallback((q) => {
    if (q.trim().length < 2) { setResults([]); return; }
    setResults(fuse.search(q).slice(0, 8).map(r => r.item));
  }, []);

  const go = (route) => {
    navigate(route);
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  const handleKey = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); go(results[active].route); }
    if (e.key === 'Escape')    { setQuery(''); setResults([]); setOpen(false); }
  };

  useEffect(() => { setActive(0); }, [results]);

  // Close dropdown on outside click
  const wrapRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setResults([]);
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-3 mt-3 mb-1">
      <div
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Search size={12} className="text-slate-500 flex-shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); search(e.target.value); setOpen(true); }}
          onKeyDown={handleKey}
          onFocus={() => { if (results.length) setOpen(true); }}
          placeholder="Search pages…"
          className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-600 outline-none min-w-0"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false); inputRef.current?.focus(); }}
            className="text-slate-600 hover:text-slate-400"
          >
            <X size={11} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-50 shadow-xl"
          style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {results.map((r, i) => (
            <button
              key={r.route}
              onClick={() => go(r.route)}
              onMouseEnter={() => setActive(i)}
              className="w-full text-left px-3 py-2 flex flex-col gap-0.5 transition-colors"
              style={{
                background: i === active ? 'rgba(59,130,246,0.15)' : 'transparent',
                borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span className="text-xs font-semibold text-slate-200 truncate">{r.title}</span>
              <span className="text-xs text-slate-500">{r.section}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
