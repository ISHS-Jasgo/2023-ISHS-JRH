import { useLocation, useNavigate } from "react-router-dom";
import { textToSpeech, stopTTS } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { useEffect, useState } from "react";
import { positiveResponse } from "../../js/sttHandle";
import {
  readNutreintsObject,
  askForRate,
  getNutrientsRate,
  readNutrientsRate,
} from "../../js/readNutrients";
import styles from "./NuResult.module.css";

function NuResult() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const location = useLocation();
  const result = location.state.resNutrients.nuts;
  const nutrients = result.nutrients;
  const calorie = result.calorie;

  const [rate, setRate] = useState({});
  const [isRateLoaded, setIsRateLoaded] = useState(false);

  useEffect(() => {
    const readNutrients = async () => {
      await readNutreintsObject(result);

      const resForRate = await askForRate();
      if (resForRate === true) {
        const nutreintsRate = await getNutrientsRate(result);
        setRate(nutreintsRate);
        console.log(rate);
        setIsRateLoaded(true);
        await readNutrientsRate(nutreintsRate);
      }

      await textToSpeech("영양성분 정보를 다시 들려드릴까요?", 1);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        readNutrients();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/home");
      }
    };

    const init = async () => {
      stopTTS();
      await textToSpeech("제품을 찾았습니다.", 2);
      readNutrients();
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
    </div>
  );
}

export default NuResult;
