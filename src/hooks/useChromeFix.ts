import { useCallback, useEffect } from 'react';

export const useChromeFix = () => {
  const updateVhVariable = useCallback(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    updateVhVariable();
    document.addEventListener('resize', updateVhVariable);
    return () => {
      document.removeEventListener('resize', updateVhVariable);
    };
  }, []);
};
