import { useLocation } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { useEffect, useState } from "react";

function ExResult() {
  const [resText, setResText] = useState("");
  const location = useLocation();

  useEffect(() => {
    let resDate = location.state.resDate;
    resDate = resDate.replace("-", "년 ");
    resDate = resDate.replace("-", "월 ");
    resDate += "일";
    console.log(resDate);
    const ttsText = `상품의 유통기한은 ${resDate} 입니다.`;
    setResText(ttsText);
    textToSpeech(ttsText, false);
  }, []);

  return (
    <div>
      <h1>{resText}</h1>
    </div>
  );
}

export default ExResult;
