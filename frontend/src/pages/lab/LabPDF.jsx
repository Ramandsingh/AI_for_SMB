import { useState, useRef, useCallback } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, MessageIcon, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Upload, FileText, Download, Trash2, MessageSquare, X, Highlighter } from 'lucide-react';

const WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

function UploadZone({ onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handle = (file) => {
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      onFile({ url, name: file.name, size: file.size });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${
          dragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="p-4 rounded-2xl bg-blue-50">
            <FileText size={36} className="text-blue-500" />
          </span>
          <div>
            <p className="font-semibold text-slate-800 text-lg mb-1">Drop a PDF here</p>
            <p className="text-slate-500 text-sm">or click to browse</p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">PDF files only</span>
        </div>
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => handle(e.target.files[0])} />
      </div>
    </div>
  );
}

export default function LabPDF() {
  const [pdf, setPdf] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(true);

  const handleFile = useCallback((file) => {
    if (pdf?.url) URL.revokeObjectURL(pdf.url);
    setPdf(file);
    setNotes([]);
  }, [pdf]);

  const handleClose = () => {
    if (pdf?.url) URL.revokeObjectURL(pdf.url);
    setPdf(null);
    setNotes([]);
  };

  // Highlight plugin — opens a note popup on text selection
  const renderHighlightTarget = (props) => (
    <div
      style={{ left: `${props.selectionRegion.left}%`, top: `${props.selectionRegion.top + props.selectionRegion.height}%`, transform: 'translate(0, 8px)', position: 'absolute', zIndex: 10 }}
      className="flex gap-1 bg-white border border-slate-200 rounded-lg shadow-lg p-1"
    >
      <button
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors"
        onClick={props.toggle}
      >
        <Highlighter size={12} /> Highlight
      </button>
    </div>
  );

  const renderHighlightContent = (props) => {
    const addNote = () => {
      const note = prompt('Add a note to this highlight (optional):');
      setNotes(n => [...n, {
        id: Date.now(),
        quote: props.selectedText.slice(0, 120) + (props.selectedText.length > 120 ? '…' : ''),
        note: note || '',
        pageIndex: props.highlightAreas[0]?.pageIndex ?? 0,
      }]);
      props.cancel();
    };
    return (
      <div
        style={{ left: `${props.selectionRegion.left}%`, top: `${props.selectionRegion.top + props.selectionRegion.height}%`, transform: 'translate(0, 8px)', position: 'absolute', zIndex: 10 }}
        className="bg-white border border-slate-200 rounded-xl shadow-xl p-3 w-56"
      >
        <p className="text-xs text-slate-500 mb-2 italic line-clamp-2">"{props.selectedText.slice(0, 80)}"</p>
        <div className="flex gap-2">
          <button onClick={addNote} className="flex-1 px-2 py-1.5 bg-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
            Save highlight
          </button>
          <button onClick={props.cancel} className="px-2 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-lg hover:bg-slate-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderHighlights = (props) => <div />;

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
    trigger: Trigger.TextSelection,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => defaultTabs,
  });

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 'calc(100vh - 2rem)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-100">
            <FileText size={16} className="text-blue-600" />
          </span>
          <h1 className="text-xl font-extrabold text-slate-900">PDF Viewer</h1>
        </div>

        <div className="flex items-center gap-1.5 ml-1">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
            react-pdf-viewer ↗
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200">
            PDF.js 3.11
          </span>
        </div>

        <div className="flex-1" />

        {pdf && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 max-w-[200px] truncate">{pdf.name}</span>
            <button
              onClick={() => setShowNotes(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                showNotes ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-slate-600 border-slate-200 hover:border-yellow-400'
              }`}
            >
              <MessageSquare size={12} />
              Notes {notes.length > 0 && `(${notes.length})`}
            </button>
            <a
              href={pdf.url}
              download={pdf.name}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
            >
              <Download size={12} /> Download
            </a>
            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <X size={12} /> Close
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      {!pdf ? (
        <UploadZone onFile={handleFile} />
      ) : (
        <div className="flex gap-4 flex-1 min-h-0" style={{ height: 'calc(100vh - 9rem)' }}>

          {/* PDF Viewer */}
          <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <Worker workerUrl={WORKER_URL}>
              <Viewer
                fileUrl={pdf.url}
                plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
                defaultScale={1.0}
              />
            </Worker>
          </div>

          {/* Notes Panel */}
          {showNotes && (
            <div className="w-72 flex-shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highlights & Notes</p>
                {notes.length > 0 && (
                  <button onClick={() => setNotes([])} className="text-xs text-red-400 hover:text-red-600">Clear all</button>
                )}
              </div>

              {notes.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <Highlighter size={24} className="text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">Select text in the PDF<br />to add a highlight</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 overflow-y-auto">
                  {notes.map((n) => (
                    <div key={n.id} className="card py-3 px-3 border-l-4 border-l-yellow-400 group">
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <span className="text-xs text-slate-400">Page {n.pageIndex + 1}</span>
                        <button
                          onClick={() => setNotes(ns => ns.filter(x => x.id !== n.id))}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 italic mb-1.5 leading-snug">"{n.quote}"</p>
                      {n.note && <p className="text-xs text-slate-800 font-medium leading-snug">{n.note}</p>}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select any text in the viewer to highlight it and add a note.
                  Use the toolbar above the PDF to zoom, search, and navigate pages.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
