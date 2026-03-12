import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function CodeReview() {
  const [code, setCode] = useState(`def sum():\n  return a + b\n`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/ai/get-review/", { code });
      setReview(response.data.response || "No review available");
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error retrieving review. Please try again.");
    }
    setIsLoading(false);
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4 md:p-6 gap-4 md:gap-6">
      {/* Header with Back Button (Responsive) */}
      <header className="w-full flex items-center gap-3 py-3 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
        <Link to="/ai-features" className="text-white bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition text-sm md:text-base">
          ⬅ Back
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-center flex-grow text-white">
          AI Code Reviewer 🤖
        </h1>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        
        {/* Code Editor Section */}
        <div className="w-full md:w-1/2 bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            onChange={handleFileUpload}
            className="mb-3 md:mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg w-full"
          />
          <div className="border border-gray-600 rounded-lg p-3 md:p-4 bg-gray-900">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => Prism.highlight(code, Prism.languages.python, "python")}
              padding={10}
              style={{ fontFamily: "Fira Code, monospace", fontSize: 14, minHeight: "150px" }}
            />
          </div>
          <button
            onClick={reviewCode}
            className="w-full mt-3 md:mt-4 py-2 md:py-3 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Review Code 🤖
          </button>
        </div>

        {/* AI Review Section */}
        <div className="w-full md:w-1/2 bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <div className="text-gray-300 h-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-purple-500 mb-3 md:mb-4"></div>
                <p className="text-base md:text-lg text-purple-400 font-semibold">
                  Analyzing Code...
                </p>
                <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
                  This may take a few moments
                </p>
              </div>
            ) : (
              <Markdown rehypePlugins={[rehypeHighlight]} className="text-sm md:text-base">
                {review}
              </Markdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
