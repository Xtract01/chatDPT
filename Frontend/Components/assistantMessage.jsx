import React from "react";

const AssistantMessage = ({ content }) => {
  return (
    <div className="flex justify-start my-2">
      <div className="bg-gray-100 text-gray-900 p-3 rounded-xl max-w-[75%]">
        {content}
      </div>
    </div>
  );
};

export default AssistantMessage;
