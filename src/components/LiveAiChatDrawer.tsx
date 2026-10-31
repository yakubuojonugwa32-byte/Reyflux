import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Phone, Sparkles, MessageSquare, User, RefreshCw, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface LiveAiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveAiChatDrawer: React.FC<LiveAiChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! 👋 Welcome to **REYFLUX ENTERPRISES LIMITED**.\n\nI am your **Reyflux AI Assistant**. Ask me about:\n- 🛢️ **Pure Organic Palm Oil** (4L, 10L, 25L, 50L)\n- 🥣 **Fresh Garri & Cassava Flour**\n- 💳 **POS Cash & Transfer Services**\n- 🚚 **Doorstep Delivery Fees & WhatsApp Orders**`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      const data = await res.json();

      const aiReplyText = data.reply || data.error || 'I am happy to assist you with Garri, Palm Oil, Cassava Flour and POS services!';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I am currently offline or re-connecting. Please call or WhatsApp us directly at **09064153934** or **07068581710** for instant service!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "What are the current prices for 25L Palm Oil and Garri?",
    "How does doorstep cash delivery work in Suleja?",
    "Tell me about High Quality Cassava Flour and swallow tips.",
    "Give me the official WhatsApp line and store address."
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-amber-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-amber-100 shadow-inner">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-extrabold leading-tight">Reyflux AI Assistant</h2>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-amber-100 font-medium">Garri, Palm Oil, Cassava Flour & POS Advisor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I am chatting with your AI assistant and want to make an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
              title="Switch to WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs space-y-1.5 leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-white rounded-tr-none font-medium'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-amber-200/80 dark:border-slate-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-sans">
                  {msg.content}
                </div>
                <div
                  className={`text-[9px] font-mono text-right ${
                    msg.role === 'user' ? 'text-amber-100' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-semibold p-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>Reyflux AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-4 py-2 bg-amber-50/60 dark:bg-slate-900 border-t border-amber-200/50 dark:border-slate-800 overflow-x-auto flex gap-1.5 shrink-0">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-amber-100 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1 whitespace-nowrap shrink-0 transition-colors shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI about Garri, Palm Oil, POS..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow-md shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex justify-between items-center text-[10px] text-slate-500 px-1">
            <span>Direct WhatsApp Helpline: <strong className="font-mono text-emerald-600">{COMPANY_INFO.phones[0]}</strong></span>
            <span>Powered by Gemini AI</span>
          </div>
        </div>

      </div>
    </div>
  );
};
