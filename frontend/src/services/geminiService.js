import axios from "axios";

const API_KEY = process.env.GEMINI_AI_KEY; // Store API Key in .env
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I didn't understand that."
    );
  } catch (error) {
    console.error("❌ Google Gemini API Error:", error);
    return "I'm having trouble connecting to Gemini AI.";
  }
};