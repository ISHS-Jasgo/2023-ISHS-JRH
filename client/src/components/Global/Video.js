import { useEffect } from "react";
import styles from "./stylesheets/Video.module.css";

function Video({ videoRef }) {
  const getWebcam = () => {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  };

  useEffect(() => {
    getWebcam().then((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return <video ref={videoRef} className={styles.video} autoPlay />;
}

export default Video;
