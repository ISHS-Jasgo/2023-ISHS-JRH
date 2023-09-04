import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Global/Button";
import ImgButton from "../components/Global/ImgButton";
import Modal from "../components/Setting/Modal";
import { textToSpeech } from "../js/tts";
import { speechToText } from "../js/stt";
import { negativeResponse } from "../js/sttHandle";
import Logo from "./logo.jpg";
import ISHSlogo from "./ISHSlogo.png";
import styles from "./Home.module.css";

function FirstTutorial() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("Redirecting...");
  };

  useEffect(() => {
    const init = async () => {
      await textToSpeech("안녕하세요, 뉴트리비전에 오신 걸 환영합니다.", 3);
      await textToSpeech("이 앱의 사용 방법을 알고 계시나요?");
      const res = await speechToText(3000);
      if (negativeResponse.has(res)) {
        await textToSpeech("이 앱에 대한 설명을 들려드리겠습니다.");
        navigateTo("/help");
      } else {
        navigateTo("/home");
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
    </div>
  );
}

export default FirstTutorial;
