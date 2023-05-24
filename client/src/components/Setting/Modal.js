import { useEffect, useState } from "react";
import { textToSpeech, getSpeakRate, setSpeakRate } from "../../js/tts";
import { speechToText } from "../../js/stt";
import Button from "../Global/Button";
import styles from "./Modal.module.css";

function Modal({ setModalOpen, homeInit }) {
  const [speed, setSpeed] = useState(getSpeakRate());
  const [mode, setMode] = useState("시각장애인");

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const init = async () => {
      await textToSpeech("환경설정을 시작합니다.", 2);
      await textToSpeech(
        "음성 재생 속도를 빠름, 중간, 느림 중에 선택하여 말씀해주세요.",
        2
      );

      let currentSpeed = "";
      switch (getSpeakRate()) {
        case "1":
          currentSpeed = "느림";
          break;
        case "1.4":
          currentSpeed = "중간";
          break;
        case "2":
          currentSpeed = "빠름";
          break;
        default:
          currentSpeed = "중간";
      }

      await textToSpeech("현재 재생 속도는 " + currentSpeed + "입니다.", 2);

      const getSpeedRes = async () => {
        const speedRes = await speechToText(3000);
        switch (speedRes) {
          case "느림":
            setSpeed("1");
            break;
          case "중간":
            setSpeed("1.4");
            break;
          case "빠름":
            setSpeed("2");
            break;
          default:
            await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
            await getSpeedRes();
        }
      };

      await getSpeedRes();

      await textToSpeech("재생 속도가 설정되었습니다.", 2);
      await textToSpeech("설정을 종료합니다.", 2);
      homeInit();
      closeModal();
    };

    init();
  }, []);

  useEffect(() => {
    setSpeakRate(speed);
    console.log("speed changed to " + getSpeakRate());
  }, [speed]);

  //아래 버튼에 onClick 없음
  return (
    <div className={styles.container}>
      <Button classname={styles.closeButton} text="X" />
      <h1 style={{ textAlign: "center" }}>설정</h1>
      <div className={styles.settingBody}>
        <h4>음성 재생 속도</h4>
        <div>
          <input
            type="radio"
            value="1"
            checked={speed === "1"}
            onChange={() => setSpeed("1")}
          />
          <label>느림</label>
          <input
            type="radio"
            value="1.4"
            checked={speed === "1.4"}
            onChange={() => setSpeed("1.4")}
          />
          <label>중간</label>
          <input
            type="radio"
            value="2"
            checked={speed === "2"}
            onChange={() => setSpeed("2")}
          />
          <label>빠름</label>
        </div>
        <h4>모드 변경</h4>
        <div>
          <input
            type="radio"
            value="시각장애인용 모드"
            checked={mode === "시각장애인"}
            onChange={() => setMode("시각장애인")}
          />
          <label>시각장애인용 모드</label>
          <input
            type="radio"
            value="비장애인용 모드"
            checked={mode === "비장애인"}
            onChange={() => console.log("비장애인용 모드는 지원되지 않습니다.")}
          />
          <label>비장애인용 모드 (구현 예정)</label>
        </div>
      </div>
    </div>
  );
}

export default Modal;
