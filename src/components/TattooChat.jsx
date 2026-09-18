import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader, Bot, User } from "lucide-react";
import "./TattooChat.css";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are INK, an expert tattoo design consultant for INKED Studio — a premium tattoo studio. 
Your job is to help users discover the perfect tattoo design for them.

You help with:
- Suggesting tattoo styles (Blackwork, Realism, Geometric, Minimal, Japanese, Traditional, Watercolour, Tribal)
- Recommending placements based on design size and lifestyle
- Explaining the meaning behind different symbols and motifs
- Advising on size, detail level, and how designs age on skin
- Helping users articulate their vision to the artist
- Answering aftercare and process questions

Keep responses concise, warm, and enthusiastic about tattoo art.
Never give medical advice. Always recommend consulting the artist for final decisions.
When relevant, encourage the user to book an appointment at INKED Studio.`;

const TattooChat = () => {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm INK, your tattoo design consultant 🖤 Tell me about yourself and what kind of tattoo you're thinking about — I'll help you find the perfect design.",
    },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 512,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq error:", err.message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`chat-trigger ${open ? "chat-trigger--active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Open tattoo design assistant"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chat-trigger__label">Design Help</span>}
      </button>

      {/* Chat panel */}
      <div className={`chat-panel ${open ? "chat-panel--open" : ""}`}>
        {/* Header */}
        <div className="chat-panel__header">
          <div className="chat-panel__header-info">
            <div className="chat-panel__avatar">
              <Bot size={18} />
            </div>
            <div>
              <p className="chat-panel__name">INK</p>
              <span className="chat-panel__status">Tattoo Design Consultant</span>
            </div>
          </div>
          <button className="chat-panel__close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-panel__messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-msg chat-msg--${msg.role}`}
            >
              <div className="chat-msg__icon">
                {msg.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className="chat-msg__bubble">
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg chat-msg--assistant">
              <div className="chat-msg__icon"><Bot size={14} /></div>
              <div className="chat-msg__bubble chat-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-panel__input-wrap">
          <textarea
            ref={inputRef}
            className="chat-panel__input"
            placeholder="Ask about styles, placement, meaning…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            disabled={loading}
          />
          <button
            className="chat-panel__send"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            {loading ? <Loader size={16} className="spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="chat-panel__footer">Powered by Groq · Press Enter to send</p>
      </div>

      {/* Backdrop for mobile */}
      {open && <div className="chat-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
};

export default TattooChat;
