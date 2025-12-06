'use client';

import { useState } from 'react';
import Image from 'next/image';

interface EventTypesSimpleProps {
  onOpenQuoteModal: (eventType?: string) => void;
}

interface EventType {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  popular?: boolean;
  efectosPredilectos?: string[];
}

export default function EventTypesSimple({ onOpenQuoteModal }: EventTypesSimpleProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const eventTypes: EventType[] = [
    {
      id: 'bodas',
      icon: 'fa-ring',
      title: '💍 Bodas',
      description: 'Haz de tu boda un cuento de hadas con fuentes frías, niebla baja y pirotecnia.',
      image: '/img/Heroback.jpg',
      popular: true,
      efectosPredilectos: ['Fuentes Frías', 'Niebla Baja', 'Pirotecnia']
    },
    {
      id: 'xv-anos',
      icon: 'fa-crown',
      title: '👑 XV Años',
      description: 'Una noche de ensueño para la quinceañera con efectos dignos de una princesa.',
      image: '/img/fondos/XV1.png',
      efectosPredilectos: ['Fuentes Frías', 'Luces LED', 'Máquina de Humo', 'Pirotecnia']
    },
    {
      id: 'revelaciones',
      icon: 'fa-gift',
      title: '🎉 Revelaciones de Género',
      description: 'El momento más emocionante merece ser épico con explosión de humo de color.',
      image: '/img/fondos/REV.jpg',
      popular: true,
      efectosPredilectos: ['Humo de Color', 'Confeti', 'Pirotecnia']
    },
    {
      id: 'corporativos',
      icon: 'fa-building',
      title: '🏢 Eventos Corporativos',
      description: 'Impacta a tus clientes con inauguraciones y lanzamientos espectaculares.',
      image: '/img/EventsBack.jpg',
      efectosPredilectos: ['Pirotecnia', 'Luces LED', 'Máquina de Humo', 'Lanzador de Confeti']
    },
    {
      id: 'institucionales',
      icon: 'fa-graduation-cap',
      title: '🎓 Eventos Institucionales',
      description: 'Graduaciones y ceremonias memorables con efectos seguros y profesionales.',
      image: '/img/fondos/ins.png',
      efectosPredilectos: ['Lanzador de Confeti', 'Fuentes Frías', 'Luces LED']
    },
    {
      id: 'personalizados',
      icon: 'fa-star',
      title: '✨ Eventos Personalizados',
      description: 'Diseñamos paquetes a medida combinando múltiples efectos según tu visión.',
      image: '/img/fondos/person.jpg',
      efectosPredilectos: []
    }
  ];

  return (
    <section id="tipos-eventos" className="section py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Eventos que Transformamos</h3>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Cada celebración es única y merece efectos especiales diseñados específicamente para ella.
          </p>
        </div>

        {/* Grid Simple - MÁS COMPACTO EN MOBILE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group bg-[#0a0a0a] rounded-lg sm:rounded-xl overflow-hidden border border-purple-600/20 hover:border-purple-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer min-h-[240px] sm:min-h-[280px] md:min-h-[350px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
              </div>

              {/* Popular Badge */}
              {event.popular && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <i className="fas fa-fire text-xs"></i>
                  <span className="hidden sm:inline">Popular</span>
                </div>
              )}

              {/* Content - MÁS COMPACTO */}
              <div className="relative h-full flex flex-col justify-end p-3 sm:p-4 md:p-6">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  <i className={`fas ${event.icon} text-sm sm:text-base md:text-2xl`}></i>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 leading-tight">{event.title}</h4>

                {/* Description - LINE-CLAMP EN MOBILE */}
                <p className="text-gray-400 mb-2 sm:mb-3 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                {/* Button - SIEMPRE VISIBLE EN MOBILE */}
                <button
                  onClick={() => onOpenQuoteModal(event.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-pink-600/50 transition-all flex items-center justify-center gap-2"
                >
                  Cotizar
                  <i className="fas fa-arrow-right text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-4">
            ¿No encuentras lo que buscas? Contáctanos para crear algo único
          </p>
          <button
            onClick={() => onOpenQuoteModal()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm md:text-lg hover:scale-105 transition-all shadow-lg shadow-pink-600/30 inline-flex items-center gap-2"
          >
            <i className="fas fa-comments text-sm sm:text-base"></i>
            <span>Cotización Personalizada</span>
          </button>
        </div>
      </div>
    </section>
  );
}