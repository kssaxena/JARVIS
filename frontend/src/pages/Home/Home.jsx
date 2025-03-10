import React, { useState } from "react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import { getGeminiResponse } from "../../services/geminiService";

const Home = () => {
  console.log("🏠 Home Component Loaded!");
  const { speak } = useTextToSpeech();
  const [response, setResponse] = useState("");
  const [inputText, setInputText] = useState(""); // State for text input

  const handleCommand = async (command) => {
    console.log("🛠️ Processing Command:", command);
    setResponse("Thinking...");

    const aiReply = await getGeminiResponse(command); // Get AI response
    setResponse(aiReply);
    speak(aiReply); // Speak out the response
  };

  const { startListening, isListening } = useSpeechRecognition(handleCommand);

  // Handle text input submission
  const handleTextSubmit = async () => {
    if (!inputText.trim()) return; // Ignore empty input
    setResponse("Thinking...");

    const aiReply = await getGeminiResponse(inputText);
    setResponse(aiReply);
    // speak(aiReply); // Speak out response
    setInputText(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col items-center lightDark h-screen ">
      <h1>J.A.R.V.I.S. Assistant</h1>

      {/* Speech Recognition Button */}
      <button
        onClick={startListening}
        className="p-2 bg-blue-500 text-white mt-2"
      >
        {isListening ? "Listening..." : "Start Listening"}
      </button>

      {/* Text Input Search */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your question..."
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleTextSubmit}
          className="p-2 bg-green-500 text-white"
        >
          Ask
        </button>
      </div>

      {/* Response Output */}
      <p className="mt-4 text-lg">{response}</p>
    </div>
  );
};

export default Home;
