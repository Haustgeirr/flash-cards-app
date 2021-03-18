import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';
import { updateUserProfile } from '../../api/users';
import SubmitButton from '../../components/form/SubmitButton';

const SectionProfileUpdate = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessages, setErrorMessages] = useState();
  const [isWaiting, setWaiting] = useState(false);

  const inputStyle =
    'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-50 sm:text-sm mt-1 rounded-md';

  const onUpdateProfileSubmit = async (event) => {
    event.preventDefault();
    // setWaiting(true);

    const res = await updateUserProfile({
      name,
      email,
    });

    if (res.errors) {
      if (res.errors['name']) setNameError(true);
      if (res.errors['email']) setEmailError(true);

      const messages = Object.values(res.errors).reduce((acc, obj) => {
        return [...acc, obj.message];
      }, []);

      setErrorMessages(messages);
    }

    if (res.user) {
      setNameError(false);
      setEmailError(false);

      props.userSignIn(res.user);
      setName('');
      setEmail('');
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
            <div>
              <input
                id='name'
                name='name'
                type='text'
                value={name}
                disabled={isWaiting}
                placeholder=''
                autoComplete='name'
                inputMode='text'
                className={inputStyle}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='col-span-3 sm:col-span-2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <div>
              <input
                id='email'
                name='email'
                type='email'
                value={email}
                disabled={isWaiting}
                placeholder=''
                autoComplete='email'
                inputMode='email'
                className={inputStyle}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {errorMessages && (
        <div className='mt-2 text-center text-sm text-red-600'>
          {errorMessages.map((error, i) => {
            return <p key={i}>{error}</p>;
          })}
        </div>
      )}
      <div className='px-4 py-5'>
        <SubmitButton disabled={isWaiting}>Update profile</SubmitButton>
      </div>
    </form>
  );
};

export default connect(null, { userSignIn: actionCreators.userSignIn })(
  SectionProfileUpdate
);
