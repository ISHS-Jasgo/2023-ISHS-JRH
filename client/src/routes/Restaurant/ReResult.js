import { useLocation, useNavigate } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";
import { useCallback, useEffect } from "react";
import {
  readNutreintsObject,
  claR,
  carboR,
  proR,
  fatR,
  suR,
  soR,
  choR,
  saturR,
  curr,
} from "../../js/readNutrients";
import styles from "./ReResult.module.css";

function ReResult() {
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
        {curr ? (
          <div>
            <li className={styles.decoli}>
              칼로리 | {result.calories}kcal / {claR}%
            </li>
            <li className={styles.decoli}>
              탄수화물 | {nutrients.carbohydrate}g / {carboR}%
            </li>
            <li className={styles.decoli}>
              단백질 | {nutrients.protein}g / {proR}%
            </li>
            <li className={styles.decoli}>
              지방 | {nutrients.fat}g / {fatR}%
            </li>
            <li className={styles.decoli}>
              당류 | {nutrients.sugar}g / {suR}%
            </li>
            <li className={styles.decoli}>
              나트륨 | {nutrients.sodium}mg / {soR}%
            </li>
            <li className={styles.decoli}>
              콜레스테롤 | {nutrients.cholesterol}mg / {choR}%
            </li>
            <li className={styles.decoli}>
              포화지방 | {nutrients.saturatedFat}g / {saturR}%
            </li>
            <li className={styles.decolisad}>
              트랜스지방 | {nutrients.transFat}g
            </li>
          </div>
        ) : (
          <div>
            <li className={styles.decoli}> 칼로리 | {result.calories}kcal</li>
            <li className={styles.decoli}>
              탄수화물 | {nutrients.carbohydrate}g
            </li>
            <li className={styles.decoli}> 단백질 | {nutrients.protein}g</li>
            <li className={styles.decoli}> 지방 | {nutrients.fat}g</li>
            <li className={styles.decoli}> 당류 | {nutrients.sugar}g</li>
            <li className={styles.decoli}> 나트륨 | {nutrients.sodium}mg</li>
            <li className={styles.decoli}>
              콜레스테롤 | {nutrients.cholesterol}mg
            </li>
            <li className={styles.decoli}>
              포화지방 | {nutrients.saturatedFat}g
            </li>
            <li className={styles.decolisad}>
              트랜스지방 | {nutrients.transFat}g
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ReResult;
