import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: '10.1 The Individual Adoption Journey', level: 2 },
  { id: 's2', title: '10.2 Starting Points by Role',         level: 2 },
  { id: 's3', title: '10.3 Building Your AI Workflow',       level: 2 },
  { id: 's4', title: '10.4 Prompt Engineering Basics',       level: 2 },
  { id: 's5', title: '10.5 Personal AI Habit Formation',     level: 2 },
];

const JOURNEY = [
  { phase: 'Curious', icon: '🔍', week: 'Week 1', desc: 'You\'ve heard about AI tools and tried one or two things. Results were mixed — sometimes impressive, sometimes frustrating. You\'re not sure how to make it consistently useful.', next: 'Pick one task you do every week that involves writing or reading. Do it with AI for two weeks. Just one task — not everything.' },
  { phase: 'Consistent', icon: '📅', week: 'Weeks 2–4', desc: 'You have 2–3 AI tasks that are reliably faster. You\'re starting to see where AI is genuinely helpful and where it isn\'t. The friction is reducing.', next: 'Build a personal prompt library — a running document of prompts that worked. Add to it every time a prompt produces a great result.' },
  { phase: 'Confident', icon: '⚡', week: 'Month 2–3', desc: 'You reach for AI naturally for most writing and analysis tasks. You know how to give good context, how to iterate, and how to check the output. Your quality and speed have both improved.', next: 'Teach one colleague. Explaining how you use AI for a specific task cements your own understanding and surfaces gaps.' },
  { phase: 'Creative', icon: '💡', week: 'Month 4+', desc: 'You\'re identifying new use cases on your own — tasks AI could help with that nobody told you about. You\'re adapting prompts for new contexts and getting increasingly useful results.', next: 'Share your best use cases with your champion or team. What\'s obvious to you at this stage isn\'t obvious to others at month 1.' },
  { phase: 'Multiplier', icon: '🚀', week: 'Month 6+', desc: 'You\'re helping others adopt AI. Your experience with what works in your specific context is more valuable than any generic training. You\'ve become a de facto AI resource for people around you.', next: 'Consider formalising as a champion. Your function needs someone at this level — and the organisation needs to support you properly to keep you here.' },
];

const STARTING_POINTS = [
  {
    role: 'If you write a lot (reports, emails, proposals)',
    icon: '✍️',
    tools: ['Claude or ChatGPT for first drafts', 'Grammarly or Copilot for editing', 'Voice-to-text for rough dictation → AI cleanup'],
    firstWeek: 'Take the last three documents you wrote. Redo each one with AI assistance. Compare time taken and output quality.',
    prompt: 'Write a [document type] for [audience]. Context: [brief background]. Tone: [professional/friendly/formal]. Include: [specific elements]. My draft / notes: [paste your rough content]',
  },
  {
    role: 'If you handle lots of email',
    icon: '📧',
    tools: ['Claude/ChatGPT for drafting replies', 'Copilot in Outlook for suggestions', 'Shared Claude Project with your email templates pre-loaded'],
    firstWeek: 'Pick the 5 email types you write most often. Create a prompt template for each. Use them for one week and measure time saved.',
    prompt: 'Draft a reply to this email: [paste email]. My position / what I want to say: [your key points]. Tone: [match theirs / more formal / warmer]. Keep it under [word count].',
  },
  {
    role: 'If you analyse data or prepare reports',
    icon: '📊',
    tools: ['Excel Copilot for formula help and data cleanup', 'Claude for narrative commentary from numbers', 'Perplexity for market context and benchmarks'],
    firstWeek: 'Take your last monthly report. Ask AI to write the executive summary from the raw numbers. Compare to what you would have written.',
    prompt: 'Here is data from [source]: [paste table or numbers]. Write a 3-paragraph executive summary for [audience] highlighting: (1) key performance vs. last period (2) main drivers (3) recommended focus areas.',
  },
  {
    role: 'If you manage people and meetings',
    icon: '🧑‍💼',
    tools: ['Fireflies or Otter for meeting transcription and summaries', 'Claude for performance review drafting', 'AI for 1:1 agenda preparation and action tracking'],
    firstWeek: 'Record (with consent) or transcript your next three meetings. Have AI produce the action list. Compare to your usual notes.',
    prompt: 'Here is the transcript from a [meeting type] meeting: [paste]. Extract: (1) decisions made (2) action items with owners (3) open questions. Format as bullet points.',
  },
  {
    role: 'If you do research and analysis',
    icon: '🔬',
    tools: ['Perplexity for web research with citations', 'Claude for document analysis and synthesis', 'NotebookLM for long-document Q&A'],
    firstWeek: 'Take a research question you answered last month. Re-answer it with AI assistance. Note what it found that you missed, and what it missed that you found.',
    prompt: 'Research topic: [topic]. I need: [type of analysis — compare, summarise, find examples, identify risks]. Audience: [who will read this]. Format: [bullets / narrative / table]. Focus on: [specific angle].',
  },
];

