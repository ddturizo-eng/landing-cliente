/**
 * Configuración global del proyecto HC Efectos
 * Reemplaza la constante CONFIG del JavaScript vanilla
 */

export const CONFIG = {
  // Altura de la barra de navegación en píxeles
  navbarHeight: 80,
  
  // Duración de animaciones en milisegundos
  animationDuration: 800,
  
  // Offset para detectar scroll en píxeles
  scrollOffset: 100,
  
  // Número de WhatsApp para cotizaciones (sin + ni espacios)
  whatsappNumber: '573137431884',
} as const;

/**
 * Breakpoints para responsive design
 */
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

/**
 * Efectos especiales disponibles
 */
export const EFECTOS_ESPECIALES = [
  'Pirotecnia aerea',
  'Humo',
  'Revelaciones de Sexo',
  'Proyecciones',
  'Fuentes frias',
  'Máquina de Humo',
  'Niebla Baja',
] as const;

/**
 * Tipos de eventos
 */
export const TIPOS_EVENTOS = [
  'Boda',
  'Cumpleaños',
  'Corporativo',
  'Inauguraciónes',
  'Fiesta Privada',
  'Evento Social',
  'Otro',
] as const;