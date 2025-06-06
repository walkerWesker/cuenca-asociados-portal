
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLogo } from '@/hooks/use-logo';

const LogoDisplay: React.FC = () => {
  const { data, isLoaded } = useLogo();
  const [imageError, setImageError] = useState(false);

  // Carga optimizada de imagen con manejo de errores
  const handleImageLoad = useCallback(() => {
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Estilos memoizados para prevenir recálculos innecesarios
  const containerStyles = useMemo(() => ({
    animationFillMode: 'forwards' as const
  }), []);

  // Retorno temprano para estado de carga con skeleton optimizado
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full">
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-white/20 rounded-full mx-auto animate-pulse"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-white/20 rounded mx-auto w-3/4 animate-pulse"></div>
            <div className="h-3 bg-white/20 rounded mx-auto w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback de error
  if (imageError) {
    return (
      <div className="flex items-center justify-center w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full text-center">
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-white/20 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white/60 text-sm">Logo no disponible</span>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-white font-bold text-lg">{data.companyName}</h3>
            <p className="text-white/90 text-sm">{data.registrationNumber}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="transition-all duration-500 ease-out transform w-full opacity-100 translate-x-0"
      style={containerStyles}
    >
      <div className="relative group w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg">
        {/* Contenedor del Logo Optimizado */}
        <div className="
          bg-gradient-to-br from-white/20 to-white/8 
          backdrop-blur-lg backdrop-saturate-150
          border border-white/30 
          rounded-2xl 
          p-6 md:p-8 lg:p-10
          shadow-2xl shadow-black/20
          transition-all duration-300 
          hover:scale-105 
          hover:shadow-3xl 
          hover:shadow-black/30
          hover:bg-white/25
          w-full
          will-change-transform
        ">
          {/* Imagen del Logo Optimizada */}
          <div className="flex justify-center mb-4 md:mb-6">
            <img 
              src={data.imageUrl}
              alt={data.altText}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
              decoding="async"
              className="
                w-40 h-40 
                sm:w-48 sm:h-48 
                md:w-56 md:h-56 
                lg:w-64 lg:h-64 
                xl:w-72 xl:h-72
                2xl:w-80 2xl:h-80
                object-contain 
                filter drop-shadow-2xl
                transition-transform duration-300
                group-hover:scale-110
                max-w-full
                max-h-full
                will-change-transform
              "
            />
          </div>
          
          {/* Información de la Empresa */}
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

          {/* Elementos Decorativos Optimizados */}
          <div className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 bg-cuenca-gold rounded-full opacity-70"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-cuenca-gold rounded-full opacity-50"></div>
          
          {/* Elementos decorativos adicionales en las esquinas */}
          <div className="absolute top-4 left-4 w-1 h-6 bg-gradient-to-b from-cuenca-gold/60 to-transparent rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-6 h-1 bg-gradient-to-r from-cuenca-gold/60 to-transparent rounded-full"></div>
        </div>

        {/* Efectos de Brillo Optimizados */}
        <div className="
          absolute inset-0 
          bg-gradient-to-r from-cuenca-gold/20 via-cuenca-blue/15 to-cuenca-gold/20 
          rounded-2xl 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-500 
          -z-10 
          blur-xl
          scale-105
          will-change-auto
        "></div>
        
        <div className="
          absolute inset-0 
          bg-gradient-to-r from-white/5 to-white/10 
          rounded-2xl 
          -z-20 
          blur-sm
        "></div>
      </div>
    </div>
  );
};

export default LogoDisplay;
