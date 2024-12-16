import { useCallback } from 'react';

export const useDebounce = (callback: Function, delay: number) => {
  let timeoutId: any;

  return useCallback((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};