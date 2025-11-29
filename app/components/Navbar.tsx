'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para cambiar el navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#efectos', label: 'Efectos' },
    { href: '#galeria', label: 'Galería' },
    { href: '#eventos', label: 'Eventos' },
    { href: '#instagram', label: 'Contacto' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`navigation fixed top-0 w-full z-50 px-3 sm:px-6 lg:px-8 py-3 lg:py-4 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-md shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0">
            <Image
              src="/img/logo-hc-efectos-modified.png"
              alt="HC Efectos Logo"
              width={35}
              height={35}
              className="sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px]"
            />
            <span className="text-base sm:text-lg lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              HC Efectos
            </span>
          </div>

          {/* Desktop/Tablet Menu - Oculto en móviles y tablets pequeños */}
          <ul className="hidden lg:flex gap-6 xl:gap-8 nav-items">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a 
                  href={link.href} 
                  className="hover:text-pink-500 transition text-white text-sm whitespace-nowrap font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button - Solo en pantallas grandes */}
          <button 
            onClick={onOpenQuoteModal}
            className="hidden lg:block bg-gradient-to-r from-purple-600 to-pink-600 px-5 xl:px-6 py-2 rounded-full font-semibold hover:scale-105 transition text-white text-sm flex-shrink-0 whitespace-nowrap"
          >
            Cotizar
          </button>

          {/* Mobile/Tablet Hamburger Button - Visible en tablets y móviles */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0 hover:scale-110 transition"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Menu - Aparece debajo del navbar */}
      {mobileMenuOpen && (
        <div className="fixed top-[60px] sm:top-[68px] lg:top-20 left-0 right-0 bg-black/98 backdrop-blur-md z-40 lg:hidden border-b border-pink-500/20 px-4 sm:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Mobile/Tablet Menu Links */}
            <ul className="flex flex-col gap-4 sm:gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-white text-base sm:text-lg font-medium hover:text-pink-500 transition block py-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-gray-800 my-5 sm:my-6"></div>

            {/* Mobile/Tablet CTA Button */}
            <button
              onClick={() => {
                onOpenQuoteModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-semibold text-white hover:scale-105 transition"
            >
              Cotizar Ahora
            </button>
          </div>
        </div>
      )}

      {/* Overlay when menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed top-[60px] sm:top-[68px] lg:top-20 left-0 right-0 bottom-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}