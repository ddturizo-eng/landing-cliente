'use client';

import { useState } from 'react';
import VideoModal from './VideoModal';

interface Video {
  id: string;
  vimeoId: string;
  title: string;
  category: string;
}

const VIDEOS: Video[] = [
  {
    id: '1',
    vimeoId: '1133641559',
    title: 'Entrada Épica de Novios',
    category: 'bodas',
  },
  {
    id: '2',
    vimeoId: '1135898617',
    title: 'Primer Baile sobre Nubes',
    category: 'bodas',
  },
  {
    id: '3',
    vimeoId: '1135903066',
    title: 'Entrada de Quinceañera',
    category: 'cumpleanos',
  },
  {
    id: '4',
    vimeoId: '1133639255',
    title: '¡Es Niña! - Revelación Rosa',
    category: 'pirotecnia',
  },
  {
    id: '5',
    vimeoId: '1135903165',
    title: 'Inauguración Empresarial',
    category: 'corporativo',
  },
  {
    id: '6',
    vimeoId: '1135898738',
    title: 'Graduación Memorable',
    category: 'corporativo',
  },
];

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pirotecnia', label: 'Pirotecnia' },
  { id: 'humo', label: 'Humo' },
  { id: 'luces', label: 'Luces LED' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'corporativo', label: 'Corporativo' },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const filteredVideos =
    activeFilter === 'todos'
      ? VIDEOS
      : VIDEOS.filter((video) => video.category === activeFilter);

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
      className="section min-h-screen bg-black text-white px-8 py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Nuestra{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Galería
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Descubre los momentos mágicos que hemos creado
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn px-6 py-2 rounded-full font-medium transition ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 active'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              data-filter={filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="gallery-card group relative aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer"
              data-category={video.category}
            >
              {/* Video Thumbnail */}
              <div className="card-video-container relative w-full h-full">
                <iframe
                  src={`https://player.vimeo.com/video/${video.vimeoId}?background=1&loop=1&autopause=0&muted=1`}
                  className="w-full h-full object-cover"
                  allow="autoplay; fullscreen"
                ></iframe>

                {/* Play Button */}
                <button className="video-play-button absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <i className="fas fa-play text-2xl ml-1"></i>
                  </div>
                </button>
              </div>

              {/* Expand Button */}
              <button
                className="card-expand absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-pink-600 transition z-10"
                data-vimeo={video.vimeoId}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(index);
                }}
              >
                <i className="fas fa-expand"></i>
              </button>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-semibold text-lg">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
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