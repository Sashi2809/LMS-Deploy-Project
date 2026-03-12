import { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

function RoadmapGenerator() {
  const [topic, setTopic] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState("beginner");
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizContent, setQuizContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:8080/api/v1/roadmap/generate-roadmap", {
        topic,
        difficulty,
        numQuestions: Number(numQuestions)
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (!response.data.quiz) {
        throw new Error("Empty quiz response from server");
      }
      

      setQuizContent(response.data.quiz);
    } catch (error) {
        console.error("Full error:", error);
        const serverMessage = error.response?.data?.error;
        const groqMessage = error.response?.data?.details;
        setQuizContent(`**Error:** ${serverMessage || groqMessage || error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8 bg-gray-800 p-4 rounded-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/ai-features" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg">
            ⬅ Back
          </Link>
          <h1 className="text-2xl font-bold">AI Roadmap Generator 🧠</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleGenerateQuiz} className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-2">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Topic Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Number of Days</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              >
                {[3, 5, 10, 15, 30, 45, 60, 90, 180, 360].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all"
          >
            {isLoading ? 'Generating Roadmap...' : 'Generate Roadmap 🚀'}
          </button>
        </form>

        {quizContent && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <Markdown className="prose prose-invert max-w-none">
              {quizContent}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapGenerator;