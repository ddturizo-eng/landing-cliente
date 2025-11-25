/**
 * Hook para overlay de imágenes hero
 * Reemplaza: initHeroImageOverlay()
 */

import { useEffect } from 'react';

export function useHeroImageOverlay() {
  useEffect(() => {
    const heroImages = document.querySelectorAll('.right-h-content img');

    if (!heroImages.length) return;

    let overlay = document.querySelector('.hero-image-overlay') as HTMLElement;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'hero-image-overlay';
      document.body.appendChild(overlay);
    }

    const toggleImageActive = (img: Element) => {
      const isActive = img.classList.contains('active-image');

      if (isActive) {
        img.classList.remove('active-image');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      } else {
        heroImages.forEach((i) => i.classList.remove('active-image'));
        img.classList.add('active-image');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
      }
    };

    const closeOverlay = () => {
      heroImages.forEach((img) => img.classList.remove('active-image'));
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    heroImages.forEach((img) => {
      img.addEventListener('click', () => toggleImageActive(img));
    });

    overlay.addEventListener('click', closeOverlay);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOverlay();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      heroImages.forEach((img) => {
        img.removeEventListener('click', () => toggleImageActive(img));
      });
      overlay.removeEventListener('click', closeOverlay);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}