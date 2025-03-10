import React from "react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition.js";
import useTextToSpeech from "../../hooks/useTextToSpeech.js";

const Home = () => {
  console.log("🏠 Home Component Loaded!");

  const { speak } = useTextToSpeech();

  const handleCommand = (command) => {
    console.log("🛠️ Processing Command:", command);
    let reply = "I didn't understand.";
    if (command.includes("hello")) reply = "Hello! How can I assist you?";
    speak(reply);
  };

  const { startListening, stopListening, isListening } =
    useSpeechRecognition(handleCommand);

  return (
    <div className="flex flex-col items-center">
      <h1>J.A.R.V.I.S. Assistant</h1>
      <button
        onClick={() => {
          console.log("🖱️ Button Clicked!");
          startListening();
        }}
        className="p-2 bg-blue-500 text-white"
      >
        {isListening ? "Listening..." : "Start Listening"}
      </button>
      <button
        onClick={stopListening}
        className="mt-2 p-2 bg-red-500 text-white"
      >
        Stop Listening
      </button>
    </div>
  );
};

export default Home;