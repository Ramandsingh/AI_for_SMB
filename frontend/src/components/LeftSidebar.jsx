import { NavLink } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: '/', label: 'Dashboard Home', icon: '◈' }],
  },
  {
    label: 'Foundation',
    items: [
      { to: '/p1', label: 'Understanding AI',       icon: '○' },
      { to: '/p2', label: 'Maturity Journey',       icon: '○' },
      { to: '/p3', label: 'Role Impact Map',        icon: '○' },
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
      { to: '/p7', label: 'Technology & Tools',     icon: '○' },
      { to: '/p9', label: 'Learning Approach',      icon: '○' },
    ],
  },
  {
    label: 'People & Culture',
    items: [
      { to: '/p10', label: 'Individual Adoption',  icon: '○' },
      { to: '/p11', label: 'Org Contributions',    icon: '○' },
    ],
  },
  {
    label: 'Sales Toolkit',
    items: [
      { to: '/p8', label: 'Pitch & Narrative',      icon: '○' },
    ],
  },
  {
    label: 'Technology of AI',
    items: [
      { to: '/p17', label: 'What Is AI',             icon: '○' },
      { to: '/p18', label: 'Categories of AI',       icon: '○' },
      { to: '/p19', label: 'How AI Works',           icon: '○' },
      { to: '/p20', label: 'Where AI Deploys',       icon: '○' },
      { to: '/p21', label: 'AI & Your Tech Stack',   icon: '○' },
      { to: '/p22', label: 'Glossary',               icon: '○' },
    ],
  },
  {
    label: 'Enterprise Context',
    items: [
      { to: '/p12', label: 'What Enterprises Do',      icon: '○' },
      { to: '/p13', label: 'Where the Value Is',       icon: '○' },
      { to: '/p14', label: 'How to Adopt AI',          icon: '○' },
      { to: '/p15', label: 'When to Adopt AI',         icon: '○' },
      { to: '/p16', label: 'How to Measure Value',     icon: '○' },
    ],
  },
];

export default function LeftSidebar() {
  const { activeCompany } = useCompany();

  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 flex flex-col z-20 thin-scroll overflow-y-auto"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Brand */}
      <div className="px-5 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
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

        {/* Active company pill */}
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
      <nav className="flex-1 px-3 py-5 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.5)' }}>
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                        isActive
                          ? 'text-white font-semibold nav-active-glow'
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
          </div>
        ))}
      </nav>

      {/* Admin link + footer */}
      <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm mt-3 transition-all duration-150 ${
              isActive ? 'text-white font-semibold nav-active-glow' : 'text-slate-400 hover:text-slate-200'
            }`
          }
          style={({ isActive }) =>
            isActive ? { background: 'rgba(59,130,246,0.12)' } : {}
          }
        >
          <span className="text-base leading-none">⚙</span>
          <span>Admin · Companies</span>
        </NavLink>
        <p className="px-3 pt-3 text-xs" style={{ color: 'rgba(148,163,184,0.35)' }}>
          v1.0 · AI Adoption Dashboard
        </p>
      </div>
    </aside>
  );
}
