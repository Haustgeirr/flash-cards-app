import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/userActionCreators';
import { updateUserProfile } from '../../api/users';
import SubmitButton from '../input/SubmitButton';
import Input from '../input/Input';

const SectionProfileUpdate = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isWaiting, setWaiting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const onUpdateProfileSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);
    setMessages([]);

    const res = await updateUserProfile(name, email);

    if (res.errors) {
      setHasErrors(true);

      if (res.errors['name']) setNameError(true);
      if (res.errors['email']) setEmailError(true);

      const errorMessages = Object.values(res.errors).reduce((acc, obj) => {
        return [...acc, obj.message];
      }, []);

      setMessages(errorMessages);
    }

    if (res.user) {
      setHasErrors(false);
      setNameError(false);
      setEmailError(false);
      setMessages(['Profile updated']);

      props.userSignIn(res.user);
      setName('');
      setEmail('');
      setTimeout(() => setMessages([]), 4000);
    }

    setWaiting(false);
  };

  return (
    <form onSubmit={onUpdateProfileSubmit} method='POST'>
      <div className='px-4 py-5 space-y-6'>
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-3 sm:col-span-2'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <Input
              id='name'
              name='name'
              autoComplete='name'
              disabled={isWaiting}
              inputMode='text'
              invalid={nameError}
              placeholder=''
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={[
                'input-default rounded-md mt-1',
                nameError ? ' border-red-400' : '',
              ].join('')}
            />
          </div>
          <div className='col-span-3 sm:col-span-2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              disabled={isWaiting}
              inputMode='text'
              invalid={emailError}
              placeholder=''
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={[
                'input-default rounded-md mt-1',
                emailError ? ' border-red-400' : '',
              ].join('')}
            />
          </div>
        </div>
      </div>

      <div className='px-4 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6'>
        <SubmitButton disabled={isWaiting} waiting={isWaiting}>
          {isWaiting ? 'Updating...' : 'Update Profile'}
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
  SectionProfileUpdate
);
