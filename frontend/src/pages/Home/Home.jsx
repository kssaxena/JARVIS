import React, { useState } from "react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import { getGeminiResponse } from "../../services/geminiService";

const Home = () => {
  console.log("🏠 Home Component Loaded!");
  const { speak } = useTextToSpeech();
  const [response, setResponse] = useState("");
  const [inputText, setInputText] = useState(""); // State for text input
  const [activeSection, setActiveSection] = useState("Home");

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

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
    <div className="flex flex-col items-center h-screen ">
      <motion.aside
        className="w-64 text-black p-4 shadow-lg fixed"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <nav>
          <ul>
            <li
              className={`p-4 rounded-md mb-2 cursor-pointer transition-all duration-300 ${
                activeSection === "Home"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveSection("Home")}
            >
              {<User />}Home
            </li>
            <li
              className={`p-4 rounded-md mb-2 cursor-pointer transition-all duration-300 ${
                activeSection === "Vendors (Under review)"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveSection("Vendors (Under review)")}
            >
              {<ListOrdered />}Vendors (Under review)
            </li>
            <li
              className={`p-4 rounded-md mb-2 cursor-pointer transition-all duration-300 ${
                activeSection === "Vendors (Verified)"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveSection("Vendors (Verified)")}
            >
              {<Newspaper />}Vendors (Verified)
            </li>
            <li
              className={`p-4 rounded-md mb-2 cursor-pointer transition-all duration-300 ${
                activeSection === "Products"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveSection("Products")}
            >
              {<Package />}Products
            </li>
            <li
              className={`p-4 rounded-md mb-2 cursor-pointer transition-all duration-300 ${
                activeSection === "Orders"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveSection("Orders")}
            >
              {<ScanLine />}Orders
            </li>
            <li
              className={`p-4 rounded-md cursor-pointer transition-all duration-300 ${
                activeSection === "Promotions"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveSection("Promotions")}
            >
              {<Heart />}Promotions
            </li>
          </ul>
        </nav>
      </motion.aside>
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
