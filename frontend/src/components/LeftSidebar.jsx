import { NavLink } from 'react-router-dom';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: '/', label: 'Dashboard Home', icon: '◈' }],
  },
  {
    label: 'Foundation',
    items: [
      { to: '/p1', label: '1 · Understanding AI',       icon: '○' },
      { to: '/p2', label: '2 · Maturity Journey',       icon: '○' },
      { to: '/p3', label: '3 · Role Impact Map',        icon: '○' },
    ],
  },
  {
    label: 'Planning',
    items: [
      { to: '/p4', label: '4 · Assessment & Discovery', icon: '○' },
      { to: '/p5', label: '5 · Roadmap Options',        icon: '○' },
      { to: '/p6', label: '6 · ROI Calculator',         icon: '○' },
    ],
  },
  {
    label: 'Implementation',
    items: [
      { to: '/p7', label: '7 · Technology & Tools',     icon: '○' },
      { to: '/p9', label: '9 · Learning Approach',      icon: '○' },
    ],
  },
  {
    label: 'People & Culture',
    items: [
      { to: '/p10', label: '10 · Individual Adoption',  icon: '○' },
      { to: '/p11', label: '11 · Org Contributions',    icon: '○' },
    ],
  },
  {
    label: 'Sales Toolkit',
    items: [
      { to: '/p8', label: '8 · Pitch & Narrative',      icon: '○' },
    ],
  },
];

export default function LeftSidebar() {
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
                      isActive
                        ? { background: 'rgba(59,130,246,0.12)', color: '#fff' }
                        : {}
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

      {/* Footer */}
      <div className="px-5 py-4 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(148,163,184,0.4)' }}>
        v1.0 · AI Adoption Dashboard
      </div>
    </aside>
  );
}
