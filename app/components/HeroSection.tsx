'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
}

// Hook para animar contadores
function useCounter(end: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function para animación suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
          setHasAnimated(true);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, hasAnimated]);

  return count;
}

export default function HeroSection({ onOpenQuoteModal }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Contadores animados
  const eventosCount = useCounter(1000, 2500, 300);
  const experienciaCount = useCounter(4, 2000, 600);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden pt-20">
      {/* Background con overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero_1.jpg"
          alt="HC Efectos Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className={`text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transforma tu evento en una{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                experiencia mágica
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Pirotecnia, efectos especiales y momentos inolvidables para bodas, XV años y eventos corporativos en Valledupar.
            </p>

            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <button
                onClick={onOpenQuoteModal}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-lg shadow-pink-600/30"
              >
                Cotizar Mi Evento
              </button>
              
              <a
                href="#galeria"
                className="border-2 border-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-600/10 transition-all"
              >
                Ver Portafolio
              </a>
            </div>

            {/* Stats Section - NUEVO */}
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto md:mx-0">
              {/* Eventos Realizados */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-6 text-center transform hover:scale-105 transition-all">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {eventosCount}+
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  Eventos Realizados
                </div>
              </div>

              {/* Años de Experiencia */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-6 text-center transform hover:scale-105 transition-all">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {experienciaCount}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  Años de Experiencia
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Imágenes decorativas */}
          <div className={`hidden md:block relative h-[500px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-2xl overflow-hidden rotate-6 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-purple-600/30">
              <Image
                src="/img/pirotecnia1.png"
                alt="Evento HC Efectos"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-2xl overflow-hidden -rotate-6 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-pink-600/30">
              <Image
                src="/img/fuentes_frias2.jpg"
                alt="Pirotecnia HC Efectos"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-purple-600/50 hover:scale-110 transition-all duration-500 z-10">
              <Image
                src="/img/logo-hc-efectos.png"
                alt="HC Efectos Logo"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#nosotros" className="text-white/60 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}