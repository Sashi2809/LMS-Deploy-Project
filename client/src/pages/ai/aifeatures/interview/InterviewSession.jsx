import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

const InterviewSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/interview/results/${sessionId}`,
          { withCredentials: true }
        );
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching session:", error);
        navigate("/ai-features");
      }
    };
    fetchSession();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionId, navigate]);

  const handleAnswerSubmission = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/interview/submit",
        { sessionId, answerText: answer },
        { withCredentials: true }
      );

      setCurrentFeedback(data.evaluation);
      setIsSubmitted(true);

      setSession((prev) => ({
        ...prev,
        responses: [
          ...prev.responses,
          {
            question: prev.questions[prev.currentQuestion],
            answer,
            evaluation: data.evaluation,
          },
        ],
      }));
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer");
    }
  };

  const handleNextQuestion = () => {
    if (session.currentQuestion < session.questions.length - 1) {
      setSession((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setAnswer("");
      setIsSubmitted(false);
      setCurrentFeedback(null);
    } else {
      navigate(`/ai-features/interview/results/${sessionId}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!session) {
    return (
      <div className="text-white text-center p-8">Loading interview session...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            {session.domain} - {session.technology}
          </h1>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            Time Remaining: {formatTime(timer)}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Question {session.currentQuestion + 1}/{session.questions.length}
          </h2>
          <p className="text-gray-300 text-lg">
            {session.questions[session.currentQuestion]}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          {!isSubmitted ? (
            <>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="w-full bg-gray-700 rounded-lg p-4 text-white mb-4"
                rows="5"
              />

              <button
                onClick={handleAnswerSubmission}
                disabled={!answer}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                Submit Answer
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{answer}</p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Feedback</h3>
                  <span className="bg-blue-600 px-3 py-1 rounded-full">
                    {currentFeedback?.score}/10
                  </span>
                </div>
                <p className="text-gray-300">{currentFeedback?.feedback}</p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {session.currentQuestion < session.questions.length - 1
                  ? "Next Question"
                  : "Finish Interview"}
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;