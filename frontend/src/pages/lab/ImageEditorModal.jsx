import { useCallback } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';
import { X } from 'lucide-react';

// Convert base64 data URL → Blob
async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return res.blob();
}

export default function ImageEditorModal({ dbId, imageName, onSave, onClose }) {
  const imageUrl = `/api/lab/gallery/${dbId}/image?t=${Date.now()}`;

  const handleSave = useCallback(async (savedImageData) => {
    try {
      const base64 = savedImageData.imageBase64;
      if (!base64) return;
      const blob = await dataUrlToBlob(base64);
      const fd = new FormData();
      fd.append('file', blob, savedImageData.fullName || imageName || 'edited.jpg');
      const res = await fetch(`/api/lab/gallery/${dbId}/image`, { method: 'PATCH', body: fd });
      if (!res.ok) throw new Error(await res.text());
      onSave(dbId);
    } catch (err) {
      console.error('Editor save failed:', err);
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
          <span className="text-sm font-bold text-white">Edit Image</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Editor — fills remaining space */}
        <div className="flex-1 min-h-0">
          <FilerobotImageEditor
            source={imageUrl}
            onSave={handleSave}
            onClose={onClose}
            tabsIds={[TABS.ADJUST, TABS.FINETUNE, TABS.FILTERS, TABS.ANNOTATE, TABS.RESIZE]}
            defaultTabId={TABS.ADJUST}
            defaultToolId={TOOLS.CROP}
            savingPixelRatio={4}
            previewPixelRatio={window.devicePixelRatio}
            useCloudimage={false}
            closeAfterSave={true}
          />
        </div>
      </div>
    </div>
  );
}
