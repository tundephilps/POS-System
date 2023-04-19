import React from "react";
import Welcome from "./components/Welcome";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import POS from "./components/POS";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/POS" element={<POS />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
