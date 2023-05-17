import { useNavigate } from "react-router-dom";
import Button from "../components/Global/Button";
import ImgButton from "../components/Global/ImgButton";
//import { getSpeech } from "../js/tts";
import { useEffect, useState } from "react";
import Logo from "./logo.jpg";
import ISHSlogo from "./ISHSlogo.png";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("Redirecting...");
  };

  //useEffect(() => getSpeech("Hello!"), []);
  return (
    <div>
      <div>
        <ImgButton
          classname={styles.settingimg}
          onClick={() => navigateTo("/settings")}
          imgSource="setting"
        />
      </div>

      <div className={styles.aboutlogo}>
        <img className={styles.sizeimage} src={Logo}></img>
      </div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButton}
            text="영양성분"
            onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButton}
            text="유통기한"
            onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButton}
            text="음식점"
            onClick={() => navigateTo("/restaurant")}
          />

          <Button
            classname={styles.myButton}
            text="도움말"
            onClick={() => navigateTo("/help")}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
