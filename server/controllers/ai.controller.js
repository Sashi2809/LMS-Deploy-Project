import getResponse from "../src/services/ai.services.js"; // ✅ Ensure correct path

export const getResponseHandler = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await getResponse(code);
    res.json({ response });
  } catch (error) {
    console.error("AI Response Error:", error); // ✅ Better logging
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
