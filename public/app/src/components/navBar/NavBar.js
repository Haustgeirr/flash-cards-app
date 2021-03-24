import React, { useState } from 'react';
import { connect } from 'react-redux';

import NavBarLink from './NavBarLink';
import ProfileMenuButton from '../navBar/profileMenu/ProfileMenuButton';
import Logo from '../Logo';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { Route, Switch, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

import DashboardPage from '../../pages/Dashboard';
import ProfilePage from '../../pages/UserProfile';

const NavBar = () => {
  const { path, url } = useRouteMatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:py-8 sm:px-8'>
          <div className='relative flex items-center justify-between h-8'>
            <MobileMenuButton isOpen={menuIsOpen} onClick={setMenuIsOpen} />
            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex-shrink-0 flex items-center'>
                <Logo className='block h-8 w-auto text-gray-200 lg:hidden' />
                <Logo className='hidden h-8 w-auto text-gray-200 lg:block' />
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <NavBarLink to={`${url}/dashboard`} text='Dashboard' />
                </div>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div className='ml-4 flex items-center md:ml-6'>
                <ProfileMenuButton />
              </div>
            </div>
          </div>
        </div>
        <MobileMenu isOpen={menuIsOpen} />
      </nav>
      <div>
        <Switch>
          <Route exact path={`${path}/dashboard`}>
            <DashboardPage />
          </Route>
          <Route exact path={`${path}/profile`}>
            <ProfilePage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default connect()(NavBar);
