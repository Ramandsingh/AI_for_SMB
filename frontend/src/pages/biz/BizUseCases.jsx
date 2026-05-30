import { useState, useMemo } from 'react';
import { Search, CheckCircle2, AlertTriangle, LayoutGrid } from 'lucide-react';
import { DEPARTMENTS, MATRIX_FUNCTIONS } from '../../data/biz/departments';

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

const DEPT_COLOR_BADGE = {
  pink: 'bg-pink-50 text-pink-700 border-pink-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
};

const QUARTER_BADGE = {
  Q1: 'bg-blue-50 text-blue-700 border-blue-200',
  Q2: 'bg-purple-50 text-purple-700 border-purple-200',
  Q3: 'bg-orange-50 text-orange-700 border-orange-200',
  Q4: 'bg-red-50 text-red-700 border-red-200',
};

const GROUP_BADGE = {
  'Core Value Chain': 'bg-sky-50 text-sky-700 border-sky-200',
  'Corporate Support': 'bg-teal-50 text-teal-700 border-teal-200',
  'Strategy & Governance': 'bg-purple-50 text-purple-700 border-purple-200',
};

const TOTAL_DEPT_USE_CASES = DEPARTMENTS.reduce((s, d) => s + d.useCases.length, 0);

// Flatten department use cases
const ALL_DEPT_USE_CASES = DEPARTMENTS.flatMap((dept) =>
  dept.useCases.map((uc) => ({
    ...uc,
    deptId: dept.id,
    deptName: dept.name,
    deptIcon: dept.icon,
    deptColor: dept.color,
    _key: `dept-${dept.id}-${uc.id}`,
    _type: 'dept',
  }))
);

// Matrix functions as normalized cards
const ALL_MATRIX_USE_CASES = MATRIX_FUNCTIONS.map((mf) => ({
  id: mf.id,
  title: mf.name,
  desc: mf.useCase,
  nonTech: mf.nonTech,
  quarter: mf.quarter,
  group: mf.group,
  metric: mf.metric,
  deptId: 'matrix',
  deptName: mf.group,
  deptIcon: null,
  deptColor: 'slate',
  _key: `matrix-${mf.id}`,
  _type: 'matrix',
}));

export default function BizUseCases() {
  const [search, setSearch] = useState('');
  const [activeDeptId, setActiveDeptId] = useState('all');
  const [activeQuarter, setActiveQuarter] = useState('all');
  const [nonTechOnly, setNonTechOnly] = useState(false);

  const activeDept = useMemo(
    () => DEPARTMENTS.find((d) => d.id === activeDeptId) || null,
    [activeDeptId]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    let pool;
    if (activeDeptId === 'all') {
      pool = [...ALL_DEPT_USE_CASES, ...ALL_MATRIX_USE_CASES];
    } else if (activeDeptId === 'matrix') {
      pool = ALL_MATRIX_USE_CASES;
    } else {
      pool = ALL_DEPT_USE_CASES.filter((uc) => uc.deptId === activeDeptId);
    }

    return pool.filter((uc) => {
      if (activeQuarter !== 'all' && uc.quarter !== activeQuarter) return false;
      if (nonTechOnly && !uc.nonTech) return false;
      if (q && !uc.title.toLowerCase().includes(q) && !uc.desc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeDeptId, activeQuarter, nonTechOnly]);

  const totalInPool = useMemo(() => {
    if (activeDeptId === 'all') return TOTAL_DEPT_USE_CASES + MATRIX_FUNCTIONS.length;
    if (activeDeptId === 'matrix') return MATRIX_FUNCTIONS.length;
    return 25;
  }, [activeDeptId]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-8 pb-8 border-b border-slate-100">
        <span className="badge-blue mb-4 inline-block">Reference</span>
        <h1 className="mb-3">Department AI Use Cases</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl mb-6">
          Browse 275+ use cases across 11 departments and 15 specialized functions. Filter by role and quarter.
        </p>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
          <div className="h-0.5 w-4 rounded-full bg-blue-100" />
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3 mb-7">
        {[
          { label: `${TOTAL_DEPT_USE_CASES} Department Use Cases`, color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { label: '11 Core Departments', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: '15 Specialist Functions', color: 'bg-purple-50 border-purple-200 text-purple-700' },
        ].map((stat) => (
          <span
            key={stat.label}
            className={`text-sm font-semibold border rounded-full px-4 py-1.5 ${stat.color}`}
          >
            {stat.label}
          </span>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-7">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search use cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-slate-400"
          />
        </div>

        {/* Department tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveDeptId('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeDeptId === 'all'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            All
          </button>
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDeptId === dept.id;
            const colorClass = DEPT_COLOR_BADGE[dept.color] || DEPT_COLOR_BADGE.slate;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveDeptId(isActive ? 'all' : dept.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? colorClass + ' font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {dept.icon} {dept.name}
              </button>
            );
          })}
          <button
            onClick={() => setActiveDeptId(activeDeptId === 'matrix' ? 'all' : 'matrix')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeDeptId === 'matrix'
                ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Matrix Functions
          </button>
        </div>

        {/* Quarter + non-tech row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveQuarter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                activeQuarter === 'all'
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              All Quarters
            </button>
            {QUARTERS.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuarter(activeQuarter === q ? 'all' : q)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  activeQuarter === q
                    ? `${QUARTER_BADGE[q]} font-semibold`
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={nonTechOnly}
              onChange={(e) => setNonTechOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
            />
            <span className="text-sm text-slate-600 font-medium">Non-technical only</span>
          </label>
        </div>
      </div>

      {/* Quick Reference highlight for selected department */}
      {activeDept && activeDept.matrixEntry && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-700 bg-blue-100 border border-blue-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
              Quick Reference
            </span>
            <span className="text-xs text-slate-500 font-medium">{activeDept.matrixEntry.metric}</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{activeDept.matrixEntry.useCase}</p>
        </div>
      )}

      {/* Result count */}
      <p className="text-sm text-slate-500 mb-4">
        Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of {totalInPool} use cases
        {activeDeptId !== 'all' && activeDept && (
          <span className="text-slate-400"> in {activeDept.name}</span>
        )}
        {activeDeptId === 'matrix' && (
          <span className="text-slate-400"> in Matrix Functions</span>
        )}
      </p>

      {/* Use case grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((uc) => {
            const isMatrix = uc._type === 'matrix';
            return (
              <div key={uc._key} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center gap-2 flex-wrap">
                  {isMatrix ? (
                    <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${GROUP_BADGE[uc.group] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {uc.group}
                    </span>
                  ) : (
                    <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${DEPT_COLOR_BADGE[uc.deptColor] || DEPT_COLOR_BADGE.slate}`}>
                      {uc.deptIcon} {uc.deptName}
                    </span>
                  )}
                  <span className={`text-xs font-semibold border rounded-full px-2 py-0.5 ${QUARTER_BADGE[uc.quarter]}`}>
                    {uc.quarter}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-800 text-sm leading-snug">{uc.title}</h3>

                {/* Metric (matrix only) */}
                {isMatrix && uc.metric && (
                  <p className="text-xs text-slate-400 font-medium">Metric: {uc.metric}</p>
                )}

                {/* Desc */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{uc.desc}</p>

                {/* Footer */}
                <div>
                  {uc.nonTech ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Business User
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                      <AlertTriangle className="w-3 h-3" />
                      Needs IT
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No use cases match your filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveDeptId('all');
              setActiveQuarter('all');
              setNonTechOnly(false);
            }}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
