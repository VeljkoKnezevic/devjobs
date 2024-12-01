import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./components/Detail";
import Main from "./components/Main";
import { JobData } from "./types";

const queryClient = new QueryClient();

const App = () => {
  const [dark, setDark] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const fetchData = async (): Promise<JobData[]> => {
    try {
      const response = await fetch(`http://localhost:8080/`, {
        headers: {
          "Allow-Access-Control-Origin": "http://localhost:5173/",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={`${dark ? "dark" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <Main fetchData={fetchData} width={width} setDark={setDark} />
              }
            />
            <Route
              path="/:id"
              element={
                <Detail fetchData={fetchData} width={width} setDark={setDark} />
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
