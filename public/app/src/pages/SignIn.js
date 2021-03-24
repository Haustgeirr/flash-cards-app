import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actionCreators';
import { signin } from '../api/users';

import Logo from '../components/Logo';
import Checkbox from '../components/input/Checkbox';
import Input from '../components/input/Input';
import SecureSubmitButton from '../components/input/SecureSubmitButton';

const SignInPage = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isWaiting, setIsWaiting] = useState(false);

  const onCreateAccountSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setIsWaiting(true);

    try {
      const res = await signin(email, password, rememberMe);

      if (res.error) {
        throw new Error(res.error);
      }

      if (res.user) {
        props.userSignIn(res.user);
        const { from } = location.state || {
          from: { pathname: '/decks/dashboard' },
        };
        history.replace(from);
      }
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
      setErrorMessage(error.message);
      setIsWaiting(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <div>
          <Logo />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form
          className='mt-8 space-y-6'
          method='POST'
          onSubmit={onCreateAccountSubmit}
        >
          <div className='rounded-md -space-y-px'>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              disabled={isWaiting}
              inputMode='text'
              invalid={emailError}
              required
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={[
                'input-default rounded-md mt-2',
                emailError ? ' border-red-400' : '',
              ].join('')}
            />
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <Input
              id='password'
              name='password'
              autoComplete='current-password'
              disabled={isWaiting}
              inputMode='text'
              invalid={passwordError}
              placeholder='Password'
              required
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={[
                'input-default rounded-md mt-2',
                passwordError ? ' border-red-400' : '',
              ].join('')}
            />
          </div>
          {errorMessage && (
            <div className='text-center text-sm text-red-600'>
              {errorMessage}
            </div>
          )}
          <div className='flex items-center justify-between'>
            <Checkbox
              name='remember-me'
              label='Remember me'
              value={rememberMe}
              onChange={setRememberMe}
            />
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
            <SecureSubmitButton
              className='btn-signup'
              disabled={isWaiting}
              waiting={isWaiting}
            >
              {' '}
              {isWaiting ? '' : 'Sign in'}
            </SecureSubmitButton>
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
          <div className='mt-8'>
            <Link to='/signup' className='btn-signup-secondary'>
              Make one for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userSignIn: actionCreators.userSignIn })(
  SignInPage
);
