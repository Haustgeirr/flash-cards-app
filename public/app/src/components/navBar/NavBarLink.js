import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarLink = (props) => {
  const { to, text, location } = props;
  return (
    <NavLink
      to={to}
      className='text-gray-300 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700'
      location={location}
      activeClassName='navlink-active'
    >
      {text}
    </NavLink>
  );
};

export default NavBarLink;
