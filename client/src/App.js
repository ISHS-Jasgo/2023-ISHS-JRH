import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./routes/Home";
import Nutrients from "./routes/Nutrients/Nutrients";
import NuResult from "./routes/Nutrients/NuResult";
import Expiration from "./routes/Expiration/Expiration";
import ExResult from "./routes/Expiration/ExResult";
import Restaurant from "./routes/Restaurant/Restaurant";
import ReResult from "./routes/Restaurant/ReResult";
import Help from "./routes/Help/Help";
import Setting from "./routes/Settings/Setting";

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
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Setting />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
