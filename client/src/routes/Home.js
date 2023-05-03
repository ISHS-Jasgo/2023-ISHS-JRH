import { useNavigate } from "react-router-dom";
import Button from "./../components/Button";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("I'm clicked!!");
  };

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
