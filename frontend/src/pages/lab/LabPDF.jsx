import { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { fabric } from 'fabric';
import {
  FileText, Download, Trash2, Plus, X, Loader2, Save,
  FolderOpen, MousePointer2, Pencil, Highlighter, Square,
  Circle, Type, Eraser, Undo2, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, CheckCheck, AlertCircle,
} from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// ── API helpers ───────────────────────────────────────────────────────────────
const api = {
  list:        ()       => fetch('/api/lab/pdf/files').then(r => r.json()),
  upload:      (file)   => { const fd = new FormData(); fd.append('pdf', file); return fetch('/api/lab/pdf/upload', { method: 'POST', body: fd }).then(r => r.json()); },
  delete:      (id)     => fetch(`/api/lab/pdf/files/${id}`, { method: 'DELETE' }).then(r => r.json()),
  rawUrl:      (id)     => `/api/lab/pdf/files/${id}/raw`,
  downloadUrl: (id)     => `/api/lab/pdf/files/${id}/download`,
  getFabric:   (id)     => fetch(`/api/lab/pdf/files/${id}/fabric`).then(r => r.json()),
  saveFabric:  (id, pages) => fetch(`/api/lab/pdf/files/${id}/fabric`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pages }),
  }).then(r => r.json()),
};

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString();
}

// ── Tool application ──────────────────────────────────────────────────────────
function applyTool(fc, tool, color, sw) {
  if (!fc) return;
  fc.isDrawingMode = false;
  fc.selection = tool === 'select';
  fc.off('mouse:down');
  fc.off('mouse:move');
  fc.off('mouse:up');
  fc.getObjects().forEach(o => { o.selectable = tool === 'select'; o.evented = tool === 'select'; });

  if (tool === 'pen') {
    fc.isDrawingMode = true;
    fc.freeDrawingBrush = new fabric.PencilBrush(fc);
    fc.freeDrawingBrush.color = color;
    fc.freeDrawingBrush.width = sw;
  } else if (tool === 'highlight') {
    fc.isDrawingMode = true;
    fc.freeDrawingBrush = new fabric.PencilBrush(fc);
    fc.freeDrawingBrush.color = color + '66';
    fc.freeDrawingBrush.width = sw * 8;
  } else if (tool === 'rect' || tool === 'circle') {
    let origin, shape;
    fc.on('mouse:down', ({ e }) => {
      const p = fc.getPointer(e);
      origin = p;
      shape = tool === 'rect'
        ? new fabric.Rect({ left: p.x, top: p.y, width: 0, height: 0, stroke: color, strokeWidth: sw, fill: 'transparent', selectable: false })
        : new fabric.Ellipse({ left: p.x, top: p.y, rx: 0, ry: 0, stroke: color, strokeWidth: sw, fill: 'transparent', selectable: false });
      fc.add(shape);
    });
    fc.on('mouse:move', ({ e }) => {
      if (!shape || !origin) return;
      const p = fc.getPointer(e);
      if (tool === 'rect') {
        shape.set({ width: Math.abs(p.x - origin.x), height: Math.abs(p.y - origin.y), left: Math.min(p.x, origin.x), top: Math.min(p.y, origin.y) });
      } else {
        shape.set({ rx: Math.abs(p.x - origin.x) / 2, ry: Math.abs(p.y - origin.y) / 2, left: Math.min(p.x, origin.x), top: Math.min(p.y, origin.y) });
      }
      fc.renderAll();
    });
    fc.on('mouse:up', () => { shape = null; origin = null; });
  } else if (tool === 'text') {
    fc.on('mouse:down', ({ e }) => {
      const p = fc.getPointer(e);
      const t = new fabric.IText('Type here…', { left: p.x, top: p.y, fontSize: 16, fill: color, selectable: true, evented: true });
      fc.add(t);
      fc.setActiveObject(t);
      t.enterEditing();
    });
  } else if (tool === 'eraser') {
    fc.on('mouse:down', ({ e }) => {
      const p = fc.getPointer(e);
      const obj = fc.getObjects().filter(o => o !== fc.backgroundImage).find(o => o.containsPoint(p));
      if (obj) { fc.remove(obj); fc.renderAll(); }
    });
  }
}

