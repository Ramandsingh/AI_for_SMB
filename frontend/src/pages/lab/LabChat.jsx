import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Lock } from 'lucide-react';

const PLACEHOLDER_MESSAGES = [
  { role: 'assistant', text: 'Hello! I\'m your AI assistant for this dashboard. I can answer questions about AI strategy, help interpret the frameworks on any page, or assist with your AI planning.' },
  { role: 'user', text: 'What\'s the key difference between BCG\'s 10/20/70 rule and McKinsey\'s superagency concept?' },
  { role: 'assistant', text: 'Great question. BCG\'s 10/20/70 rule is about where AI value comes from — it argues that 70% of transformation value lives in people and process change, not the algorithm. It\'s a resource allocation framework.\n\nMcKinsey\'s superagency concept is about what AI does to individual capability — it argues that AI amplifies the effective scope of a skilled professional by 5–10×. It\'s a talent and productivity thesis.\n\nTogether: BCG tells you where to invest your transformation budget (mostly on people, not technology). McKinsey tells you what to expect from that investment at the individual level. They\'re complementary, not competing.' },
];

export default function LabChat() {
  const [messages, setMessages] = useState(PLACEHOLDER_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: 'assistant', text: 'This is a placeholder response. Connect the Anthropic SDK to enable live Claude responses — see the integration callout below.' }]);
    }, 1200);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">@anthropic-ai/sdk · streaming</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Chat Agent</h1>
      <p className="text-slate-500 text-sm mb-4">AI assistant for this dashboard. Currently showing placeholder responses — connect Claude API to activate.</p>

      {/* Chat window */}
      <div className="card p-0 overflow-hidden mb-4">
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
          <Bot size={15} className="text-emerald-400" />
          <span className="text-sm font-semibold text-white">AI Adoption Assistant</span>
          <span className="ml-auto text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">Placeholder mode</span>
        </div>

        <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${m.role === 'assistant' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                {m.role === 'assistant'
                  ? <Bot size={13} className="text-emerald-600" />
                  : <User size={13} className="text-blue-600" />
                }
              </div>
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'assistant' ? 'bg-white border border-slate-100 text-slate-700' : 'bg-blue-600 text-white'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Bot size={13} className="text-emerald-600" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-3 py-2.5 border-t border-slate-100 bg-white flex gap-2">
          <input
            className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ask about AI strategy, frameworks, or this dashboard…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          />
          <button onClick={send} className="btn-primary py-2 px-3">
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Integration callout */}
      <div className="card border-2 border-emerald-200 bg-emerald-50">
        <div className="flex items-start gap-3">
          <Zap size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-emerald-800 mb-2">To activate live Claude responses</p>
            <div className="space-y-1.5 text-xs text-emerald-700 font-mono bg-emerald-100 rounded-lg p-3">
              <p># 1. Install the SDK</p>
              <p>npm install @anthropic-ai/sdk</p>
              <p className="mt-2"># 2. Add to backend/server.js</p>
              <p>const Anthropic = require('@anthropic-ai/sdk');</p>
              <p>app.post('/api/chat', async (req, res) =&gt; {'{'}</p>
              <p>{'  '}const stream = await client.messages.stream({'{'}</p>
              <p>{'    '}model: 'claude-sonnet-4-6', max_tokens: 1024,</p>
              <p>{'    '}messages: req.body.messages,</p>
              <p>{'  '}{'}'});</p>
              <p>{'  '}// pipe stream to res</p>
              <p>{'}'});</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
