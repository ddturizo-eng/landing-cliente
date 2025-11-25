'use client';

import { useState } from 'react';
import Image from 'next/image';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#efectos', label: 'Efectos' },
    { href: '#galeria', label: 'Galería' },
    { href: '#eventos', label: 'Eventos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navigation fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 px-4 sm:px-8 py-4 border-b border-pink-500/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Image
              src="/img/logo-hc-efectos-modified.png"
              alt="HC Efectos Logo"
              width={40}
              height={40}
              className="sm:w-[50px] sm:h-[50px]"
            />
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HC Efectos
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 nav-items">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a 
                  href={link.href} 
                  className="hover:text-pink-500 transition text-white text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button */}
          <button 
            onClick={onOpenQuoteModal}
            className="hidden md:block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transition text-white flex-shrink-0"
          >
            Cotizar
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0 hover:scale-110 transition"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Aparece debajo del navbar */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 bg-black/98 backdrop-blur-md z-40 md:hidden border-b border-pink-500/20 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Menu Links */}
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-white text-lg font-medium hover:text-pink-500 transition block py-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-gray-800 my-6"></div>

            {/* Mobile CTA Button */}
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
          className="fixed top-20 left-0 right-0 bottom-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}