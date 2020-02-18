import { useState, useEffect, useRef } from "react";

export const useBreakpoint = (breaksAt: number): boolean => {
  const isMobileInitial = typeof window === "undefined" ? false : window.innerWidth <= breaksAt;
  const [isMobile, setIsMobile] = useState(isMobileInitial);
  const isMobileRef = useRef(isMobileInitial);

  useEffect(() => {
    const onResize = () => {
      const isMobileNew = window.innerWidth <= breaksAt;
      if (isMobileRef.current !== isMobileNew) {
        setIsMobile(isMobileNew);
        isMobileRef.current = isMobileNew;
      }
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
};
