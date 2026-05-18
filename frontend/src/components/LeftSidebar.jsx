import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';

const NAV_GROUPS = [
  {
    label: 'Overview',
    defaultOpen: true,
    items: [
      { to: '/',         label: 'Dashboard Home', icon: '◈' },
      { to: '/planning', label: 'Planning',        icon: '◈' },
    ],
  },
  {
    label: 'Foundation',
    items: [
      { to: '/p1',  label: 'Understanding AI',  icon: '○' },
      { to: '/p2',  label: 'Maturity Journey',  icon: '○' },
      { to: '/p34', label: 'Maturity Canvas',   icon: '◈' },
      { to: '/p3',  label: 'Role Impact Map',   icon: '○' },
    ],
  },
  {
    label: 'Planning',
    items: [
      { to: '/p4', label: 'Assessment & Discovery', icon: '○' },
      { to: '/p5', label: 'Roadmap Options',        icon: '○' },
      { to: '/p6', label: 'ROI Calculator',         icon: '○' },
    ],
  },
  {
    label: 'Implementation',
    items: [
      { to: '/p7', label: 'Technology & Tools', icon: '○' },
      { to: '/p9', label: 'Learning Approach',  icon: '○' },
    ],
  },
  {
    label: 'People & Culture',
    items: [
      { to: '/p10', label: 'Individual Adoption', icon: '○' },
      { to: '/p11', label: 'Org Contributions',   icon: '○' },
    ],
  },
  {
    label: 'Sales Toolkit',
    items: [
      { to: '/p8', label: 'Pitch & Narrative', icon: '○' },
    ],
  },
  {
    label: 'Technology of AI',
    items: [
      { to: '/p17', label: 'What Is AI',           icon: '○' },
      { to: '/p18', label: 'Categories of AI',     icon: '○' },
      { to: '/p19', label: 'How AI Works',         icon: '○' },
      { to: '/p20', label: 'Where AI Deploys',     icon: '○' },
      { to: '/p21', label: 'AI & Your Tech Stack', icon: '○' },
      { to: '/p22', label: 'Glossary',             icon: '○' },
    ],
  },
  {
    label: 'Enterprise Context',
    items: [
      { to: '/p12', label: 'What Enterprises Do',   icon: '○' },
      { to: '/p13', label: 'Where the Value Is',    icon: '○' },
      { to: '/p14', label: 'How to Adopt AI',       icon: '○' },
      { to: '/p15', label: 'When to Adopt AI',      icon: '○' },
      { to: '/p16', label: 'How to Measure Value',  icon: '○' },
    ],
  },
  {
    label: 'Executive Insights',
    items: [
      { to: '/p29', label: 'BCG',      icon: '○' },
      { to: '/p30', label: 'McKinsey', icon: '○' },
      { to: '/p31', label: 'Bain',     icon: '○' },
      { to: '/p32', label: 'Deloitte', icon: '○' },
    ],
  },
  {
    label: 'Enterprise AI Development',
    items: [
      { to: '/p23', label: 'Data Infrastructure',     icon: '○' },
      { to: '/p24', label: 'The AI Factory',          icon: '○' },
      { to: '/p25', label: 'Foundation Models & RAG', icon: '○' },
      { to: '/p26', label: 'Enterprise AI Platforms', icon: '○' },
      { to: '/p27', label: 'Governance & Risk',       icon: '○' },
      { to: '/p28', label: 'Building the AI Team',    icon: '○' },
    ],
  },
  {
    label: 'Your AI Fit',
    items: [
      { to: '/p33', label: 'How AI Fits You', icon: '◈' },
    ],
  },
  {
    label: 'Experimental UI',
    items: [
      { to: '/lab',            label: 'Lab Home',                  icon: '◈' },
      { to: '/lab/upload',     label: 'Image Upload · Uppy',       icon: '○' },
      { to: '/lab/graph',      label: 'Site Graph · React Flow',   icon: '○' },
      { to: '/lab/chat',       label: 'Chat Agent',                icon: '○' },
      { to: '/lab/arch',       label: 'Architecture · React Flow', icon: '○' },
      { to: '/lab/timeline',   label: 'Timeline',                  icon: '○' },
      { to: '/lab/charts',     label: 'Data Viz · Recharts',       icon: '○' },
      { to: '/lab/calendar',   label: 'Calendar · Ant Design',     icon: '○' },
      { to: '/lab/database',   label: 'Database Platforms',        icon: '○' },
      { to: '/lab/excalidraw', label: 'Excalidraw',                icon: '○' },
    ],
  },
];

