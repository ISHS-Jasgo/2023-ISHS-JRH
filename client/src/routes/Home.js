import { useNavigate } from "react-router-dom";
import Button from "../components/Global/Button";
//import { getSpeech } from "../js/tts";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("Redirecting...");
  };

  //useEffect(() => getSpeech("Hello!"), []);

  return (
    <div>
      <h1>앱 이름</h1>
      <Button text="영양성분" onClick={() => navigateTo("/nutrients")} />
      <Button text="유통기한" onClick={() => navigateTo("/expiration")} />
      <Button text="음식점" onClick={() => navigateTo("/restaurant")} />
      <Button text="도움말" onClick={() => navigateTo("/help")} />
    </div>
  );
}

export default Home;
