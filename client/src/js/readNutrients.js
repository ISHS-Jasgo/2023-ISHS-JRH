import { textToSpeech } from "./tts";
import { speechToText } from "./stt";
import { positiveResponse } from "./sttHandle";
import recommendedNutrients from "./recommended";

let nutrients = {};

async function readNutreintsObject(element) {
  const name = element.name;
  const calorie = element.calorie;
  const carbohydrate = element.nutrients.carbohydrate;
  const protein = element.nutrients.protein;
  const fat = element.nutrients.fat;
  const sugar = element.nutrients.sugar;
  const sodium = element.nutrients.sodium;
  const cholesterol = element.nutrients.cholesterol;
  const saturatedFat = element.nutrients.saturatedFat;
  const transFat = element.nutrients.transFat;

  nutrients = {
    name,
    calorie,
    carbohydrate,
    protein,
    fat,
    sugar,
    sodium,
    cholesterol,
    saturatedFat,
    transFat,
  };

  await textToSpeech("상품명 " + name);
  await textToSpeech("칼로리 " + calorie + "칼로리");
  await textToSpeech("탄수화물 " + carbohydrate + "그램");
  await textToSpeech("단백질 " + protein + "그램");
  await textToSpeech("지방 " + fat + "그램");
  await textToSpeech("당류 " + sugar + "그램");
  await textToSpeech("나트륨 " + sodium + "밀리그램");
  await textToSpeech("콜레스테롤 " + cholesterol + "밀리그램");
  await textToSpeech("포화지방 " + saturatedFat + "그램");
  await textToSpeech("트랜스지방 " + transFat + "그램");
}

async function askForRate() {
  await textToSpeech("1일 영양성분 기준치에 대한 비율을 알려드릴까요?");
  const res1 = await speechToText(3000);

  if (positiveResponse.has(res1)) return true;
  else return false;
}

async function getNutrientsRate() {
  const calorieRate = Math.floor(
    (nutrients.calorie / recommendedNutrients.calorie) * 100
  );
  const carbohydrateRate = Math.floor(
    (nutrients.carbohydrate / recommendedNutrients.carbohydrate) * 100
  );
  const proteinRate = Math.floor(
    (nutrients.protein / recommendedNutrients.protein) * 100
  );
  const fatRate = Math.floor((nutrients.fat / recommendedNutrients.fat) * 100);
  const sugarRate = Math.floor(
    (nutrients.sugar / recommendedNutrients.sugar) * 100
  );
  const sodiumRate = Math.floor(
    (nutrients.sodium / recommendedNutrients.sodium) * 100
  );
  const cholesterolRate = Math.floor(
    (nutrients.cholesterol / recommendedNutrients.cholesterol) * 100
  );
  const saturatedFatRate = Math.floor(
    (nutrients.saturatedFat / recommendedNutrients.saturatedFat) * 100
  );

  return {
    calorieRate,
    carbohydrateRate,
    proteinRate,
    fatRate,
    sugarRate,
    sodiumRate,
    cholesterolRate,
    saturatedFatRate,
  };
}

async function readNutrientsRate(nutrientsObject) {
  await textToSpeech("2000칼로리를 기준으로 한 1일 영양성분 기준치에 대하여,");
  await textToSpeech(nutrientsObject.calorieRate + "퍼센트의 칼로리, ");
  await textToSpeech(nutrientsObject.carbohydrateRate + "퍼센트의 탄수화물, ");
  await textToSpeech(nutrientsObject.proteinRate + "퍼센트의 단백질, ");
  await textToSpeech(nutrientsObject.fatRate + "퍼센트의 지방, ");
  await textToSpeech(nutrientsObject.sugarRate + "퍼센트의 당류, ");
  await textToSpeech(nutrientsObject.sodiumRate + "퍼센트의 나트륨, ");
  await textToSpeech(nutrientsObject.cholesterolRate + "퍼센트의 콜레스테롤, ");
  await textToSpeech(
    nutrientsObject.saturatedFatRate + "퍼센트의 포화지방을 섭취할 수 있습니다."
  );
}

export { readNutreintsObject, askForRate, getNutrientsRate, readNutrientsRate };
