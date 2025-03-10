import { useState, useEffect, useRef } from "react";

const useSpeechRecognition = (onCommandRecognized) => {
  console.log("🔄 Hook Initialized!");

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("❌ Speech Recognition API not supported.");
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    console.log("✅ SpeechRecognition Object Created:", recognitionRef.current);

    recognitionRef.current.onstart = () => {
      console.log("🎧 Speech recognition started, waiting for input...");
    };

    recognitionRef.current.onresult = (event) => {
      console.log("🎤 Speech Detected!");
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("✅ Recognized Command:", command);
      onCommandRecognized(command);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("❌ Speech Recognition Error:", event.error);
    };

    recognitionRef.current.onend = () => {
      console.log("🛑 Speech recognition stopped.");
      setIsListening(false);
    };
  }, [onCommandRecognized]); // Effect runs only when `onCommandRecognized` changes

  const startListening = () => {
    console.log("🖱️ startListening() function triggered!");

    if (!recognitionRef.current) {
      console.error("❌ Recognition instance is null.");
      return;
    }

    try {
      recognitionRef.current.start();
      console.log("✅ recognition.start() executed successfully!");
      setIsListening(true);
    } catch (error) {
      console.error("❌ Error calling recognition.start():", error);
    }
  };

  const stopListening = () => {
    console.log("🛑 Stopping speech recognition...");
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  return { startListening, stopListening, isListening };
};

export default useSpeechRecognition;
