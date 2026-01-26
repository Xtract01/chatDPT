import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import UserMessage from "./userMessage";
import BotMessage from "./assistantMessage";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (message) => {
    setMessages((prev) => [...prev, { sender: "user", content: message }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: `You said: ${message}` },
      ]);
    }, 500);
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
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
