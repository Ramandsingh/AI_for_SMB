import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Months 7–8: Deep Learning Architectures', level: 2 },
  { id: 's2', title: 'Month 9: NLP & Transformers',             level: 2 },
  { id: 's3', title: 'PyTorch Essentials',                      level: 2 },
  { id: 's4', title: 'Hugging Face Hub',                        level: 2 },
  { id: 's5', title: 'Recommended Resources',                   level: 2 },
  { id: 's6', title: 'Quarter 3 Project',                       level: 2 },
];

const ARCHITECTURES = [
  {
    name: 'Multilayer Perceptron (MLP)',
    aka: 'Feedforward neural network',
    desc: 'The fundamental building block. Stacked layers of linear transformations followed by non-linear activation functions. Every more complex architecture (CNN, Transformer) contains MLPs.',
    key: ['Input layer → hidden layers → output layer', 'Activation functions: ReLU (hidden), Sigmoid/Softmax (output)', 'Backpropagation: chain rule propagates gradients from loss to weights', 'Regularisation: Dropout (randomly zero activations), L2 weight decay'],
    use: 'Tabular data, simple function approximation, building block of larger networks.',
    pytorch: 'nn.Linear() + nn.ReLU() + nn.Sequential()',
  },
  {
    name: 'Convolutional Neural Network (CNN)',
    aka: 'ConvNet',
    desc: 'Designed for spatial data (images). Convolutional layers learn local feature detectors (edges, textures) that are applied across the input — spatial parameter sharing massively reduces parameters vs fully connected.',
    key: ['Conv layer: applies K filters of size F×F across the input', 'Pooling: max/avg pool reduces spatial dimensions', 'Feature hierarchy: early layers detect edges, later layers detect complex patterns', 'Famous architectures: VGG, ResNet, EfficientNet'],
    use: 'Image classification, object detection, image segmentation, any spatial data.',
    pytorch: 'nn.Conv2d(), nn.MaxPool2d(), torchvision.models.resnet18()',
  },
  {
    name: 'Recurrent Neural Network (RNN) / LSTM',
    aka: 'Sequence models',
    desc: 'Process sequential data by maintaining hidden state across timesteps. LSTMs (Long Short-Term Memory) add gates to control what to remember vs forget — solving the vanishing gradient problem in vanilla RNNs.',
    key: ['Hidden state hₜ = tanh(Wxhxₜ + Whhhₜ₋₁ + b)', 'LSTM gates: forget, input, output — control memory flow', 'Bidirectional: reads sequence forward and backward', 'Largely replaced by Transformers for NLP, but still used for time series'],
    use: 'Time series forecasting, speech recognition, text generation (pre-Transformer).',
    pytorch: 'nn.LSTM(input_size, hidden_size, num_layers)',
  },
];

const TRAINING_CONCEPTS = [
  { concept: 'Loss function', desc: 'Measures how wrong the model\'s predictions are. Classification: CrossEntropyLoss. Regression: MSELoss. The loss is what we minimise via gradient descent.' },
  { concept: 'Optimiser', desc: 'Updates weights using the gradient. Adam (Adaptive Moment Estimation) is the standard default — adapts learning rate per parameter. SGD with momentum is preferred for CNNs on ImageNet.' },
  { concept: 'Learning rate', desc: 'How big each weight update step is. Too high: diverges. Too low: trains too slowly. Learning rate schedules (cosine annealing, warm-up) improve convergence.' },
  { concept: 'Batch size', desc: 'How many samples processed before a weight update. Large batches are faster (GPU parallelism) but can harm generalisation. Typical values: 32–256.' },
  { concept: 'Epochs', desc: 'One full pass through the training set. Train for enough epochs that loss plateaus. Stop when validation loss stops improving (early stopping).' },
  { concept: 'Overfitting', desc: 'The model memorises training data but doesn\'t generalise. Fix: more data, dropout, weight decay, data augmentation, or a smaller model.' },
];