// ── File List Panel ───────────────────────────────────────────────────────────
function FilePanel({ files, selected, onSelect, onUpload, onDelete, uploading }) {
  const inputRef = useRef(null);
  const handleFiles = async (fileList) => {
    for (const f of fileList) {
      if (f.type === 'application/pdf') await onUpload(f);
    }
  };
  return (
    <div className="w-60 flex-shrink-0 flex flex-col border-r border-slate-200 bg-slate-50">
      <div className="p-3 border-b border-slate-200">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          {uploading ? 'Uploading…' : 'Upload PDF'}
        </button>
        <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden"
          onChange={e => handleFiles(Array.from(e.target.files || []))} />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <FolderOpen size={28} className="text-slate-300 mb-2" />
            <p className="text-xs text-slate-400">No PDFs yet.<br />Upload one to get started.</p>
          </div>
        )}
        {files.map(f => (
          <div key={f.id} onClick={() => onSelect(f)}
            className={`group flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
              selected?.id === f.id ? 'bg-blue-100 border border-blue-200' : 'hover:bg-white border border-transparent'
            }`}
          >
            <FileText size={16} className={`mt-0.5 flex-shrink-0 ${selected?.id === f.id ? 'text-blue-600' : 'text-slate-400'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-800 truncate">{f.original_name}</p>
              <p className="text-xs text-slate-400">{fmt(f.size)} · {timeAgo(f.created_at)}</p>
            </div>
            <button onClick={e => { e.stopPropagation(); onDelete(f); }}
              className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-300 hover:text-red-500 transition-all flex-shrink-0">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const TOOLS = [
  { id: 'select',    icon: MousePointer2, label: 'Select' },
  { id: 'pen',       icon: Pencil,        label: 'Pen' },
  { id: 'highlight', icon: Highlighter,   label: 'Highlight' },
  { id: 'rect',      icon: Square,        label: 'Rectangle' },
  { id: 'circle',    icon: Circle,        label: 'Ellipse' },
  { id: 'text',      icon: Type,          label: 'Text' },
  { id: 'eraser',    icon: Eraser,        label: 'Eraser' },
];

const COLORS = ['#1e293b', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];

// ── PDF Viewer with Fabric canvas overlay ────────────────────────────────────
function PDFCanvas({ pdfUrl, fileId }) {
  const wrapperRef  = useRef(null);
  const canvasElRef = useRef(null);
  const fabricRef   = useRef(null);
  const pdfDocRef   = useRef(null);
  const pageDataRef = useRef({});   // { "1": fabricJSON, "2": fabricJSON, ... }
  const saveTimerRef = useRef(null);

  const [docVersion, setDocVersion] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#1e293b');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [rendering, setRendering] = useState(false);
  const [history, setHistory] = useState([]);
  const [justSaved, setJustSaved] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Load PDF document on fileId/pdfUrl change
  useEffect(() => {
    let cancelled = false;
    pageDataRef.current = {};
    setCurrentPage(1);
    setHistory([]);
    setLoadError(null);

    const load = async () => {
      try {
        const doc = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;
        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        // Load saved fabric data from backend
        try {
          const saved = await api.getFabric(fileId);
          if (!cancelled && saved?.pages) pageDataRef.current = saved.pages;
        } catch { /* no saved data yet */ }
        // Increment docVersion AFTER both doc and fabric data are loaded
        // so the render effect fires once with everything ready
        if (!cancelled) setDocVersion(v => v + 1);
      } catch (err) {
        if (!cancelled) setLoadError(err?.message || 'Failed to load PDF');
      }
    };
    load();
    return () => { cancelled = true; };
  }, [pdfUrl, fileId]);

  // Render PDF page + restore Fabric canvas whenever page/scale/pdfDoc changes
  useEffect(() => {
    if (!pdfDocRef.current || !canvasElRef.current || !wrapperRef.current) return;
    let cancelled = false;

    const render = async () => {
      setRendering(true);
      const doc = pdfDocRef.current;
      const page = await doc.getPage(currentPage);
      const viewport = page.getViewport({ scale });

      // Offscreen canvas for PDF rendering
      const offscreen = document.createElement('canvas');
      offscreen.width  = viewport.width;
      offscreen.height = viewport.height;
      await page.render({ canvasContext: offscreen.getContext('2d'), viewport }).promise;
      const bgUrl = offscreen.toDataURL('image/jpeg', 0.9);

      if (cancelled) return;

      // Destroy old Fabric instance if it exists
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }

      // Reset canvas element size
      const canvasEl = canvasElRef.current;
      canvasEl.width  = viewport.width;
      canvasEl.height = viewport.height;

      // Create new Fabric canvas
      const fc = new fabric.Canvas(canvasEl, {
        width:  viewport.width,
        height: viewport.height,
        selection: false,
      });
      fabricRef.current = fc;

      // Set PDF page as background
      await new Promise(resolve => {
        fabric.Image.fromURL(bgUrl, img => {
          img.set({ selectable: false, evented: false });
          fc.setBackgroundImage(img, () => { fc.renderAll(); resolve(); });
        });
      });

      // Restore saved annotations for this page
      const saved = pageDataRef.current[String(currentPage)];
      if (saved?.objects?.length) {
        await new Promise(resolve => {
          fc.loadFromJSON(saved, () => {
            // Re-set background (loadFromJSON replaces it with saved version)
            fabric.Image.fromURL(bgUrl, img => {
              img.set({ selectable: false, evented: false });
              fc.setBackgroundImage(img, () => { fc.renderAll(); resolve(); });
            });
          });
        });
      }

      // Wire up change tracking AFTER restore so it doesn't fire during init
      const onChange = () => {
        const json = fc.toJSON();
        pageDataRef.current[String(currentPage)] = json;
        setHistory(h => [...h, json]);
        scheduleSave();
      };
      fc.on('object:added',    onChange);
      fc.on('object:modified', onChange);
      fc.on('object:removed',  onChange);

      applyTool(fc, tool, color, strokeWidth);
      setRendering(false);
    };

    render();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docVersion, currentPage, scale]);

  // Re-apply tool when tool/color/strokeWidth changes (without re-rendering PDF)
  useEffect(() => {
    if (fabricRef.current) applyTool(fabricRef.current, tool, color, strokeWidth);
  }, [tool, color, strokeWidth]);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      api.saveFabric(fileId, pageDataRef.current).catch(() => {});
    }, 1500);
  }, [fileId]);

  const changePage = (next) => {
    if (fabricRef.current) {
      pageDataRef.current[String(currentPage)] = fabricRef.current.toJSON();
    }
    setCurrentPage(next);
    setHistory([]);
  };

  const undo = () => {
    if (history.length < 2 || !fabricRef.current) return;
    const prev = history[history.length - 2];
    const fc = fabricRef.current;
    fc.off('object:added'); fc.off('object:modified'); fc.off('object:removed');
    // We need to preserve background
    const bgUrl = fc.backgroundImage?.getSrc?.() || fc.backgroundImage?.toDataURL?.();
    fc.loadFromJSON(prev, () => {
      if (bgUrl) {
        fabric.Image.fromURL(bgUrl, img => {
          img.set({ selectable: false, evented: false });
          fc.setBackgroundImage(img, () => { fc.renderAll(); });
        });
      }
      // Re-wire change tracking
      const onChange = () => {
        const json = fc.toJSON();
        pageDataRef.current[String(currentPage)] = json;
        setHistory(h => [...h, json]);
        scheduleSave();
      };
      fc.on('object:added', onChange);
      fc.on('object:modified', onChange);
      fc.on('object:removed', onChange);
      applyTool(fc, tool, color, strokeWidth);
    });
    setHistory(h => h.slice(0, -1));
  };

  const saveNow = useCallback(() => {
    if (fabricRef.current) {
      pageDataRef.current[String(currentPage)] = fabricRef.current.toJSON();
    }
    api.saveFabric(fileId, pageDataRef.current)
      .then(() => { setJustSaved(true); setTimeout(() => setJustSaved(false), 2000); })
      .catch(() => {});
  }, [fileId, currentPage]);

  const clearPage = () => {
    if (!fabricRef.current) return;
    const fc = fabricRef.current;
    const bg = fc.backgroundImage;
    fc.getObjects().forEach(o => fc.remove(o));
    if (bg) fc.setBackgroundImage(bg, () => fc.renderAll());
    else fc.renderAll();
    pageDataRef.current[String(currentPage)] = fc.toJSON();
    setHistory([]);
    scheduleSave();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-100">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-slate-200 flex-wrap">
        {/* Tools */}
        <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
          {TOOLS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} title={t.label}
                onClick={() => setTool(t.id)}
                className={`p-1.5 rounded-md transition-colors ${tool === t.id ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>

        <div className="w-px h-5 bg-slate-200" />

        {/* Colors */}
        <div className="flex items-center gap-1">
          {COLORS.map(c => (
            <button key={c} title={c}
              onClick={() => setColor(c)}
              className={`w-4 h-4 rounded-full border-2 transition-transform ${color === c ? 'border-slate-600 scale-110' : 'border-transparent hover:scale-105'}`}
              style={{ background: c }}
            />
          ))}
          <input type="color" value={color} onChange={e => setColor(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-slate-300" title="Custom colour" />
        </div>

        <div className="w-px h-5 bg-slate-200" />

        {/* Stroke slider */}
        <div className="flex items-center gap-1.5">
          <input type="range" min="1" max="20" value={strokeWidth}
            onChange={e => setStrokeWidth(Number(e.target.value))}
            className="w-20 accent-blue-600" style={{ height: '4px' }} />
          <span className="text-xs font-semibold text-slate-600 w-5 text-center">{strokeWidth}</span>
        </div>

        <div className="w-px h-5 bg-slate-200" />

        {/* Undo / Clear */}
        <button title="Undo" onClick={undo} disabled={history.length < 2}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors">
          <Undo2 size={14} />
        </button>
        <button title="Clear page annotations" onClick={clearPage}
          className="p-1.5 rounded-md text-slate-500 hover:text-red-500 transition-colors">
          <X size={14} />
        </button>

        <div className="flex-1" />

        {/* Save / Download — grouped */}
        <button title="Save annotations" onClick={saveNow}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          {justSaved ? <CheckCheck size={12} /> : <Save size={12} />}
          {justSaved ? 'Saved' : 'Save'}
        </button>
        <button title="Download PDF" onClick={() => window.open(api.downloadUrl(fileId), '_blank')}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 transition-colors">
          <Download size={14} />
        </button>

        <div className="w-px h-5 bg-slate-200" />

        {/* Zoom */}
        <button onClick={() => setScale(s => Math.max(0.5, +(s - 0.1).toFixed(1)))}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 transition-colors"><ZoomOut size={14} /></button>
        <span className="text-xs font-semibold text-slate-600 w-10 text-center">{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale(s => Math.min(3, +(s + 0.1).toFixed(1)))}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 transition-colors"><ZoomIn size={14} /></button>

        <div className="w-px h-5 bg-slate-200" />

        {/* Page nav */}
        <button onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors"><ChevronLeft size={14} /></button>
        <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">{currentPage} / {totalPages}</span>
        <button onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors"><ChevronRight size={14} /></button>
      </div>

      {/* Canvas area */}
      <div ref={wrapperRef} className="flex-1 overflow-auto flex items-start justify-center p-4 relative">
        {loadError ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <AlertCircle size={36} className="text-red-400" />
            <p className="text-sm font-semibold text-slate-700">Could not load PDF</p>
            <p className="text-xs text-slate-400 max-w-xs">{loadError}</p>
          </div>
        ) : (
          <>
            {rendering && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-100/70">
                <Loader2 size={24} className="animate-spin text-slate-500" />
              </div>
            )}
            <canvas ref={canvasElRef} />
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LabPDF() {
  const [files, setFiles]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.list().then(setFiles).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const result = await api.upload(file);
      if (result.id) {
        const updated = await api.list();
        setFiles(updated);
        setSelected(result);
      }
    } finally { setUploading(false); }
  };

  const handleDelete = async (f) => {
    if (!confirm(`Delete "${f.original_name}"?`)) return;
    await api.delete(f.id);
    const updated = await api.list();
    setFiles(updated);
    if (selected?.id === f.id) setSelected(null);
  };

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 4rem)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-red-100">
            <FileText size={16} className="text-red-600" />
          </span>
          <h1 className="text-xl font-extrabold text-slate-900">PDF Viewer</h1>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-orange-50 text-orange-700 border-orange-200">PDF.js</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-purple-50 text-purple-700 border-purple-200">Fabric.js</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200">pdfjs-dist@3</span>
        </div>
        {selected && (
          <>
            <div className="flex-1" />
            <span className="text-xs text-slate-400 max-w-[200px] truncate">{selected.original_name}</span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex rounded-xl border border-slate-200 overflow-hidden shadow-sm" style={{ height: 'calc(100vh - 9rem)' }}>
        <FilePanel
          files={files}
          selected={selected}
          onSelect={setSelected}
          onUpload={handleUpload}
          onDelete={handleDelete}
          uploading={uploading}
        />

        {!selected ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 bg-white">
            <FileText size={48} className="text-slate-200 mb-4" />
            <p className="font-semibold text-slate-500 mb-1">No PDF selected</p>
            <p className="text-sm text-slate-400">Upload a PDF from the panel on the left, then click it to open.</p>
          </div>
        ) : (
          <PDFCanvas
            key={selected.id}
            pdfUrl={api.rawUrl(selected.id)}
            fileId={selected.id}
          />
        )}
      </div>

      {/* ── Library Showcase ───────────────────────────────────────────────── */}
      <div className="mt-10 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">PDF Library Landscape</h2>
          <p className="text-sm text-slate-500">Libraries we evaluated for this viewer, what each one does, and why we combined PDF.js + Fabric.js.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* PDF.js */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs">PDF</span>
              <div>
                <p className="text-sm font-bold text-slate-800">PDF.js</p>
                <p className="text-xs text-slate-400">Mozilla · pdfjs-dist@3</p>
              </div>
              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">✓ Used</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">The gold-standard for rendering PDFs in the browser. Parses the binary PDF format and renders every page accurately onto an HTML canvas. Has no drawing/annotation capability of its own — that's handled by Fabric.js.</p>
          </div>

          {/* Fabric.js */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">FC</span>
              <div>
                <p className="text-sm font-bold text-slate-800">Fabric.js</p>
                <p className="text-xs text-slate-400">fabric@5 · Canvas API</p>
              </div>
              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">✓ Used</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">An interactive canvas library that handles object selection, free drawing (PencilBrush), shapes, text, and serialisation to/from JSON. Sits on top of the PDF rendering — the PDF becomes the background image, and Fabric manages all markup.</p>
          </div>

          {/* @react-pdf-viewer */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">RPV</span>
              <div>
                <p className="text-sm font-bold text-slate-800">@react-pdf-viewer</p>
                <p className="text-xs text-slate-400">react-pdf-viewer · v3</p>
              </div>
              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Removed</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">A React wrapper around PDF.js that provides layout, sidebar, zoom, and scroll plugins. Works well for read-only viewing with highlights, but layers many plugin abstractions over the raw canvas making custom drawing tools complex to add.</p>
          </div>

          {/* PDFTron / Apryse */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs">PT</span>
              <div>
                <p className="text-sm font-bold text-slate-800">PDFTron / Apryse</p>
                <p className="text-xs text-slate-400">WebViewer SDK</p>
              </div>
              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Considered</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">Enterprise-grade PDF SDK with built-in annotation, redaction, form filling, and e-signature. Full-featured viewer in a single iframe embed. Requires a commercial licence — overkill for most internal tools but the benchmark for document workflows.</p>
          </div>

          {/* pdf-lib */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">PL</span>
              <div>
                <p className="text-sm font-bold text-slate-800">pdf-lib</p>
                <p className="text-xs text-slate-400">pdf-lib@1 · MIT</p>
              </div>
              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Available</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">A pure-JavaScript library for creating and modifying PDF files — not viewing. Use it to embed Fabric's annotations as actual PDF annotations when you export ("bake in" drawings). Complements PDF.js: PDF.js renders to canvas, pdf-lib writes back to PDF.</p>
          </div>

          {/* Konva.js */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-700 font-bold text-xs">KV</span>
              <div>
                <p className="text-sm font-bold text-slate-800">Konva.js</p>
                <p className="text-xs text-slate-400">react-konva · Canvas</p>
              </div>
              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Alternative</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">A canvas library very similar in scope to Fabric.js but with a React-first API (react-konva). Uses a layer/stage model instead of a flat object list. A viable swap for Fabric — we chose Fabric because its brush-based free drawing and JSON serialisation are slightly more mature.</p>
          </div>
        </div>

        {/* Architecture note */}
        <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-200 p-5">
          <h3 className="text-sm font-bold text-slate-800 mb-2">How PDF.js + Fabric.js work together</h3>
          <ol className="space-y-1.5 text-xs text-slate-700 leading-relaxed list-none">
            <li><span className="font-semibold text-orange-700">① PDF.js renders</span> — Each page is drawn to an offscreen <code className="bg-white/70 px-1 rounded">&lt;canvas&gt;</code> at the chosen scale, then converted to a JPEG data URL.</li>
            <li><span className="font-semibold text-purple-700">② Fabric sets background</span> — The JPEG is set as the Fabric canvas background image via <code className="bg-white/70 px-1 rounded">fc.setBackgroundImage()</code>. The page is now an immovable backdrop.</li>
            <li><span className="font-semibold text-slate-700">③ Annotation layer</span> — All Fabric objects (pen paths, shapes, text) float above the background. They are selectable, movable, and deletable independently of the PDF.</li>
            <li><span className="font-semibold text-slate-700">④ Per-page persistence</span> — <code className="bg-white/70 px-1 rounded">fc.toJSON()</code> serialises the annotation layer. On page change or auto-save, each page's JSON is stored in MySQL via <code className="bg-white/70 px-1 rounded">PUT /api/lab/pdf/files/:id/fabric</code>.</li>
          </ol>
        </div>
      </div>

    </div>
  );
}
