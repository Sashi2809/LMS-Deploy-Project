import axios from 'axios';
import { InterviewSession } from "../models/interviewSession.model.js";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Helper function to parse Groq responses
const parseGroqResponse = (responseText) => {
  try {
    const jsonMatch = responseText.match(/\{.*\}/s);
    if (!jsonMatch) {
      throw new Error("Invalid JSON format in Groq response");
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error parsing Groq response:", error);
    throw new Error("Failed to parse Groq response");
  }
};

// Generate interview questions using Groq API
const generateQuestions = async (domain, technology) => {
  const prompt = `Generate 10 technical interview questions for ${domain} domain focusing on ${technology}.
  Return ONLY valid JSON format: { "questions": ["question1", "question2"] }`;

  console.log("Sending to Groq:", prompt);

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "meta-llama/llama-4-maverick-17b-128e-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
        timeout: 10000, // 10-second timeout
      }
    );

    console.log("Groq raw response:", response.data);

    // Extract and validate the response
    const content = response.data.choices[0].message.content;
    const parsed = parseGroqResponse(content);

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error("Invalid questions format from Groq");
    }

    return parsed.questions;

  } catch (error) {
    console.error("Groq API Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
};

// Evaluate an answer using Groq API
const evaluateAnswer = async (question, answer) => {
    const prompt = `Evaluate this interview answer on scale 1-10. Be friendly.
    Question: "${question}"
    Answer: "${answer}"
    
    Return ONLY a valid JSON response, nothing else:
    {
      "score": <number>,
      "feedback": "<detailed feedback>"
    }`;
  
    try {
      const response = await axios.post(
        GROQ_URL,
        {
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
        },
        {
          headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
        }
      );
  
      // 🟡 Log API response before parsing
      console.log(" Groq API Response:", JSON.stringify(response.data, null, 2));
  
      let content = response.data.choices?.[0]?.message?.content;
  
      if (!content) {
        console.error(" Groq API Error: Empty response content.");
        return { score: 0, feedback: "Feedback unavailable due to API issue." };
      }
  
      // 🟡 Ensure the response is properly formatted JSON
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch (parseError) {
        console.error(" JSON Parse Error: Returning default feedback.");
        console.log(" Raw Response from API:", content);
  
        // Return a default evaluation instead of failing
        return { score: 0, feedback: "Give releavant answer to get feedback." };
      }
  
      if (!parsed.score || !parsed.feedback) {
        return { score: 0, feedback: "Give releavant answer to get feedback." };
      }
  
      return parsed;
    } catch (error) {
      console.error(" Groq API Error: Returning default response.");
      return { score: 0, feedback: "Feedback unavailable due to API error." };
    }
  };
  
// Start a new interview session
export const startInterview = async (req, res) => {
  try {
    const { domain, technology } = req.body;

    // Validate inputs
    if (!domain?.trim() || !technology?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Domain and technology are required",
      });
    }

    console.log("Starting interview for:", { domain, technology });

    // Generate questions
    const questions = await generateQuestions(domain, technology);
    console.log("Generated questions:", questions);

    // Create session
    const session = await InterviewSession.create({
      user: req.id,
      domain,
      technology,
      questions,
      currentQuestion: 0,
    });

    res.status(201).json({
      success: true,
      sessionId: session._id,
      question: questions[0],
    });

  } catch (error) {
    console.error("Start Interview Error:", {
      message: error.message,
      body: req.body,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};

// Submit an answer for the current question
export const submitAnswer = async (req, res) => {
  try {
    const { sessionId, answerText } = req.body;
    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const evaluation = await evaluateAnswer(
      session.questions[session.currentQuestion],
      answerText
    );

    session.responses.push({
      question: session.questions[session.currentQuestion],
      answer: answerText,
      evaluation,
    });

    session.currentQuestion += 1;

    if (session.currentQuestion >= session.questions.length) {
      session.completed = true;
    }

    await session.save();

    res.json({
      success: true,
      nextQuestion: session.questions[session.currentQuestion] || null,
      completed: session.completed,
      evaluation,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Failed to submit answer",
    });
  }
};

// Get interview results
export const getResults = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id)
      .populate("user", "name email")
      .lean();

    if (!session) {
      throw new Error("Session not found");
    }

    res.json({ success: true, session });

  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};