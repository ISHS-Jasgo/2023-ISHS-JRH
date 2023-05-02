async function getProductName(productNumber) {
    const url = "http://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I1250/json/1/1/PRDLST_REPORT_NO=" + productNumber;
    const response = await fetch(url);
    const json = await response.json();
    return json.I1250.row[0].PRDLST_NM;
}

async function getNutrients(name) {
    const url = "https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/1/DESC_KOR=" + name;
    const response = await fetch(url);
    const json = await response.json();
    const calories = json.I2790.row[0].NUTR_CONT1;
    const carbohydrate = json.I2790.row[0].NUTR_CONT2;
    const protein = json.I2790.row[0].NUTR_CONT3;
    const fat = json.I2790.row[0].NUTR_CONT4;
    const sugar = json.I2790.row[0].NUTR_CONT5;
    const sodium = json.I2790.row[0].NUTR_CONT6;
    const cholesterol = json.I2790.row[0].NUTR_CONT7;
    const saturatedFat = json.I2790.row[0].NUTR_CONT8;
    const transFat = json.I2790.row[0].NUTR_CONT9;
    const result = {};
    const nContent = {
        calories: calories,
        nutrients: {
            carbohydrate: carbohydrate,
            protein: protein,
            fat: fat,
            sugar: sugar,
            sodium: sodium,
            cholesterol: cholesterol,
            saturatedFat: saturatedFat,
            transFat: transFat
        }
    };
    result[name] = nContent;
    console.log(result);
    return result;
}

async function getNutrientsByProductNumber(productNumber) {
    const name = await getProductName(productNumber);
    const nutrients = await getNutrients(name);
    return nutrients;
}

getNutrients("포카칩")