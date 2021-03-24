import React, { useRef } from 'react';

import ProfileMenuDropdown from './ProfileMenuDropdown';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileMenuButton = () => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useOnClickOutside(dropdownRef, false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <div>
        <button
          type='button'
          className='max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-4 focus:ring-white transition duration-150 ease-out'
          id='user-menu'
          aria-expanded='false'
          aria-haspopup='true'
          onClick={() => toggleMenu()}
        >
          <span className='sr-only'> Open user Menu</span>
          <span className='inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-200'>
            <svg
              className='h-full w-full text-gray-400'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </span>
        </button>
      </div>
      <div
        ref={dropdownRef}
        className={isOpen ? '' : 'hidden'}
        id='profile-menu'
      >
        <ProfileMenuDropdown onMenuItemClick={toggleMenu} />
      </div>
    </div>
  );
};

export default ProfileMenuButton;
