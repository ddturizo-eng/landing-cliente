/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes
  images: {
    // Formatos optimizados automáticos
    formats: ['image/avif', 'image/webp'],
    
    // Reemplazar domains por remotePatterns (Next.js 16+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tudominio.com', // Reemplaza con tu dominio
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com', // Si usas Cloudinary
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net', // Si usas Imgix
        port: '',
      },
    ],
    
    // Tamaños responsivos predefinidos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache de imágenes optimizadas (1 año)
    minimumCacheTTL: 31536000,
  },

  // Compresión y optimización
  compress: true,

  // Generar static HTML cuando sea posible
  staticPageGenerationTimeout: 120,

  // Turbopack config (Next.js 16 por defecto)
  turbopack: {
    resolveAlias: {
      '@': './app',
    },
  },

  // Experimental features para mejor performance
  experimental: {
    // Optimización de paquetes
    optimizePackageImports: [
      'lucide-react',
    ],
  },

  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache de recursos estáticos
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache de imágenes
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      // Cache de fuentes
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrites para URLs limpias
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite de sitemap
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
      ],
    };
  },

  // Redirects (si necesitas cambiar URLs en el futuro)
  async redirects() {
    return [
      // Ejemplo: redirección de galería antigua
      // {
      //   source: '/videos-viejos',
      //   destination: '/galeria',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;