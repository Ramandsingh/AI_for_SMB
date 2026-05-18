import { NavLink } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Months 1–2: Python & Data Structures', level: 2 },
  { id: 's2', title: 'Month 3: Mathematics for AI',           level: 2 },
  { id: 's3', title: 'Recommended Resources',                 level: 2 },
  { id: 's4', title: 'Quarter 1 Project',                     level: 2 },
];

const PYTHON_TOPICS = [
  {
    topic: 'Core Python Syntax',
    to: '/learn/q1/python-syntax',
    months: 'Month 1',
    skills: ['Variables, data types, f-strings', 'Control flow: if/elif/else, for, while', 'Functions, *args, **kwargs, default params', 'List/dict/set comprehensions', 'Object-oriented programming: classes, inheritance, dunder methods', 'Error handling: try/except/finally'],
    project: 'Build a command-line to-do app with file persistence (JSON)',
    resources: ['Python.org official tutorial', 'Automate the Boring Stuff (free online)', 'Corey Schafer Python YouTube series'],
  },
  {
    topic: 'NumPy & Pandas',
    months: 'Month 1–2',
    skills: ['NumPy arrays vs Python lists — broadcasting, vectorisation', 'Array creation: zeros, ones, linspace, arange', 'Indexing, slicing, boolean masking', 'Pandas Series and DataFrame — creation, indexing (.loc, .iloc)', 'groupby, merge, pivot_table', 'Reading/writing CSV, Excel, JSON'],
    project: 'Load a Kaggle dataset, clean nulls, compute statistics, export a summary CSV',
    resources: ['NumPy quickstart guide (numpy.org)', 'Pandas docs 10-minute intro', '100 NumPy exercises (GitHub: rougier)'],
  },
  {
    topic: 'Algorithms & Complexity',
    months: 'Month 2',
    skills: ['Big-O notation: O(1), O(n), O(n²), O(log n)', 'Linear search vs binary search', 'Bubble sort, merge sort, quicksort', 'Hash tables — why dict lookups are O(1)', 'Recursion and the call stack', 'Basic graph traversal: BFS, DFS'],
    project: 'Implement merge sort and binary search from scratch; time them against built-ins',
    resources: ['CS50 Week 3 (free on edX)', 'Big-O Cheat Sheet (bigocheatsheet.com)', 'LeetCode Easy problems (10–15 problems)'],
  },
];

const MATH_TOPICS = [
  {
    topic: 'Linear Algebra',
    why: 'Used everywhere: neural network layers are matrix multiplications. Embeddings are vectors. PCA is an eigendecomposition.',
    concepts: [
      { term: 'Vectors', def: 'Ordered arrays of numbers. A word embedding is a vector. Operations: dot product, cosine similarity, magnitude.' },
      { term: 'Matrices', def: 'Grids of numbers. Linear layers in neural networks are matrix multiplications: output = W·x + b.' },
      { term: 'Matrix multiplication', def: 'The fundamental operation of deep learning. Shape rules: (m×k) · (k×n) → (m×n). The inner dimensions must match.' },
      { term: 'Transpose', def: 'Flip rows and columns. A^T. Used in attention: Attention = softmax(QK^T / √d).' },
      { term: 'Eigenvalues & eigenvectors', def: 'Used in PCA (dimensionality reduction). Av = λv — the vector that only scales under transformation.' },
    ],
    resources: ['3Blue1Brown Essence of Linear Algebra (YouTube — 15 videos, ~4 hours)', '\"Linear Algebra\" — Gilbert Strang MIT OpenCourseWare (free)'],
  },
  {
    topic: 'Calculus',
    why: 'Gradient descent — the algorithm that trains every ML model — is calculus. Understanding derivatives is understanding how models learn.',
    concepts: [
      { term: 'Derivative', def: 'Rate of change. f\'(x) = how much f changes when x changes. For neural networks: how much does the loss change when a weight changes?' },
      { term: 'Partial derivative', def: 'Derivative of a multi-variable function with respect to one variable, holding others constant. Neural networks have millions of weights — we compute ∂L/∂w for each.' },
      { term: 'Gradient', def: 'Vector of all partial derivatives. Points in the direction of steepest increase. We move opposite the gradient to minimise loss.' },
      { term: 'Chain rule', def: 'Derivative of a composite function: d/dx[f(g(x))] = f\'(g(x)) · g\'(x). This is backpropagation — how gradients flow backward through network layers.' },
    ],
    resources: ['3Blue1Brown Essence of Calculus (YouTube — 11 videos)', 'Khan Academy Multivariable Calculus (free)'],
  },
  {
    topic: 'Probability & Statistics',
    why: 'Models output probability distributions. Loss functions are rooted in probability theory. Understanding uncertainty is essential for evaluating model outputs.',
    concepts: [
      { term: 'Probability distributions', def: 'Describe how likely different outcomes are. Normal, Bernoulli, Categorical (softmax output is categorical). LLMs output a categorical distribution over tokens.' },
      { term: 'Bayes\' theorem', def: 'P(A|B) = P(B|A)·P(A) / P(B). Updates belief given evidence. Foundation of Bayesian ML and probabilistic reasoning.' },
      { term: 'Mean, variance, std dev', def: 'Describe the centre and spread of data. Normalisation (z-score) standardises features so gradient descent converges faster.' },
      { term: 'Cross-entropy loss', def: 'The standard loss for classification and language models. Measures how different the predicted distribution is from the true label. Lower = better.' },
    ],
    resources: ['StatQuest with Josh Starmer (YouTube — statistics playlist)', 'Think Bayes (free book, Green Tea Press)'],
  },
];

