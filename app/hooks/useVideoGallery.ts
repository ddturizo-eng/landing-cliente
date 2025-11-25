/**
 * Hook para galería de videos
 * Reemplaza: initVideoGallery()
 */

import { useEffect, useState } from 'react';

export function useVideoGallery() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState<Element[]>([]);

  useEffect(() => {
    const filterBtns = document.querySelectorAll('.filter-btn') as NodeListOf<HTMLElement>;
    const galleryCards = document.querySelectorAll('.gallery-card') as NodeListOf<HTMLElement>;
    const videoModal = document.getElementById('videoModal') as HTMLElement | null;
    const modalIframe = document.getElementById('modalIframe') as HTMLIFrameElement | null;
    const closeBtn = document.getElementById('closeVideoModal');
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const expandButtons = document.querySelectorAll('.card-expand') as NodeListOf<HTMLElement>;

    // Actualizar videos visibles
    const updateVisibleVideos = () => {
      const visible = Array.from(galleryCards).filter(
        (card) => !card.classList.contains('hidden')
      );
      setVisibleVideos(visible);
    };

    // Abrir modal
    const openVideoModal = (vimeoId: string) => {
      const modalSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=0&autopause=0&byline=0&title=0`;
      if (modalIframe) modalIframe.src = modalSrc;
      videoModal?.classList.add('active');
      document.body.classList.add('no-scroll');
    };

    // Cerrar modal
    const closeVideoModal = () => {
      if (modalIframe) modalIframe.src = '';
      videoModal?.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    // Filtros
    const handleFilter = (btn: Element) => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');

        if (filter === 'todos' || category === filter) {
          card.classList.remove('hidden');
          if (card instanceof HTMLElement) {
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
          }
        } else {
          card.style.animation = 'fadeOut 0.3s ease forwards';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });

      updateVisibleVideos();
    };

    const filterHandlers = new Map<HTMLElement, EventListener>();
    filterBtns.forEach((btn) => {
      const handler = () => handleFilter(btn);
      filterHandlers.set(btn, handler);
      btn.addEventListener('click', handler);
    });

    // Expandir video
    const expandHandlers = new Map<HTMLElement, EventListener>();
    expandButtons.forEach((btn) => {
      const handler = (e: Event) => {
        e.stopPropagation();
        const vimeoId = btn.getAttribute('data-vimeo');
        if (vimeoId) {
          openVideoModal(vimeoId);
        }
      };
      expandHandlers.set(btn, handler);
      btn.addEventListener('click', handler);
    });

    // Cerrar
    closeBtn?.addEventListener('click', closeVideoModal);
    videoModal?.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });

    // Keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoModal?.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    updateVisibleVideos();

    return () => {
      filterHandlers.forEach((handler, btn) => {
        btn.removeEventListener('click', handler);
      });
      expandHandlers.forEach((handler, btn) => {
        btn.removeEventListener('click', handler);
      });
      closeBtn?.removeEventListener('click', closeVideoModal);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { currentVideoIndex, setCurrentVideoIndex, visibleVideos };
}