/**
 * Hook para efecto parallax en hover
 * Reemplaza: initHoverEffects()
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { esDesktop } from '../lib/utils';

export function useHoverParallax() {
  useEffect(() => {
    if (!esDesktop()) return;

    const heroImages = document.querySelectorAll('.right-h-content img');

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      heroImages.forEach((img, index) => {
        const speed = (index + 1) * 15;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        gsap.to(img, {
          x: x,
          y: y,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}