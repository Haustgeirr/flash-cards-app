import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';

import useOnClickOutside from '../hooks/useOnClickOutside';

const modalElement = document.getElementById('modal-root');

const Modal = ({ children, startOpen = false }, ref) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useOnClickOutside(modalRef, startOpen);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close, setIsOpen]
  );

  return createPortal(
    isOpen ? (
      <div className='fixed z-10 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-800 opacity-75'></div>
          </div>
          <div ref={modalRef}>{React.cloneElement(children, { close })}</div>
        </div>
      </div>
    ) : null,
    modalElement
  );
};

export default forwardRef(Modal);
