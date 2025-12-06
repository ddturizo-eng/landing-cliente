'use client';

import { useState } from 'react';
import AdvisoryModal from './AdvisoryModal';

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
}

interface EffectModalProps {
  effect: Effect;
  isOpen: boolean;
  onClose: () => void;
  onQuote: () => void;
}

// Mini Modal Component - COMPACTO EN MOBILE
function EffectModal({ effect, isOpen, onClose, onQuote }: EffectModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[95vh] my-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl sm:rounded-2xl overflow-hidden border border-purple-600/30 shadow-2xl flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 bg-black/80 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
          aria-label="Cerrar modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Section */}
        <div className="relative aspect-video bg-black w-full flex-shrink-0">
          <iframe
            src={`https://player.vimeo.com/video/${effect.vimeoId}?autoplay=1&loop=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          {/* Icon + Title */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className={`${effect.icon} text-lg sm:text-xl text-white`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                {effect.name}
              </h3>
              <p className="text-gray-400 text-xs">Efecto especial profesional</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
            {effect.fullDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <span className="text-xs text-gray-400 font-semibold">Ideal para:</span>
            {effect.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 sm:py-1 bg-purple-600/20 border border-purple-600/30 rounded-full text-xs text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                onQuote();
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 sm:py-2.5 rounded-full font-semibold text-sm text-white hover:scale-105 transition-all"
            >
              Cotizar Este Efecto
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-purple-600 px-4 py-2 sm:py-2.5 rounded-full font-semibold text-sm text-white hover:bg-purple-600/10 transition-all"
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
  const [advisoryModalOpen, setAdvisoryModalOpen] = useState(false);

  const effects: Effect[] = [
    {
      id: 'fuentes-frias',
      name: 'Fuentes Frías',
      icon: 'fas fa-fire-flame-curved',
      shortDesc: 'Cascadas de chispas brillantes sin calor para momentos mágicos',
      fullDesc: 'Las fuentes frías son cascadas de chispas brillantes que no generan calor. Perfectas para bodas, quinceañeras e inauguraciones. Crean un efecto visual espectacular de hasta 3 metros de altura, ideales para la entrada de novios, el primer baile o cualquier momento especial. Completamente seguras para uso en interiores y exteriores.',
      vimeoId: '1133639422',
      tags: ['Bodas', 'XV Años', 'Inauguraciones']
    },
    {
      id: 'niebla-baja',
      name: 'Niebla Baja',
      icon: 'fas fa-cloud',
      shortDesc: 'Efecto de nubes a ras del suelo para un ambiente cinematográfico',
      fullDesc: 'Crea la ilusión de bailar sobre las nubes con nuestro efecto de niebla baja. Esta técnica especial genera una capa densa de niebla que permanece a ras del suelo, perfecta para el primer baile de bodas o presentaciones elegantes. El efecto dura varios minutos y garantiza fotografías y videos espectaculares con un ambiente romántico y cinematográfico.',
      vimeoId: '1133639330',
      tags: ['Bodas', 'XV Años', 'Eventos Elegantes']
    },
    {
      id: 'pirotecnia-aerea',
      name: 'Pirotecnia Aérea',
      icon: 'fas fa-burst',
      shortDesc: 'Espectáculo de luces en el cielo para eventos al aire libre',
      fullDesc: 'Llena el cielo de color y emoción con nuestra pirotecnia aérea profesional. Espectáculos pirotécnicos sincronizados que iluminan la noche con cascadas de luz, destellos brillantes y efectos espectaculares. Ideal para bodas, aniversarios, fiestas empresariales y eventos públicos. Cada show está cuidadosamente coordinado para ofrecer máxima seguridad y un impacto visual inolvidable.',
      vimeoId: '1135903066',
      tags: ['Bodas', 'Eventos Corporativos', 'Celebraciones']
    },
    {
      id: 'ventury',
      name: 'Ventury',
      icon: 'fas fa-wind',
      shortDesc: 'Columnas de CO2 que disparan hasta 8 metros de altura',
      fullDesc: 'Los cañones Ventury generan impresionantes columnas de CO2 frío que disparan hasta 8 metros de altura. Perfectos para momentos de alto impacto como entradas espectaculares, drops en eventos musicales, lanzamientos de productos o cualquier momento que requiera un efecto dramático. El CO2 se disipa rápidamente sin dejar residuos, siendo completamente seguro y creando un impacto visual inolvidable.',
      vimeoId: '1143668674',
      tags: ['Eventos Corporativos', 'Conciertos', 'Inauguraciones']
    },
    {
      id: 'revelacion-sexo',
      name: 'Revelación de Sexo',
      icon: 'fas fa-gift',
      shortDesc: 'Explosión de color para el momento más emocionante',
      fullDesc: 'Celebra uno de los momentos más esperados con una explosión espectacular de humo de color. Combinamos fuentes frías, confeti y humo de color (rosa o azul) para crear un instante mágico lleno de sorpresa y alegría. El efecto es sincronizado para máximo impacto, creando el momento perfecto para fotos y videos que durarán toda la vida. Incluye opciones de personalización según tus preferencias.',
      vimeoId: '1143149062',
      tags: ['Revelaciones', 'Baby Shower', 'Celebraciones Familiares']
    }
  ];

  return (
    <>
      <section id="efectos" className="section py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-[10%] w-32 h-32 sm:w-64 sm:h-64 bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-32 right-[15%] w-40 h-40 sm:w-80 sm:h-80 bg-pink-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10 md:mb-16">
            <div className="inline-block mb-2 sm:mb-3 md:mb-4">
              <span className="px-3 py-1 sm:py-1.5 bg-purple-600/20 border border-purple-600/30 rounded-full text-xs sm:text-sm text-purple-300 font-semibold">
                <i className="fas fa-sparkles mr-2"></i>
                Efectos Especiales
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 px-4">
              Descubre Nuestros{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Efectos Mágicos
              </span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-lg max-w-3xl mx-auto px-4">
              Cada efecto está diseñado para transformar tu evento en una experiencia inolvidable.
            </p>
          </div>

          {/* Effects Grid - OPTIMIZADO SIN IMÁGENES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {effects.map((effect, index) => (
              <div
                key={effect.id}
                onClick={() => setSelectedEffect(effect)}
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg sm:rounded-xl overflow-hidden border border-purple-600/20 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail Background - SOLO GRADIENTES, SIN IMÁGENES */}
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                  {/* Overlay degradado para profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
                  
                  {/* Ícono grande y centrado */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <i className={`${effect.icon} text-4xl sm:text-5xl md:text-7xl text-white opacity-60`} style={{ filter: 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.5))' }}></i>
                  </div>
                  
                  {/* Play overlay - solo en hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center" style={{ boxShadow: '0 20px 25px -5px rgb(168 85 247 / 0.5)' }}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content - MÁS COMPACTO */}
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${effect.icon} text-sm sm:text-base md:text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{effect.name}</h3>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {effect.shortDesc}
                  </p>

                  {/* Tags preview - MÁS PEQUEÑOS */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                    {effect.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-purple-600/10 rounded-full text-[10px] sm:text-xs text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {effect.tags.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-purple-600/10 rounded-full text-[10px] sm:text-xs text-purple-300">
                        +{effect.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="w-full text-pink-500 font-semibold text-xs sm:text-sm hover:text-pink-400 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    Ver Demostración
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-6 sm:mt-10 md:mt-12 px-4">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6">
              ¿No estás seguro de qué efecto elegir? Contáctanos y te asesoramos
            </p>
            <button
              onClick={() => setAdvisoryModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base hover:scale-105 transition-all shadow-lg shadow-pink-600/30"
            >
              <i className="fas fa-comments mr-2"></i>
              Solicitar Asesoría
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

      {/* Advisory Modal */}
      <AdvisoryModal
        isOpen={advisoryModalOpen}
        onClose={() => setAdvisoryModalOpen(false)}
      />
    </>
  );
}