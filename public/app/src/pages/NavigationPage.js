import React, { useRef } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import GetDeckRoute from '../router/GetDeckRoute';
import NavBarLink from '../components/navBar/NavBarLink';
import ProfileMenuButton from '../components/navBar/profileMenu/ProfileMenuButton';
import Logo from '../components/Logo';
import MobileMenuButton from '../components/navBar/MobileMenuButton';
import MobileMenu from '../components/navBar/MobileMenu';
import useOnClickOutside from '../hooks/useOnClickOutside';
import DashboardPage from './Dashboard';
import ProfilePage from './UserProfile';
import TestPage from './decks/TestPage';
import EditPage from './decks/EditPage';

const NavigationPage = () => {
  const mobileMenuRef = useRef(null);
  const { path, url } = useRouteMatch();
  const [menuIsOpen, setMenuIsOpen] = useOnClickOutside(mobileMenuRef, false);

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
              <div className='hidden sm:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <NavBarLink to={`${url}`} text='Decks' />
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
        <div
          ref={mobileMenuRef}
          className={(menuIsOpen ? '' : 'hidden') + ' sm:hidden'}
          id='mobile-menu'
        >
          <MobileMenu />
        </div>
      </nav>
      <div>
        <Switch>
          <GetDeckRoute exact path={`${path}/`} component={DashboardPage} />
          <GetDeckRoute path={`${path}/:id/test`} component={TestPage} />
          <GetDeckRoute path={`${path}/:id/edit`} component={EditPage} />
          <Route exact path={`${path}/profile`}>
            <ProfilePage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default NavigationPage;
