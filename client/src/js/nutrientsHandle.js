/**
 *  function that returns sanitized nutrients data
 *  @param {object} candidate json.I2790.row[i]
 *  @return object{nuts: {name, maker, calories, nutrients}}
 */
function setNutrients(candidate) {
  if (candidate !== "") {
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
    return result;
  }
}

export { setNutrients };
