
import { useState, useEffect } from 'react';
import { logoData, LogoData } from '@/data/logoData';

export const useLogo = () => {
  const [data, setData] = useState<LogoData>(logoData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = data.imageUrl;
    img.onload = () => setIsLoaded(true);
  }, [data.imageUrl]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    data,
    isLoaded,
    isVisible,
    setData
  };
};
