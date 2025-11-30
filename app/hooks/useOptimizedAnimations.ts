/**
 * Hook optimizado con throttle para scroll listeners
 * Reduce llamadas de 60fps a ~10fps (mejora 83% de rendimiento)
 */

import { useEffect } from 'react';
import { CONFIG } from '../lib/config';

// Función throttle para limitar ejecuciones
function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    // Si ha pasado suficiente tiempo, ejecutar inmediatamente
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else {
      // Si no, programar ejecución al final del throttle
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, delay - (now - lastCall));
    }
  };
}

export function useOptimizedAnimations() {
  useEffect(() => {
    // ============================================
    // 1. SMOOTH SCROLL - Links con #hash
    // ============================================
    const handleSmoothScroll = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute('href');

      if (href === '#' || !href?.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href) as HTMLElement | null;

      if (target) {
        const navbar = typeof CONFIG.navbarHeight === 'number' ? CONFIG.navbarHeight : 0;
        const offsetTop = target.offsetTop - navbar;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });

        // Cerrar menú mobile
        const navItems = document.querySelector('.nav-items');
        if (navItems?.classList.contains('mobile-active')) {
          navItems.classList.remove('mobile-active');
          const menuToggle = document.querySelector('.mobile-menu-toggle i');
          if (menuToggle) {
            menuToggle.className = 'fas fa-bars';
          }
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>;
    links.forEach(link => link.addEventListener('click', handleSmoothScroll));

    // ============================================
    // 2. NAVBAR SCROLL + ACTIVE MENU (THROTTLED)
    // ============================================
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const navigation = document.querySelector('.navigation') as HTMLElement;

      // Clase scrolled
      if (scrollTop > CONFIG.scrollOffset) {
        navigation?.classList.add('scrolled');
      } else {
        navigation?.classList.remove('scrolled');
      }

      // Actualizar menú activo
      const navItems = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.section');
      const scrollPos = window.pageYOffset + CONFIG.navbarHeight + 100;

      sections.forEach((section) => {
        const sectionEl = section as HTMLElement;
        const sectionTop = sectionEl.offsetTop;
        const sectionHeight = sectionEl.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navItems.forEach((item) => {
            const link = item.querySelector('a') as HTMLAnchorElement;
            link?.classList.remove('active-menu');

            if (link?.getAttribute('href') === `#${sectionId}`) {
              link?.classList.add('active-menu');
            }
          });
        }
      });
    };

    // THROTTLE: Solo ejecutar cada 100ms en lugar de 60 veces por segundo
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // ============================================
    // 3. HERO IMAGE OVERLAY
    // ============================================
    const heroImages = document.querySelectorAll('.right-h-content img');
    let overlay = document.querySelector('.hero-image-overlay') as HTMLElement;

    if (heroImages.length > 0 && !overlay) {
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

    overlay?.addEventListener('click', closeOverlay);

    // ============================================
    // 4. KEYBOARD CONTROLS
    // ============================================
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOverlay();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // ============================================
    // 5. LAZY LOADING IMÁGENES (Intersection Observer)
    // ============================================
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          });
        },
        { 
          rootMargin: '50px', // Precarga 50px antes
          threshold: 0.01 
        }
      );

      images.forEach((img) => imageObserver.observe(img));

      // Cleanup
      return () => {
        links.forEach(link => link.removeEventListener('click', handleSmoothScroll));
        window.removeEventListener('scroll', throttledScroll);
        heroImages.forEach((img) => {
          img.removeEventListener('click', () => toggleImageActive(img));
        });
        overlay?.removeEventListener('click', closeOverlay);
        document.removeEventListener('keydown', handleKeyDown);
        images.forEach((img) => imageObserver.unobserve(img));
      };
    }

    // Cleanup sin IntersectionObserver
    return () => {
      links.forEach(link => link.removeEventListener('click', handleSmoothScroll));
      window.removeEventListener('scroll', throttledScroll);
      heroImages.forEach((img) => {
        img.removeEventListener('click', () => toggleImageActive(img));
      });
      overlay?.removeEventListener('click', closeOverlay);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}