import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InterviewSetup = () => {
  const [domain, setDomain] = useState("");
  const [technology, setTechnology] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/v1/interview/start",
        { domain, technology },
        { withCredentials: true }
      );

      if (!data.success) {
        throw new Error(data.error || "Failed to start interview");
      }

      navigate(`/ai-features/interview/${data.sessionId}`);

    } catch (error) {
      console.error("Error starting interview:", {
        message: error.message,
        response: error.response?.data,
      });

      alert(
        error.response?.data?.error ||
        error.message ||
        "Failed to start interview"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">
          INTERVIEW PRACTICE
        </h1>

        <form onSubmit={handleStart} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Domain</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Web Development"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Technology</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., React"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Starting..." : "Begin Interview"}
          </button>

          <Link to="/ai-features">
            <button
              type="button"
              disabled={loading}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition duration-300 disabled:opacity-50"
            >
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default InterviewSetup;