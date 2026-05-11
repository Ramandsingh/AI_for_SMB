import { useMemo, useState } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { UppyContextProvider, Dropzone, FilesGrid, UploadButton, useWebcam } from '@uppy/react';
import '@uppy/core/css/style.min.css';
import '@uppy/drag-drop/css/style.min.css';
import { Camera, Upload, X } from 'lucide-react';

function WebcamToggle() {
  const { snapshots, isCameraOpen, startCamera, stopCamera, takeSnapshot } = useWebcam();
  return (
    <div className="flex items-center gap-2">
      {isCameraOpen ? (
        <>
          <button onClick={takeSnapshot} className="btn-primary text-xs py-1.5">
            <Camera size={13} /> Snapshot
          </button>
          <button onClick={stopCamera} className="btn-ghost text-xs py-1.5">
            <X size={13} /> Stop camera
          </button>
        </>
      ) : (
        <button onClick={startCamera} className="btn-ghost text-xs py-1.5">
          <Camera size={13} /> Use webcam
        </button>
      )}
    </div>
  );
}

export default function LabUppy() {
  const uppy = useMemo(
    () =>
      new Uppy({
        restrictions: { maxFileSize: 10 * 1024 * 1024, allowedFileTypes: ['image/*', 'video/*', '.pdf'] },
        autoProceed: false,
      }).use(Webcam, { modes: ['picture', 'video-audio'], mirror: true }),
    [],
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
          <a href="https://uppy.io" target="_blank" rel="noopener noreferrer" className="hover:underline">uppy</a> · @uppy/react · @uppy/webcam
        </span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Image Upload</h1>
      <p className="text-slate-500 text-sm mb-6">
        Uppy v5 drop-zone with webcam capture, file restrictions (images / video / PDF, max 10 MB), and a staged upload flow.
      </p>

      <UppyContextProvider uppy={uppy}>
        <div className="card space-y-4">
          {/* Drop zone */}
          <div className="rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors">
            <Dropzone
              width="100%"
              note="Images, video, or PDF · max 10 MB"
              locale={{ strings: { dropHereOr: 'Drop files here or %{browse}', browse: 'browse' } }}
            />
          </div>

          {/* Webcam row */}
          <div className="flex items-center justify-between">
            <WebcamToggle />
            <div className="flex items-center gap-2">
              <UploadButton className="btn-primary text-xs py-1.5">
                <Upload size={13} /> Upload files
              </UploadButton>
            </div>
          </div>

          {/* File grid */}
          <FilesGrid />
        </div>

        {/* Info callout */}
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
          <p className="text-xs font-semibold text-slate-600 mb-1">How it works</p>
          <p className="text-xs text-slate-500">
            Files are staged locally — no server endpoint is wired up in this lab demo.
            In production, attach an <code className="font-mono bg-slate-100 px-1 rounded">XHRUpload</code> or{' '}
            <code className="font-mono bg-slate-100 px-1 rounded">AwsS3</code> plugin to send files to your backend or cloud storage.
          </p>
        </div>
      </UppyContextProvider>
    </div>
  );
}
