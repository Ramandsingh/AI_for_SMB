import { useEffect } from 'react';
import { useSections } from '../App';

export default function PageWrapper({ title, subtitle, badge, sections, children }) {
  const { setSections } = useSections();

  useEffect(() => {
    setSections(sections || []);
    return () => setSections([]);
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="mb-10 pb-8 border-b border-slate-100">
        {badge && (
          <span className="badge-blue mb-4 inline-block">{badge}</span>
        )}
        <h1 className="mb-3">{title}</h1>
        {subtitle && (
          <p className="text-slate-500 text-base leading-relaxed max-w-2xl mb-6">{subtitle}</p>
        )}
        {/* Visual accent line */}
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
          <div className="h-0.5 w-4 rounded-full bg-blue-100" />
        </div>
      </div>
      {children}
    </div>
  );
}
