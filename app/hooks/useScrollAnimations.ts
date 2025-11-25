/**
 * Hook para animaciones de scroll
 * Reemplaza: handleNavbarScroll() + updateActiveNavItem()
 */

import { useEffect } from 'react';
import { CONFIG } from '../lib/config';

export function useScrollAnimations() {
  useEffect(() => {
    const navigation = document.querySelector('.navigation') as HTMLElement;
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Agregar clase scrolled a navbar
      if (scrollTop > CONFIG.scrollOffset) {
        navigation?.classList.add('scrolled');
      } else {
        navigation?.classList.remove('scrolled');
      }

      // Actualizar menú activo
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}