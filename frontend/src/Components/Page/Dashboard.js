import React, { useEffect, useState } from "react";
import WebPageView from "./WebPageView";
import MobilePageView from "./MobilePageView";

function Dashboard(props) {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div>
      {isMobile? <MobilePageView/>: <WebPageView/>}
    </div>
  );
}

export default Dashboard;
