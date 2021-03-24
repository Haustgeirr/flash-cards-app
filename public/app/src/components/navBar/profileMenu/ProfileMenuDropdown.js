import { useSelector } from 'react-redux';

import ProfileMenuLink from './ProfileMenuLink';
import SignOutLink from './SignOutLink';

const ProfileMenuDropdown = (props) => {
  const { onMenuItemClick } = props;
  const user = useSelector((state) => state.users.user);

  return (
    <div
      className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='profile-title'
    >
      <div
        id='profile-title'
        className='block px-4 py-2 text-sm text-gray-700 cursor-default border-separate'
      >
        Signed in as
        <br />
        <strong>{user.name}</strong>
      </div>
      <div className=''>
        <ProfileMenuLink
          to='/decks/profile'
          text='Profile'
          onClick={onMenuItemClick}
        />
        <SignOutLink />
      </div>
    </div>
  );
};

export default ProfileMenuDropdown;
