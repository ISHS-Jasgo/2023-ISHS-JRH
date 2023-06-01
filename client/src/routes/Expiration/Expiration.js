import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "../../js/tts";
import Video from "../../components/Global/Video";
import Canvas from "../../components/Global/Canvas";

function Expiration() {
  const [expiration, setExpiration] = useState("");
  const [isDateDetected, setIsDateDetected] = useState(false);
  const [resultArr, setResultArr] = useState([]);

  const isFirstLoaded = useRef(true);
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

        fetch("https://0917ba2.pythonanywhere.com/utong", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data.result);
            if (data.result !== "not found" && !isDateDetected) {
              setIsDateDetected(true);
            }
            setResultArr((current) => [...current, data.result]);
          });
      }
    } catch (err) {
      console.log(err);
    }

    //console.log(image);
  };

  useEffect(() => {
    let intervalId = 0;

    const notFound = async () => {
      await textToSpeech("유통기한이 감지되지 않았습니다.", 2);
      await textToSpeech("홈 화면으로 이동합니다.", 2);
      navigateTo("/home");
    };

    const init = async () => {
      let cycleCount = 0;
      await textToSpeech("유통기한 탐색을 시작합니다.", 2);
      await textToSpeech("카메라를 식품에 가까이 대어주세요.", 2);
      const id = setInterval(() => {
        if (intervalId === 0) intervalId = id;
        if (cycleCount >= 300) {
          console.log("not found");
          clearInterval(intervalId);
          notFound();
        }
        drawToCanvas();
        sendImage();
        cycleCount += 1;
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
    const dateDetected = async () => {
      if (isDateDetected) {
        console.log("date detected!");
        await textToSpeech("유통기한이 감지되었습니다.", 1);
      }
    };

    dateDetected();
  }, [isDateDetected]);

  useEffect(() => {
    const cycleEnded = async () => {
      const init = () => {
        setIsDateDetected(false);
        setResultArr([]);
      };

      if (resultArr.length >= 10) {
        let { res, repeatCnt } = getMode(resultArr);
        if (res === "not found") {
          console.log("failed.. begin to search");
          init();
          await textToSpeech("탐색중.", 0);
        } else {
          console.log("success!");
          console.log(`found result is ${res}`);
          init();
          setExpiration(res);
        }
      }
    };

    cycleEnded();
  }, [resultArr]);

  useEffect(() => {
    if (!isFirstLoaded.current && expiration !== "") {
      console.log("success!");
      console.log(`Expiration Date is ${expiration}`);
      navigateTo("/expiration/result", { resDate: expiration });
    } else {
      isFirstLoaded.current = false;
    }
  }, [expiration]);

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
  console.log(obj);
  let res = "";
  let resNum = 0;
  for (let key in obj) {
    if (resNum < obj[key]) {
      res = key;
      resNum = obj[key];
    }
  }
  return { res: res, repeatCnt: resNum };
}

export default Expiration;
