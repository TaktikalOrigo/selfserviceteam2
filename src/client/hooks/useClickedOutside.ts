import { useEffect } from "react";

export const useClickedOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  cb: (e: MouseEvent) => void,
) => {
  const onClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      cb(e);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  });
};
