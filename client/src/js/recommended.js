const recommended = {
    calorie: 2000,
    protein: 60,
    fat: 60,
    carbohydrate: 300
}

export function getRecommendedNutrient(nutrient) {
    return recommended[nutrient];
}

export default recommended;