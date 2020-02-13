import { useState, useEffect } from "react";

export const useBreakpoint = (breaksAt: number): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth > breaksAt);

  useEffect(() => {
    const onResize = () => {
      const isMobileNew = window.innerWidth > breaksAt;
      if (isMobile !== isMobileNew) {
        setIsMobile(isMobileNew);
      }
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
};
