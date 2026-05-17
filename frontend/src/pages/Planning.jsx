import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Eye, Columns, Save, Loader2, Clock } from 'lucide-react';

const AUTOSAVE_MS = 1500;

export default function Planning() {
  const [content, setContent] = useState('');
  const [view, setView] = useState('split'); // 'edit' | 'split' | 'preview'
  const [saveState, setSaveState] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const pendingRef = useRef(false);

  // Load on mount
  useEffect(() => {
    fetch('/api/planning')
      .then(r => r.json())
      .then(data => {
        setContent(data.content || '');
        setUpdatedAt(data.updated_at);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const persist = useCallback(async (text) => {
    setSaveState('saving');
    try {
      const res = await fetch('/api/planning', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      setUpdatedAt(data.updated_at);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch {
      setSaveState('error');
      setTimeout(() => setSaveState('idle'), 3000);
    }
    pendingRef.current = false;
  }, []);

  const handleChange = (e) => {
    const text = e.target.value;
    setContent(text);
    setSaveState('idle');
    pendingRef.current = true;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => persist(text), AUTOSAVE_MS);
  };

  // Ctrl/Cmd+S → save immediately
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (pendingRef.current) {
          clearTimeout(timerRef.current);
          persist(content);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [content, persist]);

  const viewBtn = (id, icon, label) => (
    <button
      onClick={() => setView(id)}
      title={label}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
        ${view === id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
    >
      {icon}{label}
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="text-slate-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 'calc(100vh - 2rem)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-violet-100">
            <FileText size={16} className="text-violet-600" />
          </span>
          <h1 className="text-xl font-extrabold text-slate-900">Planning</h1>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 ml-2">
          {viewBtn('edit', <FileText size={12} />, 'Edit')}
          {viewBtn('split', <Columns size={12} />, 'Split')}
          {viewBtn('preview', <Eye size={12} />, 'Preview')}
        </div>

        <div className="flex-1" />

        {/* Save indicator */}
        <div className="flex items-center gap-1.5 text-xs">
          {saveState === 'saving' && <><Loader2 size={12} className="animate-spin text-slate-400" /><span className="text-slate-400">Saving…</span></>}
          {saveState === 'saved' && <><Save size={12} className="text-emerald-500" /><span className="text-emerald-600 font-medium">Saved</span></>}
          {saveState === 'error' && <span className="text-red-500 font-medium">Save failed</span>}
          {saveState === 'idle' && updatedAt && (
            <span className="text-slate-400 flex items-center gap-1">
              <Clock size={11} />
              {new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">Ctrl+S</span>
      </div>

      {/* Editor / Preview area */}
      <div className="flex gap-4 flex-1 min-h-0" style={{ height: 'calc(100vh - 10rem)' }}>

        {/* Editor pane */}
        {(view === 'edit' || view === 'split') && (
          <div className={`flex flex-col ${view === 'split' ? 'w-1/2' : 'w-full'}`}>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Markdown</div>
            <textarea
              value={content}
              onChange={handleChange}
              spellCheck={false}
              className="flex-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-800 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              placeholder="Start writing in Markdown…"
            />
          </div>
        )}

        {/* Preview pane */}
        {(view === 'preview' || view === 'split') && (
          <div className={`flex flex-col ${view === 'split' ? 'w-1/2' : 'w-full'}`}>
            {view === 'split' && <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Preview</div>}
            <div className="flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white px-6 py-5 prose prose-slate prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || '*Nothing to preview yet.*'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
