import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import Video from "../../components/Global/Video";
import Canvas from "../../components/Global/Canvas";

function Recycle() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const [recycle, setRecycle] = useState("");
  const [cycleCnt, setCycleCnt] = useState(0);

  const isFirstLoaded = useRef(true);
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
    try {
      if (canvasRef.current) {
        const image = canvasRef.current
          .toDataURL()
          .replace("data:image/png;base64,", "");
        let formData = new FormData();
        formData.append("imageInfo", image);

        fetch("https://0917ba2.pythonanywhere.com/recycle", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result !== "not found") {
              setRecycle(data.result);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let intervalId = 0;

    const notFound = async () => {
      await textToSpeech("재활용 마크가 감지되지 않았습니다.", 2);
      await textToSpeech("홈 화면으로 이동합니다.", 2);
      navigateTo("/home");
    };

    const init = async () => {
      let totalCycleCnt = 0;
      await textToSpeech("재활용 마크 탐색을 시작합니다.", 2);
      await textToSpeech("카메라를 식품에 가까이 대어주세요.", 2);
      const id = setInterval(() => {
        if (intervalId === 0) intervalId = id;
        if (totalCycleCnt >= 70) {
          console.log("not found");
          clearInterval(id);
          notFound();
        }
        setCycleCnt((current) => current + 1);
        totalCycleCnt += 1;
        drawToCanvas();
        sendImage();
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
    if (cycleCnt >= 15) {
      textToSpeech("탐색중.", 0);
      setCycleCnt(0);
    }
  }, [cycleCnt]);

  useEffect(() => {
    if (!isFirstLoaded.current && recycle !== "") {
      console.log("success!");
      console.log(`found result is ${recycle}`);
      navigateTo("/recycle/result", { resRecycle: recycle });
    } else {
      isFirstLoaded.current = false;
    }
  }, [recycle]);

  return (
    <div>
      <Video videoRef={videoRef} />
      <Canvas ref={canvasRef} />
    </div>
  );
}

export default Recycle;
