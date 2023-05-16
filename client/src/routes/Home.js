import { useNavigate } from "react-router-dom";
import Button from "../components/Global/Button";
//import { getSpeech } from "../js/tts";
import { useEffect, useState } from "react";
import Logo from "./logo.jpg";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("Redirecting...");
  };

  //useEffect(() => getSpeech("Hello!"), []);
  let [modal, setModal] = useState(false);
  return (
    <div>
      <div>
        <imgButton
          className={styles.settingimg}
          onClick={() => navigateTo("/Settings")}
        />
      </div>
      <div className={styles.aboutlogo}>
        <img src={Logo} width={300}></img>
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