const HABITS = [
  { habit: 'The 10-minute daily AI session',  desc: 'Set aside 10 minutes each morning to do one task with AI that you\'d otherwise do manually. Not a big project — a small daily win. This builds the reflex faster than sporadic intensive use.' },
  { habit: 'The prompt journal',              desc: 'Keep a running document of prompts that worked well. Reference it when you face a similar task. Share it with your champion or team. This is the highest-leverage 5 minutes per week.' },
  { habit: 'The "AI first" pause',            desc: 'Before starting any writing or analysis task, pause and ask: "Could AI do the first 70% of this?" If yes — start with AI. Then edit. Not the other way around.' },
  { habit: 'The bad output debrief',          desc: 'When AI produces something useless, don\'t delete it and move on. Spend 2 minutes figuring out why the prompt failed. Usually it\'s missing context, unclear intent, or no format specified. Fix it and save the better prompt.' },
  { habit: 'The weekly "what worked" share',  desc: 'In your team channel, post one AI win per week: the task, the prompt you used, and the result. Low effort, high social value — it normalises AI use and spreads knowledge laterally.' },
];

export default function IndividualAdoption() {
  return (
    <PageWrapper
      badge="Page 10 — People & Culture"
      title="AI Adoption for Individual Contributors"
      subtitle="A practical guide for individuals — not IT teams — to build genuine, lasting AI capability in their daily work."
      sections={SECTIONS}
    >
      {/* 10.1 */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-4">10.1 The Individual Adoption Journey</h2>
        <p className="text-sm text-slate-500 mb-5">Most AI adoption advice is aimed at organisations. This is for the individual navigating that journey from inside.</p>
        <div className="space-y-3">
          {JOURNEY.map((j, i) => (
            <div key={j.phase} className="card flex gap-4">
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <span className="text-2xl">{j.icon}</span>
                {i < JOURNEY.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 mt-2" />}
              </div>
              <div className="pb-2 flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-slate-800">{j.phase}</span>
                  <span className="badge bg-slate-100 text-slate-500">{j.week}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{j.desc}</p>
                <p className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2">Next step: {j.next}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10.2 */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-4">10.2 Starting Points by Role Type</h2>
        <div className="space-y-4">
          {STARTING_POINTS.map((s) => (
            <div key={s.role} className="card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <h3 className="text-sm">{s.role}</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Recommended tools</p>
                  <ul className="space-y-1.5">
                    {s.tools.map(t => <li key={t} className="text-slate-600 flex gap-1.5"><span className="text-blue-400">·</span>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">First week experiment</p>
                  <p className="text-slate-600">{s.firstWeek}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">Starter prompt template</p>
                <pre className="bg-slate-900 text-emerald-400 rounded-lg p-3 text-xs whitespace-pre-wrap font-mono">{s.prompt}</pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10.3 */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-4">10.3 Building Your AI Workflow</h2>
        <div className="card mb-4">
          <p className="text-sm font-semibold text-slate-800 mb-3">The three-layer workflow</p>
          <div className="space-y-3">
            {[
              { layer: 'Pre-task', what: 'Before starting any writing/analysis task, check: is there a prompt template for this? Do I have the relevant context loaded? Who else will review the output?', time: '30 seconds' },
              { layer: 'During task', what: 'Use AI for the first 70% — structure, draft, first analysis. Keep editing control. Never accept the first output without reading it critically.', time: 'Most of the task' },
              { layer: 'Post-task', what: 'Did the prompt work? Save it if yes. Note what failed if no. Did the output need heavy editing? That\'s a signal to improve the prompt, not avoid AI.', time: '2–3 minutes' },
            ].map(l => (
              <div key={l.layer} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="badge-blue flex-shrink-0 h-fit">{l.layer}</span>
                <p className="text-sm text-slate-600 flex-1">{l.what}</p>
                <span className="text-xs text-slate-400 flex-shrink-0">{l.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10.4 */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">10.4 Prompt Engineering Basics</h2>
        <p className="text-sm text-slate-500 mb-4">You don't need to study prompt engineering. You need five principles that work 90% of the time.</p>
        <div className="space-y-3">
          {[
            { num: 1, title: 'Specify the role', ex: '"You are a finance manager reviewing a supplier contract..."', why: 'Frames the perspective and tone of the response.' },
            { num: 2, title: 'Give context', ex: '"Here is background on our business: [paste]. Here is the document: [paste]."', why: 'Without context, AI gives generic answers. Context gives specific ones.' },
            { num: 3, title: 'State the output format', ex: '"Respond in bullet points / as a table / in 3 paragraphs / as a numbered list."', why: 'Formatting instructions are the fastest way to improve output usability.' },
            { num: 4, title: 'Set the audience', ex: '"This is for a CFO who wants brevity, not detail."', why: 'Tone, vocabulary, and depth all change with audience.' },
            { num: 5, title: 'Iterate, don\'t restart', ex: '"That\'s good. Now make it shorter and remove the third point."', why: 'Iterating on a response is faster than rewriting the whole prompt. AI holds context.' },
          ].map(p => (
            <div key={p.num} className="card">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xs text-slate-400 font-mono">0{p.num}</span>
                <h3 className="text-sm">{p.title}</h3>
              </div>
              <pre className="bg-slate-900 text-emerald-400 rounded px-3 py-2 text-xs mb-2 font-mono whitespace-pre-wrap">{p.ex}</pre>
              <p className="text-xs text-slate-500">Why: {p.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10.5 */}
      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-4">10.5 Personal AI Habit Formation</h2>
        <div className="space-y-3">
          {HABITS.map(h => (
            <div key={h.habit} className="card flex gap-4">
              <div className="w-2 bg-emerald-500 rounded-full flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{h.habit}</p>
                <p className="text-slate-600 text-sm">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
