import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Nutrients from "./routes/Nutrients/Nutrients";
import NuResult from "./routes/Nutrients/NuResult";
import Expiration from "./routes/Expiration/Expiration";
import ExResult from "./routes/Expiration/ExResult";
import Restaurant from "./routes/Restaurant/Restaurant";
import ReResult from "./routes/Restaurant/ReResult";
import Recycle from "./routes/Recycle/Recycle";
import Rcresult from "./routes/Recycle/Rcresult";
import Help from "./routes/Help/Help";
import First from "./routes/First";
import FirstTutorial from "./routes/FirstTutorial";

function App() {
  //<Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />

  return (
    <Router>
      <Routes>
        <Route path="/nutrients/result" element={<NuResult />} />
        <Route path="/nutrients" element={<Nutrients />} />
        <Route path="/expiration/result" element={<ExResult />} />
        <Route path="/expiration" element={<Expiration />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/restaurant/result" element={<ReResult />} />
        <Route path="/recycle" element={<Recycle />} />
        <Route path="/recycle/result" element={<Rcresult />} />
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<First />} />
        <Route path="/" element={<First />} />
        <Route path="/tutorial" element={<FirstTutorial />} />
      </Routes>
    </Router>
  );
}

export default App;
