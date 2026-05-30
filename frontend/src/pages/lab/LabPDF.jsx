import { useState, useEffect, useRef, useCallback } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import {
  FileText, Upload, Download, Trash2, Highlighter,
  MessageSquare, Plus, X, Loader2, FolderOpen,
} from 'lucide-react';

const WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

// ── API helpers ───────────────────────────────────────────────────────────────
const api = {
  list: () => fetch('/api/lab/pdf/files').then(r => r.json()),
  upload: (file) => {
    const fd = new FormData();
    fd.append('pdf', file);
    return fetch('/api/lab/pdf/upload', { method: 'POST', body: fd }).then(r => r.json());
  },
  delete: (id) => fetch(`/api/lab/pdf/files/${id}`, { method: 'DELETE' }).then(r => r.json()),
  getAnnotations: (id) => fetch(`/api/lab/pdf/files/${id}/annotations`).then(r => r.json()),
  addAnnotation: (id, ann) => fetch(`/api/lab/pdf/files/${id}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ann),
  }).then(r => r.json()),
  deleteAnnotation: (annId) => fetch(`/api/lab/pdf/annotations/${annId}`, { method: 'DELETE' }),
  downloadUrl: (id) => `/api/lab/pdf/files/${id}/download`,
  rawUrl: (id) => `/api/lab/pdf/files/${id}/raw`,
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

// ── File List Panel ───────────────────────────────────────────────────────────
function FilePanel({ files, selected, onSelect, onUpload, onDelete, uploading }) {
  const inputRef = useRef(null);

  const handleFiles = async (fileList) => {
    for (const f of fileList) {
      if (f.type === 'application/pdf') await onUpload(f);
    }
  };

  return (
    <div className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 bg-slate-50">
      <div className="p-3 border-b border-slate-200">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          {uploading ? 'Uploading…' : 'Upload PDF'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <FolderOpen size={28} className="text-slate-300 mb-2" />
            <p className="text-xs text-slate-400">No PDFs yet.<br />Upload one to get started.</p>
          </div>
        )}
        {files.map((f) => (
          <div
            key={f.id}
            onClick={() => onSelect(f)}
            className={`group flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
              selected?.id === f.id ? 'bg-blue-100 border border-blue-200' : 'hover:bg-white border border-transparent'
            }`}
          >
            <FileText size={16} className={`mt-0.5 flex-shrink-0 ${selected?.id === f.id ? 'text-blue-600' : 'text-slate-400'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-800 truncate">{f.original_name}</p>
              <p className="text-xs text-slate-400">{fmt(f.size)} · {timeAgo(f.created_at)}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(f); }}
              className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-300 hover:text-red-500 transition-all flex-shrink-0"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Annotations Panel ─────────────────────────────────────────────────────────
