import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";
import styles from "./ExResult.module.css";

function ExResult() {
  const [resText, setResText] = useState("");
  const [text, setText] = useState("");
  const [caneat, setCaneat] = useState();

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

    const speakInfo = async () => {
      let ndate = new Date();
      const pdate = new Date(location.state.resDate);

      //can't eat : 0 / warn to eat : 1 / can eat : 2

      if (pdate > ndate) {
        const tmpdate = new Date(pdate);
        tmpdate.setDate(tmpdate.getDate() - 3);

        if (tmpdate <= ndate) {
          setCaneat(1);
          await textToSpeech(
            "제품의 유통기한이 얼마남지 않았습니다. 빠른 시일 내에 섭취하시길 권고드립니다.",
            true
          );
        } else {
          setCaneat(2);
          await textToSpeech("먹어도 좋습니다.", true);
        }
      } else {
        setCaneat(0);
        await textToSpeech("건강에 위험할 수 있습니다.", true);
      }
    };

    const speakDate = async () => {
      await textToSpeech(ttsText);
      await speakInfo();
      await textToSpeech("다시 들려드릴까요?", true);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        speakDate();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/home");
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    const resDate = setDate();
    const ttsText = `상품의 유통기한은 ${resDate} 입니다.`;

    const speakTotal = async () => {
      setResText(ttsText);
      setText(resDate);
      await speakDate();
    };

    speakTotal();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
    </div>
  );
}

export default ExResult;
