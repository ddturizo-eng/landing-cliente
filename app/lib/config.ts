/**
 * Configuración Global del Proyecto HC Efectos
 * Estructura modular y mantenible
 */

// ============================================================================
// NEXT.JS IMAGE CONFIG
// ============================================================================

/** @type {import('next').NextConfig} */
export const nextImageConfig = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'vumbnail.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'i.vimeocdn.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'player.vimeo.com',
      pathname: '/**',
    },
  ],
  qualities: [75, 85],
  formats: ['image/avif', 'image/webp'],
} as const;

// ============================================================================
// CONFIGURACIÓN DE APLICACIÓN
// ============================================================================

export const CONFIG = {
  navbarHeight: 80,
  animationDuration: 800,
  scrollOffset: 100,
  whatsappNumber: '573137431884',
} as const;

// Alias para compatibilidad futura
export const APP_CONFIG = CONFIG;

// ============================================================================
// RESPONSIVE DESIGN
// ============================================================================

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

// ============================================================================
// CONTENIDO DEL NEGOCIO
// ============================================================================

export const EFECTOS_ESPECIALES = [
  'Pirotecnia aerea',
  'Humo',
  'Revelaciones de Sexo',
  'Proyecciones',
  'Fuentes frias',
  'Máquina de Humo',
  'Niebla Baja',
] as const;

export const TIPOS_EVENTOS = [
  'Boda',
  'Cumpleaños',
  'Corporativo',
  'Inauguraciónes',
  'Fiesta Privada',
  'Evento Social',
  'Otro',
] as const;

// ============================================================================
// TIPOS DERIVADOS (Type-safe)
// ============================================================================

export type EfectosEspeciales = typeof EFECTOS_ESPECIALES[number];
export type TiposEventos = typeof TIPOS_EVENTOS[number];