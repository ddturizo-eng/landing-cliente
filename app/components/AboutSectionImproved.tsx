'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutSectionSimple() {
  const [countersVisible, setCountersVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fix hidratación: solo montar después del cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <section id="nosotros" className="section py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards - Más compactas en móvil */}
        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <StatCard
            icon="fa-calendar-check"
            value={1000}
            suffix="+"
            label="Eventos Realizados"
            isVisible={countersVisible}
          />
          <StatCard
            icon="fa-award"
            value={4}
            suffix=" años"
            label="De Experiencia"
            isVisible={countersVisible}
          />
          <StatCard
            icon="fa-heart"
            value={500}
            suffix="+"
            label="Clientes Satisfechos"
            isVisible={countersVisible}
          />
          <StatCard
            icon="fa-map-marker-alt"
            value={0}
            suffix=""
            label="Valledupar, Cesar"
            isVisible={countersVisible}
            isLocation={true}
          />
        </div>

        {/* Content Grid - Stack en móvil */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Quiénes Somos</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
              HC Efectos es una empresa especializada en la creación de experiencias visuales únicas para todo tipo de eventos sociales y corporativos. Nos dedicamos a transformar momentos especiales en recuerdos inolvidables mediante el uso de efectos especiales profesionales.
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              <strong className="text-white">Nuestra misión es simple:</strong> que cada momento especial brille con la intensidad que se merece. HC Efectos es sinónimo de excelencia, creatividad y confianza.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-shield-alt text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">Seguridad Certificada</h5>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                    Todos nuestros efectos cumplen con protocolos de seguridad internacionales. Equipo certificado, permisos al día y máxima precaución en cada evento.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-palette text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">Personalización Total</h5>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                    Cada evento es único. Te asesoramos para crear el efecto perfecto según tu celebración, espacio y presupuesto. Tu visión, nuestra magia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image - Más pequeña en móvil - SIN onLoad */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-600/20 hover:border-purple-600/50 transition-all duration-300">
            {isMounted && (
              <Image 
                src="/img/team.jpg" 
                alt="Equipo HC Efectos" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                priority={false}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de Estadística Simple - MEJORADO RESPONSIVE
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
    <div className="bg-[#1a1a1a] p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-purple-600/20 hover:border-purple-600 transition-all hover:-translate-y-1 text-center">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
        <i className={`fas ${icon} text-sm sm:text-base md:text-xl`}></i>
      </div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
        {isLocation ? label.split(',')[0] : count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-400 leading-tight">
        {isLocation ? label.split(',')[1] : label}
      </div>
    </div>
  );
}