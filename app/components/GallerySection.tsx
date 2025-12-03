'use client';

import { useState, useMemo } from 'react';
import VideoModal from './VideoModal';

interface Video {
  id: string;
  vimeoId: string;
  title: string;
  category: string;
  thumbnail: string;
}

const VIDEOS: Video[] = [
  {
    id: '1',
    vimeoId: '1133641559',
    title: 'Entrada Épica de Novios',
    category: 'bodas',
    thumbnail: `https://vumbnail.com/1133641559.jpg`,
  },
  {
    id: '2',
    vimeoId: '1135898617',
    title: 'Primer Baile sobre Nubes',
    category: 'bodas',
    thumbnail: `https://vumbnail.com/1135898617.jpg`,
  },
  {
    id: '3',
    vimeoId: '1135903066',
    title: 'Entrada de Quinceañera',
    category: 'cumpleanos',
    thumbnail: `https://vumbnail.com/1135903066.jpg`,
  },
  {
    id: '4',
    vimeoId: '1133639255',
    title: '¡Es Niña! - Revelación Rosa',
    category: 'pirotecnia',
    thumbnail: `https://vumbnail.com/1133639255.jpg`,
  },
  {
    id: '5',
    vimeoId: '1135903165',
    title: 'Inauguración Empresarial',
    category: 'corporativo',
    thumbnail: `https://vumbnail.com/1135903165.jpg`,
  },
  {
    id: '6',
    vimeoId: '1135898738',
    title: 'Graduación Memorable',
    category: 'corporativo',
    thumbnail: `https://vumbnail.com/1135898738.jpg`,
  },
  {
    id: '7',
    vimeoId: '1135898738',
    title: 'Humo de Colores para Eventos',
    category: 'humo',
    thumbnail: `https://vumbnail.com/1135898738.jpg`,
  },
];

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pirotecnia', label: 'Pirotecnia' },
  { id: 'humo', label: 'Humo' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'corporativo', label: 'Corporativo' },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Memoizar videos filtrados para evitar recalcular
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
      className="section min-h-screen bg-black text-white px-4 md:px-8 py-20"
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
              className={`filter-btn px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
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
              className="gallery-card group relative aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-600/20"
              onClick={() => handleOpenModal(index)}
            >
              {/* Thumbnail Image con loading lazy nativo */}
              <div className="relative w-full h-full">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

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

                {/* Expand Icon - Solo desktop */}
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