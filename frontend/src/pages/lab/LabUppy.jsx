import { useState, useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import QRCode from 'qrcode';
import { QrCode, Images, Trash2, Pencil, Check, X, MessageSquare, Copy, CheckCheck, Camera, Loader2, AlertCircle } from 'lucide-react';

// ── Gallery card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, onDelete, onRename, onComment }) {
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(item.name);
  const [editingComment, setEditingComment] = useState(false);
  const [commentDraft, setCommentDraft] = useState(item.comment);

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white group">
      <div className="relative bg-slate-100 overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {item.uploading ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-50">
            <Loader2 size={24} className="text-slate-400 animate-spin" />
          </div>
        ) : item.uploadFailed ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 gap-1">
            <AlertCircle size={20} className="text-red-400" />
            <span className="text-xs text-red-500">Upload failed</span>
          </div>
        ) : (
          <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
        )}
        {!item.uploading && (
          <button
            onClick={() => onDelete(item.dbId, item.uppyId)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-150"
          >
            <Trash2 size={13} />
          </button>
        )}
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
                if (e.key === 'Enter') { onRename(item.dbId, nameDraft); setEditingName(false); }
                if (e.key === 'Escape') { setNameDraft(item.name); setEditingName(false); }
              }}
            />
            <button onClick={() => { onRename(item.dbId, nameDraft); setEditingName(false); }} className="p-1 text-emerald-600"><Check size={12} /></button>
            <button onClick={() => { setNameDraft(item.name); setEditingName(false); }} className="p-1 text-slate-400"><X size={12} /></button>
          </div>
        ) : (
          <button
            onClick={() => !item.uploading && setEditingName(true)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 w-full text-left mb-2 group/name"
          >
            <span className="truncate flex-1">{item.name}</span>
            {!item.uploading && <Pencil size={10} className="opacity-0 group-hover/name:opacity-100 flex-shrink-0 text-slate-400" />}
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
            onBlur={() => { onComment(item.dbId, commentDraft); setEditingComment(false); }}
          />
        ) : (
          <button
            onClick={() => !item.uploading && (setCommentDraft(item.comment), setEditingComment(true))}
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
function QRTab({ uppy }) {
  const [qrSrc, setQrSrc] = useState('');
  const [lanUrl, setLanUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    fetch('/api/server-ip')
      .then(r => r.json())
      .then(({ ips, frontendPort }) => {
        const ip = ips[0];
        if (ip) {
          const path = window.location.pathname;
          const url = `http://${ip}:${frontendPort}${path}`;
          setLanUrl(url);
          QRCode.toDataURL(url, { width: 240, margin: 2, color: { dark: '#0f172a', light: '#ffffff' } })
            .then(setQrSrc);
        } else {
          const url = window.location.href;
          setLanUrl(url);
          QRCode.toDataURL(url, { width: 240, margin: 2, color: { dark: '#0f172a', light: '#ffffff' } })
            .then(setQrSrc);
        }
      })
      .catch(() => {
        const url = window.location.href;
        setLanUrl(url);
        QRCode.toDataURL(url, { width: 240, margin: 2 }).then(setQrSrc);
      });
  }, []);

  function copy() {
    navigator.clipboard.writeText(lanUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleFiles(e) {
    Array.from(e.target.files || []).forEach(file => {
      try { uppy?.addFile({ name: file.name, type: file.type, data: file, source: 'mobile' }); }
      catch (_) {}
    });
    e.target.value = '';
  }

  return (
    <div className="space-y-4 max-w-sm">
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-5 py-3 flex items-center gap-2">
          <Camera size={15} className="text-slate-300" />
          <span className="text-sm font-bold text-white">Upload from Phone</span>
        </div>
        <div className="p-4 bg-white space-y-3">
          <div className="relative">
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-800 text-white text-sm font-bold hover:bg-slate-700 active:bg-slate-900 transition-colors duration-150 select-none"
            >
              <Camera size={16} />
              Take a Photo
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFiles}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', pointerEvents: 'none' }}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 select-none"
            >
              <Images size={15} />
              Choose from Photo Library
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*,video/*,.pdf"
              multiple
              onChange={handleFiles}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', pointerEvents: 'none' }}
            />
          </div>

          <p className="text-xs text-slate-400 text-center pt-1">
            Photos flow into the <strong>Gallery</strong> tab and are saved to the database
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-5 py-3 flex items-center gap-2 border-b border-slate-100">
          <QrCode size={15} className="text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">Scan to open on your phone</span>
        </div>
        <div className="p-5 bg-white flex flex-col items-center gap-3">
          {qrSrc
            ? <img src={qrSrc} alt="QR code" className="w-48 h-48 rounded-xl border border-slate-100" />
            : <div className="w-48 h-48 rounded-xl bg-slate-50 border border-slate-200 animate-pulse" />
          }
          <p className="text-xs text-slate-500 text-center break-all font-mono">{lanUrl || '…'}</p>
          <p className="text-xs text-slate-400 text-center -mt-1">
            Uses your server's LAN IP — phone must be on the same Wi-Fi
          </p>
          <button onClick={copy}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors duration-150">
            {copied ? <CheckCheck size={13} className="text-emerald-500" /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>
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

  // Load persisted gallery from DB on mount
  useEffect(() => {
    fetch('/api/lab/gallery')
      .then(r => r.json())
      .then(items => {
        setGallery(items.map(i => ({
          dbId: i.id,
          uppyId: null,
          name: i.name,
          src: `/api/lab/gallery/${i.id}/image`,
          comment: i.comment || '',
          uploading: false,
        })));
      })
      .catch(() => {});
  }, []);

  // Create Uppy once
  useEffect(() => {
    const uppy = new Uppy({
      id: 'main',
      restrictions: { maxFileSize: 10 * 1024 * 1024, allowedFileTypes: ['image/*', 'video/*', '.pdf'] },
      autoProceed: false,
    });

    uppy.on('file-added', async file => {
      if (!file.data || !file.type?.startsWith('image/')) return;

      // Optimistic: show immediately with local object URL while uploading to DB
      const tempSrc = URL.createObjectURL(file.data);
      setGallery(g => [...g, { dbId: null, uppyId: file.id, name: file.name, src: tempSrc, comment: '', uploading: true }]);

      try {
        const fd = new FormData();
        fd.append('file', file.data, file.name);
        fd.append('name', file.name);
        const res = await fetch('/api/lab/gallery', { method: 'POST', body: fd });
        if (!res.ok) throw new Error(await res.text());
        const saved = await res.json();
        URL.revokeObjectURL(tempSrc);
        setGallery(g => g.map(i =>
          i.uppyId === file.id
            ? { ...i, dbId: saved.id, src: `/api/lab/gallery/${saved.id}/image`, uploading: false }
            : i
        ));
      } catch (_) {
        setGallery(g => g.map(i => i.uppyId === file.id ? { ...i, uploading: false, uploadFailed: true } : i));
      }
    });

    // When a file is removed from Uppy queue, also delete from DB
    uppy.on('file-removed', file => {
      setGallery(g => {
        const item = g.find(i => i.uppyId === file.id);
        if (item?.dbId) {
          fetch(`/api/lab/gallery/${item.dbId}`, { method: 'DELETE' }).catch(() => {});
        }
        return g.filter(i => i.uppyId !== file.id);
      });
    });

    uppyRef.current = uppy;
    return () => { uppy.destroy(); uppyRef.current = null; mountedRef.current = false; };
  }, []);

  // Mount Dashboard imperatively once the container div is in the DOM
  useEffect(() => {
    if (mountedRef.current || !containerRef.current || !uppyRef.current) return;
    mountedRef.current = true;
    uppyRef.current.use(Dashboard, {
      inline: true,
      target: containerRef.current,
      height: 420,
      width: '100%',
      theme: 'light',
      proudlyDisplayPoweredByUppy: false,
      note: 'Images, video, PDF · max 10 MB',
    });
  });

  const removeFromGallery = (dbId, uppyId) => {
    if (uppyId) {
      // file-removed handler will delete from DB + update state
      uppyRef.current?.removeFile(uppyId);
    } else {
      // Item loaded from DB on mount (no uppyId) — delete directly
      if (dbId) fetch(`/api/lab/gallery/${dbId}`, { method: 'DELETE' }).catch(() => {});
      setGallery(g => g.filter(i => i.dbId !== dbId));
    }
  };

  const renameInGallery = (dbId, name) => {
    setGallery(g => g.map(i => i.dbId === dbId ? { ...i, name } : i));
    if (dbId) {
      fetch(`/api/lab/gallery/${dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }).catch(() => {});
    }
  };

  const commentInGallery = (dbId, comment) => {
    setGallery(g => g.map(i => i.dbId === dbId ? { ...i, comment } : i));
    if (dbId) {
      fetch(`/api/lab/gallery/${dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      }).catch(() => {});
    }
  };

  const clearAll = () => {
    gallery.forEach(i => {
      if (i.dbId) fetch(`/api/lab/gallery/${i.dbId}`, { method: 'DELETE' }).catch(() => {});
      if (i.uppyId) uppyRef.current?.removeFile(i.uppyId);
    });
    setGallery([]);
  };

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
        <span className="text-xs text-slate-400">@uppy/core · @uppy/dashboard · MySQL storage</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Image Upload · Uppy</h1>
      <p className="text-slate-500 text-sm mb-5">
        Uppy v5 mounted imperatively. Uploads persist to MySQL — gallery survives page refresh.
        Rename, comment, and delete are synced to the database.
      </p>

      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard always stays in DOM — CSS controls visibility */}
      <div style={{ display: tab === 'dashboard' ? 'block' : 'none' }}>
        <div ref={containerRef} className="rounded-xl overflow-hidden border border-slate-200" />
        <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
          <p className="text-xs font-semibold text-slate-600 mb-1">Imperative mount + DB persistence</p>
          <code className="text-xs font-mono text-slate-500 block whitespace-pre">{`uppy.use(Dashboard, { inline: true, target: ref.current });\n// file-added → POST /api/lab/gallery → LONGBLOB in MySQL`}</code>
        </div>
      </div>

      {tab === 'qr' && <QRTab uppy={uppyRef.current} />}

      {tab === 'gallery' && (
        <div>
          {gallery.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Images size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold">No images yet</p>
              <p className="text-xs mt-1">Add images in the Dashboard tab — they persist in the database across page refreshes.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-700">{gallery.length} image{gallery.length !== 1 ? 's' : ''} · saved to DB</p>
                <button onClick={clearAll}
                  className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors">
                  Clear all
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map(item => (
                  <GalleryCard key={item.dbId ?? item.uppyId} item={item}
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