const TRANSFORMER_CONCEPTS = [
  {
    concept: 'Self-attention',
    detail: 'Each token in the sequence attends to every other token to compute its representation. The attention score between tokens i and j = softmax(qᵢ · kⱼ / √d). This captures long-range dependencies that RNNs struggle with.',
  },
  {
    concept: 'Multi-head attention',
    detail: 'Run H parallel attention operations ("heads") on projected subspaces of the input, then concatenate. Different heads learn to attend to different types of relationships (syntax, coreference, etc.).',
  },
  {
    concept: 'Positional encoding',
    detail: 'Attention is permutation-invariant — it doesn\'t know token order. Positional encodings (sinusoidal or learned) add position information to each token embedding.',
  },
  {
    concept: 'Layer normalisation',
    detail: 'Applied before each sub-layer (Pre-LN) in modern transformers. Stabilises training of deep networks. Different from BatchNorm — normalises across the feature dimension, not the batch.',
  },
  {
    concept: 'Encoder vs Decoder',
    detail: 'BERT = encoder-only (bidirectional context, good for classification/NER/embeddings). GPT = decoder-only (autoregressive, good for generation). T5/BART = encoder-decoder (good for translation/summarisation).',
  },
];

const PYTORCH_CODE = `import torch
import torch.nn as nn

# Define a simple MLP
class MLP(nn.Module):
    def __init__(self, in_features, hidden, out_features):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden, out_features),
        )
    def forward(self, x):
        return self.net(x)

model = MLP(784, 256, 10)  # MNIST: 28x28=784 → 10 classes
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

# Training loop
for epoch in range(20):
    for X_batch, y_batch in train_loader:
        optimizer.zero_grad()          # clear gradients
        preds = model(X_batch)         # forward pass
        loss = loss_fn(preds, y_batch) # compute loss
        loss.backward()                # backpropagation
        optimizer.step()               # update weights`;

const HF_WORKFLOW = [
  { step: 'Find a model', desc: 'Search huggingface.co/models by task (text-classification, ner, summarization, etc.), language, and size. Filter by license for commercial use.' },
  { step: 'Load with pipeline()', desc: 'One-line inference for common tasks. Best for quick evaluation.', code: 'pipe = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")' },
  { step: 'Load tokenizer + model', desc: 'For more control over inputs and outputs.', code: 'tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")\nmodel = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")' },
  { step: 'Fine-tune with Trainer', desc: 'The Trainer API handles training loops, evaluation, checkpointing, and logging with minimal boilerplate.', code: 'trainer = Trainer(model=model, args=training_args, train_dataset=ds)\ntrainer.train()' },
  { step: 'Push to Hub', desc: 'Share your fine-tuned model with the community or your team.', code: 'model.push_to_hub("your-username/your-model-name")' },
];

const RESOURCES = [
  { title: 'fast.ai Deep Learning for Coders (Part 1)', type: 'Course', free: true, desc: 'Best practical deep learning course. Covers CNNs, transfer learning, and modern techniques. Starts with results, then theory.' },
  { title: 'Andrej Karpathy — Neural Networks: Zero to Hero', type: 'Video series', free: true, desc: 'Build micrograd, makemore, and GPT from scratch. The deepest free DL education available. youtube.com/@AndrejKarpathy' },
  { title: 'PyTorch official tutorials (pytorch.org)', type: 'Reference', free: true, desc: 'Learn PyTorch foundations — tensors, autograd, nn.Module. The 60-minute blitz is the standard starting point.' },
  { title: 'Hugging Face NLP Course (huggingface.co/learn)', type: 'Course', free: true, desc: 'Chapter 1–4 cover transformers and fine-tuning. Chapter 5–9 cover datasets and advanced techniques.' },
  { title: '"Attention Is All You Need" (Vaswani et al., 2017)', type: 'Paper', free: true, desc: 'The original transformer paper. Read after watching the 3Blue1Brown transformer visual explanation.' },
  { title: 'Hands-On ML Ch. 10–16 (Géron)', type: 'Book', free: false, desc: 'Covers ANN, CNNs, RNNs, and training techniques with Keras/TensorFlow. Excellent reference.' },
];

