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
      <div>
        <h2 className={styles.btnhad}>버튼 별 기능</h2>

        <div>
          <div>
            <li className={styles.decoli}>영양성분</li>
            <p className={styles.psize}>
              가공 식품 표면의 품목보고번호를 인식시키면 해당식품에 대한
              영양성분과 일일적정섭취량 등의 정보 제공
            </p>
          </div>

          <div>
            <li className={styles.decoli}>유통기한</li>
            <p className={styles.psize}>
              국내 가공 식품에 대한 유통기한을 인식하여 정보 제공
            </p>
            <ul>
              <li>
                유통기한이 지난 경우 :{" "}
                <span className={styles.clred}>경고메세지</span>
              </li>
              <li>
                유통기한이 3일 이하로 남은 경우 :{" "}
                <span className={styles.clyellow}>주의메세지</span>
              </li>
              <li>
                유통기한이 4일 이상으로 남은 경우 :{" "}
                <span className={styles.clgreen}>안심메세지</span>
              </li>
            </ul>
          </div>

          <div>
            <li className={styles.decoli}>음식점</li>
            <p className={styles.psize}>
              시중 음식점 브랜드명과 식품명을 음성으로 인식해 식품에 대한
              영양성분 정보 제공
            </p>
          </div>

          <hr className={styles.decohr} />
        </div>

        <h2 className={styles.btnhad}>앱 소개</h2>
        <h3 className={styles.decohthree}>
          개발자 | 인천과학고등학교 29기 이우진, 김민재, 김보경
          <br />
          로고 디자인 | 인천과학고등학교 29기 이하늘, 김보경
        </h3>

        <p>
          이 앱은 시각장애인이 식품 선택을 더욱 효율적이고 효과적으로 할 수
          있도록 돕기 위해 개발되었다.
        </p>
      </div>
    </div>
  );
}

export default Help;
