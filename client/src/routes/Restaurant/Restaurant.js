import { useEffect, useState } from "react";
import { getSpeech, stopSpeech } from "./../../js/tts";

function Restaurant() {
  const [candidate, setCandidate] = useState("");
  const [userRes, setUserRes] = useState(false);

  let userRestaurant = "메가커피";
  let userMenu = "아메리카노";

  const getNutrients = async () => {
    const url = `https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/100/DESC_KOR=${userMenu}&MAKER_NAME=${userRestaurant}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.I2790.total_count === "0") {
      throw new Error("일치하는 제품이 없습니다.");
    }

    //console.log(json);
    json.I2790.row.forEach((nutrients) => {
      getSpeech(`찾으시는 제품이 ${nutrients.DESC_KOR} 인가요?`);
      setCandidate(nutrients);
    });
  };

  useEffect(() => {
    getNutrients().then((nutrients) => {});
  }, []);

  useEffect(() => {
    if (candidate === "") return;
    //set nutrients
    const calories = candidate.NUTR_CONT1;
    const carbohydrate = candidate.NUTR_CONT2;
    const protein = candidate.NUTR_CONT3;
    const fat = candidate.NUTR_CONT4;
    const sugar = candidate.NUTR_CONT5;
    const sodium = candidate.NUTR_CONT6;
    const cholesterol = candidate.NUTR_CONT7;
    const saturatedFat = candidate.NUTR_CONT8;
    const transFat = candidate.NUTR_CONT9;

    //output Object
    const result = {};
    const nutrients = {
      name: candidate.DESC_KOR,
      maker: candidate.MAKER_NAME,
      calories: calories,
      nutrients: {
        carbohydrate: carbohydrate,
        protein: protein,
        fat: fat,
        sugar: sugar,
        sodium: sodium,
        cholesterol: cholesterol,
        saturatedFat: saturatedFat,
        transFat: transFat,
      },
    };

    //set zero default value
    for (let key in nutrients.nutrients) {
      if (nutrients.nutrients[key] === "") {
        nutrients.nutrients[key] = "0";
      }
    }

    //return
    result["nuts"] = nutrients;
    console.log(result);
  }, [candidate]);

  return <div></div>;
}

export default Restaurant;
