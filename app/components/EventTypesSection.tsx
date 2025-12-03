'use client';

import { useEffect, useState } from 'react';

interface EventTypesSectionProps {
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

export default function EventTypesSection({ onOpenQuoteModal }: EventTypesSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventTypes: EventType[] = [
    {
      id: 'bodas',
      icon: 'fa-ring',
      title: '💍 Bodas',
      description: 'Haz de tu boda un cuento de hadas con fuentes frías, niebla baja y pirotecnia que convertirán tu celebración en un momento mágico e inolvidable.',
      image: '/img/Heroback.jpg',
      popular: true
    },
    {
      id: 'xv-anos',
      icon: 'fa-crown',
      title: '👑 XV Años',
      description: 'Una noche de ensueño para la quinceañera con efectos especiales dignos de una princesa. Creamos momentos mágicos que recordará toda la vida.',
      image: '/img/EventsBack.jpg'
    },
    {
      id: 'revelaciones',
      icon: 'fa-gift',
      title: '🎉 Revelaciones de Género',
      description: 'El momento más emocionante merece ser épico. Explosiones de humo de color y efectos sorprendentes para revelar el gran secreto.',
      image: '/img/fuentes_frias.png',
      popular: true
    },
    {
      id: 'corporativos',
      icon: 'fa-building',
      title: '🏢 Eventos Corporativos',
      description: 'Impacta a tus clientes y colaboradores con inauguraciones y lanzamientos espectaculares que dejarán huella en tu marca.',
      image: '/img/pirotecnia1.png'
    },
    {
      id: 'institucionales',
      icon: 'fa-graduation-cap',
      title: '🎓 Eventos Institucionales',
      description: 'Graduaciones y ceremonias memorables con efectos seguros y profesionales que honran la importancia del momento.',
      image: '/img/fuentes_frias2.jpg'
    },
    {
      id: 'personalizados',
      icon: 'fa-star',
      title: '✨ Eventos Personalizados',
      description: 'Diseñamos paquetes únicos combinando múltiples efectos según tu visión. Tu imaginación es nuestro único límite.',
      image: '/img/team.jpg'
    }
  ];

  return (
    <section id="tipos-eventos" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Eventos que Transformamos
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Cada celebración es única y merece efectos especiales diseñados específicamente para ella. 
            Descubre cómo podemos hacer brillar tu evento.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {eventTypes.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onQuoteClick={onOpenQuoteModal}
              mounted={mounted}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6">
          <p className="text-gray-400 text-lg">
            ¿No encuentras lo que buscas? Contáctanos para crear algo único
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50"
          >
            <i className="fas fa-comments"></i>
            <span>Solicitar Cotización Personalizada</span>
            <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

// Event Card Component
interface EventCardProps {
  event: EventType;
  onQuoteClick: () => void;
  mounted: boolean;
}

function EventCard({ event, onQuoteClick, mounted }: EventCardProps) {
  return (
    <div
      className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2"
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden bg-gray-900">
        {mounted ? (
          <img 
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"></div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 border-2 rounded-2xl transition-all duration-300 pointer-events-none border-purple-600/20 group-hover:border-purple-600"></div>

      {/* Popular Badge */}
      {event.popular && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
          <i className="fas fa-fire"></i>
          <span>Popular</span>
        </div>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 z-10">
        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-6" style={{ backfaceVisibility: 'hidden' }}>
          <i className={`fas ${event.icon} text-2xl`}></i>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 leading-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 transition-all duration-300 opacity-70 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ backfaceVisibility: 'hidden' }}>
          {event.description}
        </p>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuoteClick();
          }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:shadow-pink-600/50"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span>Cotizar Ahora</span>
          <i className="fas fa-arrow-right text-sm"></i>
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"></div>
    </div>
  );
}