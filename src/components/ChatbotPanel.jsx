import React, { useState, useEffect, useRef } from "react";

const ChatbotPanel = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const backendURL = "http://localhost:5000";

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Fetch existing chat history when component loads
  useEffect(() => {
    fetch(`${backendURL}/chat/history`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setChatHistory(data.history || []);
      })
      .catch(() => console.log("⚠️ Failed to fetch chat history"));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { user: input, ai: "..." };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${backendURL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setIsTyping(false);
      if (data.status === "success") {
        setChatHistory((prev) => [
          ...prev.slice(0, -1),
          { user: input, ai: data.reply },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev.slice(0, -1),
          { user: input, ai: "⚠️ Error: Could not get response." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { user: input, ai: "❌ Server not responding." },
      ]);
    }
  };

  const clearHistory = async () => {
    try {
      const res = await fetch(`${backendURL}/chat/clear`, { method: "DELETE" });
      const data = await res.json();
      if (data.status === "success") {
        setChatHistory([]);
        alert("🧹 Chat history cleared!");
      }
    } catch (error) {
      alert("❌ Failed to clear chat history.");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-3">
        🤖 FlexiPDF AI Chatbot
      </h2>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto max-h-[65vh] bg-white/5 rounded-xl p-3 space-y-3">
        {chatHistory.length === 0 ? (
          <p className="text-center text-gray-300">
            👋 Start chatting with Ali, your FlexiPDF AI Assistant!
          </p>
        ) : (
          chatHistory.map((chat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-right">
                <p className="inline-block bg-blue-600 text-white px-4 py-2 rounded-2xl">
                  {chat.user}
                </p>
              </div>
              <div className="text-left">
                <p className="inline-block bg-gray-800 text-gray-100 px-4 py-2 rounded-2xl">
                  {chat.ai}
                </p>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="text-left text-gray-300 italic">Ali is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
        >
          Send
        </button>
        <button
          onClick={clearHistory}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all"
        >
          🧹
        </button>
      </div>
    </div>
  );
};

export default ChatbotPanel;
