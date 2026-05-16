import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import API_BASE_URL from "../config/api";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi there! I'm your LifeScore AI. Ask me any finance question!" }
  ]);
  const [input, setInput] = useState("");
  const { isDark } = useTheme();
  const chatEndRef = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen);
    window.addEventListener('toggle-chatbot', handleToggle);
    return () => window.removeEventListener('toggle-chatbot', handleToggle);
  }, [isOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { sender: "user", text: userMsg }];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Exclude the initial greeting from history if you want, or send it all
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.slice(1) }) // slice(1) to remove the hardcoded greeting
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: data.msg || "Sorry, I ran into an error." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Failed to connect to the server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "5rem",
          right: "2rem",
          width: "350px",
          height: "500px",
          background: isDark ? "var(--ink2)" : "#fff",
          border: `1px solid ${isDark ? "var(--border2)" : "var(--border)"}`,
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, var(--teal), #0d382b)", padding: "1rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "35px", height: "35px", background: "var(--card-bg)", color: "var(--teal)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
              <i className="bi bi-robot"></i>
            </div>
            <div>
              <h6 style={{ margin: 0, fontWeight: 700, fontFamily: "var(--serif)" }}>LifeScore AI</h6>
              <div style={{ fontSize: "0.7rem", opacity: 0.8 }}><span style={{ color: "#4ade80" }}>●</span> Online</div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                <div style={{
                  background: msg.sender === "user" ? "var(--teal)" : (isDark ? "var(--ink)" : "var(--cream2)"),
                  color: msg.sender === "user" ? "#fff" : "var(--ink)",
                  padding: "0.75rem 1rem",
                  borderRadius: msg.sender === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", maxWidth: "80%" }}>
                <div style={{
                  background: isDark ? "var(--ink)" : "var(--cream2)",
                  color: "var(--ink)",
                  padding: "0.75rem 1rem",
                  borderRadius: "16px 16px 16px 0",
                  fontSize: "0.85rem",
                }}>
                  <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" style={{width: "0.5rem", height: "0.5rem"}}></span>
                  <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" style={{width: "0.5rem", height: "0.5rem", animationDelay: "0.2s"}}></span>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{width: "0.5rem", height: "0.5rem", animationDelay: "0.4s"}}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: "1rem", borderTop: `1px solid ${isDark ? "var(--border2)" : "var(--border)"}`, background: isDark ? "var(--ink)" : "#fff" }}>
            <form onSubmit={handleSend} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="Ask about investing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "20px",
                  border: `1px solid ${isDark ? "var(--border2)" : "var(--border)"}`,
                  background: isDark ? "var(--ink2)" : "var(--cream2)",
                  color: "var(--ink)",
                  fontSize: "0.85rem",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--teal)",
                  color: "#fff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0
                }}
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
