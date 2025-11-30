'use client';

import { useState } from 'react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  link: string;
  type: 'image' | 'video' | 'carousel';
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: '1',
    image: '/img/instagram/post1.png',
    caption: 'Revelacion de sexo espectacular✨',
    link: 'https://www.instagram.com/reel/CyUWJqgOv5s/',
    type: 'video',
  },
  {
    id: '2',
    image: '/img/instagram/post2.png',
    caption: 'Revelación de género con humo rosa 💕',
    link: 'https://www.instagram.com/reel/DQf3z3HDK-_/',
    type: 'video',
  },
  {
    id: '3',
    image: '/img/instagram/post3.png',
    caption: 'XV Años mágicos con pirotecnia 🎆',
    link: 'https://www.instagram.com/reel/DP-DI_uEeqO/',
    type: 'video',
  },
  {
    id: '4',
    image: '/img/instagram/post4.png',
    caption: 'Primer baile sobre nubes ☁️',
    link: 'https://www.instagram.com/reel/DLOQh-dx1oD/',
    type: 'video',
  },
  {
    id: '5',
    image: '/img/instagram/post5.png',
    caption: 'Inauguración empresarial impactante 🏢',
    link: 'https://www.instagram.com/reel/DERNaaDxKQo/',
    type: 'video',
  },
  {
    id: '6',
    image: '/img/instagram/post6.png',
    caption: 'Efectos especiales para conciertos 🎸',
    link: 'https://www.instagram.com/reel/C-i9q4uu2l2/',
    type: 'video',
  },
  {
    id: '7',
    image: '/img/instagram/post7.png',
    caption: 'Bodas de ensueño ✨💍',
    link: 'https://www.instagram.com/reel/C9lgrC8uxwr/',
    type: 'video',
  },
  {
    id: '8',
    image: '/img/instagram/post8.png',
    caption: 'Momentos únicos e irrepetibles 🎉',
    link: 'https://www.instagram.com/reel/C7IJqV2OYAp/',
    type: 'video',
  },
  {
    id: '9',
    image: '/img/instagram/post9.png',
    caption: 'Magia en cada evento 🪄',
    link: 'https://www.instagram.com/p/CyCTEDFsFlL/',
    type: 'video',
  },
];

export default function InstagramGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {INSTAGRAM_POSTS.map((post) => (
        <a
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square group overflow-hidden rounded-lg bg-gray-900"
          onMouseEnter={() => setHoveredId(post.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Imagen del post */}
          <img
            src={post.image}
            alt={post.caption}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay oscuro en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />

          {/* Icono de tipo de contenido */}
          {post.type === 'video' && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Caption en hover - SOLO CSS, sin JavaScript condicional */}
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="text-white font-semibold text-sm md:text-base line-clamp-3">
              {post.caption}
            </p>
          </div>

          {/* Icono de Instagram en hover - SOLO CSS */}
          <div className="absolute bottom-3 right-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}