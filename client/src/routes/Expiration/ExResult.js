import { useLocation } from "react-router-dom";

function ExResult() {
  const location = useLocation();
  return (
    <div>
      <h1>Result is ... {location.state.resDate}</h1>
    </div>
  );
}

export default ExResult;
