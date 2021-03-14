import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actionCreators';
import { login } from '../api/users';
import AccountSubmitButton from '../components/userAccount/AccountSubmitButton';
import AccountSecondaryButton from '../components/userAccount/AccountSecondaryButton';
import InputEmail from '../components/form/InputEmail';
import InputPassword from '../components/form/InputPassword';

const SignInPage = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const onCreateAccountSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const res = await login(email, password, rememberMe);

      if (res.error) {
        throw new Error(res.error);
      }

      props.userLogin(res);
      const { from } = location.state || { from: { pathname: '/dashboard' } };
      history.replace(from);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form
          className='mt-8 space-y-6'
          method='POST'
          onSubmit={onCreateAccountSubmit}
        >
          <div className='rounded-md shadow-sm -space-y-px'>
            <InputEmail
              value={email}
              onChange={setEmail}
              className='rounded-t-md'
              autoFocus
            />
            <InputPassword
              value={password}
              onChange={setPassword}
              className='rounded-b-md'
            />
          </div>
          {errorMessage && (
            <div className='text-center text-sm text-red-400'>
              {errorMessage}
            </div>
          )}
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='remember-me'
                value={rememberMe}
                id='remember-me'
                className='h-4 w-4 text-gray-900 focus:ring-indigo-500 border-gray-300 rounded'
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor='remember_me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>
            <div className='text-sm'>
              <Link
                to='/'
                className='underline text-gray-600 hover:text-gray-500'
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <AccountSubmitButton text='Sign in' />
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-gray-50 text-gray-500'>
                Don't have an account?
              </span>
            </div>
          </div>
          <div className='mt-6'>
            <AccountSecondaryButton to='/signup' text='Make on for free' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userLogin: actionCreators.userLogin })(
  SignInPage
);
