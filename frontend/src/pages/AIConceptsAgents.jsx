import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'What is an Agent',           level: 2 },
  { id: 's2', title: 'The Agent Loop',              level: 2 },
  { id: 's3', title: 'Harness & Orchestration',     level: 2 },
  { id: 's4', title: 'Skills & Tools',              level: 2 },
  { id: 's5', title: 'Swarms & Multi-Agent',        level: 2 },
  { id: 's6', title: 'Frameworks Comparison',       level: 2 },
];

const AGENT_COMPONENTS = [
  { component: 'LLM', role: 'The reasoning engine. Plans, decides, and generates responses. The "brain" that processes inputs and decides which action to take next.' },
  { component: 'Tools', role: 'Functions the agent can call: web search, code execution, database queries, API calls, file read/write. Tools convert reasoning into real-world action.' },
  { component: 'Memory', role: 'In-context history + optional external memory (vector store for long-term recall). Enables coherent multi-step behaviour.' },
  { component: 'Harness', role: 'The scaffolding that runs the agent loop: calls the LLM, routes tool responses back, handles errors and retries, enforces timeouts and budget limits.' },
];

const LOOP_STEPS = [
  { n: '1', title: 'Observe', desc: 'The agent receives the current state: user message, tool results from previous steps, and conversation history.', color: 'bg-blue-100 text-blue-700' },
  { n: '2', title: 'Think (Plan)', desc: 'The LLM reasons about what to do next. With chain-of-thought or ReAct prompting, this reasoning is explicit in the output.', color: 'bg-violet-100 text-violet-700' },
  { n: '3', title: 'Act', desc: 'The LLM outputs either a tool call (structured: function name + arguments) or a final answer. If a tool call: the harness executes it.', color: 'bg-amber-100 text-amber-700' },
  { n: '4', title: 'Receive result', desc: 'Tool output is returned to the LLM as a new "tool_result" message in the context.', color: 'bg-emerald-100 text-emerald-700' },
  { n: '5', title: 'Repeat or finish', desc: 'If the task is incomplete, go back to step 1 with the new observation. If complete, output the final answer.', color: 'bg-slate-100 text-slate-600' },
];

const HARNESS_CONCERNS = [
  { concern: 'Tool routing', desc: 'Parse LLM output to identify tool calls. Map tool names to actual function implementations. Handle unknown tools gracefully.' },
  { concern: 'Error handling', desc: 'If a tool fails, decide: retry, try a different tool, or report failure back to the LLM. Infinite loop prevention — cap iterations.' },
  { concern: 'Context management', desc: 'Tool results grow the context window. Summarise or truncate old steps when approaching the token limit.' },
  { concern: 'Streaming', desc: 'Stream token-by-token to the user while the agent continues reasoning. Complex — requires parallel output and loop continuation.' },
  { concern: 'Human-in-the-loop', desc: 'Pause and request human approval before high-impact tool calls (e.g., send email, delete file, make payment). Essential for production agents in 2025.' },
  { concern: 'Observability', desc: 'Log every tool call, LLM request, and step transition. You cannot debug an agent loop you cannot observe. Tools: LangSmith, Weights & Biases, custom logging.' },
];

const SKILLS_LIST = [
  { skill: 'Web search', desc: 'Brave Search, Tavily, or Serper APIs. Gives the agent access to current information not in training data.', example: 'Research task: find competitor pricing, current news, stock data.' },
  { skill: 'Code execution', desc: 'Run Python in a sandboxed container. Enables data analysis, calculations, chart generation, and file manipulation.', example: 'Analyse a CSV, generate a chart, run a calculation.' },
  { skill: 'File I/O', desc: 'Read and write files. Upload to object storage. Parse PDFs, Word docs, spreadsheets.', example: 'Read a contract PDF, extract key dates, write a summary.' },
  { skill: 'Database queries', desc: 'Execute SQL or NoSQL queries against connected databases. Return structured results for LLM analysis.', example: 'Answer "what were our top 10 customers last quarter?" from CRM data.' },
  { skill: 'Email / messaging', desc: 'Send emails, Slack messages, calendar invites. Requires human-in-the-loop confirmation before use in production.', example: 'Draft and send a follow-up email after a meeting.' },
  { skill: 'Image generation', desc: 'Call DALL·E, Stable Diffusion, or Flux to create images. Return image URL for display or download.', example: 'Create a product mockup based on a text description.' },
  { skill: 'Browser / web automation', desc: 'Control a real browser via Playwright or Puppeteer. Fill forms, click buttons, scrape dynamic pages.', example: 'Log into a portal, extract a report, submit a form.' },
];

