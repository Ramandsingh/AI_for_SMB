import PageWrapper from '../components/PageWrapper';

const SECTIONS = [
  { id: 's1', title: 'Months 4–5: Supervised & Unsupervised Learning', level: 2 },
  { id: 's2', title: 'Month 6: Data Pipelines & Feature Engineering',   level: 2 },
  { id: 's3', title: 'Scikit-Learn Workflow',                            level: 2 },
  { id: 's4', title: 'Recommended Resources',                            level: 2 },
  { id: 's5', title: 'Quarter 2 Project',                                level: 2 },
];

const SUPERVISED = [
  {
    name: 'Linear Regression',
    type: 'Regression',
    desc: 'Fits a straight line (or hyperplane) through data to predict a continuous output. The loss is Mean Squared Error. Solved analytically (Normal equation) or via gradient descent.',
    math: 'ŷ = Wx + b · Loss: MSE = (1/n)Σ(y − ŷ)²',
    when: 'Predicting house prices, revenue, temperatures — any continuous target.',
    sklearn: 'LinearRegression()',
  },
  {
    name: 'Logistic Regression',
    type: 'Classification',
    desc: 'Despite the name, it\'s a classifier. Outputs a probability via the sigmoid function. Binary: yes/no. Multi-class: one-vs-rest or softmax.',
    math: 'σ(z) = 1/(1+e^-z) · Loss: Binary Cross-Entropy',
    when: 'Spam detection, churn prediction, any binary classification. Strong interpretable baseline.',
    sklearn: 'LogisticRegression()',
  },
  {
    name: 'Decision Trees',
    type: 'Classification / Regression',
    desc: 'Recursively splits data on the feature that maximises information gain (classification) or minimises MSE (regression). Highly interpretable — you can draw the tree.',
    math: 'Split criterion: Gini impurity or entropy for classification; MSE for regression',
    when: 'When interpretability matters. Useful as a baseline before ensemble methods.',
    sklearn: 'DecisionTreeClassifier(), DecisionTreeRegressor()',
  },
  {
    name: 'Support Vector Machines',
    type: 'Classification',
    desc: 'Finds the maximum-margin hyperplane separating classes. The kernel trick enables non-linear boundaries (RBF kernel) without explicit feature engineering.',
    math: 'Maximise margin 2/‖w‖ subject to yᵢ(w·xᵢ+b) ≥ 1',
    when: 'Small-to-medium datasets with clear margins. Image classification before deep learning.',
    sklearn: 'SVC(kernel=\'rbf\')',
  },
  {
    name: 'Random Forest',
    type: 'Ensemble',
    desc: 'Trains N decision trees on random data/feature subsets (bagging). Predicts by majority vote (classification) or average (regression). More robust than single trees — lower variance.',
    math: 'Bootstrap aggregation: reduces variance without increasing bias',
    when: 'General-purpose tabular data. Strong default when you don\'t know what to try first.',
    sklearn: 'RandomForestClassifier(n_estimators=100)',
  },
  {
    name: 'Gradient Boosting (XGBoost)',
    type: 'Ensemble',
    desc: 'Trains trees sequentially — each tree corrects the errors of the previous ones. State-of-the-art for tabular data. Dominated Kaggle competitions for years before deep learning.',
    math: 'Additive model: F_m(x) = F_{m-1}(x) + γ_m h_m(x)',
    when: 'Tabular data with mixed types. When you need best-in-class accuracy.',
    sklearn: 'xgb.XGBClassifier() / GradientBoostingClassifier()',
  },
];

const UNSUPERVISED = [
  {
    name: 'K-Means Clustering',
    desc: 'Partitions data into K clusters by minimising within-cluster variance. Iteratively assigns points to nearest centroid, then recomputes centroids.',
    use: 'Customer segmentation, document clustering, image compression, anomaly detection (points far from all centroids).',
    gotcha: 'Must choose K upfront. Sensitive to initialisation — use k-means++ (default in sklearn). Assumes spherical clusters.',
    sklearn: 'KMeans(n_clusters=5, init=\'k-means++\')',
  },
  {
    name: 'PCA (Principal Component Analysis)',
    desc: 'Reduces dimensionality by finding the directions (principal components) of maximum variance. Projects data onto fewer dimensions while retaining most information.',
    use: 'Visualise high-dimensional data in 2D/3D. Remove correlated features. Speed up downstream models. Noise reduction.',
    gotcha: 'Components are linear combinations of features — less interpretable than original features. Standardise data first.',
    sklearn: 'PCA(n_components=2)',
  },
];

