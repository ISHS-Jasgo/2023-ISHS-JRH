import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stopTTS, textToSpeech } from "./../../js/tts";
import { setNutrients } from "../../js/nutrientsHandle";
import Video from "../../components/Global/Video";
import Canvas from "../../components/Global/Canvas";

function Nutrients() {
  const [productNum, setProductNum] = useState("");
  const [isNumDetected, setIsNumDetected] = useState(false);
  const [resultArr, setResultArr] = useState([]);

  const isFirstLoaded = useRef(true);
  const search = useRef(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx !== null && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, 300, 400);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendImage = () => {
    try {
      if (canvasRef.current) {
        const image = canvasRef.current
          .toDataURL()
          .replace("data:image/png;base64,", "");
        let formData = new FormData();
        formData.append("imageInfo", image);

        fetch("https://0917ba2.pythonanywhere.com/pummok", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result !== "not found" && !isNumDetected) {
              setIsNumDetected(true);
            }
            setResultArr((current) => [...current, data.result]);
          });
      }
    } catch (err) {
      console.log(err);
    }

    //console.log(image);
  };

  const getProductName = async (productNum) => {
    //try: 일반 식품
    let url = `http://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I1250/json/1/1/PRDLST_REPORT_NO=${productNum}`;
    let response = await fetch(url);
    let json = await response.json();
    if (json.I1250.total_count !== "0") {
      console.log(json);
      return json.I1250.row[0].PRDLST_NM;
    }
    console.log("not found first");

    //try: 축산물
    url = `http://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I1310/json/1/1/PRDLST_REPORT_NO=${productNum}`;
    response = await fetch(url);
    json = await response.json();
    if (json.I1310.total_count !== "0") {
      console.log(json);
      return json.I1310.row[0].PRDLST_NM;
    }

    //not found
    throw new Error("productNumber not found");
  };

  const getNutrients = async (productName) => {
    //space to underbar
    const newName = productName.replaceAll(" ", "_");

    //fetch nutrients by productName
    const url = `https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/1/DESC_KOR=${newName}`;
    const response = await fetch(url);
    const json = await response.json();

    //throw Error
    if (json.I2790.total_count === "0") {
      throw new Error("품목보고번호에 일치하는 제품이 없습니다.");
    }

    console.log(json);
    return setNutrients(json.I2790.row[0]);
  };

  useEffect(() => {
    let intervalId = 0;

    const notFound = async () => {
      await textToSpeech("품목보고번호가 감지되지 않았습니다.", 2);
      await textToSpeech("홈 화면으로 이동합니다.", 2);
      navigateTo("/home");
    };

    const init = async () => {
      let cycleCnt = 0;
      await textToSpeech("품목보고번호 탐색을 시작합니다.", 2);
      await textToSpeech("카메라를 식품에 가까이 대어주세요.", 2);
      const id = setInterval(() => {
        if (intervalId === 0) intervalId = id;
        if (cycleCnt >= 70) {
          console.log("not found");
          clearInterval(intervalId);
          notFound();
        }
        if (search.current) {
          drawToCanvas();
          sendImage();
          cycleCnt += 1;
        }
      }, 350);
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  useEffect(() => {
    if (isNumDetected) {
      console.log("number detected!");
      textToSpeech("품목보고번호가 감지되었습니다.", 1);
    }
  }, [isNumDetected]);

  useEffect(() => {
    if (resultArr.length >= 10) {
      search.current = false;
      let { res, repeatCnt } = getMode(resultArr);
      if (res === "not found") {
        console.log("failed.. begin to search");
        textToSpeech("탐색중.", 0);
        search.current = true;
      } else {
        console.log("success!");
        console.log(`found result is ${res}`);
        setProductNum(res);
      }
      //init
      setIsNumDetected(false);
      setResultArr([]);
    }
  }, [resultArr]);

  useEffect(() => {
    //console.log(isFirstLoaded.current);
    if (!isFirstLoaded.current && productNum !== "") {
      getProductName(productNum)
        .then((productName) => getNutrients(productName))
        .then((nutrients) => {
          console.log(nutrients);
          setProductNum("");
          navigateTo("/nutrients/result", { resNutrients: nutrients });
        })
        .catch((err) => {
          console.log(err);
          console.log("product not found. begin to search.");
          textToSpeech("일치하는 상품이 없습니다. 재탐색합니다.", 2);
          setProductNum("");
          search.current = true;
        });
    } else {
      isFirstLoaded.current = false;
    }
  }, [productNum]);

  return (
    <div>
      <Video videoRef={videoRef} />
      <Canvas ref={canvasRef} />
    </div>
  );
}

//get mode value of Array: arr
function getMode(arr) {
  let obj = {};
  arr.forEach((res) => {
    obj[res] = obj[res] === undefined ? 1 : obj[res] + 1;
  });
  //console.log(obj);
  let res = "";
  let resNum = 0;
  for (let key in obj) {
    //console.log(key);
    if (resNum < obj[key]) {
      res = key;
      resNum = obj[key];
    }
  }
  return { res: res, repeatCnt: resNum };
}

export default Nutrients;
