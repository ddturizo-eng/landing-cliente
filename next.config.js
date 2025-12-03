/** @type {import('next').NextConfig} */
const nextConfig = {
  // ========================================
  // 1. OPTIMIZACIÓN DE IMÁGENES
  // ========================================
  images: {
    // Formatos modernos (WebP y AVIF)
    formats: ['image/avif', 'image/webp'],
    
    // Tamaños de dispositivos optimizados
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    
    // Tamaños de imágenes para diferentes usos
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache de imágenes (1 hora)
    minimumCacheTTL: 3600,
    
    // Permitir optimización de imágenes externas si las usas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com',
      },
    ],
    
    // Deshabilitar optimización de imágenes estáticas en dev
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // ========================================
  // 2. COMPILADOR OPTIMIZADO
  // ========================================
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Optimizar emotion/styled-components si los usas
    styledComponents: false,
    emotion: false,
  },

  // ========================================
  // 3. CONFIGURACIÓN DE BUILD
  // ========================================
  
  // Generar standalone build para mejor performance
  output: 'standalone',
  
  // ========================================
  // 4. HEADERS PARA PERFORMANCE
  // ========================================
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  // ========================================
  // 5. EXPERIMENTAL FEATURES
  // ========================================
  experimental: {
    // Optimizar carga de CSS
    optimizeCss: true,
    
    // Optimizar paquetes externos
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
    ],
    
    // Mejorar lazy loading
    optimisticClientCache: true,
  },

  // ========================================
  // 6. TURBOPACK CONFIGURATION (Next.js 16 default)
  // ========================================
  turbopack: {},

  // ========================================
  // 7. POWEREDBY HEADER
  // ========================================
  poweredByHeader: false,

  // ========================================
  // 8. REACT STRICT MODE
  // ========================================
  reactStrictMode: true,

  // ========================================
  // 9. COMPRESS RESPONSES
  // ========================================
  compress: true,

  // ========================================
  // 10. TYPESCRIPT (si usas TS)
  // ========================================
  typescript: {
    // !! WARN !!
    // Peligroso: permite build aunque haya errores
    // Desactivar en producción si es posible
    ignoreBuildErrors: false,
  },

  // ========================================
  // 11. GENERACIÓN DE SOURCE MAPS
  // ========================================
  productionBrowserSourceMaps: false, // Desactivar en producción

  // ========================================
  // 12. REDIRECCIONES (opcional)
  // ========================================
  async redirects() {
    return [
      // Ejemplo: redirect www a no-www
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'www.hcefectos.com',
      //     },
      //   ],
      //   destination: 'https://hcefectos.com/:path*',
      //   permanent: true,
      // },
    ];
  },

  // ========================================
  // 13. REWRITES (opcional)
  // ========================================
  async rewrites() {
    return [
      // Ejemplo: proxy a API externa
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.external.com/:path*',
      // },
    ];
  },
};

module.exports = nextConfig;