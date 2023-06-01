import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./First.module.css";

function First() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const onClick = () => {
    navigateTo("/tutorial");
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
    <div className={styles.decodiv} onClick={onClick}>
      <h1 className={styles.decoh}>클릭해 주세요!</h1>
    </div>
  );
}

export default First;
