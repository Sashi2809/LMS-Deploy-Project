import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  domain: String,
  technology: String,
  questions: [String],
  responses: [{
    question: String,
    answer: String,
    evaluation: {
      score: Number,
      feedback: String
    }
  }],
  currentQuestion: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);