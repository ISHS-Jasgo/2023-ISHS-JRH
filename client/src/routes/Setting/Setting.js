import { useEffect } from "react";
import styles from "./Setting.module.css";
import ImgButton from "../../components/Global/ImgButton";
import Button from "../../components/Global/Button";

function Setting() {
  useEffect(() => {
    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Button classname={styles.closeButton} text="X" />
      <h1>설정</h1>
    </div>
  );
}

export default Setting;
