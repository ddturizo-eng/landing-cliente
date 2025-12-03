'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ✅ Componentes críticos - carga inmediata
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

// ✅ Componentes importantes - SSR habilitado
const EffectsSection = dynamic(() => import('./components/EffectsSection'), { ssr: true });
const AboutSectionImproved = dynamic(() => import('./components/AboutSectionImproved'), { ssr: true });
const EventTypesSection = dynamic(() => import('./components/EventTypesSection'), { ssr: true });

// ✅ Componentes secundarios - lazy load SIN SSR
const GallerySection = dynamic(() => import('./components/GallerySection'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });
const QuoteModal = dynamic(() => import('./components/QuoteModal'), { ssr: false });
const InstagramGrid = dynamic(() => import('./components/InstagramGrid'), { ssr: false });

// ⚡ CRÍTICO: CustomCursor SOLO en desktop
const CustomCursor = dynamic(() => import('./components/CustomCursor'), { 
  ssr: false,
  loading: () => null 
});

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // ✅ Detectar desktop una sola vez
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  // ✅ WhatsApp button con delay
  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Body scroll lock
  useEffect(() => {
    document.body.classList.toggle('no-scroll', quoteModalOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [quoteModalOpen]);

  return (
    <>
      {/* ⚡ Custom Cursor SOLO en desktop */}
      {isDesktop && <CustomCursor />}

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />
        <HeroSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
        <EffectsSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
        <AboutSectionImproved />
        <EventTypesSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
        <GallerySection />

        {/* Eventos Destacados - OPTIMIZADO */}
        <section id="eventos" className="section py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#1a1a1a] to-pink-900/20"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-6 sm:mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
                Eventos Destacados
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
                Conoce algunos de los momentos mágicos que hemos creado
              </p>
            </div>

            {/* Grid de eventos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                { img: 'bodatop.jpg', icon: '💍', type: 'Boda', date: 'Mar 2025', title: 'Boda Elegante en Casa Campestre' },
                { img: 'XV.png', icon: '👑', type: 'XV Años', date: 'Sep 2024', title: 'Quinceaños de Ensueño' },
                { img: 'conciert.png', icon: '🎤', type: 'Conciertos', date: 'Ago 2024', title: 'Efectos en concierto de Antonio Eslait' },
                { img: 'Humorosa.jpg', icon: '🎈', type: 'Revelación', date: 'Oct 2025', title: 'Revelación de Sexo Emocionante' },
                { img: 'lajuma.png', icon: '🎬', type: 'Video cancion', date: 'Ene 2024', title: 'Efectos especiales de La Banda Del 5' },
                { img: 'INa-1.png', icon: '🎊', type: 'Inauguracion', date: 'Ago 2025', title: 'Inauguración Inolvidable' }
              ].map((event, index) => (
                <div 
                  key={index} 
                  className="bg-black/70 backdrop-blur-md rounded-lg sm:rounded-xl overflow-hidden border border-purple-600/30 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-44 sm:h-48 md:h-56 overflow-hidden">
                    <img 
                      src={`/img/eventos/${event.img}`}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 sm:p-3 md:p-4 flex justify-between items-center">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm">{event.icon}</span>
                        <span className="text-xs sm:text-sm font-semibold">{event.type}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm">📅 {event.date}</span>
                      </div>
                    </div>
                  </div>
                  
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

        {/* Instagram Section */}
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
                </a> - Descubre más momentos mágicos
              </p>
            </div>

            <InstagramGrid />

            <div className="text-center mt-8">
              <a
                href="https://instagram.com/hcefectos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                📷 Ver Perfil Completo
              </a>
            </div>
          </div>
        </section>

        <Footer />

        {/* Botones flotantes - CON EMOJIS en lugar de Font Awesome */}
        {showWhatsApp && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* Instagram */}
            <a 
              href="https://instagram.com/hcefectos"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl"
              aria-label="Síguenos en Instagram"
            >
              <span className="text-3xl">📷</span>
              <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                @hcefectos
              </span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/573137431884?text=Hola%20HC%20Efectos"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl"
              aria-label="Contactar por WhatsApp"
            >
              <span className="text-3xl">💬</span>
              <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                Cotizar evento
              </span>
            </a>
          </div>
        )}

        {/* Quote Modal */}
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