"use client";

import React, { useEffect, useState, useRef } from "react";

type Props = {
  feedId: string;
  containerId?: string;
};

export default function BeholdWidget({ feedId, containerId = "behold-instagram-feed" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Intersection Observer - Solo cargar cuando esté visible
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Dejar de observar una vez cargado
          }
        });
      },
      {
        rootMargin: "200px", // Empezar a cargar 200px antes de que sea visible
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Cargar script de Behold SOLO cuando sea visible
  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return;

    const scriptSrc = "https://w.behold.so/widget.js";

    // Si script ya existe, solo activar
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existing) {
      setTimeout(() => setLoaded(true), 50);
      return;
    }

    const s = document.createElement("script");
    s.src = scriptSrc;
    s.async = true;

    try {
      (s as HTMLScriptElement).type = "module";
    } catch (e) {
      // ignore
    }

    s.onload = () => {
      setLoaded(true);
    };

    s.onerror = () => {
      setLoaded(true);
    };

    document.head.appendChild(s);

    return () => {
      // No remover el script para evitar recargas
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} id={containerId} className="mb-8 min-h-[400px]">
      {!isVisible ? (
        // Placeholder mientras no sea visible
        <div className="h-[400px] flex items-center justify-center text-gray-400 bg-gray-900/30 rounded-lg">
          <div className="text-center">
            <i className="fab fa-instagram text-4xl text-pink-500 mb-2"></i>
            <p>Instagram Feed</p>
          </div>
        </div>
      ) : loaded ? (
        // Widget con configuración optimizada para móvil
        <div 
          dangerouslySetInnerHTML={{ 
            __html: `<behold-widget 
              feed-id="${feedId}"
              ${isMobile ? 'autoplay="false"' : ''}
              ${isMobile ? 'limit="9"' : ''}
            ></behold-widget>` 
          }} 
        />
      ) : (
        // Loading state
        <div className="h-[400px] flex items-center justify-center text-gray-400 bg-gray-900/30 rounded-lg animate-pulse">
          <div className="text-center">
            <i className="fab fa-instagram text-4xl text-pink-500 mb-2 animate-spin"></i>
            <p>Cargando feed de Instagram...</p>
          </div>
        </div>
      )}
    </div>
  );
}