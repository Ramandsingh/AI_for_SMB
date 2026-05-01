import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RightSidebar({ sections }) {
  const [activeId, setActiveId] = useState('');
  const location = useLocation();

  useEffect(() => setActiveId(''), [location.pathname]);

  useEffect(() => {
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="fixed right-0 top-0 h-full w-60 bg-white z-20 thin-scroll overflow-y-auto"
      style={{ borderLeft: '1px solid #f1f5f9' }}>
      {sections.length > 0 && (
        <div className="px-5 py-7">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
            On this page
          </p>
          <nav>
            <ul className="space-y-0.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`block py-1.5 text-sm rounded-lg transition-colors duration-100 ${
                      section.level === 3 ? 'pl-4 text-xs' : ''
                    } ${
                      activeId === section.id
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {activeId === section.id && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 mb-0.5 align-middle" />
                    )}
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </aside>
  );
}
