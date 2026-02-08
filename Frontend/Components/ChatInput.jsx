import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return; // prevent sending empty messages
    onSend(text); // send message to parent
    setText(""); // <-- clear textarea after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-transparent p-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
          <textarea
            placeholder="Message ChatGPT..."
            rows={1}
            value={text} // bind state
            onChange={(e) => setText(e.target.value)} // update state
            onKeyDown={handleKeyDown} // send on Enter
            className="
              w-full
              resize-none
              bg-transparent
              text-sm
              text-black
              placeholder:text-neutral-500
              focus:outline-none
              py-2
              leading-5
              min-h-[24px]
            "
          />
          <button
            className="shrink-0 rounded-xl bg-neutral-600 px-4 py-2 text-white cursor-pointer hover:bg-neutral-700 transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
