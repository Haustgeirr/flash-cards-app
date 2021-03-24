import { useState, useEffect } from 'react';

const useOneClickOutside = (ref, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (event) => {
      if (ref.current !== null && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const escapeKeyEvent = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('click', pageClickEvent);
      document.addEventListener('keydown', escapeKeyEvent);
    }

    return () => {
      document.removeEventListener('click', pageClickEvent);
      document.removeEventListener('keydown', escapeKeyEvent);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export default useOneClickOutside;
