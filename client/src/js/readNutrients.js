import { textToSpeech } from "./tts";

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

export { readNutreintsObject };
