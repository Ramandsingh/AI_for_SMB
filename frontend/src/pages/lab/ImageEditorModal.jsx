import { useState, useCallback } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';
import { X, Loader2, AlertCircle } from 'lucide-react';

export default function ImageEditorModal({ dbId, imageName, onSave, onClose }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // imageUrl with cache-bust so the editor always fetches the current version
  const imageUrl = `/api/lab/gallery/${dbId}/image?t=${Date.now()}`;

  // onBeforeSave returning false suppresses Filerobot's own download dialog
  const handleBeforeSave = useCallback(() => false, []);

  const handleSave = useCallback(async (savedImageData) => {
    setError('');
    setSaving(true);
    try {
      // imageCanvas is always available; imageBase64 is optional and often absent
      const canvas = savedImageData.imageCanvas;
      if (!canvas) throw new Error('No canvas data from editor');

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          b => b ? resolve(b) : reject(new Error('Canvas toBlob returned null')),
          savedImageData.mimeType || 'image/jpeg',
          0.92
        );
      });

      const fd = new FormData();
      fd.append('file', blob, savedImageData.fullName || imageName || 'edited.jpg');
      const res = await fetch(`/api/lab/gallery/${dbId}/image`, { method: 'PATCH', body: fd });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      onSave(dbId);  // cache-bust card + close modal
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }, [dbId, imageName, onSave]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(15,23,42,0.85)' }}
    >
      <div className="relative w-full h-full max-w-6xl max-h-[95vh] mx-4 my-4 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">Edit Image</span>
            {saving && (
              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                <Loader2 size={12} className="animate-spin" /> Saving…
              </span>
            )}
            {error && (
              <span className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle size={12} /> {error}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-0">
          <FilerobotImageEditor
            source={imageUrl}
            onBeforeSave={handleBeforeSave}
            onSave={handleSave}
            onClose={onClose}
            tabsIds={[TABS.ADJUST, TABS.FINETUNE, TABS.FILTERS, TABS.ANNOTATE, TABS.RESIZE]}
            defaultTabId={TABS.ADJUST}
            defaultToolId={TOOLS.CROP}
            savingPixelRatio={2}
            previewPixelRatio={window.devicePixelRatio}
            useCloudimage={false}
            closeAfterSave={false}
          />
        </div>
      </div>
    </div>
  );
}
