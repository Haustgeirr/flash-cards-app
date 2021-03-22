import { useState, useEffect } from 'react';

const useOneClickOutside = (ref, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (event) => {
      if (ref.current !== null && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', pageClickEvent);
    }

    return () => {
      document.removeEventListener('click', pageClickEvent);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export default useOneClickOutside;
