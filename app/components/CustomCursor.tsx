'use client';

import { useCustomCursor } from '../hooks/useCustomCursor';

export default function CustomCursor() {
  useCustomCursor();

  return (
    <>
      <div className="custom-cursor fixed w-4 h-4 bg-pink-500 rounded-full pointer-events-none z-[10000] mix-blend-difference" />
      <div className="cursor-trail fixed w-8 h-8 border-2 border-pink-500 rounded-full pointer-events-none z-[9999] mix-blend-difference" />
    </>
  );
}