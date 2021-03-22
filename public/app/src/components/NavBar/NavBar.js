import React from 'react';
import { connect } from 'react-redux';

import NavBarLink from './NavBarLink';
import ProfileMenuButton from '../navBar/profileMenu/ProfileMenuButton';
import Logo from '../Logo';

const NavBar = () => {
  return (
    <div>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:py-8 sm:px-8'>
          <div className='flex items-center justify-between h-8'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <Logo className='h-8 w-8 text-gray-200' />
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <NavBarLink href='/dashboard' text='Dashboard' />
                </div>
              </div>
            </div>
            <div className='hidden md:block'>
              <div className='ml-4 flex items-center md:ml-6'>
                <ProfileMenuButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default connect()(NavBar);
