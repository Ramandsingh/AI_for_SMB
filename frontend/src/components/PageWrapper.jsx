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
      <div className="mb-8">
        {badge && (
          <span className="badge-blue mb-3 inline-block">{badge}</span>
        )}
        <h1 className="mb-2">{title}</h1>
        {subtitle && (
          <p className="text-slate-500 text-base leading-relaxed max-w-2xl">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
