// Static search index — all navigable pages with keywords for Fuse.js
const SEARCH_INDEX = [
  // Overview
  { title: 'Dashboard Home', route: '/', section: 'Overview', keywords: 'home dashboard overview main' },
  { title: 'Planning', route: '/planning', section: 'Overview', keywords: 'planning notes editor markdown content' },

  // Foundation
  { title: 'Understanding AI', route: '/p1', section: 'Foundation', keywords: 'understanding artificial intelligence basics intro what is ai' },
  { title: 'Maturity Journey', route: '/p2', section: 'Foundation', keywords: 'maturity journey stages levels progression ai adoption' },
  { title: 'Maturity Canvas', route: '/p34', section: 'Foundation', keywords: 'maturity canvas assessment interactive diagram' },
  { title: 'Role Impact Map', route: '/p3', section: 'Foundation', keywords: 'role impact map jobs functions departments affected' },

  // Planning
  { title: 'Assessment & Discovery', route: '/p4', section: 'Planning', keywords: 'assessment discovery audit readiness evaluation' },
  { title: 'Roadmap Options', route: '/p5', section: 'Planning', keywords: 'roadmap options strategy paths timeline milestones' },
  { title: 'ROI Calculator', route: '/p6', section: 'Planning', keywords: 'roi calculator return on investment cost benefit financial' },

  // Implementation
  { title: 'Technology & Tools', route: '/p7', section: 'Implementation', keywords: 'technology tools stack software platforms tech' },
  { title: 'Learning Approach', route: '/p9', section: 'Implementation', keywords: 'learning approach training education skills development' },

  // People & Culture
  { title: 'Individual Adoption', route: '/p10', section: 'People & Culture', keywords: 'individual adoption change management people human' },
  { title: 'Org Contributions', route: '/p11', section: 'People & Culture', keywords: 'org contributions organisation team collaboration culture' },

  // Technology of AI
  { title: 'What Is AI', route: '/p17', section: 'Technology of AI', keywords: 'what is ai artificial intelligence definition overview basics' },
  { title: 'Categories of AI', route: '/p18', section: 'Technology of AI', keywords: 'categories types narrow general agi machine learning deep learning' },
  { title: 'How AI Works', route: '/p19', section: 'Technology of AI', keywords: 'how ai works algorithms training inference neural networks' },
  { title: 'Where AI Deploys', route: '/p20', section: 'Technology of AI', keywords: 'where ai deploys cloud edge on-premise deployment environments' },
  { title: 'AI & Your Tech Stack', route: '/p21', section: 'Technology of AI', keywords: 'ai tech stack integration api data pipeline architecture' },
  { title: 'Glossary', route: '/p22', section: 'Technology of AI', keywords: 'glossary definitions terms vocabulary acronyms' },

  // Enterprise Context
  { title: 'What Enterprises Do', route: '/p12', section: 'Enterprise Context', keywords: 'enterprise business operations functions processes value chain' },
  { title: 'Where the Value Is', route: '/p13', section: 'Enterprise Context', keywords: 'value opportunities use cases business impact revenue' },
  { title: 'How to Adopt AI', route: '/p14', section: 'Enterprise Context', keywords: 'how adopt ai strategy framework approach steps methodology' },
  { title: 'When to Adopt AI', route: '/p15', section: 'Enterprise Context', keywords: 'when adopt timing readiness maturity prerequisites conditions' },
  { title: 'How to Measure Value', route: '/p16', section: 'Enterprise Context', keywords: 'measure value kpi metrics success criteria outcomes' },

  // Executive Insights
  { title: 'BCG Insights', route: '/p29', section: 'Executive Insights', keywords: 'bcg boston consulting group research report insights strategy' },
  { title: 'McKinsey Insights', route: '/p30', section: 'Executive Insights', keywords: 'mckinsey research report insights consulting strategy' },
  { title: 'Bain Insights', route: '/p31', section: 'Executive Insights', keywords: 'bain research report insights consulting strategy' },
  { title: 'Deloitte Insights', route: '/p32', section: 'Executive Insights', keywords: 'deloitte research report insights consulting audit' },

  // Top AI Labs
  { title: 'OpenAI', route: '/p35', section: 'Top AI Labs', keywords: 'openai gpt chatgpt research lab models' },
  { title: 'Anthropic', route: '/p36', section: 'Top AI Labs', keywords: 'anthropic claude research lab safety constitutional ai' },
  { title: 'Google AI', route: '/p37', section: 'Top AI Labs', keywords: 'google gemini deepmind research lab bard' },
  { title: 'Chinese AI Labs', route: '/p38', section: 'Top AI Labs', keywords: 'china chinese labs baidu alibaba tencent huawei bytedance research' },

  // AI Model Concepts
  { title: 'How LLMs Work', route: '/p39', section: 'AI Model Concepts', keywords: 'llm large language model transformer attention tokenization pretraining' },
  { title: 'Retrieval & Memory', route: '/p40', section: 'AI Model Concepts', keywords: 'retrieval rag memory vector embedding search context' },
  { title: 'Agents & Orchestration', route: '/p41', section: 'AI Model Concepts', keywords: 'agents agentic orchestration multi-agent tools function calling workflows' },

  // Enterprise AI Development
  { title: 'Data Infrastructure', route: '/p23', section: 'Enterprise AI Development', keywords: 'data infrastructure lake warehouse pipeline etl quality governance' },
  { title: 'The AI Factory', route: '/p24', section: 'Enterprise AI Development', keywords: 'ai factory mlops platform production deployment lifecycle' },
  { title: 'Foundation Models & RAG', route: '/p25', section: 'Enterprise AI Development', keywords: 'foundation models rag retrieval augmented generation fine-tuning' },
  { title: 'Enterprise AI Platforms', route: '/p26', section: 'Enterprise AI Development', keywords: 'enterprise platform vendor azure openai vertex sagemaker watson' },
  { title: 'Governance & Risk', route: '/p27', section: 'Enterprise AI Development', keywords: 'governance risk compliance regulation ethics bias fairness responsible' },
  { title: 'Building the AI Team', route: '/p28', section: 'Enterprise AI Development', keywords: 'ai team roles hiring ml engineer data scientist product manager' },

  // Learning Hub
  { title: 'Learning Hub', route: '/learn', section: 'Learning Hub', keywords: 'learning hub courses curriculum training education resources' },
  { title: 'Q1 — Foundations', route: '/learn/q1', section: 'Learning Hub', keywords: 'q1 quarter 1 foundations basics python statistics math linear algebra' },
  { title: 'Q2 — Classical ML', route: '/learn/q2', section: 'Learning Hub', keywords: 'q2 quarter 2 classical machine learning regression classification sklearn' },
  { title: 'Q3 — Deep Learning', route: '/learn/q3', section: 'Learning Hub', keywords: 'q3 quarter 3 deep learning neural networks cnn rnn pytorch tensorflow' },
  { title: 'Q4 — GenAI & MLOps', route: '/learn/q4', section: 'Learning Hub', keywords: 'q4 quarter 4 generative ai llm mlops deployment fine-tuning' },

  // Your AI Fit
  { title: 'How AI Fits You', route: '/p33', section: 'Your AI Fit', keywords: 'how ai fits you personal role function department use cases' },

  // Business Hub
  { title: 'Biz Learning Hub', route: '/biz', section: 'Business Hub', keywords: 'business hub non-technical learning 20-80 rule productivity AI copilot role selector' },
  { title: 'Q1 — Tool Fluency', route: '/biz/q1', section: 'Business Hub', keywords: 'q1 tool fluency copilot gemini RACE prompting enterprise cowork CLI' },
  { title: 'Q2 — Connected Workflows', route: '/biz/q2', section: 'Business Hub', keywords: 'q2 workflows zapier make power automate pipelines hallucination verification structured output' },
  { title: 'Q3 — Dept Playbooks', route: '/biz/q3', section: 'Business Hub', keywords: 'q3 department playbooks marketing sales finance operations hr legal IT strategy MCP' },
  { title: 'Q4 — Orchestration', route: '/biz/q4', section: 'Business Hub', keywords: 'q4 orchestration multi-agent HITL human in the loop prompt library workflow templates' },
  { title: 'Industry Use Cases', route: '/biz/industries', section: 'Business Hub', keywords: 'industry use cases BFSI healthcare retail manufacturing TMT energy real estate professional services hospitality education public sector' },
  { title: 'Dept Use Cases', route: '/biz/usecases', section: 'Business Hub', keywords: 'department use cases matrix 25 functions marketing sales finance operations HR legal IT strategy research procurement support' },

  // Admin
  { title: 'Pitch & Narrative', route: '/p8', section: 'Admin', keywords: 'pitch narrative story presentation slides executive' },
  { title: 'Companies', route: '/admin', section: 'Admin', keywords: 'companies admin clients organisations management' },
  { title: 'Lessons Learned', route: '/admin/lessons', section: 'Admin', keywords: 'lessons learned docker vite mysql build deploy engineering persistence blob longblob layer cache buildkit github actions self-hosted runner' },

  // Experimental UI
  { title: 'Lab Home', route: '/lab', section: 'Experimental UI', keywords: 'lab home experiments experimental react ui libraries' },
  { title: 'Image Upload · Uppy', route: '/lab/upload', section: 'Experimental UI', keywords: 'uppy image upload drag drop webcam file dashboard' },
  { title: 'Site Graph · React Flow', route: '/lab/graph', section: 'Experimental UI', keywords: 'site graph react flow force layout nodes edges visualisation' },
  { title: 'Chat Agent', route: '/lab/chat', section: 'Experimental UI', keywords: 'chat agent ai claude anthropic conversation assistant ui' },
  { title: 'Architecture Diagram', route: '/lab/arch', section: 'Experimental UI', keywords: 'architecture diagram docker compose containers services ports' },
  { title: 'Timeline', route: '/lab/timeline', section: 'Experimental UI', keywords: 'timeline milestones history ai enterprise events dates' },
  { title: 'Data Visualisation · Recharts', route: '/lab/charts', section: 'Experimental UI', keywords: 'charts data visualisation recharts radar heatmap bar sunburst' },
  { title: 'Calendar · Ant Design', route: '/lab/calendar', section: 'Experimental UI', keywords: 'calendar ant design events crud ics export antd datepicker' },
  { title: 'Database Platforms', route: '/lab/database', section: 'Experimental UI', keywords: 'database platforms baserow nocodb grist teable mathesar no-code low-code' },
  { title: 'Flowcharts · Mermaid', route: '/lab/flowcharts', section: 'Experimental UI', keywords: 'flowcharts mermaid sequence gantt state machine mindmap er diagram' },
  { title: 'PDF Viewer · Markup', route: '/lab/pdf', section: 'Experimental UI', keywords: 'pdf viewer markup highlight annotate notes pdf.js react-pdf-viewer' },
  { title: 'Graph Viz · Cytoscape', route: '/lab/cytoscape', section: 'Experimental UI', keywords: 'cytoscape graph viz network knowledge graph nodes edges layout' },
  { title: 'Excalidraw', route: '/lab/excalidraw', section: 'Experimental UI', keywords: 'excalidraw whiteboard drawing canvas sketch diagrams' },
];

export default SEARCH_INDEX;
