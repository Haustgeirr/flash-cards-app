import React from 'react';
import { Link } from 'react-router-dom';

const AccountSecondaryButton = (props) => {
  return (
    <Link
      to={props.to}
      className='block w-full text-center py-2 px-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-opacity-20 focus:ring-gray-400 sm:text-sm'
    >
      {props.text}
    </Link>
  );
};

export default AccountSecondaryButton;
