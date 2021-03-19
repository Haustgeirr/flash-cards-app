import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';
import { updateUserProfile } from '../../api/users';
import SubmitButton from '../input/SubmitButton';
import Input from '../form/Input';

const SectionPasswordUpdate = (props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isWaiting, setWaiting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const inputStyle = `appearance-none rounded-none relative block w-full mt-1 px-3 py-2 rounded-md border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-50 sm:text-sm`;

  const onUpdatePasswordSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);
    setMessages([]);

    const res = await updateUserProfile({});

    if (res.errors) {
      setHasErrors(true);

      // if (res.errors['name']) setCurrentPasswordError(true);
      // if (res.errors['email']) setNewPasswordError(true);

      const errorMessages = Object.values(res.errors).reduce((acc, obj) => {
        return [...acc, obj.message];
      }, []);

      setMessages(errorMessages);
    }

    if (res.user) {
      setHasErrors(false);
      setCurrentPasswordError(false);
      setNewPasswordError(false);
      setMessages(['Password updated']);

      props.userSignIn(res.user);
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setMessages([]), 4000);
    }

    setWaiting(false);
  };

  return (
    <form onSubmit={onUpdatePasswordSubmit} method='POST'>
      <div className='px-4 py-5 space-y-6'>
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-3 sm:col-span-2'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Current password
            </label>
            <Input
              id='current-password'
              name='current-password'
              autoComplete='current-password'
              disabled={isWaiting}
              inputMode='text'
              invalid={currentPasswordError}
              placeholder=''
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className='col-span-3 sm:col-span-2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              New password
            </label>
            <Input
              id='new-password'
              name='new-password'
              autoComplete='new-password'
              disabled={isWaiting}
              inputMode='text'
              invalid={newPasswordError}
              placeholder=''
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='px-4 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6'>
        <SubmitButton disabled={isWaiting} waiting={isWaiting}>
          {isWaiting ? 'Updating...' : 'Update Password'}
        </SubmitButton>
        {messages && (
          <div
            className={` text-sm ${
              hasErrors ? 'text-red-500' : 'text-green-500'
            } col-span-1 sm:col-span-2 flex items-stretch`}
          >
            {messages.map((error, i) => {
              return (
                <p key={i} className='self-center'>
                  {error}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
};

export default connect(null, { userSignIn: actionCreators.userSignIn })(
  SectionPasswordUpdate
);
