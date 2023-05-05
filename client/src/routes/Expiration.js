import { useEffect, useRef } from "react";
import Video from "./../components/Global/Video";
import Canvas from "./../components/Global/Canvas";

function Expiration() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx !== null && videoRef.current) {
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
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
          .then((data) => console.log(data));
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
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <Video videoRef={videoRef} />
      <Canvas ref={canvasRef} />
    </div>
  );
}

export default Expiration;