const RESOURCES = [
  { title: 'Python for Everybody (Coursera / Dr. Chuck)', type: 'Course', free: true, desc: 'Best beginner Python course. 5 courses, audit for free. No prior experience needed.' },
  { title: 'fast.ai Practical Deep Learning', type: 'Course', free: true, desc: 'Starts practical, goes theoretical. Best "top-down" approach. Use after completing Q1.' },
  { title: '3Blue1Brown (YouTube)', type: 'Video series', free: true, desc: 'Best visual explanations of linear algebra and calculus on the internet. Essential.' },
  { title: 'NumPy Documentation', type: 'Reference', free: true, desc: 'The official NumPy documentation has excellent beginner guides alongside the API reference.' },
  { title: 'Kaggle Learn (Python + Pandas)', type: 'Interactive', free: true, desc: 'Free micro-courses with inline Jupyter notebooks. Python and Pandas tracks are well-designed.' },
  { title: 'Mathematics for Machine Learning (Deisenroth et al.)', type: 'Textbook', free: true, desc: 'Free PDF on mml-book.com. Rigorous coverage of linear algebra, calculus, and probability for ML.' },
];

export default function LearnQ1() {
  return (
    <PageWrapper
      badge="Learning Hub · Quarter 1"
      title="Foundations of Programming & Mathematics"
      subtitle="Build the raw logical tools necessary to write, interpret, and debug machine learning source code. Months 1–3 · ~10–15 hrs/week."
      sections={SECTIONS}
    >
      <div className="card bg-blue-50 border-blue-200 text-blue-800 text-sm mb-8">
        <strong>Quarter goal:</strong> By the end of Q1 you should be able to write Python programs of 200–500 lines from scratch, manipulate datasets with NumPy and Pandas, and understand the mathematical operations that underpin ML algorithms.
      </div>

      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Months 1–2: Python & Data Structures</h2>
        <p className="text-slate-500 text-sm mb-5">Python is the language of AI research and production. Mastering it is non-negotiable. The NumPy and Pandas libraries handle almost all data manipulation in ML workflows.</p>
        <div className="space-y-5">
          {PYTHON_TOPICS.map((t) => (
            <div key={t.topic} className="card">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{t.topic}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">{t.months}</span>
                </div>
                {t.to && (
                  <NavLink
                    to={t.to}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Study this topic →
                  </NavLink>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Skills to acquire</p>
                  <ul className="space-y-1">
                    {t.skills.map((s) => (
                      <li key={s} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5 flex-shrink-0">·</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Mini project</p>
                    <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">{t.project}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Resources</p>
                    <ul className="space-y-0.5">
                      {t.resources.map((r) => (
                        <li key={r} className="text-xs text-slate-500">· {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Month 3: Mathematics for AI</h2>
        <p className="text-slate-500 text-sm mb-5">Many practitioners skip the maths and regret it later. These three areas — linear algebra, calculus, probability — appear constantly in ML papers, code, and debugging. One month is sufficient for a working understanding.</p>
        <div className="space-y-5">
          {MATH_TOPICS.map((m) => (
            <div key={m.topic} className="card">
              <h3 className="font-bold text-slate-800 mb-1">{m.topic}</h3>
              <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-3"><strong>Why it matters:</strong> {m.why}</p>
              <div className="space-y-2 mb-3">
                {m.concepts.map((c) => (
                  <div key={c.term} className="flex gap-3 items-start text-sm">
                    <span className="font-bold text-slate-700 w-36 flex-shrink-0">{c.term}</span>
                    <span className="text-slate-500">{c.def}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400">{m.resources.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
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

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Quarter 1 Project</h2>
        <p className="text-slate-500 text-sm mb-4">The Q1 capstone project should demonstrate Python fluency and data handling ability.</p>
        <div className="card bg-slate-50 border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">Exploratory Data Analysis (EDA) Report</h3>
          <p className="text-sm text-slate-500 mb-4">Choose any dataset from Kaggle (suggested: Titanic, House Prices, or a domain you care about). Produce a Python notebook that:</p>
          <div className="space-y-2">
            {[
              'Loads the dataset with Pandas and displays basic shape, types, and null counts',
              'Cleans the data: handle nulls, fix data types, remove or flag outliers',
              'Computes descriptive statistics: mean, median, std dev for all numerical columns',
              'Creates 5+ visualisations with matplotlib/seaborn: distributions, correlations, grouped comparisons',
              'Writes a 300-word markdown summary of the most interesting findings',
              'Saves a cleaned version of the dataset as a new CSV file',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-slate-600">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
