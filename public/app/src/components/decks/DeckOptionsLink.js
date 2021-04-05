import React from 'react';
import { Link } from 'react-router-dom';

const DeckOptionsLink = ({ disabled, children, to, ...props }) => {
  return (
    <Link
      className='pl-2 pr-3 py-2 rounded-sm text-gray-400 text-sm font-normal flex items-center justify-start hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400'
      disabled={disabled}
      tabIndex={disabled ? '-1' : ''}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default DeckOptionsLink;
