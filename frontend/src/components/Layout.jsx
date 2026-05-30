import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useSections } from '../App';

// Truly full-bleed (no padding) — canvas/diagram pages that need edge-to-edge space
const TRUE_FULL_BLEED = ['/p34', '/lab/excalidraw'];

// Pages where right sidebar is auto-closed to give max canvas space
const NO_RIGHT_SIDEBAR = ['/p34', '/lab/excalidraw', '/lab/graph', '/lab/arch'];

// Lab pages: no max-width constraint, but standard padding so content doesn't hug the edge
const LAB_ROUTES = [
  '/planning',
  '/lab', '/lab/upload', '/lab/graph', '/lab/chat',
  '/lab/arch', '/lab/timeline', '/lab/charts', '/lab/calendar', '/lab/database', '/lab/cytoscape', '/lab/flowcharts', '/lab/pdf',
];

export default function Layout({ children }) {
  const { sections } = useSections();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const { pathname } = useLocation();
  const trueFullBleed = TRUE_FULL_BLEED.includes(pathname);
  const isLab = LAB_ROUTES.includes(pathname);
  const noRightSidebar = NO_RIGHT_SIDEBAR.includes(pathname);
  const effectiveRightOpen = rightOpen && !noRightSidebar;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <LeftSidebar isOpen={leftOpen} onToggle={() => setLeftOpen(o => !o)} />

      <main
        className="flex-1 min-h-screen"
        style={{
          marginLeft: leftOpen ? '16rem' : '0',
          marginRight: effectiveRightOpen ? '15rem' : '0',
          transition: 'margin 200ms ease',
        }}
      >
        {trueFullBleed ? (
          children
        ) : isLab ? (
          <div className="px-8 py-8 max-w-5xl mx-auto">
            {children}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-8 py-10">
            {children}
          </div>
        )}
      </main>

      <RightSidebar sections={sections} isOpen={effectiveRightOpen} onToggle={() => setRightOpen(o => !o)} />
    </div>
  );
}
