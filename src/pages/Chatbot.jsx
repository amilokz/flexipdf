import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // <-- import toast

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m Ali — your FlexiPDF AI Assistant!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) {
      toast.warn("Please type something first! 🗣️"); // toast warning
      return;
    }

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.status === "success") {
        const botMsg = { sender: "bot", text: data.reply || "🤖 Sorry, no response!" };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        toast.error("Server error: " + data.reply || "Unknown error");
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Something went wrong on the server." },
        ]);
      }
    } catch (error) {
      toast.error("Cannot reach backend server! ⚠️");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server not responding. Check backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl flex flex-col h-[600px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-4 border-b border-white/20 text-center font-bold text-xl text-cyan-300">
          🤖 FlexiPDF AI Chatbot
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.sender === "user"
                  ? "ml-auto bg-cyan-600 text-white"
                  : "mr-auto bg-slate-700 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-center text-cyan-300 animate-pulse">Thinking...</div>
          )}
        </div>

        <div className="p-4 border-t border-white/20 flex items-center gap-2">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={handleSend}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}
