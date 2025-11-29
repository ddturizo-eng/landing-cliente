'use client';

import { useState } from 'react';
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
    <section id="tipos-eventos" className="section py-20 px-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">Eventos que Transformamos</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cada celebración es única y merece efectos especiales diseñados específicamente para ella. 
            Descubre qué podemos crear para tu evento.
          </p>
        </div>

        {/* Grid Simple */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group bg-[#0a0a0a] rounded-2xl overflow-hidden border border-purple-600/20 hover:border-purple-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer min-h-[350px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
              </div>

              {/* Popular Badge */}
              {event.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <i className="fas fa-fire"></i>
                  Popular
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className={`fas ${event.icon} text-2xl`}></i>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold mb-3">{event.title}</h4>

                {/* Description */}
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Button */}
                <button
                  onClick={onOpenQuoteModal}
                  className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-600/50 transition-all flex items-center justify-center gap-2 ${
                    hoveredId === event.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Cotizar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            ¿No encuentras lo que buscas? Contáctanos para crear algo único
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-lg shadow-pink-600/30 inline-flex items-center gap-2"
          >
            <i className="fas fa-comments"></i>
            Solicitar Cotización Personalizada
          </button>
        </div>
      </div>
    </section>
  );
}