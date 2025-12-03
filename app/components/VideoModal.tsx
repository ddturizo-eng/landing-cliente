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
    const mobileParams = 'quality=360p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    
    // Parámetros para desktop
    const desktopParams = 'quality=720p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    
    return `${baseUrl}?${isMobile ? mobileParams : desktopParams}`;
  };

  return (
    <div
      id="videoModal"
      className="fixed inset-0 bg-black/98 z-[9999] flex items-center justify-center p-0 sm:p-2 md:p-4"
      onClick={onClose}
    >
      {/* Top Controls Bar - Close and Navigation buttons */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-20">
        {/* Left: Previous button (mobile) */}
        {hasPrev && (
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-black/60 rounded-full hover:bg-pink-600 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Video anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Spacer */}
        {!hasPrev && <div className="w-10"></div>}

        {/* Right: Next button (mobile) and Close button */}
        <div className="flex items-center gap-2">
          {hasNext && (
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-black/60 rounded-full hover:bg-pink-600 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <button
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-white hover:text-pink-500 transition-colors bg-black/60 backdrop-blur-sm rounded-full"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Container - CSS global en globals.css maneja responsive */}
      <div
        className="relative w-full h-auto sm:w-[95vw] md:max-w-5xl lg:max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-sm">Cargando video...</p>
              {isMobile && <p className="text-gray-400 text-xs mt-2">Calidad optimizada para móvil</p>}
            </div>
          </div>
        )}

        {/* Iframe - CSS global aplica sizing según breakpoint */}
        <iframe
          key={videoId}
          src={videoId ? getVimeoUrl() : ''}
          className="w-full h-full sm:rounded-lg md:rounded-xl"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        ></iframe>

        {/* Info Text - Solo en desktop */}
        <div className="hidden md:block mt-4 text-center">
          <p className="text-white/60 text-sm">
            Usa las flechas del teclado o los botones para navegar
          </p>
        </div>
      </div>

      {/* Navigation Buttons - Desktop Solo (lado derecho) */}
      {hasPrev && (
        <button
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Video anterior"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Siguiente video"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Mobile Navigation - Botones en la parte inferior (solo para desktop fallback) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {hasPrev && (
          <button
            className="w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Video anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            className="w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Siguiente video"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}