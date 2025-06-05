
import { useState, useEffect } from 'react';

export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export function useDevice(): DeviceType {
  const [device, setDevice] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'desktop'
  });

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setDevice({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          screenSize: 'mobile'
        });
      } else if (width >= 768 && width < 1024) {
        setDevice({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          screenSize: 'tablet'
        });
      } else {
        setDevice({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          screenSize: 'desktop'
        });
      }
    };

    // Set initial value
    updateDevice();

    // Add event listener
    window.addEventListener('resize', updateDevice);

    // Cleanup
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return device;
}
