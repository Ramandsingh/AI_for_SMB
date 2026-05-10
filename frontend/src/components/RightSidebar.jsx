import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RightSidebar({ sections, isOpen, onToggle }) {
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
    <>
      {/* Sidebar panel */}
      <aside
        className="fixed right-0 top-0 h-full z-20 thin-scroll"
        style={{
          width: isOpen ? '15rem' : '0',
          overflow: isOpen ? 'auto' : 'hidden',
          background: '#fff',
          borderLeft: '1px solid #f1f5f9',
          transition: 'width 200ms ease',
        }}
      >
        {sections.length > 0 && (
          <div className="px-5 py-7">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 whitespace-nowrap">
              On this page
            </p>
            <nav>
              <ul className="space-y-0.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block py-1.5 text-sm rounded-lg transition-colors duration-100 whitespace-nowrap overflow-hidden text-ellipsis ${
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

      {/* Toggle tab — always visible */}
      <button
        onClick={onToggle}
        className="fixed top-6 z-30 flex items-center justify-center cursor-pointer"
        style={{
          right: isOpen ? '15rem' : '0',
          width: '1.25rem',
          height: '2.5rem',
          borderRadius: '6px 0 0 6px',
          background: '#fff',
          border: '1px solid #f1f5f9',
          borderRight: 'none',
          transition: 'right 200ms ease',
        }}
        title={isOpen ? 'Hide contents' : 'Show contents'}
      >
        {isOpen
          ? <ChevronRight size={11} className="text-slate-400" />
          : <ChevronLeft size={11} className="text-slate-400" />
        }
      </button>
    </>
  );
}
