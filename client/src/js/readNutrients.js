import { textToSpeech } from "./tts";
import { speechToText } from "./stt";
import { positiveResponse } from "./sttHandle";
import recommendedNutrients from "./recommended";
import { useState } from "react";

let curr = false;
let claR;
let carboR;
let proR;
let fatR;
let suR;
let soR;
let choR;
let saturR;

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
}

async function askForRate() {
  await textToSpeech("1일 영양성분 기준치에 대한 비율을 알려드릴까요?");
  const res1 = await speechToText(3000);
  if (positiveResponse.has(res1)) {
  }
}

//비율을 알려주라고 한다면,
if (positiveResponse.has(res1)) {
  curr = true;
  const calorieRate = Math.floor(
    (calories / recommendedNutrients.calorie) * 100
  );
  const carbohydrateRate = Math.floor(
    (carbohydrate / recommendedNutrients.carbohydrate) * 100
  );
  const proteinRate = Math.floor(
    (protein / recommendedNutrients.protein) * 100
  );
  const fatRate = Math.floor((fat / recommendedNutrients.fat) * 100);
  const sugarRate = Math.floor((sugar / recommendedNutrients.sugar) * 100);
  const sodiumRate = Math.floor((sodium / recommendedNutrients.sodium) * 100);
  const cholesterolRate = Math.floor(
    (cholesterol / recommendedNutrients.cholesterol) * 100
  );
  const saturatedFatRate = Math.floor(
    (saturatedFat / recommendedNutrients.saturatedFat) * 100
  );

  claR = calorieRate;
  carboR = carbohydrateRate;
  proR = proteinRate;
  fatR = fatRate;
  suR = sugarRate;
  soR = sodiumRate;
  choR = cholesterolRate;
  saturR = saturatedFatRate;
  await textToSpeech("2000칼로리를 기준으로 한 1일 영양성분 기준치에 대하여,");
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
} else return false;

async function showRate() {
  const calorieRate = Math.floor(
    (calories / recommendedNutrients.calorie) * 100
  );
  const carbohydrateRate = Math.floor(
    (carbohydrate / recommendedNutrients.carbohydrate) * 100
  );
  const proteinRate = Math.floor(
    (protein / recommendedNutrients.protein) * 100
  );
  const fatRate = Math.floor((fat / recommendedNutrients.fat) * 100);
  const sugarRate = Math.floor((sugar / recommendedNutrients.sugar) * 100);
  const sodiumRate = Math.floor((sodium / recommendedNutrients.sodium) * 100);
  const cholesterolRate = Math.floor(
    (cholesterol / recommendedNutrients.cholesterol) * 100
  );
  const saturatedFatRate = Math.floor(
    (saturatedFat / recommendedNutrients.saturatedFat) * 100
  );
}

function returnJSX(bool) {
  if (bool) {
    return (
      <div>
        <h1>good</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>bad</h1>
      </div>
    );
  }
}

export {
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
};
