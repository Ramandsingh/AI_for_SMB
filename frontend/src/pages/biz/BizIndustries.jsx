import { useState, useMemo } from 'react';
import { Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { INDUSTRIES } from '../../data/biz/industries';

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

const INDUSTRY_COLOR_DOT = {
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  orange: 'bg-orange-500',
  slate: 'bg-slate-500',
  violet: 'bg-violet-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
  teal: 'bg-teal-500',
  sky: 'bg-sky-500',
  gray: 'bg-gray-500',
};

const INDUSTRY_BADGE = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  sky: 'bg-sky-50 text-sky-700 border-sky-200',
  gray: 'bg-gray-50 text-gray-700 border-gray-200',
};

const QUARTER_BADGE = {
  Q1: 'bg-blue-50 text-blue-700 border-blue-200',
  Q2: 'bg-purple-50 text-purple-700 border-purple-200',
  Q3: 'bg-orange-50 text-orange-700 border-orange-200',
  Q4: 'bg-red-50 text-red-700 border-red-200',
};

const TOTAL_USE_CASES = INDUSTRIES.reduce((s, i) => s + i.useCases.length, 0);

// Flatten all use cases with parent industry metadata
const ALL_USE_CASES = INDUSTRIES.flatMap((industry) =>
  industry.useCases.map((uc) => ({
    ...uc,
    industryId: industry.id,
    industryName: industry.shortName,
    industryColor: industry.color,
    _key: `${industry.id}-${uc.id}`,
  }))
);

export default function BizIndustries() {
  const [search, setSearch] = useState('');
  const [activeIndustryId, setActiveIndustryId] = useState('all');
  const [activeQuarter, setActiveQuarter] = useState('all');
  const [nonTechOnly, setNonTechOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_USE_CASES.filter((uc) => {
      if (activeIndustryId !== 'all' && uc.industryId !== activeIndustryId) return false;
      if (activeQuarter !== 'all' && uc.quarter !== activeQuarter) return false;
      if (nonTechOnly && !uc.nonTech) return false;
      if (q && !uc.title.toLowerCase().includes(q) && !uc.desc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeIndustryId, activeQuarter, nonTechOnly]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-8 pb-8 border-b border-slate-100">
        <span className="badge-blue mb-4 inline-block">Reference</span>
        <h1 className="mb-3">Industry AI Use Cases</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl mb-6">
          {TOTAL_USE_CASES} use cases across 11 industry verticals. Filter by vertical, quarter, or accessibility level.
        </p>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
          <div className="h-0.5 w-4 rounded-full bg-blue-100" />
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3 mb-7">
        {[
          { label: `${TOTAL_USE_CASES} Use Cases`, color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { label: '11 Industries', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: '~240 Non-Technical', color: 'bg-orange-50 border-orange-200 text-orange-700' },
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

        {/* Industry pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveIndustryId('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeIndustryId === 'all'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            All Industries
          </button>
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveIndustryId(activeIndustryId === industry.id ? 'all' : industry.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeIndustryId === industry.id
                  ? `${INDUSTRY_BADGE[industry.color]} font-semibold`
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${INDUSTRY_COLOR_DOT[industry.color]}`} />
              {industry.shortName}
            </button>
          ))}
        </div>

        {/* Quarter filter + Non-tech toggle row */}
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

      {/* Result count */}
      <p className="text-sm text-slate-500 mb-4">
        Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of {TOTAL_USE_CASES} use cases
      </p>

      {/* Use case grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((uc) => (
            <div key={uc._key} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${INDUSTRY_BADGE[uc.industryColor]}`}>
                  {uc.industryName}
                </span>
                <span className={`text-xs font-semibold border rounded-full px-2 py-0.5 ${QUARTER_BADGE[uc.quarter]}`}>
                  {uc.quarter}
                </span>
              </div>
              {/* Title */}
              <h3 className="font-semibold text-slate-800 text-sm leading-snug">{uc.title}</h3>
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
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No use cases match your filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveIndustryId('all');
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