const PIPELINE_STEPS = [
  { step: 'Data ingestion', desc: 'Load from CSV, SQL, API, or Parquet. Identify target column and features. Check shape and dtypes.', code: 'pd.read_csv() / pd.read_sql()' },
  { step: 'Exploratory analysis', desc: 'df.info(), df.describe(), null counts, distributions, correlations. Understand the data before modelling.', code: 'df.isnull().sum() / sns.heatmap()' },
  { step: 'Handle missing values', desc: 'Strategy depends on mechanism: mean/median imputation for MCAR; model-based for MAR; flag as missing category for MNAR.', code: 'SimpleImputer(strategy=\'mean\')' },
  { step: 'Feature encoding', desc: 'Convert categorical → numerical. One-hot for nominal (no order). Ordinal encoding for ordered categories. Target encoding for high-cardinality.', code: 'OneHotEncoder() / OrdinalEncoder()' },
  { step: 'Feature scaling', desc: 'Standardise numerical features. Essential for gradient-based models and distance-based models (KNN, SVM). Not needed for trees.', code: 'StandardScaler() / MinMaxScaler()' },
  { step: 'Train/test split', desc: 'Always split before fitting transformers to prevent data leakage. Use stratified split for imbalanced classes.', code: 'train_test_split(X, y, stratify=y)' },
  { step: 'Model selection', desc: 'Fit multiple models with cross-validation. Compare CV scores. Pick 2–3 candidates for hyperparameter tuning.', code: 'cross_val_score(model, X, y, cv=5)' },
  { step: 'Hyperparameter tuning', desc: 'Grid search or random search over parameter space. Use CV to avoid overfitting to validation set.', code: 'GridSearchCV() / RandomizedSearchCV()' },
  { step: 'Evaluation', desc: 'Classification: accuracy, precision, recall, F1, AUC-ROC. Regression: MAE, RMSE, R². Use the metric aligned with business objective.', code: 'classification_report() / mean_squared_error()' },
];

const SKLEARN_PATTERN = `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# 1. Define transformers
num_pipeline = Pipeline([('scaler', StandardScaler())])
cat_pipeline = Pipeline([('encoder', OneHotEncoder(handle_unknown='ignore'))])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, numeric_features),
    ('cat', cat_pipeline, categorical_features),
])

# 2. Full pipeline
model = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100)),
])

# 3. Cross-validate
scores = cross_val_score(model, X_train, y_train, cv=5, scoring='f1')
print(f"CV F1: {scores.mean():.3f} ± {scores.std():.3f}")`;

const RESOURCES = [
  { title: 'Hands-On Machine Learning (Aurélien Géron)', type: 'Book', free: false, desc: 'The definitive practical ML book. Chapters 1–8 cover all of Q2. O\'Reilly — check your library.' },
  { title: 'fast.ai Practical ML for Coders', type: 'Course', free: true, desc: 'Covers tabular ML, random forests, and feature engineering in a practical, code-first style.' },
  { title: 'Kaggle Learn — Machine Learning & Intermediate ML', type: 'Interactive', free: true, desc: 'Free micro-courses with exercises. Best for getting hands-on immediately.' },
  { title: 'StatQuest — Machine Learning playlist', type: 'Video', free: true, desc: 'Josh Starmer explains algorithms clearly with visualisations. Watch before reading papers.' },
  { title: 'Scikit-learn user guide', type: 'Reference', free: true, desc: 'sklearn.org/stable/user_guide.html — the best algorithm reference. Each page has an example.' },
  { title: 'XGBoost documentation', type: 'Reference', free: true, desc: 'xgboost.readthedocs.io — includes tutorials on tuning and feature importance.' },
];

