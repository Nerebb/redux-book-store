import { useState, useEffect } from "react";

const useDevice = (width) => {
  const [isMobie, setIsMobile] = useState(false);
  useEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth <= (width ? width : 1023));
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [setIsMobile, width]);
  return isMobie;
};

export default useDevice;
