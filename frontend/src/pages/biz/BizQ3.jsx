import { useState, useMemo } from 'react';
import { Zap, Database, FileText, FolderOpen, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';
import { DEPARTMENTS } from '../../data/biz/departments';

const SECTIONS = [
  { id: 's1', label: 'Quarter Objective' },
  { id: 's2', label: 'Your Department Playbook' },
  { id: 's3', label: 'Advanced: MCP' },
];

const MCP_USE_CASES = [
  {
    id: 'mcp1',
    icon: FileText,
    title: 'AI reads from a shared Google Sheet directly',
    desc: 'Connect your AI assistant to a live Google Sheet so it can read and reference up-to-date data — budgets, CRM contacts, inventory lists — without manual copy-paste.',
  },
  {
    id: 'mcp2',
    icon: FolderOpen,
    title: 'AI queries a local PDF folder',
    desc: 'Point your AI to a secure desktop folder of PDFs (contracts, reports, policies). Ask natural language questions and get answers grounded in those exact documents.',
  },
  {
    id: 'mcp3',
    icon: BookOpen,
    title: 'AI connects to a Notion database',
    desc: 'Give your AI read access to your team\'s Notion workspace. It can search meeting notes, project pages, and knowledge bases to answer questions in context.',
  },
];

function NonTechBadge({ nonTech }) {
  if (nonTech) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
        <CheckCircle2 className="w-3 h-3" />
        Business User ✓
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
      <AlertTriangle className="w-3 h-3" />
      Needs IT Support
    </span>
  );
}

function QuarterBadge({ quarter }) {
  const colors = {
    Q1: 'bg-blue-50 text-blue-700 border-blue-200',
    Q2: 'bg-purple-50 text-purple-700 border-purple-200',
    Q3: 'bg-orange-50 text-orange-700 border-orange-200',
    Q4: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-block text-xs font-semibold border rounded-full px-2 py-0.5 ${colors[quarter] || colors.Q3}`}>
      {quarter}
    </span>
  );
}

function UseCaseCard({ useCase }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug">{useCase.title}</h3>
        <QuarterBadge quarter={useCase.quarter} />
      </div>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{useCase.desc}</p>
      <div>
        <NonTechBadge nonTech={useCase.nonTech} />
      </div>
    </div>
  );
}

export default function BizQ3() {
  const [activeDeptId, setActiveDeptId] = useState(null);

  const activeDept = useMemo(
    () => DEPARTMENTS.find((d) => d.id === activeDeptId) || null,
    [activeDeptId]
  );

  const filteredUseCases = useMemo(() => {
    if (!activeDept) {
      return DEPARTMENTS.flatMap((d) =>
        d.useCases
          .filter((uc) => uc.quarter === 'Q3')
          .map((uc) => ({ ...uc, deptName: d.name, deptColor: d.color }))
      );
    }
    return activeDept.useCases
      .filter((uc) => uc.quarter === 'Q3')
      .map((uc) => ({ ...uc, deptName: activeDept.name, deptColor: activeDept.color }));
  }, [activeDept]);

  const deptColorMap = {
    pink: 'bg-pink-100 text-pink-800 border-pink-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    violet: 'bg-violet-100 text-violet-800 border-violet-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <PageWrapper
      badge="Q3"
      title="Functional Specialization & Department Playbooks"
      subtitle="Months 7–9 · Deploy AI playbooks tailored to your department's exact needs."
      sections={SECTIONS}
    >
      {/* s1: Quarter Objective */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Quarter Objective</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Go deep, not wide</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                By Q3, your team has established personal AI habits (Q1) and started automating data workflows (Q2).
                This quarter is about deploying department-specific playbooks — structured sets of prompts and
                processes tailored to your exact role. Whether you're in Finance, HR, Legal, or Marketing, Q3 is
                where AI stops being a general tool and becomes your department's co-worker.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Focus', value: 'Role-specific workflows' },
                  { label: 'Maturity', value: 'Intermediate → Advanced' },
                  { label: 'Outcome', value: 'Repeatable dept. playbooks' },
                ].map((item) => (
                  <div key={item.label} className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* s2: Department Playbook */}
      <section id="s2" className="section-anchor mb-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Your Department Playbook</h2>
            <p className="text-sm text-slate-500">
              Select your department to filter Q3 use cases. Showing{' '}
              <span className="font-medium text-slate-700">{filteredUseCases.length}</span> use case
              {filteredUseCases.length !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>

        {/* Department pill selector */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setActiveDeptId(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeDeptId === null
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            All Departments
          </button>
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDeptId === dept.id;
            const colorClass = deptColorMap[dept.color] || deptColorMap.slate;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveDeptId(isActive ? null : dept.id)}
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
        </div>

        {/* Quick Win card — shown only when a dept is selected and has a matrixEntry */}
        {activeDept && activeDept.matrixEntry && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-orange-700 bg-orange-100 border border-orange-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
                Quick Win
              </span>
              <span className="text-xs text-slate-500">{activeDept.matrixEntry.metric}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{activeDept.matrixEntry.useCase}</p>
          </div>
        )}

        {/* Use case grid */}
        {filteredUseCases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUseCases.map((uc, idx) => (
              <UseCaseCard key={`${uc.deptName}-${uc.id}-${idx}`} useCase={uc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No Q3 use cases found for this department.</p>
          </div>
        )}
      </section>

      <div className="section-divider" />

      {/* s3: Advanced — MCP */}
      <section id="s3" className="section-anchor mb-10">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-semibold text-slate-800">MCP as Universal Data Adapter</h2>
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
            Advanced
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
              <Database className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">What is Model Context Protocol (MCP)?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An open standard that connects your AI chat interface directly to local enterprise files — a secure
                desktop folder, a shared CSV sheet, or an internal database — without exposing API keys. MCP acts as
                a structured bridge so your AI model can read live, private business data during a conversation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">Note:</span> MCP requires IT setup. These use cases are not self-serve.
              Discuss the setup requirements with your IT team before proceeding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MCP_USE_CASES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.desc}</p>
                <span className="inline-block text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-2 py-0.5 self-start">
                  Needs IT Support
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}
