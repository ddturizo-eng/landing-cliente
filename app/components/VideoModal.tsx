'use client';

import { useEffect } from 'react';

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

  if (!isOpen) return null;

  return (
    <div
      id="videoModal"
      className="fixed inset-0 bg-black/98 z-[9999] flex items-center justify-center p-0 sm:p-2 md:p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white hover:text-pink-500 transition-colors z-10 bg-black/60 backdrop-blur-sm rounded-full"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video Container - Optimizado para aprovechar TODO el espacio en móvil */}
      <div
        className="relative w-full h-full sm:w-[95vw] sm:h-auto md:max-w-5xl lg:max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Aspect ratio container - En móvil usa todo el espacio */}
        <div className="relative w-full h-full sm:h-auto" style={{ paddingBottom: window.innerWidth < 640 ? '0' : '56.25%' }}>
          <iframe
            key={videoId}
            src={
              videoId
                ? `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0`
                : ''
            }
            className="absolute inset-0 w-full h-full sm:rounded-lg md:rounded-xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Info Text - Solo en desktop */}
        <div className="hidden md:block mt-4 text-center">
          <p className="text-white/60 text-sm">
            Usa las flechas del teclado o los botones para navegar
          </p>
        </div>
      </div>

      {/* Navigation Buttons - Desktop */}
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

      {/* Mobile Navigation - Botones en la parte inferior */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {hasPrev && (
          <button
            className="w-14 h-14 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Video anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            className="w-14 h-14 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Siguiente video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}