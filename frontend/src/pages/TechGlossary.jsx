import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 'A', title: 'A – C', level: 2 },
  { id: 'D', title: 'D – F', level: 2 },
  { id: 'G', title: 'G – L', level: 2 },
  { id: 'M', title: 'M – P', level: 2 },
  { id: 'R', title: 'R – T', level: 2 },
  { id: 'V', title: 'V – Z', level: 2 },
];

const TERMS = [
  // A
  { term: 'AGI (Artificial General Intelligence)', category: 'A', def: 'A hypothetical form of AI capable of performing any intellectual task a human can. Does not yet exist. Distinct from the narrow AI in use today.' },
  { term: 'AI (Artificial Intelligence)', category: 'A', def: 'Software that learns from data to perform tasks that previously required human intelligence — understanding language, recognising patterns, making decisions, generating content.' },
  { term: 'AI Agent', category: 'A', def: 'An AI system that can take autonomous multi-step actions — using tools, calling APIs, browsing the web, and completing tasks with minimal human supervision.' },
  { term: 'API (Application Programming Interface)', category: 'A', def: 'A way for software to communicate. AI APIs allow your systems to send data to an AI model and receive outputs — the plumbing behind most AI integrations.' },
  { term: 'Attention Mechanism', category: 'A', def: 'The core innovation in Transformer models. Allows every part of an input to "attend to" (relate to) every other part — enabling understanding of long-range context in text.' },
  { term: 'Automation Bias', category: 'A', def: 'The tendency to over-trust AI outputs without critical review. A significant risk when AI is deployed in decision-making workflows without appropriate human oversight.' },
  // B
  { term: 'Benchmark', category: 'B', def: 'A standardised test used to compare AI model performance. Common benchmarks include MMLU (knowledge), HumanEval (coding), and HELM (general capability). Useful for model selection but not always representative of real-world performance.' },
  { term: 'Bias (AI Bias)', category: 'B', def: 'Systematic errors in AI outputs caused by biases in training data or model design. Can result in discriminatory outcomes in hiring, lending, or law enforcement applications.' },
  // C
  { term: 'Chain of Thought (CoT)', category: 'C', def: 'A prompting technique that instructs an AI to reason step-by-step before giving a final answer. Significantly improves accuracy on complex reasoning tasks.' },
  { term: 'Claude', category: 'C', def: 'A family of large language models developed by Anthropic. Known for long-context capability, nuanced reasoning, and safety focus. Available via API and as consumer product.' },
  { term: 'Computer Vision', category: 'C', def: 'AI that understands and interprets images and video — identifying objects, reading text, detecting anomalies, and tracking movement.' },
  { term: 'Context Window', category: 'C', def: 'The maximum amount of text (measured in tokens) an LLM can process in a single call. Determines the length of documents the model can read at once. Larger is generally better for enterprise use cases.' },
  // D
  { term: 'Deep Learning', category: 'D', def: 'A subset of machine learning using neural networks with many layers. The technology behind modern LLMs, image recognition, and speech AI.' },
  { term: 'Diffusion Model', category: 'D', def: 'A type of generative AI that creates images by learning to reverse a process of gradually adding noise to images. Underpins image generation tools like Midjourney, DALL-E, and Stable Diffusion.' },
  // E
  { term: 'Embedding', category: 'E', def: 'A numerical representation of text (or images/audio) in a high-dimensional vector space. Semantically similar content has similar embeddings — enabling meaning-based search rather than keyword matching.' },
  { term: 'Enterprise AI', category: 'E', def: 'AI deployed within organisational workflows to generate business value. Distinguished from consumer AI by requirements for governance, security, auditability, and integration with existing systems.' },
  // F
  { term: 'Few-shot Prompting', category: 'F', def: 'Providing 2–5 examples in a prompt to show the AI the desired output format or style. More reliable than describing the format in words alone.' },
  { term: 'Fine-tuning', category: 'F', def: 'Further training a pre-trained model on a smaller, domain-specific dataset to adjust its behaviour, style, or knowledge. Expensive compared to prompting but produces more consistent results for narrow use cases.' },
  { term: 'Foundation Model', category: 'F', def: 'A large AI model trained on broad data that can be adapted to many tasks. GPT-4, Claude, and Gemini are foundation models — the base layer that other AI applications are built on.' },
  { term: 'Frontier Model', category: 'F', def: 'The most capable AI models at any given time — representing the current frontier of AI capability. As of 2025: GPT-4o, Claude 3.5, Gemini Ultra.' },
  // G
  { term: 'Generative AI', category: 'G', def: 'AI that creates new content — text, images, code, audio, video — rather than just classifying or analysing existing content. The category includes LLMs and diffusion models.' },
  { term: 'GPT (Generative Pre-trained Transformer)', category: 'G', def: 'OpenAI\'s family of large language models. GPT-3 (2020) was the first widely accessible LLM. GPT-4 (2023) is a leading frontier model used in ChatGPT and the Microsoft Copilot ecosystem.' },
  { term: 'GPU (Graphics Processing Unit)', category: 'G', def: 'Specialised hardware ideal for the matrix mathematics required in AI training and inference. NVIDIA GPUs are the dominant platform for AI compute.' },
  // H
  { term: 'Hallucination', category: 'H', def: 'When an LLM generates plausible-sounding but factually incorrect information with apparent confidence. Caused by the model predicting probable token sequences rather than retrieving verified facts. A key reason human review of AI outputs remains important.' },
  { term: 'Human-in-the-Loop (HITL)', category: 'H', def: 'A deployment model where humans review or approve AI outputs before they take effect. Reduces risk from AI errors. Essential for high-stakes decisions; less important for low-risk, high-volume automation.' },
  // I
  { term: 'Inference', category: 'I', def: 'The process of using a trained AI model to make predictions or generate outputs. Inference is what happens every time you send a prompt to an LLM — fast and relatively cheap compared to training.' },
  { term: 'In-context Learning', category: 'I', def: 'An LLM\'s ability to learn from examples provided within the prompt itself — without any retraining. The basis for few-shot prompting.' },
  // L
  { term: 'Latency', category: 'L', def: 'The time between sending a prompt and receiving the first token of output. Typically 0.5–5 seconds for production LLM calls. Relevant for real-time user-facing applications.' },
  { term: 'LLM (Large Language Model)', category: 'L', def: 'A type of foundation model trained on massive text datasets to understand and generate language. The technology behind ChatGPT, Claude, Gemini, and most enterprise AI assistants in 2024–25.' },
  { term: 'LLMOps', category: 'L', def: 'The operational practices for deploying and maintaining LLM-based applications in production — monitoring, evaluation, versioning, cost management, and safety.' },
  // M
  { term: 'Machine Learning (ML)', category: 'M', def: 'A subset of AI in which systems learn from data rather than following explicit programming rules. Deep learning and LLMs are advanced forms of machine learning.' },
  { term: 'Model Drift', category: 'M', def: 'Degradation in AI model performance over time as the real world changes but the model\'s training data becomes outdated. Requires monitoring and periodic model refresh.' },
  { term: 'Multimodal AI', category: 'M', def: 'AI that processes multiple types of input — text, images, audio, video — within a single model. Leading multimodal models in 2025: GPT-4o, Claude 3 (with vision), Gemini.' },
  // N
  { term: 'Natural Language Processing (NLP)', category: 'N', def: 'The field of AI focused on understanding and generating human language. LLMs are the current state-of-the-art in NLP.' },
  { term: 'Neural Network', category: 'N', def: 'A computational architecture loosely inspired by the human brain, consisting of layers of interconnected "neurons" (mathematical functions). Deep neural networks with many layers underpin modern AI.' },
  // O
  { term: 'Orchestration', category: 'O', def: 'Managing the flow of data and actions across multiple AI models, tools, and systems. Orchestration frameworks (LangChain, LlamaIndex) handle complex multi-step AI workflows.' },
  // P
  { term: 'Parameters', category: 'P', def: 'The numerical weights in a neural network — the "knowledge" stored in the model. GPT-3 has 175 billion parameters; GPT-4 is estimated at 1+ trillion. More parameters ≠ always better — model architecture and training quality matter more.' },
  { term: 'Prompt', category: 'P', def: 'The input text (instruction, question, or context) sent to an AI model to elicit a response. Prompt quality significantly affects output quality.' },
  { term: 'Prompt Engineering', category: 'P', def: 'The practice of designing effective prompts to elicit accurate, useful AI outputs. A high-value skill that does not require programming knowledge.' },
  { term: 'Prompt Injection', category: 'P', def: 'A security attack in which malicious instructions are embedded in user inputs to manipulate an AI system\'s behaviour. Relevant for AI applications that process external, user-provided content.' },
  // R
  { term: 'RAG (Retrieval-Augmented Generation)', category: 'R', def: 'An architecture that enhances LLMs by retrieving relevant documents from a knowledge base and providing them as context before generating a response. Enables LLMs to answer from proprietary data without retraining.' },
  { term: 'RLHF (Reinforcement Learning from Human Feedback)', category: 'R', def: 'A training technique in which human raters rank model outputs, and the model is further trained to prefer higher-rated responses. Used to align LLMs with human preferences for helpfulness and safety.' },
  // S
  { term: 'System Prompt', category: 'S', def: 'Instructions given to an LLM at the start of a conversation (often invisible to end users) that define its role, behaviour, and constraints. The foundation of every commercial AI product.' },
  // T
  { term: 'Temperature', category: 'T', def: 'A parameter controlling the randomness of LLM outputs. Low temperature (0–0.3): deterministic, consistent. High temperature (0.7–1.0): creative, varied. Production deployments typically use low temperature.' },
  { term: 'Token', category: 'T', def: 'The unit of text an LLM processes — roughly a word fragment. "Tokenisation" is the process of converting text to tokens. API pricing is per-token. 1,000 tokens ≈ 750 words.' },
  { term: 'Transformer', category: 'T', def: 'The neural network architecture underlying all modern LLMs, introduced in the Google paper "Attention Is All You Need" (2017). The core innovation was the "attention mechanism" enabling models to understand long-range context.' },
  { term: 'Transfer Learning', category: 'T', def: 'The technique of taking a model trained on one task and adapting it for another. Foundation models are trained on broad tasks and transfer-learned (fine-tuned) for specific applications.' },
  // V
  { term: 'Vector Database', category: 'V', def: 'A database designed to store and search embeddings (numerical representations of text/images). Used in RAG systems to retrieve semantically relevant content at speed. Examples: Pinecone, Weaviate, pgvector.' },
  { term: 'Vibe Coding', category: 'V', def: 'Informal term for using LLMs to write code via natural language instructions, without deep technical understanding of the code produced. Accessible but requires careful validation.' },
  // Z
  { term: 'Zero-shot Prompting', category: 'Z', def: 'Asking an LLM to perform a task without providing any examples — relying on the model\'s general training. Contrast with few-shot prompting, which provides examples.' },
];

