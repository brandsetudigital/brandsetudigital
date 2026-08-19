import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/route";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "../src/components/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
