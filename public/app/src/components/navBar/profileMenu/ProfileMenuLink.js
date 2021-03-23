import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenuLink = (props) => {
  return (
    <Link
      to={{
        pathname: props.href,
      }}
      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
      role='menuitem'
    >
      {props.text}
    </Link>
  );
};

export default ProfileMenuLink;
