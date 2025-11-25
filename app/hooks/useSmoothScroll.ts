/**
 * Hook para scroll suave
 * Reemplaza: initSmoothScroll()
 */

import { useEffect } from 'react';
import { CONFIG } from '../lib/config';

export function useSmoothScroll() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>;

    const handleClickLink = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute('href');

      if (href === '#' || !href) return;

      e.preventDefault();
      const target = document.querySelector(href) as HTMLElement | null;

      if (target) {
        const navbar = typeof CONFIG.navbarHeight === 'number' ? CONFIG.navbarHeight : 0;
        const offsetTop = target.offsetTop - navbar;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });

        // Cerrar menú mobile si está abierto
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

    links.forEach((link) => {
      link.addEventListener('click', handleClickLink);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleClickLink);
      });
    };
  }, []);
}