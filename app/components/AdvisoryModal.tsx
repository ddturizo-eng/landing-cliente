'use client';

import { useState, useEffect, FormEvent } from 'react';
import { CONFIG } from '../lib/config';
import { generarURLWhatsapp, validarTelefono } from '../lib/utils';

interface AdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvisoryModal({ isOpen, onClose }: AdvisoryModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!formData.nombre || !formData.telefono) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validación de teléfono
    if (!validarTelefono(formData.telefono)) {
      alert('Por favor ingresa un número de teléfono válido');
      return;
    }

    // Construir mensaje profesional de WhatsApp
    const mensaje = `🎯 *SOLICITUD DE ASESORÍA - HC EFECTOS*

Hola, me gustaría recibir asesoría profesional sobre los efectos especiales para mi evento.

👤 *MIS DATOS*
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}

Quedo atento a su orientación para elegir los mejores efectos según mis necesidades.

¡Gracias! 🙏`;

    // Generar URL de WhatsApp y abrir
    const whatsappURL = generarURLWhatsapp(CONFIG.whatsappNumber, mensaje);
    window.open(whatsappURL, '_blank');

    // Cerrar modal y resetear formulario
    setTimeout(() => {
      onClose();
      setFormData({
        nombre: '',
        telefono: '',
      });
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 rounded-2xl p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:text-pink-500 transition z-10"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-comments text-3xl text-white"></i>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Solicitar Asesoría
            </span>
          </h2>
          <p className="text-gray-400 text-sm">
            Déjanos tus datos y te ayudaremos a elegir los mejores efectos para tu evento
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Daniel turizo"
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Teléfono / WhatsApp *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="3001234567"
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
              required
            />
          </div>

          {/* Info Box */}
          <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-purple-400 text-lg flex-shrink-0 mt-0.5"></i>
              <div className="text-xs text-gray-300">
                <p className="font-semibold mb-1">¿Qué recibirás?</p>
                <ul className="space-y-1 text-gray-400">
                  <li>• Asesoría personalizada sobre efectos</li>
                  <li>• Recomendaciones según tu tipo de evento</li>
                  <li>• Respuesta rápida por WhatsApp</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-semibold text-base hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            Contactar por WhatsApp
          </button>

          <p className="text-center text-xs text-gray-500 mt-3">
            Te responderemos en menos de 30 minutos
          </p>
        </form>
      </div>
    </div>
  );
}