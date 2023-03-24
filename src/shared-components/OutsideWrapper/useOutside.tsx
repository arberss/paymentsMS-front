import { useEffect } from 'react';

export function useOutsideAlerter(ref: any, onOutsideClick?: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isAnyModalOpen = document.contains(
        document.querySelector('.mantine-Modal-root')
      );
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !isAnyModalOpen
      ) {
        onOutsideClick && onOutsideClick();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
