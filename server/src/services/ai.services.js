import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    messages: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "system",
        content: `
                Act as an expert in programming languages who has read through many programming advice online for Python, Java, C, sql, and C++.
        Can you please help suggest improvements for the given code, mentioning the existing code line by line with proper indentation? 
        Can you also give time and space complexities for the improved code version? 
        While responding, can you use this format? 
        Suggestions
        Improved code
        Time and space complexities 
        Personalized learning links
                `,
      },
    ],
  });

  return chatCompletion.choices[0].message.content;
}

export default getResponse;
