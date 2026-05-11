import { useState, useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Webcam from '@uppy/webcam';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/webcam/css/style.min.css';
import QRCode from 'qrcode';
import { QrCode, Images, Trash2, Pencil, Check, X, MessageSquare, Copy, CheckCheck, ExternalLink } from 'lucide-react';

// ── Gallery card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, onDelete, onRename, onComment }) {
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(item.name);
  const [editingComment, setEditingComment] = useState(false);
  const [commentDraft, setCommentDraft] = useState(item.comment);

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white group">
      <div className="relative bg-slate-100 overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-150"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div className="px-3 py-2.5">
        {editingName ? (
          <div className="flex items-center gap-1 mb-2">
            <input
              value={nameDraft}
              onChange={e => setNameDraft(e.target.value)}
              className="flex-1 text-xs font-semibold border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') { onRename(item.id, nameDraft); setEditingName(false); }
                if (e.key === 'Escape') { setNameDraft(item.name); setEditingName(false); }
              }}
            />
            <button onClick={() => { onRename(item.id, nameDraft); setEditingName(false); }} className="p-1 text-emerald-600"><Check size={12} /></button>
            <button onClick={() => { setNameDraft(item.name); setEditingName(false); }} className="p-1 text-slate-400"><X size={12} /></button>
          </div>
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 w-full text-left mb-2 group/name"
          >
            <span className="truncate flex-1">{item.name}</span>
            <Pencil size={10} className="opacity-0 group-hover/name:opacity-100 flex-shrink-0 text-slate-400" />
          </button>
        )}

        {editingComment ? (
          <textarea
            value={commentDraft}
            onChange={e => setCommentDraft(e.target.value)}
            className="w-full text-xs text-slate-600 border border-slate-200 rounded px-2 py-1.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={2}
            autoFocus
            placeholder="Add a comment…"
            onBlur={() => { onComment(item.id, commentDraft); setEditingComment(false); }}
          />
        ) : (
          <button
            onClick={() => { setCommentDraft(item.comment); setEditingComment(true); }}
            className="flex items-start gap-1.5 text-left w-full"
          >
            <MessageSquare size={11} className="text-slate-300 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-slate-400 italic">{item.comment || 'Add comment…'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ── QR tab ────────────────────────────────────────────────────────────────────
function QRTab() {
  const [qrSrc, setQrSrc] = useState('');
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  useEffect(() => {
    QRCode.toDataURL(url, { width: 220, margin: 2, color: { dark: '#0f172a', light: '#ffffff' } })
      .then(setQrSrc);
  }, [url]);

  function copy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="max-w-sm">
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-5 py-4 flex items-center gap-3">
          <QrCode size={18} className="text-slate-300" />
          <div>
            <p className="text-sm font-bold text-white">Scan to upload from phone</p>
            <p className="text-xs text-slate-400 mt-0.5">Opens this page on your device</p>
          </div>
        </div>
        <div className="p-6 bg-white flex flex-col items-center gap-4">
          {qrSrc
            ? <img src={qrSrc} alt="QR code" className="w-52 h-52 rounded-xl border border-slate-100" />
            : <div className="w-52 h-52 rounded-xl bg-slate-50 border border-slate-200 animate-pulse" />
          }
          <p className="text-xs text-slate-400 text-center break-all px-2">{url}</p>
          <div className="flex gap-2 w-full">
            <button onClick={copy}
              className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors duration-150">
              {copied ? <CheckCheck size={13} className="text-emerald-500" /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors duration-150"
              style={{ textDecoration: 'none' }}>
              <ExternalLink size={13} /> Open
            </a>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">
        Files added from your phone appear in <strong>Dashboard</strong> and <strong>Gallery</strong>.
      </p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LabUppy() {
  const [tab, setTab] = useState('dashboard');
  const [gallery, setGallery] = useState([]);
  const containerRef = useRef(null);
  const uppyRef = useRef(null);
  const mountedRef = useRef(false);

  // Create Uppy once
  useEffect(() => {
    const uppy = new Uppy({
      id: 'main',
      restrictions: { maxFileSize: 10 * 1024 * 1024, allowedFileTypes: ['image/*', 'video/*', '.pdf'] },
      autoProceed: false,
    });
    uppy.on('file-added', file => {
      if (file.data && file.type?.startsWith('image/')) {
        const src = URL.createObjectURL(file.data);
        setGallery(g => [...g, { id: file.id, name: file.name, src, comment: '' }]);
      }
    });
    uppy.on('file-removed', file => setGallery(g => g.filter(i => i.id !== file.id)));
    uppyRef.current = uppy;
    return () => { uppy.destroy(); uppyRef.current = null; mountedRef.current = false; };
  }, []);

  // Mount Dashboard imperatively once the container div is in the DOM
  useEffect(() => {
    if (mountedRef.current || !containerRef.current || !uppyRef.current) return;
    mountedRef.current = true;
    uppyRef.current
      .use(Dashboard, {
        inline: true,
        target: containerRef.current,
        height: 420,
        width: '100%',
        plugins: ['Webcam'],
        theme: 'light',
        proudlyDisplayPoweredByUppy: false,
        note: 'Images, video, PDF · max 10 MB',
      })
      .use(Webcam, { modes: ['picture', 'video-audio'], mirror: true });
  });

  const removeFromGallery = id => uppyRef.current?.removeFile(id);
  const renameInGallery = (id, name) => setGallery(g => g.map(i => i.id === id ? { ...i, name } : i));
  const commentInGallery = (id, comment) => setGallery(g => g.map(i => i.id === id ? { ...i, comment } : i));

  const TABS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'qr', label: 'QR Upload' },
    { id: 'gallery', label: gallery.length ? `Gallery (${gallery.length})` : 'Gallery' },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <a href="https://uppy.io" target="_blank" rel="noopener noreferrer"
          className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full hover:bg-violet-100 transition-colors"
          style={{ textDecoration: 'none' }}>
          uppy v5 ↗
        </a>
        <span className="text-xs text-slate-400">@uppy/core · @uppy/dashboard · @uppy/webcam</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Image Upload · Uppy</h1>
      <p className="text-slate-500 text-sm mb-5">
        Uppy v5 mounted imperatively — bypasses the broken <code className="font-mono text-xs bg-slate-100 px-1 rounded">@uppy/react</code> wrapper.
        Add images in Dashboard; they flow into Gallery with rename, comment &amp; delete.
      </p>

      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard always stays in DOM — CSS controls visibility so Uppy remains mounted */}
      <div style={{ display: tab === 'dashboard' ? 'block' : 'none' }}>
        <div ref={containerRef} className="rounded-xl overflow-hidden border border-slate-200" />
        <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
          <p className="text-xs font-semibold text-slate-600 mb-1">Imperative mount — the v5 fix</p>
          <code className="text-xs font-mono text-slate-500 block whitespace-pre">{`uppy.use(Dashboard, { inline: true, target: containerRef.current })\n    .use(Webcam, { modes: ['picture', 'video-audio'] });`}</code>
        </div>
      </div>

      {tab === 'qr' && <QRTab />}

      {tab === 'gallery' && (
        <div>
          {gallery.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Images size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold">No images yet</p>
              <p className="text-xs mt-1">Add images in the Dashboard tab — they appear here automatically.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-700">{gallery.length} image{gallery.length !== 1 ? 's' : ''}</p>
                <button onClick={() => gallery.forEach(i => uppyRef.current?.removeFile(i.id))}
                  className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors">
                  Clear all
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map(item => (
                  <GalleryCard key={item.id} item={item}
                    onDelete={removeFromGallery} onRename={renameInGallery} onComment={commentInGallery} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
