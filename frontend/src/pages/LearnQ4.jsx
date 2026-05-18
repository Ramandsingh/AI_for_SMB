import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Months 10–11: LLMs & Prompt Engineering', level: 2 },
  { id: 's2', title: 'Month 12: MLOps & Production Deployment',  level: 2 },
  { id: 's3', title: 'Agentic Frameworks',                        level: 2 },
  { id: 's4', title: 'Ethical Guardrails',                        level: 2 },
  { id: 's5', title: 'Recommended Resources',                     level: 2 },
  { id: 's6', title: 'Capstone Project',                          level: 2 },
];

const PROMPTING_TECHNIQUES = [
  {
    technique: 'Zero-shot',
    desc: 'Ask the model to perform a task directly with no examples. Works for general tasks where the model has broad training coverage.',
    example: 'Classify the sentiment of this review as Positive, Neutral, or Negative: "The product broke after two days."',
    best: 'Simple, well-defined tasks. General classification, summarisation, translation.',
  },
  {
    technique: 'Few-shot',
    desc: 'Provide 2–5 examples of input/output pairs before your actual query. Dramatically improves accuracy on specialised or unusual formats.',
    example: 'Q: "Great product!" → A: Positive\nQ: "Stopped working." → A: Negative\nQ: "It\'s okay." → A:',
    best: 'Domain-specific classification, unusual output formats, structured extraction.',
  },
  {
    technique: 'Chain-of-Thought (CoT)',
    desc: 'Ask the model to reason step by step before answering. "Let\'s think step by step." Significantly improves accuracy on maths, logic, and multi-step reasoning.',
    example: 'Solve this step by step: If a train travels 120km in 2 hours, and then 90km in 1.5 hours, what is the average speed for the whole journey?',
    best: 'Maths problems, logical reasoning, complex decisions with multiple factors.',
  },
  {
    technique: 'System prompt engineering',
    desc: 'The system prompt sets the model\'s role, tone, output format, and constraints. It is the most powerful lever you have as a developer — invest heavily in it.',
    example: 'You are a concise, expert data analyst. Always respond in valid JSON. If you cannot answer from the provided context, return {"answer": null, "reason": "..."} rather than guessing.',
    best: 'Production applications. Sets consistent behaviour across all user interactions.',
  },
  {
    technique: 'RAG (Retrieval-Augmented Generation)',
    desc: 'Inject relevant context chunks from a vector database into the prompt before generating. Grounds answers in your own documents without fine-tuning.',
    example: 'Context: [retrieved document chunks]\n\nBased only on the context above, answer: {user question}',
    best: 'Knowledge base Q&A, document analysis, factual applications where hallucination is unacceptable.',
  },
];

const LLMOPS_STACK = [
  { layer: 'Inference API', tools: 'Anthropic API, OpenAI API, Together.ai, Groq', desc: 'Call frontier or open-source models. Choose based on latency, cost, and capability requirements.' },
  { layer: 'Orchestration', tools: 'LangChain, LlamaIndex, raw SDK', desc: 'Chain LLM calls, manage context, connect tools. Start raw — add frameworks when complexity justifies them.' },
  { layer: 'Vector store', tools: 'pgvector, Chroma, Pinecone, Weaviate', desc: 'Store embeddings for RAG. pgvector is simplest if you\'re already on Postgres.' },
  { layer: 'API layer', tools: 'FastAPI, Flask', desc: 'Expose your LLM logic as HTTP endpoints. FastAPI is the standard for async Python services.' },
  { layer: 'Containerisation', tools: 'Docker, Docker Compose', desc: 'Package your app + dependencies into a portable container. Essential for reproducible deployments.' },
  { layer: 'Observability', tools: 'LangSmith, Weights & Biases, custom logging', desc: 'Log every LLM call: prompt, response, latency, cost, tokens. You cannot debug what you cannot observe.' },
  { layer: 'Deployment', tools: 'AWS ECS/Lambda, Azure Container Apps, Fly.io', desc: 'Run your Docker container in the cloud. Serverless options simplify scaling; dedicated instances give more control.' },
];

const FASTAPI_CODE = `from fastapi import FastAPI
from anthropic import Anthropic
from pydantic import BaseModel

app = FastAPI()
client = Anthropic()

class ChatRequest(BaseModel):
    message: str
    context: str = ""

@app.post("/api/chat")
async def chat(req: ChatRequest):
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        system="You are a helpful assistant. Answer only using the provided context.",
        messages=[
            {"role": "user", "content": f"Context: {req.context}\\n\\n{req.message}"}
        ]
    )
    return {"reply": response.content[0].text}`;

