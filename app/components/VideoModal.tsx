'use client';

import { useEffect, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
}: VideoModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, hasNext, hasPrev]);

  // Body scroll lock + prevenir zoom en iOS
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Reset loading cuando cambia el video
  useEffect(() => {
    if (isOpen && videoId) {
      setIsLoading(true);
    }
  }, [videoId, isOpen]);

  if (!isOpen) return null;

  // Construir URL optimizada según dispositivo
  const getVimeoUrl = () => {
    const baseUrl = `https://player.vimeo.com/video/${videoId}`;
    
    // Parámetros optimizados para móvil - calidad más baja para carga rápida
    const mobileParams = 'quality=360p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0&controls=1';
    
    // Parámetros para desktop
    const desktopParams = 'quality=720p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0&controls=1';
    
    return `${baseUrl}?${isMobile ? mobileParams : desktopParams}`;
  };

  return (
    <div
      id="videoModal"
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      onClick={onClose}
      style={{ 
        touchAction: 'none',
        height: '100dvh' // Dynamic viewport height para iOS
      }}
    >
      {/* Botón cerrar - MÁS GRANDE Y VISIBLE EN MOBILE */}
      <button
        className="absolute top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-white hover:text-pink-500 transition-colors z-[10000] bg-black/90 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-2xl active:scale-95"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video Container - PANTALLA COMPLETA EN MOBILE */}
      <div
        className="relative w-full h-full md:w-[95vw] md:h-auto md:max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center px-4">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-white text-base font-semibold mb-2">Cargando video...</p>
              {isMobile && (
                <p className="text-gray-400 text-sm">
                  Calidad optimizada para móvil
                </p>
              )}
            </div>
          </div>
        )}

        {/* Aspect ratio container */}
        <div 
          className="relative w-full"
          style={{ 
            height: isMobile ? '100vh' : 'auto',
            paddingBottom: isMobile ? '0' : '56.25%'
          }}
        >
          <iframe
            key={videoId}
            src={videoId ? getVimeoUrl() : ''}
            className="absolute inset-0 w-full h-full md:rounded-xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Botones de navegación */}
      {isMobile ? (
        // Móvil: Botones grandes en la parte inferior
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-[10000]">
          {hasPrev && (
            <button
              className="w-16 h-16 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border-2 border-white/30"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Video anterior"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="w-16 h-16 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border-2 border-white/30"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        // Desktop: Botones a los lados
        <>
          {hasPrev && (
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Video anterior"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
}