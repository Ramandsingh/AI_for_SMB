import { useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import { Upload } from 'lucide-react';

export default function LabUppy() {
  const uppyRef = useRef(null);

  if (!uppyRef.current) {
    uppyRef.current = new Uppy({
      restrictions: { maxFileSize: 10 * 1024 * 1024, allowedFileTypes: ['image/*', 'video/*', '.pdf'] },
      autoProceed: false,
    }).use(Webcam, { modes: ['picture', 'video-audio'], mirror: true });
  }

  useEffect(() => {
    const uppy = uppyRef.current;
    return () => { try { uppy.destroy(); } catch {} };
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">@uppy/core · @uppy/dashboard · @uppy/webcam</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Image Upload</h1>
      <p className="text-slate-500 text-sm mb-6">
        Drag files, browse, or use the camera — works on desktop and mobile. Supports images, video, and PDF up to 10 MB.
      </p>

      <Dashboard
        uppy={uppyRef.current}
        plugins={['Webcam']}
        metaFields={[{ id: 'caption', name: 'Caption', placeholder: 'Add a caption…' }]}
        proudlyDisplayPoweredByUppy={false}
        height={440}
        width="100%"
        theme="light"
        note="Images, video, PDF · max 10 MB each"
        locale={{ strings: { dropPasteImportFiles: 'Drop files here, %{browse}, or use the camera →' } }}
      />

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        {[
          { title: 'Drag & Drop', desc: 'Files dragged anywhere onto the widget are captured automatically' },
          { title: 'Webcam / Camera', desc: 'Capture photos or record video directly — works on iOS and Android' },
          { title: 'Multi-file queue', desc: 'Upload multiple files with individual progress tracking and captions' },
        ].map(f => (
          <div key={f.title} className="card">
            <div className="flex items-center gap-2 mb-1">
              <Upload size={13} className="text-violet-500" />
              <p className="text-sm font-semibold text-slate-800">{f.title}</p>
            </div>
            <p className="text-xs text-slate-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
