import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../redux/actionCreators';
import { signup } from '../api/users';
import InputEmail from '../components/form/InputEmail';
import AccountSubmitButton from '../components/userAccount/AccountSubmitButton';
import AccountSecondaryButton from '../components/userAccount/AccountSecondaryButton';
import InputPassword from '../components/form/InputPassword';
import InputName from '../components/form/InputName';
import Logo from '../components/Logo';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [errorMessages, setErrorMessages] = useState([]);
  const [isRedirecting, setRedirecting] = useState(false);

  const onSignUpSubmit = async (event) => {
    event.preventDefault();
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    const res = await signup(name, email, password);

    if (res.errors) {
      if (res.errors['name']) setNameError(true);
      if (res.errors['email']) setEmailError(true);
      if (res.errors['password']) setPasswordError(true);

      const messages = Object.values(res.errors).reduce((acc, obj) => {
        return [...acc, obj.message];
      }, []);

      setErrorMessages(messages);
    }

    if (res.data) {
      props.userLogin(res.data);
      setRedirecting(true);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      {isRedirecting && <Redirect push to='/dashboard' />}
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <div>
          <Logo />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
        </div>
        <form
          method='POST'
          onSubmit={onSignUpSubmit}
          className='mt-8 space-y-6'
        >
          <div className='rounded-md shadow-sm -space-y-px'>
            <label htmlFor='name' className='sr-only'>
              Name
            </label>
            <InputName
              value={name}
              onChange={setName}
              required
              autoFocus
              className={
                nameError ? 'rounded-t-md border-red-400 z-10' : 'rounded-t-md'
              }
            />
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <InputEmail
              value={email}
              onChange={setEmail}
              className={emailError && 'border-red-400 z-20'}
            />
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <InputPassword
              value={password}
              onChange={setPassword}
              className={
                passwordError
                  ? 'rounded-b-md border-red-400 z-30'
                  : 'rounded-b-md'
              }
            />
          </div>
          <div className='space-y-2'>
            {errorMessages && (
              <div className='mt-2 text-center text-sm text-red-600'>
                {errorMessages.map((error, i) => {
                  return <p key={i}>{error}</p>;
                })}
              </div>
            )}
          </div>
          <AccountSubmitButton text='Sign up for free' />
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-gray-50 text-gray-500'>
                Already have an account?
              </span>
            </div>
          </div>
          <div className='mt-8'>
            <AccountSecondaryButton to='/signin' text='Sign in' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userLogin: actionCreators.userSignIn })(SignUp);
