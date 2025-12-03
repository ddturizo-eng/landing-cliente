'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Componentes críticos - Carga inmediata
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

// Componentes importantes - Carga con prioridad
const EffectsSection = dynamic(() => import('./components/EffectsSection'), {
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Cargando efectos...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const AboutSectionImproved = dynamic(() => import('./components/AboutSectionImproved'), {
  loading: () => <div className="min-h-screen bg-[#1a1a1a] animate-pulse"></div>,
  ssr: true,
});

const EventTypesSection = dynamic(() => import('./components/EventTypesSection'), {
  loading: () => <div className="min-h-screen bg-[#1a1a1a] animate-pulse"></div>,
  ssr: true,
});

// Componentes secundarios - Lazy load total
const GallerySection = dynamic(() => import('./components/GallerySection'), {
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-gray-400">Cargando galería...</p>
    </div>
  ),
  ssr: false, // No renderizar en servidor
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => null,
  ssr: true,
});

// Componentes que solo se cargan cuando se necesitan
const QuoteModal = dynamic(() => import('./components/QuoteModal'), {
  loading: () => null,
  ssr: false,
});

const CustomCursor = dynamic(() => import('./components/CustomCursor'), {
  ssr: false,
});

const InstagramGrid = dynamic(() => import('./components/InstagramGrid'), {
  loading: () => (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-900 rounded-lg"></div>
      ))}
    </div>
  ),
  ssr: false,
});
// Hooks optimizados
import { useOptimizedAnimations } from './hooks/useOptimizedAnimations';

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useOptimizedAnimations();

  // Mostrar botón de WhatsApp después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (quoteModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [quoteModalOpen]);

  return (
    <>
      <CustomCursor />

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Navbar */}
        <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Hero Section */}
        <HeroSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Effects Section */}
        <EffectsSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* About Section */}
        <AboutSectionImproved />

        {/* Event Types Section */}
        <EventTypesSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Gallery Section */}
        <GallerySection />

       <section id="eventos" className="section py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-black">
  {/* Fondo con gradiente */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#1a1a1a] to-pink-900/20"></div>
    <div className="absolute top-20 left-[10%] w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute bottom-32 right-[15%] w-80 h-80 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-6 sm:mb-10 md:mb-12">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
        Eventos Destacados
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto drop-shadow-md px-4">
        Conoce algunos de los momentos mágicos que hemos creado para nuestros clientes.
      </p>
    </div>

    {/* Grid MÁS COMPACTO EN MOBILE */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {[
        { img: 'bodatop.jpg', icon: 'fa-ring', type: 'Boda', date: 'Mar 2025', title: 'Boda Elegante en Casa Campestre' },
        { img: 'XV.png', icon: 'fa-crown', type: 'XV Años', date: 'Sep 2024', title: 'Quinceaños de Ensueño' },
        { img: 'conciert.png', icon: 'fa-building', type: 'Conciertos', date: 'Ago 2024', title: 'Efectos en concierto de Antonio Eslait' },
        { img: 'Humorosa.jpg', icon: 'fa-baby-carriage', type: 'Revelación', date: 'Oct 2025', title: 'Revelación de Sexo Emocionante' },
        { img: 'lajuma.png', icon: 'fa-video', type: 'Video cancion', date: 'ene 2024', title: 'Efectos especiales de La Banda Del 5' },
        { img: 'INa-1.png', icon: 'fa-bomb', type: 'Inauguracion', date: 'Ago 2025', title: 'Inauguración Inolvidable' }
      ].map((event, index) => (
        <div 
          key={index} 
          className="bg-black/70 backdrop-blur-md rounded-lg sm:rounded-xl overflow-hidden border border-purple-600/30 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/30"
        >
          {/* Imagen MÁS PEQUEÑA EN MOBILE */}
          <div className="relative h-44 sm:h-48 md:h-56 overflow-hidden">
            <Image 
              src={`/img/eventos/${event.img}`}
              alt={event.title}
              fill
              className="object-cover hover:scale-110 transition duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              quality={75}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 sm:p-3 md:p-4 flex justify-between items-center">
              <div className="flex items-center gap-1 sm:gap-2">
                <i className={`fas ${event.icon} text-pink-500 text-xs sm:text-sm`}></i>
                <span className="text-xs sm:text-sm font-semibold">{event.type}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <i className="fas fa-calendar text-pink-500 text-xs sm:text-sm"></i>
                <span className="text-xs sm:text-sm">{event.date}</span>
              </div>
            </div>
          </div>
          
          {/* Contenido MÁS COMPACTO */}
          <div className="p-2 sm:p-3 md:p-4">
            <h4 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-1">
              {event.title}
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
              Momentos que transformamos en experiencias únicas
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        <section id="instagram" className="section py-20 px-8 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold mb-4">Síguenos en Instagram</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      <a 
                        href="https://instagram.com/hcefectos" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-400 font-semibold"
                      >
                        @hcefectos
                      </a> - Descubre más momentos mágicos en nuestras redes
                    </p>
                  </div>

                  {/* ✅ NUEVO: Grid estático en lugar de BeholdWidget */}
                  <InstagramGrid />

                  <div className="text-center mt-8">
                    <a
                      href="https://instagram.com/hcefectos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
                    >
                      <i className="fab fa-instagram text-xl"></i>
                      Ver Perfil Completo
                    </a>
                  </div>
                </div>
              </section>

        {/* Footer */}
        <Footer />
{/* Botones flotantes - Instagram y WhatsApp */}
        {showWhatsApp && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* Botón de Instagram */}
            <a 
              href="https://instagram.com/hcefectos"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl animate-bounce"
              aria-label="Síguenos en Instagram"
              style={{ animationDelay: '0.5s' }}
            >
              <svg 
                className="w-8 h-8 text-white group-hover:scale-110 transition-transform" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              
              {/* Tooltip */}
              <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                @hcefectos
              </span>
            </a>

            {/* Botón de WhatsApp */}
            <a 
              href="https://wa.me/573137431884?text=Hola%20HC%20Efectos,%20quiero%20cotizar%20un%20evento"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl animate-pulse"
              aria-label="Contactar por WhatsApp"
            >
              <i className="fab fa-whatsapp text-3xl text-white group-hover:scale-110 transition-transform"></i>
              
              {/* Tooltip */}
              <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                Cotizar evento
              </span>
            </a>
          </div>
        )}

        {/* Modal de Cotización */}
        {quoteModalOpen && (
          <QuoteModal 
            isOpen={quoteModalOpen} 
            onClose={() => setQuoteModalOpen(false)} 
          />
        )}
      </div>
    </>
  );
}