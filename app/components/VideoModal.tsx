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

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
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
    
    // Parámetros optimizados para móvil
    const mobileParams = 'quality=480p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    
    // Parámetros para desktop
    const desktopParams = 'quality=720p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    
    return `${baseUrl}?${isMobile ? mobileParams : desktopParams}`;
  };

  return (
    <div
      id="videoModal"
      className="fixed inset-0 bg-black z-[9999] flex flex-col"
      onClick={onClose}
    >
      {/* Top Controls Bar - Compacta en móvil */}
      <div className="flex-shrink-0 flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3 md:py-4 z-20 bg-black/90">
        {/* Left: Previous button */}
        {hasPrev ? (
          <button
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-pink-600 active:bg-pink-700 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Video anterior"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12"></div>
        )}

        {/* Center: Title (opcional) */}
        <div className="flex-1 text-center px-2">
          <p className="text-white/80 text-xs sm:text-sm md:text-base font-medium truncate">
            Video {/* Puedes pasar el título como prop si lo necesitas */}
          </p>
        </div>

        {/* Right: Next and Close buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {hasNext && (
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-pink-600 active:bg-pink-700 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <button
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:text-pink-500 active:text-pink-600 transition-colors bg-white/10 rounded-full"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Container - Ocupa todo el espacio disponible */}
      <div
        className="flex-1 flex items-center justify-center px-0 md:px-4 lg:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full md:max-w-5xl lg:max-w-6xl md:h-auto">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white text-sm sm:text-base">Cargando video...</p>
                {isMobile && <p className="text-gray-400 text-xs sm:text-sm mt-2">Calidad optimizada para móvil</p>}
              </div>
            </div>
          )}

          {/* Iframe - Ocupa 100% en móvil, aspect ratio en desktop */}
          <iframe
            key={videoId}
            src={videoId ? getVimeoUrl() : ''}
            className="w-full h-full md:aspect-video md:rounded-lg lg:rounded-xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>

          {/* Navigation Buttons - Solo Desktop (flotantes en los lados) */}
          {hasPrev && (
            <button
              className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Video anterior"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Info Text - Solo en desktop */}
      <div className="hidden md:block flex-shrink-0 py-3 text-center bg-black/90">
        <p className="text-white/60 text-sm">
          Usa las flechas del teclado o los botones para navegar
        </p>
      </div>
    </div>
  );
}