export default function LearnQ3() {
  return (
    <PageWrapper
      badge="Learning Hub · Quarter 3"
      title="Deep Learning & Neural Network Architectures"
      subtitle="Shift from classical ML to structural deep networks. Build CNNs, LSTMs, and transformer models in PyTorch. Use Hugging Face for transfer learning. Months 7–9 · ~10–15 hrs/week."
      sections={SECTIONS}
    >
      <div className="card bg-violet-50 border-violet-200 text-violet-800 text-sm mb-8">
        <strong>Quarter goal:</strong> By the end of Q3 you should be able to train a CNN from scratch on an image dataset, fine-tune a BERT-class model from Hugging Face on a text classification task, and understand how transformers work at the architectural level.
      </div>

      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Months 7–8: Deep Learning Architectures</h2>
        <p className="text-slate-500 text-sm mb-5">Deep learning replaces hand-crafted features with learned representations. The network itself learns what signals are predictive — given enough data and compute.</p>
        <div className="space-y-4 mb-6">
          {ARCHITECTURES.map((a) => (
            <div key={a.name} className="card">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800">{a.name}</h3>
                <span className="text-xs text-slate-400">({a.aka})</span>
                <code className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded ml-auto">{a.pytorch}</code>
              </div>
              <p className="text-sm text-slate-500 mb-3">{a.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ul className="space-y-1">
                  {a.key.map((k) => (
                    <li key={k} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-violet-400 flex-shrink-0 mt-0.5">·</span>{k}
                    </li>
                  ))}
                </ul>
                <div className="bg-violet-50 rounded-lg px-3 py-2 text-xs text-violet-700">
                  <strong>Best for:</strong> {a.use}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-700 mb-3">Core Training Concepts</h3>
        <div className="space-y-2">
          {TRAINING_CONCEPTS.map((c) => (
            <div key={c.concept} className="card flex gap-3 items-start">
              <span className="font-bold text-violet-600 w-28 flex-shrink-0 text-sm">{c.concept}</span>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Month 9: NLP & Transformers</h2>
        <p className="text-slate-500 text-sm mb-4">The transformer architecture (2017) replaced RNNs as the dominant NLP model and became the foundation of all modern LLMs. Understanding it is mandatory for Q4.</p>
        <div className="space-y-3">
          {TRANSFORMER_CONCEPTS.map((c) => (
            <div key={c.concept} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.concept}</h3>
              <p className="text-sm text-slate-500">{c.detail}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 bg-amber-50 border-amber-200 text-amber-800 text-sm">
          <strong>Word2Vec & embeddings:</strong> Before transformers, words were represented as static vectors (Word2Vec, GloVe). Transformers produce contextual embeddings — the vector for "bank" is different in "river bank" vs "bank account". This is the key improvement.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">PyTorch Essentials</h2>
        <p className="text-slate-500 text-sm mb-4">PyTorch is the dominant framework for research and increasingly for production. Its define-by-run (dynamic computation graph) makes debugging natural.</p>
        <div className="card bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">{PYTORCH_CODE}</pre>
        </div>
        <div className="card mt-3 bg-slate-50 border-slate-200 text-sm text-slate-600">
          <strong>TensorFlow vs PyTorch:</strong> PyTorch dominates research (85%+ of papers) and is rapidly gaining in production. TensorFlow is still used in some Google/mobile contexts. Learn PyTorch — you can always learn TensorFlow later.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
        <h2 className="mb-2">Hugging Face Hub</h2>
        <p className="text-slate-500 text-sm mb-4">Hugging Face is the GitHub of AI models — 500,000+ models, 100,000+ datasets, and a unified API. The Transformers library is the standard for loading and fine-tuning pre-trained models.</p>
        <div className="space-y-3">
          {HF_WORKFLOW.map((s) => (
            <div key={s.step} className="card">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{s.step}</h3>
              <p className="text-sm text-slate-500 mb-2">{s.desc}</p>
              {s.code && <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-xs text-slate-300"><pre className="whitespace-pre-wrap">{s.code}</pre></div>}
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
        <h2 className="mb-2">Quarter 3 Project</h2>
        <div className="card bg-slate-50 border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">Fine-tuned Text Classifier</h3>
          <p className="text-sm text-slate-500 mb-4">Fine-tune a DistilBERT model on a text classification task of your choice (suggested: sentiment analysis, topic classification, or spam detection).</p>
          <div className="space-y-2">
            {[
              'Choose a dataset from Hugging Face Hub (e.g., imdb, ag_news, or your own CSV)',
              'Load with datasets library, explore class distribution',
              'Tokenise with AutoTokenizer — understand padding, truncation, attention masks',
              'Fine-tune DistilBERT with the Trainer API for 3 epochs',
              'Evaluate with accuracy, F1, and a confusion matrix',
              'Run inference on 10 custom examples and analyse errors',
              'Export the model and run it locally without internet access',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-slate-600">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
