import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatInput from "./ChatInput";
import UserMessage from "./userMessage";
import BotMessage from "./assistantMessage";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", content: message }]);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        message,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: response.data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, idx) =>
          msg.sender === "user" ? (
            <UserMessage key={idx} content={msg.content} />
          ) : (
            <BotMessage key={idx} content={msg.content} />
          ),
        )}

        {loading && <BotMessage content="Typing..." />}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