const GROUP_MAP = {
  'A': 'A',  'B': 'A',  'C': 'A',
  'D': 'D',  'E': 'D',  'F': 'D',
  'G': 'G',  'H': 'G',  'I': 'G',  'L': 'G',
  'M': 'M',  'N': 'M',  'O': 'M',  'P': 'M',
  'R': 'R',  'S': 'R',  'T': 'R',
  'V': 'V',  'Z': 'V',
};

const GROUP_LABELS = { 'A': 'A – C', 'D': 'D – F', 'G': 'G – L', 'M': 'M – P', 'R': 'R – T', 'V': 'V – Z' };

export default function TechGlossary() {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? TERMS.filter(t =>
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.def.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const grouped = {};
  TERMS.forEach(t => {
    const g = GROUP_MAP[t.category];
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(t);
  });

  return (
    <PageWrapper
      badge="Page 22 — Technology of AI"
      title="Glossary of AI Terms"
      subtitle="Every AI term used across this dashboard — defined in plain language for business leaders. Search or browse by section."
      sections={SECTIONS}
    >
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search terms…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input text-base py-3"
        />
        {search && (
          <p className="text-xs text-slate-400 mt-2">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
          </p>
        )}
      </div>

      {/* Search results */}
      {filtered ? (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-slate-400 text-center py-10">No terms found for "{search}"</p>
          ) : filtered.map(t => (
            <div key={t.term} className="card">
              <p className="font-bold text-slate-800 mb-1">{t.term}</p>
              <p className="text-sm text-slate-500">{t.def}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Grouped view */
        Object.entries(grouped).map(([groupKey, terms]) => (
          <section key={groupKey} id={groupKey} className="section-anchor mb-10">
            <h2 className="mb-4">{GROUP_LABELS[groupKey]}</h2>
            <div className="space-y-3">
              {terms.map(t => (
                <div key={t.term} className="card">
                  <p className="font-bold text-slate-800 mb-1">{t.term}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{t.def}</p>
                </div>
              ))}
            </div>
            {groupKey !== 'V' && <div className="section-divider" />}
          </section>
        ))
      )}
    </PageWrapper>
  );
}
