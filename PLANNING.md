# Dashboard Planning Document

> Track planned sections, page assignments, and content scope before implementation.

---

## Planned Sections

### 1 · Top AI Labs  *(new nav group — insert after "Executive Insights")*

**Nav group label:** `Top AI Labs`  
**Page routes:** `/p35` – `/p38`

Each page uses a **tabbed layout** (one tab per lab entity or sub-topic). Each tab shows: overview blurb, flagship products/APIs, pricing model notes, notable capabilities, and links to docs.

| Route | Page title | Tabs |
|-------|-----------|------|
| `/p35` | OpenAI | GPT models · DALL·E · Whisper · Sora · Assistants API · Fine-tuning · Operator |
| `/p36` | Anthropic | Claude model family · Claude design philosophy · Constitutional AI · Claude.ai · API & SDK · Claude Code |
| `/p37` | Google | Gemini models · Gemma (open) · NotebookLM · Google AI Studio · Vertex AI · DeepMind research |
| `/p38` | Chinese Labs | DeepSeek (R2, V3) · Qwen (Alibaba) · Kimi (Moonshot) · Baidu ERNIE · MiniMax · Open-source releases |

**Content notes per page:**
- **OpenAI `/p35`**: GPT-4o, o1/o3 reasoning models; Assistants + Responses API; image/audio/video gen; fine-tuning; operator/user tier; upcoming Stargate infra.
- **Anthropic `/p36`**: Opus/Sonnet/Haiku family; Claude design — Constitutional AI, helpful/harmless/honest; extended thinking (adaptive); Claude Code CLI; MCP (Model Context Protocol); Prompt caching; Citations.
- **Google `/p37`**: Gemini 2.x family (Flash/Pro/Ultra); Gemma open-weights; 2M-token context; NotebookLM; Imagen/Veo; Vertex AI enterprise; Google Search grounding.
- **Chinese Labs `/p38`**: DeepSeek R2 — strong reasoning at low cost; Qwen 2.5 open-weights; Kimi long-context; comparative benchmark table; open-source contribution highlights; geopolitical/compliance notes.

---

### 2 · AI Model Concepts  *(new nav group — insert after "Top AI Labs")*

**Nav group label:** `AI Model Concepts`  
**Page routes:** `/p39` – `/p41` *(group conceptually related topics)*

| Route | Page title | Content |
|-------|-----------|---------|
| `/p39` | How LLMs Work | Tokenisation · Chunking · Embeddings · Context window · Temperature & sampling · Karpathy LLM intro reference |
| `/p40` | Retrieval & Memory | RAG (Retrieval-Augmented Generation) · Vector databases · Chunking strategies · Hybrid search · Re-ranking · Memory types (in-context / external / parametric) |
| `/p41` | Agents & Orchestration | Harness concept · OpenClaw (as an orchestration concept) · Agents · Skills · Swarms · Frameworks (LangChain / LlamaIndex / AutoGen / CrewAI / Claude SDK) |

**Content notes per page:**

#### `/p39` — How LLMs Work
- **Tokenisation**: BPE, tokens vs words, why token count matters, token cost implications
- **Chunking**: splitting documents for embedding; chunk size trade-offs; overlap strategies
- **Embeddings**: high-dimensional vectors; similarity search; why they enable semantic retrieval
- **Context window**: what fits, what doesn't; positional vs recency effects; 1M+ windows
- **Karpathy LLM wiki**: link + summary of Andrej Karpathy's "Let's build GPT" and LLM explainer resources

#### `/p40` — Retrieval & Memory
- **RAG**: retrieve → augment → generate; why static knowledge isn't enough; enterprise RAG patterns
- **Vector databases**: Pinecone, Weaviate, Chroma, pgvector; ANN search
- **Chunking strategies**: fixed-size, recursive, semantic, parent-document; pros/cons table
- **Hybrid search**: BM25 + vector; re-ranking with cross-encoders
- **Memory types**: in-context (current window) · external (vector store / DB) · parametric (fine-tuned into weights)

#### `/p41` — Agents & Orchestration
- **Harness**: the execution environment / scaffolding that runs an agent loop; controls tool calls, retries, context management
- **RAG** *(cross-reference from p40)*: retrieval as a tool within agent loops
- **OpenClaw**: open-source orchestration concept — composable agent pipelines; describe the concept without referencing a specific product if IP-sensitive
- **Agents**: autonomous LLM + tool-use loop; planning → action → observation cycle; ReAct pattern
- **Skills**: modular, reusable capabilities attached to an agent (web search, code exec, image gen)
- **Swarms**: multi-agent coordination; parallel specialised agents; orchestrator vs worker pattern; cost vs accuracy trade-offs
- **Frameworks comparison table**:

| Framework | Language | Strengths | Best for |
|-----------|----------|-----------|----------|
| LangChain | Python/JS | Large ecosystem, many integrations | General-purpose RAG + chains |
| LlamaIndex | Python | Document ingestion, RAG pipelines | Knowledge base applications |
| AutoGen | Python | Multi-agent conversations | Research, complex reasoning |
| CrewAI | Python | Role-based agent crews | Structured team workflows |
| Claude SDK (Anthropic) | Python/TS | Native Claude, MCP, Managed Agents | Production Claude deployments |
| Semantic Kernel | C#/Python | Microsoft ecosystem | Enterprise .NET integration |

---

## Implementation Checklist

### Top AI Labs
- [ ] Create `frontend/src/pages/AILabsOpenAI.jsx` (`/p35`)
- [ ] Create `frontend/src/pages/AILabsAnthropic.jsx` (`/p36`)
- [ ] Create `frontend/src/pages/AILabsGoogle.jsx` (`/p37`)
- [ ] Create `frontend/src/pages/AILabsChinese.jsx` (`/p38`)
- [ ] Add routes to `frontend/src/App.jsx`
- [ ] Add "Top AI Labs" nav group to `frontend/src/components/LeftSidebar.jsx` (after "Executive Insights")

### AI Model Concepts
- [ ] Create `frontend/src/pages/AIConceptsLLM.jsx` (`/p39`)
- [ ] Create `frontend/src/pages/AIConceptsRAG.jsx` (`/p40`)
- [ ] Create `frontend/src/pages/AIConceptsAgents.jsx` (`/p41`)
- [ ] Add routes to `frontend/src/App.jsx`
- [ ] Add "AI Model Concepts" nav group to `frontend/src/components/LeftSidebar.jsx` (after "Top AI Labs")

### Design pattern
All new pages should follow the existing visual convention:
- Hero section: section badge + `<h1>` heading + subtitle paragraph
- Tab bar: pill-style tabs matching `ConsultBCG.jsx` or `TechCategories.jsx` pattern
- Content cards: white background, `rounded-2xl`, `shadow-sm`, `border border-slate-100`
- Accent colours: AI Labs → use per-brand colours (OpenAI black, Anthropic amber, Google blue/red/yellow, neutral for Chinese labs); Concepts → slate/violet
- No external image dependencies unless using stable CDN URLs

---

## Notes & Open Questions

- **Chinese labs page**: include a neutral "geopolitical context" note (data residency, export controls, open-source vs closed) without editorialising
- **Karpathy reference on `/p39`**: link to `karpathy.ai` and his YouTube series; describe the concepts rather than copy content
- **OpenClaw on `/p41`**: treat as a conceptual pattern (open, composable, claw-like multi-tool) rather than a named product — confirm with user if this refers to a specific project
- **Page numbering**: next available route after existing pages is `/p35`; Chinese labs could be split into two pages if content warrants it (e.g., DeepSeek deep-dive as `/p38b`)
