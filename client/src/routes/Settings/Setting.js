import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  return <p>Setting</p>;
}

export default Setting;
