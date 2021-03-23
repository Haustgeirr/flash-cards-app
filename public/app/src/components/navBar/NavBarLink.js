import React from 'react';
import { Link } from 'react-router-dom';

const NavBarLink = (props) => {
  return (
    <Link
      to={{
        pathname: props.href,
        activeClassName: 'bg-gray-900',
      }}
      className='bg-gray-900 text-gray-200 px-3 py-2 text-sm font-medium rounded-md'
    >
      {props.text}
    </Link>
  );
};

export default NavBarLink;
