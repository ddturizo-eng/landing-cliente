'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Componentes estáticos
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

// Componentes con lazy loading (dinámicos)
const GallerySection = dynamic(() => import('./components/GallerySection'), {
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center">Cargando galería...</div>,
  ssr: true, // Renderizar en servidor para SEO
});

const QuoteModal = dynamic(() => import('./components/QuoteModal'), {
  loading: () => null, // No mostrar nada mientras carga
  ssr: false, // No necesita SSR (es un modal)
});

const CustomCursor = dynamic(() => import('./components/CustomCursor'), {
  ssr: false, // Solo en cliente
});

const BeholdWidget = dynamic(() => import('./components/BeholdWidget'), {
  loading: () => <div className="h-48 bg-gray-900 rounded-lg animate-pulse"></div>,
  ssr: false,
});

// Hooks optimizados (ahora en un solo useEffect)
import { useOptimizedAnimations } from './hooks/useOptimizedAnimations';

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Usar hook optimizado que maneja TODOS los listeners
  useOptimizedAnimations();

  // Prevenir scroll cuando modal está abierto
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
      {/* Cursor personalizado (solo en desktop, lazy loaded) */}
      <CustomCursor />

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Navbar */}
        <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Hero Section */}
        <HeroSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* About Section */}
        <section id="nosotros" className="section py-20 px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">Quiénes Somos</h3>
              <p className="text-gray-400 mb-4">
                HC Efectos es una empresa especializada en la creación de experiencias visuales únicas para todo tipo de eventos sociales y corporativos. Nos dedicamos a transformar momentos especiales en recuerdos inolvidables mediante el uso de efectos especiales profesionales.
              </p>
              <p className="text-gray-400 mb-6">
                <strong className="text-white">Nuestra misión es simple:</strong> que cada momento especial brille con la intensidad que se merece. HC Efectos es sinónimo de excelencia, creatividad y confianza.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-shield-alt text-2xl"></i>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-2">Seguridad Certificada</h5>
                    <p className="text-gray-400">
                      Todos nuestros efectos cumplen con protocolos de seguridad internacionales. Equipo certificado, permisos al día y máxima precaución en cada evento.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-palette text-2xl"></i>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-2">Personalización Total</h5>
                    <p className="text-gray-400">
                      Cada evento es único. Te asesoramos para crear el efecto perfecto según tu celebración, espacio y presupuesto. Tu visión, nuestra magia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/img/team.jpg" 
                alt="Equipo HC Efectos" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="efectos" className="section py-20 px-8 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">Efectos para tu Evento</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Cada celebración es única y merece efectos especiales diseñados específicamente para ella. Descubre qué podemos crear para tu evento.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'fa-ring', title: '💍 Bodas', desc: 'Haz de tu boda un cuento de hadas con fuentes frías, niebla baja y pirotecnia.' },
                { icon: 'fa-crown', title: '👑 XV Años', desc: 'Una noche de ensueño para la quinceañera con efectos dignos de una princesa.' },
                { icon: 'fa-baby', title: '🎉 Revelaciones de Género', desc: 'El momento más emocionante merece ser épico con explosión de humo de color.' },
                { icon: 'fa-building', title: '🏢 Eventos Corporativos', desc: 'Impacta a tus clientes con inauguraciones y lanzamientos espectaculares.' },
                { icon: 'fa-graduation-cap', title: '🎓 Eventos Institucionales', desc: 'Graduaciones y ceremonias memorables con efectos seguros y profesionales.' },
                { icon: 'fa-star', title: '✨ Eventos Personalizados', desc: 'Diseñamos paquetes a medida combinando múltiples efectos según tu visión.' }
              ].map((service, index) => (
                <div key={index} className="service-item bg-[#0a0a0a] p-6 rounded-2xl border border-purple-600/20 hover:border-purple-600 transition hover:-translate-y-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <i className={`fas ${service.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-gray-400 mb-4">{service.desc}</p>
                  <button 
                    onClick={() => setQuoteModalOpen(true)}
                    className="learn-more text-pink-500 font-semibold hover:gap-3 flex items-center gap-2 transition-all"
                  >
                    Cotizar <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section - Con lazy loading */}
        <GallerySection />

        {/* Events Section */}
        <section id="eventos" className="section py-20 px-8 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">Eventos Destacados</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Conoce algunos de los momentos mágicos que hemos creado para nuestros clientes. Cada evento es único y especial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { img: 'boda-1.jpg', icon: 'fa-ring', type: 'Boda', date: 'Oct 2024', title: 'Boda Elegante en Casa Campestre' },
                { img: 'xv-anos-1.jpg', icon: 'fa-crown', type: 'XV Años', date: 'Sep 2024', title: 'Quinceaños de Ensueño' },
                { img: 'corporativo-1.jpg', icon: 'fa-building', type: 'Corporativo', date: 'Ago 2024', title: 'Inauguración Empresarial' },
                { img: 'revelacion-1.jpg', icon: 'fa-baby-carriage', type: 'Revelación', date: 'Jul 2024', title: 'Revelación de Sexo Emocionante' },
                { img: 'aniversario-1.jpg', icon: 'fa-heart', type: 'Aniversario', date: 'Jun 2024', title: '50 Años de Amor' },
                { img: 'graduacion-1.jpg', icon: 'fa-graduation-cap', type: 'Graduación', date: 'May 2024', title: 'Graduación Universitaria' }
              ].map((event, index) => (
                <div key={index} className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-purple-600/20 hover:border-purple-600 transition hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={`/img/hc-efectos/eventos/${event.img}`}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-center">
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
                      Un evento inolvidable lleno de magia y emoción
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
                </a> - Descubre más momentos mágicos en nuestras redes sociales
              </p>
            </div>

            {/* BeholdWidget con lazy loading */}
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

        {/* WhatsApp Float Button */}
        <a 
          href="https://wa.me/573137431884?text=Hola%20HC%20Efectos,%20quiero%20cotizar%20un%20evento"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition shadow-2xl z-50 animate-pulse"
          aria-label="Contactar por WhatsApp"
        >
          <i className="fab fa-whatsapp text-3xl text-white"></i>
        </a>

        {/* Modal de Cotización - Con lazy loading */}
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