function AnnotationsPanel({ annotations, onDelete, onDownload, pdfName }) {
  return (
    <div className="w-64 flex-shrink-0 flex flex-col border-l border-slate-200 bg-slate-50">
      <div className="p-3 border-b border-slate-200 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Annotations {annotations.length > 0 && `(${annotations.length})`}
        </p>
        <button
          onClick={onDownload}
          title="Download PDF with annotations embedded"
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          <Download size={11} /> Save PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {annotations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <Highlighter size={24} className="text-slate-300 mb-2" />
            <p className="text-xs text-slate-400">Select text in the PDF to highlight it, or use the note tool.</p>
          </div>
        ) : (
          annotations.map((ann) => (
            <div key={ann.id} className="bg-white rounded-lg border border-slate-200 p-2.5 group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {ann.type === 'highlight'
                    ? <Highlighter size={11} className="text-yellow-500" />
                    : <MessageSquare size={11} className="text-blue-500" />
                  }
                  <span className="text-xs text-slate-400">p.{ann.page_index + 1}</span>
                </div>
                <button
                  onClick={() => onDelete(ann.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                >
                  <Trash2 size={11} />
                </button>
              </div>
              {ann.quoted_text && (
                <p className="text-xs italic text-slate-600 leading-snug mb-1 border-l-2 border-yellow-300 pl-2">
                  "{ann.quoted_text.slice(0, 100)}{ann.quoted_text.length > 100 ? '…' : ''}"
                </p>
              )}
              {ann.content && (
                <p className="text-xs text-slate-800 font-medium leading-snug">{ann.content}</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-slate-200">
        <p className="text-xs text-slate-400 leading-relaxed">
          Annotations are saved to the server. "Save PDF" downloads the file with highlights and notes embedded.
        </p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LabPDF() {
  const [files, setFiles]           = useState([]);
  const [selected, setSelected]     = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [uploading, setUploading]   = useState(false);
  const [loading, setLoading]       = useState(true);

  // Load file list on mount
  useEffect(() => {
    api.list().then(setFiles).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Load annotations when a file is selected
  useEffect(() => {
    if (!selected) { setAnnotations([]); return; }
    api.getAnnotations(selected.id).then(setAnnotations).catch(() => setAnnotations([]));
  }, [selected]);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const result = await api.upload(file);
      if (result.id) {
        const updated = await api.list();
        setFiles(updated);
        setSelected(result);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (f) => {
    if (!confirm(`Delete "${f.original_name}"?`)) return;
    await api.delete(f.id);
    const updated = await api.list();
    setFiles(updated);
    if (selected?.id === f.id) setSelected(null);
  };

  const handleDeleteAnnotation = async (annId) => {
    await api.deleteAnnotation(annId);
    setAnnotations(a => a.filter(x => x.id !== annId));
  };

  const handleDownload = () => {
    if (!selected) return;
    window.open(api.downloadUrl(selected.id), '_blank');
  };

  // Highlight plugin — save annotation to server on text selection
  const renderHighlightTarget = useCallback((props) => (
    <div
      style={{
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
        position: 'absolute',
        zIndex: 10,
      }}
      className="flex gap-1 bg-white border border-slate-200 rounded-lg shadow-lg p-1"
    >
      <button
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors"
        onClick={props.toggle}
      >
        <Highlighter size={12} /> Highlight
      </button>
    </div>
  ), []);

  const renderHighlightContent = useCallback((props) => {
    const save = async () => {
      const note = prompt('Add a note to this highlight (optional):') || '';
      const area = props.highlightAreas[0] || {};
      const ann = await api.addAnnotation(selected.id, {
        type: 'highlight',
        page_index: area.pageIndex ?? 0,
        x: area.left ?? 0,
        y: area.top ?? 0,
        width: area.width ?? 0,
        height: area.height ?? 0,
        color: 'yellow',
        quoted_text: props.selectedText,
        content: note,
      });
      setAnnotations(a => [...a, ann]);
      props.cancel();
    };
    return (
      <div
        style={{
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          transform: 'translate(0, 8px)',
          position: 'absolute',
          zIndex: 10,
        }}
        className="bg-white border border-slate-200 rounded-xl shadow-xl p-3 w-52"
      >
        <p className="text-xs text-slate-500 mb-2 italic line-clamp-2">
          "{props.selectedText.slice(0, 80)}"
        </p>
        <div className="flex gap-2">
          <button onClick={save} className="flex-1 px-2 py-1.5 bg-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
            Save
          </button>
          <button onClick={props.cancel} className="px-2 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-lg hover:bg-slate-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }, [selected]);

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights: () => <div />,
    trigger: Trigger.TextSelection,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (tabs) => tabs,
  });

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 'calc(100vh - 2rem)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-red-100">
            <FileText size={16} className="text-red-600" />
          </span>
          <h1 className="text-xl font-extrabold text-slate-900">PDF Viewer</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-red-50 text-red-700 border-red-200">
            react-pdf-viewer
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200">
            pdf-lib
          </span>
        </div>
        {selected && (
          <>
            <div className="flex-1" />
            <span className="text-xs text-slate-400 max-w-[200px] truncate">{selected.original_name}</span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 rounded-xl border border-slate-200 overflow-hidden shadow-sm" style={{ height: 'calc(100vh - 9rem)' }}>

        {/* File List */}
        <FilePanel
          files={files}
          selected={selected}
          onSelect={setSelected}
          onUpload={handleUpload}
          onDelete={handleDelete}
          uploading={uploading}
        />

        {/* PDF Viewer */}
        <div className="flex-1 min-w-0">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <FileText size={48} className="text-slate-200 mb-4" />
              <p className="font-semibold text-slate-500 mb-1">No PDF selected</p>
              <p className="text-sm text-slate-400">Upload a PDF from the panel on the left, then click it to open.</p>
            </div>
          ) : (
            <Worker workerUrl={WORKER_URL}>
              <Viewer
                key={selected.id}
                fileUrl={api.rawUrl(selected.id)}
                plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
                defaultScale={1.0}
              />
            </Worker>
          )}
        </div>

        {/* Annotations Panel */}
        {selected && (
          <AnnotationsPanel
            annotations={annotations}
            onDelete={handleDeleteAnnotation}
            onDownload={handleDownload}
            pdfName={selected.original_name}
          />
        )}
      </div>
    </div>
  );
}