const SWARM_PATTERNS = [
  {
    pattern: 'Orchestrator-Worker',
    desc: 'A coordinator agent receives a task, decomposes it into sub-tasks, assigns each to a specialist worker agent, and aggregates results.',
    when: 'Complex tasks with separable parallel sub-tasks: research + analysis + writing in parallel.',
    risk: 'Coordination overhead; orchestrator LLM calls are expensive if the task is simple.',
  },
  {
    pattern: 'Supervisor-Agent',
    desc: 'A supervisor LLM monitors a primary agent\'s execution, reviews outputs at checkpoints, and redirects if the agent goes off-track.',
    when: 'Long-running agents where drift is a risk. Production workflows that need quality gates.',
    risk: 'Doubles or triples LLM cost. Latency increases.',
  },
  {
    pattern: 'Parallel specialist agents',
    desc: 'Multiple independent agents run the same or similar tasks simultaneously. Aggregate via voting, best-of-N selection, or merge.',
    when: 'Tasks with high variance outputs (code generation, creative writing) where quality improves with N attempts.',
    risk: 'Cost scales linearly with N. Merging diverse outputs is non-trivial.',
  },
  {
    pattern: 'Debate / adversarial',
    desc: 'One agent generates an answer; a second "critic" agent critiques it; the first revises. Iterate until convergence.',
    when: 'High-stakes decisions: legal analysis, code review, medical documentation.',
    risk: 'Very high cost. Risk of both agents reinforcing a shared error.',
  },
];

const FRAMEWORKS = [
  {
    name: 'LangChain',
    lang: 'Python / JS',
    strengths: 'Largest ecosystem. 100s of integrations. LCEL expression language. LangSmith for observability.',
    weaknesses: 'Abstraction overhead. Debugging complex chains is hard. Heavy dependency footprint.',
    bestFor: 'Teams familiar with it. Projects needing many pre-built integrations.',
    url: 'https://langchain.com',
  },
  {
    name: 'LlamaIndex',
    lang: 'Python',
    strengths: 'Best-in-class document ingestion and RAG pipelines. Strong indexing abstractions. Integrates with most vector DBs.',
    weaknesses: 'Less general than LangChain for non-RAG tasks. Smaller community.',
    bestFor: 'Knowledge base applications, document Q&A, enterprise RAG.',
    url: 'https://llamaindex.ai',
  },
  {
    name: 'AutoGen',
    lang: 'Python',
    strengths: 'Multi-agent conversation framework from Microsoft Research. Human-in-the-loop built-in. Good for research experiments.',
    weaknesses: 'Complex to configure. Production hardening still evolving.',
    bestFor: 'Multi-agent research, complex reasoning, academic exploration.',
    url: 'https://github.com/microsoft/autogen',
  },
  {
    name: 'CrewAI',
    lang: 'Python',
    strengths: 'Role-based agent crews. Clean YAML config. Good for structured team-of-agents workflows.',
    weaknesses: 'Less flexible than raw tool use. Opinionated structure.',
    bestFor: 'Well-defined team workflows: researcher + writer + reviewer crews.',
    url: 'https://crewai.com',
  },
  {
    name: 'Anthropic SDK',
    lang: 'Python / TypeScript',
    strengths: 'Native Claude integration. Managed Agents API (server-side loop). MCP support. Tool Runner for automatic loop handling.',
    weaknesses: 'Claude-only. Less community content vs LangChain.',
    bestFor: 'Production Claude deployments. Managed Agents for server-hosted loops.',
    url: 'https://docs.anthropic.com',
  },
  {
    name: 'Semantic Kernel',
    lang: 'C# / Python',
    strengths: 'Deep Microsoft ecosystem integration. Azure OpenAI. Strong enterprise .NET patterns.',
    weaknesses: 'Python version lags C#. Heavy for non-enterprise use cases.',
    bestFor: 'Enterprise .NET / Azure applications. Teams in Microsoft ecosystem.',
    url: 'https://github.com/microsoft/semantic-kernel',
  },
];

