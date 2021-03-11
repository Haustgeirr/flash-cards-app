import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actionCreators';
import { login } from '../api/users';

function LoginPanel(props) {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    const user = await login(email, password, rememberMe);
    props.userLogin(user);

    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  };

  return (
    <div className='login-panel'>
      <div className='credentials-container'>
        <form className='login-form' method='POST' onSubmit={onLoginSubmit}>
          <input
            type='text'
            name='email'
            id='email'
            autoCorrect='off'
            spellCheck='false'
            autoCapitalize='off'
            autoFocus='autofocus'
            placeholder='Enter email'
            value={props.email}
            autoComplete='off'
            inputMode='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            value={props.password}
            id='password'
            className='form-field'
            placeholder='Enter password'
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='checkbox'
            name='remember-me'
            value={props.rememberMe}
            id='remember-me'
            className=''
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <input type='submit' id='login' value='Log in' />
        </form>
      </div>
    </div>
  );
}

export default connect(null, { userLogin: actionCreators.userLogin })(
  LoginPanel
);
