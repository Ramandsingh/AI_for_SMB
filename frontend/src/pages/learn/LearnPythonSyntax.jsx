import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'What is Python',        level: 2 },
  { id: 's2', title: 'Installation',          level: 2 },
  { id: 's3', title: 'Core Concepts',         level: 2 },
  { id: 's4', title: 'Knowledge Check',       level: 2 },
];

// ── Multiple-choice quiz data ────────────────────────────────────────────────
const MC_QUESTIONS = [
  {
    q: 'What is the output of type(3.14)?',
    code: 'print(type(3.14))',
    options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'number\'>'],
    answer: 1,
    explanation: '3.14 is a floating-point number. Python\'s float type represents all decimal numbers. int is for whole numbers, str for text.',
  },
  {
    q: 'Which of these is valid Python variable assignment?',
    options: ['x = 5;', 'x = 5', 'x := 5', 'var x = 5'],
    answer: 1,
    explanation: 'Python uses = for assignment with no semicolons required. The walrus operator := is for assignment expressions inside conditions, not standalone. var is JavaScript syntax.',
  },
  {
    q: 'What does range(3) produce when iterated?',
    code: 'for i in range(3):\n    print(i)',
    options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', 'Raises an error'],
    answer: 1,
    explanation: 'range(n) produces integers from 0 up to (but not including) n. range(3) → 0, 1, 2. To start at 1: range(1, 4).',
  },
  {
    q: 'What is the output of this code?',
    code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[-1])',
    options: ['"apple"', '"banana"', '"cherry"', 'IndexError'],
    answer: 2,
    explanation: 'Negative indexing counts from the end. fruits[-1] is the last element ("cherry"), fruits[-2] is "banana", etc. This is a common Python pattern.',
  },
  {
    q: 'Which creates a dictionary?',
    options: ['[1: "a", 2: "b"]', '{1, 2, 3}', '{1: "a", 2: "b"}', '(1: "a", 2: "b")'],
    answer: 2,
    explanation: '{1: "a", 2: "b"} is a dict — key:value pairs in curly braces. {1, 2, 3} is a set. (1, 2) is a tuple. [1, 2] is a list.',
  },
  {
    q: 'What does __init__ do in a Python class?',
    code: 'class Dog:\n    def __init__(self, name):\n        self.name = name',
    options: [
      'Destroys the object when done',
      'Imports the class from a module',
      'Initialises instance attributes when an object is created',
      'Makes the class printable',
    ],
    answer: 2,
    explanation: '__init__ is the constructor. It runs automatically when you call Dog("Rex"). self.name = name sets an instance attribute — each Dog object has its own name.',
  },
  {
    q: 'What does this list comprehension produce?',
    code: 'squares = [x**2 for x in range(5)]\nprint(squares)',
    options: ['[1, 4, 9, 16, 25]', '[0, 1, 4, 9, 16]', '[0, 1, 2, 3, 4]', '[1, 2, 3, 4, 5]'],
    answer: 1,
    explanation: 'range(5) produces 0,1,2,3,4. x**2 squares each: 0²=0, 1²=1, 2²=4, 3²=9, 4²=16. Result: [0, 1, 4, 9, 16].',
  },
];

