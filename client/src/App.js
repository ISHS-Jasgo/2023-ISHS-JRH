import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Nutrients from "./routes/Nutrients";
import Expiration from "./routes/Expiration";
import Restaurant from "./routes/Restaurant";
import Help from "./routes/Help";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/nutrients" element={<Nutrients />} />
        <Route exact path="/expiration" element={<Expiration />} />
        <Route exact path="/restaurant" element={<Restaurant />} />
        <Route exact path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
