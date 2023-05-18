import { textToSpeech } from "./tts";
import { speechToText } from "./stt";
import { positiveResponse } from "./sttHandle";
import recommendedNutrients from "./recommended";

async function readNutreintsObject(element) {
  const name = element.name;
  const calories = element.calories;
  const carbohydrate = element.nutrients.carbohydrate;
  const protein = element.nutrients.protein;
  const fat = element.nutrients.fat;
  const sugar = element.nutrients.sugar;
  const sodium = element.nutrients.sodium;
  const cholesterol = element.nutrients.cholesterol;
  const saturatedFat = element.nutrients.saturatedFat;
  const transFat = element.nutrients.transFat;
  await textToSpeech("상품명 " + name);
  await textToSpeech("칼로리 " + calories + "칼로리");
  await textToSpeech("탄수화물 " + carbohydrate + "그램");
  await textToSpeech("단백질 " + protein + "그램");
  await textToSpeech("지방 " + fat + "그램");
  await textToSpeech("당류 " + sugar + "그램");
  await textToSpeech("나트륨 " + sodium + "밀리그램");
  await textToSpeech("콜레스테롤 " + cholesterol + "밀리그램");
  await textToSpeech("포화지방 " + saturatedFat + "그램");
  await textToSpeech("트랜스지방 " + transFat + "그램");

  await textToSpeech("1일 영양성분 기준치에 대한 비율을 알려드릴까요?");
  const res1 = await speechToText(3000);
  if (positiveResponse.has(res1)) {
    const calorieRate = Math.floor(
      (calories / recommendedNutrients.calorie) * 1000
    )/10;
    const carbohydrateRate = Math.floor(
      (carbohydrate / recommendedNutrients.carbohydrate) * 1000
    )/10;
    const proteinRate = Math.floor(
      (protein / recommendedNutrients.protein) * 1000
    )/10;
    const fatRate = Math.floor((fat / recommendedNutrients.fat) * 1000)/10;
    const sugarRate = Math.floor((sugar / recommendedNutrients.sugar) * 1000)/10;
    const sodiumRate = Math.floor((sodium / recommendedNutrients.sodium) * 1000)/10;
    const cholesterolRate = Math.floor(
      (cholesterol / recommendedNutrients.cholesterol) * 1000
    )/10;
    const saturatedFatRate = Math.floor(
      (saturatedFat / recommendedNutrients.saturatedFat) * 1000
    )/10;

    await textToSpeech(
      "2000칼로리를 기준으로 한 1일 영양성분 기준치에 대하여,"
    );
    await textToSpeech(calorieRate + "퍼센트의 칼로리, ");
    await textToSpeech(carbohydrateRate + "퍼센트의 탄수화물, ");
    await textToSpeech(proteinRate + "퍼센트의 단백질, ");
    await textToSpeech(fatRate + "퍼센트의 지방, ");
    await textToSpeech(sugarRate + "퍼센트의 당류, ");
    await textToSpeech(sodiumRate + "퍼센트의 나트륨, ");
    await textToSpeech(cholesterolRate + "퍼센트의 콜레스테롤, ");
    await textToSpeech(
      saturatedFatRate + "퍼센트의 포화지방을 섭취할 수 있습니다. "
    );
  }
}

export { readNutreintsObject };
