'use client';

import { useEffect, useState, useRef } from 'react';
import { esDesktop } from '../lib/utils';

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  rotation: number;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const sparksRef = useRef<Spark[]>([]);
  const sparkIdRef = useRef(0);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !esDesktop()) return;

    let animationFrameId: number;
    let lastSparkTime = 0;

    const colors = ['#ec4899', '#f97316', '#fbbf24', '#a855f7', '#ff6b6b', '#ffffff'];

    const createSpark = (x: number, y: number, intense: boolean = false) => {
      const spreadMultiplier = intense ? 2 : 1;
      const count = intense ? 3 : 1;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 3 + 2) * spreadMultiplier;

        sparksRef.current.push({
          id: sparkIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
        });
      }

      // Limitar número de chispas
      if (sparksRef.current.length > 30) {
        sparksRef.current = sparksRef.current.slice(-30);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      // Crear chispas cada 50ms aproximadamente
      if (now - lastSparkTime > 50 && Math.random() > 0.3) {
        createSpark(e.clientX, e.clientY, isClicking);
        lastSparkTime = now;
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Explosión al hacer clic
      for (let i = 0; i < 8; i++) {
        createSpark(mousePos.x, mousePos.y, true);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const animateSparks = () => {
      sparksRef.current = sparksRef.current
        .map(spark => ({
          ...spark,
          x: spark.x + spark.vx,
          y: spark.y + spark.vy,
          vx: spark.vx * 0.98, // Fricción
          vy: spark.vy * 0.98 + 0.2, // Gravedad
          life: spark.life - 0.015,
          size: spark.size * 0.96,
          rotation: spark.rotation + 5,
        }))
        .filter(spark => spark.life > 0);

      forceUpdate({});
      animationFrameId = requestAnimationFrame(animateSparks);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    animateSparks();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, mousePos, isClicking]);

  if (!mounted || !esDesktop()) return null;

  return (
    <>
      {/* Cursor principal con glow */}
      <div
        className="fixed pointer-events-none z-[10000] transition-transform duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 1.5 : 1})`,
        }}
      >
        {/* Núcleo del cursor */}
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: isClicking
              ? 'radial-gradient(circle, #fbbf24 0%, #f97316 50%, #ec4899 100%)'
              : 'radial-gradient(circle, #ec4899 0%, #a855f7 100%)',
            boxShadow: isClicking
              ? '0 0 20px #fbbf24, 0 0 40px #f97316, 0 0 60px #ec4899'
              : '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(168, 85, 247, 0.4)',
            transition: 'all 0.1s ease',
          }}
        />
      </div>

      {/* Chispas */}
      {sparksRef.current.map(spark => (
        <div
          key={spark.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            opacity: spark.life * 0.9,
            transform: `translate(-50%, -50%) rotate(${spark.rotation}deg)`,
            boxShadow: `0 0 ${spark.size * 3}px ${spark.color}`,
            filter: 'blur(0.5px)',
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}

      {/* Trail suave detrás del cursor */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '30px',
          height: '30px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          opacity: isClicking ? 0.6 : 0.3,
        }}
      />
    </>
  );
}