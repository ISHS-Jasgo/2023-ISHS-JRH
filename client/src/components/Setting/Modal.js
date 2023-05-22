import { useEffect } from "react";
import { textToSpeech } from "../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";
import Button from "../Global/Button";
import styles from "./Modal.module.css";

function Modal({ setModalOpen, homeInit }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const init = async () => {
      await textToSpeech("설정", 2);
      await textToSpeech("음성 재생 속도", 2);
      await textToSpeech("모드 변경", 2);

      await textToSpeech("다시 들려드릴까요?", 2);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        init();
      } else {
        await textToSpeech("설정을 종료합니다.", 2);
        homeInit();
        closeModal();
      }
    };

    init();
  }, []);

  //아래 버튼에 onClick 없음
  return (
    <div className={styles.container}>
      <Button classname={styles.closeButton} text="X" />
      <h1>설정</h1>
      <h5>음성 재생 속도</h5>
      <h5>모드 변경</h5>
    </div>
  );
}

export default Modal;
