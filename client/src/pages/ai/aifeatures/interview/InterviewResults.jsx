import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Star, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


const InterviewResults = () => {

    const navigate = useNavigate();

  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/interview/results/${id}`,
          { withCredentials: true }
        );
        
        if (!data.success) {
          throw new Error(data.error || "Failed to load results");
        }
        
        setSession(data.session);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.error || err.message);
        
        navigate("/ai-features", { state: { error: "Session not found" } });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id, navigate]);


  if (loading) return <div className="text-white">Loading results...</div>;

  if (error) return (
    <div className="text-red-500 text-center p-8">
      <AlertCircle className="inline-block mr-2" />
      {error}
    </div>
  );

  if (!session) return (
    <div className="text-red-500 text-center mt-8">
      <AlertCircle className="inline-block mr-2" />
      Session not found
    </div>
  );

  const totalScore = session.responses.reduce(
    (sum, response) => sum + response.evaluation.score,
    0
  );
  const averageScore = (totalScore / session.responses.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Interview Results</h1>
          <div className="bg-gray-800 p-6 rounded-xl inline-block">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={24} />
              <span className="text-2xl font-bold">{averageScore}/10</span>
            </div>
            <p className="text-gray-400 mt-2">
              {session.domain} - {session.technology}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {session.responses.map((response, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Question {index + 1}
                  </h3>
                  <p className="text-gray-300 mt-2">{response.question}</p>
                </div>
                <div className="bg-blue-600 px-4 py-2 rounded-lg">
                  {response.evaluation.score}/10
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-lg font-medium mb-2">Your Answer</h4>
                <p className="text-gray-300 whitespace-pre-wrap">
                  {response.answer}
                </p>
              </div>
              
              <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Feedback</h4>
                <p className="text-gray-300">{response.evaluation.feedback}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
          <Link to="/ai-features">
          <Button
  variant="outline"
  className="text-black border border-gray-500 hover:bg-gray-600 hover:text-gray-900 transition-all duration-300"
>
  HOME
</Button>
          
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;