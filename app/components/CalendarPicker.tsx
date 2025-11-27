'use client';

import { useState, useEffect } from 'react';

interface CalendarPickerProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
  minDate?: string;
}

export default function CalendarPicker({
  selectedDate,
  onDateSelect,
  onClose,
  minDate,
}: CalendarPickerProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (selectedDate) {
      return new Date(selectedDate);
    }
    return new Date();
  });

  const [displayMonth, setDisplayMonth] = useState<Date>(new Date(currentDate));

  // Obtener primer día del mes y número de días
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDayOfMonth = getFirstDayOfMonth(displayMonth);
  const daysArray: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Información del mes y año
  const monthName = displayMonth.toLocaleDateString('es-CO', {
    month: 'long',
    year: 'numeric',
  });

  // Navegar meses
  const handlePrevMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1)
    );
  };

  // Seleccionar día
  const handleSelectDay = (day: number) => {
    const selected = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );

    // Validar que no sea menor que minDate
    if (minDate) {
      const min = new Date(minDate);
      if (selected < min) return;
    }

    // Convertir a formato YYYY-MM-DD
    const formattedDate = selected.toISOString().split('T')[0];
    onDateSelect(formattedDate);
    onClose();
  };

  // Verificar si una fecha está deshabilitada
  const isDateDisabled = (day: number): boolean => {
    if (!minDate) return false;
    const dateToCheck = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    return dateToCheck < new Date(minDate);
  };

  // Verificar si una fecha está seleccionada
  const isDateSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return (
      day === selected.getDate() &&
      displayMonth.getMonth() === selected.getMonth() &&
      displayMonth.getFullYear() === selected.getFullYear()
    );
  };

  // Verificar si es hoy
  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      displayMonth.getMonth() === today.getMonth() &&
      displayMonth.getFullYear() === today.getFullYear()
    );
  };

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="absolute inset-0 bg-black/90 rounded-2xl flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-sm border border-pink-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="w-10 h-10 hover:bg-gray-700 rounded-lg transition flex items-center justify-center"
            aria-label="Mes anterior"
          >
            <i className="fas fa-chevron-left text-pink-500"></i>
          </button>

          <h3 className="text-lg font-bold text-center capitalize text-pink-500">
            {monthName}
          </h3>

          <button
            onClick={handleNextMonth}
            className="w-10 h-10 hover:bg-gray-700 rounded-lg transition flex items-center justify-center"
            aria-label="Próximo mes"
          >
            <i className="fas fa-chevron-right text-pink-500"></i>
          </button>
        </div>

        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {daysArray.map((day, index) => (
            <div key={index}>
              {day === null ? (
                <div className="aspect-square"></div>
              ) : (
                <button
                  onClick={() => handleSelectDay(day)}
                  disabled={isDateDisabled(day)}
                  className={`
                    w-full aspect-square rounded-lg font-semibold text-sm
                    transition duration-200
                    flex items-center justify-center
                    ${
                      isDateDisabled(day)
                        ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        : isDateSelected(day)
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : isToday(day)
                            ? 'bg-gray-700 text-white border border-pink-500'
                            : 'bg-black/50 text-gray-200 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                  aria-label={`${day} de ${monthName}`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2.5 rounded-lg font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 rounded-lg font-semibold hover:scale-105 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}