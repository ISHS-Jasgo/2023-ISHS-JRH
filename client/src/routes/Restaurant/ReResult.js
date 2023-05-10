import { useLocation } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { useEffect } from "react";

function ReResult() {
  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;

  useEffect(() => {
    textToSpeech("찾았습니다.");
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
