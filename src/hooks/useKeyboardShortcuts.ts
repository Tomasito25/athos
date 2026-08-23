/**
 * Atajos de teclado.
 *
 * Sólo combinaciones que no pisan las del navegador, y nunca cuando el foco
 * está en un campo de texto.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUi } from '@/stores/ui';

const isTyping = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  );
};

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      const ui = useUi.getState();

      if (meta && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        ui.setSearchOpen(true);
        return;
      }

      if (event.key === 'Escape') {
        if (ui.searchOpen) ui.setSearchOpen(false);
        else if (ui.prayerMode) ui.setPrayerMode(false);
        return;
      }

      if (isTyping(event.target)) return;

      if (meta && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        navigate('/favoritos');
        return;
      }

      // Atajos de una tecla, al estilo de los lectores de texto.
      if (!meta && !event.altKey && !event.shiftKey) {
        switch (event.key) {
          case '/':
            event.preventDefault();
            ui.setSearchOpen(true);
            break;
          case 'g':
            event.preventDefault();
            navigate('/');
            break;
          case 'p':
            event.preventDefault();
            ui.togglePrayerMode();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);
}
