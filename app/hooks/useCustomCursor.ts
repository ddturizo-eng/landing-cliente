/**
 * Hook para cursor personalizado
 * Reemplaza: initCustomCursor() del vanilla JS
 */

import { useEffect } from 'react';
import { esDesktop } from '../lib/utils';

export function useCustomCursor() {
  useEffect(() => {
    if (!esDesktop()) return;

    const customCursor = document.querySelector(
      '.custom-cursor'
    ) as HTMLElement;
    const cursorTrail = document.querySelector(
      '.cursor-trail'
    ) as HTMLElement;

    if (!customCursor || !cursorTrail) return;

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    let trailX = 0,
      trailY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      customCursor.style.left = cursorX + 'px';
      customCursor.style.top = cursorY + 'px';

      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    const interactiveElements = document.querySelectorAll(
      'a, button, .gallery-card, .service-item, .filter-btn, input, select, textarea'
    );

    const handleMouseEnter = (el: Element) => {
      (el as HTMLElement).addEventListener('mouseenter', () => {
        customCursor.style.transform = 'scale(1.5)';
        cursorTrail.style.transform = 'scale(1.3)';
      });
      (el as HTMLElement).addEventListener('mouseleave', () => {
        customCursor.style.transform = 'scale(1)';
        cursorTrail.style.transform = 'scale(1)';
      });
    };

    interactiveElements.forEach(handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}