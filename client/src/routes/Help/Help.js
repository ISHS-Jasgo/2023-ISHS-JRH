import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "../../js/tts";
import styles from "./Help.module.css";
import { speechToText } from "../../js/stt";
import { explainApp, explainBtn } from "../../js/readHelp";
import { positiveResponse } from "../../js/sttHandle";

function Help() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  useEffect(() => {
    const readHelp = async () => {
      await explainBtn();

      await textToSpeech(
        "이 앱의 개발자와 이 앱의 개발 배경에 대해 설명해드릴까요?",
        1
      );
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        await explainApp();
      }
      await textToSpeech("다시 들려드릴까요?", 1);
      const userResult = await speechToText(3000);
      if (positiveResponse.has(userResult)) {
        readHelp();
      } else {
        await textToSpeech("첫 화면으로 돌아갑니다.", 1);
        navigateTo("/home");
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    readHelp();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className={styles.center}>
    </div>
  );
}

export default Help;
