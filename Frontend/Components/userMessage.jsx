import React from "react";

const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end my-2">
      <div className="bg-neutral-600 text-white p-3 rounded-xl max-w-[75%]">
        {content}
      </div>
    </div>
  );
};

export default UserMessage;
