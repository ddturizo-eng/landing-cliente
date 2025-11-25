/**
 * Tipos TypeScript para el proyecto HC Efectos
 */

export interface QuoteFormData {
  nombre: string;
  telefono: string;
  email?: string;
  ciudad?: string;
  tipoEvento: string;
  fechaEvento: string;
  horaEvento?: string;
  ubicacionEvento?: string;
  numInvitados?: string;
  comentarios?: string;
  efectos: string[];
}

export interface GalleryVideo {
  id: string;
  vimeoId: string;
  title: string;
  category: string;
  thumbnail?: string;
  description?: string;
}

export interface FilterCategory {
  id: string;
  name: string;
  label: string;
}

export interface VideoModalState {
  isOpen: boolean;
  currentIndex: number;
  vimeoId: string;
}

export interface CounterData {
  id: string;
  target: number;
  label: string;
  icon?: string;
}

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}