import { useLocation, useNavigate } from "react-router-dom";
import { textToSpeech, stopTTS } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { useEffect } from "react";
import { positiveResponse } from "../../js/sttHandle";
import { readNutreintsObject } from "../../js/readNutrients";

function NuResult() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;

  useEffect(() => {
    const init = async () => {
      stopTTS();
      await textToSpeech("제품을 찾았습니다.", 1);
      readNutrients();
    };

    const readNutrients = async () => {
      await readNutreintsObject(result);
      await textToSpeech("다시 들려드릴까요?", 1);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        readNutrients();
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

    init();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
      <h1 className={styles.pretty}>상품명 | {result.name}</h1>
      <ul className={styles.decoul}>
        <li className={styles.decoli}>칼로리 | {result.calories}kcal</li>
        <li className={styles.decoli}>탄수화물 | {nutrients.carbohydrate}g</li>
        <li className={styles.decoli}>단백질 | {nutrients.protein}g</li>
        <li className={styles.decoli}>지방 | {nutrients.fat}g</li>
        <li className={styles.decoli}>당류 | {nutrients.sugar}g</li>
        <li className={styles.decoli}>나트륨 | {nutrients.sodium}mg</li>
        <li className={styles.decoli}>
          콜레스테롤 | {nutrients.cholesterol}mg
        </li>
        <li className={styles.decoli}>포화지방 | {nutrients.saturatedFat}g</li>
        <li className={styles.decolisad}>트랜스지방 | {nutrients.transFat}g</li>
      </ul>
    </div>
  );
}

export default NuResult;
