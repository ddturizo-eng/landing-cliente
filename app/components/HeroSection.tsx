'use client';

import Image from 'next/image';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
}

export default function HeroSection({ onOpenQuoteModal }: HeroSectionProps) {
  const scrollToGallery = () => {
    const gallerySection = document.getElementById('galeria');
    if (gallerySection) {
      const navbarHeight = 80;
      const offsetTop = gallerySection.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="section min-h-screen bg-[#0a0a0a] text-white flex items-center px-8 pt-20"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="header-content">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transforma tu evento en una{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              experiencia inolvidable
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Pirotecnia, efectos especiales y tecnología de punta para hacer
            brillar cada momento de tu celebración.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={onOpenQuoteModal}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Cotizar Ahora
            </button>
            <button 
              onClick={scrollToGallery}
              className="border-2 border-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-pink-500/10 transition"
            >
              Ver Galería
            </button>
          </div>

          {/* Mouse Scroll Indicator */}
          <div className="mouse mt-12 flex justify-center md:justify-start">
            <div className="w-6 h-10 border-2 border-pink-500 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-pink-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Images */}
        <div className="right-h-content relative h-[500px] md:h-[600px]">
          <Image
            src="/img/hero_1.jpg"
            alt="Efecto especial 1"
            width={300}
            height={400}
            className="absolute top-0 right-0 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ zIndex: 3 }}
            loading="lazy"
          />
          <Image
            src="/img/fuentes_frias2.jpg"
            alt="Efecto especial 2"
            width={280}
            height={380}
            className="absolute bottom-20 left-0 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ zIndex: 2 }}
            loading="lazy"
          />
          <Image
            src="/img/fuentes_frias.png"
            alt="Efecto especial 3"
            width={260}
            height={360}
            className="absolute top-40 left-20 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ zIndex: 1 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}