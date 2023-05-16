import { useNavigate } from "react-router-dom";

function First() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };
  const onClick = () => {
    navigateTo("/home");
  };
  return (
    <div onClick={onClick} style={{ width: "100vw", height: "100vh" }}>
      <h1>클릭해 주세요!</h1>;
    </div>
  );
}

export default First;