const DOCKER_CODE = `# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# docker-compose.yml
version: "3.9"
services:
  api:
    build: .
    ports: ["8000:8000"]
    env_file: .env
  db:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret`;

const AGENT_FRAMEWORKS = [
  { name: 'LangChain', best: 'General RAG + chains', why: 'Largest ecosystem. LangSmith observability built-in. Good for teams that need many pre-built integrations.' },
  { name: 'LlamaIndex', best: 'Document RAG pipelines', why: 'Best document ingestion and indexing. Strong for knowledge base applications.' },
  { name: 'CrewAI', best: 'Structured multi-agent crews', why: 'Role-based crews with clear responsibilities. YAML config keeps pipelines readable.' },
  { name: 'Raw Anthropic SDK', best: 'Production Claude apps', why: 'Direct access to all API features (caching, extended thinking, citations). Anthropic\'s Tool Runner handles the loop.' },
];

const ETHICS_CHECKLIST = [
  { item: 'Bias audit', desc: 'Test model outputs across demographic groups. Measure disparate impact on classification tasks. Document findings.' },
  { item: 'Hallucination rate', desc: 'Measure how often the model fabricates facts. For RAG: compute faithfulness (does the answer contradict the context?) and relevance scores.' },
  { item: 'PII handling', desc: 'Identify if user inputs contain personal data. Implement redaction pipelines before sending to third-party APIs. Define data retention policies.' },
  { item: 'Output filtering', desc: 'Implement content safety checks on model outputs before displaying to users. For regulated industries: add compliance review layers.' },
  { item: 'Human oversight', desc: 'Define which decisions require human review. Any AI decision with material consequences (loan approval, medical triage, legal advice) needs a human in the loop.' },
  { item: 'Transparency', desc: 'Disclose to users when they are interacting with AI. Log all AI decisions for audit. Provide mechanisms for users to contest AI outputs.' },
];

const RESOURCES = [
  { title: 'Full Stack LLM Bootcamp (fullstackdeeplearning.com)', type: 'Course', free: true, desc: 'Production LLM application development. Covers prompting, RAG, agents, deployment, and evaluation.' },
  { title: 'Anthropic documentation (docs.anthropic.com)', type: 'Reference', free: true, desc: 'Best API reference for production Claude applications. Includes prompt engineering guide, cookbook, and model details.' },
  { title: 'FastAPI documentation (fastapi.tiangolo.com)', type: 'Reference', free: true, desc: 'Official FastAPI docs. Best Python API framework for async LLM backends.' },
  { title: 'Docker "Get Started" tutorial', type: 'Interactive', free: true, desc: 'Official Docker tutorial. Covers Dockerfile, compose, and deployment in ~2 hours.' },
  { title: 'LangSmith docs (smith.langchain.com)', type: 'Reference', free: true, desc: 'Observability for LLM applications. Free tier sufficient for learning and small projects.' },
  { title: 'The Alignment Forum (alignmentforum.org)', type: 'Reading', free: true, desc: 'In-depth discussion of AI safety, alignment, and ethics from researchers and practitioners.' },
];

