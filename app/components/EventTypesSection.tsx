'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EventTypesSimpleProps {
  onOpenQuoteModal: () => void;
}

interface EventType {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  popular?: boolean;
}

export default function EventTypesSimple({ onOpenQuoteModal }: EventTypesSimpleProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const eventTypes: EventType[] = [
    {
      id: 'bodas',
      icon: 'fa-ring',
      title: '💍 Bodas',
      description: 'Haz de tu boda un cuento de hadas con fuentes frías, niebla baja y pirotecnia.',
      image: '/img/Heroback.jpg',
      popular: true
    },
    {
      id: 'xv-anos',
      icon: 'fa-crown',
      title: '👑 XV Años',
      description: 'Una noche de ensueño para la quinceañera con efectos dignos de una princesa.',
      image: '/img/eventos/xv.jpg'
    },
    {
      id: 'revelaciones',
      icon: 'fa-gift',
      title: '🎉 Revelaciones de Género',
      description: 'El momento más emocionante merece ser épico con explosión de humo de color.',
      image: '/img/eventos/revelacion.jpg',
      popular: true
    },
    {
      id: 'corporativos',
      icon: 'fa-building',
      title: '🏢 Eventos Corporativos',
      description: 'Impacta a tus clientes con inauguraciones y lanzamientos espectaculares.',
      image: '/img/eventos/corporativo.jpg'
    },
    {
      id: 'institucionales',
      icon: 'fa-graduation-cap',
      title: '🎓 Eventos Institucionales',
      description: 'Graduaciones y ceremonias memorables con efectos seguros y profesionales.',
      image: '/img/eventos/institucional.jpg'
    },
    {
      id: 'personalizados',
      icon: 'fa-star',
      title: '✨ Eventos Personalizados',
      description: 'Diseñamos paquetes a medida combinando múltiples efectos según tu visión.',
      image: '/img/eventos/personalizado.jpg'
    }
  ];

  return (
    <section id="tipos-eventos" className="section py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Eventos que Transformamos</h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Cada celebración es única y merece efectos especiales diseñados específicamente para ella. 
            Descubre qué podemos crear para tu evento.
          </p>
        </div>

        {/* Grid Simple - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group bg-[#0a0a0a] rounded-xl sm:rounded-2xl overflow-hidden border border-purple-600/20 hover:border-purple-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer min-h-[280px] sm:min-h-[320px] md:min-h-[350px]"
            >
              {/* Background Image - SIN ERROR DE HIDRATACIÓN */}
              <div className="absolute inset-0">
                {isMounted && (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    priority={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
              </div>

              {/* Popular Badge */}
              {event.popular && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <i className="fas fa-fire text-xs"></i>
                  <span className="hidden sm:inline">Popular</span>
                  <span className="sm:hidden">🔥</span>
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 md:p-6">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <i className={`fas ${event.icon} text-lg sm:text-xl md:text-2xl`}></i>
                </div>

                {/* Title */}
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight">{event.title}</h4>

                {/* Description */}
                <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {event.description}
                </p>

                {/* Button - Siempre visible en móvil, hover en desktop */}
                <button
                  onClick={onOpenQuoteModal}
                  className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-600/50 transition-all flex items-center justify-center gap-2 ${
                    hoveredId === event.id ? 'sm:opacity-100' : 'opacity-100 sm:opacity-0'
                  }`}
                >
                  Cotizar
                  <i className="fas fa-arrow-right text-xs sm:text-sm"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 px-4">
            ¿No encuentras lo que buscas? Contáctanos para crear algo único
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:scale-105 transition-all shadow-lg shadow-pink-600/30 inline-flex items-center gap-2"
          >
            <i className="fas fa-comments"></i>
            <span className="hidden sm:inline">Solicitar Cotización Personalizada</span>
            <span className="sm:hidden">Cotización Personalizada</span>
          </button>
        </div>
      </div>
    </section>
  );
}