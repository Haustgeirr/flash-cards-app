import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const MobileMenu = () => {
  const { url } = useRouteMatch();

  return (
    <div className='px-2 pt-2 pb-3 space-y-1'>
      <NavLink
        to={`${url}/dashboard`}
        className='text-gray-300 block px-3 py-2 rounded-md text-base font-medium'
        activeClassName='navlink-active'
        aria-current='page'
      >
        Dashboard
      </NavLink>
    </div>
  );
};

export default MobileMenu;
