import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenuLink = (props) => {
  const { to, text, onClick } = props;

  return (
    <Link
      to={to}
      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
      role='menuitem'
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default ProfileMenuLink;
