import { EventStatus } from '@/core/@types/events';

export function getEventDisplay(status: EventStatus) {
  function getStatusDisplay() {
    switch (status) {
      case 'PUBLISHED':
        return 'Publicado';
      case 'DRAFT':
        return 'Rascunho';
      case 'FINISHED':
        return 'Finalizado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  }

  function getStatusClass() {
    switch (status) {
      case 'PUBLISHED':
        return 'badge-success';
      case 'DRAFT':
        return 'badge-draft';
      case 'FINISHED':
        return 'badge-neutral';
      case 'CANCELLED':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  }

  return {
    badge: getStatusClass(),
    label: getStatusDisplay(),
  };
}
