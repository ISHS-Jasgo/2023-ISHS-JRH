import { useEffect } from "react";
import { getDevice } from "../../js/tts";
import styles from "./stylesheets/Video.module.css";

function Video({ videoRef }) {
  const getWebcam = () => {
    const device = getDevice();
    if (device === "android" || device === "ios") {
      return navigator.mediaDevices.getUserMedia({
        video: {
          width: 300,
          height: 400,
          facingMode: { exact: "environment" },
        },
        audio: false,
      });
    } else {
      return navigator.mediaDevices.getUserMedia({
        video: {
          width: 300,
          height: 400,
        },
        audio: false,
      });
    }
  };

  useEffect(() => {
    getWebcam().then((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return <video ref={videoRef} className={styles.video} autoPlay />;
}

export default Video;
