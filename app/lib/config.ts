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
// CONTENIDO DEL NEGOCIO - EFECTOS ESPECIALES
// ============================================================================

// Efectos principales que ofrece el negocio (solo estos 5)
export const EFECTOS_ESPECIALES = [
  'Fuentes Frías',
  'Niebla Baja',
  'Pirotecnia Aérea',
  'Ventury (CO2)',
  'Revelación de Sexo',
] as const;

// Efectos que permiten selección de cantidad
export const EFECTOS_CON_CANTIDAD = [
  'Fuentes Frías',
  'Pirotecnia Aérea',
  'Ventury (CO2)',
] as const;

export const TIPOS_EVENTOS = [
  'Boda',
  'XV Años',
  'Cumpleaños',
  'Revelación de Género',
  'Evento Corporativo',
  'Evento Institucional',
  'Inauguraciones',
  'Concierto',
  'Baby Shower',
  'Fiesta Privada',
  'Evento Social',
  'Evento Personalizado',
  'Otro',
] as const;

// Mapeo de efectos predilectos por tipo de evento
export const EFECTOS_POR_EVENTO: Record<string, string[]> = {
  'bodas': ['Fuentes Frías', 'Niebla Baja', 'Pirotecnia Aérea'],
  'xv-anos': ['Fuentes Frías', 'Niebla Baja', 'Pirotecnia Aérea'],
  'revelaciones': ['Revelación de Sexo', 'Pirotecnia Aérea'],
  'corporativos': ['Pirotecnia Aérea', 'Ventury (CO2)', 'Fuentes Frías'],
  'institucionales': ['Fuentes Frías', 'Pirotecnia Aérea'],
  'personalizados': []
};

// Mapeo de nombres legibles de eventos
export const NOMBRES_EVENTOS: Record<string, string> = {
  'bodas': 'Boda',
  'xv-anos': 'XV Años',
  'revelaciones': 'Revelación de Género',
  'corporativos': 'Evento Corporativo',
  'institucionales': 'Evento Institucional',
  'personalizados': 'Evento Personalizado'
};

// Helper para verificar si un efecto permite cantidad
export const permiteCantidad = (efecto: string): boolean => {
  return EFECTOS_CON_CANTIDAD.includes(efecto as any);
};

// ============================================================================
// TIPOS DERIVADOS (Type-safe)
// ============================================================================

export type EfectosEspeciales = typeof EFECTOS_ESPECIALES[number];
export type TiposEventos = typeof TIPOS_EVENTOS[number];
export type EfectosConCantidad = typeof EFECTOS_CON_CANTIDAD[number];