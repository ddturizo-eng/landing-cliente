'use client';

import { useState, useEffect, FormEvent } from 'react';
import { QuoteModalProps } from '../types';
import { CONFIG, EFECTOS_ESPECIALES, TIPOS_EVENTOS } from '../lib/config';
import { 
  formatearFecha, 
  generarURLWhatsapp,
  validarEmail,
  validarTelefono 
} from '../lib/utils';

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: '',
    tipoEvento: '',
    fechaEvento: '',
    horaEvento: '',
    ubicacionEvento: '',
    numInvitados: '',
    comentarios: '',
    efectos: [] as string[],
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (efecto: string) => {
    setFormData((prev) => {
      const efectos = prev.efectos.includes(efecto)
        ? prev.efectos.filter((e) => e !== efecto)
        : [...prev.efectos, efecto];
      return { ...prev, efectos };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.tipoEvento ||
      !formData.fechaEvento
    ) {
      alert('Por favor completa todos los campos obligatorios marcados con *');
      return;
    }

    // Validación de teléfono
    if (!validarTelefono(formData.telefono)) {
      alert('Por favor ingresa un número de teléfono válido');
      return;
    }

    // Validación de email (si se proporcionó)
    if (formData.email && !validarEmail(formData.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    // Validación de efectos
    if (formData.efectos.length === 0) {
      alert('Por favor selecciona al menos un efecto especial');
      return;
    }

    // Construir mensaje de WhatsApp
    let mensaje = '🎉 *COTIZACIÓN DE EVENTO - HC EFECTOS* 🎉\n\n';
    
    mensaje += '👤 *DATOS DE CONTACTO*\n';
    mensaje += `Nombre: ${formData.nombre}\n`;
    mensaje += `Teléfono: ${formData.telefono}\n`;
    if (formData.email) mensaje += `Email: ${formData.email}\n`;
    if (formData.ciudad) mensaje += `Ciudad: ${formData.ciudad}\n`;
    
    mensaje += '\n📅 *DETALLES DEL EVENTO*\n';
    mensaje += `Tipo de Evento: ${formData.tipoEvento}\n`;
    mensaje += `Fecha: ${formatearFecha(formData.fechaEvento)}\n`;
    if (formData.horaEvento) mensaje += `Hora: ${formData.horaEvento}\n`;
    if (formData.ubicacionEvento) mensaje += `Ubicación: ${formData.ubicacionEvento}\n`;
    if (formData.numInvitados) mensaje += `Número de Invitados: ${formData.numInvitados}\n`;
    
    mensaje += '\n✨ *EFECTOS ESPECIALES SOLICITADOS*\n';
    formData.efectos.forEach((efecto, index) => {
      mensaje += `${index + 1}. ${efecto}\n`;
    });
    
    if (formData.comentarios) {
      mensaje += `\n💬 *COMENTARIOS ADICIONALES*\n${formData.comentarios}\n`;
    }
    
    mensaje += '\n---\n¡Espero su cotización! 🙏';

    // Generar URL de WhatsApp y abrir
    const whatsappURL = generarURLWhatsapp(CONFIG.whatsappNumber, mensaje);
    window.open(whatsappURL, '_blank');

    // Cerrar modal y resetear formulario
    setTimeout(() => {
      onClose();
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        ciudad: '',
        tipoEvento: '',
        fechaEvento: '',
        horaEvento: '',
        ubicacionEvento: '',
        numInvitados: '',
        comentarios: '',
        efectos: [],
      });
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      id="quoteModal"
      className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 rounded-2xl p-8 max-w-3xl w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="closeQuoteModal"
          className="absolute top-4 right-4 text-white text-3xl hover:text-pink-500 transition"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Cotiza tu Evento
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Completa el formulario y nos pondremos en contacto contigo
        </p>

        {/* Form */}
        <form id="quoteForm" onSubmit={handleSubmit} className="space-y-6">
          {/* Datos de Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-pink-500">
              👤 Datos de Contacto
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="3001234567"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  placeholder="Valledupar"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Detalles del Evento */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-pink-500">
              📅 Detalles del Evento
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipo de Evento *
                </label>
                <select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                  required
                >
                  <option value="">Selecciona...</option>
                  {TIPOS_EVENTOS.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fecha del Evento *
                </label>
                <input
                  type="date"
                  name="fechaEvento"
                  value={formData.fechaEvento}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hora del Evento
                </label>
                <input
                  type="time"
                  name="horaEvento"
                  value={formData.horaEvento}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Número de Invitados
                </label>
                <input
                  type="number"
                  name="numInvitados"
                  value={formData.numInvitados}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Ubicación del Evento
                </label>
                <input
                  type="text"
                  name="ubicacionEvento"
                  value={formData.ubicacionEvento}
                  onChange={handleInputChange}
                  placeholder="Ej: Club Social, Valledupar"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Efectos Especiales */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-pink-500">
              ✨ Efectos Especiales Deseados *
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {EFECTOS_ESPECIALES.map((efecto) => (
                <label
                  key={efecto}
                  className="flex items-center space-x-3 cursor-pointer hover:text-pink-500 transition"
                >
                  <input
                    type="checkbox"
                    name="efectos"
                    value={efecto}
                    checked={formData.efectos.includes(efecto)}
                    onChange={() => handleCheckboxChange(efecto)}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span>{efecto}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <label className="block text-sm font-medium mb-2">
              💬 Comentarios Adicionales
            </label>
            <textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition resize-none"
              placeholder="Cuéntanos más detalles sobre tu evento..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Enviar Cotización por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}