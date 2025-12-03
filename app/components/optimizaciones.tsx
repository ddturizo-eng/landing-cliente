import React, { useState, useEffect } from 'react';

// ========================================
// 1. HOOK OPTIMIZADO PARA LAZY LOADING DE IMÁGENES
// ========================================
const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

// ========================================
// 2. COMPONENTE DE IMAGEN OPTIMIZADA
// ========================================
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw"
}) => {
  const loaded = useProgressiveImage(src);
  
  return (
    <div className={`relative ${className}`}>
      {/* Placeholder mientras carga */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* Imagen real */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes={sizes}
      />
    </div>
  );
};

// ========================================
// 3. MODAL DE VIDEO OPTIMIZADO PARA MOBILE
// ========================================
interface VideoModalMobileProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const VideoModalMobile: React.FC<VideoModalMobileProps> = ({
  isOpen,
  onClose,
  videoId,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevenir zoom en iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && videoId) {
      setIsLoading(true);
    }
  }, [videoId, isOpen]);

  if (!isOpen) return null;

  // URL optimizada según dispositivo
  const getVimeoUrl = () => {
    const baseUrl = `https://player.vimeo.com/video/${videoId}`;
    
    // Parámetros optimizados para móvil - calidad más baja para carga rápida
    const mobileParams = 'quality=360p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0&muted=0';
    
    // Parámetros para desktop
    const desktopParams = 'quality=720p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    
    return `${baseUrl}?${isMobile ? mobileParams : desktopParams}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      onClick={onClose}
      style={{ touchAction: 'none' }}
    >
      {/* Botón cerrar - MÁS GRANDE EN MOBILE */}
      <button
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-white hover:text-pink-500 transition-colors z-[10000] bg-black/80 backdrop-blur-sm rounded-full border-2 border-white/20"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video Container - OCUPA TODA LA PANTALLA EN MOBILE */}
      <div
        className="relative w-full h-full md:w-[95vw] md:h-auto md:max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-sm">Cargando video...</p>
              {isMobile && <p className="text-gray-400 text-xs mt-2">Calidad optimizada para móvil</p>}
            </div>
          </div>
        )}

        {/* Aspect ratio container - SOLO EN DESKTOP */}
        <div 
          className="relative w-full h-full md:h-0 md:pb-[56.25%]"
          style={{ 
            height: isMobile ? '100vh' : undefined,
            paddingBottom: isMobile ? undefined : '56.25%'
          }}
        >
          <iframe
            key={videoId}
            src={videoId ? getVimeoUrl() : ''}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Botones de navegación - MEJORADOS PARA MOBILE */}
      {isMobile ? (
        // Móvil: Botones en la parte inferior
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-[10000]">
          {hasPrev && (
            <button
              className="w-16 h-16 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border-2 border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Video anterior"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="w-16 h-16 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:bg-pink-600 active:scale-95 transition-all shadow-2xl border-2 border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        // Desktop: Botones a los lados
        <>
          {hasPrev && (
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Video anterior"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

// ========================================
// 4. GUÍA DE IMPLEMENTACIÓN
// ========================================
const ImplementationGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🚀 Guía de Optimización Mobile
        </h1>

        {/* Sección 1: Optimizaciones de Imágenes */}
        <section className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">
            📸 1. Optimización de Imágenes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-400">✅ Implementar en next.config.js:</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Optimización adicional
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;`}
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-400">✅ Reemplazar Image de Next.js:</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
{`// EN TODOS LOS COMPONENTES, cambiar:
<Image 
  src="/img/hero_1.JPG"
  alt="Evento"
  width={256}
  height={256}
  loading="lazy"
  quality={75}
/>

// Por versiones optimizadas:
<Image 
  src="/img/hero_1.JPG"
  alt="Evento"
  width={256}
  height={256}
  loading="lazy"
  quality={60} // Reducir a 60 en mobile
  placeholder="blur"
  blurDataURL="data:image/..." // Generar blur
  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Sección 2: Lazy Loading Mejorado */}
        <section className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">
            ⚡ 2. Lazy Loading Mejorado
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-400">✅ Actualizar page.tsx:</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
{`// Componentes críticos - Carga inmediata
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

// Componentes importantes - Preload pero lazy
const AboutSection = dynamic(
  () => import('./components/AboutSectionImproved'),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
);

// Componentes secundarios - Solo cuando sean visibles
const GallerySection = dynamic(
  () => import('./components/GallerySection'),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: false // NO renderizar en servidor
  }
);

// Componentes que solo se usan al interactuar
const QuoteModal = dynamic(
  () => import('./components/QuoteModal'),
  { 
    loading: () => null,
    ssr: false 
  }
);`}
              </pre>
            </div>
          </div>
        </section>

        {/* Sección 3: VideoModal Mobile */}
        <section className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">
            📱 3. Video Modal Mobile-First
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="mb-4 text-gray-300">
                El modal de video ahora:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Ocupa toda la pantalla</strong> en mobile (100vh)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Calidad optimizada:</strong> 360p en mobile, 720p en desktop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Botones más grandes:</strong> 56px x 56px para touch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Navegación inferior</strong> en mobile (no a los lados)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Previene zoom</strong> en iOS con position: fixed</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-400">✅ Reemplazar VideoModal.tsx completo</h3>
              <p className="text-sm text-gray-400">
                Usar el componente <code>VideoModalMobile</code> de este artifact
              </p>
            </div>
          </div>
        </section>

        {/* Sección 4: CSS Optimizations */}
        <section className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">
            🎨 4. Optimizaciones CSS para Mobile
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-400">✅ Agregar a globals.css:</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
{`/* Reducir animaciones en móvil */
@media (max-width: 768px) {
  /* Eliminar animaciones costosas */
  .animate-pulse {
    animation: none !important;
  }
  
  /* Eliminar backdrop-blur (muy costoso) */
  .backdrop-blur-sm,
  .backdrop-blur-md {
    backdrop-filter: none !important;
    background-color: rgba(0, 0, 0, 0.95) !important;
  }
  
  /* Reducir transformaciones */
  .hover-scale:hover {
    transform: scale(1.02) !important;
  }
  
  /* Optimizar gradientes */
  .bg-gradient-to-r,
  .bg-gradient-to-br {
    animation: none !important;
  }
}

/* Prevenir FOUC (Flash of Unstyled Content) */
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.loaded {
  opacity: 1;
}

/* Optimizar scroll en móvil */
@media (max-width: 768px) {
  * {
    -webkit-overflow-scrolling: touch;
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Sección 5: Preload Critical Assets */}
        <section className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-pink-500">
            🏃 5. Preload Assets Críticos
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-400">✅ Actualizar layout.tsx:</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
{`<head>
  {/* Preload hero image */}
  <link
    rel="preload"
    as="image"
    href="/img/Heroback.jpg"
    imageSrcSet="/img/Heroback-640w.jpg 640w, 
                 /img/Heroback-1024w.jpg 1024w"
    imageSizes="100vw"
  />
  
  {/* Preload logo */}
  <link
    rel="preload"
    as="image"
    href="/img/logo-hc-efectos-modified.png"
  />
  
  {/* Preload Font Awesome solo iconos necesarios */}
  <link
    rel="preload"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    as="style"
  />
</head>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Checklist Final */}
        <section className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-pink-500/30">
          <h2 className="text-2xl font-bold mb-6 text-center">
            ✅ Checklist de Implementación
          </h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Comprimir todas las imágenes a WebP/AVIF</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Actualizar next.config.js con optimizaciones</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Reemplazar VideoModal.tsx con versión mobile-first</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Agregar CSS optimizations a globals.css</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Implementar lazy loading mejorado en page.tsx</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Reducir quality de Next Image a 60 en mobile</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Agregar preload de assets críticos en layout.tsx</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition">
              <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              <span>Probar en Lighthouse mobile después de cada cambio</span>
            </label>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Objetivo: Alcanzar <strong className="text-pink-500">Performance Score 90+</strong> en mobile
            </p>
            <p className="text-xs text-gray-500">
              Mejora esperada: LCP {'<'}2.5s, FCP {'<'}1.8s
            </p>
          </div>
        </section>

        {/* Demo del Modal */}
        <section className="mt-12 bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">
            👁️ Preview del Modal Optimizado
          </h2>
          
          <div className="bg-black/50 rounded-lg p-4 aspect-video flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                En mobile, el video ocupará toda la pantalla con botones grandes
              </p>
              <div className="flex gap-4 justify-center">
                <div className="w-14 h-14 bg-pink-500/20 border-2 border-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="w-14 h-14 bg-pink-500/20 border-2 border-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="w-14 h-14 bg-pink-500/20 border-2 border-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImplementationGuide;