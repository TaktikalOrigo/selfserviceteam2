import { useRef, useEffect } from "react";

function debounce<T extends Function>(timeoutMs: number, fn: T): T {
  let timeout: number | null = null;
  const retval = (...args: any[]) => {
    clearTimeout(timeout!);
    timeout = window.setTimeout(() => fn(...args), timeoutMs);
  };

  return retval as any;
}

export const useDebounced = <T extends (...args: any[]) => void>(timeoutMs: number, fn: T): T => {
  const fnRef = useRef(fn);
  const fnToReturnRef = useRef(
    debounce(timeoutMs, (...args: any[]) => {
      (fnRef.current as any)(...args);
    }),
  );

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return fnToReturnRef.current as T;
};
