import React from 'react';

const MobileMenu = ({ isOpen }) => {
  return (
    <div className={(isOpen ? '' : 'hidden') + ' sm:hidden'} id='mobile-menu'>
      <div className='px-2 pt-2 pb-3 space-y-1'>
        <a
          href='#'
          className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
          aria-current='page'
        >
          Dashboard
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
