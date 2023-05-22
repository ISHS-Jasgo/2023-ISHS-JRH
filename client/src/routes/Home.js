import { useNavigate } from "react-router-dom";
import Button from "../components/Global/Button";
import ImgButton from "../components/Global/ImgButton";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const init = async () => {
      await textToSpeech(
        "영양성분, 유통기한, 도움말 중 원하시는 기능을 말씀해주세요.",
        3
      );
      const getButton = async () => {
        const res1 = await speechToText(3000);
        switch (res1) {
          case "영양 성분":
          case "영양성분":
            await textToSpeech(
              "가공식품의 영양성분을 알고 싶으시다면 '가공식품', 음식점의 영양성분을 알고 싶으시다면 '음식점'을 말씀해주세요.",
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
                  "음식점 영양정보 찾기 화면으로 이동합니다.",
                  2
                );
                navigateTo("/restaurant");
              } else {
                await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
                getNutrientsWhere();
              }
            };
            getNutrientsWhere();
            break;

          case "유통기한":
            await textToSpeech("유통기한 찾기 화면으로 이동합니다.", 2);
            navigateTo("/expiration");
            break;

          case "도움말":
            await textToSpeech("도움말 화면으로 이동합니다.", 2);
            navigateTo("/help");
            break;

          default:
            await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
            getButton();
            break;
        }
      };
      getButton();
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
      {/* set div display inline */}
      <div className={styles.line}>
        <ImgButton
          classname={styles.settingimg}
          //onClick={() => navigateTo("/settings")}
          imgSource="setting"
        />
        <img className={styles.ishslogo} src={ISHSlogo}></img>
      </div>

      <div className={styles.aboutlogo}>
        <img className={styles.sizeimage} src={Logo}></img>
      </div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButton}
            text="영양성분"
            //onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButton}
            text="유통기한"
            //onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButton}
            text="음식점"
            //onClick={() => navigateTo("/restaurant")}
          />

          <Button
            classname={styles.myButton}
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
