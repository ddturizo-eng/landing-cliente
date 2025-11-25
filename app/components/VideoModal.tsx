'use client';

import { useEffect } from 'react';
import { VideoModalProps } from '../types';

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
      className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        id="closeVideoModal"
        className="absolute top-4 right-4 text-white text-4xl hover:text-pink-500 transition z-10"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Video Container */}
      <div
        className="relative w-full max-w-6xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          id="modalIframe"
          src={
            videoId
              ? `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=0&autopause=0&byline=0&title=0`
              : ''
          }
          className="w-full h-full rounded-lg"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Navigation Buttons */}
      {hasPrev && (
        <button
          id="prevVideo"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-pink-500 transition"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Video anterior"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}

      {hasNext && (
        <button
          id="nextVideo"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-pink-500 transition"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Siguiente video"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}