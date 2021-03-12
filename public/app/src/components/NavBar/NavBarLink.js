import React from 'react';
import { Link } from 'react-router-dom';

const NavBarLink = (props) => {
  return (
    <Link
      to={{
        pathname: props.href,
      }}
      className=' text-gray-800 px-3 py-2 text-sm font-medium'
    >
      {props.text}
    </Link>
  );
};

export default NavBarLink;
