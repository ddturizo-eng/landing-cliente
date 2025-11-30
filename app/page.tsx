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

const BeholdWidget = dynamic(() => import('./components/BeholdWidget'), {
  loading: () => <div className="h-48 bg-gray-900 rounded-lg animate-pulse"></div>,
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

        {/* Events Section - Eventos Destacados */}
        <section id="eventos" className="section py-20 px-8 relative overflow-hidden bg-black">
          {/* Fondo con gradiente */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#1a1a1a] to-pink-900/20"></div>
            <div className="absolute top-20 left-[10%] w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-32 right-[15%] w-80 h-80 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">Eventos Destacados</h3>
              <p className="text-gray-300 max-w-2xl mx-auto drop-shadow-md">
                Conoce algunos de los momentos mágicos que hemos creado para nuestros clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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
                  className="bg-black/70 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-600/30 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/30"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={`/img/eventos/${event.img}`}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={75}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className={`fas ${event.icon} text-pink-500`}></i>
                        <span className="text-sm font-semibold">{event.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-calendar text-pink-500"></i>
                        <span className="text-sm">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2">{event.title}</h4>
                    <p className="text-gray-400 text-sm">
                      Momentos que transformamos en experiencias únicas
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section id="instagram" className="section py-20 px-8">
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

            <BeholdWidget feedId="hLmRBeMEZPCyEb1kazrU" />

            <div className="text-center mt-8">
              <a
                href="https://instagram.com/hcefectos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                <i className="fab fa-instagram text-xl"></i>
                Seguir en Instagram
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Float Button - Lazy load */}
        {showWhatsApp && (
          <a 
            href="https://wa.me/573137431884?text=Hola%20HC%20Efectos,%20quiero%20cotizar%20un%20evento"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition shadow-2xl z-50 animate-pulse"
            aria-label="Contactar por WhatsApp"
          >
            <i className="fab fa-whatsapp text-3xl text-white"></i>
          </a>
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