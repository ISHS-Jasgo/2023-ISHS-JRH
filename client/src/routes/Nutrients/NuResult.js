import { useLocation } from "react-router-dom";

function NuResult() {
  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;

  return (
    <div>
      <h1>Product Name: {result.name}</h1>
      <ul>
        <li>calories: {nutrients.calories}kcal</li>
        <li>carbohydrate: {nutrients.carbohydrate}g</li>
        <li>protein: {nutrients.protein}g</li>
        <li>fat: {nutrients.fat}g</li>
        <li>sugar: {nutrients.sugar}g</li>
        <li>sodium: {nutrients.sodium}mg</li>
        <li>cholesterol: {nutrients.cholesterol}mg</li>
        <li>saturatedFat: {nutrients.saturatedFat}g</li>
        <li>transFat: {nutrients.transFat}g</li>
      </ul>
    </div>
  );
}

export default NuResult;
