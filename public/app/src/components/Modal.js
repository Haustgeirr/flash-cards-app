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
      <div
        className='fixed z-10 inset-0 overflow-y-auto'
        aria-labelledby='modal-headline'
        role='dialog'
        aria-modal='true'
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div
            className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            aria-hidden='true'
          ></div>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <div
            className='inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full'
            ref={modalRef}
          >
            {React.cloneElement(children, { close })}
          </div>
        </div>
      </div>
    ) : null,
    modalElement
  );
};

export default forwardRef(Modal);
