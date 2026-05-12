import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Plus, Trash2, Pencil, Check, X, Save, FileImage, Loader2, PenLine } from 'lucide-react';

const Excalidraw = lazy(() =>
  import('@excalidraw/excalidraw').then(m => ({ default: m.Excalidraw }))
);

// ── Drawing thumbnail ─────────────────────────────────────────────────────────
function DrawingCard({ drawing, active, onSelect, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(drawing.name);

  return (
    <div
      onClick={() => !editing && onSelect(drawing.id)}
      className={`group relative rounded-xl border cursor-pointer transition-all duration-150 overflow-hidden
        ${active ? 'border-violet-400 ring-2 ring-violet-200' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}
    >
      {/* Thumbnail */}
      <div className="bg-slate-50 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
        {drawing.thumbnail
          ? <img src={drawing.thumbnail} alt={drawing.name} className="w-full h-full object-contain" />
          : <PenLine size={24} className="text-slate-300" />
        }
      </div>

      {/* Name + actions */}
      <div className="px-2.5 py-2 bg-white">
        {editing ? (
          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              autoFocus
              className="flex-1 text-xs font-semibold border border-blue-300 rounded px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
              onKeyDown={e => {
                if (e.key === 'Enter') { onRename(drawing.id, draft); setEditing(false); }
                if (e.key === 'Escape') { setDraft(drawing.name); setEditing(false); }
              }}
            />
            <button onClick={() => { onRename(drawing.id, draft); setEditing(false); }} className="p-0.5 text-emerald-600"><Check size={11} /></button>
            <button onClick={() => { setDraft(drawing.name); setEditing(false); }} className="p-0.5 text-slate-400"><X size={11} /></button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="flex-1 text-xs font-semibold text-slate-700 truncate">{drawing.name}</span>
            <button
              onClick={e => { e.stopPropagation(); setDraft(drawing.name); setEditing(true); }}
              className="p-0.5 text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
            ><Pencil size={11} /></button>
            <button
              onClick={e => { e.stopPropagation(); onDelete(drawing.id); }}
              className="p-0.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            ><Trash2 size={11} /></button>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-0.5">
          {new Date(drawing.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LabExcalidraw() {
  const [drawings, setDrawings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeName, setActiveName] = useState('');
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const dirtyRef = useRef(false);

  // Load drawings list on mount
  useEffect(() => {
    fetch('/api/lab/excalidraw')
      .then(r => r.json())
      .then(setDrawings)
      .catch(() => {});
  }, []);

  const showSaveMsg = (msg) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(''), 2500);
  };

  // Generate thumbnail from current Excalidraw state
  const generateThumbnail = useCallback(async (api) => {
    try {
      const elements = api.getSceneElements();
      if (!elements.length) return null;
      const { exportToBlob } = await import('@excalidraw/excalidraw');
      const blob = await exportToBlob({
        elements,
        appState: { ...api.getAppState(), exportWithDarkMode: false, exportBackground: true },
        files: api.getFiles(),
        mimeType: 'image/png',
        quality: 0.6,
        getDimensions: () => ({ width: 280, height: 210, scale: 1 }),
      });
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }, []);

  const save = useCallback(async (api = excalidrawAPI, id = activeId, name = activeName) => {
    if (!api || !id) return;
    setSaving(true);
    try {
      const elements = api.getSceneElements();
      const appState = api.getAppState();
      const files = api.getFiles();
      const scene_data = { elements, appState: { ...appState, collaborators: [] }, files };
      const thumbnail = await generateThumbnail(api);
      const res = await fetch(`/api/lab/excalidraw/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, scene_data, thumbnail }),
      });
      const updated = await res.json();
      setDrawings(d => d.map(x => x.id === id ? { ...x, ...updated, thumbnail } : x));
      dirtyRef.current = false;
      showSaveMsg('Saved ✓');
    } catch {
      showSaveMsg('Save failed');
    }
    setSaving(false);
  }, [excalidrawAPI, activeId, activeName, generateThumbnail]);

  // Ctrl/Cmd+S shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [save]);

  const loadDrawing = useCallback(async (id) => {
    if (dirtyRef.current && activeId) {
      const ok = window.confirm('Save changes to current drawing before switching?');
      if (ok) await save();
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/lab/excalidraw/${id}`);
      const data = await res.json();
      setActiveId(data.id);
      setActiveName(data.name);
      if (excalidrawAPI && data.scene_data) {
        excalidrawAPI.updateScene({
          elements: data.scene_data.elements || [],
          appState: { ...(data.scene_data.appState || {}), collaborators: new Map() },
        });
        if (data.scene_data.files) {
          excalidrawAPI.addFiles(Object.values(data.scene_data.files));
        }
      }
      dirtyRef.current = false;
    } catch {}
    setLoading(false);
  }, [excalidrawAPI, activeId, save]);

  const newDrawing = async () => {
    if (dirtyRef.current && activeId) {
      const ok = window.confirm('Save current drawing before creating new one?');
      if (ok) await save();
    }
    const res = await fetch('/api/lab/excalidraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `Drawing ${drawings.length + 1}` }),
    });
    const created = await res.json();
    setDrawings(d => [created, ...d]);
    setActiveId(created.id);
    setActiveName(created.name);
    if (excalidrawAPI) excalidrawAPI.resetScene();
    dirtyRef.current = false;
  };

  const renameDrawing = async (id, name) => {
    await fetch(`/api/lab/excalidraw/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setDrawings(d => d.map(x => x.id === id ? { ...x, name } : x));
    if (id === activeId) setActiveName(name);
  };

  const deleteDrawing = async (id) => {
    if (!window.confirm('Delete this drawing?')) return;
    await fetch(`/api/lab/excalidraw/${id}`, { method: 'DELETE' });
    setDrawings(d => d.filter(x => x.id !== id));
    if (id === activeId) {
      setActiveId(null);
      setActiveName('');
      excalidrawAPI?.resetScene();
    }
  };

  const handleExcalidrawChange = useCallback(() => {
    if (activeId) dirtyRef.current = true;
  }, [activeId]);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800 flex-shrink-0 border-b border-slate-700">
        <PenLine size={16} className="text-violet-400" />
        <span className="text-sm font-bold text-white">Excalidraw Workspace</span>
        {activeName && (
          <>
            <span className="text-slate-600">·</span>
            <span className="text-sm text-slate-300 truncate max-w-xs">{activeName}</span>
          </>
        )}
        <div className="flex-1" />
        {saveMsg && <span className="text-xs text-emerald-400 font-medium">{saveMsg}</span>}
        <button
          onClick={() => save()}
          disabled={!activeId || saving}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
          Save
        </button>
        <span className="text-xs text-slate-500">Ctrl+S</span>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <div className="flex-shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col" style={{ width: 200, overflow: 'hidden' }}>
          <div className="px-3 pt-3 pb-2 flex-shrink-0">
            <button
              onClick={newDrawing}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-colors"
            >
              <Plus size={13} /> New Drawing
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-2">
            {drawings.length === 0 && (
              <div className="text-center py-8">
                <FileImage size={28} className="mx-auto mb-2 text-slate-300" />
                <p className="text-xs text-slate-400">No drawings yet</p>
              </div>
            )}
            {drawings.map(d => (
              <DrawingCard
                key={d.id}
                drawing={d}
                active={d.id === activeId}
                onSelect={loadDrawing}
                onRename={renameDrawing}
                onDelete={deleteDrawing}
              />
            ))}
          </div>
        </div>

        {/* ── Editor ── */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {!activeId ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50">
              <PenLine size={48} className="text-slate-200" />
              <p className="text-sm font-semibold text-slate-400">Select a drawing or create a new one</p>
              <button
                onClick={newDrawing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold hover:bg-violet-500 transition-colors"
              >
                <Plus size={14} /> New Drawing
              </button>
            </div>
          ) : (
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                <Loader2 size={32} className="text-slate-300 animate-spin" />
              </div>
            }>
              <Excalidraw
                excalidrawAPI={setExcalidrawAPI}
                onChange={handleExcalidrawChange}
                initialData={{ elements: [], appState: { viewBackgroundColor: '#ffffff' } }}
                UIOptions={{
                  canvasActions: {
                    saveToActiveFile: false,
                    loadScene: false,
                    export: { saveFileToDisk: true },
                  },
                }}
              />
            </Suspense>
          )}
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <Loader2 size={32} className="text-violet-500 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
