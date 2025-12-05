'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutSectionSimple() {
  const [countersVisible, setCountersVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="section py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards - Grid 2x2 en móvil, más compacto */}
        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-10 md:mb-16">
          <StatCard
            icon="fa-calendar-check"
            value={1000}
            suffix="+"
            label="Eventos"
            isVisible={countersVisible}
          />
          <StatCard
            icon="fa-award"
            value={4}
            suffix=" años"
            label="Experiencia"
            isVisible={countersVisible}
          />
          <StatCard
            icon="fa-heart"
            value={500}
            suffix="+"
            label="Clientes"
            isVisible={countersVisible}
          />
          <StatCard
            icon="fa-map-marker-alt"
            value={0}
            suffix=""
            label="Valledupar"
            isVisible={countersVisible}
            isLocation={true}
          />
        </div>

        {/* Content Grid - Stack en móvil */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">Quiénes Somos</h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 leading-relaxed line-clamp-3 md:line-clamp-none">
              HC Efectos es una empresa especializada en la creación de experiencias visuales únicas para todo tipo de eventos sociales y corporativos.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-none">
              <strong className="text-white">Nuestra misión:</strong> que cada momento especial brille con la intensidad que se merece.
            </p>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-shield-alt text-sm sm:text-base md:text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-sm sm:text-base md:text-xl font-bold mb-1">Seguridad Certificada</h5>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-none">
                    Todos nuestros efectos cumplen con protocolos de seguridad internacionales.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 md:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-palette text-sm sm:text-base md:text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-sm sm:text-base md:text-xl font-bold mb-1">Personalización Total</h5>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-none">
                    Cada evento es único. Te asesoramos para crear el efecto perfecto según tu celebración.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image - Más pequeña en móvil */}
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-[500px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-purple-600/20 group">
            <Image 
              src="/img/team.jpg" 
              alt="Equipo HC Efectos" 
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              priority={false}
            />
            {/* Hover effect como overlay separado */}
            <div className="absolute inset-0 transition-all duration-300 group-hover:bg-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de Estadística - ULTRA COMPACTO EN MÓVIL
interface StatCardProps {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  isLocation?: boolean;
}

function StatCard({ icon, value, suffix, label, isVisible, isLocation = false }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || isLocation) return;

    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, isLocation]);

  return (
    <div className="bg-[#1a1a1a] p-2 sm:p-3 md:p-6 rounded-lg border border-purple-600/20 hover:border-purple-600 transition-all hover:-translate-y-1 text-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-md flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3">
        <i className={`fas ${icon} text-xs sm:text-sm md:text-xl`}></i>
      </div>
      <div className="text-base sm:text-xl md:text-3xl font-bold mb-0.5 sm:mb-1">
        {isLocation ? '' : count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-tight">
        {label}
      </div>
    </div>
  );
}