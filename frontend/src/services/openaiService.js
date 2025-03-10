import axios from "axios";

const API_KEY = process.env.OPEN_AI_KEY; // Store in .env file
const API_URL = "https://api.openai.com/v1/chat/completions";

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // You can upgrade to gpt-4
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    return "I'm having trouble connecting to OpenAI.";
  }
};
