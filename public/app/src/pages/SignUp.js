import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../redux/actionCreators';
import { signup } from '../api/users';

const SignUp = (props) => {
  //   const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isRedirecting, setRedirecting] = useState(false);

  const onSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signup(name, email, password);
      props.userLogin(user);
      setRedirecting(true);
    } catch (error) {}
  };

  return (
    <div>
      {isRedirecting && <Redirect push to='/dashboard' />}
      <div>
        <form method='POST' onSubmit={onSignUpSubmit}>
          <div>
            <label htmlFor='name' className='sr-only'>
              Email
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={name}
              placeholder='Your name'
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='text'
              value={email}
              placeholder='Email'
              autoComplete='username'
              required
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
              autoComplete='current-password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Sign in</button>
        </form>
      </div>
    </div>
  );
};
// export default SignUp;
export default connect(null, { userLogin: actionCreators.userLogin })(SignUp);
