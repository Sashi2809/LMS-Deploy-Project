import React, { useState, useRef } from "react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode =
        code.substring(0, selectionStart) +
        "    " +
        code.substring(selectionEnd);
      setCode(newCode);
      
      setTimeout(() => {
        textareaRef.current.selectionStart = selectionStart + 4;
        textareaRef.current.selectionEnd = selectionStart + 4;
      }, 0);
    }
  };

  const runCode = async () => {
    setOutput("Running...");
    try {
      const response = await axios.post("http://localhost:8080/api/v1/code/run/", {
        code,
        language,
      });
      setOutput(response.data.response);
    } catch (error) {
      setOutput("Error executing code.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl m-4 md:m-8 font-bold text-center text-blue-400">
          Code Editor
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - Code Input */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <select
                className="p-2 w-full md:w-[40%] bg-gray-700 border border-gray-600 rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="sql">SQL</option>
              </select>

              
            </div>

            <textarea
              ref={textareaRef}
              className="w-full h-64 md:h-96 p-4 bg-gray-800 border border-gray-700 rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your code here..."
            />
          </div>

          {/* Right Section - Output */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
          <button
                onClick={runCode}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 w-full md:w-[40%] rounded font-bold"
              >
                Run Code
              </button>
            <div className="p-4 h-64 md:h-[272px] bg-gray-800 border border-gray-700 rounded overflow-auto">
              <h2 className="text-lg font-semibold mb-2">Output:</h2>
              <pre className="whitespace-pre-wrap break-words">{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;