export default function LearnQ2() {
  return (
    <PageWrapper
      badge="Learning Hub · Quarter 2"
      title="Classical Machine Learning & Data Engineering"
      subtitle="Transition from static mathematical frameworks to systems that actively identify statistical patterns in data. Months 4–6 · ~10–15 hrs/week."
      sections={SECTIONS}
    >
      <div className="card bg-emerald-50 border-emerald-200 text-emerald-800 text-sm mb-8">
        <strong>Quarter goal:</strong> By the end of Q2 you should be able to train, evaluate, and deploy a classical ML model on a real dataset using a Scikit-Learn pipeline — with proper train/test splitting, cross-validation, and meaningful evaluation metrics.
      </div>

      <section id="s1" className="section-anchor mb-10">
        <h2 className="mb-2">Months 4–5: Supervised & Unsupervised Learning</h2>
        <p className="text-slate-500 text-sm mb-5">Supervised learning maps inputs to outputs using labelled training examples. Unsupervised learning finds structure in unlabelled data.</p>

        <h3 className="font-bold text-slate-700 mb-3">Supervised Algorithms</h3>
        <div className="space-y-3 mb-6">
          {SUPERVISED.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{m.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{m.type}</span>
                <code className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded ml-auto">{m.sklearn}</code>
              </div>
              <p className="text-sm text-slate-500 mb-2">{m.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 rounded-lg px-3 py-2 font-mono text-slate-600">{m.math}</div>
                <div className="bg-blue-50 rounded-lg px-3 py-2 text-blue-700"><strong>Use when:</strong> {m.when}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-700 mb-3">Unsupervised Algorithms</h3>
        <div className="space-y-3">
          {UNSUPERVISED.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{m.name}</h3>
                <code className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded ml-auto">{m.sklearn}</code>
              </div>
              <p className="text-sm text-slate-500 mb-2">{m.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50 rounded-lg px-3 py-2 text-emerald-700"><strong>Use for:</strong> {m.use}</div>
                <div className="bg-amber-50 rounded-lg px-3 py-2 text-amber-700"><strong>Gotcha:</strong> {m.gotcha}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s2" className="section-anchor mb-10">
        <h2 className="mb-2">Month 6: Data Pipelines & Feature Engineering</h2>
        <p className="text-slate-500 text-sm mb-4">In production, 80% of ML work is data preparation. Raw data is never model-ready. Feature engineering is the craft of transforming raw data into signals the model can learn from.</p>
        <div className="space-y-2">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={s.step} className="card flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-slate-800 text-sm">{s.step}</h3>
                  <code className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{s.code}</code>
                </div>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="s3" className="section-anchor mb-10">
        <h2 className="mb-2">Scikit-Learn Pipeline Pattern</h2>
        <p className="text-slate-500 text-sm mb-4">The Pipeline + ColumnTransformer pattern is the professional way to build reproducible, leak-free ML workflows in scikit-learn. Memorise this structure.</p>
        <div className="card bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">{SKLEARN_PATTERN}</pre>
        </div>
        <div className="card mt-3 bg-amber-50 border-amber-200 text-amber-800 text-sm">
          <strong>Data leakage:</strong> Never fit your scaler or imputer on the full dataset before splitting. If the scaler has seen the test set's values, your evaluation is invalid. Pipeline + split order prevents this automatically.
        </div>
      </section>

      <div className="section-divider" />

      <section id="s4" className="section-anchor mb-10">
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

      <section id="s5" className="section-anchor mb-10">
        <h2 className="mb-2">Quarter 2 Project</h2>
        <div className="card bg-slate-50 border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">End-to-End Classification Model</h3>
          <p className="text-sm text-slate-500 mb-4">Build a complete ML pipeline on a Kaggle dataset with a classification target (suggested: Titanic survival, heart disease, credit default).</p>
          <div className="space-y-2">
            {[
              'Load and split data (80/20, stratified)',
              'EDA: check class balance, distributions, correlations',
              'Build a Scikit-Learn Pipeline with ColumnTransformer (numeric scaling + categorical encoding)',
              'Train 3 models: LogisticRegression, RandomForestClassifier, XGBClassifier',
              'Evaluate with 5-fold cross-validation, reporting F1 and AUC-ROC',
              'Tune the best model with RandomizedSearchCV',
              'Plot feature importances and a confusion matrix',
              'Write a 500-word summary of what you found and what you would do next',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-slate-600">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
