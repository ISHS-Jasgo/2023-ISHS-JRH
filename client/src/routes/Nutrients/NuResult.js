import { useLocation, useNavigate } from "react-router-dom";
import { textToSpeech, stopTTS } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { useEffect, useState } from "react";
import { positiveResponse } from "../../js/sttHandle";
import {
  readNutreintsObject,
  askForRate,
  getNutrientsRate,
  readNutrientsRate,
} from "../../js/readNutrients";
import styles from "./NuResult.module.css";

function NuResult() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;
  const calorie = result.calorie;

  const [rate, setRate] = useState({});
  const [isRateLoaded, setIsRateLoaded] = useState(false);

  useEffect(() => {
    const readNutrients = async () => {
      await readNutreintsObject(result);

      const resForRate = await askForRate();
      // if (resForRate === true) {
      if (true) {
        const nutreintsRate = await getNutrientsRate(result);
        setRate(nutreintsRate);
        console.log(rate);
        setIsRateLoaded(true);
        await readNutrientsRate(nutreintsRate);
      }

      await textToSpeech("영양성분 정보를 다시 들려드릴까요?", 1);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        readNutrients();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/home");
      }
    };

    const init = async () => {
      stopTTS();
      await textToSpeech("제품을 찾았습니다.", 2);
      readNutrients();
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
      <h1 className={styles.pretty}>상품명 | {result.name}</h1>
      <ul className={styles.decoul}>
        <li className={styles.decoli}>
          칼로리 | {calorie}g{isRateLoaded ? ` / ${rate.calorieRate}%` : null}
        </li>
        <li className={styles.decoli}>
          탄수화물 | {nutrients.carbohydrate}g
          {isRateLoaded ? ` / ${rate.carbohydrateRate}%` : null}
        </li>
        <li className={styles.decoli}>
          단백질 | {nutrients.protein}g
          {isRateLoaded ? ` / ${rate.proteinRate}%` : null}
        </li>
        <li className={styles.decoli}>
          지방 | {nutrients.fat}g{isRateLoaded ? ` / ${rate.fatRate}%` : null}
        </li>
        <li className={styles.decoli}>
          당류 | {nutrients.sugar}g
          {isRateLoaded ? ` / ${rate.sugarRate}%` : null}
        </li>
        <li className={styles.decoli}>
          나트륨 | {nutrients.sodium}mg
          {isRateLoaded ? ` / ${rate.sodiumRate}%` : null}
        </li>
        <li className={styles.decoli}>
          콜레스테롤 | {nutrients.cholesterol}mg
          {isRateLoaded ? ` / ${rate.cholesterolRate}%` : null}
        </li>
        <li className={styles.decoli}>
          포화지방 | {nutrients.saturatedFat}g
          {isRateLoaded ? ` / ${rate.saturatedFatRate}%` : null}
        </li>

        <li className={styles.decolisad}>트랜스지방 | {nutrients.transFat}g</li>
      </ul>
    </div>
  );
}

export default NuResult;
