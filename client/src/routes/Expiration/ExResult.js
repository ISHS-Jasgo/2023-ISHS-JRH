import { useLocation } from "react-router-dom";
import { getSpeech, stopSpeech } from "./../../js/tts";
import { useEffect } from "react";

function ExResult() {
  const location = useLocation();
  const ttsText = `상품의 유통기한은 ${location.state.resDate} 입니다.`;

  useEffect(() => {
    window.speechSynthesis.getVoices();
    stopSpeech();
    getSpeech(ttsText);
  }, []);

  return (
    <div>
      <h1>{ttsText}</h1>
    </div>
  );
}

export default ExResult;
