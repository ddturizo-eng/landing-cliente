'use client';

import { useState } from 'react';
import Image from 'next/image';

interface EffectsSectionProps {
  onOpenQuoteModal: () => void;
}

interface Effect {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  vimeoId: string;
  tags: string[];
  thumbnail: string;
}

interface EffectModalProps {
  effect: Effect;
  isOpen: boolean;
  onClose: () => void;
  onQuote: () => void;
}

// Mini Modal Component - MEJORADO RESPONSIVE
function EffectModal({ effect, isOpen, onClose, onQuote }: EffectModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl lg:max-w-5xl max-h-[95vh] my-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-600/30 shadow-2xl shadow-purple-600/20 animate-slideUp flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/80 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
          aria-label="Cerrar modal"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Section - RESPONSIVE */}
        <div className="relative aspect-video bg-black w-full flex-shrink-0">
          <iframe
            src={`https://player.vimeo.com/video/${effect.vimeoId}?autoplay=1&loop=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Content Section - RESPONSIVE CON SCROLL ESTILIZADO */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          {/* Icon + Title */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className={`${effect.icon} text-xl sm:text-2xl lg:text-3xl text-white`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 leading-tight">
                {effect.name}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">Efecto especial profesional</p>
            </div>
          </div>

          {/* Description - RESPONSIVE */}
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 lg:mb-6">
            {effect.fullDesc}
          </p>

          {/* Tags - RESPONSIVE */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5 lg:mb-6">
            <span className="text-xs sm:text-sm text-gray-400 font-semibold">Ideal para:</span>
            {effect.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-purple-600/20 border border-purple-600/30 rounded-full text-xs sm:text-sm text-purple-300 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons - RESPONSIVE */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
            <button
              onClick={() => {
                onQuote();
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base text-white hover:scale-105 transition-all shadow-lg shadow-pink-600/30"
            >
              Cotizar Este Efecto
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-purple-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base text-white hover:bg-purple-600/10 transition-all"
            >
              Ver Más Efectos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EffectsSection({ onOpenQuoteModal }: EffectsSectionProps) {
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);

  const effects: Effect[] = [
    {
      id: 'fuentes-frias',
      name: 'Fuentes Frías',
      icon: 'fas fa-fire-flame-curved',
      shortDesc: 'Cascadas de chispas brillantes sin calor para momentos mágicos',
      fullDesc: 'Las fuentes frías son cascadas de chispas brillantes que no generan calor. Perfectas para bodas, quinceañeras e inauguraciones. Crean un efecto visual espectacular de hasta 3 metros de altura, ideales para la entrada de novios, el primer baile o cualquier momento especial. Completamente seguras para uso en interiores y exteriores.',
      vimeoId: '1141715261',
      tags: ['Bodas', 'XV Años', 'Inauguraciones'],
      thumbnail: '/img/efectos/fuentes-frias.jpg'
    },
    {
      id: 'niebla-baja',
      name: 'Niebla Baja',
      icon: 'fas fa-cloud',
      shortDesc: 'Efecto de nubes a ras del suelo para un ambiente cinematográfico',
      fullDesc: 'Crea la ilusión de bailar sobre las nubes con nuestro efecto de niebla baja. Esta técnica especial genera una capa densa de niebla que permanece a ras del suelo, perfecta para el primer baile de bodas o presentaciones elegantes. El efecto dura varios minutos y garantiza fotografías y videos espectaculares con un ambiente romántico y cinematográfico.',
      vimeoId: '1141715261',
      tags: ['Bodas', 'XV Años', 'Eventos Elegantes'],
      thumbnail: '/img/efectos/niebla-baja.jpg'
    },
    {
      id: 'pirotecnia-aerea',
      name: 'Pirotecnia Aérea',
      icon: 'fas fa-burst',
      shortDesc: 'Espectáculo de luces en el cielo para eventos al aire libre',
      fullDesc: 'Llena el cielo de color y emoción con nuestra pirotecnia aérea profesional. Espectáculos pirotécnicos sincronizados que iluminan la noche con cascadas de luz, destellos brillantes y efectos espectaculares. Ideal para bodas, aniversarios, fiestas empresariales y eventos públicos. Cada show está cuidadosamente coordinado para ofrecer máxima seguridad y un impacto visual inolvidable.',
      vimeoId: '1141715261',
      tags: ['Bodas', 'Eventos Corporativos', 'Celebraciones'],
      thumbnail: '/img/efectos/pirotecnia.jpg'
    },
    {
      id: 'ventury',
      name: 'Ventury',
      icon: 'fas fa-wind',
      shortDesc: 'Columnas de CO2 que disparan hasta 8 metros de altura',
      fullDesc: 'Los cañones Ventury generan impresionantes columnas de CO2 frío que disparan hasta 8 metros de altura. Perfectos para momentos de alto impacto como entradas espectaculares, drops en eventos musicales, lanzamientos de productos o cualquier momento que requiera un efecto dramático. El CO2 se disipa rápidamente sin dejar residuos, siendo completamente seguro y creando un impacto visual inolvidable.',
      vimeoId: '1141715261',
      tags: ['Eventos Corporativos', 'Conciertos', 'Inauguraciones'],
      thumbnail: '/img/efectos/ventury.jpg'
    },
    {
      id: 'revelacion-sexo',
      name: 'Revelación de Sexo',
      icon: 'fas fa-gift',
      shortDesc: 'Explosión de color para el momento más emocionante',
      fullDesc: 'Celebra uno de los momentos más esperados con una explosión espectacular de humo de color. Combinamos fuentes frías, confeti y humo de color (rosa o azul) para crear un instante mágico lleno de sorpresa y alegría. El efecto es sincronizado para máximo impacto, creando el momento perfecto para fotos y videos que durarán toda la vida. Incluye opciones de personalización según tus preferencias.',
      vimeoId: '1141715261',
      tags: ['Revelaciones', 'Baby Shower', 'Celebraciones Familiares'],
      thumbnail: '/img/efectos/revelacion.jpg'
    }
  ];

  return (
    <>
      <section id="efectos" className="section py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-[10%] w-32 h-32 sm:w-64 sm:h-64 bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-32 right-[15%] w-40 h-40 sm:w-80 sm:h-80 bg-pink-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600/20 border border-purple-600/30 rounded-full text-xs sm:text-sm text-purple-300 font-semibold">
                <i className="fas fa-sparkles mr-2"></i>
                Efectos Especiales
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              Descubre Nuestros{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Efectos Mágicos
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
              Cada efecto está diseñado para transformar tu evento en una experiencia inolvidable. 
              Haz clic en cualquier efecto para ver una demostración y conocer todos los detalles.
            </p>
          </div>

          {/* Effects Grid - RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {effects.map((effect, index) => (
              <div
                key={effect.id}
                onClick={() => setSelectedEffect(effect)}
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl sm:rounded-2xl overflow-hidden border border-purple-600/20 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail Background */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${effect.icon} text-5xl sm:text-7xl opacity-30 group-hover:scale-110 transition-transform duration-300 text-white`}></i>
                  </div>
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${effect.icon} text-lg sm:text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{effect.name}</h3>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {effect.shortDesc}
                  </p>

                  {/* Tags preview */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {effect.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 bg-purple-600/10 rounded-full text-xs text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {effect.tags.length > 2 && (
                      <span className="px-2 py-0.5 sm:py-1 bg-purple-600/10 rounded-full text-xs text-purple-300">
                        +{effect.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="w-full text-pink-500 font-semibold text-sm sm:text-base hover:text-pink-400 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    Ver Demostración
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8 sm:mt-12 px-4">
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
              ¿No estás seguro de qué efecto elegir? Contáctanos y te asesoramos
            </p>
            <button
              onClick={onOpenQuoteModal}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:scale-105 transition-all shadow-lg shadow-pink-600/30"
            >
              <i className="fas fa-comments mr-2"></i>
              Solicitar Asesoría Personalizada
            </button>
          </div>
        </div>
      </section>

      {/* Effect Modal */}
      {selectedEffect && (
        <EffectModal
          effect={selectedEffect}
          isOpen={!!selectedEffect}
          onClose={() => setSelectedEffect(null)}
          onQuote={onOpenQuoteModal}
        />
      )}
    </>
  );
}