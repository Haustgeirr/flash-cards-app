import React from 'react';
import { Link } from 'react-router-dom';

import SignOutLink from '../SignOutLink';

const ProfileMenuDropdown = (props) => {
  return (
    <div
      className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='user-men'
    >
      <Link to='/profile' className='block px-4 py-2 text-sm text-gray-700'>
        Signed in as
        <br />
        <strong>User Placeholder</strong>
      </Link>
      <SignOutLink />
    </div>
  );
};

export default ProfileMenuDropdown;
