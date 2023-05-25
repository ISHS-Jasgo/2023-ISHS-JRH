import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Global/Button";
import ImgButton from "../components/Global/ImgButton";
import Modal from "../components/Setting/Modal";
import { textToSpeech } from "../js/tts";
import { speechToText } from "../js/stt";
import Logo from "./logo.jpg";
import ISHSlogo from "./ISHSlogo.png";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("Redirecting...");
  };

  const [modalOpen, setModalOpen] = useState(false);

  const init = async () => {
    await textToSpeech(
      "식품 정보, 유통기한, 재활용 방법, 도움말, 설정 중 원하시는 기능을 말씀해주세요.",
      3
    );
    const getButton = async () => {
      const res1 = await speechToText(3000);
      switch (res1) {
        case "식품 정보":
        case "식품정보":
          await textToSpeech(
            "가공식품의 영양성분 및 식품 정보를 알고 싶으시다면 '가공식품', 음식점 메뉴의 영양성분을 알고 싶으시다면 '음식점'을 말씀해주세요.",
            3
          );
          const getNutrientsWhere = async () => {
            const res2 = await speechToText(3000);
            if (res2 === "가공식품" || res2 === "가공 식품") {
              await textToSpeech(
                "가공식품 영양정보 찾기 화면으로 이동합니다.",
                2
              );
              navigateTo("/nutrients");
            } else if (res2 === "음식점") {
              await textToSpeech(
                "음식점 메뉴 영양정보 찾기 화면으로 이동합니다.",
                2
              );
              navigateTo("/restaurant");
            } else {
              await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
              await getNutrientsWhere();
            }
          };
          await getNutrientsWhere();
          break;

        case "유통기한":
          await textToSpeech("유통기한 찾기 화면으로 이동합니다.", 2);
          navigateTo("/expiration");
          break;

        case "재활용 방법":
        case "재활용방법":
        case "재활용":
          await textToSpeech("재활용 방법 찾기 화면으로 이동합니다.", 2);
          navigateTo("/recycle");
          break;

        case "도움말":
          await textToSpeech("도움말 화면으로 이동합니다.", 2);
          navigateTo("/help");
          break;

        case "설정":
          await textToSpeech("설정 화면으로 이동합니다.", 2);
          setModalOpen(true);
          break;

        default:
          await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
          getButton();
          break;
      }
    };
    getButton();
  };

  useEffect(() => {
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
      {modalOpen && <Modal setModalOpen={setModalOpen} homeInit={init} />}
      <div className={styles.line}>
        <ImgButton
          classname={styles.settingimg}
          //onClick={() => navigateTo("/settings")}
          imgSource="setting"
          imgclassname={styles.decoimgbtn}
        />
        <img className={styles.ishslogo} src={ISHSlogo}></img>
      </div>

      <div className={styles.aboutlogo}>
        <img className={styles.titleimage} src={Logo}></img>
      </div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButtonone}
            text="식품정보"
            //onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButtontwo}
            text="유통기한"
            //onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButtonone}
            text="재활용"
            //onClick={() => navigateTo("/restaurant")}
          />

          <Button
            classname={styles.myButtontwo}
            text="도움말"
            //onClick={() => navigateTo("/help")}
          />
        </div>
      </div>
      <h6 style={{ margin: "0px" }} align="center">
        시각장애인용 모드입니다. 버튼이 눌리지 않습니다.
      </h6>
    </div>
  );
}

export default Home;
