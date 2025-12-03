'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [countersVisible, setCountersVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: 'fa-calendar-check', value: 1000, suffix: '+', label: 'Eventos Realizados' },
    { icon: 'fa-award', value: 4, suffix: ' años', label: 'De Experiencia' },
    { icon: 'fa-heart', value: 500, suffix: '+', label: 'Clientes Satisfechos' },
    { icon: 'fa-map-marker-alt', value: 0, suffix: '', label: 'Valledupar, Cesar', isLocation: true }
  ];

  const features = [
    {
      icon: 'fa-shield-alt',
      title: 'Seguridad Certificada',
      description: 'Todos nuestros efectos cumplen con protocolos de seguridad internacionales. Equipo certificado, permisos al día y máxima precaución en cada evento.'
    },
    {
      icon: 'fa-palette',
      title: 'Personalización Total',
      description: 'Cada evento es único. Te asesoramos para crear el efecto perfecto según tu celebración, espacio y presupuesto. Tu visión, nuestra magia.'
    }
  ];

  return (
    <section id="nosotros" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              {...stat}
              isVisible={countersVisible}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Quiénes Somos
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  HC Efectos es una empresa especializada en la creación de experiencias visuales únicas para todo tipo de eventos sociales y corporativos. Nos dedicamos a transformar momentos especiales en recuerdos inolvidables mediante el uso de efectos especiales profesionales.
                </p>
                <p className="text-white font-semibold">
                  Nuestra misión es simple: <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">que cada momento especial brille con la intensidad que se merece.</span> HC Efectos es sinónimo de excelencia, creatividad y confianza.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${feature.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image - SIN ESTADOS DE CARGA */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden group">
              {/* Image directo sin condicionales */}
              <img 
                src="/img/fuentes_frias2.jpg"
                alt="HC Efectos - Efectos Especiales Profesionales"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Border Glow */}
              <div className="absolute inset-0 border-2 border-purple-600/20 rounded-2xl group-hover:border-purple-600/60 transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-20 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full opacity-20 blur-2xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stat Card Component
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

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, isLocation]);

  return (
    <div className="relative group">
      <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-xl border border-purple-600/20 hover:border-purple-600/60 transition-all duration-300 hover:-translate-y-2">
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <i className={`fas ${icon} text-xl`}></i>
        </div>

        {/* Value */}
        <div className="text-3xl font-bold mb-2 text-center">
          {isLocation ? label.split(',')[0] : count}
          <span className="text-purple-400">{suffix}</span>
        </div>

        {/* Label */}
        <div className="text-sm text-gray-400 text-center leading-tight">
          {isLocation ? label.split(',')[1]?.trim() : label}
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}