const STORAGE_KEY = 'nav-groups-open';

function loadOpenState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return stored;
  } catch {
    return {};
  }
}

function NavGroup({ group, location }) {
  const hasActive = group.items.some(i =>
    i.to === '/' ? location.pathname === '/' : location.pathname.startsWith(i.to)
  );

  const stored = loadOpenState();
  const defaultOpen = group.defaultOpen ?? hasActive;
  const [open, setOpenState] = useState(
    group.label in stored ? stored[group.label] : defaultOpen
  );

  const toggle = () => {
    const next = !open;
    setOpenState(next);
    try {
      const current = loadOpenState();
      current[group.label] = next;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {}
  };

  return (
    <div>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-3 py-1 mb-0.5 rounded-lg group hover:bg-white/5 transition-colors"
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-colors"
          style={{ color: open || hasActive ? 'rgba(148,163,184,0.75)' : 'rgba(148,163,184,0.4)' }}
        >
          {group.label}
        </span>
        <ChevronDown
          size={11}
          className="flex-shrink-0 transition-transform duration-200"
          style={{
            color: 'rgba(148,163,184,0.4)',
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
      </button>

      {open && (
        <ul className="space-y-0.5 mb-1">
          {group.items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { background: 'rgba(59,130,246,0.12)', color: '#fff' } : {}
                }
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 flex-shrink-0" />
                <span className="truncate leading-snug">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LeftSidebar({ isOpen, onToggle }) {
  const { activeCompany } = useCompany();
  const location = useLocation();

  return (
    <>
      <aside
        className="fixed left-0 top-0 h-full z-20 thin-scroll overflow-y-auto flex flex-col"
        style={{
          width: isOpen ? '16rem' : '0',
          overflow: isOpen ? 'auto' : 'hidden',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          transition: 'width 200ms ease',
        }}
      >
        {/* Brand */}
        <div className="px-5 py-6 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', boxShadow: '0 0 0 1px rgba(59,130,246,0.3), 0 4px 12px rgba(59,130,246,0.25)' }}
            >
              AI
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight tracking-tight">AI Adoption</p>
              <p className="text-slate-500 text-xs mt-0.5">Dashboard</p>
            </div>
          </div>

          <NavLink
            to="/admin"
            className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/5"
          >
            {activeCompany ? (
              <>
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}
                >
                  {activeCompany.name[0].toUpperCase()}
                </div>
                <span className="text-emerald-400 text-xs font-semibold truncate">{activeCompany.name}</span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-slate-700 flex-shrink-0">
                  <span className="text-slate-400 text-xs">+</span>
                </div>
                <span className="text-slate-500 text-xs">Select client</span>
              </>
            )}
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_GROUPS.map((group) => (
            <NavGroup key={group.label} group={group} location={location} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm mt-3 transition-all duration-150 whitespace-nowrap ${
                isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`
            }
            style={({ isActive }) => isActive ? { background: 'rgba(59,130,246,0.12)' } : {}}
          >
            <span className="text-base leading-none">⚙</span>
            <span>Admin · Companies</span>
          </NavLink>
          <p className="px-3 pt-3 text-xs whitespace-nowrap" style={{ color: 'rgba(148,163,184,0.35)' }}>
            v1.0 · AI Adoption Dashboard
          </p>
        </div>
      </aside>

      {/* Toggle tab */}
      <button
        onClick={onToggle}
        className="fixed top-6 z-30 flex items-center justify-center cursor-pointer"
        style={{
          left: isOpen ? '16rem' : '0',
          width: '1.25rem',
          height: '2.5rem',
          borderRadius: '0 6px 6px 0',
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderLeft: 'none',
          transition: 'left 200ms ease',
        }}
        title={isOpen ? 'Hide navigation' : 'Show navigation'}
      >
        {isOpen
          ? <ChevronLeft size={11} className="text-slate-400" />
          : <ChevronRight size={11} className="text-slate-400" />
        }
      </button>
    </>
  );
}
