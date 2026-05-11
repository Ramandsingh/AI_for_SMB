/**
 * Uppy v5 demo — three approaches:
 *   1. Dashboard  — the pre-built, full-featured UI (flagship)
 *   2. Headless   — composable hooks + components (custom UI)
 *   3. Webcam     — useWebcam hook with correct prop-getter API
 *
 * Root cause of the previous breakage:
 *  - `import { Dashboard } from '@uppy/react'` is not exported from the v5 index.
 *    The correct path is `import Dashboard from '@uppy/react/dashboard'`.
 *  - The headless `useWebcam` hook returns prop-getter functions
 *    (getVideoProps, getSnapshotButtonProps, etc.), not simple booleans/callbacks.
 */

import { useMemo, useState } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
// ✅ Correct import paths for v5
import Dashboard from '@uppy/react/dashboard';
import { UppyContextProvider, useDropzone, useUppyState, useWebcam } from '@uppy/react';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/webcam/css/style.min.css';
import { Camera, StopCircle, Image, Film, Trash2, Upload } from 'lucide-react';

// ── Uppy instances (memoised so they survive re-renders) ──────────────────────
function useDashboardUppy() {
  return useMemo(() =>
    new Uppy({ id: 'dashboard', restrictions: { maxFileSize: 10 * 1024 * 1024, allowedFileTypes: ['image/*', 'video/*', '.pdf'] }, autoProceed: false })
      .use(Webcam, { modes: ['picture', 'video-audio'], mirror: true }),
  []);
}

function useHeadlessUppy() {
  return useMemo(() =>
    new Uppy({ id: 'headless', restrictions: { maxFileSize: 10 * 1024 * 1024, allowedFileTypes: ['image/*'] }, autoProceed: false }),
  []);
}

function useWebcamUppy() {
  return useMemo(() =>
    new Uppy({ id: 'webcam', autoProceed: false })
      .use(Webcam, { modes: ['picture'], mirror: true }),
  []);
}

// ── Headless drop-zone using useDropzone hook ─────────────────────────────────
function HeadlessDropzone() {
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer transition-colors hover:border-blue-400 hover:bg-blue-50"
    >
      <input {...getInputProps()} />
      <Upload size={28} className="text-slate-300 mx-auto mb-2" />
      <p className="text-sm font-semibold text-slate-500">Drop images here</p>
      <p className="text-xs text-slate-400 mt-1">or click to browse · images only · max 10 MB</p>
    </div>
  );
}

