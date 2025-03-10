const useTextToSpeech = () => {
  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  return { speak };
};

export default useTextToSpeech;
