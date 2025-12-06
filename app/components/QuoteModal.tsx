'use client';

import { useState, useEffect, FormEvent } from 'react';
import { QuoteModalProps, EfectoConCantidad } from '../types';
import { 
  CONFIG, 
  EFECTOS_ESPECIALES, 
  TIPOS_EVENTOS,
  EFECTOS_POR_EVENTO,
  NOMBRES_EVENTOS,
  permiteCantidad
} from '../lib/config';
import { 
  formatearFecha, 
  generarURLWhatsapp,
  validarEmail,
  validarTelefono 
} from '../lib/utils';
import CalendarPicker from './CalendarPicker';

export default function QuoteModal({ isOpen, onClose, preselectedEventType }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: '',
    tipoEvento: '',
    fechaEvento: '',
    horaEvento: '',
    ubicacionEvento: '',
    comentarios: '',
    efectos: [] as EfectoConCantidad[],
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('PM');

  // Generar arrays de horas y minutos
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = ['AM', 'PM'];

  // Obtener fecha mínima (hoy)
  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Precargar datos cuando se selecciona un evento desde las tarjetas
  useEffect(() => {
    if (isOpen && preselectedEventType) {
      const tipoEvento = NOMBRES_EVENTOS[preselectedEventType] || '';
      const efectosPredilectos = EFECTOS_POR_EVENTO[preselectedEventType] || [];
      
      // Convertir efectos a formato con cantidad
      const efectosConCantidad: EfectoConCantidad[] = efectosPredilectos.map(efecto => ({
        nombre: efecto,
        cantidad: permiteCantidad(efecto) ? 2 : 1, // Cantidad por defecto: 2 para efectos con cantidad
        permiteCantidad: permiteCantidad(efecto)
      }));
      
      setFormData((prev) => ({
        ...prev,
        tipoEvento,
        efectos: efectosConCantidad
      }));
    } else if (!isOpen) {
      // Reset form cuando se cierra
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        ciudad: '',
        tipoEvento: '',
        fechaEvento: '',
        horaEvento: '',
        ubicacionEvento: '',
        comentarios: '',
        efectos: [],
      });
    }
  }, [isOpen, preselectedEventType]);

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

  const handleCheckboxChange = (nombreEfecto: string) => {
    setFormData((prev) => {
      const efectoExiste = prev.efectos.find(e => e.nombre === nombreEfecto);
      
      if (efectoExiste) {
        // Remover efecto
        return {
          ...prev,
          efectos: prev.efectos.filter(e => e.nombre !== nombreEfecto)
        };
      } else {
        // Agregar efecto
        const nuevoEfecto: EfectoConCantidad = {
          nombre: nombreEfecto,
          cantidad: permiteCantidad(nombreEfecto) ? 2 : 1,
          permiteCantidad: permiteCantidad(nombreEfecto)
        };
        return {
          ...prev,
          efectos: [...prev.efectos, nuevoEfecto]
        };
      }
    });
  };

  const handleCantidadChange = (nombreEfecto: string, nuevaCantidad: number) => {
    setFormData((prev) => ({
      ...prev,
      efectos: prev.efectos.map(efecto => 
        efecto.nombre === nombreEfecto 
          ? { ...efecto, cantidad: Math.max(1, nuevaCantidad) }
          : efecto
      )
    }));
  };

  const isEfectoSeleccionado = (nombreEfecto: string): boolean => {
    return formData.efectos.some(e => e.nombre === nombreEfecto);
  };

  const getCantidadEfecto = (nombreEfecto: string): number => {
    const efecto = formData.efectos.find(e => e.nombre === nombreEfecto);
    return efecto?.cantidad || 1;
  };

  const handleDateSelect = (date: string) => {
    setFormData((prev) => ({ ...prev, fechaEvento: date }));
  };

  const handleTimeConfirm = () => {
    const time = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    setFormData((prev) => ({ ...prev, horaEvento: time }));
    setShowTimePicker(false);
  };

  const handleTimeCancel = () => {
    setShowTimePicker(false);
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
    
    mensaje += '\n✨ *EFECTOS ESPECIALES SOLICITADOS*\n';
    formData.efectos.forEach((efecto, index) => {
      if (efecto.permiteCantidad) {
        mensaje += `${index + 1}. ${efecto.nombre} (x${efecto.cantidad})\n`;
      } else {
        mensaje += `${index + 1}. ${efecto.nombre}\n`;
      }
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
        className="bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 rounded-2xl p-6 max-w-2xl w-full my-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="closeQuoteModal"
          className="absolute top-4 right-4 text-white text-2xl hover:text-pink-500 transition z-10"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Cotiza tu Evento
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          {preselectedEventType 
            ? `Formulario precargado para ${NOMBRES_EVENTOS[preselectedEventType]}` 
            : 'Completa el formulario y nos pondremos en contacto contigo'}
        </p>

        {/* Form */}
        <form id="quoteForm" onSubmit={handleSubmit} className="space-y-5">
          {/* Datos de Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-500 flex items-center gap-2">
              <i className="fas fa-user"></i>
              Datos de Contacto
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="3001234567"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  placeholder="Valledupar"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Detalles del Evento */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-500 flex items-center gap-2">
              <i className="fas fa-calendar-alt"></i>
              Detalles del Evento
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Tipo de Evento *
                </label>
                <select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition"
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
                <label className="block text-sm font-medium mb-1.5">
                  Fecha del Evento *
                </label>
                <div
                  onClick={() => setShowCalendar(true)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition cursor-pointer hover:border-pink-500/50 flex items-center justify-between"
                >
                  <span className={formData.fechaEvento ? 'text-white' : 'text-gray-500'}>
                    {formData.fechaEvento 
                      ? formatearFecha(formData.fechaEvento) 
                      : 'Seleccionar fecha'}
                  </span>
                  <i className="fas fa-calendar-check text-pink-500"></i>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Hora del Evento
                </label>
                <div
                  onClick={() => setShowTimePicker(true)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition cursor-pointer hover:border-pink-500/50 flex items-center justify-between"
                >
                  <span className={formData.horaEvento ? 'text-white' : 'text-gray-500'}>
                    {formData.horaEvento || 'Seleccionar hora'}
                  </span>
                  <i className="fas fa-clock text-pink-500"></i>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Ubicación del Evento
                </label>
                <input
                  type="text"
                  name="ubicacionEvento"
                  value={formData.ubicacionEvento}
                  onChange={handleInputChange}
                  placeholder="Ej: Club Social, Valledupar"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Efectos Especiales */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-500 flex items-center gap-2">
              <i className="fas fa-magic"></i>
              Efectos Especiales Deseados *
              {preselectedEventType && formData.efectos.length > 0 && (
                <span className="text-xs font-normal text-green-400 ml-2">
                  ✓ Preseleccionados para este evento
                </span>
              )}
            </h3>
            <div className="space-y-2">
              {EFECTOS_ESPECIALES.map((efecto) => {
                const isChecked = isEfectoSeleccionado(efecto);
                const permiteCant = permiteCantidad(efecto);
                const cantidad = getCantidadEfecto(efecto);

                return (
                  <div
                    key={efecto}
                    className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-gray-700/50 hover:border-pink-500/30 transition"
                  >
                    <label className="flex items-center space-x-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(efecto)}
                        className="w-4 h-4 accent-pink-500"
                      />
                      <span className="text-sm">{efecto}</span>
                    </label>

                    {/* Control de Cantidad */}
                    {permiteCant && isChecked && (
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          type="button"
                          onClick={() => handleCantidadChange(efecto, cantidad - 1)}
                          disabled={cantidad <= 1}
                          className="w-7 h-7 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 rounded-md flex items-center justify-center transition"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="w-8 text-center font-semibold text-pink-500">
                          {cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCantidadChange(efecto, cantidad + 1)}
                          disabled={cantidad >= 20}
                          className="w-7 h-7 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 rounded-md flex items-center justify-center transition"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
              <i className="fas fa-comment-dots text-pink-500"></i>
              Comentarios Adicionales
            </label>
            <textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition resize-none"
              placeholder="Cuéntanos más detalles sobre tu evento..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-semibold text-base hover:scale-105 transition"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Enviar Cotización por WhatsApp
          </button>
        </form>

        {/* Calendar Modal */}
        {showCalendar && (
          <CalendarPicker
            selectedDate={formData.fechaEvento}
            onDateSelect={handleDateSelect}
            onClose={() => setShowCalendar(false)}
            minDate={getMinDate()}
          />
        )}

        {/* Time Picker Modal */}
        {showTimePicker && (
          <div className="absolute inset-0 bg-black/90 rounded-2xl flex items-center justify-center z-50 p-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-sm border border-pink-500/20">
              <h4 className="text-xl font-bold text-center mb-4 text-pink-500">
                Seleccionar Hora
              </h4>
              
              <div className="flex gap-2 justify-center mb-6">
                {/* Hours Picker */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 text-center mb-2">Hora</label>
                  <select
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-3 text-center text-lg focus:outline-none focus:border-pink-500 transition"
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end pb-3 text-2xl font-bold text-pink-500">:</div>

                {/* Minutes Picker */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 text-center mb-2">Min</label>
                  <select
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-3 text-center text-lg focus:outline-none focus:border-pink-500 transition"
                  >
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>

                {/* AM/PM Picker */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 text-center mb-2">Periodo</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-3 text-center text-lg focus:outline-none focus:border-pink-500 transition"
                  >
                    {periods.map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleTimeCancel}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2.5 rounded-lg font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleTimeConfirm}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}