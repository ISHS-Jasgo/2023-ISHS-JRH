import { textToSpeech } from "./tts";

export class readJson {
  constructor(jsonObject) {
    this.jsonObject = jsonObject;
  }

  async readJsonObject() {
    let element = this.jsonObject;
    let name = element.name;
    let calories = element.calories;
    let carbohydrate = element.nutrients.carbohydrate;
    let protein = element.nutrients.protein;
    let fat = element.nutrients.fat;
    let sugar = element.nutrients.sugar;
    let sodium = element.nutrients.sodium;
    let cholesterol = element.nutrients.cholesterol;
    let saturatedFat = element.nutrients.saturatedFat;
    let transFat = element.nutrients.transFat;
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
}
