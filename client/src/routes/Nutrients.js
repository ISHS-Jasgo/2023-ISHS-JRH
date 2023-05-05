import { useEffect, useRef, useState } from "react";
import Video from "./../components/Global/Video";
import Canvas from "./../components/Global/Canvas";

function Nutrients() {
  const [productNum, setProductNum] = useState("");
  const [isNumDetected, setIsNumDetected] = useState(false);
  const [resultArr, setResultArr] = useState([]);

  const isFirstLoaded = useRef(true);
  const search = useRef(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
          console.log(data.result);
          if (data.result !== "not found" && !isNumDetected) {
            setIsNumDetected(true);
          }
          setResultArr((current) => [...current, data.result]);
        });
    }
    //console.log(image);
  };

  const getProductName = async (productNum) => {
    const url = `http://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I1250/json/1/1/PRDLST_REPORT_NO=${productNum}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json.I1250.row[0].PRDLST_NM;
  };

  const getNutrients = async (productName) => {
    const newName = productName.replaceAll(" ", "_");
    const url = `https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/1/DESC_KOR=${newName}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
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
        transFat: transFat,
      },
    };
    result[productName] = nContent;
    //console.log(result);
    return result;
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (search.current) {
        drawToCanvas();
        sendImage();
      }
    }, 450);
    return () => clearInterval(id);

    //test: 포카칩 어니언맛
    //report: 포카칩 오리지널 -> 포카칩
    //setProductNum("19870415003246");
  }, []);

  useEffect(() => {
    if (isNumDetected) {
      console.log("number detected!");
    }
  }, [isNumDetected]);

  useEffect(() => {
    if (resultArr.length >= 15) {
      search.current = false;
      let { res, repeatCnt } = getMode(resultArr);
      if (res === "not found") {
        console.log("failed.. begin to search");
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
        .then((nutrients) => console.log(nutrients))
        .then(() => setProductNum(""))
        .catch((err) => {
          console.log(err);
          console.log("product not found. begin to search.");
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

function getMode(arr) {
  let obj = {};
  arr.forEach((res) => {
    obj[res] = obj[res] === undefined ? 1 : obj[res] + 1;
  });
  console.log(obj);
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
