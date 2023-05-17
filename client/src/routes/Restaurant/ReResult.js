import { useLocation, useNavigate } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";
import { useEffect } from "react";
import { readNutreintsObject } from "../../js/readNutrients";

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
      await textToSpeech("제품을 찾았습니다.");
      readNutrients();
    };

    const readNutrients = async () => {
      await readNutreintsObject(result);
      await textToSpeech("다시 들려드릴까요?", true);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        readNutrients();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", true);
        navigateTo("/home");
      }
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
