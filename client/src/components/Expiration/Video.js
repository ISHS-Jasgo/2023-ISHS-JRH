import { useEffect } from "react";
import styles from "./Video.module.css";

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

  return (
    <div className={styles.div}>
      <video ref={videoRef} className={styles.video} autoPlay />
    </div>
  );
}

export default Video;
