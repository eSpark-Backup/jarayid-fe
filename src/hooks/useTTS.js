import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useTTS = () => {
  const language = useSelector((state) => state.language);
  const utteranceRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      setVoices(loadedVoices);
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }

    const handleBeforeUnload = () => {
      window.speechSynthesis.cancel();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.speechSynthesis.cancel();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [language]);

  const speak = (text, lang = "en-US") => {
    if (!window.speechSynthesis) {
      alert("TTS not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    const matchingVoice = voices.find(
      (v) => v.lang === lang || v.lang.startsWith(lang)
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    } else {
      toast.error(
        `No matching voice found for language "${lang}". Please make sure it's installed on your system.`
      );
      return;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return { speak, stop, voices, isSpeaking };
};

export default useTTS;
