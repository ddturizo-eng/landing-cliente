/**
 * Hook para cursor personalizado con efecto pirotecnia
 * Versión simplificada y optimizada
 */

import { useEffect } from 'react';
import { esDesktop } from '../lib/utils';

export function useCustomCursor() {
  useEffect(() => {
    if (!esDesktop()) return;

    // Solo ocultar el cursor por defecto del sistema
    document.body.style.cursor = 'none';

    // Ocultar cursor en elementos interactivos
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"]'
    );

    interactiveElements.forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = 'auto';
      interactiveElements.forEach(el => {
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, []);
}