import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Video from "../../components/Global/Video";
import Canvas from "../../components/Global/Canvas";

function Expiration() {
  const [expiration, setExpiration] = useState("");
  const [isDateDetected, setIsDateDetected] = useState(false);
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

        fetch("https://0917ba2.pythonanywhere.com/utong", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data)
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
    const id = setInterval(() => {
      drawToCanvas();
      sendImage();
    }, 450);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isDateDetected) {
      console.log("date detected!");
    }
  }, [isDateDetected]);

  useEffect(() => {
    if (resultArr.length >= 10) {
      search.current = false;
      let { res, repeatCnt } = getMode(resultArr);
      if (res === "not found") {
        console.log("failed.. begin to search");
        search.current = true;
      } else {
        console.log("success!");
        console.log(`found result is ${res}`);
        setExpiration(res);
      }

      //init
      setIsDateDetected(false);
      setResultArr([]);
    }
  }, [resultArr]);

  useEffect(() => {
    //console.log(isFirstLoaded.current);
    if (!isFirstLoaded.current && expiration !== "") {
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
    //console.log(key);
    if (resNum < obj[key]) {
      res = key;
      resNum = obj[key];
    }
  }
  return { res: res, repeatCnt: resNum };
}

export default Expiration;
