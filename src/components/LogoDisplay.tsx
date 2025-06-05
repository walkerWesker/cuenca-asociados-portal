
import React from 'react';
import { useLogo } from '@/hooks/use-logo';

const LogoDisplay: React.FC = () => {
  const { data, isLoaded, isVisible } = useLogo();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg bg-white/10 rounded-xl animate-pulse p-6">
        <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-white/20 rounded-full"></div>
      </div>
    );
  }

  return (
    <div 
      className={`
        transition-all duration-1000 ease-in-out transform w-full
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
      style={{ 
        animationDelay: '1.2s', 
        animationFillMode: 'forwards' 
      }}
    >
      <div className="relative group w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg">
        {/* Logo Container */}
        <div className="
          bg-gradient-to-br from-white/20 to-white/8 
          backdrop-blur-lg backdrop-saturate-150
          border border-white/30 
          rounded-2xl 
          p-6 md:p-8 lg:p-10
          shadow-2xl shadow-black/20
          hover:shadow-3xl hover:shadow-black/30
          transition-all duration-500 
          hover:scale-105 
          hover:bg-white/25
          w-full
        ">
          {/* Logo Image - Más grande y responsiva */}
          <div className="flex justify-center mb-4 md:mb-6">
            <img 
              src={data.imageUrl}
              alt={data.altText}
              className="
                w-40 h-40 
                sm:w-48 sm:h-48 
                md:w-56 md:h-56 
                lg:w-64 lg:h-64 
                xl:w-72 xl:h-72
                2xl:w-80 2xl:h-80
                object-contain 
                filter drop-shadow-2xl
                transition-all duration-300
                group-hover:scale-110
                group-hover:drop-shadow-3xl
                max-w-full
                max-h-full
              "
            />
          </div>
          
          {/* Company Info */}
          <div className="text-center space-y-2 md:space-y-3">
            <h3 className="
              text-white font-serif font-bold 
              text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
              tracking-wide
              drop-shadow-lg
              leading-tight
            ">
              {data.companyName}
            </h3>
            <p className="
              text-white/95 
              text-sm sm:text-base md:text-lg lg:text-xl
              font-medium
              tracking-wider
              drop-shadow-md
              px-2
              leading-relaxed
            ">
              {data.registrationNumber}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 bg-cuenca-gold rounded-full opacity-70 animate-pulse-subtle"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-cuenca-gold rounded-full opacity-50 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
          
          {/* Additional decorative corner elements */}
          <div className="absolute top-4 left-4 w-1 h-6 bg-gradient-to-b from-cuenca-gold/60 to-transparent rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-6 h-1 bg-gradient-to-r from-cuenca-gold/60 to-transparent rounded-full"></div>
        </div>

        {/* Enhanced Glow Effect on Hover */}
        <div className="
          absolute inset-0 
          bg-gradient-to-r from-cuenca-gold/30 via-cuenca-blue/20 to-cuenca-gold/30 
          rounded-2xl 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-700 
          -z-10 
          blur-2xl
          scale-110
        "></div>
        
        {/* Subtle background glow always present */}
        <div className="
          absolute inset-0 
          bg-gradient-to-r from-white/5 to-white/10 
          rounded-2xl 
          -z-20 
          blur-xl
        "></div>
      </div>
    </div>
  );
};

export default LogoDisplay;
