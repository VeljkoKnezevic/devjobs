import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { Data } from "./Data";
import Detail from "./components/Detail";

const App = () => {
  const [dark, setDark] = useState(false);
  const [data, setData] = useState<Data | undefined>();

  const getData = async () => {
    try {
      const response = await fetch("/data.json");
      const json: Data = await response.json();

      if (json) {
        setData(json);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  return (
    <Router>
      <div className={`${dark ? "dark" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                dark={dark}
                setDark={setDark}
                data={data}
                setData={setData}
                getData={getData}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <Detail
                dark={dark}
                setDark={setDark}
                data={data}
                getData={getData}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
