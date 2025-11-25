/**
 * Funciones auxiliares del proyecto
 */

/**
 * Formatea una fecha a formato es-CO
 * @param fecha - Date object o string de fecha
 * @returns String formateado (ej: "23 de noviembre de 2025")
 */
export function formatearFecha(fecha: string | Date): string {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Valida que un email sea válido
 * @param email - Email a validar
 * @returns boolean
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida que un teléfono sea válido (Colombia)
 * @param telefono - Número a validar
 * @returns boolean
 */
export function validarTelefono(telefono: string): boolean {
  const regex = /^(\+?57)?(\d{10}|\d{7})$/;
  return regex.test(telefono.replace(/\s/g, ''));
}

/**
 * Codifica un mensaje para URL de WhatsApp
 * @param mensaje - Mensaje a codificar
 * @returns String codificado
 */
export function codificarMensajeWhatsapp(mensaje: string): string {
  return encodeURIComponent(mensaje);
}

/**
 * Genera URL de WhatsApp con mensaje
 * @param numeroWhatsapp - Número sin + ni espacios
 * @param mensaje - Mensaje a enviar
 * @returns URL completa para abrir WhatsApp
 */
export function generarURLWhatsapp(numeroWhatsapp: string, mensaje: string): string {
  const mensajeCodificado = codificarMensajeWhatsapp(mensaje);
  return `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;
}

/**
 * Detecta si estamos en dispositivo móvil/tablet
 * @returns boolean
 */
export function esDispositivoMobil(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

/**
 * Detecta si estamos en desktop
 * @returns boolean
 */
export function esDesktop(): boolean {
  if (typeof window === 'undefined') return true;
  return window.innerWidth > 768;
}

/**
 * Debounce para funciones
 * @param func - Función a ejecutar
 * @param wait - Milisegundos de espera
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle para funciones
 * @param func - Función a ejecutar
 * @param limit - Milisegundos mínimos entre ejecuciones
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Calcula el offset de un elemento respecto al scroll
 * @param elemento - HTMLElement
 * @returns número de píxeles desde el top
 */
export function calcularOffset(elemento: HTMLElement): number {
  return elemento.offsetTop;
}

/**
 * Scroll suave hacia un elemento
 * @param elemento - HTMLElement o selector
 * @param offset - Offset adicional en píxeles
 */
export function scrollAElemento(
  elemento: HTMLElement | string,
  offset: number = 0
): void {
  const el =
    typeof elemento === 'string'
      ? document.querySelector(elemento)
      : elemento;

  if (!el || !(el instanceof HTMLElement)) return;

  const offsetTop = el.offsetTop - offset;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  });
}