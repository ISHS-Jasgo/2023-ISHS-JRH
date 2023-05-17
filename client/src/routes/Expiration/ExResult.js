import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";

function ExResult() {
  const [resText, setResText] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  useEffect(() => {
    const setDate = () => {
      let resDate = location.state.resDate;
      resDate = resDate.replace("-", "년 ");
      resDate = resDate.replace("-", "월 ");
      resDate += "일";
      console.log(resDate);
      return resDate;
    };

    const speakDate = async () => {
      await textToSpeech(ttsText);
      await textToSpeech("다시 들려드릴까요?", true);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        speakDate();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", true);
        navigateTo("/home");
      }
    };

    const resDate = setDate();
    const ttsText = `상품의 유통기한은 ${resDate} 입니다.`;
    setResText(ttsText);

    speakDate();
  }, []);

  return (
    <div>
      <h1>{resText}</h1>
    </div>
  );
}

export default ExResult;
