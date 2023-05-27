import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";

const App = () => {
  const [dark, setDark] = useState(true);
  return (
    <Router>
      <div className={`${dark ? "dark" : ""}`}>
        <Routes>
          <Route path="/" element={<Main dark={dark} setDark={setDark} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
