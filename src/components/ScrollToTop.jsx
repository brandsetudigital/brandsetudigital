import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // force scroll to top on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // 🔑 mobile reliable
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
