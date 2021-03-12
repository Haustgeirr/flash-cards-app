import React, { useState, useEffect } from 'react';

import ProfileMenuDropdown from './ProfileMenuDropdown';

const ProfileMenuButton = (props) => {
  const [isShowingMenu, setShowMenuState] = useState(false);

  useEffect(() => {
    const pageClickEvent = (e) => {
      setShowMenuState(false);
    };

    if (isShowingMenu) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isShowingMenu]);

  return (
    <div className='relative'>
      <div>
        <button
          type='button'
          className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-4  focus:ring-gray-800'
          id='user-menu'
          aria-expanded='false'
          aria-haspopup='true'
          onClick={(e) => setShowMenuState(!isShowingMenu)}
        >
          <span className='sr-only'> Open user Menu</span>
          <img
            className='h-8 w-8 rounded-full'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
        </button>
      </div>
      {isShowingMenu && <ProfileMenuDropdown />}
    </div>
  );
};

export default ProfileMenuButton;