// ── Open-ended questions ─────────────────────────────────────────────────────
const OE_QUESTIONS = [
  {
    q: 'Write a function called average that takes a list of numbers and returns their mean. Handle the case where the list is empty.',
    hint: 'Use sum() and len(). Think about what to return for an empty list.',
    answer: `def average(numbers):
    if not numbers:
        return 0  # or raise ValueError, or return None
    return sum(numbers) / len(numbers)

# Test it:
print(average([10, 20, 30]))  # → 20.0
print(average([]))            # → 0`,
    keyPoints: ['Check for empty list before dividing', 'sum() adds all elements', 'len() counts elements', 'Division always returns float in Python 3'],
  },
  {
    q: 'What is the difference between a list and a tuple in Python? Give an example of when you would choose each.',
    hint: 'Think about mutability — can the contents change after creation?',
    answer: `List: mutable — can add, remove, or change elements after creation.
Tuple: immutable — cannot be changed once created.

List example:
  shopping = ["milk", "eggs"]
  shopping.append("bread")  # OK — lists can grow

Tuple example:
  coordinates = (51.5074, -0.1278)  # London lat/lon
  # Never changes — immutable is safer and slightly faster

Choose list when: data will change (a queue, user inputs, results accumulating)
Choose tuple when: data is fixed (a coordinate pair, RGB colour, database row)`,
    keyPoints: ['List = mutable (can change)', 'Tuple = immutable (cannot change)', 'Tuples are slightly faster and use less memory', 'Tuples are hashable — can be dict keys; lists cannot'],
  },
  {
    q: 'Explain what self means in a Python method. Why does every instance method need it as the first parameter?',
    hint: 'Consider: if you have two Dog objects, how does Python know which dog\'s name to print?',
    answer: `self refers to the specific instance of the class that the method is being called on.

class Dog:
    def __init__(self, name):
        self.name = name       # self.name belongs to THIS dog

    def bark(self):
        print(f"{self.name} says woof!")  # which dog? self tells us

rex = Dog("Rex")
fido = Dog("Fido")
rex.bark()   # → "Rex says woof!"  (self = rex)
fido.bark()  # → "Fido says woof!" (self = fido)

Python automatically passes the instance as the first argument.
self is a convention — you could name it anything, but never do.`,
    keyPoints: ['self = the current instance', 'Python passes it automatically when you call instance.method()', 'self.attribute stores per-object data', 'Without self, methods would not know which object to work on'],
  },
];

// ── Concept cards ────────────────────────────────────────────────────────────
const CONCEPTS = [
  {
    title: 'Variables & Data Types',
    icon: '📦',
    color: 'border-blue-200 bg-blue-50',
    headerColor: 'text-blue-800',
    desc: 'Variables store values. Python is dynamically typed — you don\'t declare types, Python infers them.',
    code: `# Basic types
name = "Alice"        # str
age = 30              # int
score = 95.5          # float
is_active = True      # bool
nothing = None        # NoneType

# Check type
print(type(name))     # <class 'str'>
print(type(age))      # <class 'int'>

# Type conversion
x = int("42")         # str → int: 42
y = str(3.14)         # float → str: "3.14"
z = float("7")        # str → float: 7.0

# Collections
my_list  = [1, 2, 3]         # ordered, mutable
my_tuple = (1, 2, 3)         # ordered, immutable
my_set   = {1, 2, 3}         # unordered, unique
my_dict  = {"a": 1, "b": 2}  # key-value pairs`,
    notes: [
      'Python uses = for assignment, == for comparison',
      'None is Python\'s null — always use "is None", not "== None"',
      'f-strings: f"Hello {name}" — the preferred string formatting',
      'str/int/float/bool/None are the five primitive types',
    ],
  },
  {
    title: 'Control Flow',
    icon: '🔀',
    color: 'border-violet-200 bg-violet-50',
    headerColor: 'text-violet-800',
    desc: 'if/elif/else for decisions. for loops to iterate. while loops for conditions. break/continue for control.',
    code: `# if / elif / else
score = 82
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# for loop — iterate a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

# for loop — with range
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

# while loop
count = 0
while count < 3:
    print(count)
    count += 1

# break / continue
for n in range(10):
    if n == 3:
        continue    # skip 3
    if n == 7:
        break       # stop at 7
    print(n)        # prints 0,1,2,4,5,6`,
    notes: [
      'Python uses indentation (4 spaces) to define blocks — no braces',
      'enumerate(list) gives both index and value: for i, v in enumerate(list)',
      'zip(a, b) iterates two lists together in parallel',
      'Ternary: x = "yes" if condition else "no"',
    ],
  },
  {
    title: 'Functions',
    icon: '⚙️',
    color: 'border-emerald-200 bg-emerald-50',
    headerColor: 'text-emerald-800',
    desc: 'Functions are reusable blocks of code. Python functions are first-class — they can be assigned to variables and passed as arguments.',
    code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Default parameters
def power(base, exponent=2):
    return base ** exponent

print(power(3))      # 9  (exponent defaults to 2)
print(power(2, 10))  # 1024

# *args — variable positional arguments
def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3, 4))  # 10

