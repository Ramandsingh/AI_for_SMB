import { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useSections } from '../App';

export default function Layout({ children }) {
  const { sections } = useSections();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <LeftSidebar isOpen={leftOpen} onToggle={() => setLeftOpen(o => !o)} />

      <main
        className="flex-1 min-h-screen"
        style={{
          marginLeft: leftOpen ? '16rem' : '0',
          marginRight: rightOpen ? '15rem' : '0',
          transition: 'margin 200ms ease',
        }}
      >
        <div className="max-w-4xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>

      <RightSidebar sections={sections} isOpen={rightOpen} onToggle={() => setRightOpen(o => !o)} />
    </div>
  );
}
