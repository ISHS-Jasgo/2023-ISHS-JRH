import { useLocation } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { useEffect } from "react";
import { readJson } from "../../js/read";
import styles from "./NuResult.module.css";

function NuResult() {
  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;

  useEffect(() => {
    const init = async () => {
      await textToSpeech("제품을 찾았습니다.");
      const read = new readJson(result);
      await read.readJsonObject();
    };

    init();
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
