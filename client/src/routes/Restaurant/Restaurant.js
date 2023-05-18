import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech, stopTTS } from "../../js/tts";
import { speechToText } from "../../js/stt";
import { setNutrients } from "../../js/nutrientsHandle";
import { restaurantsList, positiveResponse } from "../../js/sttHandle";
import styles from "./Restaurant.module.css";

function Restaurant() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const [displayText, setDisplayText] = useState("");

  let userRestaurant = "";
  let userMenu = "";

  const getNutrients = async () => {
    const fetchNutrients = async () => {
      const url = `https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/100/DESC_KOR=${userMenu}&MAKER_NAME=${userRestaurant}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.I2790.total_count === "0") {
        setDisplayText("찾으시는 제품이 없습니다...");
        await textToSpeech("찾으시는 제품이 없습니다...", 1);
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        return null;
      } else {
        return json;
      }
    };

    const selectProduct = async () => {
      let isCorrectRes = false;
      let nutrients = null;
      for (const nutrientsData of rawNutrients.I2790.row) {
        setDisplayText(`찾으시는 메뉴가 ${nutrientsData.DESC_KOR} 인가요?`);
        await textToSpeech(
          `찾으시는 메뉴가 ${nutrientsData.DESC_KOR} 인가요?`,
          1
        );

        const userResponse = await speechToText(2500);
        if (positiveResponse.has(userResponse)) {
          nutrients = setNutrients(nutrientsData);
          console.log(nutrients);
          isCorrectRes = true;
          break;
        }
      }

      if (isCorrectRes) {
        navigateTo("/restaurant/result", { resNutrients: nutrients });
      } else {
        setDisplayText("찾으시는 메뉴가 존재하지 않습니다...");
        await textToSpeech("찾으시는 메뉴가 존재하지 않습니다...", 1);
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/2023-ISHS-JRH");
      }
    };

    const rawNutrients = await fetchNutrients();
    if (rawNutrients !== null) selectProduct();
    else navigateTo("/2023-ISHS-JRH");
  };

  useEffect(() => {
    const init = async () => {
      console.log("init started!");

      setDisplayText("방문하신 매장의 이름을 말씀해주세요.");
      await textToSpeech("방문하신 매장의 이름을 말씀해주세요.", 1);
      userRestaurant = await speechToText(3000);

      if (restaurantsList.has(userRestaurant)) {
        setDisplayText("주문하실 메뉴의 이름을 말씀해주세요.");
        await textToSpeech("주문하실 메뉴의 이름을 말씀해주세요.", 1);
        userMenu = await speechToText(3000);
        getNutrients();
      } else {
        setDisplayText("찾으시는 매장이 존재하지 않습니다...");
        await textToSpeech("찾으시는 매장이 존재하지 않습니다...", 1);
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/2023-ISHS-JRH");
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();

    return () => {
      stopTTS();
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return <div className={styles.decodiv}>{displayText}</div>;
}

export default Restaurant;
