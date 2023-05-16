import { useLocation } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { useEffect } from "react";
import { readJson } from "../../js/read";
import { getRecommendedNutrient } from "../../js/recommended";

function ReResult() {
  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;

  useEffect(() => {
    const init = async () => {
      await textToSpeech("메뉴를 찾았습니다.");
      const read = new readJson(result);
      await read.readJsonObject();
      let calorie = Math.floor((result.calories/getRecommendedNutrient("calorie"))*1000);
      let carbohydrate = Math.floor((result.nutrients.carbohydrate/getRecommendedNutrient("carbohydrate"))*1000);
      let protein = Math.floor((result.nutrients.protein/getRecommendedNutrient("protein"))*1000);
      let fat = Math.floor((result.nutrients.fat/getRecommendedNutrient("fat"))*1000);
      await textToSpeech(calorie/10+ "퍼센트의 칼로리를 섭취하였습니다.");
      await textToSpeech(carbohydrate/10 + "퍼센트의 탄수화물을 섭취하였습니다.");
      await textToSpeech(protein/10 + "퍼센트의 단백질을 섭취하였습니다.");
      await textToSpeech(fat/10 + "퍼센트의 지방을 섭취하였습니다.");
    };

    init();
  }, []);

  return (
    <div>
      <h1>상품명: {result.name}</h1>
      <ul>
        <li>칼로리: {result.calories}kcal</li>
        <li>탄수화물: {nutrients.carbohydrate}g</li>
        <li>단백질: {nutrients.protein}g</li>
        <li>지방: {nutrients.fat}g</li>
        <li>당류: {nutrients.sugar}g</li>
        <li>나트륨: {nutrients.sodium}mg</li>
        <li>콜레스테롤: {nutrients.cholesterol}mg</li>
        <li>포화지방: {nutrients.saturatedFat}g</li>
        <li>트랜스지방: {nutrients.transFat}g</li>
      </ul>
    </div>
  );
}

export default ReResult;
