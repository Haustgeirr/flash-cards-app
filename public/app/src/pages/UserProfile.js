import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import NavBar from '../components/navBar/NavBar';
import ProfileSection from '../components/profile/ProfileSection';
import ProfileSectionHeader from '../components/profile/ProfileSectionHeader';
import ProfileSectionContent from '../components/profile/ProfileSectionContent';
import ProfileSectionSeparator from '../components/profile/ProfileSectionSeparator';
import SectionProfileUpdate from '../components/profile/SectionProfileUpdate';
import SectionPasswordUpdate from '../components/profile/SectionPasswordUpdate';
import DeleteAccountModal from '../components/profile/DeleteAccountModal';
import Button from '../components/input/Button';

const deleteButtonStyle = {
  base:
    'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md transition duration-150 ease-out bg-red-500 text-white',
  actions: {
    hover: 'bg-red-400',
    focus: 'outline-none ring-4 ring-red-500 ring-opacity-20 z-50',
  },
};

const UserProfile = () => {
  const [isShowingDeleteModal, setShowingDeleteModal] = useState(true);
  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <NavBar />
      <div className='bg-white'>
        <div className='max-w-4xl mx-auto py-6 sm:px-6 lg:px-8'>
          <ProfileSection>
            <ProfileSectionHeader>
              <div className='mt-1 flex items-center'>
                <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                  <svg
                    className='h-full w-full text-gray-300'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                  </svg>
                </span>
                <span className='pl-6'>
                  <h1 className='text-2xl font-medium leading-6 text-gray-900'>
                    {user.name}
                  </h1>
                  <p className='mt-1 text-sm text-gray-600'>Your account</p>
                </span>
              </div>
            </ProfileSectionHeader>
            {/* <ProfileSectionContent></ProfileSectionContent> */}
          </ProfileSection>
          <ProfileSectionSeparator />
          <ProfileSection>
            <ProfileSectionHeader>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Profile
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </ProfileSectionHeader>
            <ProfileSectionContent>
              <SectionProfileUpdate />
            </ProfileSectionContent>
          </ProfileSection>
          <ProfileSectionSeparator />
          <ProfileSection>
            <ProfileSectionHeader>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Change password
              </h3>
            </ProfileSectionHeader>
            <ProfileSectionContent>
              <SectionPasswordUpdate />
            </ProfileSectionContent>
          </ProfileSection>
          <ProfileSectionSeparator />
          <ProfileSection>
            <ProfileSectionHeader>
              <h3 className='text-lg font-medium leading-6 text-red-500'>
                Delete account
              </h3>
              <p className='mt-1 text-sm text-red-500'>
                Welcome to the <i>Danger Zone</i>
              </p>
            </ProfileSectionHeader>
            <ProfileSectionContent>
              <div className='px-4 py-5'>
                <Button
                  styles={deleteButtonStyle}
                  // onClick={setShowingDeleteModal(true)}
                >
                  Delete account
                </Button>
                {isShowingDeleteModal && <DeleteAccountModal />}
              </div>
            </ProfileSectionContent>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
