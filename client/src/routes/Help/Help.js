import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "../../js/tts";
import styles from "./Help.module.css";

function Help() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

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
    <div className={styles.center}>
      <h1 className={styles.prettytext}> 도움말 </h1>
    </div>
  );
}

export default Help;