// ── Headless file list using useUppyState ─────────────────────────────────────
function HeadlessFileList({ uppy }) {
  const files = useUppyState(uppy, s => Object.values(s.files));
  if (!files.length) return <p className="text-xs text-slate-400 text-center py-3">No files selected yet.</p>;
  return (
    <ul className="space-y-2 mt-3">
      {files.map(f => (
        <li key={f.id} className="flex items-center gap-3 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
          {f.preview
            ? <img src={f.preview} alt="" className="w-9 h-9 rounded object-cover flex-shrink-0" />
            : <div className="w-9 h-9 rounded bg-slate-200 flex items-center justify-center flex-shrink-0"><Image size={14} className="text-slate-400" /></div>
          }
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">{f.name}</p>
            <p className="text-xs text-slate-400">{(f.size / 1024).toFixed(1)} KB</p>
          </div>
          <button onClick={() => uppy.removeFile(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors">
            <Trash2 size={13} />
          </button>
        </li>
      ))}
    </ul>
  );
}

// ── Webcam demo using the correct useWebcam prop-getter API ───────────────────
function WebcamView() {
  const {
    state,
    start,
    stop,
    getVideoProps,
    getSnapshotButtonProps,
    getDiscardButtonProps,
    getSubmitButtonProps,
  } = useWebcam({ onSubmit: () => {} });

  const status = state?.webcamActive ? 'active' : 'idle';

  return (
    <div className="space-y-3">
      {/* Video preview */}
      {state?.webcamActive && (
        <video
          {...getVideoProps()}
          className="w-full rounded-xl bg-black"
          style={{ maxHeight: 240 }}
        />
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        {!state?.webcamActive ? (
          <button onClick={start} className="btn-primary text-xs py-1.5">
            <Camera size={13} /> Start camera
          </button>
        ) : (
          <>
            <button {...getSnapshotButtonProps()} className="btn-primary text-xs py-1.5 disabled:opacity-40">
              <Image size={13} /> Take snapshot
            </button>
            <button onClick={stop} className="btn-ghost text-xs py-1.5">
              <StopCircle size={13} /> Stop camera
            </button>
          </>
        )}

        {(state?.capturedSnapshot || state?.recordedVideo) && (
          <>
            <button {...getSubmitButtonProps()} className="btn-primary text-xs py-1.5 disabled:opacity-40">
              <Upload size={13} /> Add to files
            </button>
            <button {...getDiscardButtonProps()} className="btn-ghost text-xs py-1.5 disabled:opacity-40">
              <Trash2 size={13} /> Discard
            </button>
          </>
        )}
      </div>

      {state?.capturedSnapshot && (
        <div>
          <p className="text-xs text-slate-400 mb-1">Captured snapshot:</p>
          <img src={state.capturedSnapshot} alt="snapshot" className="rounded-xl w-full" style={{ maxHeight: 200, objectFit: 'contain' }} />
        </div>
      )}

      <p className="text-xs text-slate-400">
        Hook returns: <code className="font-mono bg-slate-100 px-1 rounded">state</code>, <code className="font-mono bg-slate-100 px-1 rounded">start</code>, <code className="font-mono bg-slate-100 px-1 rounded">stop</code>, <code className="font-mono bg-slate-100 px-1 rounded">getVideoProps()</code>, <code className="font-mono bg-slate-100 px-1 rounded">getSnapshotButtonProps()</code>
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LabUppy() {
  const [tab, setTab] = useState('dashboard');
  const dashUppy   = useDashboardUppy();
  const headUppy   = useHeadlessUppy();
  const webcamUppy = useWebcamUppy();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
          <a href="https://uppy.io" target="_blank" rel="noopener noreferrer" className="hover:underline">uppy v5</a>
          {' '}· @uppy/react · @uppy/dashboard · @uppy/webcam
        </span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Image Upload · Uppy</h1>
      <p className="text-slate-500 text-sm mb-5">
        Three Uppy v5 patterns: the pre-built Dashboard UI, a custom headless UI using <code className="font-mono text-xs bg-slate-100 px-1 rounded">useDropzone</code> + <code className="font-mono text-xs bg-slate-100 px-1 rounded">useUppyState</code>, and a webcam capture demo with the correct <code className="font-mono text-xs bg-slate-100 px-1 rounded">useWebcam</code> prop-getter API.
      </p>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard (pre-built)' },
          { id: 'headless',  label: 'Headless UI' },
          { id: 'webcam',    label: 'Webcam hook' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Dashboard ── */}
      {tab === 'dashboard' && (
        <div>
          <div className="rounded-xl overflow-hidden border border-slate-200 mb-4">
            <Dashboard
              uppy={dashUppy}
              plugins={['Webcam']}
              proudlyDisplayPoweredByUppy={false}
              height={420}
              width="100%"
              theme="light"
              note="Images, video, PDF · max 10 MB"
            />
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold text-slate-600 mb-1">Import path (v5 change)</p>
            <code className="text-xs font-mono text-slate-500 block">
              {`// ✅ Correct (v5)\nimport Dashboard from '@uppy/react/dashboard';\n\n// ❌ Broken — Dashboard not in v5 named exports\nimport { Dashboard } from '@uppy/react';`}
            </code>
          </div>
        </div>
      )}

      {/* ── Tab 2: Headless ── */}
      {tab === 'headless' && (
        <UppyContextProvider uppy={headUppy}>
          <div className="card space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Custom drop-zone via <code className="font-mono text-xs bg-slate-100 px-1 rounded">useDropzone</code></p>
              <p className="text-xs text-slate-400 mb-3">Returns <code className="font-mono text-xs bg-slate-100 px-1 rounded">getRootProps()</code> and <code className="font-mono text-xs bg-slate-100 px-1 rounded">getInputProps()</code> — spread them onto your own elements.</p>
              <HeadlessDropzone />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">File list via <code className="font-mono text-xs bg-slate-100 px-1 rounded">useUppyState</code></p>
              <HeadlessFileList uppy={headUppy} />
            </div>

            <div className="border-t border-slate-100 pt-3">
              <button
                onClick={() => headUppy.upload()}
                className="btn-primary text-xs py-1.5"
              >
                <Upload size={13} /> Upload (no-op — no XHRUpload plugin)
              </button>
              <p className="text-xs text-slate-400 mt-2">
                Attach <code className="font-mono bg-slate-100 px-1 rounded">XHRUpload</code> or <code className="font-mono bg-slate-100 px-1 rounded">AwsS3</code> plugin to send files to a real endpoint.
              </p>
            </div>
          </div>
        </UppyContextProvider>
      )}

      {/* ── Tab 3: Webcam ── */}
      {tab === 'webcam' && (
        <UppyContextProvider uppy={webcamUppy}>
          <div className="card">
            <p className="text-sm font-bold text-slate-700 mb-1">Webcam capture via <code className="font-mono text-xs bg-slate-100 px-1 rounded">useWebcam</code></p>
            <p className="text-xs text-slate-400 mb-4">
              The v5 hook returns <strong>prop-getter functions</strong>, not simple booleans. Spread <code className="font-mono text-xs bg-slate-100 px-1 rounded">{'{...getVideoProps()}'}</code> onto a{' '}
              <code className="font-mono text-xs bg-slate-100 px-1 rounded">&lt;video&gt;</code> element and <code className="font-mono text-xs bg-slate-100 px-1 rounded">{'{...getSnapshotButtonProps()}'}</code> onto your button.
            </p>
            <WebcamView />
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold text-slate-600 mb-1">v5 hook signature</p>
            <pre className="text-xs font-mono text-slate-500 whitespace-pre-wrap">{`const {
  state,                   // webcamActive, capturedSnapshot, recordedVideo, isRecording
  start, stop,
  getVideoProps,           // spread onto <video>
  getSnapshotButtonProps,  // spread onto <button>
  getRecordButtonProps,
  getStopRecordingButtonProps,
  getSubmitButtonProps,
  getDiscardButtonProps,
} = useWebcam({ onSubmit });`}</pre>
          </div>
        </UppyContextProvider>
      )}
    </div>
  );
}
