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

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isRedirecting, setRedirecting] = useState(false);

  const onSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await signup(name, email, password);

      if (res.error) {
        if (res.error.field === 'name') {
          setNameError(true);
          setEmailError(false);
          setPasswordError(false);
        }
        if (res.error.field === 'email') {
          setNameError(false);
          setEmailError(true);
          setPasswordError(false);
        }
        if (res.error.field === 'password') {
          setNameError(false);
          setEmailError(false);
          setPasswordError(true);
        }
        setErrorMessage(res.error.message);
      }

      if (res.data) {
        props.userLogin(res.data.user);
        setRedirecting(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      {isRedirecting && <Redirect push to='/dashboard' />}
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
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
            <InputName
              vale={name}
              onChange={setName}
              required
              autoFocus
              className={
                nameError ? 'rounded-t-md border-red-400 z-10' : 'rounded-t-md'
              }
            />
            <InputEmail
              value={email}
              onChange={setEmail}
              className={emailError && 'border-red-400 z-20'}
            />
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
            {errorMessage && (
              <div className='mt-2 text-center text-sm text-red-400'>
                {errorMessage}
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

export default connect(null, { userLogin: actionCreators.userLogin })(SignUp);