export default function LearnQ4() {
  return (
    <PageWrapper
      badge="Learning Hub · Quarter 4"
      title="Generative AI, MLOps & Capstone Deployment"
      subtitle="Synthesise everything into a deployable production application. LLMs, prompt engineering, RAG, agents, FastAPI, Docker, and ethical guardrails. Months 10–12 · ~10–15 hrs/week."
      sections={SECTIONS}
    >
      <div className="card bg-amber-50 border-amber-200 text-amber-800 text-sm mb-8">
        <strong>Quarter goal:</strong> By the end of Q4 you should have a deployed, production-grade LLM application — a FastAPI backend with RAG, containerised with Docker, deployed to a cloud endpoint, with logging and basic ethical guardrails.
      </div>

      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Months 10–11: LLMs & Prompt Engineering</h2>
        <p className="text-slate-500 text-sm mb-5">Prompting is the primary interface for working with LLMs. The quality of your prompt engineering directly determines application quality — more than model choice in most cases.</p>
        <div className="space-y-4">
          {PROMPTING_TECHNIQUES.map((t) => (
            <div key={t.technique} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{t.technique}</h3>
              <p className="text-sm text-slate-500 mb-3">{t.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 rounded-lg px-3 py-2 text-slate-300 font-mono">
                  <p className="text-slate-500 mb-1">Example prompt:</p>
                  <p className="whitespace-pre-wrap">{t.example}</p>
                </div>
                <div className="bg-amber-50 rounded-lg px-3 py-2 text-amber-700">
                  <strong>Best for:</strong> {t.best}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Month 12: MLOps & Production Deployment</h2>
        <p className="text-slate-500 text-sm mb-4">MLOps is the practice of deploying, monitoring, and maintaining ML/AI systems in production. For LLM applications, the stack is simpler than traditional ML but has its own patterns.</p>
        <div className="space-y-2 mb-6">
          {LLMOPS_STACK.map((l) => (
            <div key={l.layer} className="card flex gap-4 items-start">
              <span className="font-bold text-amber-600 w-28 flex-shrink-0 text-sm">{l.layer}</span>
              <div>
                <p className="text-xs font-mono text-slate-500 mb-0.5">{l.tools}</p>
                <p className="text-sm text-slate-500">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-700 mb-3">FastAPI + Claude</h3>
        <div className="card bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto mb-4">
          <pre className="whitespace-pre">{FASTAPI_CODE}</pre>
        </div>

        <h3 className="font-bold text-slate-700 mb-3">Docker + Docker Compose</h3>
        <div className="card bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">{DOCKER_CODE}</pre>
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Agentic Frameworks</h2>
        <p className="text-slate-500 text-sm mb-4">Agentic AI — LLMs that use tools, plan, and iterate — is the frontier of practical AI in 2025. See the Agents & Orchestration page for full coverage; this section summarises framework choices for Q4 projects.</p>
        <div className="space-y-3">
          {AGENT_FRAMEWORKS.map((f) => (
            <div key={f.name} className="card flex gap-4 items-start">
              <span className="font-bold text-slate-800 w-28 flex-shrink-0 text-sm">{f.name}</span>
              <div>
                <p className="text-xs text-emerald-600 font-semibold mb-0.5">Best for: {f.best}</p>
                <p className="text-sm text-slate-500">{f.why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Ethical Guardrails</h2>
        <p className="text-slate-500 text-sm mb-4">Responsible AI is not a compliance checkbox — it is the difference between a system that helps people and one that harms them. Build these considerations in from the start.</p>
        <div className="space-y-3">
          {ETHICS_CHECKLIST.map((e) => (
            <div key={e.item} className="card flex gap-3 items-start">
              <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5 text-sm">{e.item}</h3>
                <p className="text-sm text-slate-500">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Recommended Resources</h2>
        <div className="space-y-3">
          {RESOURCES.map((r) => (
            <div key={r.title} className="card flex gap-4 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-slate-800 text-sm">{r.title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{r.type}</span>
                  {r.free && <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">Free</span>}
                </div>
                <p className="text-sm text-slate-500">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s6" className="section-anchor mb-10">
        <h2 className="mb-2">Capstone Project</h2>
        <div className="card bg-slate-50 border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">Production RAG Application</h3>
          <p className="text-sm text-slate-500 mb-4">Build and deploy a document Q&A application that a real user could interact with. Choose a domain you know well (legal, medical, technical docs, company knowledge base).</p>
          <div className="space-y-2 mb-5">
            {[
              'Ingest 20–50 documents: chunk, embed (text-embedding-3-small or voyage-3), and store in pgvector',
              'Build a FastAPI backend: POST /chat endpoint that retrieves top-5 chunks and calls Claude with context',
              'Add a simple React frontend (can reuse patterns from this dashboard)',
              'Implement streaming responses (SSE) so answers appear token-by-token',
              'Add citations: each answer must reference the source document and passage it used',
              'Containerise with Docker Compose (API + Postgres/pgvector)',
              'Deploy to a cloud provider (Fly.io, Railway, or AWS Fargate)',
              'Add logging: every request logged with prompt, response, latency, and token count',
              'Conduct a 30-minute user test and write a summary of what failed and what you would fix',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-slate-600">{step}</span>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
            <strong>Stretch goal:</strong> Replace the simple retrieval with a multi-step agent that can search the web for information not in your documents, compare multiple sources, and produce a cited summary.
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
