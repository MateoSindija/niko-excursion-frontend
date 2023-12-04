'use client';
import { useEffect, useState } from 'react';
export function useDetectWindowSize() {
  const [windowSize, setWindowSize] = useState(0);
  const handleSizeChange = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    handleSizeChange();
    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, []);

  return windowSize;
}
