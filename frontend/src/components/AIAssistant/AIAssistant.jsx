"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  FileText, 
  ExternalLink, 
  MessageCircle, 
  User, 
  ChevronDown 
} from "lucide-react";
import { sendChatMessage } from "@/lib/api";

const SUGGESTED_PROMPTS = [
  "What are your top projects?",
  "Tell me about your tech stack",
  "Download Ritik's Resume",
  "How can I contact Ritik for hiring?"
];

const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    sender: "ai",
    text: "Hi! I'm **Ritik AI** 👋\nI'm Ritik Varun's personal AI portfolio assistant powered by LangChain & Google Gemini. Ask me anything about his projects, skills, education, or get his resume!",
    action: null,
    timestamp: new Date()
  }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (textToSend = null) => {
    const query = typeof textToSend === "string" ? textToSend : input;
    if (!query.trim() || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      action: null,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      // Build conversation history for LangChain
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await sendChatMessage(query.trim(), history);

      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: res.reply || "Sorry, I could not process that.",
        action: res.action || null,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I'm having a little trouble connecting to the AI server right now, but you can always reach Ritik directly via email at **ritikvarun64@gmail.com** or WhatsApp at **+91 9808433521**.",
          action: { type: "WHATSAPP", label: "Chat on WhatsApp", url: "https://wa.me/919808843521" },
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render markdown-like text (bold, lists, links, linebreaks)
  const renderFormattedText = (content) => {
    if (!content) return null;

    return content.split("\n").map((line, idx) => {
      // Format bold text **text**
      const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-zinc-200/90 my-1 leading-relaxed">
            {formattedLine}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <li key={idx} className="ml-4 list-decimal text-zinc-200/90 my-1 leading-relaxed">
            {formattedLine}
          </li>
        );
      }

      return (
        <p key={idx} className={`text-zinc-200/90 leading-relaxed ${line.trim() === "" ? "h-2" : "my-1"}`}>
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left on Desktop, Bottom Left on Mobile) */}
      <aside
        aria-label="Ritik AI Assistant"
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-[99999] pointer-events-auto select-none"
        style={{
          bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))",
          left: "max(1.25rem, calc(env(safe-area-inset-left, 0px) + 1rem))",
        }}
      >
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative isolate flex items-center justify-center p-3 sm:py-3 sm:px-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white rounded-full shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all duration-300 cursor-pointer border border-indigo-400/30"
          title="Chat with Ritik AI"
          aria-label="Open AI Assistant"
        >
          {/* Subtle Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 animate-ping pointer-events-none -z-10" />

          {/* Icon */}
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-white shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>

          {/* Expandable Label */}
          <span className="hidden sm:inline-block ml-2.5 text-sm font-semibold tracking-wide text-white drop-shadow-sm">
            Ask Ritik AI
          </span>
        </motion.button>
      </aside>

      {/* Expandable Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-20 left-4 right-4 sm:right-auto sm:left-6 sm:w-[420px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6.5rem)] z-[99999] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden select-text"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-zinc-900/90 via-indigo-950/40 to-zinc-900/90 border-b border-zinc-800/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/30">
                  <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-950 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-wide">Ritik AI</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      LangChain
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Powered by Google Gemini RAG</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[84%] flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-[13.5px] shadow-md ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none"
                          : "bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-bl-none"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div>{renderFormattedText(msg.text)}</div>
                      )}
                    </div>

                    {/* Action Cards / Action Buttons attached to AI reply */}
                    {msg.sender === "ai" && msg.action && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.action.type === "DOWNLOAD_CV" && (
                          <a
                            href={msg.action.url || "http://localhost:5000/api/download-cv"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            {msg.action.label || "Download Resume (CV)"}
                          </a>
                        )}

                        {msg.action.type === "WHATSAPP" && (
                          <a
                            href={msg.action.url || "https://wa.me/919808843521"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            {msg.action.label || "Chat on WhatsApp"}
                          </a>
                        )}

                        {msg.action.type === "VIEW_PROJECT" && (
                          <a
                            href="/projects"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {msg.action.label || "Explore Projects"}
                          </a>
                        )}
                      </div>
                    )}

                    <span className="text-[10px] text-zinc-500 mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-zinc-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing animation indicator */}
              {loading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Chips (when only 1 or 2 messages exist) */}
            {messages.length <= 3 && !loading && (
              <div className="px-4 py-2 border-t border-zinc-850 bg-zinc-950/60 overflow-x-auto scrollbar-none flex gap-2">
                {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 px-3 py-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full border border-zinc-750 hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm"
                  >
                    ✨ {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Bar */}
            <div className="p-3 bg-zinc-900/90 border-t border-zinc-800/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 focus-within:border-indigo-500/70 rounded-2xl px-3.5 py-1.5 transition-all"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Ritik's projects, skills, CV..."
                  className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder-zinc-500 outline-none py-1.5"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    input.trim() && !loading
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-md shadow-indigo-500/30 scale-100"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Send Message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="text-center mt-1.5">
                <span className="text-[10px] text-zinc-500">
                  Ritik AI can make mistakes. Check projects for exact info.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
