import React from "react";

const Loading = () => {
  return (
    <div className="flex gap-2 justify-center items-center h-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-700 mb-2">Loading</p>
      <div className="flex space-x-2">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default Loading;
