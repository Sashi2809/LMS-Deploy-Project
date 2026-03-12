import roadmap from "../src/services/roadmap.services.js";

export const roadmapHandler = async (req, res) => {
    const { topic, difficulty, numQuestions } = req.body;
  
    // Add validation for numbers
    if (!topic || !difficulty || !numQuestions) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    if (isNaN(numQuestions)) {
      return res.status(400).json({ error: "Number of questions must be numeric" });
    }
  
    try {
      const quizContent = await roadmap(topic, difficulty, parseInt(numQuestions));
      res.json({ quiz: quizContent });
    } catch (error) {
      console.error("Quiz Generation Error:", error);
      res.status(500).json({ 
        error: "Failed to generate quiz",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };