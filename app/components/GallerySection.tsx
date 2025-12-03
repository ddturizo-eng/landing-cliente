'use client';

import { useState, useEffect, useMemo } from 'react';

interface Video {
  id: string;
  vimeoId: string;
  title: string;
  category: string;
}

const VIDEOS: Video[] = [
  {
    id: '1',
    vimeoId: '1143146527',
    title: 'Boda Mágica',
    category: 'bodas',
  },
  {
    id: '2',
    vimeoId: '1143145449',
    title: 'Revelación de Sexo',
    category: 'humo',
  },
  {
    id: '3',
    vimeoId: '1143147056',
    title: 'Celebración de Boda',
    category: 'bodas',
  },
  {
    id: '4',
    vimeoId: '1143149115',
    title: 'Quinceañera',
    category: 'cumpleanos',
  },
  {
    id: '5',
    vimeoId: '1143146143',
    title: 'Revelación de Sexo',
    category: 'humo',
  },
  {
    id: '6',
    vimeoId: '1143147531',
    title: 'Boda Espectacular',
    category: 'bodas',
  },
  {
    id: '7',
    vimeoId: '1143150497',
    title: 'Evento Corporativo',
    category: 'corporativo',
  },
  {
    id: '8',
    vimeoId: '1143148210',
    title: 'Boda Inolvidable',
    category: 'bodas',
  },
  {
    id: '9',
    vimeoId: '1143149062',
    title: 'Revelación de Género',
    category: 'humo',
  },
  {
    id: '10',
    vimeoId: '1143148875',
    title: 'Boda de Ensueño',
    category: 'bodas',
  },
  {
    id: '11',
    vimeoId: '1143149150',
    title: 'Pirotecnia Espectacular',
    category: 'pirotecnia',
  },
  {
    id: '12',
    vimeoId: '1143151770',
    title: 'Boda Especial',
    category: 'bodas',
  },
];

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pirotecnia', label: 'Pirotecnia' },
  { id: 'humo', label: 'Revelaciones' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'corporativo', label: 'Corporativo' },
];

// Componente para cargar thumbnails de Vimeo
function VideoThumbnail({ vimeoId, title }: { vimeoId: string; title: string }) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadThumbnail = async () => {
      try {
        // Método 1: Intentar con oEmbed API (oficial de Vimeo)
        const response = await fetch(
          `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`
        );
        
        if (response.ok && isMounted) {
          const data = await response.json();
          if (data.thumbnail_url) {
            // Obtener thumbnail en alta resolución
            const highResThumbnail = data.thumbnail_url.replace(/_\d+x\d+/, '_960x540');
            setThumbnailUrl(highResThumbnail);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log('oEmbed failed, trying fallback method');
      }

      // Método 2: Fallback con vumbnail.com
      if (isMounted) {
        const fallbackUrl = `https://vumbnail.com/${vimeoId}.jpg`;
        
        // Verificar si la imagen existe
        const img = new Image();
        img.onload = () => {
          if (isMounted) {
            setThumbnailUrl(fallbackUrl);
            setIsLoading(false);
          }
        };
        img.onerror = () => {
          if (isMounted) {
            setHasError(true);
            setIsLoading(false);
          }
        };
        img.src = fallbackUrl;
      }
    };

    loadThumbnail();

    return () => {
      isMounted = false;
    };
  }, [vimeoId]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-pulse">
          <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    );
  }

  if (hasError || !thumbnailUrl) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 flex items-center justify-center">
        <div className="text-center p-4">
          <svg className="w-16 h-16 mx-auto mb-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white/70 text-sm font-medium">{title}</p>
        </div>
      </div>
    );
  }

  return (
   <img
    src={thumbnailUrl}
    alt={title}
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"  // 
    decoding="async" // 
  />
  );
}

// Modal del video
function VideoModal({ 
  isOpen, 
  onClose, 
  videoId, 
  onPrev, 
  onNext, 
  hasNext, 
  hasPrev 
}: {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext, hasNext, hasPrev]);

  // Reset loading cuando cambia el video
  useEffect(() => {
    if (isOpen && videoId) {
      setIsLoading(true);
    }
  }, [videoId, isOpen]);

  if (!isOpen) return null;

  // Construir URL optimizada según dispositivo
  const getVimeoUrl = () => {
    const baseUrl = `https://player.vimeo.com/video/${videoId}`;
    const mobileParams = 'quality=480p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    const desktopParams = 'quality=720p&autoplay=1&loop=0&autopause=0&byline=0&title=0&portrait=0';
    return `${baseUrl}?${isMobile ? mobileParams : desktopParams}`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-[9999] flex flex-col video-modal-root"
      onClick={onClose}
    >
      {/* Top Controls Bar - Compacta en móvil */}
      <div className="flex-shrink-0 flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3 md:py-4 z-20 bg-black/90">
        {/* Left: Previous button */}
        {hasPrev ? (
          <button
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-pink-600 active:bg-pink-700 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Video anterior"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12"></div>
        )}

        {/* Right: Next and Close buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {hasNext && (
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-pink-600 active:bg-pink-700 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <button
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:text-pink-500 active:text-pink-600 transition-colors bg-white/10 rounded-full"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Container - Ocupa todo el espacio disponible */}
      <div
        className="flex-1 flex items-center justify-center px-0 md:px-4 lg:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full md:max-w-5xl lg:max-w-6xl md:h-auto">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white text-sm sm:text-base">Cargando video...</p>
                {isMobile && <p className="text-gray-400 text-xs sm:text-sm mt-2">Calidad optimizada para móvil</p>}
              </div>
            </div>
          )}

          {/* Iframe - Ocupa 100% en móvil, aspect ratio en desktop */}
          <iframe
            key={videoId}
            src={videoId ? getVimeoUrl() : ''}
            className="w-full h-full md:aspect-video md:rounded-lg lg:rounded-xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />

          {/* Navigation Buttons - Solo Desktop (flotantes en los lados) */}
          {hasPrev && (
            <button
              className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Video anterior"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Siguiente video"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Info Text - Solo en desktop */}
      <div className="hidden md:block flex-shrink-0 py-3 text-center bg-black/90">
        <p className="text-white/60 text-sm">
          Usa las flechas del teclado o los botones para navegar
        </p>
      </div>
    </div>
  );
}

// Componente principal
export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const filteredVideos = useMemo(() => {
    return activeFilter === 'todos'
      ? VIDEOS
      : VIDEOS.filter((video) => video.category === activeFilter);
  }, [activeFilter]);

  const handleOpenModal = (index: number) => {
    setCurrentVideoIndex(index);
    setModalOpen(true);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev > 0 ? prev - 1 : filteredVideos.length - 1
    );
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev < filteredVideos.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <section
      id="galeria"
      className="min-h-screen bg-black text-white px-4 md:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nuestra{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Galería
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Descubre los momentos mágicos que hemos creado
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-105'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-600/20"
              onClick={() => handleOpenModal(index)}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-full">
                <VideoThumbnail vimeoId={video.vimeoId} title={video.title} />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                    <svg 
                      className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Expand Icon */}
                <button
                  className="hidden md:flex absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-pink-600 transition-all z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(index);
                  }}
                  aria-label="Ver video completo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
                <h3 className="font-semibold text-sm md:text-lg text-white">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xl text-gray-400">
              No hay videos en esta categoría
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoId={filteredVideos[currentVideoIndex]?.vimeoId}
        onPrev={handlePrevVideo}
        onNext={handleNextVideo}
        hasNext={currentVideoIndex < filteredVideos.length - 1}
        hasPrev={currentVideoIndex > 0}
      />
    </section>
  );
}