import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as actionCreators from '../redux/userActionCreators';
import { signup } from '../api/users';
import Input from '../components/input/Input';
import Logo from '../components/Logo';
import SecureSubmitButton from '../components/input/SecureSubmitButton';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [errorMessages, setErrorMessages] = useState([]);
  const [isRedirecting, setRedirecting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const onSignUpSubmit = async (event) => {
    event.preventDefault();
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setIsWaiting(true);

    const res = await signup(name, email, password);

    if (res.errors) {
      if (res.errors['name']) setNameError(true);
      if (res.errors['email']) setEmailError(true);
      if (res.errors['password']) setPasswordError(true);

      const messages = Object.values(res.errors).reduce((acc, obj) => {
        return [...acc, obj.message];
      }, []);

      setErrorMessages(messages);
      setIsWaiting(false);
    }

    if (res.data) {
      props.userLogin(res.data);
      setRedirecting(true);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      {isRedirecting && <Redirect push to='/decks/dashboard' />}
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
          <div className='rounded-md -space-y-px'>
            <label htmlFor='name' className='sr-only'>
              Name
            </label>
            <Input
              id='name'
              name='name'
              autoComplete='name'
              disabled={isWaiting}
              inputMode='text'
              invalid={nameError}
              placeholder='Name'
              required
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={[
                'input-default rounded-md',
                nameError ? ' border-red-400' : '',
              ].join('')}
            />
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
              autoComplete='new-password'
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
          <div className='space-y-2'>
            {errorMessages && (
              <div className='mt-2 text-center text-sm text-red-600'>
                {errorMessages.map((error, i) => {
                  return <p key={i}>{error}</p>;
                })}
              </div>
            )}
          </div>
          <SecureSubmitButton
            className='btn-signup'
            disabled={isWaiting}
            waiting={isWaiting}
          >
            {' '}
            {isWaiting ? '' : 'Sign up for free'}
          </SecureSubmitButton>
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
            <Link to='/signin' className='btn-signup-secondary'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userLogin: actionCreators.userSignIn })(SignUp);
