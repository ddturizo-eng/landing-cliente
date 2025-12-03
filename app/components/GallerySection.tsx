'use client';

import { useState } from 'react';
import VideoModal from './VideoModal';

const VIDEOS = [
  {
    id: '1',
    vimeoId: '1133641559',
    title: 'Entrada Épica de Novios',
    category: 'bodas',
    thumbnail: 'https://vumbnail.com/1133641559.jpg',
  },
  {
    id: '2',
    vimeoId: '1135898617',
    title: 'Primer Baile sobre Nubes',
    category: 'bodas',
    thumbnail: 'https://vumbnail.com/1135898617.jpg',
  },
  {
    id: '3',
    vimeoId: '1135903066',
    title: 'Entrada de Quinceañera',
    category: 'cumpleanos',
    thumbnail: 'https://vumbnail.com/1135903066.jpg',
  },
  {
    id: '4',
    vimeoId: '1133639255',
    title: '¡Es Niña! - Revelación Rosa',
    category: 'pirotecnia',
    thumbnail: 'https://vumbnail.com/1133639255.jpg',
  },
  {
    id: '5',
    vimeoId: '1135903165',
    title: 'Inauguración Empresarial',
    category: 'corporativo',
    thumbnail: 'https://vumbnail.com/1135903165.jpg',
  },
  {
    id: '6',
    vimeoId: '1135898738',
    title: 'Graduación Memorable',
    category: 'corporativo',
    thumbnail: 'https://vumbnail.com/1135898738.jpg',
  },
  {
    id: '7',
    vimeoId: '1135898738',
    title: 'Humo de Colores para Eventos',
    category: 'humo',
    thumbnail: 'https://vumbnail.com/1135898738.jpg',
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

  const filteredVideos = activeFilter === 'todos'
    ? VIDEOS
    : VIDEOS.filter((video) => video.category === activeFilter);

  const openModal = (index: number) => {
    setCurrentVideoIndex(index);
    setModalOpen(true);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : filteredVideos.length - 1));
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev < filteredVideos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="galeria" className="min-h-screen bg-black text-white px-4 md:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Nuestra <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Galería</span>
          </h2>
          <p className="text-xl text-gray-400">Descubre los momentos mágicos que hemos creado</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-105'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid - SIMPLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => openModal(index)}
              className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* Thumbnail - DIRECTO */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="font-semibold text-lg">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No hay videos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoId={filteredVideos[currentVideoIndex]?.vimeoId}
        onPrev={handlePrev}
        onNext={handleNext}
        hasNext={currentVideoIndex < filteredVideos.length - 1}
        hasPrev={currentVideoIndex > 0}
      />
    </section>
  );
}