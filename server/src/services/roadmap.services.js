import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function roadmap(topic, difficulty, numQuestions) {
    try {
        if (!topic || !difficulty || !numQuestions) {
            throw new Error("Missing required fields: topic, difficulty, or numQuestions");
          }
      
          // Ensure numQuestions is a number
          const numQuestionsInt = parseInt(numQuestions);
          if (isNaN(numQuestionsInt)) {
            throw new Error("numQuestions must be a valid number");
          }
      
          // Validate Groq API key
          if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is missing in environment variables");
          }
      const chatCompletion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-maverick-17b-128e-instruct",
        messages: [{
          role: "system",
          content: `You are an expert learning roadmap generator . Create a ${difficulty}-level ${numQuestions}-day learning roadmap for mastering ${topic}. if any other topic not related to learning or study give response as give releavant roadmap topic to generate
Format strictly as:

### Day 1
**Focus Area:** [Specific topic/concept to learn on Day 1]

**Tasks:**
1. [Task 1 - Beginner-friendly activity]
2. [Task 2 - Practice exercise]
3. [Task 3 - Resource to study]

**Key Concept:** 
[1-2 sentence explanation of the focus area]

**Checkpoint:** 
[A small quiz or task to validate understanding]

---
---

### Day 2
**Focus Area:** [Next topic/concept to learn on Day 2]

**Tasks:**
1. [Task 1 - Activity to build on Day 1 knowledge]
2. [Task 2 - Practice exercise]
3. [Task 3 - Resource to study]

**Key Concept:** 
[1-2 sentence explanation of the focus area]

**Checkpoint:**
[A small quiz or task to validate understanding]

---
---

[... Continue for all days]

### Final Day (Day ${numQuestions})
**Focus Area:** [Final topic/concept to complete the roadmap]

**Tasks:**
1. [Task 1 - Comprehensive review]
2. [Task 2 - Final project or practice exercise]
3. [Task 3 - Resource to solidify knowledge]

**Key Concept:** 
[1-2 sentence explanation of the focus area]

**Checkpoint:** 
[Final assessment or project to validate mastery]

---
---
**resources**
[give learning resorces 2-3]
---

**Note:** Adjust the pace based on your understanding. Revisit previous days if needed.
`
        }, {
          role: "user",
          content: `Generate a ${difficulty} roadmap about ${topic} with ${numQuestions} days.`
        }],
        temperature:0.7
      });
    
      if (!chatCompletion.choices?.[0]?.message?.content) {
        throw new Error("Empty response from AI model");
      }
      
    
      return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error("GROQ API Error Details:", {
            error: error.message,
            stack: error.stack,
            apiKeyPresent: !!process.env.GROQ_API_KEY,
            model: "mixtral-8x7b-32768"
          });
          throw error;
    }
    
}

export default roadmap;