# **kwargs — variable keyword arguments
def profile(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

profile(name="Alice", age=30, city="London")

# Lambda — anonymous one-line function
square = lambda x: x ** 2
numbers = [3, 1, 4, 1, 5]
numbers.sort(key=lambda x: -x)  # sort descending`,
    notes: [
      'Functions without a return statement return None',
      'Python passes by object reference — mutating a list inside a function changes the original',
      'Decorators (@decorator) wrap functions — used for logging, timing, authentication',
      'Type hints: def add(a: int, b: int) -> int — optional but good practice',
    ],
  },
  {
    title: 'List & Dict Comprehensions',
    icon: '🗜️',
    color: 'border-amber-200 bg-amber-50',
    headerColor: 'text-amber-800',
    desc: 'Comprehensions create new collections in a single, readable line. Far more Pythonic than building them with loops.',
    code: `# List comprehension
# [expression for item in iterable if condition]

squares   = [x**2 for x in range(10)]
evens     = [x for x in range(20) if x % 2 == 0]
upper_words = [w.upper() for w in ["hello", "world"]]

# Dict comprehension
word_lengths = {w: len(w) for w in ["cat", "elephant", "dog"]}
# → {"cat": 3, "elephant": 8, "dog": 3}

# Set comprehension
unique_lengths = {len(w) for w in ["cat", "elephant", "dog"]}
# → {3, 8}

# Nested comprehension (matrix flatten)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat   = [n for row in matrix for n in row]
# → [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Equivalent loop (for comparison)
flat_loop = []
for row in matrix:
    for n in row:
        flat_loop.append(n)`,
    notes: [
      'Comprehensions are faster than equivalent for loops (implemented in C)',
      'Keep them readable — if it doesn\'t fit on one line clearly, use a loop',
      'Generator expressions: (x**2 for x in range(10)) — lazy, memory efficient',
      'dict.items() returns (key, value) pairs — use in dict comprehensions',
    ],
  },
  {
    title: 'Object-Oriented Programming',
    icon: '🏗️',
    color: 'border-rose-200 bg-rose-50',
    headerColor: 'text-rose-800',
    desc: 'Classes are blueprints for objects. OOP organises code around data and behaviour together. Essential for understanding ML frameworks like PyTorch.',
    code: `# Class definition
class Animal:
    # Class attribute — shared by all instances
    kingdom = "Animalia"

    def __init__(self, name, sound):
        # Instance attributes — unique per object
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

    def __repr__(self):
        return f"Animal({self.name!r})"

# Inheritance
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "woof")  # call parent __init__

    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

# Usage
rex = Dog("Rex")
print(rex.speak())         # Rex says woof!
print(rex.fetch("ball"))   # Rex fetches the ball!
print(rex.kingdom)         # Animalia (inherited class attr)
print(isinstance(rex, Animal))  # True`,
    notes: [
      '__str__ for human-readable string, __repr__ for developer debug string',
      'super() calls the parent class method — essential in __init__ chains',
      '@property turns a method into a readable attribute (no parentheses)',
      '@classmethod and @staticmethod are alternative method types',
    ],
  },
  {
    title: 'Error Handling',
    icon: '🛡️',
    color: 'border-slate-200 bg-slate-50',
    headerColor: 'text-slate-800',
    desc: 'try/except catches errors so your program doesn\'t crash. Raise your own errors to signal invalid input.',
    code: `# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Can't divide by zero")

# Multiple exception types
try:
    value = int("not a number")
except (ValueError, TypeError) as e:
    print(f"Conversion failed: {e}")

# else runs if no exception, finally always runs
try:
    f = open("data.csv")
    data = f.read()
except FileNotFoundError:
    print("File not found")
else:
    print(f"Read {len(data)} bytes")  # only if success
finally:
    print("Done")  # always runs

# Raise your own exceptions
def divide(a, b):
    if b == 0:
        raise ValueError("Denominator cannot be zero")
    return a / b

# Custom exception class
class InsufficientFundsError(Exception):
    def __init__(self, amount, balance):
        super().__init__(f"Need £{amount}, have £{balance}")`,
    notes: [
      'Always catch specific exceptions — bare "except:" hides bugs',
      'Use "with open(...) as f:" for files — auto-closes even if error occurs',
      'Exception chaining: raise NewError(...) from original_error',
      'Logging is better than print for production error handling',
    ],
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function LearnPythonSyntax() {
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [mcAnswers, setMcAnswers] = useState({});   // { questionIndex: selectedOption }
  const [mcRevealed, setMcRevealed] = useState({}); // { questionIndex: true }
  const [oeRevealed, setOeRevealed] = useState({}); // { questionIndex: true }
  const [oeAnswers, setOeAnswers] = useState({});    // { questionIndex: text }
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleMcSelect = (qi, oi) => {
    if (mcRevealed[qi]) return;
    setMcAnswers(a => ({ ...a, [qi]: oi }));
    setMcRevealed(r => ({ ...r, [qi]: true }));
  };

  const mcScore = MC_QUESTIONS.reduce((acc, q, i) => {
    return acc + (mcAnswers[i] === q.answer ? 1 : 0);
  }, 0);

  const allMcAnswered = Object.keys(mcRevealed).length === MC_QUESTIONS.length;

  return (
    <PageWrapper
      badge="Learning Hub · Q1 · Month 1"
      title="Core Python Syntax"
      subtitle="What Python is, how to install it, the essential language features for AI/ML work, and a quiz to confirm your understanding."
      sections={SECTIONS}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 -mt-4">
        <NavLink to="/learn" className="hover:text-blue-500">Learning Hub</NavLink>
        <span>›</span>
        <NavLink to="/learn/q1" className="hover:text-blue-500">Q1 — Foundations</NavLink>
        <span>›</span>
        <span className="text-slate-600">Core Python Syntax</span>
      </div>

      {/* ── What is Python ── */}
      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">What is Python</h2>
        <p className="text-slate-500 text-sm mb-5">Python is a general-purpose, interpreted programming language designed for readability. Created by Guido van Rossum in 1991, it has become the dominant language for data science, machine learning, and AI — used by every major ML library (PyTorch, TensorFlow, scikit-learn, Hugging Face).</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Type system', value: 'Dynamically typed', note: 'No type declarations needed — Python infers types at runtime' },
            { label: 'Execution', value: 'Interpreted', note: 'Runs line by line — no compile step. Slower than C, but fast enough for most AI work' },
            { label: 'Paradigm', value: 'Multi-paradigm', note: 'Supports procedural, OOP, and functional styles — use what fits' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <p className="font-bold text-slate-800 mb-1">{s.value}</p>
              <p className="text-xs text-slate-400">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="card bg-blue-50 border-blue-200 text-blue-800 text-sm mb-4">
          <strong>Why Python for AI?</strong> The entire ML ecosystem is Python-first. NumPy, Pandas, scikit-learn, PyTorch, TensorFlow, and Hugging Face all have Python APIs. C/C++ powers their internals for speed, but you control them in Python. Learning Python is learning the language of AI.
        </div>

        <div className="space-y-2">
          {[
            { title: 'Readability', desc: 'Code reads like English. No semicolons, no braces. Indentation is mandatory and enforces clean structure.' },
            { title: 'Batteries included', desc: 'Rich standard library: JSON parsing, HTTP requests, file I/O, regular expressions, datetime handling — all built-in.' },
            { title: 'Package ecosystem', desc: 'pip + PyPI hosts 500,000+ packages. Any capability you need — databases, APIs, visualisation, ML — already exists.' },
            { title: 'Interactive development', desc: 'Jupyter notebooks run Python cell-by-cell — essential for data exploration, model training, and documentation.' },
          ].map((p) => (
            <div key={p.title} className="card flex gap-3 items-start">
              <span className="text-blue-500 font-bold text-sm w-28 flex-shrink-0">{p.title}</span>
              <p className="text-sm text-slate-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Installation ── */}
      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Installation</h2>
        <p className="text-slate-500 text-sm mb-4">You need Python 3.10 or later. We recommend also installing VS Code and setting up a virtual environment for every project.</p>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">1</div>
              <h3 className="font-bold text-slate-800">Download Python</h3>
            </div>
            <p className="text-sm text-slate-500 mb-2">Download the latest stable version from the official site. On macOS/Linux, Homebrew or pyenv is preferred over the system Python.</p>
            <a
              href="https://www.python.org/downloads/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              python.org/downloads ↗
            </a>
          </div>

          {/* Step 2 */}
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">2</div>
              <h3 className="font-bold text-slate-800">Verify installation</h3>
            </div>
            <p className="text-sm text-slate-500 mb-3">Open a terminal and run:</p>
            <div className="bg-slate-900 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 space-y-1">
              <p><span className="text-slate-500">$</span> python3 --version</p>
              <p className="text-emerald-400">Python 3.12.3</p>
              <p className="mt-2"><span className="text-slate-500">$</span> python3 -c "print('Hello, Python!')"</p>
              <p className="text-emerald-400">Hello, Python!</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">3</div>
              <h3 className="font-bold text-slate-800">Create a virtual environment</h3>
            </div>
            <p className="text-sm text-slate-500 mb-3">Always use a virtual environment per project — it keeps dependencies isolated.</p>
            <div className="bg-slate-900 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 space-y-1">
              <p><span className="text-slate-500"># Create</span></p>
              <p><span className="text-slate-500">$</span> python3 -m venv .venv</p>
              <p className="mt-1"><span className="text-slate-500"># Activate (macOS/Linux)</span></p>
              <p><span className="text-slate-500">$</span> source .venv/bin/activate</p>
              <p className="mt-1"><span className="text-slate-500"># Activate (Windows)</span></p>
              <p><span className="text-slate-500">$</span> .venv\Scripts\activate</p>
              <p className="mt-1"><span className="text-slate-500"># Install packages</span></p>
              <p><span className="text-slate-500">$</span> pip install numpy pandas jupyter</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">4</div>
              <h3 className="font-bold text-slate-800">Recommended editor: VS Code</h3>
            </div>
            <p className="text-sm text-slate-500 mb-2">Install the Python extension by Microsoft. It provides syntax highlighting, linting (Pylance), debugging, and Jupyter notebook support.</p>
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              code.visualstudio.com ↗
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Core Concepts ── */}
      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Core Concepts</h2>
        <p className="text-slate-500 text-sm mb-5">Click any concept to expand its code examples and key notes. Study them in order — each builds on the previous.</p>
        <div className="space-y-3">
          {CONCEPTS.map((c, i) => {
            const isOpen = expandedConcept === i;
            return (
              <div key={c.title} className={`card border-l-4 cursor-pointer transition-all ${c.color}`} onClick={() => setExpandedConcept(isOpen ? null : i)}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <h3 className={`font-bold ${c.headerColor}`}>{c.title}</h3>
                      {!isOpen && <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>}
                    </div>
                  </div>
                  <span className="text-slate-400 text-sm flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/60">
                    <p className="text-sm text-slate-600 mb-4">{c.desc}</p>

                    {/* Code */}
                    <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-xs text-slate-300 overflow-x-auto mb-4">
                      <pre className="whitespace-pre">{c.code}</pre>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      {c.notes.map((n) => (
                        <div key={n} className="flex items-start gap-2 text-xs">
                          <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                          <span className="text-slate-600">{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Quiz ── */}
      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-4">Knowledge Check</h2>

        {/* Score banner */}
        {allMcAnswered && (
          <div className={`card mb-6 text-center ${mcScore >= 6 ? 'bg-emerald-50 border-emerald-300' : mcScore >= 4 ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300'}`}>
            <p className="text-2xl font-bold mb-1" style={{ color: mcScore >= 6 ? '#059669' : mcScore >= 4 ? '#d97706' : '#dc2626' }}>
              {mcScore} / {MC_QUESTIONS.length}
            </p>
            <p className="text-sm font-semibold" style={{ color: mcScore >= 6 ? '#059669' : mcScore >= 4 ? '#d97706' : '#dc2626' }}>
              {mcScore === MC_QUESTIONS.length ? '🎉 Perfect score! Move on to NumPy & Pandas.' :
               mcScore >= 6 ? 'Strong result. Review any wrong answers, then continue.' :
               mcScore >= 4 ? 'Good effort. Re-read the concepts for the questions you missed.' :
               'Keep studying — review the Core Concepts section and try again.'}
            </p>
          </div>
        )}

        {/* Multiple choice */}
        <h3 className="font-bold text-slate-700 mb-4 text-base">Part A — Multiple Choice</h3>
        <div className="space-y-5 mb-10">
          {MC_QUESTIONS.map((q, qi) => {
            const selected = mcAnswers[qi];
            const revealed = mcRevealed[qi];
            return (
              <div key={qi} className="card">
                <p className="font-semibold text-slate-800 mb-2 text-sm">
                  <span className="text-slate-400 mr-2">Q{qi + 1}.</span>{q.q}
                </p>
                {q.code && (
                  <div className="bg-slate-900 rounded-lg px-3 py-2.5 font-mono text-xs text-slate-300 mb-3 overflow-x-auto">
                    <pre className="whitespace-pre">{q.code}</pre>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    let style = 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50';
                    if (revealed) {
                      if (oi === q.answer) style = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold';
                      else if (oi === selected && oi !== q.answer) style = 'border-red-400 bg-red-50 text-red-700 line-through';
                      else style = 'border-slate-200 text-slate-400';
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => handleMcSelect(qi, oi)}
                        disabled={revealed}
                        className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${style} ${!revealed ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span className="text-xs text-slate-400 mr-2 font-mono">{String.fromCharCode(65 + oi)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {revealed && (
                  <div className={`mt-3 px-3 py-2 rounded-lg text-xs ${selected === q.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                    <strong>{selected === q.answer ? '✓ Correct! ' : '✗ Not quite. '}</strong>{q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Open-ended */}
        <h3 className="font-bold text-slate-700 mb-1 text-base">Part B — Written Questions</h3>
        <p className="text-sm text-slate-400 mb-4">Write your answer in the box, then reveal the model answer. There's no automatic scoring — assess yourself honestly.</p>
        <div className="space-y-5">
          {OE_QUESTIONS.map((q, qi) => {
            const revealed = oeRevealed[qi];
            return (
              <div key={qi} className="card">
                <p className="font-semibold text-slate-800 mb-1 text-sm">
                  <span className="text-slate-400 mr-2">Q{qi + 1}.</span>{q.q}
                </p>
                <p className="text-xs text-slate-400 italic mb-3">Hint: {q.hint}</p>
                <textarea
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
                  rows={4}
                  placeholder="Write your answer here..."
                  value={oeAnswers[qi] || ''}
                  onChange={(e) => setOeAnswers(a => ({ ...a, [qi]: e.target.value }))}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setOeRevealed(r => ({ ...r, [qi]: true }))}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    {revealed ? 'Answer shown ✓' : 'Reveal model answer'}
                  </button>
                </div>
                {revealed && (
                  <div className="mt-3">
                    <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-xs text-slate-300 overflow-x-auto mb-3">
                      <pre className="whitespace-pre-wrap">{q.answer}</pre>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 mb-1">Key points to check in your answer:</p>
                      {q.keyPoints.map((kp) => (
                        <div key={kp} className="flex items-start gap-2 text-xs">
                          <span className="text-blue-400 flex-shrink-0">·</span>
                          <span className="text-slate-600">{kp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next up */}
        <div className="mt-8 card bg-slate-50 border-slate-200 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Next topic in Q1</p>
            <p className="font-bold text-slate-800">NumPy & Pandas →</p>
            <p className="text-sm text-slate-500">Data handling — arrays, dataframes, and manipulation.</p>
          </div>
          <NavLink
            to="/learn/q1"
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Q1
          </NavLink>
        </div>
      </section>
    </PageWrapper>
  );
}