export default function AIConceptsAgents() {
  return (
    <PageWrapper
      badge="Page 41 — AI Model Concepts"
      title="Agents & Orchestration"
      subtitle="The agent loop, harness architecture, tools and skills, multi-agent swarms, and the leading orchestration frameworks — for practitioners building autonomous AI systems."
      sections={SECTIONS}
    >
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">What is an Agent</h2>
        <p className="text-slate-500 text-sm mb-5">An AI agent is a system that uses an LLM to autonomously plan and execute multi-step tasks — selecting and calling tools, observing results, and iterating until a goal is achieved. Unlike a single LLM call, an agent loop can run for many steps with real-world side effects.</p>
        <div className="card bg-indigo-50 border-indigo-200 text-indigo-800 text-sm mb-5">
          <strong>Definition:</strong> Agent = LLM + tools + memory + harness (loop controller). Each component is necessary. An LLM alone is not an agent; it needs tools to act and a harness to loop.
        </div>
        <div className="space-y-3">
          {AGENT_COMPONENTS.map((c) => (
            <div key={c.component} className="card flex gap-4 items-start">
              <span className="font-bold text-indigo-600 w-24 flex-shrink-0 text-sm">{c.component}</span>
              <p className="text-sm text-slate-500">{c.role}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">The Agent Loop</h2>
        <p className="text-slate-500 text-sm mb-5">Also called the ReAct loop (Reason + Act). The fundamental pattern underlying all agent frameworks. Each iteration: observe → think → act → observe result → repeat.</p>
        <div className="space-y-3 mb-5">
          {LOOP_STEPS.map((s) => (
            <div key={s.n} className="card flex gap-4 items-start">
              <div className={`w-7 h-7 rounded-full ${s.color} font-bold text-sm flex items-center justify-center flex-shrink-0`}>{s.n}</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-slate-900 text-slate-300 font-mono text-xs">
          <p className="text-slate-400 mb-1"># Pseudocode: agent loop</p>
          <p>messages = [system_prompt, user_message]</p>
          <p>while True:</p>
          <p>    response = llm.call(messages, tools=TOOLS)</p>
          <p>    if response.stop_reason == "end_turn":</p>
          <p>        return response.text  # done</p>
          <p>    tool_result = execute(response.tool_call)</p>
          <p>    messages.append(response)</p>
          <p>    messages.append(tool_result)</p>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Harness & Orchestration</h2>
        <p className="text-slate-500 text-sm mb-4">The harness is the code (or service) that runs the agent loop. It handles everything the LLM itself cannot: tool execution, error recovery, context management, and observability.</p>
        <div className="space-y-3">
          {HARNESS_CONCERNS.map((c) => (
            <div key={c.concern} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.concern}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-amber-50 border-amber-200 text-amber-800 text-sm">
          <strong>Anthropic Managed Agents:</strong> A hosted harness — Anthropic runs the loop on their servers, provides a per-session container for tool execution, and exposes SSE events. Eliminates the need to build harness infrastructure. See the Anthropic API page for details.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Skills & Tools</h2>
        <p className="text-slate-500 text-sm mb-4">Skills are modular, reusable capabilities attached to an agent. Each skill is a function the LLM can call, described via JSON schema. The LLM decides when and how to use them.</p>
        <div className="space-y-3">
          {SKILLS_LIST.map((s) => (
            <div key={s.skill} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-800 mb-1 text-sm">{s.skill}</h3>
                  <p className="text-sm text-slate-500 mb-1.5">{s.desc}</p>
                  <p className="text-xs text-indigo-600"><strong>Example:</strong> {s.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Swarms & Multi-Agent</h2>
        <p className="text-slate-500 text-sm mb-5">Multi-agent systems use multiple LLM instances working together — each specialised for a role. More powerful for complex tasks but significantly more expensive and complex to orchestrate. Use only when single-agent approaches are insufficient.</p>
        <div className="space-y-4">
          {SWARM_PATTERNS.map((p) => (
            <div key={p.pattern} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{p.pattern}</h3>
              <p className="text-sm text-slate-500 mb-3">{p.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50 rounded-lg px-3 py-2">
                  <p className="font-semibold text-emerald-700 mb-0.5">When to use</p>
                  <p className="text-slate-600">{p.when}</p>
                </div>
                <div className="bg-red-50 rounded-lg px-3 py-2">
                  <p className="font-semibold text-red-600 mb-0.5">Risk</p>
                  <p className="text-slate-600">{p.risk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Frameworks Comparison</h2>
        <p className="text-slate-500 text-sm mb-5">You don't need a framework — the agent loop above is ~10 lines of code. Frameworks add value for: pre-built tool integrations, observability, and common patterns. Add them only if the default tooling doesn't meet your needs.</p>
        <div className="space-y-4">
          {FRAMEWORKS.map((f) => (
            <div key={f.name} className="card">
              <div className="flex items-start gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-800">{f.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono">{f.lang}</span>
                  </div>
                  <p className="text-xs text-indigo-500 hover:underline">
                    <a href={f.url} target="_blank" rel="noopener noreferrer">{f.url} ↗</a>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mt-2">
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="font-semibold text-emerald-700 mb-1">Strengths</p>
                  <p className="text-slate-600">{f.strengths}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="font-semibold text-red-600 mb-1">Weaknesses</p>
                  <p className="text-slate-600">{f.weaknesses}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="font-semibold text-blue-700 mb-1">Best for</p>
                  <p className="text-slate-600">{f.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-indigo-50 border-indigo-200 text-indigo-800 text-sm">
          <strong>Recommendation:</strong> Start with the raw Anthropic or OpenAI SDK. Build the loop yourself the first time — you'll understand what frameworks are abstracting. Add LangChain or LlamaIndex once you need their pre-built integrations to save time.
        </div>
      </section>
    </PageWrapper>
  );
}
