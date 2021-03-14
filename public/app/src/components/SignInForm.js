import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actionCreators';
import { login } from '../api/users';

const SignInForm = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(email, password, rememberMe);
      props.userLogin(user);

      const { from } = location.state || { from: { pathname: '/dashboard' } };
      history.replace(from);
    } catch (error) {}
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
        <form className='mt-8 space-y-6' method='POST' onSubmit={onLoginSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='text'
                autoCorrect='off'
                required
                spellCheck='false'
                autoCapitalize='off'
                autoFocus='autofocus'
                placeholder='Email'
                value={email}
                autoComplete='off'
                inputMode='email'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-t-md focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-10 sm:text-sm'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={password}
                placeholder='Password'
                autoComplete='off'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-b-md focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-10 sm:text-sm'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
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
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <svg
                  className='h-5 w-5 text-gray-600 group-hover:text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              Sign in
            </button>
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
            <a
              href='/signup'
              className='block w-full text-center py-2 px-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm'
            >
              Make one for free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userLogin: actionCreators.userLogin })(
  SignInForm
);
